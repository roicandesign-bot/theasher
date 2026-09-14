import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

type StrokePatternProps = {
  /** Colore del tratto: giallo su nero o nero su giallo */
  tone?: 'primary' | 'dark'
  className?: string
  /** Porzione del logo da mostrare (posizione della maschera) */
  position?: string
  /** Ingrandimento della maschera */
  scale?: string
}

/**
 * Pattern grafico del brand: porzioni ingrandite dei tratti calligrafici del logo,
 * usate come maschera. Puramente decorativo (aria-hidden), mai sopra il testo.
 */
export function StrokePattern({
  tone = 'primary',
  className,
  position = '30% 40%',
  scale = '260%',
}: StrokePatternProps) {
  const mask = `url(${asset('brand/logo-acid.png')})`
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        tone === 'primary' ? 'bg-primary' : 'bg-bg',
        className,
      )}
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: scale,
        maskSize: scale,
        WebkitMaskPosition: position,
        maskPosition: position,
      }}
    />
  )
}
