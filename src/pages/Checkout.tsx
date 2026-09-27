// Checkout in tre passi: contatti e indirizzo → spedizione → pagamento.
// Riepilogo sempre visibile. Nessun pagamento reale: il modulo non invia nulla.
import { ArrowLeft, ArrowRight, Check, Lock } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Logo } from '@/components/ui/Logo'
import { FreeShippingBar } from '@/components/shop/FreeShippingBar'
import { site } from '@/data/site'
import { asset } from '@/lib/asset'
import { useCart } from '@/lib/cart'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/money'

const passi = ['Contatti e indirizzo', 'Spedizione', 'Pagamento'] as const

const paesi = [
  { code: 'IT', nome: 'Italia' },
  { code: 'DE', nome: 'Germania' },
  { code: 'FR', nome: 'Francia' },
  { code: 'ES', nome: 'Spagna' },
  { code: 'NL', nome: 'Paesi Bassi' },
]

const spedizioni = [
  { id: 'standard', nome: 'Standard tracciata', tempi: '48–72 ore', prezzo: 590 },
  { id: 'express', nome: 'Express', tempi: '24–48 ore', prezzo: 990 },
]

const pagamenti = [
  { id: 'carta', nome: 'Carta di credito o debito', nota: 'Il modulo è ospitato dal fornitore' },
  { id: 'bonifico', nome: 'Bonifico bancario', nota: 'Istruzioni via email, ordine in attesa' },
  { id: 'wallet', nome: 'Apple Pay / Google Pay', nota: 'Pagamento in un tocco' },
]

const IVA = 0.22

export default function Checkout() {
  const { active, subtotal, count } = useCart()
  const navigate = useNavigate()
  const [passo, setPasso] = useState(0)
  const [spedizione, setSpedizione] = useState(spedizioni[0]!.id)
  const [pagamento, setPagamento] = useState(pagamenti[0]!.id)

  const costoSpedizione =
    subtotal >= site.freeShippingFrom
      ? 0
      : (spedizioni.find((s) => s.id === spedizione)?.prezzo ?? 0)
  const totale = subtotal + costoSpedizione
  const imponibile = Math.round(totale / (1 + IVA))
  const iva = totale - imponibile

  if (count === 0) {
    return (
      <Container className="flex flex-col items-start gap-5 py-section">
        <h1 className="text-h1">Non c’è niente da pagare.</h1>
        <p className="max-w-prose text-lead text-fg-muted">
          Il carrello è vuoto: aggiungi qualcosa e torna qui.
        </p>
        <Button to="/negozio">Vai al negozio</Button>
      </Container>
    )
  }

  return (
    <div className="min-h-svh">
      {/* Intestazione ridotta: al checkout non si esce dal percorso */}
      <header className="border-b border-line">
        <Container className="flex items-center justify-between gap-4 py-5">
          <Logo className="h-9" />
          <p className="flex items-center gap-2 label text-[0.6875rem] text-fg-muted">
            <Lock className="size-3.5 text-primary" /> Pagamento sicuro
          </p>
        </Container>
      </header>

      <Container className="grid items-start gap-10 py-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          {/* Passi */}
          <ol className="flex flex-wrap items-center gap-2">
            {passi.map((p, i) => (
              <li key={p} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => i < passo && setPasso(i)}
                  disabled={i > passo}
                  className={cn(
                    'flex items-center gap-2 rounded-button px-3 py-2 label text-[0.6875rem] transition',
                    i === passo && 'bg-primary text-primary-fg',
                    i < passo && 'text-primary hocus:bg-primary/10',
                    i > passo && 'text-fg-subtle',
                  )}
                >
                  {i < passo ? (
                    <Check className="size-3.5" />
                  ) : (
                    <span className="font-semibold">{i + 1}</span>
                  )}
                  {p}
                </button>
                {i < passi.length - 1 && (
                  <span aria-hidden="true" className="text-fg-subtle">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>

          <form
            className="mt-8 flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault()
              if (passo < 2) setPasso(passo + 1)
              else navigate('/ordine/TH-2609-4471')
            }}
          >
            {passo === 0 && (
              <>
                <fieldset className="flex flex-col gap-4">
                  <legend className="mb-2 text-h3">Contatti</legend>
                  <Campo id="email" label="Email" type="email" autoComplete="email" required />
                  <label className="flex items-start gap-3 text-sm text-fg-muted">
                    <input type="checkbox" name="news" className="mt-1 size-4 accent-primary" />
                    Tienimi aggiornato su nuovi lotti e restock. Posso disiscrivermi quando voglio.
                  </label>
                </fieldset>

                <fieldset className="flex flex-col gap-4">
                  <legend className="mb-2 text-h3">Indirizzo di spedizione</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Campo id="nome" label="Nome" autoComplete="given-name" required />
                    <Campo id="cognome" label="Cognome" autoComplete="family-name" required />
                  </div>
                  <Campo id="via" label="Indirizzo" autoComplete="street-address" required />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Campo id="cap" label="CAP" autoComplete="postal-code" required />
                    <Campo id="citta" label="Città" autoComplete="address-level2" required />
                    <div className="flex flex-col gap-2">
                      <label htmlFor="paese" className="label text-[0.625rem] text-fg-muted">
                        Paese
                      </label>
                      <select
                        id="paese"
                        name="paese"
                        className="h-12 rounded-input bg-bg-alt px-4 text-base text-fg ring-1 ring-line ring-inset focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        {paesi.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Campo
                    id="tel"
                    label="Telefono (per il corriere)"
                    type="tel"
                    autoComplete="tel"
                  />
                  <p className="text-xs text-fg-muted">
                    Spediamo solo nei Paesi elencati. Le regole cambiano da Paese a Paese: se una
                    referenza non è vendibile a destinazione te lo diciamo qui, prima di pagare.
                  </p>
                </fieldset>
              </>
            )}

            {passo === 1 && (
              <fieldset className="flex flex-col gap-4">
                <legend className="mb-2 text-h3">Come te lo mandiamo</legend>
                {spedizioni.map((s) => (
                  <label
                    key={s.id}
                    className={cn(
                      'flex cursor-pointer items-center justify-between gap-4 rounded-card p-5 ring-1 transition ring-inset',
                      spedizione === s.id
                        ? 'ring-2 ring-primary'
                        : 'ring-line hocus:ring-line-strong',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="spedizione"
                        value={s.id}
                        checked={spedizione === s.id}
                        onChange={() => setSpedizione(s.id)}
                        className="size-4 accent-primary"
                      />
                      <span>
                        <span className="block font-semibold">{s.nome}</span>
                        <span className="block text-sm text-fg-muted">{s.tempi}</span>
                      </span>
                    </span>
                    <span className="font-semibold text-primary">
                      {subtotal >= site.freeShippingFrom ? 'Gratuita' : formatPrice(s.prezzo)}
                    </span>
                  </label>
                ))}
                <p className="text-xs text-fg-muted">
                  Packaging anonimo e sigillato, senza riferimenti al contenuto all’esterno.
                </p>
              </fieldset>
            )}

            {passo === 2 && (
              <fieldset className="flex flex-col gap-4">
                <legend className="mb-2 text-h3">Come paghi</legend>
                {pagamenti.map((p) => (
                  <label
                    key={p.id}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-card p-5 ring-1 transition ring-inset',
                      pagamento === p.id
                        ? 'ring-2 ring-primary'
                        : 'ring-line hocus:ring-line-strong',
                    )}
                  >
                    <input
                      type="radio"
                      name="pagamento"
                      value={p.id}
                      checked={pagamento === p.id}
                      onChange={() => setPagamento(p.id)}
                      className="mt-1 size-4 accent-primary"
                    />
                    <span>
                      <span className="block font-semibold">{p.nome}</span>
                      <span className="block text-sm text-fg-muted">{p.nota}</span>
                    </span>
                  </label>
                ))}
                <Badge variant="muted" className="self-start">
                  Prototipo: nessun pagamento viene realmente eseguito
                </Badge>
                <label className="flex items-start gap-3 text-sm text-fg-muted">
                  <input type="checkbox" required className="mt-1 size-4 accent-primary" />
                  Ho letto e accetto termini di vendita e informativa privacy, e dichiaro di avere
                  almeno 18 anni.
                </label>
              </fieldset>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
              {passo > 0 && (
                <Button
                  variant="ghost"
                  className="ring-1 ring-line ring-inset"
                  onClick={() => setPasso(passo - 1)}
                >
                  <ArrowLeft className="size-4" /> Indietro
                </Button>
              )}
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                {passo < 2 ? 'Continua' : `Paga ${formatPrice(totale)}`}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Riepilogo */}
        <aside className="flex flex-col gap-5 rounded-card bg-surface p-6 ring-1 ring-line ring-inset lg:sticky lg:top-8">
          <p className="label text-[0.75rem]">Il tuo ordine</p>
          <ul className="flex flex-col gap-4 border-b border-line pb-5">
            {active.map((l) => (
              <li key={l.id} className="flex items-center gap-3">
                <span className="relative shrink-0">
                  <img
                    src={asset(l.image)}
                    alt=""
                    className="size-14 rounded-md object-cover"
                    loading="lazy"
                  />
                  <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-primary text-[0.625rem] font-bold text-primary-fg">
                    {l.quantity}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{l.name}</span>
                  <span className="block label text-[0.625rem] text-fg-muted">{l.formato}</span>
                </span>
                <span className="text-sm font-medium">{formatPrice(l.price * l.quantity)}</span>
              </li>
            ))}
          </ul>

          <FreeShippingBar subtotal={subtotal} />

          <dl className="flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-fg-muted">Subtotale</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-fg-muted">Spedizione</dt>
              <dd>{costoSpedizione === 0 ? 'Gratuita' : formatPrice(costoSpedizione)}</dd>
            </div>
            <div className="flex justify-between text-fg-subtle">
              <dt>di cui IVA ({Math.round(IVA * 100)} %)</dt>
              <dd>{formatPrice(iva)}</dd>
            </div>
          </dl>

          <div className="flex items-baseline justify-between border-t border-line pt-4">
            <span className="label text-[0.75rem]">Totale</span>
            <span className="text-3xl font-semibold text-primary">{formatPrice(totale)}</span>
          </div>
          <p className="text-xs text-fg-muted">
            Nessun costo nascosto: quello che vedi è quello che paghi.
          </p>
        </aside>
      </Container>
    </div>
  )
}

function Campo({
  id,
  label,
  ...rest
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-[0.625rem] text-fg-muted">
        {label}
      </label>
      <Input id={id} name={id} {...rest} />
    </div>
  )
}
