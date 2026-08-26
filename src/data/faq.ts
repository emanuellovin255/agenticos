/**
 * ============================================================
 *  INTREBARI FRECVENTE
 * ------------------------------------------------------------
 *  Rolul acestei sectiuni e sa raspunda la obiectiile care
 *  opresc oamenii sa scrie. Fii concret, mai ales la pret.
 * ============================================================
 */

export type Intrebare = { intrebare: string; raspuns: string };

export const faq: Intrebare[] = [
  {
    intrebare: "Cât costă un site?",
    raspuns:
      "Depinde de câte pagini are și ce trebuie să facă. Un site de prezentare pentru o afacere locală pornește de la un preț pe care ți-l spunem în prima discuție, după ce înțelegem ce ai nevoie. Nu lucrăm cu prețuri ascunse: primești o ofertă scrisă, cu tot ce include, înainte să începem.",
  },
  {
    intrebare: "În cât timp e gata?",
    raspuns:
      "Un site de prezentare durează în medie trei săptămâni de la prima discuție până la lansare. Dacă ai deja textele și pozele pregătite, se poate mai repede. Termenul exact ți-l dăm în ofertă și îl respectăm.",
  },
  {
    intrebare: "Ce trebuie să pregătesc eu?",
    raspuns:
      "Ideal: poze cu locația sau produsele tale și câteva minute de discuție ca să înțelegem afacerea. Textele le scriem noi. Dacă nu ai poze bune, îți spunem exact ce să fotografiezi și cum, sau organizăm o ședință foto.",
  },
  {
    intrebare: "Pot să modific singur site-ul după lansare?",
    raspuns:
      "Da. La final îți arătăm cum să schimbi textele, pozele și prețurile, iar dacă vrei îți lăsăm un ghid scris. Pentru modificările mai mari suntem la un mesaj distanță.",
  },
  {
    intrebare: "Site-ul apare pe Google?",
    raspuns:
      "Da, optimizarea de bază pentru Google e inclusă în fiecare proiect: structură corectă, viteză, date structurate și configurare Google Business. Pentru poziții pe cuvinte-cheie competitive e nevoie de lucru continuu, iar asta discutăm separat.",
  },
  {
    intrebare: "Ce se întâmplă dacă nu îmi place designul?",
    raspuns:
      "Vezi designul înainte să se construiască ceva. Ceri modificări până când ești mulțumit — nu trecem la construcție până nu spui tu că e bine.",
  },
  {
    intrebare: "Cine deține site-ul?",
    raspuns:
      "Tu. Domeniul, găzduirea și codul sunt ale tale, pe conturile tale. Nu te legăm de noi ca să poți folosi ce ai plătit.",
  },
];
