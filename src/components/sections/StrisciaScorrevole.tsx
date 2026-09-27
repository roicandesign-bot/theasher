import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const VOCI = ['The Hasher', 'Premium CBD', 'Selected in Europe', 'Made for those who know']

/**
 * Striscia tipografica che scivola di lato mentre la pagina scorre.
 * Lettere vuote con il contorno giallo: fa scena senza aggiungere un'altra banda piena.
 */
export function StrisciaScorrevole() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-28%'])

  const riga = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {VOCI.map((v) => (
        <span key={v} className="flex shrink-0 items-center gap-8">
          {v}
          <span aria-hidden="true" className="text-primary">
            ✦
          </span>
        </span>
      ))}
    </span>
  )

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="overflow-hidden border-y border-line bg-bg py-8 select-none md:py-10"
    >
      <motion.div
        style={reduced ? undefined : { x }}
        className="flex w-max font-display text-[clamp(2.75rem,9vw,7rem)] leading-none whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_var(--color-primary)]"
      >
        {riga}
        {riga}
      </motion.div>
    </div>
  )
}
