import type { ComponentType } from 'react'
import Home from './pages/Home'
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
  { path: '/mappa', label: 'Mappa del sito', component: Sitemap, inNav: false },
  { path: '/styleguide', label: 'Styleguide', component: Styleguide, inNav: false },
]
