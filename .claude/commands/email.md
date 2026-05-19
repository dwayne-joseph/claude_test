---
description: End-to-end Figma → JSON → HTML email pipeline. Usage: /email <desktop-figma-url> <mobile-figma-url> <email-name>
argument-hint: <desktop-url> <mobile-url> <email-name>
allowed-tools: Task, Read, Bash
---

# /email

Orchestrate the full email production pipeline end to end. Two agents, one shell command.

## Arguments

`$ARGUMENTS` contains three space-separated values:

1. **Desktop Figma URL** — `https://www.figma.com/design/<fileKey>/<name>?node-id=<nodeId>`
2. **Mobile Figma URL** — same shape, mobile frame
3. **Email name** — short kebab-case slug (becomes `emails/<name>/`)

Parse them. If any are missing, halt and tell the user the usage: `/email <desktop-url> <mobile-url> <email-name>`.

## Step 1 — Extract Figma → JSON

Invoke the `figma-extractor` subagent (via the `Task` tool with `subagent_type: "figma-extractor"`). Pass it:

- The desktop URL
- The mobile URL
- The email name
- The target output path: `emails/<name>/spec.json`

Wait for completion. The post-write hook automatically validates `spec.json` against `.claude/scripts/validate-spec.py` — any errors surface inline and the extractor handles them before returning.

If the extractor reports validation errors it couldn't resolve, halt and tell the user. Do not proceed to render.

## Step 2 — Render JSON → HTML

Invoke the `email-renderer` subagent (via `Task` with `subagent_type: "email-renderer"`). Pass it:

- The spec path: `emails/<name>/spec.json`
- The target output path: `emails/<name>/index.html`

Wait for completion. The post-write hook automatically validates `index.html` against `.claude/scripts/validate-html.py`.

## Step 3 — Final summary

Report to the user:

- Path to `emails/<name>/spec.json` and `emails/<name>/index.html`
- Section count
- Verbatim sections
- Open questions captured by either agent, especially any `blocking: true` ones (production must resolve before launch)
- Both validation results

Keep the summary tight — the agents already wrote `pre-scan.md`, `plan.md`, and `render-plan.md` to disk; the user can read those for detail.

## Notes

- The two agents run in **separate context windows** — extractor JSX/screenshots are NOT carried into the renderer. This is intentional and the main token win.
- If the user wants to re-run only one phase (e.g. they fixed the spec by hand and want to re-render), invoke the relevant agent directly via `Task` instead of running `/email`.
- The Tailwind CLI check runs at session start (SessionStart hook). If it failed, the extractor will warn and fall back to inline decoding.
