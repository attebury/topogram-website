---
title: "Proof Walkthrough"
description: "The proof repositories show runnable step-by-step stories for generated, maintained, brownfield, recreated, and workflow-native app maps."
---

# Proof Walkthrough

> The proof repositories show runnable step-by-step stories for generated, maintained, brownfield, recreated, and workflow-native app maps.

Status: current
Audience: evaluators and maintainers inspecting proof repositories
Use when: you need runnable proof/demo steps and what each checkpoint proves.

Topogram has current public proof repositories organized into focused product
stories. They are tutorial-style demos, not fixtures. Use them when you
want to see how the app map supports real work: branches, tags, README notes,
SDLC records, agent packets, emitted contracts, and verification commands.

If you want the short evaluator route instead of the full proof catalog, start
with [Beta Demo Path](/start/beta-demo-path/).

## Five-Minute Demo Path

Use the brownfield proof when you want the shortest product demo:

```bash
git clone https://github.com/attebury/topogram-proof-content-approval-brownfield-v3.git
cd topogram-proof-content-approval-brownfield-v3
git checkout proof-03-adopt-app-map
npm ci --no-audit
npm run verify
```

Then inspect:

- `proof/STEP.md` for what the checkpoint proves;
- `proof/artifacts/` for the extract/adopt plan, receipts, agent packets, and
  validation output;
- `topo/` for the adopted app map.

That checkpoint shows the core Topogram move: existing React/Express/Prisma
code becomes reviewed `topo/` source, extraction evidence stays separate, and
agents get focused packets before maintained-code changes.

If you have only a few minutes, do not read every file. Read `proof/STEP.md`,
open the latest agent packet under `proof/artifacts/`, then compare the current
tag with the previous proof tag. The useful question is: what did Topogram know
before the code changed?

## Beta Evaluation Path

For the concise version of this section, see
[Beta Demo Path](/start/beta-demo-path/).

For beta evaluation, read the proof repos as product demos:

1. Run the five-minute brownfield path above.
2. Open `proof/artifacts/` and inspect the extract plan, adoption list, agent
   brief, and focused query packets.
3. Compare `proof-03-adopt-app-map` to `proof-04-feature-from-slice` to see how a
   maintained feature is planned from `topo/` instead of rediscovering source.
4. Compare `proof-06-recreate-other-stack` and `proof-07-parity-proof` to see
   where Topogram can recreate a stack and where parity is only reported.
5. Use the focused XState or Step Functions proof when you want to inspect
   workflow-native extraction without the larger UI/API/DB proof story.
6. Use the focused UI work-map proof when you want to inspect the new UI terms:
   screen, layout, region, widget, design language, component map,
   i18n, ARIA, and proof commands in one compact demo.
7. Use the focused widget design proof when you want to inspect semantic design
   mappings, component refs, and designer/developer review rows.
8. Use the operations UI work-map proof when you want to inspect a running
   React app, a slice-guided maintained UI feature, and a generated SvelteKit
   app from the same semantic work map.
9. Use the Storybook design proof when you want to see Storybook metadata become
   review-only component-mapping candidates before explicit adoption.
10. Use the operations design-review proof when you want a substantial
   designer-readable packet over a running React operations SaaS app.
11. Use the real component-system proof when you want to see a designer-readable
   matrix, Storybook candidate review, accepted component maps, and agent slices
   in one practical walkthrough.
12. Use the generated-to-maintained proof second to see how `generate` fits the
   same app-map model.

The demo claim is intentionally narrow: Topogram provides a reviewable map,
focused agent context, contracts, and proof commands. It does not promise full
runtime equivalence or pixel-perfect UI parity.

## Proof Repos

| Story | Repository | What It Proves |
| --- | --- | --- |
| Brownfield extract/adopt | [topogram-proof-content-approval-brownfield-v3](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3) | Start with a maintained app, extract candidates, adopt curated specs, implement a maintained feature from agent context, refresh drift, recreate another stack, and compare parity. |
| Generated to maintained | [topogram-proof-content-approval-v3](https://github.com/attebury/topogram-proof-content-approval-v3) | Start from an initialized Topogram, generate an app, graduate output to maintained ownership, then use Topogram for maintained feature and DB migration guidance. |
| UI work map terms | [topogram-proof-ui-work-map](https://github.com/attebury/topogram-proof-ui-work-map) | Show that the UI graph is a work map, not a render tree: screens reference layouts, layouts compose reusable regions, widgets bind into inherited regions, component maps map widgets to platform component refs, and compact slices expose the proof path. |
| Operations UI work map | [topogram-proof-operations-ui-work-map-v2](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2) | Start with a running React operations dashboard, add a Topogram domain/UI work map, align maintained React code, add a slice-guided UI feature, generate a SvelteKit app from the same spec, and close with parity plus product learning. |
| Operations design review | [topogram-proof-operations-design-review](https://github.com/attebury/topogram-proof-operations-design-review) | Start with a running React operations SaaS dashboard, add a semantic work map, add an Acme Operations UI design language/component map, emit a polished designer packet, make a slice-guided UI change, and close with accepted/deferred review rows. |
| Widget design realization | [topogram-proof-widget-design-realization](https://github.com/attebury/topogram-proof-widget-design-realization) | Map one semantic widget to web, iOS, and Android component refs; prove rendered, contract-only, implementation-owned, unsupported, and review states through JSON coverage, a designer-readable Markdown matrix, `ui-realization-report`, and a widget slice. See [Map A Design System](/design/map-design-system/). |
| Storybook design extraction | [topogram-proof-storybook-design-realization](https://github.com/attebury/topogram-proof-storybook-design-realization) | Start with static CSF Storybook stories, extract explicit `parameters.topogram` metadata as review-only `component_mappings`, adopt the mapping into a canonical `component_map`, then prove coverage, realization report, and widget slice output. |
| Real component-system mapping | [topogram-proof-real-component-system-map](https://github.com/attebury/topogram-proof-real-component-system-map) | Start with a small React component system and Storybook stories, add a semantic app map, author and adopt component mappings, then close with a designer checklist, work-map report, and compact agent slices. |
| Workflow-native extraction | [topogram-proof-xstate-workflow](https://github.com/attebury/topogram-proof-xstate-workflow) | Start with an XState app, extract workflow candidates through a package-backed extractor, adopt a workflow map, use compact slices for a maintained source change, then refresh and adopt workflow drift. |
| Workflow-native extraction | [topogram-proof-step-functions-workflow](https://github.com/attebury/topogram-proof-step-functions-workflow) | Start with a local Step Functions ASL definition, extract workflow candidates through a package-backed extractor, adopt a workflow map, use compact slices for a maintained source change, then refresh and adopt workflow drift. |

The brownfield proof is the fastest way to understand Topogram’s main
differentiator: it turns existing code into reviewable app-map evidence, then
uses that map to guide agent-safe maintained changes. The generated-to-maintained
proof shows the same map starting from a template instead of an existing app.

The proof repos expose a `Proof Verification` workflow, `npm run proof:audit`, and
`npm run verify`. They also use SDLC to show the recommended habit, but SDLC is
not required for ordinary Topogram users.

`topogram release status --strict` tracks these repos as `proofConsumers`, not
as normal package rollout consumers. A release is considered current when proof
repos meet the configured proof baseline, expose the audit/verify scripts, and
have green Proof Verification workflows. The current v3 content-approval proof
baseline is `@topogram/cli@0.3.99`; the focused XState proof is pinned to
`@topogram/cli@0.3.104` and `@topogram/extractor-xstate-workflows@0.1.0`.
The focused Step Functions proof is pinned to `@topogram/cli@0.3.106` and
`@topogram/extractor-step-functions-workflows@0.1.0`. The widget design proof is
current on `@topogram/cli@0.3.110` because the designer-readable design matrix
changed the demo story. The compact UI work-map proof is pinned to
`@topogram/cli@0.3.112`. The operations UI work-map proof is pinned to
`@topogram/cli@0.3.115` and is the most substantial UI app story: maintained
React first, then generated SvelteKit from the same work map. The Storybook
design proof is pinned to `@topogram/cli@0.3.110` and uses the
package-backed Storybook extractor from its GitHub repo until the npm package is
published. The real component-system mapping proof is pinned to
`@topogram/cli@0.3.117` and uses the package-backed Storybook extractor from
its GitHub repo to show the current designer/front-end-lead mapping workflow.
The operations design-review proof is pinned to `@topogram/cli@0.3.118`; tag
`proof-07-published-cli-refresh` proves the designer packet with the published
CLI package.
Proof repos do not need to be repinned for every CLI patch; a
`baseline-accepted` proof repo is current enough for release evidence until the
product demo story changes, the configured baseline moves, or its artifacts
would teach stale behavior. The v2 content-approval repos remain public
historical demos.

When a proof repo is created or materially refreshed, close the work with a
learning review. Promote what the proof taught into current docs, `llms.txt`,
journeys, glossary, agent guidance, release/proof tracking, or backlog records.
If the proof revealed no product-facing gaps, record that explicitly in the
linked plan before marking the proof task done.

## How To Read A Proof

1. Open the repo and confirm the `Proof Verification` badge is green.
2. Read `proof/README.md` for the step map.
3. Check out a proof tag:

   ```bash
   git fetch --tags
   git checkout proof-03-ui-i18n-aria-proof
   cat proof/STEP.md
   npm ci --no-audit
   npm run verify
   ```

4. Inspect `proof/artifacts/` for the machine-readable proof.
5. Compare the current tag with the previous tag when you want to see exactly
   what changed.

`npm run verify` is intentionally the only command a reader needs to trust at a
checkpoint. In the v3 repos it runs the proof audit, path-hygiene audit,
Topogram validation when `topo/` exists, SDLC validation when adopted, app
verification, recreated-stack compilation when present, and a final clean
worktree check.

## What Agents Should Read

The proof repos intentionally commit agent-facing artifacts. These are the files
an implementation agent would normally read instead of loading the whole repo:

- `agent-brief.json`: read order, edit boundaries, workflow commands, and trust
  or policy state.
- `*-task-slice.json`: focused SDLC/task context for one implementation slice.
- `*-single-agent-plan.json`: implementation plan for maintained app edits.
- `ui-surface-contract.json`, `ui-widget-contract.json`, and widget reports:
  UI contracts and conformance checks.
- DB snapshots, migration plans, and SQL migration artifacts: generated or
  maintained migration evidence.
- extract/adopt plans and receipts: brownfield candidate review and adoption
  proof.

For current engine UI work, also inspect `ui-realization-report` and generated
`generation-coverage.json` outputs. For design-system work, inspect
`ui-design-coverage --format markdown` first; it is the widget-first matrix a
designer or front-end lead can read without parsing JSON. The v3 proof repos are
pinned baseline stories; they do not move for every patch-level generator
improvement.

## Story 1: Generated To Maintained

The generated proof walks through:

| Step | Checkpoint | What To Notice |
| --- | --- | --- |
| 01 init SDLC baseline | [`proof-01-init-sdlc-baseline`](https://github.com/attebury/topogram-proof-content-approval-v3/tree/proof-01-init-sdlc-baseline) | `topogram init --adopt-sdlc` creates an empty app map with enforced SDLC guidance. |
| 02 generated content approval | [`proof-02-generated-content-approval`](https://github.com/attebury/topogram-proof-content-approval-v3/tree/proof-02-generated-content-approval) | The app map generates a content approval app and verifies compile. |
| 03 UI i18n/ARIA proof | [`proof-03-ui-i18n-aria-proof`](https://github.com/attebury/topogram-proof-content-approval-v3/tree/proof-03-ui-i18n-aria-proof) | Widgets, screen bindings, behavior, i18n/ARIA contracts, and UI realization reports become the development guide. |
| 04 generated DB migration | [`proof-04-generated-db-migration`](https://github.com/attebury/topogram-proof-content-approval-v3/tree/proof-04-generated-db-migration) | DB snapshots and SQL migration output are generated while app output is still generated-owned. |
| 05 graduate maintained | [`proof-05-graduate-maintained`](https://github.com/attebury/topogram-proof-content-approval-v3/tree/proof-05-graduate-maintained) | `topogram generate` refuses to overwrite maintained output. |
| 06 maintained feature from slice | [`proof-06-maintained-feature-from-slice`](https://github.com/attebury/topogram-proof-content-approval-v3/tree/proof-06-maintained-feature-from-slice) | Agent/query packets guide direct maintained app edits. |
| 07 maintained DB migration | [`proof-07-maintained-db-migration`](https://github.com/attebury/topogram-proof-content-approval-v3/tree/proof-07-maintained-db-migration) | Topogram emits migration proposals; humans/agents adapt maintained DB files directly. |

Use this story when you want to understand the greenfield path: start with a
generated project, keep the generated loop while it is useful, then graduate the
app to maintained ownership without throwing away the `topo/` contract.

## Story 2: Brownfield Extract/Adopt

The brownfield proof walks through:

| Step | Checkpoint | What To Notice |
| --- | --- | --- |
| 01 brownfield baseline | [`proof-01-brownfield-baseline`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3/tree/proof-01-brownfield-baseline) | A working React/Express/Prisma app exists with no `topo/`. |
| 02 extract with packages | [`proof-02-extract-with-packages`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3/tree/proof-02-extract-with-packages) | Package-backed extractors create review-only candidates and provenance. |
| 03 adopt app map | [`proof-03-adopt-app-map`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3/tree/proof-03-adopt-app-map) | Curated candidates become canonical `topo/`; extraction output remains evidence. |
| 04 feature from slice | [`proof-04-feature-from-slice`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3/tree/proof-04-feature-from-slice) | A maintained feature is implemented from Topogram context packets. |
| 05 refresh drift | [`proof-05-refresh-drift`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3/tree/proof-05-refresh-drift) | Source/spec drift is detected and reviewed without silent adoption. |
| 06 recreate other stack | [`proof-06-recreate-other-stack`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3/tree/proof-06-recreate-other-stack) | The adopted Topogram generates a SvelteKit/Hono/Postgres recreation beside maintained source. |
| 07 parity proof | [`proof-07-parity-proof`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3/tree/proof-07-parity-proof) | Contracts and verification reports compare maintained and generated stacks. |

Use this story when you want to understand the brownfield path: extract
candidates from existing source, review and adopt only the useful contracts,
keep the original app maintained, then use the adopted `topo/` to guide features
or recreate another stack.

## Story 3: Workflow-Native Extraction

The XState proof walks through:

| Step | Checkpoint | What To Notice |
| --- | --- | --- |
| 01 XState baseline | [`proof-01-xstate-baseline`](https://github.com/attebury/topogram-proof-xstate-workflow/tree/proof-01-xstate-baseline) | A working XState review workflow exists with no `topo/`. |
| 02 extract workflow candidates | [`proof-02-extract-workflow-candidates`](https://github.com/attebury/topogram-proof-xstate-workflow/tree/proof-02-extract-workflow-candidates) | The package-backed XState extractor emits review-only workflow candidates and provenance. |
| 03 adopt workflow map | [`proof-03-adopt-workflow-map`](https://github.com/attebury/topogram-proof-xstate-workflow/tree/proof-03-adopt-workflow-map) | Curated workflow evidence becomes canonical `topo/`, SDLC is enabled, and agent packets are emitted. |
| 04 workflow slice guides change | [`proof-04-workflow-slice-guides-change`](https://github.com/attebury/topogram-proof-xstate-workflow/tree/proof-04-workflow-slice-guides-change) | A compact workflow slice guides a maintained source change without manually editing canonical workflow records. |
| 05 refresh and review drift | [`proof-05-refresh-and-review-drift`](https://github.com/attebury/topogram-proof-xstate-workflow/tree/proof-05-refresh-and-review-drift) | Extraction refresh surfaces workflow drift, then selected updates are reviewed and adopted. |

Use this story when you want the smallest proof of package-backed workflow
extraction. It isolates the workflow-native path from broader brownfield
DB/API/UI concerns.

The Step Functions proof walks through the same shape with local Amazon States
Language source:

| Step | Checkpoint | What To Notice |
| --- | --- | --- |
| 01 Step Functions baseline | [`proof-01-step-functions-baseline`](https://github.com/attebury/topogram-proof-step-functions-workflow/tree/proof-01-step-functions-baseline) | A working local ASL review workflow exists with no `topo/`. |
| 02 extract workflow candidates | [`proof-02-extract-workflow-candidates`](https://github.com/attebury/topogram-proof-step-functions-workflow/tree/proof-02-extract-workflow-candidates) | The package-backed Step Functions extractor emits review-only workflow candidates and provenance. |
| 03 adopt workflow map | [`proof-03-adopt-workflow-map`](https://github.com/attebury/topogram-proof-step-functions-workflow/tree/proof-03-adopt-workflow-map) | Curated workflow evidence becomes canonical `topo/`, SDLC is enabled, and agent packets are emitted. |
| 04 workflow slice guides change | [`proof-04-workflow-slice-guides-change`](https://github.com/attebury/topogram-proof-step-functions-workflow/tree/proof-04-workflow-slice-guides-change) | A compact workflow slice guides a maintained ASL source change without manually editing canonical workflow records. |
| 05 refresh and review drift | [`proof-05-refresh-and-review-drift`](https://github.com/attebury/topogram-proof-step-functions-workflow/tree/proof-05-refresh-and-review-drift) | Extraction refresh surfaces workflow drift, then selected updates are reviewed and adopted. |

Use this story when you want the same workflow-native proof against an
infrastructure/orchestration format instead of an application state-machine
library.

## Story 4: UI Work Map Terms

The UI work-map proof walks through:

| Step | Checkpoint | What To Notice |
| --- | --- | --- |
| 01 semantic UI contract | [`proof-01-semantic-ui-contract`](https://github.com/attebury/topogram-proof-ui-work-map/tree/proof-01-semantic-ui-contract) | Shared UI screens, widgets, i18n messages, accessibility obligations, and `topogram check` all validate. |
| 02 layout region work map | [`proof-02-layout-region-work-map`](https://github.com/attebury/topogram-proof-ui-work-map/tree/proof-02-layout-region-work-map) | `region` and `layout` records make screens inherit reusable semantic work areas. |
| 03 component map | [`proof-03-design-realization-set`](https://github.com/attebury/topogram-proof-ui-work-map/tree/proof-03-design-realization-set) | `design_language` owns platform/token scope, while `component_map` maps the widget to web, iOS, and Android component refs. |
| 04 agent slice proof | [`proof-04-agent-slice-proof`](https://github.com/attebury/topogram-proof-ui-work-map/tree/proof-04-agent-slice-proof) | Compact screen and widget slices expose screen -> layout -> region -> widget -> component mapping -> proof context. |
| 05 final proof | [`proof-05-final-proof`](https://github.com/attebury/topogram-proof-ui-work-map/tree/proof-05-final-proof) | `npm run verify` checks path hygiene, Topogram validation, design coverage, UI realization, proof artifacts, and clean worktree state. |

Use this story when you want the smallest proof of the new UI vocabulary. It
shows the non-rendering work tree that agents use before changing UI code.

## Story 5: Operations UI Work Map App

The operations UI work-map proof walks through:

| Step | Checkpoint | What To Notice |
| --- | --- | --- |
| 01 React baseline | [`proof-01-react-baseline`](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2/tree/proof-01-react-baseline) | A running Vite React operations dashboard exists with mock data, navigation, and multiple screens, but no `topo/`. |
| 02 Topogram domain model | [`proof-02-topogram-domain-model`](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2/tree/proof-02-topogram-domain-model) | Actors, domains, entities, shapes, capabilities, requirements, and SDLC records describe the same app work without adding DB/API runtime. |
| 03 UI work map | [`proof-03-ui-work-map`](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2/tree/proof-03-ui-work-map) | Screens reference reusable layouts and regions; render entries become the agent work leaves. |
| 04 design language component map | [`proof-04-design-language-component-map`](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2/tree/proof-04-design-language-component-map) | A design language and component maps show web, iOS, Android, rendered, contract-only, unsupported, and review states. |
| 05 React map alignment | [`proof-05-react-map-alignment`](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2/tree/proof-05-react-map-alignment) | Maintained React components carry Topogram screen, region, widget, message, accessibility, and component-ref markers. |
| 06 slice-guided feature | [`proof-06-slice-guided-feature`](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2/tree/proof-06-slice-guided-feature) | A bulk-assignment UI feature is planned from compact slices, then implemented in maintained React code. |
| 07 SvelteKit from same spec | [`proof-07-sveltekit-from-same-spec`](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2/tree/proof-07-sveltekit-from-same-spec) | The same Topogram spec generates a SvelteKit app beside maintained React. |
| 08 parity learning closeout | [`proof-08-parity-learning-closeout`](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2/tree/proof-08-parity-learning-closeout) | Parity artifacts compare React and SvelteKit, then promote proof learning into Topogram backlog. |

Use this story when you want to see the UI work map against an installable app,
not just a compact terminology proof. The closeout promoted two follow-ups:
better generic SvelteKit widget renderer coverage and surface-scoped widget
slices for large UI maps.

## Story 6: Storybook Design Extraction

The Storybook proof walks through:

| Step | Checkpoint | What To Notice |
| --- | --- | --- |
| 01 Storybook baseline | [`proof-01-storybook-baseline`](https://github.com/attebury/topogram-proof-storybook-design-realization/tree/proof-01-storybook-baseline) | A component library has static CSF stories with explicit `parameters.topogram` metadata and no adopted `topo/`. |
| 02 extract candidates | [`proof-02-extract-candidates`](https://github.com/attebury/topogram-proof-storybook-design-realization/tree/proof-02-extract-candidates) | The package-backed Storybook extractor emits review-only `component_mappings` candidates plus provenance and adoption plan output. |
| 03 adopt realization | [`proof-03-adopt-realization`](https://github.com/attebury/topogram-proof-storybook-design-realization/tree/proof-03-adopt-realization) | Curated Storybook evidence becomes a canonical `component_map`. |
| 04 report and slice | [`proof-04-report-and-slice`](https://github.com/attebury/topogram-proof-storybook-design-realization/tree/proof-04-report-and-slice) | `ui-design-coverage`, `ui-realization-report`, and a widget slice expose the adopted component ref and remaining design review work. |

Use this story when you want to see how a design/component registry can propose
widget-to-component mappings without becoming the source of truth.

## What The Proofs Are Not

The proof repos are not release consumers that must move on every patch and they
are not a promise that every stack has identical runtime behavior. They are
known-good product stories pinned to a CLI baseline. Refresh them when a command
workflow changes, a breaking change lands, or the committed artifacts would
teach stale behavior.

## Current Limits

The proofs show contract, compile, and workflow parity. They do not claim pixel
parity, full production deployment readiness, or exhaustive runtime equivalence.
When a proof cannot establish something, it should say so in the step result or
parity report.
