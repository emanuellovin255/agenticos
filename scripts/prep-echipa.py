#!/usr/bin/env python3
"""
Pregateste pozele echipei pentru site.

Pozele vin ca portret rotund asezat pe un fundal alb. Alb-ul ala (#fefefe)
NU e acelasi cu cremul site-ului (#fff8e7), asa ca in card se vedea un patrat
mai deschis in jurul portretului. Scriptul:

  1. gaseste fundalul (zona alba lipita de marginea pozei, nu si albul din
     haine — porneste din colturi si se intinde doar prin pixeli vecini);
  2. il vopseste exact in cremul site-ului, ca sa se piarda in card;
  3. taie poza fix pe cerc si o aduce la patrat, ca toate cele cinci sa aiba
     aceeasi marime;
  4. o micsoreaza la 640px — dublul dimensiunii la care e afisata, cat sa fie
     clara si pe ecrane retina.

Portretul in sine nu e atins: nici decupat, nici recolorat.

Rulare:  python3 scripts/prep-echipa.py
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

SURSA = Path("Echipa")
DEST = Path("src/assets/echipa")

# Cremul din src/styles/global.css (--color-crem). Daca il schimbi acolo,
# schimba-l si aici si ruleaza scriptul din nou.
CREM = (0xFF, 0xF8, 0xE7)

# Fisier original -> numele fisierului final (campul `imagine` din echipa.ts)
HARTA = {
    "Project Manager - Emanuel.png": "project-manager",
    "UX:UI Designer - Ioana.png": "ux-ui-designer",
    "Web Developer- Bogdan.png": "web-developer",
    "Copywriting Specialist - Sofia.png": "copywriting",
    "QA & Optimization - David.png": "qa-optimizare",
}

LATURA = 640  # dublul celor 320px la care e afisata poza pe ecran mare


def taie_dunga_de_pe_margine(im: Image.Image) -> Image.Image:
    """Scoate dunga ramasa pe marginea unei capturi.

    Una din poze avea pe muchia de jos patru randuri de la negru spre alb —
    resturi de la salvarea capturii. Daca le lasam, umplerea din colturi le
    ocolea si ramaneau ca o linie sub portret.

    Le recunoastem dupa faptul ca sunt PLATE: un rand de 600 de pixeli din
    portret are mereu variatie, o dunga de captura are toti pixelii identici.
    """
    r, g, b = im.split()
    minim = ImageChops.darker(ImageChops.darker(r, g), b)
    px = minim.load()

    def intunecat(pixeli) -> bool:
        pixeli = list(pixeli)
        plat = max(pixeli) - min(pixeli) <= 8
        return plat and sum(pixeli) / len(pixeli) < 235

    x0, y0, x1, y1 = 0, 0, im.width, im.height
    for _ in range(8):
        if y0 < y1 and intunecat(px[x, y0] for x in range(x0, x1)):
            y0 += 1
        elif y0 < y1 and intunecat(px[x, y1 - 1] for x in range(x0, x1)):
            y1 -= 1
        elif x0 < x1 and intunecat(px[x0, y] for y in range(y0, y1)):
            x0 += 1
        elif x0 < x1 and intunecat(px[x1 - 1, y] for y in range(y0, y1)):
            x1 -= 1
        else:
            break

    return im if (x0, y0, x1, y1) == (0, 0, im.width, im.height) else im.crop((x0, y0, x1, y1))


def masca_fundal(im: Image.Image) -> Image.Image:
    """Zona de fundal: alb lipit de marginea pozei.

    Pornim din cele patru colturi si ne intindem doar prin pixeli albi vecini.
    Asa albul din camasa sau din pulover ramane neatins — nu are cum sa fie
    legat de marginea pozei fara sa treaca prin portret.
    """
    r, g, b = im.split()
    minim = ImageChops.darker(ImageChops.darker(r, g), b)
    alb = minim.point(lambda v: 255 if v >= 240 else 0)

    colturi = [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1)]
    for coltz in colturi:
        if alb.getpixel(coltz) == 255:
            ImageDraw.floodfill(alb, coltz, 128)
    return alb.point(lambda v: 255 if v == 128 else 0)


def vopseste(im: Image.Image, fundal: Image.Image) -> Image.Image:
    """Inlocuieste fundalul cu crem, inclusiv firul de pixeli de pe muchie.

    Marginea cercului e antialiasata: are un fir de pixeli intre alb si
    portret, pe care umplerea din colturi nu-l prinde. Il luam separat —
    doar pe cei care sunt inca aproape albi — ca sa nu ramana un inel palid
    in jurul portretului.
    """
    plin = Image.new("RGB", im.size, CREM)
    im = Image.composite(plin, im, fundal)

    r, g, b = im.split()
    minim = ImageChops.darker(ImageChops.darker(r, g), b)
    vecinatate = fundal.filter(ImageFilter.MaxFilter(5))
    muchie = ImageChops.multiply(vecinatate, minim.point(lambda v: 255 if v >= 246 else 0))
    return Image.composite(plin, im, muchie)


def taie_pe_cerc(im: Image.Image, fundal: Image.Image) -> Image.Image:
    """Taie fix pe portret, apoi completeaza cu crem pana iese patrat."""
    cutie = fundal.point(lambda v: 0 if v == 255 else 255).getbbox()
    if not cutie:
        return im

    aer = round(max(cutie[2] - cutie[0], cutie[3] - cutie[1]) * 0.02)
    x0 = max(0, cutie[0] - aer)
    y0 = max(0, cutie[1] - aer)
    x1 = min(im.width, cutie[2] + aer)
    y1 = min(im.height, cutie[3] + aer)
    im = im.crop((x0, y0, x1, y1))

    latura = max(im.size)
    patrat = Image.new("RGB", (latura, latura), CREM)
    patrat.paste(im, ((latura - im.width) // 2, (latura - im.height) // 2))
    return patrat


def main() -> int:
    if not SURSA.is_dir():
        print(f"Lipseste folderul {SURSA}/ — pozele originale ale echipei.", file=sys.stderr)
        return 1
    DEST.mkdir(parents=True, exist_ok=True)

    for fisier, slug in HARTA.items():
        cale = SURSA / fisier
        if not cale.exists():
            print(f"  ! lipseste {cale}", file=sys.stderr)
            continue

        im = Image.open(cale).convert("RGB")
        im = taie_dunga_de_pe_margine(im)
        fundal = masca_fundal(im)
        im = vopseste(im, fundal)
        im = taie_pe_cerc(im, fundal)

        if im.width > LATURA:
            im = im.resize((LATURA, LATURA), Image.LANCZOS)

        iesire = DEST / f"{slug}.png"
        im.save(iesire, optimize=True)
        print(f"  ✓ {slug:18s} {im.width}×{im.height}  {iesire.stat().st_size // 1024:4d} KB")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
