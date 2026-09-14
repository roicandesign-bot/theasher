import { site } from '@/data/site'

/** Barra informativa superiore gialla: età, tre rassicurazioni, claim. Configurabile (dati in site.ts). */
export function InfoBar() {
  return (
    <div className="bg-primary text-primary-fg">
      <div className="container-content flex h-9 items-center justify-between gap-4">
        <p className="flex min-w-0 items-center gap-3 label text-[0.6875rem]">
          <span className="inline-grid size-6 shrink-0 place-items-center rounded-full bg-bg text-[0.625rem] font-bold text-primary">
            {site.infoBar.age}
          </span>
          {site.infoBar.items.map((item, i) => (
            <span
              key={item}
              className={
                i === 0 ? 'truncate' : i === 1 ? 'hidden truncate sm:inline' : 'hidden lg:inline'
              }
            >
              {i > 0 && (
                <span aria-hidden="true" className="mr-3 opacity-40">
                  |
                </span>
              )}
              {item}
            </span>
          ))}
        </p>
        <p className="hidden shrink-0 label text-[0.6875rem] md:block">{site.claim}</p>
      </div>
    </div>
  )
}
