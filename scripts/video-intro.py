# Video di apertura della home: 12 secondi, tutto quello che è The Hasher.
# Montato fotogramma per fotogramma con le immagini del sito (filiera, azienda, pack, negozio),
# titoli in Anton, colori del brand. Chiude sul nero come apre: gira in loop senza stacco.
#
# Uso: python3 scripts/video-intro.py            # 16:9 e 9:16
#      python3 scripts/video-intro.py orizzontale
# Serve ffmpeg: pip install imageio-ffmpeg (lo script lo trova da solo).
import math
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

RADICE = Path(__file__).resolve().parent.parent
FONT = RADICE / 'scripts/fonts'
USCITA = RADICE / 'public/video'
FPS = 30
DURATA = 12.0

GIALLO = (223, 255, 0)
BIANCO = (245, 245, 240)
NERO = (8, 8, 8)


def ffmpeg():
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        return 'ffmpeg'


# ---------------------------------------------------------------- utilità


def ease_out(t):
    t = min(max(t, 0.0), 1.0)
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    t = min(max(t, 0.0), 1.0)
    return 3 * t * t - 2 * t * t * t


def carica(percorso):
    return Image.open(RADICE / percorso).convert('RGB')


def copertura(img, W, H, zoom=1.0, fx=0.5, fy=0.5):
    """Ritaglio «cover» con zoom e punto focale: il Ken Burns delle foto."""
    s = max(W / img.width, H / img.height) * zoom
    w, h = W / s, H / s
    x0 = (img.width - w) * fx
    y0 = (img.height - h) * fy
    return img.resize((W, H), Image.BICUBIC, box=(x0, y0, x0 + w, y0 + h))


def prodotto(img, W, H, zoom):
    """Il pack intero su nero: a destra del titolo in orizzontale, in alto in verticale."""
    verticale = H > W
    s = (H * (0.66 if verticale else 0.98) / img.height) * zoom
    im = img.resize((round(img.width * s), round(img.height * s)), Image.BICUBIC).convert('RGBA')
    # bordi sfumati: il fondo del pack si fonde col nero
    a = np.ones((im.height, im.width), np.float32)
    fx = np.clip(np.minimum(np.arange(im.width), im.width - 1 - np.arange(im.width)) / (im.width * 0.12), 0, 1)
    fy = np.clip(np.minimum(np.arange(im.height), im.height - 1 - np.arange(im.height)) / (im.height * 0.1), 0, 1)
    a = (fy[:, None] * fx[None, :]) ** 0.8
    im.putalpha(Image.fromarray((a * 255).astype('uint8')))
    tela = Image.new('RGBA', (W, H), NERO + (255,))
    cx, cy = (W / 2, H * 0.37) if verticale else (W * 0.64, H / 2)
    tela.alpha_composite(im, (round(cx - im.width / 2), round(cy - im.height / 2)))
    return tela.convert('RGB')


def testo_img(s, font, px, colore, spazio=0.0):
    f = ImageFont.truetype(str(FONT / font), px)
    larg = sum(f.getlength(c) for c in s) + spazio * px * (len(s) - 1)
    asc, disc = f.getmetrics()
    tela = Image.new('RGBA', (int(larg) + 8, asc + disc + 8), (0, 0, 0, 0))
    d = ImageDraw.Draw(tela)
    x = 4
    for c in s:
        d.text((x, 4), c, font=f, fill=colore + (255,))
        x += f.getlength(c) + spazio * px
    return tela.crop(tela.getbbox())


def rivela(base, riga, x, y, t, uscita=None):
    """La riga sale da sotto una maschera (come i titoli del sito) e, se serve, sparisce."""
    e = ease_out(t)
    if e <= 0:
        return
    h = riga.height
    dy = int((1 - e) * h * 1.05)
    vis = riga.crop((0, 0, riga.width, h - dy)) if dy < h else None
    if vis is None or vis.height <= 0:
        return
    if uscita is not None and uscita > 0:
        a = np.asarray(vis).copy()
        a[..., 3] = (a[..., 3] * (1 - ease_in_out(uscita))).astype('uint8')
        vis = Image.fromarray(a)
    base.alpha_composite(vis, (int(x), int(y + dy)))


class Grana:
    def __init__(self, W, H):
        rng = np.random.default_rng(1)
        self.frames = [rng.normal(0, 3.2, (H // 2, W // 2)).astype(np.float32) for _ in range(4)]
        self.W, self.H = W, H
        yy, xx = np.mgrid[0:H, 0:W]
        d = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
        self.vignetta = (1 - 0.42 * np.clip(d - 0.45, 0, 1) ** 1.3).astype(np.float32)[..., None]

    def applica(self, rgb, i):
        g = self.frames[(i // 2) % len(self.frames)]  # la grana cambia ogni 2 fotogrammi: file più leggero
        g = np.repeat(np.repeat(g, 2, 0), 2, 1)[: self.H, : self.W, None]
        return np.clip(rgb * self.vignetta + g, 0, 255)


def look(img):
    """Grade comune: neri profondi, colore un po' spento, come le foto della filiera."""
    a = np.asarray(img).astype(np.float32)
    grigio = a.mean(2, keepdims=True)
    a = grigio + (a - grigio) * 0.78
    a = np.clip((a - 14) * 1.12, 0, 255)
    return a


# ---------------------------------------------------------------- il montaggio


def monta(W, H, nome):
    verticale = H > W
    u = min(W, H) / 1080  # unità di misura: tutto scala col lato corto
    margine = int((80 if verticale else 120) * u)
    grana = Grana(W, H)

    logo = Image.open(RADICE / 'public/brand/logo-acid.png').convert('RGBA')
    logo_nero = Image.open(RADICE / 'public/brand/logo-black.png').convert('RGBA')

    def logo_a(larghezza, nero=False):
        src = logo_nero if nero else logo
        return src.resize((int(larghezza), int(larghezza * src.height / src.width)), Image.LANCZOS)

    tit = int((200 if verticale else 170) * u)
    sotto = int(30 * u)

    def titolo(righe):
        return [testo_img(r, 'anton.ttf', tit, GIALLO if i == len(righe) - 1 else BIANCO) for i, r in enumerate(righe)]

    def etichetta(s, colore=GIALLO):
        return testo_img(s, 'archivo-bold.ttf', sotto, colore, spazio=0.28)

    foto = {
        'campi': carica('design/inputs/azienda/campi-approvato.png'),
        'serra': carica('design/inputs/azienda/serra-svizzera-approvato.png'),
        'setaccio': carica('design/inputs/filiera/setacciatura-originale.jpg'),
        'pressa': carica('design/inputs/filiera/pressatura-originale.jpg'),
        'lab': carica('design/inputs/azienda/laboratorio-rosin-approvato.png'),
        'magazzino': carica('design/inputs/azienda/magazzino-approvato.png'),
        'negozio': carica('design/inputs/negozio/esterno-approvato.jpg'),
    }
    prodotti = [
        ('images/prodotti/preroll-gelato-41.jpg', 'PREROLL'),
        ('images/prodotti/cannagar-royal.jpg', 'CANNAGAR'),
        ('images/prodotti/vape-amnesia-thcx.jpg', 'VAPE'),
        ('images/prodotti/cartuccia-wedding-cake-thca.jpg', 'CARTUCCE'),
        ('images/prodotti/edibles-mango.jpg', 'EDIBLES'),
        ('images/prodotti/olio-full-spectrum.jpg', 'OLI'),
        ('images/prodotti/semi-gorilla-glue.jpg', 'SEMI'),
        ('images/prodotti/cloni-lemon-haze.jpg', 'CLONI'),
    ]
    prod_img = [(carica('public/' + p), lab) for p, lab in prodotti]

    # scene: (inizio, fine, funzione che disegna lo sfondo, righe del titolo, etichetta)
    scene = []

    def scena_foto(chiave, z0, z1, fx0, fx1, fy=0.5):
        def f(t, tl):
            z = z0 + (z1 - z0) * tl
            fx = fx0 + (fx1 - fx0) * tl
            return Image.fromarray(look(copertura(foto[chiave], W, H, z, fx, fy)).astype('uint8'))

        return f

    scene.append((1.3, 2.7, scena_foto('campi', 1.18, 1.05, 0.35, 0.5, 0.55), ['DAL', 'SEME'], 'COLTIVAZIONI IN EUROPA'))
    scene.append((2.7, 3.35, scena_foto('setaccio', 1.12, 1.02, 0.5, 0.5), ['ALLA', 'RESINA'], 'LAVORATA DA NOI'))
    scene.append((3.35, 4.0, scena_foto('pressa', 1.02, 1.12, 0.5, 0.5), ['ALLA', 'RESINA'], 'LAVORATA DA NOI'))

    # montaggio veloce dei prodotti, a tempo: 8 tagli da 0,375 s
    t0, passo = 4.3, 0.375
    for i, (img, lab) in enumerate(prod_img):
        def f(t, tl, img=img):
            z = 1.05 - 0.05 * ease_out(tl * 1.6)
            return Image.fromarray(look(prodotto(img, W, H, z)).astype('uint8'))

        scene.append((t0 + i * passo, t0 + (i + 1) * passo, f, ['DIECI', 'FAMIGLIE'], lab))

    scene.append((7.3, 8.5, scena_foto('magazzino', 1.02, 1.14, 0.45, 0.55), ['PRONTO', 'IN 24 ORE'], 'DALLA CASA MADRE'))
    scene.append((8.5, 9.7, scena_foto('negozio', 1.14, 1.04, 0.5, 0.5, 0.45), ['IN TUTTA', 'EUROPA'], 'ONLINE E NEI NEGOZI'))

    titoli_cache = {}
    etichette_cache = {}

    proc = subprocess.Popen(
        [
            ffmpeg(), '-y', '-loglevel', 'error',
            '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
            '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-tune', 'film', '-profile:v', 'high',
            '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
            str(USCITA / f'{nome}.mp4'),
        ],
        stdin=subprocess.PIPE,
    )

    n = int(DURATA * FPS)
    poster = None
    for i in range(n):
        t = i / FPS
        base = Image.new('RGBA', (W, H), NERO + (255,))

        # ---- apertura: logo che si accende
        if t < 1.3:
            e = ease_out(t / 0.9)
            lw = W * (0.62 if verticale else 0.38) * (0.94 + 0.06 * e)
            lg = logo_a(lw)
            alone = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            ImageDraw.Draw(alone).ellipse((W / 2 - lw * 0.7, H / 2 - lw * 0.45, W / 2 + lw * 0.7, H / 2 + lw * 0.45), fill=GIALLO + (int(46 * e),))
            base.alpha_composite(alone.filter(ImageFilter.GaussianBlur(int(120 * u))))
            a = np.asarray(lg).copy()
            a[..., 3] = (a[..., 3] * e * (1 - ease_in_out((t - 1.1) / 0.2))).astype('uint8')
            base.alpha_composite(Image.fromarray(a), (int(W / 2 - lg.width / 2), int(H / 2 - lg.height / 2 - 20 * u)))
            et = etichette_cache.setdefault('claim', etichetta('GOOD PLANTS. BRIGHTER DAYS.', BIANCO))
            rivela(base, et, W / 2 - et.width / 2, H / 2 + lg.height / 2 + 10 * u, (t - 0.45) / 0.4, (t - 1.1) / 0.2)

        # ---- le scene
        for (a0, a1, disegna, righe, lab) in scene:
            if a0 <= t < a1:
                tl = (t - a0) / (a1 - a0)
                base.alpha_composite(disegna(t, tl).convert('RGBA'))
                # velo scuro in basso per leggere i titoli
                velo = titoli_cache.get('velo')
                if velo is None:
                    g = np.linspace(0, 1, H)[:, None] ** 1.6
                    va = np.zeros((H, W, 4), np.uint8)
                    va[..., 3] = (g * 200).astype('uint8')
                    velo = titoli_cache['velo'] = Image.fromarray(va)
                base.alpha_composite(velo)
                chiave = '|'.join(righe)
                rr = titoli_cache.setdefault(chiave, titolo(righe))
                # il titolo entra quando cambia, non a ogni taglio dello stesso blocco
                inizio_blocco = min(s[0] for s in scene if '|'.join(s[3]) == chiave)
                fine_blocco = max(s[1] for s in scene if '|'.join(s[3]) == chiave)
                y = H - margine - sum(r.height for r in rr) - (len(rr) - 1) * 14 * u
                if verticale:
                    y -= 140 * u
                for k, r in enumerate(rr):
                    tt = (t - inizio_blocco - 0.08 * k) / 0.38
                    rivela(base, r, margine, y, tt, (t - (fine_blocco - 0.14)) / 0.14)
                    y += r.height + 14 * u
                et = etichette_cache.setdefault(lab, etichetta(lab))
                ey = H - margine - sum(r.height for r in rr) - (len(rr) - 1) * 14 * u - et.height - 30 * u
                if verticale:
                    ey -= 140 * u
                d = ImageDraw.Draw(base)
                rombo = 9 * u
                cx, cy = margine + rombo, ey + et.height / 2
                d.polygon([(cx, cy - rombo), (cx + rombo, cy), (cx, cy + rombo), (cx - rombo, cy)], fill=GIALLO)
                rivela(base, et, margine + 2 * rombo + 14 * u, ey, (t - a0) / 0.22)
                # logo piccolo in alto, sempre presente
                lp = titoli_cache.setdefault('logo-piccolo', logo_a(W * (0.2 if verticale else 0.09)))
                base.alpha_composite(lp, (margine, int(margine * 0.8)))
                break

        # ---- lampo giallo: «dieci famiglie»
        if 4.0 <= t < 4.3:
            base = Image.new('RGBA', (W, H), GIALLO + (255,))
            k = 'dieci-nero'
            rr = titoli_cache.setdefault(k, [testo_img(r, 'anton.ttf', int(tit * 1.25), NERO) for r in ['DIECI', 'FAMIGLIE']])
            y = H / 2 - (rr[0].height + rr[1].height + 14 * u) / 2
            for r in rr:
                base.alpha_composite(r, (int(W / 2 - r.width / 2), int(y)))
                y += r.height + 14 * u

        # ---- chiusura: logo grande, claim, indirizzo
        if t >= 9.7:
            tc = t - 9.7
            e = ease_out(tc / 0.6)
            lw = W * (0.7 if verticale else 0.42)
            lg = titoli_cache.setdefault('logo-grande', logo_a(lw))
            alone = titoli_cache.get('alone-chiusura')
            if alone is None:
                alone = Image.new('RGBA', (W, H), (0, 0, 0, 0))
                ImageDraw.Draw(alone).ellipse((W / 2 - lw * 0.75, H * 0.42 - lw * 0.45, W / 2 + lw * 0.75, H * 0.42 + lw * 0.45), fill=GIALLO + (52,))
                alone = titoli_cache['alone-chiusura'] = alone.filter(ImageFilter.GaussianBlur(int(130 * u)))
            fade = 1 - ease_in_out((t - 11.55) / 0.45)
            a = np.asarray(alone).copy()
            a[..., 3] = (a[..., 3] * e * fade).astype('uint8')
            base.alpha_composite(Image.fromarray(a))
            la = np.asarray(lg).copy()
            la[..., 3] = (la[..., 3] * e * fade).astype('uint8')
            ly = int(H * 0.42 - lg.height / 2 + (1 - e) * 30 * u)
            base.alpha_composite(Image.fromarray(la), (int(W / 2 - lg.width / 2), ly))
            c1 = titoli_cache.setdefault('c1', testo_img('PREMIUM CBD.', 'anton.ttf', int(tit * 0.5), BIANCO))
            c2 = titoli_cache.setdefault('c2', testo_img('BOLD CHARACTER.', 'anton.ttf', int(tit * 0.5), GIALLO))
            cy = ly + lg.height + 40 * u
            if verticale:
                rivela(base, c1, W / 2 - c1.width / 2, cy, (tc - 0.35) / 0.4, (t - 11.55) / 0.45)
                rivela(base, c2, W / 2 - c2.width / 2, cy + c1.height + 12 * u, (tc - 0.45) / 0.4, (t - 11.55) / 0.45)
                cy += c1.height + c2.height + 12 * u
            else:
                gap = 24 * u
                x = W / 2 - (c1.width + c2.width + gap) / 2
                rivela(base, c1, x, cy, (tc - 0.35) / 0.4, (t - 11.55) / 0.45)
                rivela(base, c2, x + c1.width + gap, cy, (tc - 0.45) / 0.4, (t - 11.55) / 0.45)
                cy += c1.height
            url = etichette_cache.setdefault('url', etichetta('THEHASHER.COM', BIANCO))
            rivela(base, url, W / 2 - url.width / 2, cy + 36 * u, (tc - 0.7) / 0.4, (t - 11.55) / 0.45)

        # barra gialla sottile: avanza per tutto il video
        rgb = grana.applica(np.asarray(base.convert('RGB')).astype(np.float32), i)
        barra = int(W * t / DURATA)
        rgb[H - max(2, int(4 * u)) :, :barra] = GIALLO
        frame = rgb.astype('uint8')
        if abs(t - 10.6) < 0.5 / FPS:
            poster = frame.copy()
        proc.stdin.write(frame.tobytes())
    proc.stdin.close()
    proc.wait()
    if poster is not None:
        Image.fromarray(poster).save(USCITA / f'{nome}-poster.jpg', quality=82)
    # WebM (VP9) di riserva, per i browser senza H.264 (Chromium open source, alcuni Linux)
    subprocess.run(
        [
            ffmpeg(), '-y', '-loglevel', 'error', '-i', str(USCITA / f'{nome}.mp4'),
            '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1',
            '-deadline', 'good', '-cpu-used', '2', '-an', str(USCITA / f'{nome}.webm'),
        ],
        check=True,
    )
    print('ok', nome, (USCITA / f'{nome}.mp4').stat().st_size // 1024, 'KB')


if __name__ == '__main__':
    USCITA.mkdir(parents=True, exist_ok=True)
    quali = sys.argv[1:] or ['orizzontale', 'verticale']
    if 'orizzontale' in quali:
        monta(1920, 1080, 'intro-16x9')
    if 'verticale' in quali:
        monta(1080, 1920, 'intro-9x16')
