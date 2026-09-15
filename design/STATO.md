# Stato del progetto (memoria per le prossime sessioni)

> Claude: leggi questo file all'inizio di ogni sessione insieme a `PROGRESS.md`.
> Aggiornalo quando cambia qualcosa di strutturale (non a ogni pagina: per quello c'è PROGRESS).
> Ultimo aggiornamento: 2026-09-14

## Chi c'è

- **Sviluppatore**: **Vishu** (repo `roicandesign-bot`). Farà la parte tecnica (Next.js, database, admin) partendo da `docs/`. Con Lorenzo si lavora solo sulle vibes: look, pagine, screenshot.
- **Responsabile design** («il capo»): **Lorenzo**, non è uno sviluppatore. Definirà design e prototipo usando le sessioni Claude Code su questo repo. Con lui: italiano, poche domande, mostrare risultati, correggere a vista.

## Cosa è pronto (fase 1, ambiente)

- Scaffold Vite 8 + React 19 + TypeScript + Tailwind CSS 4, solo frontend, nessuna logica.
- Token di design semantici in `src/styles/tokens.css` (`@theme static`), placeholder neutri da sostituire con `/stile`.
- Componenti base: Button, Card, Container, Section/SectionHeader, Header (menu da `src/routes.tsx`), Footer.
- Pagine: `/` segnaposto, `/styleguide` catalogo vivo dei token e dei componenti.
- `npm run screenshot`: build + cattura di tutte le route a 390/834/1440 in `design/screenshots/` (committati, visibili su GitHub).
- `npm run check`: lint (oxlint) + typecheck + prettier + build. Deve passare prima di ogni commit.
- Skill a step in `.claude/skills/`: inizia, brief, stile, componenti, pagina, verifica, animazioni, accessibilita, consegna; manuale `design-principles`.
- Hook `SessionStart` (sincrono, solo sessioni remote) che esegue `npm install`.
- Permessi pre-approvati in `.claude/settings.json` per npm, prettier, oxlint, node scripts, git add/commit/push.

## GitHub

- Repository: https://github.com/roicandesign-bot/theasher (pubblico).
- Branch di default: **`main`** (impostato manualmente dal proprietario il 2026-09-14).
- Il branch iniziale `claude/dreamy-rubin-8lvx1m` è identico a `main` e può essere eliminato.
- Workflow `check.yml`: lint/typecheck/format/build a ogni push e PR.
- Workflow `deploy-pages.yml`: pubblica su GitHub Pages a ogni push su `main`. **Pages è attivo** (sorgente: GitHub Actions). Primo deploy riuscito il 2026-09-14 (run 2, via workflow_dispatch).
- **Anteprima online:** https://roicandesign-bot.github.io/theasher/ (base path `/theasher/`, gestito da `VITE_BASE` e da `basename` nel router; `404.html` = fallback SPA).

## Limiti noti dell'ambiente remoto (sessioni Claude Code sul web)

- `github.io` **non è raggiungibile** dalle sessioni remote (policy di rete, 403 dal proxy): la verifica del sito pubblicato la fa l'utente aprendo il link. Claude verifica in locale con `npm run screenshot`.
- Le API GitHub autenticate (es. cambiare il branch di default) non sono disponibili: lo strumento GitHub della sessione copre branch, PR, issue, Actions. Per le impostazioni del repo serve l'interfaccia web.
- Chromium per Playwright è pre-installato in `/opt/pw-browsers/chromium`; lo script degli screenshot lo usa come fallback automatico. In locale serve `npx playwright install chromium` una volta.

## Cambio di rotta (2026-09-14)

Il brand ha chiesto l'**e-commerce completo proprietario** (Next.js, PostgreSQL, Prisma, admin, pagamenti ad adapter, 5 lingue, mercati per Paese). Audit e specifica sono in `docs/` (10 file). Le decisioni bloccanti sono in `docs/10-decisioni-bloccanti.md`. Finché non sono approvate il codice resta il prototipo Vite.

Verificato in sessione remota: PostgreSQL 16 si avvia in locale (migrazioni, seed e test integration girano qui), Docker ha solo il client, `github.io` resta bloccato.

## Materiali del brand ricevuti

1. Brand identity board · 2. Mockup e-commerce · 3. Sistema Instagram · 4. Logo · 5. Visual brand manual (PDF, 12 pagine) · 6. **Sistema packaging (15/09)**: tre categorie con colore (Flower viola, Hash arancio, Extract azzurro), busta per i fiori, barattolo per hash ed estratti, gerarchia informazioni, zona lotto e QR. Tutti in `design/inputs/`.

## Prossimo passo

Approvazione delle decisioni → milestone **M0 Fondazione** sul branch `claude/the-hasher-ecommerce-o8r9lt`, poi merge su `main` a fine milestone approvata.
