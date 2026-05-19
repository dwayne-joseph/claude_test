---
name: figma-fetch
description: Fetch Figma data for an email extraction in a single fast-path discovery batch — screenshots and frame-level JSX in parallel. Runs in the main conversation context where Figma MCP tools are available. Writes pre-scan.md and two inlined frame JSX files to disk for the downstream section-extractor agent.
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

## Execution

### Phase A — Discovery (4 calls in one parallel batch)

Issue all four calls in a single response:

- `get_screenshot(desktopFrameNodeId, maxDimension: 2000)`
- `get_screenshot(mobileFrameNodeId, maxDimension: 2000)`
- `get_design_context(desktopFrameNodeId, forceCode: true, excludeScreenshot: true)`
- `get_design_context(mobileFrameNodeId, forceCode: true, excludeScreenshot: true)`

If the CDN is blocked on screenshots, retry with `enableBase64Response: true` and decode:

```bash
python3 -c "import base64; open('{workDir}/desktop-frame.png','wb').write(base64.b64decode('{b64}'))"
```

Write the JSX to disk:
- Desktop → `{workDir}/jsx/desktop-frame.jsx`
- Mobile → `{workDir}/jsx/mobile-frame.jsx`

Strip the trailing `SUPER CRITICAL` block Figma appends — but **keep the response footer** that lists tokens ("These styles are contained in the design: ..."), component descriptions, and asset URLs. Append that footer as a comment block at the bottom of each `.jsx` file so the section-extractor can read it.

Write `{workDir}/pre-scan.md` from the screenshots + response footers. Cover:

- **Section inventory** — number top to bottom, name each from visual content, note desktop-only / mobile-only. Pair desktop/mobile sections 1:1 by visual order. Section node IDs come from the `data-node-id` attributes you can already see in the JSX (no separate metadata call needed).
- **Verbatim candidates** — ISI, indications, references, legal footer (judgment from screenshots).
- **Overlapping decorative elements** — anything that overlays another section. These become blocking open questions.
- **Mobile differences** — what changes between breakpoints visually.
- **Canvas-level siblings** — scaffolding bracket frames, overlay bars. Classify as editorial scaffolding (skip) or visual overlay (blocking).
- **Design tokens** — copy the full list from the response footer ("Tzield/BrandColor: #0023C8", etc.). Identify scaffolding markers (tokens named `Variable`/`Annotation`/`Placeholder`/`Marker`/`Dynamic`, out-of-palette saturated values, square-bracket characters in those colors). Record `stripColors` and `recolorMap` candidates.

### Phase B — Tailwind resolve

```bash
bash .claude/scripts/resolve-tailwind.sh {workDir}/jsx
```

This produces `{workDir}/jsx/decoded.css` and `desktop-frame.inlined.jsx` + `mobile-frame.inlined.jsx`.

### Fallback — only if a frame response was metadata-only or truncated

If `get_design_context` on a frame returned metadata instead of code (token limit exceeded), parse section node IDs from the metadata response. Then fire all per-section `get_design_context` calls in one parallel response (both breakpoints at once). Write them as `{workDir}/jsx/section-{N}-{desktop|mobile}.jsx` and re-run `resolve-tailwind.sh`. The section-extractor agent can navigate either layout (single frame file or per-section files) using the same `data-node-id` lookup.

## Output

Return a summary:
- Section count (from `data-node-id` count in the frame JSX)
- Verbatim sections (from pre-scan analysis)
- Scaffolding color(s) found
- Open questions raised (especially blocking)
- Whether the fast path or the fallback ran
- Confirmation that pre-scan.md and inlined JSX files are on disk
