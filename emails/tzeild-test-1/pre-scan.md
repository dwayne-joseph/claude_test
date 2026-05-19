# PRE-SCAN — tzeild-test-1

Source: Figma file `uVU9ZnWB6iZO0kgY4bztS9` (Modular-Template_Tzield_V1)
Email name: HCP_Now Approved Day 1-CRM

## Frames
- Desktop: 40000030:420 (620×4202, content 600px wide)
- Mobile:  40000030:440 (360×5787)

## Sections (14, paired 1:1)

| # | Section | Desktop ID | Mobile ID | Visual summary |
|---|---|---|---|---|
| 1 | Envelope metadata | 40000030:421 | 40000030:441 | From / To / Date / Subject lines. All values in magenta brackets — scaffolding placeholders. `skipInProduction: true`. |
| 2 | Preheader | 40000030:422 | 40000030:442 | "Preheader: [Learn about this treatment option for your patients.]" — magenta scaffolding label. Light blue bg. `skipInProduction: true` for the label; preheader text used in ESP meta. |
| 3 | Utility links | 40000030:423 | 40000030:443 | "View in browser | Contact a Rep | Unsubscribe" on a light-blue band. Pipe-separated on desktop; stacked on mobile. |
| 4 | Header + INDICATIONS | 40000030:424 | 40000030:444 | Sanofi logo (top-right) + TZIELD logo (left) + PI links. Coral horizontal divider bar (4px). Then INDICATIONS heading + 2-bullet regulated copy. **VERBATIM section.** |
| 5 | Blue banner | 40000030:425 | 40000030:445 | Solid dark-blue (#0023C8) cell. "[NEW INDICATION] FOR APPROPRIATE PATIENTS¹". `[NEW INDICATION]` in magenta scaffolding. |
| 6 | Blue paragraph | 40000030:426 | 40000030:446 | Blue bg continuation. "Due to the significant unmet need in T1D… within `[6-12 weeks]` of diagnosis…CNPV program²". `[6-12 weeks]` in magenta. |
| 7 | Hero image | 40000030:427 | 40000030:447 | Photo of young person in athletic wear, full-width. **Decorative bars (coral + cyan) overlay the right edge** — canvas-level sibling 40000030:438 / mobile :458. Bake into image asset; do NOT model structurally. |
| 8 | Stages + checkmarks | 40000030:428 | 40000030:448 | Blue headline "TZIELD has expanded across the following stages of the T1D disease continuum¹". Two checkmark rows: (a) "APPROVED in Stage 2 T1D", (b) "[NOW] APPROVED in Stage 3 T1D within [6-12 weeks] of diagnosis". |
| 9 | ISI title | 40000030:429 | 40000030:449 | "IMPORTANT SAFETY INFORMATION" headline only. White bg, dark blue text. |
| 10 | WARNINGS heading | 40000030:430 | 40000030:450 | "WARNINGS AND PRECAUTIONS" subheader + short intro. White bg. |
| 11 | ISI body | 40000030:431 | 40000030:451 | Long bulleted ISI: CRS, Serious Infections, Lymphopenia, Hypersensitivity, Vaccinations, Glucose Monitoring. Then ADVERSE REACTIONS para. Then USE IN SPECIFIC POPULATIONS bullets (Pregnancy, Lactation). Then PI links, anti-counterfeit link. **VERBATIM section.** |
| 12 | References | 40000030:432 | 40000030:452 | "References:" with two numbered items. Item 2 is `[Press release pending]`. **VERBATIM section.** |
| 13 | Feedback survey | 40000030:433 | 40000030:453 | "Your feedback is important to us…" + 1–7 scale of clickable numbered cells. Canvas sibling bracket frame 40000030:435 / mobile :454 = editorial scaffolding, skip. |
| 14 | Legal footer | 40000030:434 | 40000030:457 | State Price Disclosure link, do-not-reply note, Sanofi logo (smaller), address, copyright, legal/privacy links, contact link, unsubscribe tel:1-800-633-1610. MAT code. **VERBATIM section.** |

## Canvas-level siblings (NOT inside any section)

- **40000030:435 (desktop) / 40000030:454 (mobile)** — magenta `[ ]` bracket frame wrapping section 13 (feedback survey). Editorial scaffolding — skip in production.
- **40000030:438 (desktop) / 40000030:458 (mobile)** — "RIGHT Decorative Lines" (44×300 desktop, sits at x=542 over hero). Visual overlay on section 7. Bake into the hero image asset before launch. **Blocking.**

## Verbatim sections
- Section 4 (INDICATIONS regulated copy)
- Section 11 (ISI body)
- Section 12 (References)
- Section 14 (legal footer)

## Annotations / scaffolding
- Scaffolding color: `#FF00B7` (magenta) — used for all `[...]` placeholder brackets and editorial labels
- `stripBrackets: true` — content inside brackets preserved, brackets themselves removed at render
- `recolorMap`: `#FF00B7` → `#414042` (standard dark grey for any leaking placeholder text)

## Open questions (to carry into meta.openQuestions)

1. **Hero decorative bars overlay** — coral + cyan vertical bars on hero right edge. Must be baked into the exported hero image asset. **Blocking.**
2. **Asset URLs expire** — all `figma.com/api/mcp/asset/...` URLs must be replaced with hosted CDN URLs before launch. **Blocking.**
3. **References item 2** — `[Press release pending]`. Production copy needed before launch. **Blocking.**
4. **Subject line grammar variants** — `[Explore a[n] [new] indication for a T1D treatment option]`. Editorial decision needed before launch.
5. **MAT code** — `MAT-US-2510989-v1.0-10/2025`. Confirm production vs placeholder.
6. **Bracketed `[...]` placeholders** throughout body copy — `stripBrackets: true` will strip brackets but retain content. Confirm this is the production intent.
