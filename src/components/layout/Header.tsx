import { ChevronDown, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Logo } from '@/components/ui/Logo'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'
import { site } from '@/data/site'
import { useCart } from '@/lib/cart'

const navLink =
  'label inline-flex h-11 items-center rounded-button px-3 transition hocus:text-primary'

/** La voce del menu che corrisponde alla pagina aperta (anche con i filtri nell'indirizzo). */
function useVoceAttiva() {
  const { pathname, search } = useLocation()
  const params = new URLSearchParams(search)
  return (to: string) => {
    const [percorso, query] = to.split('?')
    if (percorso !== pathname) return false
    if (!query) return [...params.keys()].length === 0
    return [...new URLSearchParams(query).entries()].every(([k, v]) => params.get(k) === v)
  }
}

/**
 * Header sticky nero: logo, menu, ricerca, account, carrello.
 * Mobile: hamburger a sinistra, logo centrato, carrello a destra, menu a schermo intero.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  /** Sottomenu aperto nel menu mobile (label della voce) */
  const [sotto, setSotto] = useState<string | null>(null)
  /** Menu a tendina aperto su desktop (label della voce) */
  const [tendina, setTendina] = useState<string | null>(null)
  const tendinaRef = useRef<HTMLDivElement>(null)
  const cart = useCart()
  const attiva = useVoceAttiva()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // La tendina desktop si chiude cliccando fuori, con Esc o portando il focus altrove.
  useEffect(() => {
    if (!tendina) return
    const fuori = (e: Event) => {
      if (!tendinaRef.current?.contains(e.target as Node)) setTendina(null)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setTendina(null)
      tendinaRef.current?.querySelector('button')?.focus()
    }
    document.addEventListener('pointerdown', fuori)
    document.addEventListener('focusin', fuori)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', fuori)
      document.removeEventListener('focusin', fuori)
      document.removeEventListener('keydown', esc)
    }
  }, [tendina])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="container-content grid h-18 grid-cols-[1fr_auto_1fr] items-center md:h-20 lg:grid-cols-[auto_1fr_auto]">
          {/* mobile: hamburger */}
          <div className="flex items-center lg:hidden">
            <IconButton
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                setOpen((v) => !v)
                setSotto(null)
              }}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </IconButton>
          </div>

          {/* logo: centrato su mobile, a sinistra su desktop */}
          <div className="flex justify-center lg:justify-start">
            <Logo className="h-11 md:h-12" />
          </div>

          {/* desktop: menu */}
          <nav
            className="hidden items-center justify-center self-stretch lg:flex"
            aria-label="Principale"
          >
            {site.nav.map((item) =>
              'sotto' in item && item.sotto ? (
                <div
                  key={item.label}
                  ref={tendina === item.label ? tendinaRef : undefined}
                  className="flex items-center self-stretch"
                  // col mouse si apre passandoci sopra; al tocco solo col clic
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setTendina(item.label)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setTendina(null)}
                >
                  <button
                    type="button"
                    aria-expanded={tendina === item.label}
                    aria-controls={`tendina-${item.label}`}
                    onClick={() => setTendina((v) => (v === item.label ? null : item.label))}
                    className={cn(
                      navLink,
                      'gap-1.5',
                      tendina === item.label ||
                        attiva(item.to) ||
                        item.sotto.some((v) => attiva(v.to))
                        ? 'text-primary'
                        : 'text-fg',
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        'size-3.5 transition-transform duration-200 ease-out-soft',
                        tendina === item.label && 'rotate-180',
                      )}
                    />
                  </button>
                  <div
                    id={`tendina-${item.label}`}
                    className={cn(
                      'absolute inset-x-0 top-full z-50 border-b border-line bg-bg shadow-2xl shadow-bg transition duration-200 ease-out-soft',
                      tendina === item.label
                        ? 'visible opacity-100'
                        : 'pointer-events-none invisible opacity-0',
                    )}
                  >
                    <ul
                      className={cn(
                        'container-content grid gap-4 py-6',
                        item.sotto.length > 10
                          ? 'grid-cols-6 gap-y-5'
                          : item.sotto.length > 4
                            ? 'grid-cols-5 gap-y-5'
                            : 'grid-cols-4',
                      )}
                    >
                      {item.sotto.map((v) => (
                        <li key={v.label}>
                          <Link
                            to={v.to}
                            aria-current={attiva(v.to) ? 'page' : undefined}
                            onClick={() => setTendina(null)}
                            className="group/voce flex flex-col gap-3"
                          >
                            <span className="block aspect-[4/3] overflow-hidden rounded-card ring-1 ring-line transition duration-300 ease-out-soft group-hover/voce:ring-2 group-hover/voce:ring-primary">
                              <img
                                src={asset(v.img)}
                                alt=""
                                loading="lazy"
                                className="size-full object-cover transition duration-500 ease-out-soft group-hover/voce:scale-105"
                              />
                            </span>
                            <span
                              className={cn(
                                'flex items-center justify-between gap-2 label text-[0.75rem] transition',
                                attiva(v.to)
                                  ? 'text-primary'
                                  : 'text-fg group-hover/voce:text-primary',
                              )}
                            >
                              {v.label}
                              <span aria-hidden="true" className="text-primary">
                                →
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-current={attiva(item.to) ? 'page' : undefined}
                  className={cn(navLink, attiva(item.to) ? 'text-primary' : 'text-fg')}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* icone */}
          <div className="flex items-center justify-end gap-0.5">
            <NavLink
              to="/cerca"
              aria-label="Cerca"
              className="grid size-11 place-items-center rounded-full text-fg transition duration-200 ease-out-soft hocus:bg-surface-hover hocus:text-primary"
            >
              <Search className="size-5" />
            </NavLink>
            <NavLink
              to="/account"
              aria-label="Account"
              className="hidden size-11 place-items-center rounded-full text-fg transition duration-200 ease-out-soft lg:grid hocus:bg-surface-hover hocus:text-primary"
            >
              <User className="size-5" />
            </NavLink>
            <IconButton
              aria-label={`Carrello, ${cart.count} articoli`}
              className="relative"
              onClick={cart.open}
            >
              <ShoppingBag className="size-5" />
              {cart.count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1 right-1 grid size-4.5 place-items-center rounded-full bg-primary text-[0.625rem] font-bold text-primary-fg"
                >
                  {cart.count}
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </header>

      {/*
        Menu mobile a schermo intero. Sta fuori dall'header: un antenato con
        backdrop-blur aggancia a sé gli elementi `fixed`, e il pannello finiva
        alto quanto la barra, lasciando vedere la pagina sotto.
      */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-[55] flex flex-col bg-bg transition duration-300 ease-out-soft lg:hidden',
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="flex h-18 shrink-0 items-center justify-between border-b border-line px-gutter">
          <IconButton aria-label="Chiudi menu" onClick={() => setOpen(false)}>
            <X className="size-6" />
          </IconButton>
          <Logo className="h-10" />
          <IconButton
            aria-label={`Carrello, ${cart.count} articoli`}
            className="relative"
            onClick={() => {
              setOpen(false)
              cart.open()
            }}
          >
            <ShoppingBag className="size-5" />
            {cart.count > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1 right-1 grid size-4.5 place-items-center rounded-full bg-primary text-[0.625rem] font-bold text-primary-fg"
              >
                {cart.count}
              </span>
            )}
          </IconButton>
        </div>

        <nav
          className="container-content flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain py-6"
          aria-label="Menu mobile"
        >
          <form
            role="search"
            className="relative mb-4"
            onSubmit={(e) => {
              e.preventDefault()
              const q = new FormData(e.currentTarget).get('q')?.toString().trim() ?? ''
              setOpen(false)
              navigate(q ? `/cerca?q=${encodeURIComponent(q)}` : '/cerca')
              e.currentTarget.reset()
            }}
          >
            <label htmlFor="menu-cerca" className="sr-only">
              Cerca nel sito
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-fg-muted"
            />
            <input
              id="menu-cerca"
              name="q"
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              placeholder="Cerca prodotti, lotti, articoli"
              className="h-12 w-full rounded-button bg-surface pr-24 pl-11 text-base text-fg ring-1 ring-line ring-inset placeholder:text-fg-subtle focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-1.5 h-9 -translate-y-1/2 rounded-button bg-primary px-4 label text-[0.6875rem] text-primary-fg transition hocus:bg-primary/90"
            >
              Cerca
            </button>
          </form>
          {site.nav.map((item) =>
            'sotto' in item && item.sotto ? (
              <div key={item.label} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setSotto((v) => (v === item.label ? null : item.label))}
                  aria-expanded={sotto === item.label}
                  className={cn(
                    'flex w-full items-center justify-between gap-4 py-4 font-display text-h3 uppercase transition duration-200 ease-out-soft hocus:text-primary',
                    (sotto === item.label || item.sotto.some((v) => attiva(v.to))) &&
                      'text-primary',
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'size-6 shrink-0 text-primary transition-transform duration-300 ease-out-soft',
                      sotto === item.label && 'rotate-180',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out-soft',
                    sotto === item.label
                      ? 'grid-rows-[1fr] pb-4 opacity-100'
                      : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <ul className="grid grid-cols-2 gap-2 overflow-hidden">
                    {item.sotto.map((v, i) => (
                      <li key={v.label} className={cn(i === 0 && 'col-span-2')}>
                        <Link
                          to={v.to}
                          onClick={() => setOpen(false)}
                          aria-current={attiva(v.to) ? 'page' : undefined}
                          className={cn(
                            'flex items-center gap-3 rounded-card bg-surface p-2 ring-1 transition duration-200 ease-out-soft ring-inset',
                            attiva(v.to)
                              ? 'text-primary ring-primary'
                              : 'text-fg ring-line hocus:ring-primary',
                          )}
                        >
                          <img
                            src={asset(v.img)}
                            alt=""
                            loading="lazy"
                            className="size-12 shrink-0 rounded-[0.625rem] object-cover"
                          />
                          <span className="label text-[0.75rem]">{v.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                aria-current={attiva(item.to) ? 'page' : undefined}
                className={cn(
                  'group flex items-center justify-between gap-4 border-b border-line py-4 font-display text-h3 uppercase transition duration-200 ease-out-soft hocus:text-primary',
                  attiva(item.to) && 'text-primary',
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="text-primary transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ),
          )}
          <div className="mt-6 flex flex-col gap-3">
            <Button to="/negozio" size="lg" onClick={() => setOpen(false)}>
              Shop the drop →
            </Button>
            <Button
              to="/account"
              variant="ghost"
              className="ring-1 ring-line ring-inset"
              onClick={() => setOpen(false)}
            >
              <User className="size-4" /> Account
            </Button>
          </div>
          <p className="mt-auto pt-8 label text-[0.6875rem] text-fg-muted">{site.claim}</p>
        </nav>
      </div>
    </>
  )
}
