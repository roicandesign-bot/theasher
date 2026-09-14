const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' })

/** Formatta centesimi in euro (it-IT): 2490 → "24,90 €" */
export function formatPrice(cents: number) {
  return eur.format(cents / 100)
}
