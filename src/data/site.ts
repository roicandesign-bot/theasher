/**
 * Dati statici del sito: nome, claim, menu, info bar, footer.
 * Solo contenuti. In fase di sviluppo arriveranno dal pannello admin.
 */
import { categorie, fotoFamiglia, type Categoria } from './products'

/** Nome del reparto accessori e merch nel menu e nella sua pagina (alternative in design/MERCH.md). */
export const nomeReparto = 'Merch'

export const site = {
  name: 'The Hasher',
  claim: 'Good plants. Brighter days.',
  tagline: 'Premium CBD hash & CBD flower',
  /** Menu principale. `sotto` apre un sottomenu (tendina su desktop, elenco nel menu mobile). */
  nav: [
    { label: 'Home', to: '/' },
    {
      label: 'Shop',
      to: '/negozio',
      sotto: [
        { label: 'Tutti i prodotti', to: '/negozio', img: fotoFamiglia.tutto },
        ...(Object.keys(categorie) as Categoria[]).map((c) => ({
          label: categorie[c],
          to: `/negozio?categoria=${c}`,
          img: fotoFamiglia[c],
        })),
      ],
    },
    {
      label: nomeReparto,
      to: '/merch',
      sotto: [
        { label: 'Vedi tutto', to: '/merch', img: 'images/merch/roll-kit.jpg' },
        { label: 'Per fumare', to: '/merch?categoria=fumo', img: 'images/merch/grinder.jpg' },
        {
          label: 'Abbigliamento',
          to: '/merch?categoria=abbigliamento',
          img: 'images/merch/t-shirt.jpg',
        },
        { label: 'Skate e sticker', to: '/merch?categoria=skate', img: 'images/merch/skate.jpg' },
      ],
    },
    { label: 'Diventa rivenditore', to: '/diventa-distributore' },
    { label: 'Franchising', to: '/franchising' },
    { label: 'Blog', to: '/blog' },
    { label: 'Azienda', to: '/azienda' },
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
      { label: 'Fiori', to: '/negozio?categoria=fiori' },
      { label: 'Hash', to: '/negozio?categoria=hash' },
      { label: 'Estratti', to: '/negozio?categoria=estratti' },
      { label: 'Preroll', to: '/negozio?categoria=preroll' },
      { label: 'Merch e accessori', to: '/merch' },
      { label: 'Linea THC-X', to: '/negozio?linea=THC-X' },
      { label: 'New Drops', to: '/#new-drop' },
      { label: 'Best seller', to: '/#best-seller' },
    ],
    info: [
      { label: 'L’azienda', to: '/azienda' },
      { label: 'Blog', to: '/blog' },
      { label: 'Analisi di laboratorio', to: '/analisi' },
      { label: 'Domande frequenti', to: '/faq' },
      { label: 'Contatti', to: '/contatti' },
      { label: 'Franchising', to: '/franchising' },
      { label: 'Diventa rivenditore', to: '/diventa-distributore' },
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
      { label: 'Instagram', href: 'https://instagram.com/thehasher' },
      { label: 'TikTok', href: 'https://tiktok.com' },
      { label: 'YouTube', href: 'https://youtube.com' },
    ],
    /** Dati del venditore: placeholder da verificare */
    seller: 'THE HASHER · Dati societari da verificare · thehasher.com',
    note: 'Vendita riservata ai maggiori di 18 anni. Le informazioni sui prodotti non costituiscono indicazioni mediche.',
  },
}
