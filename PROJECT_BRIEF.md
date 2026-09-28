# PROJECT_BRIEF — The Hasher

> Contesto completo per un'altra istanza AI che non ha accesso al codice. Fonte: repository
> `roicandesign-bot/theasher` al 28/09/2026 (49 commit, branch `main` e
> `claude/the-hasher-ecommerce-o8r9lt` allineati). Dove qualcosa non si deduce dal codice è scritto
> «non chiaro dal codice» e ripreso in fondo nelle domande aperte.

## 1. Cos'è The Hasher

- **Brand**: THE HASHER, «Premium CBD hash & CBD flower, selected in Europe». Claim ufficiali in
  inglese («Premium CBD. Bold character.», «Shop the drop», «Good plants. Brighter days.»), testi
  del sito in italiano. Tono: diretto, sicuro, premium. Mai medicale, mai «stoner», niente urgenza
  falsa.
- **Chi c'è dietro**: il gruppo **Roican** (produttore con catalogo molto ampio: coltiva, estrae,
  confeziona, spedisce). Per scelta **non è nominato nelle pagine pubbliche**: si parla di «gruppo
  che coltiva, estrae, confeziona e spedisce» e di «prezzi da produttore».
- **Cosa risolve**:
  - per il cliente, un brand affidabile con prezzo chiaro (anche al grammo), analisi di laboratorio
    per lotto e spedizione discreta in UE;
  - per il gruppo, un canale diretto B2C più una rete B2B (rivenditori, distributori, ambassador,
    franchising).
- **Utenti**:
  - B2C: adulti 18+ in Europa, arrivano da Instagram, ricerca e passaparola;
  - B2B: negozi, distributori, creator/influencer, aspiranti franchisee.
- **Stato**: **prototipo solo frontend** (fase 1: design). Nessun backend, database, pagamento o
  login reale.
  - Online su GitHub Pages: https://roicandesign-bot.github.io/theasher/
  - La fase 2 (e-commerce vero) è **specificata** in `docs/` ma non avviata. Le decisioni bloccanti
    di `docs/10` risultano ancora in attesa di approvazione.
- **Persone**:
  - **Lorenzo**: responsabile design, non sviluppatore. Guida il prototipo tramite sessioni
    Claude Code.
  - **Vishu**: sviluppatore della fase 2.
  - **Claude**: disegna e costruisce le pagine.
  - Consulente legale, fotografo e laboratorio sono esterni, da incaricare.

## 2. Stack tecnico

**Prototipo (in produzione su Pages)**

| Area         | Tecnologia e versione (da `package.json`)                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| Build        | Vite ^8.3.0, `@vitejs/plugin-react` ^6.1.1                                                                        |
| UI           | React ^19.2.8, react-dom ^19.2.8, TypeScript ~6.0.2 (strict)                                                      |
| Stile        | Tailwind CSS ^4.1.13 (`@tailwindcss/vite`), token in `@theme static`, `clsx` + `tailwind-merge` ^3.3.1 via `cn()` |
| Routing      | react-router-dom ^7.9.0 (`BrowserRouter` con `basename` = `BASE_URL`)                                             |
| Icone e moto | lucide-react ^0.545.0, motion ^12.23.0                                                                            |
| Font         | self-hosted: `@fontsource/anton` ^5.3.0, `@fontsource-variable/archivo` ^5.3.0 (asse larghezza)                   |
| Qualità      | oxlint ^1.81.0, Prettier ^3.6.2 + `prettier-plugin-tailwindcss` ^0.6.14, `tsc -b`                                 |
| Screenshot   | Playwright ^1.56.0 (Chromium), `scripts/screenshot.mjs`                                                           |
| CI/CD        | GitHub Actions, Node 22: `check.yml` (ogni push/PR), `deploy-pages.yml` (push su `main` → Pages)                  |
| Asset        | script Python 3 (numpy, Pillow, scipy, imageio-ffmpeg) per pack prodotto e video. Nessun `requirements.txt`       |

- Database, API, servizi esterni a runtime: **nessuno**.
- Immagini di render generate con **Higgsfield** (AI, esterno) durante il design: non è un
  servizio usato dal sito.

**Fase 2 pianificata (`docs/03`, non implementata)**

- Applicazione: Next.js 16 App Router (storefront + admin + API in un progetto).
- Dati e validazione: PostgreSQL 16 + Prisma 7, Zod + React Hook Form.
- Lingue: `next-intl` in 5 lingue (en di default, it, fr, de, es).
- Autenticazione: proprietaria (argon2id, sessioni in DB) con permessi per ruolo (RBAC).
- Servizi esterni come adapter:
  - pagamenti: `bank-transfer`, `sandbox`, `stripe` spento;
  - file: storage S3;
  - email: SMTP/Resend con React Email.
- Log e test: pino, Vitest, Playwright + axe.
- Deploy: Docker con `docker-compose` (app, postgres, minio, mailpit).
- Hosting proposto: Vercel + Neon/Supabase oppure VPS con Docker.

**Odoo e n8n**: compaiono **solo come testo** nel piano di crescita (`/strategia`): «casse
collegate a Odoo, riassortimento automatico con n8n». Non c'è alcuna integrazione nel codice, né
nella specifica tecnica di `docs/`.

## 3. Architettura

```
src/
  main.tsx, App.tsx      bootstrap, layout globale (InfoBar, Header, Footer, AgeGate, CookieBanner, PopupSconto)
  routes.tsx             UNICA fonte delle pagine: router + menu + screenshot (40 voci, flag inNav, bare, screenshotPath)
  styles/tokens.css      token semantici (colori, font, scala tipografica, raggi, ombre, colori famiglia fam-*)
  styles/index.css       base, variante `hocus`, utility (container-content, no-scrollbar…)
  components/ui/         mattoni: Button, Badge, Chip, Price (prezzo/unità), ProductCard, NomeProdotto, Attivo, Reveal, Parallax…
  components/layout/     Header (mega menu Shop), Footer, InfoBar, AgeGate, CookieBanner, PopupSconto
  components/sections/   IntroVideo, Filiera, B2B, GruppoForza, Passi, FaqLista, StrisciaScorrevole
  components/shop/       FilterSheet, FamigliaSheet, CartDrawer, CartLineRow, FreeShippingBar, AccountNav
  pages/                 una pagina = un file (Home, Shop, Product, Cart, Checkout, Account, Franchising, TextPage…)
  data/                  TUTTI i contenuti statici: products, famiglie, merch, site, legale, contenuti, home, account, prezzi, strategia, stato, sitemap
  lib/                   cart.tsx (Context), filtri.ts (filtri negozio), money.ts, asset.ts, cn.ts, coloriFamiglie.ts
public/                  brand/ (logo), images/ (demo, filiera, prodotti, merch, azienda, franchising), video/ (intro MP4+WebM)
scripts/                 screenshot.mjs, pack-*.py / busta-*.py / blister / boccetta / vaschetta (pack), video-intro.py, look-hasher.py
design/                  memoria di progetto (STATO, PROGRESS, DECISIONS, BRIEF, LEGALE, MERCH), inputs/, screenshots/ (147 file), archivio-font/
docs/                    specifica fase 2: 01 audit … 10 decisioni bloccanti
.claude/                 skill a step (inizia, brief, stile, componenti, pagina, verifica…), hook di avvio, permessi
```

**Flusso dei dati**:

- I moduli in `src/data/*.ts` passano alle pagine e ai componenti. Niente fetch.
- Lo stato dei filtri del negozio sta nei **parametri dell'URL** (`lib/filtri.ts`): famiglia,
  linea, tipologia, lavorazione, cannabinoide, fascia, ordinamento.
- Il carrello è un React Context in memoria. Parte pre-riempito con 2 righe demo e si azzera al
  ricaricamento.
- Preferiti e passi del checkout sono stato locale della pagina.
- I form fanno solo `preventDefault`.
- Nel browser restano poche chiavi:
  - `hasher_age_ok` (sessione): conferma 18+;
  - `hasher_consensi` (local, versione 1, validità 6 mesi): scelte sui cookie;
  - `hasher_popup_sconto` (local): popup sconto già visto;
  - `hasher_colori` (sessione): prova colori.

**Entità del prototipo**:

- `Product`, con i campi:
  - identità: `slug`, `name`, `linea`, `category`, `reparto`;
  - aspetto e testi: `aroma`, `image`, `imageGrande`, `gallery`, `description`, `faq`;
  - valori e prezzo: `attivi` (percentuali per cannabinoide), `price` e `compareAt` in centesimi,
    `grams`;
  - vendita: `unita` (g, ml, pz), `formato`, `dose`, `thcFree`, `badges`, `inStock`, `variants`;
  - classificazione: `coltivazione`, `tipoFiore`, `tipo`, `metodo`, `consistenza`, `colore`;
  - laboratorio: `batch`, `lab`.
- `Variant`, `CartLine`, pagina legale (`eyebrow`, `daCompletare`), oggetto `titolare` (dati
  societari segnaposto).
- Catalogo demo: **86 prodotti**.
  - Negozio, 71 prodotti: hash 14, fiori 11, estratti 10, vape 8, preroll 7, semi 7, cloni 5,
    edibles 4, cannagar 3, oli 2.
  - Merch, 15 prodotti.
  - Per linea: CBD 40, THC-X 11, THC-A 5, CBN 4, CBG 3.

**Modello dati fase 2** (`docs/04`, circa 40 entità):

- Utenti e accesso: User, Session, AdminRole/Permission, CustomerProfile, Address.
- Catalogo: Product (+ Translation, Variant, VariantPrice, Image), InventoryItem e Movement, Batch,
  LabReport.
- Acquisto: Cart, Order (+ Item, Event), Payment, PaymentWebhookEvent, Refund, ReturnRequest.
- Spedizioni e mercati: ShippingZone/Rate, Shipment, CountryRule (regole per Paese).
- Marketing e contenuti: Promotion, Coupon, Review (solo da acquisto verificato), Newsletter,
  ConsentRecord, ContentPage, FAQ, HomepageBlock.
- Sistema: Translation, MediaAsset, AuditLog, Job.

**Integrazioni attive**: nessuna. Deploy statico con `VITE_BASE=/theasher/` e `404.html` come
fallback per le route.

## 4. Funzionalità

**Funziona (solo interfaccia, dati demo)**:

- **Home**:
  - video di apertura di 12 s: 16:9 o 9:16 secondo lo schermo, MP4 + WebM, tasto pausa, freccia
    che chiude e scorre giù, fermo con «riduci movimento»;
  - poi hero, garanzie, categorie, best seller, new drop, filiera in 5 tappe, spedizioni, Discovery
    Box, recensioni «esempio», newsletter, blog, Instagram/Telegram, FAQ.
- **Negozio** `/negozio`:
  - 10 famiglie in 4 gruppi (I classici · Pronti all'uso · Oli ed edibles · Da coltivare);
  - linee CBD / THC-X / THC-A / CBG / CBN più l'etichetta THC free;
  - pannello filtri con contatori; ordinamento; scheda «In evidenza»;
  - su telefono due pulsanti, Famiglia e Filtri; su desktop mega menu Shop con foto.
- **Prodotto** `/prodotto/:slug`: galleria, formati con prezzo al grammo, lotto e analisi, scheda
  tecnica, recensioni, FAQ, correlati, barra d'acquisto fissa su telefono.
- **Acquisto**: carrello (quantità, «salva per dopo», carrello a comparsa, soglia spedizione
  gratuita), checkout in 3 passi su pagina isolata, pagina di ordine confermato.
- **Area cliente**: accesso, registrazione, password dimenticata, riepilogo, ordini con tracking,
  indirizzi.
- **Racconto**:
  - L'azienda, un racconto in 8 capitoli con foto approvate;
  - blog con 9 articoli e filtro;
  - contatti, analisi di laboratorio, ricerca lato client, preferiti.
- **B2B**:
  - `/diventa-distributore`: Ambassador, Rivenditore 40 %, Distributore 50 %, con modulo;
  - `/franchising` «Own The Hasher»: 60 % al negozio, calcolatore, formati, candidatura.
- **Merch** `/merch`: 15 articoli (fumo, abbigliamento, skate/sticker).
- **Legale**:
  - 10 pagine: spedizioni, resi con modulo di recesso, pagamenti, privacy, cookie, termini, note
    legali, avvertenze, promozioni, condizioni rivenditori;
  - FAQ in 7 gruppi;
  - verifica 18+ all'ingresso;
  - banner cookie secondo le linee guida del Garante.
- **Pagine di lavoro** (fuori menu): `/styleguide`, `/stato`, `/prezzi`, `/strategia`, `/mappa`.
- **Prova colori per famiglia**: si accende con `?colori=si` e si spegne con `?colori=no`.

**Parziale**:

- Catalogo, prezzi, percentuali e analisi sono **demo**.
- Foto: un misto di ritagli dai mockup, pack generati dagli script, render AI approvati e foto
  della filiera rilavorate.
- Testi legali completi ma con segnaposto `[Ragione sociale]` ecc. Quattro pagine sono marcate
  `daCompletare` e vanno validate da un legale.
- Solo italiano. Prezzi wholesale e numeri del franchising sono indicativi.

**Assente**: backend, database, autenticazione, pagamenti, email, pannello admin (20 aree
specificate), multilingua, regole per Paese, SEO tecnico (sitemap, hreflang, JSON-LD), analytics,
test automatici.

## 5. Decisioni prese (con motivo)

- **Prototipo Vite statico prima dello sviluppo**: il responsabile design decide il look guardando
  un link e gli screenshot committati.
- **Token semantici unici** in `tokens.css`: un colore o un font si cambiano in un punto solo.
- **Tema unico scuro**: #050505 nero, #DFFF00 giallo acido per le azioni, bianco per il testo. Lo
  impone il brand manual.
- **Font**: Anton per i titoli, Archivo variabile per testo e interfaccia, self-hosted. Google
  Fonts non era raggiungibile ed è anche più veloce.
- **Logo mai ridisegnato**: estratto dal PNG ufficiale.
- **Una pagina prodotto parametrica**; categorie, New drops e Best seller sono il negozio filtrato
  e non pagine separate. Meno pagine da mantenere.
- **Filtri nell'URL**, con i filtri incompatibili tolti al cambio di famiglia. Evita risultati
  vuoti e filtri invisibili.
- **Percentuale del cannabinoide** come sottotitolo giallo «CBD: +31%», arrotondata per difetto:
  scelta di Lorenzo, il lotto contiene sempre almeno quel valore.
- **Roican non nominato** nelle pagine pubbliche: scelta di brand.
- **Niente prezzo minimo imposto ai rivenditori**: sarebbe una restrizione della concorrenza.
- **Claim**: «100 % naturale» solo per fiori, hash e rosin, perché il THC-X è semisintetico.
  Nessun claim salutistico.
- **Grafica «packaging system» del 15/09 annullata** il 16/09, giudicata caotica. Non va
  riapplicata senza una richiesta esplicita.
- **Reparto «Gear» rinominato «Merch»**; il nome sta in una costante (`nomeReparto`).
- **Banner cookie**: la X rifiuta, «Rifiuta» sta accanto ad «Accetta», la scelta vale 6 mesi, il
  link «Preferenze cookie» nel footer la riapre.
- **Testi legali scritti da zero**: i siti di riferimento (Rollz, Califarm) erano irraggiungibili e
  comunque non si copiano.
- **Fase 2 senza servizi terzi obbligatori**: Next.js monolite, pagamenti ad adapter senza nessun
  provider acceso senza contratto, autenticazione proprietaria. Serve a evitare lock-in e ad avere
  pieno controllo.
- **Mercati**: un solo sito, con Paese di consegna e lingua scelti separatamente, e regole per
  Paese in DB (`CountryRule`). Non un sito per Paese.

## 6. Problemi aperti

**Rischi legali** (`design/LEGALE.md`):

- **Fiori, hash, preroll, cannagar ed estratti in Italia**: il DL 48/2025 (conv. L. 80/2025,
  art. 18) vieta la vendita di infiorescenze.
- **Edibles**: novel food non autorizzato in UE. Rischio alto ovunque.
- **THC-X e THC-A**: rischio alto (tabelle stupefacenti, THC totale).
- **Vape in Italia**: accisa e limiti alla vendita a distanza.
- **Cloni**: serve il passaporto delle piante, consigliato solo B2B.
- **Oli**: solo come cosmetico, con notifica CPNP.
- **Pagamenti**: i PSP trattano il CBD come categoria ad alto rischio.

**Dati mancanti**:

- Dati societari (`titolare`) e Paese della società venditrice.
- Fornitori reali (hosting, PSP, corriere, email) da nominare nella privacy.
- Foto e prodotti veri.

**Decisioni di Lorenzo in sospeso**:

- prova colori per famiglia;
- nome del reparto: Merch, Accessori, Headshop o Supply;
- approvazione del video v2;
- 8 foto di estratti generate su Higgsfield: da approvare e rimandare in chat, perché il CDN è
  bloccato dalla rete.

**Debito tecnico**:

- Bundle JS unico da circa 814 kB (warning di Vite), senza code splitting.
- Warning di oxlint: `set-state-in-effect` in AgeGate e CookieBanner, `only-export-components` in
  `lib/cart.tsx`.
- Carrello non persistente.
- Script Python senza file delle dipendenze.
- Repo pesante: `.git` circa 546 MB, `design/` circa 173 MB, `public/` circa 34 MB (video e
  screenshot committati).
- `/stato` non aggiornato: scrive ancora «sei prodotti di esempio» e «34 pagine».
- `docs/` disallineata dal prototipo:
  - route in inglese (`/shop`, `/products`) contro quelle italiane del prototipo;
  - solo Hash/Flower contro 10 famiglie e 5 linee;
  - B2B, franchising e merch assenti.
- Nessun test automatico oltre a `npm run check` e agli screenshot.

**Note nel codice** (nessun TODO/FIXME esplicito):

- `famiglie.ts`: vendibilità di edibles, vape e cloni «da verificare Paese per Paese».
- `site.ts`: dati del venditore «placeholder da verificare».
- `legale.ts`: 4 pagine `daCompletare`.
- `strategia.ts`: il 60/40 del franchising regge solo se il costo del prodotto è circa il 25 % del
  prezzo al pubblico.

**Limiti dell'ambiente Claude remoto**: sono bloccati `github.io`, Google Drive, roican.shop, il
CDN di Higgsfield, rollzeurope.com e califarms.cz.

## 7. Roadmap (priorità)

1. Chiudere le scelte di design aperte: colori famiglia, nome del Merch, video. Poi `/verifica`
   completa e `/accessibilita`.
2. Decidere le **famiglie vendibili per Paese** in base alla mappa dei rischi, con parere legale
   scritto.
3. Materiali veri:
   - catalogo, formati e prezzi dall'archivio Roican;
   - foto;
   - dati societari;
   - certificati di laboratorio per lotto;
   - validazione dei testi legali.
4. Approvare le 10 decisioni bloccanti di `docs/10`: Next.js, hosting, PSP, Paesi e valuta, dati
   legali, autenticazione, branch.
5. `/consegna`: allineare `docs/` al prototipo (tassonomia, route, B2B, merch, franchising) e
   aggiornare `/stato`.
6. Fase 2 per milestone M0–M8 (Vishu):
   - M0 fondazione;
   - M1 design system e layout, 5 lingue;
   - M2 catalogo con SEO;
   - M3 carrello e account;
   - M4 checkout, ordini, pagamenti;
   - M5 admin;
   - M6 contenuti e marketing;
   - M7 qualità (test, sicurezza, performance);
   - M8 consegna (documentazione, deploy Docker).
7. Lancio su un solo Paese, poi estensione. Rete B2B e franchising dopo il negozio pilota.

## 8. Timeline (git log)

| Periodo    | Cosa                                                                                                                                                                                                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 14/09/2026 | Scaffold Vite/React/Tailwind con skill a step e memoria di progetto; audit e specifica e-commerce (`docs/` 01–10); stile, componenti e home in 12 sezioni                                                                                                                                    |
| 15–17/09   | Pagina prodotto, mappa del sito; prova «packaging system» (annullata il 16/09); animazioni                                                                                                                                                                                                   |
| 18–26/09   | Nessun commit                                                                                                                                                                                                                                                                                |
| 27/09      | Giornata piena: percorso d'acquisto, area cliente, racconto, pagine legali v1, 18+ e cookie, tassonomia del catalogo (linee e famiglie), filiera con foto del brand, blog, menu Shop, popup sconto, pagine rivenditori e franchising, `/prezzi`, `/stato`, `/strategia`                      |
| 28/09      | Render del franchising, ricerca, L'azienda a capitoli, Ambassador, griglia negozio; 10 famiglie con pack generati (preroll, cannagar, vape, edibles, semi, oli, cloni), THC-A, Merch; pacchetto legale e FAQ riscritti; video intro v1 e v2; tipografia e archivio font in PDF; prova colori |

In totale: 49 commit, dal 14/09 al 28/09/2026. Si lavora sul branch e si fa fast-forward su `main`
a ogni consegna visibile.

## 9. Come si esegue

```bash
npm install                       # Node 22 (come in CI)
npm run dev                       # http://localhost:5173 (--host)
npm run check                     # oxlint + tsc -b + prettier --check + vite build (deve passare prima di ogni commit)
npm run screenshot                # build + cattura di tutte le route a 390/834/1440 in design/screenshots/
npm run screenshot -- --routes /,/negozio --viewports mobile,desktop
npm run preview                   # http://localhost:4173
npx playwright install chromium   # una volta, in locale
python3 scripts/pack-hasher.py    # rigenera i pack (serve numpy, Pillow, scipy)
python3 scripts/video-intro.py    # rigenera il video (serve anche imageio-ffmpeg)
```

**Variabili d'ambiente** (solo nomi):

- `VITE_BASE`: percorso base della build, in CI `/theasher/`;
- `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD`;
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE`;
- `CLAUDE_CODE_REMOTE` e `CLAUDE_PROJECT_DIR`: usati dall'hook di avvio.

Non esistono `.env` né segreti.

**Test**: non ci sono test automatici. La qualità si controlla con `npm run check` più gli
screenshot, guardati a mano a tre larghezze.

**Deploy**: ogni push su `main` pubblica su GitHub Pages in 1–2 minuti.

## 10. Glossario

- **Linea**: il cannabinoide guida, cioè CBD, THC-X (semisintetico), THC-A, CBG, CBN. **THC
  free**: etichetta per lotti certificati 0,0 %.
- **Famiglia**: la categoria prodotto. Sono 10: fiori, hash, estratti, preroll, cannagar, vape,
  oli, edibles, semi, cloni.
- **Gruppi**: le famiglie raggruppate per la barra del negozio. «I classici», «Pronti all'uso»,
  «Oli ed edibles», «Da coltivare».
- **Merch**: reparto accessori e abbigliamento (prima «Gear»), fuori dal negozio.
- **Attivo**: il sottotitolo giallo con la percentuale («CBD: +31%») o la dose («THC-X: 10 mg»).
- **Drop**: badge sui prodotti, cioè New, Best seller, Limited drop.
- **Discovery Box**: bundle con cui chi prova per la prima volta assaggia più prodotti.
- **Filiera**: il racconto in 5 tappe, dalla semina alla pressatura.
- **Termini tecnici del prodotto**:
  - cannagar: sigaro di fiori, anche con hash;
  - cloni o talee: piantine radicate;
  - lavorazioni dell'hash: dry sift, ice-o-lator, frozen sift, charas…;
  - coltivazione: Indoor hydro → Outdoor.
- **Formule B2B**:
  - Ambassador: creator a commissione;
  - Rivenditore (40 %) e Distributore (50 %);
  - Own The Hasher: il franchising (60 % al negozio, 0 % royalty);
  - Founder Program: condizioni per i primi 20 affiliati;
  - Club: fedeltà nazionale.
- **Pagine di lavoro**: pagine interne non linkate nel menu (`/stato`, `/prezzi`, `/strategia`,
  `/mappa`, `/styleguide`).
- **Nomi nel codice**:
  - `titolare`: i dati societari segnaposto;
  - `daCompletare`: pagina legale con dati da inserire;
  - `bare`: pagina senza header e footer (il checkout);
  - `asset()`: prefissa il percorso base;
  - `cn()`: unisce le classi;
  - `hocus`: variante hover + focus;
  - `fam-*`: i token colore delle famiglie.
- **Processo**: gli step `/inizia`, `/brief`, `/stile`, `/componenti`, `/pagina`, `/verifica`,
  `/consegna` sono skill Claude in `.claude/skills/`. La memoria di progetto sta in
  `design/STATO.md`, `PROGRESS.md` e `DECISIONS.md`. M0–M8 sono le milestone della fase 2.

## Domande aperte per il founder

1. **Società venditrice**: ragione sociale, P. IVA, sede e Paese. Italiana, oppure la società ceca
   o svizzera del gruppo citata in `LEGALE.md`? Da questo dipendono legge applicabile e testi
   legali.
2. **Paesi di lancio** e **quali famiglie vendere in ciascuno**: si tengono edibles, THC-X, THC-A,
   vape e cloni nonostante la mappa dei rischi?
3. **Le decisioni di `docs/10` sono approvate?** Chi avvia la fase 2 e quando? Tempi e budget: non
   chiaro dal codice.
4. **Hosting di produzione, dominio** (`thehasher.com` compare solo in `docs/`) e **PSP** che
   accetti il CBD.
5. **Odoo e n8n**: sono sistemi già in uso nel gruppo? Cosa va sincronizzato (stock, ordini,
   casse)? Nel codice non c'è nulla.
6. **Rapporto giuridico e commerciale Roican ↔ The Hasher**, e perché Roican resta anonimo al
   pubblico: non chiaro dal codice.
7. **Catalogo vero**: prodotti, formati, prezzi B2C e wholesale, laboratorio di analisi, archivio
   foto (il Drive Roican non è raggiungibile dall'ambiente).
8. **Lingue al lancio**: la specifica dice 5 lingue con l'inglese di default, il prototipo è solo
   in italiano.
9. **Numeri del franchising** (fee, starter pack, fondo marketing): sono indicativi, derivati da una
   proposta ChatGPT. Vanno confermati.
10. **Corriere reale** (nei dati demo compare BRT), **handle social** definitivi (`@thehasher` e
    `t.me/thehasher` sono provvisori), **fotografo**.
