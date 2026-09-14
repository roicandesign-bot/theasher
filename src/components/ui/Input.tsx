import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Campo di testo scuro (solo UI). Usa sempre con una <label>. */
export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-12 w-full rounded-input bg-bg-alt px-4 text-base text-fg ring-1 ring-line transition ring-inset placeholder:text-fg-subtle focus:ring-2 focus:ring-primary focus:outline-none',
        className,
      )}
      {...rest}
    />
  )
}
