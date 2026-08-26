/**
 * ============================================================
 *  SERVICII + PROCESUL DE LUCRU
 * ============================================================
 */

export type Serviciu = {
  titlu: string;
  descriere: string;
  /** Ce intra concret in pachet. */
  include: string[];
  /** Numele iconitei desenate in components/Icon.astro */
  icon: "monitor" | "creion" | "cod" | "lupa" | "telefon" | "fulger";
  accent: "galben" | "coral" | "violet";
};

export const servicii: Serviciu[] = [
  {
    titlu: "Site de prezentare",
    descriere:
      "Site-ul complet al afacerii tale: cine ești, ce oferi, de ce ai fi alegerea bună și cum te contactează cineva în zece secunde.",
    include: ["Structură pe măsura afacerii", "Texte scrise de la zero", "Formular sau WhatsApp", "Găzduire configurată"],
    icon: "monitor",
    accent: "galben",
  },
  {
    titlu: "Identitate vizuală",
    descriere:
      "Culori, tipografie și un stil vizual pe care îl poți folosi peste tot — de la site până la meniu sau ambalaj.",
    include: ["Paletă de culori", "Alegere fonturi", "Reguli de folosire", "Materiale de bază"],
    icon: "creion",
    accent: "violet",
  },
  {
    titlu: "Magazin online",
    descriere:
      "Vinzi direct de pe site, cu plată online și gestiune simplă a comenzilor. Fără comisioane către alte platforme.",
    include: ["Catalog de produse", "Coș și plată online", "Gestiune comenzi", "Facturare"],
    icon: "cod",
    accent: "coral",
  },
  {
    titlu: "Optimizare SEO",
    descriere:
      "Ca oamenii să te găsească pe Google când caută ce oferi tu, în orașul tău, fără să plătești reclamă lună de lună.",
    include: ["Cercetare cuvinte-cheie", "Optimizare on-page", "Google Business", "Date structurate"],
    icon: "lupa",
    accent: "violet",
  },
  {
    titlu: "Site pe telefon",
    descriere:
      "Peste 70% dintre vizitatori vin de pe telefon. Site-ul e gândit întâi pentru ecranul mic, apoi extins pe desktop.",
    include: ["Design mobile-first", "Testare pe dispozitive reale", "Butoane ușor de apăsat", "Încărcare rapidă"],
    icon: "telefon",
    accent: "galben",
  },
  {
    titlu: "Viteză & mentenanță",
    descriere:
      "Un site lent pierde jumătate din vizitatori în primele trei secunde. Ne ocupăm ca al tău să nu fie acela.",
    include: ["Optimizare imagini", "Scor Lighthouse 95+", "Actualizări de securitate", "Copii de siguranță"],
    icon: "fulger",
    accent: "coral",
  },
];

export type Pas = { numar: string; titlu: string; descriere: string; durata: string };

export const proces: Pas[] = [
  {
    numar: "01",
    titlu: "Discuția inițială",
    descriere:
      "Ne spui ce faci, cui te adresezi și ce vrei să se întâmple după ce cineva îți vizitează site-ul. Durează o oră și e gratuită.",
    durata: "1 oră",
  },
  {
    numar: "02",
    titlu: "Structură și design",
    descriere:
      "Primești structura paginilor și designul înainte să se scrie o linie de cod. Ceri modificări până când e exact cum vrei.",
    durata: "3–5 zile",
  },
  {
    numar: "03",
    titlu: "Construcție",
    descriere:
      "Se construiește site-ul, se scriu textele și se optimizează pentru Google. Vezi progresul pe un link privat, în timp real.",
    durata: "1–2 săptămâni",
  },
  {
    numar: "04",
    titlu: "Testare și lansare",
    descriere:
      "Se testează pe telefon, tabletă și calculator, se verifică viteza, apoi site-ul intră live pe domeniul tău. Îți arătăm cum să-l administrezi.",
    durata: "2–3 zile",
  },
];
