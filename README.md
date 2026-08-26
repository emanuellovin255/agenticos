# Site agenție web design

Site de prezentare construit cu **Astro** și **Tailwind CSS**, în stil cartoon neo-brutalist,
gândit ca vizitatorul să ajungă într-o conversație pe WhatsApp.

---

## Pornire rapidă

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # generează dist/ — HTML static, se urcă pe orice hosting
```

---

## ⚠ Ce trebuie completat

### 1. Datele agenției — `src/data/site.ts`

Singurul fișier obligatoriu. Fără el, butoanele de WhatsApp nu duc nicăieri.

| Câmp | Ce pui |
|---|---|
| `nume` | numele agenției |
| `tagline` | o frază scurtă, apare și în Google |
| `whatsapp` | numărul în format internațional, **fără `+` și fără spații** (ex. `40722123456`) |
| `email` | adresa de contact |
| `oras` | orașul (intră în datele structurate pentru Google) |
| `url` | adresa finală a site-ului, fără `/` la final |
| `cifre` | numerele din bara de încredere |
| `social` | lasă `""` la rețelele pe care nu le ai |

### 2. Clienții — `src/data/clienti.ts`

Fiecare obiect din listă generează automat un logo pe prima pagină, un card în portofoliu
și o pagină proprie la `/portofoliu/<slug>`.

Ca să adaugi un client: copiază un bloc `{ ... }`, lipește-l în listă, schimbă datele.

**`logo` și `logoFundal`** le completează scriptul de logouri, nu tu de mână. Vezi mai jos.

**Pe prima pagină apar doar 8 clienți**, cei din lista `sloguriVitrina` de la finalul
fișierului, exact în ordinea de acolo. Ceilalți nu dispar: trec prin banda care rulează
deasupra și apar toți în secțiunea Portofoliu, la care duce butonul „Vezi toate proiectele".
Ca să schimbi vitrina, rescrie slugurile din listă.

**`linkSite`** e câmpul pe care îl completezi la final. Cât timp e `""`, butonul afișează
„Site-ul se publică în curând" și nu duce nicăieri — nu rămâne niciun link rupt.
Când pui adresa, butonul devine activ singur.

### 3. Testimonialele — `src/data/testimoniale.ts`

Cele două videoclipuri existente (Pensiunea Izora și Pensiunea Belvedere) sunt deja legate.
Pentru altele noi, ai trei variante la `video.tip`:

```ts
{ tip: "fisier",  sursa: "/testimoniale/nume.mp4", poster: "/testimoniale/nume.jpg", format: "vertical" }
{ tip: "youtube", sursa: "ID-ul de după v= din link",  poster: "...", format: "orizontal" }
{ tip: "vimeo",   sursa: "numărul din link",           poster: "...", format: "orizontal" }
```

`format: "vertical"` e pentru filmări de pe telefon (9:16), `"orizontal"` pentru 16:9.

Ca să scoți un poster dintr-un video nou:

```bash
ffmpeg -ss 3 -i public/testimoniale/nume.mp4 -frames:v 1 -q:v 3 public/testimoniale/nume-poster.jpg
```

### 4. Prețurile — `src/data/preturi.ts`

Cele trei pachete, cu prețurile scrise ca text simplu (`"1.579 lei"`) — le schimbi direct,
fără să atingi altceva. `recomandat: true` pune eticheta „Cel mai ales" pe un pachet;
pune-l la unul singur.

`incluseInToate` sunt beneficiile care apar în toate pachetele — acum tabloul de bord și
mentenanța gratuită. Apar și în lista fiecărui card, și explicate pe larg dedesubt, dintr-un
singur loc.

Dacă schimbi prețurile, actualizează și răspunsul „Cât costă un site?" din `src/data/faq.ts`,
unde sunt scrise explicit.

### 5. Echipa — `src/data/echipa.ts`

Cele cinci roluri sunt deja scrise, în ordinea în care apar pe site. Titlul cardului e
**numele**, iar sub el, mai mic, stă rolul. Dacă lași `nume` gol (`""`), rămâne doar rolul.

`imagine` e numele fișierului din `src/assets/echipa/`, fără extensie. Vezi mai jos cum se
pregătesc pozele.

### 6. Imaginile

Pune fișierele în folderele de mai jos și scrie calea în fișierul de date corespunzător.
**Cât timp câmpul e `""`, se desenează automat un substitut în stilul site-ului** — nicio
imagine lipsă nu lasă un pătrat gol.

**Pozele echipei sunt excepția**: stau în `src/assets/echipa/`, nu în `public/`. Acolo Astro
le optimizează la build — le-a dus de la ~4 MB la ~100 KB în total, trecându-le pe webp.

#### Pozele echipei

Originalele stau în `/Echipa/`, portrete rotunde pe fundal alb. Albul ăla **nu** e același cu
cremul site-ului, așa că lăsat așa se vede un pătrat mai deschis în jurul portretului. Rulezi:

```bash
npm run echipa
```

Scriptul găsește fundalul (doar albul lipit de marginea pozei, ca să nu atingă albul din
haine), îl vopsește exact în cremul cardului, taie poza fix pe cerc și o salvează în
`src/assets/echipa/`. Portretul în sine nu e atins.

Ca să schimbi o poză: pune originalul în `/Echipa/` cu același nume și rulează scriptul din
nou. Dacă îi schimbi numele fișierului, adaugă-l în tabelul `HARTA` din `scripts/prep-echipa.py`.

**Dacă schimbi cremul** din `src/styles/global.css`, schimbă-l și în `CREM` la începutul
scriptului și rulează-l din nou — altfel fundalul pozelor rămâne pe culoarea veche.

#### Logourile clienților

Originalele stau în `/Logos/` (fișierele așa cum le-ai salvat de pe site-urile clienților).
Nu le pui manual în `public/`. Rulezi:

```bash
npm run logos
```

Scriptul taie marginea goală din jurul fiecărui logo, îl curăță puțin ca să nu pară încețoșat
pe ecran, îl salvează în `public/logos/` și îți spune culoarea fundalului fiecăruia. Culoarea
aia o pui în `clienti.ts` la `logoFundal` — plăcuța din spatele logoului o primește, așa că
logoul arată exact ca pe site-ul clientului, fără să-i stricăm contrastul.

Ca să adaugi un logo nou: pune fișierul în `/Logos/` și adaugă-l în tabelul `HARTA` din
`scripts/prep-logos.py` (nume de fișier → nume de slug). Scriptul are nevoie de Python 3 cu
Pillow instalat.

| Folder | Ce pui | Dimensiune recomandată |
|---|---|---|
| `public/logos/` | logourile clienților | PNG, generat cu `npm run logos` |
| `public/portofoliu/` | capturi din site-urile livrate | 1600×1000 |
| `public/testimoniale/` | videoclipuri + postere | video vertical 9:16 |
| `public/og-default.png` | imaginea de previzualizare la partajare | 1200×630 |

---

## Cum e construit

```
src/
├─ data/           ← TOT conținutul editabil stă aici
├─ lib/
│  ├─ whatsapp.ts     construiește linkurile wa.me cu mesaj precompletat
│  ├─ placeholder.ts  desenează substitutele pentru imaginile lipsă
│  └─ accent.ts       perechile de culoare fundal/text care trec pragul de contrast
├─ layouts/Base.astro  <head>, SEO, date structurate, fonturi
├─ components/         secțiunile paginii
└─ pages/
   ├─ index.astro
   └─ portofoliu/[slug].astro   ← o pagină per client, generată automat
```

### Decizii care contează

**Fonturile sunt Baloo 2 + Nunito, nu Fredoka.** Fredoka arată bine, dar **nu conține
glifele `ă`, `ș`, `ț`** (nici majusculele) — fiecare cuvânt românesc cădea pe alt font și
titlurile ieșeau amestecate. Baloo 2 acoperă tot setul. Dacă schimbi fontul de titlu,
verifică întâi diacriticele.

Ambele fonturi se auto-găzduiesc prin API-ul de fonturi din Astro: zero request către
Google, zero layout shift, fără cookie-uri de la terți.

**Contrastele sunt calculate, nu alese din ochi.** Regulile din `src/lib/accent.ts`:

| Combinație | Raport | |
|---|---|---|
| negru pe crem | 17.83:1 | ✓ |
| negru pe galben | 13.65:1 | ✓ |
| negru pe coral | 6.15:1 | ✓ |
| alb pe coral | 3.07:1 | ✗ interzis pentru text |
| negru/alb pe violet `#7C5CFF` | ~4.34:1 | ✗ sub prag |
| alb pe violet închis `#6B46E8` | 5.73:1 | ✓ |

Pe galben și coral se scrie cu **negru**. Violetul deschis rămâne decorativ; oriunde apare
text pe violet se folosește varianta închisă.

**Înclinarea, apariția și apăsarea folosesc proprietăți CSS diferite.** Cardurile sunt ușor
înclinate (`rotate`), apar prin alunecare la scroll (`translate`) și se „apasă" mecanic la
click (`transform`). Dacă toate trei ar folosi `transform`, ultima ar șterge-o pe prima —
cardurile își pierdeau înclinarea în momentul în care deveneau vizibile.

**Videoclipurile nu se încarcă la deschiderea paginii.** Se vede doar posterul (~30–80 KB);
fișierul pornește abia la click. Fără asta, cele două testimoniale ar trage 16 MB la fiecare
vizită.

**Conținutul nu depinde de JavaScript.** Animația de apariție la scroll se activează doar
după ce un script din `<head>` confirmă că JS-ul rulează. Dacă JS-ul e blocat sau întârzie,
textul rămâne vizibil. Heroul nu are deloc animație de intrare — se randează instant.

---

## Publicare

`npm run build` produce `dist/`, HTML static pur. Se urcă oriunde: Netlify, Vercel,
Cloudflare Pages, sau prin FTP pe o găzduire clasică.

Înainte de publicare, pune adresa reală în `site.url` (`src/data/site.ts`) — de acolo se
generează `sitemap-index.xml` și adresele canonice.
