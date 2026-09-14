---
name: consegna
description: Chiude la fase di prototipo e prepara il passaggio alla fase di sviluppo — inventario pagine e componenti, punti in cui andrà la logica, contenuti da rendere dinamici, cose lasciate in sospeso. Usare quando l'utente scrive /consegna, "passiamo allo sviluppo", "prepara il passaggio", o quando tutte le pagine sono verificate.
---

# /consegna — dal prototipo allo sviluppo

Output: `design/HANDOFF.md` + `design/PROGRESS.md` aggiornato + commit.

## Procedura

1. Esegui `verifica` su tutte le route se l'ultima verifica non è recente.
2. Scrivi `design/HANDOFF.md` con queste sezioni, compatte:
   - **Pagine**: tabella route → file → sezioni → stato.
   - **Componenti**: elenco `src/components/**` con una riga di scopo ciascuno.
   - **Contenuti da rendere dinamici**: ogni file in `src/data/` e da dove verranno i dati veri (CMS, API, form).
   - **Punti di aggancio della logica**: form (quali campi, dove va inviato), CTA, filtri, liste, autenticazione se prevista. Per ognuno: file e componente.
   - **Asset mancanti**: immagini placeholder da sostituire, testi `(assunto)`, font/licenze.
   - **Decisioni aperte**: da `design/DECISIONS.md` e dai dubbi emersi.
   - **Come si avvia**: comandi essenziali.
3. Rimuovi la pagina segnaposto se ancora presente; lascia `/styleguide` (utile in sviluppo).
4. `npm run check`, aggiorna `design/PROGRESS.md` (tutti gli step ✅, nota «prototipo consegnato il <data>»), commit: `Consegna: prototipo pronto per lo sviluppo`.
5. Rispondi con un riepilogo di 5-8 righe e il link al file.
