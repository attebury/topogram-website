import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const site = process.env.ASTRO_SITE ?? "https://topogram.dev";
const base = process.env.ASTRO_BASE ?? "/";

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: "Topogram",
      description:
        "Living app map for humans, agents, and code — bounded context, contracts, ownership, and proof.",
      logo: {
        src: "./src/assets/logo.svg",
        replacesTitle: false,
      },
      editLink: {
        baseUrl: "https://github.com/attebury/topogram/edit/main/docs/",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/attebury/topogram",
        },
      ],
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Start",
          items: [
            { label: "Init workspace", slug: "start/init-workspace" },
            { label: "Brownfield extract/adopt", slug: "start/brownfield-import" },
            { label: "Greenfield generate", slug: "start/greenfield-generate" },
            { label: "Database migrations", slug: "start/database-migrations" },
          ],
        },
        {
          label: "Agents",
          items: [
            { label: "Agent first run", slug: "agent-first-run" },
            { label: "llms.txt", link: "/llms.txt" },
            { label: "llms-full.txt", link: "/llms-full.txt" },
          ],
        },
        {
          label: "Concepts",
          items: [
            { label: "What Topogram is", slug: "concepts/what-is-topogram" },
            { label: "Topogram model", slug: "concepts/topogram-model" },
            { label: "Topo workspace", slug: "concepts/topo-workspace" },
            { label: "Generate vs emit", slug: "concepts/generate-vs-emit" },
            { label: "Templates and catalog", slug: "concepts/templates-catalog" },
            { label: "Generators", slug: "concepts/generators" },
            { label: "Extractors", slug: "concepts/extractors" },
            { label: "SDLC", slug: "concepts/sdlc" },
            { label: "Glossary", slug: "concepts/glossary" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "CLI", slug: "reference/cli" },
            { label: "DSL", slug: "reference/dsl" },
            { label: "Project config", slug: "reference/project-config" },
            { label: "Extract/adopt JSON", slug: "reference/import-json" },
            { label: "Widgets", slug: "widgets" },
          ],
        },
        {
          label: "Design",
          items: [
            {
              label: "ARIA accessibility contract",
              slug: "design/aria-accessibility-contract",
            },
            {
              label: "I18n message contract",
              slug: "design/i18n-message-contract",
            },
            {
              label: "SvelteKit realization shape",
              slug: "design/sveltekit-realization-shape",
            },
          ],
        },
        {
          label: "Proof",
          items: [
            { label: "Proof walkthrough", slug: "proof-walkthrough" },
            {
              label: "Generated → maintained proof",
              link: "https://github.com/attebury/topogram-proof-content-approval-v2",
            },
            {
              label: "Brownfield proof",
              link: "https://github.com/attebury/topogram-proof-content-approval-brownfield-v2",
            },
          ],
        },
        {
          label: "Authoring",
          items: [
            { label: "Templates", slug: "authoring/templates" },
            { label: "Generator packs", slug: "authoring/generator-packs" },
            { label: "Extractor packs", slug: "authoring/extractor-packs" },
          ],
        },
      ],
      components: {
        Footer: "./src/components/Footer.astro",
        EditLink: "./src/components/EditLink.astro",
      },
    }),
  ],
});
