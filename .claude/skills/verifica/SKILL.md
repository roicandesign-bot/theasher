---
name: verifica
description: Step 5 del processo — genera gli screenshot di tutte le pagine a mobile/tablet/desktop, li esamina con una checklist di qualità visiva e responsive, corregge i problemi trovati e ricattura. Usare quando l'utente scrive /verifica, chiede "com'è venuto", "controlla che sia tutto a posto", "fammi vedere", o dopo aver completato una o più pagine.
argument-hint: [route da verificare, es. /, /servizi — vuoto = tutte]
---

# /verifica — guardare davvero il risultato

Output: `design/screenshots/*.png` aggiornati, problemi corretti, `design/PROGRESS.md` aggiornato.

## Procedura

1. `npm run check` (deve passare; se fallisce sistemi prima).
2. `npm run screenshot` (o `-- --routes $ARGUMENTS`). Lo script segnala anche gli errori console: risolvili.
3. **Apri e osserva ogni screenshot** (usa lo strumento di lettura immagini). Per ognuno passa la checklist:

   **Mobile (390)**
   - nessuno scroll orizzontale, nessun testo o immagine che esce dal bordo;
   - titoli che vanno a capo bene (`text-balance`), niente parole spezzate brutte;
   - bottoni a tutta larghezza o affiancati con spazio, tap target ≥ 44px;
   - menu mobile funzionante (cattura anche con menu aperto se lo hai cambiato);
   - immagini con proporzioni sensate, non giganti.

   **Tablet (834)**
   - griglie a 2 colonne dove a desktop erano 3-4, non 1 colonna sprecata;
   - hero non troppo alto, testo non troppo largo.

   **Desktop (1440)**
   - contenuto centrato nel `max-w-content`, gutter coerenti;
   - righe di testo ≤ 75 caratteri (`max-w-prose`);
   - ritmo verticale uniforme tra sezioni, alternanza sfondi sensata;
   - gerarchia: si capisce in 5 secondi cosa fa il sito e cosa cliccare;
   - hover/focus visibili su link e bottoni (controlla il codice);
   - niente "effetto template": tutto centrato, card tutte uguali, gradienti a caso.

   **Sempre**
   - contrasto testo/sfondo, in particolare `fg-muted` su `bg-alt`;
   - un solo `h1`, ordine titoli corretto, `alt` sulle immagini;
   - contenuti coerenti col brief (nomi, CTA, tono), niente placeholder dimenticati.

4. **Correggi** subito tutto ciò che è oggettivo (overflow, contrasto, spazi incoerenti, titoli). Per le questioni di gusto proponi la modifica già fatta e chiedi se tenerla.
5. Ricattura le route toccate e ricontrolla.
6. Aggiorna `design/PROGRESS.md` (colonna «Ultima verifica» con la data, step 5 ✅ se tutte le pagine sono verificate). Commit: `Verifica: <cosa è stato corretto>`.
7. Rispondi con: elenco correzioni fatte (max 5 righe), eventuali dubbi di gusto (max 2, con la tua proposta), link ai file screenshot.

## Regola

Non dire mai «sembra tutto a posto» senza aver aperto gli screenshot. Se non riesci a generarli (Chromium assente), dillo esplicitamente e chiedi all'utente di eseguire `npm run screenshot` in locale.
