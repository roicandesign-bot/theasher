import { cn } from '@/lib/cn'

import { formatPrice } from '@/lib/money'

type PriceProps = {
  /** in centesimi */
  cents: number
  /** prezzo precedente barrato, in centesimi */
  compareAt?: number
  /** grammi del formato: mostra il prezzo al grammo */
  grams?: number
  size?: 'md' | 'lg'
  className?: string
}

/** Prezzo in giallo, prezzo precedente barrato, prezzo al grammo sempre visibile. */
export function Price({ cents, compareAt, grams, size = 'md', className }: PriceProps) {
  return (
    <p className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <span className={cn('font-semibold text-primary', size === 'lg' ? 'text-3xl' : 'text-price')}>
        {formatPrice(cents)}
      </span>
      {compareAt && compareAt > cents && (
        <s className="text-sm text-fg-muted">{formatPrice(compareAt)}</s>
      )}
      {grams && (
        <span className="label text-[0.6875rem] text-fg-muted">
          {formatPrice(Math.round(cents / grams))}/g
        </span>
      )}
    </p>
  )
}
