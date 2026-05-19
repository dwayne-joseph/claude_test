---
name: figma-interpret
description: Focused advisor for Figma email interpretation questions. Use when the figma-extractor agent (or a user mid-extraction) needs a targeted answer about how to classify a Figma construct — overlay vs column, scaffolding vs production, mobile delta handling, verbatim sections, asset expiry, the exact shape of a JSON primitive field. Looks up the relevant section of the internal reference and returns a focused answer rather than dumping the full 18KB json-format reference into the caller's context.
---

# figma-interpret

This skill is an **advisor**, not a workflow. The `figma-extractor` agent (`.claude/agents/figma-extractor.md`) owns the Phase 0–3d extraction flow. When that agent — or a user driving extraction by hand — hits an ambiguous judgment moment, it calls this skill with a focused question and gets back a focused answer.

## What this skill is for

Return targeted guidance for a single judgment moment. Typical questions:

- "This row has a decorative bar overlapping a photo on the right edge. Is it a multiColumn or an overlay?"
- "I have a Figma frame with a magenta `[ ]` bracket. Scaffolding or production?"
- "Section 7 has three columns on desktop and one on mobile. How should `mobile.stackOrder` look?"
- "What fields does an `image` primitive require? Which are optional?"
- "Token `Variable/Annotation` is `#FF00C8` and only appears around editorial labels. What do I do with it?"
- "Hero image URL is `https://www.figma.com/api/mcp/asset/...`. Do I capture it verbatim or fetch it?"

Anything that requires *interpreting Figma data*, *applying a judgment rule*, or *looking up the JSON contract* belongs here.

## What this skill is NOT for

- Driving the extraction workflow — that's the `figma-extractor` agent.
- Calling Figma MCP tools — the agent does that.
- Writing the spec.json file — the agent does that.
- Loading the entire 18KB `references/json-format.md` into the caller's context. The whole point of this advisor is to return a focused answer.

## How to answer a question

1. **Read the question.** Identify which reference area it falls under.
2. **Open ONLY the relevant section** of `references/json-format.md`. Don't read the full file unless the question genuinely spans it.
3. **Return a focused answer**: the rule that applies, the JSON shape if applicable, and any open-question wording to capture.
4. **If the question is genuinely ambiguous from the inputs the agent has**, return the open-question wording the agent should add to `meta.openQuestions` rather than guessing.

## Internal references (do not dump wholesale)

| Reference | Use it when the question is about… |
|---|---|
| `references/json-format.md` | the exact shape of a primitive (`image`, `textBlock`, `button`, `list`, `multiColumn`, `spacer`), section wrappers, `meta.*` fields, `annotations.*` fields |

## Judgment rules — quick catalog (full detail in `references/json-format.md`)

| Question type | Rule |
|---|---|
| Decorative element overlapping another element | **Overlay rule** — model only the base element; add a blocking `meta.openQuestions` entry telling production to bake the overlay into the source asset before launch. Never model an overlay as a sibling multiColumn. |
| Magenta/neon-bracket annotation | **Scaffolding** — add the color to `annotations.stripColors`; if a `[` or `]` character renders in that color, strip the bracket but keep the inner content per `stripBrackets`. |
| Editorial label like `"Preheader: ["` in scaffolding color | Drop the run entirely. |
| Real content miscolored in Figma but tagged as scaffolding token | Apply `annotations.recolorMap` to remap to the production color. |
| Section flagged as legal/regulated copy (ISI, indications, references, footer legal) | Add section ID to `meta.verbatimSections`. Transcribe word-for-word. No paraphrasing. |
| Three-column row that becomes one column on mobile | Set each column's `mobile.stackOrder`. Default stack order = DOM order. |
| Fixed-width row that won't stack on mobile (rating scale, step indicator) | Verify `N × element_width ≤ mobile container width`. If desktop widths don't fit, extract mobile widths from `section-N-mobile.inlined.jsx`. If unfindable, halt and ask the user. |
| Full-width hero or full-width CTA | `mobile.preserveWidth: false` — confirmed fluid element. |
| Anything else with a width | Default `mobile.preserveWidth: true`. |
| Figma asset URL (expires in 7 days) | Capture verbatim. Add the standard "replace expiring Figma URL with hosted CDN URL" open question (`blocking: true`). |
| Font in Figma's `'Family:Weight'` convention | Split: `fontFamily: "Arial"`, weight maps Regular/Normal→400, Medium→500, SemiBold→600, Bold→700, Black→900. Default 400 if absent. |
| Inline run lacks `color`/`fontFamily`/`fontWeight`/`lineHeight` | Walk parent chain in the inlined JSX to find the inherited value. |
| Unresolved Tailwind class (v4-only on SVG mask internals) | Add to `meta.openQuestions`. Don't drop silently. |
| Property is `alignContent: stretch`, `minWidth: 1px`, `position: relative` without absolute children, `overflow: clip/hidden`, `whiteSpace: nowrap` on isolated block | **Figma artifact** — ignore, no rendering effect. |

## Output discipline

- **Don't author JSON for the caller.** Return the *rule* and the *shape*. The agent assembles the spec.
- **Don't generate a build script.** Spec assembly uses the JSONL → `python3 -c` compose pattern in the agent; never write a `build_spec.py` wrapper.
- **Don't restate the entire workflow.** The agent already knows the phase it's in. Answer the specific question.
- **If the rule depends on something the agent didn't include** (a screenshot you can't see, a token value you weren't told), ask one targeted follow-up rather than guess.
