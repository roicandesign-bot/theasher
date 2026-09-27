import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'

/** Passi numerati in grande (01, 02…), per spiegare un percorso in quattro tappe. */
export function Passi({
  eyebrow,
  titolo,
  passi,
  tone = 'default',
}: {
  eyebrow: string
  titolo: string
  passi: { titolo: string; testo: string }[]
  tone?: 'default' | 'alt'
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={titolo} />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {passi.map((p, i) => (
            <li key={p.titolo}>
              <Reveal delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-3 border-t-2 border-primary pt-5">
                  <span className="font-display text-[3.5rem] leading-none text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-h3">{p.titolo}</p>
                  <p className="text-sm text-fg-muted">{p.testo}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
