import { X } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { fasceForza, forze, type Forza } from '@/data/products'
import { cn } from '@/lib/cn'
import { conta, contaAttivi, gruppiPer, ordinamenti, type Filtri, type Ordine } from '@/lib/filtri'

type Props = {
  open: boolean
  filtri: Filtri
  /** Quanti prodotti rispettano i filtri adesso */
  risultati: number
  onClose: () => void
  /** Cambia un filtro: null lo toglie */
  onSet: (key: string, value: string | null) => void
  onReset: () => void
}

/**
 * Pannello dei filtri: foglio a tutto schermo dal basso su telefono,
 * colonna laterale su desktop. Un gruppo per asse, solo quelli che
 * hanno senso per la categoria scelta, con il numero di prodotti dietro ogni voce.
 */
export function FilterSheet({ open, filtri, risultati, onClose, onSet, onReset }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const gruppi = gruppiPer(filtri.categoria)
  const attivi = contaAttivi(filtri)

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filtri"
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex max-h-[88svh] flex-col rounded-t-card border-t border-line bg-bg transition-transform duration-300 ease-out-soft md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[27rem] md:rounded-none md:border-t-0 md:border-l',
          open
            ? 'translate-y-0 md:translate-x-0'
            : 'translate-y-full md:translate-x-full md:translate-y-0',
        )}
      >
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <p className="label text-[0.75rem]">Filtri {attivi > 0 && `(${attivi})`}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi filtri"
            className="inline-grid size-11 place-items-center rounded-full text-fg transition hocus:text-primary"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-5 py-6">
          <Gruppo titolo="Ordina per">
            {(Object.keys(ordinamenti) as Ordine[]).map((k) => (
              <Chip
                key={k}
                size="sm"
                active={filtri.ordine === k}
                onClick={() => onSet('ordine', k === 'novita' ? null : k)}
              >
                {ordinamenti[k]}
              </Chip>
            ))}
          </Gruppo>

          {gruppi.map((g) => (
            <Gruppo
              key={`${g.key}-${g.titolo}`}
              titolo={g.titolo}
              nota={g.nota}
              onAzzera={filtri[g.key] ? () => onSet(g.key, null) : undefined}
            >
              {g.opzioni.map((o) => {
                const n = conta(filtri, { [g.key]: o })
                const attivo = filtri[g.key] === o
                return (
                  <Chip
                    key={o}
                    size="sm"
                    count={n}
                    disabled={n === 0 && !attivo}
                    active={attivo}
                    onClick={() => onSet(g.key, attivo ? null : o)}
                  >
                    {g.key === 'forza' ? etichettaForza(o) : o}
                  </Chip>
                )
              })}
            </Gruppo>
          ))}

          <Gruppo titolo="Selezioni">
            {(['New', 'Best seller', 'Limited drop'] as const).map((b) => {
              const attivo = filtri.badge === b
              const n = conta(filtri, { badge: b })
              return (
                <Chip
                  key={b}
                  size="sm"
                  count={n}
                  disabled={n === 0 && !attivo}
                  active={attivo}
                  onClick={() => onSet('badge', attivo ? null : b)}
                >
                  {b === 'New' ? 'Novità' : b}
                </Chip>
              )
            })}
          </Gruppo>

          <Gruppo titolo="Disponibilità">
            <Chip
              size="sm"
              count={conta(filtri, { disponibili: true })}
              active={filtri.disponibili}
              onClick={() => onSet('disponibili', filtri.disponibili ? null : 'si')}
            >
              Solo disponibili
            </Chip>
          </Gruppo>
        </div>

        <footer className="flex items-center gap-3 border-t border-line px-5 py-4">
          <button
            type="button"
            onClick={onReset}
            className="shrink-0 px-1 label text-[0.6875rem] text-fg-muted underline transition hocus:text-primary"
          >
            Azzera
          </button>
          <Button onClick={onClose} className="flex-1">
            {risultati === 0
              ? 'Nessun prodotto'
              : `Mostra ${risultati} ${risultati === 1 ? 'prodotto' : 'prodotti'}`}
          </Button>
        </footer>
      </aside>
    </>
  )
}

function Gruppo({
  titolo,
  nota,
  onAzzera,
  children,
}: {
  titolo: string
  nota?: string
  onAzzera?: () => void
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="label text-[0.6875rem] text-fg">
          {titolo}
          {nota && <span className="ml-2 text-[0.625rem] text-fg-subtle normal-case">{nota}</span>}
        </h3>
        {onAzzera && (
          <button
            type="button"
            onClick={onAzzera}
            className="text-xs text-fg-muted underline transition hocus:text-primary"
          >
            togli
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </section>
  )
}

/** "Medio" da solo non dice niente: accanto mettiamo la fascia di percentuale. */
function etichettaForza(o: string) {
  const f = forze.includes(o as Forza) ? (o as Forza) : null
  return f ? `${f} · ${fasceForza[f]}` : o
}
