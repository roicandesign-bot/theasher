/** Percorso di un file in `public/` che rispetta il base path (GitHub Pages usa /theasher/). */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
