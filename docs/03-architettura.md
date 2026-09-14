# 03 · Architettura tecnica

## Scelte di fondo

| Tema           | Scelta                                                                                                                                                                                                                       | Perché                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Applicazione   | **Un solo progetto Next.js 16 (App Router)**: storefront, admin, API e job nello stesso deploy                                                                                                                               | un team piccolo, un solo repo, un solo deploy; separabile in seguito perché i moduli di dominio non dipendono da Next |
| Linguaggio     | TypeScript `strict`, ESM                                                                                                                                                                                                     | errori a compile time, tipi condivisi client/server                                                                   |
| UI             | React 19 Server Components + Client Components solo dove serve interazione; Tailwind CSS 4 con token semantici; `lucide-react`; `motion` con `prefers-reduced-motion`                                                        | pagine leggere, HTML già renderizzato per SEO e LCP                                                                   |
| Dati           | PostgreSQL 16 + **Prisma 7** (`@prisma/adapter-pg`), migrazioni versionate, seed demo                                                                                                                                        | schema tipizzato, transazioni, indici espliciti                                                                       |
| Validazione    | **Zod** condiviso (client ↔ server) + React Hook Form                                                                                                                                                                        | stessa regola validata due volte, mai solo lato client                                                                |
| Mutazioni      | Server Actions per form storefront/admin; Route Handlers per webhook, ricerca, sitemap, health, cron                                                                                                                         | protezione CSRF integrata nelle Server Actions (origin check), API esplicite dove serve un URL                        |
| Autenticazione | Sistema **proprietario**: password con `argon2id`, sessioni in DB con cookie `HttpOnly; Secure; SameSite=Lax`, rotazione a login, verifica email, reset password, login clienti + login admin separati per ruolo             | pieno controllo, nessuna dipendenza da provider esterni, audit completo                                               |
| Autorizzazione | RBAC: ruoli (`owner`, `admin`, `catalog`, `orders`, `support`, `viewer`) → permessi granulari (`orders.refund`, `catalog.publish`…) verificati nel service layer, non solo nella UI                                          | operazioni sensibili protette e loggate                                                                               |
| i18n           | `next-intl` con prefisso locale (`/it`, `/en`, `/fr`, `/de`, `/es`); messaggi UI in JSON; contenuti catalogo/editoriali tradotti in tabelle `*Translation`                                                                   | aggiungere una lingua = un file JSON + traduzioni in admin, nessun cambio di codice                                   |
| Mercati        | `CountryRule` in DB (Paese → attivo, valuta, IVA, age gate, testi legali, restrizioni, soglie) + listini prezzi per mercato                                                                                                  | condizioni diverse per Paese senza toccare il codice                                                                  |
| Pagamenti      | Interfaccia `PaymentProvider` + adapter (`sandbox`, `bank-transfer`, `stripe`), webhook firmati, idempotency key, stati ordine e pagamento separati                                                                          | nessun lock-in, nessun provider "acceso" senza contratto                                                              |
| Storage        | Interfaccia `StorageProvider`: `local` (dev) e `s3` (qualsiasi S3-compatible)                                                                                                                                                | immagini e PDF di laboratorio fuori dal repo                                                                          |
| Email          | Interfaccia `MailProvider`: `console` (dev), `smtp`, `resend`; template React Email                                                                                                                                          | conferma ordine, reset password, back-in-stock, carrello abbandonato con consenso                                     |
| Ricerca        | PostgreSQL full-text (`tsvector` per lingua) + `pg_trgm` per correzione dei termini + suggerimenti categorie                                                                                                                 | veloce, senza servizio esterno; sostituibile con Meilisearch via adapter                                              |
| Cache          | Next cache con tag (`catalog`, `product:slug`, `content`) invalidati dalle azioni admin; pagine catalogo statiche con revalidation                                                                                           | performance senza dati stantii                                                                                        |
| Job            | Tabella `Job` + endpoint cron protetto (`/api/cron`) per email differite, pulizia sessioni, export                                                                                                                           | nessun worker separato all'inizio; sostituibile con una coda                                                          |
| Log e errori   | `pino` strutturato con redazione dei campi sensibili; classe `AppError` con codici; error boundary per route; pagine 404/500 nel brand                                                                                       | errori leggibili, mai dati personali nei log                                                                          |
| Sicurezza      | CSP con nonce, security headers, rate limiting (DB/memoria, adapter Redis opzionale), sanitizzazione HTML editoriale, upload con verifica MIME e dimensione, webhook firmati, secrets solo da env validate con Zod all'avvio | vedi `08-compliance.md`                                                                                               |
| Test           | Vitest (unit + integration su Postgres reale), Playwright (e2e, responsive, accessibilità con axe), test API                                                                                                                 | ogni milestone chiude con test verdi in CI                                                                            |
| Container      | `Dockerfile` multi-stage (standalone) + `docker-compose.yml` (app, postgres, minio, mailpit)                                                                                                                                 | stesso ambiente in locale e in produzione                                                                             |

## Struttura delle cartelle

```
src/
  app/
    [locale]/                    storefront localizzato
      (shop)/                    layout con header/footer
        page.tsx                 home
        shop/  hash/  cbd-flower/  new-drops/  best-sellers/
        products/[slug]/
        search/  wishlist/  cart/  checkout/  order/[number]/
        account/ (orders, addresses, profile, tracking/[number])
        about/ journal/ journal/[slug]/ faq/ contact/ lab-tests/
        shipping/ returns/ payments/ privacy/ cookies/ terms/ legal/
      layout.tsx                 provider i18n, age gate, consent, analytics
      not-found.tsx              404 nel brand
    admin/                       back office (non localizzato, italiano)
      (dashboard, catalog, categories, inventory, batches, orders, customers,
       promotions, coupons, shipping, markets, lab-reports, reviews, content,
       translations, newsletter, analytics, settings, users, audit-log)
    api/
      webhooks/[provider]/       pagamenti (firma verificata)
      search/                    suggerimenti
      cron/                      job differiti (token)
      health/
    sitemap.ts  robots.ts
  modules/                       DOMINIO — indipendente da Next
    auth/ catalog/ inventory/ cart/ checkout/ orders/ payments/ shipping/
    promotions/ customers/ reviews/ content/ i18n/ markets/ newsletter/
    lab-reports/ analytics/ audit/ consent/ media/
      schema.ts   (Zod)   service.ts (regole)   queries.ts (Prisma)   actions.ts (Server Actions)
  components/
    ui/          Button, Input, Select, Dialog, Drawer, Badge, Price, Skeleton, Toast…
    storefront/  Header, Footer, ProductCard, Gallery, CartDrawer, Filters…
    admin/       DataTable, Form, Sidebar, StatCard…
  lib/           env.ts, db.ts, logger.ts, money.ts, result.ts, rate-limit.ts, security.ts, seo.ts
  styles/        tokens.css, index.css
messages/        en.json it.json fr.json de.json es.json
prisma/          schema.prisma, migrations/, seed.ts
tests/           unit/ integration/ e2e/
scripts/         screenshot.mjs, lighthouse.mjs
docs/            questa specifica + API, DB, deploy, checklist
```

Regola: `modules/*/service.ts` non importa nulla da `next/*`. Le Server Actions e le route sono strati sottili che validano l'input con Zod, controllano i permessi e chiamano il service.

## Flusso di una richiesta

```mermaid
flowchart LR
  B[Browser] --> M[Middleware\nlocale · mercato · sessione · CSP nonce]
  M --> RSC[Server Component\nquery Prisma con cache a tag]
  RSC --> HTML[HTML + isole client]
  HTML --> B
  B -- form / bottone --> SA[Server Action\nZod · permessi · rate limit]
  SA --> SVC[Service di dominio\ntransazione Prisma · audit]
  SVC --> DB[(PostgreSQL)]
  SVC --> EXT[Adapter\npagamenti · email · storage]
  EXT -- webhook firmato --> WH[/api/webhooks/*] --> SVC
```

## Sitemap dello storefront (prefisso `/{locale}`)

| Area      | Route                                                                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home      | `/`                                                                                                                                                                          |
| Catalogo  | `/shop`, `/hash`, `/cbd-flower`, `/new-drops`, `/best-sellers`, `/products/{slug}`, `/search?q=`                                                                             |
| Acquisto  | `/wishlist`, `/cart`, `/checkout`, `/order/{number}` (conferma)                                                                                                              |
| Account   | `/account`, `/account/orders`, `/account/orders/{number}`, `/account/tracking/{number}`, `/account/addresses`, `/account/profile`, `/login`, `/register`, `/forgot-password` |
| Contenuti | `/about`, `/journal`, `/journal/{slug}`, `/faq`, `/contact`, `/lab-tests`                                                                                                    |
| Servizio  | `/shipping`, `/returns`, `/payments`                                                                                                                                         |
| Legale    | `/privacy`, `/cookies`, `/terms`, `/legal`                                                                                                                                   |
| Sistema   | `/404` nel brand, `/sitemap.xml`, `/robots.txt`                                                                                                                              |

Admin: `/admin` + le 20 aree elencate nella struttura.

## Flussi utente principali

1. **Acquisto ospite**: home → categoria (filtri in URL) → prodotto (formato, quantità, lab report) → drawer carrello (soglia spedizione gratuita) → checkout in 3 passi (contatto+indirizzo · spedizione · pagamento, riepilogo sempre visibile) → pagamento via adapter → conferma con numero ordine ed email → proposta «crea account» con un click.
2. **Cliente registrato**: login → area personale → storico ordini → tracking → riordino → indirizzi salvati → export/cancellazione dati.
3. **Admin ordine**: nuovo ordine → verifica pagamento (webhook) → preparazione → etichetta (adapter) → spedito con tracking → consegnato → eventuale reso → rimborso autorizzato (permesso `orders.refund`, audit).
4. **Admin catalogo**: prodotto → varianti/formati → prezzi per mercato → immagini → lotto + lab report → traduzioni → pubblica (invalidazione cache).
5. **Mercato**: utente arriva su `/it`, il selettore Paese/lingua/valuta è esplicito; la scelta è salvata in cookie; il checkout accetta solo Paesi attivi.

## Documentazione prodotta a fine lavoro

`README.md` (avvio locale), `docs/api.md`, `docs/database.md`, `docs/deploy.md`, `docs/checklist-lancio.md`, `docs/integrazioni.md`, `docs/verifiche-legali.md`, `.env.example` commentato.
