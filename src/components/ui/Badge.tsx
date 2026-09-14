import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'solid' | 'outline' | 'muted' | 'stock' | 'soldout'

const variants: Record<Variant, string> = {
  solid: 'bg-primary text-primary-fg',
  outline: 'text-primary ring-1 ring-primary ring-inset',
  muted: 'bg-bg-alt text-fg-muted',
  stock: 'text-success before:size-1.5 before:rounded-full before:bg-success',
  soldout: 'text-fg-muted before:size-1.5 before:rounded-full before:bg-fg-subtle',
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { variant?: Variant; children: ReactNode }

/** Etichetta piccola: "New", "Best seller", "Limited drop", disponibilità. */
export function Badge({ variant = 'solid', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-badge px-2 py-1 label text-[0.6875rem]',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
