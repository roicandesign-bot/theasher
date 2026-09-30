import { ClientOnly } from '@tanstack/react-router'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

/**
 * Tutto il sito The Hasher vive qui dentro, con il suo router (react-router-dom) e le sue
 * pagine in `src/routes.tsx`. Il guscio TanStack di Lovable lo monta su qualunque indirizzo
 * (vedi `src/routes/$.tsx` e `src/routes/index.tsx`) e solo nel browser: il sito usa
 * localStorage, matchMedia e animazioni che non hanno senso lato server.
 */
export function HasherApp() {
  return (
    <ClientOnly fallback={<div className="min-h-svh bg-bg" aria-hidden="true" />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClientOnly>
  )
}
