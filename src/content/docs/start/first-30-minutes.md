---
title: "First 30 Minutes"
description: "The canonical evaluator path for understanding, inspecting, running, and verifying Topogram from this repo."
---

# First 30 Minutes

> The canonical evaluator path for understanding, inspecting, running, and verifying Topogram from this repo.

Status: current
Audience: evaluators, technical leads, technical buyers, and agents doing a first pass
Use when: you want the shortest useful route through the current repo before choosing a deeper proof or implementation task.

Run commands from the Topogram repo root. This path is intentionally narrow:
it helps you judge whether Topogram gives humans and agents a smaller,
verified operating surface than rediscovering the repo from scratch.

## 1. Understand

Read these first:

- [What Topogram Is](/concepts/what-is-topogram/)
- [Topogram Model](/concepts/topogram-model/)
- [Agent First Run](/agent-first-run/), if you are evaluating agent work

The claim to evaluate is not "Topogram reads every repo perfectly." The useful
claim is: a reviewed app map can preserve product intent, ownership, contracts,
proof, and focused context so humans and agents make changes from bounded
evidence instead of broad guessing.

## 2. Inspect

Install dependencies if this checkout has not been prepared:

```bash
npm install
```

Then ask the CLI for the current adoption state and agent briefing:

```bash
node ./engine/src/cli.js onboard . --json
node ./engine/src/cli.js agent brief . --json
```

Good output:

- `onboard` returns an `onboarding_plan` with stages for init, check,
  audit-bundle, generate, and verify.
- `agent brief` returns `read_order`, `edit_boundaries`, `first_commands`,
  workflows, and SDLC policy warnings with portable paths.
- Neither command writes artifacts, generates app output, or runs project
  verification unless you pass an explicit write/generate/verify flag.

## 3. Run

Validate the app map and inspect one focused packet:

```bash
node ./engine/src/cli.js check . --json
node ./engine/src/cli.js query slice ./topo --journey journey_greenfield_start_from_template --detail compact --format markdown
```

Good output:

- `check` reports `ok: true` for the current workspace.
- The slice has a frame, read order, work items, proof plan, related records,
  and next commands for one bounded focus.
- The slice should be useful without requiring a reader to inspect every
  `topo/**/*.tg` file.

For a human-readable view of the same packet, render the static HTML cockpit:

```bash
node ./engine/src/cli.js query slice ./topo --journey journey_greenfield_start_from_template --detail compact --format html
```

For a rough context-size comparison, run:

```bash
node ./engine/src/cli.js query context-savings ./topo --journey journey_greenfield_start_from_template --detail compact --format markdown
```

`context-savings` uses approximate local token estimates. Treat it as an
attention-budget signal, not exact model-token accounting.

## 4. Verify

Run the smallest docs/repo proof for this evaluator pass:

```bash
npm run docs:check
```

Good output:

- documented command surfaces still match the current CLI;
- `llms.txt` and the generated retrieval bundle stay in sync;
- public docs keep stable headings, audience metadata, and current links.

When you want a portable evidence bundle instead of terminal output, write one:

```bash
node ./engine/src/cli.js onboard . --write --out-dir ./artifacts
```

The bundle should contain a manifest, check summary, agent brief, SDLC reports,
context inventory, source excerpts, and portable paths.

## Deeper Routes

- [Beta Demo Path](/start/beta-demo-path/): which public proof to run first.
- [Proof Walkthrough](/proof-walkthrough/): full proof catalog and how to
  read checkpoints.
- [Brownfield Extract/Adopt](/start/brownfield-import/): existing app discovery.
- [Greenfield Generate](/start/greenfield-generate/): starting from authored
  Topogram or a template.
- [Agent First Run](/agent-first-run/): task-scoped agent workflow.
- [CLI Reference](/reference/cli/): full current command map.
