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
      { name: 'Categoria CBD Flower', what: 'Solo fiori, stessi filtri', status: 'da-fare' },
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
