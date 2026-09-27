import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { home } from '@/data/home'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

const slides = home.story.slides

/**
 * Le cinque tappe della filiera, una alla volta.
 * Scorre da sola ogni sei secondi; frecce e puntini per andare avanti a mano.
 */
export function Filiera() {
  const [i, setI] = useState(0)
  const vai = (n: number) => setI((n + slides.length) % slides.length)

  useEffect(() => {
    const fermo = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (fermo) return
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-line ring-inset lg:aspect-square">
      {slides.map((s, n) => (
        <div
          key={s.titolo}
          aria-hidden={n !== i}
          className={cn(
            'absolute inset-0 transition-opacity duration-700 ease-out-soft',
            n === i ? 'opacity-100' : 'opacity-0',
          )}
        >
          <img
            src={asset(s.image)}
            alt={`${s.titolo}: ${s.testo}`}
            loading="lazy"
            className="size-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/80 to-transparent p-6 pt-16">
            <p className="label text-[0.625rem] text-primary">
              {n + 1} / {slides.length} · {s.titolo}
            </p>
            <p className="mt-2 max-w-sm text-pretty text-fg">{s.testo}</p>
          </div>
        </div>
      ))}

      {/* comandi */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
        <div className="flex gap-1.5">
          {slides.map((s, n) => (
            <button
              key={s.titolo}
              type="button"
              onClick={() => vai(n)}
              aria-label={`Vai al passaggio ${n + 1}: ${s.titolo}`}
              aria-current={n === i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 ease-out-soft',
                n === i ? 'w-7 bg-primary' : 'w-3 bg-fg/30 hocus:bg-fg/60',
              )}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <Freccia label="Passaggio precedente" onClick={() => vai(i - 1)}>
            <ArrowLeft className="size-4" />
          </Freccia>
          <Freccia label="Passaggio successivo" onClick={() => vai(i + 1)}>
            <ArrowRight className="size-4" />
          </Freccia>
        </div>
      </div>
    </div>
  )
}

function Freccia({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full bg-bg/70 text-fg backdrop-blur transition duration-200 ease-out-soft hocus:bg-primary hocus:text-primary-fg"
    >
      {children}
    </button>
  )
}
