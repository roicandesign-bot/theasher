/**
 * Analisi prezzi B2C del mercato CBD europeo (settembre 2026).
 * Fonte: ricerca pubblica su shop e comparatori di Italia, Francia, Spagna e Svizzera.
 * Sono fasce di mercato al dettaglio, IVA inclusa, non listini ufficiali.
 */

export type Fascia = {
  nome: string
  sotto: string
  basso: number
  alto: number
  /** Fascia tipica dove si concentra la maggior parte dell'offerta */
  tipico: string
  nota: string
}

export const fiori: Fascia[] = [
  {
    nome: 'Trim e scarti',
    sotto: 'Foglie e residui di lavorazione',
    basso: 0.2,
    alto: 0.9,
    tipico: '0,30 – 0,60',
    nota: 'Serve a estrazione e prerolled, non è un prodotto da vetrina.',
  },
  {
    nome: 'Outdoor',
    sotto: 'Pieno campo',
    basso: 1,
    alto: 4,
    tipico: '1,50 – 3,00',
    nota: 'Il segmento più combattuto sul prezzo. Margini bassi, serve volume.',
  },
  {
    nome: 'Greenhouse',
    sotto: 'Serra semplice',
    basso: 2,
    alto: 6,
    tipico: '3,00 – 5,00',
    nota: 'Il miglior rapporto qualità prezzo percepito dal cliente medio.',
  },
  {
    nome: 'Glasshouse',
    sotto: 'Serra vetro, clima controllato',
    basso: 4,
    alto: 8,
    tipico: '5,00 – 7,00',
    nota: 'Vicino all’indoor come resa visiva, con costi di produzione più bassi.',
  },
  {
    nome: 'Indoor',
    sotto: 'Coltivazione interna',
    basso: 5,
    alto: 12,
    tipico: '7,00 – 10,00',
    nota: 'La base di un catalogo premium. Sotto i 6 € al grammo il cliente sospetta.',
  },
  {
    nome: 'Indoor top / Cali',
    sotto: 'Genetiche americane, cura maniacale',
    basso: 10,
    alto: 20,
    tipico: '12,00 – 16,00',
    nota: 'Qui si vende il nome della varietà e la foto macro, non il CBD.',
  },
]

export const hash: Fascia[] = [
  {
    nome: 'Dry e semidry',
    sotto: 'Setacciato classico, stile marocchino',
    basso: 8,
    alto: 15,
    tipico: '10,00 – 13,00',
    nota: 'Il pane quotidiano: alto rotolamento, margine contenuto.',
  },
  {
    nome: 'Super pollen',
    sotto: 'Morbido, lavorato a mano',
    basso: 10,
    alto: 18,
    tipico: '12,00 – 15,00',
    nota: 'Il cliente lo riconosce al tatto: la consistenza vende.',
  },
  {
    nome: 'Dry sift',
    sotto: 'Setacciato a secco',
    basso: 10,
    alto: 18,
    tipico: '12,00 – 16,00',
    nota: 'A 12 € con analisi sopra il 20 % è percepito come affare.',
  },
  {
    nome: 'Super dry sift',
    sotto: 'Micronatura selezionata',
    basso: 15,
    alto: 25,
    tipico: '18,00 – 22,00',
    nota: 'Prima fascia dove si può raccontare la lavorazione e alzare il prezzo.',
  },
  {
    nome: 'Charas',
    sotto: 'Sfregato a mano da fresco',
    basso: 18,
    alto: 30,
    tipico: '20,00 – 26,00',
    nota: 'Prodotto narrativo: origine e metodo valgono più dell’analisi.',
  },
  {
    nome: 'Static sift',
    sotto: 'Separazione elettrostatica',
    basso: 18,
    alto: 30,
    tipico: '22,00 – 28,00',
    nota: 'Poca concorrenza in Europa: è una leva di differenziazione reale.',
  },
  {
    nome: 'Bubble / ice-o-lator',
    sotto: 'Acqua e ghiaccio',
    basso: 12,
    alto: 30,
    tipico: '18,00 – 25,00',
    nota: 'Fascia larghissima: la micronatura e il full melt fanno il prezzo.',
  },
  {
    nome: 'Fresh frozen / frozen sift',
    sotto: 'Da pianta congelata fresca',
    basso: 25,
    alto: 45,
    tipico: '28,00 – 38,00',
    nota: 'Il vertice del catalogo hash. Si vende a 1 e 2 g, non di più.',
  },
]

export const estratti: Fascia[] = [
  {
    nome: 'Rosin',
    sotto: 'Pressato a caldo, senza solventi',
    basso: 25,
    alto: 60,
    tipico: '35,00 – 50,00',
    nota: 'Formato da 1 g. Sopra i 50 € servono analisi e nome della varietà.',
  },
  {
    nome: 'Moonrock e ice rock',
    sotto: 'Fiore ricoperto',
    basso: 25,
    alto: 50,
    tipico: '30,00 – 40,00',
    nota: 'Prodotto d’effetto, ottimo per social e regali.',
  },
  {
    nome: 'Cristalli e isolati',
    sotto: 'CBD 99 %',
    basso: 15,
    alto: 40,
    tipico: '20,00 – 30,00',
    nota: 'Mercato più tecnico, meno legato al brand.',
  },
]

/** Come scala il prezzo al crescere del formato (pratica comune negli shop europei). */
export const scaglioni = [
  { formato: '1 g', sconto: '—', nota: 'Prezzo di riferimento, il più alto al grammo' },
  { formato: '2 g', sconto: '−5 %', nota: 'Formato assaggio' },
  { formato: '3,5 g', sconto: '−10 %', nota: 'Il formato più venduto in assoluto' },
  { formato: '5 g', sconto: '−15 %', nota: 'Primo scatto di convenienza percepita' },
  { formato: '10 g', sconto: '−25 %', nota: 'Cliente abituale' },
  { formato: '25 g', sconto: '−35 %', nota: 'Soglia dove partono i piccoli rivenditori' },
  { formato: '50 g', sconto: '−45 %', nota: 'Confine con il semi-ingrosso' },
  { formato: '100 g', sconto: '−55 %', nota: 'Panetto: 1,95 – 3,00 € al grammo sull’hash' },
]

/** Proposta di posizionamento per The Hasher, coerente col brand premium. */
export const posizionamento = [
  {
    categoria: 'CBD Flower indoor',
    riferimento: 'Mercato 7 – 10 €/g',
    proposta: [
      { formato: '1 g', prezzo: '12,90 €', gr: '12,90 €/g' },
      { formato: '3,5 g', prezzo: '34,90 €', gr: '9,97 €/g' },
      { formato: '5 g', prezzo: '44,90 €', gr: '8,98 €/g' },
      { formato: '10 g', prezzo: '79,90 €', gr: '7,99 €/g' },
    ],
    perche: 'Sopra la media, sotto il tetto delle Cali. Il formato da 3,5 g resta l’ancora.',
  },
  {
    categoria: 'Hash dry sift',
    riferimento: 'Mercato 12 – 16 €/g',
    proposta: [
      { formato: '2 g', prezzo: '29,90 €', gr: '14,95 €/g' },
      { formato: '4 g', prezzo: '54,90 €', gr: '13,73 €/g' },
      { formato: '10 g', prezzo: '119,00 €', gr: '11,90 €/g' },
    ],
    perche: 'Il prodotto di ingresso alla gamma hash: prezzo in linea, qualità sopra.',
  },
  {
    categoria: 'Hash static e frozen sift',
    riferimento: 'Mercato 22 – 38 €/g',
    proposta: [
      { formato: '1 g', prezzo: '29,90 €', gr: '29,90 €/g' },
      { formato: '2 g', prezzo: '54,90 €', gr: '27,45 €/g' },
      { formato: '4 g', prezzo: '99,00 €', gr: '24,75 €/g' },
    ],
    perche: 'Qui sta il margine e la differenza dal resto del mercato. Formati piccoli.',
  },
  {
    categoria: 'Extract',
    riferimento: 'Mercato 35 – 50 €/g',
    proposta: [
      { formato: '0,5 g', prezzo: '24,90 €', gr: '49,80 €/g' },
      { formato: '1 g', prezzo: '44,90 €', gr: '44,90 €/g' },
    ],
    perche: 'Prodotto vetrina: alza il valore percepito di tutto il catalogo.',
  },
]

export const paesi = [
  {
    paese: 'Italia',
    indice: 'Riferimento',
    nota: 'Mercato maturo e aggressivo sul prezzo, molti shop, marginalità in calo sui fiori.',
  },
  {
    paese: 'Francia',
    indice: '+10 / +20 %',
    nota: 'Il mercato più grande d’Europa a volume. Retail indoor 8 – 15 € al grammo.',
  },
  {
    paese: 'Spagna',
    indice: '−10 / allineato',
    nota: 'Prezzi simili all’Italia, forte concorrenza sui fiori economici.',
  },
  {
    paese: 'Germania',
    indice: '+15 / +25 %',
    nota: 'Cliente disposto a pagare di più, ma molto attento a certificazioni e conformità.',
  },
  {
    paese: 'Svizzera',
    indice: '+30 / +60 %',
    nota: 'Indoor 5 – 8 CHF al grammo all’ingrosso, al dettaglio molto più alto. Fuori UE: dogana.',
  },
]

export const metodo = [
  'I numeri vengono da ricerca pubblica su shop e comparatori europei di settembre 2026, non da listini ufficiali.',
  'Sono prezzi al dettaglio verso il cliente finale, IVA inclusa, per acquisti singoli online.',
  'I listini dei singoli negozi non sono stati letti direttamente: la rete di questa sessione blocca quei siti. Le fasce sono ricostruite da più fonti indipendenti.',
  'Prima di fissare il listino vero conviene un controllo a campione su dieci concorrenti diretti nei Paesi di lancio.',
  'I prezzi non tengono conto di promozioni, spedizione gratuita sopra soglia e programmi fedeltà, che in pratica spostano il prezzo reale del 10-15 %.',
]
