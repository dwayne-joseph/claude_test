---
description: End-to-end Figma → JSON → HTML email pipeline. Usage: /email <desktop-figma-url> <mobile-figma-url> <email-name>
argument-hint: <desktop-url> <mobile-url> <email-name>
allowed-tools: Agent, Task, Skill, Read, Bash, Write
---

# /email

Orchestrate the full email production pipeline end to end.

## Arguments

`$ARGUMENTS` contains three space-separated values:

1. **Desktop Figma URL** — `https://www.figma.com/design/<fileKey>/<name>?node-id=<nodeId>`
2. **Mobile Figma URL** — same shape, mobile frame
3. **Email name** — short kebab-case slug (becomes `emails/<name>/`)

Parse them. If any are missing, halt and tell the user the usage: `/email <desktop-url> <mobile-url> <email-name>`.

Extract from the URLs:
- `fileKey` — path segment after `/design/`
- `desktopFrameNodeId` — `node-id` query param, convert `-` to `:`
- `mobileFrameNodeId` — same from mobile URL

Create the working directory: `mkdir -p emails/<name>/jsx`

## Step 1 — Fetch Figma data (inline, this context)

Invoke the `figma-fetch` skill with:

```
fileKey:            <parsed fileKey>
desktopFrameNodeId: <parsed desktop nodeId>
mobileFrameNodeId:  <parsed mobile nodeId>
name:               <email name>
workDir:            emails/<name>
```

The skill runs in this conversation context where Figma tools are available. It writes:
- `emails/<name>/pre-scan.md`
- `emails/<name>/jsx/desktop-frame.jsx` + `.inlined.jsx`
- `emails/<name>/jsx/mobile-frame.jsx` + `.inlined.jsx`

(If `figma-fetch` fell back to per-section calls because a frame response was truncated, you'll instead see `section-{N}-{desktop|mobile}.jsx` files. The downstream agent handles both layouts.)

Wait for the skill to complete before proceeding.

## Step 2 — Author spec.json (single subagent)

Invoke one `figma-section-extractor` agent via `Task` with:

```
workDir: emails/<name>
```

The agent reads `pre-scan.md` and the two inlined frame JSX files, navigates sections by `data-node-id` boundary, and writes both `plan.md` and the complete `spec.json` in one pass. The post-write hook auto-validates `spec.json`.

Wait for the agent to complete. If validation failed, the agent will have surfaced the errors — re-invoke with the error context if needed.

## Step 3 — Render JSON → HTML

Invoke the `email-renderer` subagent (via `Task` with `subagent_type: "email-renderer"`). Pass it:

- The spec path: `emails/<name>/spec.json`
- The target output path: `emails/<name>/index.html`

Wait for completion. The post-write hook automatically validates `index.html`.

## Step 4 — Final summary

Report:
- Paths to `spec.json` and `index.html`
- Section count + verbatim sections
- Blocking open questions (production must resolve before launch)
- Both validation results

## Notes

- To re-run only the render: invoke `email-renderer` via `Task` directly with the spec path.
- To re-author the spec only: invoke `figma-section-extractor` via `Task` with the workDir.
- To re-fetch Figma data only: invoke the `figma-fetch` skill directly.
- The Tailwind CLI check runs at session start. If it failed, the fetch skill will warn.
