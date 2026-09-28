# Rietichetta il pannello cannabinoidi sul tablet: il render mostrava THC-A 18,7 %,
# Uso: python3 scripts/rietichetta-tablet.py <render originale> <foto corretta>
# fuori legge per un brand CBD. Nuove etichette: CBD-A dominante, THC ai minimi.
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np, sys
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(float)
# (x sinistra, y centro) delle etichette originali, in pixel della foto 2000x1328
righe = [(1541.7, 293.3), (1536.7, 318.3), (1530, 344.3), (1524.3, 368.3), (1519, 393.3), (1513.3, 419.3)]
nuove = ['CBD-A', 'CBD', 'CBG', 'CBN', 'THC-A', 'THC']
S = 4
font = ImageFont.truetype('/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf', 14 * S)
for (x, y), testo in zip(righe, nuove):
    x0, x1, y0, y1 = int(x - 6), int(x + 42), int(y - 10), int(y + 10)
    # colore di fondo: mediana di una cornice intorno al riquadro
    cornice = np.concatenate([a[y0-4:y0, x0:x1].reshape(-1, 3), a[y1:y1+4, x0:x1].reshape(-1, 3)])
    fondo = np.median(cornice, axis=0)
    a[y0:y1, x0:x1] = fondo
im = Image.fromarray(a.clip(0, 255).astype('uint8'))
# testo disegnato in grande, ruotato come le barre (~3,6°) e rimpicciolito
strato = Image.new('RGBA', (im.width * S, im.height * S), (0, 0, 0, 0))
for (x, y), testo in zip(righe, nuove):
    t = Image.new('RGBA', (70 * S, 26 * S), (0, 0, 0, 0))
    ImageDraw.Draw(t).text((2 * S, 13 * S), testo, font=font, fill=(214, 219, 224, 235), anchor='lm')
    t = t.rotate(-3.6, resample=Image.BICUBIC, expand=True)
    strato.alpha_composite(t, (int((x - 2) * S), int((y - 13) * S - 4 * S)))
strato = strato.resize(im.size, Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.35))
im = Image.alpha_composite(im.convert('RGBA'), strato).convert('RGB')
im.save(out, quality=95)
