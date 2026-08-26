/**
 * ============================================================
 *  ECHIPA
 * ------------------------------------------------------------
 *  Pune avatarurile cartoon in /public/echipa/ si scrie numele
 *  fisierului la `avatar`. Cat timp e "", se deseneaza automat
 *  un avatar-placeholder cu initialele.
 * ============================================================
 */

export type Membru = {
  /** ⚠ Numele real al persoanei. */
  nume: string;
  rol: string;
  /** O fraza despre ce face concret persoana asta in proiect. */
  descriere: string;
  /** Ce livreaza efectiv. Apare ca lista de etichete pe card. */
  atributii: string[];
  /** "/echipa/nume.png" — lasa "" pentru placeholder cu initiale. */
  avatar: string;
  accent: "galben" | "coral" | "violet";
};

export const echipa: Membru[] = [
  {
    nume: "Tu", // ⚠ pune-ti numele aici
    rol: "Strategist / Project Manager",
    descriere:
      "Discută cu clientul, definește obiectivele, structura site-ului, tonul de brand și termenele. E singura persoană cu care ai de vorbit de la început până la final.",
    atributii: ["Discuție inițială", "Obiective", "Structura site-ului", "Ton de brand", "Termene"],
    avatar: "",
    accent: "coral",
  },
  {
    nume: "UX/UI Designer",
    rol: "Design & identitate vizuală",
    descriere:
      "Construiește layoutul, paleta de culori și identitatea vizuală. Lucrează cu mockup-uri și canvas vizual, ca să vezi site-ul înainte să existe.",
    atributii: ["Layout", "Paletă de culori", "Identitate vizuală", "Mockup-uri"],
    avatar: "",
    accent: "violet",
  },
  {
    nume: "Web Developer",
    rol: "Dezvoltare",
    descriere:
      "Transformă designul în site real: cod, funcționalitate, comportament pe telefon și tabletă. Se ocupă ca totul să funcționeze, nu doar să arate bine.",
    atributii: ["Cod", "Funcționalitate", "Responsive", "Integrări"],
    avatar: "",
    accent: "galben",
  },
  {
    nume: "Content & Copywriting",
    rol: "Texte & SEO on-page",
    descriere:
      "Scrie textele, structura SEO on-page, descrierile de servicii și îndemnurile la acțiune. Se asigură că fiecare pagină spune ceva, nu doar umple spațiu.",
    atributii: ["Texte", "SEO on-page", "Descrieri servicii", "Call-to-action"],
    avatar: "",
    accent: "coral",
  },
  {
    nume: "QA & Optimizare",
    rol: "Testare & performanță",
    descriere:
      "Testează totul pe dispozitive reale, verifică viteza de încărcare și face optimizările tehnice SEO înainte de livrare. Nimic nu pleacă nevăzut.",
    atributii: ["Testare", "Performanță", "Verificare cross-device", "SEO tehnic"],
    avatar: "",
    accent: "violet",
  },
];
