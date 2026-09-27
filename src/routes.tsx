import type { ComponentType } from 'react'
import Home from './pages/Home'
import { AccountAddresses, AccountHome, AccountOrderDetail, AccountOrders } from './pages/Account'
import About from './pages/About'
import Auth from './pages/Auth'
import Contact from './pages/Contact'
import Distributor from './pages/Distributor'
import Faq from './pages/Faq'
import Franchising from './pages/Franchising'
import { BlogArticle, BlogList } from './pages/Blog'
import LabTests from './pages/LabTests'
import Search from './pages/Search'
import TextPage from './pages/TextPage'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmed from './pages/OrderConfirmed'
import Prezzi from './pages/Prezzi'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Sitemap from './pages/Sitemap'
import Stato from './pages/Stato'
import Styleguide from './pages/Styleguide'

/**
 * ELENCO PAGINE DEL SITO.
 * Aggiungi qui ogni nuova pagina (step /pagina): serve al router,
 * al menu di navigazione e allo script degli screenshot.
 * `inNav: false` nasconde la voce dal menu (es. /styleguide).
 * `screenshotPath`: indirizzo di esempio da usare per lo screenshot
 * quando il percorso ha un parametro (es. /prodotto/:slug).
 */
export type AppRoute = {
  path: string
  label: string
  component: ComponentType
  inNav?: boolean
  screenshotPath?: string
  /** Pagina isolata: niente barra 18+, header e footer del sito (es. checkout) */
  bare?: boolean
}

export const routes: AppRoute[] = [
  { path: '/', label: 'Home', component: Home },
  { path: '/negozio', label: 'Negozio', component: Shop, inNav: false },
  { path: '/carrello', label: 'Carrello', component: Cart, inNav: false },
  { path: '/checkout', label: 'Checkout', component: Checkout, inNav: false, bare: true },
  {
    path: '/ordine/:numero',
    label: 'Ordine confermato',
    component: OrderConfirmed,
    inNav: false,
    screenshotPath: '/ordine/TH-2609-4471',
  },
  {
    path: '/prodotto/:slug',
    label: 'Prodotto',
    component: Product,
    inNav: false,
    screenshotPath: '/prodotto/lemon-haze',
  },
  { path: '/stato', label: 'Resoconto', component: Stato, inNav: false },
  { path: '/prezzi', label: 'Analisi prezzi', component: Prezzi, inNav: false },
  { path: '/azienda', label: 'L’azienda', component: About, inNav: false },
  { path: '/blog', label: 'Blog', component: BlogList, inNav: false },
  {
    path: '/blog/:slug',
    label: 'Articolo',
    component: BlogArticle,
    inNav: false,
    screenshotPath: '/blog/indoor-glasshouse-outdoor',
  },
  { path: '/contatti', label: 'Contatti', component: Contact, inNav: false },
  { path: '/franchising', label: 'Franchising', component: Franchising, inNav: false },
  {
    path: '/diventa-distributore',
    label: 'Diventa distributore',
    component: Distributor,
    inNav: false,
  },
  { path: '/analisi', label: 'Analisi di laboratorio', component: LabTests, inNav: false },
  { path: '/faq', label: 'Domande frequenti', component: Faq, inNav: false },
  { path: '/cerca', label: 'Ricerca', component: Search, inNav: false },
  { path: '/preferiti', label: 'Preferiti', component: Wishlist, inNav: false },
  { path: '/spedizioni', label: 'Spedizioni', component: TextPage, inNav: false },
  { path: '/resi', label: 'Resi e rimborsi', component: TextPage, inNav: false },
  { path: '/pagamenti', label: 'Pagamenti', component: TextPage, inNav: false },
  { path: '/privacy', label: 'Privacy', component: TextPage, inNav: false },
  { path: '/cookie', label: 'Cookie', component: TextPage, inNav: false },
  { path: '/termini', label: 'Termini e condizioni', component: TextPage, inNav: false },
  { path: '/legale', label: 'Informazioni legali', component: TextPage, inNav: false },
  { path: '/accedi', label: 'Accedi', component: Auth, inNav: false },
  { path: '/registrati', label: 'Registrati', component: Auth, inNav: false },
  { path: '/password-dimenticata', label: 'Password dimenticata', component: Auth, inNav: false },
  { path: '/account', label: 'Account', component: AccountHome, inNav: false },
  { path: '/account/ordini', label: 'I miei ordini', component: AccountOrders, inNav: false },
  {
    path: '/account/ordini/:numero',
    label: 'Dettaglio ordine',
    component: AccountOrderDetail,
    inNav: false,
    screenshotPath: '/account/ordini/TH-2609-4471',
  },
  { path: '/account/indirizzi', label: 'Indirizzi', component: AccountAddresses, inNav: false },
  { path: '/mappa', label: 'Mappa del sito', component: Sitemap, inNav: false },
  { path: '/styleguide', label: 'Styleguide', component: Styleguide, inNav: false },
]
