/**
 * Rigenera il PDF dell'immagine coordinata da design/immagine-coordinata/immagine-coordinata.html.
 *
 * Uso: node scripts/immagine-coordinata.mjs
 *
 * La pagina va servita via http (non file://): le maschere CSS del tratto calligrafico
 * non si caricano da file locali. Lo script avvia un piccolo server sulla cartella del progetto,
 * controlla che nessuna pagina debordi, riduce le foto alla misura di stampa e stampa
 * il PDF A4 orizzontale con gli sfondi.
 */
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const RADICE = fileURLToPath(new URL('..', import.meta.url))
const CARTELLA = 'design/immagine-coordinata/'
const TIPI = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.css': 'text/css',
}

const server = createServer(async (req, res) => {
  const percorso = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname))
  try {
    const file = await readFile(join(RADICE, percorso))
    res.writeHead(200, { 'content-type': TIPI[extname(percorso)] ?? 'application/octet-stream' })
    res.end(file)
  } catch {
    res.writeHead(404).end()
  }
})
await new Promise((ok) => server.listen(0, '127.0.0.1', ok))
const { port } = server.address()

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
    : {},
)
const pagina = await browser.newPage({ viewport: { width: 1123, height: 794 } })
await pagina.goto(`http://127.0.0.1:${port}/${CARTELLA}immagine-coordinata.html`, {
  waitUntil: 'load',
})
await pagina.evaluate(() => document.fonts.ready)
await pagina.waitForTimeout(400)

// Foto ridotte alla misura in cui compaiono (2× la dimensione a schermo, circa 190 dpi):
// senza questo passaggio Chromium incorpora gli originali e il PDF pesa circa 17 MB.
// I PNG trasparenti (logo) restano come sono.
await pagina.evaluate(async () => {
  const foto = [...document.images].filter((img) => !/logo-.*\.png$/.test(img.src))
  await Promise.all(
    foto.map(async (img) => {
      await img.decode().catch(() => {})
      const r = img.getBoundingClientRect()
      // con object-fit: cover conta il lato che riempie di più la cornice
      const scala = Math.min(
        1,
        Math.max((r.width * 2) / img.naturalWidth, (r.height * 2) / img.naturalHeight),
      )
      if (scala > 0.95 && img.src.endsWith('.jpg')) return
      const tela = document.createElement('canvas')
      tela.width = Math.round(img.naturalWidth * scala)
      tela.height = Math.round(img.naturalHeight * scala)
      tela.getContext('2d').drawImage(img, 0, 0, tela.width, tela.height)
      img.src = tela.toDataURL('image/jpeg', 0.82)
      await img.decode().catch(() => {})
    }),
  )
})

const trabocchi = await pagina.evaluate(() =>
  [...document.querySelectorAll('section.pagina')]
    .map((sezione, i) => {
      const corpo = sezione.querySelector('.corpo')
      if (!corpo) return null
      const limite = corpo.getBoundingClientRect().bottom
      let fondo = 0
      corpo.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.height > 0) fondo = Math.max(fondo, r.bottom)
      })
      return fondo > limite + 1 ? `pagina ${i + 1}: +${Math.round(fondo - limite)} px` : null
    })
    .filter(Boolean),
)
if (trabocchi.length) console.warn('Attenzione, contenuto che deborda:', trabocchi.join(', '))

await pagina.pdf({
  path: join(RADICE, CARTELLA, 'THE-HASHER-immagine-coordinata.pdf'),
  printBackground: true,
  preferCSSPageSize: true,
})
await browser.close()
server.close()
console.log(`PDF scritto in ${CARTELLA}THE-HASHER-immagine-coordinata.pdf`)
