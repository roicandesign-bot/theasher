import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Price } from '@/components/ui/Price'
import {
  attivoPrincipale,
  etichettaCategoria,
  formatQuantita,
  productPath,
  tagLavorazione,
  type Cannabinoide,
  type Product,
} from '@/data/products'
import { useCart } from '@/lib/cart'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

/**
 * Card prodotto: foto, badge, nome (Anton), profilo aromatico, prezzo + prezzo/g,
 * disponibilità e "Aggiungi al carrello" a contorno. Solo UI.
 */
export function ProductCard({
  product,
  evidenzia,
  percentuale = 'titolo',
  className,
}: {
  product: Product
  /** Cannabinoide da mostrare al posto del principale (segue il filtro) */
  evidenzia?: Cannabinoide | null
  /** Dove finisce la percentuale: dopo il nome (A) o come sottotitolo giallo (B) */
  percentuale?: 'titolo' | 'sottotitolo'
  className?: string
}) {
  const { add } = useCart()
  const attivo = attivoPrincipale(product, evidenzia)
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-card bg-surface ring-1 ring-line transition duration-300 ease-out-soft ring-inset hover:-translate-y-1 hover:ring-primary/40',
        className,
      )}
    >
      <Link
        to={productPath(product.slug)}
        className="relative block aspect-[4/3] overflow-hidden bg-brand-800"
      >
        <img
          src={asset(product.image)}
          alt={`${product.name}, ${etichettaCategoria(product)}`}
          loading="lazy"
          className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {product.badges && (
          <span className="absolute top-3 left-3 flex gap-1.5">
            {product.badges.map((b) => (
              <Badge key={b} variant={b === 'Limited drop' ? 'outline' : 'solid'}>
                {b}
              </Badge>
            ))}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-h3 text-pretty">
            <Link to={productPath(product.slug)} className="transition hocus:text-primary">
              {product.name}
            </Link>
            {attivo && percentuale === 'titolo' && (
              <span className="text-primary"> — {attivo}</span>
            )}
          </h3>
          {attivo && percentuale === 'sottotitolo' && (
            <p className="mt-2 text-[0.875rem] font-bold tracking-attivo text-primary uppercase">
              {attivo}
            </p>
          )}
          <p className="mt-1.5 label text-[0.6875rem] text-fg-muted">{product.aroma.join(' / ')}</p>
          <p className="mt-1.5 label text-[0.625rem] text-fg-muted">{tagLavorazione(product)}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <Price cents={product.price} compareAt={product.compareAt} grams={product.grams} />
          <span className="label text-[0.6875rem] text-fg-muted">{formatQuantita(product)}</span>
        </div>
        <div className="mt-auto flex flex-col gap-2.5 pt-1">
          <Badge variant={product.inStock ? 'stock' : 'soldout'} className="px-0">
            {product.inStock ? 'Disponibile' : 'Esaurito — avvisami'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => product.inStock && add(product)}
          >
            {product.inStock ? 'Aggiungi al carrello' : 'Avvisami al restock'}
          </Button>
        </div>
      </div>
    </article>
  )
}
