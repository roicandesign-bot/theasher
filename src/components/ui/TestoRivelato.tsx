import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * Titolo che entra una parola per volta, salendo da sotto una riga invisibile.
 * Con «riduci animazioni» il testo compare e basta.
 */
export function TestoRivelato({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion()
  if (reduced) return <span className={className}>{text}</span>

  const parole = text.split(' ')
  return (
    <span className={cn('inline', className)}>
      {parole.map((parola, i) => (
        <span
          // le parole possono ripetersi: serve anche la posizione
          key={`${parola}-${i}`}
          className="inline-flex overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.65, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
          >
            {parola}
            {i < parole.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
