---
title: "Topogram Model"
description: "Topogram is a living app map that separates durable intent from stack realization."
---

# Topogram Model

> Topogram is a living app map that separates durable intent from stack realization.

Status: current
Audience: humans and agents learning Topogram concepts
Use when: you need the core model before editing specs, generators, extractors, or docs.

Topogram is a living app map. It keeps app intent, contracts, ownership,
runtime topology, rules, and proof in one validated workspace so humans and
agents can reason from bounded context before changing code.

The map can be authored directly, copied from a template, or extracted from a
brownfield app as reviewable candidates. Once validated, it can drive generated
outputs, maintained-app guidance, contracts, migration proposals, and agent
query packets.

## Source

`topo/` contains `.tg` statements and markdown documents. The parser flattens
the folder tree into one graph, so folders are a human and agent convention.
Start with `topogram init` when you want a maintained repo or empty `topo/`
workspace. `topogram init --adopt-sdlc` also adopts enforced SDLC. Use
`topogram copy` when you want to copy a starter template into a generated
project.

Common statement kinds:

- `actor`, `role`, `term`, `domain`
- `entity`, `shape`, `enum`
- `rule`, `capability`, `seed_data`, `workflow`, `verification`
- `widget`, `region`, `layout`, `theme`, `design_language`,
  `component_map`
- `journey`, `workflow`
- `surface`
- `decision`
- SDLC kinds: `pitch`, `requirement`, `acceptance_criterion`, `task`, `plan`,
  `bug`

## Project Config

`topogram.project.json` declares:

- workspace path, usually `./topo`;
- output ownership, generated or maintained;
- topology runtimes;
- generator bindings;
- runtime relationships such as `uses_api` and `uses_database`;
- ports and stack-specific runtime settings.

## Contracts And Surfaces

Surface `type` describes the contract or surface:

- `semantic_ui` owns semantic UI: screens, layout usage, screen region
  overrides, render entries, behavior, visibility, navigation, and design
  tokens.
- `region` and `layout` define reusable semantic work areas
  and templates. They are not DOM, SwiftUI, Android, or CSS layout trees.
- `web`, `ios`, and `android` realize a UI contract for
  a concrete platform.
- `design_language` owns design-system scope, supported platforms, package
  identity, surfaces, concrete theme selection, and token names.
- `theme` owns stack-agnostic concrete palette and design token values such as
  color roles, token paths, radius scale, density, interaction states, and
  accessibility contrast intent.
- `component_map` maps shared semantic widgets to platform component
  refs and behavior support. The graph is a work map, not a framework render
  tree.
- `api` owns API endpoints and wire contracts.
- `db` owns database tables, columns, relations, indexes, and lifecycle
  intent.
- `cli` owns command-line commands, options, effects, and examples.

## Journeys

`journey` records describe ordered workflows for users, maintainers, and agents.
They use repeated `step { ... }` and `alternate { ... }` blocks so the graph can
preserve sequence, branch points, commands, expected outcomes, and related
capabilities or surfaces.

Journey steps may also map to screens, capabilities, and frequency. UI
generators normalize those fields into a journey layout plan and layout-rule
proof markers. See [Normalized Layout Vocabulary](/concepts/normalized-layout-vocabulary/).

Canonical journeys are graph-native `.tg` statements. Markdown journey text is
supporting material or an import/reconcile draft until it is reviewed and
promoted into a `journey` record.

## Workflows

`workflow` records describe app-owned state machines and process flows. They use
ordered `state { ... }` and `transition { ... }` blocks so agents can inspect
states, events, guards, linked capabilities, and verification targets without
reading source code or Markdown prose first.

Workflow-native extractors emit reviewable workflow candidates. Adoption turns
reviewed candidates into canonical `workflow` records under `topo/`; subsequent
`query slice --workflow ...` packets provide focused context for maintained
workflow changes and drift review.

## Runtimes

Topology runtimes are deployable or generated units:

- `web`
- `api_service`
- `database`
- `ios`
- `android`

Runtimes bind surfaces to generators. Generators receive normalized
contracts and write stack-specific output.

## Ownership

Generated outputs can be replaced only when their generated sentinel is present.
Maintained outputs are never overwritten; Topogram can still emit contracts,
reports, checks, and migration proposals for maintained apps.

<!-- topogram-website:field-notes:start -->

## Field Notes

- [Topogram Layers and Slices](/post/layers-and-slices/) — a narrative overview of app-map layers and focused work packets.

<!-- topogram-website:field-notes:end -->
