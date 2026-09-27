import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'

/** Domande frequenti a fisarmonica: se ne apre una alla volta. */
export function FaqLista({
  nome,
  faq,
  tone = 'alt',
}: {
  /** Nome del gruppo: le domande con lo stesso nome si chiudono a vicenda */
  nome: string
  faq: { q: string; a: string }[]
  tone?: 'default' | 'alt'
}) {
  return (
    <Section tone={tone}>
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>Domande frequenti</Eyebrow>
          <h2 className="mt-3 text-h2">Prima che tu lo chieda.</h2>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faq.map((f) => (
            <details key={f.q} name={nome} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-semibold transition hocus:text-primary">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full text-primary ring-1 ring-line transition duration-300 ease-out-soft group-open:rotate-45 group-open:bg-primary group-open:text-primary-fg"
                >
                  +
                </span>
              </summary>
              <p className="max-w-prose fade-in pb-6 text-fg-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
