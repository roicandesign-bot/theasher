import { ArrowDown, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

/** I due tagli del video: orizzontale per schermi larghi, verticale per il telefono. */
const TAGLI = {
  orizzontale: { nome: 'video/intro-16x9', poster: 'video/intro-16x9-poster.jpg' },
  verticale: { nome: 'video/intro-9x16', poster: 'video/intro-9x16-poster.jpg' },
}

/**
 * Apertura della home: il video di 12 secondi, muto e in loop, a tutta larghezza.
 * Sceglie il taglio in base allo schermo, si mette in pausa con un tasto (WCAG 2.2.2)
 * e, se il sistema chiede meno movimento, parte fermo sull'immagine finale.
 */
export function IntroVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const [verticale, setVerticale] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-aspect-ratio: 4/5)').matches,
  )
  const [inPausa, setInPausa] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-aspect-ratio: 4/5)')
    const cambia = () => setVerticale(mq.matches)
    mq.addEventListener('change', cambia)
    return () => mq.removeEventListener('change', cambia)
  }, [])

  // il video si ricarica quando cambia il taglio: ripartiamo dallo stato giusto
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (inPausa) v.pause()
    else v.play().catch(() => setInPausa(true))
  }, [inPausa, verticale])

  const taglio = verticale ? TAGLI.verticale : TAGLI.orizzontale

  const chiudi = () => {
    setInPausa(true)
    document.getElementById('dopo-intro')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return (
    <section aria-label="The Hasher in 12 secondi" className="relative bg-bg">
      <div
        className={cn(
          'relative mx-auto w-full overflow-hidden',
          verticale
            ? 'aspect-[9/16] max-h-[calc(100svh-7rem)]'
            : 'aspect-video max-h-[calc(100svh-7.5rem)]',
        )}
      >
        <video
          key={taglio.nome}
          ref={video}
          className="size-full object-cover"
          poster={asset(taglio.poster)}
          muted
          loop
          playsInline
          autoPlay={!inPausa}
          preload="auto"
          aria-label="Video: dal seme alla resina, dieci famiglie di prodotti, spediti in tutta Europa"
        >
          {/* MP4 per Safari e Chrome, WebM per i browser senza H.264 */}
          <source src={asset(`${taglio.nome}.mp4`)} type="video/mp4" />
          <source src={asset(`${taglio.nome}.webm`)} type="video/webm" />
        </video>

        <button
          type="button"
          onClick={() => setInPausa((p) => !p)}
          aria-label={inPausa ? 'Riproduci il video' : 'Metti in pausa il video'}
          className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-bg/60 text-fg ring-1 ring-line backdrop-blur transition ring-inset md:right-6 md:bottom-6 hocus:text-primary hocus:ring-primary"
        >
          {inPausa ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>

        {/* cerchio con freccia: chiude l'intro (ferma il video) e porta giù al sito */}
        <button
          type="button"
          onClick={chiudi}
          aria-label="Chiudi l’intro e scorri al sito"
          className="group absolute bottom-5 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-bg/50 text-primary ring-2 ring-primary backdrop-blur transition duration-300 ease-out-soft ring-inset md:bottom-8 md:size-16 hocus:bg-primary hocus:text-primary-fg"
        >
          <ArrowDown
            aria-hidden="true"
            className="size-6 transition-transform duration-300 ease-out-soft group-hover:translate-y-0.5 motion-safe:animate-bounce"
          />
        </button>
      </div>
      <div id="dopo-intro" className="scroll-mt-20" />
    </section>
  )
}
