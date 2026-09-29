# Immagine coordinata The Hasher

- `THE-HASHER-immagine-coordinata.pdf`: il documento da condividere (32 pagine, A4 orizzontale, circa 5 MB).
- `../screenshots/immagine-coordinata-totale.jpg`: tutte le pagine in una tavola sola.
- `immagine-coordinata.html`: la sorgente. Testi, regole e proposte si cambiano qui.
- `img/`: logo rifilato, maschera ad alta risoluzione per il tratto calligrafico, schermate del sito
  e fotogrammi del video usati nel documento.

Per rigenerare il PDF dopo una modifica:

```bash
node scripts/immagine-coordinata.mjs
```

Lo script serve la pagina via http (le maschere CSS non funzionano da file locale), segnala le
pagine che debordano, riduce le foto alla misura di stampa (circa 190 dpi) e scrive il PDF.
Non ricomprimere il PDF con strumenti esterni che riscrivono le immagini: rompono gli sfondi a motivo.

Riprende il Visual Brand Manual originale (`design/inputs/THE_HASHER_VISUAL_BRAND_MANUAL.pdf`)
e lo completa con tutto quello costruito dal 14 al 29 settembre 2026. Cancelleria, email,
spedizione, sigillo, tessera Club, cartellino e post social sono proposte da approvare.
