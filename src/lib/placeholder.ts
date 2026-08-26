/**
 * Deseneaza imagini-substitut in stilul site-ului, cat timp lipsesc
 * assetsurile reale. Sunt SVG-uri generate direct in pagina — nu
 * incarca niciun fisier si dispar automat cand pui poza adevarata.
 */

const CULORI = {
  galben: "#FFD84D",
  coral: "#FF5C39",
  violet: "#7C5CFF",
} as const;

export type CuloareAccent = keyof typeof CULORI;

/** Initialele unui nume: "Pensiunea Izora" -> "PI" */
export function initiale(nume: string): string {
  return nume
    .split(/\s+/)
    .filter((c) => c.length > 2)
    .slice(0, 2)
    .map((c) => c[0]!.toUpperCase())
    .join("");
}

function svgDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

/** Un SVG e XML, deci textul pus in el trebuie escapat. Fara asta, un nume
 *  ca "Delta Resort & Spa" rupe fisierul si imaginea nu se mai afiseaza. */
function xml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Logo-substitut patrat, cu initialele clientului. */
export function logoPlaceholder(nume: string, accent: CuloareAccent = "galben"): string {
  const txt = initiale(nume);
  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="6" y="6" width="188" height="188" rx="16" fill="${CULORI[accent]}" stroke="#111" stroke-width="8"/>
      <text x="100" y="100" font-family="Trebuchet MS, Verdana, sans-serif" font-size="72"
            font-weight="700" fill="#111" text-anchor="middle" dominant-baseline="central">${xml(txt)}</text>
    </svg>`);
}

/** Avatar-substitut rotund pentru membrii echipei. */
export function avatarPlaceholder(nume: string, accent: CuloareAccent = "violet"): string {
  const txt = initiale(nume);
  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <rect width="240" height="240" fill="#FFF8E7"/>
      <circle cx="120" cy="120" r="96" fill="${CULORI[accent]}" stroke="#111" stroke-width="8"/>
      <circle cx="92" cy="104" r="11" fill="#111"/>
      <circle cx="148" cy="104" r="11" fill="#111"/>
      <path d="M88 148 Q120 176 152 148" stroke="#111" stroke-width="9" fill="none" stroke-linecap="round"/>
      <text x="120" y="212" font-family="Trebuchet MS, Verdana, sans-serif" font-size="26"
            font-weight="700" fill="#111" text-anchor="middle">${xml(txt)}</text>
    </svg>`);
}

/** Substitut pentru capturile de ecran ale site-urilor. */
export function screenshotPlaceholder(nume: string, accent: CuloareAccent = "galben"): string {
  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#FFF8E7"/>
      <rect x="8" y="8" width="784" height="484" rx="12" fill="#fff" stroke="#111" stroke-width="6"/>
      <rect x="8" y="8" width="784" height="56" rx="12" fill="${CULORI[accent]}" stroke="#111" stroke-width="6"/>
      <circle cx="46" cy="36" r="10" fill="#111"/><circle cx="80" cy="36" r="10" fill="#111"/><circle cx="114" cy="36" r="10" fill="#111"/>
      <rect x="60" y="120" width="360" height="34" rx="8" fill="#111" opacity=".85"/>
      <rect x="60" y="172" width="260" height="22" rx="7" fill="#111" opacity=".35"/>
      <rect x="60" y="206" width="300" height="22" rx="7" fill="#111" opacity=".35"/>
      <rect x="60" y="262" width="180" height="46" rx="10" fill="${CULORI[accent]}" stroke="#111" stroke-width="5"/>
      <rect x="480" y="120" width="252" height="188" rx="12" fill="${CULORI[accent]}" opacity=".5" stroke="#111" stroke-width="5"/>
      <text x="400" y="420" font-family="Trebuchet MS, Verdana, sans-serif" font-size="24"
            font-weight="700" fill="#111" opacity=".55" text-anchor="middle">${xml(nume)}</text>
    </svg>`);
}

/** Alege poza reala daca exista, altfel deseneaza substitutul. */
export function logoSau(logo: string, nume: string, accent: CuloareAccent): string {
  return logo && logo.trim() !== "" ? logo : logoPlaceholder(nume, accent);
}

export function avatarSau(avatar: string, nume: string, accent: CuloareAccent): string {
  return avatar && avatar.trim() !== "" ? avatar : avatarPlaceholder(nume, accent);
}

export function screenshotSau(src: string | undefined, nume: string, accent: CuloareAccent): string {
  return src && src.trim() !== "" ? src : screenshotPlaceholder(nume, accent);
}
