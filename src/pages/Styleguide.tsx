import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'

/**
 * STYLEGUIDE VIVENTE: mostra i token di src/styles/tokens.css così come sono.
 * Utile per approvare colori/font prima di costruire le pagine.
 * Se aggiungi token semantici nuovi, aggiungili anche alle liste qui sotto.
 */
const semanticColors = [
  'bg',
  'bg-alt',
  'surface',
  'fg',
  'fg-muted',
  'line',
  'primary',
  'primary-fg',
  'primary-hover',
  'accent',
  'accent-fg',
  'success',
  'warning',
  'danger',
]

const brandScale = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

const typeScale = [
  { cls: 'text-display font-semibold', name: 'display' },
  { cls: 'text-h1 font-semibold', name: 'h1' },
  { cls: 'text-h2 font-semibold', name: 'h2' },
  { cls: 'text-h3 font-semibold', name: 'h3' },
  { cls: 'text-lead', name: 'lead' },
  { cls: 'text-base', name: 'base' },
  { cls: 'text-sm', name: 'sm' },
  { cls: 'text-eyebrow font-medium tracking-eyebrow uppercase', name: 'eyebrow' },
]

const radii = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'card', 'button']
const shadows = ['soft', 'card', 'pop']

export default function Styleguide() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Styleguide"
            title="Token di design"
            subtitle="Tutto ciò che vedi qui viene da src/styles/tokens.css. Cambia lì, cambia ovunque."
          />
        </Container>
      </Section>

      <Section tone="alt" className="py-12">
        <Container>
          <h3 className="text-h3 font-semibold">Colori semantici</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {semanticColors.map((name) => (
              <div key={name}>
                <div
                  className="h-16 rounded-md ring-1 ring-line ring-inset"
                  style={{ background: `var(--color-${name})` }}
                />
                <p className="mt-2 font-mono text-xs text-fg-muted">{name}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-12 text-h3 font-semibold">Scala brand</h3>
          <div className="mt-6 flex overflow-hidden rounded-md ring-1 ring-line ring-inset">
            {brandScale.map((step) => (
              <div
                key={step}
                className="flex h-16 flex-1 items-end justify-center pb-1 font-mono text-[10px]"
                style={{
                  background: `var(--color-brand-${step})`,
                  color: Number(step) >= 500 ? 'white' : 'black',
                }}
              >
                {step}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <h3 className="text-h3 font-semibold">Tipografia</h3>
          <div className="mt-6 space-y-6">
            {typeScale.map((t) => (
              <div key={t.name} className="grid gap-2 md:grid-cols-[8rem_1fr]">
                <p className="font-mono text-xs text-fg-muted">{t.name}</p>
                <p className={t.cls}>Il design nasce dai dettagli</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="alt" className="py-12">
        <Container>
          <h3 className="text-h3 font-semibold">Bottoni</h3>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button>Primario</Button>
            <Button variant="secondary">Secondario</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabilitato</Button>
          </div>

          <h3 className="mt-12 text-h3 font-semibold">Card</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Card>
              <h4 className="font-semibold">Card flat</h4>
              <p className="mt-2 text-fg-muted">
                Bordo sottile, nessuna ombra. Da usare su sfondi alternati.
              </p>
            </Card>
            <Card variant="elevated">
              <h4 className="font-semibold">Card elevated</h4>
              <p className="mt-2 text-fg-muted">
                Ombra morbida, nessun bordo. Da usare su sfondo chiaro.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <h3 className="text-h3 font-semibold">Raggi e ombre</h3>
          <div className="mt-6 flex flex-wrap gap-4">
            {radii.map((r) => (
              <div key={r} className="text-center">
                <div
                  className="size-16 bg-brand-200"
                  style={{ borderRadius: `var(--radius-${r})` }}
                />
                <p className="mt-2 font-mono text-xs text-fg-muted">{r}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-8">
            {shadows.map((s) => (
              <div key={s} className="text-center">
                <div
                  className="size-24 rounded-card bg-surface"
                  style={{ boxShadow: `var(--shadow-${s})` }}
                />
                <p className="mt-3 font-mono text-xs text-fg-muted">{s}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
