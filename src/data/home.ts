/** Contenuti della homepage. Claim del brand in inglese (linee ufficiali), testi in italiano. */
export const home = {
  hero: {
    eyebrow: 'Selected in Europe. Made for those who know.',
    titleA: 'Premium CBD.',
    titleB: 'Bold character.',
    lead: 'Hash e fiori CBD d’eccezione, selezionati in Europa. Analisi di laboratorio su ogni lotto, spedizione discreta in tutta la UE.',
    cta: 'Shop the drop',
    badges: [
      { label: 'Premium', sub: 'quality' },
      { label: 'EU', sub: 'sourced' },
      { label: 'Discreet', sub: 'shipping' },
    ],
  },
  trust: [
    { title: 'Lab tested', text: 'Un certificato per ogni lotto' },
    { title: 'Spedizione UE', text: 'Tracciata, 48–72 ore' },
    { title: 'Checkout sicuro', text: 'I tuoi dati sono protetti' },
    { title: 'Packaging discreto', text: 'Anonimo e sigillato' },
  ],
  categories: [
    {
      id: 'hash',
      title: 'Hash',
      lines: ['Rich aromas.', 'Smooth character.'],
      cta: 'Esplora hash',
      image: 'images/demo/cat-hash.jpg',
    },
    {
      id: 'cbd-flower',
      title: 'CBD Flower',
      lines: ['Natural terpenes.', 'Real flavours.'],
      cta: 'Esplora flower',
      image: 'images/demo/cat-flower.jpg',
    },
  ],
  newDrop: {
    eyebrow: 'New drop',
    text: 'Lotto limitato, pressatura tradizionale. Quando finisce, finisce: niente ristampe, niente urgenza finta.',
    cta: 'Scopri il drop',
  },
  story: {
    eyebrow: 'Crafted with character',
    title: 'Selezionato in Europa, spiegato senza giri di parole.',
    text: 'Scegliamo pochi prodotti e li conosciamo uno per uno: origine, lotto, analisi. Il resto è packaging nero, giallo acido e nessuna promessa che non possiamo mantenere.',
    points: [
      { title: 'Selezione europea', text: 'Produttori scelti di persona, filiera corta.' },
      { title: 'Lotti tracciati', text: 'Ogni confezione riporta il lotto e il suo certificato.' },
      { title: 'Zero cliché', text: 'Niente foglie, niente fumo: parla il prodotto.' },
    ],
    cta: 'Vedi le analisi',
    image: 'images/demo/landscape.jpg',
  },
  lab: {
    eyebrow: 'Analisi di laboratorio',
    title: 'Ogni lotto, un certificato.',
    text: 'I certificati completi si scaricano dalla pagina di ogni prodotto. I valori qui sotto sono dimostrativi: quelli reali verranno caricati dal team a ogni lotto.',
    reports: [
      {
        product: 'Lemon Haze',
        batch: 'LH-2609',
        cbd: '18,4 %',
        thc: 'entro i limiti di legge',
        date: '09/2026',
      },
      {
        product: 'Royal Hash',
        batch: 'RH-2608',
        cbd: '21,0 %',
        thc: 'entro i limiti di legge',
        date: '08/2026',
      },
      {
        product: 'Desert Gold',
        batch: 'DG-2609',
        cbd: '16,7 %',
        thc: 'entro i limiti di legge',
        date: '09/2026',
      },
    ],
  },
  reviews: {
    eyebrow: 'Recensioni verificate · esempio',
    title: 'Chi sa, riconosce.',
    note: 'Contenuti dimostrativi. Nel sito reale compariranno solo recensioni di ordini verificati.',
    items: [
      {
        name: 'Marco R.',
        product: 'Lemon Haze',
        rating: 5,
        text: 'Profilo agrumato pulito, texture morbida. Packaging serio, spedizione in due giorni.',
      },
      {
        name: 'Giulia T.',
        product: 'Royal Hash',
        rating: 5,
        text: 'Finalmente un brand che mostra le analisi senza doverle chiedere. Prodotto all’altezza.',
      },
      {
        name: 'Lukas W.',
        product: 'Desert Gold',
        rating: 4,
        text: 'Dolce e speziato come descritto. Avrei voluto il formato da 5 g disponibile subito.',
      },
    ],
  },
  bundle: {
    eyebrow: 'Bundle',
    title: 'Discovery box',
    text: 'I tre best seller in formato da 1 g. Per scegliere il tuo con cognizione di causa.',
    price: 1990,
    compareAt: 2370,
    grams: 3,
    cta: 'Aggiungi al carrello',
  },
  newsletter: {
    eyebrow: 'Newsletter',
    title: 'Il drop, prima degli altri.',
    text: 'Nuovi lotti, restock e il 10 % sul primo ordine. Una mail ogni tanto, mai spam.',
    placeholder: 'La tua email',
    cta: 'Iscriviti',
    consent:
      'Acconsento a ricevere comunicazioni da The Hasher. Posso disiscrivermi quando voglio.',
  },
  faq: {
    eyebrow: 'Domande frequenti',
    title: 'Chiaro e diretto.',
    items: [
      {
        q: 'I prodotti sono legali?',
        a: 'Vendiamo hash e fiori CBD conformi alle normative dei Paesi in cui spediamo. Le regole cambiano da Paese a Paese: nel checkout mostriamo solo i prodotti disponibili per la tua destinazione.',
      },
      {
        q: 'Quanto costa la spedizione e quanto ci mette?',
        a: 'Spedizione tracciata in tutta la UE in 48–72 ore lavorative. Gratuita sopra la soglia indicata nel carrello; il costo esatto compare prima del pagamento, senza sorprese.',
      },
      {
        q: 'Il pacco è discreto?',
        a: 'Sì: confezione anonima, sigillata, senza riferimenti al contenuto all’esterno.',
      },
      {
        q: 'Dove trovo le analisi di laboratorio?',
        a: 'In ogni pagina prodotto, con il numero di lotto stampato sulla confezione. Puoi scaricare il certificato in PDF.',
      },
      {
        q: 'Posso ordinare senza registrarmi?',
        a: 'Certo. Il checkout ospite è sempre disponibile; l’account si crea con un click dopo l’acquisto, se vuoi tenere traccia degli ordini.',
      },
    ],
  },
}
