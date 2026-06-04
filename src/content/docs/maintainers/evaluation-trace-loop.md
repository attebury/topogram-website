---
title: "Evaluation Trace Loop"
description: "Use evaluations to improve Topogram, not only to publish favorable numbers."
---

# Evaluation Trace Loop

> Use evaluations to improve Topogram, not only to publish favorable numbers.

Status: current
Audience: maintainers running proof or product-learning evaluations
Use when: you need a repeatable evaluation → trace → improvement loop.

## Loop

```text
trace -> improve -> stabilize -> compare -> publish
```

1. Pick the smallest useful scenario from the
   [Evaluation Matrix](/maintainers/evaluation-matrix/), then choose the narrowest
   evaluator profile that matches the claim. Prefer Topogram-only stabilization
   until the Topogram arm can complete the workflow. Let the harness generate
   the run id from `evaluation_context`, or use the same
   `<scenario-id>-<evaluator-profile>-<run-class>-<nnn>` convention
   explicitly.
2. Read `report.json` for evaluation context, evaluator profile, pass rate,
   wave completion, token totals, tool counts, deterministic scores included by
   that profile, and dimensions explicitly not scored.
3. Read `trace-analysis.json` for the supported claim, matrix position,
   expected-workflow audit evidence, evidence gaps, attention smells, and
   improvement categories.
4. Convert each actionable finding into one of: CLI packet improvement,
   generator/scaffold improvement, docs/agent UX improvement, harness fix, or
   backlog-only note.
5. Run one stabilization pilot after the improvement before resuming paired
   comparison.
6. Use `posts/evaluation-lessons/<run-id>.md` as a draft, not a publish-ready
   post.

## Commands

```bash
npm run evaluation:slice-benefit:run -- --provider mock --scenario greenfield_model_first_handcoded_api --evaluator-profile api_only --arms topogram --trials 1 --json
topogram trace analyze ./.tmp/evaluation-runs/slice-benefit-clinic-ops/greenfield-model-first-handcoded-api-api-only-stabilization-001 --json
topogram trace report ./.tmp/evaluation-runs/slice-benefit-clinic-ops/greenfield-model-first-handcoded-api-api-only-stabilization-001 --format markdown
```

For focused expected-workflow evidence:

```bash
topogram emit audit-bundle ./topo --task <task-id> --profile experiment --write --out-dir ./artifacts
topogram trace analyze <run-dir> --audit-bundle ./artifacts/audit-bundle/<task-id> --json
```

Slice-benefit report generation also writes a reference expected-workflow audit bundle
from the Topogram arm when a Topogram workspace exists. Use the explicit
`--audit-bundle` form when you want to compare a run against a specific task or
workspace bundle instead of the auto-generated reference bundle.

## Interpreting Smells

Trace smells are advisory. They explain where an agent spent attention.
Evidence gaps are also advisory: they explain what the selected evaluator
profile does not score. The deterministic product and maintainability scores
are useful triage signals when their evaluators ran, but they are not
replacements for blind human review.

- Large actual-vs-packet token deltas suggest the packet did not localize work.
- Repeated `work next` states suggest the next action was not decisive enough.
- Excessive file reads suggest operation targets, implementer anchors, or packet
  handoffs were too broad.
- Skipped proof means the run may be functionally correct but weak evidence.
- Scaffold expected-but-not-run means generator status or harness gating needs
  review.
- Product UI or UX completeness gaps mean API correctness is not enough to
  claim product parity; inspect the wave-local UI checks and source evidence.
- If an API-focused scenario is selected with `api_only`, UI gaps are evidence
  gaps. Switch to a fullstack/UI scenario before claiming dashboard or UX
  parity.

Do not turn smells into hard gates without a specific product reason. A costly
run can be justified when it creates durable model, proof, or traceability
value.
