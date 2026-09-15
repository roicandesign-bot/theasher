import type { ComponentType } from 'react'
import Home from './pages/Home'
import Product from './pages/Product'
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
}

export const routes: AppRoute[] = [
  { path: '/', label: 'Home', component: Home },
  {
    path: '/prodotto/:slug',
    label: 'Prodotto',
    component: Product,
    inNav: false,
    screenshotPath: '/prodotto/lemon-haze',
  },
  { path: '/styleguide', label: 'Styleguide', component: Styleguide, inNav: false },
]
