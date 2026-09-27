import { BadgePercent, Boxes, Sprout, Truck } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { gruppo } from '@/data/contenuti'

const icone = [Sprout, Boxes, BadgePercent, Truck]

/** «Chi c'è dietro»: la forza del gruppo produttore. Condivisa da rivenditori e franchising. */
export function GruppoForza({ tone = 'default' }: { tone?: 'default' | 'alt' }) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeader eyebrow={gruppo.eyebrow} title={gruppo.titolo} subtitle={gruppo.testo} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gruppo.punti.map((o, i) => {
            const Icon = icone[i]!
            return (
              <li key={o.titolo}>
                <Reveal delay={i * 60} className="h-full">
                  <Card className="flex h-full flex-col gap-3">
                    <Icon className="size-7 text-primary" strokeWidth={1.5} />
                    <p className="font-display text-h3 uppercase">{o.titolo}</p>
                    <p className="text-sm text-fg-muted">{o.testo}</p>
                  </Card>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
