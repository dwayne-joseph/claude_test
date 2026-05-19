# Pre-scan: Tzield_V1_Test (HCP_Now Approved Day 1-CRM)

Source frames:
- Desktop (600px): node `40000030:420`
- Mobile (360px): node `40000030:440`

Brand: TZIELD (teplizumab-mzwv). Audience: HCPs. Visual: white background with bright blue (#0023C8) brand color, coral (#FF5000) accents, light-blue (#E4EEF7) preheader/CTA bands, dark teal (#06537B) headline band.

## Section inventory (top to bottom, desktop ↔ mobile pairing)

| # | Section (data-name) | Desktop node | Mobile node | Notes |
|---|---|---|---|---|
| 1 | CONTENT MODULES — From/To/Date/Subject line block | `40000030:421` | `40000030:441` | Scaffolding block: ALL pink `#FF00B7` brackets `[ ]` around editable values; non-bracket text in `#414042`. Editorial preview block, often dropped from production HTML. |
| 2 | PREHEADER MODULES — Preheader line | `40000030:422` | `40000030:442` | "Preheader: [Learn about this treatment option for your patients.]" Pink brackets around dynamic portion. Light-blue band. |
| 3 | PREHEADER MODULES — Header utility links | `40000030:423` | `40000030:443` | "View in browser \| Contact a Rep \| Unsubscribe" — light-blue band. |
| 4 | HEADER MODULES — Sanofi logo + ISI link block + INDICATIONS | `40000030:424` | `40000030:444` | Tzield logo (`imgFrame12`), coral 4px divider, vertical stroke + "Read Indication and Full Prescribing Information / Full Prescribing Information, including boxed WARNING" link block. Desktop: 2-col (logo \| links with vertical stroke). Mobile: stacked (logo above links, no stroke). Followed by INDICATIONS heading + 2-bullet indication body. |
| 5 | CONTENT MODULES — "[NEW INDICATION] FOR APPROPRIATE PATIENTS¹" | `40000030:425` | `40000030:445` | Headline band, bg `#06537B`, light-blue text `#E4EEF7`, with pink-bracketed `[NEW INDICATION]`. Superscript `1`. |
| 6 | CONTENT MODULES — CNPV approval body | `40000030:426` | `40000030:446` | bg `#0023C8`, white body, pink-bracketed `[6-12 weeks]`, superscript `2`. |
| 7 | HERO MODULES — Patient image | `40000030:427` | `40000030:447` | Photo of pediatric/young patient outdoors. Decorative coral+blue vertical lines visible at right edge (overlay siblings, see "Overlapping decorative elements"). |
| 8 | CONTENT MODULES — Stage continuum block | `40000030:428` | `40000030:448` | "TZIELD has expanded across the following stages of the T1D disease continuum¹" then two icon+text rows: (a) ✓ APPROVED in Stage 2 T1D; (b) ✓ [NOW] APPROVED in Stage 3 T1D within [6-12 weeks] of diagnosis. Desktop: icon left, text right (horizontal row). Mobile: icon above text (stacked, centered). |
| 9 | CONTENT MODULES — Definitions | `40000030:429` | `40000030:449` | "T1D=type 1 diabetes." |
| 10 | CONTENT MODULES — Sub-CTA + button | `40000030:430` | `40000030:450` | Light-blue band. "Learn more about the [new] indication" + Discover More button (`#0023C8` fill, `#80CBFF` 4px border, white bold text). Desktop button 444×88; mobile button 204×98. |
| 11 | ISI MODULE — Important Safety Information | `40000030:431` | `40000030:451` | Full ISI: WARNINGS AND PRECAUTIONS, ADVERSE REACTIONS, USE IN SPECIFIC POPULATIONS, plus PI link + counterfeit-drugs link. **VERBATIM.** |
| 12 | FOOTER MODULE — References | `40000030:432` | `40000030:452` | "References: 1. TZIELD Prescribing Information. Provention Bio, Inc; [2025.]  2. [Press release pending]" — pink brackets around years and placeholder. **VERBATIM** (numbered refs). |
| 13 | FOOTER MODULE — CXQ (Content Experience Question) | `40000030:433` | `40000030:453` | Gray (#F2F2F2) bg. "Your feedback is important to us…" + "How relevant is the content of this email to you?" + Not relevant / Very relevant labels + 7 numbered tiles (1–7), tile 2 highlighted gray. Desktop tiles 72×48 wide; mobile tiles 40×40 square. |
| — | FOOTER MODULE — Mobile-only legal/footer (`40000030:457`) | — | `40000030:457` | The mobile frame splits the long legal/footer paragraph into its own section (state price disclosure → reply-warning → Sanofi logo → address → © 2026 / Legal Disclaimer & Privacy Policy / Q&A / US residents / unsubscribe → MAT code). Desktop puts this same content inside `40000030:434`. Treat as **the same legal/footer section pair** (#14). |
| 14 | FOOTER MODULE — Legal footer | `40000030:434` | `40000030:457` | State price disclosure + reply warning + Sanofi logo + address + © 2026 line + Legal Disclaimer & Privacy Policy links + Q&A link + "US residents only" + unsubscribe line + MAT-US-2510989-v1.0-10/2025 (in pink — scaffolding marker color). **VERBATIM** legal/disclaimer text. |

Total: **14 paired production sections.**

## Verbatim sections
- ISI MODULE (#11) — must render exactly as drafted; do not paraphrase.
- References (#12).
- Legal footer (#14) — disclaimer block, address, © line, MAT code.
- INDICATIONS bullets inside Header Module (#4) — regulated copy.

## Overlapping decorative elements (blocking)

1. **`[ ]` scaffolding bracket frame** — desktop `40000030:435` and mobile `40000030:454` are full-width image overlays positioned absolute over the ISI/footer region (visible insets ~83–88% top). These are **editorial scaffolding brackets** marking the variable region in the source file. Pink-magenta `[ ]` glyphs — same family as the `#FF00B7` placeholder color. **Decision needed**: skip in production HTML (treat as editorial scaffolding) — confirm with brand team.

2. **RIGHT Decorative Lines** — desktop `40000030:438` (`40000030:439`) and mobile `40000030:458` (`40000030:459`). These are two vertical bands (8px coral `#FF5000` + 16px light-blue `#0096FF`, both 300px tall, separated by 8px gap) positioned absolute over the hero image's right edge. Component definition documented in Figma: "Decorative Lines — Adds branded elements to images in bands of color. Decorative colors are fixed for the brands regardless of Theme mode." **Production element**, not scaffolding. Implementation note: in HTML email these need to be baked into the hero image (or placed as a small graphic), since absolute overlays don't render reliably in email clients.

## Mobile differences vs. desktop

- Header layout (#4): desktop has logo on left and PI links on right separated by a vertical stroke (`imgStorke` rotated 90°). Mobile stacks logo above the links and drops the vertical stroke.
- Stage continuum rows (#8): desktop is horizontal (icon left, label right, single line per stage). Mobile is vertical (icon centered above label, with extra `bg-white` panel).
- Hero image (#7): mobile crops/zooms more (img scaled 137% with negative left offset to fill the narrower frame).
- CTA button (#10): desktop full-width style (444×88); mobile narrower (204×98).
- CXQ tiles (#13): desktop 72×48 with white inactive tiles and gray "2" tile background applied via linear-gradient. Mobile 40×40 square with solid gray fill on tile "2".
- Legal/footer (#14): desktop packs into single `40000030:434`; mobile splits the same content across `40000030:457` (the CXQ image overlay `40000030:454` sits between).
- CXQ question text wraps differently on mobile ("How relevant is the content of this / email to you?" with explicit `<br>`).

## Canvas-level siblings (classification)

- `40000030:435` / `40000030:454` — `[ ]` overlay bracket image → **scaffolding (skip in production), but verify with brand**.
- `40000030:438` (`40000030:439`) / `40000030:458` (`40000030:459`) — Decorative Lines → **production overlay** (bake into hero image).

No other sibling brackets or scaffolding frames detected outside section boundaries.

## Design tokens (full list from Figma response)

| Name | Hex | Role |
|---|---|---|
| Variable | `#FF00B7` | **Scaffolding/placeholder marker** — pink-magenta used for editable brackets `[ ]` and value indicators. Out-of-palette saturated value. |
| Template_Body_Black | `#414042` | Body text |
| Tzield/Dark Gray | `#414042` | (Same as Template_Body_Black) |
| Tzield/Light Blue | `#E4EEF7` | Preheader/CTA band background, headline tinted text |
| Tzield/BrandColor | `#0023C8` | Brand blue — links, headlines, button fill |
| Tzield/Coral | `#FF5000` | Header divider line, decorative line band #1 |
| Tzield/ButtonBlue | `#80CBFF` | Button border |
| Text_SubHeader | `#06537B` | "NEW INDICATION FOR APPROPRIATE PATIENTS" headline band background |
| Neutral/Gray | `#F2F2F2` | CXQ block background |
| (un-tokenized) | `#0096FF` | Decorative line band #2 (named `assets/decorative/2`) |
| (un-tokenized) | `#979797` | CXQ inactive tile border / "2" tile fill |
| (un-tokenized) | `#707070` | CXQ tile borders |

### Scaffolding recolor

- **stripColors**: `#FF00B7` (Variable) — every `[`, `]`, `"Preheader: "` label, MAT code, and the pink-bracketed dynamic snippets (`new`, `n`, `6-12 weeks`, `NOW`, `NEW INDICATION`, `2025.`, `Press release pending`) carry this. In production HTML, drop the colored brackets where they only wrap an editable token (keep the inner copy); for blocks where the entire line is in pink (the From/To/Date/Subject block, the MAT code, the "Preheader: ..." label), production drops the line OR converts it to a hidden preheader (the actual preheader text becomes the `<title>` / hidden preheader span; the "Preheader:" prefix and brackets are dropped).
- **recolorMap**: scaffold-pink spans inside production copy → fall back to the surrounding body color (`#414042`) or the section's intended color. Examples:
  - Section #5 headline: `[NEW INDICATION]` → render "NEW INDICATION" in `#E4EEF7` (the surrounding tinted text color).
  - Section #6 body: `[6-12 weeks]` → render "6-12 weeks" in white.
  - Section #8 row b: `[NOW]`, `[6-12 weeks]` → render in `#414042` body color.
  - Section #10 sub-CTA: `[new]` → render in black body color.
  - Section #12 refs: `[2025.]`, `[Press release pending]` → render in `#414042`.
- **Markers**: token named `Variable` (literal scaffolding token), bracket characters `[`, `]` in scaffolding color, the `#FF00B7` hex itself.

## Open questions

### Blocking
1. **`[ ]` overlay bracket frame (nodes 40000030:435 / 40000030:454)** — confirm this is editorial scaffolding to skip in production HTML, not a production visual asset.
2. **CXQ tile 2 default-selected state** — Figma shows tile "2" highlighted (gray fill, white "2") as a static design state. Is that a sample-selected display, or does production HTML render no default selection? Default to **no pre-selection** unless brand confirms.
3. **From/To/Date/Subject preview block (#1)** — confirm this is editorial scaffolding (a preview/proof header for stakeholder review) and not rendered in the final email body. Industry standard is to skip; the actual subject/preheader is set via ESP headers and the hidden preheader span.

### Non-blocking
4. References section: the `[2025.]` and `[Press release pending]` placeholders need final copy from MLR. Render the bracketed text as-is once colors are stripped (or wait for final).
5. "Decorative Lines" overlay: confirm whether to bake into the hero image or render as a separate VML/image strip. Recommendation: bake into hero image asset for reliability across clients.
6. Hero image alt text — none provided in Figma. Need final alt copy (e.g., "Healthcare provider with patient" or per brand standard).
7. Tzield logo + Sanofi logo asset URLs are Figma CDN (7-day expiry). Production needs hosted, branded assets at stable URLs.

## Fast-path / fallback

Fast path ran successfully. Both `get_design_context` calls returned full JSX (no truncation). Two `.jsx` files written to `emails/Tzield_V1_Test/jsx/`. CDN-hosted screenshot URLs were blocked (403) for `curl` download, but the base64 retry succeeded and the screenshots were inspected inline (no PNG persisted to disk).
