#!/usr/bin/env bash
# PostToolUse hook for mcp__*__get_design_context
# Saves JSX code + footer comment to disk so the model never needs a Write call.
#
# Determines output path from the nodeId in tool_input:
#   - node matching the desktopFrameNodeId  → jsx/desktop-frame.jsx
#   - node matching the mobileFrameNodeId   → jsx/mobile-frame.jsx
#   - any other node                        → jsx/section-<nodeId>.jsx
#
# The workDir is resolved from the cwd + emails/ convention: the script scans
# emails/*/jsx/ to find the most-recently-modified working directory, or falls
# back to FIGMA_WORK_DIR env var if set.

set -euo pipefail

INPUT="$(cat)"

NODE_ID="$(echo "$INPUT" | jq -r '.tool_input.nodeId // empty' | tr ':' '-')"
[ -z "$NODE_ID" ] && exit 0

# Extract JSX (first text block) and footer blocks (remaining text blocks)
JSX="$(echo "$INPUT" | jq -r '.tool_response[0].text // empty')"
[ -z "$JSX" ] && exit 0

# Strip SUPER CRITICAL block from end of JSX (everything from "SUPER CRITICAL" onward)
JSX="$(echo "$JSX" | awk '/^SUPER CRITICAL:/{exit} {print}')"

# Collect footer lines (blocks 1+ that aren't the SUPER CRITICAL block)
FOOTER="$(echo "$INPUT" | jq -r '
  .tool_response[1:][]
  | select(.type == "text")
  | .text
' | grep -v "^SUPER CRITICAL" | grep -v "^1\. Analyze" | grep -v "^2\. Convert" | grep -v "^3\. Transform" | grep -v "^4\. Follow" | grep -v "^DO NOT install")"

# Resolve work dir
if [ -n "${FIGMA_WORK_DIR:-}" ]; then
  WORK_DIR="$FIGMA_WORK_DIR"
else
  # Find newest emails/*/jsx dir
  WORK_DIR="$(find emails -maxdepth 2 -name jsx -type d -printf '%T@ %p\n' 2>/dev/null \
    | sort -n | tail -1 | awk '{print $2}' | sed 's|/jsx||')"
fi

[ -z "$WORK_DIR" ] && { echo "[save-figma-jsx] cannot determine work dir, skipping" >&2; exit 0; }

JSX_DIR="$WORK_DIR/jsx"
mkdir -p "$JSX_DIR"

# Map nodeId to filename
DESKTOP_NODE="$(cat "$WORK_DIR/.figma-nodes" 2>/dev/null | jq -r '.desktop // empty' | tr ':' '-')"
MOBILE_NODE="$(cat "$WORK_DIR/.figma-nodes" 2>/dev/null | jq -r '.mobile // empty' | tr ':' '-')"

if [ "$NODE_ID" = "$DESKTOP_NODE" ]; then
  OUT="$JSX_DIR/desktop-frame.jsx"
elif [ "$NODE_ID" = "$MOBILE_NODE" ]; then
  OUT="$JSX_DIR/mobile-frame.jsx"
else
  OUT="$JSX_DIR/section-${NODE_ID}.jsx"
fi

{
  echo "$JSX"
  if [ -n "$FOOTER" ]; then
    printf '\n/* FIGMA RESPONSE FOOTER\n'
    echo "$FOOTER"
    printf '*/\n'
  fi
} > "$OUT"

echo "[save-figma-jsx] wrote $OUT" >&2
