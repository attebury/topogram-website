---
title: "Topogram Evaluation Matrix"
description: "A shared vocabulary for traceable Topogram evaluation work."
---

# Topogram Evaluation Matrix

> A shared vocabulary for traceable Topogram evaluation work.

Status: current
Audience: maintainers designing proof runs, trace analysis, and publishable evaluation material
Use when: you need to classify what a run proves, what it does not prove, and which scenario should run next.

## Vocabulary

- `trace`: evidence from one agent or human work run.
- `run`: one execution of a traceable workflow.
- `trial`: one repeated run under the same condition.
- `arm`: one compared work style, such as Topogram-guided or unguided.
- `scenario`: the product/work situation being tested.
- `evaluator`: one deterministic scoring module, such as API contract, static
  UI, static UX, maintainability, or trace efficiency.
- `evaluator_profile`: a named bundle of evaluators that defines what a run
  scores and what it explicitly leaves unscored.
- `evaluation_suite`: a set of related scenarios and fixtures.
- `experiment`: a controlled comparison across arms or trials.
- `benchmark`: a stable, repeated, externally credible evaluation suite.
- `generator`: generated-owned stack realization from Topogram contracts.
- `scaffolder`: starter or partial stack output with TODO/preserved regions.
- `implementer`: stack-specific edit actions for maintained code or maintained
  regions.
- `evaluation_harness`: scenario config, prompts, tools, setup, provider loop,
  checks, artifacts, reports, and trace output.

## Initial Matrix

| Scenario | Topogram mode | Primary question |
| --- | --- | --- |
| `greenfield_generated_owned` | generated-owned | Can a model generate and verify a working app without maintained edits? |
| `greenfield_model_first_handcoded` | model-first-handcoded | Can an agent create a valid Topogram model and hand-code the app from operation packets without scaffold help? |
| `greenfield_scaffold_assisted` | scaffolded | Can an agent create a valid model, use generated scaffold leverage, and fill remaining behavior? |
| `seeded_model_handcoded` | seeded-model-handcoded | Does an existing model help direct hand-coded implementation and feature evolution? |
| `seeded_model_scaffold_assisted` | scaffolded | Does an existing model plus generated scaffold reduce implementation effort? |
| `progressive_scaffold_to_maintained` | scaffolded-maintained | Does scaffold leverage reduce long-lived feature cost after the app becomes maintained? |
| `brownfield_adoption` | model-after-extract | Can Topogram pay off after onboarding an existing app? |
| `bugfix_regression` | maintained | Does Topogram reduce search and repair cost? |
| `ux_product_workflow` | semantic-ui | Does Topogram improve real user-facing app quality? |
| `multi_surface` | multi-runtime | Does the model keep web, API, database, mobile, or CLI surfaces consistent? |
| `audit_only` | trace-only | Does Topogram help humans or agents understand a repo faster? |
| `generated_owned_evolution` | generated-owned | Can teams evolve generated-owned apps without maintained-code drift? |

## Current Clinic-Ops Suite

`slice-benefit-clinic-ops` is one evaluation suite. Its scenarios now separate
modeling, scaffold leverage, and maintained-code evolution:

- `greenfield_model_first_handcoded_api`: no seeded model, no scaffold, and no
  progressive base app. The agent must model first, then hand-code API behavior
  from Topogram work packets. Its default profile is `api_only`; product UI is
  an explicit evidence gap unless a UI profile is selected for diagnostics.
- `greenfield_model_first_handcoded_fullstack_static_ui`: the same greenfield
  model-first setup, but `work next` also receives dashboard
  `experience_targets` from the product UI contract. Those targets include
  required copy plus explicit UX evidence for visible actions, state copy, and
  role affordances. Its default profile is `ui_static`.
- `greenfield_scaffold_assisted_api`: no seeded model, but Topogram may emit a
  `web-scaffold-contract` from the agent-authored endpoint model and have the
  Node HTTP API renderer consume it.
- `greenfield_scaffold_assisted_fullstack_static_ui`: no seeded model, but
  Topogram may emit a `web-scaffold-contract` that the Node HTTP fullstack
  renderer consumes with active UI workboard hints and current-wave seed fixture
  data. This lane measures `scaffold_assisted_node_http_fullstack_ui` leverage,
  including contract hash/currentness, normalized route/data/action/state
  obligation evidence, and renderer manifest evidence, not general all-stack UI
  efficiency.
- `seeded_model_scaffold_generator_sveltekit_static_ui`: a seeded Topogram
  model plus package-owned SvelteKit scaffold generator proves that
  `web-scaffold-contract` route/data/action/state/operation obligations can be
  consumed through a toolkit generator package and reported as generated
  framework realization evidence.
- `seeded_model_scaffold_generator_react_router_static_ui`: the same seeded
  model and scaffold contract are consumed by a package-owned React Router/Vite
  generator, proving the route/data/action obligations are not SvelteKit file
  layout policy hidden in Topogram core.
- `seeded_model_scaffold_generator_hono_api`: the same seeded model drives a
  package-owned Hono API generator from `api-scaffold-contract`, proving
  endpoint obligations and Hono `createApp` endpoint realizations can be
  reported through the same surface scaffold evidence layer.
- `seeded_model_handcoded_api`: a prepaid full Topogram model exists, but app
  implementation is direct maintained-code work.
- `seeded_model_scaffold_assisted_api`: a prepaid full model exists and
  scaffold generation is allowed.
- `progressive_scaffold_to_maintained_api`: both arms start from equivalent
  base API behavior, Topogram receives a base model plus API scaffold, and
  measured work starts at feature wave 1.

Scenario records define these axes: `model_seed`, `app_start`, `generator`,
`scaffolder`, `scaffold_contract`, `scaffold_renderer`,
`generated_view_convention`, `implementer`, optional `experience_targets`,
`ownership_transition`, and optional `measured_waves`. Runs also report
`surface_scaffold_contracts` and `surface_scaffold_obligations`; the latter
summarizes screen route obligations, API endpoint obligations,
`screen_loaders`, `form_actions`, `mutations`, `state_obligations`,
`operation_bindings`, generator realization rows, and unresolved coverage gaps.
Keep `scaffolder` for compatibility, but prefer the contract/renderer/obligation
axes when interpreting new scaffold-assisted evidence. Use `--scenario <id>` to
select a scenario. Do not rebuild the matrix at the command line with one-off
model/scaffold/progressive flags; those choices belong in reviewed scenario
records.

Evaluator profiles define scoring independently from scenario setup:

- `api_only`: API contract quality plus trace efficiency. UI, UX, and
  maintainability dimensions are evidence gaps, not failures.
- `ui_static`: API contract, product UI static checks, static UX completeness,
  static maintainability, and trace efficiency.
- `full_product_static`: broad deterministic static profile. It adds semantic
  UI structure and accessibility/usability evidence checks over semantic layout,
  hierarchy, landmarks, labeled controls, page metadata, and role visibility.
  Agent product review, human visual calibration, and assistive-technology
  testing remain explicit evidence gaps.
- `full_product_browser_static`: browser-backed product profile. It adds
  real route rendering, desktop/mobile screenshot capture, and browser DOM
  accessibility evidence. Agent review receipts and assistive-technology
  testing remain optional supplemental evidence gaps. This profile declares
  an optional `browser_provider` runtime requirement; V1 supports Playwright
  with Chromium as evaluator tooling, but Playwright is not a Topogram core
  dependency.
- `full_product_agent_review`: browser-backed product profile plus required
  agent visual UI, UX, accessibility, and maintainability receipts. Missing
  required agent receipts appear as `pending_review`; they are not converted to
  zero scores or deterministic pass/fail results. Human visual review remains
  optional supplemental calibration. Assistive-technology testing remains an
  explicit evidence gap.
- `full_product_assistive_review`: browser-backed product profile plus required
  agent product-review receipts and a manual assistive-technology smoke-review
  receipt. The assistive layer is manual evidence over live routes and browser
  artifacts; it is not a formal WCAG audit.

This suite can score API correctness, product API quality, product UI quality,
static UX completeness, deterministic semantic UI structure/accessibility
evidence, browser-backed screenshot/accessibility evidence, static
maintainability, token/tool efficiency, workflow friction, traceability, and
proof discipline depending on the selected `evaluator_profile`.
`product_api_quality`, `product_ui_quality`, `ux_completeness_static`,
`semantic_ui_structure_static`, `accessibility_usability`,
`browser_render_quality`, `screenshot_visual_evidence`,
`browser_accessibility_static`, and `maintainability_static` are deterministic
harness scores, not reviewer judgments. Screenshot evidence means capture
evidence exists; agent visual UI, UX, accessibility, and maintainability
receipts are the primary judgment layer. `visual_review_human` remains optional
supplemental calibration for visual design. Browser profiles also emit rendered-style diagnostics
such as author style presence, section/card grouping, tap target size, overflow,
and `default_browser_style_detected`. Trace output must distinguish "not
evaluated by this profile" from "evaluated and scored poorly."

## Support-Queue Transfer Suite

`slice-benefit-support-queue` is a sibling non-clinic suite for checking whether
the `web-scaffold-contract` plus Node HTTP renderer path is driven by semantic
inputs rather than hidden clinic assumptions. It uses the same harness and
evaluator profiles, but all product vocabulary changes to support operations:
tickets, customers, agents, SLA risk, follow-up reminders, escalations,
knowledge suggestions, attachments, audit, manager reporting, and team
performance.

Current scenario:

- `greenfield_scaffold_assisted_fullstack_static_ui_support_queue`: no seeded
  model, scaffolded app start, `web-scaffold-contract`,
  `node-http` renderer, `views/<screen-id>.mjs` generated view convention, and
  `node-http-maintained` implementer. Its default profile is `ui_static`; use
  `full_product_browser_static` when screenshots and browser evidence are
  needed.

This suite supports a fair but narrow claim:
`Topogram semantic model + surface scaffold contract + Node HTTP renderer`
transfers across at least two operational domains when domain-specific copy,
grouping, row actions, relationships, display fields, and role visibility are
supplied through `product-ui-contract.json` and `seed-fixture.json`. In this
lane the concrete surface scaffold contract is `web-scaffold-contract`; V1 also
has `api-scaffold-contract` for API surfaces, and later surface types should use
the same generic scaffold boundary. This does not prove that Topogram core alone
improves all UI work, and it does not prove alternate stack transfer. Those
require handcoded, generated-owned, brownfield, and alternate-stack lanes.

Alternate toolkit generator lanes currently live in the clinic suite as
seeded-model proof lanes. They use packed, policy-pinned proof packages and
`topogram generate`; Node renderer scenarios remain renderer-consumption
evidence, while SvelteKit, React Router, and Hono API scenarios are
framework-native generator-realization evidence.

Useful commands:

```bash
npm run evaluation:slice-benefit:run -- --list-scenarios --suite slice-benefit-support-queue --json
npm run evaluation:slice-benefit:run -- --provider mock --suite slice-benefit-support-queue --scenario greenfield_scaffold_assisted_fullstack_static_ui_support_queue --evaluator-profile full_product_browser_static --arms both --trials 1 --out-dir ./.tmp/evaluation-runs/support-queue-check --run-id greenfield-scaffold-assisted-fullstack-static-ui-support-queue-full-product-browser-static-paired-999 --json
npm run evaluation:slice-benefit:run -- --suite slice-benefit-support-queue --scenario greenfield_scaffold_assisted_fullstack_static_ui_support_queue --evaluator-profile full_product_browser_static --arms both --trials 1 --out-dir /Volumes/Topogram/evaluation-runs --run-id greenfield-scaffold-assisted-fullstack-static-ui-support-queue-full-product-browser-static-paired-001 --env-file .env.local --json
```

For `--provider openai`, the harness exports only sanitized provider packets.
Each wave writes `provider-input.json` and `provider-redaction-report.json`;
the run root writes `provider-input-policy.json`. Provider packets are derived
from public contracts, scoped seed data, stack constraints, and
`surface_scaffold_contracts`/`surface_scaffold_obligations`, not raw workspace
files or hidden checks.

Eligible browser and review profiles automatically generate local
`reviews/<kind>/` packets during run finalization. Browser-static runs get
optional human visual, agent visual UI, agent UX, agent accessibility, agent
maintainability, and assistive-technology packets. Agent-review profiles require
the four agent packets; assistive-review profiles require the four agent packets
plus manual AT. Human visual and AT forms only export receipt JSON. Agent
review kinds write Markdown packets and receipt templates for a reviewer agent.
Reports and trace update only after `review-ingest` validates a receipt.
Static UX completeness is scored from the active product UI contract when it
declares `uxEvidence`; the older global term lists are only a fallback for
legacy artifacts.

Human review receipts are generated and ingested through Topogram trace
commands:

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

Review packets mask arms as `subject-a` and `subject-b` where practical. Each
human visual and assistive packet writes `reviews/<kind>/review.html`, a static
local guided form that exports a valid receipt JSON. Agent visual UI, UX,
accessibility, and maintainability write portable packets and receipt templates
instead of HTML forms. The visual form groups screenshots by matching wave,
role, and viewport so reviewers compare equivalent moments side by side. Agent
packets ask a reviewer agent for cited findings over screenshots, contracts,
browser/accessibility summaries, code, wave summaries, and proof evidence as
appropriate; assistive-technology uses a checklist-first layout with live
replay previews.
The form is only a local worksheet: it keeps a browser-local draft, validates
missing scores, shows the score scale, and asks for confirmation before export.
Use
`3 Acceptable` when the evidence is adequate but not strong; `1 Poor` and
`2 Weak` mean meaningful problems. It does not update `report.json`,
`report.md`, `trace-analysis.json`, or `trace-report.md`. Run `trace
review-ingest` with the downloaded receipt to validate it, store it under
`reviews/receipts/`, and regenerate those report and trace artifacts. The
subject-to-arm key is
stored separately under `reviews/review-key.json`, so reports can aggregate
receipts after review without exposing arm labels in reviewer-facing artifacts.
When a receipt was submitted by mistake or is explicitly provisional, use
`trace review-receipts <run-dir> list` and `trace review-receipts <run-dir>
void --write` instead of deleting files or editing reports. Voided receipts
remain in the run artifact tree and review manifest, but are excluded from
quality scoring and trace interpretation.

Assistive-technology packets include browser summaries, accessibility
summaries, screenshots for orientation, and live replay instructions for `/`,
`/?role=staff`, and `/?role=manager`. Reviewers may use VoiceOver, NVDA, JAWS,
or another assistive technology. The receipt closes the
`assistive_technology_testing` evidence gap for the run; formal conformance
testing remains a later evidence layer.

## Run Classes

- `stabilization`: one arm is being made reliable before comparison.
- `paired_comparison`: two or more arms run the same scenario.
- `diagnostic_trace`: a run is used to inspect workflow behavior.
- `regression_check`: a run verifies that a prior improvement did not regress.
- `benchmark_candidate`: a stable paired run that could support publication
  after evidence gaps are closed.
- `benchmark_candidate_with_scope_caveats`: a stable paired run whose declared
  evaluator profile passed, while broader product dimensions remain explicitly
  out of scope for that lane.

## Evaluation Context

Run artifacts should include `evaluation_context` rather than ad hoc experiment
metadata. Required fields are `suite_id`, `scenario_id`, `evaluator_profile`,
`evaluators_run`, `claim`, `run_class`, `topogram_mode`, `score_dimensions`,
`primary_success_metric`, `secondary_metrics`, and `not_scored`.

Trace analysis uses this context to explain the matrix position, publication
readiness, and evidence gaps before token totals.

## Run IDs

Canonical run ids should be generated from the evaluation context:

```text
<scenario-id>-<evaluator-profile>-<run-class>-<nnn>
```

Use hyphenated scenario names for filesystem paths. Examples:

- `greenfield-model-first-handcoded-api-api-only-stabilization-001`
- `greenfield-scaffold-assisted-api-full-product-static-stabilization-001`
- `seeded-model-handcoded-api-ui-static-paired-001`
- `seeded-model-scaffold-assisted-api-full-product-static-paired-001`
- `progressive-scaffold-to-maintained-api-full-product-static-paired-001`
- `greenfield-model-first-handcoded-fullstack-static-ui-full-product-browser-static-paired-001`

Avoid opaque `pilot-*` names for canonical runs. They hide what was tested and
make trace reports harder to compare. The slice-benefit harness auto-generates
the next scenario-scoped id when `--run-id` is omitted.

Current profiles are `api_only`, `ui_static`, `full_product_static`,
`full_product_browser_static`, `full_product_agent_review`, and
`full_product_assistive_review`. `full_product_browser_static` adds browser
render checks, portable desktop/mobile screenshots, and browser DOM
accessibility evidence to the static product profile. Screenshot capture closes
the screenshot-evidence gap, but agent review and manual AT remain separate
proof layers. The profile advertises its optional browser tooling in
`runtime_requirements`; run `--list-scenarios --json` or `dry-run --json`
before a browser run to see the active provider and install hint.
