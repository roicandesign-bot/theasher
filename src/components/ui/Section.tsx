import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Sfondo alternato per creare ritmo tra le sezioni */
  tone?: 'default' | 'alt' | 'dark'
  children: ReactNode
}

/** Sezione di pagina con padding verticale coerente e sfondo opzionale. */
export function Section({ tone = 'default', className, children, ...rest }: SectionProps) {
  return (
    <section
      className={cn(
        'py-section',
        tone === 'alt' && 'bg-bg-alt',
        tone === 'dark' && 'bg-brand-950 text-white',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  )
}

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

/** Intestazione standard di sezione: occhiello + titolo + sottotitolo. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('max-w-prose', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className="tracking-eyebrow text-eyebrow font-medium text-fg-muted uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-h2 font-semibold">{title}</h2>
      {subtitle && <p className="mt-4 text-lead text-fg-muted">{subtitle}</p>}
    </div>
  )
}
