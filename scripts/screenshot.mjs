#!/usr/bin/env node
/**
 * Cattura screenshot di tutte le pagine del sito a 3 viewport
 * (mobile, tablet, desktop) e li salva in design/screenshots/.
 *
 * Uso:
 *   npm run screenshot                    # build + preview + cattura tutte le route
 *   npm run screenshot -- --routes /,/chi-siamo
 *   npm run screenshot -- --url http://localhost:5173   # usa un server già avviato
 *   npm run screenshot -- --viewports mobile,desktop
 *   npm run screenshot -- --no-fullpage   # solo la parte "above the fold"
 *
 * Le route vengono lette da src/routes.tsx (campo `path`).
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const ROOT = resolve(import.meta.dirname, '..')
const OUT_DIR = resolve(ROOT, 'design/screenshots')

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 834, height: 1112 },
  desktop: { width: 1440, height: 900 },
}

// ---------- argomenti ----------
const args = process.argv.slice(2)
const flag = (name) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? (args[i + 1] ?? true) : undefined
}
const has = (name) => args.includes(`--${name}`)

const viewportNames = (flag('viewports') ?? 'mobile,tablet,desktop').split(',').filter(Boolean)
const fullPage = !has('no-fullpage')
const baseUrlArg = flag('url')
const routes = (flag('routes') ?? readRoutes())
  .split(',')
  .map((r) => r.trim())
  .filter(Boolean)

function readRoutes() {
  const file = resolve(ROOT, 'src/routes.tsx')
  const src = readFileSync(file, 'utf8')
  const found = [...src.matchAll(/path:\s*['"`]([^'"`]+)['"`]/g)].map((m) => m[1])
  return found.length ? found.join(',') : '/'
}

function slug(route) {
  return route === '/'
    ? 'home'
    : route
        .replace(/^\//, '')
        .replace(/[^a-z0-9]+/gi, '-')
        .toLowerCase()
}

// ---------- server ----------
async function startPreview() {
  const port = 4173 + Math.floor(Math.random() * 500)
  const vite = resolve(ROOT, 'node_modules/vite/bin/vite.js')
  await run(process.execPath, [vite, 'build', '--logLevel', 'warn'])
  // Lanciato direttamente con node (non via npx) così SIGTERM lo chiude davvero.
  const child = spawn(process.execPath, [vite, 'preview', '--port', String(port), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'ignore', 'inherit'],
    env: { ...process.env, VITE_BASE: '/' },
  })
  const url = `http://localhost:${port}`
  await waitFor(url)
  return { url, stop: () => child.kill('SIGTERM') }
}

function run(cmd, cmdArgs) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, cmdArgs, { cwd: ROOT, stdio: 'inherit' })
    p.on('exit', (code) =>
      code === 0 ? res() : rej(new Error(`${cmd} ${cmdArgs.join(' ')} → exit ${code}`)),
    )
  })
}

async function waitFor(url, timeoutMs = 30_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url)
      if (r.ok) return
    } catch {
      /* non ancora pronto */
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error(`Il server ${url} non ha risposto entro ${timeoutMs / 1000}s`)
}

// ---------- browser ----------
async function launchBrowser() {
  try {
    return await chromium.launch()
  } catch (err) {
    // Fallback: Chromium pre-installato nell'ambiente remoto di Claude Code.
    const candidates = [
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
      '/opt/pw-browsers/chromium',
    ].filter(Boolean)
    for (const executablePath of candidates) {
      if (existsSync(executablePath)) return chromium.launch({ executablePath })
    }
    console.error(
      '\n✖ Chromium non trovato. In locale esegui una volta:\n    npx playwright install chromium\n',
    )
    throw err
  }
}

// ---------- main ----------
async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  const server = baseUrlArg
    ? { url: baseUrlArg.replace(/\/$/, ''), stop() {} }
    : await startPreview()
  const browser = await launchBrowser()
  const written = []

  try {
    for (const vpName of viewportNames) {
      const viewport = VIEWPORTS[vpName]
      if (!viewport) {
        console.warn(`Viewport sconosciuto "${vpName}" (usa: ${Object.keys(VIEWPORTS).join(', ')})`)
        continue
      }
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1, locale: 'it-IT' })
      const page = await context.newPage()
      const consoleErrors = []
      page.on('pageerror', (e) => consoleErrors.push(e.message))
      page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))

      for (const route of routes) {
        await page.goto(`${server.url}${route}`, { waitUntil: 'networkidle' })
        await page.evaluate(() => document.fonts?.ready)
        await page.waitForTimeout(300) // lascia finire le animazioni di ingresso
        const file = resolve(OUT_DIR, `${slug(route)}--${vpName}.png`)
        await page.screenshot({ path: file, fullPage })
        written.push(file)
        console.log(
          `✓ ${route.padEnd(20)} ${vpName.padEnd(8)} → design/screenshots/${slug(route)}--${vpName}.png`,
        )
      }
      if (consoleErrors.length) {
        console.warn(
          `\n⚠ Errori console (${vpName}):\n  - ${[...new Set(consoleErrors)].join('\n  - ')}\n`,
        )
      }
      await context.close()
    }
  } finally {
    await browser.close()
    server.stop()
  }

  console.log(`\n${written.length} screenshot salvati in design/screenshots/`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
