import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ChipProps = {
  active?: boolean
  onClick: () => void
  children: ReactNode
  /** Quanti prodotti restano scegliendo questa opzione */
  count?: number
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
}

/** Pillola selezionabile: attiva = giallo pieno. Usata nei filtri del negozio. */
export function Chip({
  active = false,
  onClick,
  children,
  count,
  disabled = false,
  size = 'md',
  className,
}: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-button label whitespace-nowrap transition duration-200 ease-out-soft',
        size === 'sm' ? 'h-10 px-4 text-[0.6875rem]' : 'h-11 px-5',
        active
          ? 'bg-primary text-primary-fg'
          : 'text-fg ring-1 ring-line ring-inset hocus:ring-line-strong',
        disabled && 'text-fg-subtle ring-line/50 hocus:ring-line/50',
        className,
      )}
    >
      {children}
      {count !== undefined && (
        <span className={cn('text-[0.625rem]', active ? 'text-primary-fg/60' : 'text-fg-subtle')}>
          {count}
        </span>
      )}
    </button>
  )
}
