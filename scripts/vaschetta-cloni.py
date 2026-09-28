# Cloni The Hasher dalla vaschetta di Lorenzo: cambia la genetica sulla fascia, porta la vaschetta
# sulla scena scura dei pack e mette una talea fuori dalla confezione, appoggiata sul piano.
# La talea è ricomposta dalla foto stessa: foglie di una pianta e un cubetto con le radici.
#
# Uso: python3 scripts/vaschetta-cloni.py [nome-file ...]
import importlib.util
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

RADICE = Path(__file__).resolve().parent.parent
USCITA = RADICE / 'public/images/prodotti'
BOZZA = RADICE / 'design/inputs/cloni/vaschetta-cloni-bozza.png'


def _modulo(nome, file):
    spec = importlib.util.spec_from_file_location(nome, RADICE / 'scripts' / file)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


pack = _modulo('pack', 'pack-hasher.py')
busta = _modulo('busta', 'busta-gummies.py')

GIALLO = (238, 244, 20)
VASCHETTA = (122, 104, 1034, 1258)  # contorno della vaschetta nella bozza
RAGGIO = 64


def vaschetta(p):
    a = np.asarray(Image.open(BOZZA).convert('RGB')).astype(float)
    ai = a.astype(int)
    if p['nome'] != 'LEMON HAZE':
        t = ai[805:862, 380:740]
        m = (t[:, :, 2] < 120) & (t[:, :, 1] > 160) & (t[:, :, 0] > 140)
        piena = np.zeros(a.shape[:2], bool)
        piena[805:862, 380:740] = ndimage.binary_dilation(m, iterations=4)
        busta.riempi_nero(a, piena)
    img = Image.fromarray(a.clip(0, 255).astype('uint8')).convert('RGBA')
    if p['nome'] != 'LEMON HAZE':
        busta.testo(img, p['nome'], 'archivo-bold.ttf', 560, 816, 37, GIALLO, larg_max=420, spazio=0.14)
    x0, y0, x1, y1 = VASCHETTA
    m = Image.new('L', img.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((x0, y0, x1, y1), radius=RAGGIO, fill=255)
    img.putalpha(m.filter(ImageFilter.GaussianBlur(2.5)))
    return img.crop((x0 - 4, y0 - 4, x1 + 4, y1 + 4))


def sfuma_bordi(alfa, margine):
    """Alfa che si spegne verso i bordi del ritaglio: le foglie tagliate finiscono nell'ombra."""
    h, w = alfa.shape
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.minimum.reduce([xx, w - 1 - xx, yy + margine * 3, h - 1 - yy + margine * 3])
    return alfa * np.clip(d / margine, 0, 1)


def talea():
    src = np.asarray(Image.open(BOZZA).convert('RGB')).astype(float)

    # le foglie della pianta più a destra
    fx0, fy0, fx1, fy1 = 690, 180, 950, 442
    fo = src[fy0:fy1, fx0:fx1]
    r, g, b = fo[..., 0], fo[..., 1], fo[..., 2]
    mx, mn = fo.max(2), fo.min(2)
    sat = (mx - mn) / np.maximum(mx, 1)
    verde = (g > r * 1.08) & (g > b * 1.1) & (sat > 0.22) & (mx > 28)
    verde = ndimage.binary_closing(verde, iterations=2)
    verde = ndimage.binary_opening(verde, iterations=1)
    lab, n = ndimage.label(verde)
    if n:
        grandi = np.bincount(lab.ravel())
        grandi[0] = 0
        verde = np.isin(lab, np.where(grandi > 400)[0])
    alfa_f = ndimage.gaussian_filter(verde.astype(float), 0.8)
    alfa_f = sfuma_bordi(alfa_f, 26)
    foglie = np.dstack([fo, alfa_f * 255])

    # il cubetto di lana di roccia con le radici
    cx0, cy0, cx1, cy1 = 818, 1038, 954, 1186
    cu = src[cy0:cy1, cx0:cx1]
    cm = Image.new('L', (cx1 - cx0, cy1 - cy0), 0)
    ImageDraw.Draw(cm).rounded_rectangle((2, 2, cx1 - cx0 - 3, cy1 - cy0 - 3), radius=14, fill=255)
    cubo = np.dstack([cu, np.asarray(cm.filter(ImageFilter.GaussianBlur(1.5))).astype(float)])
    # luce da sinistra sul cubetto, per staccarlo dal fondo
    ombra = np.linspace(1.12, 0.78, cubo.shape[1])[None, :, None]
    cubo[..., :3] *= ombra

    # stelo: dal centro delle foglie al centro del cubetto
    fw, fh = foglie.shape[1], foglie.shape[0]
    cw, ch = cubo.shape[1], cubo.shape[0]
    stelo_h = 46
    W = max(fw, cw) + 20
    H = fh + stelo_h + ch - 30
    tela = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    cx = W / 2
    st = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(st)
    top, bot = fh - 70, fh + stelo_h - 24
    # stelo tondo: più chiaro a sinistra, più scuro a destra, colore dei gambi nella foto
    for i in range(7):
        k = i / 6
        c = (round(92 - 40 * k), round(128 - 48 * k), round(62 - 26 * k), 255)
        d.line((cx - 3 + i, top, cx - 2 + i * 0.95, bot), fill=c, width=2)
    st = st.filter(ImageFilter.GaussianBlur(0.7))
    tela.alpha_composite(st)
    tela.alpha_composite(Image.fromarray(cubo.clip(0, 255).astype('uint8'), 'RGBA'), (round(cx - cw / 2), fh + stelo_h - 30))
    tela.alpha_composite(Image.fromarray(foglie.clip(0, 255).astype('uint8'), 'RGBA'), (round(cx - 140), 0))
    return tela


def composizione(p):
    v = vaschetta(p)
    t = talea()
    s = v.height * 0.46 / t.height
    t = t.resize((round(t.width * s), round(t.height * s)), Image.LANCZOS)
    sporge = round(t.width * 0.55)
    avanti = round(v.height * 0.03)
    tela = Image.new('RGBA', (v.width + sporge, v.height + avanti), (0, 0, 0, 0))
    tela.alpha_composite(v, (0, 0))
    # ombra della talea sulla vaschetta
    om = Image.new('RGBA', tela.size, (0, 0, 0, 0))
    om.paste(Image.new('RGBA', t.size, (0, 0, 0, 170)), (tela.width - t.width - 30, tela.height - t.height), t.split()[3])
    om = om.filter(ImageFilter.GaussianBlur(18))
    tela.alpha_composite(om)
    tela.alpha_composite(t, (tela.width - t.width, tela.height - t.height))
    return tela


CLONI = [
    dict(file='cloni-lemon-haze', nome='LEMON HAZE'),
    dict(file='cloni-gelato-41', nome='GELATO 41'),
    dict(file='cloni-runtz', nome='RUNTZ'),
    dict(file='cloni-acdc', nome='ACDC CBD'),
    dict(file='cloni-harlequin', nome='HARLEQUIN CBD'),
]

if __name__ == '__main__':
    import sys

    solo = set(sys.argv[1:])
    for p in CLONI:
        if solo and p['file'] not in solo:
            continue
        foto = pack.scena(composizione(p))
        foto.save(USCITA / f"{p['file']}.jpg", quality=84, optimize=True, progressive=True)
        print('ok', p['file'])
