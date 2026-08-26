/**
 * Face cate o captura cu prima pagina a fiecarui site din portofoliu.
 *
 * Ce face, pe scurt:
 *   1. citeste singur perechile slug + linkSite din src/data/clienti.ts;
 *   2. deschide fiecare site intr-un Chrome fara fereastra, la 1600x1000;
 *   3. inchide bannerul de cookies si fereastra de alegere a limbii, daca apar
 *      (altfel ar acoperi tocmai partea de sus, care intereseaza);
 *   4. salveaza imaginea in public/portofoliu/<slug>.jpg.
 *
 * Clientii fara linkSite sunt sariti — nu au inca site live.
 * Nu ai nevoie de nicio librarie instalata: vorbeste direct cu Chrome-ul
 * din /Applications, prin protocolul lui de depanare.
 *
 * Rulare:  npm run capturi
 */

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DEST = "public/portofoliu";
const LATIME = 1600;
const INALTIME = 1000;
const PORT = 9333;
/** Cat asteptam dupa incarcare, pentru fonturi si animatiile de intrare. */
const ASEZARE_MS = 2500;

/** Textele de pe butoanele care inchid bannerul de cookies. */
const ACCEPTA = /^(accept[aăą]?( toate| tot| cookie-?uri.*)?|de acord|sunt de acord|ok|am [iî]n[tț]eles)$/i;
/** Fereastra de alegere a limbii: vrem varianta romaneasca. */
const ROMANA = /^(rom[aâ]n[aă]|ro)$/i;

// ---------------------------------------------------------------- clientii

/** slug si linkSite stau pe randuri diferite in clienti.ts; le lipim doua cate doua. */
function citesteClientii() {
  const randuri = readFileSync("src/data/clienti.ts", "utf8")
    .split("\n")
    .map((r) => r.match(/^    (slug|linkSite): "(.*)",$/))
    .filter(Boolean);

  const lista = [];
  for (let i = 0; i < randuri.length; i += 2) {
    lista.push({ slug: randuri[i][2], link: randuri[i + 1]?.[2] ?? "" });
  }
  return lista;
}

// ------------------------------------------------------ legatura cu Chrome

function asteapta(ms) {
  return new Promise((gata) => setTimeout(gata, ms));
}

async function pornesteChrome() {
  const proces = spawn(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      `--remote-debugging-port=${PORT}`,
      `--window-size=${LATIME},${INALTIME}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  // Chrome are nevoie de o clipa pana raspunde pe port.
  for (let incercare = 0; incercare < 60; incercare++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const { webSocketDebuggerUrl } = await r.json();
      return { proces, adresa: webSocketDebuggerUrl };
    } catch {
      await asteapta(500);
    }
  }
  proces.kill();
  throw new Error("Chrome nu a pornit. Verifica daca exista in /Applications.");
}

/** Un canal simplu de comenzi catre Chrome, peste WebSocket. */
function deschideCanal(adresa) {
  const ws = new WebSocket(adresa);
  const inAsteptare = new Map();
  const ascultatori = new Set();
  let numar = 0;

  ws.addEventListener("message", (ev) => {
    const mesaj = JSON.parse(ev.data);
    if (mesaj.id && inAsteptare.has(mesaj.id)) {
      const { gata, eroare } = inAsteptare.get(mesaj.id);
      inAsteptare.delete(mesaj.id);
      mesaj.error ? eroare(new Error(mesaj.error.message)) : gata(mesaj.result);
    } else {
      for (const a of ascultatori) a(mesaj);
    }
  });

  const pregatit = new Promise((gata) => ws.addEventListener("open", gata));

  return {
    pregatit,
    trimite(metoda, parametri = {}, sessionId) {
      const id = ++numar;
      return new Promise((gata, eroare) => {
        inAsteptare.set(id, { gata, eroare });
        ws.send(JSON.stringify({ id, method: metoda, params: parametri, sessionId }));
      });
    },
    /** Asteapta un anumit eveniment, dar nu la nesfarsit. */
    asteaptaEveniment(nume, sessionId, limitaMs) {
      return new Promise((gata) => {
        const opreste = setTimeout(() => {
          ascultatori.delete(asculta);
          gata(false);
        }, limitaMs);
        const asculta = (m) => {
          if (m.method === nume && m.sessionId === sessionId) {
            clearTimeout(opreste);
            ascultatori.delete(asculta);
            gata(true);
          }
        };
        ascultatori.add(asculta);
      });
    },
    inchide: () => ws.close(),
  };
}

// ------------------------------------------- curatatul paginii de ferestre

/** Rulat in pagina: inchide bannerul de cookies si fereastra de limba. */
const CURATA = `(() => {
  const ACCEPTA = ${ACCEPTA.toString()};
  const ROMANA = ${ROMANA.toString()};

  const clicabile = () => [...document.querySelectorAll('button, a, [role="button"], input[type="submit"]')];
  const text = (el) => (el.innerText || el.value || "").trim();

  // Fereastra de alegere a limbii: alegem romana, ca site-ul sa arate ca pentru
  // vizitatorul roman. O cautam prima, ca sta peste tot restul paginii.
  // Cautam butonul DIN fereastra, nu orice "Romana" de pe pagina — meniul are
  // si el unul, iar apasat pe acela doar reincarca pagina cu fereastra la loc.
  const potriviteLimba = [...document.querySelectorAll("body *")].filter((el) => {
    if (!/alege limba|choose.*language|select.*language/i.test(el.innerText || "")) return false;
    return [...el.querySelectorAll('button, a, [role="button"]')].some((b) => ROMANA.test(text(b)));
  });
  // Ultimul din lista e cel mai stramt: fereastra in sine, nu toata pagina.
  const fereastraLimbii = potriviteLimba[potriviteLimba.length - 1];
  if (fereastraLimbii) {
    const ro = [...fereastraLimbii.querySelectorAll('button, a, [role="button"]')].find((el) => ROMANA.test(text(el)));
    if (ro) ro.click();
  }

  // Bannerul de cookies: apasam pe butonul de accept, dar numai daca butonul
  // chiar sta intr-un banner de cookies (altfel am putea apasa altceva).
  const banner = clicabile().find((el) => {
    if (!ACCEPTA.test(text(el)) || el.offsetParent === null) return false;
    let p = el;
    for (let i = 0; i < 6 && p; i++, p = p.parentElement) {
      if (/cookie|gdpr|consim|consent/i.test(p.className + " " + p.id + " " + (p.innerText || ""))) return true;
    }
    return false;
  });
  if (banner) banner.click();

  // Ce a ramas lipit de ecran si vorbeste despre cookies, ascundem.
  for (const el of document.querySelectorAll("body *")) {
    const p = getComputedStyle(el).position;
    if ((p === "fixed" || p === "sticky") && /cookie|gdpr|consim/i.test(el.innerText || "")) {
      el.style.display = "none";
    }
  }
})()`;

// ------------------------------------------------------------------ treaba

async function main() {
  mkdirSync(DEST, { recursive: true });
  const clienti = citesteClientii();
  const { proces, adresa } = await pornesteChrome();
  const canal = deschideCanal(adresa);
  await canal.pregatit;

  let total = 0;
  for (const { slug, link } of clienti) {
    if (!link) {
      console.log(`→ ${slug} — fara link, sarit`);
      continue;
    }

    let fila;
    try {
      const { targetId } = await canal.trimite("Target.createTarget", { url: "about:blank" });
      fila = targetId;
      const { sessionId } = await canal.trimite("Target.attachToTarget", { targetId, flatten: true });

      await canal.trimite("Page.enable", {}, sessionId);
      await canal.trimite("Emulation.setDeviceMetricsOverride", {
        width: LATIME,
        height: INALTIME,
        deviceScaleFactor: 1,
        mobile: false,
      }, sessionId);

      const incarcat = canal.asteaptaEveniment("Page.loadEventFired", sessionId, 30000);
      await canal.trimite("Page.navigate", { url: link }, sessionId);
      await incarcat;
      await asteapta(ASEZARE_MS);

      // De doua ori: unele site-uri se reincarca dupa ce alegi limba si isi
      // arata din nou bannerul de cookies.
      await canal.trimite("Runtime.evaluate", { expression: CURATA }, sessionId);
      await asteapta(1800);
      await canal.trimite("Runtime.evaluate", { expression: CURATA }, sessionId);
      // Ferestrele se inchid cu animatie; ii lasam timp sa se termine.
      await asteapta(1200);

      const { data } = await canal.trimite("Page.captureScreenshot", { format: "jpeg", quality: 82 }, sessionId);
      writeFileSync(`${DEST}/${slug}.jpg`, Buffer.from(data, "base64"));

      const kb = Math.round(Buffer.from(data, "base64").length / 1024);
      console.log(`✓ ${slug} — ${kb} KB`);
      total++;
    } catch (e) {
      console.log(`✗ ${slug} — ${e.message}`);
    } finally {
      if (fila) await canal.trimite("Target.closeTarget", { targetId: fila }).catch(() => {});
    }
  }

  canal.inchide();
  proces.kill();
  console.log(`\n${total} capturi salvate in ${DEST}/`);
}

main();
