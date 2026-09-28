// L'azienda: racconto a capitoli. Apertura a tutto schermo → manifesto → linea del tempo
// (la linea gialla si riempie scorrendo) → qualità → piccola vetrina dello shop → porte B2B.
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Parallax } from '@/components/ui/Parallax'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { TestoRivelato } from '@/components/ui/TestoRivelato'
import { azienda as a } from '@/data/contenuti'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

type Capitolo = (typeof a.capitoli)[number]

export default function About() {
  return (
    <>
      {/* ---------- Apertura a tutto schermo ---------- */}
      <section className="relative isolate overflow-hidden">
        <Parallax distanza={70} className="absolute inset-0 -z-20">
          <img
            src={asset(a.hero.img)}
            alt={a.hero.alt}
            fetchPriority="high"
            className="size-full scale-[1.18] object-cover"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/75 to-bg/20"
        />
        <Container className="flex min-h-[82svh] flex-col justify-end pt-32 pb-12 md:pb-16">
          <Eyebrow>{a.hero.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-display leading-[0.88]">
            <TestoRivelato text={a.hero.titolo} />
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-fg/85">{a.hero.lead}</p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-fg/15 pt-6 lg:grid-cols-4">
            {a.numeri.map((n) => (
              <div key={n.etichetta}>
                <dt className="sr-only">{n.etichetta}</dt>
                <dd className="font-display text-[clamp(1.6rem,1rem+2vw,2.75rem)] leading-none text-primary uppercase">
                  {n.valore}
                </dd>
                <dd className="mt-2 max-w-[16rem] text-xs text-fg-muted">{n.etichetta}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------- Manifesto ---------- */}
      <section className="border-y border-line bg-primary py-14 text-primary-fg md:py-20">
        <Container>
          <p className="font-display text-[clamp(2.25rem,1.2rem+4.5vw,6rem)] leading-[0.9] text-balance uppercase">
            <TestoRivelato text={a.manifesto} />
          </p>
        </Container>
      </section>

      {/* ---------- La linea del tempo ---------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="La nostra storia"
            title="Dal seme al barattolo."
            subtitle="Otto capitoli, una sola filiera. Scorri: la linea gialla ti accompagna."
          />
          <Timeline />
        </Container>
      </Section>

      {/* ---------- Qualità ---------- */}
      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow="Quello che non cambia" title="Qualità, senza compromessi." />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.qualita.map((q, i) => (
              <li key={q.titolo}>
                <Reveal delay={i * 70} className="h-full">
                  <Card className="flex h-full flex-col gap-3">
                    <Diamond className="size-4" />
                    <p className="font-display text-h3 uppercase">{q.titolo}</p>
                    <p className="text-sm text-fg-muted">{q.testo}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- Piccola vetrina dello shop ---------- */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="grid items-center gap-8 rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-10 lg:grid-cols-[0.9fr_1.4fr]">
            <div>
              <Eyebrow>{a.shop.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-h2">
                <TestoRivelato text={a.shop.titolo} />
              </h2>
              <p className="mt-4 text-fg-muted">{a.shop.testo}</p>
              <Button to="/negozio" size="lg" className="mt-7">
                Vai allo shop <ArrowRight className="size-4" />
              </Button>
            </div>
            <ul className="grid grid-cols-3 gap-3">
              {a.shop.categorie.map((c, i) => (
                <li key={c.nome}>
                  <Reveal delay={i * 80}>
                    <Link
                      to={c.to}
                      className="group relative block aspect-[3/4] overflow-hidden rounded-card ring-1 ring-line transition duration-300 ease-out-soft hover:ring-2 hover:ring-primary"
                    >
                      <img
                        src={asset(c.img)}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover transition duration-700 ease-out-soft group-hover:scale-105"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-bg via-bg/70 to-transparent p-3 pt-10 font-display text-[clamp(1rem,0.8rem+1vw,1.5rem)] uppercase">
                        {c.nome}
                        <ArrowRight className="size-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ---------- Le porte della rete ---------- */}
      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow={a.rete.eyebrow} title={a.rete.titolo} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.rete.porte.map((p, i) => (
              <li key={p.nome}>
                <Reveal delay={i * 70} className="h-full">
                  <Link
                    to={p.to}
                    className={cn(
                      'group flex h-full flex-col justify-between gap-6 rounded-card p-6 transition duration-300 ease-out-soft',
                      p.nome === 'Franchising'
                        ? 'bg-primary text-primary-fg'
                        : 'bg-surface ring-1 ring-line ring-inset hover:ring-2 hover:ring-primary',
                    )}
                  >
                    <div>
                      <p className="font-display text-[clamp(1.75rem,1.2rem+1.4vw,2.4rem)] leading-none uppercase">
                        {p.nome}
                      </p>
                      <p
                        className={cn(
                          'mt-3 text-sm',
                          p.nome === 'Franchising' ? 'text-primary-fg/80' : 'text-fg-muted',
                        )}
                      >
                        {p.testo}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'flex items-center gap-2 label text-[0.6875rem]',
                        p.nome === 'Franchising' ? 'text-primary-fg' : 'text-primary',
                      )}
                    >
                      Scopri
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}

/** Linea del tempo: la linea gialla si riempie mentre si scorre la storia. */
function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 })

  return (
    <div className="relative mt-14 md:mt-20">
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[17px] w-px bg-line lg:left-1/2"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : scaleY }}
        className="absolute top-0 bottom-0 left-4 w-[3px] origin-top bg-primary lg:left-1/2 lg:-translate-x-px"
      />
      <ol ref={ref} className="flex flex-col gap-16 lg:gap-28">
        {a.capitoli.map((c, i) => (
          <CapitoloVoce key={c.n} c={c} destra={i % 2 === 1} />
        ))}
      </ol>
    </div>
  )
}

function CapitoloVoce({ c, destra }: { c: Capitolo; destra: boolean }) {
  return (
    <li className="relative grid items-center gap-6 pl-14 lg:grid-cols-2 lg:gap-0 lg:pl-0">
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 z-10 grid size-9 place-items-center rounded-full bg-primary font-display text-[0.95rem] text-primary-fg ring-4 ring-bg lg:top-1/2 lg:left-1/2 lg:size-12 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:text-lg"
      >
        {c.n}
      </span>

      <Reveal className={cn(destra ? 'lg:order-2 lg:pl-20' : 'lg:pr-20')}>
        <p className="label text-[0.6875rem] text-primary">
          Capitolo {c.n} · {c.eyebrow}
        </p>
        <h3 className="mt-3 text-h2">
          <TestoRivelato text={c.titolo} />
        </h3>
        <p className="mt-4 max-w-prose text-lead text-fg-muted">{c.testo}</p>
        {'etichette' in c && c.etichette && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {c.etichette.map((e) => (
              <li
                key={e}
                className="rounded-button px-3.5 py-1.5 label text-[0.625rem] text-fg ring-1 ring-line ring-inset"
              >
                {e}
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <Reveal delay={120} className={cn(destra ? 'lg:order-1 lg:pr-20' : 'lg:pl-20')}>
        {'pannello' in c && c.pannello ? (
          <PannelloGestionale />
        ) : (
          'img' in c &&
          c.img && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-line">
              {/* la foto sborda di 30 px sopra e sotto: il parallasse non scopre mai la cornice */}
              <Parallax distanza={30} className="absolute inset-x-0 -inset-y-[30px]">
                <img
                  src={asset(c.img)}
                  alt={c.alt}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </Parallax>
            </div>
          )
        )}
      </Reveal>
    </li>
  )
}

/** Il gestionale, disegnato: una schermata dimostrativa della filiera tracciata. */
function PannelloGestionale() {
  const g = a.gestionale
  return (
    <div className="overflow-hidden rounded-card bg-surface ring-1 ring-line ring-inset">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="flex items-center gap-2 label text-[0.625rem]">
          <span className="size-2 animate-pulse rounded-full bg-primary" /> Filiera · in tempo reale
        </p>
        <span className="rounded-badge bg-bg-alt px-2 py-1 label text-[0.5625rem] text-fg-muted">
          Dati dimostrativi
        </span>
      </div>
      <dl className="grid grid-cols-3 divide-x divide-line border-b border-line">
        {g.kpi.map((k) => (
          <div key={k.etichetta} className="px-4 py-3">
            <dt className="sr-only">{k.etichetta}</dt>
            <dd className="font-display text-2xl leading-none text-primary">{k.valore}</dd>
            <dd className="mt-1 text-[0.6875rem] text-fg-muted">{k.etichetta}</dd>
          </div>
        ))}
      </dl>
      <ul className="divide-y divide-line">
        {g.lotti.map((l) => (
          <li key={l.lotto} className="px-4 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold">
                {l.prodotto}
                <span className="ml-2 label text-[0.5625rem] text-fg-subtle">{l.lotto}</span>
              </p>
              <p className="flex items-center gap-1 text-xs text-fg-muted">
                <Check className="size-3.5 text-primary" /> {l.stato}
              </p>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-1" aria-label={`Fase: ${g.fasi[l.fase]}`}>
              {g.fasi.map((f, i) => (
                <span
                  key={f}
                  title={f}
                  className={cn('h-1.5 rounded-full', i <= l.fase ? 'bg-primary' : 'bg-line')}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <p className="grid grid-cols-5 gap-1 border-t border-line px-4 py-2 text-[0.5625rem] text-fg-subtle">
        {g.fasi.map((f) => (
          <span key={f} className="truncate">
            {f}
          </span>
        ))}
      </p>
    </div>
  )
}
