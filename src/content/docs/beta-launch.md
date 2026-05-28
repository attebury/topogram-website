---
title: "Topogram Beta Launch"
description: "Topogram beta is for teams that want a living app map agents can safely work from."
---

# Topogram Beta Launch

> Topogram beta is for teams that want a living app map agents can safely work from.

Status: current
Audience: evaluators, engineering leads, maintainers, agents, and package authors
Use when: you need the public beta story, first commands, proof paths, limits, and useful feedback asks.

## What Topogram Is

Topogram keeps app intent, contracts, ownership, and proof in a `topo/`
workspace. Humans and agents use that map to understand what exists, what is
owned by generators, what is maintained by people, and what proof should run
before a change is trusted.

The beta product wedge is brownfield plus agents:

1. extract reviewable candidates from existing code;
2. adopt only the candidates a human reviewed;
3. query a focused slice for one task or surface;
4. change maintained code or generate owned output;
5. verify with the commands named by the map.

Generation is still important, but it is one realization path for the app map,
not the whole product.

## Who Should Try It

- Teams experimenting with coding agents on existing apps.
- Maintainers who want contracts and proof around brownfield code.
- Product engineers who want generated starts but expect to graduate parts of
  the app to maintained ownership.
- Package authors building generator or extractor packs for a stack.
- Release owners who want consumer proof, public smoke, and package rollup
  checks before shipping.

## Five-Minute Evaluation

For the curated route through the proof program, start with
[Beta Demo Path](/start/beta-demo-path/). It tells you which demo to run
first and which proof repos to skip unless they match your evaluation goal.

From this repo, run the published CLI smoke:

```bash
TOPOGRAM_CLI_PACKAGE_SPEC=@topogram/cli@latest npm run smoke:beta-evaluator
```

That command installs the public CLI and first-party extractor packages in a
clean temp project. It creates a small brownfield app, extracts review-only
candidates, adopts a reviewed bundle, emits agent packets, validates the
adopted `topo/`, and writes a portable report.

For your own app, use the same shape manually:

```bash
npx topogram extract ./existing-app --out ./imported-topogram
cd ./imported-topogram
npx topogram extract plan
npx topogram adopt --list
npx topogram query extract-plan ./topo --json
npx topogram query single-agent-plan ./topo --mode extract-adopt --json
npx topogram check
```

Start with package-backed extractors when the stack is known:

```bash
npm install --save-dev @topogram/cli @topogram/extractor-express-api @topogram/extractor-prisma-db
npx topogram extractor recommend ./existing-app --from db,api
npx topogram extractor policy init
npx topogram extractor policy pin @topogram/extractor-express-api@1
npx topogram extractor policy pin @topogram/extractor-prisma-db@1
npx topogram extract ./existing-app --out ./imported-topogram --from db,api --extractor @topogram/extractor-express-api --extractor @topogram/extractor-prisma-db
```

## Proof Paths

Use the proof repos when you want a complete story with branches, tags, SDLC
records, agent packets, artifacts, and `npm run verify` at every checkpoint.
If you are unsure where to start, use [Beta Demo Path](/start/beta-demo-path/)
instead of reading every proof repository.

- [Brownfield proof](https://github.com/attebury/topogram-proof-content-approval-brownfield-v3):
  best first demo for extract/adopt, maintained feature work, drift refresh,
  and cross-stack recreation.
- [Generated to maintained proof](https://github.com/attebury/topogram-proof-content-approval-v3):
  best demo for generated output, graduation to maintained ownership, and DB
  migration guidance.
- [XState workflow proof](https://github.com/attebury/topogram-proof-xstate-workflow):
  focused workflow-native extraction from an app state-machine library.
- [Step Functions workflow proof](https://github.com/attebury/topogram-proof-step-functions-workflow):
  focused workflow-native extraction from local Amazon States Language source.
- [Widget design realization proof](https://github.com/attebury/topogram-proof-widget-design-realization):
  focused semantic-design proof for mapping one widget to web, iOS, and Android
  component refs. It is current on `@topogram/cli@0.3.110` and includes the
  designer-readable `ui-design-coverage --format markdown` matrix.
- [Operations UI work-map proof](https://github.com/attebury/topogram-proof-operations-ui-work-map-v2):
  installable React-to-SvelteKit UI proof for layouts, regions, widgets,
  component maps, slice-guided feature work, and parity closeout.

## What Is Beta-Ready

- `init`, `copy`, `extract`, `adopt`, `generate`, `emit`, and `query` command
  vocabulary.
- `topo/` workspace ownership and project config.
- Brownfield extraction with bundled and first-party package-backed extractors.
- Review-only adoption plans and explicit `adopt --write`.
- Agent briefs, focused context slices, SDLC readiness, and proof-gap queries.
- Web UI semantic contracts, widget realization reports, and i18n/ARIA
  obligation markers for generated web output.
- Widget-first design matrices that show component refs, platform
  coverage, variant/state coverage, token/a11y/i18n gaps, and review work.
- Release preflight, strict release status, first-party consumer rollup, proof
  consumer tracking, and secret scanning.

## Current Limits

Topogram beta does not promise:

- pixel-perfect UI parity;
- complete runtime translation catalog management;
- full automated accessibility audit coverage;
- production deployment orchestration;
- automatic source mutation during extraction;
- silent adoption of brownfield candidates;
- enterprise audit exports, signed history, or external issue tracker sync.

Native generation and some workflow extractor families are preview/future work.

## Feedback That Helps

Useful beta feedback is concrete:

- Which command or artifact was unclear?
- Which candidate was noisy, missing, or unsafe to adopt?
- Which slice gave an agent too much or too little context?
- Which proof command failed to build trust?
- Which stack needs a generator or extractor pack?
- Which beta limit blocks real evaluation?

Attach the command, the relevant `topo/` file or candidate artifact, and the
expected next action when possible.

## Related Docs

- [Beta Readiness](/beta-readiness/)
- [Brownfield Extract/Adopt](/start/brownfield-import/)
- [Agent First Run](/agent-first-run/)
- [Proof Walkthrough](/proof-walkthrough/)
- [Extractor Packs](/authoring/extractor-packs/)
