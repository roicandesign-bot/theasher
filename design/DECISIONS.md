# Decisioni di design

> Una riga per decisione non ovvia. Serve a non ridiscutere le stesse cose.
> Formato: data · decisione · perché

- 2026-09-14 · Stack Vite + React + Tailwind v4 con token semantici in `tokens.css` · cambiare un colore in un punto solo
- 2026-09-14 · Screenshot committati in `design/screenshots/` · chi disegna li vede su GitHub senza avviare nulla
- 2026-09-14 · `main` è il branch di default, il sito pubblico è la versione di `main` · una sola fonte per il capo
- 2026-09-14 · Anteprima su GitHub Pages (https://roicandesign-bot.github.io/theasher/) invece di ambienti locali · chi disegna guarda un link, non avvia nulla
- 2026-09-14 · Hook di avvio sincrono · Claude non lancia mai build o screenshot prima che le dipendenze siano pronte
- 2026-09-14 · Richiesta del brand: e-commerce completo proprietario (fase 2 anticipata), non più solo prototipo · specifica in `docs/`, in attesa di approvazione delle decisioni bloccanti
- 2026-09-14 · Logo estratto dal PNG fornito con alpha dalla luminanza e colore piatto (`public/brand/logo-*.png`) · rispetta la regola "mai ridisegnato, un solo colore, nessun effetto"
- 2026-09-14 · Foto demo = ritagli dai mockup, marcate demo in `public/images/demo/README.md` · unica fonte con la direzione fotografica corretta finché non arrivano foto ufficiali
- 2026-09-14 · Font proposti: Anton (display) + Archivo variabile (testo, UI, etichette condensate) · una famiglia per tutto il testo, display "tall bold impact" dei mockup
- 2026-09-14 · Tema unico scuro · il brand manual impone il nero come superficie dominante
- 2026-09-14 · Lorenzo (responsabile design, non tecnico) guida le vibes; Vishu (sviluppatore) la parte tecnica · il prototipo Vite resta il posto dove si decide il look, `docs/` è per lo sviluppo
- 2026-09-14 · Font self-hosted via pacchetti fontsource (Anton, Archivo variabile con asse larghezza) · Google Fonts non raggiungibile dalla sessione e più veloce in produzione
- 2026-09-14 · Claim del brand in inglese (Premium CBD. Bold character. / Shop the drop / Good plants. Brighter days.), testi in italiano · le linee ufficiali restano intatte, il resto parla al cliente
- 2026-09-14 · Menu e CTA puntano alle sezioni della home (#hash, #cbd-flower, #new-drop, #story) finché le pagine non esistono · nessun link morto
- 2026-09-14 · Recensioni in home marcate «esempio» · nel sito reale solo acquisti verificati
- 2026-09-14 · Lo script screenshot scorre la pagina prima di catturare · le immagini lazy sotto la piega altrimenti restano vuote
- 2026-09-15 · Tolto il secondo bottone dalla hero (Analisi di laboratorio) · una sola CTA per sezione, il link alle analisi resta nel footer e nella pagina prodotto
- 2026-09-15 · Pagina prodotto a un solo indirizzo con parametro (`/prodotto/:slug`): tutte le card del sito portano al prodotto giusto · una pagina sola da mantenere
- 2026-09-15 · Barra di acquisto in basso su mobile solo dopo aver superato il bottone principale · non copre il prodotto appena apri la pagina
- 2026-09-15 · Prezzo al grammo mostrato su ogni formato · rende confrontabili 1 / 3,5 / 5 / 10 g senza calcoli
