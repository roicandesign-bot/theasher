// Domande frequenti: raggruppate per tema, con rimando ai contatti
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { faqGenerali } from '@/data/contenuti'

export default function Faq() {
  return (
    <>
      <Section className="pb-8">
        <Container>
          <Eyebrow>Domande frequenti</Eyebrow>
          <h1 className="mt-4 text-h1">Chiaro e diretto.</h1>
          <p className="mt-5 max-w-prose text-lead text-fg-muted">
            Le risposte che evitano una mail. Se quello che cerchi non c’è, scrivici: rispondiamo
            entro un giorno lavorativo.
          </p>
        </Container>
      </Section>

      <Container className="pb-section">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-label="Temi" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {faqGenerali.map((g) => (
                <li key={g.gruppo}>
                  <a
                    href={`#${g.gruppo.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex rounded-button px-4 py-2.5 label text-[0.6875rem] text-fg-muted ring-1 ring-line transition ring-inset hocus:text-primary"
                  >
                    {g.gruppo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-12">
            {faqGenerali.map((g) => (
              <section
                key={g.gruppo}
                id={g.gruppo.toLowerCase().replace(/\s+/g, '-')}
                className="scroll-mt-28"
              >
                <h2 className="text-h2">{g.gruppo}</h2>
                <div className="mt-5 divide-y divide-line border-y border-line">
                  {g.voci.map((f) => (
                    <details key={f.q} className="group">
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
              </section>
            ))}

            <div className="flex flex-col items-start gap-4 rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8">
              <p className="text-h3">Non hai trovato la risposta?</p>
              <p className="max-w-prose text-fg-muted">
                Scrivici: se la domanda torna spesso, finisce qui dentro.
              </p>
              <Button to="/contatti">Scrivici</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
