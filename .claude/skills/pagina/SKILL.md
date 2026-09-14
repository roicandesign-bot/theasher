---
name: pagina
description: Step 4 del processo — costruisce una pagina intera del sito, sezione per sezione, partendo da uno screenshot/Figma o da una descrizione, e la registra in src/routes.tsx. Usare quando l'utente scrive /pagina, chiede "fammi la home / la pagina servizi / la landing", allega il design di una schermata, o descrive una pagina da creare. Ripetibile per ogni pagina.
argument-hint: <nome pagina> [descrizione o "da screenshot"]
---

# /pagina — una pagina alla volta, sezione per sezione

Output: `src/pages/<Nome>.tsx`, voce in `src/routes.tsx`, contenuti in `src/data/`, screenshot a 3 viewport.
Prima di iniziare leggi `.claude/skills/design-principles/SKILL.md` (sezione Layout e Catalogo sezioni).

## Procedura

1. **Capisci la pagina** da `$ARGUMENTS`, dal brief (tabella Pagine) e dagli allegati. Se esiste uno screenshot o un export Figma, quello comanda: riproducilo fedelmente (ordine sezioni, proporzioni, allineamenti, densità). Se c'è solo una descrizione, progetta tu la sequenza di sezioni con il catalogo e **non chiedere conferma**: costruisci.
2. **Scrivi prima l'elenco sezioni** in un commento in cima al file, es. `// Hero → Servizi (griglia 3) → Come lavoriamo (steps) → Testimonianze → CTA`.
3. **Contenuti**: metti testi, liste e dati in `src/data/<pagina>.ts` (realistici, in italiano, coerenti col brief; niente Lorem ipsum). Se l'utente ha fornito testi veri usa quelli.
4. **Costruisci** con i componenti esistenti; se una sezione è riutilizzabile creala in `src/components/sections/`, se è unica lasciala nel file pagina. Ogni sezione: `Section` + `Container` + contenuto. Un solo `h1` (nel hero).
5. **Registra** la pagina in `src/routes.tsx` (`path` in kebab-case italiano, `label` per il menu, `inNav: false` se non va nel menu). Se la pagina ha ancore interne (`/#contatti`), assegna gli `id` alle sezioni.
6. `npm run check`, poi `npm run screenshot -- --routes /<path>` e **guarda tutti e tre gli screenshot**. Controlla: nulla trabocca su mobile, gerarchia chiara, spazi coerenti tra sezioni, CTA visibile, header/footer a posto. Correggi prima di rispondere.
7. Aggiorna `design/PROGRESS.md` (tabella Pagine), commit: `Pagina <Nome>: <sezioni>`.
8. Chiudi: cosa contiene la pagina (una riga per sezione), dove sono gli screenshot, proponi la prossima pagina o `/verifica`.

## Da screenshot / Figma: come leggere l'immagine

- Misura mentalmente la griglia: quante colonne, larghezza contenuto, gutter.
- Riconosci i pattern (hero split, griglia card, alternanza immagine/testo, banda scura CTA).
- Estrai i testi visibili e usali tali e quali.
- Colori o font che non esistono nei token → aggiungi il token, non hardcodare.
- Se mancano le versioni mobile, decidi tu il collasso (stack verticale, ordine: titolo → immagine → testo → CTA).

## Correzioni tipiche

- «più aria tra le sezioni» → `--spacing-section` (globale) oppure `className="py-…"` sulla singola `Section`.
- «questa sezione a sfondo scuro» → `tone="dark"`.
- «sposta X sopra Y» → riordina, ricattura, mostra.
- «non mi piace il hero» → proponi 2 varianti del solo hero, screenshot di entrambe.
