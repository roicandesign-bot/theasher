---
name: inizia
description: Punto di partenza del processo guidato. Legge design/PROGRESS.md, dice a che punto è il progetto e avvia subito lo step giusto senza fare domande. Usare quando l'utente scrive /inizia, "da dove partiamo", "cosa devo fare", "iniziamo", o apre una sessione senza un obiettivo preciso.
---

# /inizia — dove siamo e cosa facciamo adesso

## Procedura

1. Leggi `design/PROGRESS.md` e `design/BRIEF.md`. Guarda `src/routes.tsx` per sapere quali pagine esistono.
2. Rispondi con **al massimo 6 righe**:
   - una riga di benvenuto che spiega il metodo (cinque step, tu costruisci, l'utente corregge);
   - lo stato: cosa è fatto, cosa manca (usa la tabella di PROGRESS in forma compatta);
   - **lo step che parte adesso**, già avviato.
3. Avvia lo step senza aspettare conferma:
   - Brief mancante → esegui subito la skill `brief`.
   - Brief fatto, stile mancante → esegui subito la skill `stile`.
   - Stile fatto, nessuna pagina vera → chiedi quale pagina fare per prima (proponi la Home) ed esegui `pagina`.
   - Pagine fatte → esegui `verifica` sulle pagine non ancora verificate.
4. Se l'utente ha allegato qualcosa (immagini, testo, link) nel messaggio di `/inizia`, usalo come input dello step che parte.

## Esempio di risposta (prima sessione)

> Ciao! Lavoriamo a step: io costruisco, tu guardi e correggi. Niente lunghe discussioni prima.
> Stato: ambiente pronto, brief e stile ancora da fare, la Home è un segnaposto.
> Partiamo dal brief: mi bastano tre risposte veloci.
>
> 1. …
> 2. …
> 3. …

## Non fare

- Non elencare tutti i comandi disponibili: l'utente non deve impararli, li proponi tu quando servono.
- Non chiedere «vuoi che inizi?». Inizia.
