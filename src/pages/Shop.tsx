// Negozio: intestazione → barra filtri (categoria, profilo, disponibilità, ordinamento)
// → griglia prodotti → stato vuoto. I filtri stanno nell'indirizzo: la pagina è condivisibile.
import { SlidersHorizontal, X } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ProductCard } from '@/components/ui/ProductCard'
import { Section } from '@/components/ui/Section'
import { categories, products, type Category } from '@/data/products'
import { cn } from '@/lib/cn'

const sorters = {
  novita: { label: 'Novità', fn: (a: typeof products) => a },
  'prezzo-basso': {
    label: 'Prezzo crescente',
    fn: (a: typeof products) => [...a].sort((x, y) => x.price - y.price),
  },
  'prezzo-alto': {
    label: 'Prezzo decrescente',
    fn: (a: typeof products) => [...a].sort((x, y) => y.price - x.price),
  },
} as const
type SortKey = keyof typeof sorters

const categoryKeys = Object.keys(categories) as Category[]
const allProfiles = [...new Set(products.flatMap((p) => p.profile))].sort()

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria') as Category | null
  const profilo = params.get('profilo')
  const soloDisponibili = params.get('disponibili') === 'si'
  const ordine = (params.get('ordine') as SortKey) ?? 'novita'

  /** Aggiorna un filtro nell'indirizzo; passare null toglie il filtro. */
  const setFilter = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: false })
  }

  const shown = useMemo(() => {
    let list = products
    if (categoria) list = list.filter((p) => p.category === categoria)
    if (profilo) list = list.filter((p) => p.profile.includes(profilo))
    if (soloDisponibili) list = list.filter((p) => p.inStock)
    return sorters[ordine]?.fn(list) ?? list
  }, [categoria, profilo, soloDisponibili, ordine])

  const activeFilters = [
    categoria && { key: 'categoria', label: categories[categoria].label },
    profilo && { key: 'profilo', label: profilo },
    soloDisponibili && { key: 'disponibili', label: 'Solo disponibili' },
  ].filter(Boolean) as { key: string; label: string }[]

  const title = categoria ? categories[categoria].label : 'Tutti i prodotti'

  return (
    <>
      {/* ---------- Intestazione ---------- */}
      <Section className="pb-8">
        <Container>
          <Eyebrow>Negozio</Eyebrow>
          <h1 className="mt-4 text-h1">{title}</h1>
          <p className="mt-4 max-w-prose text-lead text-fg-muted">
            Selezione europea, un certificato di analisi per ogni lotto. Prezzo al grammo sempre
            visibile, così confronti senza fare i conti.
          </p>
        </Container>
      </Section>

      {/* ---------- Filtri ---------- */}
      <div className="sticky top-18 z-20 border-y border-line bg-bg/95 backdrop-blur md:top-20">
        <Container className="flex flex-col gap-3 py-4">
          {/* Categoria */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal
              aria-hidden="true"
              className="size-4 shrink-0 text-fg-muted"
              strokeWidth={1.75}
            />
            <FilterChip active={!categoria} onClick={() => setFilter('categoria', null)}>
              Tutti
            </FilterChip>
            {categoryKeys.map((key) => (
              <FilterChip
                key={key}
                active={categoria === key}
                onClick={() => setFilter('categoria', key)}
              >
                <span
                  aria-hidden="true"
                  className={cn('mr-2 inline-block size-2 rounded-full', categories[key].color)}
                />
                {categories[key].short}
              </FilterChip>
            ))}
          </div>

          {/* Profilo, disponibilità, ordinamento */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {allProfiles.map((tag) => (
                <FilterChip
                  key={tag}
                  size="sm"
                  active={profilo === tag}
                  onClick={() => setFilter('profilo', profilo === tag ? null : tag)}
                >
                  {tag}
                </FilterChip>
              ))}
            </div>
            <FilterChip
              size="sm"
              active={soloDisponibili}
              onClick={() => setFilter('disponibili', soloDisponibili ? null : 'si')}
            >
              Solo disponibili
            </FilterChip>

            <label className="ml-auto flex items-center gap-2 text-xs text-fg-muted">
              <span className="label text-[0.625rem]">Ordina</span>
              <select
                value={ordine}
                onChange={(e) => setFilter('ordine', e.target.value)}
                className="h-10 rounded-input bg-bg-alt px-3 text-sm text-fg ring-1 ring-line ring-inset focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {Object.entries(sorters).map(([key, s]) => (
                  <option key={key} value={key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Container>
      </div>

      {/* ---------- Risultati ---------- */}
      <Section className="pt-8">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <p aria-live="polite" className="label text-[0.75rem] text-fg-muted">
              {shown.length} {shown.length === 1 ? 'prodotto' : 'prodotti'}
            </p>
            {activeFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key, null)}
                className="inline-flex items-center gap-1.5 rounded-badge bg-bg-alt px-2 py-1 label text-[0.6875rem] text-fg transition hocus:text-primary"
              >
                {f.label}
                <X aria-hidden="true" className="size-3" />
                <span className="sr-only">Togli filtro</span>
              </button>
            ))}
            {activeFilters.length > 1 && (
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams())}
                className="text-xs text-fg-muted underline transition hocus:text-primary"
              >
                Azzera tutto
              </button>
            )}
          </div>

          {shown.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-start gap-4 rounded-card bg-surface p-8 ring-1 ring-line ring-inset">
              <Badge variant="muted">Nessun risultato</Badge>
              <p className="text-h3">Con questi filtri non c’è niente.</p>
              <p className="max-w-prose text-fg-muted">
                Prova a togliere un filtro, oppure guarda tutta la selezione: sono pochi prodotti,
                scelti uno per uno.
              </p>
              <Button variant="outline" onClick={() => setParams(new URLSearchParams())}>
                Mostra tutti i prodotti
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

/** Pillola di filtro: attiva = giallo pieno. */
function FilterChip({
  active,
  onClick,
  children,
  size = 'md',
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  size?: 'sm' | 'md'
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-button label whitespace-nowrap transition',
        size === 'sm' ? 'h-9 px-3.5 text-[0.6875rem]' : 'h-11 px-5',
        active
          ? 'bg-primary text-primary-fg'
          : 'text-fg ring-1 ring-line ring-inset hocus:ring-line-strong',
      )}
    >
      {children}
    </button>
  )
}
