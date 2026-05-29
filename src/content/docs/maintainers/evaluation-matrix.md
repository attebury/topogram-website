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
- `evaluation_suite`: a set of related scenarios and fixtures.
- `experiment`: a controlled comparison across arms or trials.
- `benchmark`: a stable, repeated, externally credible evaluation suite.

## Initial Matrix

| Scenario | Topogram mode | Primary question |
| --- | --- | --- |
| `greenfield_generated_owned` | generated-owned | Can a model generate and verify a working app without maintained edits? |
| `greenfield_model_first` | model-only | Does modeling help or slow down first implementation? |
| `seeded_model_implementation` | model-only | Does an existing model help implementation and feature evolution? |
| `progressive_scaffold_to_maintained` | scaffolded-maintained | Does scaffold leverage reduce long-lived feature cost after the app becomes maintained? |
| `brownfield_adoption` | model-after-extract | Can Topogram pay off after onboarding an existing app? |
| `bugfix_regression` | maintained | Does Topogram reduce search and repair cost? |
| `ux_product_workflow` | semantic-ui | Does Topogram improve real user-facing app quality? |
| `multi_surface` | multi-runtime | Does the model keep web, API, database, mobile, or CLI surfaces consistent? |
| `audit_only` | trace-only | Does Topogram help humans or agents understand a repo faster? |
| `generated_owned_evolution` | generated-owned | Can teams evolve generated-owned apps without maintained-code drift? |

## Current Clinic-Ops Suite

`slice-benefit-clinic-ops` is one evaluation suite. Its current strongest
scenario is `progressive_scaffold_to_maintained_api`: both arms start from
equivalent base API behavior, Topogram receives a base model plus API scaffold,
and measured work starts at feature wave 1.

This suite currently scores API correctness, token/tool efficiency, workflow
friction, traceability, and proof discipline. It does not yet score full product
UX quality, visual design quality, accessibility usability, or blind
maintainability review. Trace output must list those dimensions as evidence
gaps when they are not scored.

## Run Classes

- `stabilization`: one arm is being made reliable before comparison.
- `paired_comparison`: two or more arms run the same scenario.
- `diagnostic_trace`: a run is used to inspect workflow behavior.
- `regression_check`: a run verifies that a prior improvement did not regress.
- `benchmark_candidate`: a stable paired run that could support publication
  after evidence gaps are closed.

## Evaluation Context

Run artifacts should include `evaluation_context` rather than ad hoc experiment
metadata. Required fields are `suite_id`, `scenario_id`, `claim`, `run_class`,
`topogram_mode`, `score_dimensions`, `primary_success_metric`,
`secondary_metrics`, and `not_scored`.

Trace analysis uses this context to explain the matrix position, publication
readiness, and evidence gaps before token totals.
