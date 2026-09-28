/**
 * CATALOGO DEMO del prototipo.
 * Tassonomia: linee (CBD, THC-X, CBG, CBN) × famiglie (Fiori, Hash, Estratti, Oli, Preroll,
 * Vape, Edibles, Semi, Cloni). I fiori si distinguono per coltivazione e tipologia,
 * hash ed estratti per metodo, le altre famiglie per tipologia.
 * Il reparto Merch (accessori e merch) sta in `merch.ts`; le famiglie nuove in `famiglie.ts`.
 * Prezzi in centesimi. Immagini: ritagli demo dai mockup del brand e pack generati.
 */
import { famiglie } from './famiglie'
import { merch } from './merch'

export type Variant = {
  /** Etichetta del formato, es. "3,5 g" */
  label: string
  /** Quantità del formato nell'unità del prodotto (grammi, ml o pezzi) */
  grams: number
  /** in centesimi */
  price: number
  compareAt?: number
  inStock: boolean
}

/** Le categorie madri: il cannabinoide che guida il prodotto. Tutte entro i limiti di legge sul THC. */
export const linee = ['CBD', 'THC-X', 'THC-A', 'CBG', 'CBN'] as const
export type Linea = (typeof linee)[number]

/** Le famiglie del negozio, nell'ordine della barra. */
export const categorie = {
  fiori: 'Fiori',
  hash: 'Hash',
  estratti: 'Estratti',
  preroll: 'Preroll',
  cannagar: 'Cannagar',
  vape: 'Vape',
  oli: 'Oli',
  edibles: 'Edibles',
  semi: 'Semi',
  cloni: 'Cloni',
} as const
export type Categoria = keyof typeof categorie

/**
 * Le famiglie a gruppi, come nel disegno di Lorenzo: nella barra i gruppi sono separati
 * da una riga, nel pannello su telefono hanno un titolo.
 */
export const gruppiFamiglie: { nome: string; famiglie: Categoria[] }[] = [
  { nome: 'I classici', famiglie: ['fiori', 'hash', 'estratti'] },
  { nome: 'Pronti all’uso', famiglie: ['preroll', 'cannagar', 'vape'] },
  { nome: 'Oli ed edibles', famiglie: ['oli', 'edibles'] },
  { nome: 'Da coltivare', famiglie: ['semi', 'cloni'] },
]

/** Foto di ogni famiglia: riquadri del menu e del pannello «Famiglia» su telefono. */
export const fotoFamiglia: Record<Categoria | 'tutto', string> = {
  tutto: 'images/demo/hero-products.jpg',
  fiori: 'images/demo/cat-flower.jpg',
  hash: 'images/demo/cat-hash.jpg',
  estratti: 'images/demo/jar-hash.jpg',
  oli: 'images/prodotti/olio-full-spectrum.jpg',
  preroll: 'images/prodotti/preroll-gelato-41.jpg',
  cannagar: 'images/prodotti/cannagar-royal.jpg',
  vape: 'images/prodotti/vape-amnesia-thcx.jpg',
  edibles: 'images/prodotti/edibles-mango.jpg',
  semi: 'images/prodotti/semi-gorilla-glue.jpg',
  cloni: 'images/prodotti/cloni-lemon-haze.jpg',
}

/** Il reparto Merch: accessori per fumatori e merch. Ha una pagina sua, fuori dal negozio. */
export const categorieMerch = {
  fumo: 'Per fumare',
  abbigliamento: 'Abbigliamento',
  skate: 'Skate e sticker',
} as const
export type CategoriaMerch = keyof typeof categorieMerch

/** Nome di qualunque famiglia, del negozio o del Merch. */
export const nomiCategoria: Record<Categoria | CategoriaMerch, string> = {
  ...categorie,
  ...categorieMerch,
}

/** Fiori: metodo di coltivazione, dal più pregiato al più economico. */
export const coltivazioni = [
  'Indoor hydro',
  'Indoor',
  'Cali',
  'Glasshouse',
  'Greenhouse',
  'Outdoor',
] as const
export type Coltivazione = (typeof coltivazioni)[number]

/** Fiori: tipologia di prodotto finito. */
export const tipiFiore = ['Big Bud', 'Small Bud', 'Trim'] as const
export type TipoFiore = (typeof tipiFiore)[number]

/** Hash: metodo di produzione ed estrazione. */
export const metodiHash = [
  'Dry sift',
  'Super Dry',
  'Mousse',
  '3x filtered',
  'Frozen sift',
  'Static sift',
  'Frozen static sift',
  'Ice-o-lator',
  'Libanese',
  'Fresh frozen',
  'Dry ice',
  'Semidry',
] as const
export type MetodoHash = (typeof metodiHash)[number]

/** Estratti: metodo di estrazione. */
export const metodiEstratto = [
  'Sugar wax',
  'Shatter',
  'Crumble',
  'Terpsolate',
  'Piattella',
  'Budder',
  'Isolato',
] as const
export type MetodoEstratto = (typeof metodiEstratto)[number]

/** Tipologia delle altre famiglie (per i fiori c'è `tipiFiore`). */
export const tipiPer = {
  oli: ['Full spectrum', 'Broad spectrum'],
  preroll: ['Singolo', 'Multipack'],
  cannagar: ['Classico', 'Con hash'],
  vape: ['Vape pen', 'Cartuccia'],
  edibles: ['Gommose', 'Caramelle'],
  semi: ['Femminizzati', 'Autofiorenti'],
  cloni: ['Talea radicata'],
} as const satisfies Partial<Record<Categoria, readonly string[]>>

/** Hash: come si presenta al tatto. */
export const consistenze = ['Morbido', 'Duro', 'Cremoso'] as const
export type Consistenza = (typeof consistenze)[number]

/** Hash: colore prevalente. */
export const colori = ['Giallo', 'Marrone', 'Nero'] as const
export type Colore = (typeof colori)[number]

/** Cannabinoidi dichiarati sul lotto (percentuali). */
export type Attivi = Partial<Record<'cbd' | 'thcx' | 'thca' | 'cbg' | 'cbn' | 'thc', number>>

export const cannabinoidi = ['CBD', 'THC-X', 'THC-A', 'CBG', 'CBN', 'THC'] as const
export type Cannabinoide = (typeof cannabinoidi)[number]

export type Product = {
  slug: string
  name: string
  /** Linea del cannabinoide. Manca solo nel reparto Merch. */
  linea?: Linea
  category: Categoria | CategoriaMerch
  /** Reparto: il Merch ha una pagina sua; senza reparto il prodotto sta nel negozio */
  reparto?: 'merch'
  /** Profilo aromatico, tre parole (per il Merch: tre caratteristiche) */
  aroma: [string, string, string]
  /** Cannabinoidi in percentuale sul lotto */
  attivi: Attivi
  /** Prezzo del formato base, in centesimi */
  price: number
  compareAt?: number
  /** Grammi del formato base */
  grams: number
  /** Unità della quantità: g di default, ml per oli e vape, pz per ciò che si vende a pezzi */
  unita?: 'g' | 'ml' | 'pz'
  /** Formato scritto a parole, al posto della quantità (es. "Taglie S–XL") */
  formato?: string
  /** Dose per pezzo, per gli edibles: diventa il sottotitolo giallo (es. "10 mg") */
  dose?: string
  /** Lotto certificato 0,0 % di THC */
  thcFree?: boolean
  badges?: Array<'New' | 'Best seller' | 'Limited drop'>
  inStock: boolean
  image: string
  /** Foto ad alta risoluzione per la scheda grande in evidenza (se manca, si usa `image`) */
  imageGrande?: string
  /** Galleria della pagina prodotto (la prima è la principale) */
  gallery?: { src: string; alt: string }[]
  origin: string
  /** Solo fiori */
  coltivazione?: Coltivazione
  /** Solo fiori */
  tipoFiore?: TipoFiore
  /** Tipologia per oli, preroll, vape, edibles, semi e cloni (vedi `tipiPer`) */
  tipo?: string
  /** Hash ed estratti: metodo di lavorazione */
  metodo?: MetodoHash | MetodoEstratto
  /** Solo hash */
  consistenza?: Consistenza
  /** Solo hash */
  colore?: Colore
  short: string
  /** Formati acquistabili */
  variants?: Variant[]
  /** Descrizione lunga, un paragrafo per riga */
  description?: string[]
  /** Note di degustazione: cosa si sente e quando */
  aromaNotes?: { label: string; text: string }[]
  features?: { label: string; value: string }[]
  batch?: string
  lab?: { cbd: string; thc: string; lab: string; date: string }
  storage?: string
  warnings?: string
  faq?: { q: string; a: string }[]
}

const conservazione =
  'Conservare in luogo fresco e asciutto, al riparo dalla luce, nella confezione originale richiusa.'
const avvertenze =
  'Prodotto riservato ai maggiori di 18 anni. Non destinato alla combustione. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.'

const base: Product[] = [
  /* ---------------- HASH ---------------- */
  {
    slug: 'lemon-haze',
    name: 'Lemon Haze',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Dry sift',
    consistenza: 'Morbido',
    colore: 'Giallo',
    aroma: ['Agrumato', 'Terroso', 'Morbido'],
    attivi: { cbd: 18.4, cbg: 1.2, thc: 0.25 },
    price: 2490,
    grams: 3.5,
    badges: ['Best seller'],
    inStock: true,
    image: 'images/demo/lemon-haze.jpg',
    gallery: [
      { src: 'images/demo/lemon-haze.jpg', alt: 'Lemon Haze, due pezzi di hash CBD su fondo nero' },
      { src: 'images/demo/box-lemon-haze.jpg', alt: 'Confezione Lemon Haze da 3,5 g' },
      { src: 'images/demo/hash-macro.jpg', alt: 'Macro della texture resinosa di Lemon Haze' },
      { src: 'images/demo/jar-hash.jpg', alt: 'Barattolo in vetro nero The Hasher' },
    ],
    origin: 'Selezione europea',
    short: 'Note agrumate nette, fondo terroso, texture morbida e compatta.',
    variants: [
      { label: '1 g', grams: 1, price: 890, inStock: true },
      { label: '3,5 g', grams: 3.5, price: 2490, inStock: true },
      { label: '5 g', grams: 5, price: 3390, compareAt: 3560, inStock: true },
      { label: '10 g', grams: 10, price: 5990, compareAt: 7120, inStock: false },
    ],
    description: [
      'Lemon Haze è il nostro hash più riconoscibile: l’agrume arriva subito, netto, senza coprire il fondo terroso che tiene insieme il profilo. La pressatura è morbida, la grana si apre con le dita senza sbriciolarsi.',
      'Selezionato in Europa da un produttore con cui lavoriamo da tre raccolti. Ogni lotto viene analizzato prima di entrare in magazzino: il certificato è qui sotto, con il numero stampato sulla confezione.',
    ],
    aromaNotes: [
      { label: 'Al naso', text: 'Limone e scorza fresca, subito riconoscibili.' },
      { label: 'Al tatto', text: 'Morbido, leggermente oleoso, si lavora senza calore.' },
      { label: 'Sul finale', text: 'Fondo terroso e dolce, lungo ma mai pesante.' },
    ],
    features: [
      { label: 'Linea', value: 'CBD' },
      { label: 'Lavorazione', value: 'Dry sift, pressatura a freddo' },
      { label: 'Consistenza', value: 'Morbido, colore giallo dorato' },
      { label: 'Origine', value: 'Selezione europea' },
      { label: 'Ingredienti', value: 'Cannabis sativa L. (infiorescenze e resina)' },
    ],
    batch: 'LH-2609',
    lab: {
      cbd: '18,4 %',
      thc: 'entro i limiti di legge',
      lab: 'Laboratorio indipendente',
      date: '09/2026',
    },
    storage: conservazione,
    warnings: avvertenze,
    faq: [
      {
        q: 'Che differenza c’è tra i formati?',
        a: 'Solo la quantità: è lo stesso lotto, dallo stesso certificato. Sui formati da 5 e 10 g il prezzo al grammo scende, come vedi sotto ogni opzione.',
      },
      {
        q: 'Come leggo il numero di lotto?',
        a: 'È stampato sul retro della confezione e corrisponde a quello indicato in questa pagina. Con quel numero scarichi il certificato di analisi.',
      },
      {
        q: 'Il prodotto è sempre lo stesso a ogni ordine?',
        a: 'Il lotto cambia nel tempo, il profilo resta quello. Quando cambiamo lotto aggiorniamo qui i valori e il certificato.',
      },
    ],
  },
  {
    slug: 'royal-hash',
    name: 'Royal Hash',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Mousse',
    consistenza: 'Cremoso',
    colore: 'Marrone',
    aroma: ['Classico', 'Pieno', 'Rotondo'],
    attivi: { cbd: 31.5, cbg: 1.4 },
    price: 2490,
    grams: 3.5,
    badges: ['Best seller'],
    inStock: true,
    image: 'images/demo/royal-hash.jpg',
    origin: 'Selezione europea',
    short: 'Il classico: pieno, rotondo, cremoso al tatto. Per chi sa cosa cerca.',
  },
  {
    slug: 'desert-gold',
    name: 'Desert Gold',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Super Dry',
    consistenza: 'Duro',
    colore: 'Giallo',
    aroma: ['Dolce', 'Speziato', 'Complesso'],
    attivi: { cbd: 26.8 },
    price: 2490,
    grams: 3.5,
    badges: ['Best seller'],
    inStock: true,
    image: 'images/demo/desert-gold.jpg',
    origin: 'Selezione europea',
    short: 'Dolce all’attacco, speziato sul finale. Grana fine, colore dorato.',
  },
  {
    slug: 'ketama-gold',
    name: 'Ketama Gold',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Libanese',
    consistenza: 'Duro',
    colore: 'Marrone',
    aroma: ['Legnoso', 'Dolce', 'Profondo'],
    attivi: { cbd: 24.3 },
    price: 2990,
    grams: 3.5,
    badges: ['New', 'Limited drop'],
    inStock: true,
    image: 'images/demo/hash-bricks.jpg',
    imageGrande: 'images/filiera/pressatura.jpg',
    origin: 'Selezione europea',
    short: 'Lotto limitato. Pressatura tradizionale, profilo legnoso e profondo.',
  },
  {
    slug: 'tropicana-cookies',
    name: 'Tropicana Cookies',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Frozen sift',
    consistenza: 'Cremoso',
    colore: 'Giallo',
    aroma: ['Tropicale', 'Agrumato', 'Resinoso'],
    attivi: { cbd: 46.2, cbg: 2.1, thc: 0.28 },
    price: 2190,
    grams: 1,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/hash-macro.jpg',
    origin: 'Selezione europea',
    short: 'Setacciato a freddo: profumo tropicale intatto, resa piena, nessun residuo.',
  },
  {
    slug: 'apple-bananas',
    name: 'Apple & Bananas',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Static sift',
    consistenza: 'Morbido',
    colore: 'Giallo',
    aroma: ['Frutta bianca', 'Dolce', 'Fresco'],
    attivi: { cbd: 39.4, cbg: 1.6 },
    price: 1890,
    grams: 1,
    inStock: true,
    image: 'images/demo/hash-texture.jpg',
    origin: 'Selezione europea',
    short: 'Separazione statica, solo tricomi. Mela verde e banana, dolcezza pulita.',
  },
  {
    slug: 'gelato-ice-o-lator',
    name: 'Gelato 41',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Ice-o-lator',
    consistenza: 'Cremoso',
    colore: 'Giallo',
    aroma: ['Cremoso', 'Vaniglia', 'Agrumato'],
    attivi: { cbd: 51.7, cbg: 2.4 },
    price: 2490,
    grams: 1,
    badges: ['Limited drop'],
    inStock: true,
    image: 'images/demo/jar-hash.jpg',
    origin: 'Selezione europea',
    short: 'Estrazione in acqua e ghiaccio. Il più cremoso del catalogo, quasi burroso.',
  },
  {
    slug: 'nepal-black',
    name: 'Nepal Black',
    linea: 'CBD',
    category: 'hash',
    metodo: '3x filtered',
    consistenza: 'Duro',
    colore: 'Nero',
    aroma: ['Balsamico', 'Cacao', 'Intenso'],
    attivi: { cbd: 29.6 },
    price: 2790,
    grams: 3.5,
    inStock: true,
    image: 'images/demo/hash-bricks.jpg',
    origin: 'Selezione europea',
    short: 'Tre filtraggi, colore nero e superficie lucida. Cacao amaro e resina.',
  },
  {
    slug: 'strawberry-banana',
    name: 'Strawberry Banana',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Fresh frozen',
    consistenza: 'Cremoso',
    colore: 'Giallo',
    aroma: ['Fragola', 'Dolce', 'Pieno'],
    attivi: { cbd: 48.3, cbg: 2.8, thc: 0.29 },
    price: 2690,
    grams: 1,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/hash-macro.jpg',
    origin: 'Selezione europea',
    short: 'Pianta congelata fresca: il terpene resta dentro. Fragola vera, niente cotto.',
  },
  {
    slug: 'zkittlez-dry-ice',
    name: 'Zkittlez',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Dry ice',
    consistenza: 'Morbido',
    colore: 'Marrone',
    aroma: ['Fruttato', 'Caramello', 'Rotondo'],
    attivi: { cbd: 34.1 },
    price: 1590,
    grams: 1,
    inStock: true,
    image: 'images/demo/hash-texture.jpg',
    origin: 'Selezione europea',
    short: 'Ghiaccio secco: resa alta, prezzo onesto, profilo fruttato da tutti i giorni.',
  },
  {
    slug: 'chocolate-skunk',
    name: 'Chocolate Skunk',
    linea: 'CBD',
    category: 'hash',
    metodo: 'Semidry',
    consistenza: 'Morbido',
    colore: 'Marrone',
    aroma: ['Cioccolato', 'Terroso', 'Speziato'],
    attivi: { cbd: 21.7 },
    price: 2490,
    grams: 5,
    inStock: true,
    image: 'images/demo/royal-hash.jpg',
    origin: 'Selezione europea',
    short: 'Semidry da formato grande: morbido, scuro, con la scia di cacao sul finale.',
  },
  {
    slug: 'runtz-thcx',
    name: 'Runtz THC-X',
    linea: 'THC-X',
    category: 'hash',
    metodo: 'Frozen static sift',
    consistenza: 'Cremoso',
    colore: 'Giallo',
    aroma: ['Candy', 'Agrumato', 'Intenso'],
    attivi: { thcx: 38.5, cbd: 2.1 },
    price: 3290,
    grams: 1,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/hash-macro.jpg',
    origin: 'Selezione europea',
    short: 'Statico a freddo sulla linea THC-X: dolce, pungente, molto aromatico.',
  },

  /* ---------------- FIORI ---------------- */
  {
    slug: 'silver-haze-cbd',
    name: 'Silver Haze',
    linea: 'CBD',
    category: 'fiori',
    coltivazione: 'Indoor',
    tipoFiore: 'Big Bud',
    aroma: ['Fresco', 'Pino', 'Agrumato'],
    attivi: { cbd: 19.8, cbg: 1.1 },
    price: 2190,
    grams: 3.5,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/cat-flower.jpg',
    origin: 'Coltivazione indoor europea',
    short: 'Cime compatte, terpeni freschi e resinosi. Il nostro indoor di riferimento.',
  },
  {
    slug: 'gelato-41-indoor',
    name: 'Gelato 41',
    linea: 'CBD',
    category: 'fiori',
    coltivazione: 'Indoor hydro',
    tipoFiore: 'Big Bud',
    aroma: ['Cremoso', 'Dolce', 'Agrumato'],
    attivi: { cbd: 22.6, cbg: 1.5, thc: 0.24 },
    price: 2790,
    grams: 3.5,
    badges: ['Best seller'],
    inStock: true,
    image: 'images/demo/flower-macro-2.jpg',
    origin: 'Coltivazione idroponica europea',
    short: 'Idroponica, cime dense e cariche di tricomi. Il massimo che abbiamo sui fiori.',
  },
  {
    slug: 'zkittlez-cali',
    name: 'Zkittlez Cali',
    linea: 'CBD',
    category: 'fiori',
    coltivazione: 'Cali',
    tipoFiore: 'Big Bud',
    aroma: ['Fruttato', 'Dolce', 'Denso'],
    attivi: { cbd: 24.1, cbg: 1.8, thc: 0.27 },
    price: 3290,
    grams: 3.5,
    badges: ['Limited drop'],
    inStock: true,
    image: 'images/demo/flower-macro-2.jpg',
    origin: 'Genetica californiana, coltivazione europea',
    short: 'Standard Cali: cure lungo, cime grandi, profumo che si sente dal barattolo.',
  },
  {
    slug: 'amnesia-cbd',
    name: 'Amnesia',
    linea: 'CBD',
    category: 'fiori',
    coltivazione: 'Greenhouse',
    tipoFiore: 'Big Bud',
    aroma: ['Dolce', 'Terroso', 'Floreale'],
    attivi: { cbd: 14.2 },
    price: 1790,
    grams: 3.5,
    inStock: false,
    image: 'images/demo/flower-macro-2.jpg',
    origin: 'Coltivazione greenhouse europea',
    short: 'Profilo dolce e floreale, tricomi evidenti. Prossimo restock in arrivo.',
  },
  {
    slug: 'lemon-tree-small',
    name: 'Lemon Tree Small',
    linea: 'CBD',
    category: 'fiori',
    coltivazione: 'Indoor',
    tipoFiore: 'Small Bud',
    aroma: ['Agrumato', 'Pungente', 'Fresco'],
    attivi: { cbd: 17.4 },
    price: 1990,
    grams: 5,
    inStock: true,
    image: 'images/demo/cat-flower.jpg',
    origin: 'Coltivazione indoor europea',
    short: 'Stesse piante dell’indoor, cime piccole. Stesso profumo, prezzo più basso.',
  },
  {
    slug: 'orange-bud-prerolls',
    name: 'Orange Bud Pre-roll',
    linea: 'CBD',
    category: 'preroll',
    tipo: 'Multipack',
    coltivazione: 'Glasshouse',
    aroma: ['Arancia', 'Dolce', 'Leggero'],
    attivi: { cbd: 16.2 },
    price: 1490,
    grams: 3,
    formato: '3 × 1 g',
    inStock: true,
    image: 'images/prodotti/preroll-orange-bud.jpg',
    origin: 'Coltivazione glasshouse europea',
    short: 'Tre coni pronti da 1 g. Tiraggio regolare, niente polvere.',
  },
  {
    slug: 'critical-outdoor',
    name: 'Critical Mass',
    linea: 'CBD',
    category: 'fiori',
    coltivazione: 'Outdoor',
    tipoFiore: 'Big Bud',
    aroma: ['Terroso', 'Erbaceo', 'Semplice'],
    attivi: { cbd: 9.8 },
    price: 1890,
    grams: 10,
    inStock: true,
    image: 'images/demo/landscape.jpg',
    origin: 'Coltivazione outdoor europea',
    short: 'Outdoor onesto in formato grande: profilo terroso, prezzo al grammo minimo.',
  },
  {
    slug: 'trim-selection',
    name: 'Trim Selection',
    linea: 'CBD',
    category: 'fiori',
    coltivazione: 'Greenhouse',
    tipoFiore: 'Trim',
    aroma: ['Erbaceo', 'Verde', 'Secco'],
    attivi: { cbd: 8.4 },
    price: 2490,
    grams: 50,
    inStock: true,
    image: 'images/demo/landscape.jpg',
    origin: 'Coltivazione greenhouse europea',
    short: 'Foglie e residui di lavorazione selezionati, per estrazioni e infusi.',
  },
  {
    slug: 'mimosa-thcx',
    name: 'Mimosa THC-X',
    linea: 'THC-X',
    category: 'fiori',
    coltivazione: 'Indoor',
    tipoFiore: 'Big Bud',
    aroma: ['Agrumato', 'Tropicale', 'Intenso'],
    attivi: { thcx: 24.2, cbd: 1.2 },
    price: 3490,
    grams: 3.5,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/flower-macro-2.jpg',
    origin: 'Coltivazione indoor europea',
    short: 'Linea THC-X, indoor. Cime chiare, profumo agrumato che riempie la stanza.',
  },
  {
    slug: 'purple-punch-thcx',
    name: 'Purple Punch THC-X',
    linea: 'THC-X',
    category: 'fiori',
    coltivazione: 'Glasshouse',
    tipoFiore: 'Small Bud',
    aroma: ['Uva', 'Dolce', 'Morbido'],
    attivi: { thcx: 18.6 },
    price: 2990,
    grams: 5,
    inStock: true,
    image: 'images/demo/cat-flower.jpg',
    origin: 'Coltivazione glasshouse europea',
    short: 'Small bud della linea THC-X: uva e frutta scura, resa piena.',
  },

  /* ---------------- ESTRATTI ---------------- */
  {
    slug: 'mimosa-sugar-wax',
    name: 'Mimosa Sugar Wax',
    linea: 'CBD',
    category: 'estratti',
    metodo: 'Sugar wax',
    aroma: ['Agrumato', 'Zuccherino', 'Vivo'],
    attivi: { cbd: 62.4, cbg: 3.1 },
    price: 2990,
    grams: 1,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/jar-hash.jpg',
    origin: 'Estrazione europea',
    short: 'Grana zuccherina, terpeni intatti. Si lavora facilmente, profuma subito.',
  },
  {
    slug: 'og-kush-shatter',
    name: 'OG Kush Shatter',
    linea: 'CBD',
    category: 'estratti',
    metodo: 'Shatter',
    aroma: ['Pino', 'Legnoso', 'Netto'],
    attivi: { cbd: 68.2 },
    price: 3190,
    grams: 1,
    inStock: true,
    image: 'images/demo/hash-texture.jpg',
    origin: 'Estrazione europea',
    short: 'Lastra ambrata, trasparente, si rompe netta. Profilo classico OG.',
  },
  {
    slug: 'lemon-crumble',
    name: 'Lemon Crumble',
    linea: 'CBD',
    category: 'estratti',
    metodo: 'Crumble',
    aroma: ['Limone', 'Secco', 'Pungente'],
    attivi: { cbd: 64.7 },
    price: 2890,
    grams: 1,
    inStock: true,
    image: 'images/demo/hash-macro.jpg',
    origin: 'Estrazione europea',
    short: 'Friabile, si dosa con le dita. Agrume secco, nessun residuo oleoso.',
  },
  {
    slug: 'tangie-terpsolate',
    name: 'Tangie Terpsolate',
    linea: 'CBD',
    category: 'estratti',
    metodo: 'Terpsolate',
    thcFree: true,
    aroma: ['Mandarino', 'Puro', 'Esplosivo'],
    attivi: { cbd: 88.3 },
    price: 3990,
    grams: 1,
    badges: ['Limited drop'],
    inStock: true,
    image: 'images/demo/jar-hash.jpg',
    origin: 'Estrazione europea',
    short: 'Isolato riportato sui terpeni della Tangie: purezza altissima, naso pieno.',
  },
  {
    slug: 'gelato-piattella',
    name: 'Gelato Piattella',
    linea: 'CBD',
    category: 'estratti',
    metodo: 'Piattella',
    aroma: ['Cremoso', 'Vaniglia', 'Ricco'],
    attivi: { cbd: 72.1, cbg: 2.6, thc: 0.22 },
    price: 4290,
    grams: 1,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/hash-macro.jpg',
    origin: 'Estrazione europea',
    short: 'La texture del momento: cristalli sospesi in terpeni, dolce e rotonda.',
  },
  {
    slug: 'wedding-cake-budder',
    name: 'Wedding Cake Budder',
    linea: 'CBD',
    category: 'estratti',
    metodo: 'Budder',
    aroma: ['Burroso', 'Dolce', 'Denso'],
    attivi: { cbd: 66.5 },
    price: 3090,
    grams: 1,
    inStock: false,
    image: 'images/demo/hash-texture.jpg',
    origin: 'Estrazione europea',
    short: 'Montato come burro, colore chiaro. Esaurito, torna col prossimo lotto.',
  },
  {
    slug: 'isolato-cbd-99',
    name: 'Isolato CBD 99 %',
    linea: 'CBD',
    category: 'estratti',
    metodo: 'Isolato',
    thcFree: true,
    aroma: ['Neutro', 'Pulito', 'Inodore'],
    attivi: { cbd: 99.1 },
    price: 1990,
    grams: 1,
    badges: ['Best seller'],
    inStock: true,
    image: 'images/demo/packaging-family.jpg',
    origin: 'Estrazione europea',
    short: 'Cristallo puro, senza odore né sapore. Base per chi formula da sé.',
  },
  {
    slug: 'olio-full-spectrum-20',
    name: 'Olio Full Spectrum 20 %',
    linea: 'CBD',
    category: 'oli',
    tipo: 'Full spectrum',
    unita: 'ml',
    aroma: ['Erbaceo', 'Amaro', 'Pieno'],
    attivi: { cbd: 20, cbg: 2.2, cbn: 1.1, thc: 0.26 },
    price: 3490,
    grams: 10,
    inStock: true,
    image: 'images/prodotti/olio-full-spectrum.jpg',
    origin: 'Estrazione europea',
    short: 'Dieci millilitri, spettro completo, contagocce graduato. CBG e CBN inclusi.',
  },
  {
    slug: 'zkittlez-thcx-shatter',
    name: 'Zkittlez THC-X Shatter',
    linea: 'THC-X',
    category: 'estratti',
    metodo: 'Shatter',
    aroma: ['Fruttato', 'Dolce', 'Potente'],
    attivi: { thcx: 76.4, cbd: 1.4 },
    price: 4490,
    grams: 1,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/hash-texture.jpg',
    origin: 'Estrazione europea',
    short: 'La lastra più concentrata del catalogo, sulla linea THC-X.',
  },

  /* ---------------- CBG e CBN ---------------- */
  {
    slug: 'white-cbg',
    name: 'White CBG',
    linea: 'CBG',
    category: 'fiori',
    coltivazione: 'Glasshouse',
    tipoFiore: 'Big Bud',
    aroma: ['Erbaceo', 'Agrumato', 'Delicato'],
    attivi: { cbg: 14.6, cbd: 1.4 },
    price: 2290,
    grams: 3.5,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/cat-flower.jpg',
    origin: 'Coltivazione glasshouse europea',
    short: 'Cime chiarissime a dominanza CBG. Profumo leggero, effetto lucido.',
  },
  {
    slug: 'golden-cbg-hash',
    name: 'Golden CBG',
    linea: 'CBG',
    category: 'hash',
    metodo: 'Dry sift',
    consistenza: 'Duro',
    colore: 'Giallo',
    aroma: ['Terroso', 'Dolce', 'Pulito'],
    attivi: { cbg: 28.4, cbd: 2.2 },
    price: 2690,
    grams: 3.5,
    inStock: true,
    image: 'images/demo/desert-gold.jpg',
    origin: 'Selezione europea',
    short: 'Il primo hash della linea CBG: grana asciutta, colore paglia, naso pulito.',
  },
  {
    slug: 'isolato-cbg-98',
    name: 'Isolato CBG 98 %',
    linea: 'CBG',
    category: 'estratti',
    metodo: 'Isolato',
    thcFree: true,
    aroma: ['Neutro', 'Pulito', 'Inodore'],
    attivi: { cbg: 98.2 },
    price: 2490,
    grams: 1,
    inStock: true,
    image: 'images/demo/packaging-family.jpg',
    origin: 'Estrazione europea',
    short: 'Cristallo di CBG puro, certificato 0,0 % di THC. Base per formulazioni.',
  },
  {
    slug: 'olio-cbn-notte',
    name: 'Olio CBN Notte 10 %',
    linea: 'CBN',
    category: 'oli',
    tipo: 'Broad spectrum',
    unita: 'ml',
    thcFree: true,
    aroma: ['Erbaceo', 'Scuro', 'Morbido'],
    attivi: { cbn: 10.2, cbd: 5.1 },
    price: 3690,
    grams: 10,
    badges: ['New'],
    inStock: true,
    image: 'images/prodotti/olio-cbn-notte.jpg',
    origin: 'Estrazione europea',
    short: 'Dieci millilitri a dominanza CBN, senza THC. Contagocce graduato.',
  },
  {
    slug: 'isolato-cbn-97',
    name: 'Isolato CBN 97 %',
    linea: 'CBN',
    category: 'estratti',
    metodo: 'Isolato',
    thcFree: true,
    aroma: ['Neutro', 'Pulito', 'Inodore'],
    attivi: { cbn: 97.4 },
    price: 2890,
    grams: 1,
    inStock: true,
    image: 'images/demo/packaging-family.jpg',
    origin: 'Estrazione europea',
    short: 'Cristallo di CBN puro, certificato 0,0 % di THC.',
  },
]

/** Tutto il catalogo: negozio (famiglie storiche + nuove) e reparto Merch. */
export const products: Product[] = [...base, ...famiglie, ...merch]

/* ---------------- Helper di catalogo ---------------- */

const chiaveAttivo: Record<Cannabinoide, keyof Attivi> = {
  CBD: 'cbd',
  'THC-X': 'thcx',
  'THC-A': 'thca',
  CBG: 'cbg',
  CBN: 'cbn',
  THC: 'thc',
}

/**
 * Vero quando il cannabinoide è dichiarato sul lotto.
 * Il THC resta sempre entro i limiti di legge: qui dice solo che è presente e misurato.
 */
export function haCannabinoide(p: Product, c: Cannabinoide) {
  return (p.attivi[chiaveAttivo[c]] ?? 0) >= 0.2
}

/** Fasce di concentrazione totale: un filtro solo, al posto di cinque numeri. */
export const forze = ['Leggero', 'Medio', 'Forte'] as const
export type Forza = (typeof forze)[number]
export const fasceForza: Record<Forza, string> = {
  Leggero: 'fino a 15 %',
  Medio: '15–35 %',
  Forte: 'oltre 35 %',
}

export function totaleAttivi(p: Product) {
  return Object.values(p.attivi).reduce((s, v) => s + (v ?? 0), 0)
}

export function forzaDi(p: Product): Forza {
  const t = totaleAttivi(p)
  return t < 15 ? 'Leggero' : t <= 35 ? 'Medio' : 'Forte'
}

const numero = (v: number) => String(v).replace('.', ',')

/** Quantità come si scrive in italiano: 3,5 g — 10 ml — 10 pz (o il formato a parole). */
export function formatQuantita(p: Product) {
  return p.formato ?? `${numero(p.grams)} ${p.unita ?? 'g'}`
}

/**
 * Unità del prezzo unitario (€/g, €/ml), o null se non ha senso mostrarlo:
 * chi compra una t-shirt o un pacco di semi non ragiona al pezzo.
 */
export function unitaPrezzo(p: Product): 'g' | 'ml' | null {
  const u = p.unita ?? 'g'
  return u === 'pz' ? null : u
}

/**
 * Etichetta del cannabinoide principale, es. "CBD: +18%".
 * La percentuale è arrotondata all'intero sotto: il lotto ne contiene almeno tanto.
 * Se si sta filtrando per un cannabinoide, mostra quello: così la percentuale
 * in pagina è sempre quella che l'utente sta cercando.
 */
export function attivoPrincipale(p: Product, preferito?: Cannabinoide | null) {
  if (preferito) {
    const v = p.attivi[chiaveAttivo[preferito]] ?? 0
    if (v > 0) return etichettaAttivo(preferito, v)
  }
  const top = cannabinoidi
    .map((c) => ({ c, v: p.attivi[chiaveAttivo[c]] ?? 0 }))
    .sort((a, b) => b.v - a.v)[0]
  return top && top.v > 0 ? etichettaAttivo(top.c, top.v) : null
}

const etichettaAttivo = (c: Cannabinoide, v: number) => `${c}: +${Math.floor(v)}%`

/**
 * Le due parti dell'etichetta, separate: la sigla va spaziata, il valore no.
 * Serve al sottotitolo giallo di schede e pagina prodotto.
 */
export function attivoParti(p: Product, preferito?: Cannabinoide | null) {
  if (p.dose && p.linea) return { sigla: p.linea, valore: p.dose }
  const label = attivoPrincipale(p, preferito)
  if (!label) return null
  const [sigla, valore] = label.split(': ')
  return { sigla: sigla!, valore: valore! }
}

/** Lotti certificati senza THC: è un'etichetta, non l'assenza di dichiarazione. */
export function senzaThc(p: Product) {
  return p.thcFree === true
}

/** Tag di lavorazione mostrato sulle card: coltivazione per i fiori, metodo o tipologia per il resto. */
export function tagLavorazione(p: Product) {
  return p.coltivazione ?? p.metodo ?? p.tipo
}

/** Descrizione breve della categoria, per alt e briciole. */
export function etichettaCategoria(p: Product) {
  const nome = nomiCategoria[p.category].toLowerCase()
  return p.linea ? `${nome} ${p.linea}` : nome
}

/** Dove sta la famiglia del prodotto: negozio o Merch. */
export function pathCategoria(p: Product) {
  return `${p.reparto === 'merch' ? '/merch' : '/negozio'}?categoria=${p.category}`
}

export const bestSellers = products.filter((p) => p.badges?.includes('Best seller'))
export const newDrop = products.find((p) => p.slug === 'ketama-gold')!

/** Cerca un prodotto per slug; se non lo trova torna il primo (prototipo). */
export function findProduct(slug?: string) {
  return products.find((p) => p.slug === slug) ?? products[0]!
}

/** Percorso della pagina prodotto. */
export function productPath(slug: string) {
  return `/prodotto/${slug}`
}
