import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/cn'

const CHIAVE = 'hasher_popup_sconto'
const ATTESA = 12_000

/**
 * Invito a creare l'account con la newsletter: 5 % per sei mesi.
 * Compare una volta sola (poi resta memorizzato nel browser), dopo dodici secondi
 * e solo quando verifica dell'età e consensi sono già stati dati, per non accavallarsi.
 * Solo UI: il modulo non invia niente.
 */
export function PopupSconto() {
  const [aperto, setAperto] = useState(false)
  const [fatto, setFatto] = useState(false)

  useEffect(() => {
    let visto = true
    try {
      visto =
        localStorage.getItem(CHIAVE) === 'si' ||
        sessionStorage.getItem('hasher_age_ok') !== 'si' ||
        localStorage.getItem('hasher_consensi') === null
    } catch {
      /* browser senza memoria: niente popup */
    }
    if (visto) return
    const t = setTimeout(() => setAperto(true), ATTESA)
    return () => clearTimeout(t)
  }, [])

  const chiudi = () => {
    setAperto(false)
    try {
      localStorage.setItem(CHIAVE, 'si')
    } catch {
      /* niente */
    }
  }

  useEffect(() => {
    if (!aperto) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && chiudi()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [aperto])

  if (!aperto) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-sconto-titolo"
      className="fixed inset-0 z-[58] grid place-items-end p-4 sm:place-items-center"
    >
      <button
        type="button"
        aria-label="Chiudi"
        onClick={chiudi}
        className="absolute inset-0 -z-10 bg-bg/80 backdrop-blur-sm"
      />
      <div
        className={cn(
          'relative w-full max-w-md overflow-hidden rounded-card bg-bg-alt ring-1 ring-line',
          'animate-[fade-up_0.4s_var(--ease-out-soft)_both]',
        )}
      >
        <button
          type="button"
          onClick={chiudi}
          aria-label="Chiudi"
          className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full text-primary-fg transition hocus:bg-primary-fg/10"
        >
          <X className="size-5" />
        </button>

        <div className="bg-primary px-6 py-5 text-primary-fg">
          <p className="label text-[0.625rem]">Newsletter</p>
          <p className="mt-1 font-display text-display leading-none">−5%</p>
          <p className="mt-1 label text-[0.75rem]">per i prossimi 6 mesi</p>
        </div>

        {fatto ? (
          <div className="flex flex-col gap-3 p-6">
            <h2 id="popup-sconto-titolo" className="text-h3">
              Ci siamo.
            </h2>
            <p className="text-fg-muted">
              Ti abbiamo mandato una mail per completare l’account. Il codice sconto arriva lì
              dentro.
            </p>
            <Button variant="outline" onClick={chiudi} className="mt-2 self-start">
              Chiudi
            </Button>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4 p-6"
            onSubmit={(e) => {
              e.preventDefault()
              setFatto(true)
              try {
                localStorage.setItem(CHIAVE, 'si')
              } catch {
                /* niente */
              }
            }}
          >
            <h2 id="popup-sconto-titolo" className="text-h3">
              Crea l’account, prendi il 5 %.
            </h2>
            <p className="text-fg-muted">
              Iscriviti alla newsletter mentre crei il tuo account: 5 % di sconto su tutti gli
              ordini per i prossimi sei mesi. Niente spam, solo drop e analisi.
            </p>
            <label htmlFor="popup-email" className="sr-only">
              Email
            </label>
            <Input id="popup-email" type="email" autoComplete="email" placeholder="La tua email" />
            <Button type="submit" size="lg">
              Crea account e attiva il 5 %
            </Button>
            <button
              type="button"
              onClick={chiudi}
              className="self-center text-xs text-fg-muted underline transition hocus:text-primary"
            >
              No grazie, continuo a guardare
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
