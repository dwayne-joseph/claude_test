# PLAN — tzield-v1 (Phase 3c)

Status: demonstration scope — only section 8 planned in detail to validate the
plan-then-author flow. Full email would have 14 plan entries.

## section-8 — Stages + checkmarks
Nodes: desktop 40000030:428 / mobile 40000030:448
Dimensions: desktop 600×490 / mobile 360×718
Pre-scan correction: I originally lumped the CTA section ("Learn more"/Discover
More button) into section 8. The per-section JSX + screenshot show section 8
ends after the second checkmark row — the CTA lives in section 430 (which I
mislabeled in pre-scan). Pre-scan needs revision.

### Visual
**Desktop:** Bold blue heading "TZIELD has expanded across the following stages
of the T1D disease continuum¹", centered. Two horizontal rows below: each row
is a 110×110 orange checkmark on a circle/square frame next to bold black text.
Row 1: "APPROVED in Stage 2 T1D". Row 2: "[NOW] APPROVED in Stage 3 T1D within
[6-12 weeks] of diagnosis" — brackets are magenta scaffolding.

**Mobile:** Same content, but each checkmark row stacks vertically (icon on
top, text below). Each row also gains a white background container on mobile
that doesn't exist on desktop. Heading wraps over more lines on the narrower
360px.

### Structural pattern
No-wrapper section (root has `paddingTop: 12px, paddingBottom: 12px` only — no
horizontal padding, no background). Section padding object captures top/bottom
only; children carry their own horizontal padding.

### Primitives
1. **textBlock** — heading "TZIELD has expanded across the following stages of
   the T1D disease continuum" + superscript "1". Centered.
2. **multiColumn** — checkmark row 1: icon-col (110×110) + text-col ("APPROVED
   in Stage 2 T1D"). Stacks on mobile; mobile-only white background.
3. **multiColumn** — checkmark row 2: icon-col (110×110, uses different oval
   asset variant — visually identical to row 1) + text-col (mixed-format
   scaffolding brackets). Stacks on mobile; mobile-only white background.

### Judgment decisions

- **Scaffolding-color runs in row 2 text.** Brackets `[` and `]` rendered in
  `#FF00B7`. Per the skill: emit each bracket as plain text with no color
  override (inherits parent color #414042); `stripBrackets: true` removes them
  at render time. Real content runs (`NOW`, `6-12 weeks`) emit with no color
  override (inherit parent black).

- **Empty annotation placeholder on row 2 icon.** The JSX includes a `<p>` with
  a zero-width space character, `position: absolute`, `color: #FF00B7`,
  `fontSize: 30px`, sitting inside the second checkmark frame. This is a Figma
  annotation badge that was never filled in. → **Drop entirely from JSON.** It's
  pure scaffolding with no content.

- **Two icon variants but visually identical.** Row 1 uses `imgOval`, row 2 uses
  `imgOval1` (different URLs). Visually identical. → Capture each as its own
  src; flag the duplication as an open question for asset consolidation.

- **fontFamily/fontWeight from Figma `'Family:Weight'`.** Heading and text rows
  both use `'Arial:Bold'` → `fontFamily: "Arial"`, `fontWeight: 700`.

- **Heading inline run with smaller fontSize.** Superscript "1" is `fontSize:
  19.35px` (vs main 30px). Modeled as a second run in `content` with its own
  `fontSize`. No explicit `verticalAlign` in the resolved CSS — visually it's
  a superscript baseline-up. → Use `superscript: true` if the schema supports
  it, otherwise just smaller fontSize. (Open question for the json-format
  reference: how to express superscript.)

- **Mobile delta — added background.** Each multiColumn row gets `bg-white`
  only on mobile. → `mobile.background: "#FFFFFF"` per-primitive.

- **Mobile delta — stacking.** Both checkmark rows stack on mobile (mobile JSX
  has `flexDirection: column` on the row container). → `mobileLayout: "stack"`
  on each multiColumn, `mobile.preserveWidth: false` on both columns.

- **Multi-column widths.** Desktop row: icon-col 110px fixed, text-col `flex:
  1 0 0` ≈ 442px (600 − 48 outer padding − 110 icon − 24 internal padding).
  Mobile (stacked): both columns expand to 312px (360 − 48 outer padding).

- **Properties to ignore.** `alignContent: stretch`, `minWidth: 1px`,
  `position: relative` on non-absolute parents, `overflow: clip`, `flex: 1 0 0`
  on text columns (already captured as the width derivation above).

### Mobile deltas
- Each multiColumn row: `flexDirection: column` → `mobileLayout: stack`.
- Each multiColumn row: adds `bg-white` background → `mobile.background:
  "#FFFFFF"`.
- Text content unchanged.
- Heading wraps differently but no JSON-level change needed (text reflows).

### Open questions raised
- Empty annotation placeholder dropped (noted above) — confirm with production.
- Two near-identical orange checkmark icons (`imgOval` and `imgOval1`) —
  consider consolidating to one asset before launch.
- Superscript "1" — expression in JSON spec needs confirmation.
