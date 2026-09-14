---
name: animazioni
description: Aggiunge micro-interazioni e animazioni sobrie al prototipo (hover, transizioni, comparsa allo scroll, menu, accordion) con CSS e la libreria motion. Usare quando l'utente scrive /animazioni, chiede "più vivo", "animato", "effetto allo scroll", "transizione", o dopo che le pagine sono approvate.
argument-hint: [pagina o componente, oppure vuoto per tutto il sito]
---

# /animazioni — movimento che aiuta, non che distrae

## Principi

- Durate: 150-250 ms per hover e stati, 300-500 ms per comparse; easing `var(--ease-out-soft)`.
- Muovi **opacity e transform** (translate/scale), mai larghezze, altezze o colori pesanti da animare.
- Un'idea per pagina: se tutto si muove, niente si nota. Il hero può avere una comparsa; le card allo scroll sì, ma in sequenza breve (stagger 60-80 ms) e una volta sola.
- Rispetta `prefers-reduced-motion` (già gestito in `index.css`: le animazioni CSS si annullano; con `motion` usa `useReducedMotion`).
- Niente parallax pesanti, niente cursori custom, niente loader finti.

## Strumenti

- **CSS/Tailwind** per hover, focus, transizioni di stato: `transition`, `hocus:`, `group-hover:`.
- **motion** (`import { motion } from 'motion/react'`) per comparse allo scroll:
  `whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}`.
  Crea un componente `src/components/ui/Reveal.tsx` (con prop `delay`) e usa quello, così il comportamento è uniforme.
- Menu mobile, accordion, tabs: transizioni di 200 ms su opacity/transform; contenuto accessibile anche senza animazione.

## Procedura

1. Leggi la pagina o il componente indicato in `$ARGUMENTS` (vuoto = hero delle pagine + card + bottoni).
2. Applica le animazioni, poche e coerenti.
3. `npm run check`, screenshot delle route toccate (lo script attende 300 ms: le comparse devono essere già finite o partire visibili nella prima schermata).
4. Commit: `Animazioni: <cosa>`. Rispondi elencando dove si muove cosa, in 3-4 righe.
