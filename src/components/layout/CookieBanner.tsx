import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Link } from 'react-router-dom'

const CHIAVE = 'hasher_consensi'
/** Versione dell'elenco cookie: se cambia, il banner si ripropone. */
const VERSIONE = 1
/** Le linee guida del Garante: la scelta non si richiede prima di 6 mesi. */
const DURATA = 1000 * 60 * 60 * 24 * 182
/** Evento che riapre il banner dal link «Preferenze cookie» nel footer. */
export const APRI_PREFERENZE_COOKIE = 'hasher:preferenze-cookie'

type Consensi = { statistiche: boolean; marketing: boolean }

/**
 * Banner dei consensi con blocco preventivo: finché non si sceglie,
 * statistiche e marketing restano spenti. La scelta resta nel browser per 6 mesi.
 * Linee guida del Garante (10/6/2021): la X chiude e rifiuta, scorrere non è consenso,
 * la scelta si cambia in ogni momento dal footer.
 */
export function CookieBanner() {
  const [aperto, setAperto] = useState(false)
  const [preferenze, setPreferenze] = useState(false)
  const [scelte, setScelte] = useState<Consensi>({ statistiche: false, marketing: false })

  useEffect(() => {
    try {
      const salvata = JSON.parse(localStorage.getItem(CHIAVE) ?? 'null') as {
        versione?: number
        data?: number
      } | null
      const valida =
        salvata &&
        salvata.versione === VERSIONE &&
        (!salvata.data || Date.now() - salvata.data < DURATA)
      if (!valida) setAperto(true)
    } catch {
      setAperto(true)
    }
    const riapri = () => {
      try {
        const salvata = JSON.parse(localStorage.getItem(CHIAVE) ?? 'null') as Consensi | null
        if (salvata)
          setScelte({ statistiche: !!salvata.statistiche, marketing: !!salvata.marketing })
      } catch {
        /* niente */
      }
      setPreferenze(true)
      setAperto(true)
    }
    window.addEventListener(APRI_PREFERENZE_COOKIE, riapri)
    return () => window.removeEventListener(APRI_PREFERENZE_COOKIE, riapri)
  }, [])

  const salva = (c: Consensi) => {
    try {
      localStorage.setItem(CHIAVE, JSON.stringify({ ...c, versione: VERSIONE, data: Date.now() }))
    } catch {
      /* niente: la scelta vale per questa visita */
    }
    setAperto(false)
  }

  if (!aperto) return null

  return (
    <div
      role="dialog"
      aria-label="Preferenze cookie"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/98 backdrop-blur"
    >
      <Container className="relative flex flex-col gap-4 py-5">
        {/* la X equivale a rifiutare: restano solo i cookie tecnici */}
        <button
          type="button"
          aria-label="Chiudi e rifiuta i cookie non necessari"
          onClick={() => salva({ statistiche: false, marketing: false })}
          className="absolute top-2 right-2 grid size-11 place-items-center rounded-full text-fg-muted transition md:right-0 hocus:text-primary"
        >
          <X className="size-5" />
        </button>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="max-w-2xl pr-10 md:pr-0">
            <p className="flex items-center gap-2 label text-[0.625rem] text-primary">
              <Diamond /> Cookie
            </p>
            <p className="mt-2 text-sm text-fg-muted">
              Usiamo cookie tecnici per far funzionare il sito. Statistiche e marketing partono solo
              se dici di sì. Chiudere con la X equivale a rifiutare, e puoi cambiare idea quando
              vuoi dal link «Preferenze cookie» in fondo alla pagina.{' '}
              <Link to="/cookie" className="text-primary underline">
                Leggi la cookie policy
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2 md:pr-12">
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
              Rifiuta
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
