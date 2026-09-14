import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { InfoBar } from './components/layout/InfoBar'
import { Button } from './components/ui/Button'
import { Eyebrow } from './components/ui/Eyebrow'
import { routes } from './routes'

export default function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-button focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
      >
        Vai al contenuto
      </a>
      <InfoBar />
      <Header />
      <main id="contenuto" className="flex-1">
        <Routes>
          {routes.map(({ path, component: Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

/** 404 nel brand: numero grande in giallo, una frase, una via d'uscita. */
function NotFound() {
  return (
    <section className="container-content flex flex-col items-start gap-6 py-section">
      <Eyebrow>Errore 404</Eyebrow>
      <p className="font-display text-display text-primary" aria-hidden="true">
        404
      </p>
      <h1 className="text-h2">Questa pagina non c'è.</h1>
      <p className="max-w-prose text-lead text-fg-muted">
        Il link è vecchio o sbagliato. Il drop, invece, è sempre al suo posto.
      </p>
      <Button to="/">Torna alla home →</Button>
    </section>
  )
}
