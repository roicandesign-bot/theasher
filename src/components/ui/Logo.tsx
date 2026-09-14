import { Link } from 'react-router-dom'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

type LogoProps = {
  /** acid = giallo (su nero), black = nero (su giallo), white = bianco */
  variant?: 'acid' | 'black' | 'white'
  className?: string
  /** Se true è un link alla home */
  link?: boolean
}

/**
 * Logo ufficiale The Hasher: il lettering calligrafico fornito, mai ricreato con un font.
 * File: public/brand/logo-{acid,black,white}.png (rapporto 1021×631).
 */
export function Logo({ variant = 'acid', className, link = true }: LogoProps) {
  const img = (
    <img
      src={asset(`brand/logo-${variant}.png`)}
      alt="The Hasher"
      width={1021}
      height={631}
      className={cn('h-10 w-auto select-none', className)}
      draggable={false}
    />
  )
  if (!link) return img
  return (
    <Link to="/" className="inline-block rounded-sm" aria-label="The Hasher — home">
      {img}
    </Link>
  )
}
