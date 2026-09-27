import type { InputHTMLAttributes } from 'react'
import { Input } from './Input'

/** Campo di modulo con etichetta sopra. */
export function Campo({
  id,
  label,
  ...rest
}: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-[0.625rem] text-fg-muted">
        {label}
      </label>
      <Input id={id} name={id} {...rest} />
    </div>
  )
}

/** Stile dei menu a tendina dei moduli, allineato agli input. */
export const selectCls =
  'h-12 rounded-input bg-bg-alt px-4 text-base text-fg ring-1 ring-line ring-inset focus:ring-2 focus:ring-primary focus:outline-none'
