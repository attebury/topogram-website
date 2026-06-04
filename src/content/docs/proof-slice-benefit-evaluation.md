---
title: "Slice Benefit Evaluation"
description: "Repeatable suite-based proofs for comparing Topogram slice-guided agent work with unguided app coding."
---

# Slice Benefit Evaluation

> Repeatable suite-based proofs for comparing Topogram slice-guided agent work with unguided app coding.

Status: current
Audience: maintainers and evaluators testing whether Topogram slices improve agent work
Use when: you want a repeatable comparison between Topogram-guided and unguided app coding.

This is an advanced evaluation path, not the first evaluator step. Start with
[First 30 Minutes](/start/first-30-minutes/) to inspect the local CLI and
[Beta Demo Path](/start/beta-demo-path/) to choose a runnable proof repo.
Use this evaluation when you want to measure agent efficiency and API behavior
under controlled conditions. It is one scenario in the
[Evaluation Matrix](/maintainers/evaluation-matrix/), not the whole
Topogram evaluation product.

The slice benefit evaluation compares two agent arms on the same app within a
selected evaluation suite. `slice-benefit-clinic-ops` remains the default suite;
`slice-benefit-support-queue` is a sibling non-clinic suite used to check
whether a normalized web scaffold contract plus the Node HTTP fullstack
renderer transfers across operational domains when product vocabulary comes
from explicit contracts and seed data. The clinic suite also includes
package-owned SvelteKit, React Router, and Hono API scaffold-generator lanes
that prove alternate toolkit packages can consume surface scaffold obligations
during deterministic setup.

- `topogram`: the workspace is initialized through the public
  `topogram init --adopt-sdlc` path, receives deterministic evaluation overlays
  for the actor, aggregate requirement, acceptance criterion, and per-feature
  implementation tasks, the agent models the product in `topo/`, uses focused
  mode-specific slices from the current feature task, then implements the app.
- `vibe`: the agent works directly from the same product brief and feature waves
  without Topogram records or slices.

Both arms use the same model, temperature, stack constraints, feature waves,
canonical seed fixture, public API acceptance contract, iteration budget,
workspace isolation, and evaluator checks. For each wave, the harness writes
`api-contract.json`, `product-ui-contract.json`,
`maintainability-contract.json`, and `seed-fixture.json` scoped
to the current and prior waves; hidden checks must remain a subset of the
visible API contract. The
Topogram bootstrap is local harness setup and is
reported in the run manifest; Topogram modeling cost performed by the agent
counts toward the Topogram arm so the result can be unfavorable or inconclusive
without being hidden.

Run artifacts include an `evaluation_context` that states the supported claim,
scenario, evaluator profile, evaluators run, run class, score dimensions, and
dimensions not scored. Scenario setup and scoring are separate: `--scenario`
selects the app/model setup, while `--evaluator-profile` selects what is
measured. Current profiles are `api_only`, `ui_static`, `full_product_static`,
`full_product_browser_static`, `full_product_agent_review`, and
`full_product_assistive_review`.

Scaffold-assisted runs also report the scaffold contract evidence layer
separately from renderer output. `run-manifest.json`, `report.json`,
`report.md`, and sanitized provider packets include
`scaffold_obligation_summary`, `route_obligation_summary`,
`endpoint_obligation_summary`, `data_action_obligation_summary`,
`endpoint_realization_summary`, `generator_realization_summary`, and
`coverage_gap_summary`. These are derived report views over
`surface_scaffold_contracts` and `surface_scaffold_obligations`; they are not a
second scaffold contract.

`api_only` scores API contract quality and trace efficiency without implying
dashboard, UX, or maintainability parity. `ui_static` scores deterministic
`product_api_quality`, `product_ui_quality`, `ux_completeness_static`,
`maintainability_static`, and trace efficiency. `full_product_static` is the
current broad static profile; it adds deterministic
`semantic_ui_structure_static` and `accessibility_usability` evidence over
landmarks, headings, sections, actions, role variants, labeled controls, page
metadata, and route evidence. That score is structure evidence, not visual
design judgment.
`full_product_browser_static` adds browser-render checks, portable screenshots,
and browser DOM accessibility evidence. It declares an optional
`browser_provider` runtime requirement; V1 supports Playwright with Chromium as
evaluation-harness tooling, not as a Topogram core dependency.
`full_product_agent_review` keeps the browser-backed evidence and requires
cited agent review receipts for visual UI, UX, accessibility, and
maintainability. Missing required agent receipts are `pending_review`; they
are not converted to zero scores. Human visual review remains optional
supplemental calibration. `full_product_assistive_review` builds on the
agent-review profile and also requires a manual assistive-technology smoke
review over live routes, keyboard traversal, focus, landmarks, names/roles,
role variants, and announced task state. It is review evidence, not a formal
WCAG audit.

Product API quality combines final public/hidden pass rate with public endpoint
coverage. Product UI quality checks local `GET /` responses for dashboard HTML,
suite-specific copy, role visibility, semantic structure, and forbidden
placeholder/filler strings. UX completeness uses a static source heuristic for
domain language, visible actions, empty/active-state copy, role-aware
affordances, and non-placeholder copy. In fullstack UI scenarios, visible
actions, state copy, and role affordances come from the active wave-scoped
`product-ui-contract.json` `uxEvidence` fields rather than prompt prose. Static
structure/accessibility quality uses deterministic source and route evidence
for semantic layout, headings, landmarks, labeled controls, page metadata, and
role visibility. Browser profiles also record rendered-style diagnostics such
as author style presence, tap target size, section grouping, overflow, and
default-browser-style signals. Screenshot evidence proves capture completeness;
it does not score visual design without a human or vision-review receipt.
Static maintainability uses bounded code-shape heuristics such as placeholder
absence, file size, helper structure, route clarity, module boundaries, large
function size, ownership markers, and embedded plan/config volume. Those checks
are backed by the visible `maintainability-contract.json`, which both arms
receive in the workspace. Topogram packets may surface the contract as
stack-neutral `maintainability_targets`, but detailed stack-specific module
boundaries remain the responsibility of the selected scaffold renderer or
implementer.

After an eligible browser-backed run, all supportable review packets are
generated automatically under `reviews/<kind>/`. The selected evaluator profile
still decides whether each packet is required or optional: browser-static runs
create optional visual, agent visual UI, agent UX, agent accessibility, agent
maintainability, and assistive-technology packets as pending evidence.
`full_product_agent_review` requires the four agent packets and keeps human
visual and manual AT optional. `full_product_assistive_review` requires the
four agent packets plus manual AT. Use `review-packet --write` only
to regenerate or backfill a packet, then ingest filled receipts:

```bash
topogram trace review-packet <run-dir> --kind visual --write --json
topogram trace review-packet <run-dir> --kind agent_visual_ui --write --json
topogram trace review-packet <run-dir> --kind agent_ux --write --json
topogram trace review-packet <run-dir> --kind agent_accessibility --write --json
topogram trace review-packet <run-dir> --kind agent_maintainability --write --json
topogram trace review-packet <run-dir> --kind assistive_technology --write --json
topogram trace review-ingest <run-dir> --receipt <receipt.json> --json
topogram trace review-receipts <run-dir> list --json
topogram trace review-receipts <run-dir> void --receipt-id <reviews/receipts/...json> --reason "<reason>" --write --json
```

`trace review-packet --write` writes `reviews/<kind>/review.html` for human
visual and assistive-technology review. Agent visual UI, UX, accessibility, and
maintainability write `reviews/<kind>/packet.md` and `receipt-template.json`
for a reviewer agent. Open generated static local forms for guided blind
visual/AT review, or hand the agent packets to a reviewer agent. Then download,
copy, or write the receipt JSON and ingest it. Forms do not write reports; only
`review-ingest` validates receipts and regenerates `report.json`, `report.md`,
`trace-analysis.json`, and `trace-report.md`. Editing `receipt-template.json`
directly still works as a fallback. The visual form pairs matching screenshots
by wave, role, and viewport; agent review packets require cited findings; and
assistive-technology uses a checklist-first layout with live replay previews.
The form is only a local worksheet: it keeps a browser-local draft, validates
missing scores, shows the score scale, and asks for confirmation before export.
Use `3 Acceptable` when the evidence is adequate but not strong; `1 Poor` and
`2 Weak` mean meaningful problems. It does not update `report.json`,
`report.md`, `trace-analysis.json`, or `trace-report.md`. Run `trace
review-ingest` with the downloaded receipt to validate it, store it under
`reviews/receipts/`, and regenerate those report and trace artifacts.

If a receipt is provisional or wrong, do not edit report files by hand. Use
`trace review-receipts list` to copy its run-relative receipt id, then
`review-receipts void --write` with a short reason. Voiding keeps the original
receipt file and audit entry, excludes it from scoring, and regenerates the
report and trace.

Visual review packets include screenshots and browser summaries under
`reviews/visual/subjects/subject-*`. Agent visual UI, UX, and accessibility
packets include screenshots, product UI contracts, browser summaries,
accessibility summaries, wave summaries, trace smells, and role variants.
Agent maintainability packets include portable code, code facts, wave summaries,
the maintainability contract, and proof/debug artifacts under
`reviews/agent_maintainability/subjects/subject-*`. The
assistive-technology packet adds browser/accessibility evidence plus live
replay commands for `/`, `/?role=staff`, and `/?role=manager`. In
scaffold-assisted Node runs, both packets reference the renderer manifest and
manifest-listed generated modules such as `views/<screen-id>.mjs`; legacy
`dashboard-view.mjs` is only compatibility evidence when present. Reviewers may
use VoiceOver, NVDA, JAWS, or another assistive technology. The subject key is
stored separately in `reviews/review-key.json`.

Run ids should describe the scenario, evaluator profile, and run class, not
just an opaque pilot number. The harness auto-generates ids such as
`greenfield-model-first-handcoded-api-api-only-stabilization-001`,
`greenfield-scaffold-assisted-api-full-product-static-stabilization-001`, or
`progressive-scaffold-to-maintained-api-ui-static-paired-001` when `--run-id`
is omitted. If you provide `--run-id`, use the same
`<scenario-id>-<evaluator-profile>-<run-class>-<nnn>` convention. Canonical run
artifacts reject `pilot-*` names because they make later comparison and
publication review ambiguous.

The harness is suite- and scenario-driven. Normal runs choose one suite with
`--suite <id>` and one named scenario with `--scenario <id>`; the suite defaults
to `slice-benefit-clinic-ops` for existing commands. Scenario records define
model seed, app start, generator, scaffolder, implementer, ownership transition,
and measured waves. The normal run interface does not expose one-off
matrix-construction flags.
Use `--evaluator-profile <id>` when you want to narrow or broaden the scoring
lane without changing scenario setup.

The API-focused greenfield hand-coded scenario is
`greenfield_model_first_handcoded_api`: Topogram must model the current wave and
then implement API behavior directly from `work next` operation packets. It
defaults to `api_only` scoring so a successful run does not imply product UI
parity.

The fullstack/static-UI greenfield scenario is
`greenfield_model_first_handcoded_fullstack_static_ui`: it keeps the same
model-first, no-scaffold setup, but passes the product UI contract into
`work next`. The packet emits stack-neutral `experience_targets` alongside
`operation_targets`, and the selected implementer may turn those targets into
dashboard edits. This scenario defaults to `ui_static` scoring.

The scaffold-assisted greenfield scenario is `greenfield_scaffold_assisted_api`:
scaffold generation is explicit and counted separately.

The scaffold-assisted fullstack/static-UI scenario is
`greenfield_scaffold_assisted_fullstack_static_ui`: it also starts without a
seeded model, but the Topogram arm may derive a `web-scaffold-contract` and
have the Node HTTP renderer consume it with active `product-ui-contract.json`
workboard hints and current-wave `seed-fixture.json` data. Use this lane when
the claim is `scaffold_assisted_node_http_fullstack_ui`: browser-rendered
dashboard structure, role variants, fixture-backed UX copy, static
accessibility evidence, contract hash/currentness, and renderer manifest
evidence for this stack-specific path. Do not use it alone to claim all-stack
UI efficiency.

The package-owned scaffold-generator scenarios are
`seeded_model_scaffold_generator_sveltekit_static_ui`,
`seeded_model_scaffold_generator_react_router_static_ui`, and
`seeded_model_scaffold_generator_hono_api`. They start from a seeded model,
install the in-repo proof generator as a packed npm package, policy-pin it, run
`topogram generator check`, run `topogram generate`, and collect generated
coverage metadata. The web lanes collect
`src/lib/topogram/scaffold-generation-coverage.json` and report
framework-native route/data/action/state/operation realization evidence for
SvelteKit file routes or React Router data-route config. The Hono API lane
collects `src/topogram/scaffold-generation-coverage.json` under
`app/apps/services/app_api` and reports `api-scaffold-contract` endpoint
obligation plus Hono `createApp` endpoint realization evidence. These are
generator portability proof lanes, not a replacement for the Node renderer
scaffold-assisted scenarios.

The support-queue suite adds
`greenfield_scaffold_assisted_fullstack_static_ui_support_queue`, which uses the
same `web-scaffold-contract` input and Node HTTP renderer with support-queue
product briefs, API contracts, seed data, and `workboardHints`. This lane tests
that normalized contract obligations and the Node renderer transfer from clinic
operations to another operational domain. It does not prove all-stack transfer;
an alternate-stack suite is still required for that broader claim.

The seeded-model scenario is `seeded_model_handcoded_api`. In that mode, the
Topogram arm starts from a
frozen valid clinic-ops model in
`evaluations/slice-benefit-clinic-ops/topogram/clinic-ops-full-model.tg`, while
the vibe arm remains unchanged. Seeded runs answer a narrower question: whether
an existing Topogram model helps implementation and feature evolution. The
seeded model footprint is reported separately as prepaid setup and is not
included in API token totals.

The primary real-world comparison mode is progressive parity:
`progressive_scaffold_to_maintained_api`. In this mode both arms start from
equivalent working base API behavior before provider tokens are measured. The
Topogram arm also receives the frozen base model and a generated vanilla
`node:http` scaffold from a `web-scaffold-contract` consumed by the Node HTTP
renderer; the vibe arm receives a handwritten base `server.mjs` with the same
public behavior and no Topogram records. Measured work starts at wave 1. Wave 1
uses the scaffold as a blocking generated structure. After wave 1 passes, the
app is treated as maintained implementation: later waves still use Topogram to
update the model, validate it, read `work next` contracts, and run proof, but
stale scaffold markers are advisory rather than a blocker. Reports split
scaffold contract calls from renderer calls, and scaffold summaries distinguish
route/data/action and endpoint obligations from framework-native generator
realization evidence. The Node HTTP renderer is contract consumption evidence;
it is not reported as SvelteKit/React-style loader/action realization or Hono
endpoint realization unless explicit realization rows exist. The vibe arm
evolves its base app directly from the feature brief.

Seeded-model runs intentionally use a leaner Topogram tool surface. The
Topogram arm should run one CLI-native `work next` packet at wave start.
Wave 1 uses `--mode implementation`; later progressive parity waves use
`--mode maintained-app-edit`:
`topogram work next ./topo --mode <mode> --task <current-feature-task> --json`.
That packet returns one state, one `do_now`, allowed and blocked actions,
stack-neutral operation targets, optional implementer actions,
endpoint/seed/proof contracts, and a checkpoint summary. The public CLI packet owns
the state machine; evaluation prompts provide product/task context and tell the
agent to follow `agent_packet`. The harness still collects context-savings
estimates for reporting, but the seeded agent is not asked to spend model
iterations on broad context reports unless the packet links them as drill-down
queries.

For compact packets, the harness sends the packet's `agent_packet` back to the
model and stores the full JSON under the wave-local `trials/<trial>/<arm>/<wave>/`
evidence folder. This keeps the conversation focused on the current workflow
step while preserving the complete evidence packet for audit and debugging.
The harness passes `--implementer node-http-maintained` and an explicit
`--app-state` from the scenario record. The base greenfield placeholder can be
treated as `minimal_placeholder`; later waves are `maintained`, so whole-file
replacement is no longer a high-confidence action just because `server.mjs` is
small.

For the Topogram arm, model validity is a harness-enforced boundary. The agent
uses feature-linked SDLC tasks and `work next` as the first workflow packet.
The feature record names the current wave's endpoint, seed, and verification
scope; the task records the work state. The agent may call
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

Validate the frozen evaluation inputs without calling an API:

```bash
npm run evaluation:slice-benefit:dry-run -- --json
npm run evaluation:slice-benefit:run -- --list-scenarios --json
npm run evaluation:slice-benefit:run -- --list-scenarios --suite slice-benefit-support-queue --json
```

Run a deterministic mocked harness check:

```bash
npm run evaluation:slice-benefit:run -- --provider mock --scenario greenfield_model_first_handcoded_api --evaluator-profile api_only --arms topogram --trials 1 --out-dir ./.tmp/evaluation-runs/slice-benefit-clinic-ops/demo --json
npm run evaluation:slice-benefit:report -- --run-dir ./.tmp/evaluation-runs/slice-benefit-clinic-ops/demo/greenfield-model-first-handcoded-api-api-only-stabilization-001 --json
```

Run a deterministic seeded-model harness check:

```bash
npm run evaluation:slice-benefit:run -- --provider mock --scenario seeded_model_handcoded_api --evaluator-profile ui_static --arms both --trials 1 --out-dir ./.tmp/evaluation-runs/slice-benefit-clinic-ops/seeded-demo --json
npm run evaluation:slice-benefit:report -- --run-dir ./.tmp/evaluation-runs/slice-benefit-clinic-ops/seeded-demo/seeded-model-handcoded-api-ui-static-paired-001 --json
```

Run a deterministic progressive parity harness check:

```bash
npm run evaluation:slice-benefit:run -- --provider mock --scenario progressive_scaffold_to_maintained_api --evaluator-profile full_product_static --arms both --trials 1 --out-dir ./.tmp/evaluation-runs/slice-benefit-clinic-ops/progressive-parity-demo --json
npm run evaluation:slice-benefit:report -- --run-dir ./.tmp/evaluation-runs/slice-benefit-clinic-ops/progressive-parity-demo/progressive-scaffold-to-maintained-api-full-product-static-paired-001 --json
```

Run the browser-evidence lane when optional browser evaluator tooling is
installed. Use `dry-run --json` or `--list-scenarios --json` to inspect the
selected profile's `runtime_requirements`; V1 uses Playwright with Chromium:

```bash
npm run evaluation:slice-benefit:run -- --scenario greenfield_model_first_handcoded_fullstack_static_ui --evaluator-profile full_product_browser_static --arms both --trials 1 --out-dir /Volumes/Topogram/evaluation-runs --run-id greenfield-model-first-handcoded-fullstack-static-ui-full-product-browser-static-paired-001 --json
```

Run the non-clinic scaffold transfer lane with the support-queue suite:

```bash
npm run evaluation:slice-benefit:run -- --provider mock --suite slice-benefit-support-queue --scenario greenfield_scaffold_assisted_fullstack_static_ui_support_queue --evaluator-profile full_product_browser_static --arms both --trials 1 --out-dir ./.tmp/evaluation-runs/support-queue-check --run-id greenfield-scaffold-assisted-fullstack-static-ui-support-queue-full-product-browser-static-paired-999 --json
npm run evaluation:slice-benefit:run -- --suite slice-benefit-support-queue --scenario greenfield_scaffold_assisted_fullstack_static_ui_support_queue --evaluator-profile full_product_browser_static --arms both --trials 1 --out-dir /Volumes/Topogram/evaluation-runs --run-id greenfield-scaffold-assisted-fullstack-static-ui-support-queue-full-product-browser-static-paired-001 --env-file .env.local --json
```

Run a Topogram-only real API stabilization pass manually:

```bash
cp .env.example .env.local
# Edit .env.local and set OPENAI_API_KEY to a real OpenAI Platform API key.
npm run evaluation:slice-benefit:run -- --provider openai --arms topogram --trials 1 --out-dir /Volumes/Topogram/evaluation-runs --json
```

Topogram-only stabilization defaults to 18 iterations per wave. Paired
comparisons keep the frozen manifest parity budget unless `--max-iterations` is
passed explicitly.

Run a seeded-model paired pass manually when testing implementation leverage
from an existing Topogram model:

```bash
npm run evaluation:slice-benefit:run -- --provider openai --scenario seeded_model_handcoded_api --evaluator-profile ui_static --arms both --trials 3 --out-dir /Volumes/Topogram/evaluation-runs --json
```

Run a progressive parity paired pass manually when testing scaffold leverage
with a prepaid base app:

```bash
npm run evaluation:slice-benefit:run -- --provider openai --scenario progressive_scaffold_to_maintained_api --evaluator-profile full_product_static --arms both --trials 3 --out-dir /Volumes/Topogram/evaluation-runs --json
```

Topogram-only runs are stabilization evidence, not comparative evidence. Run the
paired comparison only after the Topogram arm can complete all waves with a
valid model and hidden checks passing:

```bash
npm run evaluation:slice-benefit:run -- --provider openai --scenario greenfield_model_first_handcoded_api --evaluator-profile full_product_static --arms both --trials 3 --out-dir /Volumes/Topogram/evaluation-runs --json
```

Real runs are not part of fast CI. The harness writes run manifests, frozen input
copies, usage logs, wave results, Markdown/JSON reports, trace analysis, and a
publication draft under `.tmp/` by
default. The harness loads ignored local secrets from `.env.local` by default,
or from a relative file passed with `--env-file <path>`. Default `.env` /
`.env.local` loading does not override existing process environment values, but
an explicit `--env-file <path>` is treated as the selected run secret source and
can override a stale exported placeholder. Secret values are never written
to manifests, usage logs, reports, or prompts. OpenAI runs use sanitized
provider input by default: each wave writes `provider-input.json`,
`provider-redaction-report.json`, and a run-level
`provider-input-policy.json` before any model call. The packet is derived from
public evaluation contracts, scoped seed data, stack constraints,
`surface_scaffold_contracts`, and `surface_scaffold_obligations`; raw workspace
files, hidden checks, and generated source are not exported. OpenAI runs preflight the selected model and tool
schema before the paired trials start. Provider packet preparation also applies
the prompt-boundary scanner and rejects high-confidence prompt-injection errors
before any external model call. Provider redaction reports also include
`provider_inventory_trust`, proving the packet path is covered by the
agent-facing inventory entry for `provider_input` with JSON `content_trust`,
packet scanning, and focused tests. Pass `--skip-preflight` only when
intentionally bypassing that guard. Transient provider failures are retried for
408, 409, 429, and 5xx responses; retry attempts are written to the usage log
with provider request IDs, provider input refs/hashes, and sanitized
request-shape summaries when available. Tune retry behavior with
`TOPOGRAM_OPENAI_MAX_RETRIES`, `TOPOGRAM_OPENAI_RETRY_BASE_MS`, and
`TOPOGRAM_OPENAI_RETRY_MAX_MS`. The default real-run output budget is 12000
tokens; set `TOPOGRAM_EVALUATION_MAX_OUTPUT_TOKENS` to a larger value when a
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

Evaluation suites live under `evaluations/`. The clinic suite lives in
`evaluations/slice-benefit-clinic-ops/`; the non-clinic support transfer suite
lives in `evaluations/slice-benefit-support-queue/`. Each suite includes:

- product brief and stack constraints
- canonical seed fixture in `seed-fixture.json`
- public API acceptance contract in `evaluators/public-api-contract.json`
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
not spend evaluation iterations recreating it.

Each workspace also receives a local wave-scoped copy of `seed-fixture.json` at
its root so both arms can read the same canonical fixture subset without relying
on prompt memory or future-wave data.

The report shows exact API usage fields when the real provider returns them. It
also separates full Topogram cost, measured work cost, explicit agent-modeling
cost, and seeded-model footprint, and keeps approximate `context-savings`
estimates separate from API token usage.
Reports include per-wave token/pass-rate breakdowns and tool-usage summaries so
readers can distinguish base-app success, later-wave regressions, Topogram
context use, and provider/output-limit failures.

Each run also writes `trace-analysis.json`, `trace-report.md`, and
`posts/evaluation-lessons/<run-id>.md`. Trace analysis compares expected
Topogram workflow with observed tool calls, token accounting, proof outcomes,
and attention smells such as repeated packet states, large packet-to-actual
token deltas, skipped proof, or scaffold work that was expected but not run.
The report writer also emits a reference expected-workflow audit bundle from the
Topogram arm when available, so trace can compare observed behavior against
expected workflow evidence instead of relying only on the run manifest. These
smells and scores are product feedback signals, not pass/fail gates.

To analyze a run explicitly:

```bash
topogram trace analyze ./.tmp/evaluation-runs/slice-benefit-clinic-ops/demo/greenfield-model-first-handcoded-api-api-only-stabilization-001 --json
topogram trace report ./.tmp/evaluation-runs/slice-benefit-clinic-ops/demo/greenfield-model-first-handcoded-api-api-only-stabilization-001 --format markdown
```

## Caveats

Mock provider runs prove the harness, not Topogram's product value. Publishable
claims require real API runs plus blind human review receipts for UX,
maintainability, traceability, and code clarity.
