// Home: InfoBar+Header (layout) → Hero split → Trust bar → Categorie Hash / CBD Flower →
// Best seller (3 card) → New drop (banda gialla) → Story "Crafted with character" →
// Analisi di laboratorio → Recensioni (esempio) → Bundle → Newsletter → FAQ → Footer (layout)
import { ArrowRight, FlaskConical, Leaf, Lock, Package, Star, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Price } from '@/components/ui/Price'
import { ProductCard } from '@/components/ui/ProductCard'
import { Section, SectionHeader } from '@/components/ui/Section'
import { StrokePattern } from '@/components/ui/StrokePattern'
import { home } from '@/data/home'
import { bestSellers, newDrop } from '@/data/products'
import { asset } from '@/lib/asset'
import { formatPrice } from '@/lib/money'

const trustIcons = [FlaskConical, Truck, Lock, Package]

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <StrokePattern className="opacity-[0.05]" position="110% 20%" scale="200%" />
        <Container className="relative grid items-center gap-8 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-20">
          <div className="order-2 lg:order-1">
            <Eyebrow className="fade-up">{home.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 fade-up text-h1 [animation-delay:60ms]">
              {home.hero.titleA}
              <br />
              <span className="text-primary">{home.hero.titleB}</span>
            </h1>
            <p className="mt-5 max-w-md fade-up text-lead text-fg-muted [animation-delay:120ms]">
              {home.hero.lead}
            </p>
            <div className="mt-7 flex fade-up flex-wrap gap-3 [animation-delay:180ms]">
              <Button to="/#best-seller" size="lg">
                {home.hero.cta} <ArrowRight className="size-4" />
              </Button>
              <Button to="/#lab" variant="ghost" size="lg" className="ring-1 ring-line ring-inset">
                {home.hero.ctaSecondary}
              </Button>
            </div>
            <ul className="mt-8 flex fade-up flex-wrap gap-x-7 gap-y-3 [animation-delay:240ms]">
              {home.hero.badges.map((b, i) => {
                const Icon = [Leaf, Diamond, Truck][i]!
                return (
                  <li key={b.label} className="flex items-center gap-2.5">
                    {i === 1 ? (
                      <Diamond className="size-4" />
                    ) : (
                      <Icon className="size-5 text-primary" strokeWidth={1.75} />
                    )}
                    <span className="label text-[0.6875rem] leading-tight">
                      {b.label}
                      <br />
                      <span className="text-fg-muted">{b.sub}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[4/3] max-h-[46svh] w-full overflow-hidden rounded-card ring-1 ring-line ring-inset lg:aspect-[1.1] lg:max-h-none">
              <img
                src={asset('images/demo/hero-products.jpg')}
                alt="Vaso di hash CBD e busta di fiori CBD The Hasher su fondo nero"
                width={408}
                height={370}
                fetchPriority="high"
                className="size-full object-cover"
              />
              <Badge className="absolute bottom-3 left-3" variant="muted">
                Foto demo
              </Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Trust bar ---------- */}
      <section className="border-y border-line bg-bg-alt" aria-label="Garanzie">
        <Container>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 md:grid-cols-4">
            {home.trust.map((t, i) => {
              const Icon = trustIcons[i]!
              return (
                <li key={t.title} className="flex items-center gap-3">
                  <Icon className="size-6 shrink-0 text-primary" strokeWidth={1.5} />
                  <div>
                    <p className="label text-[0.75rem]">{t.title}</p>
                    <p className="text-xs text-fg-muted">{t.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* ---------- Categorie ---------- */}
      <Section className="py-12 md:py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          {home.categories.map((c) => (
            <article
              key={c.id}
              id={c.id}
              className="group relative grid scroll-mt-28 grid-cols-[1fr_auto] overflow-hidden rounded-card bg-surface ring-1 ring-line ring-inset"
            >
              <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
                <div>
                  <h2 className="text-h2">{c.title}</h2>
                  <p className="mt-3 label text-[0.75rem] text-fg-muted">
                    {c.lines[0]}
                    <br />
                    {c.lines[1]}
                  </p>
                </div>
                <Button to={`/#${c.id}`} variant="outline" size="sm" className="self-start">
                  {c.cta} <ArrowRight className="size-4" />
                </Button>
              </div>
              <div className="w-36 sm:w-52 md:w-44 lg:w-60">
                <img
                  src={asset(c.image)}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </article>
          ))}
        </Container>
      </Section>

      {/* ---------- Best seller ---------- */}
      <Section id="best-seller" className="scroll-mt-24 pt-4 md:pt-8">
        <Container>
          <SectionHeader
            eyebrow="Best seller"
            title="I più scelti."
            action={{ label: 'Vedi tutti', to: '/#hash' }}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- New drop: banda gialla ---------- */}
      <Section id="new-drop" tone="yellow" className="scroll-mt-24 overflow-hidden">
        <StrokePattern tone="dark" className="opacity-[0.08]" position="20% 60%" scale="220%" />
        <Container className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Eyebrow tone="dark">{home.newDrop.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-display">{newDrop.name}</h2>
            <p className="mt-3 label text-[0.75rem] text-primary-fg/70">
              {newDrop.aroma.join(' / ')} · {newDrop.grams} g · lotto limitato
            </p>
            <p className="mt-5 max-w-md text-lead text-primary-fg/80">{home.newDrop.text}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button to="/#new-drop" variant="dark" size="lg">
                {home.newDrop.cta} <ArrowRight className="size-4" />
              </Button>
              <p className="text-2xl font-semibold">{formatPrice(newDrop.price)}</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-4 ring-bg lg:aspect-square">
            <img
              src={asset(newDrop.image)}
              alt={`${newDrop.name}, hash CBD in lotto limitato`}
              loading="lazy"
              className="size-full object-cover"
            />
            <div className="absolute top-3 left-3 flex gap-1.5">
              <Badge className="bg-bg text-primary">New</Badge>
              <Badge className="bg-bg text-primary">Limited drop</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- Story ---------- */}
      <Section id="story" className="scroll-mt-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[2/1] overflow-hidden rounded-card ring-1 ring-line ring-inset lg:aspect-[5/4]">
            <img
              src={asset(home.story.image)}
              alt="Paesaggio montano in bianco e nero"
              loading="lazy"
              className="size-full object-cover grayscale"
            />
            <Diamond className="absolute top-5 right-5 size-6" />
          </div>
          <div>
            <Eyebrow>{home.story.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2">{home.story.title}</h2>
            <p className="mt-5 max-w-prose text-lead text-fg-muted">{home.story.text}</p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {home.story.points.map((p) => (
                <li key={p.title} className="border-t border-line pt-4">
                  <p className="label text-[0.75rem] text-primary">{p.title}</p>
                  <p className="mt-2 text-sm text-fg-muted">{p.text}</p>
                </li>
              ))}
            </ul>
            <Button to="/#lab" variant="outline" className="mt-8">
              {home.story.cta} <ArrowRight className="size-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---------- Analisi di laboratorio ---------- */}
      <Section id="lab" tone="alt" className="scroll-mt-24">
        <Container>
          <SectionHeader
            eyebrow={home.lab.eyebrow}
            title={home.lab.title}
            subtitle={home.lab.text}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {home.lab.reports.map((r) => (
              <Card key={r.batch} className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-h3">{r.product}</h3>
                    <p className="mt-1.5 label text-[0.6875rem] text-fg-muted">
                      Lotto {r.batch} · {r.date}
                    </p>
                  </div>
                  <FlaskConical className="size-6 shrink-0 text-primary" strokeWidth={1.5} />
                </div>
                <dl className="grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
                  <div>
                    <dt className="label text-[0.6875rem] text-fg-muted">CBD</dt>
                    <dd className="mt-1 text-2xl font-semibold text-primary">{r.cbd}</dd>
                  </div>
                  <div>
                    <dt className="label text-[0.6875rem] text-fg-muted">THC</dt>
                    <dd className="mt-1 text-sm">{r.thc}</dd>
                  </div>
                </dl>
                <Badge variant="muted" className="self-start">
                  Certificato PDF in pagina prodotto
                </Badge>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- Recensioni (esempio) ---------- */}
      <Section id="recensioni" className="scroll-mt-24">
        <Container>
          <SectionHeader
            eyebrow={home.reviews.eyebrow}
            title={home.reviews.title}
            subtitle={home.reviews.note}
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {home.reviews.items.map((r) => (
              <li key={r.name}>
                <Card className="flex h-full flex-col gap-4">
                  <div className="flex items-center gap-1" aria-label={`${r.rating} stelle su 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className={
                          i < r.rating
                            ? 'size-4 fill-primary text-primary'
                            : 'size-4 text-line-strong'
                        }
                      />
                    ))}
                  </div>
                  <p className="text-lead">“{r.text}”</p>
                  <p className="mt-auto flex flex-wrap items-center gap-x-2 text-sm text-fg-muted">
                    <span className="font-semibold text-fg">{r.name}</span> · {r.product}
                    <Badge variant="outline" className="ml-auto">
                      Acquisto verificato
                    </Badge>
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- Bundle ---------- */}
      <Section className="pt-0">
        <Container>
          <article className="grid overflow-hidden rounded-card bg-surface ring-1 ring-line ring-inset md:grid-cols-[1fr_1.2fr]">
            <div className="grid grid-cols-3 gap-px bg-line">
              {bestSellers.map((p) => (
                <img
                  key={p.slug}
                  src={asset(p.image)}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-square size-full object-cover md:aspect-auto md:h-full"
                />
              ))}
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-8">
              <Eyebrow>{home.bundle.eyebrow}</Eyebrow>
              <h2 className="text-h2">{home.bundle.title}</h2>
              <p className="max-w-prose text-fg-muted">{home.bundle.text}</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                <Price
                  cents={home.bundle.price}
                  compareAt={home.bundle.compareAt}
                  grams={home.bundle.grams}
                  size="lg"
                />
                <Button variant="outline">{home.bundle.cta}</Button>
              </div>
            </div>
          </article>
        </Container>
      </Section>

      {/* ---------- Newsletter ---------- */}
      <Section id="newsletter" tone="alt" className="scroll-mt-24">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>{home.newsletter.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2">{home.newsletter.title}</h2>
            <p className="mt-4 max-w-prose text-lead text-fg-muted">{home.newsletter.text}</p>
          </div>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder={home.newsletter.placeholder}
              />
              <Button type="submit" className="shrink-0">
                {home.newsletter.cta} <ArrowRight className="size-4" />
              </Button>
            </div>
            <label className="flex items-start gap-3 text-xs text-fg-muted">
              <input
                type="checkbox"
                className="mt-0.5 size-4 shrink-0 accent-primary"
                name="consenso"
              />
              {home.newsletter.consent}
            </label>
          </form>
        </Container>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section id="faq" className="scroll-mt-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>{home.faq.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-h2">{home.faq.title}</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {home.faq.items.map((f) => (
              <details key={f.q} name="faq" className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-semibold transition hocus:text-primary">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full text-primary ring-1 ring-line transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-prose pb-6 text-fg-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
