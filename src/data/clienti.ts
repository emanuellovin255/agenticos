/**
 * ============================================================
 *  CLIENTI / PORTOFOLIU
 * ------------------------------------------------------------
 *  Fiecare obiect din lista de mai jos genereaza AUTOMAT:
 *    - un logo in zidul de logouri de pe prima pagina
 *    - un card in sectiunea Portofoliu
 *    - o pagina proprie la /portofoliu/<slug>
 *
 *  CA SA ADAUGI UN CLIENT NOU: copiaza un bloc { ... } intreg,
 *  lipeste-l in lista si schimba datele. Atat.
 * ============================================================
 */

export type Accent = "galben" | "coral" | "violet";

export type Client = {
  /** Adresa paginii: "pensiunea-izora" -> /portofoliu/pensiunea-izora
   *  Doar litere mici, cifre si liniute. Fara spatii, fara diacritice. */
  slug: string;
  nume: string;
  oras: string;
  /** Domeniul de activitate. Apare ca eticheta pe card. */
  categorie: string;
  /** Calea catre logo in /public/logos/. Lasa "" si se deseneaza
   *  automat un logo-placeholder cu initialele clientului. */
  logo: string;
  /** Captura de ecran a site-ului, in /public/portofoliu/. Optional. */
  screenshot?: string;
  /** 2-4 fraze despre locatie. Apare pe pagina clientului. */
  descriere: string;
  /** Ce problema avea clientul inainte. Optional, dar convinge. */
  provocare?: string;
  /** Ce s-a schimbat dupa lansare. Optional, dar convinge cel mai tare. */
  rezultat?: string;
  /** Ce ai livrat concret. Apare ca lista de etichete. */
  livrabile?: string[];
  /** ⚠ LINKUL CATRE SITEUL LIVE.
   *  Cat timp e "", butonul afiseaza "In curand" si NU e clicabil. */
  linkSite: string;
  /** Culoarea cardului. Roteste-le ca pagina sa fie colorata. */
  accent: Accent;
};

export const clienti: Client[] = [
  {
    slug: "pensiunea-izora",
    nume: "Pensiunea Izora",
    oras: "Vatra Dornei",
    categorie: "Turism",
    logo: "",
    descriere:
      "Pensiune de munte cu 14 camere, la câțiva pași de pârtie. Publicul principal sunt familiile care își planifică vacanța cu câteva săptămâni înainte și rezervă direct, fără intermediari.",
    provocare:
      "Rezervările veneau aproape exclusiv prin platforme externe, care luau comision din fiecare noapte de cazare. Nu exista un loc unde oaspeții să vadă camerele și să scrie direct proprietarilor.",
    rezultat:
      "Site cu galerie pe camere și buton de rezervare directă pe WhatsApp, vizibil pe toate paginile. Oaspeții pot cere disponibilitate în mai puțin de zece secunde de la aterizarea pe site.",
    livrabile: ["Site de prezentare", "Galerie foto pe camere", "Rezervare pe WhatsApp", "Optimizare SEO local"],
    linkSite: "",
    accent: "violet",
  },
  {
    slug: "pensiunea-belvedere",
    nume: "Pensiunea Belvedere",
    oras: "Bran",
    categorie: "Turism",
    logo: "",
    descriere:
      "Pensiune cu priveliște spre Castelul Bran, orientată către cupluri și grupuri mici care vin pentru weekenduri prelungite. Sezonul de vârf se decide în câteva săptămâni, deci viteza de răspuns contează enorm.",
    provocare:
      "Aveau un profil de Facebook și atât. Fiecare întrebare despre preț sau disponibilitate se pierdea în mesaje, iar oaspeții nu aveau unde să vadă locația înainte să întrebe.",
    rezultat:
      "O pagină care răspunde singură la întrebările frecvente — prețuri, facilități, cum ajungi — și lasă doar decizia finală pentru conversația pe WhatsApp.",
    livrabile: ["Site de prezentare", "Secțiune întrebări frecvente", "Hartă și indicații", "Optimizare pentru mobil"],
    linkSite: "",
    accent: "galben",
  },

  /* ------------------------------------------------------------------
   *  EXEMPLE — sterge-le sau inlocuieste-le cu clientii tai reali.
   *  Sunt aici ca site-ul sa arate plin din prima secunda.
   * ------------------------------------------------------------------ */
  {
    slug: "restaurant-mara",
    nume: "Restaurant Mara",
    oras: "Cluj-Napoca",
    categorie: "HoReCa",
    logo: "",
    descriere:
      "Restaurant cu bucătărie tradițională în centrul Clujului, cu 60 de locuri și un meniu care se schimbă sezonier.",
    provocare:
      "Meniul circula ca poză pe telefon, imposibil de citit. Clienții sunau ca să întrebe programul.",
    rezultat:
      "Meniu digital care se actualizează într-un singur loc și apare instant pe site, plus rezervări directe.",
    livrabile: ["Site de prezentare", "Meniu digital", "Rezervări online"],
    linkSite: "",
    accent: "coral",
  },
  {
    slug: "clinica-dentara-smile",
    nume: "Clinica Smile",
    oras: "Timișoara",
    categorie: "Medical",
    logo: "",
    descriere:
      "Cabinet stomatologic cu trei medici, specializat pe ortodonție și estetică dentară.",
    provocare:
      "Pacienții nu găseau clinica pe Google și nu aveau încredere într-un cabinet fără prezență online.",
    rezultat:
      "Site cu profilurile medicilor, prețuri transparente și programare rapidă. Pacienții vin deja informați.",
    livrabile: ["Site de prezentare", "Profiluri medici", "Formular de programare", "SEO local"],
    linkSite: "",
    accent: "violet",
  },
  {
    slug: "atelier-lemn-viu",
    nume: "Atelier Lemn Viu",
    oras: "Brașov",
    categorie: "Producție",
    logo: "",
    descriere:
      "Atelier de mobilă la comandă, din lemn masiv. Fiecare piesă e unicat, iar clienții vin pe recomandare.",
    provocare:
      "Portofoliul exista doar pe Instagram, unde lucrările vechi se pierdeau după câteva luni.",
    rezultat:
      "Portofoliu organizat pe categorii, cu poveste în spatele fiecărei piese. Comenzile încep din site.",
    livrabile: ["Site portofoliu", "Galerie pe categorii", "Formular de comandă"],
    linkSite: "",
    accent: "galben",
  },
  {
    slug: "scoala-de-soferi-drum-bun",
    nume: "Școala Drum Bun",
    oras: "Iași",
    categorie: "Educație",
    logo: "",
    descriere:
      "Școală de șoferi cu peste 800 de cursanți pe an, categoriile B și A.",
    provocare:
      "Înscrierile se făceau doar la sediu. Jumătate din cei interesați renunțau înainte să ajungă acolo.",
    rezultat:
      "Preînscriere online cu acte încărcate direct din telefon. Drumul până la sediu a rămas ultimul pas, nu primul.",
    livrabile: ["Site de prezentare", "Preînscriere online", "Program instructori"],
    linkSite: "",
    accent: "coral",
  },
];

/** Cauta un client dupa slug. Folosit de pagina /portofoliu/[slug]. */
export function clientDupaSlug(slug: string): Client | undefined {
  return clienti.find((c) => c.slug === slug);
}

/** Clientul urmator din lista, ca vizitatorul sa continue navigarea. */
export function clientUrmator(slug: string): Client {
  const i = clienti.findIndex((c) => c.slug === slug);
  return clienti[(i + 1) % clienti.length]!;
}
