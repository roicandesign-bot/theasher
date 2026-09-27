/**
 * Dati statici del sito: nome, claim, menu, info bar, footer.
 * Solo contenuti. In fase di sviluppo arriveranno dal pannello admin.
 */
export const site = {
  name: 'The Hasher',
  claim: 'Good plants. Brighter days.',
  tagline: 'Premium CBD hash & CBD flower',
  /** Le voci del menu puntano alle sezioni della home finché le pagine non esistono. */
  nav: [
    { label: 'Hash', to: '/negozio?categoria=hash' },
    { label: 'CBD Flower', to: '/negozio?categoria=flower' },
    { label: 'New Drops', to: '/negozio?badge=New' },
    { label: 'Azienda', to: '/azienda' },
    { label: 'Journal', to: '/journal' },
  ],
  infoBar: {
    age: '18+',
    items: ['Prodotti CBD legali', 'Spedizione in tutta la UE', 'Packaging discreto'],
  },
  /** Numero demo per mostrare il contatore del carrello */
  cartCount: 2,
  /** Soglia spedizione gratuita, in centesimi */
  freeShippingFrom: 4900,
  /** Metodi di pagamento mostrati in pagina prodotto e al checkout */
  payments: ['Carta', 'Bonifico', 'Apple Pay', 'Google Pay'],
  footer: {
    shop: [
      { label: 'Hash', to: '/negozio?categoria=hash' },
      { label: 'CBD Flower', to: '/negozio?categoria=flower' },
      { label: 'New Drops', to: '/#new-drop' },
      { label: 'Best seller', to: '/#best-seller' },
    ],
    info: [
      { label: 'L’azienda', to: '/azienda' },
      { label: 'Journal', to: '/journal' },
      { label: 'Analisi di laboratorio', to: '/analisi' },
      { label: 'Domande frequenti', to: '/faq' },
      { label: 'Contatti', to: '/contatti' },
      { label: 'Diventa distributore', to: '/diventa-distributore' },
    ],
    legal: [
      { label: 'Spedizioni', to: '/spedizioni' },
      { label: 'Resi e rimborsi', to: '/resi' },
      { label: 'Pagamenti', to: '/pagamenti' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Cookie', to: '/cookie' },
      { label: 'Termini e condizioni', to: '/termini' },
      { label: 'Informazioni legali', to: '/legale' },
    ],
    socials: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'TikTok', href: 'https://tiktok.com' },
      { label: 'YouTube', href: 'https://youtube.com' },
    ],
    /** Dati del venditore: placeholder da verificare */
    seller: 'THE HASHER · Dati societari da verificare · thehasher.com',
    note: 'Vendita riservata ai maggiori di 18 anni. Le informazioni sui prodotti non costituiscono indicazioni mediche.',
  },
}
