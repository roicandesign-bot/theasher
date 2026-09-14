import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { routes } from './routes'

export default function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
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

function NotFound() {
  return (
    <section className="container-content py-section text-center">
      <p className="tracking-eyebrow text-eyebrow font-medium text-fg-muted uppercase">404</p>
      <h1 className="mt-3 text-h2 font-semibold">Pagina non trovata</h1>
    </section>
  )
}
