import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-button label whitespace-nowrap transition duration-200 ease-out-soft select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  /** Giallo pieno: una sola per sezione */
  primary: 'bg-primary text-primary-fg hocus:bg-primary-hover',
  /** Contorno giallo: azioni secondarie (es. "Aggiungi al carrello" nelle card) */
  outline: 'text-primary ring-[1.5px] ring-primary ring-inset hocus:bg-primary/10',
  /** Solo testo bianco */
  ghost: 'text-fg hocus:bg-surface-hover',
  /** Nero su superfici gialle */
  dark: 'bg-bg text-primary hocus:bg-brand-800',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-xs',
  md: 'h-12 px-6',
  lg: 'h-14 px-8 text-sm',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined }
type LinkProps = CommonProps & { to: string; href?: undefined; onClick?: () => void }
type AnchorProps = CommonProps & { href: string; to?: undefined; target?: string; rel?: string }

/**
 * Bottone unico per tutto il sito (pill, etichetta maiuscola).
 * Diventa <Link> se passi `to`, <a> se passi `href`, altrimenti <button>.
 */
export function Button(props: ButtonProps | LinkProps | AnchorProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    )
  }
  if ('href' in props && props.href !== undefined) {
    const { href, target, rel } = props
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    )
  }
  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    to: _t,
    href: _h,
    ...rest
  } = props as ButtonProps
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
