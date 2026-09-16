/**
 * Prodotti DEMO per il prototipo (nomi dai mockup del brand, prezzi indicativi).
 * Prezzi in centesimi. Immagini: ritagli demo dai mockup.
 */
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
  category: 'hash' | 'flower'
  /** Profilo aromatico, tre parole */
  aroma: [string, string, string]
  /** Prezzo del formato base, in centesimi */
  price: number
  compareAt?: number
  /** Grammi del formato base */
  grams: number
  badges?: Array<'New' | 'Best seller' | 'Limited drop'>
  inStock: boolean
  image: string
  /** Galleria della pagina prodotto (la prima è la principale) */
  gallery?: { src: string; alt: string }[]
  origin: string
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

export const products: Product[] = [
  {
    slug: 'lemon-haze',
    name: 'Lemon Haze',
    category: 'hash',
    aroma: ['Citrus', 'Earthy', 'Smooth'],
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
      { label: 'Tipologia', value: 'CBD hash' },
      { label: 'Lavorazione', value: 'Pressatura a freddo' },
      { label: 'Origine', value: 'Selezione europea' },
      { label: 'Ingredienti', value: 'Cannabis sativa L. (infiorescenze e resina)' },
      { label: 'Aspetto', value: 'Blocco compatto, colore bruno dorato' },
    ],
    batch: 'LH-2609',
    lab: {
      cbd: '18,4 %',
      thc: 'entro i limiti di legge',
      lab: 'Laboratorio indipendente',
      date: '09/2026',
    },
    storage:
      'Conservare in luogo fresco e asciutto, al riparo dalla luce, nella confezione originale richiusa.',
    warnings:
      'Prodotto riservato ai maggiori di 18 anni. Non destinato alla combustione. Tenere fuori dalla portata di bambini e animali domestici. Le informazioni riportate non costituiscono indicazioni mediche.',
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
    category: 'hash',
    aroma: ['Classic', 'Rich', 'Refined'],
    price: 2490,
    grams: 3.5,
    badges: ['Best seller'],
    inStock: true,
    image: 'images/demo/royal-hash.jpg',
    origin: 'Selezione europea',
    short: 'Il classico: pieno, rotondo, lavorato con cura. Per chi sa cosa cerca.',
  },
  {
    slug: 'desert-gold',
    name: 'Desert Gold',
    category: 'hash',
    aroma: ['Sweet', 'Spicy', 'Complex'],
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
    category: 'hash',
    aroma: ['Woody', 'Sweet', 'Deep'],
    price: 2990,
    grams: 3.5,
    badges: ['New', 'Limited drop'],
    inStock: true,
    image: 'images/demo/hash-bricks.jpg',
    origin: 'Selezione europea',
    short: 'Lotto limitato. Pressatura tradizionale, profilo legnoso e profondo.',
  },
  {
    slug: 'silver-haze-cbd',
    name: 'Silver Haze',
    category: 'flower',
    aroma: ['Fresh', 'Pine', 'Citrus'],
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
    aroma: ['Sweet', 'Earthy', 'Floral'],
    price: 2290,
    grams: 3.5,
    badges: ['New'],
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
