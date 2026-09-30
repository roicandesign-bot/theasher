/**
 * Quale apertura mostra la home. PROVA: finché Lorenzo non sceglie, si cambia dall'indirizzo
 * (?intro=caveau · ?intro=resina · ?intro=video) e la scelta resta per la visita.
 */
export type Intro = 'caveau' | 'resina' | 'video'

const CHIAVE = 'hasher_intro'
/** Il caveau si apre una volta per visita: poi la home parte normale. */
export const CHIAVE_CAVEAU = 'hasher_caveau'
const PREDEFINITA: Intro = 'caveau'

export function introScelta(): Intro {
  if (typeof window === 'undefined') return PREDEFINITA
  try {
    const q = new URLSearchParams(window.location.search).get('intro')
    if (q === 'caveau' || q === 'resina' || q === 'video') {
      sessionStorage.setItem(CHIAVE, q)
      // chi chiede esplicitamente il caveau lo rivede anche se l'ha già aperto
      if (q === 'caveau') sessionStorage.removeItem(CHIAVE_CAVEAU)
      return q
    }
    const salvata = sessionStorage.getItem(CHIAVE)
    return salvata === 'caveau' || salvata === 'resina' || salvata === 'video'
      ? salvata
      : PREDEFINITA
  } catch {
    return PREDEFINITA
  }
}

/** true se sulla home sta per aprirsi il caveau: fa lui la verifica dell'età. */
export function caveauInArrivo(pathname: string) {
  if (pathname !== '/' || introScelta() !== 'caveau') return false
  try {
    return sessionStorage.getItem(CHIAVE_CAVEAU) !== 'si'
  } catch {
    return true
  }
}
