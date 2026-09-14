import { Instagram, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Diamond } from '@/components/ui/Diamond'
import { Logo } from '@/components/ui/Logo'
import { site } from '@/data/site'

const columns = [
  { title: 'Shop', links: site.footer.shop },
  { title: 'Info', links: site.footer.info },
  { title: 'Legale', links: site.footer.legal },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-content grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
        <div className="flex flex-col items-start gap-5">
          <Logo className="h-14" />
          <p className="max-w-xs text-fg-muted">
            {site.tagline}, selezionati in Europa. {site.claim}
          </p>
          <ul className="flex items-center gap-1" aria-label="Social">
            {site.footer.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-grid size-11 place-items-center rounded-full text-fg transition hocus:bg-surface-hover hocus:text-primary"
                >
                  {s.label === 'Instagram' ? (
                    <Instagram className="size-5" />
                  ) : s.label === 'YouTube' ? (
                    <Youtube className="size-5" />
                  ) : (
                    <span className="label text-[0.625rem]">TT</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="flex items-center gap-2 label text-primary">
              <Diamond /> {col.title}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-fg-muted transition hocus:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-content flex flex-col gap-3 py-6 text-xs text-fg-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.footer.seller}
          </p>
          <p className="label text-[0.6875rem] text-primary">{site.claim}</p>
        </div>
        <div className="container-content pb-6">
          <p className="text-xs text-fg-subtle">{site.footer.note}</p>
        </div>
      </div>
    </footer>
  )
}
