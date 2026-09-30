/**
 * Genera supabase/seed.sql dal catalogo demo del prototipo (src/data/products.ts).
 * Così il database parte con gli stessi prodotti che Lorenzo vede nell'anteprima.
 * Uso: node scripts/genera-seed.mjs
 */
import { writeFileSync } from 'node:fs'
import { createServer } from 'vite'

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})
const cat = await vite.ssrLoadModule('/src/data/products.ts')
const site = await vite.ssrLoadModule('/src/data/site.ts')
await vite.close()

const q = (v) => {
  if (v === undefined || v === null) return 'null'
  if (typeof v === 'number') return String(v)
  if (typeof v === 'boolean') return v ? 'true' : 'false'
  return `'${String(v).replace(/'/g, "''")}'`
}
const json = (v) => (v === undefined ? "'[]'::jsonb" : `${q(JSON.stringify(v))}::jsonb`)
const arr = (v) => (v?.length ? `array[${v.map(q).join(', ')}]::text[]` : "'{}'::text[]")

const out = ['-- Generato da scripts/genera-seed.mjs: non modificare a mano.', 'begin;', '']

// categorie
const gruppo = {}
for (const g of cat.gruppiFamiglie) for (const f of g.famiglie) gruppo[f] = g.nome
let sort = 0
out.push('insert into public.categories (key, name, reparto, gruppo, image, sort) values')
const righeCat = [
  ...Object.entries(cat.categorie).map(
    ([k, n]) =>
      `  (${q(k)}, ${q(n)}, 'negozio', ${q(gruppo[k])}, ${q(cat.fotoFamiglia[k])}, ${sort++})`,
  ),
  ...Object.entries(cat.categorieMerch).map(
    ([k, n]) => `  (${q(k)}, ${q(n)}, 'merch', null, null, ${sort++})`,
  ),
]
out.push(righeCat.join(',\n') + '\non conflict (key) do nothing;', '')

// prodotti e formati
cat.products.forEach((p, i) => {
  out.push(`with p as (
  insert into public.products (slug, name, linea, category, coltivazione, tipo_fiore, tipo, metodo,
    consistenza, colore, thc_free, attivi, price, compare_at, grams, unita, formato, dose, badges,
    aroma, origin, short, image, image_grande, gallery, description, aroma_notes, features, faq,
    batch, lab, storage, warnings, sort)
  values (${[
    q(p.slug),
    q(p.name),
    p.linea ? `${q(p.linea)}::public.linea` : 'null',
    q(p.category),
    q(p.coltivazione),
    q(p.tipoFiore),
    q(p.tipo),
    q(p.metodo),
    q(p.consistenza),
    q(p.colore),
    q(p.thcFree ?? false),
    json(p.attivi),
    q(p.price),
    q(p.compareAt),
    q(p.grams),
    `${q(p.unita ?? 'g')}::public.unita`,
    q(p.formato),
    q(p.dose),
    arr(p.badges),
    arr(p.aroma),
    q(p.origin),
    q(p.short),
    q(p.image),
    q(p.imageGrande),
    json(p.gallery),
    arr(p.description),
    json(p.aromaNotes),
    json(p.features),
    json(p.faq),
    q(p.batch),
    p.lab ? json(p.lab) : 'null',
    q(p.storage),
    q(p.warnings),
    i,
  ].join(', ')})
  on conflict (slug) do nothing
  returning id
)`)
  const varianti = p.variants?.length
    ? p.variants
    : [
        {
          label: p.formato ?? `${String(p.grams).replace('.', ',')} ${p.unita ?? 'g'}`,
          grams: p.grams,
          price: p.price,
          compareAt: p.compareAt,
          inStock: p.inStock,
        },
      ]
  out.push(
    'insert into public.variants (product_id, label, grams, price, compare_at, stock, sku, sort)\nselect p.id, v.* from p, (values\n' +
      varianti
        .map(
          (v, j) =>
            `  (${q(v.label)}, ${q(v.grams)}::numeric, ${q(v.price)}, ${q(v.compareAt)}::int, ${v.inStock && p.inStock ? 50 : 0}, ${q(`${p.slug}-${j + 1}`)}, ${j})`,
        )
        .join(',\n') +
      '\n) as v(label, grams, price, compare_at, stock, sku, sort);',
    '',
  )
})

// Paesi di spedizione: attivi IT e DE come da docs/10 (decisione 4), gli altri pronti ma spenti.
const paesi = [
  ['IT', 'Italia', true],
  ['DE', 'Germania', true],
  ['AT', 'Austria', false],
  ['FR', 'Francia', false],
  ['ES', 'Spagna', false],
  ['NL', 'Paesi Bassi', false],
  ['BE', 'Belgio', false],
  ['PT', 'Portogallo', false],
  ['IE', 'Irlanda', false],
  ['LU', 'Lussemburgo', false],
]
out.push(
  'insert into public.shipping_countries (country_code, name, active, shipping_price, free_from) values\n' +
    paesi
      .map(([c, n, a]) => `  (${q(c)}, ${q(n)}, ${a}, 590, ${site.site.freeShippingFrom})`)
      .join(',\n') +
    '\non conflict (country_code) do nothing;',
  '',
  'commit;',
  '',
)

writeFileSync('supabase/seed.sql', out.join('\n'))
console.log(
  `seed.sql: ${cat.products.length} prodotti, ${righeCat.length} categorie, ${paesi.length} Paesi`,
)
