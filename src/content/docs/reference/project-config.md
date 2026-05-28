---
title: "Project Config"
description: "topogram.project.json declares how a project uses a topo/ workspace."
---

# Project Config

> topogram.project.json declares how a project uses a topo/ workspace.

Status: current
Audience: project maintainers and agents editing topogram.project.json
Use when: you need project config, topology, workspace, or ownership reference.

`topogram.project.json` declares how a project uses a `topo/` workspace.

Minimal shape:

```json
{
  "version": "1",
  "workspace": "./topo",
  "outputs": {
    "app": {
      "path": "./app",
      "ownership": "generated"
    }
  },
  "topology": {
    "runtimes": []
  }
}
```

## Workspace

`workspace` defaults to `./topo`. It must be relative and cannot escape the
project root. Package fixtures may use `"."`.

## Outputs

Outputs are either:

- `generated`: Topogram may replace the output when the generated sentinel is
  present.
- `maintained`: Topogram never overwrites it; emit contracts/reports instead.

## Runtimes

Runtime kinds:

- `web`
- `api_service`
- `database`
- `ios`
- `android`

References:

- `uses_api` links web/native surfaces to an API runtime.
- `uses_database` links API services to a database runtime.

Each runtime can bind a package-backed or bundled generator.

To add a linked generated prototype topology from an existing web surface,
capabilities, and entities, run:

```bash
topogram runtime add web api database
```

The command creates missing API and local SQLite database `surface` records under
`topo/surfaces/runtime-topology.tg`, adds `outputs.app` with generated ownership
when no app output is declared, and writes linked runtimes:

- `app_sveltekit` with `uses_api: "app_api"`
- `app_api` with `uses_database: "app_sqlite"`
- `app_sqlite` using `topogram/sqlite`

Existing runtimes and links stay authoritative. Re-running the command is
idempotent; use `--dry-run --json` to review the plan without writing.

`topology.mode` is optional. The default is `explicit`, which means Topogram
uses only declared runtimes. `local_first` is generation-time prototype mode:
when routed web screens use capabilities but no API/database runtime is
declared, Topogram derives a local API runtime and SQLite database runtime for
the generated bundle without rewriting `topogram.project.json`.

```json
{
  "topology": {
    "mode": "local_first",
    "runtimes": [
      {
        "id": "app_sveltekit",
        "kind": "web",
        "surface": "proj_web",
        "generator": { "id": "topogram/sveltekit", "version": "1" }
      }
    ]
  }
}
```

## Database Migrations

Database runtimes can declare an optional `migration` strategy. This makes the
database ownership boundary explicit without changing the stack-neutral
`db`.

Generated database runtime:

```json
{
  "id": "main_db",
  "kind": "database",
  "surface": "proj_db",
  "generator": {
    "id": "@topogram/generator-postgres-db",
    "version": "1",
    "package": "@topogram/generator-postgres-db"
  },
  "migration": {
    "ownership": "generated",
    "tool": "sql",
    "statePath": "app/db/main_db/state",
    "apply": "script"
  }
}
```

Maintained Prisma runtime:

```json
{
  "id": "main_db",
  "kind": "database",
  "surface": "proj_db",
  "generator": {
    "id": "@topogram/generator-postgres-db",
    "version": "1",
    "package": "@topogram/generator-postgres-db"
  },
  "migration": {
    "ownership": "maintained",
    "tool": "prisma",
    "schemaPath": "apps/api/prisma/schema.prisma",
    "migrationsPath": "apps/api/prisma/migrations",
    "snapshotPath": "topo/state/db/main_db/current.snapshot.json",
    "apply": "never"
  }
}
```

Rules:

- `ownership` is `generated` or `maintained`.
- `tool` is `sql`, `prisma`, or `drizzle`.
- generated migrations require `statePath` and `apply: "script"`.
- maintained migrations require `snapshotPath` and `apply: "never"`.
- maintained Prisma and Drizzle workflows require `schemaPath` and
  `migrationsPath`.
- maintained SQL workflows require `migrationsPath`.
- paths are project-relative and cannot escape the project root.

In maintained mode, Topogram emits snapshots, plans, SQL proposals, and
Prisma/Drizzle schema proposals. The maintained app owns its schema files,
migration directory, and migration runner.

Generated DB lifecycle bundles use the strategy when rendering their plan and
scripts:

- `ownership: "generated"` keeps apply-capable lifecycle scripts. Supported
  SQL migrations may be applied by generated scripts; unsupported plans stop for
  manual review.
- `ownership: "maintained"` renders proposal-only lifecycle scripts. They emit
  desired snapshots, migration plans, and SQL proposals, but never apply
  migrations or seed generated demo data into the maintained database.
