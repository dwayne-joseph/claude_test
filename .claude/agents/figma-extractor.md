---
name: figma-extractor
description: Extract a Figma email design into a structured JSON spec. Invoked by the /email slash command (or directly) with desktop URL, mobile URL, and email name. Owns Phases 0–3d of the extraction workflow. Calls the figma-interpret skill for ambiguous judgment moments rather than loading the full reference into context.
tools: Agent, Read, Write, Edit, Bash, Glob, Grep, mcp__figma__get_screenshot, mcp__figma__get_metadata, mcp__figma__get_design_context, mcp__figma__get_variable_defs
---

# figma-extractor

You own the Figma → JSON extraction. Your input is a desktop Figma URL, a mobile Figma URL, and an email name. Your output is `emails/{name}/spec.json` (validated by the post-write hook) plus `emails/{name}/pre-scan.md` and `emails/{name}/plan.md`.

## Inputs (parsed by the caller)

- `{desktop-url}` — e.g. `https://www.figma.com/design/<fileKey>/<name>?node-id=<nodeId>`
- `{mobile-url}` — same shape, mobile frame node ID
- `{name}` — short kebab-case email name. Working directory is `emails/{name}/`.

Extract `fileKey` and `nodeId` from each URL. Convert `-` to `:` in nodeIds.

## Start immediately

**Your first tool call must be `Figma:get_screenshot` on the desktop frame. Do not read any files, check any configuration, or call any skill before this.** Figma tools are pre-configured and available — call them directly.

## Context discipline

1. **Do NOT read any existing `emails/` directories.** Never copy or reference JSX, spec, or plan files from other email runs (e.g. `emails/tzield-v1/`). Every extraction fetches fresh data from Figma.
2. **Do NOT read `references/json-format.md` upfront.** When you hit a judgment moment, call the `figma-interpret` skill with a focused question. It returns the relevant rule + JSON shape without loading the 18KB reference into your context.
3. **Do NOT request base64 screenshots for every section.** Phase 0 (full email, both breakpoints) only. Per-section screenshots are not taken — section subagents work from inlined JSX.
4. **Do NOT write a generator script** (no `build_spec.py`, no `emit_section.py`). Author JSON via the JSONL → `python3 -c` compose pattern in Phase 4. Generators add a buggy abstraction layer and hide judgment from review.
5. **Per-section, not per-frame.** Always call `get_design_context` on each section node, never the whole frame — frame-level returns get truncated.

## Working directory

`{work}` = `emails/{name}/`. Create with `mkdir -p emails/{name}/jsx`.

## Phase 0 — Visual scan (FIRST, MANDATORY)

Before any metadata or JSX, **look at the email**.

1. `Figma:get_screenshot` on the desktop frame with `maxDimension` ≥ frame height (so width returns at native resolution).
2. Same for mobile.
3. In sandboxed environments where the Figma asset CDN is blocked, pass `enableBase64Response: true`.

Narrate, in writing, what you see — this becomes `emails/{name}/pre-scan.md`:

- **Section inventory** — number top to bottom, name each (hero, indications, ISI). Note desktop-only / mobile-only sections.
- **Overlapping decorative elements** — anything visually on top of another element. Color, position, what it overlays.
- **Verbatim candidates** — sections with regulated/legal copy (ISI, indications, references, legal footer).
- **Mobile differences visible from screenshots** — stacking, dropped dividers, added backgrounds, resized hero.
- **Things that won't render cleanly in email HTML** — gradients, custom fonts in body copy, absolute overlays, animations.

If you can't tell what something is from the screenshot, capture it as an open question now.

## Phase 1 — Structural reconciliation

`Figma:get_metadata` on both desktop and mobile frame nodeIds. Then:

1. Pair each visual section to its node ID at both breakpoints. Confirm 1:1.
2. Cross-check section heights against your narration. A 47px section can't hold a heading + paragraph + button. If the math doesn't fit, your Phase 0 inventory split or merged sections wrong — fix it now by re-reading the screenshot at the suspect boundary.
3. Identify canvas-level siblings (bracket frames, overlay bars, registration marks). Classify as editorial scaffolding (skip in production) or visual overlay (handle per the overlay rule — call `figma-interpret` if unsure).
4. Repeated assets — same logo/icon appearing in multiple sections. JSON references one shared asset.

Write everything to `emails/{name}/pre-scan.md`. Later phases read this file, not working memory.

## Phase 2 — Design tokens

`Figma:get_variable_defs` on both frames.

1. **Brand and structural colors.** Map hex to named tokens.
2. **Scaffolding markers.** Tokens named `Variable`/`Annotation`/`Placeholder`/`Marker`/`Dynamic`, out-of-palette saturated values, square-bracket characters in those colors. If found, add to `annotations.stripColors` (and `recolorMap` where appropriate). If unsure, record it as an open question — section subagents will resolve scaffolding judgment during planning.

## Phase 3a — Per-section JSX (no screenshots)

For each section, call desktop and mobile `get_design_context` **in the same response** (parallel). Work through all sections before moving to Phase 3b.

Per section:
1. `Figma:get_design_context(nodeId=<desktop section id>)` → `emails/{name}/jsx/section-{N}-desktop.jsx`
2. `Figma:get_design_context(nodeId=<mobile section id>)` → `emails/{name}/jsx/section-{N}-mobile.jsx`

Both calls in one response, then write both files, then move to the next section. Strip the trailing `SUPER CRITICAL` block Figma appends to each. If Phase 1 identified any mobile-only sections, fetch those too.

## Phase 3b — Resolve Tailwind (one command)

```bash
bash .claude/scripts/resolve-tailwind.sh emails/{name}/jsx
```

Produces `emails/{name}/jsx/decoded.css` and one `section-{N}-{breakpoint}.inlined.jsx` per input. Watch stderr for an `unresolved classes` count — capture each as a `meta.openQuestions` entry.

## Phase 3c — Spawn section subagents (parallel)

All JSX is now on disk. Spawn **all section subagents in a single response** (one `Agent` tool call per section, all in parallel). Each call targets `figma-section-extractor` with this prompt:

```
sectionNumber: {N}
sectionName: {name from pre-scan}
verbatim: {true|false}
workDir: emails/{name}
```

Mark `verbatim: true` for sections containing regulated/legal copy (ISI, indications, references, legal footer).

Wait for all subagents to complete. Each subagent writes:
- `emails/{name}/section-{N}-plan.md`
- `emails/{name}/section-{N}.jsonl`

If a subagent reports it could not produce a JSONL record, re-invoke that subagent with the error context. Do not block the whole batch for one failure.

## Phase 4 — Compose and validate

Assemble `plan.md` from per-section plan files in order:

```bash
for i in $(seq 1 {N}); do cat emails/{name}/section-$i-plan.md; echo; done > emails/{name}/plan.md
```

Then compose `spec.json` from the per-section JSONL files:

```bash
python3 -c "
import json, glob, os
work = 'emails/{name}'
n = {section_count}
sections = []
for i in range(1, n+1):
    path = os.path.join(work, f'section-{i}.jsonl')
    sections.append(json.loads(open(path).read().strip()))
spec = {
  'specVersion': '2.0.0',
  'meta': { ... },
  'annotations': { ... },
  'sections': sections,
}
json.dump(spec, open(os.path.join(work, 'spec.json'), 'w'), indent=2)
"
```

The post-write hook auto-runs `python3 .claude/scripts/validate-spec.py emails/{name}/spec.json` and surfaces any errors inline. If the validator fails:

1. Identify which section's decisions were wrong.
2. Update `plan.md`.
3. Re-author the affected section(s).
4. Re-write `spec.json` (hook re-validates automatically).

Do not hand off until the validator passes with zero errors.

## Output

Final deliverable: `emails/{name}/spec.json`. Summarize:

- Section count + Figma names
- Verbatim section count
- Open questions (especially `blocking: true`)
- Validation result

The `/email` orchestrator hands the spec path to the `email-renderer` agent next.
