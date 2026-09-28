import { Bookmark, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QuantityInput } from '@/components/ui/QuantityInput'
import { productPath } from '@/data/products'
import { asset } from '@/lib/asset'
import { useCart, type CartLine } from '@/lib/cart'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/money'

/** Riga del carrello: foto, nome, formato, quantità, prezzo, azioni. */
export function CartLineRow({ line, compact = false }: { line: CartLine; compact?: boolean }) {
  const { setQuantity, remove, toggleSaved } = useCart()
  return (
    <article className={cn('flex gap-4 py-4', compact ? 'items-center' : 'items-start')}>
      <Link
        to={productPath(line.slug)}
        className="shrink-0 overflow-hidden rounded-md bg-brand-800"
        aria-label={line.name}
      >
        <img
          src={asset(line.image)}
          alt=""
          loading="lazy"
          className={cn('object-cover', compact ? 'size-16' : 'size-20 sm:size-24')}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">
              <Link to={productPath(line.slug)} className="transition hocus:text-primary">
                {line.name}
              </Link>
            </h3>
            <p className="mt-1 label text-[0.625rem] text-fg-muted">
              {line.formato}
              {line.unita && ` · ${formatPrice(Math.round(line.price / line.grams))}/${line.unita}`}
            </p>
          </div>
          <p className="shrink-0 font-semibold text-primary">
            {formatPrice(line.price * line.quantity)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!line.savedForLater && (
            <QuantityInput
              value={line.quantity}
              onChange={(q) => setQuantity(line.id, q)}
              max={10}
            />
          )}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => toggleSaved(line.id)}
              className="inline-flex h-9 items-center gap-1.5 rounded-button px-3 label text-[0.625rem] text-fg-muted transition hocus:text-primary"
            >
              <Bookmark className="size-3.5" />
              {line.savedForLater ? 'Rimetti nel carrello' : 'Salva per dopo'}
            </button>
            <button
              type="button"
              onClick={() => remove(line.id)}
              aria-label={`Rimuovi ${line.name}`}
              className="inline-grid size-9 place-items-center rounded-full text-fg-muted transition hocus:text-danger"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
