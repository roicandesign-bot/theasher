// Carrello: intestazione → righe → salvati per dopo → riepilogo con coupon e IVA
// → cross-sell. Tutto lo stato è locale: nessun ordine viene creato davvero.
import { ArrowRight, ShoppingBag, Tag } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { ProductCard } from '@/components/ui/ProductCard'
import { Section, SectionHeader } from '@/components/ui/Section'
import { CartLineRow } from '@/components/shop/CartLineRow'
import { FreeShippingBar } from '@/components/shop/FreeShippingBar'
import { products } from '@/data/products'
import { site } from '@/data/site'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/money'

const IVA = 0.22

export default function Cart() {
  const { active, saved, subtotal, count } = useCart()
  const [coupon, setCoupon] = useState('')
  const [couponApplicato, setCouponApplicato] = useState<string | null>(null)

  const spedizione = subtotal >= site.freeShippingFrom || subtotal === 0 ? 0 : 590
  const sconto = couponApplicato ? Math.round(subtotal * 0.1) : 0
  const totale = subtotal - sconto + spedizione
  const imponibile = Math.round(totale / (1 + IVA))
  const iva = totale - imponibile

  const suggeriti = products
    .filter((p) => p.inStock && !active.some((l) => l.slug === p.slug))
    .slice(0, 3)

  if (count === 0 && saved.length === 0) {
    return (
      <Section>
        <Container className="flex flex-col items-start gap-5">
          <Eyebrow>Carrello</Eyebrow>
          <ShoppingBag className="size-12 text-fg-subtle" strokeWidth={1.25} />
          <h1 className="text-h1">Il carrello è vuoto.</h1>
          <p className="max-w-prose text-lead text-fg-muted">
            Niente di grave. La selezione è corta apposta: si fa presto a scegliere.
          </p>
          <Button to="/negozio" size="lg">
            Vai al negozio <ArrowRight className="size-4" />
          </Button>
        </Container>
      </Section>
    )
  }

  return (
    <>
      <Section className="pb-8">
        <Container>
          <Eyebrow>Carrello</Eyebrow>
          <h1 className="mt-4 text-h1">
            {count} {count === 1 ? 'articolo' : 'articoli'}
          </h1>
        </Container>
      </Section>

      <Container className="grid items-start gap-8 pb-section lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        {/* Righe */}
        <div>
          <div className="divide-y divide-line border-y border-line">
            {active.map((l) => (
              <CartLineRow key={l.id} line={l} />
            ))}
          </div>

          {saved.length > 0 && (
            <div className="mt-10">
              <p className="label text-[0.75rem] text-fg-muted">Salvati per dopo</p>
              <div className="mt-3 divide-y divide-line border-y border-line opacity-80">
                {saved.map((l) => (
                  <CartLineRow key={l.id} line={l} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Riepilogo */}
        <aside className="flex flex-col gap-5 rounded-card bg-surface p-6 ring-1 ring-line ring-inset lg:sticky lg:top-28">
          <p className="label text-[0.75rem]">Riepilogo</p>

          <FreeShippingBar subtotal={subtotal} />

          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (coupon.trim()) setCouponApplicato(coupon.trim().toUpperCase())
            }}
          >
            <label htmlFor="coupon" className="label text-[0.625rem] text-fg-muted">
              Codice promozionale
            </label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Inserisci il codice"
              />
              <Button type="submit" variant="outline" className="shrink-0">
                Applica
              </Button>
            </div>
            {couponApplicato && (
              <Badge variant="stock" className="self-start px-0">
                <Tag className="size-3" /> {couponApplicato} applicato, −10 %
              </Badge>
            )}
          </form>

          <dl className="flex flex-col gap-2.5 border-t border-line pt-5 text-sm">
            <Riga voce="Subtotale" valore={formatPrice(subtotal)} />
            {sconto > 0 && (
              <Riga voce="Sconto" valore={`− ${formatPrice(sconto)}`} evidenzia="success" />
            )}
            <Riga
              voce="Spedizione"
              valore={spedizione === 0 ? 'Gratuita' : formatPrice(spedizione)}
            />
            <Riga
              voce={`di cui IVA (${Math.round(IVA * 100)} %)`}
              valore={formatPrice(iva)}
              muted
            />
          </dl>

          <div className="flex items-baseline justify-between border-t border-line pt-4">
            <span className="label text-[0.75rem]">Totale</span>
            <span className="text-3xl font-semibold text-primary">{formatPrice(totale)}</span>
          </div>

          <Button to="/checkout" size="lg" className="w-full">
            Vai al checkout <ArrowRight className="size-4" />
          </Button>
          <p className="text-xs text-fg-muted">
            Pagamenti accettati: {site.payments.join(', ')}. Reso entro 14 giorni se la confezione è
            integra.
          </p>
        </aside>
      </Container>

      {/* Cross-sell */}
      {suggeriti.length > 0 && (
        <Section tone="alt">
          <Container>
            <SectionHeader eyebrow="Ti potrebbe servire" title="Completa l’ordine." />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {suggeriti.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}

function Riga({
  voce,
  valore,
  muted,
  evidenzia,
}: {
  voce: string
  valore: string
  muted?: boolean
  evidenzia?: 'success'
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={muted ? 'text-fg-subtle' : 'text-fg-muted'}>{voce}</dt>
      <dd
        className={
          evidenzia === 'success'
            ? 'font-semibold text-success'
            : muted
              ? 'text-fg-subtle'
              : 'font-medium'
        }
      >
        {valore}
      </dd>
    </div>
  )
}
