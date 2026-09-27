#!/usr/bin/env python3
"""
Porta una foto nello stile The Hasher: neri profondi, colore quasi assente,
giallo acido solo sulle alte luci, vignettatura e grana fine.

Uso:
    python3 scripts/look-hasher.py foto.jpg public/images/filiera/nome.jpg
    python3 scripts/look-hasher.py cartella/ public/images/filiera/

Richiede Pillow e numpy.
"""
import sys
from pathlib import Path

from PIL import Image, ImageEnhance
import numpy as np

GIALLO = np.array([0.874, 1.0, 0.0])  # --color-primary #dfff00
LATO_MAX = 1400


def hasher(img: Image.Image, forza=0.5, soglia=0.55, gamma=1.6) -> Image.Image:
    im = ImageEnhance.Color(img.convert('RGB')).enhance(0.24)
    im = ImageEnhance.Contrast(im).enhance(1.32)
    a = np.asarray(im).astype(np.float32) / 255
    a = np.clip((a - 0.10) / 0.86, 0, 1) ** 1.12  # ombre sul nero
    a *= 0.9
    lum = (a * np.array([0.2126, 0.7152, 0.0722])).sum(axis=2, keepdims=True)
    mask = np.clip((lum - soglia) / (1 - soglia), 0, 1) ** gamma * forza
    out = a * (1 - mask) + GIALLO * mask  # il giallo entra solo dove c'è luce
    h, w = out.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
    out *= np.clip(1 - 1.25 * np.clip(r - 0.5, 0, None) ** 1.35, 0.26, 1)[..., None]
    out = np.clip(out + np.random.default_rng(11).normal(0, 0.013, (h, w, 1)), 0, 1)
    return Image.fromarray((out * 255).astype('uint8'))


def lavora(src: Path, dst: Path) -> None:
    im = Image.open(src)
    im.thumbnail((LATO_MAX, LATO_MAX), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    hasher(im).save(dst, quality=82, optimize=True)
    print(f'✓ {src.name} → {dst}')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print(__doc__)
        raise SystemExit(1)
    sorgente, destinazione = Path(sys.argv[1]), Path(sys.argv[2])
    if sorgente.is_dir():
        for f in sorted(sorgente.iterdir()):
            if f.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp'}:
                lavora(f, destinazione / f'{f.stem}.jpg')
    else:
        lavora(sorgente, destinazione)
