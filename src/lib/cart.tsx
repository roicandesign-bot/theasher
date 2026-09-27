import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { products, type Product } from '@/data/products'

export type CartLine = {
  /** slug del prodotto + etichetta formato: identifica la riga */
  id: string
  slug: string
  name: string
  image: string
  formato: string
  grams: number
  /** prezzo unitario in centesimi */
  price: number
  quantity: number
  /** messo da parte per dopo: resta nel carrello ma non nel totale */
  savedForLater?: boolean
}

type CartState = {
  lines: CartLine[]
  /** righe attive (non messe da parte) */
  active: CartLine[]
  saved: CartLine[]
  count: number
  subtotal: number
  /** true quando il carrello a comparsa è aperto */
  isOpen: boolean
  open: () => void
  close: () => void
  add: (product: Product, formato?: string, quantity?: number) => void
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  toggleSaved: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartState | null>(null)

/** Righe di partenza: il prototipo parte con il carrello già pieno, così si vede com'è. */
function lineFrom(slug: string, formato?: string, quantity = 1): CartLine {
  const p = products.find((x) => x.slug === slug)!
  const variant = p.variants?.find((v) => v.label === formato) ?? p.variants?.[0]
  const label = variant?.label ?? `${String(p.grams).replace('.', ',')} g`
  return {
    id: `${p.slug}--${label}`,
    slug: p.slug,
    name: p.name,
    image: p.image,
    formato: label,
    grams: variant?.grams ?? p.grams,
    price: variant?.price ?? p.price,
    quantity,
  }
}

const initialLines: CartLine[] = [lineFrom('lemon-haze', '3,5 g', 1), lineFrom('royal-hash')]

/** Stato del carrello condiviso da header, drawer, carrello e checkout. Solo UI. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(initialLines)
  const [isOpen, setIsOpen] = useState(false)

  const value = useMemo<CartState>(() => {
    const active = lines.filter((l) => !l.savedForLater)
    const saved = lines.filter((l) => l.savedForLater)
    return {
      lines,
      active,
      saved,
      count: active.reduce((n, l) => n + l.quantity, 0),
      subtotal: active.reduce((n, l) => n + l.price * l.quantity, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (product, formato, quantity = 1) => {
        const line = lineFrom(product.slug, formato, quantity)
        setLines((prev) => {
          const found = prev.find((l) => l.id === line.id)
          if (found) {
            return prev.map((l) =>
              l.id === line.id
                ? { ...l, quantity: l.quantity + quantity, savedForLater: false }
                : l,
            )
          }
          return [...prev, line]
        })
        setIsOpen(true)
      },
      setQuantity: (id, quantity) =>
        setLines((prev) =>
          prev.map((l) => (l.id === id ? { ...l, quantity: Math.max(1, quantity) } : l)),
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      toggleSaved: (id) =>
        setLines((prev) =>
          prev.map((l) => (l.id === id ? { ...l, savedForLater: !l.savedForLater } : l)),
        ),
      clear: () => setLines([]),
    }
  }, [lines, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart va usato dentro CartProvider')
  return ctx
}
