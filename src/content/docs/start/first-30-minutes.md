---
title: "First 30 Minutes"
description: "A short evaluator path for seeing Topogram's current command surface, context slices, token-savings report, and proof loop without reading every subsystem."
---

# First 30 Minutes

> A short evaluator path for seeing Topogram's current command surface, context slices, token-savings report, and proof loop without reading every subsystem.

Status: current
Audience: evaluators, technical leads, and agents doing a first pass
Use when: you want a fast, runnable route through this repo before choosing a deeper proof or implementation task.

Run these from the Topogram repo root:

```bash
npm install
node ./engine/src/cli.js onboard . --json
node ./engine/src/cli.js agent brief . --json
node ./engine/src/cli.js check . --json
node ./engine/src/cli.js query list --json
```

`onboard` is the read-first adoption loop. It diagnoses whether the workspace
needs `init`, reports staged status for check/audit/generate/verify, and prints
the exact next commands without writing artifacts, generating app output, or
running project verification.

Read the smallest useful graph packet next. This one follows the public
greenfield journey because it exercises the same query path agents use for
bounded work:

```bash
node ./engine/src/cli.js query slice ./topo --journey journey_greenfield_start_from_template --detail compact --format markdown
```

For a human-readable cockpit of the same packet, render the static HTML view:

```bash
node ./engine/src/cli.js query slice ./topo --journey journey_greenfield_start_from_template --detail compact --format html
```

Then compare that focused slice with broad self-discovery:

```bash
node ./engine/src/cli.js query context-savings ./topo --journey journey_greenfield_start_from_template --detail compact --format markdown
```

Use the result to decide whether Topogram is giving the agent a smaller,
explicit context surface than reading the whole app map. The report uses
approximate token estimates; it is a local planning signal, not exact model
token accounting.

When you want a reviewable evidence directory instead of terminal output, write
an adoption audit bundle. It includes the agent brief, check summary, SDLC
reports, context inventory, domain list, manifest, and source excerpts with
portable paths:

```bash
node ./engine/src/cli.js onboard . --write --out-dir ./artifacts
```

For task or bug tracing, use a focused bundle:

```bash
node ./engine/src/cli.js onboard . --task <task-id> --write --out-dir ./artifacts
node ./engine/src/cli.js emit audit-bundle ./topo --bug <bug-id> --profile bug --from-topogram ./baseline/topo --write --out-dir ./artifacts
```

Finish with the smallest repo proof that the docs and public command examples
are still current:

```bash
npm run docs:check
```

After that, choose a deeper route:

- [Beta Demo Path](/start/beta-demo-path/) for proof repos by evaluator goal.
- [Brownfield Extract/Adopt](/start/brownfield-import/) for existing app discovery.
- [Agent First Run](/agent-first-run/) for task-scoped agent work.
- [CLI Reference](/reference/cli/) for the full current command map.
