import { cn } from '@/lib/cn'

/** Accento a diamante del brand (✦). Decorativo: nascosto agli screen reader. */
export function Diamond({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      aria-hidden="true"
      className={cn('size-2.5 shrink-0 fill-primary', className)}
    >
      <path d="M5 0 6.6 3.4 10 5 6.6 6.6 5 10 3.4 6.6 0 5 3.4 3.4z" />
    </svg>
  )
}
