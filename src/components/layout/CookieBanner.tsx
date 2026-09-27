import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Link } from 'react-router-dom'

const CHIAVE = 'hasher_consensi'

type Consensi = { statistiche: boolean; marketing: boolean }

/**
 * Banner dei consensi con blocco preventivo: finché non si sceglie,
 * statistiche e marketing restano spenti. La scelta resta nel browser.
 */
export function CookieBanner() {
  const [aperto, setAperto] = useState(false)
  const [preferenze, setPreferenze] = useState(false)
  const [scelte, setScelte] = useState<Consensi>({ statistiche: false, marketing: false })

  useEffect(() => {
    try {
      if (!localStorage.getItem(CHIAVE)) setAperto(true)
    } catch {
      setAperto(true)
    }
  }, [])

  const salva = (c: Consensi) => {
    try {
      localStorage.setItem(CHIAVE, JSON.stringify({ ...c, versione: 1, data: Date.now() }))
    } catch {
      /* niente: la scelta vale per questa visita */
    }
    setAperto(false)
  }

  if (!aperto) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/98 backdrop-blur">
      <Container className="flex flex-col gap-4 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 label text-[0.625rem] text-primary">
              <Diamond /> Cookie
            </p>
            <p className="mt-2 text-sm text-fg-muted">
              Usiamo cookie necessari per far funzionare il sito. Statistiche e marketing partono
              solo se dici di sì, e puoi cambiare idea quando vuoi.{' '}
              <Link to="/cookie" className="text-primary underline">
                Leggi la cookie policy
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="ring-1 ring-line ring-inset"
              onClick={() => setPreferenze((v) => !v)}
            >
              Preferenze
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="ring-1 ring-line ring-inset"
              onClick={() => salva({ statistiche: false, marketing: false })}
            >
              Solo necessari
            </Button>
            <Button size="sm" onClick={() => salva({ statistiche: true, marketing: true })}>
              Accetta tutti
            </Button>
          </div>
        </div>

        {preferenze && (
          <div className="flex fade-in flex-col gap-3 border-t border-line pt-4">
            {[
              {
                id: 'necessari' as const,
                titolo: 'Necessari',
                testo: 'Sessione, carrello, sicurezza. Sempre attivi.',
                fisso: true,
              },
              {
                id: 'statistiche' as const,
                titolo: 'Statistiche',
                testo: 'Quali pagine funzionano, in forma aggregata.',
                fisso: false,
              },
              {
                id: 'marketing' as const,
                titolo: 'Marketing',
                testo: 'Misura delle campagne e annunci pertinenti.',
                fisso: false,
              },
            ].map((c) => (
              <label key={c.id} className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-primary"
                  disabled={c.fisso}
                  checked={c.fisso || scelte[c.id as keyof Consensi]}
                  onChange={(e) =>
                    !c.fisso &&
                    setScelte((prev) => ({ ...prev, [c.id]: e.target.checked }) as Consensi)
                  }
                />
                <span>
                  <span className="block font-semibold">{c.titolo}</span>
                  <span className="block text-fg-muted">{c.testo}</span>
                </span>
              </label>
            ))}
            <Button size="sm" className="self-start" onClick={() => salva(scelte)}>
              Salva le preferenze
            </Button>
          </div>
        )}
      </Container>
    </div>
  )
}
