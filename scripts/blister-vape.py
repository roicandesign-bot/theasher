# Blister The Hasher per vape usa e getta e cartucce, dalle bozze di Lorenzo.
# Cambia percentuale, cannabinoide, gusto (e «FULL SPECTRUM» dove serve), poi sfondo scuro dei pack.
#
# Uso: python3 scripts/blister-vape.py [nome-file ...]
# Legge design/inputs/vape/blister-{vape,cartuccia}-bozza.png e scrive in public/images/prodotti/.
import importlib.util
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
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

BIANCO = (245, 245, 245)
GIALLO = (234, 251, 3)
NERO = (14, 14, 13)
rng = np.random.default_rng(5)

# Riquadri delle scritte nella bozza (x0, y0, x1, y1), misurati sulle immagini 1254×1254.
BOZZE = {
    'vape': dict(
        file='design/inputs/vape/blister-vape-bozza.png',
        box=(509, 466, 775, 585),  # riquadro giallo della percentuale
        sigla=(498, 594, 782, 734),
        gusto=(512, 896, 772, 944),
        qualita=(508, 972, 782, 1002),
        qualita_colore='giallo',
        taglio=None,
    ),
    'cartuccia': dict(
        file='design/inputs/vape/blister-cartuccia-bozza.png',
        box=(566, 524, 800, 641),
        sigla=(556, 646, 830, 760),
        gusto=(560, 885, 830, 938),
        qualita=(560, 957, 830, 986),
        qualita_colore='bianco',
        taglio=880,  # la cartuccia sciolta ha il bocchino bianco: si tiene solo il blister
    ),
}


def ingombro(maschera):
    ys, xs = np.where(maschera)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def lettere(a, box, colore):
    """Maschera delle lettere nel riquadro (senza dilatazione) e il loro ingombro."""
    x0, y0, x1, y1 = box
    t = a[y0:y1, x0:x1]
    if colore == 'giallo':
        m = (t[:, :, 2] < 120) & (t[:, :, 1] > 160) & (t[:, :, 0] > 140)
    elif colore == 'nero':
        m = t.sum(2) < 260
    else:
        m = (t.min(2) > 150) & ((t.max(2) - t.min(2)) < 45)
    lab, n = ndimage.label(m)
    tieni = np.zeros_like(m)
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if len(ys) < 12:
            continue
        if ys.min() == 0 or xs.min() == 0 or ys.max() == m.shape[0] - 1 or xs.max() == m.shape[1] - 1:
            continue
        tieni |= lab == i
    piena = np.zeros(a.shape[:2], bool)
    piena[y0:y1, x0:x1] = tieni
    return piena


def riempi_giallo(a, maschera, box):
    x0, y0, x1, y1 = box
    fascia = a[y0:y1, x0:x1]
    gialli = (fascia[:, :, 2] < 120) & (fascia[:, :, 0] > 150)
    ys, xs = np.where(maschera)
    for x in np.unique(xs):
        col = fascia[:, x - x0][gialli[:, x - x0]]
        base = np.median(col, 0) if len(col) else np.array(GIALLO)
        a[ys[xs == x], x] = base


def blister(p):
    b = BOZZE[p['formato']]
    a = np.asarray(Image.open(RADICE / b['file']).convert('RGB')).astype(float)
    ai = a.astype(int)

    # misure delle scritte originali, per rimettere le nuove allo stesso posto e alla stessa altezza
    m_pct = lettere(ai, b['box'], 'nero')
    m_sig = lettere(ai, b['sigla'], 'bianco')
    m_gus = lettere(ai, b['gusto'], 'bianco')
    m_qua = lettere(ai, b['qualita'], b['qualita_colore'])
    g_pct, g_sig, g_gus, g_qua = (ingombro(m) for m in (m_pct, m_sig, m_gus, m_qua))

    riempi_giallo(a, ndimage.binary_dilation(m_pct, iterations=2) & _dentro(a, b['box']), b['box'])
    for m in (m_sig, m_gus) + ((m_qua,) if p.get('qualita') else ()):
        busta.riempi_nero(a, ndimage.binary_dilation(m, iterations=3))

    img = Image.fromarray(a.clip(0, 255).astype('uint8')).convert('RGBA')
    cx_box = (b['box'][0] + b['box'][2]) / 2
    busta.testo(img, p['pct'], 'archivo-black-cond.ttf', cx_box, g_pct[1], g_pct[3] - g_pct[1], NERO,
                larg_max=(b['box'][2] - b['box'][0]) * 0.8)
    cx = (g_sig[0] + g_sig[2]) / 2
    busta.testo(img, p['sigla'], 'archivo-black-cond.ttf', cx, g_sig[1], g_sig[3] - g_sig[1], BIANCO,
                larg_max=g_sig[2] - g_sig[0] + 6)
    busta.testo(img, p['gusto'], 'archivo-black-cond.ttf', (g_gus[0] + g_gus[2]) / 2, g_gus[1],
                g_gus[3] - g_gus[1], BIANCO, larg_max=b['gusto'][2] - b['gusto'][0] - 8)
    if p.get('qualita'):
        colore = GIALLO if b['qualita_colore'] == 'giallo' else BIANCO
        busta.testo(img, p['qualita'], 'archivo-bold.ttf', (g_qua[0] + g_qua[2]) / 2, g_qua[1],
                    g_qua[3] - g_qua[1], colore, larg_max=g_qua[2] - g_qua[0] + 10, spazio=0.22)
    return np.asarray(img.convert('RGB')).astype(int), b['taglio']


def _dentro(a, box):
    m = np.zeros(a.shape[:2], bool)
    x0, y0, x1, y1 = box
    m[y0 + 3 : y1 - 3, x0 + 3 : x1 - 3] = True
    return m


def scontorna(a, taglio):
    h, w, _ = a.shape
    chiaro = (a.min(2) > 110) & ((a.max(2) - a.min(2)) < 24)
    fuori = np.zeros((h, w), bool)
    coda = deque()
    for x in range(w):
        for y in (0, h - 1):
            if chiaro[y, x]:
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
    # il foro per appendere il blister
    lab, n = ndimage.label(chiaro & ~fuori)
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if ys.max() < 230 and len(ys) > 1500:
            fuori |= lab == i
    dentro = ~fuori
    if taglio:
        dentro[:, taglio:] = False
    m = Image.fromarray((dentro * 255).astype('uint8')).filter(ImageFilter.MinFilter(3))
    m = m.filter(ImageFilter.GaussianBlur(0.8))
    img = Image.fromarray(a.clip(0, 255).astype('uint8')).convert('RGBA')
    img.putalpha(m)
    return img.crop(img.getbbox())


VAPE = [
    # vape usa e getta, 0,5 ml
    dict(file='vape-amnesia-thcx', formato='vape', pct='95%', sigla='THC-X', gusto='AMNESIA HAZE'),
    dict(file='vape-gelato-thca', formato='vape', pct='90%', sigla='THC-A', gusto='GELATO 41'),
    dict(file='vape-lemon-haze', formato='vape', pct='85%', sigla='CBD', gusto='LEMON HAZE', qualita='FULL SPECTRUM'),
    dict(file='vape-notte', formato='vape', pct='70%', sigla='CBD+CBN', gusto='BLUEBERRY', qualita='NIGHT FORMULA'),
    # cartucce, 1 ml
    dict(file='vape-zkittlez', formato='cartuccia', pct='95%', sigla='THC-X', gusto='ZKITTLEZ'),
    dict(file='cartuccia-wedding-cake-thca', formato='cartuccia', pct='92%', sigla='THC-A', gusto='WEDDING CAKE'),
    dict(file='cartuccia-mango-kush-cbd', formato='cartuccia', pct='85%', sigla='CBD', gusto='MANGO KUSH', qualita='FULL SPECTRUM'),
    dict(file='cartuccia-purple-punch-cbn', formato='cartuccia', pct='70%', sigla='CBD+CBN', gusto='PURPLE PUNCH', qualita='NIGHT FORMULA'),
]

if __name__ == '__main__':
    import sys

    solo = set(sys.argv[1:])
    for p in VAPE:
        if solo and p['file'] not in solo:
            continue
        a, taglio = blister(p)
        foto = pack.scena(scontorna(a, taglio))
        foto.save(USCITA / f"{p['file']}.jpg", quality=84, optimize=True, progressive=True)
        print('ok', p['file'])
