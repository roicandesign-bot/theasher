// The Hasher Club: la pagina pubblica del programma per i clienti.
// Promessa con le tessere → numeri → come si entra → i quattro livelli → lotti Reserve (bloccati)
// → la tessera → inviti con codice → regole chiare → FAQ → banda gialla finale.
import { ArrowRight, Check, KeyRound, Lock } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TesseraClub } from '@/components/club/TesseraClub'
import { FaqLista } from '@/components/sections/FaqLista'
import { Passi } from '@/components/sections/Passi'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Diamond } from '@/components/ui/Diamond'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Reveal } from '@/components/ui/Reveal'
import { Section, SectionHeader } from '@/components/ui/Section'
import { StrokePattern } from '@/components/ui/StrokePattern'
import { TestoRivelato } from '@/components/ui/TestoRivelato'
import { dropReserve, faqClub, livelli, numeriClub, passiClub, regoleClub } from '@/data/club'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

export default function Club() {
  return (
    <>
      {/* ---------- Promessa ---------- */}
      <Section className="overflow-hidden py-14 md:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Eyebrow>The Hasher Club</Eyebrow>
            <h1 className="mt-4 text-display leading-[0.9]">
              <TestoRivelato text="Prima degli altri." />
            </h1>
            <p className="mt-5 max-w-prose text-lead text-fg-muted">
              Il club dei clienti The Hasher. Drop che si aprono prima, lotti Reserve che non vanno
              mai in vendita al pubblico, spedizione gratuita. Si entra con un account; i livelli
              più alti solo su invito.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/registrati" size="lg">
                Entra nel Club <ArrowRight className="size-4" />
              </Button>
              <Button href="#invito" variant="outline" size="lg">
                <KeyRound className="size-4" /> Ho un invito
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {numeriClub.map((n) => (
                <div key={n.etichetta}>
                  <dt className="sr-only">{n.etichetta}</dt>
                  <dd className="font-display text-[clamp(1.35rem,0.9rem+2vw,2.5rem)] leading-none text-primary uppercase">
                    {n.valore}
                  </dd>
                  <dd className="mt-2 text-xs text-fg-muted">{n.etichetta}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Le tessere, una sopra l'altra */}
          <div aria-hidden="true" className="relative mx-auto w-full max-w-md py-6 lg:max-w-none">
            <div className="relative aspect-[1.25] w-full">
              <TesseraClub
                livello="member"
                numero="TH 0417 2280"
                className="absolute top-[4%] left-0 w-[78%] -rotate-[9deg] opacity-70"
              />
              <TesseraClub
                livello="black"
                numero="TH 0192 0007"
                className="absolute top-[22%] left-[11%] w-[78%] -rotate-[3deg]"
              />
              <TesseraClub
                livello="elite"
                numero="IT · 042 / 100"
                className="absolute top-[40%] left-[22%] w-[78%] rotate-[4deg]"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- Come si entra ---------- */}
      <Passi
        eyebrow="Come si entra"
        titolo="Quattro gradini. Gli ultimi due si guadagnano."
        passi={passiClub}
        tone="alt"
      />

      {/* ---------- Livelli ---------- */}
      <Section id="livelli" className="scroll-mt-24">
        <Container>
          <SectionHeader
            eyebrow="I livelli"
            title="Più sali, meno aspetti."
            subtitle="Il livello si calcola sugli ordini consegnati negli ultimi 12 mesi, online e nei negozi."
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {livelli.map((l, i) => (
              <li key={l.id}>
                <Reveal delay={i * 80} className="h-full">
                  <div
                    className={cn(
                      'flex h-full flex-col rounded-card p-6 ring-inset',
                      l.id === 'elite'
                        ? 'bg-primary text-primary-fg'
                        : l.id === 'black'
                          ? 'bg-surface ring-2 ring-primary'
                          : 'bg-surface ring-1 ring-line',
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className={cn(
                          'label text-[0.6875rem]',
                          l.id === 'elite' ? 'text-primary-fg/70' : 'text-fg-muted',
                        )}
                      >
                        Livello {i + 1}
                      </p>
                      {l.soloInvito && <Badge variant="muted">Solo su invito</Badge>}
                      {l.id === 'black' && <Badge>Linea Reserve</Badge>}
                    </div>
                    <h3 className="mt-3 text-h2">{l.nome}</h3>
                    <p
                      className={cn(
                        'mt-1 text-sm font-semibold',
                        l.id === 'elite' ? 'text-primary-fg' : 'text-primary',
                      )}
                    >
                      {l.motto}
                    </p>
                    <p
                      className={cn(
                        'mt-4 border-y py-3 text-sm',
                        l.id === 'elite'
                          ? 'border-primary-fg/20 text-primary-fg/80'
                          : 'border-line text-fg-muted',
                      )}
                    >
                      {l.requisito}
                    </p>
                    <ul className="mt-4 flex flex-col gap-3">
                      {l.vantaggi.map((v) => (
                        <li key={v} className="flex items-start gap-2.5 text-sm">
                          <Check
                            className={cn(
                              'mt-0.5 size-4 shrink-0',
                              l.id === 'elite' ? 'text-primary-fg' : 'text-primary',
                            )}
                            strokeWidth={2.5}
                          />
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-fg-muted">
            Sconti di livello sul prezzo di listino, non cumulabili con altri codici: si applica
            sempre il più conveniente. Dettagli nel{' '}
            <Link to="/regolamento-club" className="text-primary underline">
              regolamento del Club
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* ---------- Lotti Reserve ---------- */}
      <Section tone="alt" className="overflow-hidden">
        <Container>
          <SectionHeader
            eyebrow="Linea Reserve"
            title="I lotti che non vedi in negozio."
            subtitle="Piccoli, numerati, lavorati a parte. Si aprono prima per Elite, il giorno dopo per Black. Al pubblico, mai."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {dropReserve.map((d, i) => (
              <li key={d.numero}>
                <Reveal delay={i * 80} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface ring-1 ring-line ring-inset">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={asset(d.img)}
                        alt=""
                        loading="lazy"
                        className="group-hover:blur-0 size-full scale-105 object-cover blur-[2px] brightness-[0.55] transition duration-500 ease-out-soft group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="grid size-14 place-items-center rounded-full bg-bg/70 text-primary ring-1 ring-primary backdrop-blur">
                          <Lock className="size-6" strokeWidth={1.75} />
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 rounded-badge bg-primary px-2 py-1 label text-[0.625rem] text-primary-fg">
                        Reserve {d.numero}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="label text-[0.625rem] text-fg-muted">{d.famiglia}</p>
                      <h3 className="mt-1 text-h3">{d.nome}</h3>
                      <p className="mt-1 text-attivo text-primary">{d.attivo}</p>
                      <p className="mt-4 text-sm text-fg-muted">
                        {d.pezzi} pezzi numerati · Apre: {d.apre}
                      </p>
                      <p className="mt-auto flex items-center gap-2 pt-5 label text-[0.6875rem] text-primary">
                        <Lock className="size-3.5" /> Riservato a Black ed Elite
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-fg-subtle">Nomi, valori e date di esempio.</p>
        </Container>
      </Section>

      {/* ---------- La tessera ---------- */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
            <TesseraClub livello="member" numero="TH 0417 2280" nome="Marco R." />
            <TesseraClub livello="black" numero="TH 0192 0007" nome="Luca T." />
            <div className="sm:col-span-2 sm:mx-auto sm:w-1/2">
              <TesseraClub livello="elite" numero="IT · 042 / 100" nome="Giulia F." />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>La tessera</Eyebrow>
            <h2 className="mt-3 text-h2">Una sola, online e in negozio.</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {[
                'Member: tessera digitale nel portafoglio del telefono, con il codice da mostrare in cassa.',
                'Black: arriva a casa la tessera fisica, nera, insieme all’ordine che ti fa salire.',
                'Elite: tessera in metallo con il numero del tuo posto, su cento, nel tuo Paese.',
                'Gli acquisti nei negozi The Hasher contano per il livello come quelli online.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-fg-muted">
                  <Diamond className="mt-2 size-2.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ---------- Invito ---------- */}
      <Invito />

      {/* ---------- Regole chiare ---------- */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Regole chiare</Eyebrow>
            <h2 className="mt-3 text-h2">Esclusivo, non complicato.</h2>
            <p className="mt-4 max-w-prose text-fg-muted">
              Le regole stanno in una pagina, non in un asterisco.
            </p>
            <Button to="/regolamento-club" variant="outline" className="mt-6">
              Leggi il regolamento <ArrowRight className="size-4" />
            </Button>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {regoleClub.map((r) => (
              <li
                key={r}
                className="flex items-start gap-3 rounded-card bg-surface p-5 ring-1 ring-line ring-inset"
              >
                <Check className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={2} />
                <span className="text-sm">{r}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FaqLista nome="faq-club" faq={faqClub} />

      {/* ---------- Banda finale ---------- */}
      <Section tone="yellow" className="relative overflow-hidden">
        <StrokePattern
          tone="dark"
          className="left-[80%] hidden md:block"
          position="99% 72%"
          scale="600%"
        />
        <Container className="relative max-w-3xl">
          <Eyebrow tone="dark">Il prossimo drop</Eyebrow>
          <h2 className="mt-3 text-h2">Apre prima per chi è dentro.</h2>
          <p className="mt-4 max-w-prose text-lead text-primary-fg/80">
            Crei l’account in un minuto, sei Starter subito. Il resto lo fa il primo ordine.
          </p>
          <Button to="/registrati" variant="dark" size="lg" className="mt-8">
            Entra nel Club <ArrowRight className="size-4" />
          </Button>
          <p className="mt-6 text-xs text-primary-fg/70">
            Club riservato ai maggiori di 18 anni. Gratuito, esci quando vuoi.
          </p>
        </Container>
      </Section>
    </>
  )
}

/** Codice invito: solo interfaccia. Il formato mostra come sarà (TH- + 8 caratteri). */
function Invito() {
  const [codice, setCodice] = useState('')
  const [inviato, setInviato] = useState(false)
  const valido = /^TH-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(codice.trim().toUpperCase())

  return (
    <Section id="invito" tone="alt" className="scroll-mt-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>Inviti</Eyebrow>
          <h2 className="mt-3 text-h2">Il Club cresce per invito.</h2>
          <p className="mt-4 max-w-prose text-fg-muted">
            Ogni membro Black ha due inviti a trimestre. Chi entra con un invito è Black per 90
            giorni, lotti Reserve compresi; poi resta se raggiunge la soglia. Gli inviti sono
            personali: chi li vende perde i propri.
          </p>
        </div>
        <form
          className="flex flex-col gap-3 rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:p-8"
          onSubmit={(e) => {
            e.preventDefault()
            setInviato(true)
          }}
        >
          <label htmlFor="codice-invito" className="label text-[0.6875rem] text-fg-muted">
            Codice invito
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="codice-invito"
              value={codice}
              onChange={(e) => {
                setCodice(e.target.value)
                setInviato(false)
              }}
              placeholder="TH-XXXX-XXXX"
              autoComplete="off"
              className="font-mono tracking-[0.12em] uppercase"
            />
            <Button type="submit" className="shrink-0">
              Usa l’invito
            </Button>
          </div>
          <p
            role="status"
            className={cn('min-h-5 text-sm', inviato && valido ? 'text-success' : 'text-fg-muted')}
          >
            {inviato
              ? valido
                ? 'Invito valido. Crea l’account: sei Black per 90 giorni.'
                : 'Il codice ha questo formato: TH-XXXX-XXXX. Controlla e riprova.'
              : 'Lo trovi nel messaggio di chi ti ha invitato.'}
          </p>
        </form>
      </Container>
    </Section>
  )
}
