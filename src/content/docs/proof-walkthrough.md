---
title: "Proof Walkthrough"
description: "The proof repositories show runnable step-by-step stories for generated, maintained, brownfield, and recreated apps."
---

# Proof Walkthrough

> The proof repositories show runnable step-by-step stories for generated, maintained, brownfield, and recreated apps.

Status: current
Audience: evaluators and maintainers inspecting proof repositories
Use when: you need runnable proof/demo steps and what each checkpoint proves.

Topogram has two public proof repositories. They are tutorial-style product
stories, not fixtures. Use them when you want to see how the app map supports
real work: branches, tags, README notes, SDLC records, agent packets, emitted
contracts, and verification commands.

## Five-Minute Demo Path

Use the brownfield proof when you want the shortest product demo:

```bash
git clone https://github.com/attebury/topogram-proof-content-approval-brownfield-v2.git
cd topogram-proof-content-approval-brownfield-v2
git checkout proof-03-adopt-spec
npm install
npm run verify
```

Then inspect:

- `proof/STEP.md` for what the checkpoint proves;
- `proof/artifacts/` for the extract/adopt plan, receipts, agent packets, and
  validation output;
- `topo/` for the adopted app map.

That checkpoint shows the core Topogram move: existing React/Express/Prisma
code becomes reviewed `topo/` source, extraction evidence stays separate, and
agents get focused packets before maintained-code changes.

## Beta Evaluation Path

For beta evaluation, read the proof repos as product demos:

1. Run the five-minute brownfield path above.
2. Open `proof/artifacts/` and inspect the extract plan, adoption list, agent
   brief, and focused query packets.
3. Compare `proof-03-adopt-spec` to `proof-04-feature-from-topo` to see how a
   maintained feature is planned from `topo/` instead of rediscovering source.
4. Compare `proof-06-recreate-other-stack` and `proof-07-parity-proof` to see
   where Topogram can recreate a stack and where parity is only reported.
5. Use the generated-to-maintained proof second to see how `generate` fits the
   same app-map model.

The demo claim is intentionally narrow: Topogram provides a reviewable map,
focused agent context, contracts, and proof commands. It does not promise full
runtime equivalence or pixel-perfect UI parity.

## Proof Repos

| Story | Repository | What It Proves |
| --- | --- | --- |
| Brownfield extract/adopt | [topogram-proof-content-approval-brownfield-v2](https://github.com/attebury/topogram-proof-content-approval-brownfield-v2) | Start with a maintained app, extract candidates, adopt curated specs, implement a maintained feature from agent context, refresh drift, recreate another stack, and compare parity. |
| Generated to maintained | [topogram-proof-content-approval-v2](https://github.com/attebury/topogram-proof-content-approval-v2) | Start from a generated app, iterate through Topogram, graduate output to maintained ownership, then use Topogram for maintained feature and DB migration guidance. |

The brownfield proof is the fastest way to understand Topogram’s main
differentiator: it turns existing code into reviewable app-map evidence, then
uses that map to guide agent-safe maintained changes. The generated-to-maintained
proof shows the same map starting from a template instead of an existing app.

Both repos expose a `Proof Verification` workflow, `npm run proof:audit`, and
`npm run verify`. They also use SDLC to show the recommended habit, but SDLC is
not required for ordinary Topogram users.

`topogram release status --strict` tracks these repos as `proofConsumers`, not
as normal package rollout consumers. A release is considered current when proof
repos meet the configured proof baseline, expose the audit/verify scripts, and
have green Proof Verification workflows. The current v2 proof baseline is
`@topogram/cli@0.3.92`. Proof repos do not need to be repinned for every CLI
patch; refresh them when a command workflow meaning changes, a breaking change
lands, or a proof artifact would teach stale behavior.

## How To Read A Proof

1. Open the repo and confirm the `Proof Verification` badge is green.
2. Read `proof/README.md` for the step map.
3. Check out a proof tag:

   ```bash
   git fetch --tags
   git checkout proof-03-review-workflow-ui
   cat proof/STEP.md
   npm install
   npm run verify
   ```

4. Inspect `proof/artifacts/` for the machine-readable proof.
5. Compare the current tag with the previous tag when you want to see exactly
   what changed.

`npm run verify` is intentionally the only command a reader needs to trust at a
checkpoint. In the v2 repos it runs the proof audit, path-hygiene audit,
Topogram validation when `topo/` exists, SDLC validation when adopted, app
verification, recreated-stack compilation when present, and a final clean
worktree check.

## What Agents Should Read

The proof repos intentionally commit agent-facing artifacts. These are the files
an implementation agent would normally read instead of loading the whole repo:

- `agent-brief.json`: read order, edit boundaries, workflow commands, and trust
  or policy state.
- `*-task-slice.json`: focused SDLC/task context for one implementation slice.
- `*-single-agent-plan.json`: implementation plan for maintained app edits.
- `ui-surface-contract.json`, `ui-widget-contract.json`, and widget reports:
  UI contracts and conformance checks.
- DB snapshots, migration plans, and SQL migration artifacts: generated or
  maintained migration evidence.
- extract/adopt plans and receipts: brownfield candidate review and adoption
  proof.

## Story 1: Generated To Maintained

The generated proof walks through:

| Step | Checkpoint | What To Notice |
| --- | --- | --- |
| 01 generated baseline | [`proof-01-generated-baseline`](https://github.com/attebury/topogram-proof-content-approval-v2/tree/proof-01-generated-baseline) | `topogram copy` creates a starter and `topogram generate` owns app output. |
| 02 content approval domain | [`proof-02-content-approval-domain`](https://github.com/attebury/topogram-proof-content-approval-v2/tree/proof-02-content-approval-domain) | Editing `topo/` changes the generated app contract and output. |
| 03 review workflow UI | [`proof-03-review-workflow-ui`](https://github.com/attebury/topogram-proof-content-approval-v2/tree/proof-03-review-workflow-ui) | Widgets, screen bindings, behavior, and UI contracts become the development guide. |
| 04 generated DB migration | [`proof-04-generated-db-migration`](https://github.com/attebury/topogram-proof-content-approval-v2/tree/proof-04-generated-db-migration) | DB snapshots and SQL migration output are generated while app output is still generated-owned. |
| 05 graduate maintained | [`proof-05-graduate-maintained`](https://github.com/attebury/topogram-proof-content-approval-v2/tree/proof-05-graduate-maintained) | `topogram generate` refuses to overwrite maintained output. |
| 06 maintained feature | [`proof-06-maintained-feature`](https://github.com/attebury/topogram-proof-content-approval-v2/tree/proof-06-maintained-feature) | Agent/query packets guide direct maintained app edits. |
| 07 maintained DB migration | [`proof-07-maintained-db-migration`](https://github.com/attebury/topogram-proof-content-approval-v2/tree/proof-07-maintained-db-migration) | Topogram emits migration proposals; humans/agents adapt maintained DB files directly. |

Use this story when you want to understand the greenfield path: start with a
generated project, keep the generated loop while it is useful, then graduate the
app to maintained ownership without throwing away the `topo/` contract.

## Story 2: Brownfield Extract/Adopt

The brownfield proof walks through:

| Step | Checkpoint | What To Notice |
| --- | --- | --- |
| 01 brownfield baseline | [`proof-01-brownfield-baseline`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v2/tree/proof-01-brownfield-baseline) | A working React/Express/Prisma app exists with no `topo/`. |
| 02 extract candidates | [`proof-02-extract-candidates`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v2/tree/proof-02-extract-candidates) | Package-backed extractors create review-only candidates and provenance. |
| 03 adopt spec | [`proof-03-adopt-spec`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v2/tree/proof-03-adopt-spec) | Curated candidates become canonical `topo/`; extraction output remains evidence. |
| 04 feature from topo | [`proof-04-feature-from-topo`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v2/tree/proof-04-feature-from-topo) | A maintained feature is implemented from Topogram context packets. |
| 05 refresh drift | [`proof-05-refresh-drift`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v2/tree/proof-05-refresh-drift) | Source/spec drift is detected and reviewed without silent adoption. |
| 06 recreate other stack | [`proof-06-recreate-other-stack`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v2/tree/proof-06-recreate-other-stack) | The adopted Topogram generates a SvelteKit/Hono/Postgres recreation beside maintained source. |
| 07 parity proof | [`proof-07-parity-proof`](https://github.com/attebury/topogram-proof-content-approval-brownfield-v2/tree/proof-07-parity-proof) | Contracts and verification reports compare maintained and generated stacks. |

Use this story when you want to understand the brownfield path: extract
candidates from existing source, review and adopt only the useful contracts,
keep the original app maintained, then use the adopted `topo/` to guide features
or recreate another stack.

## What The Proofs Are Not

The proof repos are not release consumers that must move on every patch and they
are not a promise that every stack has identical runtime behavior. They are
known-good product stories pinned to a CLI baseline. Refresh them when a command
workflow changes, a breaking change lands, or the committed artifacts would
teach stale behavior.

## Current Limits

The proofs show contract, compile, and workflow parity. They do not claim pixel
parity, full production deployment readiness, or exhaustive runtime equivalence.
When a proof cannot establish something, it should say so in the step result or
parity report.
