---
title: "Agent First Run"
description: "Start agents from the app map, focused query packets, write scope, and proof commands instead of broad repository reads."
---

# Agent First Run

> Start agents from the app map, focused query packets, write scope, and proof commands instead of broad repository reads.

Status: current
Audience: coding agents and humans supervising agents
Use when: an agent is entering a Topogram project and needs safe read order, commands, and edit boundaries.

Agents should start from the project briefing and focused query packets. The
goal is to understand the smallest useful part of the app map, the allowed
write scope, and the proof commands before reading broad repository context or
editing code.

## First command

```bash
topogram onboard --json
topogram agent brief --json
```

Generated projects expose the same command as:

```bash
npm run --silent onboard
npm run --silent agent:brief
```

`onboard` and `agent brief` are read-only by default. `onboard` shows the
staged init/check/audit/generate/verify adoption plan; `agent brief` gives
machine-readable read order, boundaries, and first commands. Neither generates
apps, writes files, loads generator adapters, or executes template
implementation code unless an explicit write/generate/verify flag is supplied
to the relevant command.

## Read order

1. `AGENTS.md`
2. `README.md`
3. `topogram.project.json`
4. `topogram.sdlc-policy.json`, when present
5. `topogram.template-policy.json`, when present
6. `topogram.generator-policy.json`, when present
7. `.topogram-template-trust.json`, when executable implementation exists
8. `.topogram-extract.json`, when the project came from brownfield extract/adopt
9. Focused `topogram query ... --json` output

## First command sequence

```bash
topogram onboard --json
topogram agent brief --json
topogram query list --json
topogram query show <name> --json
topogram check --json
```

If the project has adopted SDLC and the work is tied to a task or bug, add:

```bash
topogram query sdlc-grooming ./topo --json
topogram query sdlc-backlog ./topo --json
topogram query sdlc-available ./topo --json
topogram query sdlc-ready ./topo --json
topogram sdlc explain <task-id> --json
topogram sdlc start <task-id> . --actor <actor-id> --json
topogram sdlc start <task-id> . --actor <actor-id> --write --json
topogram query slice ./topo --task <task-id> --json
topogram onboard . --task <task-id> --write --out-dir ./artifacts
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
topogram query verification-runs ./topo --task <task-id> --json
```

The first `sdlc start` command is read-only and returns the task-start packet.
Use `--write` only after reviewing blockers, ownership, decisions, rules,
plans, and verification targets in that packet.

For journey-oriented workflow context:

```bash
topogram query slice ./topo --journey journey_greenfield_start_from_template --json
```

For implementation planning:

```bash
topogram query single-agent-plan . --mode modeling --capability <capability-id> --json
```

Before commit in an SDLC-adopted project:

```bash
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
topogram sdlc prep commit . --base origin/main --head HEAD --json
topogram sdlc gate . --base origin/main --head HEAD --require-adopted --json
```

## Edit boundaries

Safe default source edits:

- `topo/**`
- `topogram.project.json`
- policy files after review
- `implementation/**` only after reviewing trust state

Generated-owned outputs such as `app/**` are replaceable. Do not make durable
edits there unless the output ownership is maintained.

## Generated project first-run commands

Generated projects usually expose these local scripts:

```bash
npm run agent:brief
npm run doctor
npm run source:status
npm run template:explain
npm run generator:policy:check
npm run check
npm run generate
npm run verify
```

## UI and widgets

For UI work, inspect widget and surface packets:

```bash
topogram widget check ./topo --surface proj_web
topogram widget behavior ./topo --surface proj_web --json
topogram emit ui-widget-contract ./topo --json
topogram query slice ./topo --surface proj_web --screen <screen-id> --detail compact --json
```

`semantic_ui` owns semantic UI. Concrete web/native surfaces inherit it and own
routes and surface hints.
Focused UI slices include an `agent_readiness` section. It summarizes whether
the screen, layout, region, widget, or component map is ready to edit, what
context is missing, which design/i18n/ARIA gaps need review, which widget
bindings are the likely change targets, and which proof commands should run.

## Slices and vocabulary

Context slices are intended to be cold-start safe without copying the full
agent brief into every packet. Slices include focused dependencies, standing
rule references, mode-specific next commands, and glossary terms explicitly
linked through `related_terms` or entity `uses_terms`. They also include a
work packet shape for humans and agents: `frame`, `relationships`,
`work_items`, `proof_plan`, and `attention_budget`.

Each slice includes a `slice_manifest` that tells an agent what is must-read,
reference-only, proof context, or diagnostic context. Use `--detail compact`
when you need the shortest safe packet, `standard` for normal work, and `full`
when reviewing or debugging the slice itself. The manifest `read_order` is the
canonical order, and `agent_guidance.read_order` mirrors it for compatibility.
Use static HTML when a human wants a readable cockpit instead of raw JSON.
Use `onboard --write` or `emit audit-bundle` when first adopting a workspace or
tracing a bug; it writes the slice, HTML cockpit, proof reports, manifest, and
bounded source excerpts into a portable evidence directory without replacing
generated app outputs.

```bash
topogram query slice ./topo --mode implementation --task <task-id> --json
topogram query slice ./topo --mode implementation --task <task-id> --detail compact --format markdown
topogram query slice ./topo --mode implementation --task <task-id> --detail compact --format html
topogram emit context-slice ./topo --mode implementation --task <task-id> --format html --write --out-dir ./artifacts
topogram onboard . --task <task-id> --write --out-dir ./artifacts
topogram emit audit-bundle ./topo --mode implementation --task <task-id> --profile standard --write --out-dir ./artifacts
topogram emit audit-bundle ./topo --bug <bug-id> --profile bug --from-topogram ./baseline/topo --write --out-dir ./artifacts
topogram emit audit-bundle ./topo --profile adoption --write --out-dir ./artifacts
topogram emit glossary ./topo --json
```

## Brownfield extract/adopt

Before running a package-backed extractor, identify and check the package:

```bash
topogram extractor list
topogram extractor show @topogram/extractor-react-router
npm install -D @topogram/extractor-react-router
topogram extractor policy init
topogram extractor policy pin @topogram/extractor-react-router@1
topogram extractor check @topogram/extractor-react-router
```

The policy pin uses the extractor manifest version, not the npm package
version. `topogram extractor list`, `show`, `check`, and `policy status` report
manifest version, installed package version, compatible CLI range, and policy
pin state before package-backed execution. `topogram extractor check` proves the
package boundary can load and run a minimal smoke extraction; it does not prove
that the package understood the target app. That proof comes from extract/adopt
review packets.

When `.topogram-extract.json` exists:

```bash
topogram extract check . --json
topogram extract diff . --json
topogram extract plan . --json
topogram adopt --list . --json
topogram query extract-plan ./topo --json
topogram query single-agent-plan ./topo --mode extract-adopt --json
topogram query multi-agent-plan ./topo --mode extract-adopt --json
topogram query review-packet ./topo --mode extract-adopt --json
topogram extract status . --json
topogram extract history . --verify --json
```

Use `workspaceRoot` from import JSON as the canonical project-owned workspace
path.

In extract/adopt mode, query packets include `extraction_context` when
`.topogram-extract.json` is present. That context tells an agent which
package-backed extractors ran, how many candidates they produced, where the
trusted extraction record lives, and which review/adoption commands are safe to
run next. Treat extractor output as evidence until `topogram adopt ... --write`
promotes reviewed candidates.

Use query packets before raw `topo/candidates/**` files unless you need the
evidence details for a specific candidate.

## Command-owned state

Use commands for stateful workflow mutations:

- `topogram sdlc transition`
- `topogram sdlc plan step ... --write`
- `topogram sdlc archive`
- `topogram trust ...`
- `topogram extract ...`
- `topogram generate`
- `topogram emit --write`
- `topogram release ...`

Declarative `.tg` source may be edited directly. Status history, provenance,
trust hashes, generated sentinels, archives, and release evidence should not be
hand-edited to make checks pass.

<!-- topogram-website:field-notes:start -->

## Field Notes

- [Topogram Layers and Slices](/post/layers-and-slices/) — how focused context packets fit into the larger app map.
- [How Topogram Manages SDLC](/post/how-topogram-manages-sdlc/) — how agents should treat work state, proof, and CLI-owned mutations.

<!-- topogram-website:field-notes:end -->
