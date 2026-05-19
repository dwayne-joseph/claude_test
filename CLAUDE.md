# claude_test — Figma → HTML Email Pipeline

This repo turns Figma email designs into production HTML for ESP upload, following Merkle/DEG Email UI coding standards.

## How to run

```
/email <desktop-figma-url> <mobile-figma-url> <email-name>
```

The `/email` slash command orchestrates two subagents end to end. Both Figma URLs are required (desktop + mobile breakpoints). The email name is a kebab-case slug used as the working directory.

## Architecture

```
/email (.claude/commands/email.md)
  ├─ Step 1: figma-fetch skill  (.claude/skills/figma-fetch/)
  │     Runs inline in main context. Owns all Figma API calls:
  │     screenshots, metadata, variable defs, per-section JSX, Tailwind.
  │     Writes JSX files + sections-manifest.jsonl to disk.
  │
  ├─ Step 2: figma-section-extractor agents  (.claude/agents/figma-section-extractor.md)
  │     One per section, spawned in parallel. No Figma tools needed.
  │     Reads inlined JSX from disk → writes plan entry + JSONL.
  │     Calls figma-interpret skill for ambiguous judgment moments.
  │
  ├─ Step 3: /email command composes spec.json from section-N.jsonl files
  │
  └─ Step 4: email-renderer agent  (.claude/agents/email-renderer.md)
        Reads spec.json → writes index.html.
        Calls email-render skill for primitive → HTML pattern lookups.
```

Figma MCP tools only work in the main session context, not in spawned subagents. The `figma-fetch` skill runs inline so it has direct tool access. Section subagents only need Read/Write/Bash/Skill — no Figma dependency.

Skills are **advisors**, not workflows. They answer focused questions without loading full references into context. Reference files live in `.claude/skills/*/references/`.

## Path conventions

```
emails/<email-name>/
  ├─ pre-scan.md               # Phase 0–1 visual narration + node ID map
  ├─ sections-manifest.jsonl   # section list written by figma-fetch skill
  ├─ section-{N}-plan.md       # per-section judgment plan (one per section)
  ├─ section-{N}.jsonl         # per-section JSON record (one per section)
  ├─ plan.md                   # assembled from section-N-plan.md files
  ├─ spec.json                 # validated extractor output (consumed by renderer)
  ├─ render-plan.md            # Step 3 HTML plan
  ├─ index.html                # validated renderer output (final deliverable)
  └─ jsx/                      # per-section JSX + .inlined.jsx
```

Worked example: `emails/tzield-v1/`.

## Hooks and validators (`.claude/settings.json`)

- **SessionStart** — checks Tailwind CLI availability via `.claude/scripts/resolve-tailwind.sh --check`. Warns up front if missing.
- **PostToolUse (Write)** — auto-validates any Write to `*spec.json` (`validate-spec.py`) or `*.html` (`validate-html.py`). Errors surface inline; the agent fixes them before delivery.

Validators and the Tailwind resolver are pre-allowed in `permissions.allow` — no interrupt prompts mid-workflow.

## Tailwind CLI

`resolve-tailwind.sh` auto-detects, in order: `$TAILWIND_CLI` env override → web-Claude bundled path → `tailwindcss` on `PATH` → `npx -y tailwindcss@3.4`. Set `TAILWIND_CLI=/path/to/tailwindcss` to pin a specific binary.

## Re-running a single phase

If the spec is good but the HTML needs a redo, invoke `email-renderer` directly via the `Task` tool with the spec path — skip `/email`. Same for re-running the extractor only.

## What NOT to do

- **No generator scripts.** Both agents author their output (JSON, HTML) directly. No `build_spec.py`, no `emit_html.py`. Generators add a buggy abstraction layer and hide judgment from review. JSON uses a JSONL → `python3 -c` compose pattern; HTML is written by hand in chunks.
- **No pre-loading the full references.** Agents query the advisor skills with focused questions; skills look up the relevant section and return a focused answer.
- **No mid-rendering judgment calls.** All interpretive decisions happen in the plan phase (3c for extraction, Step 3 for rendering). The authoring step is mechanical execution.
