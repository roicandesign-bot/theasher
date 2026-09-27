// Blog: elenco articoli con filtro per categoria, e pagina del singolo articolo
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { blog } from '@/data/contenuti'
import { asset } from '@/lib/asset'

const categorie = [...new Set(blog.map((a) => a.categoria))]

export function BlogList() {
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria')
  const articoli = categoria ? blog.filter((a) => a.categoria === categoria) : blog
  const [primo, ...altri] = articoli

  const filtra = (c: string | null) => {
    const next = new URLSearchParams()
    if (c) next.set('categoria', c)
    setParams(next)
  }

  return (
    <>
      <Section className="pb-8">
        <Container>
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-4 text-h1">Quello che vale la pena sapere.</h1>
          <p className="mt-5 max-w-prose text-lead text-fg-muted">
            Guide pratiche, cultura del prodotto e come lavoriamo. Niente consigli di salute, niente
            promesse: solo come funzionano le cose.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip size="sm" active={!categoria} onClick={() => filtra(null)}>
              Tutti
            </Chip>
            {categorie.map((c) => (
              <Chip
                key={c}
                size="sm"
                count={blog.filter((a) => a.categoria === c).length}
                active={categoria === c}
                onClick={() => filtra(categoria === c ? null : c)}
              >
                {c}
              </Chip>
            ))}
          </div>
        </Container>
      </Section>

      {primo && (
        <Container className="pb-12">
          <Link
            to={`/blog/${primo.slug}`}
            className="group grid overflow-hidden rounded-card bg-surface ring-1 ring-line transition ring-inset md:grid-cols-2 hocus:ring-primary"
          >
            <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
              <img
                src={asset(primo.immagine)}
                alt=""
                className="size-full object-cover transition duration-500 ease-out-soft group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{primo.categoria}</Badge>
                <span className="label text-[0.625rem] text-fg-muted">
                  {primo.data} · {primo.lettura}
                </span>
              </div>
              <h2 className="text-h2">{primo.titolo}</h2>
              <p className="text-fg-muted">{primo.estratto}</p>
              <span className="mt-2 flex items-center gap-2 label text-[0.6875rem] text-primary">
                Leggi <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </Container>
      )}

      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow="Altri articoli" title="Dall’archivio." />
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {altri.map((a, i) => (
              <li key={a.slug}>
                <Reveal delay={i * 60} className="h-full">
                  <Link
                    to={`/blog/${a.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-card bg-surface ring-1 ring-line transition ring-inset hocus:ring-primary"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={asset(a.immagine)}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover transition duration-500 ease-out-soft group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="outline">{a.categoria}</Badge>
                        <span className="label text-[0.625rem] text-fg-muted">
                          {a.data} · {a.lettura}
                        </span>
                      </div>
                      <h3 className="text-h3">{a.titolo}</h3>
                      <p className="text-sm text-fg-muted">{a.estratto}</p>
                    </div>
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

export function BlogArticle() {
  const { slug } = useParams()
  const a = blog.find((x) => x.slug === slug) ?? blog[0]!
  const altri = blog.filter((x) => x.slug !== a.slug).slice(0, 2)

  return (
    <>
      <Section className="pb-8">
        <Container width="prose">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 label text-[0.6875rem] text-fg-muted transition hocus:text-primary"
          >
            <ArrowLeft className="size-4" /> Blog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge>{a.categoria}</Badge>
            <span className="label text-[0.625rem] text-fg-muted">
              {a.data} · {a.lettura}
            </span>
          </div>
          <h1 className="mt-4 text-h1">{a.titolo}</h1>
          <p className="mt-5 text-lead text-fg-muted">{a.estratto}</p>
        </Container>
      </Section>

      <Container className="pb-12">
        <img
          src={asset(a.immagine)}
          alt=""
          className="aspect-[21/9] w-full rounded-card object-cover ring-1 ring-line ring-inset"
        />
      </Container>

      <Container width="prose" className="pb-section">
        <div className="flex flex-col gap-5 text-lead text-fg-muted">
          {a.corpo.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="mt-10 border-t border-line pt-8">
          <p className="label text-[0.75rem] text-primary">Continua a leggere</p>
          <ul className="mt-4 flex flex-col gap-3">
            {altri.map((x) => (
              <li key={x.slug}>
                <Link
                  to={`/blog/${x.slug}`}
                  className="flex items-center justify-between gap-4 rounded-card p-4 ring-1 ring-line transition ring-inset hocus:ring-primary"
                >
                  <span className="font-semibold">{x.titolo}</span>
                  <ArrowRight className="size-4 shrink-0 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
          <Button to="/negozio" className="mt-8">
            Vai al negozio <ArrowRight className="size-4" />
          </Button>
        </div>
      </Container>
    </>
  )
}
