// Preferiti: elenco salvato (stato locale del prototipo) con aggiunta rapida al carrello
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ProductCard } from '@/components/ui/ProductCard'
import { Section } from '@/components/ui/Section'
import { products } from '@/data/products'

const inizialiPreferiti = ['lemon-haze', 'ketama-gold', 'silver-haze']

export default function Wishlist() {
  const [preferiti, setPreferiti] = useState(inizialiPreferiti)
  const lista = products.filter((p) => preferiti.includes(p.slug))

  return (
    <Section>
      <Container>
        <Eyebrow>Preferiti</Eyebrow>
        <h1 className="mt-4 text-h1">Quello che hai messo da parte.</h1>
        <p className="mt-5 max-w-prose text-lead text-fg-muted">
          I preferiti restano qui finché non li togli. Quando un prodotto esaurito torna
          disponibile, se ce lo chiedi ti avvisiamo.
        </p>

        {lista.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((p) => (
              <div key={p.slug} className="relative">
                <ProductCard product={p} className="h-full" />
                <button
                  type="button"
                  onClick={() => setPreferiti((prev) => prev.filter((s) => s !== p.slug))}
                  aria-label={`Togli ${p.name} dai preferiti`}
                  className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-bg/80 text-primary backdrop-blur transition hocus:text-danger"
                >
                  <Heart className="size-4 fill-current" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-4 rounded-card bg-surface p-8 ring-1 ring-line ring-inset">
            <Heart className="size-8 text-fg-subtle" strokeWidth={1.25} />
            <p className="text-h3">Non hai preferiti.</p>
            <p className="max-w-prose text-fg-muted">
              Tocca il cuore su un prodotto per tenerlo d’occhio senza comprarlo subito.
            </p>
            <Button to="/negozio">Vai al negozio</Button>
          </div>
        )}
      </Container>
    </Section>
  )
}
