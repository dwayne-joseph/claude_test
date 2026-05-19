# PRE-SCAN — tzeild-test-1

Source: Figma file `uVU9ZnWB6iZO0kgY4bztS9` (Modular-Template_Tzield_V1)
Email name: HCP_Now Approved Day 1-CRM

## Frames
- Desktop: 40000030:420 (620×4202, content 600px wide)
- Mobile:  40000030:440 (360×5787)

## Section Inventory (14 sections, paired 1:1)

| # | Name | Desktop ID | Desktop Size | Mobile ID | Mobile Size |
|---|------|-----------|-------------|----------|------------|
| 1 | Envelope metadata | 40000030:421 | 600×104 | 40000030:441 | 360×144 |
| 2 | Preheader | 40000030:422 | 600×44 | 40000030:442 | 360×64 |
| 3 | Utility links | 40000030:423 | 600×64 | 40000030:443 | 360×64 |
| 4 | Header + INDICATIONS | 40000030:424 | 600×469 | 40000030:444 | 360×729 |
| 5 | Blue banner | 40000030:425 | 600×92 | 40000030:445 | 360×126 |
| 6 | Blue paragraph | 40000030:426 | 600×139 | 40000030:446 | 360×208 |
| 7 | Hero image | 40000030:427 | 600×324 | 40000030:447 | 360×312 |
| 8 | Stages + checkmarks | 40000030:428 | 600×490 | 40000030:448 | 360×718 |
| 9 | ISI title | 40000030:429 | 600×47 | 40000030:449 | 360×47 |
| 10 | WARNINGS heading | 40000030:430 | 600×159 | 40000030:450 | 360×192 |
| 11 | ISI body | 40000030:431 | 600×1295 | 40000030:451 | 360×2042 |
| 12 | References | 40000030:432 | 600×120 | 40000030:452 | 360×140 |
| 13 | Feedback survey | 40000030:433 | 600×234 | 40000030:453 | 360×288 |
| 14 | Legal footer | 40000030:434 | 600×471 | 40000030:457 | 360×573 |

## Visual Summary

**Section 1 — Envelope metadata:** From/To/Date/Subject lines. All values in magenta `[...]` brackets — scaffolding placeholders. `skipInProduction: true`.

**Section 2 — Preheader:** "Preheader: [Learn about this treatment option for your patients.]" — magenta label on light-blue background. `skipInProduction: true` for the label.

**Section 3 — Utility links:** "View in browser | Contact a Rep | Unsubscribe" on light-blue band. Pipe-separated on desktop; stacks on mobile.

**Section 4 — Header + INDICATIONS:** Sanofi logo (top-right) + TZIELD logo (left) + PI links. Coral horizontal divider. Then INDICATIONS heading + 2-bullet regulated copy. **VERBATIM.**

**Section 5 — Blue banner:** Solid dark-blue (#0023C8). "[NEW INDICATION] FOR APPROPRIATE PATIENTS¹". `[NEW INDICATION]` in magenta scaffolding.

**Section 6 — Blue paragraph:** Blue bg continuation. Body copy with `[6-12 weeks]` scaffolding placeholder.

**Section 7 — Hero image:** Full-width photo. Coral + cyan decorative bars overlay the right edge (canvas sibling 40000030:438 / mobile 40000030:458). **Bake into image asset. Blocking.**

**Section 8 — Stages + checkmarks:** Blue heading + two checkmark rows. Row 2 has `[NOW]` and `[6-12 weeks]` scaffolding.

**Section 9 — ISI title:** "IMPORTANT SAFETY INFORMATION" heading only. White bg.

**Section 10 — WARNINGS heading:** "WARNINGS AND PRECAUTIONS" subheader + short intro. White bg.

**Section 11 — ISI body:** Long bulleted ISI. ADVERSE REACTIONS. USE IN SPECIFIC POPULATIONS. PI links. **VERBATIM.**

**Section 12 — References:** Two numbered references. Item 2 is `[Press release pending]`. **VERBATIM.**

**Section 13 — Feedback survey:** "How relevant is the content of this email to you?" + 1–7 scale. Canvas sibling bracket frame 40000030:435 / 40000030:454 = editorial scaffolding, skip.

**Section 14 — Legal footer:** State Price Disclosure, do-not-reply, Sanofi logo, address, copyright, legal links, unsubscribe tel, MAT code. **VERBATIM.**

## Canvas-level Siblings

| Node | Name | Classification |
|------|------|----------------|
| 40000030:435 (desktop) / 40000030:454 (mobile) | `[ ]` bracket frame | Editorial scaffolding — skip in production |
| 40000030:438 (desktop) / 40000030:458 (mobile) | RIGHT Decorative Lines | Visual overlay on section 7 hero — bake into image asset before launch. **Blocking.** |

## Verbatim Sections
- Section 4 (INDICATIONS regulated copy)
- Section 11 (ISI body)
- Section 12 (References)
- Section 14 (Legal footer)

## Design Tokens

### Brand colors
| Token | Hex |
|-------|-----|
| Tzield/BrandColor | #0023C8 |
| Tzield/Coral | #FF5000 |
| Tzield/ButtonBlue | #80CBFF |
| Tzield/Light Blue | #E4EEF7 |
| Text_SubHeader | #06537B |
| Tzield/Dark Gray / Template_Body_Black | #414042 |

### Scaffolding markers
| Token | Hex | Action |
|-------|-----|--------|
| Variable | #FF00B7 | `stripColors` + `stripBrackets: true` |
| Static/text-dynamic-annotate | #ff25db | `stripColors` |

`recolorMap`: `#FF00B7` → `#414042`, `#ff25db` → `#414042`

## Open Questions
1. **Hero decorative bars** — coral + cyan vertical bars must be baked into hero image before launch. **Blocking.**
2. **Expiring asset URLs** — all `figma.com/api/mcp/asset/...` URLs must be replaced with hosted CDN URLs. **Blocking.**
3. **References item 2** — `[Press release pending]` needs production copy. **Blocking.**
4. **Subject line grammar** — `[Explore a[n] [new] indication for a T1D treatment option]` — editorial decision needed.
5. **MAT code** — `MAT-US-2510989-v1.0-10/2025` — confirm production vs placeholder.
6. **Scaffolding brackets** — `stripBrackets: true` retains inner content, strips brackets. Confirm intent.
