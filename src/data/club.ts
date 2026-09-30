/**
 * The Hasher Club: il programma per i clienti, con livelli e accessi riservati.
 * Proposta del prototipo: soglie, percentuali e posti sono da confermare con i conti e con il legale.
 * Vantaggi solo come sconti, accessi e servizi (niente catalogo premi): così il Club resta fuori
 * dalle «operazioni a premio» (DPR 430/2001). Regolamento completo in /regolamento-club.
 */

export type LivelloClub = 'starter' | 'member' | 'black' | 'elite'

export type Livello = {
  id: LivelloClub
  nome: string
  /** Come si entra nel livello */
  requisito: string
  /** Frase breve sotto il nome */
  motto: string
  vantaggi: string[]
  /** Solo su invito: il livello non si raggiunge con la spesa */
  soloInvito?: boolean
  /** Soglia di spesa negli ultimi 12 mesi, in centesimi */
  soglia?: number
}

export const livelli: Livello[] = [
  {
    id: 'starter',
    nome: 'Starter',
    requisito: 'Crei l’account e confermi di avere 18 anni.',
    motto: 'La porta d’ingresso.',
    vantaggi: [
      '−5 % su tutti gli ordini per 6 mesi (con la newsletter)',
      'Storico dei lotti e dei certificati che hai comprato',
      'Avviso via email a ogni nuovo drop',
    ],
  },
  {
    id: 'member',
    nome: 'Member',
    requisito: 'Dal primo ordine consegnato.',
    motto: 'Prima degli altri.',
    vantaggi: [
      'Ogni drop si apre per te 24 ore prima',
      'Spedizione gratuita da 39 € (per tutti da 49 €)',
      '−10 % per tutto il mese del compleanno',
      'Tessera digitale nel telefono, vale anche nei negozi',
    ],
  },
  {
    id: 'black',
    nome: 'Black',
    requisito:
      '400 € di ordini negli ultimi 12 mesi. Con l’invito di un membro Black lo provi subito per 90 giorni.',
    motto: 'I lotti che non escono.',
    soglia: 40000,
    vantaggi: [
      'Accesso alla linea Reserve: lotti piccoli, numerati, mai in vendita al pubblico',
      'Drop aperti per te 48 ore prima',
      '−10 % fisso sul listino',
      'Spedizione sempre gratuita',
      '2 inviti a trimestre da dare a chi vuoi tu',
      'Canale Telegram privato con i fine lotto',
      'Tessera fisica nera',
    ],
  },
  {
    id: 'elite',
    nome: 'Elite',
    requisito: 'Solo su invito della casa madre. 100 posti per Paese, rivisti ogni 12 mesi.',
    motto: 'Cento per Paese.',
    soloInvito: true,
    vantaggi: [
      'Tutto quello di Black',
      'Prima scelta sui lotti Reserve: 72 ore prima',
      '−15 % fisso sul listino',
      'Una persona del team che risponde a te, direttamente',
      'Inviti a lanci ed eventi nei negozi The Hasher',
      'Merch Elite, che si compra solo da Elite',
      'Tessera in metallo con il tuo numero',
    ],
  },
]

export const numeriClub = [
  { valore: '24–72 h', etichetta: 'prima degli altri sui drop' },
  { valore: '100', etichetta: 'posti Elite per Paese' },
  { valore: '0 €', etichetta: 'per entrare, per sempre' },
]

export const passiClub = [
  {
    titolo: 'Crei l’account',
    testo: 'Email, età verificata e sei Starter: −5 % per sei mesi con la newsletter.',
  },
  {
    titolo: 'Il primo ordine',
    testo: 'Appena arriva sei Member: drop 24 ore prima e la tessera nel telefono.',
  },
  {
    titolo: 'Black',
    testo: '400 € in 12 mesi. Con l’invito di chi è già dentro lo provi subito per 90 giorni.',
  },
  {
    titolo: 'Elite',
    testo: 'Non si chiede: arriva l’invito. Cento posti per Paese, ogni anno.',
  },
]

/** Drop della linea Reserve: esempi per il prototipo (nomi, valori e date demo). */
export const dropReserve = [
  {
    numero: 'Nº 07',
    nome: 'Royal Hash Frozen',
    famiglia: 'Hash',
    attivo: 'CBD: +34%',
    pezzi: 180,
    img: 'images/filiera/pressatura.jpg',
    apre: 'Elite 7 ottobre · Black 8 ottobre',
  },
  {
    numero: 'Nº 08',
    nome: 'Lemon Haze Static Sift',
    famiglia: 'Hash',
    attivo: 'CBD: +29%',
    pezzi: 240,
    img: 'images/filiera/setacciatura.jpg',
    apre: 'Elite 14 ottobre · Black 15 ottobre',
  },
  {
    numero: 'Nº 09',
    nome: 'Gelato 41 Cannagar con hash',
    famiglia: 'Cannagar',
    attivo: 'CBD: +31%',
    pezzi: 120,
    img: 'images/prodotti/cannagar-gelato-41.jpg',
    apre: 'Elite 21 ottobre · Black 22 ottobre',
  },
]

/** Il prossimo lotto Reserve: il caveau della home mostra il conto alla rovescia (data demo). */
export const prossimoReserve = {
  nome: 'Reserve Nº 07 · Royal Hash Frozen',
  pezzi: 180,
  apre: '2026-10-07T18:00:00+02:00',
}

/** Le regole che fanno fidare: scritte in chiaro sulla pagina, complete nel regolamento. */
export const regoleClub = [
  'Il livello si calcola sugli ordini consegnati negli ultimi 12 mesi, resi esclusi.',
  'Prima di scendere di livello ti avvisiamo con 30 giorni di anticipo, e si scende di un gradino alla volta.',
  'Niente punti che scadono, niente catalogo premi: solo sconti, accessi e servizi.',
  'Gli inviti sono personali: non si vendono e non si pubblicano online.',
  'Offerte costruite sui tuoi acquisti solo se ci dai un consenso a parte, revocabile quando vuoi.',
  'Riservato ai maggiorenni. Esci dal Club dall’account, con un clic.',
]

export const faqClub = [
  {
    q: 'Quanto costa entrare?',
    a: 'Niente. Il Club è gratuito: si entra creando l’account. Non ci sono quote, abbonamenti o rinnovi.',
  },
  {
    q: 'Come si diventa Black?',
    a: 'Con 400 € di ordini consegnati negli ultimi 12 mesi: il passaggio è automatico, ti arriva una mail e la tessera cambia colore. Con il codice invito di un membro Black sei Black subito per 90 giorni; poi resti se raggiungi la soglia.',
  },
  {
    q: 'Posso chiedere di entrare in Elite?',
    a: 'No. Elite è solo su invito della casa madre: cento posti per Paese, rivisti ogni anno guardando da quanto tempo sei con noi, quanto partecipi e se rispetti le regole del Club.',
  },
  {
    q: 'Cosa sono i lotti Reserve?',
    a: 'Lotti piccoli e numerati, lavorati a parte, che non vanno mai in vendita al pubblico. Si aprono prima per Elite e il giorno dopo per Black, finché ci sono pezzi.',
  },
  {
    q: 'Il Club vale anche nei negozi?',
    a: 'Sì. La tessera digitale si mostra in cassa nei negozi The Hasher: gli acquisti in negozio contano per il livello come quelli online, e i vantaggi valgono in tutti e due i posti.',
  },
  {
    q: 'Gli sconti si sommano?',
    a: 'Lo sconto del livello non si somma ad altri codici: al checkout si applica sempre quello più conveniente per te. Non vale su carte regalo e spedizione.',
  },
  {
    q: 'Cosa succede se non compro per un po’?',
    a: 'Ti avvisiamo 30 giorni prima di un cambio di livello e scendi di un solo gradino alla volta. Da Starter non si esce mai, se non lo chiedi tu.',
  },
]

/** Stato DEMO del membro nell'area cliente (nessun dato reale). */
export const membroDemo = {
  livello: 'member' as LivelloClub,
  numero: 'TH 0417 2280',
  dal: [
    { livello: 'Starter', data: '12 marzo 2026' },
    { livello: 'Member', data: '2 maggio 2026' },
  ],
  consensoProfilazione: false,
}
