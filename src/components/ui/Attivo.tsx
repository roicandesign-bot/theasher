import { attivoParti, type Cannabinoide, type Product } from '@/data/products'
import { cn } from '@/lib/cn'

/**
 * Sottotitolo del cannabinoide: "CBD: +31%".
 * La sigla è molto spaziata, il valore resta compatto (e il margine negativo
 * recupera lo spazio che la spaziatura lascia prima dei due punti).
 */
export function Attivo({
  product,
  evidenzia,
  className,
}: {
  product: Product
  evidenzia?: Cannabinoide | null
  className?: string
}) {
  const parti = attivoParti(product, evidenzia)
  if (!parti) return null
  return (
    <p className={cn('text-attivo text-primary', className)}>
      <span className="-mr-attivo">{parti.sigla}</span>
      <span className="tracking-label">: {parti.valore}</span>
    </p>
  )
}
