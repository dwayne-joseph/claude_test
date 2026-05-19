# Workflow Test Checklist

End-to-end verification for the new `/email` pipeline. Run in a **fresh Claude Code session** so SessionStart hooks fire and no prior context skews results.

## 0 — Pre-flight (one-time, before first run)

- [ ] Repo cloned fresh or `git pull` is clean (`git status` shows nothing modified)
- [ ] Figma MCP server is connected (`/mcp` lists it)
- [ ] `jq` is on PATH (`which jq`) — the PostToolUse hook uses it to parse hook input
- [ ] Pick a small test email design in Figma — ideally one already extracted previously (e.g., `tzield-v1`) so you have a known-good comparison

## 1 — SessionStart hook (Tailwind check)

- [ ] Start a new Claude Code session in this repo
- [ ] At session start, the Tailwind check fires. Expected: a short stderr line like `>>> using npx tailwindcss@3.4` (or `bundled Tailwind` / `tailwindcss on PATH`)
- [ ] If the hook fails: the session start surfaces an error mentioning Tailwind. Fix by installing `tailwindcss@3.4` or setting `TAILWIND_CLI` before continuing

## 2 — Project memory (CLAUDE.md)

- [ ] Ask Claude: *"What's the workflow in this repo?"* — it should answer using `CLAUDE.md` without you having to point at it
- [ ] Ask: *"Where do email outputs go?"* — should answer `emails/<email-name>/`

## 3 — Slash command registration

- [ ] Type `/email` in the prompt — autocomplete should show the command with the argument hint `<desktop-url> <mobile-url> <email-name>`
- [ ] Run `/email` with no arguments — it should halt and print the usage

## 4 — Skills register as advisors (not orchestrators)

- [ ] Run `/skills` (or `/help`) — both `figma-interpret` and `email-render` should appear
- [ ] Each description should mention "focused advisor" (not "extract" or "render the full workflow")

## 5 — End-to-end run: `/email <desktop-url> <mobile-url> <name>`

Use a small email design for the first test (5–8 sections, not 20+).

### Extraction phase

- [ ] Claude invokes the `figma-extractor` subagent (you should see it spawn in the UI)
- [ ] Phase 0: full-email screenshots are fetched at both breakpoints **before** any metadata or JSX
- [ ] `emails/<name>/pre-scan.md` gets written and lists every section with paired node IDs
- [ ] Phase 3a: `emails/<name>/jsx/section-N-{desktop,mobile}.jsx` (+ `.png`) exist for every section
- [ ] Phase 3b: `bash .claude/scripts/resolve-tailwind.sh emails/<name>/jsx` runs once, producing `decoded.css` + `.inlined.jsx` per section. Stderr reports the unresolved-classes count (zero or just SVG mask classes)
- [ ] Phase 3c: `emails/<name>/plan.md` gets written. Every section has a judgment entry covering structural pattern + primitives + mobile deltas
- [ ] **Advisor skill is invoked** — at least one `figma-interpret` skill call should appear in the transcript for an ambiguous moment (overlay, scaffolding color, fixed-width row). If none fires, either the design is unusually clean or the agent isn't reaching for the advisor (worth investigating)
- [ ] Phase 3d/4: `emails/<name>/sections.jsonl` is built section-by-section, then composed into `emails/<name>/spec.json`
- [ ] **PostToolUse hook fires automatically** when `spec.json` is written — you see `✅ ... is valid` (or errors that the agent then fixes)
- [ ] No interrupt prompts for `resolve-tailwind.sh` or `validate-spec.py` (permissions allowlist working)
- [ ] **No `build_spec.py` or similar generator script** was created in `emails/<name>/` — JSON came from the JSONL → `python3 -c` compose pattern

### Render phase

- [ ] Claude invokes the `email-renderer` subagent (separate spawn, **separate context window**)
- [ ] In the new agent's transcript, Figma JSX / base64 screenshots from extraction are **absent** — this is the main token win. Verify by asking the renderer to repeat any specific JSX content it saw; it should not have access
- [ ] Step 1: spec is read; `specVersion` confirmed `2.x`
- [ ] Step 3: `emails/<name>/render-plan.md` is written before any HTML
- [ ] **Advisor skill is invoked** — at least one `email-render` skill call appears in the transcript for a primitive lookup (multiColumn, list, button, VML, or a specific CSS class)
- [ ] Step 4–5: `emails/<name>/index.html` is built. For 10+ section emails, it's written in chunks (not one giant Write)
- [ ] **PostToolUse hook fires** on the HTML write — validator runs automatically
- [ ] No interrupt prompts for `validate-html.py`
- [ ] **No `build_html.py` or generator script** was created — HTML was authored directly via `Write`/`Edit`

### Final summary

- [ ] Claude reports: section count, verbatim sections, validation result for both spec and HTML, open questions (especially any `blocking: true`)

## 6 — Output verification (manual)

Open `emails/<name>/index.html` in a browser:

- [ ] Renders at 600px width on desktop
- [ ] At narrow viewport (< 480px), the `width360` media query kicks in
- [ ] No `<div>` used for layout (`grep -c '<div' emails/<name>/index.html` should be very low or zero)
- [ ] No `<ul>`, `<ol>`, `<li>` (`grep -E '<(ul|ol|li)\b' emails/<name>/index.html` returns nothing)
- [ ] No `<p>`, `<h1>`–`<h6>`, `<strong>`, `<em>` tags
- [ ] All `<img>` tags have `alt`, `width`, `height`, and `style="border: 0; display: block;"`
- [ ] No scaffolding colors (the hex codes listed in `annotations.stripColors`) appear in the HTML

## 7 — Failure-mode tests (optional but valuable)

- [ ] Deliberately corrupt `spec.json` (change a required field to garbage), trigger a Write somehow — PostToolUse validator should surface the error inline
- [ ] Re-run `/email` with the same name — agents should overwrite cleanly (no half-merged files)
- [ ] Run only `email-renderer` directly via the Task tool with an existing `spec.json` — should re-render without re-running extraction

## 8 — Token / context sanity check

- [ ] Compare context usage between the old skills-only flow and the new agent flow (eyeball, not exact). The renderer agent's context should not show any Figma JSX or full-email base64 from extraction
- [ ] Inspect: did either agent read `rendering-patterns.md` or `json-format.md` in full? It should NOT have — only focused sections via the advisor skills
