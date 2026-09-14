import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Diamond } from './Diamond'

/** Occhiello di sezione: diamante + etichetta gialla. Uno per sezione. */
export function Eyebrow({
  children,
  className,
  tone = 'primary',
}: {
  children: ReactNode
  className?: string
  tone?: 'primary' | 'dark'
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 label text-eyebrow',
        tone === 'primary' ? 'text-primary' : 'text-primary-fg',
        className,
      )}
    >
      <Diamond className={tone === 'dark' ? 'fill-primary-fg' : undefined} />
      {children}
    </p>
  )
}
