---
name: figma-section-extractor
description: Extract a single section from a Figma email design into a plan entry and JSONL record. Spawned in parallel by the figma-extractor orchestrator — one instance per section. Calls figma-interpret skill for ambiguous judgment moments.
tools: Read, Write, Bash, Skill, mcp__figma__get_design_context, mcp__figma__get_screenshot
---

# figma-section-extractor

You extract **one section** of a Figma email. The `figma-extractor` orchestrator spawns you in parallel alongside all other section agents. Your job is to go from node IDs → inlined JSX → plan entry → JSONL record.

## Inputs (all provided by the orchestrator)

```
fileKey:         <Figma file key>
sectionNumber:   <N>
desktopNodeId:   <40000000:000>
mobileNodeId:    <40000000:000>
sectionName:     <human name from pre-scan>
verbatim:        <true|false>
needsScreenshot: <true|false>   (true = visually ambiguous, screenshot required)
workDir:         emails/{name}
```

## Step 1 — Fetch JSX

1. `get_design_context(nodeId=<desktopNodeId>)` → write to `{workDir}/jsx/section-{N}-desktop.jsx`. Strip the trailing `SUPER CRITICAL` block Figma appends.
2. `get_design_context(nodeId=<mobileNodeId>)` → write to `{workDir}/jsx/section-{N}-mobile.jsx`. Same stripping.

If `verbatim: true`, you still fetch both JSX files (need background color and dimensions) but skip deep primitive analysis in Step 3.

## Step 2 — Screenshot (only if needsScreenshot: true)

`get_screenshot(nodeId=<desktopNodeId>, maxDimension=800)` — inspect in context only; do NOT write the PNG to disk unless it materially changes a judgment decision you couldn't make from JSX alone.

If CDN is blocked, add `enableBase64Response: true`.

## Step 3 — Resolve Tailwind (isolated temp dir)

Run the Tailwind resolver in an isolated temp directory to avoid race conditions with sibling section agents writing to the same `jsx/` folder:

```bash
TMPDIR=$(mktemp -d)
cp {workDir}/jsx/section-{N}-desktop.jsx "$TMPDIR/"
cp {workDir}/jsx/section-{N}-mobile.jsx "$TMPDIR/"
bash .claude/scripts/resolve-tailwind.sh "$TMPDIR"
cp "$TMPDIR/section-{N}-desktop.inlined.jsx" {workDir}/jsx/
cp "$TMPDIR/section-{N}-mobile.inlined.jsx" {workDir}/jsx/
rm -rf "$TMPDIR"
```

From this point, read only the `.inlined.jsx` files — never re-decode Tailwind from source.

## Step 4 — Plan entry

Write `{workDir}/section-{N}-plan.md`. Include:

1. **Section identity** — number, name, node IDs, desktop + mobile dimensions (from JSX root style).
2. **Visual summary** — 1–2 sentences at each breakpoint, derived from the inlined JSX. If `needsScreenshot` was true, incorporate what you saw.
3. **Structural pattern** — single-layer (root has bg + padding), intermediate container (outer padding wrapping inner bg + padding), or no-wrapper. Read from inlined JSX root `data-node-id="{sectionNodeId}"`.
4. **Primitive sequence** — ordered list with type mapping:
   - `<img>` → `image`
   - text element → `textBlock`
   - `<a>` with background + padding + color child → `button`
   - repeating bullet+text rows → `list`
   - `<div style="display:flex">` (no `flexDirection:column`) with multiple `<div>` children → `multiColumn`
   - `<br>` or empty vertical gap → `spacer`
   - thin colored bar between columns → `borderLeft`/`borderRight` on the adjacent column, not its own primitive
5. **Judgment decisions** — explicit answer to each applicable call. When unsure, call `figma-interpret` skill with a focused question and record the returned rule here. Batch all questions into **one skill call** per section — do not call the skill multiple times.
6. **Mobile deltas** — differences between desktop and mobile inlined JSX.
7. **Open questions** — anything unresolvable. Will land in `meta.openQuestions`.

**Always-apply rules (no skill call needed):**
- **Overlay rule.** Decorative element overlapping another → model only the base element at full container dimensions; add a blocking open question to bake the overlay into the source asset.
- **Section background hygiene.** Child with same background as section → omit from child's JSON.
- **Figma artifacts.** `alignContent: stretch`, `minWidth: 1px`, `position: relative` without absolute children, `overflow: clip/hidden`, `whiteSpace: nowrap` on isolated blocks → ignore.
- **Default `mobile.preserveWidth: true`.** Only `false` for confirmed fluid elements (full-width hero, full-width CTA).

**If `verbatim: true`:** Write a short plan entry: identity, background color, dimensions, verbatim flag. No primitive sequence needed — the renderer handles verbatim sections directly.

## Step 5 — Author JSONL record

Read the plan entry you just wrote. Emit the section's JSON record:

```bash
echo '<json>' > {workDir}/section-{N}.jsonl
```

Write to `section-{N}.jsonl` (not `sections.jsonl` — the orchestrator concatenates in order). One line, valid JSON.

Pull all property values directly from the inlined JSX `style={{...}}` blocks. Per-side padding → merge into `{top, right, bottom, left}`.

If `verbatim: true`, emit:
```json
{"id":"section-N","name":"...","desktopNodeId":"...","mobileNodeId":"...","verbatim":true,"background":"#XXXXXX","padding":{"top":0,"right":0,"bottom":0,"left":0},"nodes":[]}
```

## Output

Return a one-paragraph summary:
- Section number + name
- Primitive count (or "verbatim")
- Any open questions raised (especially blocking ones)
- Whether a figma-interpret call was needed and what it resolved
