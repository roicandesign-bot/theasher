# Avanzamento

> Aggiornato da Claude a fine di ogni step. `/inizia` legge questo file.

| Step             | Stato       | Note                                                                                              |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| 1. Brief         | ✅ fatto    | Dalla richiesta del brand + brand manual (`docs/`)                                                |
| 2. Stile (token) | ✅ fatto    | Palette The Hasher, Anton + Archivo self-hosted, `/styleguide`                                    |
| 3. Componenti    | ✅ fatto    | Button, Badge, Chip, Price, Logo, Diamond, StrokePattern, ProductCard, InfoBar, Header, Footer    |
| 4. Pagine        | ✅ v1       | 34 route pronte: home, negozio, prodotto, carrello, checkout, account, racconto, servizio, legale |
| 5. Verifica      | 🟡 in corso | Screenshot a 3 viewport a ogni modifica; correzioni di Lorenzo da raccogliere                     |
| + Animazioni     | ✅ fatto    | Reveal all'ingresso, transizioni, rispetto di «riduci animazioni»                                 |

Legenda: ⬜ da fare · 🟡 in corso · ✅ fatto

## Pagine

| Gruppo                                 | Route                                                        | Stato                                              | Ultima verifica |
| -------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- | --------------- |
| Home                                   | `/`                                                          | ✅ v2 (tre famiglie)                               | 2026-09-27      |
| Negozio e prodotto                     | `/negozio`, `/prodotto/:slug`                                | ✅ v3 (barra unica, 4 colonne, scheda in evidenza) | 2026-09-28      |
| Acquisto                               | `/carrello`, `/checkout`, `/ordine/:numero`                  | ✅ v1                                              | 2026-09-27      |
| Area cliente                           | `/accedi`, `/registrati`, `/account`, `/account/*`           | ✅ v1                                              | 2026-09-27      |
| Racconto                               | `/azienda`, `/journal`, `/contatti`, `/diventa-distributore` | ✅ v1                                              | 2026-09-27      |
| Servizio e legale                      | `/analisi`, `/faq`, `/cerca`, `/preferiti`, 7 pagine legali  | ✅ v1                                              | 2026-09-27      |
| Pagine di lavoro (non per il pubblico) | `/stato`, `/prezzi`, `/mappa`, `/styleguide`                 | ✅                                                 | 2026-09-27      |

## Catalogo

Tassonomia completa a catalogo (37 prodotti demo): quattro linee (CBD, THC-X, CBG, CBN) più l'etichetta THC free × tre famiglie
(Fiori, Hash, Estratti). Fiori per coltivazione e tipologia, hash per lavorazione, consistenza e
colore, estratti per metodo di estrazione, tutti con i cannabinoidi dichiarati.
Nomi, prezzi e foto sono demo: si sostituiscono con l'archivio vero senza toccare la struttura.

## Foto

La filiera in home usa cinque foto del brand rilavorate (`public/images/filiera/`, originali in
`design/inputs/filiera/`, trattamento con `scripts/look-hasher.py`). Le foto prodotto sono ancora
ritagli demo dai mockup.

## Prossima azione consigliata

Foto e nomi veri dei prodotti (archivio Roican: va allegato in chat o sbloccato nelle impostazioni
di rete dell'ambiente). Poi listino definitivo a partire da `/prezzi`.
