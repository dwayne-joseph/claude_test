# Pre-Scan — Tzield_Test_V1

**Source:** Figma file `uVU9ZnWB6iZO0kgY4bztS9` (Modular-Template_Tzield_V1)
- Desktop frame `40000030:420` — 600 px (HCP_Now Approved Day 1-CRM_600px)
- Mobile frame  `40000030:440` — 360 px (HCP_Now Approved Day 1-CRM_360px)
- Fetch path: fast path (single `get_design_context` per breakpoint succeeded with code, no fallback).
- Screenshots: CDN `host_not_allowed` for `figma.com/api/mcp/asset/...`. Visual inspection was done via inline base64 returned from `get_screenshot(enableBase64Response: true)`; no PNGs are persisted to disk.

---

## Visual narration

Top-to-bottom, the email is a stacked single-column 600 px (desktop) / 360 px (mobile) layout:

1. **Subject/From metadata block** (white bg). Pink scaffolding text reading `From: [Sanofi US <medintel@hcp-email.sanofi.us>]`, `To: [HCP email]`, `Date: [MM/DD/YYYY> <HH:MM:AM/PM>]`, `Subject: [Explore a[n] [new] indication for a T1D treatment option.]`. The non-pink body words are the actual subject line text; brackets surround the dynamic tokens.
2. **Preheader band** (light blue `#E4EEF7`). Pink "Preheader: [" wraps the body line "Learn about this treatment option for your patients." then closing "]".
3. **Utility links band** (light blue `#E4EEF7`). "View in browser | Contact a Rep | Unsubscribe" — all blue/underlined.
4. **Header module** (white). Top-right small Sanofi logo, then a 4 px coral `#FF5000` horizontal rule, then a two-column row: Tzield product logo (left, 214×90) and a vertical stroke separator + linked text block (right, blue underlined) — "Read Indication and Full Prescribing Information" / "Full Prescribing Information, including boxed WARNING". Then "**INDICATIONS**" heading (blue) and the indications body with bulleted disease-state language.
5. **Sub-header band** (teal `#06537B`). 30 px bold: "[NEW INDICATION] FOR APPROPRIATE PATIENTS¹" — pink brackets, light-blue text, superscript "1".
6. **Body band** (brand blue `#0023C8`). 19 px white body: "Due to the significant unmet need in T1D and years of clinical research, TZIELD has been approved for patients with Stage 3 T1D within [6-12 weeks] of diagnosis as the first therapy under the FDA's Commissioner National Priority Voucher (CNPV) program.²"
7. **Hero image** (300 px tall). Photo of a young woman in a coral top outdoors. On desktop the orange/blue decorative bars float on the right edge of the hero; on mobile they float on the right edge of the CXQ survey (different absolute position).
8. **Continuum heading** (white). 30 px bold blue: "TZIELD has expanded across the following stages of the T1D disease continuum¹".
9. **Stage-1 row** — orange checkmark badge (110 px) + "**APPROVED in Stage 2 T1D**" (dark gray 20 px bold).
10. **Stage-2 row** — same badge style + "[NOW] APPROVED in Stage 3 T1D within [6-12 weeks] of diagnosis".
11. **Acronym footnote** — "T1D=type 1 diabetes." (gray 19 px).
12. **CTA band** (light blue `#E4EEF7`). "Learn more about the [new] indication" centered, then a 88 px tall brand-blue button with 4 px light-blue border, white text "Discover More".
13. **ISI module** (white). "**IMPORTANT SAFETY INFORMATION**" (blue heading), "WARNINGS AND PRECAUTIONS" subhead, six bulleted ISI bullets (CRS, Serious Infections, Lymphopenia, Hypersensitivity, Vaccinations w/ sub-bullets, Glucose Monitoring), "ADVERSE REACTIONS" subhead + paragraph, "USE IN SPECIFIC POPULATIONS" subhead + Pregnancy/Lactation bullets, then "Please see full Prescribing Information…" link and counterfeit-drugs link.
14. **References block** (white). "**References:**" + ordered list — item 1 "TZIELD Prescribing Information. Provention Bio, Inc; [2025.]" and item 2 "[Press release pending]".
15. **CXQ feedback survey** (gray `#F2F2F2`). "Your feedback is important…", "How relevant is the content of this email to you?", endpoints "Not relevant" / "Very relevant", and a 7-cell rating row with cell 2 pre-filled gray `#979797` and others white-bordered. Desktop cells 72×48; mobile cells 40×40 squares.
16. **Footer module** (white). "Prescribers and other Healthcare Professionals may click here for State Price Disclosure Information.", bold "**Please do not reply to this message.**" + tagline, centered small Sanofi logo (88×24), address block (Sanofi US / 100 Morris Street, / Morristown, NJ 07960), copyright "© 2026 Sanofi. All rights reserved.", "Legal Disclaimer and Privacy Policy" links, "Questions and Comments? Click here to contact us.", US-residents disclaimer, unsubscribe sentence, then pink "MAT-US-2510989-v1.0-10/2025".

Overlay: an `[ ]` bracket image at ~83 % (desktop) / 85 % (mobile) inset spans the width — Figma's literal scaffolding wrapper indicating the CXQ box is a placeholder block to be replaced/customized.

---

## Section inventory

Pairing is 1:1 across breakpoints. Section node IDs are read from `data-node-id` in the JSX.

| # | Name                                  | Desktop ID      | Mobile ID       | Notes                                                                 |
|---|---------------------------------------|-----------------|-----------------|-----------------------------------------------------------------------|
| 1 | Subject/From metadata (scaffolding)   | 40000030:421    | 40000030:441    | Entire section is editorial scaffolding (pink). **Skip from production.** |
| 2 | Preheader text                        | 40000030:422    | 40000030:442    | Body text is real; "Preheader: [" "]" wrapper is scaffolding.         |
| 3 | Utility links                         | 40000030:423    | 40000030:443    | View in browser / Contact a Rep / Unsubscribe                         |
| 4 | Header (logo + rule + product logo + PI links + INDICATIONS + body) | 40000030:424 | 40000030:444 | Composite header.       |
| 5 | Sub-header band — "[NEW INDICATION] FOR APPROPRIATE PATIENTS¹" | 40000030:425 | 40000030:445 | Teal bg, pink brackets recolor to light blue.  |
| 6 | Body band — CNPV paragraph            | 40000030:426    | 40000030:446    | Brand-blue bg, white text.                                            |
| 7 | Hero image                            | 40000030:427    | 40000030:447    | Image-only.                                                           |
| 8 | Continuum heading + stage rows        | 40000030:428    | 40000030:448    | Heading + two badge rows.                                             |
| 9 | T1D footnote                          | 40000030:429    | 40000030:449    | "T1D=type 1 diabetes."                                                |
| 10 | CTA band — Discover More             | 40000030:430    | 40000030:450    | Light-blue bg + brand-blue button.                                    |
| 11 | ISI module                            | 40000030:431    | 40000030:451    | **Verbatim — regulatory.**                                            |
| 12 | References                            | 40000030:432    | 40000030:452    | **Verbatim — regulatory.** Years/citations in brackets are dynamic.   |
| 13 | CXQ survey                            | 40000030:433    | 40000030:453    | 7-cell rating; cell 2 pre-filled.                                     |
| 14 | Footer module                         | 40000030:434    | 40000030:457    | **Verbatim — legal/regulatory.** MAT code is rendered pink.           |

Floating canvas siblings (overlays, not stacked):
- `40000030:435` (desktop) / `40000030:454` (mobile) — "[ ]" bracket image wrapping the CXQ box. **Editorial scaffolding overlay — skip from production.**
- `40000030:438`+`40000030:439` (desktop) / `40000030:458`+`40000030:459` (mobile) — RIGHT Decorative Lines. Coral 8 px + cyan 16 px vertical bars, height 300 px, positioned over the hero (desktop) / over the CXQ survey (mobile). Figma component description: "Adds branded elements to images in bands of color. Decorative colors are fixed for the brands regardless of Theme mode." → **production overlay, blocking question** on whether ESP build should render these or treat as Figma-only decoration (see open questions).

---

## Verbatim candidates

- Section 4 INDICATIONS body bullets (regulatory indications language).
- Section 6 CNPV paragraph (regulatory claim).
- Section 11 ISI module — *all* content, including warnings & precautions list, adverse-reactions sentence, use-in-specific-populations bullets, and link sentences.
- Section 12 References list (citation form is regulatory; the dates/citations inside brackets are dynamic placeholders).
- Section 14 Footer — Sanofi US address, copyright, legal links, do-not-reply, unsubscribe sentence, MAT code, US-residents disclaimer.

---

## Overlapping decorative elements

| Element                      | Where                                                             | Classification          |
|------------------------------|-------------------------------------------------------------------|-------------------------|
| `[ ]` bracket image           | Wraps CXQ box at ~83 % desktop / ~85 % mobile                     | Scaffolding overlay — skip |
| RIGHT Decorative Lines (coral 8 px + cyan 16 px verticals, h 300 px) | Desktop: over hero right edge `left:542px top:994px`; Mobile: over CXQ right edge `left:310px top:1412px` | Brand decorative overlay — **blocking** |

The decorative lines change anchor between breakpoints (hero on desktop, footer-survey on mobile). Need design confirmation on intended placement and whether to render in HTML (e.g., as positioned background art on the hero) or omit.

---

## Mobile differences

- Wrapper padding: desktop `p-[10px]`, mobile `py-[5px]` (no horizontal canvas padding on mobile).
- Header product logo + PI-links row stacks (desktop: row with rotated 90 px separator stroke; mobile: column, separator stroke is dropped).
- Sub-header band (§5) has the extra light-blue space character explicitly tokenized on mobile (cosmetic only).
- Body band text color on mobile uses `text-white` spans (desktop relies on parent `text-white`); semantically identical.
- Hero image (§7) on mobile is scaled with `inset` offsets `h-[115.33%] left-[-18.55%] top-[-15.33%] w-[136.98%]` — i.e. cropped/zoomed differently than desktop's `object-cover`.
- Stage rows (§8) on mobile stack badge over text (`flex-col`); desktop is row.
- "Discover More" button: desktop 444×88, mobile 204×98.
- Two ISI link blocks (Prescribing Info and counterfeit-drugs) are merged into one stacked text block on desktop, but split into two adjacent paragraphs on mobile (cosmetic).
- CXQ rating cells: desktop 72×48 rectangles, mobile 40×40 squares.
- CXQ question text wraps with explicit `<br>` on mobile ("How relevant is the content of this / email to you?").
- Decorative lines anchor shifts (see above).

---

## Canvas-level siblings

- "[ ]" bracket overlay (desktop `40000030:435`, mobile `40000030:454`) — **editorial scaffolding**.
- RIGHT Decorative Lines wrapper (desktop `40000030:438`/`:439`, mobile `40000030:458`/`:459`) — **visual overlay, blocking**.

No outer brackets framing the entire email; both frames are clean root containers.

---

## Design tokens

From Figma response footers (desktop and mobile):

| Token                  | Hex      | Role                                                                                   |
|------------------------|----------|----------------------------------------------------------------------------------------|
| `Variable`             | `#FF00B7`| Scaffolding marker — square brackets, "Preheader: []", MAT code, pink dummy elements.   |
| `Template_Body_Black`  | `#414042`| Body copy.                                                                              |
| `Tzield/Dark Gray`     | `#414042`| (same hex as above, alias).                                                             |
| `Tzield/Light Blue`    | `#E4EEF7`| Section band backgrounds; light text on teal/blue.                                      |
| `Tzield/BrandColor`    | `#0023C8`| Brand blue — headings, body band bg, button, links.                                     |
| `Tzield/Coral`         | `#FF5000`| 4 px header rule; left bar of Decorative Lines.                                         |
| `Tzield/ButtonBlue`    | `#80CBFF`| Button border; mobile sub-header spacer color.                                          |
| `Text_SubHeader`       | `#06537B`| Teal sub-header band bg.                                                                |
| `Neutral/Gray`         | `#F2F2F2`| CXQ survey background.                                                                  |

Other notable raw colors observed in the JSX:
- `#707070` — CXQ unfilled cell border.
- `#979797` — CXQ pre-filled cell (rating 2) fill + border.
- `#0096FF` — second band of the Decorative Lines (cyan); fixed brand color per component description.
- `#80CBFF` — applied once on mobile sub-header to a single space character (cosmetic only).

### Scaffolding markers

- **`#FF00B7`** is the project's scaffolding/dynamic marker (token name "Variable"). Every appearance ringed by `[` … `]` is an editorial placeholder.
- Whole-section scaffolding: §1 metadata block (all pink).
- Bracket-only scaffolding: §2 "Preheader: [" + "]" wrapper, §5 "[" + "]" around "NEW INDICATION", §6 "[" + "]" around "6-12 weeks", §8 "[NOW]" + "[6-12 weeks]" tokens, §10 "[" + "]" wrapping "new", §12 References "[" + "2025." + "]" and "[Press release pending]".
- MAT code (`MAT-US-2510989-v1.0-10/2025`) is rendered in `#FF00B7` but is real production content — recolor to body color, do not strip.

### `stripColors`

```
#FF00B7   → strip ONLY the bracket-wrapper characters and the entire §1 metadata block
```

### `recolorMap` (candidates)

```
#FF00B7  →  #414042   (for text colored pink that is real production copy, e.g. MAT code, real reference text inside dynamic placeholders that survives copy review)
```

The extractor should resolve, per-bracket, whether to drop the bracketed token entirely (true placeholder, e.g. "Press release pending") or keep its inner content (e.g. "new", "NOW", "6-12 weeks", "n", "Explore a", year "2025."). The bracket characters themselves are always stripped.

---

## Open questions

**Blocking — must resolve before launch.**

1. **Decorative Lines overlay** — Should the coral 8 px + cyan 16 px vertical band render in HTML email, and if so, on which section (hero only? hero + footer survey? both, per breakpoint)? The component description marks it as a fixed brand element, but its position differs between breakpoints. Suggest: render as a positioned image/VML on the hero on both breakpoints, drop the mobile-only CXQ duplicate. Confirm with design.
2. **CXQ "[ ]" bracket overlay** — Confirm this is editorial scaffolding (Figma annotation only) and should not render in HTML. Pre-scan treats it as scaffolding.
3. **References dynamic tokens** — Item 1 contains `[2025.]` (year of PI) and item 2 is `[Press release pending]`. Production needs the real press-release citation before launch. The year "2025." is treated as production text inside a scaffolding bracket; strip brackets, keep "2025.".
4. **Subject/From metadata (§1)** — Confirm this entire pink section is build-time scaffolding (the actual `from`/`to`/`date`/`subject` are ESP routing fields). Pre-scan treats §1 as skipped.
5. **CXQ pre-filled cell** — Cell 2 is rendered filled (gray `#979797`) while the other six are white. Confirm the survey should ship with no pre-selection, i.e. all seven cells should be white in production.

**Non-blocking — judgment calls flagged for the extractor.**

6. **Stroke-on-mobile** — The vertical stroke separator between Tzield product logo and PI-links text exists on desktop but is dropped on mobile. Treat the stroke as desktop-only ornamentation.
7. **ISI link block split** — Desktop renders "Please see full Prescribing Information…" and "Click here…" as one stacked text block; mobile splits them into two separate `<p>`s. Render as two separate paragraphs in production HTML (matches mobile, cleaner semantics).
8. **Hero crop differential** — Mobile applies a custom 137 % zoom + negative offsets to the same source image. Suggest exporting two distinct image assets (or a single asset with `media`-query swap) so the focal point is preserved across breakpoints. Flag for image team.
