/**
 * ============================================================
 *  TESTIMONIALE — video si text
 * ------------------------------------------------------------
 *  Cele cu `video` apar primele, in format vertical (ca pe telefon).
 *  Cele fara video apar ca citate.
 *
 *  VIDEO — trei variante, alegi ce vrei pentru fiecare:
 *    tip: "fisier"  -> sursa: "/testimoniale/nume.mp4"  (gazduit de noi)
 *    tip: "youtube" -> sursa: ID-ul din link (dupa "v=")
 *    tip: "vimeo"   -> sursa: numarul din link
 *
 *  Videoclipurile NU se incarca la deschiderea paginii. Se vede doar
 *  posterul; fisierul porneste abia cand vizitatorul apasa play.
 * ============================================================
 */

export type Video = {
  tip: "fisier" | "youtube" | "vimeo";
  sursa: string;
  /** Imaginea afisata inainte de play. Pentru "fisier" o poti genera
   *  cu o captura din video. Lasa "" ca sa folosesti primul cadru. */
  poster: string;
  /** "vertical" pentru filmari de pe telefon (9:16),
   *  "orizontal" pentru filmari clasice (16:9). */
  format: "vertical" | "orizontal";
};

export type Testimonial = {
  /** Numele persoanei care vorbeste. */
  nume: string;
  /** Rolul ei: "Proprietar", "Manager", "Medic primar"... */
  rol: string;
  /** Firma / locatia. Ideal, acelasi nume ca in clienti.ts. */
  client: string;
  /** Poza persoanei, in /public/testimoniale/. Lasa "" pentru initiale. */
  poza?: string;
  /** Citatul. Pentru testimonialele video, e rezumatul a ce se spune. */
  text: string;
  /** 1-5. Lasa gol daca nu vrei stelute. */
  rating?: number;
  video?: Video;
};

export const testimoniale: Testimonial[] = [
  {
    nume: "Pensiunea Izora",
    rol: "Proprietar",
    client: "Pensiunea Izora",
    text: "Ne-am dorit un site care să ne aducă rezervări directe, fără comision către alte platforme. Exact asta am primit — iar oaspeții ne scriu acum pe WhatsApp în loc să caute prin site-uri intermediare.",
    rating: 5,
    video: {
      tip: "fisier",
      sursa: "/testimoniale/pensiunea-izora.mp4",
      poster: "/testimoniale/pensiunea-izora-poster.jpg",
      format: "vertical",
    },
  },
  {
    nume: "Pensiunea Belvedere",
    rol: "Proprietar",
    client: "Pensiunea Belvedere",
    text: "Aveam doar pagina de Facebook și pierdeam întrebări în mesaje. Acum oamenii găsesc singuri prețurile și programul, iar noi discutăm doar cu cei care chiar vor să vină.",
    rating: 5,
    video: {
      tip: "fisier",
      sursa: "/testimoniale/pensiunea-belvedere.mp4",
      poster: "/testimoniale/pensiunea-belvedere-poster.jpg",
      format: "vertical",
    },
  },

  /* ---- Testimoniale scrise (exemple — inlocuieste-le cu ale tale) ---- */
  {
    nume: "Andrei Mureșan",
    rol: "Administrator",
    client: "Restaurant Mara",
    text: "Am lucrat cu ei trei săptămâni și n-am simțit niciun moment că trebuie să știu ceva tehnic. Puneau întrebările potrivite, eu răspundeam, ei construiau.",
    rating: 5,
  },
  {
    nume: "Dr. Ioana Petrescu",
    rol: "Medic primar",
    client: "Clinica Smile",
    text: "Cel mai mult a contat că au înțeles ce caută un pacient înainte să sune. Site-ul răspunde la întrebări pe care nici nu știam că le au oamenii.",
    rating: 5,
  },
];

/** Testimonialele cu video, afisate primele. */
export const testimonialeVideo = testimoniale.filter((t) => t.video);

/** Testimonialele doar text. */
export const testimonialeText = testimoniale.filter((t) => !t.video);
