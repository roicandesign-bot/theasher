# Oli The Hasher: la scatola dei pack con davanti la boccetta contagocce in vetro ambrato,
# etichetta nera con il logo. Tutto disegnato: vetro, ghiera rigata, pipetta, riflessi.
#
# Uso: python3 scripts/boccetta-olio.py [nome-file ...]
# Scrive public/images/prodotti/olio-*.jpg (sovrascrive la versione con la sola scatola).
import importlib.util
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

RADICE = Path(__file__).resolve().parent.parent
USCITA = RADICE / 'public/images/prodotti'


def _modulo(nome, file):
    spec = importlib.util.spec_from_file_location(nome, RADICE / 'scripts' / file)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


pack = _modulo('pack', 'pack-hasher.py')
busta = _modulo('busta', 'busta-gummies.py')

GIALLO = (234, 251, 3)
BIANCO = (244, 244, 240)
NERO = (15, 15, 14)

# misure della boccetta (px), disegnata grande e poi rimpicciolita
W, H = 560, 1460
CX = W / 2


def profilo(y):
    """Mezza larghezza della sagoma a quota y (0 = cima della pipetta)."""
    if y < 60:
        return 0
    if y < 330:  # pipetta in gomma: cupola in alto, poi quasi dritta
        if y < 130:
            return 72 * math.sqrt(max(0, 1 - ((130 - y) / 70) ** 2))
        return 72 + (y - 130) * 0.04
    if y < 360:  # anello sotto la pipetta
        return 108
    if y < 560:  # ghiera rigata
        return 128
    if y < 590:  # collo in vetro
        return 96
    if y < 690:  # spalla arrotondata
        t = (690 - y) / 100
        return 96 + 124 * math.sqrt(max(0, 1 - t**2))
    if y < 1400:
        return 220
    if y < 1432:  # fondo arrotondato
        return 220 - 32 + math.sqrt(max(0, 32**2 - (y - 1400) ** 2))
    return 0


def etichetta(p, larghezza, altezza):
    """L'etichetta stesa in piano: poi viene avvolta sul vetro."""
    et = Image.new('RGBA', (larghezza, altezza), NERO + (255,))
    d = ImageDraw.Draw(et)
    # filetti gialli sopra e sotto
    d.rectangle((0, 14, larghezza, 20), fill=GIALLO)
    d.rectangle((0, altezza - 20, larghezza, altezza - 14), fill=GIALLO)
    cx = larghezza / 2
    logo = Image.open(RADICE / 'public/brand/logo-acid.png').convert('RGBA')
    lw = int(larghezza * 0.36)
    logo = logo.resize((lw, round(lw * logo.height / logo.width)), Image.LANCZOS)
    et.alpha_composite(logo, (round(cx - lw / 2), 44))
    y = 44 + logo.height + 18
    busta.testo(et, p['riga1'], 'archivo-black-cond.ttf', cx, y, 58, BIANCO, larg_max=larghezza * 0.5)
    y += 76
    busta.testo(et, p['riga2'], 'archivo-bold.ttf', cx, y, 20, GIALLO, larg_max=larghezza * 0.5, spazio=0.25)
    y += 44
    # riquadro giallo con la percentuale, come sui blister
    bw, bh = larghezza * 0.3, 64
    d.rounded_rectangle((cx - bw / 2, y, cx + bw / 2, y + bh), radius=8, fill=GIALLO)
    busta.testo(et, p['pct'], 'archivo-black-cond.ttf', cx, y + 12, 40, NERO, larg_max=bw - 24)
    y += bh + 20
    if p.get('luna'):
        r = 22
        d.ellipse((cx - r, y, cx + r, y + 2 * r), fill=GIALLO)
        d.ellipse((cx - r + 12, y - 6, cx + r + 12, y + 2 * r - 6), fill=NERO)
        y += 2 * r + 12
    busta.testo(et, p['formato'], 'archivo-bold.ttf', cx, altezza - 58, 18, BIANCO, spazio=0.2)
    return et


def boccetta(p):
    yy, xx = np.mgrid[0:H, 0:W].astype(float)
    hw = np.array([profilo(y) for y in range(H)])[:, None]
    dentro = np.abs(xx - CX) < hw
    nx = np.where(hw > 0, (xx - CX) / np.maximum(hw, 1), 0)
    cil = np.sqrt(np.clip(1 - nx**2, 0, 1))  # 1 al centro, 0 ai bordi

    col = np.zeros((H, W, 3))
    y = yy
    vetro = y >= 560
    ghiera = (y >= 360) & (y < 560)
    anello = (y >= 330) & (y < 360)
    pipetta = y < 330

    # vetro ambrato pieno d'olio: scuro ai bordi, caldo al centro dove passa la luce
    ambra_scuro = np.array([52, 20, 4])
    ambra = np.array([150, 70, 14])
    luce = np.exp(-((nx - 0.18) ** 2) / 0.22) * (0.55 + 0.45 * np.clip((y - 700) / 700, 0, 1))
    c_vetro = ambra_scuro + (ambra - ambra_scuro) * (luce * cil ** 0.5)[..., None]
    c_vetro *= (0.55 + 0.45 * cil ** 0.7)[..., None]
    # riflessi: una striscia netta a sinistra, una morbida a destra, la spalla più chiara
    c_vetro += (np.exp(-((nx + 0.6) ** 2) / 0.0035) * 190)[..., None]
    c_vetro += (np.exp(-((nx + 0.4) ** 2) / 0.03) * 38)[..., None]
    c_vetro += (np.exp(-((nx - 0.78) ** 2) / 0.003) * 95)[..., None]
    # fondo spesso del vetro, più chiaro
    c_vetro += (np.exp(-((y - 1405) ** 2) / 250) * 55 * cil)[..., None]
    spalla = np.exp(-((y - 640) ** 2) / 900) * np.exp(-((nx + 0.2) ** 2) / 0.2) * 70
    c_vetro += spalla[..., None]
    col = np.where(vetro[..., None], c_vetro, col)

    # ghiera nera rigata
    righe = 0.5 + 0.5 * np.cos(nx * math.pi * 14)
    c_gh = np.array([30, 30, 29]) * (0.45 + 0.75 * cil)[..., None] * (0.8 + 0.3 * righe)[..., None]
    c_gh += (np.exp(-((nx + 0.55) ** 2) / 0.004) * 60 * righe)[..., None]
    c_gh *= (0.85 + 0.15 * np.clip((y - 360) / 40, 0, 1))[..., None]
    col = np.where(ghiera[..., None], c_gh, col)

    # anello e pipetta in gomma nera lucida
    c_an = np.array([24, 24, 23]) * (0.5 + 0.6 * cil)[..., None]
    c_an += (np.exp(-((nx + 0.5) ** 2) / 0.01) * 40)[..., None]
    col = np.where(anello[..., None], c_an, col)
    c_pi = np.array([22, 22, 21]) * (0.45 + 0.7 * cil)[..., None]
    c_pi += (np.exp(-((nx + 0.45) ** 2) / 0.012) * 75)[..., None]
    c_pi += (np.exp(-((y - 110) ** 2) / 700) * np.exp(-((nx + 0.2) ** 2) / 0.08) * 60)[..., None]
    col = np.where(pipetta[..., None], c_pi, col)

    img = Image.fromarray(col.clip(0, 255).astype('uint8')).convert('RGBA')

    # etichetta avvolta sul vetro: da y 820 a 1330
    ey0, ey1 = 800, 1330
    lw = int(2 * 220 * math.pi / 2 * 1.0)
    et = np.asarray(etichetta(p, lw, ey1 - ey0)).astype(float)
    xs = np.arange(W)
    nxr = (xs - CX) / 220
    ok = np.abs(nxr) < 0.985
    u = (np.arcsin(np.clip(nxr, -1, 1)) / (math.pi / 2) + 1) / 2 * (lw - 1)
    ombra_c = 0.5 + 0.55 * np.sqrt(np.clip(1 - nxr**2, 0, 1))
    for yi in range(ey0, ey1):
        riga = et[yi - ey0]
        src = riga[np.clip(u.astype(int), 0, lw - 1)]
        rgb = src[:, :3] * ombra_c[:, None]
        rgb += np.exp(-((nxr + 0.6) ** 2) / 0.0035)[:, None] * 110  # la lucentezza continua sull'etichetta
        rgb += np.exp(-((nxr - 0.8) ** 2) / 0.003)[:, None] * 30
        px = np.asarray(img)[yi].astype(float).copy()
        px[ok, :3] = rgb[ok]
        img.paste(Image.fromarray(px[None].clip(0, 255).astype('uint8'), 'RGBA'), (0, yi))

    alfa = Image.fromarray((dentro * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.9))
    img.putalpha(alfa)
    return img.crop(img.getbbox())


OLI = [
    dict(
        file='olio-full-spectrum', linea='CBD', contiene='CONTIENE 20%', nome=['FULL', 'SPECTRUM'],
        tipo='OLIO', genetica='CONTAGOCCE', formato='10ML',
        riga1='CBD', riga2='FULL SPECTRUM', pct='20%', formato_et='10 ML · 2000 MG',
    ),
    dict(
        file='olio-cbn-notte', linea='CBN', contiene='CONTIENE 10%', nome=['NOTTE'],
        tipo='OLIO', genetica='THC FREE', formato='10ML',
        riga1='NOTTE', riga2='CBD + CBN', pct='10%', formato_et='10 ML · THC FREE',
    ),
]

if __name__ == '__main__':
    import sys

    solo = set(sys.argv[1:])
    for p in OLI:
        if solo and p['file'] not in solo:
            continue
        # l'etichetta usa il suo testo in basso, la scatola il formato breve
        et = dict(p, formato=p['formato_et'])
        scatola_p = p

        def olio_con_etichetta(p=scatola_p, et=et):
            scatola, con = pack.pack(p)
            scatola = pack.scontorna(scatola, con)
            return scatola, boccetta(et)

        scatola, b = olio_con_etichetta()
        s = scatola.height * 0.68 / b.height
        b = b.resize((round(b.width * s), round(b.height * s)), Image.LANCZOS)
        sporge = round(b.width * 0.62)
        avanti = round(scatola.height * 0.035)
        tela = Image.new('RGBA', (scatola.width + sporge, scatola.height + avanti), (0, 0, 0, 0))
        tela.alpha_composite(scatola, (sporge, 0))
        ombra = Image.new('RGBA', tela.size, (0, 0, 0, 0))
        ombra.paste(Image.new('RGBA', b.size, (0, 0, 0, 150)), (26, tela.height - b.height - 4), b.split()[3])
        ombra = ombra.filter(ImageFilter.GaussianBlur(16))
        maschera = Image.new('L', tela.size, 0)
        maschera.paste(scatola.split()[3], (sporge, 0))
        ombra.putalpha(Image.fromarray(np.minimum(np.asarray(ombra.split()[3]), np.asarray(maschera))))
        tela.alpha_composite(ombra)
        tela.alpha_composite(b, (0, tela.height - b.height))
        foto = pack.scena(tela)
        foto.save(USCITA / f"{p['file']}.jpg", quality=84, optimize=True, progressive=True)
        print('ok', p['file'])
