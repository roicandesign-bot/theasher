// Area cliente: riepilogo, storico ordini, dettaglio con tracking, indirizzi.
// Una pagina sola con menu laterale; il contenuto cambia in base all'indirizzo.
import { ArrowRight, Check, MapPin, Package, Repeat, Truck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { AccountNav } from '@/components/shop/AccountNav'
import { cliente, indirizzi, ordini } from '@/data/account'
import { findProduct, productPath } from '@/data/products'
import { useCart } from '@/lib/cart'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/money'

function badgeStato(stato: string) {
  if (stato === 'Consegnato') return 'stock' as const
  if (stato === 'In attesa di pagamento') return 'outline' as const
  return 'solid' as const
}

/** Guscio comune: intestazione + menu + contenuto. */
function Guscio({ titolo, children }: { titolo: string; children: React.ReactNode }) {
  return (
    <Section>
      <Container>
        <Eyebrow>Ciao {cliente.nome}</Eyebrow>
        <h1 className="mt-4 text-h1">{titolo}</h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AccountNav />
          </div>
          <div>{children}</div>
        </div>
      </Container>
    </Section>
  )
}

/** Riepilogo dell'account. */
export function AccountHome() {
  const ultimo = ordini[0]!
  return (
    <Guscio titolo="Il tuo account">
      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="flex flex-col gap-1">
          <p className="label text-[0.625rem] text-fg-muted">Ordini fatti</p>
          <p className="font-display text-h2 text-primary">{ordini.length}</p>
        </Card>
        <Card className="flex flex-col gap-1">
          <p className="label text-[0.625rem] text-fg-muted">Cliente dal</p>
          <p className="text-h3">{cliente.dal}</p>
        </Card>
        <Card className="flex flex-col gap-1">
          <p className="label text-[0.625rem] text-fg-muted">Email</p>
          <p className="truncate text-sm">{cliente.email}</p>
        </Card>
      </div>

      <div className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="label text-[0.75rem] text-primary">Ultimo ordine</p>
          <Link
            to="/account/ordini"
            className="label text-[0.6875rem] transition hocus:text-primary"
          >
            Vedi tutti →
          </Link>
        </div>
        <RigaOrdine ordine={ultimo} className="mt-4" />
      </div>

      <div className="mt-10">
        <p className="label text-[0.75rem] text-primary">Indirizzo predefinito</p>
        <Card className="mt-4 flex items-start gap-4">
          <MapPin className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.5} />
          <div>
            <p className="font-semibold">{indirizzi[0]!.etichetta}</p>
            <p className="mt-1 text-sm text-fg-muted">{indirizzi[0]!.righe.join(' · ')}</p>
          </div>
        </Card>
      </div>
    </Guscio>
  )
}

/** Storico ordini. */
export function AccountOrders() {
  return (
    <Guscio titolo="I miei ordini">
      <ul className="flex flex-col gap-4">
        {ordini.map((o) => (
          <li key={o.numero}>
            <RigaOrdine ordine={o} />
          </li>
        ))}
      </ul>
    </Guscio>
  )
}

/** Dettaglio di un ordine con la timeline della spedizione. */
export function AccountOrderDetail() {
  const { numero } = useParams()
  const ordine = ordini.find((o) => o.numero === numero) ?? ordini[0]!
  const { add } = useCart()

  const riordina = () => {
    ordine.articoli.forEach((a) => {
      const p = findProduct(a.slug)
      add(p, a.formato, a.quantita)
    })
  }

  return (
    <Guscio titolo={`Ordine ${ordine.numero}`}>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={badgeStato(ordine.stato)}>{ordine.stato}</Badge>
        <span className="text-sm text-fg-muted">{ordine.data}</span>
      </div>

      {/* Tracking */}
      <Card className="mt-6 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-semibold">
            <Truck className="size-5 text-primary" strokeWidth={1.5} />
            {ordine.corriere} · {ordine.tracking}
          </p>
          <Button variant="outline" size="sm">
            Segui il pacco <ArrowRight className="size-4" />
          </Button>
        </div>
        <ol className="flex flex-col border-l-2 border-line pl-6">
          {ordine.timeline.map((t) => (
            <li key={t.stato} className="relative pb-5 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-1 -left-[31px] grid size-5 place-items-center rounded-full',
                  t.fatto ? 'bg-primary text-primary-fg' : 'bg-bg-alt text-fg-subtle',
                )}
              >
                {t.fatto ? <Check className="size-3" strokeWidth={3} /> : '·'}
              </span>
              <p className={cn('text-sm font-semibold', !t.fatto && 'text-fg-subtle')}>{t.stato}</p>
              {t.data && <p className="text-xs text-fg-muted">{t.data}</p>}
            </li>
          ))}
        </ol>
      </Card>

      {/* Articoli */}
      <div className="mt-8">
        <p className="label text-[0.75rem] text-fg-muted">Articoli</p>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {ordine.articoli.map((a) => (
            <li key={a.slug + a.formato} className="flex items-center justify-between gap-4 py-4">
              <span>
                <Link
                  to={productPath(a.slug)}
                  className="font-semibold transition hocus:text-primary"
                >
                  {a.nome}
                </Link>
                <span className="block label text-[0.625rem] text-fg-muted">
                  {a.formato} · {a.quantita} pz
                </span>
              </span>
              <span className="font-medium">{formatPrice(a.prezzo * a.quantita)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="label text-[0.75rem]">Totale</span>
          <span className="text-2xl font-semibold text-primary">{formatPrice(ordine.totale)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={riordina}>
          <Repeat className="size-4" /> Riordina
        </Button>
        <Button to="/contatti" variant="ghost" className="ring-1 ring-line ring-inset">
          Serve aiuto con questo ordine
        </Button>
      </div>

      <p className="mt-6 text-sm text-fg-muted">Spedito a: {ordine.indirizzo}</p>
    </Guscio>
  )
}

/** Rubrica indirizzi. */
export function AccountAddresses() {
  return (
    <Guscio titolo="Indirizzi">
      <ul className="grid gap-5 sm:grid-cols-2">
        {indirizzi.map((i) => (
          <li key={i.id}>
            <Card className="flex h-full flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-h3 uppercase">{i.etichetta}</p>
                {i.predefinito && <Badge variant="outline">Predefinito</Badge>}
              </div>
              <address className="text-sm break-words text-fg-muted not-italic">
                {i.righe.map((r) => (
                  <span key={r} className="block">
                    {r}
                  </span>
                ))}
              </address>
              <div className="mt-auto flex gap-2 pt-3">
                <Button variant="ghost" size="sm" className="ring-1 ring-line ring-inset">
                  Modifica
                </Button>
                {!i.predefinito && (
                  <Button variant="ghost" size="sm" className="text-fg-muted">
                    Rendi predefinito
                  </Button>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
      <Button variant="outline" className="mt-6">
        Aggiungi un indirizzo
      </Button>
    </Guscio>
  )
}

function RigaOrdine({
  ordine,
  className,
}: {
  ordine: (typeof ordini)[number]
  className?: string
}) {
  return (
    <Card
      variant="interactive"
      className={cn('flex flex-wrap items-center justify-between gap-4', className)}
    >
      <div className="flex items-center gap-4">
        <Package className="size-6 shrink-0 text-primary" strokeWidth={1.5} />
        <div>
          <p className="font-semibold">{ordine.numero}</p>
          <p className="text-sm text-fg-muted">
            {ordine.data} · {ordine.articoli.length}{' '}
            {ordine.articoli.length === 1 ? 'articolo' : 'articoli'}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Badge variant={badgeStato(ordine.stato)}>{ordine.stato}</Badge>
        <span className="font-semibold text-primary">{formatPrice(ordine.totale)}</span>
        <Link
          to={`/account/ordini/${ordine.numero}`}
          className="label text-[0.6875rem] transition hocus:text-primary"
        >
          Dettaglio →
        </Link>
      </div>
    </Card>
  )
}
