---
title: "Init Workspace"
description: "Create an empty Topogram workspace for a greenfield, maintained, existing-app, or spec-only project."
---

# Init Workspace

> Create an empty Topogram workspace for a greenfield, maintained, existing-app, or spec-only project.

Status: current
Audience: humans and agents starting a Topogram workspace
Use when: you want to model a project yourself instead of copying a template or extracting candidates from brownfield code.

Use this workflow when a repository already exists, when you want to dogfood
Topogram inside a maintained codebase, when you are starting a greenfield app
from your own spec, or when you want a spec-only `topo/` workspace.

`topogram init` is intentionally small. It creates Topogram source and guidance
files, but it does not copy template content, install generator packages, or
write generated app code.

## 1. Initialize

```bash
npm install --save-dev @topogram/cli
npx topogram init . --adopt-sdlc
```

This writes:

- `topo/`
- `topogram.project.json`
- `README.md`, if missing
- `AGENTS.md`, if missing
- `topogram.sdlc-policy.json` and `topo/sdlc/**`, when `--adopt-sdlc` is used
- starter engineering-law records, when `--adopt-sdlc` is used:
  `topo/capabilities/engineering-workflow.tg`,
  `topo/rules/engineering-laws.tg`, and
  `topo/sdlc/decisions/repo-local-laws-are-enforceable.tg`

The command also explains the scaffold in its output:

- human output prints a `Scaffolded:` section with each path, create/reuse
  status, and purpose;
- `--json` output returns `scaffold[]` entries with `path`, `kind`, `status`,
  and `purpose`.

The generated project config marks `.` as maintained ownership. That means
Topogram will not overwrite source files in the repo.

For greenfield generated work, keep the initialized `topo/` as the contract
source, add topology/generator bindings, then use `topogram generate` only after
you explicitly configure generated-owned outputs.

The generated `AGENTS.md` always includes the basic engineering laws: maintain
for long-lived intermittent ownership, keep code testable and security-focused,
prove consumer-visible behavior, start agents from focused context, and use
commands for workflow state. With `--adopt-sdlc`, those laws are also seeded as
queryable `.tg` records.

## 2. Inspect

```bash
topogram agent brief --json
topogram sdlc policy explain --json
topogram check --json
topogram query list --json
```

Agents should start from the brief, then use focused query packets instead of
reading the whole graph.

## 3. Add Topogram source

Edit `topo/**` to describe the project. For small projects, flat folders are
fine. For larger projects, use domain folders under `topo/` as a human and
agent convention; the parser still flattens all statements into one graph.

Use `topogram emit` to inspect contracts, reports, snapshots, and plans:

```bash
topogram emit <target> ./topo --json
```

Use `topogram generate` only after you deliberately configure generated-owned
outputs in `topogram.project.json`.

## 4. Before committing

```bash
topogram check . --json
topogram sdlc check --strict
topogram sdlc prep commit . --json
```

If SDLC is enforced, protected changes need an SDLC item, a `topo/sdlc/**`
record update, or an explicit allowed exemption.
