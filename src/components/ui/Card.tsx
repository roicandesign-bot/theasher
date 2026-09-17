import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** `flat` con bordo (default), `interactive` con hover */
  variant?: 'flat' | 'interactive'
  children: ReactNode
}

/** Contenitore base: superficie scura con bordo sottile (sul nero le ombre non si vedono). */
export function Card({ variant = 'flat', className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card bg-surface p-6 ring-1 ring-line ring-inset',
        variant === 'interactive' &&
          'transition duration-200 ease-out-soft hocus:-translate-y-0.5 hocus:bg-surface-hover hocus:ring-line-strong',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
