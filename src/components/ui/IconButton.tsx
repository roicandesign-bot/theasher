import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Obbligatoria: i bottoni solo icona devono dire cosa fanno */
  'aria-label': string
}

/** Bottone rotondo solo icona, target 44px. */
export function IconButton({ className, children, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-grid size-11 shrink-0 place-items-center rounded-full text-fg transition hocus:bg-surface-hover hocus:text-primary',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
