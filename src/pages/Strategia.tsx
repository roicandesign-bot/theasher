// Pagina di lavoro: il piano di crescita unito (Claude + ChatGPT), per Lorenzo, Vishu e i partner.
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { TestoRivelato } from '@/components/ui/TestoRivelato'
import { strategia as s } from '@/data/strategia'

export default function Strategia() {
  return (
    <>
      <Section tone="yellow" className="py-14 md:py-20">
        <Container width="prose">
          <Eyebrow tone="dark">Piano di crescita · pagina di lavoro</Eyebrow>
          <h1 className="mt-4 text-h1">
            <TestoRivelato text={s.tesi.titolo} />
          </h1>
          <p className="mt-5 text-lead text-primary-fg/80">{s.tesi.testo}</p>
          <p className="mt-6 text-xs text-primary-fg/70">
            Il meglio della proposta di Claude e di quella di ChatGPT, unite. I numeri sono ipotesi
            da validare con il negozio pilota.
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeader eyebrow="Il modello" title="Guadagniamo quando il negozio vende." />
            <p className="mt-6 rounded-card bg-surface p-5 text-sm text-fg-muted ring-1 ring-line ring-inset">
              <span className="label text-[0.6875rem] text-primary">Da verificare subito · </span>
              {s.verifica}
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {s.modello.map((m) => (
              <div key={m.voce} className="grid grid-cols-[1fr_auto] gap-x-4 py-4">
                <dt className="font-semibold">{m.voce}</dt>
                <dd className="text-right font-display text-2xl text-primary">{m.valore}</dd>
                <dd className="col-span-2 mt-1 text-sm text-fg-muted">{m.nota}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Blocchi tone="alt" eyebrow="Le difese" titolo="Sette motivi per restare." voci={s.difese} />
      <Blocchi eyebrow="I motori" titolo="Come si moltiplicano i negozi." voci={s.motori} />

      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow="Formati" title="Tre porte d’ingresso." />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {s.formati.map((f) => (
              <li key={f.nome} className="rounded-card bg-surface p-6 ring-1 ring-line ring-inset">
                <p className="flex items-baseline justify-between gap-3">
                  <span className="text-h3">{f.nome}</span>
                  <span className="label text-[0.75rem] text-primary">{f.mq}</span>
                </p>
                <p className="mt-2 text-sm text-fg-muted">{f.ruolo}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Blocchi
        eyebrow="Da blindare"
        titolo="Prima di vendere il primo franchising."
        voci={s.regole}
        colonne={2}
      />

      <Section tone="alt">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Roadmap" title="I prossimi 12 mesi." />
            <ol className="mt-8 flex flex-col gap-5">
              {s.roadmap.map((r) => (
                <li key={r.quando} className="border-l-2 border-primary pl-5">
                  <p className="label text-[0.75rem] text-primary">{r.quando}</p>
                  <p className="mt-1 text-fg-muted">{r.cosa}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeader eyebrow="Squadra" title="Chi fa cosa." />
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {s.squadra.map((q) => (
                <div key={q.chi} className="grid grid-cols-[9rem_1fr] gap-4 py-3">
                  <dt className="font-semibold">{q.chi}</dt>
                  <dd className="text-sm text-fg-muted">{q.cosa}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Numeri da guardare" title="Ogni mese." />
            <ul className="mt-8 flex flex-col gap-3">
              {s.kpi.map((k, i) => (
                <li key={k} className="flex gap-4">
                  <span className="font-display text-2xl leading-none text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-fg-muted">{k}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Scenari" title="A 36 mesi." />
            <div className="mt-8 overflow-x-auto rounded-card ring-1 ring-line ring-inset">
              <table className="w-full min-w-[28rem] text-sm">
                <thead>
                  <tr className="bg-bg-alt">
                    <th className="p-3 text-left label text-[0.625rem] text-fg-muted" />
                    {s.scenari.colonne.map((c) => (
                      <th key={c} className="p-3 text-right label text-[0.625rem] text-fg-muted">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {s.scenari.righe.map((r) => (
                    <tr key={r.voce}>
                      <th className="p-3 text-left font-normal text-fg-muted">{r.voce}</th>
                      {r.valori.map((v, i) => (
                        <td
                          key={i}
                          className={
                            i === 2
                              ? 'p-3 text-right font-semibold text-primary'
                              : 'p-3 text-right font-semibold'
                          }
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-fg-muted">{s.scenari.nota}</p>
          </div>
        </Container>
      </Section>

      <Section tone="yellow">
        <Container width="prose">
          <p className="font-display text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1] text-balance uppercase">
            {s.chiusura}
          </p>
        </Container>
      </Section>
    </>
  )
}

function Blocchi({
  eyebrow,
  titolo,
  voci,
  tone = 'default',
  colonne = 3,
}: {
  eyebrow: string
  titolo: string
  voci: { titolo: string; testo: string }[]
  tone?: 'default' | 'alt'
  colonne?: 2 | 3
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={titolo} />
        <ul
          className={
            colonne === 2
              ? 'mt-8 grid gap-4 md:grid-cols-2'
              : 'mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
          }
        >
          {voci.map((v, i) => (
            <li key={v.titolo}>
              <Reveal delay={(i % 3) * 60} className="h-full">
                <Card className="flex h-full flex-col gap-2">
                  <p className="font-display text-h3 uppercase">{v.titolo}</p>
                  <p className="text-sm text-fg-muted">{v.testo}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
