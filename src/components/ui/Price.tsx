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
  /** `dark` = da usare sui fondi gialli: prezzo e note in nero */
  tone?: 'primary' | 'dark'
  className?: string
}

/** Prezzo in evidenza, prezzo precedente barrato, prezzo al grammo sempre visibile. */
export function Price({
  cents,
  compareAt,
  grams,
  size = 'md',
  tone = 'primary',
  className,
}: PriceProps) {
  const onYellow = tone === 'dark'
  return (
    <p className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <span
        className={cn(
          'font-semibold',
          onYellow ? 'text-primary-fg' : 'text-primary',
          size === 'lg' ? 'text-3xl' : 'text-price',
        )}
      >
        {formatPrice(cents)}
      </span>
      {compareAt && compareAt > cents && (
        <s className={cn('text-sm', onYellow ? 'text-primary-fg/60' : 'text-fg-muted')}>
          {formatPrice(compareAt)}
        </s>
      )}
      {grams && (
        <span
          className={cn(
            'label text-[0.6875rem]',
            onYellow ? 'text-primary-fg/70' : 'text-fg-muted',
          )}
        >
          {formatPrice(Math.round(cents / grams))}/g
        </span>
      )}
    </p>
  )
}
