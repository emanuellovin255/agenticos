/**
 * ============================================================
 *  ECHIPA
 * ------------------------------------------------------------
 *  Ordinea de aici e ordinea de pe site.
 *
 *  POZELE stau in src/assets/echipa/. Campul `imagine` e numele
 *  fisierului FARA extensie. Ca sa schimbi o poza, pune originalul in
 *  /Echipa/ si ruleaza `npm run echipa` — scriptul ii scoate fundalul alb
 *  si il inlocuieste cu cremul site-ului.
 *  Daca `imagine` e "" sau fisierul lipseste, se deseneaza automat
 *  un avatar-substitut, ca sa nu ramana un loc gol.
 * ============================================================
 */

export type Membru = {
  /** Rolul, scris sub nume. */
  rol: string;
  /** Numele persoanei — asta e titlul cardului.
   *  Optional: lasa "" si ramane doar rolul. */
  nume: string;
  /** O singura propozitie, pe intelesul oricui. Fara termeni tehnici. */
  descriere: string;
  /** Ce face concret. Apare ca lista de etichete. */
  atributii: string[];
  /** Numele fisierului din src/assets/echipa/, fara extensie. */
  imagine: string;
  accent: "galben" | "coral" | "violet";
};

export const echipa: Membru[] = [
  {
    rol: "Project Manager",
    nume: "Emanuel",
    descriere:
      "Persoana cu care vorbești de la primul mesaj până la lansare: înțelege ce vrei, ține totul în grafic și îți spune mereu unde suntem.",
    atributii: ["Discuția inițială", "Obiective", "Structura site-ului", "Termene"],
    imagine: "project-manager",
    accent: "coral",
  },
  {
    rol: "UX/UI Designer",
    nume: "Ioana",
    descriere:
      "Decide cum arată site-ul și unde stă fiecare buton, ca vizitatorul să găsească din prima ce caută, fără să se piardă.",
    atributii: ["Aspectul paginilor", "Culori și fonturi", "Identitate vizuală"],
    imagine: "ux-ui-designer",
    accent: "violet",
  },
  {
    rol: "Web Developer",
    nume: "Bogdan",
    descriere:
      "Transformă desenul în site care chiar funcționează — la fel de bine pe telefon, pe tabletă și pe calculator.",
    atributii: ["Construcția site-ului", "Funcționalități", "Afișare pe telefon"],
    imagine: "web-developer",
    accent: "galben",
  },
  {
    rol: "Content & Copywriting",
    nume: "Sofia",
    descriere:
      "Scrie textele de pe site, ca omul care intră să înțeleagă din primele secunde ce faci și de ce merită să te aleagă.",
    atributii: ["Textele paginilor", "Descrieri de servicii", "Optimizare pentru Google"],
    imagine: "copywriting",
    accent: "coral",
  },
  {
    rol: "QA & Optimizare",
    nume: "David",
    descriere:
      "Verifică tot site-ul înainte de lansare și se asigură că se încarcă repede și că nimic nu se strică pe niciun telefon.",
    atributii: ["Testare pe dispozitive reale", "Viteză de încărcare", "Verificări finale"],
    imagine: "qa-optimizare",
    accent: "violet",
  },
];
