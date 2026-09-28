// Franchising «Own The Hasher»: pagina di acquisizione partner e investitori.
// Promessa → manifesto → modello 60/40 e condizioni → il tuo negozio (mockup, formati) → linee esclusive
// → sistema → rebate e territorio → carriera → chi c'è dietro → Founder Program → calcolatore
// → starter pack → selezione → candidatura e deck → FAQ. Barra fissa su telefono.
import {
  ArrowRight,
  BadgePercent,
  Building2,
  Check,
  Cpu,
  Crown,
  GraduationCap,
  Megaphone,
  Scale,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { Consenso, Numeri } from '@/components/sections/B2B'
import { FaqLista } from '@/components/sections/FaqLista'
import { GruppoForza } from '@/components/sections/GruppoForza'
import { Passi } from '@/components/sections/Passi'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Campo, selectCls } from '@/components/ui/Campo'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Parallax } from '@/components/ui/Parallax'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { TestoRivelato } from '@/components/ui/TestoRivelato'
import { franchising as f } from '@/data/contenuti'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

const euro = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const iconeSistema = [
  Sparkles,
  Crown,
  ShoppingCart,
  BadgePercent,
  Megaphone,
  Cpu,
  GraduationCap,
  Scale,
]

export default function Franchising() {
  return (
    <>
      {/* ---------- Promessa ---------- */}
      <Section tone="yellow" className="overflow-hidden py-14 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow tone="dark">{f.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-display leading-[0.9]">
              <TestoRivelato text={f.titolo} />
            </h1>
            <p className="mt-5 max-w-prose text-lead text-primary-fg/80">{f.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#candidatura" variant="dark" size="lg">
                Candidati ora <ArrowRight className="size-4" />
              </Button>
              <a
                href="#deck"
                className="inline-flex h-12 items-center rounded-button px-6 label text-[0.75rem] ring-2 ring-primary-fg transition duration-200 ease-out-soft ring-inset hocus:bg-primary-fg hocus:text-primary"
              >
                Scarica il franchise deck
              </a>
            </div>
            <Numeri numeri={f.numeri} />
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-card lg:aspect-[4/3]">
            <Parallax distanza={32} className="size-full">
              <img
                src={asset(f.esterno.img)}
                alt={f.esterno.alt}
                fetchPriority="high"
                className="size-full scale-[1.1] object-cover"
              />
            </Parallax>
          </div>
        </Container>
      </Section>

      {/* ---------- Manifesto ---------- */}
      <Section className="py-16 md:py-24">
        <Container>
          <Reveal>
            <p className="max-w-5xl font-display text-[clamp(2rem,1.2rem+3.5vw,4.5rem)] leading-[0.95] text-balance uppercase">
              {f.manifesto.split('. ')[0]}.{' '}
              <span className="text-primary">{f.manifesto.split('. ')[1]}</span>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------- Modello e condizioni ---------- */}
      <Section tone="alt">
        <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{f.modello.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2">
              <TestoRivelato text={f.modello.titolo} />
            </h2>
            <p className="mt-5 max-w-prose text-lead text-fg-muted">{f.modello.testo}</p>
            <div className="mt-8 rounded-card bg-surface p-6 ring-1 ring-line ring-inset">
              <p className="label text-[0.6875rem] text-fg-muted">Ogni 100 € di venduto</p>
              <div className="mt-4 flex h-16 overflow-hidden rounded-[0.875rem]">
                <div className="flex w-[60%] items-center bg-primary px-5 text-primary-fg">
                  <span className="font-display text-[2rem] leading-none">60 €</span>
                </div>
                <div className="flex w-[40%] items-center bg-bg-alt px-5">
                  <span className="font-display text-[1.6rem] leading-none text-fg-muted">
                    40 €
                  </span>
                </div>
              </div>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {f.modello.ripartizione.map((r, i) => (
                  <li key={r.chi} className="flex flex-col gap-1">
                    <span
                      className={cn(
                        'label text-[0.75rem]',
                        i === 0 ? 'text-primary' : 'text-fg-muted',
                      )}
                    >
                      {r.quota} · {r.chi}
                    </span>
                    <span className="text-sm text-fg-muted">{r.cosa}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Reveal>
            <div className="rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8">
              <p className="text-h3">Le condizioni</p>
              <dl className="mt-5 divide-y divide-line">
                {f.condizioni.map((c) => (
                  <div key={c.voce} className="flex items-baseline justify-between gap-4 py-4">
                    <dt className="text-fg-muted">{c.voce}</dt>
                    <dd
                      className={cn(
                        'text-right font-semibold tabular-nums',
                        c.valore === '0 %' && 'font-display text-2xl text-primary',
                      )}
                    >
                      {c.valore}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-fg-muted">
                Condizioni di lancio indicative: il piano definitivo per la tua zona arriva prima
                della firma.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------- Il tuo negozio ---------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Il tuo negozio"
            title="Progettato per funzionare."
            subtitle="Tre formati per tre capacità di investimento. Stessa identità, stesso prodotto, stessa macchina dietro."
          />
          <ul className="mt-10 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            {f.mockup.map((m, i) => (
              <li key={m.titolo}>
                <Reveal delay={i * 90} className="h-full">
                  <figure className="group relative aspect-[3/2] h-full overflow-hidden rounded-card ring-1 ring-line lg:aspect-auto">
                    <Parallax distanza={i === 0 ? 28 : 18} className="size-full">
                      <img
                        src={asset(m.img)}
                        alt={m.alt}
                        loading="lazy"
                        className="size-full scale-[1.08] object-cover transition duration-700 ease-out-soft group-hover:scale-[1.12]"
                      />
                    </Parallax>
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/70 to-transparent p-5 pt-16">
                      <p className="font-display text-h3 uppercase">{m.titolo}</p>
                      <p className="mt-1 text-sm text-fg-muted">{m.testo}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-fg-subtle">
            Render di progetto: arredi e allestimento definitivi su misura del locale.
          </p>

          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {f.formati.map((fo, i) => (
              <li key={fo.nome}>
                <Reveal delay={i * 80} className="h-full">
                  <article
                    className={cn(
                      'flex h-full flex-col gap-4 rounded-card p-6 md:p-8',
                      fo.evidenza
                        ? 'bg-primary text-primary-fg ring-2 ring-primary'
                        : 'bg-surface ring-1 ring-line ring-inset',
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-h2">{fo.nome}</h3>
                      <span
                        className={cn(
                          'label text-[0.75rem]',
                          fo.evidenza ? 'text-primary-fg/70' : 'text-primary',
                        )}
                      >
                        {fo.mq}
                      </span>
                    </div>
                    <p className={fo.evidenza ? 'text-primary-fg/80' : 'text-fg-muted'}>
                      {fo.testo}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- Linee esclusive ---------- */}
      <section
        aria-label="Linee esclusive"
        className="overflow-hidden border-y border-line bg-bg py-10"
      >
        <Container>
          <p className="label text-[0.6875rem] text-fg-muted">Solo nella rete The Hasher</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {f.linee.map((l, i) => (
              <li key={l}>
                <Reveal delay={i * 60}>
                  <span className="font-display text-[clamp(2rem,1.2rem+3vw,4rem)] leading-none text-transparent uppercase [-webkit-text-stroke:1px_var(--color-primary)]">
                    {l}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- Il sistema ---------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow={f.ecosistema.eyebrow}
            title={f.ecosistema.titolo}
            subtitle={f.ecosistema.testo}
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {f.ecosistema.voci.map((o, i) => {
              const Icon = iconeSistema[i] ?? Sparkles
              return (
                <li key={o.titolo}>
                  <Reveal delay={(i % 4) * 60} className="h-full">
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

      {/* ---------- Rebate e territorio ---------- */}
      <Section tone="alt">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Più cresci, meno paghi</Eyebrow>
            <h2 className="mt-3 text-h2">
              <TestoRivelato text="Rebate progressivi." />
            </h2>
            <p className="mt-4 max-w-prose text-fg-muted">
              A fine anno ti restituiamo una parte degli acquisti. Più volume generi, più ti torna
              indietro.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {f.rebate.map((r, i) => (
                <li key={r.soglia}>
                  <Reveal delay={i * 70}>
                    <div className="rounded-card bg-surface p-4 ring-1 ring-line ring-inset">
                      <p className="font-display text-[2.25rem] leading-none text-primary">
                        {r.valore}
                      </p>
                      <p className="mt-2 text-xs text-fg-muted">da {r.soglia} di acquisti</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-fg-subtle">Soglie annuali indicative.</p>
          </div>
          <div>
            <Eyebrow>Territorio</Eyebrow>
            <h2 className="mt-3 text-h2">
              <TestoRivelato text={f.territorio.titolo} />
            </h2>
            <p className="mt-4 max-w-prose text-lead text-fg-muted">{f.territorio.testo}</p>
          </div>
        </Container>
      </Section>

      {/* ---------- Carriera ---------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="La tua carriera"
            title="Da un negozio a un Paese."
            subtitle="Il partner migliore non pensa «ormai so farlo, esco». Pensa «dove apro il prossimo»."
          />
          <ol className="mt-10 grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {f.carriera.map((c, i) => (
              <li key={c.livello}>
                <Reveal delay={i * 90}>
                  <div
                    className={cn(
                      'flex flex-col justify-end rounded-card p-5 ring-1 ring-inset',
                      i === 3 ? 'bg-primary text-primary-fg ring-primary' : 'bg-surface ring-line',
                    )}
                    style={{ minHeight: `${9 + i * 3}rem` }}
                  >
                    <span
                      className={cn(
                        'label text-[0.625rem]',
                        i === 3 ? 'text-primary-fg/70' : 'text-primary',
                      )}
                    >
                      Livello {i + 1}
                    </span>
                    <p className="mt-2 font-display text-h3 uppercase">{c.livello}</p>
                    <p
                      className={cn(
                        'mt-1 text-sm',
                        i === 3 ? 'text-primary-fg/80' : 'text-fg-muted',
                      )}
                    >
                      {c.cosa}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <GruppoForza tone="alt" />

      {/* ---------- Founder Program ---------- */}
      <Section tone="yellow" className="overflow-hidden">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow tone="dark">{f.founder.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-display leading-[0.9]">
              <TestoRivelato text={f.founder.titolo} />
            </h2>
            <p className="mt-5 max-w-prose text-lead text-primary-fg/80">{f.founder.testo}</p>
            <Button href="#candidatura" variant="dark" size="lg" className="mt-8">
              Voglio essere un Founder <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="rounded-card bg-bg p-6 text-fg md:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="label text-[0.6875rem] text-fg-muted">Posti Founder</p>
              <p className="font-display text-[3rem] leading-none text-primary">
                {f.founder.posti}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-10 gap-1.5" aria-hidden="true">
              {Array.from({ length: f.founder.posti }).map((_, i) => (
                <span key={i} className="aspect-square rounded-[0.35rem] bg-primary" />
              ))}
            </div>
            <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
              {f.founder.vantaggi.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Calcolatore />

      {/* ---------- Starter pack ---------- */}
      <Section tone="alt" className="overflow-hidden">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{f.starter.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-display leading-[0.9]">
              <TestoRivelato text={f.starter.titolo} className="text-primary" />
            </h2>
            <p className="mt-5 max-w-prose text-lead text-fg-muted">{f.starter.testo}</p>
            <ul className="mt-8 flex flex-col gap-3">
              {f.starter.contenuto.map((c, i) => (
                <li key={c}>
                  <Reveal delay={i * 50}>
                    <span className="flex items-start gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span>{c}</span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {f.starter.famiglie.map((fam, i) => (
              <li key={fam.nome}>
                <Reveal delay={i * 90}>
                  <div className="group relative aspect-square overflow-hidden rounded-card ring-1 ring-line">
                    <img
                      src={asset(fam.img)}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover transition duration-700 ease-out-soft group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/70 to-transparent p-4 pt-12">
                      <p className="font-display text-h3 uppercase">{fam.nome}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Passi
        eyebrow="Selezione"
        titolo="Scegliamo i partner uno per uno."
        passi={f.selezione}
        colonne={3}
      />

      {/* ---------- Candidatura ---------- */}
      <Section id="candidatura" tone="alt" className="scroll-mt-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <div>
              <Eyebrow>Chi cerchiamo</Eyebrow>
              <h2 className="mt-3 text-h2">Gente che vuole costruire.</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {f.cerchiamo.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="text-fg-muted">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Territori />
            <Deck />
          </div>

          <form
            className="flex flex-col gap-5 rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <p className="text-h3">Candidati come partner</p>
              <p className="mt-2 text-sm text-fg-muted">
                Due minuti. Ti richiamiamo entro 48 ore con il piano per la tua zona.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo id="f-nome" label="Nome e cognome" autoComplete="name" required />
              <Campo id="f-email" label="Email" type="email" autoComplete="email" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                id="f-tel"
                label="Telefono / WhatsApp"
                type="tel"
                autoComplete="tel"
                required
              />
              <Campo id="f-citta" label="Città e zona" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Tendina
                id="f-formato"
                label="Formato"
                opzioni={['Corner', 'Store', 'Flagship', 'Più negozi', 'Area o Paese']}
                iniziale="Store"
              />
              <Tendina
                id="f-capitale"
                label="Capitale disponibile"
                opzioni={[
                  'Fino a 30.000 €',
                  '30.000 – 60.000 €',
                  '60.000 – 150.000 €',
                  'Oltre 150.000 €',
                ]}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Tendina
                id="f-locale"
                label="Hai già un locale?"
                opzioni={[
                  'Sì, ho già un locale',
                  'Ho un negozio da trasformare',
                  'Lo sto cercando',
                  'Mi serve aiuto a trovarlo',
                ]}
              />
              <Tendina
                id="f-quando"
                label="Quando vorresti aprire?"
                opzioni={['Il prima possibile', 'Entro 3 mesi', 'Entro 6 mesi', 'Sto valutando']}
              />
            </div>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1 size-4 accent-primary" defaultChecked />
              Voglio entrare nel Founder Program (primi 20 partner)
            </label>
            <Consenso />
            <Button type="submit" size="lg" className="self-start">
              Invia la candidatura <ArrowRight className="size-4" />
            </Button>
            <Badge variant="muted" className="self-start">
              Prototipo: il modulo non invia nulla
            </Badge>
          </form>
        </Container>
      </Section>

      <FaqLista nome="faq-franchising" faq={f.faq} tone="default" />

      {/* spazio per la barra fissa su telefono */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <BarraCandidatura />
    </>
  )
}

function Tendina({
  id,
  label,
  opzioni,
  iniziale,
}: {
  id: string
  label: string
  opzioni: string[]
  iniziale?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-[0.625rem] text-fg-muted">
        {label}
      </label>
      <select id={id} name={id} className={selectCls} defaultValue={iniziale ?? opzioni[0]}>
        {opzioni.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

/** Città aperte ai partner: si tocca per preselezionarla nel modulo. Solo UI. */
function Territori() {
  const [scelta, setScelta] = useState<string | null>(null)
  return (
    <div>
      <Eyebrow>Territori aperti</Eyebrow>
      <p className="mt-3 text-sm text-fg-muted">
        Le prime città del piano di aperture. La tua non c’è? Scrivila nel modulo: valutiamo ogni
        zona.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {f.citta.map((c) => (
          <Chip
            key={c}
            size="sm"
            active={scelta === c}
            onClick={() => {
              setScelta(c)
              const campo = document.getElementById('f-citta') as HTMLInputElement | null
              if (campo) campo.value = c
            }}
          >
            {c}
          </Chip>
        ))}
      </div>
    </div>
  )
}

/** Il franchise deck: si lascia la mail e arriva la presentazione. Solo UI. */
function Deck() {
  const [inviato, setInviato] = useState(false)
  return (
    <div id="deck" className="scroll-mt-28 rounded-card bg-primary p-6 text-primary-fg">
      <Building2 className="size-7" strokeWidth={1.5} />
      <p className="mt-3 text-h3">Il franchise deck</p>
      <p className="mt-2 text-sm text-primary-fg/80">
        Investimento, margini, ipotesi di pareggio, formati, supporto e tempi di apertura. In PDF,
        nella tua mail.
      </p>
      {inviato ? (
        <p className="mt-4 label text-[0.75rem]">Fatto: controlla la posta.</p>
      ) : (
        <form
          className="mt-4 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            setInviato(true)
          }}
        >
          <label htmlFor="deck-email" className="sr-only">
            Email
          </label>
          <Input
            id="deck-email"
            type="email"
            autoComplete="email"
            placeholder="La tua email"
            className="bg-bg text-fg"
          />
          <Button type="submit" variant="dark" className="shrink-0">
            Ricevi il deck
          </Button>
        </form>
      )}
    </div>
  )
}

/** Calcolatore: quanto resta al negozio col 60 %. Solo stato della pagina, nessun invio. */
function Calcolatore() {
  const c = f.calcolo
  const [venduto, setVenduto] = useState(c.iniziale)
  const mese = venduto * 0.6
  return (
    <Section id="conti" className="scroll-mt-24">
      <Container>
        <div className="grid gap-10 rounded-card bg-primary p-6 text-primary-fg md:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow tone="dark">{c.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2">
              <TestoRivelato text={c.titolo} />
            </h2>
            <p className="mt-4 text-lead text-primary-fg/80">{c.testo}</p>
            <label htmlFor="calc-venduto" className="mt-8 block label text-[0.6875rem]">
              Venduto al mese:{' '}
              <span className="font-display text-[1.75rem] leading-none tabular-nums">
                {euro.format(venduto)}
              </span>
            </label>
            <input
              id="calc-venduto"
              type="range"
              min={c.min}
              max={c.max}
              step={c.passo}
              value={venduto}
              onChange={(e) => setVenduto(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer accent-primary-fg"
            />
            <div className="mt-2 flex justify-between text-xs text-primary-fg/60">
              <span>{euro.format(c.min)}</span>
              <span>{euro.format(c.max)}</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1rem] bg-bg p-6 text-fg">
              <p className="label text-[0.625rem] text-fg-muted">Margine lordo, al mese</p>
              <p className="mt-2 font-display text-[clamp(2.25rem,1.5rem+2vw,3.25rem)] leading-none text-primary tabular-nums">
                {euro.format(mese)}
              </p>
            </div>
            <div className="rounded-[1rem] bg-bg p-6 text-fg">
              <p className="label text-[0.625rem] text-fg-muted">In un anno</p>
              <p className="mt-2 font-display text-[clamp(2.25rem,1.5rem+2vw,3.25rem)] leading-none tabular-nums">
                {euro.format(mese * 12)}
              </p>
            </div>
            <p className="text-xs text-primary-fg/70 sm:col-span-2">{c.nota}</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** Barra fissa su telefono: la candidatura è sempre a un tocco. */
function BarraCandidatura() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 label text-[0.6875rem] leading-tight">
          Own The Hasher
          <span className="block text-fg-muted">0 % royalty · 60 % a te</span>
        </p>
        <Button href="#candidatura" size="sm" className="shrink-0">
          Candidati <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
