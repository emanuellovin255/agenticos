#!/usr/bin/env python3
"""
Pregateste logourile clientilor pentru site.

Ce face, pe scurt:
  1. citeste fisierele originale din /Logos (capturi salvate de pe site-urile lor);
  2. detecteaza culoarea de fundal si taie marginea goala din jurul logoului;
  3. il curata usor (unsharp mask discret) ca sa nu para incetosat pe ecran;
  4. il salveaza in /public/logos/<slug>.png si scrie culoarea fundalului.

NU redeseneaza si NU recoloreaza logoul — doar taie marginea si scoate
usor in evidenta contururile. Rezolutia ramane cea originala, iar in pagina
logoul e afisat la cel mult jumatate din latimea lui reala, ca sa fie clar
si pe ecrane retina.

Rulare:  python3 scripts/prep-logos.py
"""

from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

from PIL import Image, ImageFilter

SURSA = Path("Logos")
DEST = Path("public/logos")

# Fisier original -> numele fisierului final din /public/logos
HARTA = {
    "Mistique.png": "mistique",
    "Pensiunea LaNasu.png": "pensiunea-lanasu",
    "Potcoava Dunarii.png": "potcoava-dunarii",
    "Viovas.png": "viovas",
    "Pensiunea Giulia.png": "pensiunea-giulia",
    "Piano House.png": "piano-house",
    "Caprice.png": "caprice",
    "Screenshot 2026-08-26 at 11.48.07.png": "vila-carolina-apulum",
    "Screenshot 2026-08-26 at 11.48.38.png": "pensiunea-izora",
    "Beverly Hills.png": "pensiunea-beverly-hills",
    "Screenshot 2026-08-26 at 11.50.27.png": "pensiunea-raul-iulia",
    "Belvedere Murghiol.png": "belvedere-murighiol",
    "Thermal Family Resort.png": "thermal-family-resort",
    "Traffic Liviu.png": "traffic-liviu",
    "Delta Resort.png": "delta-resort-spa",
    "Electro Kasper.png": "elektro-kasper",
}

# Latimea maxima la care salvam. Peste atat nu castigam claritate, doar kilobytes.
LATIME_MAX = 720
INALTIME_MAX = 320


def culoare_fundal(im: Image.Image) -> tuple[int, int, int] | None:
    """Culoarea ramei exterioare. None daca logoul e pe fundal transparent."""
    l, i = im.size
    px = im.load()
    rama = []
    for x in range(l):
        rama.append(px[x, 0])
        rama.append(px[x, i - 1])
    for y in range(i):
        rama.append(px[0, y])
        rama.append(px[l - 1, y])

    transparente = sum(1 for p in rama if p[3] < 16)
    if transparente > 0.7 * len(rama):
        return None

    opace = [p[:3] for p in rama if p[3] > 200]
    if not opace:
        return None
    return Counter(opace).most_common(1)[0][0]


def taie_marginea(im: Image.Image, fundal: tuple[int, int, int] | None, prag: int = 26) -> Image.Image:
    """Taie rama uniforma din jurul logoului, lasand putin aer."""
    if fundal is None:
        cutie = im.getchannel("A").point(lambda a: 255 if a > 12 else 0).getbbox()
    else:
        r, g, b = fundal
        px = im.load()
        l, i = im.size
        x0, y0, x1, y1 = l, i, 0, 0
        for y in range(i):
            for x in range(l):
                pr, pg, pb, pa = px[x, y]
                if pa < 24:
                    continue
                if abs(pr - r) + abs(pg - g) + abs(pb - b) > prag:
                    if x < x0: x0 = x
                    if y < y0: y0 = y
                    if x > x1: x1 = x
                    if y > y1: y1 = y
        cutie = (x0, y0, x1 + 1, y1 + 1) if x1 >= x0 else None

    if not cutie:
        return im

    aer = max(2, round(min(im.size) * 0.02))
    x0 = max(0, cutie[0] - aer)
    y0 = max(0, cutie[1] - aer)
    x1 = min(im.width, cutie[2] + aer)
    y1 = min(im.height, cutie[3] + aer)
    return im.crop((x0, y0, x1, y1))


def limpezeste(im: Image.Image) -> Image.Image:
    """Unsharp mask discret: contururile devin nete, culorile raman neatinse."""
    return im.filter(ImageFilter.UnsharpMask(radius=1.1, percent=58, threshold=3))


def main() -> int:
    if not SURSA.is_dir():
        print(f"Lipseste folderul {SURSA}/", file=sys.stderr)
        return 1
    DEST.mkdir(parents=True, exist_ok=True)

    raport: dict[str, dict] = {}
    for fisier, slug in HARTA.items():
        cale = SURSA / fisier
        if not cale.exists():
            print(f"  ! lipseste {cale}", file=sys.stderr)
            continue

        im = Image.open(cale).convert("RGBA")
        fundal = culoare_fundal(im)
        im = taie_marginea(im, fundal)

        if im.width > LATIME_MAX or im.height > INALTIME_MAX:
            scara = min(LATIME_MAX / im.width, INALTIME_MAX / im.height)
            im = im.resize((round(im.width * scara), round(im.height * scara)), Image.LANCZOS)

        im = limpezeste(im)
        iesire = DEST / f"{slug}.png"
        im.save(iesire, optimize=True)

        # Culoarea placutei se ia din marginea imaginii FINALE, nu din cea
        # originala: dupa taiere si curatare tonul se mai schimba cu un fir,
        # iar daca placuta nu-l prinde exact, se vede un dreptunghi in jurul
        # logoului. Asa, marginea logoului si placuta sunt aceeasi culoare.
        final = None if fundal is None else culoare_fundal(im)
        hex_fundal = "" if final is None else "#%02x%02x%02x" % final
        raport[slug] = {"fundal": hex_fundal, "l": im.width, "i": im.height}
        print(f"  ✓ {slug:26s} {im.width:4d}×{im.height:<4d} fundal {hex_fundal or 'transparent':11s} {iesire.stat().st_size // 1024:4d} KB")

    print("\n" + json.dumps(raport, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
