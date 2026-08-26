/**
 * Acordul numeralului in romana.
 *
 * Intre numar si substantiv se pune "de" doar cand ultimele doua cifre sunt
 * 00 sau intre 20 si 99:  9 proiecte,  17 site-uri,  dar  24 de proiecte,
 * 100 de proiecte, 121 de proiecte.
 *
 * Il folosim oriunde numarul vine dintr-o lista care creste (clienti, membri
 * ai echipei), ca textul sa ramana corect si dupa ce mai adaugi cateva.
 */
export function cuDe(numar: number, substantiv: string): string {
  const ultimele = numar % 100;
  const de = ultimele === 0 || ultimele >= 20 ? "de " : "";
  return `${numar} ${de}${substantiv}`;
}
