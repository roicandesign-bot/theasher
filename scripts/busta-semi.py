# Buste dei semi The Hasher dalla bozza di Lorenzo (solo il fronte: il retro cita un marchio terzo).
# Cambia genetica e percentuali, scontorna la busta, la mette sulla scena scura dei pack
# e aggiunge qualche seme sul piano, davanti alla busta.
#
# Uso: python3 scripts/busta-semi.py [nome-file ...]
# Legge design/inputs/semi/busta-semi-bozza.png e maschera-fronte.png, scrive in public/images/prodotti/.
import importlib.util
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

RADICE = Path(__file__).resolve().parent.parent
USCITA = RADICE / 'public/images/prodotti'


def _modulo(nome, file):
    spec = importlib.util.spec_from_file_location(nome, RADICE / 'scripts' / file)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


pack = _modulo('pack', 'pack-hasher.py')
busta = _modulo('busta', 'busta-gummies.py')

GIALLO = (238, 240, 20)
rng = np.random.default_rng(3)


# ---------------------------------------------------------------- scritte


def componenti(a, box, colore, minimo=12):
    x0, y0, x1, y1 = box
    t = a[y0:y1, x0:x1]
    if colore == 'giallo':
        m = (t[:, :, 2] < 120) & (t[:, :, 1] > 150) & (t[:, :, 0] > 140)
    else:
        m = (t.min(2) > 150) & ((t.max(2) - t.min(2)) < 45)
    lab, n = ndimage.label(m)
    out = []
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if len(ys) < minimo:
            continue
        if ys.min() == 0 or xs.min() == 0 or ys.max() == m.shape[0] - 1 or xs.max() == m.shape[1] - 1:
            continue
        piena = np.zeros(a.shape[:2], bool)
        piena[ys + y0, xs + x0] = True
        out.append((piena, xs.min() + x0, ys.min() + y0, xs.max() + x0 + 1, ys.max() + y0 + 1))
    return out


def unione(comps):
    m = np.zeros(comps[0][0].shape, bool)
    for c in comps:
        m |= c[0]
    return m, min(c[1] for c in comps), min(c[2] for c in comps), max(c[3] for c in comps), max(c[4] for c in comps)


def fronte(p):
    a = np.asarray(Image.open(RADICE / 'design/inputs/semi/busta-semi-bozza.png').convert('RGB')).astype(float)
    ai = a.astype(int)
    img_mod = []

    # nome: due righe gialle grandi
    righe = [unione(componenti(ai, (250, 505, 600, 632), 'giallo', 200)), unione(componenti(ai, (250, 628, 600, 750), 'giallo', 200))]
    # numeri gialli nella riga «THC 25% | CBD 2%»: a sinistra e a destra della barretta
    num = [c for c in componenti(ai, (230, 745, 620, 800), 'giallo') if (c[3] - c[1]) > 6]
    sx = unione([c for c in num if c[1] < 424])
    dx = unione([c for c in num if c[1] > 430])

    if p['nome'] != ['LEMON', 'HAZE']:
        for m, *_ in righe:
            busta.riempi_nero(a, ndimage.binary_dilation(m, iterations=5))
    for (m, *_), nuovo, vecchio in ((sx, p['thc'], '25%'), (dx, p['cbd'], '2%')):
        if nuovo != vecchio:
            busta.riempi_nero(a, ndimage.binary_dilation(m, iterations=2))

    img = Image.fromarray(a.clip(0, 255).astype('uint8')).convert('RGBA')
    cx = (righe[0][1] + righe[0][3] + righe[1][1] + righe[1][3]) / 4
    alt = righe[0][4] - righe[0][2]
    if p['nome'] != ['LEMON', 'HAZE']:
        font = 'archivo-xbold-xcond.ttf'
        if len(p['nome']) == 2:
            # stessa altezza per le due righe: comanda la riga più lunga
            h = min(alt, *(alt * 300 / larghezza(t, font, alt) for t in p['nome']))
            # blocco di due righe centrato nello spazio originale, con lo stesso interlinea
            gap = max(righe[1][2] - righe[0][4], h * 0.16)
            centro = (righe[0][2] + righe[1][4]) / 2
            top = centro - (2 * h + gap) / 2
            for i, testo in enumerate(p['nome']):
                busta.testo(img, testo, font, cx, top + i * (h + gap), h, GIALLO)
        else:
            y0, y1 = righe[0][2], righe[1][4]
            h = min(170, y1 - y0, 170 * 310 / larghezza(p['nome'][0], font, 170))
            busta.testo(img, p['nome'][0], font, cx, y0 + (y1 - y0 - h) / 2, h, GIALLO)
    for (m, x0, y0, x1, y1), nuovo, vecchio in ((sx, p['thc'], '25%'), (dx, p['cbd'], '2%')):
        if nuovo != vecchio:
            busta.testo(img, nuovo, 'archivo-bold.ttf', x0, y0, y1 - y0, GIALLO, ancora='sinistra')
    return img


def larghezza(testo, font, alt):
    """Larghezza in pixel di una scritta alta `alt`, con il font dei pack."""
    f = busta.font(font, int(alt * 4 * 1.45))
    ink = f.getbbox('H')
    box = f.getbbox(testo)
    return (box[2] - box[0]) * alt / (ink[3] - ink[1])


def scontorna(img):
    m = np.asarray(Image.open(RADICE / 'design/inputs/semi/maschera-fronte.png').convert('L')).copy()
    m[948:, :] = 0  # il bordo in basso della busta: sotto c'è solo la pietra
    alfa = Image.fromarray(m).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
    out = img.copy()
    out.putalpha(alfa)
    return out.crop(out.getbbox())


# ---------------------------------------------------------------- semi


def seme(lung, rot, seed):
    """Un seme di cannabis: ovale un po' a goccia, fondo grigio-bruno con striature scure, lucido."""
    r = np.random.default_rng(seed)
    S = 4
    L, W = int(lung * S), int(lung * 0.68 * S)
    pad = int(lung * 0.5 * S)
    tela = Image.new('RGBA', (L + 2 * pad, W + 2 * pad), (0, 0, 0, 0))
    cx, cy = tela.width / 2, tela.height / 2
    punti = []
    for i in range(120):
        t = 2 * math.pi * i / 120
        x = L / 2 * math.cos(t)
        y = W / 2 * math.sin(t) * (1 + 0.12 * math.cos(t))
        punti.append((cx + x, cy + y))
    forma = Image.new('L', tela.size, 0)
    ImageDraw.Draw(forma).polygon(punti, fill=255)
    fm = np.asarray(forma) > 0

    yy, xx = np.mgrid[0 : tela.height, 0 : tela.width]
    nx, ny = (xx - cx) / (L / 2), (yy - cy) / (W / 2)
    d = np.clip(nx**2 + ny**2, 0, 1)
    base = np.array([128, 112, 90], float)
    col = np.ones((tela.height, tela.width, 3)) * base
    # striature: rumore allungato lungo il seme
    rumore = r.normal(0, 1, (tela.height // 9 + 1, tela.width // 48 + 1))
    rumore = np.asarray(Image.fromarray(((rumore + 3) * 40).clip(0, 255).astype('uint8')).resize(tela.size, Image.BICUBIC)).astype(float) / 40 - 3
    macchie = np.clip((rumore - 0.1) * 1.2, 0, 1)
    scuro = np.array([58, 44, 34], float)
    col = col * (1 - macchie[..., None] * 0.85) + scuro * macchie[..., None] * 0.85
    # luce da sinistra in alto, bordi più scuri
    luce = 1.15 - 0.45 * d - 0.18 * (nx + ny)
    col *= luce[..., None]
    # la cucitura del seme: una riga più chiara lungo l'asse
    cucitura = np.exp(-((ny + 0.18) ** 2) / 0.004) * (1 - np.abs(nx)) * 0.35
    col += cucitura[..., None] * 90
    # riflesso lucido
    lucido = np.exp(-(((nx + 0.35) ** 2) / 0.05 + ((ny + 0.45) ** 2) / 0.02)) * 0.9
    col = col * (1 - lucido[..., None] * 0.5) + 255 * lucido[..., None] * 0.5
    rgba = np.zeros((tela.height, tela.width, 4))
    rgba[..., :3] = col.clip(0, 255)
    rgba[..., 3] = fm * 255
    im = Image.fromarray(rgba.astype('uint8')).rotate(rot, resample=Image.BICUBIC, expand=True)
    return im.resize((im.width // S, im.height // S), Image.LANCZOS)


def con_semi(foto, ogg_h, ogg_w, disposizione):
    """Aggiunge i semi sul piano davanti alla busta, con la loro ombra."""
    W, H = foto.size
    base = foto.convert('RGBA')
    for (fx, fy, lung, rot, s) in disposizione:
        x, y = W / 2 + fx * ogg_w, H * 0.92 + fy
        sm = seme(lung, rot, s)
        ombra = Image.new('RGBA', base.size, (0, 0, 0, 0))
        ImageDraw.Draw(ombra).ellipse((x - lung * 0.55, y - lung * 0.05, x + lung * 0.6, y + lung * 0.32), fill=(0, 0, 0, 190))
        base.alpha_composite(ombra.filter(ImageFilter.GaussianBlur(lung * 0.12)))
        base.alpha_composite(sm, (round(x - sm.width / 2), round(y - sm.height * 0.62)))
    return base.convert('RGB')


SEMI = [
    dict(file='semi-lemon-haze', nome=['LEMON', 'HAZE'], thc='25%', cbd='2%'),
    dict(file='semi-gorilla-glue', nome=['GORILLA', 'GLUE'], thc='27%', cbd='1%'),
    dict(file='semi-wedding-cake', nome=['WEDDING', 'CAKE'], thc='26%', cbd='1%'),
    dict(file='semi-runtz', nome=['RUNTZ'], thc='24%', cbd='1%'),
    dict(file='semi-og-kush', nome=['OG', 'KUSH'], thc='23%', cbd='1%'),
    dict(file='semi-acdc', nome=['ACDC'], thc='1%', cbd='20%'),
    dict(file='semi-critical-mass-cbd', nome=['CRITICAL', 'MASS'], thc='1%', cbd='16%'),
]

# (posizione x rispetto alla larghezza della busta, spostamento y, lunghezza px, rotazione, seme)
DISPOSIZIONE = [(-0.62, 34, 74, 18, 1), (-0.48, 58, 82, -12, 2), (0.58, 46, 78, 150, 3)]

if __name__ == '__main__':
    import sys

    solo = set(sys.argv[1:])
    for p in SEMI:
        if solo and p['file'] not in solo:
            continue
        ogg = scontorna(fronte(p))
        foto = pack.scena(ogg)
        s = 1200 * 0.84 / ogg.height
        foto = con_semi(foto, ogg.height * s, ogg.width * s, DISPOSIZIONE)
        foto.save(USCITA / f"{p['file']}.jpg", quality=84, optimize=True, progressive=True)
        print('ok', p['file'])
