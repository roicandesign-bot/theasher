// Negozio: intestazione → barra compatta (famiglia, linea, filtri) → griglia prodotti.
// Tutti gli altri filtri stanno nel pannello. I filtri vivono nell'indirizzo: la pagina è condivisibile.
import { SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterSheet } from '@/components/shop/FilterSheet'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { categorie, linee, type Cannabinoide, type Categoria } from '@/data/products'
import { cn } from '@/lib/cn'
import {
  applica,
  attiviDi,
  contaAttivi,
  contaCategoria,
  daPulire,
  leggiFiltri,
  ordinamenti,
  type Ordine,
} from '@/lib/filtri'

const linguette: { id: Categoria | null; label: string }[] = [
  { id: null, label: 'Tutto' },
  ...(Object.keys(categorie) as Categoria[]).map((id) => ({ id, label: categorie[id] })),
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [pannello, setPannello] = useState(false)
  const filtri = leggiFiltri(params)
  const mostrati = applica(filtri)
  const evidenzia = filtri.cannabinoide ?? (filtri.linea as Cannabinoide | null)
  /** Una scheda grande su due righe: un lotto limitato, se c'è, altrimenti una novità. */
  const inEvidenza =
    mostrati.length >= 5
      ? (mostrati.find((p) => p.badges?.includes('Limited drop')) ??
        mostrati.find((p) => p.badges?.includes('New')) ??
        null)
      : null
  const resto = inEvidenza ? mostrati.filter((p) => p !== inEvidenza) : mostrati
  const attivi = attiviDi(filtri)

  // Su telefono le famiglie scorrono: quella scelta deve restare in vista.
  const famiglieRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const striscia = famiglieRef.current
    const scelta = striscia?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!striscia || !scelta || striscia.scrollWidth <= striscia.clientWidth) return
    striscia.scrollTo({
      left: scelta.offsetLeft - (striscia.clientWidth - scelta.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [filtri.categoria])

  /** Aggiorna un filtro nell'indirizzo; null lo toglie. */
  const setFilter = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null) next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  /** Cambiare categoria toglie i filtri che non valgono più. */
  const setCategoria = (c: Categoria | null) => {
    const next = new URLSearchParams(params)
    if (c === null) next.delete('categoria')
    else next.set('categoria', c)
    for (const k of daPulire(c)) next.delete(k)
    setParams(next)
  }

  const titolo =
    filtri.badge === 'New'
      ? 'New drops'
      : filtri.badge === 'Best seller'
        ? 'Best seller'
        : filtri.categoria
          ? `${categorie[filtri.categoria]}${filtri.linea ? ` ${filtri.linea}` : ''}`
          : 'Tutti i prodotti'

  return (
    <>
      <Section className="pb-6">
        <Container>
          <Eyebrow>Negozio</Eyebrow>
          <h1 className="mt-4 text-h1">{titolo}</h1>
          <p className="mt-4 max-w-prose text-lead text-fg-muted">
            Quattro linee, nove famiglie: dai fiori all’hash, dai preroll ai semi. Un certificato di
            analisi per ogni lotto e il prezzo sempre in chiaro.
          </p>
        </Container>
      </Section>

      {/* Barra dei filtri. Telefono e portatile: due righe. Schermi larghi: una barra unica, famiglie | linee. */}
      <div className="sticky top-18 z-20 border-y border-line bg-bg/95 backdrop-blur md:top-20">
        <Container className="flex flex-col gap-2 py-3 xl:flex-row xl:items-center xl:gap-3">
          <div className="flex min-w-0 flex-col gap-2 xl:flex-row xl:items-center xl:gap-0 xl:rounded-button xl:bg-bg-alt xl:p-1">
            {/* le famiglie (+ filtri, sotto gli schermi larghi) */}
            <div className="flex min-w-0 items-center gap-2">
              <div
                ref={famiglieRef}
                role="group"
                aria-label="Famiglie di prodotto"
                className="relative no-scrollbar flex min-w-0 flex-1 gap-1 overflow-x-auto rounded-button bg-bg-alt p-1 xl:flex-none xl:bg-transparent xl:p-0"
              >
                {linguette.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    aria-pressed={filtri.categoria === t.id}
                    onClick={() => setCategoria(t.id)}
                    className={cn(
                      'flex shrink-0 flex-col items-center justify-center gap-0.5 rounded-button px-3.5 py-2 label text-[0.6875rem] transition duration-200 ease-out-soft xl:px-2.5 2xl:px-3.5',
                      filtri.categoria === t.id
                        ? 'bg-primary text-primary-fg'
                        : 'text-primary hocus:bg-surface-hover',
                    )}
                  >
                    {t.label}
                    <span
                      className={cn(
                        'text-[0.625rem]',
                        filtri.categoria === t.id ? 'text-primary-fg/60' : 'text-fg-muted',
                      )}
                    >
                      {contaCategoria(filtri, t.id)}
                    </span>
                  </button>
                ))}
              </div>
              <BottoneFiltri
                attivi={contaAttivi(filtri)}
                onClick={() => setPannello(true)}
                className="xl:hidden"
              />
            </div>

            {/* separatore: da qui in poi le linee */}
            <span aria-hidden="true" className="mx-2.5 hidden h-8 w-px shrink-0 bg-line xl:block" />

            {/* le linee e i lotti senza THC */}
            <div
              role="group"
              aria-label="Linee"
              className="grid grid-cols-5 gap-1.5 md:flex md:gap-1"
            >
              {linee.map((l) => (
                <Chip
                  key={l}
                  size="sm"
                  className="w-full justify-center px-1 md:w-auto md:px-3.5 xl:px-3"
                  active={filtri.linea === l}
                  onClick={() => setFilter('linea', filtri.linea === l ? null : l)}
                >
                  {l}
                </Chip>
              ))}
              <Chip
                size="sm"
                className="w-full justify-center px-1 md:w-auto md:px-3.5 xl:px-3"
                active={filtri.thcFree}
                onClick={() => setFilter('thcfree', filtri.thcFree ? null : 'si')}
              >
                THC free
              </Chip>
            </div>
          </div>

          <BottoneFiltri
            attivi={contaAttivi(filtri)}
            onClick={() => setPannello(true)}
            className="hidden xl:ml-auto xl:inline-flex"
          />
        </Container>
      </div>

      {/* Risultati */}
      <Section className="pt-6">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <p aria-live="polite" className="mr-1 label text-[0.75rem] text-fg-muted">
              {mostrati.length} {mostrati.length === 1 ? 'prodotto' : 'prodotti'}
            </p>
            {attivi.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key, null)}
                className="inline-flex items-center gap-1.5 rounded-badge bg-bg-alt px-2.5 py-1.5 label text-[0.6875rem] text-fg transition hocus:text-primary"
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

            {/* ordinamento: su telefono sta nel pannello dei filtri */}
            <label className="ml-auto hidden items-center gap-2 md:flex">
              <span className="label text-[0.625rem] text-fg-muted">Ordina</span>
              <select
                value={filtri.ordine}
                onChange={(e) => setFilter('ordine', e.target.value)}
                className="h-10 rounded-input bg-bg-alt px-3 text-sm text-fg ring-1 ring-line ring-inset focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {(Object.keys(ordinamenti) as Ordine[]).map((k) => (
                  <option key={k} value={k}>
                    {ordinamenti[k]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {mostrati.length > 0 ? (
            <div className="mt-8 grid grid-flow-row-dense gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {inEvidenza && (
                <Reveal className="h-full sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 xl:col-start-4">
                  <ProductCard
                    product={inEvidenza}
                    grande
                    evidenzia={evidenzia}
                    className="h-full"
                  />
                </Reveal>
              )}
              {resto.map((p, i) => (
                <Reveal key={p.slug} delay={Math.min(i, 5) * 60} className="h-full">
                  <ProductCard product={p} evidenzia={evidenzia} className="h-full" />
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

      <FilterSheet
        open={pannello}
        filtri={filtri}
        risultati={mostrati.length}
        onClose={() => setPannello(false)}
        onSet={setFilter}
        onReset={() => setParams(new URLSearchParams())}
      />
    </>
  )
}

function BottoneFiltri({
  attivi,
  onClick,
  className,
}: {
  attivi: number
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Apri i filtri"
      className={cn(
        'inline-flex h-11 shrink-0 items-center gap-2 rounded-button px-3.5 label text-[0.6875rem] ring-1 transition duration-200 ease-out-soft ring-inset sm:px-4',
        attivi > 0 ? 'text-primary ring-primary' : 'text-fg ring-line hocus:ring-line-strong',
        className,
      )}
    >
      <SlidersHorizontal aria-hidden="true" className="size-4" strokeWidth={1.75} />
      <span className="hidden sm:inline">Filtri</span>
      {attivi > 0 && (
        <span className="grid size-5 place-items-center rounded-full bg-primary text-[0.625rem] text-primary-fg">
          {attivi}
        </span>
      )}
    </button>
  )
}
