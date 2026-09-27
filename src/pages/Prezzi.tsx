// Analisi prezzi (pagina di lavoro): intro → fiori → hash → estratti → scaglioni
// → posizionamento proposto per The Hasher → differenze per Paese → metodo e limiti
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { estratti, fiori, hash, metodo, paesi, posizionamento, scaglioni } from '@/data/prezzi'
import type { Fascia } from '@/data/prezzi'
import { cn } from '@/lib/cn'

/** Barra che mostra dove cade la fascia di prezzo dentro la scala della categoria. */
function BarraPrezzo({ basso, alto, max }: { basso: number; alto: number; max: number }) {
  const left = (basso / max) * 100
  const width = ((alto - basso) / max) * 100
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-alt" aria-hidden="true">
      <div
        className="h-full rounded-full bg-primary"
        style={{ marginLeft: `${left}%`, width: `${width}%` }}
      />
    </div>
  )
}

function TabellaFasce({ righe, max }: { righe: Fascia[]; max: number }) {
  return (
    <ul className="mt-8 grid gap-3">
      {righe.map((r, i) => (
        <li key={r.nome}>
          <Reveal delay={i * 40}>
            <article className="grid gap-4 rounded-card p-5 ring-1 ring-line ring-inset md:grid-cols-[1.1fr_auto_1.4fr] md:items-center md:gap-8 md:p-6">
              <div>
                <p className="font-display text-h3 uppercase">{r.nome}</p>
                <p className="mt-1 text-sm text-fg-muted">{r.sotto}</p>
              </div>
              <div className="md:w-56">
                <p className="font-semibold text-primary">
                  {r.tipico} <span className="label text-[0.625rem] text-fg-muted">€/g tipico</span>
                </p>
                <p className="mt-1.5 text-xs text-fg-subtle">
                  estremi {r.basso.toString().replace('.', ',')} –{' '}
                  {r.alto.toString().replace('.', ',')} €
                </p>
                <div className="mt-2">
                  <BarraPrezzo basso={r.basso} alto={r.alto} max={max} />
                </div>
              </div>
              <p className="text-sm text-fg-muted">{r.nota}</p>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

export default function Prezzi() {
  return (
    <>
      {/* ---------- Intestazione ---------- */}
      <Section className="pb-10">
        <Container>
          <Eyebrow>Analisi di mercato · pagina di lavoro</Eyebrow>
          <h1 className="mt-4 text-h1">
            Quanto si vende
            <br />
            <span className="text-primary">in Europa.</span>
          </h1>
          <p className="mt-5 max-w-prose text-lead text-fg-muted">
            Fasce di prezzo al cliente finale, categoria per categoria, ricavate dagli shop europei
            più presenti online. Servono a decidere dove mettere The Hasher, non a copiare nessuno.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge variant="muted">Settembre 2026</Badge>
            <Badge variant="muted">Italia · Francia · Spagna · Germania · Svizzera</Badge>
            <Badge variant="muted">Prezzi al dettaglio, IVA inclusa</Badge>
          </div>
        </Container>
      </Section>

      {/* ---------- Fiori ---------- */}
      <Section tone="alt" className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Fiori"
            title="Dal pieno campo alle Cali."
            subtitle="Sei gradini. Il salto vero di prezzo è tra serra e indoor: è lì che il cliente decide se sei un brand o un discount."
          />
          <TabellaFasce righe={fiori} max={20} />
        </Container>
      </Section>

      {/* ---------- Hash ---------- */}
      <Section className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Hash"
            title="Dove si fa il margine."
            subtitle="Più la lavorazione è raccontabile, più il prezzo regge. Dal dry classico al frozen sift ci sono venti euro al grammo di differenza."
          />
          <TabellaFasce righe={hash} max={45} />
        </Container>
      </Section>

      {/* ---------- Estratti ---------- */}
      <Section tone="alt" className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Estratti"
            title="Pochi pezzi, valore alto."
            subtitle="Non fanno volume, ma alzano la percezione di tutto il catalogo."
          />
          <TabellaFasce righe={estratti} max={60} />
        </Container>
      </Section>

      {/* ---------- Scaglioni ---------- */}
      <Section className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Formati"
            title="Come scende il prezzo al grammo."
            subtitle="Lo sconto per quantità più diffuso negli shop europei. Il 3,5 g è il formato che vende di più: va trattato come prezzo di riferimento."
          />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 pr-4 label text-[0.6875rem] text-fg-muted">Formato</th>
                  <th className="py-3 pr-4 label text-[0.6875rem] text-fg-muted">Sconto tipico</th>
                  <th className="py-3 label text-[0.6875rem] text-fg-muted">A chi parla</th>
                </tr>
              </thead>
              <tbody>
                {scaglioni.map((s) => (
                  <tr key={s.formato} className="border-b border-line">
                    <td className="py-3.5 pr-4 font-display text-h3 uppercase">{s.formato}</td>
                    <td className="py-3.5 pr-4 font-semibold text-primary">{s.sconto}</td>
                    <td className="py-3.5 text-sm text-fg-muted">{s.nota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ---------- Posizionamento ---------- */}
      <Section tone="yellow" className="py-12 md:py-16">
        <Container>
          <SectionHeader
            tone="yellow"
            eyebrow="Proposta"
            title="Dove mettere The Hasher."
            subtitle="Sopra la media di mercato, mai al tetto. Il brand giustifica il sovrapprezzo con packaging, analisi e selezione: il prezzo deve dirlo senza esagerare."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {posizionamento.map((p, i) => (
              <Reveal key={p.categoria} delay={i * 60} className="h-full">
                <article className="flex h-full flex-col gap-4 rounded-card bg-bg p-6 text-fg">
                  <div>
                    <p className="font-display text-h3 uppercase">{p.categoria}</p>
                    <p className="mt-1.5 label text-[0.6875rem] text-fg-muted">{p.riferimento}</p>
                  </div>
                  <ul className="flex flex-col gap-2 border-t border-line pt-4">
                    {p.proposta.map((v) => (
                      <li key={v.formato} className="flex items-baseline justify-between gap-3">
                        <span className="label text-[0.75rem]">{v.formato}</span>
                        <span className="flex items-baseline gap-2">
                          <span className="font-semibold text-primary">{v.prezzo}</span>
                          <span className="text-[0.6875rem] text-fg-muted">{v.gr}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto flex items-start gap-2 pt-2 text-sm text-fg-muted">
                    <Diamond className="mt-1.5 size-2.5 shrink-0" />
                    {p.perche}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- Paesi ---------- */}
      <Section className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Paesi"
            title="Lo stesso prodotto non vale uguale."
            subtitle="Indice rispetto all’Italia. Serve a decidere se fare un listino unico o prezzi per mercato."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-5">
            {paesi.map((p) => (
              <li key={p.paese}>
                <Card className="flex h-full flex-col gap-3">
                  <p className="font-display text-h3 uppercase">{p.paese}</p>
                  <p
                    className={cn(
                      'label text-[0.75rem]',
                      p.indice === 'Riferimento' ? 'text-fg-muted' : 'text-primary',
                    )}
                  >
                    {p.indice}
                  </p>
                  <p className="text-sm text-fg-muted">{p.nota}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- Metodo ---------- */}
      <Section tone="alt" className="py-12 md:py-16">
        <Container>
          <SectionHeader eyebrow="Come leggerla" title="Cosa sono e cosa non sono questi numeri." />
          <ul className="mt-8 grid max-w-prose gap-4">
            {metodo.map((m) => (
              <li key={m.slice(0, 20)} className="flex items-start gap-3 text-fg-muted">
                <Diamond className="mt-2 size-2.5 shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
