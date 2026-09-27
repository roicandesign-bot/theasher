// Analisi di laboratorio: intro → ricerca per lotto → tabella certificati → come si legge
import { Download, FlaskConical, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Section } from '@/components/ui/Section'
import { labTests } from '@/data/contenuti'

export default function LabTests() {
  const [q, setQ] = useState('')
  const filtrati = labTests.lotti.filter((l) =>
    `${l.lotto} ${l.prodotto} ${l.tipo}`.toLowerCase().includes(q.trim().toLowerCase()),
  )

  return (
    <>
      <Section className="pb-8">
        <Container>
          <Eyebrow>{labTests.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-h1">{labTests.titolo}</h1>
          <p className="mt-5 max-w-prose text-lead text-fg-muted">{labTests.lead}</p>
          <Badge variant="muted" className="mt-5">
            {labTests.nota}
          </Badge>
        </Container>
      </Section>

      <Container className="pb-section">
        <div className="flex max-w-md items-center gap-2">
          <label htmlFor="cerca-lotto" className="sr-only">
            Cerca per lotto o prodotto
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-fg-muted"
            />
            <Input
              id="cerca-lotto"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cerca lotto o prodotto"
              className="pl-11"
            />
          </div>
        </div>

        <p aria-live="polite" className="mt-5 label text-[0.75rem] text-fg-muted">
          {filtrati.length} {filtrati.length === 1 ? 'certificato' : 'certificati'}
        </p>

        {filtrati.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  {['Lotto', 'Prodotto', 'CBD', 'THC', 'Data', 'Laboratorio', ''].map((h) => (
                    <th key={h} className="py-3 pr-4 label text-[0.625rem] text-fg-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrati.map((l) => (
                  <tr key={l.lotto} className="border-b border-line">
                    <td className="py-4 pr-4 font-semibold">{l.lotto}</td>
                    <td className="py-4 pr-4">
                      <span className="block">{l.prodotto}</span>
                      <span className="label text-[0.625rem] text-fg-muted">{l.tipo}</span>
                    </td>
                    <td className="py-4 pr-4 font-semibold text-primary">{l.cbd}</td>
                    <td className="py-4 pr-4 text-sm text-fg-muted">{l.thc}</td>
                    <td className="py-4 pr-4 text-sm">{l.data}</td>
                    <td className="py-4 pr-4 text-sm text-fg-muted">{l.laboratorio}</td>
                    <td className="py-4">
                      <Button variant="outline" size="sm">
                        <Download className="size-4" /> PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-start gap-3 rounded-card bg-surface p-8 ring-1 ring-line ring-inset">
            <FlaskConical className="size-8 text-fg-subtle" strokeWidth={1.25} />
            <p className="text-h3">Nessun lotto con questo nome.</p>
            <p className="max-w-prose text-fg-muted">
              Controlla il numero stampato sulla confezione. Se non lo trovi, scrivici: lo cerchiamo
              noi.
            </p>
            <Button to="/contatti" variant="outline">
              Scrivici
            </Button>
          </div>
        )}

        <div className="mt-12 grid gap-5 rounded-card bg-surface p-6 ring-1 ring-line ring-inset md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-h3">Non sai cosa guardare?</p>
            <p className="mt-2 max-w-prose text-fg-muted">
              Abbiamo scritto una guida che spiega cosa dice davvero un certificato e cosa invece
              non dice.
            </p>
          </div>
          <Link
            to="/journal/come-si-legge-un-certificato"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-button bg-primary px-6 label text-primary-fg transition hocus:bg-primary-hover"
          >
            Leggi la guida →
          </Link>
        </div>
      </Container>
    </>
  )
}
