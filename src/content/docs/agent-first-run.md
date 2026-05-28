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

For implementation work tied to an SDLC task, prefer:

```bash
topogram query implementation-prep ./topo --task <task-id> --detail compact --json
```

Good `implementation-prep` output has one state, one active bucket, and a
`workflow_step` with:

- `instruction`;
- `success_condition`;
- `allowed_actions`;
- `blocked_actions`;
- `exact_next_command`;
- `rerun_command`.

Read `agent_payload` first in compact mode. It is the model-facing packet:
current state, active bucket, endpoint or implementation contracts, seed
summaries, scaffold status, write targets, proof commands, omitted sections,
and drill-down `next_queries`.

Use these drill-downs only when the packet asks for them:

```bash
topogram query modeling-guide ./topo --format markdown
topogram query repair-model ./topo --format markdown
topogram query slice ./topo --task <task-id> --detail compact --format markdown
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
topogram query verification-runs ./topo --task <task-id> --json
```

`modeling-guide` is for sparse or broad modeling work. `repair-model` is for
failed validation. `slice` is for richer context after the prep packet names a
reason to inspect it.

## SDLC Task Loop

When SDLC is adopted, inspect and start work through the CLI:

```bash
topogram query sdlc-ready ./topo --json
topogram sdlc explain <task-id> --json
topogram sdlc start <task-id> . --actor <actor-id> --json
topogram sdlc start <task-id> . --actor <actor-id> --write --json
```

The first `sdlc start` is read-only. Use `--write` only after reviewing
blockers, decisions, rules, ownership, and verification targets. Status
history is command-owned; do not hand-edit SDLC sidecars to make checks pass.

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

For API or implementation work, prefer `implementation-prep`; it keeps
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

Good closeout means proof gaps are empty, verification evidence is current, and
public artifacts do not contain local absolute paths.

<!-- topogram-website:field-notes:start -->

## Field Notes

- [How Topogram Manages SDLC](/post/how-topogram-manages-sdlc/) — how agents should treat work state, proof, and CLI-owned mutations.

<!-- topogram-website:field-notes:end -->
