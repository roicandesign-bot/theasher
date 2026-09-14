---
name: componenti
description: Step 3 del processo — costruisce o estende i componenti UI riutilizzabili (bottoni, card, input, badge, tab, accordion, testimonial, pricing, header, footer, sezioni) in src/components e li mostra nella styleguide. Usare quando l'utente scrive /componenti, chiede un elemento riutilizzabile ("mi serve un accordion", "una card prodotto"), o prima di costruire pagine che condividono blocchi.
argument-hint: [elenco componenti, oppure vuoto per il set base dal brief]
---

# /componenti — i mattoni

Output: componenti in `src/components/ui/` (atomi) e `src/components/sections/` (sezioni riutilizzabili), tutti visibili in `/styleguide`.
Prima di iniziare leggi `.claude/skills/design-principles/SKILL.md`.

## Procedura

1. Deduci dal `design/BRIEF.md` (tabella Pagine → sezioni) e da `$ARGUMENTS` quali componenti servono. Non chiedere: costruisci il set che serve alle pagine previste.
2. Per ogni componente:
   - un file `PascalCase.tsx`, export nominato, props tipizzate e semplici, varianti con `cn()`;
   - usa **solo token semantici**; niente valori hardcoded;
   - stati completi: hover, focus-visible, active, disabled dove ha senso;
   - responsive di default (le griglie collassano, i testi non traboccano);
   - accessibile: elementi semantici (`button`, `nav`, `ul`), `aria-*` solo dove serve, tap target ≥ 44px.
3. **Sezioni** (`src/components/sections/`): prendono i contenuti via props o da `src/data/`, mai testo fisso dentro. Struttura tipica: `<Section tone=…><Container><SectionHeader …/>…</Container></Section>`.
4. Aggiungi ogni componente nuovo alla pagina `src/pages/Styleguide.tsx` con le sue varianti (è il catalogo che l'utente approva).
5. `npm run check`, `npm run screenshot -- --routes /styleguide` e guarda il risultato.
6. Aggiorna `design/PROGRESS.md` (step 3), commit: `Componenti: <elenco>`.
7. Chiudi con la lista dei componenti pronti (nomi in italiano comprensibili) e proponi la prima pagina.

## Set base consigliato per un sito vetrina

Button, Card, Badge, Input/Textarea (solo UI), Accordion (FAQ), Tabs, Testimonial, PricingCard, Stat, LogoCloud, ImagePlaceholder, Hero, FeatureGrid, Steps, CTA, ContactBlock.
Costruisci solo quelli che le pagine del brief usano davvero.

## Regole

- Un componente non sa in che pagina sta: niente `useLocation`, niente logica di dominio.
- Le icone vengono da `lucide-react`, dimensione `size-4`/`size-5`, stesso stroke ovunque.
- Le immagini: `ImagePlaceholder` con `aspect-*` e `bg-brand-200`, oppure `<img>` da `public/images/` se fornite.
