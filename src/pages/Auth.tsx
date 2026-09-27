// Accedi, registrati, password dimenticata: tre schermate dallo stesso impianto.
// Solo UI: i moduli non inviano nulla.
import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Section } from '@/components/ui/Section'

type Modo = 'accedi' | 'registrati' | 'password'

const testi: Record<Modo, { eyebrow: string; titolo: string; lead: string; cta: string }> = {
  accedi: {
    eyebrow: 'Area cliente',
    titolo: 'Bentornato.',
    lead: 'Entra per vedere i tuoi ordini, seguire il pacco e riordinare in un click.',
    cta: 'Accedi',
  },
  registrati: {
    eyebrow: 'Nuovo account',
    titolo: 'Creiamo l’account.',
    lead: 'Serve solo un’email. Gli ordini restano tracciati e il riordino diventa immediato.',
    cta: 'Crea account',
  },
  password: {
    eyebrow: 'Password dimenticata',
    titolo: 'Capita.',
    lead: 'Scrivi l’email dell’account: ti mandiamo un link per scegliere una nuova password.',
    cta: 'Mandami il link',
  },
}

const vantaggi = [
  'Storico degli ordini e stato della spedizione',
  'Riordino in un click dei prodotti già presi',
  'Indirizzi salvati: il checkout diventa questione di secondi',
]

export default function Auth() {
  const { pathname } = useLocation()
  const modo: Modo = pathname.includes('registrati')
    ? 'registrati'
    : pathname.includes('password')
      ? 'password'
      : 'accedi'
  const t = testi[modo]

  return (
    <Section>
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-h1">{t.titolo}</h1>
          <p className="mt-5 max-w-prose text-lead text-fg-muted">{t.lead}</p>

          <form className="mt-8 flex max-w-md flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {modo === 'registrati' && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Campo id="nome" label="Nome" autoComplete="given-name" />
                <Campo id="cognome" label="Cognome" autoComplete="family-name" />
              </div>
            )}
            <Campo id="email" label="Email" type="email" autoComplete="email" required />
            {modo !== 'password' && (
              <Campo
                id="password"
                label="Password"
                type="password"
                autoComplete={modo === 'registrati' ? 'new-password' : 'current-password'}
                required
              />
            )}
            {modo === 'registrati' && (
              <label className="flex items-start gap-3 text-sm text-fg-muted">
                <input type="checkbox" required className="mt-1 size-4 accent-primary" />
                Dichiaro di avere almeno 18 anni e accetto termini e informativa privacy.
              </label>
            )}

            <Button type="submit" size="lg" className="mt-2 self-start">
              {t.cta} <ArrowRight className="size-4" />
            </Button>
          </form>

          <div className="mt-8 flex flex-col gap-2 text-sm text-fg-muted">
            {modo === 'accedi' && (
              <>
                <Link
                  to="/password-dimenticata"
                  className="underline transition hocus:text-primary"
                >
                  Ho dimenticato la password
                </Link>
                <p>
                  Non hai un account?{' '}
                  <Link to="/registrati" className="text-primary underline">
                    Creane uno
                  </Link>
                </p>
              </>
            )}
            {modo === 'registrati' && (
              <p>
                Hai già un account?{' '}
                <Link to="/accedi" className="text-primary underline">
                  Accedi
                </Link>
              </p>
            )}
            {modo === 'password' && (
              <p>
                Ti è tornata in mente?{' '}
                <Link to="/accedi" className="text-primary underline">
                  Torna all’accesso
                </Link>
              </p>
            )}
          </div>
        </div>

        <aside className="rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8">
          <p className="label text-[0.75rem] text-primary">Perché conviene</p>
          <ul className="mt-5 flex flex-col gap-4">
            {vantaggi.map((v) => (
              <li key={v} className="flex items-start gap-3">
                <Diamond className="mt-1.5 size-3 shrink-0" />
                <span className="text-fg-muted">{v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-sm text-fg-muted">
            Puoi comprare anche senza account: il checkout ospite è sempre disponibile e l’account
            si crea con un click dopo l’acquisto.
          </p>
        </aside>
      </Container>
    </Section>
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
