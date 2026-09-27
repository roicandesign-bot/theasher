/**
 * Resoconto del progetto e roadmap fino al lancio.
 * Pagina di lavoro per Lorenzo: si aggiorna quando cambia qualcosa di grosso.
 */

export const avanzamento = [
  { area: 'Identità e stile', done: 100, note: 'Palette, font, logo, componenti: pronti' },
  { area: 'Pagine del sito', done: 9, note: '3 pagine pubbliche su 34' },
  { area: 'Materiali del brand', done: 35, note: 'Logo e packaging sì, foto e testi legali no' },
  { area: 'Sviluppo vero', done: 0, note: 'Parte quando il disegno è approvato' },
]

export const fatto = [
  {
    data: '14 set',
    titolo: 'Letto tutto il brand',
    testo:
      'Board identità, mockup e-commerce, sistema Instagram, logo e manuale di 12 pagine. Logo ritagliato su trasparenza in tre versioni, senza toccarlo.',
  },
  {
    data: '14 set',
    titolo: 'Stile del sito',
    testo:
      'Nero che domina, giallo acido per le azioni, bianco per leggere. Titoli alti e compatti, testo pulito. Tutto in una pagina di controllo, la styleguide.',
  },
  {
    data: '14 set',
    titolo: 'Mattoni riutilizzabili',
    testo:
      'Bottoni, badge, prezzi con prezzo al grammo, card prodotto, barra 18+, menu, footer, pagina di errore nel brand.',
  },
  {
    data: '14 set',
    titolo: 'Homepage',
    testo:
      'Dodici sezioni: prodotto e promessa in alto, garanzie, categorie, best seller, drop limitato, storia, analisi di laboratorio, recensioni, bundle, newsletter, domande frequenti.',
  },
  {
    data: '15 set',
    titolo: 'Pagina prodotto',
    testo:
      'Foto con ingrandimento, formati con prezzo al grammo, disponibilità, lotto e certificato, descrizione, scheda tecnica, recensioni, domande, prodotti correlati. Su telefono la barra di acquisto si aggancia in basso.',
  },
  {
    data: '15 set',
    titolo: 'Mappa del sito',
    testo: 'Tutte le pagine di un e-commerce completo, divise per quello che servono a fare.',
  },
  {
    data: '16 set',
    titolo: 'Prova con la linea nuova, poi annullata',
    testo:
      'Tre categorie colorate e le confezioni nuove: troppo caotico, tornati indietro. Il materiale resta in archivio.',
  },
  {
    data: '17 set',
    titolo: 'Animazioni',
    testo:
      'I blocchi compaiono scorrendo, le card si sollevano, il cambio pagina è in dissolvenza. Tutto si spegne per chi ha "riduci movimento".',
  },
  {
    data: '27 set',
    titolo: 'Categorie e bundle in giallo',
    testo: 'Fondo giallo pieno con scritte nere su Hash, CBD Flower e Discovery Box.',
  },
]

export const fuoriDalSito = [
  {
    area: 'Fotografia',
    stato: 'da-fare' as const,
    chi: 'Lorenzo + fotografo',
    testo:
      'Oggi il sito usa ritagli dai mockup, a bassa risoluzione. Servono foto vere: prodotto su fondo nero, macro della texture, packaging, qualche scatto d’ambiente.',
  },
  {
    area: 'Dati della società',
    stato: 'da-fare' as const,
    chi: 'Lorenzo',
    testo:
      'Ragione sociale, partita IVA, sede, contatti, dominio. Vanno in fondo a ogni pagina, nel checkout, nelle email e nei termini.',
  },
  {
    area: 'Testi legali',
    stato: 'da-fare' as const,
    chi: 'Consulente legale',
    testo:
      'Privacy, cookie, termini di vendita, avvertenze di prodotto, età minima, regole per Paese. Nessuno di questi testi può essere inventato.',
  },
  {
    area: 'Pagamenti',
    stato: 'da-fare' as const,
    chi: 'Lorenzo',
    testo:
      'Serve un fornitore che accetti per contratto la categoria CBD nei Paesi di vendita. Molti non la accettano: va verificato prima, non dopo.',
  },
  {
    area: 'Spedizioni',
    stato: 'da-fare' as const,
    chi: 'Lorenzo',
    testo:
      'Corriere, tempi, costi per Paese, soglia di spedizione gratuita, packaging anonimo, gestione dei resi.',
  },
  {
    area: 'Analisi di laboratorio',
    stato: 'parziale' as const,
    chi: 'Lorenzo',
    testo:
      'Un certificato PDF per ogni lotto, con il numero stampato sulla confezione. Nel sito i valori di oggi sono di esempio.',
  },
  {
    area: 'Prodotti e prezzi',
    stato: 'parziale' as const,
    chi: 'Lorenzo',
    testo:
      'Elenco definitivo, formati, prezzi per Paese e IVA. Oggi nel sito ci sono sei prodotti di esempio.',
  },
  {
    area: 'Sviluppo e messa online',
    stato: 'da-fare' as const,
    chi: 'Vishu',
    testo:
      'Il prototipo diventa un negozio vero: database, carrello che funziona, pagamenti, ordini, pannello di gestione. Le istruzioni sono già scritte nel progetto.',
  },
]

export const chiFaCosa = [
  {
    nome: 'Lorenzo',
    ruolo: 'Decide come deve essere',
    cose: [
      'Guarda le pagine e corregge',
      'Fornisce foto, prezzi, dati',
      'Sceglie Paesi e fornitori',
    ],
  },
  {
    nome: 'Claude',
    ruolo: 'Disegna e costruisce le pagine',
    cose: ['Una pagina alla volta', 'Corregge a vista', 'Tiene la memoria del progetto'],
  },
  {
    nome: 'Vishu',
    ruolo: 'Fa funzionare tutto',
    cose: [
      'Database e pannello di gestione',
      'Carrello, pagamenti, ordini',
      'Messa online e sicurezza',
    ],
  },
  {
    nome: 'Esterni',
    ruolo: 'Quello che non si può inventare',
    cose: ['Consulente legale', 'Fotografo', 'Laboratorio di analisi'],
  },
]

export const roadmap = [
  {
    fase: '1',
    titolo: 'Finire il disegno del sito',
    quando: '2-3 settimane',
    cosa: 'Carrello, checkout, area cliente, azienda, journal, contatti, diventa distributore, pagine di servizio. Una alla volta, con le tue correzioni.',
    serve: 'Nulla: si va avanti subito.',
    stato: 'ora' as const,
  },
  {
    fase: '2',
    titolo: 'Raccogliere i materiali veri',
    quando: 'in parallelo',
    cosa: 'Foto di prodotto, prezzi e formati definitivi, dati societari, certificati di laboratorio, testi legali dal consulente.',
    serve: 'Decisioni tue e due fornitori esterni.',
    stato: 'prossima' as const,
  },
  {
    fase: '3',
    titolo: 'Costruire il negozio vero',
    quando: '2-3 mesi',
    cosa: 'Vishu trasforma il prototipo in un e-commerce con database, carrello, pagamenti, ordini e pannello di gestione.',
    serve: 'Disegno approvato e fornitore di pagamenti confermato.',
    stato: 'dopo' as const,
  },
  {
    fase: '4',
    titolo: 'Riempire e tradurre',
    quando: '2-3 settimane',
    cosa: 'Prodotti veri a catalogo, testi in cinque lingue, regole per Paese, email automatiche, analisi e consensi.',
    serve: 'Materiali della fase 2.',
    stato: 'dopo' as const,
  },
  {
    fase: '5',
    titolo: 'Provare e aprire',
    quando: '2 settimane',
    cosa: 'Ordini di prova veri, controllo su telefono e computer, velocità, accessibilità. Poi apertura su un Paese solo e, se fila liscio, gli altri.',
    serve: 'Tutto il resto.',
    stato: 'dopo' as const,
  },
]

export const decisioni = [
  'Paesi di partenza e valuta',
  'Fornitore dei pagamenti che accetti il CBD',
  'Dati societari e dominio',
  'Elenco prodotti, formati e prezzi definitivi',
  'Chi scatta le foto e quando',
  'Chi firma i testi legali',
  'Dove mettere online il sito',
]
