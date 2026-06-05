---
title: "First 30 Minutes"
description: "The canonical evaluator path for understanding, inspecting, running, and verifying Topogram with the installed CLI."
---

# First 30 Minutes

> The canonical evaluator path for understanding, inspecting, running, and verifying Topogram with the installed CLI.

Status: current
Audience: evaluators, technical leads, technical buyers, and agents doing a first pass
Use when: you want the shortest useful route through Topogram before choosing a deeper modeling or implementation task.

Run commands from a project you want to evaluate. This path is intentionally
narrow: it helps you judge whether Topogram gives humans and agents a smaller,
verified operating surface than rediscovering a repository from scratch.

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

Install the CLI if the project does not already have it:

```bash
npm install --save-dev @topogram/cli
npx topogram doctor
```

Then ask the CLI for the current adoption state and agent briefing:

```bash
npx topogram onboard . --json
npx topogram agent brief . --json
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
npx topogram check . --json
npx topogram query list --json
```

Good output:

- `check` reports `ok: true` for the current workspace.
- `query list` shows the focused packets and reports available for the current
  `topo/` workspace.
- The available packets should be useful without requiring a reader to inspect
  every `topo/**/*.tg` file.

When the project has a task, screen, widget, or capability to inspect, query the
smallest matching slice:

```bash
npx topogram query slice ./topo --task <task-id> --detail compact --format markdown
```

## 4. Verify

Run the proof named by the project or the slice packet. Common first checks are:

```bash
npx topogram check . --json
npx topogram security status . --json
```

Good output:

- validation reports no graph or ownership errors;
- security status reports no blocking boundary issues;
- the packet's proof commands identify the project-specific checks to run next.

When you want a portable evidence bundle instead of terminal output, write one:

```bash
npx topogram onboard . --write --out-dir ./artifacts
```

The bundle should contain a manifest, check summary, agent brief, SDLC reports,
context inventory, source excerpts, and portable paths.

## Deeper Routes

- [Brownfield Extract/Adopt](/start/brownfield-import/): existing app discovery.
- [Greenfield Generate](/start/greenfield-generate/): starting from authored
  Topogram or a template.
- [Agent First Run](/agent-first-run/): task-scoped agent workflow.
- [CLI Reference](/reference/cli/): full current command map.
