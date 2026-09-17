import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'
import { site } from '@/data/site'

const navLink =
  'label inline-flex h-11 items-center rounded-button px-3 text-fg transition hocus:text-primary'

/**
 * Header sticky nero: logo, menu, ricerca, account, carrello.
 * Mobile: hamburger a sinistra, logo centrato, carrello a destra, menu a schermo intero.
 */
export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="container-content grid h-18 grid-cols-[1fr_auto_1fr] items-center md:h-20 lg:grid-cols-[auto_1fr_auto]">
        {/* mobile: hamburger */}
        <div className="flex items-center lg:hidden">
          <IconButton
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </IconButton>
        </div>

        {/* logo: centrato su mobile, a sinistra su desktop */}
        <div className="flex justify-center lg:justify-start">
          <Logo className="h-11 md:h-12" />
        </div>

        {/* desktop: menu */}
        <nav className="hidden justify-center lg:flex" aria-label="Principale">
          {site.nav.map((item) => (
            <Link key={item.label} to={item.to} className={navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* icone */}
        <div className="flex items-center justify-end gap-0.5">
          <IconButton aria-label="Cerca" className="hidden sm:inline-grid">
            <Search className="size-5" />
          </IconButton>
          <IconButton aria-label="Account" className="hidden lg:inline-grid">
            <User className="size-5" />
          </IconButton>
          <IconButton aria-label={`Carrello, ${site.cartCount} articoli`} className="relative">
            <ShoppingBag className="size-5" />
            {site.cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1 right-1 grid size-4.5 place-items-center rounded-full bg-primary text-[0.625rem] font-bold text-primary-fg"
              >
                {site.cartCount}
              </span>
            )}
          </IconButton>
        </div>
      </div>

      {/* menu mobile a schermo intero */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 top-18 bottom-0 z-30 flex flex-col bg-bg transition duration-300 ease-out-soft lg:hidden',
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
        )}
        aria-hidden={!open}
      >
        <nav className="container-content flex flex-1 flex-col gap-1 py-6" aria-label="Menu mobile">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-line py-4 font-display text-h3 uppercase transition duration-200 ease-out-soft hocus:text-primary"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="text-primary transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Button to="/#best-seller" size="lg" onClick={() => setOpen(false)}>
              Shop the drop →
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1 ring-1 ring-line ring-inset">
                <Search className="size-4" /> Cerca
              </Button>
              <Button variant="ghost" className="flex-1 ring-1 ring-line ring-inset">
                <User className="size-4" /> Account
              </Button>
            </div>
          </div>
          <p className="mt-auto pt-6 label text-[0.6875rem] text-fg-muted">{site.claim}</p>
        </nav>
      </div>
    </header>
  )
}
