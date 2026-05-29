---
title: "Experiment Trace Loop"
description: "Use experiments to improve Topogram, not only to publish favorable numbers."
---

# Experiment Trace Loop

> Use experiments to improve Topogram, not only to publish favorable numbers.

Status: current
Audience: maintainers running proof or product-learning experiments
Use when: you need a repeatable experiment → trace → improvement loop.

## Loop

```text
experiment -> trace analyze -> improve -> stabilize -> compare -> publish
```

1. Run the smallest useful experiment. Prefer Topogram-only stabilization until
   the Topogram arm can complete the workflow.
2. Read `report.json` for pass rate, wave completion, token totals, and tool
   counts.
3. Read `trace-analysis.json` for attention smells and improvement categories.
4. Convert each actionable finding into one of: CLI packet improvement,
   generator/scaffold improvement, docs/agent UX improvement, harness fix, or
   backlog-only note.
5. Run one stabilization pilot after the improvement before resuming paired
   comparison.
6. Use `posts/experiment-lessons/<run-id>.md` as a draft, not a publish-ready
   post.

## Commands

```bash
npm run experiment:slice-benefit:run -- --provider mock --arms topogram --trials 1 --json
topogram trace analyze ./.tmp/slice-benefit-clinic-ops/mock-run --json
topogram trace report ./.tmp/slice-benefit-clinic-ops/mock-run --format markdown
```

For focused expected-workflow evidence:

```bash
topogram emit audit-bundle ./topo --task <task-id> --profile experiment --write --out-dir ./artifacts
topogram trace analyze <run-dir> --audit-bundle ./artifacts/audit-bundle/<task-id> --json
```

## Interpreting Smells

Trace smells are advisory. They explain where an agent spent attention.

- Large actual-vs-packet token deltas suggest the packet did not localize work.
- Repeated `work next` states suggest the next action was not decisive enough.
- Excessive file reads suggest edit targets or anchors were too broad.
- Skipped proof means the run may be functionally correct but weak evidence.
- Scaffold expected-but-not-run means generator status or harness gating needs
  review.

Do not turn smells into hard gates without a specific product reason. A costly
run can be justified when it creates durable model, proof, or traceability
value.
