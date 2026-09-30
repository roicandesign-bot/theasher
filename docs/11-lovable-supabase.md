# 11 · Da prototipo a e-commerce reale: Lovable + Supabase

> Proposta del 2026-09-30. Sostituisce le decisioni 1, 2 e 9 di `10-decisioni-bloccanti.md`
> (Next.js + Prisma + autenticazione proprietaria) **se approvata**. Il resto di `docs/` resta valido.

## Il principio

Lorenzo continua a disegnare il negozio in questo repo, come oggi. Noi colleghiamo i dati veri
senza rifare le pagine. Il prototipo è già Vite + React + TypeScript + Tailwind, lo stesso stack
che usa Lovable, e Supabase si collega direttamente dal browser. Non serve riscriverlo in Next.js.

## Chi fa cosa

| Pezzo                                              | Dove vive                            | Chi ci lavora               |
| -------------------------------------------------- | ------------------------------------ | --------------------------- |
| **Negozio** (le 34 pagine)                         | questo repo, `theasher`              | Lorenzo (look) + noi (dati) |
| **Back office** (prodotti, stock, ordini, clienti) | **progetto Lovable nuovo**, repo suo | noi, con Lovable            |
| **Database, login, foto, logica di pagamento**     | **un solo progetto Supabase**        | condiviso dai due           |

Il negozio e il back office leggono lo stesso database. Il back office resta separato dal negozio
per un motivo preciso: Lovable vuole creare il proprio repo e sincronizza da solo il branch `main`.
Se lo mettessimo su questo repo, Lovable, Lorenzo e noi scriveremmo tutti sullo stesso branch e
finiremmo per pestarci i piedi.

## Come si collega il negozio senza toccare il design

1. Oggi le pagine leggono da `src/data/*.ts` (prodotti, prezzi, famiglie…).
2. Aggiungiamo `src/lib/db/` con funzioni che restituiscono **gli stessi tipi** leggendo da Supabase.
3. Le pagine passano da `import { prodotti } from '@/data/products'` a un hook (`useProdotti()`).
   Il loro aspetto non cambia.
4. Il carrello resta nel browser. Il checkout chiama una Edge Function di Supabase che ricalcola
   i prezzi lato server, crea l'ordine e avvia il pagamento.

## Tabelle Supabase (prima versione)

`products`, `variants` (formato, prezzo, stock), `product_images` (Storage), `categories`,
`lab_reports` (PDF delle analisi), `customers` (collegata ad Auth), `addresses`, `orders`,
`order_lines`, `country_rules` (cosa si può vendere in quale Paese), `discount_codes`,
`club_members`. La RLS (le regole su chi vede quali righe) è attiva su tutte: il cliente vede solo
i propri ordini e il back office richiede il ruolo admin.

## Hosting

- **Anteprima di Lorenzo**: resta GitHub Pages, con dati demo. Non si rompe mai.
- **Produzione**: Vercel o Netlify per il negozio, Supabase per il backend, dominio `thehasher.com`.
  Prima di scegliere, controllare che le condizioni d'uso dell'hosting accettino il settore CBD.

## Bloccanti che non sono tecnici (da risolvere prima del lancio)

1. **Pagamenti**: Stripe e PayPal di norma non accettano il CBD in UE. Serve un PSP per categorie
   ad alto rischio. Fino ad allora: bonifico + pagamento di test.
2. **Italia**: il DL 48/2025 (L. 80/2025, art. 18) vieta la vendita di infiorescenze. Con
   `country_rules` si decide per Paese cosa è acquistabile. Serve il parere di un legale.
3. **Verifica età 18+**: oggi c'è solo il popup. In produzione va rafforzata almeno al checkout.
4. **Dati societari** per footer, fatture e termini.

## Ordine di lavoro

| #   | Milestone                                                                | Risultato visibile                          |
| --- | ------------------------------------------------------------------------ | ------------------------------------------- |
| M0  | Progetto Supabase, tabelle, seed con i 37 prodotti demo di `products.ts` | catalogo servito dal database               |
| M1  | Negozio legge da Supabase (catalogo, prodotto, ricerca)                  | stesse pagine, dati reali                   |
| M2  | Back office Lovable: prodotti, foto, stock, analisi                      | si carica un prodotto e compare nel negozio |
| M3  | Login clienti + area account                                             | registrazione e ordini personali            |
| M4  | Checkout + ordini + email + bonifico                                     | primo ordine vero end-to-end                |
| M5  | PSP definitivo, deploy di produzione, dominio                            | sito in vendita                             |
