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
      id: 'fiori',
      tone: 'scuro',
      title: 'Fiori',
      lines: ['Natural terpenes.', 'Real flavours.'],
      cta: 'Esplora fiori',
      image: 'images/demo/cat-flower.jpg',
    },
    {
      id: 'hash',
      tone: 'giallo',
      title: 'Hash',
      lines: ['Rich aromas.', 'Smooth character.'],
      cta: 'Esplora hash',
      image: 'images/demo/cat-hash.jpg',
    },
    {
      id: 'estratti',
      tone: 'scuro',
      title: 'Estratti',
      lines: ['Pure resin.', 'Full spectrum.'],
      cta: 'Esplora estratti',
      image: 'images/demo/jar-hash.jpg',
    },
  ],
  newDrop: {
    eyebrow: 'New drop',
    text: 'Lotto limitato, pressatura tradizionale. Quando finisce, finisce: niente ristampe, niente urgenza finta.',
    cta: 'Scopri il drop',
  },
  story: {
    eyebrow: 'Dalla genetica al cliente',
    title: 'Coltiviamo, produciamo, distribuiamo. Dal seme al tuo ordine.',
    text: 'Siamo produttori, distributori e venditori diretti. Seguiamo ogni passaggio: selezioniamo le migliori genetiche al mondo, le coltiviamo, ne estraiamo polline e materie prime, e da lì produciamo i nostri hash e i nostri estratti. Nessun intermediario, uno standard solo: il più alto, controllato passo per passo.',
    points: [
      { title: 'Genetiche selezionate', text: 'Le migliori al mondo, scelte una per una.' },
      { title: 'Coltivazione nostra', text: 'Indoor, glasshouse e outdoor seguiti da noi.' },
      {
        title: 'Estrazione e produzione',
        text: 'Polline, resine, hash ed estratti dalle nostre piante.',
      },
      { title: 'Vendita diretta', text: 'Dalla pianta al cliente finale, senza passaggi inutili.' },
    ],
    cta: 'Vedi le analisi',
    /** Le cinque tappe della filiera. `image` assente = foto ancora da fare. */
    slides: [
      {
        titolo: 'Semina',
        testo: 'Si parte dalla genetica: semi selezionati, uno per uno, e messa a dimora.',
        icona: 'semina',
      },
      {
        titolo: 'Coltivazione indoor',
        testo: 'Impianto nostro: luce, clima e nutrimento controllati ogni giorno.',
        image: 'images/demo/flower-macro-2.jpg',
      },
      {
        titolo: 'Setacciatura',
        testo: 'I fiori passano sui setacci: quello che scende è kif, resina pura.',
        image: 'images/demo/hash-macro.jpg',
      },
      {
        titolo: 'Pressatura',
        testo: 'La resina viene pressata a freddo: prende corpo, profumo e consistenza.',
        image: 'images/demo/hash-texture.jpg',
      },
      {
        titolo: 'Il prodotto finito',
        testo: 'Mousse, dry sift, estratti: tutto nasce dalle nostre genetiche.',
        image: 'images/demo/royal-hash.jpg',
      },
    ],
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
