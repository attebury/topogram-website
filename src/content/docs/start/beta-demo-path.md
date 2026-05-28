---
title: "Beta Demo Path"
description: "The beta demo path tells evaluators which Topogram proof to run first, which proof to inspect second, and which proofs are optional deep dives."
---

# Beta Demo Path

> The beta demo path tells evaluators which Topogram proof to run first, which proof to inspect second, and which proofs are optional deep dives.

Status: current
Audience: beta evaluators, engineering leads, product owners, designers, agents, and maintainers
Use when: you want the shortest useful route through Topogram's public demos without reading every proof repository.

Topogram has many proof repositories because it covers brownfield extraction,
generation, workflow extraction, UI work maps, design review, and release proof.
Do not start by reading all of them. Use this route instead.

## Default Route

1. Run the clean brownfield smoke from this repo.
2. Inspect the brownfield proof at the adoption and feature checkpoints.
3. Inspect the operations design-review proof if UI/design matters to you.
4. Inspect one workflow proof only if workflow-native extraction matters to
   your stack.
5. Use the generated-to-maintained proof only when you need to understand
   `generate` and ownership graduation.

This route shows Topogram's main beta promise: existing code can become a
reviewed app map, agents can work from focused slices, and proof commands stay
attached to the work.

## Five Minutes

From the Topogram repo, run:

```bash
TOPOGRAM_CLI_PACKAGE_SPEC=@topogram/cli@latest npm run smoke:beta-evaluator
```

This installs the public CLI and extractor packages in a clean temp project,
creates a small brownfield app, extracts review-only candidates, adopts a
reviewed bundle, emits agent packets, validates the adopted `topo/`, and writes
a portable report.

Read the report path printed by the command. The useful question is not "did it
generate a demo app?" The useful question is "did Topogram produce reviewable
evidence and bounded agent context from existing code?"

## Thirty Minutes

Clone the brownfield proof:

```bash
git clone https://github.com/attebury/topogram-proof-content-approval-brownfield-v3.git
cd topogram-proof-content-approval-brownfield-v3
git checkout proof-03-adopt-app-map
npm ci --no-audit
npm run verify
```

Inspect:

- `proof/STEP.md`: what this checkpoint proves.
- `proof/artifacts/`: extraction plans, adoption receipts, agent packets, and
  validation output.
- `topo/`: the adopted app map.

Then compare the maintained-feature checkpoint:

```bash
git checkout proof-04-feature-from-slice
npm ci --no-audit
npm run verify
```

This is the strongest beta demo. It shows existing React/Express/Prisma source,
review-only extraction, explicit adoption, a focused agent slice, maintained
source edits, and verification.

## UI And Design Route

Use this when you are a designer, front-end lead, or product engineer evaluating
semantic UI support:

```bash
git clone https://github.com/attebury/topogram-proof-operations-design-review.git
cd topogram-proof-operations-design-review
git checkout proof-07-published-cli-refresh
npm ci --no-audit
npm run verify
```

Inspect:

- `proof/artifacts/step-04-designer-report-packet/`: designer-readable work-map
  packet and coverage reports.
- `proof/artifacts/step-06-designer-closeout/`: accepted, deferred, and
  unsupported review rows.
- `topo/`: screens, layouts, regions, widgets, design language, component maps,
  style intent, i18n, and ARIA obligations.

Use this proof to judge whether Topogram's UI graph is useful as a work map. It
does not claim pixel-perfect design parity.

## Workflow Route

Use workflow proofs only when workflow-native extraction matters to your stack:

| Proof | Use When |
| --- | --- |
| [XState workflow proof](https://github.com/attebury/topogram-proof-xstate-workflow) | Your app has workflow state encoded in an application state-machine library. |
| [Step Functions workflow proof](https://github.com/attebury/topogram-proof-step-functions-workflow) | Your workflow source is local Amazon States Language. |

Both proofs show the same shape: baseline source, package-backed extraction,
reviewed adoption, a compact workflow slice, maintained source drift, and
refresh/adoption.

## Generated Route

Use the generated-to-maintained proof when you care about greenfield starts,
generated ownership, or migration guidance:

```bash
git clone https://github.com/attebury/topogram-proof-content-approval-v3.git
cd topogram-proof-content-approval-v3
git checkout proof-03-ui-i18n-aria-proof
npm ci --no-audit
npm run verify
```

This route is important, but it is not the main beta wedge. It shows that
Topogram can generate from an app map and later graduate output to maintained
ownership.

## Which Demo Should I Use?

| If You Care About | Start With | Skip For Now |
| --- | --- | --- |
| Agent-safe changes to an existing app | Brownfield proof | Generated-to-maintained, UI-only proofs |
| Design systems, widgets, layouts, and UI slices | Operations design-review proof | DB/API/workflow proofs |
| Workflow-native extraction | XState or Step Functions proof | UI/design proofs |
| Greenfield generation and ownership graduation | Generated-to-maintained proof | Brownfield drift and workflow proofs |
| Release confidence | `npm run smoke:beta-evaluator`, then `topogram release status --strict` | Reading every proof artifact manually |

## What To Ask While Reviewing

- Did the proof make the source of truth clear?
- Did extraction stay review-only?
- Did adoption require an explicit reviewed selector?
- Did the slice give an agent enough context without the whole repo?
- Did proof commands validate the claim?
- Did unsupported or contract-only UI/design work show up as review work?

If any answer is unclear, that is useful beta feedback.

## Related Docs

- [Beta Launch](/beta-launch/)
- [Beta Readiness](/beta-readiness/)
- [Proof Walkthrough](/proof-walkthrough/)
- [Brownfield Extract/Adopt](/start/brownfield-import/)
- [Agent First Run](/agent-first-run/)
