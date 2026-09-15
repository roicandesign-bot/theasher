// Pagina prodotto: Breadcrumb → Gallery + Box acquisto → Descrizione e note →
// Scheda tecnica (+ conservazione, avvertenze) → Analisi di laboratorio → Recensioni →
// FAQ del prodotto → Prodotti correlati → Barra sticky su mobile
import {
  ArrowRight,
  Check,
  Download,
  FlaskConical,
  Package,
  RotateCcw,
  Star,
  Truck,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Price } from '@/components/ui/Price'
import { ProductCard } from '@/components/ui/ProductCard'
import { ProductGallery } from '@/components/ui/ProductGallery'
import { QuantityInput } from '@/components/ui/QuantityInput'
import { Section, SectionHeader } from '@/components/ui/Section'
import { categories, findProduct, products, type Variant } from '@/data/products'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/money'

const reviews = [
  {
    name: 'Marco R.',
    date: '02/09/2026',
    rating: 5,
    text: 'Profilo agrumato pulito, texture morbida come descritto. Packaging serio, spedizione in due giorni.',
  },
  {
    name: 'Elena P.',
    date: '28/08/2026',
    rating: 5,
    text: 'Il certificato di analisi si trova in due secondi. È la prima volta che non devo scrivere per chiederlo.',
  },
  {
    name: 'Tomas K.',
    date: '19/08/2026',
    rating: 4,
    text: 'Molto buono. Ho preso il formato da 5 g, il prezzo al grammo è più onesto di altri.',
  },
]

export default function Product() {
  const { slug } = useParams()
  const product = findProduct(slug)

  const variants: Variant[] = product.variants ?? [
    {
      label: `${String(product.grams).replace('.', ',')} g`,
      grams: product.grams,
      price: product.price,
      inStock: product.inStock,
    },
  ]
  const defaultIndex = Math.max(
    0,
    variants.findIndex((v) => v.grams === product.grams),
  )
  const [variantIndex, setVariantIndex] = useState(defaultIndex)
  const [quantity, setQuantity] = useState(1)
  const variant = variants[variantIndex]!

  // La barra in basso su mobile compare solo dopo che il bottone principale è stato superato.
  const buyBoxRef = useRef<HTMLDivElement>(null)
  const [showStickyBar, setShowStickyBar] = useState(false)
  useEffect(() => {
    const node = buyBoxRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      const scrolledPast = !entry!.isIntersecting && entry!.boundingClientRect.top < 0
      setShowStickyBar(scrolledPast)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const gallery = product.gallery ?? [{ src: product.image, alt: product.name }]
  const total = variant.price * quantity
  const missingForFreeShipping = site.freeShippingFrom - total
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3)
  const category = categories[product.category]
  const categoryLabel = category.label

  return (
    <>
      {/* ---------- Breadcrumb ---------- */}
      <nav aria-label="Percorso" className="border-b border-line">
        <Container className="flex items-center gap-2 py-3 text-xs text-fg-muted">
          <Link to="/" className="transition hocus:text-primary">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to={`/#${category.anchor}`} className="transition hocus:text-primary">
            {categoryLabel}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-fg">{product.name}</span>
        </Container>
      </nav>

      {/* ---------- Gallery + acquisto ---------- */}
      <Container className="grid gap-8 py-8 lg:grid-cols-2 lg:gap-14 lg:py-12">
        <ProductGallery images={gallery} />

        <div className="flex flex-col gap-6">
          <div>
            {product.badges && (
              <div className="mb-4 flex gap-1.5">
                {product.badges.map((b) => (
                  <Badge key={b} variant={b === 'Limited drop' ? 'outline' : 'solid'}>
                    {b}
                  </Badge>
                ))}
              </div>
            )}
            <Eyebrow>{categoryLabel}</Eyebrow>
            <h1 className="mt-3 text-h1">{product.name}</h1>
            <p className="mt-3 label text-[0.75rem] text-fg-muted">{product.profile.join(' | ')}</p>
            <p className="mt-4 max-w-prose text-lead text-fg-muted">{product.short}</p>
          </div>

          <div className="border-y border-line py-5">
            <Price
              cents={variant.price}
              compareAt={variant.compareAt}
              grams={variant.grams}
              size="lg"
            />
            <p className="mt-2 text-xs text-fg-muted">
              IVA inclusa. Spedizione calcolata al checkout.
            </p>
          </div>

          {/* Formati */}
          <fieldset>
            <legend className="label text-[0.75rem] text-fg-muted">Formato</legend>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {variants.map((v, i) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setVariantIndex(i)}
                  disabled={!v.inStock}
                  aria-pressed={i === variantIndex}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-input px-3 py-3 ring-1 transition ring-inset',
                    i === variantIndex
                      ? 'bg-primary/10 text-primary ring-2 ring-primary'
                      : 'text-fg ring-line hocus:ring-line-strong',
                    !v.inStock &&
                      'cursor-not-allowed text-fg-subtle line-through opacity-50 ring-line',
                  )}
                >
                  <span className="label text-[0.8125rem]">{v.label}</span>
                  <span className="text-[0.6875rem] text-fg-muted">
                    {formatPrice(Math.round(v.price / v.grams))}/g
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Disponibilità + acquisto */}
          <div ref={buyBoxRef} className="flex flex-col gap-4">
            <Badge variant={variant.inStock ? 'stock' : 'soldout'} className="self-start px-0">
              {variant.inStock
                ? 'Disponibile, pronto per la spedizione'
                : 'Esaurito in questo formato'}
            </Badge>
            <div className="flex flex-wrap gap-3">
              <QuantityInput value={quantity} onChange={setQuantity} />
              <Button size="lg" className="flex-1" disabled={!variant.inStock}>
                {variant.inStock ? 'Aggiungi al carrello' : 'Avvisami al restock'}
                <ArrowRight className="size-4" />
              </Button>
            </div>
            {variant.inStock && (
              <p className="text-sm text-fg-muted">
                {missingForFreeShipping > 0 ? (
                  <>
                    Aggiungi{' '}
                    <span className="font-semibold text-primary">
                      {formatPrice(missingForFreeShipping)}
                    </span>{' '}
                    per la spedizione gratuita.
                  </>
                ) : (
                  <span className="text-success">Spedizione gratuita inclusa.</span>
                )}
              </p>
            )}
          </div>

          {/* Servizio */}
          <ul className="grid gap-3 rounded-card bg-surface p-5 ring-1 ring-line ring-inset">
            {[
              { icon: Package, text: 'Preparato in 24 h, packaging anonimo e sigillato' },
              { icon: Truck, text: 'Spedizione tracciata in UE, 48–72 ore' },
              { icon: RotateCcw, text: 'Reso entro 14 giorni se la confezione è integra' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm">
                <Icon className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
                {text}
              </li>
            ))}
            <li className="flex flex-wrap items-center gap-2 border-t border-line pt-3 text-xs text-fg-muted">
              <span className="label text-[0.625rem]">Pagamenti</span>
              {site.payments.map((m) => (
                <Badge key={m} variant="muted">
                  {m}
                </Badge>
              ))}
            </li>
          </ul>

          {/* Lotto e analisi */}
          {product.batch && (
            <a
              href="#analisi"
              className="flex items-center justify-between gap-4 rounded-card bg-bg-alt p-5 ring-1 ring-line transition ring-inset hocus:ring-primary"
            >
              <span className="flex items-center gap-3">
                <FlaskConical className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
                <span className="text-sm">
                  Lotto <span className="font-semibold">{product.batch}</span> · certificato di
                  analisi
                </span>
              </span>
              <Download className="size-4 shrink-0 text-primary" />
            </a>
          )}
        </div>
      </Container>

      {/* ---------- Descrizione e note ---------- */}
      {product.description && (
        <Section tone="alt">
          <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Il prodotto</Eyebrow>
              <h2 className="mt-3 text-h2">Cosa stai comprando.</h2>
              <div className="mt-5 flex max-w-prose flex-col gap-4 text-lead text-fg-muted">
                {product.description.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
            {product.aromaNotes && (
              <div>
                <p className="label text-[0.75rem] text-primary">Profilo aromatico</p>
                <ul className="mt-4 flex flex-col">
                  {product.aromaNotes.map((n) => (
                    <li key={n.label} className="border-b border-line py-4">
                      <p className="flex items-center gap-2 font-semibold">
                        <Diamond /> {n.label}
                      </p>
                      <p className="mt-1.5 text-sm text-fg-muted">{n.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* ---------- Scheda tecnica ---------- */}
      {product.features && (
        <Section>
          <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Scheda</Eyebrow>
              <h2 className="mt-3 text-h2">Dati, non aggettivi.</h2>
              <dl className="mt-6">
                {product.features.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:justify-between sm:gap-6"
                  >
                    <dt className="label text-[0.75rem] text-fg-muted">{f.label}</dt>
                    <dd className="text-sm sm:text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-5">
              {product.storage && (
                <Card>
                  <p className="label text-[0.75rem] text-primary">Conservazione</p>
                  <p className="mt-3 text-sm text-fg-muted">{product.storage}</p>
                </Card>
              )}
              {product.warnings && (
                <Card>
                  <p className="label text-[0.75rem] text-primary">Avvertenze</p>
                  <p className="mt-3 text-sm text-fg-muted">{product.warnings}</p>
                </Card>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* ---------- Analisi di laboratorio ---------- */}
      {product.lab && product.batch && (
        <Section id="analisi" tone="alt" className="scroll-mt-24">
          <Container>
            <SectionHeader
              eyebrow="Analisi di laboratorio"
              title="Il certificato di questo lotto."
              subtitle="Valori dimostrativi: nel sito reale il certificato viene caricato dal team a ogni nuovo lotto."
            />
            <Card className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <dl className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { t: 'Lotto', v: product.batch },
                  { t: 'CBD', v: product.lab.cbd, big: true },
                  { t: 'THC', v: product.lab.thc },
                  { t: 'Analisi', v: `${product.lab.lab}, ${product.lab.date}` },
                ].map((row) => (
                  <div key={row.t}>
                    <dt className="label text-[0.6875rem] text-fg-muted">{row.t}</dt>
                    <dd
                      className={cn(
                        'mt-1.5',
                        row.big ? 'text-3xl font-semibold text-primary' : 'text-sm',
                      )}
                    >
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <Button variant="outline" className="shrink-0">
                <Download className="size-4" /> Scarica il PDF
              </Button>
            </Card>
          </Container>
        </Section>
      )}

      {/* ---------- Recensioni ---------- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Recensioni verificate · esempio"
            title="Cosa dice chi l’ha comprato."
            subtitle="Contenuti dimostrativi. Nel sito reale compaiono solo recensioni collegate a un ordine verificato."
          />
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.name}>
                <Card className="flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
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
                    <span className="text-xs text-fg-muted">{r.date}</span>
                  </div>
                  <p className="text-lead">“{r.text}”</p>
                  <p className="mt-auto flex items-center gap-2 text-sm">
                    <span className="font-semibold">{r.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      <Check className="size-3" /> Verificato
                    </Badge>
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------- FAQ del prodotto ---------- */}
      {product.faq && (
        <Section tone="alt">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Domande su {product.name}</Eyebrow>
              <h2 className="mt-3 text-h2">Prima che tu lo chieda.</h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {product.faq.map((f) => (
                <details key={f.q} name="faq-prodotto" className="group">
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
      )}

      {/* ---------- Correlati ---------- */}
      <Section className="pb-28 lg:pb-section">
        <Container>
          <SectionHeader eyebrow="Ti può interessare" title="Nella stessa selezione." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- Barra di acquisto agganciata in basso (mobile) ---------- */}
      <div
        className={cn(
          'sticky bottom-0 z-30 border-t border-line bg-bg/95 backdrop-blur transition lg:hidden',
          showStickyBar ? 'translate-y-0' : 'pointer-events-none translate-y-full opacity-0',
        )}
      >
        <div className="container-content flex items-center gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{product.name}</p>
            <p className="text-sm font-semibold text-primary">
              {formatPrice(variant.price)}{' '}
              <span className="text-[0.6875rem] font-normal text-fg-muted">{variant.label}</span>
            </p>
          </div>
          <Button className="ml-auto shrink-0" disabled={!variant.inStock}>
            {variant.inStock ? 'Aggiungi' : 'Avvisami'}
          </Button>
        </div>
      </div>
    </>
  )
}
