import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'

/**
 * PAGINA PLACEHOLDER. Verrà sostituita nello step /pagina con il design vero.
 * Serve solo a mostrare che l'ambiente funziona e a dare un esempio di
 * come si compone una pagina con i componenti base.
 */
export default function Home() {
  return (
    <>
      <Section>
        <Container>
          <div className="max-w-prose">
            <p className="tracking-eyebrow text-eyebrow font-medium text-fg-muted uppercase">
              Ambiente pronto
            </p>
            <h1 className="mt-4 text-display font-semibold">Qui nascerà il vostro sito.</h1>
            <p className="mt-6 text-lead text-fg-muted">
              Questa è una pagina segnaposto. Apri una sessione di Claude Code e scrivi{' '}
              <code className="rounded-xs bg-bg-alt px-1.5 py-0.5 font-mono text-[0.9em]">
                /inizia
              </code>{' '}
              per partire con il processo guidato: brief, stile, componenti, pagine, verifica.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/styleguide">
                Vedi la styleguide <ArrowRight className="size-4" />
              </Button>
              <Button variant="secondary" href="https://github.com/roicandesign-bot/theasher">
                Repository
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <SectionHeader
            eyebrow="Come funziona"
            title="Cinque step, uno alla volta"
            subtitle="Ogni step produce qualcosa di visibile. Si corregge guardando il risultato, non discutendo prima."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n}>
                <p className="font-mono text-sm text-fg-muted">{s.n}</p>
                <h3 className="mt-2 text-h3 font-semibold">{s.title}</h3>
                <p className="mt-2 text-fg-muted">{s.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

const steps = [
  {
    n: '01',
    title: 'Brief',
    text: 'Chi siete, per chi è il sito, che pagine servono, che tono ha.',
  },
  {
    n: '02',
    title: 'Stile',
    text: 'Colori, font, spaziature: il sistema che tiene tutto coerente.',
  },
  {
    n: '03',
    title: 'Componenti',
    text: 'Bottoni, card, header, footer: i mattoni riutilizzabili.',
  },
  {
    n: '04',
    title: 'Pagine',
    text: 'Una pagina alla volta, sezione per sezione, dal design o da una descrizione.',
  },
  {
    n: '05',
    title: 'Verifica',
    text: 'Screenshot su mobile, tablet e desktop; si sistema ciò che non convince.',
  },
]
