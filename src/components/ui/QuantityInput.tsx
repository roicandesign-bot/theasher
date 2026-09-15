import { Minus, Plus } from 'lucide-react'

type QuantityInputProps = {
  value: number
  onChange: (value: number) => void
  max?: number
}

/** Selettore quantità: − valore +. Solo UI. */
export function QuantityInput({ value, onChange, max = 10 }: QuantityInputProps) {
  return (
    <div className="flex h-12 items-center rounded-button ring-1 ring-line ring-inset">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label="Diminuisci quantità"
        className="grid size-12 place-items-center rounded-l-button text-fg transition disabled:opacity-40 hocus:text-primary"
      >
        <Minus className="size-4" />
      </button>
      <span aria-live="polite" className="w-8 text-center font-semibold">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumenta quantità"
        className="grid size-12 place-items-center rounded-r-button text-fg transition disabled:opacity-40 hocus:text-primary"
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}
