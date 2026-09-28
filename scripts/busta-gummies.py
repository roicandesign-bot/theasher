# Buste delle gommose The Hasher dalla bozza «Green Apple» di Lorenzo.
# Cambia gusto, linea e scritte, ricolora le gommose e mette la busta sullo sfondo scuro dei pack.
#
# Uso: python3 scripts/busta-gummies.py
# Legge design/inputs/edibles/busta-gummies-bozza.png e scrive in public/images/prodotti/.
import importlib.util
import math
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from scipy import ndimage

RADICE = Path(__file__).resolve().parent.parent
BOZZA = RADICE / 'design/inputs/edibles/busta-gummies-bozza.png'
USCITA = RADICE / 'public/images/prodotti'
FONT = RADICE / 'scripts/fonts'

# la scena (sfondo scuro, alone giallo, riflesso) è la stessa dei pack
_spec = importlib.util.spec_from_file_location('pack', RADICE / 'scripts/pack-hasher.py')
pack = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(pack)

BIANCO = (245, 245, 245)
GIALLO = (234, 251, 3)
rng = np.random.default_rng(11)


def font(nome, px):
    return ImageFont.truetype(str(FONT / nome), px)


# ---------------------------------------------------------------- cancellare


def maschera_testo(a, box, colore):
    """Lettere dentro al riquadro: componenti del colore giusto che non toccano il bordo."""
    x0, y0, x1, y1 = box
    t = a[y0:y1, x0:x1]
    if colore == 'giallo':
        m = (t[:, :, 2] < 120) & (t[:, :, 1] > 160) & (t[:, :, 0] > 140)
    else:
        m = (t.min(2) > 150) & ((t.max(2) - t.min(2)) < 45)
    lab, n = ndimage.label(m)
    tieni = np.zeros_like(m)
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        bordo = ys.min() == 0 or xs.min() == 0 or ys.max() == m.shape[0] - 1 or xs.max() == m.shape[1] - 1
        if not bordo:
            tieni |= lab == i
    fuori = m & ~tieni  # decorazioni che toccano il bordo: da non toccare
    via = ndimage.binary_dilation(tieni, iterations=3) & ~ndimage.binary_dilation(fuori, iterations=1)
    piena = np.zeros(a.shape[:2], bool)
    piena[y0:y1, x0:x1] = via
    return piena


def riempi_nero(a, maschera):
    """Sostituisce i pixel della maschera con il nero della busta, colonna per colonna."""
    ys, xs = np.where(maschera)
    if not len(ys):
        return
    fascia = a[max(0, ys.min() - 60) : ys.max() + 60]
    for x in np.unique(xs):
        col = fascia[:, x]
        scuri = col[col.sum(1) < 80]
        base = np.median(scuri, 0) if len(scuri) else np.array([14, 14, 13])
        righe = ys[xs == x]
        a[righe, x] = base + rng.normal(0, 2.6, (len(righe), 1))


# ---------------------------------------------------------------- scrivere


def testo(img, s, nome_font, x, y, alt, colore, larg_max=None, spazio=0.0, ancora='centro'):
    S = 4
    f = font(nome_font, int(alt * S * 1.45))
    ink = f.getbbox('H')
    tela = Image.new('L', (int(len(s) * alt * S * 1.8) + 40, int(alt * S * 2.2)), 0)
    d = ImageDraw.Draw(tela)
    cx = 10
    for ch in s:
        d.text((cx, 10), ch, font=f, fill=255)
        cx += f.getlength(ch) + spazio * alt * S
    box = tela.getbbox()
    tela = tela.crop((box[0], 10 + ink[1], box[2], 10 + ink[3]))
    w, h = tela.width * alt / tela.height, alt
    if larg_max and w > larg_max:
        stretto = max(larg_max / w, 0.85)
        w *= stretto
        if w > larg_max:
            h *= larg_max / w
            w = larg_max
    tela = tela.resize((max(1, round(w)), max(1, round(h))), Image.LANCZOS)
    strato = Image.new('RGBA', tela.size, colore + (0,))
    strato.putalpha(tela)
    px = x - tela.width / 2 if ancora == 'centro' else x
    img.alpha_composite(strato, (round(px), round(y + (alt - h) / 2)))


def testo_ad_arco(img, s, centro, raggio, alt, colore, da=140, a=40):
    """Scritta sull'arco in basso del bollino, da sinistra a destra, lettere verso il centro."""
    S = 4
    f = font('archivo-bold.ttf', int(alt * S * 1.45))
    larghezze = [f.getlength(ch) / S * alt / (alt * 1.45) * 1.45 for ch in s]
    totale = sum(larghezze) + 0.6 * alt * (len(s) - 1)
    passo = math.degrees(totale / raggio)
    inizio = 90 + passo / 2
    cursore = 0.0
    for ch, lw in zip(s, larghezze):
        theta = inizio - math.degrees((cursore + lw / 2) / raggio)
        cursore += lw + 0.6 * alt
        if ch == ' ':
            continue
        g = Image.new('L', (int(alt * S * 3), int(alt * S * 3)), 0)
        ImageDraw.Draw(g).text((g.width / 2, g.height / 2), ch, font=f, fill=255, anchor='mm')
        g = g.rotate(90 - theta, resample=Image.BICUBIC)
        g = g.resize((g.width // S, g.height // S), Image.LANCZOS)
        px = centro[0] + raggio * math.cos(math.radians(theta)) - g.width / 2
        py = centro[1] + raggio * math.sin(math.radians(theta)) - g.height / 2
        strato = Image.new('RGBA', g.size, colore + (0,))
        strato.putalpha(g)
        img.alpha_composite(strato, (round(px), round(py)))


# ---------------------------------------------------------------- gommose


def ricolora(a, tinta, saturazione=1.0):
    """Porta le gommose verdi alla tinta del gusto; zucchero e busta restano come sono."""
    rgb = a / 255.0
    mx, mn = rgb.max(2), rgb.min(2)
    delta = mx - mn
    sat = np.where(mx > 0, delta / np.maximum(mx, 1e-6), 0)
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    d = np.maximum(delta, 1e-6)
    h = np.where(
        mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)
    ) * 60
    # solo i pixel verdi (le gommose): il giallo della busta ha una tinta più bassa
    verdi = (h > 74) & (h < 170) & (sat > 0.18) & (mx > 0.15)
    s2 = np.clip(sat * saturazione, 0, 1)
    v = mx
    hh = tinta / 60.0
    i = int(hh) % 6
    f = hh - int(hh)
    p_ = v * (1 - s2)
    q = v * (1 - s2 * f)
    t = v * (1 - s2 * (1 - f))
    canali = [(v, t, p_), (q, v, p_), (p_, v, t), (p_, q, v), (t, p_, v), (v, p_, q)][i]
    nuovo = np.stack(canali, axis=2) * 255
    out = a.copy()
    out[verdi] = nuovo[verdi]
    return out


# ---------------------------------------------------------------- scontorno


def scontorna(a):
    h, w, _ = a.shape
    chiaro = (a.min(2) > 110) & ((a.max(2) - a.min(2)) < 24)
    fuori = np.zeros((h, w), bool)
    coda = deque()
    for x in range(w):
        for y in (0, h - 1):
            if chiaro[y, x] and not fuori[y, x]:
                fuori[y, x] = True
                coda.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if chiaro[y, x] and not fuori[y, x]:
                fuori[y, x] = True
                coda.append((y, x))
    while coda:
        y, x = coda.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and chiaro[ny, nx] and not fuori[ny, nx]:
                fuori[ny, nx] = True
                coda.append((ny, nx))
    # il foro per appendere la busta, in alto: è sfondo anche se è chiuso dal nero
    lab, n = ndimage.label(chiaro & ~fuori)
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if ys.max() < 230 and len(ys) > 1500:
            fuori |= lab == i
    m = Image.fromarray(((~fuori) * 255).astype('uint8')).filter(ImageFilter.MinFilter(3))
    m = m.filter(ImageFilter.GaussianBlur(0.8))
    img = Image.fromarray(a.clip(0, 255).astype('uint8')).convert('RGBA')
    img.putalpha(m)
    return img.crop(img.getbbox())


# ---------------------------------------------------------------- una busta


BADGE_C = (812, 965)


def busta(p):
    a = np.asarray(Image.open(BOZZA).convert('RGB')).astype(float)
    ai = a.astype(int)

    cambia = []
    if p['nome'] != 'GREEN APPLE':
        cambia.append(maschera_testo(ai, (378, 655, 884, 792), 'giallo'))
        cambia.append(maschera_testo(ai, (420, 1053, 640, 1078), 'bianco'))
    if p['linea'] != 'CBD':
        cambia.append(maschera_testo(ai, (420, 618, 834, 652), 'bianco'))
        cambia.append(maschera_testo(ai, (396, 969, 450, 992), 'bianco'))
    # la scritta storpiata sull'arco in basso del bollino
    yy, xx = np.mgrid[0 : a.shape[0], 0 : a.shape[1]]
    dx, dy = xx - BADGE_C[0], yy - BADGE_C[1]
    r = np.hypot(dx, dy)
    ang = np.degrees(np.arctan2(dy, dx))
    arco = (r > 58) & (r < 77) & (ang > 15) & (ang < 165)
    bianco = (ai.min(2) > 120) & ((ai.max(2) - ai.min(2)) < 60)
    cambia.append(ndimage.binary_dilation(arco & bianco, iterations=2) & arco)
    for m in cambia:
        riempi_nero(a, m)

    if p.get('tinta') is not None:
        a = ricolora(a, p['tinta'], p.get('saturazione', 1.0))

    img = Image.fromarray(a.clip(0, 255).astype('uint8')).convert('RGBA')
    if p['nome'] != 'GREEN APPLE':
        testo(img, p['nome'], 'archivo-black-cond.ttf', 627.5, 663, 117, GIALLO, larg_max=494)
        testo(img, f"{p['nome']} FLAVOR", 'archivo-bold.ttf', 430, 1060, 13, BIANCO, larg_max=200, spazio=0.2, ancora='sinistra')
    if p['linea'] != 'CBD':
        testo(img, f"PREMIUM {p['linea']} GUMMIES", 'archivo-bold.ttf', 626.5, 626, 19, BIANCO, larg_max=400, spazio=0.32)
        testo(img, p['linea'], 'archivo-bold.ttf', 403, 975, 12, BIANCO, spazio=0.12, ancora='sinistra')
    testo_ad_arco(img, 'LAB TESTED', BADGE_C, 66, 10.5, BIANCO)
    return np.asarray(img.convert('RGB')).astype(int)


BUSTE = [
    dict(file='edibles-green-apple', nome='GREEN APPLE', linea='CBD'),
    dict(file='edibles-mango', nome='MANGO KUSH', linea='THC-X', tinta=32, saturazione=1.35),
    dict(file='edibles-watermelon', nome='WATERMELON', linea='THC-X', tinta=352, saturazione=1.3),
]

if __name__ == '__main__':
    import sys

    solo = set(sys.argv[1:])
    for p in BUSTE:
        if solo and p['file'] not in solo:
            continue
        foto = pack.scena(scontorna(busta(p)))
        foto.save(USCITA / f"{p['file']}.jpg", quality=84, optimize=True, progressive=True)
        print('ok', p['file'])
