// Area cliente: riepilogo, storico ordini, dettaglio con tracking, indirizzi, Club.
// Una pagina sola con menu laterale; il contenuto cambia in base all'indirizzo.
import {
  ArrowRight,
  Check,
  Crown,
  KeyRound,
  Lock,
  MapPin,
  Package,
  Repeat,
  Truck,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { AccountNav } from '@/components/shop/AccountNav'
import { TesseraClub } from '@/components/club/TesseraClub'
import { cliente, indirizzi, ordini } from '@/data/account'
import { dropReserve, livelli, membroDemo } from '@/data/club'
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

      <Link
        to="/account/club"
        className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-card bg-surface p-5 ring-1 ring-line transition ring-inset hocus:ring-primary"
      >
        <span className="flex items-center gap-3">
          <Crown className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
          <span>
            <span className="block font-semibold">Club: {livelloAttuale().nome}</span>
            <span className="block text-sm text-fg-muted">
              Mancano {formatPrice(mancaA())} per diventare Black
            </span>
          </span>
        </span>
        <span className="label text-[0.6875rem] text-primary">La tua tessera →</span>
      </Link>

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

/* ---------------------------------------------------------------- Club */

const soglia = livelli.find((l) => l.id === 'black')!.soglia!
/** Spesa che conta per il livello: solo ordini consegnati (demo: negli ultimi 12 mesi). */
const spesaConsegnata = () =>
  ordini.filter((o) => o.stato === 'Consegnato').reduce((t, o) => t + o.totale, 0)
const spesaInViaggio = () =>
  ordini.filter((o) => o.stato !== 'Consegnato').reduce((t, o) => t + o.totale, 0)
const mancaA = () => Math.max(0, soglia - spesaConsegnata())
const livelloAttuale = () => livelli.find((l) => l.id === membroDemo.livello)!

/** Il Club dal lato del membro: tessera, livello, cosa manca, drop, inviti, consenso. */
export function AccountClub() {
  const attuale = livelloAttuale()
  const prossimo = livelli.find((l) => l.id === 'black')!
  const speso = spesaConsegnata()
  const quota = Math.min(100, Math.round((speso / soglia) * 100))
  const [profilazione, setProfilazione] = useState(membroDemo.consensoProfilazione)

  return (
    <Guscio titolo="Il tuo Club">
      <div className="grid items-start gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div>
          <TesseraClub
            livello={membroDemo.livello}
            numero={membroDemo.numero}
            nome={`${cliente.nome} ${cliente.cognome[0]}.`}
            className="max-w-md"
          />
          <p className="mt-3 text-sm text-fg-muted">
            Tessera digitale: in negozio mostra il codice in cassa. Numero {membroDemo.numero}.
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            Aggiungi al portafoglio del telefono
          </Button>
        </div>

        <Card className="flex flex-col gap-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="label text-[0.75rem] text-primary">Livello attuale</p>
            <p className="font-display text-h2 uppercase">{attuale.nome}</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span>
                {formatPrice(speso)} <span className="text-fg-muted">negli ultimi 12 mesi</span>
              </span>
              <span className="text-fg-muted">Black a {formatPrice(soglia)}</span>
            </div>
            <div
              role="progressbar"
              aria-label="Avanzamento verso Black"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={quota}
              className="mt-2 h-2.5 overflow-hidden rounded-full bg-bg-alt ring-1 ring-line ring-inset"
            >
              <div className="h-full rounded-full bg-primary" style={{ width: `${quota}%` }} />
            </div>
            <p className="mt-3 text-sm text-fg-muted">
              Mancano <b className="text-fg">{formatPrice(mancaA())}</b> per diventare Black.
              L’ordine in viaggio ({formatPrice(spesaInViaggio())}) conta appena arriva.
            </p>
          </div>
          <ol className="flex flex-col border-l-2 border-line pl-6">
            {membroDemo.dal.map((d) => (
              <li key={d.livello} className="relative pb-4 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-[31px] grid size-5 place-items-center rounded-full bg-primary text-primary-fg"
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <p className="text-sm font-semibold">{d.livello}</p>
                <p className="text-xs text-fg-muted">dal {d.data}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div>
          <p className="label text-[0.75rem] text-primary">Attivi per te</p>
          <ul className="mt-4 flex flex-col gap-3">
            {attuale.vantaggi.map((v) => (
              <li key={v} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} />
                {v}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-[0.75rem] text-fg-muted">Con Black</p>
          <ul className="mt-4 flex flex-col gap-3">
            {prossimo.vantaggi.slice(0, 5).map((v) => (
              <li key={v} className="flex items-start gap-3 text-sm text-fg-muted">
                <Lock className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <p className="label text-[0.75rem] text-primary">Prossimi drop</p>
        <ul className="mt-4 flex flex-col gap-3">
          <li>
            <Card className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold">Mimosa THC-X Pre-roll · nuovo lotto</p>
                <p className="text-sm text-fg-muted">
                  Per te: giovedì alle 18:00 · per tutti: venerdì alle 18:00
                </p>
              </div>
              <Badge>24 h prima</Badge>
            </Card>
          </li>
          {dropReserve.slice(0, 2).map((d) => (
            <li key={d.numero}>
              <Card className="flex flex-wrap items-center justify-between gap-4 opacity-80">
                <div className="flex items-center gap-3">
                  <Lock className="size-5 shrink-0 text-fg-muted" strokeWidth={1.75} />
                  <div>
                    <p className="font-semibold">
                      Reserve {d.numero} · {d.nome}
                    </p>
                    <p className="text-sm text-fg-muted">
                      {d.pezzi} pezzi · riservato a Black ed Elite
                    </p>
                  </div>
                </div>
                <Badge variant="muted">Si apre con Black</Badge>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-fg-subtle">Drop e date di esempio.</p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <Card className="flex flex-col gap-3">
          <p className="flex items-center gap-2 label text-[0.75rem] text-primary">
            <KeyRound className="size-4" /> Inviti
          </p>
          <p className="text-sm text-fg-muted">
            Gli inviti arrivano con Black: due a trimestre, da dare a chi vuoi tu. Chi entra con il
            tuo invito è Black per 90 giorni.
          </p>
          <p className="font-display text-h3 text-fg-subtle uppercase">0 disponibili</p>
        </Card>
        <Card className="flex flex-col gap-3">
          <p className="label text-[0.75rem] text-primary">Offerte su misura</p>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={profilazione}
              onChange={(e) => setProfilazione(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-primary"
            />
            <span>
              Usate i miei acquisti per propormi drop e offerte adatte a me.{' '}
              <span className="text-fg-muted">
                Facoltativo. Senza questo consenso il Club funziona lo stesso; i dati di dettaglio
                si tengono al massimo 12 mesi.
              </span>
            </span>
          </label>
          <Link to="/regolamento-club" className="text-sm text-primary underline">
            Regolamento del Club
          </Link>
        </Card>
      </div>
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
