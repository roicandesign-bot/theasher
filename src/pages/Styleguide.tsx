import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Chip } from '@/components/ui/Chip'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Logo } from '@/components/ui/Logo'
import { Price } from '@/components/ui/Price'
import { ProductCard } from '@/components/ui/ProductCard'
import { Section, SectionHeader } from '@/components/ui/Section'
import { StrokePattern } from '@/components/ui/StrokePattern'
import { categorie, products, type Categoria } from '@/data/products'
import { cn } from '@/lib/cn'
import { nomiColori } from '@/lib/coloriFamiglie'

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

/** La gerarchia completa dei testi del sito, dal più grande al più piccolo. */
const typeScale = [
  {
    cls: 'text-display font-display uppercase',
    name: 'Display',
    font: 'Anton 400 · maiuscolo',
    misure: '56 → 128 px · interlinea 0,9',
    dove: 'Il titolo della home e dei drop',
    sample: 'Premium CBD.',
  },
  {
    cls: 'text-h1 font-display uppercase',
    name: 'Titolo 1',
    font: 'Anton 400 · maiuscolo',
    misure: '48 → 88 px · interlinea 0,92',
    dove: 'Il titolo di ogni pagina, uno solo',
    sample: 'Condizioni di vendita',
  },
  {
    cls: 'text-h2 font-display uppercase',
    name: 'Titolo 2',
    font: 'Anton 400 · maiuscolo',
    misure: '36 → 60 px · interlinea 0,95',
    dove: 'Titoli delle sezioni',
    sample: 'Dal seme alla resina.',
  },
  {
    cls: 'text-h3 font-display uppercase',
    name: 'Titolo 3',
    font: 'Anton 400 · maiuscolo',
    misure: '24 → 32 px · interlinea 1',
    dove: 'Nomi prodotto nelle schede, titoli dei box',
    sample: 'Gorilla Glue Semi',
  },
  {
    cls: 'text-lead text-fg-muted',
    name: 'Sottotitolo',
    font: 'Archivo 400',
    misure: '17 → 20 px · interlinea 1,5',
    dove: 'Sotto i titoli di pagina e di sezione',
    sample: 'Cinque linee, dieci famiglie. Un certificato per ogni lotto.',
  },
  {
    cls: 'text-base',
    name: 'Testo',
    font: 'Archivo 400',
    misure: '16 px · interlinea 1,5',
    dove: 'Paragrafi, descrizioni, testi legali',
    sample: 'Hash e fiori CBD d’eccezione, lavorati da noi in Europa.',
  },
  {
    cls: 'text-sm text-fg-muted',
    name: 'Testo piccolo',
    font: 'Archivo 400',
    misure: '14 px · interlinea 1,45',
    dove: 'Note, dettagli, moduli, banner cookie',
    sample: 'IVA inclusa. Spedizione calcolata al checkout.',
  },
  {
    cls: 'text-price font-semibold text-primary',
    name: 'Prezzo',
    font: 'Archivo 600 · giallo',
    misure: '22 px',
    dove: 'Prezzi nelle schede e nel carrello',
    sample: '29,90 €',
  },
  {
    cls: 'text-attivo text-primary',
    name: 'Cannabinoide',
    font: 'Archivo 700 · maiuscolo · giallo',
    misure: '14 px · spaziatura 0,26 em',
    dove: 'Il sottotitolo di ogni prodotto',
    sample: 'CBD: +31%',
  },
  {
    cls: 'label text-eyebrow text-primary',
    name: 'Occhiello',
    font: 'Archivo 600 condensato 80 % · maiuscolo · giallo',
    misure: '12 px · spaziatura 0,14 em',
    dove: 'Sopra i titoli, con il rombo',
    sample: 'Good plants. Brighter days.',
  },
  {
    cls: 'label',
    name: 'Etichetta',
    font: 'Archivo 600 condensato 80 % · maiuscolo',
    misure: '13 px · spaziatura 0,08 em',
    dove: 'Menu, bottoni, schede del negozio',
    sample: 'Aggiungi al carrello',
  },
  {
    cls: 'label text-[0.6875rem] text-fg-muted',
    name: 'Etichetta piccola',
    font: 'Archivo 600 condensato 80 % · maiuscolo',
    misure: '11 px · spaziatura 0,08 em',
    dove: 'Badge, filtri, aromi, formati',
    sample: 'Citrus / Earthy / Smooth',
  },
  {
    cls: 'label text-[0.625rem] text-fg-muted',
    name: 'Micro',
    font: 'Archivo 600 condensato 80 % · maiuscolo',
    misure: '10 px · spaziatura 0,08 em',
    dove: 'Contatori, prezzo al grammo, note piccole',
    sample: '8,54 €/g · 64 prodotti',
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

          <h3 className="mt-12 text-h3">Colori delle famiglie (prova)</h3>
          <p className="mt-2 max-w-prose text-pretty text-fg-muted">
            Attivi solo con <span className="font-mono text-fg">?colori=si</span> nell’indirizzo:
            puntino, nome e riga sopra la card. Il giallo resta il colore del brand.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {(Object.keys(categorie) as Categoria[]).map((c) => (
              <div key={c} className="overflow-hidden rounded-card ring-1 ring-line ring-inset">
                <div className="h-16" style={{ background: `var(--color-fam-${c})` }} />
                <p className="bg-surface px-3 py-2 font-mono text-xs">
                  fam-{c}
                  <span className="block text-fg-muted">
                    {categorie[c]} · {nomiColori[c]}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tipografia */}
      <Section id="tipografia" tone="alt" className="py-12">
        <Container>
          <h3 className="text-h3">Tipografia</h3>
          <p className="mt-2 max-w-prose text-sm text-fg-muted">
            Due famiglie in tutto il sito, caricate dal sito stesso (nessun servizio esterno). Il
            logo è un lettering disegnato, non un font.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-card bg-surface p-6 ring-1 ring-line ring-inset">
              <p className="label text-[0.6875rem] text-primary">Titoli</p>
              <p className="mt-3 font-display text-[4.5rem] leading-none uppercase">Anton</p>
              <p className="mt-3 text-sm text-fg-muted">
                Un solo peso (400), sempre maiuscolo. Alto e compatto: dà l’impatto dei titoli, dal
                display al titolo 3.
              </p>
              <p className="mt-4 font-display text-2xl tracking-wide uppercase">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
              </p>
            </div>
            <div className="rounded-card bg-surface p-6 ring-1 ring-line ring-inset">
              <p className="label text-[0.6875rem] text-primary">Testo e interfaccia</p>
              <p className="mt-3 text-[4.5rem] leading-none font-bold">Archivo</p>
              <p className="mt-3 text-sm text-fg-muted">
                Variabile: peso da 100 a 900 e larghezza da 62 % a 125 %. Normale per i testi,
                condensato all’80 % e maiuscolo per etichette, menu e bottoni.
              </p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-lg">
                <span className="font-normal">Regular 400</span>
                <span className="font-semibold">Semibold 600</span>
                <span className="font-bold">Bold 700</span>
                <span className="label text-base">Condensato</span>
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-line">
            {typeScale.map((t, i) => (
              <div
                key={t.name}
                className="grid gap-3 border-b border-line py-6 md:grid-cols-[17rem_1fr] md:gap-8"
              >
                <div className="flex gap-3">
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="label text-[0.75rem]">{t.name}</p>
                    <p className="text-xs text-fg-muted">{t.font}</p>
                    <p className="font-mono text-xs text-fg-subtle">{t.misure}</p>
                    <p className="text-xs text-fg-muted">{t.dove}</p>
                  </div>
                </div>
                <p className={cn('min-w-0 self-center text-pretty', t.cls)}>{t.sample}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-prose text-xs text-fg-muted">
            Solo nelle immagini dei pack: Archivo Black condensato per nomi e percentuali, come
            sulle confezioni vere. Le misure con la freccia crescono con lo schermo, dal telefono al
            computer.
          </p>
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

          <h3 className="mt-12 text-h3">Pillole dei filtri</h3>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Chip size="sm" active onClick={() => {}}>
              CBD
            </Chip>
            <Chip size="sm" onClick={() => {}}>
              THC-X
            </Chip>
            <Chip size="sm" count={6} onClick={() => {}}>
              Indoor
            </Chip>
            <Chip size="sm" count={0} disabled onClick={() => {}}>
              Trim
            </Chip>
            <Chip onClick={() => {}}>Misura grande</Chip>
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
