---
title: "Extractors"
description: "Extractors read brownfield source and emit review-only candidates for Topogram adoption."
---

# Extractors

> Extractors read brownfield source and emit review-only candidates for Topogram adoption.

Status: current
Audience: developers, agents, and extractor package authors
Use when: you need to understand what extractors do before selecting, authoring, or trusting an extractor package.

Extractors are execution dependencies for `topogram extract`. They inspect an
existing app and return findings, evidence, and candidates. Topogram core owns
normalization, persistence, reports, reconcile/adoption plans, and canonical
`topo/**` writes.

Extractor packages do not mutate source apps, write canonical Topogram records,
install packages, or perform adoption. They are lower-level discovery
dependencies, while templates are user-facing starting points.

## Workflow Evidence

Ordinary stack extractors should not guess workflows. Prisma, Express, React
Router, and similar packages should emit precise DB, API, UI, CLI, or
verification evidence for their own track. Topogram core performs the
conservative cross-track v1 synthesis: it emits review-only workflow candidates
only when API capabilities map to a DB entity with a `status` or `state` enum.
Broader synthesis across UI, CLI, and verification evidence remains future
work.

Package-backed `workflows` extractors are for workflow-native sources: BPMN,
Temporal, XState, Step Functions, Camunda, Rails state machines, Django FSM,
and similar systems that directly encode states, transitions, orchestration, or
process definitions. Those packages may emit `workflow_definitions`,
`workflow_states`, and `workflow_transitions`, but adoption still remains an
explicit Topogram review step. See [Workflow Extraction](/start/workflow-extraction/)
for the focused command path.

Step Functions belongs in that workflow-native group when the source includes
local Amazon States Language JSON or YAML. Treat AWS account discovery,
execution history, and credential-backed inspection as later work; extractor v1
should be deterministic and local.

BPMN belongs in that workflow-native group when the source includes local BPMN
2.0 XML process definitions. Treat Camunda, Flowable, Activiti, Zeebe, runtime
history, credentials, and generated diagrams as later work; extractor v1 should
read checked-in process XML only.

## Design Evidence

Design-system extractors should propose review-only design realization
candidates, not canonical design decisions. Storybook support starts with the
first-party `@topogram/extractor-storybook-design` package. It reads static CSF
story files and only emits `component_mappings` when `parameters.topogram`
explicitly names the widget, design language, component ref, platform, pattern,
and status. Missing or unsupported story metadata becomes findings for review.

Use it when a component library already documents stable component identities in
Storybook and you want Topogram to carry those mappings into `adopt
component-mappings` review.

Extractor package repos can have their own `llms.txt` and `llms-full.txt`.
Those files describe the package-local authoring and safety surface; they are
separate from the root Topogram repo `llms.txt`. Scaffolded extractor packages
generate package-local docs checks that refuse links or writes outside the
package root.

## Commands

```bash
topogram extractor list
topogram extractor recommend ./existing-app --from db,api,ui,cli,workflows
topogram extractor show @topogram/extractor-prisma-db
topogram extractor policy pin @topogram/extractor-prisma-db@1
topogram extract ./existing-app --out ./extracted-topogram --from db --extractor @topogram/extractor-prisma-db
topogram extractor show @topogram/extractor-xstate-workflows
topogram extractor policy pin @topogram/extractor-xstate-workflows@1
topogram extract ./xstate-app --out ./extracted-topogram --from workflows --extractor @topogram/extractor-xstate-workflows
topogram extractor show @topogram/extractor-bpmn-workflows
topogram extractor policy pin @topogram/extractor-bpmn-workflows@1
topogram extract ./bpmn-app --out ./extracted-topogram --from workflows --extractor @topogram/extractor-bpmn-workflows
topogram extractor show @topogram/extractor-temporal-workflows
topogram extractor policy pin @topogram/extractor-temporal-workflows@1
topogram extract ./temporal-app --out ./extracted-topogram --from workflows --extractor @topogram/extractor-temporal-workflows
topogram extractor show @topogram/extractor-storybook-design
topogram extractor policy pin @topogram/extractor-storybook-design@1
topogram extract ./storybook-library --out ./storybook-topogram --from ui --extractor @topogram/extractor-storybook-design
```

## Related Docs

- [Brownfield Extract/Adopt](/start/brownfield-import/)
- [Workflow Extraction](/start/workflow-extraction/)
- [Extractor Packs](/authoring/extractor-packs/)
- [Extract/Adopt JSON](/reference/import-json/)
