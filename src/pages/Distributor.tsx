// Rivenditori e distributori: promessa → chi c'è dietro → due formule (+ rimando al franchising)
// → listino indicativo → come funziona → richiesta → FAQ. Pagina di acquisizione B2B.
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Consenso, Numeri, Requisiti } from '@/components/sections/B2B'
import { FaqLista } from '@/components/sections/FaqLista'
import { GruppoForza } from '@/components/sections/GruppoForza'
import { Passi } from '@/components/sections/Passi'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Campo, selectCls } from '@/components/ui/Campo'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Parallax } from '@/components/ui/Parallax'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { TestoRivelato } from '@/components/ui/TestoRivelato'
import { distributore } from '@/data/contenuti'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

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
                href="#formule"
                className="inline-flex h-12 items-center rounded-button px-6 label text-[0.75rem] ring-2 ring-primary-fg transition duration-200 ease-out-soft ring-inset hocus:bg-primary-fg hocus:text-primary"
              >
                Vedi le formule
              </a>
            </div>
            <Numeri numeri={distributore.numeri} />
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

      <GruppoForza />

      {/* ---------- Formule ---------- */}
      <Section id="formule" tone="alt" className="scroll-mt-24">
        <Container>
          <SectionHeader
            eyebrow="Formule"
            title="Scegli come entrare."
            subtitle="Stesso prodotto, stessa forza dietro. Cambia quanto muovi, e quanto ti resta in tasca."
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

            {/* rimando al franchising */}
            <li>
              <Reveal delay={160} className="h-full">
                <Link
                  to="/franchising"
                  className="group flex h-full flex-col justify-between gap-6 rounded-card border-2 border-dashed border-primary/40 p-6 transition duration-300 ease-out-soft md:p-8 hocus:border-primary"
                >
                  <div>
                    <p className="label text-[0.6875rem] text-fg-muted">
                      Un negozio col nostro marchio
                    </p>
                    <h3 className="mt-2 text-h2">Franchising</h3>
                    <p className="mt-4 font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none text-primary uppercase">
                      60&nbsp;%
                    </p>
                    <p className="mt-3 text-sm text-fg-muted">
                      di ogni vendita resta a te. Insegna The Hasher, esclusiva di zona, starter
                      pack con il catalogo completo.
                    </p>
                  </div>
                  <span className="flex items-center gap-2 label text-[0.75rem] text-primary">
                    Scopri il franchising
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </li>
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
                    <dl className="mt-5 grid grid-cols-2 gap-2">
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

      <Passi
        eyebrow="Come funziona"
        titolo="Quattro passi, niente burocrazia."
        passi={distributore.passi}
        tone="alt"
      />

      {/* ---------- Requisiti + modulo ---------- */}
      <Section id="richiesta" className="scroll-mt-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Requisiti voci={distributore.requisiti} />
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
                <label htmlFor="b-formula" className="label text-[0.625rem] text-fg-muted">
                  Formula
                </label>
                <select
                  id="b-formula"
                  name="formula"
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
                  <option>Fino a 2.000 €</option>
                  <option>2.000 – 5.000 €</option>
                  <option>5.000 – 20.000 €</option>
                  <option>Oltre 20.000 €</option>
                </select>
              </div>
            </div>
            <Consenso />
            <Button type="submit" size="lg" className="self-start">
              Richiedi il listino <ArrowRight className="size-4" />
            </Button>
            <Badge variant="muted" className="self-start">
              Prototipo: il modulo non invia nulla
            </Badge>
          </form>
        </Container>
      </Section>

      <FaqLista nome="faq-b2b" faq={distributore.faq} />
    </>
  )
}
