import { cn } from '@/lib/cn'

export type Block = {
  /** Etichetta scritta dentro il blocco */
  label: string
  /** Altezza del blocco in unità (1 ≈ 12px) */
  h?: number
  /** Numero di colonne affiancate */
  cols?: number
  /** `strong` = blocco importante (giallo), `image` = area foto */
  tone?: 'plain' | 'strong' | 'image'
}

/**
 * Schizzo di una pagina: rettangoli impilati che mostrano com'è composta.
 * Serve a decidere la struttura prima di disegnare i dettagli.
 */
export function Wireframe({
  title,
  status,
  blocks,
  className,
}: {
  title: string
  status: 'fatta' | 'da-fare'
  blocks: Block[]
  className?: string
}) {
  const isDone = status === 'fatta'
  return (
    <figure
      className={cn(
        'flex flex-col overflow-hidden rounded-card bg-surface ring-1 ring-inset',
        isDone ? 'ring-primary/40' : 'ring-line',
        className,
      )}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="label text-[0.75rem]">{title}</span>
        <span
          className={cn(
            'rounded-badge px-2 py-0.5 label text-[0.625rem]',
            isDone ? 'bg-primary text-primary-fg' : 'text-fg-muted ring-1 ring-line ring-inset',
          )}
        >
          {isDone ? 'Fatta' : 'Da fare'}
        </span>
      </figcaption>

      <div className="flex flex-col gap-1.5 bg-bg p-3" aria-hidden="true">
        {blocks.map((b, i) => {
          const cols = b.cols ?? 1
          return (
            <div key={`${b.label}-${i}`} className="flex gap-1.5">
              {Array.from({ length: cols }, (_, c) => (
                <div
                  key={c}
                  style={{ height: `${(b.h ?? 2) * 12}px` }}
                  className={cn(
                    'flex flex-1 items-center justify-center overflow-hidden rounded-sm px-2 text-center',
                    b.tone === 'strong' && 'bg-primary/90 text-primary-fg',
                    b.tone === 'image' && 'bg-fg/12 text-fg-muted',
                    (!b.tone || b.tone === 'plain') && 'bg-bg-alt text-fg-muted',
                  )}
                >
                  {c === 0 && (
                    <span className="truncate label text-[0.5625rem] leading-none">{b.label}</span>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </figure>
  )
}
