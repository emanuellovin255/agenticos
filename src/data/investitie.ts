/**
 * ============================================================
 *  PACHETE SI INVESTITIE
 * ------------------------------------------------------------
 *  Pe site vorbim despre INVESTITIE, nu despre pret: clientul nu
 *  cumpara un fisier, ci un instrument care ii aduce clienti. Tine
 *  limbajul asta si cand scrii aici.
 *
 *  Sumele se scriu ca text, exact cum vrei sa apara pe site
 *  (in romana, separatorul de mii e punctul: "1.579 lei").
 * ============================================================
 */

export type Pachet = {
  slug: string;
  nume: string;
  /** Suma, scrisa exact cum apare pe site. Se plateste o singura data. */
  investitie: string;
  /** O fraza care spune pentru CINE e pachetul. */
  potrivitPentru: string;
  /** 2-3 fraze in limbaj normal. Fara termeni tehnici. */
  descriere: string;
  /** Ce primeste clientul, pe scurt si pe intelesul lui. */
  include: string[];
  /** Marcheaza pachetul recomandat. Pune true la unul singur. */
  recomandat?: boolean;
  accent: "galben" | "coral" | "violet";
};

export const pachete: Pachet[] = [
  {
    slug: "pagina-de-prezentare",
    nume: "Pagină de prezentare",
    investitie: "1.579 lei",
    potrivitPentru: "Pentru afaceri mici care vor să fie găsite și contactate rapid",
    descriere:
      "O singură pagină, dar completă. Cineva intră, derulează de sus până jos și află tot ce trebuie: ce faci, de ce ești alegerea bună și cum te contactează. E cea mai rapidă cale să exiști online ca lumea.",
    include: [
      "O pagină cu toate secțiunile importante",
      "Buton de WhatsApp la îndemână peste tot",
      "Arată bine pe telefon, tabletă și calculator",
      "Configurare ca să apari pe Google",
      "Poze prelucrate și texte scrise de noi",
    ],
    accent: "galben",
  },
  {
    slug: "website-complet",
    nume: "Website complet",
    investitie: "2.865 lei",
    potrivitPentru: "Pentru afaceri cu mai multe servicii sau mai multe lucruri de arătat",
    descriere:
      "Mai multe pagini separate — acasă, servicii, despre noi, galerie, contact. Fiecare serviciu are locul lui, cu spațiu să-l explici cum trebuie. Alegerea potrivită când o singură pagină devine prea încărcată.",
    include: [
      "5–7 pagini, structurate pe ce oferi",
      "Galerie foto organizată pe categorii",
      "Formular de contact plus buton de WhatsApp",
      "Optimizare Google mai amănunțită, pe fiecare pagină",
      "Secțiune de noutăți sau blog, dacă vrei",
      "Poze prelucrate și texte scrise de noi",
    ],
    recomandat: true,
    accent: "coral",
  },
  {
    slug: "magazin-online",
    nume: "Magazin online complet",
    investitie: "4.497 lei",
    potrivitPentru: "Pentru cine vinde produse și vrea banii direct, fără intermediari",
    descriere:
      "Vinzi direct de pe site-ul tău. Clientul alege produsele, plătește cu cardul, tu primești comanda pe e-mail. Fără comision către alte platforme și fără să dai jumătate din câștig altcuiva.",
    include: [
      "Catalog de produse cu poze, prețuri și descrieri",
      "Coș de cumpărături și plată cu cardul",
      "Vezi și gestionezi comenzile dintr-un singur loc",
      "Urmărire automată a stocurilor",
      "Legătură cu firmele de curierat",
      "Facturi generate automat",
    ],
    accent: "violet",
  },
];

/**
 * Beneficiile incluse in TOATE pachetele. Apar separat, sub carduri,
 * ca sa nu se repete de trei ori aceeasi lista.
 */
export const incluseInToate = [
  {
    titlu: "Tablou de bord personalizat",
    descriere:
      "Un panou simplu, făcut special pentru site-ul tău, de unde schimbi singur textele, pozele și prețurile. Arată ca un formular: scrii în căsuță, apeși „Salvează”, s-a schimbat pe site. Fără cod, fără programe de instalat și fără să ne suni pentru fiecare virgulă.",
    icon: "monitor" as const,
  },
  {
    titlu: "Mentenanță gratuită",
    descriere:
      "Ne ocupăm noi ca site-ul să rămână rapid, sigur și funcțional: actualizări, copii de siguranță și verificări periodice. Nu plătești nimic lunar în plus și nu trebuie să știi când sau ce se actualizează.",
    icon: "fulger" as const,
  },
];

/** Ce vrem sa fie clar inainte ca omul sa intrebe cat costa. */
export const notitaInvestitie =
  "Sumele sunt finale pentru pachetul respectiv — nu apar costuri surpriză la final și nu plătești nimic lunar către noi. Domeniul și găzduirea se plătesc separat, direct de tine, și rămân pe numele tău.";

/**
 * Cele trei lucruri care fac diferenta intre „pret" si „investitie".
 * Apar deasupra pachetelor, ca omul sa stie ce cumpara inainte sa vada suma.
 */
export const deCeInvestitie = [
  {
    titlu: "Plătești o singură dată",
    descriere:
      "Nu e abonament. Suma din pachet e tot ce dai către noi, iar site-ul rămâne al tău din prima zi.",
    icon: "check" as const,
  },
  {
    titlu: "Nu plătești mentenanța",
    descriere:
      "Actualizările, copiile de siguranță și verificările intră în pachet. Nu apare niciun cost lunar peste.",
    icon: "fulger" as const,
  },
  {
    titlu: "Îl administrezi singur",
    descriere:
      "Primești un panou din care schimbi texte, poze și prețuri fără să ne suni și fără să plătești pe oră.",
    icon: "monitor" as const,
  },
];
