/**
 * Filtri del negozio: un solo posto dove si dice cosa si può filtrare,
 * come si legge dall'indirizzo e come si applica al catalogo.
 * Un filtro per asse: si tocca per attivare, si ritocca per togliere.
 */
import {
  categorie,
  cannabinoidi,
  colori,
  coltivazioni,
  consistenze,
  forzaDi,
  forze,
  haCannabinoide,
  linee,
  metodiEstratto,
  metodiHash,
  products,
  senzaThc,
  tipiFiore,
  tipiPer,
  totaleAttivi,
  type Cannabinoide,
  type Categoria,
  type Forza,
  type Linea,
  type Product,
} from '@/data/products'

export const ordinamenti = {
  novita: 'Novità',
  'prezzo-basso': 'Prezzo più basso',
  'prezzo-alto': 'Prezzo più alto',
  grammo: 'Prezzo al grammo',
  forza: 'Più concentrati',
} as const
export type Ordine = keyof typeof ordinamenti

export const badgeLabel = { New: 'Novità', 'Best seller': 'Best seller' } as const

export type Filtri = {
  categoria: Categoria | null
  linea: Linea | null
  coltivazione: string | null
  tipo: string | null
  metodo: string | null
  consistenza: string | null
  colore: string | null
  cannabinoide: Cannabinoide | null
  forza: Forza | null
  badge: string | null
  /** Solo lotti certificati 0,0 % di THC */
  thcFree: boolean
  disponibili: boolean
  ordine: Ordine
}

/** Chiavi che l'utente può togliere una per una. */
export const assi = [
  'linea',
  'coltivazione',
  'tipo',
  'metodo',
  'consistenza',
  'colore',
  'cannabinoide',
  'forza',
] as const
export type Asse = (typeof assi)[number]

/** Il negozio mostra le famiglie; il reparto Merch ha una pagina sua. */
export const catalogoShop = products.filter((p) => p.reparto !== 'merch')

/** Famiglie con percentuali di cannabinoidi sul lotto: solo lì hanno senso cannabinoidi e forza. */
const conPercentuali: (Categoria | null)[] = [
  null,
  'fiori',
  'hash',
  'estratti',
  'oli',
  'preroll',
  'cannagar',
  'vape',
]

const tuttiITipi = [...tipiFiore, ...Object.values(tipiPer).flat()]

export type Gruppo = {
  key: Asse
  titolo: string
  nota?: string
  opzioni: readonly string[]
}

/** Solo i gruppi che hanno senso per la categoria scelta. */
export function gruppiPer(categoria: Categoria | null): Gruppo[] {
  const lista: Gruppo[] = [{ key: 'linea', titolo: 'Linea', opzioni: linee }]
  if (categoria === null || categoria === 'fiori') {
    lista.push(
      {
        key: 'coltivazione',
        titolo: 'Coltivazione',
        nota: 'dal più pregiato',
        opzioni: coltivazioni,
      },
      {
        key: 'tipo',
        titolo: 'Tipologia',
        nota: categoria === null ? 'fiori' : undefined,
        opzioni: tipiFiore,
      },
    )
  }
  if (categoria === 'hash')
    lista.push({ key: 'metodo', titolo: 'Lavorazione', opzioni: metodiHash })
  if (categoria === 'estratti')
    lista.push({ key: 'metodo', titolo: 'Estrazione', opzioni: metodiEstratto })
  if (categoria && categoria in tipiPer) {
    const opzioni = tipiPer[categoria as keyof typeof tipiPer]
    if (opzioni.length > 1) lista.push({ key: 'tipo', titolo: 'Tipologia', opzioni })
  }
  if (categoria === null)
    lista.push({
      key: 'metodo',
      titolo: 'Lavorazione',
      nota: 'hash ed estratti',
      opzioni: [...metodiHash, ...metodiEstratto],
    })
  if (categoria === null || categoria === 'hash')
    lista.push(
      { key: 'consistenza', titolo: 'Consistenza', opzioni: consistenze },
      { key: 'colore', titolo: 'Colore', opzioni: colori },
    )
  if (conPercentuali.includes(categoria))
    lista.push(
      {
        key: 'cannabinoide',
        titolo: 'Cannabinoidi',
        nota: 'dichiarati sul lotto',
        opzioni: cannabinoidi,
      },
      { key: 'forza', titolo: 'Concentrazione', opzioni: forze },
    )
  return lista
}

const valido = <T extends readonly string[]>(lista: T, v: string | null) =>
  v && (lista as readonly string[]).includes(v) ? (v as T[number]) : null

/** Legge i filtri dall'indirizzo: la pagina resta condivisibile. */
export function leggiFiltri(params: URLSearchParams): Filtri {
  const categoria = valido(
    Object.keys(categorie) as (keyof typeof categorie)[],
    params.get('categoria'),
  )
  return {
    categoria,
    linea: valido(linee, params.get('linea')),
    coltivazione: valido(coltivazioni, params.get('coltivazione')),
    tipo: valido(tuttiITipi, params.get('tipo')),
    metodo: valido([...metodiHash, ...metodiEstratto], params.get('metodo')),
    consistenza: valido(consistenze, params.get('consistenza')),
    colore: valido(colori, params.get('colore')),
    cannabinoide: valido(cannabinoidi, params.get('cannabinoide')),
    forza: valido(forze, params.get('forza')),
    badge: valido(['New', 'Best seller', 'Limited drop'] as const, params.get('badge')),
    thcFree: params.get('thcfree') === 'si',
    disponibili: params.get('disponibili') === 'si',
    ordine: valido(Object.keys(ordinamenti) as readonly Ordine[], params.get('ordine')) ?? 'novita',
  }
}

export function corrisponde(p: Product, f: Filtri) {
  if (f.categoria && p.category !== f.categoria) return false
  if (f.linea && p.linea !== f.linea) return false
  if (f.coltivazione && p.coltivazione !== f.coltivazione) return false
  if (f.tipo && (p.tipoFiore ?? p.tipo) !== f.tipo) return false
  if (f.metodo && p.metodo !== f.metodo) return false
  if (f.consistenza && p.consistenza !== f.consistenza) return false
  if (f.colore && p.colore !== f.colore) return false
  if (f.cannabinoide && !haCannabinoide(p, f.cannabinoide)) return false
  if (f.forza && forzaDi(p) !== f.forza) return false
  if (f.badge && !p.badges?.includes(f.badge as never)) return false
  if (f.thcFree && !senzaThc(p)) return false
  if (f.disponibili && !p.inStock) return false
  return true
}

const ordinatori: Record<Ordine, (a: Product, b: Product) => number> = {
  novita: () => 0,
  'prezzo-basso': (a, b) => a.price - b.price,
  'prezzo-alto': (a, b) => b.price - a.price,
  grammo: (a, b) => a.price / a.grams - b.price / b.grams,
  forza: (a, b) => totaleAttivi(b) - totaleAttivi(a),
}

export function applica(f: Filtri) {
  return [...catalogoShop.filter((p) => corrisponde(p, f))].sort(ordinatori[f.ordine])
}

/** Quanti prodotti resterebbero cambiando un solo filtro: serve ai contatori. */
export function conta(f: Filtri, patch: Partial<Filtri>) {
  const next = { ...f, ...patch }
  return catalogoShop.filter((p) => corrisponde(p, next)).length
}

/** Filtri attivi oltre a categoria e ordinamento: si mostrano come pillole rimovibili. */
export function attiviDi(f: Filtri) {
  const lista: { key: string; label: string }[] = []
  for (const a of assi) if (f[a]) lista.push({ key: a, label: String(f[a]) })
  if (f.thcFree) lista.push({ key: 'thcfree', label: 'THC free' })
  if (f.badge) lista.push({ key: 'badge', label: f.badge })
  if (f.disponibili) lista.push({ key: 'disponibili', label: 'Solo disponibili' })
  return lista
}

export function contaAttivi(f: Filtri) {
  return attiviDi(f).length
}

/**
 * Cambiando categoria si tolgono gli assi che non c'entrano più.
 * La tipologia cambia significato da una famiglia all'altra: si toglie sempre,
 * tranne tra «Tutto» e Fiori, che condividono le stesse opzioni.
 */
export function daPulire(categoria: Categoria | null): Asse[] {
  const offerti = new Set(gruppiPer(categoria).map((g) => g.key))
  const via = assi.filter((a) => !offerti.has(a))
  if (categoria !== null && categoria !== 'fiori' && !via.includes('tipo')) via.push('tipo')
  return via
}

/** Contatore delle linguette di categoria: tiene conto della pulizia degli assi. */
export function contaCategoria(f: Filtri, categoria: Categoria | null) {
  const patch: Partial<Filtri> = { categoria }
  for (const k of daPulire(categoria)) patch[k] = null
  return conta(f, patch)
}
