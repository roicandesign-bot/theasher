import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Price } from '@/components/ui/Price'
import { categories, productPath, type Product } from '@/data/products'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

/**
 * Card prodotto: foto, badge, nome (Anton), profilo aromatico, prezzo + prezzo/g,
 * disponibilità e "Aggiungi al carrello" a contorno. Solo UI.
 */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-card bg-surface ring-1 ring-line transition ring-inset hocus:ring-line-strong',
        className,
      )}
    >
      <Link
        to={productPath(product.slug)}
        className="relative block aspect-[4/3] overflow-hidden bg-brand-800"
      >
        <img
          src={asset(product.image)}
          alt={`${product.name}, ${categories[product.category].label}`}
          loading="lazy"
          className={cn(
            'size-full transition duration-500 group-hover:scale-[1.03]',
            product.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover',
          )}
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
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={cn('h-0.5 w-6 rounded-full', categories[product.category].color)}
            />
            <span className="label text-[0.625rem] text-fg-muted">
              {categories[product.category].label}
            </span>
          </span>
          <h3 className="mt-1.5 text-h3">
            <Link to={productPath(product.slug)} className="transition hocus:text-primary">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 label text-[0.6875rem] text-fg-muted">
            {product.profile.join(' | ')}
          </p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <Price cents={product.price} compareAt={product.compareAt} grams={product.grams} />
          <span className="label text-[0.6875rem] text-fg-muted">{product.grams} g</span>
        </div>
        <div className="mt-auto flex flex-col gap-2.5 pt-1">
          <Badge variant={product.inStock ? 'stock' : 'soldout'} className="px-0">
            {product.inStock ? 'Disponibile' : 'Esaurito — avvisami'}
          </Badge>
          <Button variant="outline" size="sm" className="w-full">
            {product.inStock ? 'Aggiungi al carrello' : 'Avvisami al restock'}
          </Button>
        </div>
      </div>
    </article>
  )
}
