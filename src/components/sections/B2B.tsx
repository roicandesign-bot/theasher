import { Check } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Eyebrow'

/** I tre numeri sotto la promessa, grandi, su fondo giallo. */
export function Numeri({ numeri }: { numeri: { valore: string; etichetta: string }[] }) {
  return (
    <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-primary-fg/20 pt-6">
      {numeri.map((n) => (
        <div key={n.etichetta}>
          <dt className="sr-only">{n.etichetta}</dt>
          <dd className="font-display text-[clamp(1.35rem,0.9rem+2vw,2.5rem)] leading-none uppercase">
            {n.valore}
          </dd>
          <dd className="mt-2 text-xs text-primary-fg/70">{n.etichetta}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Elenco «Chi cerchiamo» accanto ai moduli di candidatura. */
export function Requisiti({ voci }: { voci: string[] }) {
  return (
    <div>
      <Eyebrow>Requisiti</Eyebrow>
      <h2 className="mt-3 text-h2">Chi cerchiamo.</h2>
      <ul className="mt-6 flex flex-col gap-4">
        {voci.map((r) => (
          <li key={r} className="flex items-start gap-3">
            <Check className="mt-0.5 size-5 shrink-0 text-primary" />
            <span className="text-fg-muted">{r}</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-fg-muted">
        Le regole di vendita cambiano da Paese a Paese: prima di aprire un nuovo mercato
        verifichiamo insieme cosa è ammesso dove operi.
      </p>
    </div>
  )
}

/** Spunta obbligatoria di conformità e privacy dei moduli B2B. */
export function Consenso() {
  return (
    <label className="flex items-start gap-3 text-sm text-fg-muted">
      <input type="checkbox" required className="mt-1 size-4 accent-primary" />
      Dichiaro di operare nel rispetto delle norme del mio Paese e accetto l’informativa privacy.
    </label>
  )
}
