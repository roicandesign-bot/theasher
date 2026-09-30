import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Diamond } from '@/components/ui/Diamond'
import { prossimoReserve } from '@/data/club'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'
import { caveauInArrivo, CHIAVE_CAVEAU } from '@/lib/intro'

const DURATA_PRESSIONE = 1200 // ms per aprire tenendo premuto
const DURATA_APERTURA = 1150 // ms dall'apertura alla scomparsa del caveau

/**
 * Apertura «Caveau»: la home si apre come una porta blindata.
 * Il logo viene letto da un laser, sotto scorre una griglia di luce; si entra tenendo premuto
 * il rombo, e così si dichiara anche di avere 18 anni (sostituisce la finestra dell'età).
 * Una volta per visita. Tastiera: Invio o Spazio aprono subito. «Riduci movimento»: niente
 * laser né griglia che scorre, apertura in dissolvenza.
 */
export function IntroCaveau() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const [visibile, setVisibile] = useState(() => caveauInArrivo(pathname))
  const [fase, setFase] = useState<'attesa' | 'apertura' | 'rifiuto'>('attesa')
  const [progresso, setProgresso] = useState(0)
  const premuto = useRef(false)
  const avanzamento = useRef(0)
  const ultimo = useRef(0)
  const fotogramma = useRef(0)
  const logo = useRef<HTMLDivElement>(null)
  const bottone = useRef<HTMLButtonElement>(null)

  // pagina ferma sotto il caveau
  useEffect(() => {
    if (!visibile) return
    document.body.style.overflow = 'hidden'
    bottone.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = ''
    }
  }, [visibile])

  useEffect(() => () => cancelAnimationFrame(fotogramma.current), [])

  if (!visibile) return null

  const entra = () => {
    if (fase === 'apertura') return
    premuto.current = false
    cancelAnimationFrame(fotogramma.current)
    avanzamento.current = 1
    setProgresso(1)
    try {
      sessionStorage.setItem('hasher_age_ok', 'si')
      sessionStorage.setItem(CHIAVE_CAVEAU, 'si')
    } catch {
      /* il caveau si apre comunque */
    }
    navigator.vibrate?.(24)
    setFase('apertura')
    window.setTimeout(() => setVisibile(false), reduced ? 350 : DURATA_APERTURA)
  }

  // riempie l'anello finché si tiene premuto, lo svuota se si molla prima
  const ciclo = (t: number) => {
    const dt = ultimo.current ? t - ultimo.current : 16
    ultimo.current = t
    const n = premuto.current
      ? Math.min(1, avanzamento.current + dt / DURATA_PRESSIONE)
      : Math.max(0, avanzamento.current - dt / 450)
    avanzamento.current = n
    setProgresso(n)
    if (premuto.current && n >= 1) return entra()
    if (!premuto.current && n <= 0) return
    fotogramma.current = requestAnimationFrame(ciclo)
  }
  const inizia = () => {
    premuto.current = true
    ultimo.current = 0
    cancelAnimationFrame(fotogramma.current)
    fotogramma.current = requestAnimationFrame(ciclo)
  }
  const molla = () => {
    if (!premuto.current) return
    premuto.current = false
  }

  // il logo si inclina seguendo il puntatore (solo mouse, niente su «riduci movimento»)
  const inclina = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse' || !logo.current) return
    const x = e.clientX / window.innerWidth - 0.5
    const y = e.clientY / window.innerHeight - 0.5
    logo.current.style.transform = `perspective(900px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`
  }

  const apertura = fase === 'apertura'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="caveau-titolo"
      onPointerMove={inclina}
      className="fixed inset-0 z-[70] overflow-hidden text-fg select-none"
    >
      {/* Metà alta: cielo con la foschia gialla sull'orizzonte */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-1/2 bg-bg transition-transform duration-[800ms] ease-in-out-soft',
          apertura && (reduced ? 'opacity-0' : '-translate-y-full delay-[250ms]'),
        )}
      >
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgb(223_255_0/0.12),transparent_70%)]" />
      </div>
      {/* Metà bassa: griglia di luce in prospettiva che scorre verso chi guarda */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-bg transition-transform duration-[800ms] ease-in-out-soft',
          apertura && (reduced ? 'opacity-0' : 'translate-y-full delay-[250ms]'),
        )}
      >
        {/* la foschia continua sotto l'orizzonte: nessuno stacco tra le due metà */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgb(223_255_0/0.12),transparent_70%)]" />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_top,black_20%,transparent_95%)] [perspective:520px]">
          <div
            className={cn(
              'absolute -inset-x-1/2 bottom-0 h-[220%] origin-bottom [transform:rotateX(64deg)]',
              'bg-[linear-gradient(to_right,rgb(223_255_0/0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgb(223_255_0/0.16)_1px,transparent_1px)] bg-[size:72px_72px]',
              !reduced && 'animate-[griglia_2.6s_linear_infinite]',
            )}
          />
        </div>
      </div>
      {/* La linea di giunzione che si accende quando la porta si apre */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 top-1/2 h-px origin-center bg-primary shadow-[0_0_24px_4px_rgb(223_255_0/0.6)] transition-transform duration-300 ease-out-soft',
          apertura && !reduced ? 'scale-x-100' : 'scale-x-0',
        )}
      />

      {/* Contenuto */}
      <div
        className={cn(
          'relative flex h-full flex-col px-gutter py-6 transition duration-300 ease-out-soft md:py-8',
          apertura && 'scale-105 opacity-0',
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 label text-[0.6875rem] text-primary">
            <span
              aria-hidden="true"
              className={cn('size-1.5 rounded-full bg-primary', !reduced && 'animate-pulse')}
            />
            Accesso riservato
          </p>
          <p className="rounded-full px-2.5 py-1 label text-[0.625rem] ring-1 ring-line-strong">
            18+
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center md:gap-10">
          <h2 id="caveau-titolo" className="sr-only">
            The Hasher. Accesso riservato ai maggiorenni.
          </h2>
          <div
            ref={logo}
            className="relative w-[min(80vw,34rem)] transition-transform duration-500 ease-out-soft will-change-transform"
          >
            <img
              src={asset('brand/logo-acid.png')}
              alt=""
              width={1021}
              height={631}
              draggable={false}
              className={cn(
                'w-full',
                !reduced && 'animate-[scan-rivela_1.7s_var(--ease-in-out-soft)_both]',
              )}
            />
            {/* riflesso che passa sulle lettere, a intervalli */}
            {!reduced && (
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-[riflesso_5s_ease-in-out_2.2s_infinite] bg-[linear-gradient(105deg,transparent_40%,rgb(255_255_255/0.75)_50%,transparent_60%)] bg-[length:250%_100%] bg-no-repeat mix-blend-overlay"
                style={{
                  WebkitMaskImage: `url(${asset('brand/logo-acid.png')})`,
                  maskImage: `url(${asset('brand/logo-acid.png')})`,
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
              />
            )}
            {/* il laser che legge il logo */}
            {!reduced && (
              <div
                aria-hidden="true"
                className="absolute -inset-x-[12%] top-0 h-px animate-[scan-linea_1.7s_var(--ease-in-out-soft)_both] bg-primary shadow-[0_0_18px_3px_rgb(223_255_0/0.7)]"
              />
            )}
          </div>

          {fase !== 'rifiuto' ? (
            <div className="flex flex-col items-center gap-4">
              <button
                ref={bottone}
                type="button"
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId)
                  inizia()
                }}
                onPointerUp={molla}
                onPointerCancel={molla}
                onLostPointerCapture={molla}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    entra()
                  }
                }}
                onContextMenu={(e) => e.preventDefault()}
                aria-describedby="caveau-legale"
                className="group relative grid size-24 touch-none place-items-center rounded-full md:size-28"
              >
                <span className="sr-only">Entra: dichiaro di avere almeno 18 anni</span>
                <svg
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                  className="absolute inset-0 -rotate-90"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    strokeWidth="1.5"
                    className="stroke-line-strong"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="stroke-primary"
                    strokeDasharray="289"
                    strokeDashoffset={289 * (1 - progresso)}
                  />
                </svg>
                <span
                  aria-hidden="true"
                  className="absolute inset-3 rounded-full bg-primary transition-transform duration-100"
                  style={{ transform: `scale(${progresso})`, opacity: 0.12 + progresso * 0.88 }}
                />
                <Diamond
                  className={cn(
                    'relative size-8 transition-transform duration-300 ease-out-soft group-hover:scale-110',
                    progresso > 0.5 && 'fill-primary-fg',
                  )}
                />
              </button>
              <p aria-hidden="true" className="label text-[0.75rem] tracking-[0.2em]">
                {progresso > 0 && progresso < 1 ? 'Ancora un attimo…' : 'Tieni premuto per entrare'}
              </p>
              <p id="caveau-legale" className="max-w-xs text-xs text-fg-muted">
                Entrando dichiari di avere almeno 18 anni.{' '}
                <button
                  type="button"
                  onClick={() => setFase('rifiuto')}
                  className="underline transition hocus:text-primary"
                >
                  Ho meno di 18 anni
                </button>
              </p>
            </div>
          ) : (
            <div className="flex max-w-sm flex-col items-center gap-4">
              <p className="text-h3">Ci dispiace.</p>
              <p className="text-fg-muted">
                Questo sito è riservato ai maggiorenni. Torna quando avrai l’età richiesta.
              </p>
              <Button variant="ghost" onClick={() => setFase('attesa')}>
                Ho sbagliato a rispondere
              </Button>
            </div>
          )}
        </div>

        <ContoAllaRovescia />
      </div>
    </div>
  )
}

/** Il prossimo lotto Reserve e quanto manca: il dettaglio che fa sentire «dentro». */
function ContoAllaRovescia() {
  const [ora, setOra] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setOra(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const resto = Math.max(0, new Date(prossimoReserve.apre).getTime() - ora)
  const s = Math.floor(resto / 1000)
  const due = (n: number) => String(n).padStart(2, '0')
  const tempo = `${due(Math.floor(s / 86400))}g ${due(Math.floor((s % 86400) / 3600))}h ${due(Math.floor((s % 3600) / 60))}m ${due(s % 60)}s`

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-line pt-4 text-center label text-[0.625rem] text-fg-muted md:justify-between">
      <span>
        Prossimo lotto: <span className="text-fg">{prossimoReserve.nome}</span> ·{' '}
        {prossimoReserve.pezzi} pezzi
      </span>
      <span className="text-primary tabular-nums">
        {resto > 0 ? `Apre ai membri tra ${tempo}` : 'Aperto ora ai membri'}
      </span>
    </div>
  )
}
