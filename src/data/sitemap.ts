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
        status: 'fatta',
        to: '/negozio',
      },
      {
        name: 'Categoria Fiori',
        what: 'Solo fiori, filtrabili per coltivazione e tipologia',
        status: 'fatta',
        to: '/negozio?categoria=fiori',
      },
      {
        name: 'Categoria Hash',
        what: 'Solo hash, per lavorazione, consistenza e colore',
        status: 'fatta',
        to: '/negozio?categoria=hash',
      },
      {
        name: 'Categoria Estratti',
        what: 'Solo estratti, per metodo di estrazione',
        status: 'fatta',
        to: '/negozio?categoria=estratti',
      },
      {
        name: 'Linea THC-X',
        what: 'Tutta la linea THC-X, nelle tre famiglie',
        status: 'fatta',
        to: '/negozio?linea=THC-X',
      },
      {
        name: 'New Drops',
        what: 'Le novità e i lotti limitati',
        status: 'fatta',
        to: '/negozio?badge=New',
      },
      {
        name: 'Best seller',
        what: 'I più venduti, per chi non sa da dove iniziare',
        status: 'fatta',
        to: '/negozio?badge=Best+seller',
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
        status: 'fatta',
        to: '/cerca',
      },
      {
        name: 'Preferiti',
        what: 'La lista dei prodotti salvati',
        status: 'fatta',
        to: '/preferiti',
      },
      {
        name: 'Carrello',
        what: 'Quantità, codice sconto, soglia spedizione gratuita',
        status: 'fatta',
        to: '/carrello',
      },
      {
        name: 'Checkout',
        what: 'Indirizzo, spedizione, pagamento. Anche senza account',
        status: 'fatta',
        to: '/checkout',
      },
      {
        name: 'Ordine confermato',
        what: 'Numero ordine, cosa succede adesso',
        status: 'fatta',
        to: '/ordine/TH-2609-4471',
      },
    ],
  },
  {
    id: 'cliente',
    title: 'Area cliente',
    intro:
      'Serve a chi ricompra: ordini, tracking, indirizzi salvati. Riduce le mail di assistenza.',
    pages: [
      { name: 'Accedi', what: 'Email e password', status: 'fatta', to: '/accedi' },
      {
        name: 'Registrati',
        what: 'Anche con un click dopo il primo ordine',
        status: 'fatta',
        to: '/registrati',
      },
      {
        name: 'Password dimenticata',
        what: 'Recupero via email',
        status: 'fatta',
        to: '/password-dimenticata',
      },
      {
        name: 'Il mio account',
        what: 'Riepilogo, dati, preferenze',
        status: 'fatta',
        to: '/account',
      },
      {
        name: 'I miei ordini',
        what: 'Storico, stato, riordina in un click',
        status: 'fatta',
        to: '/account/ordini',
      },
      {
        name: 'Dettaglio ordine e tracking',
        what: 'Dove si trova il pacco',
        status: 'fatta',
        to: '/account/ordini/TH-2609-4471',
      },
      {
        name: 'Indirizzi',
        what: 'Rubrica di spedizione e fatturazione',
        status: 'fatta',
        to: '/account/indirizzi',
      },
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
        status: 'fatta',
        to: '/azienda',
        fromLorenzo: true,
      },
      {
        name: 'Blog',
        what: 'Elenco degli articoli: guide, drop, cultura',
        status: 'fatta',
        to: '/blog',
        fromLorenzo: true,
      },
      {
        name: 'Articolo',
        what: 'Il singolo articolo del blog',
        status: 'fatta',
        to: '/blog/indoor-glasshouse-outdoor',
        fromLorenzo: true,
      },
      {
        name: 'Contatti',
        what: 'Modulo, email, orari, dati societari',
        status: 'fatta',
        to: '/contatti',
        fromLorenzo: true,
      },
      {
        name: 'Diventa rivenditore',
        what: 'Rivenditori e distributori: formule, listino indicativo, richiesta',
        status: 'fatta',
        to: '/diventa-distributore',
        fromLorenzo: true,
      },
      {
        name: 'Franchising',
        what: 'Negozio col marchio The Hasher: 60 % del venduto, starter pack, candidatura',
        status: 'fatta',
        to: '/franchising',
        fromLorenzo: true,
      },
      {
        name: 'Analisi di laboratorio',
        what: 'Tutti i certificati, cercabili per lotto',
        status: 'fatta',
        to: '/analisi',
      },
      {
        name: 'Domande frequenti',
        what: 'Le risposte che evitano una mail',
        status: 'fatta',
        to: '/faq',
      },
    ],
  },
  {
    id: 'servizio',
    title: 'Servizio e legale',
    intro:
      'Poche parole, nessuna sorpresa. Vanno scritte con un consulente legale prima del lancio.',
    pages: [
      {
        name: 'Spedizioni',
        what: 'Paesi, tempi, costi, soglia gratuita',
        status: 'fatta',
        to: '/spedizioni',
      },
      {
        name: 'Resi e rimborsi',
        what: 'Come e quando si può restituire',
        status: 'fatta',
        to: '/resi',
      },
      {
        name: 'Pagamenti',
        what: 'Metodi accettati e sicurezza',
        status: 'fatta',
        to: '/pagamenti',
      },
      { name: 'Privacy', what: 'Che dati raccogliete e perché', status: 'fatta', to: '/privacy' },
      {
        name: 'Cookie',
        what: 'Cosa traccia il sito, con il consenso',
        status: 'fatta',
        to: '/cookie',
      },
      {
        name: 'Termini e condizioni',
        what: 'Le regole di vendita',
        status: 'fatta',
        to: '/termini',
      },
      {
        name: 'Informazioni legali e avvertenze',
        what: 'Venditore, età, avvertenze di prodotto',
        status: 'fatta',
        to: '/legale',
      },
      { name: 'Pagina 404', what: 'Errore nel brand, con una via d’uscita', status: 'fatta' },
    ],
  },
]

/** Cose che non sono pagine ma senza le quali il sito non è un e-commerce. */
export const beyondPages = [
  {
    title: 'Verifica 18+',
    text: 'Fatta: dialog all’ingresso, da rendere configurabile per Paese.',
  },
  { title: 'Banner cookie', text: 'Fatto: necessari, statistiche e marketing con scelta salvata.' },
  { title: 'Paese, lingua, valuta', text: 'Inglese, italiano, francese, tedesco, spagnolo.' },
  {
    title: 'Ricerca',
    text: 'Fatta come pagina con suggerimenti; manca il pannello rapido nell’header.',
  },
  { title: 'Carrello a comparsa', text: 'Fatto: si apre di lato, con soglia spedizione e totale.' },
  { title: 'Newsletter', text: 'Iscrizione con doppia conferma e sconto di benvenuto.' },
  { title: 'Email automatiche', text: 'Ordine confermato, spedito, password, restock.' },
  {
    title: 'Pannello di gestione',
    text: 'Dove tu carichi prodotti, foto, prezzi, lotti e vedi gli ordini.',
  },
]
