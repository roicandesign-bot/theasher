import { ArrowDown } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { categorie } from '@/data/products'
import { asset } from '@/lib/asset'

type Granello = {
  tx: number
  ty: number
  x: number
  y: number
  vx: number
  vy: number
  lato: number
  alfa: number
  seme: number
  /** direzione in cui vola via scorrendo */
  fuga: number
  bianco: boolean
}

/**
 * Apertura «Resina»: il logo è fatto di migliaia di granelli gialli che salgono dal basso come
 * fumo e si compongono. Il cursore (o il dito) li spinge via; scorrendo la pagina si sciolgono
 * verso l'alto e lasciano il posto al sito. Con «riduci movimento» il logo resta fermo, composto.
 */
export function IntroResina() {
  const sezione = useRef<HTMLElement>(null)
  const tela = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = tela.current
    const box = sezione.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !box || !ctx) return

    let W = 0
    let H = 0
    let granelli: Granello[] = []
    const cursore = { x: -9999, y: -9999 }
    let fotogramma = 0
    let inVista = true
    let attesaResize = 0

    const logo = new Image()
    logo.src = asset('brand/logo-acid.png')

    const costruisci = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = r.width
      H = r.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // area del logo e campionamento dei pixel pieni
      const lw = Math.min(W * (W < 640 ? 0.9 : 0.66), 880)
      const lh = (lw * 631) / 1021
      const ox = (W - lw) / 2
      const oy = H * 0.44 - lh / 2
      const fuori = document.createElement('canvas')
      fuori.width = Math.round(lw)
      fuori.height = Math.round(lh)
      const f = fuori.getContext('2d', { willReadFrequently: true })
      if (!f) return
      f.drawImage(logo, 0, 0, fuori.width, fuori.height)
      const dati = f.getImageData(0, 0, fuori.width, fuori.height).data
      const passo = 3
      const punti: [number, number][] = []
      for (let y = 0; y < fuori.height; y += passo) {
        for (let x = 0; x < fuori.width; x += passo) {
          if (dati[(y * fuori.width + x) * 4 + 3]! > 140) punti.push([x, y])
        }
      }
      // tetto al numero di granelli: fluido anche sui telefoni
      const massimo = W < 640 ? 3200 : 9000
      while (punti.length > massimo) punti.splice(Math.floor(Math.random() * punti.length), 1)

      granelli = punti.map(([x, y]) => ({
        tx: ox + x + (Math.random() - 0.5) * passo,
        ty: oy + y + (Math.random() - 0.5) * passo,
        x: reduced ? ox + x : Math.random() * W,
        y: reduced ? oy + y : H + Math.random() * H * 0.8,
        vx: 0,
        vy: 0,
        lato: 0.9 + Math.random() * (W < 640 ? 1.4 : 1.7),
        alfa: 0.35 + Math.random() * 0.65,
        seme: Math.random() * 1000,
        fuga: Math.random(),
        bianco: Math.random() < 0.05,
      }))
    }

    const disegna = (t: number) => {
      const r = box.getBoundingClientRect()
      // 0 = fermo in cima, 1 = sezione quasi uscita dallo schermo
      const sciolto = reduced ? 0 : Math.min(1, Math.max(0, -r.top / (r.height * 0.75)))
      ctx.clearRect(0, 0, W, H)
      const raggio = W < 640 ? 70 : 110
      const r2 = raggio * raggio

      for (const g of granelli) {
        let tx = g.tx + Math.sin(t * 0.0011 + g.seme) * 0.9
        let ty = g.ty + Math.cos(t * 0.0013 + g.seme * 1.7) * 0.9
        if (sciolto > 0) {
          ty -= sciolto * H * (0.35 + g.fuga * 0.9)
          tx += sciolto * (g.fuga - 0.5) * W * 0.6
        }
        if (!reduced) {
          const dx = g.x - cursore.x
          const dy = g.y - cursore.y
          const d2 = dx * dx + dy * dy
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 1
            const forza = (1 - d2 / r2) * 7
            g.vx += (dx / d) * forza
            g.vy += (dy / d) * forza
          }
          g.vx = (g.vx + (tx - g.x) * 0.04) * 0.85
          g.vy = (g.vy + (ty - g.y) * 0.04) * 0.85
          g.x += g.vx
          g.y += g.vy
        } else {
          g.x = tx
          g.y = ty
        }
        const scintilla = g.bianco ? 0.5 + 0.5 * Math.sin(t * 0.004 + g.seme) : 1
        ctx.globalAlpha = g.alfa * scintilla * (1 - sciolto)
        ctx.fillStyle = g.bianco ? '#ffffff' : '#dfff00'
        ctx.fillRect(g.x, g.y, g.lato, g.lato)
      }
      ctx.globalAlpha = 1
    }

    const giro = (t: number) => {
      if (inVista) disegna(t)
      fotogramma = requestAnimationFrame(giro)
    }

    const avvia = () => {
      costruisci()
      cancelAnimationFrame(fotogramma)
      if (reduced) disegna(0)
      else fotogramma = requestAnimationFrame(giro)
    }
    if (logo.complete) avvia()
    else logo.onload = avvia

    const muovi = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      cursore.x = e.clientX - r.left
      cursore.y = e.clientY - r.top
    }
    const esci = () => {
      cursore.x = -9999
      cursore.y = -9999
    }
    const ridimensiona = () => {
      window.clearTimeout(attesaResize)
      attesaResize = window.setTimeout(avvia, 200)
    }
    const osservatore = new IntersectionObserver(([e]) => {
      inVista = !!e?.isIntersecting
    })
    osservatore.observe(box)
    box.addEventListener('pointermove', muovi)
    box.addEventListener('pointerleave', esci)
    window.addEventListener('resize', ridimensiona)

    return () => {
      cancelAnimationFrame(fotogramma)
      window.clearTimeout(attesaResize)
      osservatore.disconnect()
      box.removeEventListener('pointermove', muovi)
      box.removeEventListener('pointerleave', esci)
      window.removeEventListener('resize', ridimensiona)
    }
  }, [reduced])

  const vaiAlSito = () =>
    document.getElementById('dopo-intro')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })

  return (
    <section
      ref={sezione}
      aria-label="The Hasher"
      className="relative h-[calc(100svh-7.5rem)] min-h-[32rem] overflow-hidden bg-bg"
    >
      <canvas ref={tela} aria-hidden="true" className="absolute inset-0 size-full touch-pan-y" />
      {/* foschia sotto il logo: dà profondità ai granelli */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_55%_70%_at_50%_100%,rgb(223_255_0/0.07),transparent_70%)]"
      />

      <div className="pointer-events-none relative flex h-full flex-col justify-between px-gutter py-6 md:py-8">
        <p className="label text-[0.6875rem] text-primary">
          Selected in Europe. Made for those who know.
        </p>

        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="label text-[0.625rem] text-fg-muted">Ora in negozio</p>
            <ParolaDecodificata
              parole={Object.values(categorie)}
              className="mt-1 block font-display text-[clamp(2rem,1.2rem+3vw,3.5rem)] leading-none text-fg uppercase"
            />
          </div>
          <p className="hidden max-w-[14rem] text-right text-xs text-fg-muted md:block">
            Passa il cursore sul logo: è fatto di granelli.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={vaiAlSito}
        aria-label="Scorri al sito"
        className="group absolute bottom-6 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-bg/50 text-primary ring-2 ring-primary backdrop-blur transition duration-300 ease-out-soft ring-inset md:bottom-8 md:size-16 hocus:bg-primary hocus:text-primary-fg"
      >
        <ArrowDown aria-hidden="true" className="size-6 motion-safe:animate-bounce" />
      </button>
      <div id="dopo-intro" className="absolute bottom-0 scroll-mt-20" />
    </section>
  )
}

const SEGNI = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%+/'

/** Parola che si «decodifica» lettera per lettera e cambia ogni 2,4 secondi. */
function ParolaDecodificata({ parole, className }: { parole: string[]; className?: string }) {
  const reduced = useReducedMotion()
  const [indice, setIndice] = useState(0)
  const [testo, setTesto] = useState(parole[0] ?? '')

  useEffect(() => {
    const id = window.setInterval(() => setIndice((i) => (i + 1) % parole.length), 2400)
    return () => window.clearInterval(id)
  }, [parole.length])

  useEffect(() => {
    const finale = parole[indice] ?? ''
    if (reduced) return
    let passo = 0
    const passi = 14
    const id = window.setInterval(() => {
      passo += 1
      const fatte = Math.floor((passo / passi) * finale.length)
      setTesto(
        finale
          .split('')
          .map((c, i) => (i < fatte ? c : SEGNI[Math.floor(Math.random() * SEGNI.length)]))
          .join(''),
      )
      if (passo >= passi) window.clearInterval(id)
    }, 40)
    return () => window.clearInterval(id)
  }, [indice, parole, reduced])

  return (
    <>
      <span aria-hidden="true" className={className}>
        {reduced ? parole[indice] : testo}
      </span>
      <span className="sr-only">{parole.join(', ')}</span>
    </>
  )
}
