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
- `emails/<name>/jsx/section-{N}-desktop.jsx` + `.inlined.jsx` (all sections)
- `emails/<name>/jsx/section-{N}-mobile.jsx` + `.inlined.jsx` (all sections)
- `emails/<name>/sections-manifest.jsonl`

Wait for the skill to complete before proceeding.

## Step 2 — Plan + author JSON (parallel subagents)

Read `emails/<name>/sections-manifest.jsonl`. Spawn one `figma-section-extractor` Agent per section **all in a single response** (parallel). Each agent receives:

```
sectionNumber: <n>
sectionName:   <name>
verbatim:      <true|false>
workDir:       emails/<name>
```

Wait for all agents to complete. Each writes:
- `emails/<name>/section-{N}-plan.md`
- `emails/<name>/section-{N}.jsonl`

If any agent failed to produce its JSONL, re-invoke it with the error context before proceeding.

## Step 3 — Compose spec.json

Assemble `plan.md` from per-section files in order:

```bash
for i in $(seq 1 <N>); do cat emails/<name>/section-$i-plan.md; echo; done > emails/<name>/plan.md
```

Compose `spec.json` — populate `meta` and `annotations` from the `figma-fetch` skill output and `pre-scan.md`:

```bash
python3 -c "
import json, os
work = 'emails/<name>'
n = <section_count>
sections = [json.loads(open(f'{work}/section-{i}.jsonl').read().strip()) for i in range(1, n+1)]
spec = {
  'specVersion': '2.0.0',
  'meta': {
    'emailName': '<name>',
    'generatedAt': '<ISO date>',
    'openQuestions': []
  },
  'annotations': {
    'stripColors': [],
    'recolorMap': {},
    'stripBrackets': True
  },
  'sections': sections,
}
json.dump(spec, open(f'{work}/spec.json', 'w'), indent=2)
"
```

The post-write hook auto-validates `spec.json`. Fix any errors before proceeding.

## Step 4 — Render JSON → HTML

Invoke the `email-renderer` subagent (via `Task` with `subagent_type: "email-renderer"`). Pass it:

- The spec path: `emails/<name>/spec.json`
- The target output path: `emails/<name>/index.html`

Wait for completion. The post-write hook automatically validates `index.html`.

## Step 5 — Final summary

Report:
- Paths to `spec.json` and `index.html`
- Section count + verbatim sections
- Blocking open questions (production must resolve before launch)
- Both validation results

## Notes

- To re-run only the render: invoke `email-renderer` via `Task` directly with the spec path.
- To re-fetch Figma data only: invoke the `figma-fetch` skill directly.
- The Tailwind CLI check runs at session start. If it failed, the fetch skill will warn.
