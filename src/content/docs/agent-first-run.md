---
title: "Agent First Run"
description: "A coding-agent runbook for reading Topogram first, choosing one work packet, respecting ownership, and proving the change."
---

# Agent First Run

> A coding-agent runbook for reading Topogram first, choosing one work packet, respecting ownership, and proving the change.

Status: current
Audience: coding agents and humans supervising agents
Use when: an agent is entering a Topogram project and needs safe read order, commands, output cues, and edit boundaries.

Agents should not start by reading the whole repository. Start with the app
map, current workflow packet, write scope, and proof commands. The goal is to
find the smallest useful context for the current task before editing.

## Read First

Read these files when they exist:

1. `AGENTS.md`
2. `README.md`
3. `topogram.project.json`
4. `topogram.sdlc-policy.json`
5. `topogram.template-policy.json`
6. `topogram.generator-policy.json`
7. `.topogram-template-trust.json`
8. `.topogram-extract.json`
9. the focused `topogram query ...` packet for the current task

The CLI repeats this order in `agent brief` so agents can consume it as JSON.

## Start With Two Read-Only Commands

```bash
topogram onboard . --json
topogram agent brief --json
```

Generated projects usually expose the same flow as:

```bash
npm run onboard
npm run agent:brief
```

Good `onboard` output has:

- `status` and staged entries for init, check, audit-bundle, generate, and
  verify;
- exact `next_command` values;
- no writes unless an explicit write, generation, or verification-run flag is
  present.

Good `agent brief` output has:

- `read_order`;
- `edit_boundaries`;
- `first_commands`;
- SDLC policy and trust state;
- focused workflow suggestions.

Generated projects also expose the standard local first-run scripts:

```bash
npm run doctor
npm run source:status
npm run template:explain
npm run check
npm run generate
npm run verify
```

## Choose The Work Packet

Discover available query packets when you do not know the task or focus yet:

```bash
topogram query list --json
topogram query show <name> --json
topogram check --json
```

There are two normal entry paths:

- Existing backlog work starts from an available SDLC task.
- New product work starts from a feature, then creates a feature-linked task.

For existing backlog work:

```bash
topogram query sdlc-ready ./topo --json
topogram sdlc start <task-id> . --actor <actor-id> --write --json
topogram work next ./topo --task <task-id> --mode implementation --json
```

For new product work:

```bash
topogram feature new <slug> . --intent "<feature intent>" --write --json
topogram sdlc new task <slug> . --feature feature_<slug> --phase implementation --scope current_feature --start --actor <actor-id> --write --json
topogram work next ./topo --task task_<slug> --mode implementation --json
```

`feature` is the product scope. `task` is the work item. Linking the task to a
feature lets `work next` derive endpoint contracts, seed records, edit targets,
and proof targets from structured scope instead of inferring them from prose.

For implementation work tied to an SDLC task, the canonical packet is:

```bash
topogram work next ./topo --task <task-id> --mode implementation --json
```

Good `work next` output has one `state`, one `do_now`, and a compact
`agent_packet` with:

- `success_condition`;
- `allowed_actions`;
- `blocked_actions`;
- `edit_targets`;
- current endpoint/seed/verification contracts;
- a `checkpoint` summary for safe context reset.

Read `agent_packet` first. It is the model-facing packet: current state, exact
next instruction, operation-level code or model targets, seed summaries,
scaffold status, proof commands, omitted sections, and drill-down commands.

Use these drill-downs only when the packet asks for them:

```bash
topogram query modeling-guide ./topo --format markdown
topogram query repair-model ./topo --format markdown
topogram query slice ./topo --task <task-id> --detail compact --format markdown
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
topogram query verification-runs ./topo --task <task-id> --json
```

`modeling-guide` is for sparse or broad modeling work. `repair-model` is for
failed validation. `slice` is for richer context after `work next` names a
reason to inspect it.

## SDLC Task Loop

When SDLC is adopted, inspect and start existing backlog work through the CLI:

```bash
topogram query sdlc-ready ./topo --json
topogram sdlc explain <task-id> --json
topogram sdlc start <task-id> . --actor <actor-id> --json
topogram sdlc start <task-id> . --actor <actor-id> --write --json
```

The first `sdlc start` is read-only. Use `--write` only after reviewing
blockers, decisions, rules, ownership, and verification targets. Status
history is command-owned; do not hand-edit SDLC sidecars to make checks pass.

For new work, create feature scope before task scope:

```bash
topogram feature new <slug> . --intent "<feature intent>" --write --json
topogram sdlc new task <slug> . --feature feature_<slug> --phase implementation --scope current_feature --start --actor <actor-id> --write --json
```

If SDLC is not adopted, task creation and task start return
`needs_sdlc_adoption` with the exact `topogram init --adopt-sdlc` guidance.

## Edit Boundaries

Safe default source edits:

- `topo/**`;
- `topogram.project.json`;
- policy files after review;
- maintained app source named by the packet write scope.

Generated-owned outputs are replaceable only through generation. Do not make
durable edits in generated-owned output unless the project has moved that path
to maintained ownership.

For brownfield extract/adopt work, treat `topo/candidates/**` as evidence until
a reviewed selector is adopted:

```bash
topogram extract check . --json
topogram extract plan . --json
topogram adopt --list . --json
topogram query extract-plan ./topo --json
```

## UI And App-Map Context

For UI work, inspect the work map before reading framework files:

```bash
topogram query work-map ./topo --surface <surface-id> --format markdown
topogram query slice ./topo --surface <surface-id> --screen <screen-id> --detail compact --json
topogram widget check ./topo --surface <surface-id> --json
```

For journey-oriented context:

```bash
topogram query slice ./topo --journey journey_greenfield_start_from_template --json
```

The semantic chain is:

```text
navpoint -> screen -> layout -> region -> render -> widget/action/section -> component_map
```

For API or implementation work, prefer `work next`; it keeps
endpoint contracts, seed data, write targets, and proof commands in one packet.

## Before Commit

Run the proof commands named by the task or packet. Common gates are:

```bash
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
topogram sdlc prep commit . --base origin/main --head HEAD --json
topogram sdlc gate . --base origin/main --head HEAD --require-adopted --json
topogram check . --json
```

If the project records verification receipts, record only commands that
actually ran:

```bash
topogram sdlc verify record <verification-id> . --task <task-id> --actor <actor-id> --command "<command>" --status pass --write --json
```

When several proof commands already ran, write a small `receipts.json` and use
one command-owned batch write instead of parallel receipt commands:

```bash
topogram sdlc verify record-batch . --task <task-id> --actor <actor-id> --from-file receipts.json --write --json
```

Good closeout means proof gaps are empty, verification evidence is current, and
public artifacts do not contain local absolute paths.

<!-- topogram-website:field-notes:start -->

## Field Notes

- [How Topogram Manages SDLC](/post/how-topogram-manages-sdlc/) — how agents should treat work state, proof, and CLI-owned mutations.

<!-- topogram-website:field-notes:end -->
