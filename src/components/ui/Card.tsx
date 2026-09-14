import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** `flat` senza ombra (dentro sezioni alt), `elevated` con ombra */
  variant?: 'flat' | 'elevated'
  children: ReactNode
}

/** Contenitore base per feature, servizi, testimonianze, ecc. */
export function Card({ variant = 'flat', className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8',
        variant === 'elevated' && 'shadow-card ring-0',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
