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
      image: 'images/filiera/pressatura.jpg',
    },
  ],
  newDrop: {
    eyebrow: 'New drop',
    text: 'Lotto limitato, pressatura tradizionale. Quando finisce, finisce: niente ristampe, niente urgenza finta.',
    cta: 'Scopri il drop',
  },
  story: {
    eyebrow: 'Dalla genetica al cliente',
    title: 'Dal seme al tuo ordine.',
    kicker: 'Coltiviamo · Produciamo · Distribuiamo',
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
    cta: 'Vai allo shop',
    /** Le cinque tappe della filiera. Foto fornite dal brand, rilavorate in chiave The Hasher. */
    slides: [
      {
        titolo: 'Selezione e semina',
        testo:
          'Si parte dalla genetica: semi scelti uno per uno e messi a germinare in laboratorio.',
        image: 'images/filiera/semina.jpg',
      },
      {
        titolo: 'Coltivazione indoor',
        testo:
          'Impianto nostro: luce, clima e nutrimento controllati ogni giorno fino alla fioritura.',
        image: 'images/filiera/coltivazione.jpg',
      },
      {
        titolo: 'Raccolta e lavorazione',
        testo:
          'Le cime si raccolgono, si rifilano e si asciugano: da qui escono fiori e materia prima.',
        image: 'images/filiera/raccolta.jpg',
      },
      {
        titolo: 'Setacciatura',
        testo: 'I fiori passano sui setacci: quello che scende è kif, la resina pura della pianta.',
        image: 'images/filiera/setacciatura.jpg',
      },
      {
        titolo: 'Pressatura',
        testo: 'La resina viene pressata a freddo: nasce il panetto, dalle nostre genetiche.',
        image: 'images/filiera/pressatura.jpg',
      },
    ],
  },
  blog: {
    eyebrow: 'Dal blog',
    title: 'Come funzionano le cose.',
    text: 'Guide pratiche, cultura del prodotto e quello che succede in coltivazione. Senza promesse e senza consigli di salute.',
    cta: 'Vai al blog',
  },
  instagram: {
    eyebrow: 'Seguici',
    handle: '@thehasher',
    title: 'I drop escono prima su Instagram.',
    text: 'Nuovi lotti, dietro le quinte della coltivazione, analisi appena arrivate. Se non vuoi perderti niente, è lì che succede per primo.',
    cta: 'Seguici su Instagram',
    telegram: {
      testo: 'Oppure unisciti al canale Telegram: sconti giornalieri sui fine batch.',
      cta: 'Entra nel canale Telegram',
      href: 'https://t.me/thehasher',
    },
    /** Griglia della vetrina: foto già in chiave The Hasher */
    foto: [
      'images/filiera/setacciatura.jpg',
      'images/demo/lemon-haze.jpg',
      'images/filiera/coltivazione.jpg',
      'images/demo/hash-macro.jpg',
      'images/filiera/pressatura.jpg',
      'images/demo/cat-flower.jpg',
    ],
  },
  spedizioni: {
    eyebrow: 'Spedizioni',
    title: 'Anonime, veloci, in tutta Europa.',
    text: 'Fuori dalla scatola non c’è scritto niente: nessun logo, nessun riferimento al contenuto. Ordini entro le 14, parte in giornata.',
    punti: [
      {
        titolo: 'Packaging anonimo',
        testo: 'Scatola neutra e sigillata. Nessuno sa cosa c’è dentro, nemmeno il corriere.',
      },
      {
        titolo: 'Consegna in 24–72 ore',
        testo: 'Corriere espresso in tutta la UE, partenza in giornata dal lunedì al venerdì.',
      },
      {
        titolo: 'Tracciata e garantita',
        testo: 'Codice di tracciamento su ogni ordine. Se il pacco non arriva, lo rispediamo.',
      },
    ],
    nota: 'Spedizione gratuita sopra i 49 €.',
    cta: 'Spedizioni e resi',
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
    text: 'I tre best seller in formato da 1 g, nella stessa scatola. Per scegliere il tuo con cognizione di causa, senza prendere il formato grande alla cieca.',
    price: 1990,
    compareAt: 2370,
    grams: 3,
    cta: 'Aggiungi al carrello',
    sconto: '−16 %',
    nota: 'Spedizione gratuita inclusa.',
  },
  newsletter: {
    eyebrow: 'The Hasher Club',
    title: 'Il drop, prima degli altri.',
    text: 'Entri nel Club con la tua email: −5 % per sei mesi, drop in anteprima dal primo ordine, lotti Reserve quando diventi Black. Una mail ogni tanto, mai spam.',
    placeholder: 'La tua email',
    cta: 'Entra nel Club',
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
