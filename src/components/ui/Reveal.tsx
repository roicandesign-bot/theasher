import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Ritardo in millisecondi: usalo per mettere in sequenza gli elementi di una griglia */
  delay?: number
  className?: string
  /** `up` sale entrando (default), `fade` compare solo in dissolvenza */
  variant?: 'up' | 'fade'
}

/**
 * Fa comparire il contenuto quando entra nello schermo, una volta sola.
 * Con "riduci movimento" attivo il contenuto appare subito, senza animazione.
 */
export function Reveal({ children, delay = 0, className, variant = 'up' }: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: variant === 'up' ? 16 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
