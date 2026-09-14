---
name: accessibilita
description: Controllo rapido di accessibilità del prototipo (contrasto, semantica, focus, alt, tastiera, titoli) con correzioni immediate. Usare quando l'utente scrive /accessibilita, chiede "è accessibile?", "controlla i contrasti", o prima della consegna.
argument-hint: [route, vuoto = tutte]
---

# /accessibilita — il minimo che non si negozia

## Checklist (per ogni pagina in `src/routes.tsx` o in `$ARGUMENTS`)

1. **Struttura**: un solo `h1`; `h2`/`h3` in ordine senza salti; landmark (`header`, `nav`, `main`, `footer`, `section` con titolo).
2. **Contrasto**: testo normale ≥ 4.5:1, testo grande (≥ 24px o ≥ 19px bold) ≥ 3:1. Verifica le coppie dei token: `fg`/`bg`, `fg-muted`/`bg`, `fg-muted`/`bg-alt`, `primary-fg`/`primary`, testo su `tone="dark"`. Calcola il rapporto con uno script Node se serve (formula WCAG) e correggi i token, non le singole pagine.
3. **Immagini**: `alt` descrittivo, oppure `alt=""` se decorativa. Placeholder: `role="img"` + `aria-label` se rappresentano un contenuto.
4. **Interazione**: tutto raggiungibile da tastiera; focus visibile (già in `index.css`); bottoni solo icona con `aria-label`; link con testo comprensibile fuori contesto (no «clicca qui»).
5. **Form (solo UI)**: ogni campo con `<label>` associata, `autocomplete` sensato, errori non affidati al solo colore.
6. **Movimento**: `prefers-reduced-motion` rispettato.
7. **Testo**: dimensione base ≥ 16px, line-height ≥ 1.5 nei paragrafi, nessun testo in immagini.
8. **Lingua**: `lang="it"` in `index.html`; `<title>` e `meta description` sensati.

## Procedura

1. Leggi il codice delle pagine e dei componenti; esegui uno script veloce per i contrasti dei token se hai dubbi.
2. Correggi direttamente ciò che è oggettivo. Elenca in risposta cosa hai cambiato e cosa resta (max 5 righe).
3. `npm run check`, screenshot se hai toccato colori o layout, commit: `Accessibilità: <cosa>`.
