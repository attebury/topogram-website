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
      description:
        "Pre-beta living app map for humans, agents, and code — bounded context, contracts, ownership, and proof.",
      logo: {
        src: "./src/assets/logo.svg",
        replacesTitle: false,
      },
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Start",
          items: [
            { label: "First 30 minutes", slug: "start/first-30-minutes" },
            { label: "What Topogram is", slug: "concepts/what-is-topogram" },
            { label: "Agent first run", slug: "agent-first-run" },
            { label: "Init workspace", slug: "start/init-workspace" },
            { label: "Brownfield extract/adopt", slug: "start/brownfield-import" },
            { label: "Greenfield generate", slug: "start/greenfield-generate" },
            { label: "Workflow extraction", slug: "start/workflow-extraction" },
            { label: "Database migrations", slug: "start/database-migrations" },
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
            {
              label: "Normalized layout vocabulary",
              slug: "concepts/normalized-layout-vocabulary",
            },
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
              label: "Map design system",
              slug: "design/map-design-system",
            },
            {
              label: "Map a real component system",
              slug: "design/map-a-real-component-system",
            },
            {
              label: "Storybook component map walkthrough",
              slug: "design/storybook-component-map-walkthrough",
            },
            {
              label: "UI work map by example",
              slug: "design/ui-work-map-by-example",
            },
            {
              label: "Designer review checklist",
              slug: "design/designer-review-checklist",
            },
          ],
        },
        {
          label: "Authoring",
          items: [
            { label: "Templates", slug: "authoring/templates" },
            { label: "Extractor packs", slug: "authoring/extractor-packs" },
          ],
        },
        {
          label: "Field Notes",
          items: fieldNoteSidebarItems(docsRoot),
        },
      ],
      components: {
        Banner: "./src/components/Banner.astro",
        Head: "./src/components/Head.astro",
        Footer: "./src/components/Footer.astro",
        EditLink: "./src/components/EditLink.astro",
      },
    }),
  ],
});
