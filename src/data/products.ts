/**
 * Prodotti DEMO per il prototipo (nomi dai mockup del brand, prezzi indicativi).
 * Prezzi in centesimi per il formato base. Immagini: ritagli demo dai mockup.
 */
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
  origin: string
  short: string
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
    origin: 'Selezione europea',
    short: 'Note agrumate nette, fondo terroso, texture morbida e compatta.',
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
