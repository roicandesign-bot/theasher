import { ShoppingBag, X } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CartLineRow } from '@/components/shop/CartLineRow'
import { FreeShippingBar } from '@/components/shop/FreeShippingBar'
import { useCart } from '@/lib/cart'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/money'

/** Carrello a comparsa: si apre di lato senza far perdere la pagina. */
export function CartDrawer() {
  const { isOpen, close, active, subtotal, count } = useCart()
  const location = useLocation()

  useEffect(() => close(), [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  return (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrello"
        className={cn(
          'fixed top-0 right-0 z-50 flex h-svh w-full max-w-md flex-col border-l border-line bg-bg transition-transform duration-300 ease-out-soft',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <p className="flex items-center gap-2 label text-[0.75rem]">
            <ShoppingBag className="size-4 text-primary" />
            Carrello ({count})
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Chiudi carrello"
            className="inline-grid size-10 place-items-center rounded-full text-fg transition hocus:text-primary"
          >
            <X className="size-5" />
          </button>
        </header>

        {active.length > 0 ? (
          <>
            <div className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {active.map((l) => (
                <CartLineRow key={l.id} line={l} compact />
              ))}
            </div>
            <footer className="flex flex-col gap-4 border-t border-line px-5 py-5">
              <FreeShippingBar subtotal={subtotal} />
              <div className="flex items-baseline justify-between">
                <span className="label text-[0.75rem] text-fg-muted">Totale</span>
                <span className="text-2xl font-semibold text-primary">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-fg-muted">
                IVA inclusa. Spedizione calcolata al checkout.
              </p>
              <div className="flex flex-col gap-2">
                <Button to="/checkout" size="lg">
                  Vai al checkout
                </Button>
                <Button to="/carrello" variant="ghost" className="ring-1 ring-line ring-inset">
                  Vedi il carrello
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="size-10 text-fg-subtle" strokeWidth={1.25} />
            <p className="text-h3">Il carrello è vuoto.</p>
            <p className="text-sm text-fg-muted">Il drop è sempre al suo posto: basta scegliere.</p>
            <Button to="/negozio">Vai al negozio</Button>
          </div>
        )}
      </aside>
    </>
  )
}
