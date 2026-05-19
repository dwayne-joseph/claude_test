---
name: email-render
description: Focused advisor for HTML email rendering questions. Use when the email-renderer agent (or a user mid-render) needs a targeted answer about a primitive's HTML shape, a CSS bank class, the section-wrapper architecture, responsive line breaks, VML background patterns, or phone-number link handling. Looks up only the relevant section of rendering-patterns.md or css-bank.md and returns a focused answer rather than dumping the full 33KB pattern reference into the caller's context.
---

# email-render

This skill is an **advisor**, not a workflow. The `email-renderer` agent (`.claude/agents/email-renderer.md`) owns the Step 1–5 render flow. When that agent — or a user driving rendering by hand — needs the HTML shape for a specific primitive or the CSS class for a specific behavior, it calls this skill and gets back a focused answer.

## What this skill is for

Return targeted guidance for a single render decision. Typical questions:

- "Give me the multiColumn pattern for two stacking columns with a vertical divider that disappears on mobile."
- "What's the bulletproof button HTML for a CTA with a 24px-radius pill shape?"
- "How do I render a list with bullet icons (not dots) and 16px gap?"
- "I have a `\n` in a desktop-narrow text block — what's the parallel-block pattern?"
- "Which CSS class hides an element on desktop and shows it on mobile?"
- "Bulletproof phone-number `tel:` link wrapper for an ISI section."
- "VML background block for a hero with live text overlay."

Anything that requires *the HTML shape of a primitive*, *a CSS class lookup*, or *a rendering-rule clarification* belongs here.

## What this skill is NOT for

- Driving the render workflow — that's the `email-renderer` agent.
- Reading the JSON spec — the agent does that.
- Writing the final HTML file — the agent does that.
- Loading the full 33KB `references/rendering-patterns.md` or 15KB `references/css-bank.md` into the caller's context. The whole point of this advisor is to return a focused answer.

## How to answer a question

1. **Identify the primitive or behavior** the question is about.
2. **Open ONLY the matching section** of the reference. Use the lookup table below.
3. **Return the pattern verbatim** (it's a contract — clients are picky), plus any inline-style overrides the agent should make for this specific instance, plus the CSS bank classes the snippet needs.
4. **If the caller is missing a value** (a color, an alt, a width), state which field of the JSON spec it should come from rather than inventing a default.

## Internal references — section lookup table

| Caller question | File | Section |
|---|---|---|
| Outer wrapper / section padding architecture | `references/rendering-patterns.md` | "Section wrapper — standard (single-layer)" and "Section wrapper — nested" |
| `image` primitive HTML | `references/rendering-patterns.md` | image patterns |
| `textBlock` primitive HTML | `references/rendering-patterns.md` | textBlock patterns |
| `button` primitive HTML (incl. pill/rounded) | `references/rendering-patterns.md` | button / bulletproof button |
| `list` primitive HTML (bullet/icon/numbered) | `references/rendering-patterns.md` | list (table-based, no `<ul>/<ol>/<li>`) |
| `multiColumn` HTML (stacking, dividers, ghost-table-free) | `references/rendering-patterns.md` | multiColumn |
| `spacer` HTML | `references/rendering-patterns.md` | spacer |
| VML background for hero with live text | `references/rendering-patterns.md` + `references/vml-background.html` | VML background |
| Responsive line-break pattern for `\n` | `references/rendering-patterns.md` | parallel desktop/mobile blocks |
| Phone-number `tel:` link wrapper | `references/rendering-patterns.md` | phone-number link pattern |
| Specific utility class — `block-cell`, `padR0`, `padB24`, `border-none`, `hide`, `showMob`, `footerPhoneMobile`, `mobilePhoneISI`, etc. | `references/css-bank.md` | matching class |
| Base resets / `<style>` block assembly | `references/css-bank.md` | base resets section |
| Base template skeleton, MSO block | `references/base-template.html` | full file |

## Ground rules — always apply

These are non-negotiable. If a caller asks "can I use…", the answer is no:

| Rule | Why |
|---|---|
| Tables only — no `<div>` for layout | Outlook ignores `display` on divs |
| All CSS inline | Most clients strip `<style>` blocks |
| No `<p>`, `<strong>`, `<em>`, `<h1>`–`<h6>` | Unpredictable rendering — use `<td>` with inline styles |
| No `<ul>`, `<ol>`, `<li>` | Outlook inconsistency — use the table-based bullet pattern |
| `padding` as 4-value shorthand only | Never `padding-top` etc. inline |
| `bgcolor` + `background-color` — always both | Outlook ignores CSS-only |
| `width`/`height` as attribute + CSS — always both | On `<img>` and fixed `<td>`/`<th>` |
| One outer cell owns section padding + bgcolor | Inner content rows carry no section-level padding or bg |
| `<br class="hideBR">` for responsive breaks — **forbidden** | Doesn't survive style-strip — use parallel desktop/mobile blocks |

## Annotation transforms (applied as the agent renders text)

- **`stripBrackets: true`** — remove `[` and `]` from editorial placeholders; keep the content inside.
- **`stripColors`** — if a text run's `color` is in this list, drop the override; the run inherits the parent block's color.
- **`recolorMap`** — if a text run's color matches a key, render with the mapped value.

Never let a scaffolding color reach the rendered HTML.

## Output discipline

- **Don't render the email for the caller.** Return the *pattern* and the *classes*. The agent does the rendering.
- **Don't generate a build script.** HTML is authored directly via `Write`/`Edit`, in chunks for emails with 10+ sections. Never write a Python/Node generator script that emits HTML — it adds an abstraction layer with its own bugs and hides judgment from review.
- **Don't restate the full workflow.** Answer the specific question.
- **If a pattern in the reference looks wrong for this instance**, flag it as an open question rather than improvising — the references are the contract.
