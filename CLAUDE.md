# claude_test — Figma → HTML Email Pipeline

This repo turns Figma email designs into production HTML for ESP upload, following Merkle/DEG Email UI coding standards.

## How to run

```
/email <desktop-figma-url> <mobile-figma-url> <email-name>
```

The `/email` slash command orchestrates one skill and two subagents end to end. Both Figma URLs are required (desktop + mobile breakpoints). The email name is a kebab-case slug used as the working directory.

## Architecture

```
/email (.claude/commands/email.md)
  ├─ Step 1: figma-fetch skill  (.claude/skills/figma-fetch/)
  │     Runs inline in main context. Fast-path discovery: 4 parallel calls
  │     (2 screenshots + 2 frame-level get_design_context).
  │     Writes pre-scan.md + desktop-frame.jsx + mobile-frame.jsx (and inlined siblings).
  │     Falls back to per-section calls only if a frame response is truncated.
  │
  ├─ Step 2: figma-section-extractor agent  (.claude/agents/figma-section-extractor.md)
  │     One agent, one pass. No Figma tools needed.
  │     Reads pre-scan.md + 2 inlined frame JSX files → writes plan.md + complete spec.json.
  │     Calls figma-interpret skill for ambiguous judgment moments.
  │
  └─ Step 3: email-renderer agent  (.claude/agents/email-renderer.md)
        Reads spec.json → writes index.html.
        Calls email-render skill for primitive → HTML pattern lookups.
```

Figma MCP tools only work in the main session context, not in spawned subagents. The `figma-fetch` skill runs inline so it has direct tool access. The section-extractor agent only needs Read/Write/Bash/Skill — no Figma dependency.

The section-extractor authors `spec.json` directly. There is no compose step in `/email`; every field (meta, annotations, sections) is written from real sources in one pass.

Skills are **advisors**, not workflows. They answer focused questions without loading full references into context. Reference files live in `.claude/skills/*/references/`.

## Path conventions

```
emails/<email-name>/
  ├─ pre-scan.md                       # visual narration, section inventory, design tokens, open questions
  ├─ plan.md                           # section-by-section judgment plan (one file, written by extractor)
  ├─ spec.json                         # validated extractor output (consumed by renderer)
  ├─ render-plan.md                    # HTML plan
  ├─ index.html                        # validated renderer output (final deliverable)
  └─ jsx/
      ├─ desktop-frame.jsx + .inlined.jsx   # full-frame JSX (fast path)
      ├─ mobile-frame.jsx + .inlined.jsx
      └─ decoded.css                        # Tailwind resolver intermediate
```

In the fallback case (truncated frame response), `jsx/` contains `section-{N}-{desktop|mobile}.jsx` + `.inlined.jsx` instead. The extractor handles both layouts via `data-node-id` navigation.

Worked example: `emails/tzield-v1/`.

## Hooks and validators (`.claude/settings.json`)

- **SessionStart** — checks Tailwind CLI availability via `.claude/scripts/resolve-tailwind.sh --check`. Warns up front if missing.
- **PostToolUse (Write)** — auto-validates any Write to `*spec.json` (`validate-spec.py`) or `*.html` (`validate-html.py`). Errors surface inline; the agent fixes them before delivery.

Validators and the Tailwind resolver are pre-allowed in `permissions.allow` — no interrupt prompts mid-workflow.

## Tailwind CLI

`resolve-tailwind.sh` auto-detects, in order: `$TAILWIND_CLI` env override → web-Claude bundled path → `tailwindcss` on `PATH` → `npx -y tailwindcss@3.4`. Set `TAILWIND_CLI=/path/to/tailwindcss` to pin a specific binary.

## Re-running a single phase

If the spec is good but the HTML needs a redo, invoke `email-renderer` directly via the `Task` tool with the spec path — skip `/email`. To re-author the spec only, invoke `figma-section-extractor` with the workDir. To re-fetch Figma data only, invoke the `figma-fetch` skill.

## What NOT to do

- **No generator scripts.** Both agents author their output (JSON, HTML) directly. No `build_spec.py`, no `emit_html.py`. Generators add a buggy abstraction layer and hide judgment from review.
- **No pre-loading the full references.** Agents query the advisor skills with focused questions; skills look up the relevant section and return a focused answer.
- **No mid-rendering judgment calls.** All interpretive decisions happen in the plan phase (extractor plan.md for extraction, render-plan.md for rendering). The authoring step is mechanical execution.
