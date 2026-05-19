# PRE-SCAN — tzield-v1

Source: Figma file `uVU9ZnWB6iZO0kgY4bztS9` (Modular-Template_Tzield_V1)
Email name: HCP_Now Approved Day 1-CRM

## Frames
- Desktop: 40000030:420 (620×4202, content 600px wide)
- Mobile:  40000030:440 (360×5787)

## Sections (14, paired 1:1)

| # | Section | Desktop ID | Mobile ID | Visual summary |
|---|---|---|---|---|
| 1 | Envelope metadata | 40000030:421 | 40000030:441 | From / To / Date / Subject lines. All values in magenta brackets — scaffolding placeholders. Subject has grammar-variant brackets `[Explore a[n] [new] indication for a T1D treatment option]`. |
| 2 | Preheader | 40000030:422 | 40000030:442 | "Preheader: [Learn about this treatment option for your patients.]" — magenta scaffolding. Editorial label "Preheader: " not rendered. |
| 3 | Utility links | 40000030:423 | 40000030:443 | "View in browser | Contact a Rep | Unsubscribe" on a light-blue band. Pipe-separated on desktop; stacked or separated on mobile. |
| 4 | Header + INDICATIONS | 40000030:424 | 40000030:444 | Sanofi logo (top-right desktop) + TZIELD logo (left desktop) + "Read Indication and Full Prescribing Information" / "Full Prescribing Information, including boxed WARNING" links. Coral horizontal divider bar. Then INDICATIONS heading + body copy (regulated). On mobile, logo + links stack. **VERBATIM section** (INDICATIONS regulated copy). |
| 5 | Blue banner | 40000030:425 | 40000030:445 | Solid dark-blue cell. "[NEW INDICATION] FOR APPROPRIATE PATIENTS¹". `[NEW INDICATION]` in magenta scaffolding brackets. |
| 6 | Blue paragraph | 40000030:426 | 40000030:446 | Blue cell continuation. "Due to the significant unmet need in T1D… within `[6-12 weeks]` of diagnosis…CNPV program²". `[6-12 weeks]` in magenta brackets. |
| 7 | Hero image | 40000030:427 | 40000030:447 | Photo of young person in athletic wear, full-width. **Decorative bars (coral + cyan) overlay the right edge** — canvas-level sibling 40000030:438 / mobile :458. → **Bake into image asset; do NOT model structurally.** |
| 8 | Stages + checkmarks + CTA | 40000030:428 | 40000030:448 | Blue headline "TZIELD has expanded across the following stages of the T1D disease continuum¹". Two checkmark rows: (a) "APPROVED in Stage 2 T1D", (b) "[NOW] APPROVED in Stage 3 T1D within [6-12 weeks] of diagnosis". Footnote "T1D=type 1 diabetes." Then CTA prompt + blue **Discover More** button. |
| 9 | ISI title | 40000030:429 | 40000030:449 | "IMPORTANT SAFETY INFORMATION" headline only. |
| 10 | WARNINGS heading + intro | 40000030:430 | 40000030:450 | "WARNINGS AND PRECAUTIONS" subheader. Short. |
| 11 | ISI body | 40000030:431 | 40000030:451 | Long bulleted ISI: CRS, Serious Infections, Lymphopenia, Hypersensitivity, Vaccinations, Glucose Monitoring. Then ADVERSE REACTIONS para. Then USE IN SPECIFIC POPULATIONS bullets (Pregnancy, Lactation). Then "Click here" prescribing-info link, anti-counterfeit link. **VERBATIM section** (regulated). |
| 12 | References | 40000030:432 | 40000030:452 | "References:" with two numbered items. Item 2 is `[Press release pending]` (magenta scaffolding — content TBD). **VERBATIM section**. |
| 13 | Feedback survey | 40000030:433 | 40000030:453 | "Your feedback is important to us…" + "How relevant is the content of this email to you?" + 1–7 scale of clickable numbered cells, "Not relevant" / "Very relevant" anchors. **Magenta bracket frame `[ ]` (canvas sibling 40000030:435 / mobile :454) wraps this section as editorial scaffolding — skip the brackets in production.** |
| 14 | Legal footer | 40000030:434 | 40000030:457 | State Price Disclosure link, do-not-reply note, Sanofi logo (smaller than header), address, copyright, legal/privacy links, contact link, unsubscribe instructions with `tel:1-800-633-1610`, MAT code "MAT-US-2510989-v1.0-10/2025". **VERBATIM section** (legal). |

## Canvas-level siblings (NOT inside any section)

- **40000030:435 (desktop) / 40000030:454 (mobile)** — magenta `[ ]` bracket frame, wraps section 13 (feedback survey). → **Editorial scaffolding. Skip in production.**
- **40000030:438 (desktop) / 40000030:458 (mobile)** — "RIGHT Decorative Lines" (44×300 desktop, sits at x=542 over hero). → **Visual overlay on section 7. Bake into the hero image asset before launch. Blocking open question.**

## Verbatim sections
- Section 4 (INDICATIONS regulated copy)
- Section 11 (ISI MODULE)
- Section 12 (References — note item 2 is a pending placeholder)
- Section 14 (legal footer)

## Repeated assets
- **Sanofi logo** — appears in section 4 (header, larger) and section 14 (footer, smaller). Same source, two sizes. Reference once in JSON, use per-section dimensions.
- **TZIELD logo** — appears only once (section 4 header).
- **Checkmark icon** — section 8, used twice identically.

## Scaffolding markers (anticipated for Phase 2 confirmation)
The screenshots show a saturated magenta/pink used systematically for:
- Bracketed placeholders inside subject line, preheader, body copy (`[NEW]`, `[6-12 weeks]`, `[Press release pending]`, `[Click here]`, etc.)
- The bracket frame around the feedback survey

This is almost certainly a scaffolding token in the variable defs (`Variable`, `Annotation`, `Placeholder`, or similar). To be confirmed by Phase 2.

## Pre-scan open questions (will appear in meta.openQuestions)

1. **Subject line grammar variants** — `[Explore a[n] [new] indication for a T1D treatment option]` shows multiple bracketed editorial alternatives. Needs an editorial decision before launch.
2. **Hero decorative bars overlay** — coral + cyan vertical bars on the hero's right edge. Email HTML cannot render reliable absolute overlays. Bake into the exported hero image asset before launch. **Blocking.**
3. **Asset URLs from Figma expire in 7 days.** All `figma.com/api/mcp/asset/...` URLs in the JSON must be replaced with hosted CDN URLs before launch. **Blocking.**
4. **References item 2** — currently `[Press release pending]`. Production copy needed before launch.
5. **MAT code** — `MAT-US-2510989-v1.0-10/2025`. Confirm this is the production code (not a placeholder).
6. **Many bracketed `[...]` placeholders** throughout body copy. The pattern is consistent — they will be stripped by `annotations.stripBrackets: true` (content retained, brackets removed). Confirm this is the production intent.
