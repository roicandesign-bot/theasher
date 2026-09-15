/**
 * Catalogo DEMO del prototipo. Nomi, formati, tag di profilo e codici lotto
 * seguono il sistema di packaging del brand (design/inputs/05-packaging-system.png):
 * tre categorie, ognuna con il suo colore e la sua confezione.
 * Prezzi in centesimi. Le foto sono ritagli dai mockup: demo, da sostituire.
 */
export type Category = 'flower' | 'hash' | 'extract'

export const categories: Record<
  Category,
  { label: string; short: string; color: string; packaging: string; anchor: string }
> = {
  flower: {
    label: 'CBD Flower',
    short: 'Flower',
    color: 'bg-cat-flower',
    packaging: 'Busta richiudibile',
    anchor: 'cbd-flower',
  },
  hash: {
    label: 'Premium CBD Hash',
    short: 'Hash',
    color: 'bg-cat-hash',
    packaging: 'Barattolo in vetro',
    anchor: 'hash',
  },
  extract: {
    label: 'CBD Extract',
    short: 'Extract',
    color: 'bg-cat-extract',
    packaging: 'Barattolo in vetro',
    anchor: 'cbd-extract',
  },
}

export type Variant = {
  /** Etichetta del formato, es. "3,5 g" */
  label: string
  grams: number
  /** in centesimi */
  price: number
  compareAt?: number
  inStock: boolean
}

export type Product = {
  slug: string
  name: string
  category: Category
  /** I tre tag di profilo stampati sulla confezione */
  profile: [string, string, string]
  /** Prezzo del formato base, in centesimi */
  price: number
  compareAt?: number
  /** Grammi del formato base */
  grams: number
  badges?: Array<'New' | 'Best seller' | 'Limited drop'>
  inStock: boolean
  image: string
  /** Come inquadrare la foto nella card: 'contain' per le confezioni, 'cover' per le macro */
  imageFit?: 'cover' | 'contain'
  gallery?: { src: string; alt: string }[]
  origin: string
  short: string
  variants?: Variant[]
  description?: string[]
  aromaNotes?: { label: string; text: string }[]
  features?: { label: string; value: string }[]
  batch?: string
  lab?: { cbd: string; thc: string; lab: string; date: string }
  storage?: string
  warnings?: string
  faq?: { q: string; a: string }[]
}

const storageFlower =
  'Conservare in luogo fresco e asciutto, al riparo dalla luce diretta, nella busta richiusa.'
const storageJar =
  'Conservare in luogo fresco e asciutto, al riparo dalla luce diretta, nel barattolo chiuso.'
const warnings =
  'Tenere fuori dalla portata dei bambini. Non destinato al consumo. Riservato agli adulti. Questo prodotto non è un medicinale.'

export const products: Product[] = [
  {
    slug: 'lemon-haze',
    name: 'Lemon Haze',
    category: 'flower',
    profile: ['Citrus', 'Fresh', 'Uplifting'],
    price: 2490,
    grams: 3.5,
    badges: ['Best seller'],
    inStock: true,
    image: 'images/demo/pouch-lemon-haze.jpg',
    imageFit: 'contain',
    gallery: [
      {
        src: 'images/demo/pouch-lemon-haze.jpg',
        alt: 'Busta Lemon Haze CBD Flower da 3,5 g, fronte',
      },
      { src: 'images/demo/pouch-back.jpg', alt: 'Retro della busta con lotto, conservazione e QR' },
      { src: 'images/demo/cat-flower.jpg', alt: 'Cime di Lemon Haze in primo piano' },
      {
        src: 'images/demo/detail-resin.jpg',
        alt: 'Dettaglio della calligrafia in resina sulla confezione',
      },
    ],
    origin: 'Coltivazione indoor europea',
    short: 'Fiori indoor selezionati, aroma agrumato e profilo terpenico naturale.',
    variants: [
      { label: '1 g', grams: 1, price: 890, inStock: true },
      { label: '3,5 g', grams: 3.5, price: 2490, inStock: true },
      { label: '5 g', grams: 5, price: 3390, compareAt: 3560, inStock: true },
      { label: '10 g', grams: 10, price: 5990, compareAt: 7120, inStock: false },
    ],
    description: [
      'Lemon Haze è il nostro fiore più riconoscibile: l’agrume arriva subito, netto, sostenuto da un fondo fresco che resta pulito fino alla fine. Cime compatte, resinose, selezionate a mano.',
      'Coltivazione indoor europea, con rispetto per la pianta e per chi la lavora. Ogni lotto viene analizzato prima di entrare in magazzino: il certificato è qui sotto, con il numero stampato sulla busta.',
    ],
    aromaNotes: [
      { label: 'Aroma', text: 'Limone e scorza fresca, subito riconoscibili.' },
      { label: 'Profilo', text: 'Fresco, resinoso, terpeni ben presenti.' },
      { label: 'Carattere', text: 'Brillante e leggero, mai stucchevole.' },
    ],
    features: [
      { label: 'Categoria', value: 'CBD Flower' },
      { label: 'Coltivazione', value: 'Indoor, Unione Europea' },
      { label: 'Confezione', value: 'Busta richiudibile con zip antimanomissione' },
      { label: 'Ingredienti', value: 'Cannabis sativa L. (infiorescenze)' },
      { label: 'Aspetto', value: 'Cime compatte, resinose, verde chiaro' },
    ],
    batch: 'LH24001',
    lab: {
      cbd: '18,4 %',
      thc: 'entro i limiti di legge',
      lab: 'Laboratorio indipendente',
      date: '09/2026',
    },
    storage: storageFlower,
    warnings,
    faq: [
      {
        q: 'Che differenza c’è tra i formati?',
        a: 'Solo la quantità: è lo stesso lotto, dallo stesso certificato. Sui formati grandi il prezzo al grammo scende, come vedi sotto ogni opzione.',
      },
      {
        q: 'A cosa serve il QR sulla busta?',
        a: 'Porta alla scheda del lotto: analisi, origine e data. Lo stesso numero è scritto anche in questa pagina.',
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
    category: 'hash',
    profile: ['Rich', 'Smooth', 'Traditional'],
    price: 2990,
    grams: 4,
    badges: ['Best seller'],
    inStock: true,
    image: 'images/demo/jar-royal-hash.jpg',
    imageFit: 'contain',
    gallery: [
      { src: 'images/demo/jar-royal-hash.jpg', alt: 'Barattolo Royal Hash da 4 g chiuso' },
      { src: 'images/demo/jar-open.jpg', alt: 'Barattolo Royal Hash aperto con il prodotto' },
      { src: 'images/demo/box-royal-hash.jpg', alt: 'Astuccio esterno Royal Hash' },
      {
        src: 'images/demo/detail-lid.jpg',
        alt: 'Dettaglio del coperchio con monogramma in rilievo',
      },
    ],
    origin: 'Selezione europea',
    short: 'Il classico: pieno, rotondo, lavorato come si è sempre fatto.',
    variants: [
      { label: '2 g', grams: 2, price: 1690, inStock: true },
      { label: '4 g', grams: 4, price: 2990, inStock: true },
      { label: '10 g', grams: 10, price: 6900, compareAt: 7475, inStock: true },
    ],
    description: [
      'Royal Hash è la nostra referenza classica: pressatura tradizionale, grana che si apre con le dita, profilo pieno e rotondo senza spigoli.',
      'Arriva nel barattolo in vetro con coperchio in rilievo e banda antimanomissione. Dentro l’astuccio trovi il lotto: lo stesso che leggi qui sotto.',
    ],
    aromaNotes: [
      { label: 'Aroma', text: 'Caldo e speziato, classico.' },
      { label: 'Profilo', text: 'Pieno, morbido, senza asprezze.' },
      { label: 'Carattere', text: 'Tradizionale: è il metro di paragone.' },
    ],
    features: [
      { label: 'Categoria', value: 'Premium CBD Hash' },
      { label: 'Lavorazione', value: 'Pressatura tradizionale' },
      { label: 'Confezione', value: 'Barattolo in vetro con banda antimanomissione' },
      { label: 'Ingredienti', value: 'Cannabis sativa L. (resina e infiorescenze)' },
      { label: 'Aspetto', value: 'Blocco compatto, colore bruno scuro' },
    ],
    batch: 'RH24002',
    lab: {
      cbd: '21,0 %',
      thc: 'entro i limiti di legge',
      lab: 'Laboratorio indipendente',
      date: '08/2026',
    },
    storage: storageJar,
    warnings,
  },
  {
    slug: 'diamond-resin',
    name: 'Diamond Resin',
    category: 'extract',
    profile: ['Clear', 'Pure', 'Refined'],
    price: 3990,
    grams: 1,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/jar-diamond-resin.jpg',
    imageFit: 'contain',
    gallery: [
      {
        src: 'images/demo/jar-diamond-resin.jpg',
        alt: 'Barattolo Diamond Resin CBD Extract da 1 g',
      },
      { src: 'images/demo/extract-texture.jpg', alt: 'Macro dei cristalli ambrati dell’estratto' },
      { src: 'images/demo/detail-tamper.jpg', alt: 'Banda antimanomissione con logo The Hasher' },
      { src: 'images/demo/detail-resin.jpg', alt: 'Dettaglio della calligrafia in resina' },
    ],
    origin: 'Estrazione europea',
    short: 'Estratto cristallino, pulito e concentrato. Il formato più tecnico della gamma.',
    variants: [
      { label: '0,5 g', grams: 0.5, price: 2290, inStock: true },
      { label: '1 g', grams: 1, price: 3990, compareAt: 4580, inStock: true },
    ],
    description: [
      'Diamond Resin è il nostro estratto: cristalli ambrati, aspetto pulito, nessun residuo visibile. È il prodotto per chi vuole la forma più concentrata della selezione.',
      'Barattolo in vetro piccolo, banda antimanomissione, lotto sul fondo. Come per tutto il resto, il certificato di analisi è pubblico.',
    ],
    aromaNotes: [
      { label: 'Aroma', text: 'Netto e pulito, quasi neutro.' },
      { label: 'Profilo', text: 'Cristallino, senza note di cottura.' },
      { label: 'Carattere', text: 'Tecnico: si giudica dalla purezza.' },
    ],
    features: [
      { label: 'Categoria', value: 'CBD Extract' },
      { label: 'Lavorazione', value: 'Estrazione e raffinazione' },
      { label: 'Confezione', value: 'Barattolo in vetro da 1 g con banda' },
      { label: 'Ingredienti', value: 'Estratto di Cannabis sativa L.' },
      { label: 'Aspetto', value: 'Cristalli ambrati' },
    ],
    batch: 'DR24001',
    lab: {
      cbd: '62,5 %',
      thc: 'entro i limiti di legge',
      lab: 'Laboratorio indipendente',
      date: '09/2026',
    },
    storage: storageJar,
    warnings,
  },
  {
    slug: 'desert-gold',
    name: 'Desert Gold',
    category: 'hash',
    profile: ['Sweet', 'Spicy', 'Complex'],
    price: 2990,
    grams: 4,
    badges: ['Best seller'],
    inStock: true,
    image: 'images/demo/desert-gold.jpg',
    origin: 'Selezione europea',
    short: 'Dolce all’attacco, speziato sul finale. Grana fine, colore dorato.',
  },
  {
    slug: 'ketama-gold',
    name: 'Ketama Gold',
    category: 'hash',
    profile: ['Woody', 'Sweet', 'Deep'],
    price: 3490,
    grams: 4,
    badges: ['New', 'Limited drop'],
    inStock: true,
    image: 'images/demo/hash-bricks.jpg',
    origin: 'Selezione europea',
    short: 'Lotto limitato. Pressatura tradizionale, profilo legnoso e profondo.',
  },
  {
    slug: 'silver-haze',
    name: 'Silver Haze',
    category: 'flower',
    profile: ['Pine', 'Citrus', 'Bright'],
    price: 2190,
    grams: 3.5,
    badges: ['New'],
    inStock: true,
    image: 'images/demo/cat-flower.jpg',
    origin: 'Coltivazione indoor europea',
    short: 'Cime compatte, terpeni freschi e resinosi. Origini europee.',
  },
  {
    slug: 'amnesia-cbd',
    name: 'Amnesia CBD',
    category: 'flower',
    profile: ['Sweet', 'Earthy', 'Floral'],
    price: 2290,
    grams: 3.5,
    inStock: false,
    image: 'images/demo/flower-macro-2.jpg',
    origin: 'Coltivazione indoor europea',
    short: 'Profilo dolce e floreale, tricomi evidenti. Prossimo restock in arrivo.',
  },
]

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
