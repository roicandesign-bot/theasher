// Negozio: intestazione → filtri (categoria, profilo, disponibilità, ordinamento)
// → griglia prodotti → stato vuoto. I filtri stanno nell'indirizzo: la pagina è condivisibile.
import { SlidersHorizontal, X } from 'lucide-react'
import { useMemo, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { coltivazioni, lavorazioni, products } from '@/data/products'
import { cn } from '@/lib/cn'

const categorie = {
  hash: 'Hash',
  flower: 'CBD Flower',
} as const
type Categoria = keyof typeof categorie

const ordinamenti = {
  novita: 'Novità',
  'prezzo-basso': 'Prezzo crescente',
  'prezzo-alto': 'Prezzo decrescente',
} as const
type Ordine = keyof typeof ordinamenti

const profili = [...new Set(products.flatMap((p) => p.aroma))].sort()
/** Mostra solo le voci che esistono davvero a catalogo. */
const coltivazioniUsate = coltivazioni.filter((c) => products.some((p) => p.coltivazione === c))
const lavorazioniUsate = lavorazioni.filter((l) => products.some((p) => p.lavorazione === l))

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria') as Categoria | null
  const profilo = params.get('profilo')
  const soloDisponibili = params.get('disponibili') === 'si'
  const badge = params.get('badge') // 'New' | 'Best seller' | 'Limited drop'
  const coltivazione = params.get('coltivazione')
  const lavorazione = params.get('lavorazione')
  const ordine = (params.get('ordine') as Ordine) ?? 'novita'

  /** Aggiorna un filtro nell'indirizzo; null lo toglie. */
  const setFilter = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null) next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  const mostrati = useMemo(() => {
    let list = products
    if (categoria) list = list.filter((p) => p.category === categoria)
    if (profilo) list = list.filter((p) => p.aroma.includes(profilo))
    if (soloDisponibili) list = list.filter((p) => p.inStock)
    if (badge) list = list.filter((p) => p.badges?.includes(badge as never))
    if (coltivazione) list = list.filter((p) => p.coltivazione === coltivazione)
    if (lavorazione) list = list.filter((p) => p.lavorazione === lavorazione)
    if (ordine === 'prezzo-basso') list = [...list].sort((a, b) => a.price - b.price)
    if (ordine === 'prezzo-alto') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [categoria, profilo, soloDisponibili, badge, coltivazione, lavorazione, ordine])

  const attivi = [
    categoria && { key: 'categoria', label: categorie[categoria] },
    profilo && { key: 'profilo', label: profilo },
    soloDisponibili && { key: 'disponibili', label: 'Solo disponibili' },
    badge && { key: 'badge', label: badge },
    coltivazione && { key: 'coltivazione', label: coltivazione },
    lavorazione && { key: 'lavorazione', label: lavorazione },
  ].filter(Boolean) as { key: string; label: string }[]

  return (
    <>
      <Section className="pb-8">
        <Container>
          <Eyebrow>Negozio</Eyebrow>
          <h1 className="mt-4 text-h1">
            {badge === 'New'
              ? 'New drops'
              : badge === 'Best seller'
                ? 'Best seller'
                : categoria
                  ? categorie[categoria]
                  : 'Tutti i prodotti'}
          </h1>
          <p className="mt-4 max-w-prose text-lead text-fg-muted">
            Selezione europea, un certificato di analisi per ogni lotto. Prezzo al grammo sempre
            visibile, così confronti senza fare i conti.
          </p>
        </Container>
      </Section>

      {/* Filtri */}
      <div className="sticky top-18 z-20 border-y border-line bg-bg/95 backdrop-blur md:top-20">
        <Container className="flex flex-col gap-3 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal
              aria-hidden="true"
              className="size-4 shrink-0 text-fg-muted"
              strokeWidth={1.75}
            />
            <Chip active={!categoria} onClick={() => setFilter('categoria', null)}>
              Tutti
            </Chip>
            {(Object.keys(categorie) as Categoria[]).map((key) => (
              <Chip
                key={key}
                active={categoria === key}
                onClick={() => setFilter('categoria', key)}
              >
                {categorie[key]}
              </Chip>
            ))}
            <span aria-hidden="true" className="mx-1 h-6 w-px shrink-0 bg-line" />
            <Chip
              active={badge === 'New'}
              onClick={() => setFilter('badge', badge === 'New' ? null : 'New')}
            >
              New drops
            </Chip>
            <Chip
              active={badge === 'Best seller'}
              onClick={() => setFilter('badge', badge === 'Best seller' ? null : 'Best seller')}
            >
              Best seller
            </Chip>
          </div>

          {/* Coltivazione (fiori) e lavorazione (hash): gli assi veri del catalogo */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="shrink-0 label text-[0.625rem] text-fg-muted">Coltivazione</span>
            {coltivazioniUsate.map((c) => (
              <Chip
                key={c}
                size="sm"
                active={coltivazione === c}
                onClick={() => setFilter('coltivazione', coltivazione === c ? null : c)}
              >
                {c}
              </Chip>
            ))}
            <span aria-hidden="true" className="mx-1 h-6 w-px shrink-0 bg-line" />
            <span className="shrink-0 label text-[0.625rem] text-fg-muted">Lavorazione</span>
            {lavorazioniUsate.map((l) => (
              <Chip
                key={l}
                size="sm"
                active={lavorazione === l}
                onClick={() => setFilter('lavorazione', lavorazione === l ? null : l)}
              >
                {l}
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {profili.map((tag) => (
                <Chip
                  key={tag}
                  size="sm"
                  active={profilo === tag}
                  onClick={() => setFilter('profilo', profilo === tag ? null : tag)}
                >
                  {tag}
                </Chip>
              ))}
            </div>
            <Chip
              size="sm"
              active={soloDisponibili}
              onClick={() => setFilter('disponibili', soloDisponibili ? null : 'si')}
            >
              Solo disponibili
            </Chip>

            <label className="ml-auto flex items-center gap-2 text-xs text-fg-muted">
              <span className="label text-[0.625rem]">Ordina</span>
              <select
                value={ordine}
                onChange={(e) => setFilter('ordine', e.target.value)}
                className="h-10 rounded-input bg-bg-alt px-3 text-sm text-fg ring-1 ring-line ring-inset focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {Object.entries(ordinamenti).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Container>
      </div>

      {/* Risultati */}
      <Section className="pt-8">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <p aria-live="polite" className="label text-[0.75rem] text-fg-muted">
              {mostrati.length} {mostrati.length === 1 ? 'prodotto' : 'prodotti'}
            </p>
            {attivi.map((f) => (
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
            {attivi.length > 1 && (
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams())}
                className="text-xs text-fg-muted underline transition hocus:text-primary"
              >
                Azzera tutto
              </button>
            )}
          </div>

          {mostrati.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mostrati.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60} className="h-full">
                  <ProductCard product={p} className="h-full" />
                </Reveal>
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
function Chip({
  active,
  onClick,
  children,
  size = 'md',
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  size?: 'sm' | 'md'
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-button label whitespace-nowrap transition duration-200 ease-out-soft',
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
