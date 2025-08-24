#!/usr/bin/env bash
set -euo pipefail

GOOD_COMMIT="${1:-}"
if [ -z "$GOOD_COMMIT" ]; then
  echo "Usage: scripts/freeze-ui.sh <GOOD_COMMIT_HASH>"
  exit 1
fi

git fetch --all
git checkout "$GOOD_COMMIT" -- dist/

rm -rf deploy/*
mkdir -p deploy
cp -r dist/* deploy/

# API 用 functions はそのまま維持
mkdir -p deploy/functions

echo "✅ UI frozen from commit $GOOD_COMMIT into deploy/"