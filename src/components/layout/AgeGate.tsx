import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { site } from '@/data/site'

const CHIAVE = 'hasher_age_ok'

/**
 * Verifica 18+ al primo accesso. La risposta resta per la sessione del browser.
 * Nel sito vero l'età minima e l'obbligo cambiano per Paese (vedi CountryRule).
 */
export function AgeGate() {
  const [aperto, setAperto] = useState(false)
  const [rifiutato, setRifiutato] = useState(false)

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(CHIAVE)) setAperto(true)
    } catch {
      setAperto(true)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = aperto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aperto])

  if (!aperto) return null

  const conferma = () => {
    try {
      sessionStorage.setItem(CHIAVE, 'si')
    } catch {
      /* niente: la finestra si chiude comunque */
    }
    setAperto(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-titolo"
      className="fixed inset-0 z-[60] grid place-items-center bg-bg/95 p-4 backdrop-blur"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-card bg-surface p-8 text-center ring-1 ring-line ring-inset">
        <Logo link={false} className="h-12" />

        {!rifiutato ? (
          <>
            <div>
              <p className="label text-[0.625rem] text-primary">Verifica età</p>
              <h2 id="age-gate-titolo" className="mt-3 text-h2">
                Hai almeno 18 anni?
              </h2>
              <p className="mt-4 text-fg-muted">
                Questo sito vende prodotti riservati ai maggiorenni. Confermando dichiari di avere
                l’età richiesta nel tuo Paese.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Button size="lg" onClick={conferma}>
                Sì, ho almeno 18 anni
              </Button>
              <Button variant="ghost" onClick={() => setRifiutato(true)}>
                No
              </Button>
            </div>
            <p className="text-xs text-fg-subtle">{site.footer.note}</p>
          </>
        ) : (
          <>
            <div>
              <h2 className="text-h2">Ci dispiace.</h2>
              <p className="mt-4 text-fg-muted">
                Non possiamo mostrarti questo sito. Torna quando avrai l’età richiesta.
              </p>
            </div>
            <Button variant="ghost" onClick={() => setRifiutato(false)}>
              Ho sbagliato a rispondere
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
