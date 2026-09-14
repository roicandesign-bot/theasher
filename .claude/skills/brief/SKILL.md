---
name: brief
description: Step 1 del processo — raccoglie il brief del sito con al massimo tre domande e lo scrive in design/BRIEF.md. Usare quando l'utente scrive /brief, descrive per la prima volta il progetto o il cliente ("vorrei un sito per…", "siamo un'azienda che…"), o quando il brief è vuoto e si sta per costruire qualcosa.
argument-hint: [descrizione libera del progetto]
---

# /brief — capire cosa costruiamo

Obiettivo: un `design/BRIEF.md` compilato in **una sola andata**, non un questionario.

## Procedura

1. Leggi `design/BRIEF.md` (template) e tutto ciò che l'utente ha già scritto o allegato (`$ARGUMENTS`, immagini, `design/inputs/`).
2. Compila **da solo** tutto ciò che si può dedurre o assumere ragionevolmente.
3. Fai **al massimo 3 domande**, numerate, in un unico messaggio, solo sulle cose che cambiano davvero il risultato. In ordine di importanza:
   1. Cosa fa il brand e cosa deve ottenere il sito (contatti? vendita? presentazione?).
   2. Quali pagine servono (proponi tu una lista tipica per quel tipo di sito: l'utente toglie/aggiunge).
   3. Riferimenti di stile: tre aggettivi, oppure «mandami 1-2 siti che ti piacciono o uno screenshot».
4. Alla risposta, scrivi `design/BRIEF.md` completo. Le voci senza risposta le riempi con un'assunzione marcata `(assunto)`.
5. Aggiorna `src/data/site.ts` (nome, tagline, CTA, contatti) e `index.html` (`<title>`, `description`, `lang`).
6. Aggiorna `design/PROGRESS.md`: step 1 ✅, elenco pagine previste nella tabella Pagine.
7. Commit: `Brief: <nome brand>`.
8. Chiudi proponendo lo step 2: «Passo allo stile: ti mostro una proposta di colori e font in /styleguide».

## Se l'utente risponde a metà

Vai avanti lo stesso con le assunzioni. Non rifare le domande.

## Se l'utente allega Figma/screenshot già in questa fase

Compila il brief dagli screenshot (pagine, sezioni, tono) e passa direttamente a `stile` estraendo i token dalle immagini. Non chiedere nulla che sia già visibile nelle immagini.
