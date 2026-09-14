import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { routes } from '@/routes'
import { site } from '@/data/site'

/** Header con logo, menu (da src/routes.tsx) e CTA. Menu a scomparsa su mobile. */
export function Header() {
  const [open, setOpen] = useState(false)
  const nav = routes.filter((r) => r.inNav !== false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <NavLink to="/" className="font-display text-lg font-semibold tracking-tight">
          {site.name}
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principale">
          {nav.map((r) => (
            <NavLink
              key={r.path}
              to={r.path}
              end={r.path === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-button px-3 py-2 text-sm font-medium text-fg-muted transition hocus:bg-bg-alt hocus:text-fg',
                  isActive && 'text-fg',
                )
              }
            >
              {r.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button size="sm" to={site.cta.to}>
            {site.cta.label}
          </Button>
        </div>

        <button
          type="button"
          className="rounded-button p-2 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {nav.map((r) => (
              <NavLink
                key={r.path}
                to={r.path}
                end={r.path === '/'}
                onClick={() => setOpen(false)}
                className="rounded-button px-3 py-2 text-base font-medium"
              >
                {r.label}
              </NavLink>
            ))}
            <Button className="mt-2" to={site.cta.to}>
              {site.cta.label}
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
