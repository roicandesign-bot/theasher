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
    { label: 'Hash', to: '/#hash' },
    { label: 'CBD Flower', to: '/#cbd-flower' },
    { label: 'New Drops', to: '/#new-drop' },
    { label: 'About', to: '/#story' },
  ],
  infoBar: {
    age: '18+',
    items: ['Prodotti CBD legali', 'Spedizione in tutta la UE', 'Packaging discreto'],
  },
  /** Numero demo per mostrare il contatore del carrello */
  cartCount: 2,
  footer: {
    shop: [
      { label: 'Hash', to: '/#hash' },
      { label: 'CBD Flower', to: '/#cbd-flower' },
      { label: 'New Drops', to: '/#new-drop' },
      { label: 'Best seller', to: '/#best-seller' },
    ],
    info: [
      { label: 'La nostra storia', to: '/#story' },
      { label: 'Analisi di laboratorio', to: '/#lab' },
      { label: 'Spedizioni e resi', to: '/#faq' },
      { label: 'Domande frequenti', to: '/#faq' },
    ],
    legal: [
      { label: 'Privacy', to: '/#faq' },
      { label: 'Cookie', to: '/#faq' },
      { label: 'Termini e condizioni', to: '/#faq' },
      { label: 'Informazioni legali', to: '/#faq' },
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
