import { site } from '@/data/site'

/**
 * Barra informativa superiore gialla: scorre in continuo, senza fermarsi.
 * Due tracce identiche affiancate: quando la prima esce, la seconda è già al suo posto.
 * Con «riduci animazioni» attivo resta ferma.
 */
export function InfoBar() {
  return (
    <div className="overflow-hidden bg-primary text-primary-fg">
      <div className="flex h-9 items-center">
        <Traccia />
        <Traccia aria-hidden="true" />
      </div>
    </div>
  )
}

function Traccia(props: { 'aria-hidden'?: 'true' }) {
  const voci = [...site.infoBar.items, site.claim]
  return (
    <div
      {...props}
      className="flex shrink-0 animate-marquee items-center gap-8 pr-8 label text-[0.6875rem] motion-reduce:animate-none"
    >
      <span className="inline-grid size-6 shrink-0 place-items-center rounded-full bg-bg text-[0.625rem] font-bold text-primary">
        {site.infoBar.age}
      </span>
      {voci.map((voce) => (
        <span key={voce} className="flex shrink-0 items-center gap-8 whitespace-nowrap">
          {voce}
          <span aria-hidden="true" className="opacity-40">
            /
          </span>
        </span>
      ))}
    </div>
  )
}
