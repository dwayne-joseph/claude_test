# Plan — Tzield_Test_V1

Section-by-section authoring plan. 14 stacked sections, 1:1 desktop/mobile pairing. All padding values come directly from the inlined frame JSX `style={{...}}` blocks.

Two canvas-level overlays (`40000030:435`/`:454` "[ ]" scaffolding wrapper, and `40000030:438`+`:439` / `40000030:458`+`:459` RIGHT Decorative Lines) are NOT modeled as sections — they're absolute siblings of the section stack. The "[ ]" overlay is scaffolding (skip). The Decorative Lines are flagged as a blocking open question; pre-scan recommendation is to render as positioned art on the hero on both breakpoints. Not modeled into JSON until design confirms.

## Always-apply rules applied throughout

- Strip the `[` and `]` bracket characters that are wrapped in `#FF00B7` (token "Variable"). Their inner content survives unless the bracket wraps a known true placeholder (e.g. "Press release pending").
- Strip the entire §1 metadata block (whole section is scaffolding).
- Recolor `#FF00B7` → `#414042` ONLY where the pink text is real production content (the MAT code in §14, and the year "2025." inside §12 item 1).
- Ignore Figma artifacts: `alignContent: stretch`, `minWidth: 1px`, `position: relative` without absolute children, `overflow: clip/hidden`, `whiteSpace: nowrap` on isolated blocks.
- Mobile preserveWidth defaults to true unless explicitly fluid (full-width hero §7, full-width CTA button §10).
- Section background hygiene applied (don't repeat parent bg on children).

## §1 — Subject/From metadata (scaffolding)
- Desktop `40000030:421`, mobile `40000030:441`. Desktop 600 px row, mobile 360 px.
- Background: `#FFFFFF` (frame default).
- **Entire section is scaffolding (all `#FF00B7`).** Per pre-scan, skip from production. Modeled as a placeholder section so order is preserved, but `nodes: []` and `skipped: true` is not required — pre-scan says "Skip from production." We will render this as a section with empty nodes (background only, zero-padding) so downstream renderer drops it, OR per the strip-colors annotation, we render the whole section as nothing. Decision: include section shell with empty nodes; renderer treats an empty section as a no-op.

## §2 — Preheader
- Desktop `40000030:422`, mobile `40000030:442`. Padding `{12,24,12,24}`. Background `#E4EEF7`.
- Single primitive: `textBlock`. Content: "Learn about this treatment option for your patients." (bracket wrappers + "Preheader: " label stripped). Color `#414042`, size 16/20.

## §3 — Utility links
- Desktop `40000030:423`, mobile `40000030:443`. Padding `{12,24,12,24}`. Background `#E4EEF7`.
- Single `textBlock` with three underlined link spans separated by `|`. Color `#0023C8`, size 16/20, underline on each link.
- Text: "View in browser | Contact a Rep | Unsubscribe" (preserve spacing as in JSX).

## §4 — Header module
- Desktop `40000030:424`, mobile `40000030:444`. Section root padding `{14,0,12,0}` (`paddingTop:14, paddingBottom:12`). Background `#FFFFFF`.
- Structural pattern: composite. Multiple stacked inner blocks at section level. Sequence:
  1. `image` — Sanofi logo (60×16, right-aligned via container padding-right 10px). Asset `imgGroup2809` masked by `imgGroup2808`.
  2. `spacer` separator: 4 px solid `#FF5000` divider (full width). Modeled as a `spacer` with `borderTop`/`backgroundColor` 4 px `#FF5000`, or as an `image`-style horizontal-rule primitive. Use `divider` style spacer: `{type:"spacer", height:4, background:"#FF5000"}`.
  3. `multiColumn` (desktop) / stacked (mobile) — Tzield product logo (214×90 image) + PI links text block. Desktop has rotated stroke separator between them; mobile drops it (per OQ#6, desktop-only ornamentation). Inner padding on this container is `24px` all sides; pad-bottom 24 for the row.
     - Left col: `image` 214×90 (`imgFrame12`).
     - Right col: `textBlock` linked text — "Read Indication and / Full Prescribing Information" (line 1), blank line, "Full Prescribing Information, including boxed WARNING" — color `#0023C8`, size 16/18, with underline spans on the link phrases.
  4. `textBlock` — "INDICATIONS" heading, bold, color `#0023C8`, size 19/23. Container padding `{0,24,24,24}`.
  5. `textBlock` — Indications body with bulleted list (use `list` primitive):
     - Intro: "TZIELD is a disease-modifying agent that preserves beta-cell function indicated:"
     - Bullet 1: "to delay the onset of Stage 3 type 1 diabetes (T1D) in adults and pediatric patients aged 8 years and older with Stage 2 T1D."
     - Bullet 2: "to delay the progression of Stage 3 T1D in adults and pediatric patients 8 years and older recently diagnosed with Stage 3 T1D. This indication is approved under accelerated approval based on C-peptide as a marker of beta-cell preservation. Continued approval for this indication may be contingent upon verification and description of clinical benefit in confirmatory trials."
     - Color `#414042`, size 16/20.
- Mobile delta: logo + PI-links stacks (column instead of row), stroke separator dropped.

## §5 — Sub-header band "[NEW INDICATION] FOR APPROPRIATE PATIENTS¹"
- Desktop `40000030:425`, mobile `40000030:445`. Padding `{12,24,12,24}`. Background `#06537B` (teal).
- Single `textBlock`, centered, bold Arial, 30 px:
  - "NEW INDICATION" (color `#E4EEF7`) + " FOR APPROPRIATE PATIENTS" (color `#E4EEF7`) + superscript "1" (size 19.35).
  - Strip surrounding `[` and `]` (pink). Per pre-scan, bracket characters always stripped.
- Mobile cosmetic delta (light-blue space char) ignored.

## §6 — Body band — CNPV paragraph
- Desktop `40000030:426`, mobile `40000030:446`. Padding `{12,24,12,24}`. Background `#0023C8`.
- Single `textBlock`, color `#FFFFFF`, size 19/23, Arial Regular:
  - "Due to the significant unmet need in T1D and years of clinical research, TZIELD has been approved for patients with Stage 3 T1D within 6-12 weeks of diagnosis as the first therapy under the FDA's Commissioner National Priority Voucher (CNPV) program." + superscript "2" (12.255).
  - Strip pink `[` and `]` around "6-12 weeks".

## §7 — Hero image
- Desktop `40000030:427`, mobile `40000030:447`. Section root padding `{12,0,12,0}`. Background inherits `#FFFFFF`.
- Single `image` primitive, full-width, 300 px tall (desktop), 312 px (mobile container ht). Asset `imgFrame` (`c79af7b0-…`).
- Mobile preserveWidth: false (fluid hero).
- Mobile crop differential (OQ#8) flagged — model as the same asset; renderer can swap with `media` later.

## §8 — Continuum heading + 2 stage rows
- Desktop `40000030:428`, mobile `40000030:448`. Section root padding `{12,0,12,0}`. gap 24. Background `#FFFFFF`.
- Children:
  1. `textBlock` heading, centered, bold `#0023C8` 30/34: "TZIELD has expanded across the following stages of the T1D disease continuum" + superscript "1" (19.35). Inner container padding `{0,24,0,24}`.
  2. `multiColumn` Stage 1 row (desktop row / mobile column):
     - Left: `image` 110×110 — orange checkmark badge (composed of `imgRectangle` + `imgOval`).
     - Right: `textBlock` bold `#414042` 20/28: "APPROVED in Stage 2 T1D".
     - Container padding `24`.
  3. `multiColumn` Stage 2 row:
     - Left: `image` 110×110 — second badge (`imgRectangle` + `imgOval1`). The empty pink "p" overlay (zero-width content) is the Figma scaffolding-marker artifact — skip.
     - Right: `textBlock` bold `#414042` 20/28: "NOW APPROVED in Stage 3 T1D within 6-12 weeks of diagnosis" (bracket chars stripped from "[NOW]" and "[6-12 weeks]").
- Mobile delta: stage rows stack `flex-col` (badge above text).

## §9 — Acronym footnote
- Desktop `40000030:429`, mobile `40000030:449`. Padding `{12,24,12,24}`. Background `#FFFFFF`.
- Single `textBlock`: "T1D=type 1 diabetes." (color `#414042`, 19/23).

## §10 — CTA band
- Desktop `40000030:430`, mobile `40000030:450`. Padding `{12,24,12,24}`. gap 24. Background `#E4EEF7`.
- Children:
  1. `textBlock` centered, 19/23, color `#000000`: "Learn more about the new indication" (pink `[` `]` around "new" stripped; word "new" survives).
  2. `button`:
     - Desktop 444×88; mobile 204×98. Background `#0023C8`, border 4 px `#80CBFF`, color `#FFFFFF`, text "Discover More" (Arial Bold 20/24, centered).
     - Mobile preserveWidth: false (CTA is fluid-ish, but per default keep true unless explicitly fluid — pre-scan flags hero + CTA as fluid candidates; use false here).

## §11 — ISI module (VERBATIM)
- Desktop `40000030:431`, mobile `40000030:451`. Padding `{12,24,12,24}`. gap 24. Background `#FFFFFF`.
- `verbatim: true`. No primitive sequence required.

## §12 — References (VERBATIM)
- Desktop `40000030:432`, mobile `40000030:452`. Padding `{12,24,12,24}`. gap 24. Background `#FFFFFF`.
- `verbatim: true`. Renderer treats inline `#FF00B7` brackets per stripColors/recolorMap annotations (strip brackets; the year "2025." survives via recolor to `#414042`).

## §13 — CXQ survey
- Desktop `40000030:433`, mobile `40000030:453`. Section root padding `{12,0,12,0}`. Background `#FFFFFF` (outer) → inner survey container background `#F2F2F2`, padding 24, gap 10.
- Structural pattern: intermediate container — outer section is white with vertical padding, inner block is the gray CXQ panel.
- Children of the inner panel:
  1. `textBlock` centered `#414042` 16/20: "Your feedback is important to us. To help us improve our offering, you are invited to respond to the question below and complete a short survey."
  2. `textBlock` centered bold `#000000` 19/22: "How relevant is the content of this email to you?" (mobile inserts a `<br>` between "this" and "email"; preserved as a soft line break in plan but the renderer can decide).
  3. `multiColumn` with two labels space-between: "Not relevant" / "Very relevant" (Arial Bold 19/22, `#000000`).
  4. `multiColumn` with 7 rating cells space-between. Desktop 72×48, mobile 40×40. Cells 1,3-7: white bg with `#707070` 1 px border, dark text. Cell 2: `#979797` bg with white text (pre-filled). Modeled as `list`/`multiColumn` of small button-like primitives.
- Per OQ#5: production likely ships all-white cells, but pre-scan models what Figma actually shows. Keep cell 2 pre-filled in spec; renderer/copy review will revise.

## §14 — Footer (VERBATIM)
- Desktop `40000030:434`, mobile `40000030:457`. Padding `{12,24,12,24}`. Background `#FFFFFF`.
- `verbatim: true`. Pink MAT code (`MAT-US-2510989-v1.0-10/2025`) is real production content → recolored via `recolorMap` to `#414042`.

## Email-wide open questions (→ meta.openQuestions)

1. Decorative Lines overlay (`40000030:438`/`:439` desktop, `40000030:458`/`:459` mobile) — render as positioned art on the hero on both breakpoints, or drop entirely? Pre-scan recommends rendering on hero. Blocking.
2. CXQ "[ ]" bracket overlay (`40000030:435` desktop, `40000030:454` mobile) — confirmed editorial scaffolding; will not render. Confirm.
3. §12 References dynamic tokens — "[2025.]" (year, keep "2025.") and "[Press release pending]" (full placeholder, drop entire bracketed string from production until citation lands). Blocking copy-review.
4. §1 Subject/From metadata — confirm entire section is build-time scaffolding (ESP routing). Pre-scan treats §1 as skipped/empty.
5. CXQ pre-filled cell 2 — production likely ships all-white cells. Confirm with stakeholder.
6. §4 mobile stroke separator dropped between Tzield logo and PI-links — desktop-only ornamentation (non-blocking).
7. §11 ISI link block split — render two separate `<p>` paragraphs in production HTML for "Please see full Prescribing Information…" and the counterfeit-drugs link (non-blocking, matches mobile layout).
8. §7 Hero crop differential — mobile uses zoom/offset on the same asset; flag for image team to provide a mobile-cropped asset (non-blocking).

## Scaffolding tokens

- `annotations.stripBrackets`: true (strip `[` and `]` characters that are colored `#FF00B7`).
- `annotations.stripColors`: `["#FF00B7"]` — entire §1 metadata block + all bracket-wrapper characters.
- `annotations.recolorMap`: `{"#FF00B7": "#414042"}` — for pink text that is real production content (MAT code in §14, "2025." in §12).

Judgment was clear from pre-scan and inlined JSX; no `figma-interpret` skill call needed.
