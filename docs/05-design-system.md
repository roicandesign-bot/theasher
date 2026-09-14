# 05 · Design system e architettura dei componenti

## Token (`src/styles/tokens.css`, Tailwind v4 `@theme`)

```
--color-bg #050505 · --color-bg-alt #141414 · --color-surface #0f0f0f · --color-surface-hover #171717
--color-fg #ffffff · --color-fg-muted #a3a3a3 · --color-fg-subtle #737373 (solo decorativo)
--color-line #262626 · --color-line-strong #404040
--color-primary #dfff00 · --color-primary-fg #050505 · --color-primary-hover #eaff4d
--color-success #4ade80 · --color-warning #fbbf24 · --color-danger #ff5c5c · --color-info #ffffff
--font-display Anton · --font-sans Archivo · --font-mono (sistema)
--text-display clamp(3rem, 2rem + 6vw, 7rem) lh 0.92 · --text-h1 clamp(2.5rem, 1.8rem + 3.5vw, 4.5rem) lh 0.95
--text-h2 clamp(2rem, 1.5rem + 2vw, 3rem) lh 1 · --text-h3 1.5rem lh 1.1 (tutti in Anton, maiuscolo)
--text-lead 1.125–1.25rem lh 1.5 · --text-eyebrow 0.75rem ls 0.14em
--spacing-section clamp(3.5rem, 2.5rem + 4vw, 7rem) · --spacing-gutter clamp(1rem, 0.5rem + 2.5vw, 2.5rem)
--container-content 80rem (1280) · --container-wide 96rem (1536, solo home/griglie) · --container-prose 42rem
--radius-card 0.75rem · --radius-button 999px · --radius-input 0.5rem · --radius-badge 0.25rem
--shadow-* : nessuna sul nero; --ring-focus 2px #dfff00 offset 2px
```

Il tema è **unico e scuro per scelta di brand** (il nero domina). L'admin usa gli stessi token con `bg-alt` più presente per la densità dei dati.

## Componenti UI (`components/ui`)

Button (primary / outline / ghost / danger · sm md lg · `asChild` per link · loading state), IconButton (aria-label obbligatoria, 44 px), Badge (yellow / outline / muted / stock), Price (formattazione `Intl`, compareAt barrato, prezzo/g), Input, Textarea, Select, Checkbox, Radio, Switch, Field (label + errore + hint accessibili), Form (RHF + Zod), Dialog e Drawer (focus trap, `Esc`, `inert`), Sheet mobile, Tabs, Accordion (FAQ), Tooltip, Toast (`aria-live`), Skeleton (stesse dimensioni del contenuto → CLS 0), EmptyState, ErrorState, Pagination, Breadcrumb (con JSON-LD), Table, Stepper (checkout), QuantityInput, Rating (sola lettura + input), Diamond (icona ✦), Logo (PNG ufficiale, 3 varianti), StrokePattern (mask del logo, decorativo `aria-hidden`).

## Componenti storefront (`components/storefront`)

InfoBar (configurabile), Header (sticky, logo, nav, SearchCommand predittiva, AccountMenu, CartButton con contatore `aria-live`), MobileMenu, Footer, AgeGate (dialog, per mercato), CookieBanner + ConsentPreferences (blocco preventivo), MarketSwitcher (Paese / lingua / valuta), Hero, CategoryTiles, ProductCard (badge, prezzo, prezzo/g, aroma, add-to-cart rapido), ProductGrid + Filters (URL state) + SortSelect, ProductGallery (zoom, tastiera, thumbnails), VariantPicker (formati), StockStatus, AddToCart + StickyAddToCart (mobile), TrustBar, LabReportCard, ReviewList + ReviewForm (solo acquisti verificati), FaqAccordion, RelatedProducts / CrossSell / Bundle / RecentlyViewed, NewsletterForm, CartDrawer + CartPage (soglia spedizione gratuita, salva per dopo, coupon, stima spedizione), CheckoutSteps (Contact & Address · Shipping · Payment) + OrderSummary sticky, OrderConfirmation, AccountNav, OrderTimeline, TrackingCard, WishlistGrid, JournalCard, ContentProse (rich text sanificato), NotFound.

## Componenti admin (`components/admin`)

AdminShell (sidebar, topbar, ricerca), DataTable (sort, filtri, paginazione server), StatCard, EntityForm (RHF + Zod), ImageUploader (drag & drop, progress, alt), TranslationTabs (una tab per lingua, stato "manca"), MarketMatrix (prodotto × Paese), InventoryAdjust, OrderDetail (timeline, pagamenti, spedizioni, rimborso con conferma), AuditTable, PermissionGate.

## Stati obbligatori

Ogni lista e ogni form gestisce **loading** (skeleton), **empty** (messaggio + azione), **error** (spiegazione + riprova) e **success** (toast o pagina). I bottoni mostrano lo stato di attesa e si disabilitano durante l'invio.

## Accessibilità di base

HTML semantico, skip link, un `h1` per pagina, focus giallo visibile, `aria-live` per carrello e toast, dialog accessibili, form con label ed errori collegati (`aria-describedby`), contrasto ≥ 4,5:1, target ≥ 44 px, `prefers-reduced-motion`, zoom 200 % senza perdita di contenuto.
