/**
 * Illustrazioni segnaposto del reparto Gear: oggetti disegnati in linea gialla,
 * logo vero stampato sopra, sullo stesso fondo scuro dei pack (design/inputs/gear/sfondo.jpg).
 * Restano finché non arrivano le foto vere.
 *
 *   node scripts/gear-illustrazioni.mjs            # tutte
 *   node scripts/gear-illustrazioni.mjs grinder    # solo alcune
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright'

const radice = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const url = (p) => pathToFileURL(resolve(radice, p)).href
const uscita = resolve(radice, 'public/images/gear')
mkdirSync(uscita, { recursive: true })

const Y = '#DFFF00'
const D = '#141414'
const C = '#F2F2EC'
const LOGO = url('public/brand/logo-acid.png')
const LOGO_NERO = url('public/brand/logo-black.png')
const logo = (x, y, w, extra = '') =>
  `<image href="${LOGO}" x="${x}" y="${y}" width="${w}" height="${(w * 631) / 1021}" ${extra}/>`
const logoNero = (x, y, w, extra = '') =>
  `<image href="${LOGO_NERO}" x="${x}" y="${y}" width="${w}" height="${(w * 631) / 1021}" ${extra}/>`
const tratto = `stroke="${Y}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`
const scritta = (x, y, t, size = 28, colore = Y, extra = '') =>
  `<text x="${x}" y="${y}" fill="${colore}" font-family="Anton" font-size="${size}" letter-spacing="3" text-anchor="middle" ${extra}>${t}</text>`

/** Un disegno per prodotto, su una tela 800×800 con il piano a y≈720. */
const disegni = {
  't-shirt': `
    <path d="M250 150 L330 115 Q400 160 470 115 L550 150 L665 245 L600 325 L552 290 L552 705 L248 705 L248 290 L200 325 L135 245 Z" fill="${D}" ${tratto}/>
    <path d="M330 115 Q400 195 470 115" fill="none" ${tratto}/>
    ${logo(328, 235, 144)}
    ${scritta(400, 660, 'GOOD PLANTS. BRIGHTER DAYS.', 18, Y, 'opacity="0.55"')}`,

  felpa: `
    <path d="M300 185 Q300 78 400 78 Q500 78 500 185" fill="${D}" ${tratto}/>
    <path d="M250 190 L322 160 Q400 215 478 160 L550 190 L655 345 L662 640 L604 650 L588 395 L562 385 L562 712 L238 712 L238 385 L212 395 L196 650 L138 640 L145 345 Z" fill="${D}" ${tratto}/>
    <path d="M322 160 Q400 250 478 160" fill="none" ${tratto}/>
    <path d="M382 222 L376 318 M418 222 L424 318" fill="none" ${tratto}/>
    <path d="M298 560 L502 560 L532 668 L268 668 Z" fill="none" ${tratto}/>
    ${logo(326, 395, 148)}`,

  cappellino: `
    <path d="M225 500 Q225 262 400 250 Q575 262 575 500 Z" fill="${D}" ${tratto}/>
    <path d="M400 256 L400 500 M312 282 Q290 380 300 500 M488 282 Q510 380 500 500" fill="none" stroke="${Y}" stroke-width="3" opacity="0.5"/>
    <path d="M170 500 Q400 580 630 500 Q622 565 400 612 Q178 565 170 500 Z" fill="${D}" ${tratto}/>
    <circle cx="400" cy="250" r="13" fill="${Y}"/>
    ${logo(318, 345, 164)}`,

  skate: `
    <g transform="rotate(-24 400 400)">
      <rect x="298" y="60" width="204" height="680" rx="102" fill="${D}" ${tratto}/>
      <path d="M300 250 Q400 330 500 240 M300 560 Q400 470 500 575" fill="none" stroke="${Y}" stroke-width="22" opacity="0.9"/>
      <g transform="rotate(-90 400 400)">${logo(265, 318, 270)}</g>
      ${[150, 650]
        .map(
          (y) =>
            `<g fill="${Y}">${[-22, 22]
              .flatMap((dx) =>
                [-18, 18].map((dy) => `<circle cx="${400 + dx}" cy="${y + dy}" r="5"/>`),
              )
              .join('')}</g>`,
        )
        .join('')}
    </g>`,

  sticker: `
    <g transform="rotate(-12 300 330)">
      <rect x="150" y="220" width="300" height="200" rx="26" fill="${D}" stroke="${C}" stroke-width="12"/>
      ${logo(185, 238, 230)}
    </g>
    <g transform="rotate(10 540 300)">
      <circle cx="540" cy="300" r="118" fill="${Y}" stroke="${C}" stroke-width="12"/>
      ${scritta(540, 292, 'GOOD PLANTS.', 26, D, 'letter-spacing="1"')}
      ${scritta(540, 330, 'BRIGHTER DAYS.', 26, D, 'letter-spacing="1"')}
    </g>
    <g transform="rotate(8 330 560)">
      <rect x="200" y="500" width="260" height="120" rx="60" fill="${Y}" stroke="${C}" stroke-width="12"/>
      ${logoNero(262, 512, 136)}
    </g>
    <path d="M590 470 L612 548 L690 570 L612 592 L590 670 L568 592 L490 570 L568 548 Z" fill="${Y}" stroke="${C}" stroke-width="10" stroke-linejoin="round"/>`,

  grinder: `
    <path d="M210 340 L210 560 A190 62 0 0 0 590 560 L590 340" fill="${D}" ${tratto}/>
    <path d="M210 425 A190 62 0 0 0 590 425 M210 495 A190 62 0 0 0 590 495" fill="none" ${tratto}/>
    <ellipse cx="400" cy="340" rx="190" ry="62" fill="${D}" ${tratto}/>
    ${Array.from({ length: 19 }, (_, i) => {
      const x = 222 + i * 20
      return `<line x1="${x}" y1="${372 + Math.sin((i / 18) * Math.PI) * 30}" x2="${x}" y2="${405 + Math.sin((i / 18) * Math.PI) * 30}" stroke="${Y}" stroke-width="3" opacity="0.45"/>`
    }).join('')}
    <g transform="translate(400 340) scale(1 0.34) translate(-400 -340)">${logo(300, 278, 200)}</g>`,

  cartine: `<g transform="translate(400 420) scale(1.35) translate(-400 -420)">
    <rect x="215" y="268" width="370" height="80" rx="4" fill="#E6DFCD" transform="rotate(-4 400 300)"/>
    <rect x="190" y="310" width="420" height="220" rx="10" fill="${D}" ${tratto}/>
    <path d="M190 360 L610 360" stroke="${Y}" stroke-width="3" opacity="0.5"/>
    ${logo(330, 380, 140)}
    ${scritta(400, 505, 'KING SIZE SLIM', 26)}</g>`,

  filtri: `<g transform="translate(400 415) scale(1.45) translate(-400 -415)">
    <rect x="245" y="300" width="310" height="230" rx="10" fill="${D}" ${tratto}/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${285 + i * 72} 318 L${285 + i * 72} 380" stroke="${Y}" stroke-width="3" stroke-dasharray="6 7" opacity="0.6"/>`).join('')}
    ${logo(335, 385, 130)}
    ${scritta(400, 508, 'TIPS · 50', 24)}</g>`,

  clipper: `
    <g transform="rotate(-10 330 420)">
      <rect x="265" y="215" width="130" height="480" rx="34" fill="${Y}"/>
      <rect x="272" y="150" width="116" height="78" rx="10" fill="#9A9A92"/>
      <circle cx="330" cy="150" r="22" fill="#5F5F58"/>
      <g transform="rotate(-90 330 470)">${logoNero(222, 437, 216)}</g>
    </g>
    <g transform="rotate(8 480 430)">
      <rect x="415" y="225" width="130" height="480" rx="34" fill="${D}" ${tratto}/>
      <rect x="422" y="160" width="116" height="78" rx="10" fill="#9A9A92"/>
      <circle cx="480" cy="160" r="22" fill="#5F5F58"/>
      <g transform="rotate(-90 480 480)">${logo(372, 447, 216)}</g>
    </g>`,

  'porta-clipper': `
    <circle cx="400" cy="150" r="58" fill="none" stroke="#9A9A92" stroke-width="16"/>
    <rect x="382" y="198" width="36" height="40" fill="#9A9A92"/>
    <rect x="315" y="230" width="170" height="480" rx="40" fill="${D}" stroke="#9A9A92" stroke-width="10"/>
    <rect x="345" y="330" width="110" height="260" rx="22" fill="${Y}"/>
    <g transform="rotate(-90 400 460)">${logoNero(318, 432, 164)}</g>`,

  vassoio: `
    <path d="M150 560 L250 270 L650 270 L730 560 Z" fill="${D}" ${tratto} transform="translate(-40 0)"/>
    <path d="M180 540 L262 292 L638 292 L700 540 Z" fill="none" stroke="${Y}" stroke-width="3" opacity="0.5" transform="translate(-40 0)"/>
    <g transform="translate(400 415) scale(1 0.62) translate(-400 -415)">${logo(270, 330, 260)}</g>`,

  coni: `
    ${[
      [-24, 300],
      [0, 400],
      [24, 500],
    ]
      .map(
        ([r, x]) => `<g transform="rotate(${r} ${x} 700)">
          <path d="M${x - 58} 160 L${x + 58} 160 L${x + 20} 700 L${x - 20} 700 Z" fill="#E6DFCD" stroke="${Y}" stroke-width="4" stroke-linejoin="round"/>
          <path d="M${x - 23} 620 L${x + 23} 620 L${x + 20} 700 L${x - 20} 700 Z" fill="#B89A6A"/>
          <path d="M${x - 58} 160 Q${x} 140 ${x + 58} 160" fill="none" stroke="${Y}" stroke-width="4"/>
        </g>`,
      )
      .join('')}`,

  tubi: `
    ${[
      [270, D],
      [400, Y],
      [530, D],
    ]
      .map(
        ([x, c]) => `
      <rect x="${x - 50}" y="190" width="100" height="520" rx="46" fill="${c}" ${c === D ? tratto : ''}/>
      <rect x="${x - 54}" y="170" width="108" height="72" rx="20" fill="${c === D ? Y : D}"/>
      <g transform="rotate(-90 ${x} 470)">${c === D ? logo(x - 105, 437, 210) : logoNero(x - 105, 437, 210)}</g>`,
      )
      .join('')}`,

  busta: `
    <path d="M220 210 L580 210 L580 690 Q580 710 560 710 L240 710 Q220 710 220 690 Z" fill="${D}" ${tratto}/>
    <path d="M220 270 L580 270" stroke="${Y}" stroke-width="10"/>
    <path d="M220 232 L236 242 L220 252 M580 232 L564 242 L580 252" fill="none" stroke="${Y}" stroke-width="4"/>
    ${logo(300, 360, 200)}
    ${scritta(400, 580, 'SMELL PROOF', 30)}`,

  'roll-kit': `<g transform="translate(400 420) scale(0.78) translate(-400 -420)">
    <rect x="150" y="330" width="500" height="340" rx="14" fill="${D}" ${tratto}/>
    <rect x="130" y="280" width="540" height="80" rx="12" fill="${Y}"/>
    ${scritta(400, 336, 'ROLL KIT', 44, D)}
    ${logo(310, 420, 180)}
    <ellipse cx="260" cy="250" rx="70" ry="24" fill="${D}" ${tratto}/>
    <path d="M190 250 L190 200 A70 24 0 0 1 330 200 L330 250" fill="${D}" ${tratto}/>
    <ellipse cx="260" cy="200" rx="70" ry="24" fill="${D}" ${tratto}/>
    <rect x="520" y="110" width="58" height="175" rx="18" fill="${Y}" transform="rotate(12 549 200)"/>
    <rect x="380" y="200" width="120" height="82" rx="6" fill="${D}" ${tratto} transform="rotate(-6 440 240)"/></g>`,
}

const html = (svg) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Anton; src: url('${url('node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2')}'); }
html,body{margin:0;width:1600px;height:1200px;overflow:hidden;background:#0a0a0a url('${url('design/inputs/gear/sfondo.jpg')}') center/cover}
.oggetto{position:absolute;left:50%;top:70px;width:1040px;height:1040px;transform:translateX(-50%);
  filter:drop-shadow(0 30px 40px rgba(0,0,0,.65));
  -webkit-box-reflect: below -120px linear-gradient(transparent 82%, rgba(255,255,255,.10));}
</style></head><body><svg class="oggetto" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">${svg}</svg></body></html>`

const solo = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } })
const tmp = resolve(radice, 'node_modules/.cache/gear')
mkdirSync(tmp, { recursive: true })
for (const [nome, svg] of Object.entries(disegni)) {
  if (solo.length && !solo.includes(nome)) continue
  const file = resolve(tmp, `${nome}.html`)
  writeFileSync(file, html(svg))
  await page.goto(pathToFileURL(file).href)
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(150)
  await page.screenshot({ path: resolve(uscita, `${nome}.jpg`), type: 'jpeg', quality: 84 })
  console.log('ok', nome)
}
await browser.close()
