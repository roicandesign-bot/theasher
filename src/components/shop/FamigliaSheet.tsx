import { Check, X } from 'lucide-react'
import { useEffect } from 'react'
import { categorie, fotoFamiglia, type Categoria } from '@/data/products'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

type Props = {
  open: boolean
  scelta: Categoria | null
  /** Quanti prodotti ci sono in ogni famiglia, con gli altri filtri attivi */
  conta: (c: Categoria | null) => number
  onScegli: (c: Categoria | null) => void
  onClose: () => void
}

/**
 * Scelta della famiglia su telefono e tablet: foglio dal basso con i riquadri foto,
 * come il sottomenu Shop. Un tocco sceglie e chiude.
 */
export function FamigliaSheet({ open, scelta, conta, onScegli, onClose }: Props) {
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

  const voci: { id: Categoria | null; label: string; img: string }[] = [
    { id: null, label: 'Tutto', img: fotoFamiglia.tutto },
    ...(Object.keys(categorie) as Categoria[]).map((id) => ({
      id,
      label: categorie[id],
      img: fotoFamiglia[id],
    })),
  ]

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Scegli la famiglia"
        aria-hidden={!open}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex max-h-[88svh] flex-col rounded-t-card border-t border-line bg-bg transition-transform duration-300 ease-out-soft lg:hidden',
          open ? 'translate-y-0' : 'pointer-events-none translate-y-full',
        )}
      >
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
          <p className="label text-[0.75rem]">Scegli la famiglia</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="inline-grid size-11 place-items-center rounded-full text-fg transition hocus:text-primary"
          >
            <X className="size-5" />
          </button>
        </header>
        <ul className="grid grid-cols-2 gap-2 overflow-y-auto px-5 pt-4 pb-8 md:grid-cols-3">
          {voci.map((v) => {
            const attiva = scelta === v.id
            const n = conta(v.id)
            return (
              <li key={v.label} className={cn(v.id === null && 'col-span-2 md:col-span-3')}>
                <button
                  type="button"
                  aria-pressed={attiva}
                  disabled={n === 0 && !attiva}
                  onClick={() => {
                    onScegli(v.id)
                    onClose()
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-card bg-surface p-2 text-left ring-1 transition duration-200 ease-out-soft ring-inset disabled:opacity-40',
                    attiva
                      ? 'text-primary ring-2 ring-primary'
                      : 'text-fg ring-line hocus:ring-primary',
                  )}
                >
                  <img
                    src={asset(v.img)}
                    alt=""
                    loading="lazy"
                    className="size-14 shrink-0 rounded-[0.625rem] object-cover"
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="label text-[0.8125rem]">{v.label}</span>
                    <span className="text-xs text-fg-muted">
                      {n} {n === 1 ? 'prodotto' : 'prodotti'}
                    </span>
                  </span>
                  {attiva && <Check aria-hidden="true" className="mr-1 size-5 shrink-0" />}
                </button>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  )
}
