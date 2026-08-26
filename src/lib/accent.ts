/**
 * Clasele pentru suprafetele colorate care CONTIN TEXT.
 *
 * Motivul pentru care violetul e altul aici decat in decoruri:
 *   text negru pe #7C5CFF ... 4.34:1  -> sub pragul WCAG AA (4.5:1)
 *   text alb  pe #6B46E8 ... 5.73:1  -> trece
 * Asa ca violetul deschis ramane doar pentru forme fara text, iar
 * oriunde apare scris folosim varianta inchisa cu text alb.
 */
export const suprafata = {
  galben: "bg-galben text-negru",
  coral: "bg-coral text-negru",
  violet: "bg-violet-d text-white",
} as const;

/** Varianta estompata a textului, pe aceleasi suprafete. */
export const suprafataSecundar = {
  galben: "text-negru/70",
  coral: "text-negru/70",
  violet: "text-white/80",
} as const;

/** Pastile/etichete asezate PESTE suprafetele de mai sus. */
export const pastilaPeste = {
  galben: "bg-crem text-negru",
  coral: "bg-crem text-negru",
  violet: "bg-crem text-negru",
} as const;
