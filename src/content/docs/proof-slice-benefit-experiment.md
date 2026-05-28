---
title: "Slice Benefit Experiment"
description: "A repeatable clinic-ops proof for comparing Topogram slice-guided agent work with unguided app coding."
---

# Slice Benefit Experiment

> A repeatable clinic-ops proof for comparing Topogram slice-guided agent work with unguided app coding.

Status: current
Audience: maintainers and evaluators testing whether Topogram slices improve agent work
Use when: you want a repeatable comparison between Topogram-guided and unguided app coding.

This is an advanced evaluation path, not the first evaluator step. Start with
[First 30 Minutes](/start/first-30-minutes/) to inspect the local CLI and
[Beta Demo Path](/start/beta-demo-path/) to choose a runnable proof repo.
Use this experiment when you want to measure agent efficiency and quality under
controlled conditions.

The slice benefit experiment compares two agent arms on the same clinic
operations app:

- `topogram`: the workspace is initialized through the public
  `topogram init --adopt-sdlc` path, receives deterministic experiment overlays
  for the actor, aggregate requirement, acceptance criterion, and per-feature
  implementation tasks, the agent models the product in `topo/`, uses focused
  mode-specific slices from the current feature task, then implements the app.
- `vibe`: the agent works directly from the same product brief and feature waves
  without Topogram records or slices.

Both arms use the same model, temperature, stack constraints, feature waves,
canonical seed fixture, public API acceptance contract, iteration budget,
workspace isolation, and evaluator checks. The public API contract is copied to
each workspace as `api-contract.json`; hidden checks must remain a subset of
that visible contract. The Topogram bootstrap is local harness setup and is
reported in the run manifest; Topogram modeling cost performed by the agent
counts toward the Topogram arm so the result can be unfavorable or inconclusive
without being hidden.

The harness also supports a separate seeded-model mode:
`--seed-topogram-model full`. In that mode, the Topogram arm starts from a
frozen valid clinic-ops model in
`experiments/slice-benefit-clinic-ops/topogram/clinic-ops-full-model.tg`, while
the vibe arm remains unchanged. Seeded runs answer a narrower question: whether
an existing Topogram model helps implementation and feature evolution. The
seeded model footprint is reported separately as prepaid setup and is not
included in API token totals.

The primary real-world comparison mode is progressive parity:
`--seed-topogram-model base --topogram-scaffold node-http-api
--progressive-seed base-app`. In this mode both arms start from equivalent
working base API behavior before provider tokens are measured. The Topogram arm
also receives the frozen base model and a generated vanilla `node:http` scaffold
from endpoint contracts; the vibe arm receives a handwritten base `server.mjs`
with the same public behavior and no Topogram records. Measured work starts at
wave 1. Wave 1 uses the scaffold as a blocking generated structure. After wave
1 passes, the app is treated as maintained implementation: later waves still
use Topogram to update the model, validate it, read implementation-prep
contracts, and run proof, but stale scaffold markers are advisory rather than a
blocker. The vibe arm evolves its base app directly from the feature brief.

Seeded-model runs intentionally use a leaner Topogram tool surface. The
Topogram arm should run one CLI-native implementation prep packet at wave start.
Wave 1 uses `--mode implementation`; later progressive parity waves use
`--mode maintained-app-edit`:
`topogram query implementation-prep ./topo --mode <mode> --task <current-feature-task> --detail compact --include-file server.mjs --include-file seed-fixture.json --include-file package.json --json`.
That packet returns one state, one active workflow bucket, a `workflow_step`,
allowed and blocked actions, and exact next commands. The public CLI packet owns
the state machine; experiment prompts provide product/task context and tell the
agent to follow `workflow_step`. The harness still collects context-savings
estimates for reporting, but the seeded agent is not asked to spend model
iterations on broad context reports unless the packet links them as drill-down
queries.

For compact packets, the harness sends the packet's `agent_payload` back to the
model and stores the full JSON separately in `tool-results/`. This keeps the
conversation focused on the current workflow step while preserving the complete
evidence packet for audit and debugging.

For the Topogram arm, model validity is a harness-enforced boundary. The agent
uses `implementation-prep` as the first workflow packet. It may call
`modeling-guide`, `repair-model`, or `slice` only when the CLI packet asks for
drill-down context. After any `topo/**` edit the harness blocks app code writes
and app checks until the packet/check flow reports an implementation-ready state
again. A wave that finishes with an invalid or unlinked Topogram workflow state
receives an explicit failure state in its wave result. Scaffold-stale states are
blocking only while the app is still scaffold-owned; in maintained-app-edit mode
they remain visible as advisory drift.
The packet also guards against weak task links: linking a wave task to unrelated
base capabilities is not enough if linked endpoint contracts and task `affects`
records do not cover the feature terms named by the task. Verification refs are
reported as proof targets, not feature coverage.

The node HTTP scaffold now provides seed-backed GET responses for simple read
endpoints when the model or `seed-fixture.json` supplies matching records. It
still leaves create/update/delete and domain-specific business behavior as
agent-owned TODO regions, and the scaffold manifest reports seed-backed read
counts separately from TODO counts.

## Commands

Validate the frozen experiment inputs without calling an API:

```bash
npm run experiment:slice-benefit:dry-run -- --json
```

Run a deterministic mocked harness check:

```bash
npm run experiment:slice-benefit:run -- --provider mock --arms topogram --trials 1 --out-dir ./.tmp/slice-benefit-demo --json
npm run experiment:slice-benefit:report -- --run-dir ./.tmp/slice-benefit-demo/mock-run --json
```

Run a deterministic seeded-model harness check:

```bash
npm run experiment:slice-benefit:run -- --provider mock --arms both --seed-topogram-model full --trials 1 --out-dir ./.tmp/slice-benefit-seeded-demo --json
npm run experiment:slice-benefit:report -- --run-dir ./.tmp/slice-benefit-seeded-demo/mock-run --json
```

Run a deterministic progressive parity harness check:

```bash
npm run experiment:slice-benefit:run -- --provider mock --arms both --seed-topogram-model base --topogram-scaffold node-http-api --progressive-seed base-app --trials 1 --out-dir ./.tmp/slice-benefit-progressive-parity-demo --json
npm run experiment:slice-benefit:report -- --run-dir ./.tmp/slice-benefit-progressive-parity-demo/mock-run --json
```

Run a Topogram-only real API stabilization pass manually:

```bash
cp .env.example .env.local
# Edit .env.local and set OPENAI_API_KEY to a real OpenAI Platform API key.
npm run experiment:slice-benefit:run -- --provider openai --arms topogram --trials 1 --json
```

Topogram-only stabilization defaults to 18 iterations per wave. Paired
comparisons keep the frozen manifest parity budget unless `--max-iterations` is
passed explicitly.

Run a seeded-model paired pass manually when testing implementation leverage
from an existing Topogram model:

```bash
npm run experiment:slice-benefit:run -- --provider openai --arms both --seed-topogram-model full --trials 3 --json
```

Run a progressive parity paired pass manually when testing scaffold leverage
with a prepaid base app:

```bash
npm run experiment:slice-benefit:run -- --provider openai --arms both --seed-topogram-model base --topogram-scaffold node-http-api --progressive-seed base-app --trials 3 --json
```

Topogram-only runs are stabilization evidence, not comparative evidence. Run the
paired comparison only after the Topogram arm can complete all waves with a
valid model and hidden checks passing:

```bash
npm run experiment:slice-benefit:run -- --provider openai --arms both --trials 3 --json
```

Real runs are not part of fast CI. The harness writes run manifests, frozen input
copies, usage logs, wave results, and Markdown/JSON reports under `.tmp/` by
default. The harness loads ignored local secrets from `.env.local` by default,
or from a relative file passed with `--env-file <path>`. Existing process
environment values win over env-file values, and secret values are never written
to manifests, usage logs, reports, or prompts. OpenAI runs preflight the
selected model and tool schema before the paired trials start; pass
`--skip-preflight` only when intentionally bypassing that guard. Transient
provider failures are retried for 408, 409, 429, and 5xx
responses; retry attempts are written to the usage log with provider request IDs
and sanitized request-shape summaries when available. Tune retry behavior with
`TOPOGRAM_OPENAI_MAX_RETRIES`, `TOPOGRAM_OPENAI_RETRY_BASE_MS`, and
`TOPOGRAM_OPENAI_RETRY_MAX_MS`. The default real-run output budget is 12000
tokens; set `TOPOGRAM_EXPERIMENT_MAX_OUTPUT_TOKENS` to a larger value when a
model repeatedly truncates file edits.

The real-provider harness uses the Responses function-calling item-list pattern:
each tool turn passes prior `response.output` items plus matching
`function_call_output` items as the next `input`. It sets
`TOPOGRAM_OPENAI_STORE=false` behavior by default and requests
`reasoning.encrypted_content` so reasoning-model state can be carried through
stateless turns. Set `TOPOGRAM_OPENAI_STORE=true` only when you explicitly want
provider-side response storage in addition to local item-list continuation.

If the provider exhausts the retry budget for one wave, the harness records a
wave-level `provider_error`, evaluates the partial workspace state, and
continues. Published reports should treat those provider failures as caveats and
should not silently omit them.

## Evidence

The frozen experiment lives in `experiments/slice-benefit-clinic-ops/` and
includes:

- product brief and stack constraints
- canonical seed fixture in `seed-fixture.json`
- public API acceptance contract in `evaluator/public-api-contract.json`
- shared, Topogram-arm, and vibe-arm prompts
- base app plus three feature waves
- evaluator rubric and predeclared hidden route checks
- manifest with paired trials, metrics, and fairness controls

Both arms receive `seed-fixture.json`. The Topogram arm must convert it into
Topogram `seed_data` records, while the vibe arm implements the same records
directly in local code or local JSON fixtures. Hidden checks assert representative
fixture ids so a passing app cannot satisfy the route shape while ignoring the
shared data.

In seeded-model mode, those `seed_data` records are already present in the
frozen Topogram model. The Topogram arm should consume and verify that model,
not spend experiment iterations recreating it.

Each workspace also receives a local copy of `seed-fixture.json` at its root so
both arms can read the same canonical fixture without relying on prompt memory.

The report shows exact API usage fields when the real provider returns them. It
also separates full Topogram cost from post-model amortized feature cost and
keeps approximate `context-savings` estimates separate from API token usage.
Reports include per-wave token/pass-rate breakdowns and tool-usage summaries so
readers can distinguish base-app success, later-wave regressions, Topogram
context use, and provider/output-limit failures.

## Caveats

Mock provider runs prove the harness, not Topogram's product value. Publishable
claims require real API runs plus blind human review receipts for UX,
maintainability, traceability, and code clarity.
