import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Sposta il contenuto più lentamente della pagina mentre si scorre.
 * Va messo dentro un contenitore con overflow nascosto, e il contenuto
 * deve essere un po' più grande (es. `scale-110`) per non lasciare bordi vuoti.
 */
export function Parallax({
  children,
  distanza = 48,
  className,
}: {
  children: ReactNode
  /** Quanti pixel di scarto, sopra e sotto */
  distanza?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distanza, -distanza])

  if (reduced)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
