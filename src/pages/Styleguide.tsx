import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Logo } from '@/components/ui/Logo'
import { Price } from '@/components/ui/Price'
import { ProductCard } from '@/components/ui/ProductCard'
import { Section, SectionHeader } from '@/components/ui/Section'
import { StrokePattern } from '@/components/ui/StrokePattern'
import { products } from '@/data/products'

/**
 * STYLEGUIDE VIVENTE: mostra i token di src/styles/tokens.css e i componenti così come sono.
 * Se aggiungi token semantici nuovi, aggiungili anche alle liste qui sotto.
 */
const semanticColors = [
  'bg',
  'bg-alt',
  'surface',
  'surface-hover',
  'fg',
  'fg-muted',
  'fg-subtle',
  'line',
  'line-strong',
  'primary',
  'primary-fg',
  'primary-hover',
  'success',
  'warning',
  'danger',
]

const typeScale = [
  { cls: 'text-display font-display uppercase', name: 'display · Anton', sample: 'New drop' },
  { cls: 'text-h1 font-display uppercase', name: 'h1 · Anton', sample: 'Premium CBD.' },
  { cls: 'text-h2 font-display uppercase', name: 'h2 · Anton', sample: 'Bold character.' },
  { cls: 'text-h3 font-display uppercase', name: 'h3 · Anton', sample: 'Lemon Haze' },
  {
    cls: 'text-lead',
    name: 'lead · Archivo',
    sample: 'Selected in Europe. Made for those who know.',
  },
  {
    cls: 'text-base',
    name: 'base · Archivo',
    sample: 'Hash e fiori CBD d’eccezione, selezionati in Europa.',
  },
  {
    cls: 'text-sm text-fg-muted',
    name: 'sm · Archivo',
    sample: 'Spedizione tracciata in 48–72 ore.',
  },
  { cls: 'label', name: 'label · Archivo condensato', sample: 'Citrus / Earthy / Smooth' },
  {
    cls: 'label text-eyebrow text-primary',
    name: 'eyebrow',
    sample: 'Good plants. Brighter days.',
  },
]

const radii = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'card', 'input', 'badge']

export default function Styleguide() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Styleguide"
            title="Token e componenti"
            subtitle="Tutto ciò che vedi qui viene da src/styles/tokens.css e da src/components/ui. Cambia lì, cambia ovunque."
          />
        </Container>
      </Section>

      {/* Logo */}
      <Section tone="alt" className="py-12">
        <Container>
          <h3 className="text-h3">Logo</h3>
          <p className="mt-2 max-w-prose text-sm text-fg-muted">
            Lettering ufficiale, un solo colore piatto. Mai ricreato con un font, mai deformato,
            nessun contorno, ombra o gradiente.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="grid place-items-center rounded-card bg-bg p-8 ring-1 ring-line ring-inset">
              <Logo variant="acid" link={false} className="h-16" />
            </div>
            <div className="grid place-items-center rounded-card bg-primary p-8">
              <Logo variant="black" link={false} className="h-16" />
            </div>
            <div className="grid place-items-center rounded-card bg-brand-50 p-8">
              <Logo variant="black" link={false} className="h-16" />
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="relative h-40 overflow-hidden rounded-card bg-bg ring-1 ring-line ring-inset">
              <StrokePattern className="opacity-90" position="30% 40%" scale="300%" />
              <p className="absolute bottom-3 left-4 label text-[0.6875rem] text-fg-muted">
                Pattern a tratti (porzioni del logo)
              </p>
            </div>
            <div className="relative flex h-40 items-center justify-center gap-6 rounded-card bg-primary">
              <Diamond className="size-6 fill-primary-fg" />
              <Diamond className="size-4 fill-primary-fg" />
              <Diamond className="size-3 fill-primary-fg" />
              <p className="absolute bottom-3 left-4 label text-[0.6875rem] text-primary-fg/70">
                Accento a diamante
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Colori */}
      <Section className="py-12">
        <Container>
          <h3 className="text-h3">Colori semantici</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {semanticColors.map((name) => (
              <div key={name} className="overflow-hidden rounded-card ring-1 ring-line ring-inset">
                <div className={`h-16 bg-${name}`} />
                <p className="bg-surface px-3 py-2 font-mono text-xs">{name}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tipografia */}
      <Section tone="alt" className="py-12">
        <Container>
          <h3 className="text-h3">Tipografia</h3>
          <p className="mt-2 max-w-prose text-sm text-fg-muted">
            Anton per i titoli (maiuscolo, alto e compatto). Archivo per testo e interfaccia; in
            versione condensata per etichette, badge e menu.
          </p>
          <div className="mt-6 flex flex-col gap-5">
            {typeScale.map((t) => (
              <div
                key={t.name}
                className="grid gap-1 border-b border-line pb-5 md:grid-cols-[12rem_1fr]"
              >
                <p className="font-mono text-xs text-fg-muted">{t.name}</p>
                <p className={t.cls}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bottoni e badge */}
      <Section className="py-12">
        <Container>
          <h3 className="text-h3">Bottoni</h3>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button>
              Shop the drop <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline">Aggiungi al carrello</Button>
            <Button variant="ghost" className="ring-1 ring-line ring-inset">
              Analisi di laboratorio
            </Button>
            <span className="rounded-card bg-primary p-2">
              <Button variant="dark">Scopri il drop</Button>
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabilitato</Button>
          </div>

          <h3 className="mt-12 text-h3">Badge e prezzo</h3>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge>New</Badge>
            <Badge>Best seller</Badge>
            <Badge variant="outline">Limited drop</Badge>
            <Badge variant="muted">Foto demo</Badge>
            <Badge variant="stock">Disponibile</Badge>
            <Badge variant="soldout">Esaurito</Badge>
          </div>
          <div className="mt-6 flex flex-wrap items-end gap-8">
            <Price cents={2490} grams={3.5} />
            <Price cents={1990} compareAt={2370} grams={3} size="lg" />
          </div>

          <h3 className="mt-12 text-h3">Campi</h3>
          <form className="mt-6 grid max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="sg-email" className="label text-[0.75rem] text-fg-muted">
              Email
            </label>
            <Input id="sg-email" type="email" placeholder="La tua email" />
          </form>
        </Container>
      </Section>

      {/* Card e sezioni */}
      <Section tone="alt" className="py-12">
        <Container>
          <h3 className="text-h3">Card prodotto</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <h3 className="mt-12 text-h3">Card e occhiello</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Card>
              <Eyebrow>Occhiello</Eyebrow>
              <p className="mt-3 text-h3">Card di base</p>
              <p className="mt-2 text-sm text-fg-muted">
                Superficie scura con bordo sottile. Sul nero le ombre non si vedono: si usano i
                bordi.
              </p>
            </Card>
            <Card variant="interactive">
              <Eyebrow>Interattiva</Eyebrow>
              <p className="mt-3 text-h3">Con hover</p>
              <p className="mt-2 text-sm text-fg-muted">
                Il bordo si schiarisce e la superficie si alza di un pelo.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="yellow" className="py-12">
        <Container>
          <SectionHeader
            tone="yellow"
            eyebrow="Sezione gialla"
            title="Una per pagina."
            subtitle="Per il drop, una promozione o un messaggio che deve fermare lo scroll."
          />
        </Container>
      </Section>

      {/* Raggi e spazi */}
      <Section className="py-12">
        <Container>
          <h3 className="text-h3">Raggi</h3>
          <div className="mt-6 flex flex-wrap gap-4">
            {radii.map((r) => (
              <div key={r} className="flex flex-col items-center gap-2">
                <div className={`size-16 bg-bg-alt ring-1 ring-line ring-inset rounded-${r}`} />
                <p className="font-mono text-xs text-fg-muted">{r}</p>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-28 rounded-button bg-bg-alt ring-1 ring-line ring-inset" />
              <p className="font-mono text-xs text-fg-muted">button (pill)</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
