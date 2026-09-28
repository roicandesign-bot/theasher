// Pagine di servizio e legali: stesso impianto per tutte, contenuto da src/data/legale.ts
import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { pagineTesto } from '@/data/legale'

export default function TextPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace('/', '')
  const pagina = pagineTesto.find((p) => p.slug === slug) ?? pagineTesto[0]!
  const altre = pagineTesto.filter((p) => p.slug !== pagina.slug && p.eyebrow === pagina.eyebrow)

  return (
    <>
      <Section className="pb-8">
        <Container width="prose">
          <Eyebrow>{pagina.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-h1">{pagina.titolo}</h1>
          <p className="mt-5 text-lead text-fg-muted">{pagina.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge variant="muted">Aggiornato: {pagina.aggiornato}</Badge>
            {pagina.daCompletare && (
              <Badge variant="outline">Dati della società da inserire tra [ ]</Badge>
            )}
          </div>
        </Container>
      </Section>

      <Container width="prose" className="pb-section">
        {/* Indice */}
        <nav aria-label="In questa pagina" className="border-y border-line py-5">
          <p className="label text-[0.625rem] text-fg-muted">In questa pagina</p>
          <ul className="mt-3 flex flex-col gap-2">
            {pagina.sezioni.map((s) => (
              <li key={s.titolo}>
                <a
                  href={`#${s.titolo.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}`}
                  className="flex items-center gap-2 text-sm text-fg-muted transition hocus:text-primary"
                >
                  <Diamond className="size-2.5 shrink-0" />
                  {s.titolo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-10">
          {pagina.sezioni.map((s) => (
            <section
              key={s.titolo}
              id={s.titolo.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}
              className="scroll-mt-28"
            >
              <h2 className="text-h3">{s.titolo}</h2>
              <div className="mt-4 flex flex-col gap-4 text-fg-muted">
                {s.paragrafi.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {s.elenco && (
                  <ul className="flex flex-col gap-2">
                    {s.elenco.map((e) => (
                      <li key={e} className="flex items-start gap-3">
                        <Diamond className="mt-2 size-2.5 shrink-0" />
                        {e}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        {altre.length > 0 && (
          <div className="mt-14 border-t border-line pt-8">
            <p className="label text-[0.75rem] text-primary">Vedi anche</p>
            <ul className="mt-4 flex flex-col gap-3">
              {altre.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/${p.slug}`}
                    className="flex items-center justify-between gap-4 rounded-card p-4 ring-1 ring-line transition ring-inset hocus:ring-primary"
                  >
                    <span className="font-semibold">{p.titolo}</span>
                    <ArrowRight className="size-4 shrink-0 text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </>
  )
}
