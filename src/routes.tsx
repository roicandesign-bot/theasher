import type { ComponentType } from 'react'
import Home from './pages/Home'
import Styleguide from './pages/Styleguide'

/**
 * ELENCO PAGINE DEL SITO.
 * Aggiungi qui ogni nuova pagina (step /pagina): serve al router,
 * al menu di navigazione e allo script degli screenshot.
 * `inNav: false` nasconde la voce dal menu (es. /styleguide).
 */
export type AppRoute = {
  path: string
  label: string
  component: ComponentType
  inNav?: boolean
}

export const routes: AppRoute[] = [
  { path: '/', label: 'Home', component: Home },
  { path: '/styleguide', label: 'Styleguide', component: Styleguide, inNav: false },
]
