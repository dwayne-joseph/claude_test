# Plan: Tzield_V1_Test

Desktop container: 600px. Mobile container: 360px.
Frame: desktop `40000030:420`, mobile `40000030:440`.

---

## Section 1 — CONTENT MODULES (From/To/Date/Subject)

**Identity:** section-1, desktop node `40000030:421`, mobile node `40000030:441`.
Desktop: 600px wide, padding 24/24/12/12 (L/R/T/B). Mobile: 360px wide, same padding.

**Visual summary:** Editorial scaffolding block showing From/To/Date/Subject fields for proof review. Entire text is in `#FF00B7` with inline `#414042` body text runs for the actual subject line copy. No background color on the section root.

**Structural pattern:** Single-layer. Root `40000030:421` carries padding, no background.

**Primitive sequence:** One textBlock. All text in `#FF00B7` except the body-color runs for the actual subject copy. This entire section is editorial scaffolding (proof header for stakeholder review; not rendered in production HTML).

**Mobile deltas:** Identical structure, same text.

**Judgment decision:** This is the editorial From/To/Date/Subject preview block — confirm with brand to skip in production. Mark `skipInProduction: true` per industry standard. Content rendered verbatim per scaffolding strip rules.

---

## Section 2 — PREHEADER MODULES (Preheader line)

**Identity:** section-2, desktop node `40000030:422`, mobile node `40000030:442`.
Desktop: 600px wide, padding 24/24/12/12. Mobile: 360px fluid, same padding.

**Visual summary:** Light-blue `#E4EEF7` band. Text: "Preheader: [Learn about this treatment option for your patients.]" — "Preheader: [" and "]" in `#FF00B7` scaffolding color, inner text in `#414042`.

**Structural pattern:** Single-layer. Root carries `backgroundColor: #E4EEF7` and padding.

**Primitive sequence:** One textBlock. Inner copy: "Learn about this treatment option for your patients." Color `#414042`, fontSize 16, lineHeight 20. The "Preheader: [" prefix and trailing "]" are scaffolding markers (stripped).

**Mobile deltas:** Identical.

**Judgment decision:** Preheader label and brackets are scaffolding — strip in production. The actual preheader text ("Learn about this treatment option for your patients.") becomes the hidden preheader span in the email `<head>` / first row. Model this section as a preheader display row (visible in Figma template only).

---

## Section 3 — PREHEADER MODULES (Header utility links)

**Identity:** section-3, desktop node `40000030:423`, mobile node `40000030:443`.
Desktop: 600px wide, padding 24/24/12/12. Mobile: 360px wide, same padding.

**Visual summary:** Light-blue `#E4EEF7` band. Three underlined links in `#0023C8`: "View in browser | Contact a Rep | Unsubscribe". Pipe separators in `#414042`.

**Structural pattern:** Single-layer. Root carries `backgroundColor: #E4EEF7`, padding.

**Primitive sequence:** One textBlock. Text runs: "View in browser" (underline, link), " " (space), "|" (#414042), " ", "Contact a Rep" (underline, link), "|" (#414042), " ", "Unsubscribe" (underline, link). Font: Arial Regular, 16px, lineHeight 20.

**Mobile deltas:** Identical structure and text.

---

## Section 4 — HEADER MODULES (Sanofi logo + ISI link block + INDICATIONS)

**Identity:** section-4, desktop node `40000030:424`, mobile node `40000030:444`.
Desktop: 600px, paddingTop 14, paddingBottom 12. Mobile: 360px same.

**Visual summary (desktop):** Sanofi logo top-right (60×16px). Coral 4px divider line (full width). Below: 2-column row — left col: Tzield logo image (214×90px); right col: vertical stroke image + PI links text (201px wide). Then INDICATIONS heading + 2-bullet body text below.

**Visual summary (mobile):** Logo stacked above PI links (no stroke). Same INDICATIONS heading + bullets below. `flexDirection: column` on the logo+links container.

**Structural pattern:** No-wrapper. Root `40000030:424` carries padding only, no background.

**Primitive sequence:**
1. `image` — Sanofi logo (imgGroup2809 with imgGroup2808 mask), width 60, height 16. Top-right aligned.
2. Coral divider — thin `#FF5000` 4px tall strip, full width. Model as a section-level decoration (part of the section's bottom or a standalone `spacer` with background). Since it's a colored bar, it's modeled as an `image` with a 600×4 coral fill, OR better as a `multiColumn` single row with no content... Actually, in the JSON spec a thin colored bar is "expressed as a section's `<td bgcolor>`" — not a standalone primitive. In this case the bar is within the section, separating Sanofi logo from the Tzield logo+links. Model as a `spacer` with a note, OR since it's a defined visual element within the section, model as a `textBlock` with height 0 and no content with a background... The cleanest option per spec: model it as a thin image (a 1-pixel coral strip that scales to full width). But there's no explicit primitive for horizontal dividers within sections. Use a dedicated `image` placeholder for the coral bar.
3. `multiColumn` — 2 columns: left = Tzield logo (imgFrame12, 214×90), right = PI links (textBlock, 201px wide). Desktop: side-by-side with 50px gap. Mobile: stacked, no stroke.
4. `textBlock` — "INDICATIONS" heading, bold, 19px, `#0023C8`, lineHeight 23, padding 24/24/0/24 (T/R/B/L) (paddingBottom: 24).
5. `list` — 2-bullet INDICATIONS copy, 16px, `#414042`, lineHeight 20.

**Mobile deltas:** Logo+links column container switches to `flexDirection: column` — the multiColumn stacks. On mobile the vertical stroke (imgStorke) is absent (not in mobile JSX). Mobile PI links column has no stroke image.

**Judgment decision:** The vertical stroke in the header (desktop) is an `img` inside the right column container. On mobile it's absent. Model the stroke column as part of the multiColumn but use `mobile.hide: true` on the stroke column, OR model the right column content without the stroke (since in HTML the stroke would be a `borderLeft` on the PI column). Use `borderLeft` on the PI-links column (desktop only, `hideOnMobile: true`). The Sanofi logo at top uses a CSS mask-image technique — model as an `image` primitive (the visible rendered image is `imgGroup2809`, the mask is a Figma artifact — use the rendered image URL as `src`).

The coral 4px divider is a `<div style={{backgroundColor: "#FF5000", height: "4px", width: "100%"}}/>`. Since it's a visual separator within the section (not between sections), model it as an `image` with a transparent placeholder and an open question to supply a 1×4 coral pixel image — OR just use a `spacer` with an overriding note. Best practice: treat it as a decorative `image` (`src` placeholder, width 600, height 4, decorative: true) but actually a thin solid-color bar in email is usually coded as a `<td bgcolor>` row. Since it's within the section, model as a `textBlock` with zero fontSize and a background... Not clean. Decision: model as an `image` primitive with a placeholder src and note it needs a 1px coral GIF. This is a common email pattern.

---

## Section 5 — CONTENT MODULES ([NEW INDICATION] headline)

**Identity:** section-5, desktop node `40000030:425`, mobile node `40000030:445`.
Desktop: 600px, bg `#06537B`, padding 24/24/12/12.

**Visual summary:** Dark teal band. Bold text "NEW INDICATION FOR APPROPRIATE PATIENTS¹" in `#E4EEF7` (light blue). Brackets `[` `]` around "NEW INDICATION" are in `#FF00B7` scaffolding color — strip in production.

**Structural pattern:** Single-layer. Root carries `backgroundColor: #06537B`, padding.

**Primitive sequence:** One textBlock. Content: "[NEW INDICATION] FOR APPROPRIATE PATIENTS¹". FontFamily Arial Bold, 30px, lineHeight normal (use 36px as typical 1.2× for 30px). Color `#E4EEF7`. Superscript "1". The `#FF00B7` bracket spans are scaffolding and stripped; "NEW INDICATION" renders in surrounding `#E4EEF7` color.

**Mobile deltas:** Identical structure. Same text.

---

## Section 6 — CONTENT MODULES (CNPV approval body)

**Identity:** section-6, desktop node `40000030:426`, mobile node `40000030:446`.
Desktop: 600px, bg `#0023C8`, padding 24/24/12/12.

**Visual summary:** Brand blue band. White body text with "6-12 weeks" bracketed in `#FF00B7` scaffolding. Superscript "2". Text: "Due to the significant unmet need in T1D and years of clinical research, TZIELD has been approved for patients with Stage 3 T1D within [6-12 weeks] of diagnosis as the first therapy under the FDA's Commissioner National Priority Voucher (CNPV) program.²"

**Structural pattern:** Single-layer. Root carries `backgroundColor: #0023C8`, padding.

**Primitive sequence:** One textBlock. FontFamily Arial Regular, 19px, lineHeight 23, color `#FFFFFF`. Superscript "2" at 12.255px.

**Mobile deltas:** Desktop: text color `#FFFFFF` on the `<p>` root. Mobile: `<p>` color is `#414042` but individual spans override with `#FFFFFF` — functionally identical white text on blue background.

---

## Section 7 — HERO MODULES (Patient image)

**Identity:** section-7, desktop node `40000030:427`, mobile node `40000030:447`.
Desktop: 600px wide, 300px tall hero + 12/12 top/bottom padding on section.
Mobile: 360px wide, 312px total section height (300px image + 12/12 padding).

**Visual summary:** Full-width hero photo of a young patient outdoors. On desktop the image fills 600×300 via `objectFit: cover`. On mobile the image is scaled 137% with negative offsets to fill the narrower 360px frame. Decorative Lines overlay (coral+blue vertical bands) positioned absolute at right edge — production element but must be baked into the hero image asset.

**Structural pattern:** Single-layer. Root carries padding top/bottom 12 only.

**Primitive sequence:** One `image` — imgFrame (desktop) / imgFrame (mobile, different asset URL). Width 600, height 300. Decorative Lines overlay: per pre-scan, must be baked into the hero image. Open question remains.

**Mobile deltas:** Different asset (mobile crop). Image dims 300×300 in frame, scaled to fill.

**Overlay rule applied:** Decorative Lines (RIGHT Decorative Lines, node `40000030:438`) are positioned absolute over the hero. These are confirmed production visual elements (not scaffolding). They must be baked into the hero image asset for email rendering — open question #5 from pre-scan.

---

## Section 8 — CONTENT MODULES (Stage continuum block)

**Identity:** section-8, desktop node `40000030:428`, mobile node `40000030:448`.
Desktop: 600px, padding 12/0/12/0 on root. Mobile: 360px, same.

**Visual summary (desktop):** Heading "TZIELD has expanded across the following stages of the T1D disease continuum¹" (bold, 30px, `#0023C8`) centered. Then two horizontal rows: each row has a 110×110px icon (circular image) left and bold text right. Row 1: "APPROVED in Stage 2 T1D". Row 2: "NOW APPROVED in Stage 3 T1D within 6-12 weeks of diagnosis" (with `#FF00B7` brackets around "NOW" and "6-12 weeks" stripped in production).

**Visual summary (mobile):** Same heading. But each row flips to vertical (stacked) — icon centered above text, within a white panel. Both icon+text rows wrapped in `bg-#FFFFFF` containers on mobile.

**Structural pattern:** Root has padding only. Inner elements have overflow/padding.

**Primitive sequence:**
1. `textBlock` — "TZIELD has expanded across the following stages of the T1D disease continuum¹". Bold, 30px, lineHeight 34, `#0023C8`, padding 0/24/0/24.
2. `multiColumn` (row 1) — left: image (imgRectangle + imgOval composited = icon 110×110), right: textBlock "APPROVED in Stage 2 T1D". Bold 20px, `#414042`, lineHeight 28. Padding on the row container: 24 all sides.
3. `multiColumn` (row 2) — left: image (same icon with imgOval1), right: textBlock "NOW APPROVED in Stage 3 T1D within 6-12 weeks of diagnosis". Bold 20px, `#414042`, lineHeight 28. Padding: 24 all sides.

**Mobile deltas:** On mobile, the multiColumn rows switch to stacked layout (icon centered above text). The icon and text containers have `flexDirection: column`. Each row gets a white background panel on mobile. Use `mobileLayout: "stack"` on each multiColumn.

**Judgment decision:** The icon images are composited (imgRectangle background + imgOval checkmark overlay). These are within a 110×110 overflow:clip container — they render as a single visual icon. Model each as a single `image` primitive with `src` from the first image URL (imgRectangle for row 1) and note that a composited asset URL is needed. Actually both images are part of the same visual icon — model each icon as an `image` with width/height 110. The second image in each frame is the oval overlay but since email can't layer images, these must be composited. Open question: need composited icon images for rows 1 and 2.

The `#FF00B7` brackets around "NOW" and "6-12 weeks" are stripped; text renders in surrounding `#414042` color.

---

## Section 9 — CONTENT MODULES (Definitions)

**Identity:** section-9, desktop node `40000030:429`, mobile node `40000030:449`.
Desktop: 600px, no background, padding 24/24/12/12.

**Visual summary:** Single line: "T1D=type 1 diabetes." in `#414042`, 19px, lineHeight 23.

**Structural pattern:** Single-layer. No background.

**Primitive sequence:** One textBlock.

**Mobile deltas:** Identical.

---

## Section 10 — CONTENT MODULES (Sub-CTA + button)

**Identity:** section-10, desktop node `40000030:430`, mobile node `40000030:450`.
Desktop: 600px, bg `#E4EEF7`, padding 24/24/12/12.

**Visual summary:** Light-blue band. Centered text "Learn more about the [new] indication" (`#000000`, 19px) with `#FF00B7` brackets around "new" stripped in production. Below: "Discover More" button — `#0023C8` fill, `#80CBFF` 4px border, white bold text, 444×88px desktop, 204×98px mobile.

**Structural pattern:** Single-layer. Root carries `backgroundColor: #E4EEF7`, padding.

**Primitive sequence:**
1. textBlock — "Learn more about the new indication". Color `#000000`, 19px, lineHeight 23, centered.
2. button — "Discover More", bg `#0023C8`, border 4px `#80CBFF`, white text, 444×88, bold 20px. Mobile: 204×98.

**Mobile deltas:** Button width 204, height 98. Text wrapper width 193px.

---

## Section 11 — ISI MODULE (Important Safety Information)

**Identity:** section-11, desktop node `40000030:431`, mobile node `40000030:451`.
Desktop: 600px, no background, padding 24/24/12/12.

**Visual summary:** Full ISI content: IMPORTANT SAFETY INFORMATION heading (bold 19px `#0023C8`), WARNINGS AND PRECAUTIONS heading (bold 16px `#414042`), 6-bullet warnings list (regular 16px `#414042`), ADVERSE REACTIONS heading + body, USE IN SPECIFIC POPULATIONS heading + 2-bullet list, PI link paragraph, counterfeit drugs link paragraph.

**Structural pattern:** Single-layer. No background.

**Primitive sequence:** Multiple textBlocks and lists. VERBATIM.

**Mobile deltas:** Identical content and structure.

**Verbatim:** Yes. All text must match Figma exactly.

---

## Section 12 — FOOTER MODULE (References)

**Identity:** section-12, desktop node `40000030:432`, mobile node `40000030:452`.
Desktop: 600px, no background, padding 24/24/12/12.

**Visual summary:** "References:" bold heading + numbered list with 2 items. Item 1: "TZIELD Prescribing Information. Provention Bio, Inc; [2025.]" (brackets in pink). Item 2: "[Press release pending]" (pink brackets). Pink brackets stripped in production; bracketed content renders in `#414042`.

**Structural pattern:** Single-layer.

**Primitive sequence:** textBlock ("References:"), list (numbered, 2 items). VERBATIM.

**Mobile deltas:** Identical.

**Verbatim:** Yes.

---

## Section 13 — FOOTER MODULE (CXQ)

**Identity:** section-13, desktop node `40000030:433`, mobile node `40000030:453`.
Desktop: 600px, no background on section root, internal CXQ div has `#F2F2F2` background, padding 24.

**Visual summary:** Gray panel. "Your feedback is important to us..." feedback intro paragraph. "How relevant is the content of this email to you?" bold heading. "Not relevant" / "Very relevant" labels spaced apart. 7 numbered tiles (1–7): tiles 1,3–7 are white (#FFFFFF) with `#707070` border, 72×48px; tile 2 is `#979797` background with white text, 72×48px (highlighted/selected state). Mobile: same tiles but 40×40px square; tile 2 has `#979797` background (solid fill on mobile).

**Structural pattern:** Intermediate container. Section root has no background+no padding (just paddingTop/Bottom 12). Inner CXQ `<div>` has `#F2F2F2` background and padding 24. Model with `outerPadding` for the 12px top/bottom and `background: #F2F2F2` + `padding: 24` on inner.

**Primitive sequence:**
1. textBlock — feedback intro, 16px regular, `#414042`, centered.
2. textBlock — "How relevant is the content of this email to you?", bold 19px, `#000000`, centered.
3. multiColumn — 2 columns: "Not relevant" (left) and "Very relevant" (right). Bold 19px, justified/space-between. Not actual clickable columns — just label row.
4. multiColumn — 7 tiles (columns 1–7), each 72×48px desktop, 40×40px mobile, with individual backgrounds/borders, linked.

**Mobile deltas:** Question text has explicit `<br>` after "this" → "How relevant is the content of this / email to you?". Tiles 40×40 (mobile). Use `mobileLayout: "preserve"` for tile row (keeps horizontal on mobile per spec: "rating scales").

**Judgment decision (CXQ tile 2 default-selection):** Per pre-scan open question #2, default to no pre-selection in production. However, the Figma explicitly shows tile 2 as highlighted. Since this is a static email (not interactive), model tile 2 with its gray background as shown in the design — the "selected" state is a design sample, not an interactive state. Model it as shown (gray tile). Add open question to pre-scan list.

The labels row ("Not relevant" / "Very relevant") and the tiles row are both multiColumn. The labels are a 2-column multiColumn (`space-between`). The tiles are a 7-column multiColumn.

---

## Section 14 — FOOTER MODULE (Legal footer)

**Identity:** section-14, desktop node `40000030:434`, mobile node `40000030:457`.
Desktop: 600px, no background, padding 24/24/12/12. Mobile: 360px, same.

**Visual summary:** State price disclosure link, "Please do not reply" notice, Sanofi logo (88×24px), Sanofi US address (3 lines), © 2026 notice, Legal Disclaimer + Privacy Policy links, Q&A contact link, US residents notice, unsubscribe link, MAT code (in `#FF00B7` scaffolding color — strip in production). All 16px regular `#000000` with `#0023C8` underlined links.

**Structural pattern:** Single-layer with internal sub-containers for spacing.

**Primitive sequence:** Multiple textBlocks (state price, reply warning, Sanofi logo, address, © line + links, Q&A, US residents, unsubscribe, MAT code). VERBATIM.

**Mobile deltas:** Identical content. Mobile node `40000030:457` is the split mobile section but contains identical text structure.

**Verbatim:** Yes. MAT code `MAT-US-2510989-v1.0-10/2025` is in pink scaffolding color — strip color but retain text.

---

## Email-wide open questions

1. **Blocking: `[ ]` overlay bracket frames (nodes 40000030:435 / 40000030:454)** — confirm editorial scaffolding to skip in production HTML; not rendered.
2. **Blocking: CXQ tile 2 default-selected state** — Figma shows tile "2" highlighted (gray fill). Is this a sample display or should production render no default selection?
3. **Blocking: From/To/Date/Subject preview block (section-1)** — confirm this is editorial scaffolding (not rendered in production HTML body).
4. **Non-blocking: References placeholders** — `[2025.]` and `[Press release pending]` need final MLR copy.
5. **Non-blocking: Decorative Lines overlay** — confirm bake-into hero image approach; supply composited hero image asset.
6. **Non-blocking: Stage continuum icon images** — each icon is composited (two overlapping images in Figma). Need single composited assets for each row (Stage 2 icon, Stage 3 icon).
7. **Non-blocking: Hero image alt text** — none provided in Figma; need final copy per brand standards.
8. **Non-blocking: Tzield logo + Sanofi logo asset URLs** — Figma CDN URLs expire in 7 days; need stable hosted URLs.
9. **Non-blocking: All link href values** — placeholders "#" used throughout; production URLs needed for all CTA/nav/footer links.

## Scaffolding tokens

- `stripBrackets: true`
- `stripColors: ["#FF00B7"]`
- `recolorMap: {"#FF00B7": "#414042"}` (primary recolor for body-text scaffold runs)
  - Section 5 "[NEW INDICATION]" → `#E4EEF7`
  - Section 6 "[6-12 weeks]" → `#FFFFFF`
  - Section 8 "[NOW]", "[6-12 weeks]" → `#414042`
  - Section 10 "[new]" → `#000000`
  - Section 12 "[2025.]", "[Press release pending]" → `#414042`
  - Section 14 MAT code → `#414042` (just strip the color)

Note: recolorMap in the spec allows only one source-to-target mapping per color. Since `#FF00B7` maps to different targets in different contexts, the `recolorMap` entry will be the primary fallback (`#414042`), and context-specific colors are encoded directly in the textBlock content runs.
