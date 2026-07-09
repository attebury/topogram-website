import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import path from "node:path";
import { fileURLToPath } from "node:url";

const site = process.env.ASTRO_SITE ?? "https://topogram.dev";
const base = process.env.ASTRO_BASE ?? "/";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: "Topogram",
      description: "Topogram has moved to attebury.dev.",
      logo: {
        src: "./src/assets/logo.svg",
        replacesTitle: false,
      },
      customCss: ["./src/styles/custom.css"],
      sidebar: [],
      components: {
        Head: "./src/components/Head.astro",
        Footer: "./src/components/Footer.astro",
      },
    }),
  ],
});
