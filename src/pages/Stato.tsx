// Resoconto del progetto (pagina di lavoro, non fa parte del sito pubblico):
// Avanzamento → Fatto finora → Il sito → Fuori dal sito → Chi fa cosa → Roadmap → Decisioni
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { avanzamento, chiFaCosa, decisioni, fatto, fuoriDalSito, roadmap } from '@/data/stato'
import { cn } from '@/lib/cn'

export default function Stato() {
  return (
    <>
      {/* ---------- Intestazione e avanzamento ---------- */}
      <Section className="pb-10">
        <Container>
          <Eyebrow>Resoconto · pagina di lavoro</Eyebrow>
          <h1 className="mt-4 text-h1">
            Dove siamo.
            <br />
            <span className="text-primary">Cosa manca.</span>
          </h1>
          <p className="mt-5 max-w-prose text-lead text-fg-muted">
            Tutto quello che abbiamo costruito finora, quello che resta da fare sul sito e quello
            che serve fuori dal sito per aprire davvero il negozio.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {avanzamento.map((a) => (
              <li key={a.area} className="border-t border-line pt-4">
                <p className="label text-[0.75rem] text-fg-muted">{a.area}</p>
                <p className="mt-2 font-display text-h2 text-primary">{a.done}%</p>
                <div
                  className="mt-3 h-1 overflow-hidden rounded-full bg-bg-alt"
                  role="img"
                  aria-label={`${a.area}: ${a.done} per cento`}
                >
                  <div className="h-full rounded-full bg-primary" style={{ width: `${a.done}%` }} />
                </div>
                <p className="mt-3 text-sm text-fg-muted">{a.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- Fatto finora ---------- */}
      <Section tone="alt" className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Fatto finora"
            title="Due settimane di lavoro."
            subtitle="Ogni riga è qualcosa che puoi già aprire e guardare."
          />
          <ol className="mt-10 ml-2 grid border-l-2 border-line">
            {fatto.map((f) => (
              <li key={f.titolo} className="relative pb-8 pl-7">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[7px] size-3 rotate-45 bg-primary"
                />
                <p className="label text-[0.6875rem] text-primary">{f.data}</p>
                <p className="mt-1.5 font-display text-h3 uppercase">{f.titolo}</p>
                <p className="mt-2 max-w-prose text-fg-muted">{f.testo}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------- Il sito ---------- */}
      <Section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-8 rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <Eyebrow>Il sito</Eyebrow>
              <h2 className="mt-3 text-h2">3 pagine pronte, 31 da costruire.</h2>
              <p className="mt-4 max-w-prose text-fg-muted">
                Home, pagina prodotto e pagina di errore sono finite. Mancano carrello, checkout,
                area cliente, le pagine del racconto e quelle di servizio. L’elenco completo, con
                quelle che puoi già aprire, è nella mappa.
              </p>
            </div>
            <Button to="/mappa" className="shrink-0 self-start md:self-auto">
              Apri la mappa <ArrowRight className="size-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---------- Fuori dal sito ---------- */}
      <Section tone="alt" className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Fuori dal sito"
            title="Quello che il sito non può inventarsi."
            subtitle="Sono le cose che arrivano da te o da fornitori esterni. Senza queste il negozio resta una vetrina."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {fuoriDalSito.map((f, i) => (
              <li key={f.area}>
                <Reveal delay={i * 60} className="h-full">
                  <Card className="flex h-full flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-display text-h3 uppercase">{f.area}</p>
                      <Badge variant={f.stato === 'parziale' ? 'outline' : 'muted'}>
                        {f.stato === 'parziale' ? 'A metà' : 'Da fare'}
                      </Badge>
                    </div>
                    <p className="text-fg-muted">{f.testo}</p>
                    <p className="mt-auto pt-2 label text-[0.6875rem] text-primary">
                      Tocca a {f.chi}
                    </p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- Chi fa cosa ---------- */}
      <Section className="py-12 md:py-16">
        <Container>
          <SectionHeader eyebrow="Squadra" title="Chi fa cosa." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {chiFaCosa.map((p) => (
              <li key={p.nome}>
                <Card className="flex h-full flex-col gap-4">
                  <div>
                    <p className="font-display text-h3 text-primary uppercase">{p.nome}</p>
                    <p className="mt-1 text-sm text-fg-muted">{p.ruolo}</p>
                  </div>
                  <ul className="flex flex-col gap-2 border-t border-line pt-4">
                    {p.cose.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm">
                        <Diamond className="mt-1.5 size-2.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- Roadmap ---------- */}
      <Section tone="alt" className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Roadmap"
            title="Cinque tappe fino all’apertura."
            subtitle="I tempi sono indicativi: dipendono da quanto in fretta arrivano foto, testi legali e conferme."
          />
          <ol className="mt-10 grid gap-4">
            {roadmap.map((r) => (
              <li key={r.fase}>
                <Reveal>
                  <article
                    className={cn(
                      'grid gap-4 rounded-card p-6 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-8 md:p-8',
                      r.stato === 'ora'
                        ? 'bg-primary text-primary-fg'
                        : 'bg-surface ring-1 ring-line ring-inset',
                    )}
                  >
                    <p
                      className={cn(
                        'font-display text-h2 leading-none',
                        r.stato === 'ora' ? 'text-primary-fg' : 'text-fg-subtle',
                      )}
                    >
                      {r.fase}
                    </p>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-h3">{r.titolo}</h3>
                        {r.stato === 'ora' && (
                          <span className="rounded-badge bg-bg px-2 py-1 label text-[0.625rem] text-primary">
                            <Check aria-hidden="true" className="mr-1 inline size-3" />
                            Siamo qui
                          </span>
                        )}
                      </div>
                      <p
                        className={cn(
                          'mt-3 max-w-prose',
                          r.stato === 'ora' ? 'text-primary-fg/80' : 'text-fg-muted',
                        )}
                      >
                        {r.cosa}
                      </p>
                      <p
                        className={cn(
                          'mt-3 label text-[0.6875rem]',
                          r.stato === 'ora' ? 'text-primary-fg/70' : 'text-fg-subtle',
                        )}
                      >
                        Serve: {r.serve}
                      </p>
                    </div>
                    <p
                      className={cn(
                        'shrink-0 label text-[0.75rem]',
                        r.stato === 'ora' ? 'text-primary-fg' : 'text-primary',
                      )}
                    >
                      {r.quando}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-fg-muted">
            Messe in fila, con le fasi 1 e 2 che corrono insieme, servono all’incirca quattro o
            cinque mesi per arrivare all’apertura.
          </p>
        </Container>
      </Section>

      {/* ---------- Decisioni ---------- */}
      <Section className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Aspettano te"
            title="Sette decisioni."
            subtitle="Nessuna blocca il disegno delle pagine, ma tutte servono prima di aprire."
          />
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {decisioni.map((d, i) => (
              <li
                key={d}
                className="flex items-center gap-4 rounded-card p-5 ring-1 ring-line ring-inset"
              >
                <span className="font-display text-h3 text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/mappa">
              Mappa delle pagine <ArrowRight className="size-4" />
            </Button>
            <Link
              to="/styleguide"
              className="inline-flex h-12 items-center rounded-button px-6 label text-fg ring-1 ring-line transition ring-inset hocus:text-primary"
            >
              Colori e componenti
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
