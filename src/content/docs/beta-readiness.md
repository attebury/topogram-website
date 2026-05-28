---
title: "Beta Readiness"
description: "Topogram beta is ready when the app-map workflow is understandable, demonstrable, and safe enough for real evaluator use."
---

# Beta Readiness

> Topogram beta is ready when the app-map workflow is understandable, demonstrable, and safe enough for real evaluator use.

Status: current
Audience: evaluators, maintainers, agents, package authors, and release owners
Use when: you need to know what is beta-ready, what is preview-only, and what proof to run before a beta release.

Topogram's beta wedge is not "a DSL that generates apps." It is an
agent-safe app map: extract or author a `topo/`, review ownership and contracts,
query bounded context, then generate or maintain software with proof.

For the public evaluator narrative, see [Beta Launch](/beta-launch/).

## Beta Bar

Before a beta release, these workflows should be true from a fresh install:

- `topogram init` creates an empty maintained or greenfield workspace and
  explains what it scaffolded.
- `topogram copy` creates a starter from the public catalog.
- `topogram extract` plus package-backed extractors creates review-only
  brownfield candidates without mutating source code.
- `topogram adopt` promotes reviewed candidates and leaves receipts.
- `topogram query` gives agents focused context, proof gaps, and next commands.
- `topogram generate` writes app/runtime output only for generated-owned paths.
- `topogram emit` prints or writes contracts, reports, snapshots, and plans.
- `topogram check`, SDLC checks, docs checks, package smoke, and release status
  verify the claimed contract.

## UI Beta Proof

UI beta readiness is web-first and semantic. Topogram must preserve the same
screens, routes, regions, widget usages, display fields, behavior coverage, and
design-language/component-map intent from one `semantic_ui` across React and
SvelteKit proof surfaces.

Run these commands when UI contracts, widgets, or web generators change:

```bash
topogram emit ui-surface-contract ./topo --surface <web> --json
topogram emit ui-realization-report ./topo --surface <web> --json
topogram query ui-design-coverage ./topo --surface <web> --json
topogram emit widget-conformance-report ./topo --surface <web> --json
topogram query slice ./topo --surface <web> --screen <screen-id> --json
```

For beta review, the important artifact is the realization report: it should
show whether each screen, widget usage, message key, accessibility obligation,
design token, design-contract mapping, and behavior is `rendered`,
`embedded`, `layout_shell`, `contract_only`, `implementation_owned`,
`unsupported`, or `failed`.
The design-coverage query is the companion authoring view: it highlights missing
platform mappings, unmapped widgets, and behavior that still needs
developer/agent review before parity claims.

Bundled React and SvelteKit are the beta web bar for widget pattern coverage.
They render the appropriate full widget patterns from display fields, report
`lookup_select` and `status_badge` as embedded support, and classify app header,
navigation, content, footer, inspector, and master-detail patterns as
layout/shell work instead of widget omissions.

For design-system mapping, use widget-first `component_map` records.
`design_language` owns the design-system/platform header and token scope;
component maps map semantic widgets to platform component refs and behavior
support. See [Map A Design System](/design/map-design-system/).
The focused [Widget Design Realization Proof](https://github.com/attebury/topogram-proof-widget-design-realization)
is current on `@topogram/cli@0.3.110` and includes the Markdown design matrix
that designers and front-end leads should read first.
The [Operations UI Work Map Proof](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2)
is the substantial app proof: maintained React, Topogram domain/UI work map,
slice-guided UI change, generated SvelteKit from the same spec, and parity
learning closeout.

The beta bar is compile plus deterministic contract and marker coverage. It is
not screenshot comparison, pixel parity, runtime translation completeness, or a
full automated accessibility audit. Semantic i18n message contracts and
accessibility obligations are beta scope for generated web output; locale
catalogs, runtime i18n libraries, axe/Playwright audits, and manual review
evidence are later proof layers.

## Extractor Beta Proof

Extractor packs are execution packages, not templates. A beta-quality extractor
path must prove:

- package discovery is explicit;
- package code is not loaded during list/show/recommend/policy commands;
- package execution happens only during `extractor check` or `extract`;
- source apps are not mutated;
- candidates are review-only;
- `extract plan`, `adopt --list`, and focused query packets show provenance and
  safety notes before adoption.

For private extractor packages, use local paths or already-installed private
packages. Topogram does not install extractor packages during extraction and
does not require packages to be public unless you intend to publish them.

## Proof Repos

The v3 proof repositories are the current full beta demos, not per-patch
release consumers:

- [Brownfield proof](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3):
  shortest story for extracting, adopting, querying, implementing, refreshing
  drift, and recreating another stack.
- [Generated-to-maintained proof](https://github.com/attebury/topogram-proof-content-approval-v3):
  best story for starting generated, graduating to maintained ownership, and
  using Topogram for maintained feature and DB migration guidance.
- [XState workflow proof](https://github.com/attebury/topogram-proof-xstate-workflow)
  and [Step Functions workflow proof](https://github.com/attebury/topogram-proof-step-functions-workflow):
  focused stories for package-backed workflow extraction, adoption, compact
  workflow slices, and drift refresh.
- [Operations UI work-map proof](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2):
  substantial story for a maintained React app, semantic UI work map,
  slice-guided UI feature, generated SvelteKit app, and parity learning
  closeout.

Each proof checkpoint should pass `npm run verify`. Refresh proof repos when
command meaning changes, a breaking workflow lands, or the proof artifacts teach
stale behavior. Do not repin every proof repo for every patch release.

## One-Command Evaluator Smoke

Before beta, run the clean brownfield evaluator smoke from this repo:

```bash
npm run smoke:beta-evaluator
```

The repo script installs the current local CLI package plus first-party
extractor packages, creates a small Express/Prisma source app, extracts
review-only candidates, reviews and adopts the submission bundle, emits agent
context packets, validates the adopted `topo/`, and writes a portable report
under `<tmp>/topogram-beta-evaluator.*/artifacts`.

After publishing, run the same smoke against npm:

```bash
TOPOGRAM_CLI_PACKAGE_SPEC=@topogram/cli@latest npm run smoke:beta-evaluator
```

That one command is the preferred evaluator proof because it removes local repo
state from the app under test. The manual commands below are the same shape to
use when testing a real app.

These are the command surfaces it proves:

```bash
npm install --save-dev @topogram/cli @topogram/extractor-express-api @topogram/extractor-prisma-db
npx topogram doctor
npx topogram extractor recommend ./existing-app --from db,api
npx topogram extractor policy init .
npx topogram extractor policy pin @topogram/extractor-express-api@1 .
npx topogram extractor policy pin @topogram/extractor-prisma-db@1 .
npx topogram extractor check @topogram/extractor-express-api --json
npx topogram extractor check @topogram/extractor-prisma-db --json
npx topogram extract ./existing-app --out ./extracted-topogram --from db,api --extractor @topogram/extractor-express-api --extractor @topogram/extractor-prisma-db --extractor-policy ./topogram.extractor-policy.json --json
npx topogram extract plan ./extracted-topogram --json
npx topogram adopt --list ./extracted-topogram --json
npx topogram adopt bundle:submission ./extracted-topogram --dry-run --json
npx topogram adopt bundle:submission ./extracted-topogram --write --json
npx topogram query extract-plan ./extracted-topogram/topo --json
npx topogram query single-agent-plan ./extracted-topogram/topo --mode extract-adopt --json
npx topogram query slice ./extracted-topogram/topo --entity entity_submission --json
npx topogram check ./extracted-topogram --json
```

That dry run is the release manager's smoke for the core beta story: public CLI,
package-backed extraction, review-only candidates, agent context, and validation.

## Preview Or Deferred

These are important, but should not block beta unless the beta promise changes:

- native SwiftUI generation beyond package-first preview;
- screenshot or visual-diff UI proof;
- locale-specific translation catalogs and runtime i18n adapters;
- automated accessibility audits and manual review evidence;
- enterprise/audit SDLC profiles and immutable history;
- external issue tracker sync;
- package-backed workflow extractors for Camunda engine APIs, Rails state
  machines, Django FSM, richer Temporal runtime-history review, and richer BPMN
  or Step Functions runtime discovery beyond checked-in local definitions.

## Release Decision

Call a beta release ready only when:

- the fresh-user dry run passes from npm;
- first-party consumers are green in strict release status;
- proof repos pass their baseline verification;
- docs/RAG checks pass;
- the release page names preview-only areas plainly;
- no open P1/P2 security, path, package-execution, or generated-output boundary
  defects remain.
