// Ricerca: campo → suggerimenti → risultati → stato vuoto utile
import { Search as SearchIcon, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/components/ui/ProductCard'
import { Section } from '@/components/ui/Section'
import { journal } from '@/data/contenuti'
import { categorie, products, tagLavorazione } from '@/data/products'

const suggerimenti = ['Hash', 'Lemon Haze', 'Fiori', 'Lotto', 'Spedizione']

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const query = (params.get('q') ?? '').trim().toLowerCase()

  const prodottiTrovati = useMemo(() => {
    if (!query) return []
    return products.filter((p) =>
      `${p.name} ${categorie[p.category]} ${p.linea} ${tagLavorazione(p) ?? ''} ${p.aroma.join(
        ' ',
      )} ${p.short}`
        .toLowerCase()
        .includes(query),
    )
  }, [query])

  const articoliTrovati = useMemo(() => {
    if (!query) return []
    return journal.filter((a) =>
      `${a.titolo} ${a.estratto} ${a.categoria}`.toLowerCase().includes(query),
    )
  }, [query])

  const totale = prodottiTrovati.length + articoliTrovati.length

  return (
    <>
      <Section className="pb-8">
        <Container>
          <Eyebrow>Ricerca</Eyebrow>
          <h1 className="mt-4 text-h1">Cosa cerchi?</h1>

          <form
            className="mt-8 flex max-w-xl gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              setParams(q.trim() ? { q: q.trim() } : {})
            }}
          >
            <div className="relative flex-1">
              <label htmlFor="q" className="sr-only">
                Cerca nel sito
              </label>
              <SearchIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-fg-muted"
              />
              <Input
                id="q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Prodotto, lotto, argomento"
                className="pl-11"
                autoFocus
              />
            </div>
            <Button type="submit" className="shrink-0">
              Cerca
            </Button>
          </form>

          {!query && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="label text-[0.625rem] text-fg-muted">Prova con</span>
              {suggerimenti.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQ(s)
                    setParams({ q: s })
                  }}
                  className="rounded-button px-3.5 py-2 label text-[0.6875rem] text-fg ring-1 ring-line transition ring-inset hocus:ring-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {query && (
        <Container className="pb-section">
          <div className="flex flex-wrap items-center gap-3">
            <p aria-live="polite" className="label text-[0.75rem] text-fg-muted">
              {totale} {totale === 1 ? 'risultato' : 'risultati'} per “{query}”
            </p>
            <button
              type="button"
              onClick={() => {
                setQ('')
                setParams({})
              }}
              className="inline-flex items-center gap-1.5 rounded-badge bg-bg-alt px-2 py-1 label text-[0.6875rem] transition hocus:text-primary"
            >
              Azzera <X className="size-3" />
            </button>
          </div>

          {prodottiTrovati.length > 0 && (
            <section className="mt-8">
              <h2 className="text-h3">Prodotti</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {prodottiTrovati.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          )}

          {articoliTrovati.length > 0 && (
            <section className="mt-12">
              <h2 className="text-h3">Dal journal</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {articoliTrovati.map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={`/journal/${a.slug}`}
                      className="flex flex-col gap-1 rounded-card p-5 ring-1 ring-line transition ring-inset hocus:ring-primary"
                    >
                      <span className="font-semibold">{a.titolo}</span>
                      <span className="text-sm text-fg-muted">{a.estratto}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {totale === 0 && (
            <div className="mt-8 flex flex-col items-start gap-4 rounded-card bg-surface p-8 ring-1 ring-line ring-inset">
              <SearchIcon className="size-8 text-fg-subtle" strokeWidth={1.25} />
              <p className="text-h3">Nessun risultato per “{query}”.</p>
              <p className="max-w-prose text-fg-muted">
                La selezione è corta: forse quello che cerchi si chiama in un altro modo. Guarda
                tutto il negozio, ci metti un minuto.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button to="/negozio">Vedi tutti i prodotti</Button>
                <Button to="/contatti" variant="ghost" className="ring-1 ring-line ring-inset">
                  Chiedi a noi
                </Button>
              </div>
            </div>
          )}
        </Container>
      )}
    </>
  )
}
