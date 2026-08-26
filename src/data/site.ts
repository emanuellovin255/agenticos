/**
 * ============================================================
 *  CONFIGURARE GENERALA — SINGURUL FISIER PE CARE TREBUIE
 *  SA-L COMPLETEZI CA SITE-UL SA FIE FUNCTIONAL.
 * ============================================================
 */
export const site = {
  /** ⚠ COMPLETEAZA: numele agentiei tale */
  nume: "Numele Agentiei",

  /** ⚠ COMPLETEAZA: o fraza scurta, apare sub logo si in meta description */
  tagline: "Site-uri care aduc clienți, nu doar aplauze.",

  /**
   * ⚠ COMPLETEAZA: numarul de WhatsApp in format international,
   * FARA `+`, FARA spatii, FARA paranteze.
   * Exemplu pentru 0722 123 456  ->  "40722123456"
   */
  whatsapp: "40700000000",

  /** ⚠ COMPLETEAZA */
  email: "contact@exemplu.ro",

  /** ⚠ COMPLETEAZA: orasul din care lucrezi (apare in datele structurate SEO) */
  oras: "București",

  /** ⚠ COMPLETEAZA: adresa finala a site-ului (fara slash la final) */
  url: "https://exemplu.ro",

  /** Cifre afisate in bara de incredere din hero. Actualizeaza-le pe masura ce cresc. */
  cifre: {
    siteuriLivrate: "24",
    aniExperienta: "6",
    timpMediuLivrare: "3 săptămâni",
  },

  /** Retele sociale. Lasa gol ("") ca sa nu apara iconita in footer. */
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
  },
} as const;

/** Mesajul implicit precompletat in WhatsApp cand nu exista un context anume. */
export const mesajImplicit =
  "Bună! Am ajuns pe site-ul vostru și aș vrea o ofertă personalizată.";
