# Pacchetto legale The Hasher: cosa c'è, cosa manca, dove sono i rischi

Nota riservata per Lorenzo e Vishu, 28/09/2026. Non va pubblicata.

## Cosa è online nel prototipo

| Pagina                         | Indirizzo                 | Base normativa principale                                                |
| ------------------------------ | ------------------------- | ------------------------------------------------------------------------ |
| Condizioni generali di vendita | `/termini`                | Codice del Consumo artt. 45–67, Reg. Roma I art. 6                       |
| Resi, recesso e garanzia       | `/resi`                   | artt. 52–59 (recesso, esclusioni), 128 ss. (garanzia), modulo tipo       |
| Spedizioni                     | `/spedizioni`             | artt. 61 (ritardo), 63 (passaggio del rischio)                           |
| Pagamenti                      | `/pagamenti`              | PSD2, PCI DSS                                                            |
| Informativa privacy            | `/privacy`                | GDPR artt. 6, 13, 15–22, 28, 46; Codice Privacy art. 130 c. 4            |
| Cookie policy + banner         | `/cookie`                 | Codice Privacy art. 122, Linee guida Garante 10/6/2021                   |
| Avvertenze e uso dei prodotti  | `/avvertenze`             | Codice del Consumo artt. 104 ss. (sicurezza), RAEE, Reg. 2016/2031       |
| Note legali                    | `/legale`                 | DPR 633/72 art. 35, art. 22 c. 4-bis (recensioni), D.Lgs. 82/2022        |
| Regolamento sconti             | `/promozioni`             | art. 17-bis (prezzo più basso 30 giorni, Omnibus)                        |
| Condizioni rivenditori (B2B)   | `/condizioni-rivenditori` | c.c. artt. 1495, D.Lgs. 231/2002, divieto prezzi imposti (art. 101 TFUE) |
| FAQ                            | `/faq`                    | allineate a tutte le pagine sopra                                        |

Le due pagine indicate da Lorenzo (Rollz Europe, termini; Califarms, FAQ) non sono raggiungibili
dalla rete di questo ambiente: i testi sono scritti da zero, sugli stessi temi. Non si copiano
testi di altri siti: sono protetti da diritto d'autore e scritti per leggi e aziende diverse.

Banner cookie adeguato: la X chiude e rifiuta, pulsante «Rifiuta» accanto ad «Accetta tutti»,
scelta valida 6 mesi, link «Preferenze cookie» nel footer per cambiarla.

## Da completare prima del lancio (tocca a Lorenzo)

1. **Dati della società** in `src/data/legale.ts` → `titolare`: ragione sociale, sede, P. IVA,
   REA, capitale, PEC. Si aggiornano da soli in tutte le pagine e nel footer (la P. IVA nel footer
   è obbligatoria).
2. **Paese della società che vende.** I testi sono scritti per una società italiana. Se il venditore
   sarà la società ceca o svizzera del gruppo, cambiano legge applicabile, autorità privacy e
   riferimenti: si riadattano in un giorno.
3. **Fornitori reali** (hosting, pagamenti, corriere, email): vanno nominati nella privacy e
   ciascuno deve firmare l'accordo art. 28 GDPR.
4. **Strumenti statistici e pubblicitari**: prima di attivarne uno va aggiunto alla cookie policy
   con nome, fornitore e durata, e il banner deve bloccarlo fino al consenso.
5. **Registro dei trattamenti** (art. 30 GDPR): documento interno, lo prepariamo con i fornitori veri.

## Mappa dei rischi per prodotto

Legenda: 🟢 vendibile con le regole normali · 🟡 vendibile con accorgimenti · 🔴 non vendere senza parere scritto per quel Paese.

| Prodotto                       | Italia | Resto UE | Perché, e cosa fare                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fiori, hash, preroll, cannagar | 🔴     | 🟡       | In Italia il decreto sicurezza (DL 48/2025, convertito nella L. 80/2025, art. 18) vieta vendita e cessione di infiorescenze di canapa e prodotti derivati: verificare lo stato dei ricorsi al lancio. Negli altri Paesi regole diverse per limite di THC (0,2–1 %) e uso consentito.                                                                                                       |
| Estratti                       | 🔴     | 🟡       | Stesso problema se derivano dalle infiorescenze.                                                                                                                                                                                                                                                                                                                                           |
| Oli                            | 🟡     | 🟡       | Come alimento il CBD è un «novel food» non autorizzato nell'UE (Reg. 2015/2283). Soluzione usata dal mercato: olio **cosmetico per uso esterno**, notificato sul portale CPNP (Reg. 1223/2009), con persona responsabile nell'UE ed etichetta cosmetica. In Italia le composizioni orali di CBD sono oggetto di decreti del Ministero della Salute e di ricorsi: niente oli «da ingerire». |
| Edibles (gommose, caramelle)   | 🔴     | 🔴       | Alimenti con cannabinoidi: novel food non autorizzato in tutta l'UE. Rischio di ritiro, sanzioni e blocco dei pagamenti. Consiglio: tenerli solo dove un legale locale li approva per iscritto, oppure toglierli.                                                                                                                                                                          |
| Vape e cartucce                | 🔴     | 🟡       | In Italia i prodotti da inalazione senza nicotina pagano l'accisa e la vendita a distanza ai consumatori è limitata (D.Lgs. 504/1995, art. 62-quater). Negli altri Paesi: notifica e regole della direttiva tabacco (2014/40/UE) dove applicabili, batteria = RAEE.                                                                                                                        |
| THC-X                          | 🔴     | 🔴       | Cannabinoidi semisintetici: molti Paesi li hanno messi nelle tabelle degli stupefacenti (l'Italia l'HHC nel 2023). Vendere solo con parere scritto per singolo Paese e singola molecola.                                                                                                                                                                                                   |
| THC-A                          | 🔴     | 🔴       | Quasi ovunque la legge misura il THC totale (THC + THC-A): un prodotto «ricco di THC-A» supera il limite. Rischio penale, non solo amministrativo.                                                                                                                                                                                                                                         |
| Semi                           | 🟢     | 🟢/🟡    | Vendibili quasi ovunque come collezione. Coltivare varietà non certificate è vietato in Italia: le avvertenze lo dicono. Genetiche THC: in alcuni Paesi (es. Francia, Germania con regole proprie) servono verifiche.                                                                                                                                                                      |
| Cloni                          | 🟡     | 🟡       | Piante vive: servono il **passaporto delle piante** (Reg. UE 2016/2031) e l'iscrizione al registro degli operatori professionali (in Italia RUOP). In Italia la coltivazione è ammessa da seme certificato: le talee sono una zona grigia. Consiglio: solo B2B verso coltivatori autorizzati.                                                                                              |
| Merch e accessori              | 🟢     | 🟢       | Accendini: norme di sicurezza (EN ISO 9994 e a prova di bambino). Tessili: etichetta di composizione.                                                                                                                                                                                                                                                                                      |

## Altre cose che un'ispezione guarda per prima

- **Nessun claim salutistico** in schede, social e packaging («rilassa», «aiuta a dormire», «antinfiammatorio»): è pubblicità ingannevole e, per i cannabinoidi, un invito a sequestrare. Il nome «Notte» va bene, «aiuta a dormire» no.
- **Età**: 18+ all'ingresso (fatto), al checkout (da fare nello sviluppo) e alla consegna dove il corriere lo prevede.
- **Recensioni**: solo da ordini consegnati, e la pagina lo dice (art. 22 c. 4-bis). Nello sviluppo va costruito davvero così.
- **Prezzi barrati**: il sistema deve salvare lo storico prezzi per mostrare il minimo dei 30 giorni. Va nella specifica per Vishu.
- **Pagamenti**: i fornitori trattano il CBD come categoria ad alto rischio. Il sito deve già avere tutte queste pagine prima della richiesta del conto.
- **Franchising**: prima di firmare con un affiliato, documento informativo con 30 giorni di anticipo (L. 129/2004), già annotato in `/strategia`.
- **Accessibilità** (D.Lgs. 82/2022): obbligatoria per l'e-commerce dal 28/6/2025, salvo microimprese (meno di 10 persone e fatturato sotto 2 milioni).
- **Piattaforma ODR**: chiusa il 20/7/2025, non va più linkata (nelle pagine è già così).
