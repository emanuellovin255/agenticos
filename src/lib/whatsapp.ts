import { site, mesajImplicit } from "../data/site";

/**
 * Construieste linkul catre WhatsApp cu mesajul deja scris in casuta.
 * Vizitatorul apasa o data si conversatia porneste cu context, nu cu un "Buna" gol.
 */
export function linkWhatsApp(mesaj?: string): string {
  const numar = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${numar}?text=${encodeURIComponent(mesaj ?? mesajImplicit)}`;
}

/** Mesaj specific pentru pagina unui client din portofoliu. */
export function mesajPentruClient(numeClient: string): string {
  return `Bună! Am văzut pe site proiectul ${numeClient} și aș vrea o ofertă personalizată pentru afacerea mea.`;
}

/** Mesaj specific pentru un serviciu anume. */
export function mesajPentruServiciu(numeServiciu: string): string {
  return `Bună! Mă interesează ${numeServiciu} și aș vrea o ofertă personalizată.`;
}

/** Numarul formatat pentru afisare: 40722123456 -> +40 722 123 456 */
export function numarAfisat(): string {
  const n = site.whatsapp.replace(/\D/g, "");
  const rest = n.slice(2);
  return `+${n.slice(0, 2)} ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`.trim();
}
