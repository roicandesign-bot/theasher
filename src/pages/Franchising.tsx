// Franchising: promessa → chi c'è dietro → il modello 60/40 → cosa è incluso → starter pack
// → calcolatore → come funziona → candidatura → FAQ. Pagina di acquisizione franchisee.
import { ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import { Consenso, Numeri, Requisiti } from '@/components/sections/B2B'
import { FaqLista } from '@/components/sections/FaqLista'
import { GruppoForza } from '@/components/sections/GruppoForza'
import { Passi } from '@/components/sections/Passi'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Campo, selectCls } from '@/components/ui/Campo'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Parallax } from '@/components/ui/Parallax'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { TestoRivelato } from '@/components/ui/TestoRivelato'
import { franchising as f } from '@/data/contenuti'
import { asset } from '@/lib/asset'

const euro = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export default function Franchising() {
  return (
    <>
      {/* ---------- Promessa ---------- */}
      <Section tone="yellow" className="overflow-hidden py-14 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow tone="dark">{f.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-h1">
              <TestoRivelato text={f.titolo} />
            </h1>
            <p className="mt-5 max-w-prose text-lead text-primary-fg/80">{f.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#candidatura" variant="dark" size="lg">
                Candidati ora <ArrowRight className="size-4" />
              </Button>
              <a
                href="#conti"
                className="inline-flex h-12 items-center rounded-button px-6 label text-[0.75rem] ring-2 ring-primary-fg transition duration-200 ease-out-soft ring-inset hocus:bg-primary-fg hocus:text-primary"
              >
                Fai i conti
              </a>
            </div>
            <Numeri numeri={f.numeri} />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-square">
            <Parallax distanza={32} className="size-full">
              <img
                src={asset('images/demo/hero-products.jpg')}
                alt="Prodotti The Hasher esposti: barattolo di hash e busta di fiori"
                className="size-full scale-[1.1] object-cover"
              />
            </Parallax>
          </div>
        </Container>
      </Section>

      {/* ---------- Il modello 60/40 ---------- */}
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{f.modello.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2">
              <TestoRivelato text={f.modello.titolo} />
            </h2>
            <p className="mt-5 max-w-prose text-lead text-fg-muted">{f.modello.testo}</p>
          </div>
          <Reveal>
            <div className="rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8">
              <p className="label text-[0.6875rem] text-fg-muted">Ogni 100 € di venduto</p>
              <div className="mt-4 flex h-20 overflow-hidden rounded-[0.875rem]">
                <div className="flex w-[60%] items-center bg-primary px-5 text-primary-fg">
                  <span className="font-display text-[2.5rem] leading-none">60 €</span>
                </div>
                <div className="flex w-[40%] items-center bg-bg-alt px-5">
                  <span className="font-display text-[2rem] leading-none text-fg-muted">40 €</span>
                </div>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {f.modello.ripartizione.map((r, i) => (
                  <li key={r.chi} className="flex flex-col gap-1">
                    <span
                      className={
                        i === 0
                          ? 'label text-[0.75rem] text-primary'
                          : 'label text-[0.75rem] text-fg-muted'
                      }
                    >
                      {r.quota} · {r.chi}
                    </span>
                    <span className="text-sm text-fg-muted">{r.cosa}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <GruppoForza tone="alt" />

      {/* ---------- Cosa è incluso ---------- */}
      <Section>
        <Container>
          <SectionHeader eyebrow="Cosa è incluso" title="Tu apri. Noi facciamo il resto." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {f.inclusi.map((o, i) => (
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

      <Calcolatore />

      <Passi
        eyebrow="Come funziona"
        titolo="Dalla candidatura all’apertura."
        passi={f.passi}
        tone="alt"
      />

      {/* ---------- Candidatura ---------- */}
      <Section id="candidatura" className="scroll-mt-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Requisiti voci={f.requisiti} />
          <form
            className="flex flex-col gap-5 rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <p className="text-h3">Candidati al franchising</p>
              <p className="mt-2 text-sm text-fg-muted">
                Ti richiamiamo entro 48 ore lavorative con il piano per la tua zona.
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
              <div className="flex flex-col gap-2">
                <label htmlFor="f-locale" className="label text-[0.625rem] text-fg-muted">
                  Hai già un locale?
                </label>
                <select id="f-locale" name="locale" className={selectCls}>
                  <option>Sì, ho già un locale</option>
                  <option>Ho già un negozio da trasformare</option>
                  <option>Lo sto cercando</option>
                  <option>No, mi serve aiuto a trovarlo</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="f-quando" className="label text-[0.625rem] text-fg-muted">
                  Quando vorresti aprire?
                </label>
                <select id="f-quando" name="quando" className={selectCls}>
                  <option>Il prima possibile</option>
                  <option>Entro 3 mesi</option>
                  <option>Entro 6 mesi</option>
                  <option>Sto valutando</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="f-note" className="label text-[0.625rem] text-fg-muted">
                Raccontaci qualcosa di te
              </label>
              <textarea
                id="f-note"
                name="note"
                rows={3}
                className="rounded-input bg-bg-alt px-4 py-3 text-base text-fg ring-1 ring-line transition ring-inset placeholder:text-fg-subtle focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Cosa fai oggi, perché ti interessa, com’è la zona"
              />
            </div>
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

      <FaqLista nome="faq-franchising" faq={f.faq} />
    </>
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
              <p className="label text-[0.625rem] text-fg-muted">Resta a te, al mese</p>
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
