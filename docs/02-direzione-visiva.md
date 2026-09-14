# 02 · Direzione visiva

Sintesi delle quattro immagini e del brand manual, tradotta in regole operative per il sito.

## Identità in una riga

Il logo porta l'emozione, la griglia porta l'informazione, la fotografia macro prova la qualità, il giallo acido crea memoria. Personalità: **bold, selective, cultured, direct**.

## Palette (e come si usa nel sito)

| Ruolo                | Token                 | Valore                | Uso                                                                          |
| -------------------- | --------------------- | --------------------- | ---------------------------------------------------------------------------- |
| Sfondo pagina        | `bg`                  | `#050505`             | domina ogni superficie                                                       |
| Superficie rialzata  | `surface`             | `#0f0f0f`             | card prodotto, drawer, pannelli                                              |
| Superficie alternata | `bg-alt`              | `#141414`             | sezioni di ritmo, input                                                      |
| Bordi                | `line`                | `#262626`             | card, divisori, input (≥ 3:1 su nero)                                        |
| Testo                | `fg`                  | `#ffffff`             | leggibilità                                                                  |
| Testo secondario     | `fg-muted`            | `#a3a3a3`             | 7,4:1 su nero                                                                |
| Azione               | `primary`             | `#dfff00`             | CTA, prezzi, badge, focus, informazioni prioritarie (testo sopra: `#050505`) |
| Reverse              | `primary` come sfondo | `#dfff00`             | info bar, badge "New Drop", box promozionali (testo nero)                    |
| Stato ok / errore    | `success` / `danger`  | `#4ade80` / `#ff5c5c` | solo messaggi di stato, mai decorativi                                       |

Regole: niente gradienti decorativi, niente colori aggiuntivi, niente glow. Il giallo è **scarso**: una CTA primaria per sezione, prezzi, badge, accenti a diamante.

## Tipografia

| Ruolo                     | Font (Google, self-hosted con `next/font`)                  | Trattamento                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display / titoli          | **Anton**                                                   | maiuscolo, `line-height` 0,92–1, `letter-spacing` 0 / +0,01em, il titolo hero divide la frase in due righe con la seconda in giallo (“PREMIUM CBD. / BOLD CHARACTER.”) |
| Testo e interfaccia       | **Archivo** (variabile, asse larghezza 62–125)              | pesi 400–600, 16–18 px, righe ≤ 70 caratteri, numeri tabellari per prezzi                                                                                              |
| Etichette, eyebrow, badge | Archivo larghezza 75–85, 600, maiuscolo                     | `letter-spacing` +0,12em, 12–13 px                                                                                                                                     |
| Logo                      | **solo** il lettering ufficiale (`public/brand/logo-*.png`) | mai ricreato con un font, mai deformato, un solo colore piatto                                                                                                         |

Motivazione: Anton riproduce il "tall bold impact" dei mockup (titoli altissimi e compatti); Archivo è un grotesk moderno con asse di larghezza, quindi copre con **una sola famiglia** testo, interfaccia ed etichette condensate del label system (“HASH · 3.5 g”).

## Elementi grafici

- **Accento a diamante** ✦: icona SVG 12–16 px, in giallo, per eyebrow, separatori, punti di lista brevi. Non ovunque: uno per blocco.
- **Pattern a tratti**: porzioni ingrandite del logo (mask CSS sul PNG) al 6–10 % di opacità su sfondi neri, o pieni gialli come nel box spedizione. Mai sopra il testo.
- **Bottoni**: pill (`radius 999px`), altezza 48 px, testo maiuscolo Archivo 600 +0,08em, primario giallo pieno con freccia; secondario contorno giallo 1,5 px (l'"ADD TO CART" dei mockup); ghost bianco.
- **Card**: `surface` con bordo `line`, raggio 12 px, immagine `aspect-square` o 4:3 in alto, contenuto sotto. Nessuna ombra sul nero (non si vede): usare il bordo.
- **Badge**: rettangolo giallo testo nero maiuscolo (“NEW”, “BEST SELLER”, “LIMITED DROP”); disponibilità con pallino verde/grigio.

## Fotografia

Macro di hash e fiore, texture nitide, fondi neri o pietra, luce controllata, contrasto alto ma realistico. Il prodotto è protagonista; niente foglie decorative, fumo, cliché. Le foto attuali sono ritagli demo dai mockup e vanno sostituite.

## Layout di riferimento (dal mockup e-commerce)

1. Info bar gialla: pill “18+”, «Legal CBD products · EU shipping · Discreet packaging» · claim a destra. Configurabile dall'admin.
2. Header nero sticky: logo (≈ 110 px desktop, 84 px mobile centrato), menu Hash / CBD Flower / New Drops / About, ricerca, account, carrello con contatore giallo.
3. Hero split: titolo su due righe (bianco / giallo), lead 2 righe, CTA «Shop the drop →», tre micro-badge (Premium quality · EU sourced · Discreet shipping); a destra foto prodotto. **Su mobile** il prodotto sta sopra, titolo e CTA visibili entro la prima schermata, altezza ≈ 70 % dello schermo, non 100 %.
4. Due card categoria (Hash · CBD Flower) con foto a destra e CTA contorno.
5. Best seller: 3 card, nome, profilo aromatico (“CITRUS / EARTHY / SMOOTH”), prezzo in giallo, «Add to cart» contorno.
6. Banda “Crafted with character” con paesaggio in bianco e nero e CTA «Our story».
7. Trust bar: Lab tested · EU shipping · Secure checkout.
8. Footer: logo, link, social, claim.

## Miglioramenti rispetto al mockup (conversione e chiarezza)

- Prezzo **sempre con prezzo al grammo** e formato selezionato; disponibilità reale dal magazzino.
- Trust bar e link «Analisi di laboratorio» **subito sotto la hero**, non solo in fondo.
- Sezioni aggiunte in home: New drop, qualità e selezione, laboratorio, recensioni verificate (solo se esistono), bundle/correlati, newsletter con incentivo configurabile, FAQ.
- Ricerca predittiva nel header; menu mobile a schermo intero con categorie e link fiducia.
- CTA sticky «Aggiungi al carrello» su mobile nella pagina prodotto; drawer carrello con barra soglia spedizione gratuita.
- Copy in italiano/inglese senza claim medici; tono diretto, competente, essenziale.
- Contrasto verificato (giallo su nero 17:1, bianco su nero 20:1, muted 7,4:1), focus visibile giallo, target tap ≥ 44 px.
