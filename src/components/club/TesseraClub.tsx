import { Logo } from '@/components/ui/Logo'
import { Diamond } from '@/components/ui/Diamond'
import type { LivelloClub } from '@/data/club'
import { cn } from '@/lib/cn'

const finiture: Record<LivelloClub, { fondo: string; testo: string }> = {
  starter: { fondo: 'bg-surface ring-1 ring-line', testo: 'text-fg' },
  member: { fondo: 'bg-bg ring-1 ring-line-strong', testo: 'text-fg' },
  black: { fondo: 'bg-brand-950 ring-1 ring-primary/40', testo: 'text-fg' },
  elite: { fondo: 'bg-primary', testo: 'text-primary-fg' },
}

/**
 * La tessera del Club: formato carta di credito (85,6 × 54 mm), logo, rombo, livello e numero.
 * Decorativa: i dati importanti sono ripetuti nel testo vicino.
 */
export function TesseraClub({
  livello,
  numero,
  nome,
  className,
}: {
  livello: LivelloClub
  numero: string
  nome?: string
  className?: string
}) {
  const f = finiture[livello]
  return (
    <div
      className={cn(
        'relative aspect-[85.6/54] w-full overflow-hidden rounded-[1.1rem] p-[6%] shadow-pop',
        f.fondo,
        f.testo,
        className,
      )}
    >
      <Diamond
        className={cn(
          'absolute top-[9%] right-[7%] size-auto w-[7%]',
          livello === 'elite' && 'fill-primary-fg',
        )}
      />
      <div className="relative flex h-full flex-col">
        <Logo
          variant={livello === 'elite' ? 'black' : 'acid'}
          link={false}
          className="h-[26%] w-auto self-start"
        />
        <p className="mt-auto font-display text-[clamp(1rem,0.6rem+1.6vw,1.6rem)] leading-none uppercase">
          The Hasher Club
        </p>
        <div className="mt-[4%] flex items-end justify-between gap-3">
          <p
            className={cn(
              'label text-[0.625rem] tracking-[0.18em] whitespace-nowrap',
              livello === 'elite' ? 'text-primary-fg' : 'text-primary',
            )}
          >
            {livello} · {numero}
          </p>
          {nome && <p className="truncate label text-[0.625rem] opacity-70">{nome}</p>}
        </div>
      </div>
    </div>
  )
}
