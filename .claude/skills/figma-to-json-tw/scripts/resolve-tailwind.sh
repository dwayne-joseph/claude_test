#!/usr/bin/env bash
#
# resolve-tailwind.sh — Run the Tailwind CLI over every .jsx file in a directory,
# then rewrite each .jsx so className="..." becomes style={{...}}.
#
# Usage:
#   resolve-tailwind.sh <jsx-directory>
#
# Reads:
#   <jsx-directory>/*.jsx   — JSX files saved during Phase 3a
#
# Writes:
#   <jsx-directory>/decoded.css       — the Tailwind-resolved stylesheet
#   <jsx-directory>/*.inlined.jsx     — one inlined JSX file per input JSX
#
# Resolves Tailwind in this order:
#   1. TAILWIND_CLI env var (caller override)
#   2. The web-Claude bundled path (mermaid-cli's tailwindcss)
#   3. `tailwindcss` on PATH
#   4. `npx -y tailwindcss@3.4` (Claude Code local fallback)
# Exits non-zero only if none of the above work.

set -euo pipefail

# ----------------------------------------------------------------------------
# Locate Tailwind
# ----------------------------------------------------------------------------
WEB_CLAUDE_TAILWIND="/home/claude/.npm-global/lib/node_modules/@mermaid-js/mermaid-cli/node_modules/tailwindcss/lib/cli.js"

# TW_RUN is an array — the command + leading args to invoke Tailwind. The caller
# appends -c/-i/-o/--no-autoprefixer at the call site.
TW_RUN=()

if [ -n "${TAILWIND_CLI:-}" ] && [ -f "$TAILWIND_CLI" ]; then
  TW_RUN=(node "$TAILWIND_CLI")
  echo ">>> using TAILWIND_CLI override: $TAILWIND_CLI" >&2
elif [ -f "$WEB_CLAUDE_TAILWIND" ]; then
  TW_RUN=(node "$WEB_CLAUDE_TAILWIND")
  echo ">>> using bundled Tailwind: $WEB_CLAUDE_TAILWIND" >&2
elif command -v tailwindcss >/dev/null 2>&1; then
  TW_RUN=(tailwindcss)
  echo ">>> using tailwindcss on PATH" >&2
elif command -v npx >/dev/null 2>&1; then
  TW_RUN=(npx -y tailwindcss@3.4)
  echo ">>> using npx tailwindcss@3.4 (will download on first run)" >&2
else
  cat >&2 <<EOF

ERROR: Tailwind CLI not available. Tried:
  1. \$TAILWIND_CLI env var (not set or file missing)
  2. $WEB_CLAUDE_TAILWIND (not found)
  3. tailwindcss on PATH (not found)
  4. npx (not found)

Install one of: npm i -g tailwindcss@3.4, or ensure npx is on PATH.

EOF
  exit 1
fi

# ----------------------------------------------------------------------------
# Locate this script's own directory (so we can find inline-styles.py next to it)
# ----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INLINE_STYLES="$SCRIPT_DIR/inline-styles.py"

if [ ! -f "$INLINE_STYLES" ]; then
  echo "ERROR: inline-styles.py not found next to resolve-tailwind.sh" >&2
  exit 1
fi

# ----------------------------------------------------------------------------
# Parse args
# ----------------------------------------------------------------------------
if [ $# -ne 1 ]; then
  echo "usage: resolve-tailwind.sh <jsx-directory>" >&2
  exit 2
fi

JSX_DIR="$1"

if [ ! -d "$JSX_DIR" ]; then
  echo "ERROR: not a directory: $JSX_DIR" >&2
  exit 2
fi

# Use shopt or nullglob to handle the case where no .jsx files exist
shopt -s nullglob
JSX_FILES=("$JSX_DIR"/*.jsx)
# Exclude any existing .inlined.jsx files from a previous run
FILTERED=()
for f in "${JSX_FILES[@]}"; do
  case "$f" in
    *.inlined.jsx) ;;
    *) FILTERED+=("$f") ;;
  esac
done
JSX_FILES=("${FILTERED[@]}")

if [ ${#JSX_FILES[@]} -eq 0 ]; then
  echo "ERROR: no .jsx files found in $JSX_DIR" >&2
  exit 2
fi

# ----------------------------------------------------------------------------
# Step 1: Run Tailwind CLI once across all JSX files in the directory.
# ----------------------------------------------------------------------------
TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

# Minimal Tailwind config: scan the JSX directory, no preflight (we don't want
# baseline resets — we only want class rules).
cat > "$TMPDIR/tailwind.config.js" <<EOF
module.exports = {
  content: ['$JSX_DIR/*.jsx'],
  corePlugins: { preflight: false },
}
EOF

# Minimal input CSS: just request utility class generation.
echo "@tailwind utilities;" > "$TMPDIR/input.css"

CSS_OUT="$JSX_DIR/decoded.css"

echo ">>> running Tailwind CLI over ${#JSX_FILES[@]} JSX file(s)..." >&2
"${TW_RUN[@]}" \
  -c "$TMPDIR/tailwind.config.js" \
  -i "$TMPDIR/input.css" \
  -o "$CSS_OUT" \
  --no-autoprefixer 2>&1 | sed 's/^/  /' >&2

if [ ! -s "$CSS_OUT" ]; then
  echo "ERROR: Tailwind CLI produced no output" >&2
  exit 1
fi

RULE_COUNT=$(grep -c '^\.' "$CSS_OUT" || true)
echo ">>> $CSS_OUT contains $RULE_COUNT class rules" >&2

# ----------------------------------------------------------------------------
# Step 2: For each input JSX, run inline-styles.py to produce a .inlined.jsx
# ----------------------------------------------------------------------------
echo ">>> inlining styles into ${#JSX_FILES[@]} file(s)..." >&2

for jsx in "${JSX_FILES[@]}"; do
  base="$(basename "$jsx" .jsx)"
  out="$JSX_DIR/$base.inlined.jsx"
  python3 "$INLINE_STYLES" "$jsx" "$CSS_OUT" > "$out"
done

echo ">>> done. Inlined JSX files written next to each source JSX." >&2
