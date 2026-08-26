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
 *
 *  LOGOURILE stau in /public/logos/. Originalele sunt in /Logos/ si se
 *  pregatesc cu `npm run logos` (taie marginea, curata, salveaza PNG-ul).
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
  /** Culoarea pe care e desenat logoul, luata din logoul original.
   *  Placuta din spatele lui primeste exact aceasta culoare, ca logoul
   *  sa arate la fel ca pe site-ul clientului. Lasa "" daca logoul are
   *  fundal transparent. O completeaza `npm run logos`. */
  logoFundal?: string;
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
    oras: "Crișan, Delta Dunării",
    categorie: "Turism",
    logo: "/logos/pensiunea-izora.png",
    logoFundal: "#f7fafb",
    descriere:
      "Pensiune de 4 margarete în Crișan, pe brațul Sulina, în inima Deltei Dunării. Se ajunge doar pe apă, cu transfer cu barca de la Murighiol. Are bucătărie pescărească proprie, șalupe rapide și excursii la Letea, Mila 23, Caraorman și Sulina.",
    provocare:
      "Rezervările veneau aproape exclusiv prin platforme externe, care luau comision din fiecare noapte de cazare. Nu exista un loc unde oaspeții să vadă camerele și să scrie direct proprietarilor.",
    rezultat:
      "Site cu galerie pe camere și buton de rezervare directă pe WhatsApp, vizibil pe toate paginile. Oaspeții pot cere disponibilitate în mai puțin de zece secunde de la aterizarea pe site.",
    livrabile: ["Site de prezentare", "Galerie foto pe camere", "Rezervare pe WhatsApp", "Optimizare SEO local"],
    linkSite: "https://www.pensiuneaizora.com/",
    accent: "violet",
  },
  {
    slug: "pensiunea-belvedere",
    nume: "Pensiunea Belvedere Murighiol",
    oras: "Murighiol, Tulcea",
    categorie: "Turism",
    logo: "/logos/belvedere-murighiol.png",
    logoFundal: "#fcfbf9",
    descriere:
      "Pensiune pe malul Lacului Murighiol, în zona protejată a Deltei Dunării, la aproximativ patru ore de mers cu mașina din București. Are restaurant pescăresc propriu, piscină cu apă încălzită și excursii cu barca pe șase trasee din Deltă.",
    provocare:
      "Aveau un profil de Facebook și atât. Fiecare întrebare despre preț sau disponibilitate se pierdea în mesaje, iar oaspeții nu aveau unde să vadă locația înainte să întrebe.",
    rezultat:
      "O pagină care răspunde singură la întrebările frecvente — prețuri, facilități, cum ajungi — și lasă doar decizia finală pentru conversația pe WhatsApp.",
    livrabile: ["Site de prezentare", "Secțiune întrebări frecvente", "Hartă și indicații", "Optimizare pentru mobil"],
    linkSite: "https://www.belvederemurighiol.ro/",
    accent: "galben",
  },
  {
    slug: "delta-resort-spa",
    nume: "Delta Resort & Spa",
    oras: "Dunavățu de Jos, Tulcea",
    categorie: "Turism",
    logo: "/logos/delta-resort-spa.png",
    logoFundal: "",
    descriere:
      "Resort și spa în Delta Dunării, la Dunavățu de Jos: două piscine, saune, jacuzzi, restaurant cu pește proaspăt și debarcader cu bărci proprii.",
    livrabile: ["Site de prezentare", "Galerie foto", "Secțiune spa și facilități", "Cerere de rezervare"],
    linkSite: "https://delta-resort-spa.vercel.app/",
    accent: "coral",
  },
  {
    slug: "pensiunea-mystique",
    nume: "Pensiunea Mystique",
    oras: "Arad",
    categorie: "Turism",
    logo: "/logos/mistique.png",
    logoFundal: "#21345e",
    descriere:
      "Pensiune de 3 stele în Arad, cartierul Micalaca. Camere cu balcon, aer condiționat și Wi-Fi gratuit, cu parcare privată și transfer de la aeroport incluse.",
    livrabile: ["Site de prezentare", "Prețuri pe cameră", "Rezervare pe WhatsApp"],
    linkSite: "https://pensiunea-mistique.vercel.app/",
    accent: "violet",
  },
  {
    slug: "pensiunea-la-nasu",
    nume: "Pensiunea La Nașu",
    oras: "Focșani",
    categorie: "Turism",
    logo: "/logos/pensiunea-lanasu.png",
    logoFundal: "#f7f4ed",
    descriere:
      "Pensiune cu 13 camere la Focșani, pe DN 2 la kilometrul 189. Camere cu baie proprie, aer condiționat, TV și Wi-Fi, parcare închisă și supravegheată, iar animalele de companie sunt binevenite.",
    livrabile: ["Site de prezentare", "Galerie foto pe camere", "Indicații de pe DN 2", "Optimizare pentru mobil"],
    linkSite: "https://pensiunea-lanasu.vercel.app/",
    accent: "coral",
  },
  {
    slug: "potcoava-dunarii",
    nume: "Potcoava Dunării",
    oras: "Suhaia, Teleorman",
    categorie: "Evenimente",
    logo: "/logos/potcoava-dunarii.png",
    logoFundal: "#0b1613",
    descriere:
      "Salon de evenimente de 600 de locuri pe malul Dunării, la Suhaia. Pe aceeași proprietate sunt cazare în cabane A-frame, restaurant cu bucătărie proprie și piscină.",
    livrabile: ["Site de prezentare", "Pagină de evenimente", "Galerie foto", "Formular de cerere ofertă"],
    linkSite: "https://potcoava-dunarii.vercel.app/",
    accent: "galben",
  },
  {
    slug: "villa-giulia",
    nume: "Villa Giulia",
    oras: "Islaz, Teleorman",
    categorie: "Turism",
    logo: "/logos/pensiunea-giulia.png",
    logoFundal: "#f7f2e8",
    descriere:
      "Pensiune de 3 stele pe malul Dunării, la Islaz. Opt camere cu mobilier antic, piscină, saună, grădină și o bucătărie italo-românească gătită cu produse din gospodăria proprie.",
    livrabile: ["Site de prezentare", "Galerie foto pe camere", "Pagină de restaurant", "Rezervare pe WhatsApp"],
    linkSite: "https://pensiunea-giulia.vercel.app/",
    accent: "violet",
  },
  {
    slug: "casa-irlandeza",
    nume: "Casa Irlandeză",
    oras: "Băile Felix",
    categorie: "Turism",
    logo: "",
    logoFundal: "",
    descriere:
      "Pensiune de 3 stele în Băile Felix, ținută de Florina și Eoghain. Camere cu balcon și bucătărie proprie, ciubăr cu hidromasaj, saună și grădină cu loc de joacă, la zece minute pe jos de ștrandurile Apollo.",
    livrabile: ["Site de prezentare", "Galerie foto", "Recenzii de pe Booking", "Rezervare pe WhatsApp"],
    linkSite: "https://casa-irlandeza.vercel.app/",
    accent: "coral",
  },
  {
    slug: "piano-house",
    nume: "Piano House",
    oras: "Alba Iulia",
    categorie: "Turism",
    logo: "/logos/piano-house.png",
    logoFundal: "#171514",
    descriere:
      "Trei spații renovate complet în centrul orașului Alba Iulia, la zece minute de Cetatea Alba Carolina. Parcare gratuită în curte, bucătărie utilată și Wi-Fi nelimitat.",
    livrabile: ["Site de prezentare", "Site în două limbi", "Galerie pe apartamente", "Cerere de rezervare"],
    linkSite: "https://piano-house.vercel.app/ro",
    accent: "galben",
  },
  {
    slug: "caprice-events",
    nume: "Caprice Events & Hotel",
    oras: "Bacău",
    categorie: "Evenimente",
    logo: "/logos/caprice.png",
    logoFundal: "#0a0d0a",
    descriere:
      "Nunți, botezuri și evenimente corporate în Bacău. Două saloane, grădină pentru cununie, hotel de 4 stele cu 21 de camere și spa, toate pe aceeași proprietate.",
    livrabile: ["Site de prezentare", "Site în două limbi", "Pagini pe saloane", "Formular de cerere ofertă"],
    linkSite: "https://events-caprice.vercel.app/ro",
    accent: "coral",
  },
  {
    slug: "vila-carolina-apulum",
    nume: "Vila Carolina Apulum",
    oras: "Alba Iulia",
    categorie: "Turism",
    logo: "/logos/vila-carolina-apulum.png",
    logoFundal: "#201c18",
    descriere:
      "Cazare în regim hotelier în centrul Alba Iuliei, la cinci minute de Cetatea Alba Carolina. Wi-Fi și parcare gratuite, bucătărie utilată și două băi cu cadă cu hidromasaj.",
    livrabile: ["Site de prezentare", "Site în două limbi", "Galerie foto", "Rezervare pe WhatsApp"],
    linkSite: "https://vila-carolina-apulum.vercel.app/ro",
    accent: "violet",
  },
  {
    slug: "pensiunea-beverly-hills",
    nume: "Pensiunea Beverly Hills",
    oras: "Băile Felix",
    categorie: "Turism",
    logo: "/logos/pensiunea-beverly-hills.png",
    logoFundal: "#d4e0ed",
    descriere:
      "Pensiune în Băile Felix, la cinci minute pe jos de Izvorul Apollo. Camere între 20 și 48 de metri pătrați, bucătărie și living la comun, terasă cu grătar, foișor, loc de joacă și parcare gratuită.",
    livrabile: ["Site de prezentare", "Galerie foto pe camere", "Recenzii de la oaspeți", "Optimizare pentru mobil"],
    linkSite: "https://www.pensiuneabeverlyhills.ro/",
    accent: "galben",
  },
  {
    slug: "pensiunea-raul-iulia",
    nume: "Pensiunea Raul & Iulia",
    oras: "Băile Felix",
    categorie: "Turism",
    logo: "/logos/pensiunea-raul-iulia.png",
    logoFundal: "#f6f4ed",
    descriere:
      "Pensiune de 3 stele în Băile Felix, la 400 de metri de ștranduri. Camere cu bucătărie proprie, baie și aer condiționat, plus curte cu foișor și grătar.",
    livrabile: ["Site de prezentare", "Galerie foto", "Hartă și indicații", "Rezervare pe WhatsApp"],
    linkSite: "https://www.pensiunearauliulia.com/",
    accent: "coral",
  },
  {
    slug: "thermal-family-resort",
    nume: "Thermal Family Resort",
    oras: "Băile Felix",
    categorie: "Turism",
    logo: "/logos/thermal-family-resort.png",
    logoFundal: "#f9fafa",
    descriere:
      "Pensiune în Băile Felix cu trei piscine, grădină, terasă și bar. La 3,6 km de Aquapark President și la 7 km de Oradea, cu parcare și Wi-Fi gratuite.",
    livrabile: ["Site de prezentare", "Galerie foto", "Pagină de facilități", "Cerere de rezervare"],
    linkSite: "https://thermal-family-resort.vercel.app/",
    accent: "violet",
  },
  {
    slug: "scoala-auto-viovas",
    nume: "Școala Auto Viovas",
    oras: "Iași",
    categorie: "Educație",
    logo: "/logos/viovas.png",
    logoFundal: "#0d0e11",
    descriere:
      "Școală auto din Iași, activă din 2006. Cursuri pentru categoriile A și A1, B, C, CE și D, cu parc auto propriu și instructori cu experiență.",
    livrabile: ["Site de prezentare", "Pagini pe categorii", "Formular de înscriere", "Optimizare SEO local"],
    linkSite: "https://scoala-viovas.vercel.app/",
    accent: "galben",
  },
  {
    slug: "traffic-liviu",
    nume: "Școala Traffic Liviu",
    oras: "Bacău",
    categorie: "Educație",
    logo: "/logos/traffic-liviu.png",
    logoFundal: "#08080a",
    descriere:
      "Școală de șoferi auto și moto din Bacău, deschisă din 2002. Categoriile B, B cu cutie automată, A, A2, A1 și AM, cu program lung de luni până sâmbătă.",
    livrabile: ["Site de prezentare", "Pagini pe categorii", "Program și tarife", "Înscriere pe WhatsApp"],
    linkSite: "https://liviu-trafic.vercel.app/",
    accent: "coral",
  },
  {
    slug: "elektro-kasper",
    nume: "Elektro Kasper",
    oras: "Nürnberg, Germania",
    categorie: "Servicii tehnice",
    logo: "/logos/elektro-kasper.png",
    logoFundal: "#04090b",
    descriere:
      "Firmă de instalații electrice din Nürnberger Land: instalații, fotovoltaice, sisteme de securitate și stații de încărcare pentru mașini electrice. Site în germană, pentru clienți din Germania.",
    livrabile: ["Site de prezentare", "Site în germană", "Pagini pe servicii", "Formular de cerere ofertă"],
    linkSite: "https://elektro-kasper.vercel.app/",
    accent: "violet",
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
