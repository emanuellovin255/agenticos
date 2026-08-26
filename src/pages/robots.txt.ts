import type { APIRoute } from "astro";
import { site } from "../data/site";

/**
 * robots.txt generat din site.url, ca adresa sitemapului sa fie mereu
 * absoluta si corecta — un sitemap relativ e ignorat de motoarele de cautare.
 */
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
