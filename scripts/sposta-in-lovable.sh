#!/usr/bin/env bash
# Sposta il sito The Hasher dentro il repo creato da Lovable.
# Uso (dal tuo computer, con git e bun installati):
#   bash scripts/sposta-in-lovable.sh https://github.com/roicandesign-bot/safe-cracker-tool.git
set -euo pipefail
REPO="${1:?Manca l indirizzo del repo di Lovable}"
QUI="$(cd "$(dirname "$0")/.." && pwd)"
DST="$(mktemp -d)/lovable"

echo "→ Scarico il repo di Lovable"
git clone -q "$REPO" "$DST"
cd "$DST"

echo "→ Tolgo la pagina demo di Lovable e i componenti con lo stesso nome dei nostri"
git rm -q src/routes/index.tsx src/lib/hash.ts src/routeTree.gen.ts \
  src/components/ui/button.tsx src/components/ui/badge.tsx src/components/ui/card.tsx src/components/ui/input.tsx

echo "→ Copio il sito: pagine, componenti, dati, stili, immagini"
cp -r "$QUI/src/components/." src/components/
cp -r "$QUI/src/data" "$QUI/src/pages" "$QUI/src/styles" src/
cp "$QUI"/src/lib/*.ts "$QUI"/src/lib/*.tsx src/lib/
cp "$QUI/src/routes.tsx" "$QUI/src/App.tsx" src/
cp -r "$QUI/public/." public/ && rm -f public/favicon.ico

echo "→ Copio memoria di progetto, documentazione, database, skill di Claude"
mkdir -p design && cp "$QUI"/design/*.md design/
cp -r "$QUI/docs" "$QUI/supabase" . && mkdir -p .claude && cp -r "$QUI/.claude/skills" .claude/
cp "$QUI/CLAUDE.md" "$QUI/PROJECT_BRIEF.md" "$QUI/.prettierrc" .
mkdir -p scripts && cp "$QUI/scripts/genera-seed.mjs" scripts/

echo "→ Guscio Lovable: il sito intero come unica pagina, solo lato browser"
cp -r "$QUI/lovable/src/." src/

echo "→ Dipendenze che a Lovable mancano"
if command -v bun >/dev/null 2>&1; then
  bun add react-router-dom@^7.9.0 motion@^12.23.0 @fontsource/anton@^5.3.0 @fontsource-variable/archivo@^5.3.0
  bun add -d prettier-plugin-tailwindcss
  echo "→ Provo la build"
  bun run build
else
  # Senza bun: scrivo le dipendenze in package.json e lascio che Lovable installi e costruisca.
  sed -i 's/"dependencies": {/"dependencies": {\n    "@fontsource-variable\/archivo": "^5.3.0",\n    "@fontsource\/anton": "^5.3.0",\n    "motion": "^12.23.0",\n    "react-router-dom": "^7.9.0",/' package.json
  sed -i 's/"devDependencies": {/"devDependencies": {\n    "prettier-plugin-tailwindcss": "^0.6.14",/' package.json
  echo "  (bun non trovato: salto la build, la farà Lovable)"
fi

echo "→ Salvo e pubblico su GitHub (Lovable si aggiorna da solo)"
git add -A
git commit -q -m "Il sito The Hasher entra nel progetto Lovable: pagine, stile, dati e documentazione"
git push -q origin HEAD
echo "✔ Fatto. Apri Lovable: il sito è quello di Lorenzo. Poi collega Supabase al progetto The Hasher esistente."
