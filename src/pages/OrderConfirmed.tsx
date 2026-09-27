// Ordine confermato: grazie + numero → cosa succede adesso → riepilogo → crea account
import { ArrowRight, Check, Mail, Package, Truck } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Section } from '@/components/ui/Section'
import { site } from '@/data/site'
import { asset } from '@/lib/asset'
import { useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/money'

const passaggi = [
  {
    icon: Mail,
    titolo: 'Email di conferma',
    testo: 'Arriva entro pochi minuti, con il riepilogo.',
  },
  { icon: Package, titolo: 'Preparazione', testo: 'Prepariamo il pacco entro 24 ore lavorative.' },
  { icon: Truck, titolo: 'Spedizione', testo: 'Ti mandiamo il codice per seguire il pacco.' },
]

export default function OrderConfirmed() {
  const { numero } = useParams()
  const { active, subtotal } = useCart()
  const numeroOrdine = numero ?? 'TH-2609-4471'
  const spedizione = subtotal >= site.freeShippingFrom ? 0 : 590
  const totale = subtotal + spedizione

  return (
    <>
      <Section className="pb-10">
        <Container className="max-w-3xl">
          <span className="inline-grid size-14 place-items-center rounded-full bg-primary text-primary-fg">
            <Check className="size-7" strokeWidth={2.5} />
          </span>
          <Eyebrow className="mt-6">Ordine confermato</Eyebrow>
          <h1 className="mt-4 text-h1">Grazie.</h1>
          <p className="mt-5 text-lead text-fg-muted">
            Il tuo ordine è arrivato. Numero{' '}
            <span className="font-semibold text-primary">{numeroOrdine}</span>: tienilo da parte,
            serve per qualunque domanda.
          </p>
          <Badge variant="muted" className="mt-5">
            Prototipo: nessun ordine è stato registrato davvero
          </Badge>
        </Container>
      </Section>

      <Section tone="alt" className="py-12">
        <Container className="max-w-3xl">
          <p className="label text-[0.75rem] text-primary">Cosa succede adesso</p>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {passaggi.map(({ icon: Icon, titolo, testo }) => (
              <li key={titolo}>
                <Card className="flex h-full flex-col gap-3">
                  <Icon className="size-6 text-primary" strokeWidth={1.5} />
                  <p className="font-semibold">{titolo}</p>
                  <p className="text-sm text-fg-muted">{testo}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="py-12">
        <Container className="grid max-w-3xl gap-8">
          {active.length > 0 && (
            <div>
              <p className="label text-[0.75rem] text-fg-muted">Riepilogo</p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {active.map((l) => (
                  <li key={l.id} className="flex items-center gap-4 py-4">
                    <img
                      src={asset(l.image)}
                      alt=""
                      loading="lazy"
                      className="size-14 rounded-md object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{l.name}</span>
                      <span className="block label text-[0.625rem] text-fg-muted">
                        {l.formato} · {l.quantity} pz
                      </span>
                    </span>
                    <span className="font-medium">{formatPrice(l.price * l.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="label text-[0.75rem]">Totale pagato</span>
                <span className="text-2xl font-semibold text-primary">{formatPrice(totale)}</span>
              </div>
            </div>
          )}

          <form
            className="flex flex-col gap-4 rounded-card bg-surface p-6 ring-1 ring-line ring-inset"
            onSubmit={(e) => e.preventDefault()}
          >
            <p className="flex items-center gap-2 text-h3">
              <Diamond /> Crea l’account in un click
            </p>
            <p className="text-sm text-fg-muted">
              Scegli una password e l’ordine finisce nel tuo storico, con il tracking e il riordino
              rapido. L’email ce l’abbiamo già.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="pw" className="sr-only">
                  Password
                </label>
                <Input id="pw" type="password" placeholder="Scegli una password" />
              </div>
              <Button type="submit" className="shrink-0">
                Crea account
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap gap-3">
            <Button to="/account/ordini" variant="outline">
              Segui l’ordine <ArrowRight className="size-4" />
            </Button>
            <Button to="/negozio" variant="ghost" className="ring-1 ring-line ring-inset">
              Torna al negozio
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
