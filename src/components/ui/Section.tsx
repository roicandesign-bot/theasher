import type { HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** `alt` grigio scuro per dare ritmo, `yellow` banda gialla (una per pagina) */
  tone?: 'default' | 'alt' | 'yellow'
  children: ReactNode
}

/** Sezione di pagina con padding verticale coerente e sfondo opzionale. */
export function Section({ tone = 'default', className, children, ...rest }: SectionProps) {
  return (
    <section
      className={cn(
        'relative py-section',
        tone === 'alt' && 'bg-bg-alt',
        tone === 'yellow' && 'bg-primary text-primary-fg',
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
  /** Link a destra (es. «Vedi tutti») */
  action?: { label: string; to: string }
  tone?: 'default' | 'yellow'
  className?: string
}

/** Intestazione standard di sezione: occhiello + titolo (Anton, maiuscolo) + sottotitolo. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  action,
  tone = 'default',
  className,
}: SectionHeaderProps) {
  const onYellow = tone === 'yellow'
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'text-center md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-prose', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <Eyebrow
            tone={onYellow ? 'dark' : 'primary'}
            className={cn('mb-3', align === 'center' && 'justify-center')}
          >
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className="text-h2">{title}</h2>
        {subtitle && (
          <p className={cn('mt-4 text-lead', onYellow ? 'text-primary-fg/80' : 'text-fg-muted')}>
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          to={action.to}
          className={cn(
            'inline-flex items-center gap-2 self-start label transition md:self-auto hocus:text-primary',
            onYellow ? 'text-primary-fg' : 'text-fg',
          )}
        >
          {action.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  )
}
