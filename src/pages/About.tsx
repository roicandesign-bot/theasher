// L'azienda: chi siamo → numeri → valori → laboratorio → CTA
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { azienda } from '@/data/contenuti'
import { asset } from '@/lib/asset'

export default function About() {
  return (
    <>
      <Section className="pb-10">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{azienda.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-h1">{azienda.titolo}</h1>
            <p className="mt-5 max-w-prose text-lead text-fg-muted">{azienda.lead}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-line ring-inset">
            <img
              src={asset('images/demo/landscape.jpg')}
              alt="Paesaggio montano in bianco e nero"
              className="size-full object-cover grayscale"
            />
            <Diamond className="absolute top-5 right-5 size-6" />
          </div>
        </Container>
      </Section>

      <Section tone="alt" className="py-12">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-3">
            {azienda.numeri.map((n) => (
              <li key={n.etichetta} className="border-t border-line pt-5">
                <p className="font-display text-display text-primary">{n.valore}</p>
                <p className="mt-2 text-sm text-fg-muted">{n.etichetta}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="flex max-w-prose flex-col gap-5 text-lead text-fg-muted">
            {azienda.paragrafi.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <img
            src={asset('images/demo/packaging-family.jpg')}
            alt="La famiglia di confezioni The Hasher"
            loading="lazy"
            className="w-full rounded-card object-cover ring-1 ring-line ring-inset"
          />
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow="Come lavoriamo" title="Quattro regole, sempre le stesse." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {azienda.valori.map((v, i) => (
              <li key={v.titolo}>
                <Reveal delay={i * 60} className="h-full">
                  <Card className="flex h-full flex-col gap-3">
                    <Diamond className="size-4" />
                    <p className="font-display text-h3 uppercase">{v.titolo}</p>
                    <p className="text-sm text-fg-muted">{v.testo}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="yellow">
        <Container className="flex flex-col items-start gap-6">
          <Eyebrow tone="dark">Trasparenza</Eyebrow>
          <h2 className="max-w-3xl text-h2">
            Ogni lotto ha un certificato, e lo puoi scaricare senza chiederci niente.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button to="/analisi" variant="dark" size="lg">
              Vedi le analisi <ArrowRight className="size-4" />
            </Button>
            <Button
              to="/negozio"
              variant="dark"
              size="lg"
              className="bg-transparent ring-[1.5px] ring-primary-fg ring-inset"
            >
              Vai al negozio
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
