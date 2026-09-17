import { Expand, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

type Image = { src: string; alt: string }

/**
 * Galleria prodotto: immagine grande + miniature.
 * Clic sull'immagine (o sul bottone lente) apre lo zoom a schermo intero; Esc chiude.
 */
export function ProductGallery({ images }: { images: Image[] }) {
  const [current, setCurrent] = useState(0)
  const [zoom, setZoom] = useState(false)
  const image = images[current]!

  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoom])

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-card bg-brand-800 ring-1 ring-line ring-inset">
        <button
          type="button"
          onClick={() => setZoom(true)}
          className="block w-full cursor-zoom-in"
          aria-label={`Ingrandisci: ${image.alt}`}
        >
          <img
            src={asset(image.src)}
            alt={image.alt}
            className="aspect-square w-full object-cover"
            fetchPriority="high"
          />
        </button>
        <Badge variant="muted" className="pointer-events-none absolute bottom-3 left-3">
          Foto demo
        </Badge>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-bg/70 text-primary backdrop-blur"
        >
          <Expand className="size-4" />
        </span>
      </div>

      <ul className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={img.alt}
              aria-current={i === current}
              className={cn(
                'block w-full overflow-hidden rounded-md ring-1 transition duration-200 ease-out-soft',
                i === current ? 'ring-2 ring-primary' : 'ring-line hocus:ring-line-strong',
              )}
            >
              <img
                src={asset(img.src)}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          className="fixed inset-0 z-50 grid fade-in place-items-center bg-bg/95 p-4 backdrop-blur"
          onClick={() => setZoom(false)}
        >
          <img
            src={asset(image.src)}
            alt={image.alt}
            className="max-h-[85svh] w-auto rounded-card object-contain"
          />
          <button
            type="button"
            onClick={() => setZoom(false)}
            aria-label="Chiudi"
            className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-surface text-fg ring-1 ring-line transition hocus:text-primary"
          >
            <X className="size-5" />
          </button>
        </div>
      )}
    </div>
  )
}
