/**
 * Mappa del sito: tutte le pagine dell'e-commerce, con lo stato del prototipo.
 * Serve a Lorenzo per vedere cosa c'è e cosa manca. Si aggiorna man mano.
 */
export type PageStatus = 'fatta' | 'da-fare'

export type SitePage = {
  name: string
  what: string
  status: PageStatus
  /** Indirizzo nel prototipo, se la pagina esiste */
  to?: string
  /** Pagine proposte da Lorenzo */
  fromLorenzo?: boolean
}

export type PageGroup = {
  id: string
  title: string
  intro: string
  pages: SitePage[]
}

export const sitemap: PageGroup[] = [
  {
    id: 'negozio',
    title: 'Negozio',
    intro: 'Il percorso che porta dall’arrivo sul sito all’ordine pagato. È il cuore del lavoro.',
    pages: [
      {
        name: 'Home',
        what: 'La vetrina: drop, categorie, best seller, fiducia',
        status: 'fatta',
        to: '/',
      },
      {
        name: 'Shop',
        what: 'Tutti i prodotti insieme, con filtri e ordinamento',
        status: 'da-fare',
      },
      {
        name: 'Categoria Hash',
        what: 'Solo hash, filtrabile per formato, aroma, prezzo',
        status: 'da-fare',
      },
      {
        name: 'Categoria CBD Flower',
        what: 'Solo fiori, stessi filtri',
        status: 'fatta',
        to: '/negozio?categoria=flower',
      },
      {
        name: 'Categoria CBD Extract',
        what: 'Gli estratti, la categoria nuova del packaging',
        status: 'fatta',
        to: '/negozio?categoria=extract',
      },
      { name: 'New Drops', what: 'Le novità e i lotti limitati', status: 'da-fare' },
      {
        name: 'Best seller',
        what: 'I più venduti, per chi non sa da dove iniziare',
        status: 'da-fare',
      },
      {
        name: 'Pagina prodotto',
        what: 'Foto, formati, prezzo al grammo, analisi, recensioni',
        status: 'fatta',
        to: '/prodotto/lemon-haze',
      },
      {
        name: 'Ricerca',
        what: 'Risultati, suggerimenti, cosa fare se non c’è nulla',
        status: 'da-fare',
      },
      { name: 'Preferiti', what: 'La lista dei prodotti salvati', status: 'da-fare' },
      {
        name: 'Carrello',
        what: 'Quantità, codice sconto, soglia spedizione gratuita',
        status: 'da-fare',
      },
      {
        name: 'Checkout',
        what: 'Indirizzo, spedizione, pagamento. Anche senza account',
        status: 'da-fare',
      },
      { name: 'Ordine confermato', what: 'Numero ordine, cosa succede adesso', status: 'da-fare' },
    ],
  },
  {
    id: 'cliente',
    title: 'Area cliente',
    intro:
      'Serve a chi ricompra: ordini, tracking, indirizzi salvati. Riduce le mail di assistenza.',
    pages: [
      { name: 'Accedi', what: 'Email e password', status: 'da-fare' },
      { name: 'Registrati', what: 'Anche con un click dopo il primo ordine', status: 'da-fare' },
      { name: 'Password dimenticata', what: 'Recupero via email', status: 'da-fare' },
      { name: 'Il mio account', what: 'Riepilogo, dati, preferenze', status: 'da-fare' },
      { name: 'I miei ordini', what: 'Storico, stato, riordina in un click', status: 'da-fare' },
      { name: 'Dettaglio ordine e tracking', what: 'Dove si trova il pacco', status: 'da-fare' },
      { name: 'Indirizzi', what: 'Rubrica di spedizione e fatturazione', status: 'da-fare' },
    ],
  },
  {
    id: 'contenuti',
    title: 'Racconto del brand',
    intro: 'Le pagine che fanno fiducia e portano traffico da Google e da Instagram.',
    pages: [
      {
        name: 'L’azienda',
        what: 'Chi siete, come selezionate, perché fidarsi',
        status: 'da-fare',
        fromLorenzo: true,
      },
      {
        name: 'Journal (blog)',
        what: 'Elenco degli articoli: guide, drop, cultura',
        status: 'da-fare',
        fromLorenzo: true,
      },
      {
        name: 'Articolo',
        what: 'Il singolo pezzo del journal',
        status: 'da-fare',
        fromLorenzo: true,
      },
      {
        name: 'Contatti',
        what: 'Modulo, email, orari, dati societari',
        status: 'da-fare',
        fromLorenzo: true,
      },
      {
        name: 'Diventa distributore',
        what: 'Richiesta B2B: requisiti, P. IVA, listino riservato',
        status: 'da-fare',
        fromLorenzo: true,
      },
      {
        name: 'Analisi di laboratorio',
        what: 'Tutti i certificati, cercabili per lotto',
        status: 'da-fare',
      },
      { name: 'Domande frequenti', what: 'Le risposte che evitano una mail', status: 'da-fare' },
    ],
  },
  {
    id: 'servizio',
    title: 'Servizio e legale',
    intro:
      'Poche parole, nessuna sorpresa. Vanno scritte con un consulente legale prima del lancio.',
    pages: [
      { name: 'Spedizioni', what: 'Paesi, tempi, costi, soglia gratuita', status: 'da-fare' },
      { name: 'Resi e rimborsi', what: 'Come e quando si può restituire', status: 'da-fare' },
      { name: 'Pagamenti', what: 'Metodi accettati e sicurezza', status: 'da-fare' },
      { name: 'Privacy', what: 'Che dati raccogliete e perché', status: 'da-fare' },
      { name: 'Cookie', what: 'Cosa traccia il sito, con il consenso', status: 'da-fare' },
      { name: 'Termini e condizioni', what: 'Le regole di vendita', status: 'da-fare' },
      {
        name: 'Informazioni legali e avvertenze',
        what: 'Venditore, età, avvertenze di prodotto',
        status: 'da-fare',
      },
      { name: 'Pagina 404', what: 'Errore nel brand, con una via d’uscita', status: 'fatta' },
    ],
  },
]

/** Cose che non sono pagine ma senza le quali il sito non è un e-commerce. */
export const beyondPages = [
  { title: 'Verifica 18+', text: 'Il controllo all’ingresso, attivabile per Paese.' },
  { title: 'Banner cookie', text: 'Con consenso vero: niente tracciamento prima del sì.' },
  { title: 'Paese, lingua, valuta', text: 'Inglese, italiano, francese, tedesco, spagnolo.' },
  { title: 'Ricerca in alto', text: 'Suggerimenti mentre scrivi, in ogni pagina.' },
  { title: 'Carrello a comparsa', text: 'Si apre di lato senza far perdere la pagina.' },
  { title: 'Newsletter', text: 'Iscrizione con doppia conferma e sconto di benvenuto.' },
  { title: 'Email automatiche', text: 'Ordine confermato, spedito, password, restock.' },
  {
    title: 'Pannello di gestione',
    text: 'Dove tu carichi prodotti, foto, prezzi, lotti e vedi gli ordini.',
  },
]

/** Schizzi delle pagine principali: come sono composte, dall'alto in basso. */
export const wireframes: {
  title: string
  status: 'fatta' | 'da-fare'
  blocks: { label: string; h?: number; cols?: number; tone?: 'plain' | 'strong' | 'image' }[]
}[] = [
  {
    title: 'Home',
    status: 'fatta',
    blocks: [
      { label: 'Barra 18+ · spedizione', h: 1 },
      { label: 'Logo · menu · carrello', h: 2 },
      { label: 'Titolo + CTA', h: 3, tone: 'strong' },
      { label: 'Foto prodotti', h: 4, tone: 'image' },
      { label: 'Garanzie', h: 1.5 },
      { label: 'Hash · Flower · Extract', h: 3, cols: 3 },
      { label: 'Best seller', h: 3.5, cols: 3 },
      { label: 'New drop', h: 3, tone: 'strong' },
      { label: 'Storia · laboratorio', h: 2.5, cols: 2 },
      { label: 'Recensioni · newsletter · FAQ', h: 2 },
      { label: 'Footer', h: 2.5 },
    ],
  },
  {
    title: 'Negozio e categorie',
    status: 'fatta',
    blocks: [
      { label: 'Titolo categoria', h: 2.5 },
      { label: 'Filtri: categoria, profilo, disponibilità', h: 2, tone: 'strong' },
      { label: 'Numero risultati', h: 1 },
      { label: 'Griglia prodotti', h: 4, cols: 3 },
      { label: 'Griglia prodotti', h: 4, cols: 3 },
      { label: 'Footer', h: 2.5 },
    ],
  },
  {
    title: 'Prodotto',
    status: 'fatta',
    blocks: [
      { label: 'Percorso', h: 1 },
      { label: 'Foto', h: 6, tone: 'image' },
      { label: 'Miniature', h: 1.5, cols: 4 },
      { label: 'Nome · prezzo · formati', h: 3 },
      { label: 'Aggiungi al carrello', h: 2, tone: 'strong' },
      { label: 'Servizio · lotto · analisi', h: 2.5 },
      { label: 'Descrizione · scheda', h: 3, cols: 2 },
      { label: 'Recensioni · FAQ · correlati', h: 2.5 },
    ],
  },
  {
    title: 'Carrello',
    status: 'da-fare',
    blocks: [
      { label: 'Titolo', h: 2 },
      { label: 'Riga prodotto: foto, quantità, prezzo', h: 2.5 },
      { label: 'Riga prodotto', h: 2.5 },
      { label: 'Barra spedizione gratuita', h: 1.5, tone: 'strong' },
      { label: 'Codice sconto', h: 2 },
      { label: 'Totale con IVA', h: 2.5 },
      { label: 'Vai al checkout', h: 2, tone: 'strong' },
      { label: 'Ti potrebbe servire', h: 3, cols: 3 },
    ],
  },
  {
    title: 'Checkout',
    status: 'da-fare',
    blocks: [
      { label: '1 Contatti e indirizzo', h: 5 },
      { label: '2 Spedizione', h: 3 },
      { label: '3 Pagamento', h: 3 },
      { label: 'Paga ora', h: 2, tone: 'strong' },
      { label: 'Riepilogo sempre visibile a lato', h: 4 },
    ],
  },
  {
    title: 'Ordine confermato',
    status: 'da-fare',
    blocks: [
      { label: 'Grazie + numero ordine', h: 3, tone: 'strong' },
      { label: 'Cosa succede adesso', h: 2.5 },
      { label: 'Riepilogo articoli', h: 3 },
      { label: 'Indirizzo e tempi', h: 2 },
      { label: 'Crea account con un click', h: 2 },
    ],
  },
  {
    title: 'L’azienda',
    status: 'da-fare',
    blocks: [
      { label: 'Titolo + frase', h: 3 },
      { label: 'Foto', h: 4, tone: 'image' },
      { label: 'Come selezioniamo (3 punti)', h: 3, cols: 3 },
      { label: 'Clean plants. Bolder people.', h: 2.5, tone: 'strong' },
      { label: 'Laboratorio e lotti', h: 2.5, cols: 2 },
      { label: 'CTA al negozio', h: 2 },
    ],
  },
  {
    title: 'Diventa distributore',
    status: 'da-fare',
    blocks: [
      { label: 'Titolo B2B + promessa', h: 3, tone: 'strong' },
      { label: 'A chi vendiamo · requisiti', h: 3, cols: 2 },
      { label: 'Cosa ricevi: listino, materiali, supporto', h: 3, cols: 3 },
      { label: 'Modulo: azienda, P. IVA, volumi', h: 5 },
      { label: 'Invia richiesta', h: 2, tone: 'strong' },
      { label: 'Domande frequenti B2B', h: 2.5 },
    ],
  },
]

/** I passi del percorso d'acquisto, in ordine. */
export const journey = [
  { step: 'Home', status: 'fatta' as const, to: '/' },
  { step: 'Negozio', status: 'fatta' as const, to: '/negozio' },
  { step: 'Prodotto', status: 'fatta' as const, to: '/prodotto/lemon-haze' },
  { step: 'Carrello', status: 'da-fare' as const },
  { step: 'Checkout', status: 'da-fare' as const },
  { step: 'Ordine', status: 'da-fare' as const },
]
