---
name: stile
description: Step 2 del processo — definisce i token di design (palette, font, scala tipografica, spaziature, raggi, ombre) in src/styles/tokens.css e li mostra nella pagina /styleguide. Usare quando l'utente scrive /stile, parla di colori, font, palette, tipografia, brand, "look", allega un brand book o una moodboard, o chiede modifiche globali come "più caldo", "più moderno", "più scuro".
argument-hint: [indicazioni su colori/font oppure "da screenshot"]
---

# /stile — il sistema che tiene tutto coerente

Output: `src/styles/tokens.css` aggiornato, font caricati in `index.html`, screenshot di `/styleguide`.
Prima di iniziare leggi `.claude/skills/design-principles/SKILL.md` (sezioni Colore e Tipografia).

## Procedura

1. **Raccogli gli input** senza chiedere: `design/BRIEF.md` (aggettivi, riferimenti, brand esistente), immagini in `design/inputs/` o allegate, `$ARGUMENTS`.
   - Da uno screenshot: stima gli hex dei colori principali (sfondo, testo, primario, accento), riconosci il font (o l'equivalente più vicino su Google Fonts), misura le proporzioni (raggi, spaziature).
   - Senza input: scegli tu una direzione coerente coi tre aggettivi del brief. **Non chiedere** «che colori vuoi?».
2. **Scrivi i token** in `src/styles/tokens.css` (mantieni i nomi semantici esistenti, i componenti li usano):
   - colori semantici: `bg`, `bg-alt`, `surface`, `fg`, `fg-muted`, `line`, `primary`, `primary-fg`, `primary-hover`, `accent`, `accent-fg` + stati;
   - scala `brand-50…950` derivata dal colore principale;
   - `--font-display` (titoli) e `--font-sans` (testo): al massimo due famiglie;
   - scala tipografica fluida (`display`, `h1`, `h2`, `h3`, `lead`, `eyebrow`): adatta i `clamp()` al carattere del brand (editoriale = titoli più grandi, corporate = più contenuti);
   - raggi (`card`, `button`), ombre, `spacing-section`.
   - Verifica il contrasto testo/sfondo ≥ 4.5:1 e primary-fg/primary ≥ 4.5:1.
3. **Font**: aggiungi i `<link>` Google Fonts in `index.html` (preconnect + stylesheet, solo i pesi usati: di solito 400/500/600/700). Se il brand ha un font proprietario fornito come file, mettilo in `public/fonts/` con `@font-face` in `index.css`.
4. Se aggiungi token semantici nuovi, aggiungili anche alle liste in `src/pages/Styleguide.tsx`.
5. `npm run check`, poi `npm run screenshot -- --routes /,/styleguide --viewports desktop,mobile` e **guarda** gli screenshot: contrasto, font caricati (se vedi il fallback di sistema, il link è sbagliato), gerarchia leggibile.
6. Annota in `design/DECISIONS.md` la scelta (una riga: palette + font + perché). Aggiorna `design/PROGRESS.md` (step 2 ✅ o 🟡).
7. Commit: `Stile: palette <nome> + font <nome>`.
8. Chiudi: «Guarda /styleguide (screenshot in design/screenshots/styleguide--desktop.png). Dimmi cosa cambiare, oppure passo ai componenti».

## Se l'utente è indeciso tra due direzioni

Non discutere: costruisci la seconda come variante e mostra entrambe. La variante si fa duplicando il blocco `@theme` in un file temporaneo `src/styles/tokens.alt.css` e catturando due screenshot; poi si tiene una sola.

## Correzioni tipiche → dove agire

| L'utente dice                 | Modifica                                                       |
| ----------------------------- | -------------------------------------------------------------- |
| «più caldo / freddo»          | tinta di `bg`, `bg-alt`, `fg-muted`, `line` (non solo primary) |
| «più moderno»                 | font display geometrico/grotesk, raggi più piccoli, più bianco |
| «più elegante»                | serif per i titoli, contrasto tipografico alto, meno colore    |
| «più aria»                    | `--spacing-section`, `--text-lead`, line-height                |
| «i bottoni sono troppo tondi» | `--radius-button`                                              |
