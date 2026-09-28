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


class Fumo:
    """Fumo da sigaretta: rumore frattale periodico, trascinato verso l'alto e arricciato
    (domain warping). Calcolato a bassa risoluzione e ingrandito: il fumo è morbido."""

    def __init__(self, W, H, seme=5):
        from scipy import ndimage

        self.nd = ndimage
        self.W, self.H = W, H
        self.w, self.h = W // 6, H // 6
        rng = np.random.default_rng(seme)

        def frattale(ottave):
            campo = np.zeros((self.h, self.w), np.float32)
            for sigma, amp in ottave:
                campo += ndimage.gaussian_filter(rng.normal(size=(self.h, self.w)).astype(np.float32), sigma, mode='wrap') * amp
            campo -= campo.min()
            return campo / campo.max()

        self.densita = frattale([(18, 1.0), (9, 0.5), (4, 0.28), (2, 0.14)])
        self.warp_x = frattale([(22, 1.0), (10, 0.4)]) - 0.5
        self.warp_y = frattale([(22, 1.0), (10, 0.4)]) - 0.5
        yy, xx = np.mgrid[0 : self.h, 0 : self.w].astype(np.float32)
        self.yy, self.xx = yy, xx
        self.X, self.Y = xx / self.w, yy / self.h

    def campo(self, t, salita=0.09):
        h, w = self.h, self.w
        sy = self.yy + t * salita * h * 3
        wx = self.nd.map_coordinates(self.warp_x, [sy * 0.8, self.xx * 0.8 + t * 6], order=1, mode='wrap')
        wy = self.nd.map_coordinates(self.warp_y, [sy * 0.8 + t * 4, self.xx * 0.8], order=1, mode='wrap')
        cx = self.xx * 1.25 + wx * w * 0.16 + np.sin(self.Y * 5 + t * 1.3) * w * 0.02
        cy = sy * 0.55 + wy * h * 0.14  # allungato in verticale: filamenti che salgono
        d = self.nd.map_coordinates(self.densita, [cy, cx], order=1, mode='wrap')
        # filamenti radi: soglia alta e morbida
        return np.clip((d - 0.5) * 2.0, 0, 1) ** 1.8

    def applica(self, rgb, t, inviluppo, forza):
        if forza <= 0.01:
            return rgb
        dens = self.campo(t) * inviluppo * forza
        img = Image.fromarray((np.clip(dens, 0, 1) * 255).astype('uint8')).resize((self.W, self.H), Image.BICUBIC)
        img = img.filter(ImageFilter.GaussianBlur(7))
        a = np.asarray(img).astype(np.float32)[..., None] / 255
        colore = np.array([214, 218, 210], np.float32)
        # fusione «schermo»: il fumo schiarisce, non copre
        return 255 - (255 - rgb) * (1 - a * colore / 255)


def look(img):
    """Grade comune: neri profondi, colore un po' spento, come le foto della filiera."""
    a = np.asarray(img).astype(np.float32)
    grigio = a.mean(2, keepdims=True)
    a = grigio + (a - grigio) * 0.78
    a = np.clip((a - 14) * 1.12, 0, 255)
    return a


# ---------------------------------------------------------------- il montaggio


def monta(W, H, nome, solo=None):
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

    # ------------------------------------------------ i pack ritagliati per il carosello
    def ritaglia(img):
        """Il prodotto con un po' di margine; bordi sfumati così il fondo scuro sparisce nel nero."""
        a = np.asarray(img).astype(np.int16)
        lum = a.mean(2)
        vivo = (lum > 48) | ((a[..., 1] > 120) & (a[..., 2] < 90))
        ys, xs = np.where(vivo)
        x0, x1 = np.percentile(xs, [1, 99]).astype(int)
        y0, y1 = np.percentile(ys, [1, 99.5]).astype(int)
        m = int(0.06 * img.height)
        box = (max(0, x0 - m), max(0, y0 - m), min(img.width, x1 + m), min(img.height, y1 + m))
        im = img.crop(box).convert('RGBA')
        w, h = im.size
        fx = np.clip(np.minimum(np.arange(w), w - 1 - np.arange(w)) / (w * 0.14), 0, 1)
        fy = np.clip(np.minimum(np.arange(h), h - 1 - np.arange(h)) / (h * 0.1), 0, 1)
        al = ((fy[:, None] * fx[None, :]) ** 0.9 * 255).astype('uint8')
        arr = np.asarray(im).copy()
        arr[..., :3] = look(Image.fromarray(arr[..., :3])).clip(0, 255).astype('uint8')
        arr[..., 3] = al
        return Image.fromarray(arr)

    pezzi = [(ritaglia(img), lab) for img, lab in prod_img]
    alt_base = H * (0.34 if verticale else 0.7)
    pezzi = [
        (p.resize((round(p.width * alt_base / p.height), round(alt_base)), Image.LANCZOS), lab)
        for p, lab in pezzi
    ]
    nomi_categoria = {lab: testo_img(lab, 'anton.ttf', tit, GIALLO) for _, lab in pezzi}
    occhiello_cat = etichetta('LE NOSTRE FAMIGLIE', BIANCO)

    def posizione(tl):
        """Indice del prodotto al centro (decimale): rallenta su ogni prodotto, accelera tra uno e l'altro."""
        n = len(pezzi)
        v = -0.2 + (n - 1 + 0.4) * tl
        f = v - math.floor(v)
        return math.floor(v) + f - 0.55 * math.sin(2 * math.pi * f) / (2 * math.pi)

    def carosello(t, tl):
        """Scorrono da destra a sinistra (computer) o dal basso in alto (telefono).
        Al centro ingranditi e pieni, ai lati piccoli e quasi trasparenti."""
        tela = Image.new('RGBA', (W, H), NERO + (255,))
        n = len(pezzi)
        pos = posizione(tl)
        cx, cy = (W / 2, H * 0.44) if verticale else (W * 0.58, H * 0.44)
        passo = H * 0.33 if verticale else W * 0.3
        ordine = sorted(range(n), key=lambda k: -abs(k - pos))
        for k in ordine:
            d = k - pos
            if abs(d) > 2.2:
                continue
            vicino = max(0.0, 1 - abs(d)) ** 2
            scala = 0.78 + 0.28 * vicino
            opac = float(np.clip(1 - (abs(d) - 0.12) * 0.92, 0.06, 1))
            p, lab = pezzi[k]
            q = p.resize((max(1, round(p.width * scala)), max(1, round(p.height * scala))), Image.BICUBIC)
            if opac < 1:
                qa = np.asarray(q).copy()
                qa[..., 3] = (qa[..., 3] * opac).astype('uint8')
                q = Image.fromarray(qa)
            x = cx + (0 if verticale else d * passo)
            y = cy + (d * passo if verticale else 0)
            tela.alpha_composite(q, (round(x - q.width / 2), round(y - q.height / 2)))
        return tela.convert('RGB')

    # ------------------------------------------------ la sequenza
    # (inizio, fine, sfondo, righe del titolo, etichetta, titolo in alto su telefono)
    scene = []

    def scena_foto(chiave, z0, z1, fx0, fx1, fy=0.5):
        def f(t, tl):
            z = z0 + (z1 - z0) * tl
            fx = fx0 + (fx1 - fx0) * tl
            return Image.fromarray(look(copertura(foto[chiave], W, H, z, fx, fy)).astype('uint8'))

        return f

    T_INTRO, T_PROD, T_FINE = 1.4, 3.7, 9.8
    scene.append((1.4, 2.6, scena_foto('campi', 1.18, 1.05, 0.35, 0.5, 0.55), ['DAL', 'SEME'], 'COLTIVAZIONI IN EUROPA', False))
    scene.append((2.6, 3.15, scena_foto('setaccio', 1.12, 1.02, 0.5, 0.5), ['ALLA', 'RESINA'], 'LAVORATA DA NOI', False))
    scene.append((3.15, 3.7, scena_foto('pressa', 1.02, 1.12, 0.5, 0.5), ['ALLA', 'RESINA'], 'LAVORATA DA NOI', False))
    scene.append((T_PROD, 7.8, lambda t, tl: carosello(t, tl), None, None, True))
    scene.append((7.8, 8.8, scena_foto('magazzino', 1.02, 1.14, 0.45, 0.55), ['PRONTO', 'IN 24 ORE'], 'DALLA CASA MADRE', False))
    scene.append((8.8, T_FINE, scena_foto('negozio', 1.14, 1.04, 0.5, 0.5, 0.45), ['IN TUTTA', 'EUROPA'], 'ONLINE E NEI NEGOZI', False))

    titoli_cache = {}
    etichette_cache = {}

    # ------------------------------------------------ il logo animato (apertura e chiusura)
    def logo_animato(base, tl, larghezza, cy, spegni=0.0):
        """Da sfocato a nitido, rivelato in diagonale, poi una lama di luce lo attraversa."""
        e = ease_out(tl / 0.85)
        lg = titoli_cache.get(('logo', larghezza))
        if lg is None:
            lg = titoli_cache[('logo', larghezza)] = logo_a(larghezza)
        scala = 1.1 - 0.1 * e
        q = lg.resize((round(lg.width * scala), round(lg.height * scala)), Image.BICUBIC)
        raggio = (1 - e) * 18 * u
        if raggio > 0.4:
            q = q.filter(ImageFilter.GaussianBlur(raggio))
        a = np.asarray(q).astype(np.float32)
        h, w = a.shape[:2]
        yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
        xn, yn = xx / w, yy / h
        # rivelazione diagonale
        fronte = -0.35 + 1.7 * ease_out(tl / 0.75)
        rivela_m = np.clip((fronte - (xn + yn * 0.3)) / 0.22, 0, 1)
        alfa = a[..., 3] * rivela_m * (1 - spegni)
        # lama di luce
        c = -0.4 + 1.9 * ease_in_out((tl - 0.55) / 0.7)
        lama = np.exp(-(((xn - yn * 0.35) - c) / 0.07) ** 2) * (a[..., 3] / 255)
        rgb = a[..., :3] + lama[..., None] * np.array([90, 60, 200], np.float32)
        rgb = np.clip(rgb, 0, 255)
        out = np.dstack([rgb, alfa]).astype('uint8')
        # bagliore giallo dietro, che pulsa all'arrivo
        alone = titoli_cache.get(('alone', larghezza))
        if alone is None:
            m = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            ImageDraw.Draw(m).ellipse((W / 2 - larghezza * 0.72, cy - larghezza * 0.42, W / 2 + larghezza * 0.72, cy + larghezza * 0.42), fill=GIALLO + (255,))
            alone = titoli_cache[('alone', larghezza)] = m.filter(ImageFilter.GaussianBlur(int(140 * u)))
        forza = (0.16 + 0.12 * math.exp(-((tl - 0.7) / 0.25) ** 2)) * e * (1 - spegni)
        al = np.asarray(alone).copy()
        al[..., 3] = (al[..., 3] * forza).astype('uint8')
        base.alpha_composite(Image.fromarray(al))
        base.alpha_composite(Image.fromarray(out), (round(W / 2 - w / 2), round(cy - h / 2)))
        return h

    fumo = Fumo(W, H)

    def pennacchio(X, Y, x0, t, larg=0.05, apertura=0.4, sfasa=0.0):
        """Colonna di fumo che sale da un punto in basso e si allarga salendo, ondeggiando."""
        alto = 1 - Y
        deriva = np.sin(alto * 5 + t * 1.1 + sfasa) * 0.05 * alto
        w = larg + apertura * alto**1.2
        return np.exp(-(((X - x0 - deriva) / w) ** 2)) * np.clip(Y / 0.12, 0, 1) * (0.35 + 0.65 * alto)

    def inviluppo_fumo(t):
        """Dove e quanto fumo: un filo che sale dietro il logo, sbuffi all'inizio e alla fine."""
        X, Y = fumo.X, fumo.Y
        velo_basso = np.clip((Y - 0.55) / 0.45, 0, 1) ** 1.5
        if t < T_INTRO:
            r = np.sqrt(((X - 0.5) / 0.55) ** 2 + ((Y - 0.47) / 0.45) ** 2)
            R = 0.2 + 0.8 * ease_out(t / 1.3)
            sbuffo = np.exp(-(((r - R) / 0.28) ** 2)) * (1 - 0.7 * ease_in_out((t - 0.4) / 1.0))
            filo = pennacchio(X, Y, 0.5, t, 0.035, 0.32)
            return (sbuffo + filo) * ease_out(t / 0.3), 0.85
        if t >= T_FINE:
            tc = t - T_FINE
            r = np.sqrt(((X - 0.5) / 0.6) ** 2 + ((Y - 0.45) / 0.5) ** 2)
            R = 0.25 + 0.6 * ease_out(tc / 1.6)
            sbuffo = np.exp(-(((r - R) / 0.3) ** 2)) * ease_out(tc / 0.5) * (1 - 0.6 * ease_in_out((tc - 0.7) / 1.2))
            filo = pennacchio(X, Y, 0.5, t, 0.035, 0.3)
            return sbuffo + filo, 0.75 * (1 - ease_in_out((t - 11.55) / 0.45))
        if T_PROD <= t < 7.8:
            fili = pennacchio(X, Y, 0.12, t, 0.03, 0.22) + pennacchio(X, Y, 0.92, t, 0.03, 0.22, 2.0)
            return fili + 0.3 * velo_basso, 0.5
        return velo_basso + 0.6 * pennacchio(X, Y, 0.85, t, 0.03, 0.25, 1.0), 0.28

    proc = None if solo else subprocess.Popen(
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

        # ---- apertura: il logo si accende al centro
        if t < T_INTRO:
            lw = W * (0.64 if verticale else 0.4)
            spegni = ease_in_out((t - (T_INTRO - 0.22)) / 0.22)
            h = logo_animato(base, t, lw, H / 2 - 20 * u, spegni)
            et = etichette_cache.setdefault('claim', etichetta('GOOD PLANTS. BRIGHTER DAYS.', BIANCO))
            rivela(base, et, W / 2 - et.width / 2, H / 2 - 20 * u + h / 2 + 18 * u, (t - 0.6) / 0.4, spegni)

        # ---- le scene
        for (a0, a1, disegna, righe, lab, in_alto) in scene:
            if a0 <= t < a1:
                tl = (t - a0) / (a1 - a0)
                base.alpha_composite(disegna(t, tl).convert('RGBA'))
                alto = in_alto and verticale
                if righe is None:
                    # carosello: il titolo è la categoria del prodotto al centro, cambia con lui
                    pos = posizione(tl)
                    k = min(max(round(pos), 0), len(pezzi) - 1)
                    dist = abs(pos - k)
                    vis = 1 - ease_in_out((dist - 0.22) / 0.26)
                    vis *= ease_out((t - a0) / 0.3) * (1 - ease_in_out((t - (a1 - 0.18)) / 0.18))
                    nome_c = nomi_categoria[pezzi[k][1]]
                    y_c = margine * 1.1 + occhiello_cat.height + 22 * u if alto else H - margine - nome_c.height - (140 * u if verticale else 0)
                    spost = (1 - vis) * 24 * u * (1 if pos < k else -1)
                    nc = np.asarray(nome_c).copy()
                    nc[..., 3] = (nc[..., 3] * vis).astype('uint8')
                    base.alpha_composite(Image.fromarray(nc), (margine, round(y_c + spost)))
                    y_o = y_c - occhiello_cat.height - 22 * u
                    rivela(base, occhiello_cat, margine + 2 * 9 * u + 14 * u, y_o, (t - a0) / 0.3, (t - (a1 - 0.18)) / 0.18)
                    d = ImageDraw.Draw(base)
                    rombo = 9 * u
                    cxr, cyr = margine + rombo, y_o + occhiello_cat.height / 2
                    if t - a0 > 0.1 and t < a1 - 0.1:
                        d.polygon([(cxr, cyr - rombo), (cxr + rombo, cyr), (cxr, cyr + rombo), (cxr - rombo, cyr)], fill=GIALLO)
                    break
                # velo scuro per leggere i titoli (in basso, o in alto quando il titolo sta sopra)
                chiave_velo = 'velo-alto' if alto else 'velo'
                velo = titoli_cache.get(chiave_velo)
                if velo is None:
                    g = np.linspace(0, 1, H)[:, None] ** 1.6
                    if alto:
                        g = g[::-1] ** 3
                    va = np.zeros((H, W, 4), np.uint8)
                    va[..., 3] = (g * 200).astype('uint8')
                    velo = titoli_cache[chiave_velo] = Image.fromarray(va)
                if lab is not None or alto:
                    base.alpha_composite(velo)
                chiave = '|'.join(righe)
                rr = titoli_cache.setdefault(chiave, titolo(righe))
                inizio_blocco = min(s[0] for s in scene if s[3] and '|'.join(s[3]) == chiave)
                fine_blocco = max(s[1] for s in scene if s[3] and '|'.join(s[3]) == chiave)
                alt_tit = sum(r.height for r in rr) + (len(rr) - 1) * 14 * u
                if alto:
                    y = margine * 1.1
                else:
                    y = H - margine - alt_tit - (140 * u if verticale else 0)
                y0_tit = y
                for k, r in enumerate(rr):
                    tt = (t - inizio_blocco - 0.08 * k) / 0.38
                    rivela(base, r, margine, y, tt, (t - (fine_blocco - 0.14)) / 0.14)
                    y += r.height + 14 * u
                if lab is not None:
                    et = etichette_cache.setdefault(lab, etichetta(lab))
                    ey = y0_tit - et.height - 30 * u
                    d = ImageDraw.Draw(base)
                    rombo = 9 * u
                    cx, cy = margine + rombo, ey + et.height / 2
                    d.polygon([(cx, cy - rombo), (cx + rombo, cy), (cx, cy + rombo), (cx - rombo, cy)], fill=GIALLO)
                    rivela(base, et, margine + 2 * rombo + 14 * u, ey, (t - a0) / 0.22)
                break

        # ---- chiusura: logo, claim, indirizzo; poi si spegne tutto per ripartire dal nero
        if t >= T_FINE:
            tc = t - T_FINE
            lw = W * (0.7 if verticale else 0.42)
            spegni = ease_in_out((t - 11.55) / 0.45)
            cy_logo = H * 0.42
            h = logo_animato(base, tc, lw, cy_logo, spegni)
            c1 = titoli_cache.setdefault('c1', testo_img('PREMIUM CBD.', 'anton.ttf', int(tit * 0.5), BIANCO))
            c2 = titoli_cache.setdefault('c2', testo_img('BOLD CHARACTER.', 'anton.ttf', int(tit * 0.5), GIALLO))
            cy = cy_logo + h / 2 + 34 * u
            if verticale:
                rivela(base, c1, W / 2 - c1.width / 2, cy, (tc - 0.45) / 0.4, spegni)
                rivela(base, c2, W / 2 - c2.width / 2, cy + c1.height + 12 * u, (tc - 0.55) / 0.4, spegni)
                cy += c1.height + c2.height + 12 * u
            else:
                gap = 24 * u
                x = W / 2 - (c1.width + c2.width + gap) / 2
                rivela(base, c1, x, cy, (tc - 0.45) / 0.4, spegni)
                rivela(base, c2, x + c1.width + gap, cy, (tc - 0.55) / 0.4, spegni)
                cy += c1.height
            url = etichette_cache.setdefault('url', etichetta('THEHASHER.COM', BIANCO))
            rivela(base, url, W / 2 - url.width / 2, cy + 36 * u, (tc - 0.8) / 0.4, spegni)

        if solo and i not in solo:
            continue
        # fumo, poi grana; barra gialla sottile che avanza per tutto il video
        rgb = np.asarray(base.convert('RGB')).astype(np.float32)
        inv, forza = inviluppo_fumo(t)
        rgb = fumo.applica(rgb, t, inv, forza)
        rgb = grana.applica(rgb, i)
        barra = int(W * t / DURATA)
        rgb[H - max(2, int(4 * u)) :, :barra] = GIALLO
        frame = rgb.astype('uint8')
        if abs(t - 11.0) < 0.5 / FPS:
            poster = frame.copy()
        if solo:
            Image.fromarray(frame).save(f'/tmp/prova-{nome}-{t:.2f}.png')
            continue
        proc.stdin.write(frame.tobytes())
    if solo:
        return
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
    args = [a for a in sys.argv[1:] if not a.startswith('--prova=')]
    prova = [a for a in sys.argv[1:] if a.startswith('--prova=')]
    solo = {round(float(x) * FPS) for x in prova[0][8:].split(',')} if prova else None
    quali = args or ['orizzontale', 'verticale']
    if 'orizzontale' in quali:
        monta(1920, 1080, 'intro-16x9', solo)
    if 'verticale' in quali:
        monta(1080, 1920, 'intro-9x16', solo)
