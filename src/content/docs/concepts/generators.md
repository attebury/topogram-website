---
title: "Generators"
description: "Generators realize the app map into stack-specific generated output."
---

# Generators

> Generators realize the app map into stack-specific generated output.

Status: current
Audience: generator users and package authors
Use when: you need to understand how generators turn contracts into app/runtime outputs.

Topogram core owns contracts. Generator packages own stack realization.

Before generation, Topogram validates topology, resolves the graph, builds
normalized contracts, and selects the generator bound to each runtime in
`topogram.project.json`.

## Runtime to generator

```json
{
  "id": "app_web",
  "kind": "web",
  "surface": "proj_web",
  "generator": {
    "id": "@topogram/generator-react-web",
    "version": "1",
    "package": "@topogram/generator-react-web"
  },
  "uses_api": "app_api",
  "port": 5173
}
```

The project must install package-backed generators before `check` or
`generate` can load them.

Bundled generators are available with the CLI. Package-backed generators are
normal npm packages that must already be installed. Local generator package
paths are useful for authoring and smoke tests, but production projects should
pin installed packages through generator policy.

## Inspect

```bash
topogram generator init ./topogram-generator-web --surface web --package @scope/topogram-generator-web
topogram generator list
topogram generator show @topogram/generator-react-web
topogram generator check ./generator-package
topogram generator policy check
```

`generator list` and `generator show` read manifests only. `generator check`
loads package code and runs smoke generation. `topogram generate` loads the
generator selected by `topogram.project.json` runtime bindings.

For UI generators, list/show/check also report pattern coverage. Rendered
patterns are full widget or region renderers. Embedded patterns such as
`lookup_select` and `status_badge` are subcomponent support. Layout/shell
patterns such as `app_header` and `primary_navigation` are shell obligations,
not widget omissions.

Generator policy controls which package-backed generators may execute:

```bash
topogram generator policy init
topogram generator policy pin @scope/topogram-generator-web@1
topogram generator policy check --json
```

Topogram does not install generator packages. Install them with npm, pin the
generator manifest version, run `topogram check`, then generate and verify the
resulting app with the stack's own commands.

## Contracts by surface

- Web generators should prefer `web-scaffold-contract` through
  `context.contracts.scaffold` when they generate app-shaped output. Lower-level
  `ui-surface-contract` and related API contracts remain available for
  generators that intentionally own their own app-shape planning.
- API generators receive server/API contracts and optional database runtime
  context.
- Database generators receive DB contract and lifecycle plan.
- Native generators receive routed UI contracts and related API contracts.

## Authoring Loop

Generator authors should prove both sides of the package:

```bash
topogram generator init ./topogram-generator-web --surface web --package @scope/topogram-generator-web
topogram generator check ./generator-package
npm pack --dry-run
```

Then test from a clean consumer project:

```bash
npm install --save-dev ./generator-package.tgz
topogram generator policy pin @scope/topogram-generator-web@1
topogram check . --json
topogram generate
npm run verify
```

See [Generator Packs](/authoring/generator-packs/) for manifest, adapter,
policy, and publish guidance.
