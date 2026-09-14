import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-button font-medium whitespace-nowrap transition select-none disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-fg hocus:bg-primary-hover shadow-soft',
  secondary: 'bg-surface text-fg ring-1 ring-line ring-inset hocus:bg-bg-alt',
  ghost: 'text-fg hocus:bg-bg-alt',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-13 px-7 text-lg',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined }
type LinkProps = CommonProps & { to: string; href?: undefined }
type AnchorProps = CommonProps & { href: string; to?: undefined; target?: string; rel?: string }

/**
 * Bottone unico per tutto il sito. Diventa <Link> se passi `to`,
 * <a> se passi `href`, altrimenti <button>.
 */
export function Button(props: ButtonProps | LinkProps | AnchorProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
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
