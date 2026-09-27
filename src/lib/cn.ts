import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge non conosce le nostre dimensioni di testo (text-display, text-h2…)
 * e le scambierebbe per colori, cancellandole quando nella stessa classe c'è
 * anche un text-<colore>. Qui gliele dichiariamo.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'lead', 'eyebrow', 'label', 'price'] }],
    },
  },
})

/** Unisce classi Tailwind senza conflitti: cn('p-2', cond && 'p-4') → 'p-4' */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
