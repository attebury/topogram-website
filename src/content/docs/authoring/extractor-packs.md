---
title: "Extractor Packs"
description: "Extractor packs are package-backed brownfield discovery extensions for review-only candidates."
---

# Extractor Packs

> Extractor packs are package-backed brownfield discovery extensions for review-only candidates.

Status: current
Audience: extractor users and package authors
Use when: you need to understand package-backed extractors or brownfield discovery dependencies.

Extractor packs are package-backed brownfield discovery extensions. They are
the extraction counterpart to generator packs, but their contract is narrower:
they read source evidence and emit review-only findings, candidates,
diagnostics, and provenance. Topogram core owns persistence, reconcile,
adoption, and canonical `topo/**` writes.

Use an extractor pack when bundled extraction is too generic for a framework,
language, CLI, database, or UI evidence family. Do not use an extractor pack as
a content template, generator, or adoption plugin. Templates copy starting
Topogram source; generators create runtime/app files from contracts; extractors
read brownfield source and emit review candidates only.

First-party examples include:

- `@topogram/extractor-node-cli` for CLI surfaces;
- `@topogram/extractor-react-router` for React Router UI surfaces;
- `@topogram/extractor-prisma-db` for Prisma schema/migration evidence;
- `@topogram/extractor-express-api` for Express route surfaces;
- `@topogram/extractor-drizzle-db` for Drizzle schema/migration evidence;
- `@topogram/extractor-xstate-workflows` for XState state machines.

## Package Shape

Start with `extractor init` when authoring a new pack:

```bash
topogram extractor init ./topogram-extractor-node-cli --track cli --package @scope/topogram-extractor-node-cli
cd ./topogram-extractor-node-cli
npm install
npm test
npm run docs:rag:check
npm run check
npm run release:preflight
```

The initializer writes the package shape below plus a small fixture, unit test,
agent guide, retrieval docs, and check script.
Use it as disposable starter code; replace the adapter with precise framework
evidence before publishing.

The command output includes a `Scaffolded:` section. In `--json` mode, the
same information is available as `scaffold[]`, with each path marked as
`created` or `reused` and labeled with its purpose. Use that output as the
first authoring checklist before editing the adapter.

```text
package.json
topogram-extractor.json
index.cjs
AGENTS.md
README.md
llms.txt
llms-full.txt
scripts/build-llms-full.mjs
scripts/verify-docs-rag.mjs
scripts/run-secret-scan.mjs
scripts/check-extractor.mjs
test/adapter.test.mjs
fixtures/basic-source/
```

The generated `AGENTS.md` is part of the contract for humans and coding agents:
extractors are read-only, do not write canonical `topo/**`, do not install
packages or use the network, and return only review candidates. Shared or
published extractor packs should adopt SDLC in their package repo so those rules,
tasks, and verification proof are queryable. Private one-off extractors may stay
lighter, but they should still follow the generated rules and checks.

Use SDLC for shared, published, or safety-sensitive extractor packs. The SDLC
records do not make the package heavier for consumers; they give maintainers and
agents queryable rules, tasks, proof gaps, and verification commands while the
adapter evolves.

The generated package also has its own retrieval surface. Package-local
`llms.txt` is the curated map for humans, agents, and RAG systems reading the
extractor repo; `llms-full.txt` is generated from that map. These files live at
the extractor package root, not in the parent Topogram repo. The generated docs
scripts resolve the package root from their own script path, require
`package.json`, `topogram-extractor.json`, and `llms.txt`, and refuse local
links or writes that escape the package root.

```bash
npm run docs:rag:build
npm run docs:rag:check
```

`npm run release:preflight` is the package-local publish gate. It runs
`npm run check`, `npm pack --dry-run`, and the package-local Gitleaks secret
scan. CI may set `TOPOGRAM_SECRET_SCAN_ALREADY_RAN=1` only after a Gitleaks
workflow step has already passed; local release prep should run the scanner.

`topogram-extractor.json` declares the pack:

```json
{
  "id": "@topogram/extractor-node-cli",
  "version": "1",
  "tracks": ["cli"],
  "source": "package",
  "package": "@topogram/extractor-node-cli",
  "compatibleCliRange": "^0.3.89",
  "stack": { "runtime": "node", "framework": "generic-cli" },
  "capabilities": { "commands": true, "options": true, "effects": true },
  "candidateKinds": ["command", "capability", "cli"],
  "evidenceTypes": ["runtime_source", "parser_config"],
  "extractors": [
    { "id": "cli.node-package", "track": "cli" }
  ]
}
```

The package export returns `{ manifest, extractors }`:

```js
module.exports = {
  manifest,
  extractors: [
    {
      id: "cli.node-package",
      track: "cli",
      detect(context) {
        return { score: 1, reasons: ["Found Node package CLI metadata."] };
      },
      extract(context) {
        return {
          findings: [],
          candidates: {
            commands: [],
            capabilities: [],
            surfaces: []
          },
          diagnostics: []
        };
      }
    }
  ]
};
```

## Adapter Contract

Each extractor adapter is intentionally small. It detects whether it should run,
then returns review-only output:

| Method | Purpose | Must Not |
| --- | --- | --- |
| `detect(context)` | Score whether the extractor has enough source evidence to run. | Mutate source files, install packages, or write `topo/**`. |
| `extract(context)` | Return findings, candidates, diagnostics, and evidence. | Adopt candidates, edit `topogram.project.json`, or define custom adoption semantics. |

The context is read-oriented. Treat source paths, helper reads, source
classification, and configured tracks as evidence inputs. Keep any framework
parsing local to the package and return plain candidate data for Topogram core
to normalize.

Extractor candidate buckets are track-specific:

| Track | Common buckets |
| --- | --- |
| `db` | `entities`, `enums`, `relations`, `indexes`, `maintained_seams` |
| `api` | `capabilities`, `routes`, `stacks` |
| `ui` | `screens`, `routes`, `actions`, `flows`, `widgets`, `shapes`, `component_mappings`, `stacks` |
| `cli` | `commands`, `capabilities`, `surfaces` |
| `workflows` | `workflow_definitions`, `workflow_states`, `workflow_transitions` |
| `verification` | `verifications`, `scenarios`, `frameworks`, `scripts` |

Only use the `workflows` track when the source directly owns workflow
semantics. Good workflow-pack sources include BPMN, Temporal, XState, Step
Functions, Camunda, Rails state machines, Django FSM, and similar systems that
encode states, transitions, orchestration, or process definitions. Do not add
workflow guesses to ordinary DB/API/UI/CLI extractors. Those extractors should
return their own track evidence. Topogram core already handles the conservative
DB/API v1 synthesis for entities with `status` or `state` enums; broader
cross-track synthesis should be added deliberately where the synthesizer can see
corroborated evidence across tracks.

For Step Functions, prefer a local Amazon States Language v1. Read checked-in
JSON or YAML state-machine definitions and emit workflow candidates from
`StartAt`, `States`, `Next`, `Default`, `Choices`, `Catch`, `Retry`, `Map`,
`Parallel`, `Succeed`, and `Fail` structure. Do not call AWS APIs, load
credentials, inspect execution history, or infer IAM behavior from an extractor
package. Infrastructure wrappers such as CloudFormation, CDK, SAM, Serverless,
and Terraform should be explicit future scope unless the package can recover
the embedded ASL definition deterministically.

Workflow extractor packages should emit the canonical workflow buckets, not a
generic `workflows` bucket:

```js
return {
  findings: [],
  candidates: {
    workflow_definitions: [{
      id_hint: "workflow_review",
      label: "Review",
      source_kind: "workflow_native",
      source_system: "xstate",
      evidence: [{ file: "src/review-machine.js", reason: "machine id review" }]
    }],
    workflow_states: [{
      id_hint: "workflow_review_draft",
      workflow_id: "workflow_review",
      state_id: "draft",
      label: "Draft"
    }],
    workflow_transitions: [{
      id_hint: "workflow_review_submit",
      workflow_id: "workflow_review",
      from_state: "draft",
      to_state: "review",
      event: "SUBMIT"
    }]
  },
  diagnostics: []
};
```

`topogram extract plan` and `topogram adopt --list` expose these candidates as
review-only workflow adoption selectors. The package still does not define
canonical `workflow` files or adoption semantics; Topogram core owns the
reviewed graph record and any supporting decision/doc output.

Extractor output is validated before Topogram persists extraction artifacts.
`findings` and `diagnostics` must be arrays when present, and `candidates` must
be an object of track-owned array buckets. Candidate records must have a stable
identity such as `id_hint`, `id`, `name`, or `command_id`; route candidates may
use `method` plus `path`. File evidence must use safe project-relative paths,
not absolute paths or `..` escapes. Candidate output must not include canonical
files, patches, adoption plans, write instructions, or direct `topo/**` writes.
Those are core responsibilities handled only after explicit `topogram adopt`.

`stacks` and `frameworks` are scalar metadata buckets, not adoptable graph
records. Return strings:

```js
return {
  findings: [],
  candidates: {
    capabilities: [{
      id_hint: "cap_get_invoice",
      label: "Get invoice",
      endpoint: { method: "GET", path: "/invoices/{id}" },
      path_params: ["id"],
      query_params: ["includeLines"],
      header_params: ["authorization"],
      input_fields: [],
      output_fields: ["id", "status"],
      provenance: ["src/routes/invoices.ts"]
    }],
    routes: [{ method: "GET", path: "/invoices/{id}", source_kind: "route_code" }],
    stacks: ["express"]
  },
  diagnostics: []
};
```

Common shorthand is accepted at the package boundary. String parameter names are
normalized to parameter records, so `path_params: ["id"]` becomes
`[{ name: "id", required: true, type: null }]`; query and header params default
to `required: false`. `input_fields` and `output_fields` may stay as string field
names. Older stack objects are tolerated temporarily and normalized to strings,
but new extractor packages should emit `stacks: ["express"]`.

UI pattern candidates use the same taxonomy as generators:

- Rendered widget/region patterns may be emitted as `widgets` or
  `component_mappings`: `resource_table`, `data_grid_view`, `resource_cards`,
  `search_results`, `detail_panel`, `summary_stats`, `board_view`,
  `calendar_view`, `activity_feed`, `timeline_view`, `edit_form`,
  `filter_panel`, `action_bar`, `empty_state_panel`, `settings_section`,
  `wizard_stepper`, `comment_thread`, and `audit_log`.
- Embedded patterns are subcomponent evidence: `lookup_select` and
  `status_badge`.
- Layout/shell patterns are not widget/component mapping candidates:
  `app_header`, `primary_navigation`, `hamburger_drawer`, `content_region`,
  `footer_bar`, `inspector_pane`, and `master_detail`. Emit those as screen,
  layout, region, route, or action evidence.

UI extractors may propose `component_mappings` when source evidence maps a
semantic widget to a design-system component. These are review-only candidates,
not canonical design decisions:

```js
return {
  findings: [],
  candidates: {
    component_mappings: [{
      id_hint: "review_queue_web_grid",
      component_map_id_hint: "component_map_review_queue",
      design_language_id_hint: "design_acme_product_ui",
      widget_id: "widget_review_queue",
      platform: "web",
      viewport: "wide",
      component_ref: "acme.reviewQueue.grid",
      pattern: "resource_table",
      status: "rendered",
      behaviors_rendered: ["selection"],
      behaviors_contract_only: ["bulk_action"],
      confidence: "medium",
      evidence: [{ file: "src/review/ReviewQueue.tsx", reason: "Uses Acme ReviewQueueGrid." }],
      missing_decisions: ["Confirm bulk action support."]
    }]
  },
  diagnostics: []
};
```

`component_ref` must be a stable design-system identity, not a source import
path. `topogram adopt component-mappings --write` stays blocked until the
referenced widget and design language exist or are selected in the same plan.

Storybook is a good source for these candidates when the component library uses
static CSF stories. The first-party `@topogram/extractor-storybook-design`
package reads `*.stories.js`, `*.stories.jsx`, `*.stories.ts`, and
`*.stories.tsx` files and looks for explicit metadata on the default story meta:

```ts
parameters: {
  topogram: {
    widget: "widget_review_queue",
    designLanguage: "design_acme_product_ui",
    componentMap: "component_map_review_queue",
    componentRef: "acme.reviewQueue.grid",
    platform: "web",
    viewport: "wide",
    pattern: "resource_table",
    status: "rendered",
    behaviorsRendered: ["selection"],
    behaviorsContractOnly: ["bulk_action"]
  }
}
```

The Storybook extractor does not run Storybook, execute components, parse MDX,
read screenshots, or use generated `storybook-static` output in v1. Stories
without enough explicit metadata become findings and missing decisions, not
low-confidence mappings.

## Safety Boundary

- Extractors are read-only.
- Extractors do not write `topo/**`.
- Extractors do not mutate source app files.
- Extractors do not install packages.
- Extractors do not perform network access.
- Extractors do not define adoption semantics.

Core normalizes candidates and writes extraction artifacts. Adoption happens only
through `topogram adopt`.

## Policy And Execution

Bundled `topogram/*` extractors and first-party `@topogram/extractor-*`
packages are allowed by default. Other packages require an explicit
`topogram.extractor-policy.json`.

```bash
topogram extractor policy init
topogram extractor policy pin @topogram/extractor-node-cli@1
topogram extractor policy pin @topogram/extractor-react-router@1
topogram extractor policy pin @topogram/extractor-prisma-db@1
topogram extractor policy pin @topogram/extractor-express-api@1
topogram extractor policy pin @topogram/extractor-drizzle-db@1
topogram extractor policy pin @topogram/extractor-storybook-design@1
topogram extractor policy pin @topogram/extractor-xstate-workflows@1
topogram extractor policy check
```

No dynamic installation is performed. A package-backed extractor must already be
installed, or you must pass a local package path. Policy pins use the extractor
manifest version, not the npm package version. For example,
`@topogram/extractor-react-router@1` pins manifest version `1`; npm may install
package version `0.1.1` or later.

Private repositories are fine. They are often the right place to develop a
domain-specific extractor before deciding whether it belongs on npm. Consumers
can use either an installed private package or a local path:

```bash
npm install -D git+ssh://git@github.com/your-org/topogram-extractor-custom-api.git
topogram extractor check @your-org/topogram-extractor-custom-api
topogram extract ./existing-app --out ./imported-topogram --from api --extractor @your-org/topogram-extractor-custom-api
```

```bash
topogram extractor check ../topogram-extractor-custom-api
topogram extract ./existing-app --out ./imported-topogram --from api --extractor ../topogram-extractor-custom-api
```

Public packages are easier for broad sharing and release tracking. Private or
local packages are better while the evidence model is still specific to one
organization or application family. In both cases, the adapter contract stays
the same: read source evidence, return review-only candidates, and let core own
normalization, persistence, reconcile, and adoption.

Use `topogram extractor list` to see bundled packs and first-party package
recommendations grouped by track. Use `topogram extractor recommend <source>`
to inspect a local brownfield source tree and get suggested first-party package
extractors before installing or loading any package code. Use `topogram
extractor show <package>` before installing when you need the package purpose,
install command, policy pin command, npm package version, compatible CLI range,
and a concrete extract command. `topogram extractor check <package>` reports the
same version split: manifest version is what policy pins, package version is
what npm installed, and compatible CLI range is the CLI line the package
declares or inherits.

The consumer command loop is part of the contract:

1. `topogram extractor list` discovers candidates without loading package code.
2. `topogram extractor recommend <source> --from <tracks>` suggests packages from local evidence without loading package code.
3. `topogram extractor show <package>` explains why to use one package, how to install it, how to pin it, what package version is installed, what CLI range is compatible, and how to run extraction.
4. `npm install -D <package>` is explicit; Topogram does not install extractor packages during extraction.
5. `topogram extractor policy pin <package>@<manifest-version>` records the reviewed manifest version.
6. `topogram extractor check <package>` loads package code only for a minimal smoke extraction.
7. `topogram extract ... --extractor <package>` writes candidates and provenance, not canonical records.
8. `topogram extract plan`, `topogram adopt --list`, and `topogram query extract-plan` show package provenance and selectors.
9. `topogram adopt <selector> --dry-run` precedes any `--write`.

Consumer loop:

```bash
npm install -D @topogram/extractor-react-router
topogram extractor policy init
topogram extractor recommend ./react-router-app --from ui
topogram extractor recommend ./storybook-library --from ui
topogram extractor policy pin @topogram/extractor-react-router@1
topogram extractor policy pin @topogram/extractor-storybook-design@1
topogram extractor check @topogram/extractor-react-router
topogram extractor check @topogram/extractor-storybook-design
topogram extract ./react-router-app --out ./imported-topogram --from ui --extractor @topogram/extractor-react-router
topogram extract ./storybook-library --out ./storybook-topogram --from ui --extractor @topogram/extractor-storybook-design
topogram query extract-plan ./imported-topogram/topo --json
topogram adopt --list ./imported-topogram --json
topogram adopt <selector> ./imported-topogram --dry-run
```

`topogram extractor check` proves the package manifest, export shape, adapter
load, and minimal smoke extraction. It does not prove domain correctness for a
real app. A useful package test must run extraction against a representative
fixture, inspect candidate counts and provenance, run `extract plan`, and dry-run
adoption.

## Author Checks

```bash
topogram extractor init ./my-extractor-pack --track cli --package @scope/my-extractor-pack
npm --prefix ./my-extractor-pack test
npm --prefix ./my-extractor-pack run check
topogram extractor check ./my-extractor-pack
topogram extract ./fixture-app --out /private/tmp/extracted --extractor ./my-extractor-pack
topogram extract plan /private/tmp/extracted --json
topogram adopt --list /private/tmp/extracted --json
topogram query extract-plan /private/tmp/extracted/topo --json
```

Use `TOPOGRAM_CLI` when developing an extractor against a local Topogram checkout:

```bash
TOPOGRAM_CLI=/path/to/topogram/engine/src/cli.js npm --prefix ./my-extractor-pack run check
```

Passing `topogram extractor check` proves the manifest, adapter export, and
minimal smoke shape, including track-aware candidate validation. It does not
replace fixture-based extraction tests.

Package CI should also run a real fixture extraction and inspect the generated
review packet. At minimum, prove:

- `topogram extractor check ./` passes;
- `topogram extract ./fixture-app --out <tmp> --extractor ./` writes candidates;
- `topogram extract plan <tmp> --json` includes the expected candidate groups;
- `topogram query extract-plan <tmp>/topo --json` includes extractor provenance;
- `topogram adopt <selector> <tmp> --dry-run --json` previews canonical writes;
- source fixture files are unchanged.

## Publication Readiness Checklist

Before publishing an extractor package, prove the package boundary from the
outside. The package should be usable by a consumer without reading Topogram
engine internals.

- Scaffold or maintain the standard package shape:
  `topogram-extractor.json`, `index.cjs`, `fixtures/`, `scripts/check-extractor.mjs`,
  package exports, and `files`.
- Run `npm run release:preflight` from the extractor package root.
- Pack and install the extractor into a temporary consumer project.
- Run `topogram extractor check <package-or-path>`.
- Run `topogram extract <fixture> --out <tmp> --from <track> --extractor <package-or-path>`.
- Inspect `topogram extract plan <tmp> --json`, `topogram adopt --list <tmp> --json`,
  and `topogram query extract-plan <tmp>/topo --json`.
- Assert expected candidates, candidate counts, extractor provenance, and safety
  notes. Do not accept string-existence-only tests.
- Assert source fixture files are unchanged after extraction.
- Publish only after package CI runs the package smoke against the CLI version in
  `topogram-cli.version`.
- After publish, run the `Package Access` workflow to set public npm access and
  verify `npm view <package> version --registry=https://registry.npmjs.org/`.

Recommended workflows for public first-party-style packages:

```text
.github/workflows/extractor-verification.yml
.github/workflows/publish-package.yml
.github/workflows/package-access.yml
```

Publish workflows should run a Gitleaks action first, then `npm run
release:preflight` before `npm publish`. If the workflow already passed the
Gitleaks action, it may set `TOPOGRAM_SECRET_SCAN_ALREADY_RAN=1` for the
preflight script so CI does not need a second scanner binary.

## First-Party Examples

Current public first-party extractor packages on the current `@topogram/cli`
release line:

| Package | Version | Track |
| --- | --- | --- |
| `@topogram/extractor-node-cli` | `0.1.0` | `cli` |
| `@topogram/extractor-react-router` | `0.1.1` | `ui` |
| `@topogram/extractor-prisma-db` | `0.1.0` | `db` |
| `@topogram/extractor-express-api` | `0.1.0` | `api` |
| `@topogram/extractor-drizzle-db` | `0.1.0` | `db` |
| `@topogram/extractor-xstate-workflows` | `0.1.0` | `workflows` |
| `@topogram/extractor-step-functions-workflows` | `0.1.0` | `workflows` |
| `@topogram/extractor-bpmn-workflows` | `0.1.0` | `workflows` |
| `@topogram/extractor-temporal-workflows` | `0.1.0` | `workflows` |

```bash
topogram extract ./existing-cli --out ./extracted-cli --from cli --extractor @topogram/extractor-node-cli
topogram extract ./react-router-app --out ./extracted-ui --from ui --extractor @topogram/extractor-react-router
topogram extract ./prisma-app --out ./extracted-db --from db --extractor @topogram/extractor-prisma-db
topogram extract ./express-api --out ./extracted-api --from api --extractor @topogram/extractor-express-api
topogram extract ./drizzle-app --out ./extracted-db --from db --extractor @topogram/extractor-drizzle-db
topogram extract ./xstate-app --out ./extracted-workflows --from workflows --extractor @topogram/extractor-xstate-workflows
topogram extract ./step-functions-app --out ./extracted-workflows --from workflows --extractor @topogram/extractor-step-functions-workflows
topogram extract ./bpmn-app --out ./extracted-workflows --from workflows --extractor @topogram/extractor-bpmn-workflows
topogram extract ./temporal-app --out ./extracted-workflows --from workflows --extractor @topogram/extractor-temporal-workflows
```

These packages emit review-only candidates. React Router can add screen, route,
non-resource flow, and widget evidence. Prisma and Drizzle can add maintained DB
seam proposals. Express can add route, capability, parameter, auth, and stack
evidence. XState can add workflow definition, state, and transition candidates.
Step Functions can add workflow definition, state, and transition candidates from
local Amazon States Language JSON or YAML.
Temporal can add workflow definition, activity, signal, timer, child workflow,
state, and transition evidence from local TypeScript and Go source.
Adoption is still explicit through `topogram adopt`.
