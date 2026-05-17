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
design-token intent from one `ui_contract` across React and SvelteKit proof
surfaces.

Run these commands when UI contracts, widgets, or web generators change:

```bash
topogram emit ui-surface-contract ./topo --projection <web_surface> --json
topogram emit ui-realization-report ./topo --projection <web_surface> --json
topogram emit widget-conformance-report ./topo --projection <web_surface> --json
topogram query slice ./topo --projection <web_surface> --screen <screen-id> --json
```

The beta bar is compile plus deterministic contract and marker coverage. It is
not screenshot comparison, pixel parity, full accessibility automation, or a
complete i18n/ARIA contract. Those are tracked as design directions and future
requirements.

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

The v2 proof repositories are beta demos, not per-patch release consumers:

- [Brownfield proof](https://github.com/attebury/topogram-proof-content-approval-brownfield-v2):
  shortest story for extracting, adopting, querying, implementing, refreshing
  drift, and recreating another stack.
- [Generated-to-maintained proof](https://github.com/attebury/topogram-proof-content-approval-v2):
  best story for starting generated, graduating to maintained ownership, and
  using Topogram for maintained feature and DB migration guidance.

Each proof checkpoint should pass `npm run verify`. Refresh proof repos when
command meaning changes, a breaking workflow lands, or the proof artifacts teach
stale behavior. Do not repin every proof repo for every patch release.

## Fresh-User Dry Run

Before beta, run a clean brownfield path from a new temp project:

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
- full ARIA and i18n authored contracts;
- enterprise/audit SDLC profiles and immutable history;
- external issue tracker sync;
- package-backed workflow extractors for BPMN, Temporal, XState, Step
  Functions, Camunda, Rails state machines, or Django FSM.

## Release Decision

Call a beta release ready only when:

- the fresh-user dry run passes from npm;
- first-party consumers are green in strict release status;
- proof repos pass their baseline verification;
- docs/RAG checks pass;
- the release page names preview-only areas plainly;
- no open P1/P2 security, path, package-execution, or generated-output boundary
  defects remain.
