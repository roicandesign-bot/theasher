import { Container } from '@/components/ui/Container'
import { site } from '@/data/site'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-4 text-sm text-fg-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Tutti i diritti riservati.
        </p>
        <p>{site.tagline}</p>
      </Container>
    </footer>
  )
}
