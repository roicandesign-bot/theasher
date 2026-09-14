#!/bin/bash
# Installa le dipendenze all'avvio delle sessioni remote di Claude Code (web),
# così lint, typecheck, build e screenshot funzionano subito.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Chromium per Playwright è già pre-installato nell'ambiente remoto:
# evita il download durante npm install.
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

if [ ! -d node_modules ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
  npm install --no-audit --no-fund
fi

echo "session-start: dipendenze pronte"
