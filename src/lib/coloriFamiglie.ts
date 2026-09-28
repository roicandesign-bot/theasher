/**
 * PROVA: un colore per famiglia. Si attiva con ?colori=si nell'indirizzo e resta attiva
 * per la visita (sessione); ?colori=no la spegne. Finché Lorenzo non decide, il sito resta giallo.
 */
import type { CSSProperties } from 'react'
import { categorie, type Categoria } from '@/data/products'

export const nomiColori: Record<Categoria, string> = {
  fiori: 'Verde',
  hash: 'Caramello',
  estratti: 'Ambra',
  preroll: 'Rosso',
  cannagar: 'Viola',
  vape: 'Azzurro',
  oli: 'Oro chiaro',
  edibles: 'Rosa',
  semi: 'Avorio',
  cloni: 'Turchese',
}

export function coloriAttivi() {
  if (typeof window === 'undefined') return false
  try {
    const q = new URLSearchParams(window.location.search).get('colori')
    if (q === 'si') sessionStorage.setItem('hasher_colori', 'si')
    if (q === 'no') sessionStorage.removeItem('hasher_colori')
    return sessionStorage.getItem('hasher_colori') === 'si'
  } catch {
    return false
  }
}

/** Variabile CSS --fam col colore della famiglia: le classi usano bg-(--fam), text-(--fam)… */
export function stileFamiglia(c: string | null | undefined): CSSProperties | undefined {
  if (!c || !(c in categorie)) return undefined
  return { '--fam': `var(--color-fam-${c})` } as CSSProperties
}
