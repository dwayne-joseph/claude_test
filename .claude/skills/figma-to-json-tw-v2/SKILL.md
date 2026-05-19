---
name: figma-to-json-tw-v2
description: Extract any email design from Figma into a structured JSON specification ready for HTML rendering, using the real Tailwind CSS compiler to decode classes (more accurate than hand-decoding). Use this skill whenever the user shares a Figma URL for an email design, asks to "extract this Figma into JSON", wants to convert a Figma email design to a coded format, or needs a structured spec from a Figma file. This is the Tailwind-CLI variant of the figma-to-json family — prefer it when accurate decoding of unusual or arbitrary-value Tailwind classes matters. Works for any industry and any layout — the skill describes what's in the Figma file rather than fitting it to a predefined template. Always use this skill when a Figma email link is the input AND the goal is producing HTML, structured data, or anything downstream of the design — this skill comes first before any coding. The output is one JSON file that the `json-to-html` skill consumes.
---

# figma-to-json-tw

This skill extracts a Figma email design into a structured JSON specification consumed by the `json-to-html` skill. The JSON captures what Figma shows — no predefined module taxonomy. Every email is a sequence of sections made of primitives (image, text, button, list, multi-column, spacer), and the skill adapts to whatever structure the design uses.

## Core principle — Screenshots are the source of truth, data is for precision

The hardest decisions in this skill are visual: is this an overlay or a column? does this row stack on mobile or shrink? is this scaffolding annotation or production content? Earlier versions of this skill treated screenshots as a fallback when JSX got ambiguous — that's backwards. Claude is a vision model; ask it to look first, then use the JSX and resolved CSS to fill in exact pixel values for what it already understands visually.

The flow is therefore:

1. **Look** at screenshots → build visual understanding of the email
2. **Reconcile** with metadata → map what you saw to node IDs
3. **Decode** tokens and CSS → get exact values for what you understand
4. **Decide** all ambiguous calls in one pass → write a plan
5. **Author** JSON mechanically against the plan

## Two roles in this skill

- **`scripts/resolve-tailwind.sh`** does the mechanical Tailwind decoding: runs the real Tailwind CLI over every section's JSX once, then rewrites each `className="..."` as a fully-resolved `style={{...}}` block. The output is an `.inlined.jsx` file per section with every CSS property already computed.
- **Claude** does the visual interpretation and judgment: identifying structural patterns from screenshots, classifying overlays, transcribing verbatim text, naming columns, deciding mobile behavior, locking in decisions in a written plan.

The skill assumes the Tailwind CLI is available at the path resolved by `resolve-tailwind.sh`. If that dependency disappears, the script fails loudly — there is no fallback to inline decoding. If the CLI isn't available, use the original `figma-to-json` skill instead.

## Working directory

Throughout this skill, `{work}` refers to a per-email working directory. On Claude Code locally, use `./emails/{email-name}/`. On the web sandbox, use `/home/claude/{email-name}/`. The final spec is written to `{outputs}/` — locally `./emails/{email-name}/`, on web `/mnt/user-data/outputs/`. Pick the appropriate paths once at the start and use them consistently.

---

## When to use this skill

- User provides a Figma file URL and wants to build an email from it
- User asks to "extract" or "analyze" a Figma email design
- User wants a JSON spec from a Figma file for any downstream use
- Any "figma → email" workflow — this skill comes first, before coding

If the user only wants to read a Figma file (e.g., "what does this design look like?") without producing structured output, this skill is overkill — use the Figma MCP tools directly instead.

---

## Workflow

Six phases. Don't skip them — each catches a class of errors the next can't detect. Visual phases (0, 3a screenshots, 3c plan) feed Claude's judgment. Data phases (1, 2, 3a JSX, 3b) feed precision.

### Phase 0 — Visual scan (MANDATORY, FIRST)

Before any metadata or JSX, **look at the email**. Call `Figma:get_screenshot` on both the desktop frame and the mobile frame at `maxDimension: 1200`. Open both screenshots.

Then narrate, in writing, what you see — this becomes the foundation of the pre-scan file:

- **Section inventory** — number each section top to bottom, give it a working name from what's visible (hero, indications, ISI, etc.). Note any sections that appear on desktop but not mobile (or vice versa) and where decorative shifts happen.
- **Overlapping or decorative elements** — anything that visually sits on top of another element. Note color, position, what it overlays.
- **Verbatim candidates** — sections containing regulated/legal copy (ISI, indications, references, footer legal). These get word-for-word treatment.
- **Mobile differences** — visible at the screenshot level: stacking direction changes, dropped dividers, added backgrounds, resized hero images.
- **Anything that won't render cleanly in email HTML** — gradients, custom fonts in body copy, absolute-positioned overlays, animations.

**This visual narration drives every later phase.** If you can't tell what something is from the screenshot, capture that as an open question now — don't wait until you're staring at JSX.

### Phase 1 — Structural reconciliation

Call `Figma:get_metadata` on both the desktop and mobile frame nodeIds. Use the metadata to map your visual inventory to concrete node IDs:

1. **Pair each visual section to a node.** Match section N in your narration to its node ID at both breakpoints. Confirm 1:1 pairing; if section counts don't match, the visual scan already told you why.
2. **Identify canvas-level siblings.** Nodes sitting OUTSIDE any section but inside the page — bracket frames, overlay bars, registration marks. Classify each as editorial scaffolding (skip in production) or visual overlay (handle per the overlay rule). You already saw these in Phase 0; metadata gives them IDs.
3. **Repeated assets.** Same logo, icon, or image appearing in multiple sections. The JSON references one shared asset rather than duplicating the image primitive.

**Write the pre-scan to disk immediately:**

```bash
mkdir -p {work}
```

Save your Phase 0 narration plus the reconciled node IDs to `{work}/pre-scan.md`. Every later phase reads this file rather than relying on working memory.

Example:

```markdown
# PRE-SCAN — {email-name}

## Frames
- Desktop: 40000030:420 (600×4202)
- Mobile:  40000030:440 (360×5787)

## Sections (14, paired 1:1)
1. Header / logo — desktop 40000030:421 / mobile 40000030:441
   Visual: single 600px row, logo left-aligned. No mobile change.
2. Hero — desktop 40000030:422 / mobile 40000030:442
   Visual: full-width photo. Coral+cyan decorative bars overlay right edge.
   → OVERLAY: bake into image asset. Do not model structurally.
...

## Canvas-level siblings (NOT inside any section)
- 40000030:435 "[ ]" — magenta brackets, overlays section 14
  → Editorial scaffolding, skip in production.
- 40000030:438 "RIGHT Decorative Lines" — coral+cyan bars over hero
  → Visual overlay on section 2. Bake into hero asset.

## Verbatim sections
- section-4 (INDICATIONS), section-11 (ISI), section-12 (References), section-14 (legal footer)

## Repeated assets
- Sanofi logo: header (60×16) + footer (88×24) — same source, different size

## Open questions
- Subject line shows bracketed grammar variants — needs editorial decision
- Hero decorative bars overlay — must be baked into image before production (blocking)
```

Desktop-only elements get `mobile.hide: true` in the JSON later.

### Phase 2 — Design tokens

Call `Figma:get_variable_defs` on both frame nodeIds.

**1. Brand and structural colors.** Hex values mapped to named tokens (`Brand/Primary: #0023C8`). Use these to recognize named colors in resolved CSS.

**2. Scaffolding markers.** Some design teams use saturated out-of-palette colors (neon magenta, hot pink) to flag dynamic content placeholders, MAT/regulatory codes, or editorial annotations. Giveaways:
- Token named `Variable`, `Annotation`, `Placeholder`, `Marker`, `Dynamic`
- Out-of-palette saturated value
- Square-bracket characters `[ ]` rendered in that color in the screenshots from Phase 0

If found, add them to `annotations.stripColors` and (if appropriate) `annotations.recolorMap`. If the design has none, leave those fields empty.

### Phase 3a — Per-section data collection (JSX + per-section screenshot)

Create the data directory:

```bash
mkdir -p {work}/jsx
```

For each section in the pre-scan inventory, in a loop:

1. `Figma:get_design_context(nodeId=<desktop section id>)` → save JSX to `{work}/jsx/section-{N}-desktop.jsx` (omit the trailing `SUPER CRITICAL` instructions Figma appends).
2. `Figma:get_design_context(nodeId=<mobile section id>)` → save to `{work}/jsx/section-{N}-mobile.jsx`. Always fetch both breakpoints.
3. `Figma:get_screenshot(nodeId=<desktop section id>, maxDimension=1200)` → save to `{work}/jsx/section-{N}-desktop.png`.
4. `Figma:get_screenshot(nodeId=<mobile section id>, maxDimension=600)` → save to `{work}/jsx/section-{N}-mobile.png`.

The per-section screenshots are the visual ground truth Claude uses in Phase 3c. The full-email screenshot from Phase 0 was too small to see overlay placement, divider details, or per-section spacing precisely; per-section screenshots are.

**Always call `get_design_context` per section, not per frame.** Per-frame returns are too large and values get averaged or truncated.

Do NOT run `resolve-tailwind.sh` during 3a. Do NOT author any JSON during 3a. Do NOT start the plan during 3a. The only goal is to land every section's JSX + screenshots on disk.

### Phase 3b — Resolve Tailwind (one shell command)

Run the resolver once over the working directory:

```bash
scripts/resolve-tailwind.sh {work}/jsx
```

Produces:
- `{work}/jsx/decoded.css` — Tailwind-resolved stylesheet for every class used
- `{work}/jsx/section-{N}-{breakpoint}.inlined.jsx` — JSX with `className="..."` replaced by `style={{...}}` blocks containing fully-resolved CSS properties

Watch stderr for an `unresolved classes` count. Zero is expected. Any non-zero count: capture each unresolved class as a `meta.openQuestions` entry during planning.

If the script exits non-zero, the Tailwind CLI is unavailable — fall back to the original `figma-to-json` skill.

This is the only time the resolver runs. From here on, only `.inlined.jsx` files are read.

### Phase 3c — Judgment plan (NEW, all decisions in one pass)

**Before authoring any JSON, write a plan.** This phase locks in every interpretive decision in one place, surfaces ambiguity for review, and makes Phase 3d nearly mechanical.

**Read `references/json-format.md` once now** — it defines the exact shape of every primitive. You'll reference it as you plan.

For each section in pre-scan order, write an entry to `{work}/plan.md` covering:

1. **Section identity** — number, name, node IDs, dimensions.
2. **Visual summary (from per-section screenshots)** — one or two sentences describing what the section looks like at each breakpoint. Open the screenshot. This is the visual anchor for every later decision.
3. **Structural pattern** — single-layer (root has bg + padding), intermediate container (outer padding wrapping inner bg + padding), or no-wrapper. Determined from the inlined JSX root carrying `data-node-id="{section id}"`:
   - **Single-layer:** root has both background AND padding. → `section.background` + `section.padding`. Walk root's children as content.
   - **Intermediate container:** root has padding, no background; single child has background and its own padding. → `section.outerPadding` = root's padding, `section.padding` = inner padding, `section.background` = inner background. Walk inner child's children as content.
   - **No wrapper:** root has neither. → leave `section.background` unset and `section.padding` zeroed. Walk root's children as content.
4. **Primitive sequence** — ordered list of primitives the section emits. Mapping from inlined JSX:
   - `<img>` → `image`. Width/height from the parent frame's style; the `<img>` itself usually `width:100%, height:100%`.
   - Text element → `textBlock` preserving text verbatim (special chars, bullets, whitespace).
   - `<a>` with a child whose style has both `background` and `padding` and a `color` → `button`.
   - Repeating bullet+text rows → `list`.
   - `<div>` with `display:flex` (no `flexDirection: column`) and multiple `<div>` children → `multiColumn`.
   - `<br>` or empty vertical gap → `spacer`.
   - Thin colored bar (1px width with bg, or `transform: rotate(90deg)`) between columns → `borderLeft`/`borderRight` on the adjacent column, NOT its own primitive.
5. **Judgment decisions** — explicit answer to every applicable judgment call from the catalog below. State the decision and the basis (screenshot, pre-scan flag, design token, etc.).
6. **Mobile deltas** — what's different at mobile (stacking, hidden elements, width changes). Compared from `section-N-desktop.inlined.jsx` vs `section-N-mobile.inlined.jsx` plus the two screenshots.
7. **Open questions raised by this section** — anything you can't resolve from the available inputs. These go into `meta.openQuestions` later.

Example plan entry:

```markdown
## section-2 — Hero
Nodes: desktop 40000030:422 / mobile 40000030:442 (600×420 / 360×252)

### Visual
Full-width photo, faces visible center-frame. Coral 8px + cyan 16px vertical
bars overlay right edge in Figma. Mobile has no bars visible.

### Structural pattern
Single-layer. Root has background-color #000 and padding 0.

### Primitives
1. image (full width, 600×420 desktop / 360×252 mobile)

### Judgment decisions
- Overlay bars → BAKE INTO IMAGE. Per overlay rule, do not model as multiColumn.
  Add blocking open question: "Bake coral+cyan decorative bars into hero asset
  before launch. Email HTML cannot render absolute overlays reliably."
- Asset URL is figma.com/api/mcp/asset/... (expires 7 days). Capture as-is;
  add the standard production-CDN open question.

### Mobile deltas
- Width: 600 → 360 (proportional). Image expands (fluid hero).
- mobile.preserveWidth: false (this is one of the rare expansion cases).

### Open questions
- Bake decorative bars into asset (blocking: true)
- Replace expiring Figma URL with hosted CDN URL (blocking: true)
```

**The judgment catalog — answer each that applies, per section:**

- **Verbatim?** Was this section flagged in pre-scan? If yes, add to `meta.verbatimSections` and transcribe text word-for-word during 3d.
- **Scaffolding-color runs.** Identify every text run whose color appears in `annotations.stripColors`. Decide for each: (a) bracket character → emit plain, inherit color; (b) editorial label that won't render (e.g., `"Preheader: ["`) → drop the run; (c) real content miscolored in Figma → apply `recolorMap` and emit with the mapped color. Don't leave scaffolding colors to render-time.
- **Inherited colors and fonts.** When `<span>` styles lack `color`/`fontFamily`/`fontWeight`/`lineHeight`, walk the parent chain in the inlined JSX to find the inherited value. Note it in the plan so 3d doesn't re-discover it.
- **Mixed inline formatting.** Identify text blocks with multiple styled `<span>` children (bold, color, size, superscript). Plan a `textBlock` whose `content` array preserves each run in DOM order with its style.
- **fontFamily/fontWeight from Figma's `'Family:Weight'` convention.** Figma fonts resolve to e.g. `fontFamily: "'Arial:Bold',sans-serif"`. Split: `fontFamily: "Arial"`, and convert the weight (Regular/Normal → 400, Medium → 500, SemiBold → 600, Bold → 700, Black → 900). Default 400 if absent.
- **Multi-column naming.** Name every column (`logo-col`, `links-col`, etc.) from `data-name` or a meaningful slug.
- **Multi-gap rows.** A row with three children separated by two gaps has two distinct gap values. Each goes in `gaps[]` with explicit `between` references — never combined.
- **Mobile preservation vs expansion.** Default `mobile.preserveWidth: true`. Only set false for confirmed fluid elements (full-width hero, full-width CTA) — confirm against the mobile screenshot. When in doubt, preserve.
- **Scale-rating / fixed-pixel rows that must fit on mobile.** When a section has N elements of fixed pixel width that won't stack on mobile (1-7 scale, step indicator, nav), check `N × element_width ≤ mobile container width`. If desktop widths don't fit, extract mobile widths from the mobile inlined JSX. If you can't find them, halt and ask the user. Do not guess.
- **Overlay decorations on images.** Per the overlay rule below: model only the base element, add a blocking open question for production to bake the overlay in.
- **Identifier strings in scaffolding color.** Job codes, version stamps, MAT IDs colored as placeholders. Plan as body-color text; add the source color to `recolorMap` if in `stripColors`.
- **Asset URL expiry.** Figma asset URLs expire in 7 days. Plan a single `meta.openQuestions` entry; the URLs themselves get captured verbatim.

**Properties to ignore** (Figma artifacts, no rendering effect): `alignContent: stretch`, `minWidth: 1px`, `position: relative` without absolute children, `overflow: clip/hidden`, `whiteSpace: nowrap` on isolated blocks.

**The overlay rule (always applies):** When a screenshot shows a decorative element overlapping any other element, model only the base element at its full container dimensions and add a `meta.openQuestions` entry with `blocking: true` instructing production to bake the overlay into the source asset before launch. Never model an overlay as an adjacent multi-column sibling — that distorts the underlying image's width and crop. Example:

```json
{
  "id": "hero-decorative-bars-overlay",
  "question": "The right edge of the hero has decorative vertical bars (coral 8px + cyan 16px) overlaying the photo in Figma. Email HTML cannot render this as an overlay. Bake the decorative bars into the exported hero image asset before launch so the photo+bars ship as one image.",
  "blocking": true
}
```

**Section background hygiene.** If a child has the same background as the section, omit it from the child's JSON — don't duplicate.

**Stop and review the plan before 3d.** Skim it end to end. Are all judgment calls answered? Are open questions clearly worded? Are mobile deltas captured? If the plan is incomplete, fix it before authoring JSON — Phase 3d is execution, not interpretation.

### Phase 3d — Author JSON (mechanical execution against the plan)

For each section in plan order:

1. Open the plan entry.
2. Read `{work}/jsx/section-{N}-desktop.inlined.jsx` (and `.mobile.inlined.jsx`). Every `style={{...}}` block is fully resolved CSS — read property values directly, do not re-decode Tailwind.
3. Emit the primitives the plan specifies, in the order it specifies, applying the judgment decisions already recorded. Pull exact values (colors, dimensions, padding, font sizes, line heights) from the inlined JSX.
4. **Per-side padding → JSON object.** Inlined JSX has `paddingTop/Right/Bottom/Left` keys; merge into a single `padding: {top, right, bottom, left}` object. Sides absent default to 0. Same for `border-*`.
5. Append the section to a scratch JSONL:
   ```bash
   echo '{"id":"section-N","name":"...","nodes":[...]}' >> {work}/sections.jsonl
   ```

**Do NOT re-decode Tailwind from the source `.jsx` file.** If you find yourself looking at the source JSX instead of the `.inlined.jsx`, the resolver missed a class — the plan should have already flagged it.

**Do NOT revisit judgment decisions in 3d.** If a decision feels wrong while authoring, stop, go back to 3c, update the plan, then resume. Don't drift mid-section.

### Phase 4 — Compose and validate

Assemble the final JSON from the JSONL scratch file:

```bash
python3 -c "
import json
sections = [json.loads(line) for line in open('{work}/sections.jsonl')]
spec = {
  'specVersion': '2.0.0',
  'meta': { ... },           # from pre-scan + open questions captured in plan
  'annotations': { ... },    # from Phase 2 (stripColors, stripBrackets, recolorMap)
  'sections': sections,
}
json.dump(spec, open('{outputs}/{email-name}-spec.json', 'w'), indent=2)
"
```

See `references/json-format.md` for the exact shape of every field. It is the contract between this skill and `json-to-html`.

Run the validator:

```bash
python3 scripts/validate.py {outputs}/{email-name}-spec.json
```

The validator catches:
- Missing required fields (colors, dimensions, alt text, link aliases)
- Empty `alt` without `decorative: true`
- Multi-column gap references to columns that don't exist
- Multi-column total width exceeding container width on either breakpoint
- Duplicate link aliases (tracking conflict)
- Scaffolding colors leaking into rendered content
- Empty text runs in `verbatimSections`
- Section background inconsistency

**If validation fails, do NOT hand off.** Go back to the plan, identify which section's decisions were wrong, update the plan, re-author the affected sections, re-validate. Only output when the validator passes with zero errors.

Warnings can be addressed at the user's discretion — surface them but don't block.

---

## Do / Don't

| Do | Don't |
|---|---|
| Look at screenshots before reading metadata or JSX | Treat screenshots as a fallback when JSX is ambiguous |
| Write pre-scan and plan to disk | Hold the section inventory or judgment decisions in working memory |
| Lock in all interpretive decisions in Phase 3c | Make judgment calls mid-authoring in 3d |
| Output JSON only | Render HTML — that's the `json-to-html` skill's job |
| Use the section's Figma name as-is | Categorize sections into predefined types ("header", "CTA module") |
| Transcribe verbatim sections word-for-word | Paraphrase or substitute words in `meta.verbatimSections` content |
| Run `resolve-tailwind.sh` once after Phase 3a and read `.inlined.jsx` files for styling | Read raw `.jsx` files for styling, or skip the resolver |
| Flag any unresolved class in `meta.openQuestions` | Drop unresolved classes silently |
| Default to `mobile.preserveWidth: true` | Default to fluid expansion on mobile |
| Capture exactly what Figma shows | Make design decisions (changing colors, adjusting spacing) |

---

## Output

The final deliverable is a single JSON file at `{outputs}/{email-name}-spec.json`.

After producing it, summarize for the user:
- Number of sections found (with their Figma names)
- Number of verbatim sections
- Open questions captured (especially blocking ones)
- Validation result (errors blocked, warnings noted)

Then: **"Pass this JSON to the `json-to-html` skill in a NEW conversation to generate the HTML."** Running both skills in the same chat doubles context load — splitting them keeps each conversation efficient. The plan and pre-scan files in `{work}` are not needed by `json-to-html`; the spec is self-contained.
