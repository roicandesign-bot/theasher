# Theasher — prototipo frontend

Prototipo **solo frontend** (UI, nessuna logica) di un sito web.
Fase 1 (ora): design e prototipo, guidati da un responsabile design che **non è uno sviluppatore**.
Fase 2 (dopo): sviluppo con logica, API, backend. Non anticiparla.

## Con chi parli e come

- Parla in **italiano**, semplice, senza gergo tecnico se non serve. Non incollare codice nelle risposte a meno che non venga chiesto.
- Mostra **risultati**, non spiegazioni: una pagina, una sezione, uno screenshot.
- Risposte corte. Chiudi ogni intervento con: cosa ho fatto (2-3 righe), dove guardare, prossimo step proposto (1 riga).

## Regola d'oro: FAI, POI CORREGGI

1. **Massimo 1 domanda per volta**, e solo se davvero bloccante. Altrimenti decidi tu, dichiaralo in una riga («Ho assunto X, dimmi se cambia») e vai avanti.
2. Ogni intervento finisce con **qualcosa di visibile**. Mai un messaggio che è solo un piano o un elenco di opzioni.
3. Se serve una scelta di gusto (due palette, due hero), **costruisci entrambe** e mostrale, non descriverle.
4. Le correzioni («più aria», «più scuro», «meno tondo», «titolo più grande») si fanno subito: token o componente → screenshot → mostra.
5. Non chiedere conferma prima di fare: fai, mostra, chiedi «va bene così?».

## Il processo a step

Lo stato è in `design/PROGRESS.md`: leggilo all'inizio di ogni sessione e aggiornalo a fine step.

| Step | Comando          | Produce                                                                |
| ---- | ---------------- | ---------------------------------------------------------------------- |
| 0    | `/inizia`        | Dice a che punto siamo e cosa fare adesso                              |
| 1    | `/brief`         | `design/BRIEF.md`: chi, per chi, pagine, tono, riferimenti             |
| 2    | `/stile`         | `src/styles/tokens.css` + font in `index.html` + `/styleguide`         |
| 3    | `/componenti`    | `src/components/ui/*` e sezioni riutilizzabili                         |
| 4    | `/pagina <nome>` | Una pagina in `src/pages/` registrata in `src/routes.tsx` (ripetibile) |
| 5    | `/verifica`      | Screenshot a 3 viewport + checklist + correzioni                       |
| +    | `/animazioni`    | Micro-interazioni e transizioni                                        |
| +    | `/accessibilita` | Controllo accessibilità di base                                        |
| +    | `/consegna`      | Riepilogo per la fase di sviluppo                                      |

- Se l'utente **non usa i comandi**, capisci da solo lo step (uno screenshot di Figma = `/pagina` o `/stile`; «vorrei un sito per…» = `/brief`) e procedi come se lo avesse invocato.
- Brief e stile minimi vengono **prima** delle pagine. Se mancano e l'utente vuole già una pagina: fai un brief lampo (max 2 domande), scegli token provvisori, costruisci la pagina, poi segnala che brief e stile andranno rifiniti.
- Prima di `/stile`, `/componenti`, `/pagina` leggi `.claude/skills/design-principles/SKILL.md`.

## Input di design

- **Immagini allegate** (Figma, screenshot, foto, moodboard): analizzale con cura e riproducile fedelmente: layout, gerarchia, proporzioni, colori (stima gli hex), font (riconoscilo o scegli l'equivalente su Google Fonts), spaziature. Se arrivano come file, copiali in `design/inputs/`.
- **Link Figma** non leggibili: chiedi un export PNG delle schermate (unica domanda ammessa).
- **Descrizione a parole**: costruisci una proposta concreta e mostrala.
- Annota le scelte non ovvie in `design/DECISIONS.md` (una riga ciascuna).

## Stack e struttura

Vite + React 19 + TypeScript + Tailwind CSS v4. Router `react-router-dom`, icone `lucide-react`, animazioni `motion` + CSS. Alias `@/` → `src/`.

```
src/styles/tokens.css      token di design (@theme static): colori, font, spazi, raggi, ombre
src/styles/index.css       base, varianti (hocus), utility (container-content, container-prose)
src/components/ui/         mattoni: Button, Card, Container, Section, SectionHeader…
src/components/layout/     Header, Footer
src/components/sections/   sezioni riutilizzabili tra pagine (Hero, Features, CTA…) — crea la cartella al bisogno
src/pages/                 una pagina = un file (PascalCase)
src/routes.tsx             elenco pagine: router + menu + screenshot leggono da qui
src/data/                  contenuti statici (testi, liste, contatti). Niente fetch.
design/                    BRIEF, PROGRESS, DECISIONS, inputs/, screenshots/
scripts/screenshot.mjs     cattura tutte le route a mobile/tablet/desktop
```

## Comandi

```
npm run dev          server di sviluppo (http://localhost:5173)
npm run check        lint + typecheck + format + build   ← deve passare prima di dire «fatto»
npm run screenshot   build + screenshot in design/screenshots/  (opzioni: --routes /,/x  --viewports mobile,desktop)
npm run format       formatta tutto con Prettier
```

## Regole di codice (frontend only)

- **Niente logica**: no API, no auth, no form funzionanti (i form sono solo UI con `onSubmit` che fa `preventDefault`). Stato locale solo per la UI (menu, tab, accordion, carousel).
- **Sempre i token semantici** (`bg-bg`, `text-fg`, `text-fg-muted`, `bg-primary`, `border-line`, `rounded-card`…). Mai colori o font hardcoded nelle pagine. Se manca un token, aggiungilo in `tokens.css` e nella Styleguide.
- **Contenuti realistici in italiano**, coerenti col brief. Mai «Lorem ipsum».
- **Immagini**: se l'utente le fornisce vanno in `public/images/`. Altrimenti placeholder locali (blocchi con `bg-brand-200`, gradienti, SVG) con `aspect-*` corretto. Niente immagini da URL esterni.
- **Responsive mobile-first**, verificato a 390 / 834 / 1440 px. Testi con `text-balance`/`text-pretty`, mai overflow orizzontale.
- **Accessibilità di base**: `alt` sensati, contrasto ≥ 4.5:1 sul testo, focus visibile, un solo `h1` per pagina, ordine dei titoli, target tap ≥ 44 px, `aria-label` su bottoni solo icona.
- **Componenti**: props semplici, varianti con `cn()`. Nessuna libreria UI esterna (shadcn, MUI…) salvo richiesta esplicita.
- Formattazione: Prettier (`npm run format`). Nomi file: componenti e pagine in PascalCase, il resto in kebab/camel.

## Come chiudere ogni intervento

1. `npm run check` deve passare.
2. `npm run screenshot` (o solo le route toccate) e **guarda** gli screenshot: se qualcosa è storto, sistemalo prima di rispondere.
3. Aggiorna `design/PROGRESS.md` se lo step è concluso.
4. Commit con messaggio chiaro in italiano (es. `Pagina Servizi: hero, griglia servizi, CTA`). Gli screenshot in `design/screenshots/` si committano: l'utente li vede su GitHub.
5. Rispondi in modo breve: fatto / dove guardare / prossimo step.
