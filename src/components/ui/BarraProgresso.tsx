import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/** Filo giallo in cima alla pagina che dice quanto manca alla fine. */
export function BarraProgresso() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  if (reduced) return null
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
    />
  )
}
