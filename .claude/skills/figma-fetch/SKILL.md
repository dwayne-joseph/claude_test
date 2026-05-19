---
name: figma-fetch
description: Fetch all Figma data for an email extraction — screenshots, metadata, variable defs, per-section JSX, and Tailwind inlining. Runs in the main conversation context where Figma MCP tools are available. Writes all files to disk and produces a sections-manifest.jsonl for downstream section subagents.
---

# figma-fetch

You are being invoked in the main conversation context. Figma MCP tools are available here — call them directly without any setup checks.

## Inputs (provided by the caller in the invocation message)

```
fileKey:            <Figma file key>
desktopFrameNodeId: <e.g. 40000030:420>
mobileFrameNodeId:  <e.g. 40000030:440>
name:               <email slug>
workDir:            emails/{name}
```

## Execution — run these phases in order

### Phase 0 — Screenshots

Call `get_screenshot` on the desktop frame and mobile frame **in parallel** (both in the same response). Use `maxDimension: 2000`. If the CDN is blocked, add `enableBase64Response: true` and decode:

```bash
python3 -c "import base64; open('{workDir}/desktop-frame.png','wb').write(base64.b64decode('{b64}'))"
```

Write `{workDir}/pre-scan.md` with:
- Section inventory (number top to bottom, name each, note desktop-only / mobile-only)
- Overlapping decorative elements
- Verbatim candidates (ISI, indications, references, legal footer)
- Mobile differences visible from screenshots
- Canvas-level siblings (scaffolding bracket frames, overlay bars)

### Phase 1 — Metadata

Call `get_metadata` on the desktop frame and mobile frame **in parallel**.

1. Pair each visual section to its node ID at both breakpoints. Confirm 1:1.
2. Identify any mobile-only or desktop-only sections.
3. Identify canvas-level siblings — classify as editorial scaffolding (skip) or visual overlay (blocking open question).

Append the node ID table to `{workDir}/pre-scan.md`.

### Phase 2 — Design tokens

Call `get_variable_defs` on both frames **in parallel**.

Identify scaffolding markers: tokens named `Variable`/`Annotation`/`Placeholder`/`Marker`/`Dynamic`, out-of-palette saturated values, square-bracket characters in those colors. Record `stripColors` and `recolorMap` candidates. Append findings to `{workDir}/pre-scan.md`.

### Phase 3a — Per-section JSX

For each section, call `get_design_context` on the desktop node and mobile node **in the same response** (parallel pair). Work section by section — issue both calls together, write both files, then move to the next section.

- Desktop → `{workDir}/jsx/section-{N}-desktop.jsx`
- Mobile → `{workDir}/jsx/section-{N}-mobile.jsx`

Strip the trailing `SUPER CRITICAL` block Figma appends to each response.

### Phase 3b — Resolve Tailwind

```bash
bash .claude/scripts/resolve-tailwind.sh {workDir}/jsx
```

This produces `{workDir}/jsx/decoded.css` and one `.inlined.jsx` per source `.jsx`.

### Phase 3c — Write sections manifest

Write `{workDir}/sections-manifest.jsonl` — one JSON line per section, in section order:

```
{"n":1,"name":"Envelope metadata","desktopNodeId":"40000030:421","mobileNodeId":"40000030:441","verbatim":false}
{"n":2,"name":"Preheader","desktopNodeId":"40000030:422","mobileNodeId":"40000030:442","verbatim":false}
...
```

Set `verbatim: true` for sections containing regulated/legal copy (ISI, indications, references, legal footer).

## Output

Return a summary:
- Section count
- Verbatim sections
- Scaffolding color(s) found
- Any open questions (especially blocking ones)
- Confirmation that all JSX + inlined JSX files are on disk
