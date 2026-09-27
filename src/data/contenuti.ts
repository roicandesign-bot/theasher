/** Contenuti editoriali del sito. Testi realistici da rivedere prima del lancio. */

export const azienda = {
  eyebrow: 'Chi siamo',
  titolo: 'Pochi prodotti, conosciuti uno per uno.',
  lead: 'The Hasher nasce da una convinzione semplice: nel CBD europeo c’è troppa scelta e troppa poca chiarezza. Noi facciamo il contrario.',
  paragrafi: [
    'Selezioniamo in Europa da produttori con cui lavoriamo da più raccolti, non da listini che cambiano ogni mese. Ogni lotto passa da un laboratorio indipendente prima di entrare in magazzino, e il certificato è pubblico: sta nella pagina del prodotto, con il numero stampato sulla confezione.',
    'Il resto è packaging nero, giallo acido e nessuna promessa che non possiamo mantenere. Non raccontiamo effetti, non usiamo parole mediche, non mettiamo foglie sulle scatole. Parla il prodotto.',
  ],
  valori: [
    {
      titolo: 'Selezione corta',
      testo: 'Preferiamo dieci referenze che conosciamo a cento che non abbiamo mai visto.',
    },
    {
      titolo: 'Lotti tracciati',
      testo: 'Numero di lotto su ogni confezione, certificato scaricabile da chiunque.',
    },
    {
      titolo: 'Zero cliché',
      testo: 'Niente fumo, niente foglie, niente linguaggio da farmacia.',
    },
    {
      titolo: 'Filiera europea',
      testo: 'Produttori scelti di persona, filiera corta, rapporti lunghi.',
    },
  ],
  numeri: [
    { valore: '3', etichetta: 'raccolti con gli stessi produttori' },
    { valore: '100 %', etichetta: 'dei lotti analizzati' },
    { valore: '48–72 h', etichetta: 'spedizione in UE' },
  ],
}

export const journal = [
  {
    slug: 'come-si-legge-un-certificato',
    titolo: 'Come si legge un certificato di analisi',
    categoria: 'Guide',
    data: '20 settembre 2026',
    lettura: '6 min',
    estratto:
      'CBD totale, THC, terpeni, data del prelievo: cosa guardare davvero in un documento di laboratorio e cosa invece non dice nulla.',
    immagine: 'images/demo/hash-macro.jpg',
    corpo: [
      'Un certificato di analisi non è un bollino: è un documento che dice cosa c’è dentro un lotto preciso, in un momento preciso. La prima cosa da controllare non è il numero grande in alto, ma la data del prelievo e il numero di lotto: se non corrispondono a quello stampato sulla confezione che hai in mano, il documento non riguarda il tuo prodotto.',
      'Poi si guarda il CBD totale, che tiene conto anche della parte acida non ancora convertita. Il THC deve rientrare nei limiti del Paese in cui il prodotto viene venduto, e i limiti cambiano: un valore legale in un Paese può non esserlo nel confine accanto.',
      'Il profilo dei terpeni, quando c’è, spiega l’aroma meglio di qualunque descrizione commerciale. Non è un indice di qualità assoluto, ma dice se quello che senti al naso è coerente con quello che è stato misurato.',
      'Quello che un certificato non dice: come è stato conservato il prodotto dopo l’analisi, come è stato trasportato, quanto tempo è passato. Per questo noi indichiamo sempre anche la data di confezionamento e le condizioni di conservazione.',
    ],
  },
  {
    slug: 'dry-sift-static-sift-differenze',
    titolo: 'Dry sift, static sift, ice-o-lator: cosa cambia davvero',
    categoria: 'Cultura',
    data: '8 settembre 2026',
    lettura: '8 min',
    estratto:
      'Tre modi di separare la resina dalla pianta, tre risultati diversi. Una guida senza tecnicismi inutili.',
    immagine: 'images/demo/hash-bricks.jpg',
    corpo: [
      'Tutte le lavorazioni dell’hash fanno la stessa cosa: separano le ghiandole di resina dal resto della pianta. Quello che cambia è il mezzo usato per farlo, e il mezzo cambia il risultato.',
      'Il dry sift lavora a secco: il materiale viene passato su reti di misura decrescente e le ghiandole cadono, mentre il vegetale resta sopra. È la tecnica più antica e la più diffusa. Il risultato dipende quasi tutto dalla materia prima e dalla pazienza di chi setaccia.',
      'Lo static sift usa l’elettricità statica per attirare le ghiandole. Si ottiene un prodotto molto pulito, con pochissimo residuo vegetale, e una resa bassa: per questo costa di più e si trova raramente.',
      'L’ice-o-lator, o bubble, usa acqua e ghiaccio: il freddo rende le ghiandole fragili, l’agitazione le stacca, i sacchi filtranti le separano per dimensione. Il numero di micron che leggi sull’etichetta è la misura del sacco, non un voto di qualità.',
      'Nessuna di queste tecniche è migliore in assoluto. Cambia la consistenza, cambia l’aroma, cambia il prezzo. La differenza tra un buon hash e uno mediocre sta prima: nella pianta di partenza.',
    ],
  },
  {
    slug: 'conservare-hash-e-fiori',
    titolo: 'Come conservare hash e fiori senza rovinarli',
    categoria: 'Guide',
    data: '25 agosto 2026',
    lettura: '4 min',
    estratto:
      'Luce, aria, calore e umidità: i quattro nemici. Poche regole pratiche che fanno la differenza dopo un mese.',
    immagine: 'images/demo/jar-hash.jpg',
    corpo: [
      'La resina e i terpeni sono volatili: se ne vanno con il calore e si ossidano con l’aria. Un prodotto conservato male in tre settimane perde gran parte dell’aroma, anche se resta perfettamente integro all’aspetto.',
      'Le regole sono quattro e sono noiose: al buio, al fresco, chiuso, e senza sbalzi. Il barattolo in vetro scuro è meglio del sacchetto aperto ogni giorno, la dispensa è meglio della macchina, e il frigorifero non serve, anzi: la condensa fa più danni del caldo.',
      'Per i fiori, l’umidità ideale sta tra il 55 e il 62 per cento. Sotto si sbriciolano e perdono aroma, sopra rischiano muffe. Le bustine regolatrici di umidità costano poco e risolvono il problema.',
    ],
  },
]

export const contatti = {
  eyebrow: 'Contatti',
  titolo: 'Scrivici.',
  lead: 'Rispondiamo entro un giorno lavorativo. Se la domanda riguarda un ordine, tieni a portata il numero: è quello che inizia con TH.',
  canali: [
    { titolo: 'Assistenza ordini', valore: 'ordini@thehasher.com', nota: 'Lun-Ven, 9-18' },
    { titolo: 'Domande sui prodotti', valore: 'info@thehasher.com', nota: 'Lun-Ven, 9-18' },
    {
      titolo: 'Rivenditori e distribuzione',
      valore: 'b2b@thehasher.com',
      nota: 'Vedi la pagina dedicata',
    },
    { titolo: 'Stampa e collaborazioni', valore: 'press@thehasher.com', nota: '' },
  ],
  motivi: ['Un ordine', 'Un prodotto', 'Spedizione o reso', 'Diventare rivenditore', 'Altro'],
}

export const distributore = {
  eyebrow: 'B2B',
  titolo: 'Diventa distributore.',
  lead: 'Cerchiamo pochi partner seri per Paese: negozi, catene, grossisti che vogliano una gamma corta, tracciata e con materiali già pronti.',
  offriamo: [
    {
      titolo: 'Listino riservato',
      testo:
        'Prezzi a scaglioni dal primo ordine, con condizioni migliori sopra le soglie concordate.',
    },
    {
      titolo: 'Esclusiva di zona',
      testo:
        'Dove ha senso, limitiamo il numero di rivenditori per area. Ne parliamo caso per caso.',
    },
    {
      titolo: 'Materiali pronti',
      testo:
        'Espositori, foto, testi e certificati: quello che serve per vendere senza inventare nulla.',
    },
    {
      titolo: 'Logistica europea',
      testo: 'Spedizione in tutta la UE, lotti tracciati, documenti in ordine.',
    },
  ],
  requisiti: [
    'Partita IVA attiva e attività coerente con la vendita di prodotti CBD',
    'Conformità alle regole del proprio Paese sulla vendita al pubblico',
    'Ordine minimo iniziale concordato in fase di apertura',
    'Nessuna vendita sotto il prezzo minimo consigliato',
  ],
  faq: [
    {
      q: 'Qual è l’ordine minimo?',
      a: 'Dipende dal Paese e dalla gamma scelta. Nella prima chiamata definiamo un minimo realistico, senza forzare magazzino che non ti serve.',
    },
    {
      q: 'Fate dropshipping?',
      a: 'No. Lavoriamo con chi tiene magazzino: è l’unico modo per garantire tempi e qualità di conservazione.',
    },
    {
      q: 'Posso vendere online?',
      a: 'Sì, alle condizioni concordate e nel rispetto delle regole del tuo Paese. Il prezzo minimo consigliato vale anche online.',
    },
    {
      q: 'Fornite i certificati di analisi?',
      a: 'Sempre, per ogni lotto, in formato scaricabile. Sono parte del prodotto, non un extra.',
    },
  ],
}

export const labTests = {
  eyebrow: 'Analisi di laboratorio',
  titolo: 'Ogni lotto, un certificato.',
  lead: 'Qui trovi tutti i certificati pubblicati, ordinati per data. Il numero di lotto è stampato sulla confezione: cerca quello e scarica il PDF.',
  nota: 'Valori dimostrativi. Nel sito reale i documenti vengono caricati dal team a ogni nuovo lotto, con la data del prelievo e il laboratorio che ha firmato.',
  lotti: [
    {
      lotto: 'LH-2609',
      prodotto: 'Lemon Haze',
      tipo: 'Hash',
      cbd: '18,4 %',
      thc: 'nei limiti',
      data: '09/2026',
      laboratorio: 'Laboratorio indipendente',
    },
    {
      lotto: 'RH-2608',
      prodotto: 'Royal Hash',
      tipo: 'Hash',
      cbd: '21,0 %',
      thc: 'nei limiti',
      data: '08/2026',
      laboratorio: 'Laboratorio indipendente',
    },
    {
      lotto: 'DG-2609',
      prodotto: 'Desert Gold',
      tipo: 'Hash',
      cbd: '16,7 %',
      thc: 'nei limiti',
      data: '09/2026',
      laboratorio: 'Laboratorio indipendente',
    },
    {
      lotto: 'KG-2609',
      prodotto: 'Ketama Gold',
      tipo: 'Hash',
      cbd: '19,8 %',
      thc: 'nei limiti',
      data: '09/2026',
      laboratorio: 'Laboratorio indipendente',
    },
    {
      lotto: 'SH-2608',
      prodotto: 'Silver Haze',
      tipo: 'Flower',
      cbd: '14,2 %',
      thc: 'nei limiti',
      data: '08/2026',
      laboratorio: 'Laboratorio indipendente',
    },
    {
      lotto: 'AM-2607',
      prodotto: 'Amnesia CBD',
      tipo: 'Flower',
      cbd: '13,5 %',
      thc: 'nei limiti',
      data: '07/2026',
      laboratorio: 'Laboratorio indipendente',
    },
  ],
}

export const faqGenerali = [
  {
    gruppo: 'Prodotti',
    voci: [
      {
        q: 'I prodotti sono legali?',
        a: 'Vendiamo hash e fiori CBD conformi alle normative dei Paesi in cui spediamo. Le regole cambiano da Paese a Paese: nel checkout mostriamo solo i prodotti disponibili per la tua destinazione.',
      },
      {
        q: 'Che differenza c’è tra hash e fiore?',
        a: 'Il fiore è l’infiorescenza essiccata. L’hash è la resina separata dalla pianta e compattata. Cambiano aroma, consistenza e concentrazione.',
      },
      {
        q: 'Dove trovo le analisi?',
        a: 'In ogni pagina prodotto e nella sezione Analisi di laboratorio, cercabili per numero di lotto.',
      },
    ],
  },
  {
    gruppo: 'Ordini e spedizioni',
    voci: [
      {
        q: 'Quanto costa la spedizione e quanto ci mette?',
        a: 'Spedizione tracciata in tutta la UE in 48–72 ore lavorative. Gratuita sopra la soglia indicata nel carrello; il costo esatto compare prima del pagamento.',
      },
      {
        q: 'Il pacco è discreto?',
        a: 'Sì: confezione anonima, sigillata, senza riferimenti al contenuto all’esterno.',
      },
      {
        q: 'Posso ordinare senza registrarmi?',
        a: 'Certo. Il checkout ospite è sempre disponibile; l’account si crea con un click dopo l’acquisto.',
      },
      {
        q: 'Come seguo il mio ordine?',
        a: 'Ricevi il codice di tracciamento via email appena il pacco parte. Se hai un account lo trovi anche nell’area cliente.',
      },
    ],
  },
  {
    gruppo: 'Pagamenti e resi',
    voci: [
      {
        q: 'Quali pagamenti accettate?',
        a: 'Carta, bonifico bancario e wallet. I dati della carta non passano mai dai nostri sistemi.',
      },
      {
        q: 'Posso restituire un prodotto?',
        a: 'Entro 14 giorni, se la confezione è integra e sigillata. I prodotti aperti non sono restituibili per ragioni igieniche.',
      },
      {
        q: 'Quando arriva il rimborso?',
        a: 'Entro 14 giorni dalla ricezione del reso, sullo stesso metodo di pagamento usato per l’ordine.',
      },
    ],
  },
]
