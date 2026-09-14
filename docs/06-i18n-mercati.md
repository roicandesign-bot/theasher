# 06 · Lingue, mercati e valute

## Lingue

`en` (predefinita e fallback), `it`, `fr`, `de`, `es`. Routing con prefisso (`/it/...`), `hreflang` su tutte le pagine, `x-default` → `en`.

| Cosa                                                | Dove vive                                                            | Come si aggiunge una lingua                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Testi di interfaccia (menu, bottoni, errori, email) | `messages/{locale}.json` + override in tabella `Translation` (admin) | nuovo file JSON copiato da `en`, lingua aggiunta in `src/modules/i18n/config.ts` |
| Catalogo, categorie, FAQ, pagine, journal           | tabelle `*Translation` con fallback a `en`                           | tab nell'admin; le voci mancanti sono segnalate                                  |
| Testi legali                                        | `ContentPage` di tipo `LEGAL` **per Paese e lingua**                 | l'admin duplica e adatta                                                         |
| Formattazione date, numeri, valute                  | `Intl` con il locale corrente                                        | automatica                                                                       |

Nessuna stringa hardcoded nei componenti: lint blocca i testi letterali nelle pagine storefront.

## Mercati (`CountryRule`)

Il **mercato** è il Paese di consegna, scelto esplicitamente dall'utente (mai forzato dalla geolocalizzazione: al massimo un suggerimento). Determina:

- se si può vendere e spedire (`isSellingEnabled`, `isShippingEnabled`)
- valuta e listino (`VariantPrice` per mercato, altrimenti prezzo base in EUR)
- aliquota IVA applicata e regole di visualizzazione (prezzi B2C sempre IVA inclusa in UE, **da verificare** regime OSS e soglie)
- age gate (età minima, obbligatorietà) e testi di avvertenza
- tipologie di prodotto ammesse (`allowedProductTypes`, es. solo `FLOWER` in un Paese) e restrizioni per singolo prodotto (`ProductMarketAvailability`)
- zone e tariffe di spedizione, soglia spedizione gratuita
- lingua predefinita

Set iniziale proposto (tutti disattivati finché il brand non conferma): IT, DE, FR, ES, NL, BE, AT, PT, IE, LU. Valuta EUR; CHF e GBP predisposti a livello di modello (CH e UK richiedono verifiche doganali e legali separate).

## Persistenza della scelta

Cookie `hasher_market` (Paese, valuta) + locale nell'URL. Il carrello è legato al mercato: cambiando Paese i prezzi si ricalcolano e gli articoli non vendibili vengono segnalati, non rimossi in silenzio.

## SEO multilingua

Sitemap con alternates per lingua, canonical per locale, metadata tradotti da `*Translation`, breadcrumb e dati strutturati `Product`/`Offer` solo con dati reali (prezzo, valuta, disponibilità dal magazzino).
