---
title: "Workflow Extraction"
description: "Extract workflow-native source into reviewable Topogram workflow candidates, then adopt only the reviewed map."
---

# Workflow Extraction

> Extract workflow-native source into reviewable Topogram workflow candidates, then adopt only the reviewed map.

Status: current
Audience: developers and agents extracting workflow state machines or process definitions
Use when: an existing app has source that directly owns workflow states, transitions, orchestration, or process definitions.

Use this path when workflow behavior is encoded in a workflow-native source such
as XState, BPMN, Temporal, Step Functions, Camunda, Rails state machines,
Django FSM, SCXML, or a similar state-machine/process tool.

Do not use ordinary DB, API, UI, or CLI extractors to invent workflow intent.
Those extractors should emit their own track evidence. Topogram can synthesize
some conservative cross-track workflow candidates, but workflow-native
extractor packs are the clearer path when the source already owns the workflow.

## Shortest Useful Path

```bash
npm install -D @topogram/extractor-xstate-workflows
topogram extractor recommend ./xstate-app --from workflows
topogram extractor show @topogram/extractor-xstate-workflows
topogram extractor policy init
topogram extractor policy pin @topogram/extractor-xstate-workflows@1
topogram extractor check @topogram/extractor-xstate-workflows
topogram extract ./xstate-app --out ./extracted-workflows --from workflows --extractor @topogram/extractor-xstate-workflows
cd ./extracted-workflows
topogram extract plan
topogram adopt --list
```

That sequence does four separate things:

- chooses the workflow extractor without executing package code;
- pins the reviewed extractor manifest version;
- runs a package boundary smoke check;
- writes review-only candidates and then shows adoption selectors.

Extractor packages are never installed by `topogram extract`. Install them
deliberately, pin the manifest version deliberately, then run extraction.

## What Gets Extracted

Workflow extractors emit review-only candidate buckets:

- `workflow_definitions`: workflow names, source evidence, and identity hints;
- `workflow_states`: state IDs, labels, types, and source evidence;
- `workflow_transitions`: event names, source state, target state, guards, and evidence.

Topogram core owns persistence, reports, extract plans, adoption, and canonical
`topo/**` writes. Extractor packages return candidates; they do not write the
canonical app map.

## Step Functions V1 Shape

The first-party Step Functions extractor starts with local Amazon States
Language files, not AWS account discovery. V1 reads checked-in JSON or YAML
definitions such as `.asl.json`, `.asl.yaml`, `states.json`, or `states.yaml`.

The extractor should map statically visible state-machine structure into normal
workflow candidate buckets:

- workflow definition from the state-machine `Comment`, file name, or logical id;
- states from `States` keys, including `StartAt`, `Succeed`, `Fail`, `Wait`,
  `Task`, `Choice`, `Map`, `Parallel`, and `Pass`;
- transitions from `Next`, `Default`, `Choices`, `Catch`, `Retry`, branch
  starts, and terminal `End` states where available;
- evidence with project-relative source paths and JSON/YAML pointers.

V1 should not call AWS APIs, read credentials, inspect deployed execution
history, or infer IAM semantics. CloudFormation, CDK, SAM, Serverless, and
Terraform discovery can become separate extractor or preprocessor work after
the local ASL path is useful.

When using a local checkout before an npm release, pass the package directory
as the extractor:

```bash
topogram extractor check ../topogram-extractor-step-functions-workflows
topogram extract ./service --out ./extracted-workflows --from workflows --extractor ../topogram-extractor-step-functions-workflows
```

## BPMN V1 Shape

The first-party BPMN extractor starts with local BPMN 2.0 XML files, not
workflow-engine discovery. V1 reads checked-in `.bpmn`, `.bpmn.xml`, and BPMN
XML files containing process definitions.

The extractor maps statically visible process structure into normal workflow
candidate buckets:

- workflow definitions from BPMN `process` records;
- states from start events, end events, tasks, gateways, subprocesses, call
  activities, and intermediate/boundary events;
- transitions from `sequenceFlow` source and target refs, including condition
  expressions when present;
- evidence with project-relative source paths and BPMN element ids.

V1 should not call Camunda, Flowable, Activiti, Zeebe, or other workflow-engine
APIs, read credentials, inspect runtime histories, or render process diagrams.

When using a local checkout before an npm release, pass the package directory
as the extractor:

```bash
topogram extractor check ../topogram-extractor-bpmn-workflows
topogram extract ./service --out ./extracted-workflows --from workflows --extractor ../topogram-extractor-bpmn-workflows
```

## Temporal V1 Shape

The first-party Temporal extractor starts with local TypeScript and Go workflow
source, not Temporal Cloud, workers, namespaces, or execution history. V1 reads
checked-in source that imports `@temporalio/workflow` or
`go.temporal.io/sdk/workflow`.

The extractor maps statically visible workflow source into normal workflow
candidate buckets:

- workflow definitions from exported workflow functions;
- states from activity calls, timers, signal handlers, conditions, and child
  workflow calls where those are visible in source;
- transitions from the source order and explicit Temporal operations;
- evidence with project-relative source paths, activity names, signals, timers,
  and child workflow relationships.

V1 should not connect to a Temporal service, read credentials, inspect workflow
history, execute workflow code, or infer worker/task-queue deployment topology.

```bash
topogram extractor check @topogram/extractor-temporal-workflows
topogram extract ./temporal-app --out ./extracted-workflows --from workflows --extractor @topogram/extractor-temporal-workflows
```

## Review And Adoption

After extraction, review the candidate plan before adopting:

```bash
topogram extract plan --json
topogram adopt --list --json
topogram adopt workflows --dry-run --json
topogram adopt workflows --write
topogram check --json
```

Use `--dry-run` first. Adoption is the first step that can promote reviewed
workflow candidates into canonical `topo/**` files.

## Agent Context

After adoption, start with the normal agent workflow:

```bash
topogram agent brief --json
topogram query list --json
topogram query single-agent-plan ./topo --mode extract-adopt --json
topogram emit context-slice ./topo --workflow workflow_review --detail compact --json
```

Adopted workflow candidates become graph-native `workflow` records. A workflow
slice includes states, transitions, related context, write-scope guidance, and
proof commands without requiring an agent to infer behavior from Markdown docs.

## Proof Repo

Use the focused proof repo to see the path end to end:

- [XState Workflow Proof](https://github.com/attebury/topogram-proof-xstate-workflow)
- [Step Functions Workflow Proof](https://github.com/attebury/topogram-proof-step-functions-workflow)

The proof starts with an XState app, extracts workflow candidates through
`@topogram/extractor-xstate-workflows`, adopts reviewed workflow records,
uses compact agent context for a maintained source change, and refreshes drift.
The Step Functions proof follows the same path with local Amazon States
Language and `@topogram/extractor-step-functions-workflows`.

## Failure Modes

- The extractor package is not installed: install it explicitly with npm or use
  a local package path.
- The policy pin is missing or mismatched: run `topogram extractor policy pin
  <package>@<manifest-version>`.
- The workflow source is not workflow-native: run DB/API/UI/CLI extraction first
  and treat cross-track workflow candidates as conservative review hints.
- Adoption selectors are unclear: inspect `topogram extract plan --json` and
  `topogram adopt --list --json` before writing.

## Related Docs

- [Brownfield Extract/Adopt](/start/brownfield-import/)
- [Extractors](/concepts/extractors/)
- [Extractor Packs](/authoring/extractor-packs/)
- [Extract/Adopt JSON](/reference/import-json/)
- [Proof Walkthrough](/proof-walkthrough/)
