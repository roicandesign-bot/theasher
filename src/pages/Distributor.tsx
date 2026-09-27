// Rivenditori e distributori: promessa → perché conviene → livelli → listino indicativo
// → come funziona → requisiti e richiesta → FAQ. Pagina di acquisizione B2B.
import { ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Parallax } from '@/components/ui/Parallax'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { TestoRivelato } from '@/components/ui/TestoRivelato'
import { distributore } from '@/data/contenuti'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

const selectCls =
  'h-12 rounded-input bg-bg-alt px-4 text-base text-fg ring-1 ring-line ring-inset focus:ring-2 focus:ring-primary focus:outline-none'

export default function Distributor() {
  return (
    <>
      {/* ---------- Promessa ---------- */}
      <Section tone="yellow" className="overflow-hidden py-14 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow tone="dark">{distributore.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-h1">
              <TestoRivelato text={distributore.titolo} />
            </h1>
            <p className="mt-5 max-w-prose text-lead text-primary-fg/80">{distributore.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#richiesta" variant="dark" size="lg">
                Richiedi il listino <ArrowRight className="size-4" />
              </Button>
              <a
                href="#livelli"
                className="inline-flex h-12 items-center rounded-button px-6 label text-[0.75rem] ring-2 ring-primary-fg transition duration-200 ease-out-soft ring-inset hocus:bg-primary-fg hocus:text-primary"
              >
                Vedi i livelli
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-primary-fg/20 pt-6">
              {distributore.numeri.map((n) => (
                <div key={n.etichetta}>
                  <dt className="sr-only">{n.etichetta}</dt>
                  <dd className="font-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-none uppercase">
                    {n.valore}
                  </dd>
                  <dd className="mt-2 text-xs text-primary-fg/70">{n.etichetta}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-square">
            <Parallax distanza={32} className="size-full">
              <img
                src={asset('images/demo/packaging-family.jpg')}
                alt="La gamma The Hasher confezionata: busta per i fiori e barattoli per hash ed estratti"
                className="size-full scale-[1.1] object-cover"
              />
            </Parallax>
          </div>
        </Container>
      </Section>

      {/* ---------- Perché conviene ---------- */}
      <Section>
        <Container>
          <SectionHeader eyebrow="Perché conviene" title="Dal produttore al tuo scaffale." />
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

      {/* ---------- Livelli di partnership ---------- */}
      <Section id="livelli" tone="alt" className="scroll-mt-24">
        <Container>
          <SectionHeader
            eyebrow="Livelli"
            title="Scegli come partire."
            subtitle="Tre livelli, stesso prodotto. Cambia quanto muovi, e quanto ti resta in tasca."
          />
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {distributore.livelli.map((l, i) => (
              <li key={l.nome}>
                <Reveal delay={i * 80} className="h-full">
                  <article
                    className={cn(
                      'relative flex h-full flex-col gap-6 rounded-card p-6 md:p-8',
                      l.evidenza
                        ? 'bg-primary text-primary-fg ring-2 ring-primary'
                        : 'bg-surface ring-1 ring-line ring-inset',
                    )}
                  >
                    {l.evidenza && (
                      <Badge className="absolute top-5 right-5 bg-primary-fg text-primary">
                        Il più scelto
                      </Badge>
                    )}
                    <div>
                      <p
                        className={cn(
                          'label text-[0.6875rem]',
                          l.evidenza ? 'text-primary-fg/70' : 'text-fg-muted',
                        )}
                      >
                        {l.perChi}
                      </p>
                      <h3 className="mt-2 text-h2">{l.nome}</h3>
                    </div>
                    <div>
                      <p
                        className={cn(
                          'label text-[0.625rem]',
                          l.evidenza ? 'text-primary-fg/70' : 'text-fg-muted',
                        )}
                      >
                        Il tuo margine
                      </p>
                      <p
                        className={cn(
                          'mt-1 font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none uppercase',
                          !l.evidenza && 'text-primary',
                        )}
                      >
                        {l.margine}
                      </p>
                      <p
                        className={cn(
                          'mt-3 text-sm',
                          l.evidenza ? 'text-primary-fg/80' : 'text-fg-muted',
                        )}
                      >
                        {l.minimo}
                      </p>
                    </div>
                    <ul
                      className={cn(
                        'flex flex-col gap-3 border-t pt-5',
                        l.evidenza ? 'border-primary-fg/20' : 'border-line',
                      )}
                    >
                      {l.punti.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm">
                          <Check
                            className={cn(
                              'mt-0.5 size-4 shrink-0',
                              l.evidenza ? 'text-primary-fg' : 'text-primary',
                            )}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <Button
                      href="#richiesta"
                      variant={l.evidenza ? 'dark' : 'outline'}
                      className="mt-auto"
                    >
                      Parti da qui <ArrowRight className="size-4" />
                    </Button>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- Listino indicativo ---------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Listino indicativo"
            title="I numeri, senza giri."
            subtitle="Prezzo al grammo, IVA esclusa, sul formato più venduto. Il listino completo con tutti i formati arriva dopo la prima chiamata."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {distributore.listino.map((r, i) => (
              <li key={r.categoria}>
                <Reveal delay={i * 60} className="h-full">
                  <div className="h-full rounded-card bg-surface p-5 ring-1 ring-line ring-inset md:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-h3">{r.categoria}</h3>
                      <p className="text-right text-xs text-fg-muted">
                        al pubblico
                        <span className="ml-2 text-sm text-fg line-through decoration-fg-subtle">
                          {r.pubblico}
                        </span>
                      </p>
                    </div>
                    <dl className="mt-5 grid grid-cols-3 gap-2">
                      {distributore.livelli.map((l, n) => (
                        <div
                          key={l.nome}
                          className={cn(
                            'rounded-[0.75rem] p-3',
                            l.evidenza ? 'bg-primary text-primary-fg' : 'bg-bg-alt',
                          )}
                        >
                          <dt
                            className={cn(
                              'label text-[0.5625rem] leading-tight',
                              l.evidenza ? 'text-primary-fg/70' : 'text-fg-muted',
                            )}
                          >
                            {l.nome}
                          </dt>
                          <dd className="mt-1.5 text-lg font-semibold tabular-nums">
                            {r.prezzi[n]}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-fg-muted">
            Valori indicativi: il listino definitivo dipende da zona, volumi e formati.
          </p>
        </Container>
      </Section>

      {/* ---------- Come funziona ---------- */}
      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow="Come funziona" title="Quattro passi, niente burocrazia." />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {distributore.passi.map((p, i) => (
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

      {/* ---------- Requisiti + modulo ---------- */}
      <Section id="richiesta" className="scroll-mt-24">
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
            <div>
              <p className="text-h3">Richiedi il listino</p>
              <p className="mt-2 text-sm text-fg-muted">Ti richiamiamo entro 48 ore lavorative.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="b-azienda" label="Ragione sociale" required />
              <Campo id="b-piva" label="Partita IVA" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="b-ref" label="Referente" autoComplete="name" required />
              <Campo id="b-email" label="Email" type="email" autoComplete="email" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="b-tel" label="Telefono / WhatsApp" type="tel" autoComplete="tel" />
              <Campo id="b-paese" label="Paese e zona" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="b-livello" className="label text-[0.625rem] text-fg-muted">
                  Livello che ti interessa
                </label>
                <select
                  id="b-livello"
                  name="livello"
                  className={selectCls}
                  defaultValue="Distributore"
                >
                  {distributore.livelli.map((l) => (
                    <option key={l.nome}>{l.nome}</option>
                  ))}
                  <option>Non so ancora</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="b-volume" className="label text-[0.625rem] text-fg-muted">
                  Volume mensile stimato
                </label>
                <select id="b-volume" name="volume" className={selectCls}>
                  <option>Fino a 1.000 €</option>
                  <option>1.000 – 5.000 €</option>
                  <option>5.000 – 20.000 €</option>
                  <option>Oltre 20.000 €</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="b-note" className="label text-[0.625rem] text-fg-muted">
                Note
              </label>
              <textarea
                id="b-note"
                name="note"
                rows={3}
                className="rounded-input bg-bg-alt px-4 py-3 text-base text-fg ring-1 ring-line transition ring-inset placeholder:text-fg-subtle focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Che tipo di attività hai, quanti punti vendita, che gamma ti interessa"
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-fg-muted">
              <input type="checkbox" required className="mt-1 size-4 accent-primary" />
              Dichiaro di operare nel rispetto delle norme del mio Paese e accetto l’informativa
              privacy.
            </label>
            <Button type="submit" size="lg" className="self-start">
              Richiedi il listino <ArrowRight className="size-4" />
            </Button>
            <Badge variant="muted" className="self-start">
              Prototipo: il modulo non invia nulla
            </Badge>
          </form>
        </Container>
      </Section>

      {/* ---------- FAQ B2B ---------- */}
      <Section tone="alt">
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
