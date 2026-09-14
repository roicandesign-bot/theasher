---
name: design-principles
description: Manuale di riferimento di design frontend per questo progetto — tipografia, colore, spaziatura, layout, catalogo delle sezioni, immagini, movimento, anti-pattern "effetto template". Da leggere prima degli step stile, componenti e pagina, e quando l'utente chiede "perché è così", "rendilo più bello", "sembra generico". Non è un comando: è la base delle scelte di gusto.
user-invocable: false
---

# Principi di design frontend

Obiettivo: un sito che sembra fatto da un designer, non generato. Le regole qui sotto sono i default; il brief e gli screenshot dell'utente vincono sempre.

## 1. Gerarchia prima di tutto

- In ogni schermata l'occhio deve trovare in ordine: **cosa** (titolo), **perché** (sottotitolo/lead), **cosa fare** (CTA). Se tre cose hanno lo stesso peso, nessuna vince.
- Contrasto di dimensione forte: `display`/`h1` almeno 3× il testo base. I titoli di sezione (`h2`) chiaramente più piccoli del hero.
- Testo secondario in `fg-muted`, mai in grigio chiaro illeggibile: il muted serve a gerarchizzare, non a nascondere.
- Un solo elemento "forte" per sezione (un bottone primario, un numero grande, un'immagine).

## 2. Tipografia

- **Due famiglie al massimo**: display per i titoli, sans per il testo. Spesso una sola basta (pesi diversi).
- Scelte affidabili su Google Fonts, per carattere:
  - neutro/moderno: Inter, Geist, Manrope, DM Sans, Plus Jakarta Sans
  - geometrico/tech: Space Grotesk, Sora, Outfit, Urbanist
  - editoriale/elegante: Fraunces, Playfair Display, Cormorant, Newsreader, Instrument Serif (titoli) + Inter/Source Sans (testo)
  - caldo/umano: Nunito, Figtree, Work Sans, Lora
- Titoli grandi: `letter-spacing` negativo (-0.02/-0.03em), `line-height` 1.0-1.1, peso 600-700 (o 400-500 con i serif). Testo: 16-18px, `line-height` 1.5-1.65, righe ≤ 75 caratteri (`max-w-prose`).
- Occhielli (`eyebrow`): maiuscolo, `tracking` largo, piccoli, in `fg-muted` o `accent`. Uno per sezione, non ovunque.
- Usa `text-balance` sui titoli e `text-pretty` sui paragrafi. Mai centrare paragrafi lunghi.

## 3. Colore

- Regola 60/30/10: 60% sfondi neutri (`bg`, `bg-alt`, `surface`), 30% testo e linee (`fg`, `fg-muted`, `line`), 10% colore (`primary`, `accent`).
- I neutri **non sono grigi puri**: portano una punta della tinta del brand (caldo → beige, freddo → blu-grigio). È ciò che rende una palette "curata".
- `primary` è il colore dell'azione; `accent` serve a evidenziare (occhielli, icone, numeri). Non usare `accent` sui bottoni principali.
- Sezioni scure (`tone="dark"`): una per pagina al massimo, di solito CTA o testimonianze. Il testo muted sullo scuro deve restare ≥ 4.5:1.
- Contrasto: testo ≥ 4.5:1, testo grande ≥ 3:1, bordi/icone ≥ 3:1.
- Evita: gradienti viola/blu su bianco, glow, glassmorphism a caso, ombre colorate. Se il brief li chiede, usali con misura e coerenza.

## 4. Spaziatura e ritmo

- Scala 4/8: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Tailwind: `gap-4`, `mt-6`, `py-12`, ecc. Non inventare valori.
- Spazio **dentro** un blocco < spazio **tra** blocchi < spazio **tra** sezioni. Titolo→testo `mt-3/4`, testo→CTA `mt-8`, tra card `gap-5/6`, tra sezioni `py-section`.
- Alterna gli sfondi (`default` / `alt` / `dark`) per dare ritmo, ma non a ogni sezione: due chiare, una alternata, ecc.
- Allinea tutto a una griglia: contenuto in `container-content` (1152px), testo lungo in `max-w-prose`. Gli elementi si allineano a sinistra del container, non "un po' ovunque".

## 5. Layout e responsive

- Mobile-first: scrivi le classi base per mobile, aggiungi `md:` (≥768) e `lg:` (≥1024) per allargare.
- Griglie: 1 colonna mobile → 2 tablet → 3-4 desktop (`grid gap-6 md:grid-cols-2 lg:grid-cols-3`).
- Hero: su desktop testo a sinistra e immagine a destra (`lg:grid-cols-2 items-center`), oppure centrato ma stretto (`max-w-3xl mx-auto text-center`) se il messaggio è breve. Altezza: non forzare `min-h-screen`, lascia che il contenuto decida (in genere 60-80vh).
- Header: 64px, sticky con `backdrop-blur`, menu a destra, CTA in evidenza. Su mobile hamburger.
- Footer: minimo 3 zone (brand+claim, link, contatti/legale) su desktop, in colonna su mobile.
- Larghezze immagini fissate con `aspect-[4/3]`, `aspect-video`, `aspect-square` + `object-cover`: mai lasciare che sia l'immagine a decidere l'altezza.

## 6. Catalogo sezioni (sequenze che funzionano)

Sito vetrina / servizi: **Hero → prova sociale (loghi/numeri) → servizi (griglia 3) → come lavoriamo (steps) → caso/testimonianza → FAQ → CTA**.
Landing prodotto: **Hero con visual → benefici (3) → feature alternate immagine/testo → prezzi → FAQ → CTA**.
Chi siamo: **Hero breve → storia/manifesto (prose) → valori (griglia) → team → CTA**.
Contatti: **Titolo + testo → form (UI) affiancato a recapiti/mappa placeholder**.

Pattern di sezione:

- **Hero split**: eyebrow, h1 (2 righe max), lead, 2 bottoni (primario + secondario), visual.
- **FeatureGrid**: SectionHeader + griglia di Card con icona `size-5`, titolo `h3`, 2 righe di testo.
- **Alternata**: righe immagine/testo che si invertono (`lg:[&>*:first-child]:order-2` sulle righe pari).
- **Steps**: 3-4 passaggi numerati (`font-mono` per il numero), su desktop in riga con linea di collegamento o in griglia.
- **Testimonial**: citazione grande (`text-h3` o `text-lead`), nome + ruolo piccoli, avatar placeholder rotondo.
- **Stats**: 3-4 numeri grandi (`text-h1 font-semibold`) con etichetta muted sotto.
- **FAQ**: accordion, `max-w-prose`, domanda in `font-medium`.
- **CTA**: banda `tone="dark"` o `bg-primary`, titolo `h2`, una frase, un bottone. Centrata, stretta.
- **Pricing**: 2-3 card, quella consigliata con `ring-2 ring-primary` e badge; lista con icona check.

## 7. Immagini e icone

- Fornite dall'utente → `public/images/`, `<img>` con `alt`, `loading="lazy"` sotto la piega, `aspect-*` + `object-cover`.
- Non fornite → placeholder coerente: blocco `bg-brand-200` (o gradiente tra due brand) con `aspect-*`, angoli `rounded-card`, eventualmente un'icona `lucide` al centro in `text-brand-500`. Mai immagini da URL esterni.
- Icone: `lucide-react`, una sola dimensione per contesto (`size-5` nelle card, `size-4` nei bottoni), stroke default. Niente emoji come icone.
- Logo: se c'è SVG usalo nell'Header a 24-32px di altezza; altrimenti wordmark in `font-display font-semibold`.

## 8. Componenti: stati e dettagli

- Bottoni: altezza 44px (`h-11`), padding orizzontale ≥ 20px, `rounded-button`, testo `font-medium`. Primario pieno, secondario con `ring-1 ring-line`, ghost trasparente. Hover: leggero cambio di sfondo, non scale.
- Card: `rounded-card`, padding 24-32px, bordo `ring-1 ring-line` su sfondi chiari **oppure** ombra `shadow-card` su sfondi alt: mai entrambi forti.
- Link nel testo: sottolineati o in `primary`, con hover distinguibile.
- Focus: anello `outline-primary` (già globale). Non rimuoverlo mai.
- Input (solo UI): altezza 44px, `ring-1 ring-line`, focus `ring-2 ring-primary`, label sopra.

## 9. Movimento

- Transizioni di stato 150-250 ms, comparse 300-500 ms, easing `ease-out-soft`. Solo `opacity`/`transform`.
- Comparse allo scroll una volta sola, stagger breve. Il hero può apparire subito animato ma il contenuto deve essere visibile entro 500 ms.
- Rispetta `prefers-reduced-motion`.

## 10. Anti-pattern "effetto template" (da evitare attivamente)

- Tutto centrato, ogni sezione con titolo centrato + tre card identiche.
- Gradienti viola/blu, glow, bolle sfocate sullo sfondo.
- Card con icona in un cerchietto colorato uguale per tutte.
- Emoji come icone; "Lorem ipsum"; foto stock generiche di strette di mano.
- Ombre pesanti e bordi insieme; raggi diversi tra bottoni e card senza motivo.
- Sezioni tutte della stessa altezza e struttura: variare (una a due colonne, una a lista, una a banda).
- Spaziature "a occhio" fuori scala; testi che toccano i bordi su mobile.
- Titoli generici («Benvenuti nel nostro sito», «I nostri servizi»): scrivi titoli che dicono qualcosa di specifico del brand.

## 11. Come lavorare da uno screenshot

1. Individua griglia e container (larghezza contenuto, margini).
2. Elenca le sezioni dall'alto in basso con il pattern di ciascuna.
3. Estrai colori (sfondo, testo, primario, accento) e stima raggi/spazi in scala 4/8.
4. Riconosci il font: serif/sans, geometrico/umanista, larghezza, peso dei titoli → scegli l'equivalente più vicino.
5. Costruisci sezione per sezione, confronta con lo screenshot, correggi proporzioni.
