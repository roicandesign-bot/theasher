// Diventa distributore: promessa B2B → cosa offriamo → requisiti → modulo → FAQ
import { ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { distributore } from '@/data/contenuti'
import { asset } from '@/lib/asset'

export default function Distributor() {
  return (
    <>
      {/* Promessa */}
      <Section tone="yellow" className="py-14 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow tone="dark">{distributore.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-h1">{distributore.titolo}</h1>
            <p className="mt-5 max-w-prose text-lead text-primary-fg/80">{distributore.lead}</p>
            <Button href="#richiesta" variant="dark" size="lg" className="mt-8">
              Manda la richiesta <ArrowRight className="size-4" />
            </Button>
          </div>
          <img
            src={asset('images/demo/packaging-family.jpg')}
            alt="Gamma The Hasher"
            className="w-full rounded-card object-cover ring-4 ring-bg"
          />
        </Container>
      </Section>

      {/* Cosa offriamo */}
      <Section>
        <Container>
          <SectionHeader eyebrow="Cosa ricevi" title="Quello che serve per vendere." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {distributore.offriamo.map((o, i) => (
              <li key={o.titolo}>
                <Reveal delay={i * 60} className="h-full">
                  <Card className="flex h-full flex-col gap-3">
                    <Diamond className="size-4" />
                    <p className="font-display text-h3 uppercase">{o.titolo}</p>
                    <p className="text-sm text-fg-muted">{o.testo}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Requisiti + modulo */}
      <Section tone="alt" id="richiesta" className="scroll-mt-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>Requisiti</Eyebrow>
            <h2 className="mt-3 text-h2">Chi cerchiamo.</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {distributore.requisiti.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-fg-muted">{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-fg-muted">
              Le regole di vendita cambiano da Paese a Paese: prima di aprire un nuovo mercato
              verifichiamo insieme cosa è ammesso dove operi.
            </p>
          </div>

          <form
            className="flex flex-col gap-5 rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <p className="text-h3">Richiesta rivenditore</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="b-azienda" label="Ragione sociale" required />
              <Campo id="b-piva" label="Partita IVA" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="b-ref" label="Referente" autoComplete="name" required />
              <Campo id="b-email" label="Email" type="email" autoComplete="email" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="b-tel" label="Telefono" type="tel" autoComplete="tel" />
              <Campo id="b-paese" label="Paese di attività" required />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="b-tipo" className="label text-[0.625rem] text-fg-muted">
                Tipo di attività
              </label>
              <select
                id="b-tipo"
                name="tipo"
                className="h-12 rounded-input bg-bg-alt px-4 text-base text-fg ring-1 ring-line ring-inset focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option>Negozio fisico</option>
                <option>Catena di negozi</option>
                <option>E-commerce</option>
                <option>Grossista / distributore</option>
                <option>Altro</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="b-volumi" className="label text-[0.625rem] text-fg-muted">
                Volumi indicativi e note
              </label>
              <textarea
                id="b-volumi"
                name="volumi"
                rows={4}
                className="rounded-input bg-bg-alt px-4 py-3 text-base text-fg ring-1 ring-line transition ring-inset placeholder:text-fg-subtle focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Quanto pensi di muovere al mese, che gamma ti interessa"
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-fg-muted">
              <input type="checkbox" required className="mt-1 size-4 accent-primary" />
              Dichiaro di operare nel rispetto delle norme del mio Paese e accetto l’informativa
              privacy.
            </label>
            <Button type="submit" size="lg" className="self-start">
              Invia la richiesta <ArrowRight className="size-4" />
            </Button>
            <Badge variant="muted" className="self-start">
              Prototipo: il modulo non invia nulla
            </Badge>
          </form>
        </Container>
      </Section>

      {/* FAQ B2B */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Domande frequenti</Eyebrow>
            <h2 className="mt-3 text-h2">Prima che tu lo chieda.</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {distributore.faq.map((f) => (
              <details key={f.q} name="faq-b2b" className="group">
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
    </>
  )
}

function Campo({
  id,
  label,
  ...rest
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-[0.625rem] text-fg-muted">
        {label}
      </label>
      <Input id={id} name={id} {...rest} />
    </div>
  )
}
