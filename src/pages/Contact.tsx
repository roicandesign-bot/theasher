// Contatti: canali → modulo (solo UI) → dati del venditore
import { ArrowRight, Mail } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Section } from '@/components/ui/Section'
import { contatti } from '@/data/contenuti'
import { site } from '@/data/site'

export default function Contact() {
  return (
    <Section>
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow>{contatti.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-h1">{contatti.titolo}</h1>
          <p className="mt-5 max-w-prose text-lead text-fg-muted">{contatti.lead}</p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {contatti.canali.map((c) => (
              <li key={c.titolo}>
                <Card className="flex h-full flex-col gap-2">
                  <p className="label text-[0.625rem] text-primary">{c.titolo}</p>
                  <p className="flex items-center gap-2 text-sm break-all">
                    <Mail className="size-4 shrink-0 text-fg-muted" />
                    {c.valore}
                  </p>
                  {c.nota && <p className="text-xs text-fg-muted">{c.nota}</p>}
                </Card>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-line pt-6">
            <p className="label text-[0.75rem] text-fg-muted">Venditore</p>
            <p className="mt-3 text-sm text-fg-muted">{site.footer.seller}</p>
            <Badge variant="muted" className="mt-3">
              Dati societari da completare prima del lancio
            </Badge>
          </div>
        </div>

        <form
          className="flex flex-col gap-5 rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="text-h3">Modulo di contatto</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo id="c-nome" label="Nome" autoComplete="given-name" required />
            <Campo id="c-email" label="Email" type="email" autoComplete="email" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="c-motivo" className="label text-[0.625rem] text-fg-muted">
              Di cosa si tratta
            </label>
            <select
              id="c-motivo"
              name="motivo"
              className="h-12 rounded-input bg-bg-alt px-4 text-base text-fg ring-1 ring-line ring-inset focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {contatti.motivi.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
          <Campo id="c-ordine" label="Numero ordine (se ce l’hai)" placeholder="TH-…" />
          <div className="flex flex-col gap-2">
            <label htmlFor="c-msg" className="label text-[0.625rem] text-fg-muted">
              Messaggio
            </label>
            <textarea
              id="c-msg"
              name="messaggio"
              rows={5}
              required
              className="rounded-input bg-bg-alt px-4 py-3 text-base text-fg ring-1 ring-line transition ring-inset placeholder:text-fg-subtle focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Scrivi qui"
            />
          </div>
          <label className="flex items-start gap-3 text-sm text-fg-muted">
            <input type="checkbox" required className="mt-1 size-4 accent-primary" />
            Ho letto l’informativa privacy e acconsento al trattamento dei dati per rispondere alla
            mia richiesta.
          </label>
          <Button type="submit" size="lg" className="self-start">
            Invia <ArrowRight className="size-4" />
          </Button>
          <Badge variant="muted" className="self-start">
            Prototipo: il modulo non invia nulla
          </Badge>
        </form>
      </Container>
    </Section>
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
