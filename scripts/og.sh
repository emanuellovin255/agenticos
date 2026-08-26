#!/usr/bin/env bash
# Genereaza o imagine de previzualizare pentru retele sociale: public/og-default.png
#
# NOTA: e un substitut grafic, in stilul site-ului, fara text — ffmpeg-ul de pe
# acest sistem nu are suport pentru scris (libfreetype). Inlocuieste fisierul cu
# propria imagine 1200x630 cand ai logoul final. Orice PNG pus la aceeasi cale
# functioneaza imediat, fara alte modificari.
set -euo pipefail

ffmpeg -y -loglevel error \
  -f lavfi -i "color=c=0xFFF8E7:s=1200x630" \
  -vf "\
drawbox=x=790:y=-70:w=360:h=360:color=0xFFD84D:t=fill,\
drawbox=x=790:y=-70:w=360:h=360:color=0x111111:t=10,\
drawbox=x=900:y=440:w=280:h=280:color=0x7C5CFF@0.4:t=fill,\
drawbox=x=900:y=440:w=280:h=280:color=0x111111:t=10,\
drawbox=x=-60:y=470:w=300:h=300:color=0xFF5C39@0.35:t=fill,\
drawbox=x=64:y=58:w=1072:h=514:color=0xFFF8E7:t=fill,\
drawbox=x=64:y=58:w=1072:h=514:color=0x111111:t=10,\
drawbox=x=130:y=170:w=620:h=54:color=0x111111:t=fill,\
drawbox=x=130:y=256:w=460:h=54:color=0x111111:t=fill,\
drawbox=x=130:y=342:w=300:h=30:color=0xFFD84D:t=fill,\
drawbox=x=130:y=420:w=340:h=88:color=0xFF5C39:t=fill,\
drawbox=x=130:y=420:w=340:h=88:color=0x111111:t=8,\
drawbox=x=170:y=452:w=180:h=24:color=0x111111:t=fill" \
  -frames:v 1 public/og-default.png

echo "✓ public/og-default.png generat (substitut grafic — inlocuieste-l cu imaginea ta)"
