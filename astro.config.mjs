import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fieldNoteSidebarItems } from "./src/lib/field-notes.mjs";

const site = process.env.ASTRO_SITE ?? "https://topogram.dev";
const base = process.env.ASTRO_BASE ?? "/";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.join(__dirname, "src", "content", "docs");

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: "Topogram",
      description: "Field Notes from Topogram.",
      logo: {
        src: "./src/assets/logo.svg",
        replacesTitle: false,
      },
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Field Notes",
          items: fieldNoteSidebarItems(docsRoot),
        },
      ],
      components: {
        Head: "./src/components/Head.astro",
        Footer: "./src/components/Footer.astro",
        EditLink: "./src/components/EditLink.astro",
      },
    }),
  ],
});
