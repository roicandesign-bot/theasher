// Reparto accessori e merch. Stessa griglia del negozio, filtri più semplici:
// una sola barra di famiglie (Per fumare, Abbigliamento, Skate e sticker). Stato nell'indirizzo.
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { categorieMerch, products, type CategoriaMerch } from '@/data/products'
import { nomeReparto } from '@/data/site'
import { cn } from '@/lib/cn'

const merch = products.filter((p) => p.reparto === 'merch')

const linguette: { id: CategoriaMerch | null; label: string }[] = [
  { id: null, label: 'Tutto' },
  ...(Object.keys(categorieMerch) as CategoriaMerch[]).map((id) => ({
    id,
    label: categorieMerch[id],
  })),
]

export default function Merch() {
  const [params, setParams] = useSearchParams()
  const scelta = params.get('categoria')
  const categoria =
    scelta && scelta in categorieMerch
      ? (scelta as CategoriaMerch)
      : (null as CategoriaMerch | null)
  const mostrati = categoria ? merch.filter((p) => p.category === categoria) : merch
  /** La scheda grande su due righe: il kit, quando si guarda tutto o la famiglia «Per fumare». */
  const inEvidenza = mostrati.length >= 5 ? (mostrati.find((p) => p.badges?.length) ?? null) : null
  const resto = inEvidenza ? mostrati.filter((p) => p !== inEvidenza) : mostrati

  const scegli = (id: CategoriaMerch | null) => setParams(id ? { categoria: id } : {})

  return (
    <>
      <Section className="pb-6">
        <Container className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>{nomeReparto} · accessori e abbigliamento</Eyebrow>
            <h1 className="mt-4 text-h1 text-balance">
              {categoria ? categorieMerch[categoria] : 'Tutto quello che serve intorno.'}
            </h1>
            <p className="mt-4 max-w-prose text-lead text-pretty text-fg-muted">
              Grinder, cartine, filtri, Clipper e i vestiti con il nostro nome sopra. Oggetti
              semplici, fatti bene, al prezzo giusto.
            </p>
          </div>
          <Button to="/diventa-distributore" variant="outline" className="self-start lg:self-end">
            Questi prodotti nel tuo negozio
          </Button>
        </Container>
      </Section>

      <div className="sticky top-18 z-20 border-y border-line bg-bg/95 backdrop-blur md:top-20">
        <Container className="py-3">
          <div
            role="group"
            aria-label="Famiglie di accessori e merch"
            className="grid grid-cols-2 gap-1 rounded-card bg-bg-alt p-1 md:inline-flex md:rounded-button"
          >
            {linguette.map((t) => (
              <button
                key={t.label}
                type="button"
                aria-pressed={categoria === t.id}
                onClick={() => scegli(t.id)}
                className={cn(
                  'flex shrink-0 flex-col items-center justify-center gap-0.5 rounded-button px-4 py-2 label text-[0.6875rem] transition duration-200 ease-out-soft md:px-5',
                  categoria === t.id
                    ? 'bg-primary text-primary-fg'
                    : 'text-primary hocus:bg-surface-hover',
                )}
              >
                {t.label}
                <span
                  className={cn(
                    'text-[0.625rem]',
                    categoria === t.id ? 'text-primary-fg/60' : 'text-fg-muted',
                  )}
                >
                  {t.id ? merch.filter((p) => p.category === t.id).length : merch.length}
                </span>
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Section className="pt-6">
        <Container>
          <p aria-live="polite" className="label text-[0.75rem] text-fg-muted">
            {mostrati.length} {mostrati.length === 1 ? 'prodotto' : 'prodotti'}
          </p>
          <div className="mt-8 grid grid-flow-row-dense gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {inEvidenza && (
              <Reveal className="h-full sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 xl:col-start-4">
                <ProductCard product={inEvidenza} grande className="h-full" />
              </Reveal>
            )}
            {resto.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 5) * 60} className="h-full">
                <ProductCard product={p} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
