// Mappa del sito (pagina di lavoro, non fa parte del sito pubblico):
// Intestazione con conteggio → gruppi di pagine con stato → cose che non sono pagine
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section, SectionHeader } from '@/components/ui/Section'
import { beyondPages, sitemap } from '@/data/sitemap'
import { cn } from '@/lib/cn'

const allPages = sitemap.flatMap((g) => g.pages)
const done = allPages.filter((p) => p.status === 'fatta').length

export default function Sitemap() {
  return (
    <>
      {/* ---------- Intestazione ---------- */}
      <Section className="pb-8">
        <Container>
          <Eyebrow>Pagina di lavoro · non fa parte del sito</Eyebrow>
          <h1 className="mt-4 text-h1">
            Cosa c’è.
            <br />
            <span className="text-primary">Cosa manca.</span>
          </h1>
          <p className="mt-5 max-w-prose text-lead text-fg-muted">
            Tutte le pagine di un e-commerce completo, divise per quello che servono a fare. Le
            pagine segnate «fatta» le puoi già aprire.
          </p>
          <div className="mt-8 flex flex-wrap items-end gap-8 border-t border-line pt-6">
            <div>
              <p className="font-display text-display text-primary">{done}</p>
              <p className="label text-[0.75rem] text-fg-muted">pagine pronte</p>
            </div>
            <div>
              <p className="font-display text-display">{allPages.length - done}</p>
              <p className="label text-[0.75rem] text-fg-muted">da costruire</p>
            </div>
            <div className="max-w-xs">
              <p className="text-sm text-fg-muted">
                Si fanno una alla volta: costruisco, guardi, correggi. Nessuna pagina aspetta le
                altre.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- Gruppi di pagine ---------- */}
      {sitemap.map((group, index) => (
        <Section
          key={group.id}
          tone={index % 2 === 0 ? 'alt' : 'default'}
          className="py-12 md:py-16"
        >
          <Container>
            <SectionHeader
              eyebrow={`${group.pages.filter((p) => p.status === 'fatta').length} / ${group.pages.length} pronte`}
              title={group.title}
              subtitle={group.intro}
            />
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {group.pages.map((page) => {
                const isDone = page.status === 'fatta'
                const row = (
                  <>
                    <span className="flex min-w-0 flex-1 items-start gap-3">
                      {isDone ? (
                        <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      ) : (
                        <Diamond className="mt-1 size-3 shrink-0 opacity-50" />
                      )}
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">{page.name}</span>
                          {page.fromLorenzo && <Badge variant="outline">Tua idea</Badge>}
                        </span>
                        <span className="mt-1 block text-sm text-fg-muted">{page.what}</span>
                      </span>
                    </span>
                    {isDone && (
                      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-primary" />
                    )}
                  </>
                )
                return (
                  <li key={page.name}>
                    {page.to ? (
                      <Link
                        to={page.to}
                        className={cn(
                          'flex h-full items-center gap-4 rounded-card bg-surface p-5 ring-1 ring-line transition ring-inset',
                          'hocus:ring-primary',
                        )}
                      >
                        {row}
                      </Link>
                    ) : (
                      <div className="flex h-full items-center gap-4 rounded-card p-5 ring-1 ring-line ring-inset">
                        {row}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </Container>
        </Section>
      ))}

      {/* ---------- Oltre le pagine ---------- */}
      <Section tone="yellow">
        <Container>
          <SectionHeader
            tone="yellow"
            eyebrow="Non sono pagine"
            title="Ma senza queste non è un negozio."
            subtitle="Sono pezzi che vivono dentro tutte le pagine, o dietro le quinte."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {beyondPages.map((item) => (
              <li key={item.title} className="border-t border-primary-fg/20 pt-4">
                <p className="label text-[0.75rem]">{item.title}</p>
                <p className="mt-2 text-sm text-primary-fg/80">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- Come procediamo ---------- */}
      <Section>
        <Container className="grid gap-5 md:grid-cols-3">
          {[
            {
              n: 'Prima',
              title: 'Il percorso d’acquisto',
              text: 'Categoria, carrello, checkout. È quello che fa entrare i soldi: senza, il resto è vetrina.',
            },
            {
              n: 'Poi',
              title: 'Il racconto',
              text: 'Azienda, journal, contatti, diventa distributore. Portano traffico e fiducia.',
            },
            {
              n: 'Infine',
              title: 'Servizio e legale',
              text: 'Spedizioni, resi, privacy. Testi da rivedere con un consulente prima di aprire.',
            },
          ].map((step) => (
            <Card key={step.n}>
              <p className="label text-[0.75rem] text-primary">{step.n}</p>
              <h2 className="mt-3 text-h3">{step.title}</h2>
              <p className="mt-2 text-sm text-fg-muted">{step.text}</p>
            </Card>
          ))}
        </Container>
      </Section>
    </>
  )
}
