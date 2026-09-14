# Theasher — prototipo frontend

Ambiente per progettare e prototipare il frontend del sito, guidati da Claude Code.
Solo interfaccia, niente logica: quella arriva nella fase di sviluppo.

## Per chi disegna (nessuna installazione richiesta)

1. Apri una sessione di Claude Code su questo repository (claude.ai/code o l'app).
2. Scrivi **`/inizia`**. Claude ti dice a che punto è il progetto e parte con lo step giusto.
3. Segui i cinque step, uno alla volta. Ogni step produce qualcosa da guardare.

| Step | Comando        | Cosa succede                                                       |
| ---- | -------------- | ------------------------------------------------------------------ |
| 1    | `/brief`       | Due o tre domande, poi Claude scrive il brief in `design/BRIEF.md` |
| 2    | `/stile`       | Colori, font, spaziature. Li vedi nella pagina `/styleguide`       |
| 3    | `/componenti`  | Bottoni, card, header, footer e sezioni riutilizzabili             |
| 4    | `/pagina Nome` | Costruisce una pagina intera. Ripeti per ogni pagina               |
| 5    | `/verifica`    | Screenshot su mobile, tablet e desktop, poi correzioni             |

Extra: `/animazioni`, `/accessibilita`, `/consegna` (prepara il passaggio allo sviluppo).

**Come lavorare bene con Claude qui**

- Puoi allegare screenshot, export da Figma, foto, moodboard: Claude li riproduce.
- Non serve usare i comandi: scrivi cosa vuoi («fammi la pagina Servizi come in questo screenshot») e Claude capisce lo step.
- Claude non ti farà molte domande: costruisce, mostra, e tu correggi («più aria», «titolo più grande», «colori più caldi»).
- Gli screenshot delle pagine sono in `design/screenshots/`: li vedi direttamente su GitHub.
- Il sito pubblicato è sempre su https://roicandesign-bot.github.io/theasher/ (versione di `main`).

## Per chi sviluppa

```bash
npm install
npm run dev            # http://localhost:5173
npm run check          # lint + typecheck + format + build
npm run screenshot     # screenshot di tutte le pagine a 3 viewport → design/screenshots/
npx playwright install chromium   # una volta sola, per gli screenshot in locale
```

Stack: Vite 8, React 19, TypeScript, Tailwind CSS 4, react-router-dom, lucide-react, motion.
Struttura e regole complete in [`CLAUDE.md`](./CLAUDE.md).

### Anteprima online (GitHub Pages)

**https://roicandesign-bot.github.io/theasher/** — si aggiorna da sola a ogni push su `main` (1-2 minuti).
Il workflow è `.github/workflows/deploy-pages.yml`; Pages è già attivo con sorgente "GitHub Actions".

### Sessioni Claude Code sul web

`.claude/hooks/session-start.sh` installa le dipendenze all'avvio di ogni sessione remota,
così lint, build e screenshot funzionano subito. Le skill dei singoli step sono in `.claude/skills/`.
