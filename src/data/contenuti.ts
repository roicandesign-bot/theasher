/** Contenuti editoriali del sito. Testi realistici da rivedere prima del lancio. */

/**
 * Pagina L'azienda: racconto a capitoli, dalla genetica al cliente.
 * Foto: render approvati da Lorenzo (28/09/2026) più la setacciatura, foto vera della filiera.
 */
export const azienda = {
  hero: {
    eyebrow: 'L’azienda',
    titolo: 'Figli di chi coltiva.',
    lead: 'The Hasher nasce dentro un gruppo che coltiva, estrae, produce e spedisce cannabis light in tutta Europa. Non compriamo da nessuno: facciamo tutto noi, dal seme al barattolo.',
    img: 'images/filiera/coltivazione.jpg',
    alt: 'Coltivazione indoor del gruppo: file di piante in fioritura sotto le luci',
  },
  numeri: [
    {
      valore: 'IT · CH · CZ',
      etichetta: 'coltivazioni in Italia, Svizzera, Repubblica Ceca e nel mondo',
    },
    { valore: '300+', etichetta: 'prodotti a catalogo, in arrivo sul sito' },
    { valore: '<24\u00A0h', etichetta: 'restock urgenti per la rete' },
    { valore: '100\u00A0%', etichetta: 'filiera tracciata da un solo gestionale' },
  ],
  manifesto: 'Non compriamo da nessuno. Produciamo.',
  /** La linea del tempo: un capitolo per passaggio della filiera. */
  capitoli: [
    {
      n: '01',
      eyebrow: 'Le radici',
      titolo: 'Tutto parte da una genetica.',
      testo:
        'The Hasher è figlia di un gruppo che coltiva su scala industriale in Italia, Svizzera e Repubblica Ceca, e lavora con coltivatori in tutto il mondo. Tonnellate di fiori ogni anno, a partire da genetiche selezionate una per una.',
      etichette: ['Italia', 'Svizzera', 'Repubblica Ceca', 'Nel mondo'],
      img: 'images/azienda/campi.jpg',
      alt: 'Campi di canapa all’aperto tra le colline, al tramonto',
    },
    {
      n: '02',
      eyebrow: 'La coltivazione',
      titolo: 'Quattro modi di coltivare.',
      testo:
        'Outdoor, greenhouse, glasshouse e indoor: ogni clima dà un fiore diverso, e ogni fiore ha il suo prodotto. Per questo il catalogo copre tutte le fasce, dal fiore di tutti i giorni alle cime da collezione.',
      etichette: ['Outdoor', 'Greenhouse', 'Glasshouse', 'Indoor'],
      img: 'images/azienda/serra.jpg',
      alt: 'Glasshouse in Svizzera: file di piante in fioritura con le Alpi sullo sfondo',
    },
    {
      n: '03',
      eyebrow: 'Il recupero',
      titolo: 'Niente si butta.',
      testo:
        'Quando i fiori vengono puliti e rifilati, restano foglie e residui ricchi di resina. Non finiscono nel cestino: vanno al nostro laboratorio, che li trasforma in materia prima.',
      img: 'images/filiera/setacciatura.jpg',
      alt: 'Setacciatura dei residui di fiore: la resina cade dal setaccio',
    },
    {
      n: '04',
      eyebrow: 'Il laboratorio',
      titolo: 'Rosin full spectrum.',
      testo:
        'Dagli scarti delle pulizie il lab estrae rosin full spectrum e le altre materie prime che fanno da base a tutto il resto. Il rosin nasce solo da calore e pressione, senza solventi.',
      etichette: ['Rosin full spectrum', 'Kif e resine', 'Basi per gli oli'],
      img: 'images/azienda/laboratorio.jpg',
      alt: 'Laboratorio: la pressa per il rosin e i barattoli appena riempiti',
    },
    {
      n: '05',
      eyebrow: 'La produzione',
      titolo: 'Le nostre formule.',
      testo:
        'Da quelle basi, con formule nostre, nascono hash, estratti e oli. Ogni lotto ha il suo numero e il suo certificato, dalla pianta al barattolo.',
      etichette: ['Hash', 'Estratti', 'Oli'],
      img: 'images/azienda/controllo.jpg',
      alt: 'Controllo qualità: una cima sotto la lente e la scheda del lotto sul tablet',
    },
    {
      n: '06',
      eyebrow: 'Il controllo',
      titolo: 'Tutto sotto controllo.',
      testo:
        'Un unico gestionale segue la filiera intera: coltivazione, controllo qualità del fiore, produzione di hash ed estratti, ordini, magazzino della casa madre, spedizioni e riassortimento. Per noi e per ogni affiliato.',
      pannello: true,
    },
    {
      n: '07',
      eyebrow: 'La rete',
      titolo: 'Dalla casa madre a te.',
      testo:
        'Dal magazzino centrale riforniamo rivenditori, distributori e negozi in franchising in tutta Europa. Per i restock urgenti, la merce arriva in meno di 24 ore.',
      etichette: ['Rivenditori', 'Distributori', 'Franchising'],
      img: 'images/azienda/magazzino.jpg',
      alt: 'Il magazzino della casa madre: scaffali di buste e scatole The Hasher pronte a partire',
    },
    {
      n: '08',
      eyebrow: 'Oggi',
      titolo: 'The Hasher.',
      testo:
        'Il brand che porta tutto questo al cliente finale. Oltre 300 prodotti a catalogo, che arrivano sul sito uno alla volta. I prezzi migliori del mercato, perché il produttore siamo noi.',
      img: 'images/azienda/negozio.jpg',
      alt: 'Un negozio The Hasher di sera, con l’insegna e la vetrina illuminate',
    },
  ],
  /** Pannello dimostrativo del gestionale: dati finti, solo per far vedere l'idea. */
  gestionale: {
    fasi: ['Coltivazione', 'Controllo qualità', 'Produzione', 'Magazzino', 'Spedizione'],
    lotti: [
      { lotto: 'LH-2609', prodotto: 'Lemon Haze', fase: 2, stato: 'In produzione' },
      { lotto: 'TC-2611', prodotto: 'Tropicana Cookies', fase: 1, stato: 'QC superato' },
      { lotto: 'RH-2604', prodotto: 'Royal Hash', fase: 3, stato: '1.240 pz' },
      { lotto: 'GL-2612', prodotto: 'Gelato 41', fase: 4, stato: 'Spedito · 22 h' },
    ],
    kpi: [
      { valore: '184', etichetta: 'ordini oggi' },
      { valore: '98 %', etichetta: 'evasi in 24 h' },
      { valore: '312', etichetta: 'referenze attive' },
    ],
  },
  qualita: [
    {
      titolo: 'Naturale',
      testo:
        'Fiori, hash e rosin al 100 % naturali: niente additivi, niente aromi aggiunti. Solo materia prima di altissima qualità.',
    },
    {
      titolo: 'Standard altissimi',
      testo:
        'Ogni lotto passa dal controllo qualità del fiore prima di diventare prodotto. Quello che non supera il controllo non esce.',
    },
    {
      titolo: 'Catalogo immenso',
      testo:
        'Più di 300 referenze tra fiori, hash, estratti e oli, in tutte le coltivazioni e le lavorazioni.',
    },
    {
      titolo: 'Prezzi da produttore',
      testo:
        'Nessun intermediario tra il campo e il barattolo: i prezzi migliori del mercato, per te e per la rete.',
    },
  ],
  shop: {
    eyebrow: 'Dallo shop',
    titolo: 'Assaggia la filiera.',
    testo: 'Tutto quello che hai letto, in barattolo. Spedizione anonima in tutta Europa.',
    categorie: [
      { nome: 'Fiori', to: '/negozio?categoria=fiori', img: 'images/demo/cat-flower.jpg' },
      { nome: 'Hash', to: '/negozio?categoria=hash', img: 'images/demo/cat-hash.jpg' },
      { nome: 'Estratti', to: '/negozio?categoria=estratti', img: 'images/filiera/pressatura.jpg' },
    ],
  },
  rete: {
    eyebrow: 'Lavora con noi',
    titolo: 'Entra nella rete.',
    porte: [
      {
        nome: 'Ambassador',
        testo: 'Porta The Hasher al tuo pubblico e guadagna su ogni vendita.',
        to: '/diventa-distributore#formule',
      },
      {
        nome: 'Rivenditore',
        testo: 'Il nostro catalogo nel tuo negozio, a prezzi da produttore.',
        to: '/diventa-distributore#formule',
      },
      {
        nome: 'Distributore',
        testo: 'Formati grandi e condizioni da grossista per la tua rete.',
        to: '/diventa-distributore#formule',
      },
      {
        nome: 'Franchising',
        testo: 'Apri il tuo The Hasher: 0 % royalty, 60 % a te.',
        to: '/franchising',
      },
    ],
  },
}

export const blog = [
  {
    slug: 'indoor-glasshouse-outdoor',
    titolo: 'Indoor, glasshouse, outdoor: cosa cambia davvero',
    categoria: 'Guide',
    data: '24 settembre 2026',
    lettura: '5 min',
    estratto:
      'Stessa genetica, tre modi di coltivarla, tre prodotti diversi. Cosa si paga quando si paga di più.',
    immagine: 'images/filiera/coltivazione.jpg',
    corpo: [
      'Il metodo di coltivazione è la prima cosa che decide il prezzo di un fiore, prima ancora della genetica. Non perché uno sia «buono» e l’altro «cattivo», ma perché cambia quanto controllo hai su quello che succede alla pianta.',
      'Indoor vuol dire ambiente chiuso: luce, temperatura, umidità e nutrimento decisi da chi coltiva, ora per ora. Le cime vengono dense, cariche di resina, con un profilo aromatico netto. Costa di più perché consuma di più e richiede presenza costante.',
      'Glasshouse e greenhouse usano la luce del sole dentro una struttura: si risparmia energia, si perde un po’ di controllo. Il risultato è spesso ottimo, con cime leggermente più aperte e un profilo più morbido.',
      'Outdoor è la pianta in pieno campo. Il sole fa tutto, il clima decide l’annata. Le cime sono meno dense e il prezzo al grammo è il più basso del catalogo: per certi usi, come le estrazioni o gli infusi, è la scelta più sensata.',
      'Cali, infine, non è un luogo: è uno standard di lavorazione — cure lungo, selezione stretta, cime grandi. Si paga quello, non la California.',
    ],
  },
  {
    slug: 'dentro-la-nostra-coltivazione',
    titolo: 'Dentro la nostra coltivazione: una giornata in impianto',
    categoria: 'Dietro le quinte',
    data: '18 settembre 2026',
    lettura: '6 min',
    estratto:
      'Luci, ricircolo d’aria, controllo dell’umidità e mani sulle piante. Come lavoriamo davvero, senza filtri.',
    immagine: 'images/filiera/raccolta.jpg',
    corpo: [
      'La giornata comincia con i numeri: temperatura, umidità relativa, VPD, pH e conducibilità dell’acqua. Sono cinque valori che leggiamo prima ancora di guardare le piante, perché quando una pianta «si vede» che sta male, il problema è cominciato tre giorni prima.',
      'Poi si passa fila per fila. Si tolgono le foglie che fanno ombra alle cime basse, si controllano le pagine inferiori, si spostano i vasi che ricevono meno luce. È lavoro manuale, lento, e non si può automatizzare del tutto.',
      'Alla raccolta il tempo conta più di tutto: si taglia quando i tricomi sono al punto giusto, non quando fa comodo al calendario. Da lì partono asciugatura lenta e concia, che è il passaggio in cui la maggior parte del profumo si salva o si perde.',
      'Il trim che avanza non si butta: è materia prima per estrazioni e setacciature. È il motivo per cui possiamo dire che i nostri hash nascono dalle nostre piante.',
    ],
  },
  {
    slug: 'che-cose-il-kif',
    titolo: 'Che cos’è il kif, la polvere che esce dai setacci',
    categoria: 'Cultura',
    data: '12 settembre 2026',
    lettura: '5 min',
    estratto:
      'Le ghiandole di resina separate dalla pianta: da qui nasce ogni hash setacciato. Come si guarda, come si giudica.',
    immagine: 'images/filiera/setacciatura.jpg',
    corpo: [
      'Il kif è l’insieme delle ghiandole di resina — i tricomi — staccate dal fiore. Sul setaccio resta il vegetale, sotto scende una polvere che va dal biondo chiaro al sabbia scuro. Quella polvere è la base di ogni hash setacciato.',
      'Il colore dice molto: più è chiara e uniforme, meno vegetale è passato. Una polvere verdognola significa che insieme alle ghiandole è sceso anche materiale della foglia, e in bocca si sente subito.',
      'Il secondo indizio è come si comporta sotto le dita: un kif ricco si compatta con il calore della mano, uno povero resta polveroso e asciutto anche premendo.',
      'Da qui in poi cambia solo cosa ci fai: pressato a freddo diventa un panetto, lavorato in più passaggi diventa un super dry, lasciato così resta polline. La qualità, però, è già decisa: viene dalla pianta e dal setaccio.',
    ],
  },
  {
    slug: 'cbg-cbn-cosa-sono',
    titolo: 'CBG e CBN: i due cannabinoidi di cui si parla poco',
    categoria: 'Guide',
    data: '5 settembre 2026',
    lettura: '4 min',
    estratto:
      'Non sono «CBD di serie B»: sono molecole diverse, con profili diversi. Cosa c’è da sapere prima di sceglierle.',
    immagine: 'images/demo/packaging-family.jpg',
    corpo: [
      'Il CBG è il cannabinoide da cui derivano gli altri: nella pianta compare presto e, mano a mano che la fioritura avanza, si trasforma. Per avere fiori ricchi di CBG servono genetiche specifiche o raccolte anticipate, ed è il motivo per cui costa più del CBD.',
      'Il CBN invece si forma dopo, con l’ossidazione: è il prodotto dell’invecchiamento del materiale. Per questo si trova soprattutto in estratti e oli, dove viene isolato e dosato, e raramente in fiore.',
      'Sul sito li trovi come linee a sé: CBG e CBN hanno la loro pillola nei filtri del negozio, e in ogni scheda la percentuale è dichiarata sul lotto.',
      'Una precisazione che ci teniamo a fare: non diciamo a cosa servono. Non è reticenza, è che non possiamo fare affermazioni su effetti o benefici. Quello che possiamo darti è il dato analitico, verificabile.',
    ],
  },
  {
    slug: 'thcx-perche-linea-separata',
    titolo: 'THC-X: perché lo teniamo su una linea separata',
    categoria: 'Legale',
    data: '30 agosto 2026',
    lettura: '5 min',
    estratto:
      'Due linee, regole diverse, nessuna confusione in carrello. Come abbiamo organizzato il catalogo e perché.',
    immagine: 'images/demo/hash-texture.jpg',
    corpo: [
      'Il catalogo è diviso in linee: CBD e THC-X, più le linee CBG e CBN. Non è una scelta di marketing: sono famiglie con normative, disponibilità e Paesi di destinazione diversi.',
      'Tutti i prodotti restano entro i limiti di legge sul THC del mercato in cui vengono venduti, e i limiti cambiano da Paese a Paese. Per questo la linea è scritta sulla scheda e filtrabile dal negozio: chi compra deve sapere cosa ha in mano prima di metterlo nel carrello.',
      'Dove serve, indichiamo anche i lotti certificati 0,0 % di THC con l’etichetta THC free: isolati, terpsolate e alcuni oli.',
      'La materia cambia in fretta. Quando cambia, aggiorniamo le schede e le note legali: la pagina Informazioni legali riporta sempre la versione in vigore.',
    ],
  },
  {
    slug: 'formati-fiore-come-scegliere',
    titolo: 'Big bud, small bud, trim, prerolls: quale formato scegliere',
    categoria: 'Prodotto',
    data: '22 agosto 2026',
    lettura: '4 min',
    estratto:
      'Stessa coltivazione, quattro formati, quattro prezzi. Una guida veloce per non pagare quello che non ti serve.',
    immagine: 'images/demo/cat-flower.jpg',
    corpo: [
      'Big bud sono le cime grandi, quelle che si fotografano: selezione più stretta, resa più bassa per il coltivatore, prezzo più alto. Se cerchi l’aspetto oltre al profilo, sono quelle.',
      'Small bud vengono dalle stesse piante e dallo stesso lotto: cime più piccole, stesso profumo, prezzo al grammo più basso. Per chi guarda la sostanza è quasi sempre l’acquisto più sensato.',
      'Il trim è il materiale di lavorazione: foglie e residui selezionati. Non è materiale da fiore, è materia prima per estrazioni e infusi, e il prezzo lo dice.',
      'I prerolls sono coni pronti: comodi, dosati, con tiraggio regolare. Si paga la lavorazione, non il grammo.',
    ],
  },
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

/** La forza del gruppo dietro il brand: la usano sia la pagina rivenditori sia il franchising. */
export const gruppo = {
  eyebrow: 'Chi c’è dietro',
  titolo: 'Un produttore, non un intermediario.',
  testo:
    'The Hasher è il brand retail di un gruppo che coltiva, estrae, confeziona e spedisce ogni giorno a negozi e grossisti in tutta Europa. Per te vuol dire una cosa sola: non resti mai senza merce, e la paghi meno di chiunque altro.',
  punti: [
    {
      titolo: 'Produciamo noi',
      testo:
        'Coltivazioni indoor, glasshouse e outdoor, laboratorio di estrazione e confezionamento interni. Controlliamo ogni passaggio.',
    },
    {
      titolo: 'Catalogo sterminato',
      testo:
        'Fiori, hash, estratti e oli in tutte le coltivazioni e lavorazioni, linee CBD, THC-X, CBG e CBN. Sempre disponibili.',
    },
    {
      titolo: 'Prezzi da produttore',
      testo:
        'Nessun passaggio in mezzo: le stesse condizioni dei nostri clienti più grandi all’ingrosso.',
    },
    {
      titolo: 'Logistica veloce',
      testo:
        'Magazzini pronti e spedizione espressa: riforniamo ovunque in Europa, in qualsiasi momento, in 24–72 ore.',
    },
  ],
}

export const distributore = {
  eyebrow: 'Ambassador · Rivenditori · Distributori',
  titolo: 'Porta The Hasher ovunque.',
  lead: 'Col tuo pubblico, nel tuo negozio o nella tua rete: prezzi da produttore, oltre 300 prodotti già confezionati e restock urgenti in meno di 24 ore.',
  numeri: [
    { valore: '50\u00A0%', etichetta: 'margine massimo sul prezzo consigliato' },
    { valore: '<24\u00A0h', etichetta: 'restock urgenti in tutta Europa' },
    { valore: '300+', etichetta: 'prodotti a catalogo' },
  ],
  livelli: [
    {
      nome: 'Ambassador',
      perChi: 'Creator, influencer, community',
      etichetta: 'La tua commissione',
      margine: '10–15\u00A0%',
      minimo: 'Nessun investimento',
      punti: [
        'Codice sconto personale per il tuo pubblico',
        'Commissione su ogni vendita dal tuo codice',
        'Kit prodotti e drop in anteprima',
        'Foto e contenuti pronti da pubblicare',
      ],
    },
    {
      acquista: true,
      nome: 'Rivenditore',
      perChi: 'Negozi e shop online',
      minimo: 'Primo ordine da 1.500 €',
      margine: '40\u00A0%',
      punti: [
        'Tutta la gamma, prodotto già confezionato',
        'Espositore da banco incluso',
        'Riordino libero, senza minimo',
        'Certificato di analisi per ogni lotto',
      ],
    },
    {
      nome: 'Distributore',
      acquista: true,
      perChi: 'Grossisti e catene',
      minimo: 'Da 5.000 € a ordine',
      margine: '50\u00A0%',
      evidenza: true,
      punti: [
        'Formati grandi fino a 100 g',
        'Referente commerciale dedicato',
        'Materiali marketing per i tuoi punti vendita',
        'Pagamento a 30 giorni dopo il terzo ordine',
      ],
    },
  ],
  /** Prezzi indicativi al grammo, IVA esclusa. Da allineare al listino vero prima del lancio. */
  listino: [
    { categoria: 'Fiori indoor', pubblico: '8,17 €', prezzi: ['4,90 €', '4,10 €'] },
    { categoria: 'Hash dry sift', pubblico: '11,25 €', prezzi: ['6,75 €', '5,60 €'] },
    { categoria: 'Hash frozen e static', pubblico: '22,50 €', prezzi: ['13,50 €', '11,20 €'] },
    { categoria: 'Estratti', pubblico: '36,80 €', prezzi: ['22,00 €', '18,40 €'] },
  ],
  passi: [
    { titolo: 'Richiesta', testo: 'Compili il modulo qui sotto: due minuti.' },
    {
      titolo: 'Chiamata',
      testo: 'Entro 48 ore ti richiamiamo: zona, volumi, gamma, formula giusta per te.',
    },
    {
      titolo: 'Kit di prova',
      testo: 'Ti mandiamo una selezione di campioni con il listino completo.',
    },
    { titolo: 'Primo ordine', testo: 'Parti con la formula concordata. Il resto lo facciamo noi.' },
  ],
  /** Il programma ambassador, raccontato a parte nella pagina. */
  ambassador: {
    eyebrow: 'Programma ambassador',
    titolo: 'Il tuo pubblico, la tua commissione.',
    testo:
      'Cerchiamo creator e influencer che vogliono spingere The Hasher sui social e sul sito. Nessun investimento, nessun magazzino: condividi il tuo codice, i tuoi follower hanno uno sconto, tu guadagni su ogni ordine.',
    passi: [
      { titolo: 'Ti candidi', testo: 'Profilo social e numeri: valutiamo in 48 ore.' },
      { titolo: 'Ricevi il kit', testo: 'Prodotti, foto e il tuo codice personale.' },
      {
        titolo: 'Pubblichi',
        testo: 'Racconti il prodotto al tuo modo, con le nostre linee guida.',
      },
      { titolo: 'Guadagni', testo: 'Commissione su ogni vendita, pagata ogni mese.' },
    ],
    livelli: [
      { nome: 'Member', cosa: 'Codice sconto e commissione base' },
      { nome: 'Pro', cosa: 'Commissione più alta, drop in anteprima' },
      { nome: 'Elite', cosa: 'Collab dedicate e budget per contenuti' },
    ],
    nota: 'Percentuali indicative: commissione e sconto definitivi in base al profilo e ai risultati.',
  },
  requisiti: [
    'Partita IVA attiva e attività coerente con la vendita di prodotti CBD',
    'Conformità alle regole del proprio Paese sulla vendita al pubblico',
    'Rispetto degli standard del marchio e della comunicazione, anche online',
    'Magazzino proprio: non lavoriamo in dropshipping',
  ],
  faq: [
    {
      q: 'Come funziona il programma ambassador?',
      a: 'Ti candidi con il tuo profilo social, ricevi un kit prodotti e un codice personale. Il tuo pubblico ha uno sconto, tu una commissione su ogni ordine fatto col tuo codice, sul sito. Nessun investimento e nessun magazzino.',
    },
    {
      q: 'Qual è l’ordine minimo?',
      a: 'Per i rivenditori il primo ordine parte da 1.500 €, poi si riordina liberamente. Per i distributori il minimo è di 5.000 € a ordine.',
    },
    {
      q: 'I prezzi del listino sono definitivi?',
      a: 'Sono indicativi, IVA esclusa. Il listino completo, con tutti i formati e le promozioni del mese, arriva dopo la prima chiamata.',
    },
    {
      q: 'Posso aprire un negozio con il vostro marchio?',
      a: 'Sì, con il franchising: insegna The Hasher, esclusiva di zona e il 60 % del venduto a te. Trovi tutto nella pagina dedicata.',
    },
    {
      q: 'Quanto ci mette un restock?',
      a: 'Di norma 24–72 ore in tutta Europa. Per le urgenze la merce parte subito e arriva in meno di 24 ore.',
    },
    {
      q: 'Fate dropshipping?',
      a: 'No. Lavoriamo con chi tiene magazzino: è l’unico modo per garantire tempi e qualità di conservazione.',
    },
    {
      q: 'Fornite i certificati di analisi?',
      a: 'Sempre, per ogni lotto, in formato scaricabile. Sono parte del prodotto, non un extra.',
    },
  ],
}

export const franchising = {
  eyebrow: 'Franchising The Hasher',
  titolo: 'Own The Hasher.',
  lead: 'Tu costruisci il tuo business. Noi costruiamo la macchina dietro: brand, prodotti esclusivi, supply chain, tecnologia e marketing. E sul tuo venduto non prendiamo royalty.',
  numeri: [
    { valore: '60\u00A0%', etichetta: 'margine sul venduto del tuo negozio' },
    { valore: '0\u00A0%', etichetta: 'royalty sul venduto' },
    { valore: '24–72\u00A0h', etichetta: 'riassortimento, ovunque in Europa' },
  ],
  manifesto:
    'Non guadagniamo perché possiedi un nostro negozio. Guadagniamo quando il tuo negozio vende.',
  modello: {
    eyebrow: 'Il modello',
    titolo: 'Il 60 % è tuo. Punto.',
    testo:
      'Su ogni vendita il 60 % resta al negozio. Il 40 % è il prodotto, che ti riforniamo noi: la casa madre guadagna vendendo prodotto alla rete, non tassando il tuo scontrino. Se vendi tanto, cresciamo insieme.',
    ripartizione: [
      { quota: '60 %', chi: 'Al negozio', cosa: 'Il tuo margine su ogni scontrino' },
      { quota: '40 %', chi: 'Al prodotto', cosa: 'Merce, riassortimento e logistica' },
    ],
  },
  /** Condizioni di lancio: ipotesi da validare coi conti del negozio pilota. */
  condizioni: [
    { voce: 'Fee d’ingresso', valore: '7.500 – 15.000 €' },
    { voce: 'Royalty sul venduto', valore: '0 %' },
    { voce: 'Fondo marketing di rete', valore: '1 – 2 %' },
    { voce: 'Starter pack (stock iniziale)', valore: '10.000 – 25.000 €' },
    { voce: 'Durata del contratto', valore: '5 anni' },
    { voce: 'Territorio', valore: 'Esclusiva a performance' },
  ],
  formati: [
    {
      nome: 'Corner',
      mq: '10–20 m²',
      testo:
        'Shop-in-shop o chiosco dentro un’attività esistente. L’investimento più basso, perfetto per aprire un territorio.',
    },
    {
      nome: 'Store',
      mq: '50–100 m²',
      testo: 'Il negozio The Hasher standard: premium retail e community. Il cuore della rete.',
      evidenza: true,
    },
    {
      nome: 'Flagship',
      mq: '100–250 m²',
      testo: 'Città principali: retail, eventi, merchandise ed esperienza di marca.',
    },
  ],
  /** Render approvati da Lorenzo (settembre 2026). L'esterno apre la pagina. */
  esterno: {
    img: 'images/franchising/esterno.jpg',
    alt: 'Mockup di un negozio The Hasher: facciata nera, insegna gialla illuminata, vetrina con prodotti e abbigliamento',
  },
  mockup: [
    {
      titolo: 'Interno',
      testo: 'Scaffali retroilluminati, logo al neon, bancone monolitico',
      img: 'images/franchising/interno.jpg',
      alt: 'Mockup dell’interno di un negozio The Hasher: pareti nere, scaffali con luce gialla, logo al neon dietro il bancone',
    },
    {
      titolo: 'Bancone',
      testo: 'Vetrina prodotto, packaging nero e giallo',
      img: 'images/franchising/bancone.jpg',
      alt: 'Mockup del bancone The Hasher: vetrina in vetro con barattoli e scatole nere col logo giallo',
    },
  ],
  /** Le linee che esistono solo nella rete. */
  linee: ['TH Original', 'TH Black Label', 'TH Drops', 'TH Reserve', 'TH Collabs'],
  ecosistema: {
    eyebrow: 'Il sistema',
    titolo: 'Tutto quello che da solo non avresti.',
    testo:
      'Non compri un’insegna: compri un negozio già progettato per funzionare. E più resti nella rete, più il vantaggio cresce.',
    voci: [
      {
        titolo: 'Prodotti esclusivi',
        testo:
          'Cultivar, formulazioni, formati e collaborazioni prodotti per The Hasher. Fuori dalla rete non esistono.',
      },
      {
        titolo: 'The Hasher Club',
        testo:
          'Una sola fedeltà nazionale: punti, livelli, drop in anteprima ed eventi. I clienti di tutta la rete entrano anche da te.',
      },
      {
        titolo: 'L’e-commerce vende per te',
        testo:
          'Un solo sito nazionale. I clienti che acquisisci restano legati al tuo negozio: se comprano online, una quota è tua.',
      },
      {
        titolo: 'Potere d’acquisto',
        testo:
          'La rete compra a tonnellate, tu paghi come un grande. E con i rebate annuali, più cresci meno paghi.',
      },
      {
        titolo: 'Marketing nazionale',
        testo:
          'Campagne, creator, social, foto e materiali per il punto vendita, pronti. Tu porti la gente dentro.',
      },
      {
        titolo: 'Tecnologia inclusa',
        testo:
          'Cassa, CRM, fedeltà e riassortimento automatico collegati: vedi i tuoi numeri ogni giorno.',
      },
      {
        titolo: 'Manuale e formazione',
        testo:
          'Apertura, vendita, stock, clienti, KPI, merchandising: il know-how della rete, scritto e insegnato.',
      },
      {
        titolo: 'Compliance per Paese',
        testo:
          'Ogni prodotto è verificato per il tuo mercato prima di arrivarti. Il lavoro normativo lo facciamo noi.',
      },
    ],
  },
  rebate: [
    { soglia: '100.000 €', valore: '1 %' },
    { soglia: '200.000 €', valore: '2 %' },
    { soglia: '350.000 €', valore: '3 %' },
    { soglia: '500.000 €', valore: '4 %' },
  ],
  territorio: {
    titolo: 'Territorio protetto, se lo meriti.',
    testo:
      'La tua zona è esclusiva finché mantieni gli standard: fatturato, qualità del negozio, recensioni, stock, formazione. Se li superi, hai la priorità sulla seconda apertura.',
  },
  carriera: [
    { livello: 'Partner', cosa: '1 negozio' },
    { livello: 'Multi-Store', cosa: 'da 2 a 4 negozi' },
    { livello: 'Area Partner', cosa: 'sviluppo di una provincia o regione' },
    { livello: 'Master Partner', cosa: 'sviluppo di un intero Paese' },
  ],
  founder: {
    eyebrow: 'Founder Program',
    titolo: 'I primi 20 partner.',
    testo:
      'Chi entra per primo costruisce la rete con noi, e ha condizioni migliori per sempre, finché resta e rispetta gli standard.',
    posti: 20,
    vantaggi: [
      'Fee d’ingresso ridotta',
      'Rebate maggiorato sugli acquisti',
      'Priorità nella scelta del territorio',
      'Budget marketing dedicato all’apertura',
    ],
  },
  starter: {
    eyebrow: 'Starter pack',
    titolo: 'Parti a bomba.',
    testo:
      'Niente mesi di rodaggio con lo scaffale mezzo vuoto. Il giorno dell’apertura hai il catalogo completo, già confezionato e prezzato, pronto da vendere.',
    contenuto: [
      'Tutte e quattro le famiglie: fiori, hash, estratti, oli',
      'Le linee esclusive TH, disponibili solo nella rete',
      'Formati da vetrina e da banco, con il prezzo consigliato',
      'Espositori, vetrofanie e materiale per il punto vendita',
      'Certificato di analisi per ogni lotto',
      'Primo riassortimento in 72 ore',
    ],
    famiglie: [
      { nome: 'Fiori', img: 'images/demo/cat-flower.jpg' },
      { nome: 'Hash', img: 'images/demo/cat-hash.jpg' },
      { nome: 'Estratti', img: 'images/filiera/pressatura.jpg' },
      { nome: 'Oli', img: 'images/demo/packaging-family.jpg' },
    ],
  },
  calcolo: {
    eyebrow: 'Fai i conti',
    titolo: 'Quanto ti resta.',
    testo:
      'Sposta la barra su quanto pensi di vendere al mese. Zero royalty: non togliamo niente da qui.',
    min: 3000,
    max: 60000,
    passo: 1000,
    iniziale: 15000,
    nota: 'Margine lordo indicativo sul venduto IVA esclusa. Affitto, personale, fondo marketing e costi del locale restano a carico del negozio.',
  },
  selezione: [
    { titolo: 'Candidatura', testo: 'Due minuti, qui sotto.' },
    { titolo: 'Call conoscitiva', testo: 'Entro 48 ore: chi sei, dove, con che obiettivi.' },
    {
      titolo: 'Qualifica',
      testo: 'Capitale disponibile e sostenibilità dei primi 12 mesi, senza giri di parole.',
    },
    {
      titolo: 'Discovery day',
      testo: 'Vieni a vedere la macchina: produzione, magazzino, negozio pilota.',
    },
    {
      titolo: 'Territorio e business plan',
      testo: 'Analizziamo la zona e costruiamo insieme il conto economico del tuo negozio.',
    },
    {
      titolo: 'Contratto e apertura',
      testo: 'Formazione, allestimento, starter pack. Alzi la serranda.',
    },
  ],
  cerchiamo: [
    'Imprenditori locali e gestori retail',
    'Operatori horeca e commerciali forti',
    'Proprietari di più punti vendita',
    'Capitale sufficiente a sostenere i primi 12 mesi',
  ],
  citta: [
    'Milano',
    'Roma',
    'Torino',
    'Bologna',
    'Firenze',
    'Napoli',
    'Verona',
    'Padova',
    'Genova',
    'Bari',
    'Palermo',
    'Barcellona',
    'Berlino',
    'Parigi',
    'Zurigo',
  ],
  faq: [
    {
      q: 'Quanto costa aprire?',
      a: 'La fee d’ingresso parte da 7.500 € e dipende dal formato. A parte ci sono l’allestimento del locale e lo starter pack, costruiti sulla tua zona: il piano con tutte le cifre arriva prima della firma, nero su bianco.',
    },
    {
      q: 'Davvero zero royalty?',
      a: 'Sì: sul tuo venduto non prendiamo percentuali. La casa madre guadagna vendendoti il prodotto. C’è solo un fondo marketing dell’1–2 %, speso sulla rete e rendicontato.',
    },
    {
      q: 'Come funziona il 60 %?',
      a: 'Su ogni vendita il 60 % è il tuo margine lordo, il 40 % copre il prodotto che ti riforniamo. Le spese del locale (affitto, personale, utenze) sono tue, come in ogni negozio.',
    },
    {
      q: 'Serve esperienza nel settore?',
      a: 'No. Ti formiamo noi su prodotto, vendita e normativa. Ci serve una persona forte commercialmente e seria sul posto.',
    },
    {
      q: 'E se un giorno volessi uscire?',
      a: 'Alla scadenza puoi farlo. Ma perderesti le linee esclusive, i clienti del Club, le vendite online attribuite al tuo negozio e i rebate. È per questo che i partner restano: non per il contratto, per la convenienza.',
    },
    {
      q: 'Cosa si può vendere nel mio Paese?',
      a: 'Solo i prodotti approvati per il tuo mercato. Le regole sul CBD cambiano per categoria e Paese: la verifica la facciamo noi prima di spedirti qualunque cosa.',
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

/** Domande frequenti: allineate a condizioni di vendita, avvertenze e privacy. */
export const faqGenerali = [
  {
    gruppo: 'Prodotti e legalità',
    voci: [
      {
        q: 'I vostri prodotti sono legali?',
        a: 'Vengono da varietà di canapa iscritte nel Catalogo europeo, con THC entro i limiti di legge, e ogni lotto ha il suo certificato di analisi. Le regole però cambiano da Paese a Paese: per questo il catalogo si adatta al Paese di consegna e ti mostra solo ciò che possiamo spedirti. Se viaggi, verifica le norme del Paese di arrivo.',
      },
      {
        q: 'Cosa vuol dire «THC totale»?',
        a: 'È il THC già presente più quello che si formerebbe scaldando il THC-A. È il valore che conta per la legge nella maggior parte dei Paesi, e lo trovi nel certificato di ogni lotto.',
      },
      {
        q: 'Che differenza c’è tra CBD, THC-X, THC-A, CBG e CBN?',
        a: 'Sono cannabinoidi diversi. Il CBD è il più diffuso e non altera la percezione. CBG e CBN sono cannabinoidi minori, il CBN è quello delle nostre formule della sera. THC-X e THC-A sono linee più intense, vendute solo nei Paesi in cui sono consentite.',
      },
      {
        q: 'Full spectrum, broad spectrum, isolato: cosa cambia?',
        a: 'Il full spectrum contiene tutti i cannabinoidi e i terpeni della pianta, compreso THC entro i limiti di legge. Il broad spectrum li contiene tutti tranne il THC. L’isolato è un solo cannabinoide puro al 97–99 %.',
      },
      {
        q: 'Dove trovo le analisi e come le leggo?',
        a: 'In ogni pagina prodotto e nella sezione Analisi di laboratorio, cercando il numero di lotto stampato sulla confezione. Il certificato riporta ogni cannabinoide in percentuale, il THC totale, il laboratorio e la data.',
      },
      {
        q: 'Perché il prodotto che ricevo non è identico alla foto?',
        a: 'Sono prodotti naturali: colore, forma e profumo cambiano un po’ da un lotto all’altro. Fanno fede i valori del certificato del tuo lotto, non la foto.',
      },
    ],
  },
  {
    gruppo: 'Uso e sicurezza',
    voci: [
      {
        q: 'Il CBD fa «sballare»?',
        a: 'No: il CBD non altera la percezione. Le linee THC-X e THC-A invece sono più intense: segui le dosi indicate e parti da una quantità minima.',
      },
      {
        q: 'Posso risultare positivo a un test antidroga?',
        a: 'Sì, può succedere. Anche i prodotti a norma contengono tracce di THC che possono accumularsi. Se fai test sul lavoro o per la patente, evita i nostri prodotti.',
      },
      {
        q: 'Posso guidare dopo l’uso?',
        a: 'Non guidare dopo l’uso di prodotti THC-X, THC-A o CBN, né quando ti senti meno lucido. Con il CBD resta il rischio del test positivo su strada.',
      },
      {
        q: 'Prendo farmaci o sono in gravidanza: posso usarli?',
        a: 'Chiedi prima al tuo medico. Il CBD può interagire con alcuni farmaci e l’uso è sconsigliato in gravidanza e allattamento. I nostri prodotti non sono medicinali.',
      },
      {
        q: 'Posso portarli in viaggio?',
        a: 'Dipende dal Paese di arrivo e da quelli che attraversi: un prodotto legale da noi può non esserlo altrove, e in aereo valgono anche le regole della compagnia. Nel dubbio, non portarli.',
      },
      {
        q: 'Come si conservano?',
        a: 'Al fresco, al buio e nella confezione chiusa. Fiori e hash tengono profumo e consistenza per mesi; oli ed edibles hanno la scadenza sulla confezione; i cloni vanno trapiantati entro 5 giorni.',
      },
    ],
  },
  {
    gruppo: 'Ordini e spedizioni',
    voci: [
      {
        q: 'In quali Paesi spedite?',
        a: 'Nei Paesi dell’Unione Europea in cui i prodotti sono vendibili. Scegli il Paese all’inizio: il catalogo mostra solo ciò che possiamo spedirti.',
      },
      {
        q: 'Quanto costa la spedizione e quanto ci mette?',
        a: 'Standard tracciata da 5,90 €, express da 9,90 €, gratuita sopra la soglia indicata nel carrello. Ordini pagati entro le 13 partono in giornata; la consegna richiede 24–48 ore in Italia e 48–96 ore nel resto dell’UE.',
      },
      {
        q: 'Il pacco è discreto?',
        a: 'Sì: confezione neutra e sigillata, senza loghi né riferimenti al contenuto. Fuori compare solo la ragione sociale del mittente.',
      },
      {
        q: 'Ci sono dazi o dogana?',
        a: 'No: spediamo solo dentro l’Unione Europea, quindi niente dogana né costi aggiuntivi alla consegna. L’IVA è già inclusa nel prezzo.',
      },
      {
        q: 'Posso ordinare senza account?',
        a: 'Sì, il checkout ospite è sempre disponibile. L’account serve per lo sconto newsletter, i preferiti e lo storico ordini.',
      },
      {
        q: 'Il pacco è arrivato danneggiato o non è arrivato.',
        a: 'Fotografa il pacco prima di aprirlo e scrivici: lo sostituiamo. Se risulta consegnato ma non l’hai ricevuto, scrivici entro 7 giorni e apriamo noi la pratica con il corriere.',
      },
    ],
  },
  {
    gruppo: 'Pagamenti',
    voci: [
      {
        q: 'Quali pagamenti accettate?',
        a: 'Carta, Apple Pay, Google Pay e bonifico. I dati della carta li gestisce un fornitore certificato: non passano dai nostri sistemi.',
      },
      {
        q: 'Posso avere la fattura?',
        a: 'Sì: inserisci i dati fiscali al checkout e la ricevi in formato elettronico.',
      },
      {
        q: 'Ho pagato con bonifico: quando parte l’ordine?',
        a: 'Quando l’accredito risulta sul nostro conto, di solito in 1–2 giorni lavorativi. Teniamo i prodotti da parte per 5 giorni.',
      },
    ],
  },
  {
    gruppo: 'Resi e garanzia',
    voci: [
      {
        q: 'Posso restituire un prodotto?',
        a: 'Sì, entro 14 giorni dalla consegna se il sigillo è intatto. Semi, merch e accessori si restituiscono se integri e non usati. Tutti i dettagli nella pagina Resi, recesso e garanzia.',
      },
      {
        q: 'Perché un prodotto aperto non si può restituire?',
        a: 'Lo prevede la legge per i prodotti sigillati che, per motivi igienici e di salute, non si possono rivendere una volta aperti (art. 59 Codice del Consumo). Se però il prodotto è difettoso o non corrisponde al certificato, la garanzia vale anche se è aperto.',
      },
      {
        q: 'E i cloni?',
        a: 'Sono piante vive, quindi non c’è il recesso. Se una talea arriva senza radici, secca o malata, mandaci una foto entro 48 ore e la sostituiamo o la rimborsiamo.',
      },
      {
        q: 'Quando arriva il rimborso?',
        a: 'Entro 14 giorni dalla tua richiesta di recesso, sullo stesso metodo di pagamento. Possiamo attendere di ricevere il pacco o la prova della spedizione.',
      },
    ],
  },
  {
    gruppo: 'Account, privacy e sconti',
    voci: [
      {
        q: 'Come funziona lo sconto del 5%?',
        a: 'Ti iscrivi alla newsletter e crei l’account: per 6 mesi hai il 5% su tutti gli ordini, applicato da solo al checkout. Non si somma ad altri codici.',
      },
      {
        q: 'Come mi cancello dalla newsletter?',
        a: 'Con il link in fondo a ogni email, oppure dall’area cliente. Basta un clic.',
      },
      {
        q: 'Come cancello il mio account e i miei dati?',
        a: 'Dall’area cliente o scrivendo a privacy@thehasher.com. Cancelliamo tutto tranne quello che la legge ci obbliga a tenere, come le fatture per 10 anni.',
      },
      {
        q: 'Come cambio le preferenze sui cookie?',
        a: 'Dal link «Preferenze cookie» in fondo a ogni pagina.',
      },
    ],
  },
  {
    gruppo: 'Rivenditori',
    voci: [
      {
        q: 'Come divento rivenditore?',
        a: 'Compila il modulo nella pagina Diventa rivenditore: ti rispondiamo entro 48 ore con listino e condizioni.',
      },
      {
        q: 'Devo vendere a un prezzo minimo?',
        a: 'No. Ti diamo un prezzo di rivendita consigliato, ma i tuoi prezzi li decidi tu.',
      },
    ],
  },
]
