# Pack The Hasher (scatola) dalla bozza del preroll: cambia le scritte e mette il prodotto su sfondo scuro.
#
# Uso: python3 scripts/pack-hasher.py
# Legge design/inputs/preroll/pack-bozza.png e scrive le foto in public/images/prodotti/.
# La lista dei pack è in fondo al file: nome, linea, percentuale, tipo, genetica, formato.
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

RADICE = Path(__file__).resolve().parent.parent
BOZZA = RADICE / 'design/inputs/preroll/pack-bozza.png'
USCITA = RADICE / 'public/images/prodotti'
FONT = RADICE / 'scripts/fonts'

BIANCO = (246, 246, 244)
GIALLO = (237, 244, 10)
NERO = (16, 16, 15)
rng = np.random.default_rng(7)


def font(nome, px):
    return ImageFont.truetype(str(FONT / nome), px)


# ---------------------------------------------------------------- cancellare le scritte


def fondo_nero(a, x0, x1, y0, y1):
    """Riempie con il nero del pack, colonna per colonna, più un filo di grana."""
    fascia = a[430:900, x0:x1]
    scuri = fascia.sum(2) < 90
    for i in range(x1 - x0):
        col = fascia[:, i][scuri[:, i]]
        base = np.median(col, 0) if len(col) else np.array(NERO)
        a[y0:y1, x0 + i] = base
    a[y0:y1, x0:x1] += rng.normal(0, 3.2, (y1 - y0, x1 - x0, 1))


def fondo_giallo(a, x0, x1, y0, y1):
    fascia = a[576:615, x0:x1]
    gialli = (fascia[:, :, 2] < 110) & (fascia[:, :, 0] > 150)
    for i in range(x1 - x0):
        col = fascia[:, i][gialli[:, i]]
        a[y0:y1, x0 + i] = np.median(col, 0) if len(col) else np.array(GIALLO)
    a[y0:y1, x0:x1] += rng.normal(0, 1.5, (y1 - y0, x1 - x0, 1))


# ---------------------------------------------------------------- scrivere


def testo(img, s, nome_font, cx, y, alt, colore, larg_max=None, spazio=0.0):
    """Scrive `s` centrato su cx, con l'altezza delle lettere `alt` e spaziatura in em."""
    S = 4
    f = font(nome_font, int(alt * S * 1.45))
    ink = f.getbbox('H')
    tela = Image.new('L', (int(len(s) * alt * S * 1.6) + 40, int(alt * S * 2.2)), 0)
    d = ImageDraw.Draw(tela)
    x = 10
    for ch in s:
        d.text((x, 10), ch, font=f, fill=255)
        x += f.getlength(ch) + spazio * alt * S
    box = tela.getbbox()
    tela = tela.crop((box[0], 10 + ink[1], box[2], 10 + ink[3]))
    w = tela.width * alt / tela.height
    h = alt
    if larg_max and w > larg_max:
        # prima stringe fino all'85 %, poi rimpicciolisce
        stretto = max(larg_max / w, 0.85)
        w *= stretto
        if w > larg_max:
            h *= larg_max / w
            w = larg_max
    tela = tela.resize((max(1, round(w)), max(1, round(h))), Image.LANCZOS)
    strato = Image.new('RGBA', tela.size, colore + (0,))
    strato.putalpha(tela)
    img.alpha_composite(strato, (round(cx - tela.width / 2), round(y + (alt - h) / 2)))


def pack(p):
    a = np.asarray(Image.open(BOZZA).convert('RGB')).astype(float)
    CX = 495.5

    fondo_nero(a, 372, 616, 446, 568)  # linea (THC-X)
    fondo_nero(a, 372, 619, 622, 823)  # nome
    fondo_giallo(a, 389, 601, 578, 613)  # «CONTIENE 40 %»
    fondo_nero(a, 452, 541, 893, 921)  # genetica
    fondo_nero(a, 466, 528, 1093, 1136)  # formato
    fondo_nero(a, 562, 614, 1167, 1211)  # «100 % legal»
    if p['tipo'] != 'PRE-ROLL':
        fondo_nero(a, 425, 566, 851, 890)

    img = Image.fromarray(a.clip(0, 255).astype('uint8')).convert('RGBA')
    testo(img, p['linea'], 'archivo-black-cond.ttf', CX, 454, 109, BIANCO, larg_max=226)
    testo(img, p['contiene'], 'archivo-xbold-cond.ttf', CX, 582, 28, NERO, larg_max=196)
    righe = p['nome']
    if len(righe) == 1:
        testo(img, righe[0], 'archivo-black-cond.ttf', CX, 680, 84, BIANCO, larg_max=230)
    else:
        testo(img, righe[0], 'archivo-black-cond.ttf', CX, 628, 80, BIANCO, larg_max=230)
        testo(img, righe[1], 'archivo-black-cond.ttf', CX, 736, 80, BIANCO, larg_max=230)
    if p['tipo'] != 'PRE-ROLL':
        testo(img, p['tipo'], 'archivo-bold.ttf', CX, 856, 29, BIANCO, larg_max=150, spazio=0.12)
    testo(img, p['genetica'], 'archivo-bold.ttf', CX, 898, 17, GIALLO, larg_max=96, spazio=0.28)
    testo(img, p['formato'], 'archivo-xbold-cond.ttf', CX + 1, 1100, 29, GIALLO, larg_max=56)
    testo(img, 'LAB', 'archivo-xbold-cond.ttf', 588, 1171, 16, BIANCO)
    testo(img, 'TESTED', 'archivo-xbold-cond.ttf', 588, 1191, 16, BIANCO, larg_max=44)
    return img.convert('RGB'), p.get('con_preroll', False)


# ---------------------------------------------------------------- scontorno e scena


def scontorna(img, con_preroll):
    a = np.asarray(img).astype(int)
    h, w, _ = a.shape
    # chiaro e grigio neutro: il bianco dello studio e le ombre morbide sotto gli oggetti
    chiaro = (a.min(2) > 110) & ((a.max(2) - a.min(2)) < 24)
    # sfondo = zona chiara collegata ai bordi (le scritte bianche restano dentro al pack)
    from collections import deque

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
    dentro = ~fuori
    if not con_preroll:
        dentro[:, 660:] = False
    m = Image.fromarray((dentro * 255).astype('uint8')).filter(ImageFilter.MinFilter(3))
    m = m.filter(ImageFilter.GaussianBlur(0.8))
    out = img.convert('RGBA')
    out.putalpha(m)
    return out.crop(out.getbbox())


def scena(ogg, larghezza=1600, altezza=1200):
    """Sfondo scuro come le altre foto: piano di pietra, alone giallo, ombra e riflesso."""
    W, H = larghezza, altezza
    y = np.linspace(0, 1, H)[:, None]
    x = np.linspace(-1, 1, W)[None, :]
    orizzonte = 0.74
    cielo = 9 + 14 * (y / orizzonte)
    piano = 26 - 16 * ((y - orizzonte) / (1 - orizzonte))
    base = np.where(y < orizzonte, cielo, piano) * (1 - 0.35 * x**2)
    base = np.repeat(base[:, :, None], 3, 2) * np.array([1.0, 1.0, 0.96])
    # grana di pietra sul piano
    grana = rng.normal(0, 1, (H // 4, W // 4))
    grana = np.asarray(Image.fromarray(((grana + 4) * 30).clip(0, 255).astype('uint8')).resize((W, H), Image.BICUBIC)).astype(float) / 30 - 4
    base += ((y >= orizzonte) * grana)[:, :, None] * 2.2
    fondo = Image.fromarray(base.clip(0, 255).astype('uint8')).convert('RGBA')

    # alone giallo dietro al prodotto
    alone = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(alone).ellipse((W * 0.30, H * 0.10, W * 0.70, H * 0.80), fill=(223, 255, 0, 78))
    fondo.alpha_composite(alone.filter(ImageFilter.GaussianBlur(160)))

    # prodotto: alto l'84 % della foto, poggiato sul piano
    s = H * 0.84 / ogg.height
    o = ogg.resize((round(ogg.width * s), round(ogg.height * s)), Image.LANCZOS)
    o = Image.fromarray((np.asarray(o).astype(float) * [0.93, 0.93, 0.93, 1]).astype('uint8'))
    ox = (W - o.width) // 2
    oy = round(H * 0.92) - o.height

    # riflesso sul piano
    rifl = o.transpose(Image.FLIP_TOP_BOTTOM)
    ra = np.asarray(rifl).astype(float)
    sfuma = np.clip(1 - np.linspace(0, 1, rifl.height) * 4.5, 0, 1)[:, None]
    ra[:, :, 3] *= sfuma * 0.16
    fondo.alpha_composite(Image.fromarray(ra.astype('uint8')), (ox, oy + o.height))

    # ombra di contatto
    ombra = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(ombra).ellipse((ox - 20, oy + o.height - 16, ox + o.width + 20, oy + o.height + 22), fill=(0, 0, 0, 200))
    fondo.alpha_composite(ombra.filter(ImageFilter.GaussianBlur(14)))

    # filo di luce gialla sul bordo destro degli oggetti
    bordo = np.asarray(o.split()[3]).astype(float) / 255
    sposta = np.roll(bordo, -3, axis=1)
    luce = np.clip(bordo - sposta, 0, 1)
    strato = np.zeros((o.height, o.width, 4))
    strato[:, :, 0], strato[:, :, 1], strato[:, :, 2] = 223, 255, 0
    strato[:, :, 3] = luce * 150
    fondo.alpha_composite(o, (ox, oy))
    fondo.alpha_composite(Image.fromarray(strato.astype('uint8')).filter(ImageFilter.GaussianBlur(1.2)), (ox, oy))

    # vignettatura e grana, come il trattamento delle altre foto
    v = np.asarray(fondo.convert('RGB')).astype(float)
    yy, xx = np.mgrid[0:H, 0:W]
    dist = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
    v *= (1 - 0.38 * np.clip(dist - 0.35, 0, 1) ** 1.4)[:, :, None]
    v += rng.normal(0, 3.0, (H, W, 1))
    return Image.fromarray(v.clip(0, 255).astype('uint8'))


PACK = [
    # preroll
    dict(file='preroll-silver-haze', linea='CBD', contiene='CONTIENE 18%', nome=['SILVER', 'HAZE'], tipo='PRE-ROLL', genetica='SATIVA', formato='1G', con_preroll=True),
    dict(file='preroll-amnesia', linea='CBD', contiene='CONTIENE 20%', nome=['AMNESIA'], tipo='PRE-ROLL', genetica='SATIVA', formato='1G', con_preroll=True),
    dict(file='preroll-gelato-41', linea='CBD', contiene='CONTIENE 22%', nome=['GELATO', '41'], tipo='PRE-ROLL', genetica='IBRIDA', formato='1G', con_preroll=True),
    dict(file='preroll-orange-bud', linea='CBD', contiene='CONTIENE 16%', nome=['ORANGE', 'BUD'], tipo='PRE-ROLL', genetica='SATIVA', formato='3X1G', con_preroll=True),
    dict(file='preroll-mimosa', linea='THC-X', contiene='CONTIENE 40%', nome=['MIMOSA'], tipo='PRE-ROLL', genetica='SATIVA', formato='2G', con_preroll=True),
    dict(file='preroll-purple-punch', linea='THC-X', contiene='CONTIENE 40%', nome=['PURPLE', 'PUNCH'], tipo='PRE-ROLL', genetica='INDICA', formato='2G', con_preroll=True),
    # edibles (le gommose sono in busta: scripts/busta-gummies.py)
    dict(file='edibles-lemon-drop', linea='CBD', contiene='25 MG A PEZZO', nome=['LEMON', 'DROP'], tipo='CARAMELLE', genetica='20 PEZZI', formato='20PZ'),
    # semi: buste vere in scripts/busta-semi.py
    # oli: la foto finale con la boccetta la fa scripts/boccetta-olio.py (usa queste righe per la scatola)
    dict(file='olio-full-spectrum', linea='CBD', contiene='CONTIENE 20%', nome=['FULL', 'SPECTRUM'], tipo='OLIO', genetica='CONTAGOCCE', formato='10ML'),
    dict(file='olio-cbn-notte', linea='CBN', contiene='CONTIENE 10%', nome=['NOTTE'], tipo='OLIO', genetica='THC FREE', formato='10ML'),
    # cannagar
    dict(file='cannagar-gelato-41', linea='CBD', contiene='CONTIENE 21%', nome=['GELATO', '41'], tipo='CANNAGAR', genetica='CLASSICO', formato='3G'),
    dict(file='cannagar-royal', linea='CBD', contiene='CONTIENE 28%', nome=['ROYAL'], tipo='CANNAGAR', genetica='CON HASH', formato='4G'),
    dict(file='cannagar-mimosa', linea='THC-X', contiene='CONTIENE 42%', nome=['MIMOSA'], tipo='CANNAGAR', genetica='CON HASH', formato='4G'),
    # linea THC-A
    dict(file='preroll-og-kush-thca', linea='THC-A', contiene='CONTIENE 26%', nome=['OG', 'KUSH'], tipo='PRE-ROLL', genetica='IBRIDA', formato='1G', con_preroll=True),
    # cloni: vaschetta vera in scripts/vaschetta-cloni.py
]

if __name__ == '__main__':
    import sys

    USCITA.mkdir(parents=True, exist_ok=True)
    solo = set(sys.argv[1:])
    for p in PACK:
        if solo and p['file'] not in solo:
            continue
        img, con = pack(p)
        foto = scena(scontorna(img, con))
        foto.save(USCITA / f"{p['file']}.jpg", quality=84, optimize=True, progressive=True)
        print('ok', p['file'])
