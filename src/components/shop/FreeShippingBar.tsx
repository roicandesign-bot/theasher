import { site } from '@/data/site'
import { formatPrice } from '@/lib/money'
import { cn } from '@/lib/cn'

/** Barra che mostra quanto manca alla spedizione gratuita. */
export function FreeShippingBar({ subtotal, className }: { subtotal: number; className?: string }) {
  const soglia = site.freeShippingFrom
  const manca = Math.max(0, soglia - subtotal)
  const percentuale = Math.min(100, Math.round((subtotal / soglia) * 100))
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <p className="text-sm">
        {manca > 0 ? (
          <>
            Ti mancano <span className="font-semibold text-primary">{formatPrice(manca)}</span> per
            la spedizione gratuita.
          </>
        ) : (
          <span className="font-semibold text-success">Spedizione gratuita inclusa.</span>
        )}
      </p>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-bg-alt"
        role="progressbar"
        aria-valuenow={percentuale}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso verso la spedizione gratuita"
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-500 ease-out-soft',
            manca > 0 ? 'bg-primary' : 'bg-success',
          )}
          style={{ width: `${percentuale}%` }}
        />
      </div>
    </div>
  )
}
