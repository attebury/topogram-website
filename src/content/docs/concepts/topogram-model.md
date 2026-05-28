---
title: "Topogram Model"
description: "Topogram is a living app map that separates durable product intent from stack-specific implementation."
---

# Topogram Model

> Topogram is a living app map that separates durable product intent from stack-specific implementation.

Status: current
Audience: humans and agents learning Topogram concepts
Use when: you need the core model before editing specs, generators, extractors, or docs.

Topogram exists because humans and agents often change software with too much
source code and too little product memory. A Topogram model keeps the app's
intent, contracts, ownership, runtime responsibilities, and proof in a
validated `topo/` workspace.

The result is an app map. It is not a framework render tree, an ORM schema, a
ticket tracker, or a pile of generated code. It is the durable shape that lets
an agent ask: what matters, where is it implemented, who owns the output, and
how do I prove the change worked?

## What The Map Holds

Topogram records five kinds of project memory:

| Area | What it answers |
| --- | --- |
| Product intent | Which domains, terms, rules, journeys, entities, capabilities, and workflows matter? |
| Runtime contracts | Which navpoints, endpoints, surfaces, databases, widgets, layouts, and seed records exist? |
| Ownership | Which outputs are generated, maintained, extracted evidence, or human-owned implementation? |
| Agent context | Which focused slice or implementation packet should guide the current task? |
| Proof | Which checks, verification targets, acceptance criteria, and evidence close the loop? |

That memory can be authored directly, copied from a template, or extracted from
brownfield source as reviewable candidates. Validated records can then drive
contracts, audit bundles, context slices, generated outputs, migration
proposals, and maintained-app guidance.

## Source

`topo/` contains `.tg` statements and supporting Markdown. Folder layout is for
humans and agents; the parser flattens files into one graph.

Start with:

- `topogram init` for an empty app map in a maintained repo;
- `topogram init --adopt-sdlc` when work should be task/proof tracked from the
  beginning;
- `topogram copy` when you want a template or reusable pure Topogram package;
- `topogram extract` when existing source should become reviewable candidates.

Common statement kinds:

- identity and language: `actor`, `role`, `term`, `domain`;
- data and contracts: `entity`, `shape`, `enum`, `seed_data`;
- behavior: `rule`, `capability`, `workflow`, `verification`;
- UI work map: `navpoint`, `screen`, `section`, `widget`, `region`, `layout`,
  `theme`, `design_language`, `component_map`;
- API behavior: `endpoint`;
- surfaces and runtimes: `surface` plus `topogram.project.json` topology;
- work and proof: `pitch`, `requirement`, `acceptance_criterion`, `task`,
  `plan`, `bug`, `decision`.

## Navigation, Screens, And Endpoints

Topogram separates UI navigation from API behavior:

- `navpoint` answers "how does a user get to this screen?"
- `screen` answers "what is shown, in what layout and regions?"
- `screen.renders` places widgets, actions, or sections into named regions.
- `endpoint` answers "what HTTP operation realizes this capability?"

The UI chain is:

```text
navpoint -> screen -> layout -> region -> render -> widget/action/section -> component_map
```

Stack-specific frameworks may still use terms such as route files, controllers,
or handlers. Those are implementation details. Topogram's public model keeps
the product boundary explicit.

## Capabilities, Persistence, And Seed Data

`capability` records describe user or system behavior. Persistence contracts
connect capabilities to entities through read/create/update/delete intent.
`endpoint` records can expose those capabilities over HTTP. `seed_data` records
make catalog, demo, or test fixtures first-class so generators and agents do
not invent sample data from prose.

This matters for first apps: a model that says "program templates exist" should
also be able to seed usable program records and expose them through real
contracts.

## Surfaces, Runtimes, And Ownership

`surface` records describe semantic or platform-facing contracts:

- `semantic_ui` for screens, layouts, regions, renders, navigation intent, and
  design tokens;
- `web`, `ios`, and `android` for platform realizations;
- `api` for endpoint and wire contracts;
- `db` for database tables, columns, relations, indexes, and lifecycle intent;
- `cli` for command-line behavior;
- `design_language`, `theme`, and `component_map` for design realization.

`topogram.project.json` declares workspace path, topology runtimes, output
ownership, generator bindings, ports, and runtime relationships such as
`uses_api` and `uses_database`.

Generated outputs can be replaced only when their generated sentinel is
present. Maintained outputs are never overwritten. For maintained apps,
Topogram emits contracts, packets, checks, and migration proposals that guide
direct edits.

## Slices And Proof

Context slices and `work next` packets are the agent-facing view of the
model. They turn the graph into bounded work packets: frame, read order,
relationships, work items, implementation contracts, write scope, proof plan,
and next commands.

Verification records connect product claims to commands, tests, checks, and CI
gates. SDLC records connect work to requirements and acceptance criteria. The
goal is traceable change: a human or agent can see what was intended, what was
changed, and what proved it.

## Related Concepts

- [Topo Workspace](/concepts/topo-workspace/)
- [SDLC](/concepts/sdlc/)
- [Generate vs Emit](/concepts/generate-vs-emit/)
- [Normalized Layout Vocabulary](/concepts/normalized-layout-vocabulary/)
- [Glossary](/concepts/glossary/)
