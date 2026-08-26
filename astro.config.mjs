// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import { site } from "./src/data/site.ts";

export default defineConfig({
  site: site.url,
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  // Fonturile se auto-gazduiesc: zero request catre Google, zero layout shift.
  // `latin-ext` este OBLIGATORIU pentru diacriticele romanesti (a-breve, s-virgula, t-virgula).
  fonts: [
    {
      provider: fontProviders.google(),
      // Baloo 2, NU Fredoka: Fredoka nu contine glifele a-breve, s-virgula
      // si t-virgula, asa ca fiecare cuvant romanesc cadea pe alt font.
      name: "Baloo 2",
      cssVariable: "--font-titlu-astro",
      weights: [400, 500, 600, 700, 800],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Trebuchet MS", "Verdana", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Nunito",
      cssVariable: "--font-text-astro",
      weights: [400, 600, 700, 800],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Segoe UI", "Helvetica", "sans-serif"],
    },
  ],
});
