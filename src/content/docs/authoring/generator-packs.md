---
title: "Generator Packs"
description: "Generator packs are package-backed realization extensions that turn Topogram contracts into stack-specific files."
---

# Generator Packs

> Generator packs are package-backed realization extensions that turn Topogram contracts into stack-specific files.

Status: current
Audience: generator package authors
Use when: you need generator manifest, adapter, verification, or publish guidance.

Generator packs are execution packages. They do not copy starter content and
they do not own the Topogram model. Topogram core validates the workspace,
builds normalized contracts, loads the selected generator, and writes generated
output under the configured output root.

Use a generator pack when a stack-specific renderer must be shared across
projects. Keep one-off maintained-app code in the app instead.

## Authoring Path

Start scaffold-aware web generator packages with `topogram generator init`:

```bash
topogram generator init ./topogram-generator-web --surface web --package @scope/topogram-generator-web
cd ./topogram-generator-web
npm install
npm test
npm run check
topogram generator check .
npm pack --dry-run
npm run release:preflight
```

The initializer writes a private package, `topogram-generator.json`, a CommonJS
adapter export, package-local tests, and a check script that asserts
`context.contracts.scaffold` receives the runtime surface's scaffold contract.
For web generators that contract is `web-scaffold-contract`; for API generators
it is `api-scaffold-contract`. The generated adapter also writes
`topogram-scaffold-context.json` so local and consumer smokes can prove which
scaffold contract reached generated output.

`topogram generator check .` loads the adapter and runs smoke generation
against a minimal scaffold contract fixture. It is intentionally different from
`generator list` and `generator show`, which read manifests only.

For package consumers, the safe loop is:

```bash
npm install --save-dev @scope/topogram-generator-web
topogram generator policy pin @scope/topogram-generator-web@1
topogram generator check @scope/topogram-generator-web
topogram check . --json
topogram generate
test -f app/apps/web/app_web/topogram-scaffold-context.json
npm run verify
```

Topogram does not install generator packages. A project or package author must
install them with npm, pin them through `topogram.generator-policy.json`, and
verify the generated output with the target stack's own checks.

The in-repo SvelteKit, React Router, and Hono API scaffold proof fixtures
demonstrate the intended package-owned boundary. The web packages declare
`web-scaffold-contract`, while the Hono package declares
`api-scaffold-contract`; all three adapters read `context.contracts.scaffold`
as the primary input and write proof metadata showing what they consumed.
Topogram core does not own those framework file layouts; it owns the contracts,
policy checks, package loading, and generated output ownership.

## Manifest

`topogram-generator.json`:

```json
{
  "id": "@topogram/generator-react-web",
  "version": "1",
  "surface": "web",
  "projectionTypes": ["web"],
  "inputs": ["web-scaffold-contract"],
  "outputs": ["web-app", "generation-coverage"],
  "stack": {
    "runtime": "browser",
    "framework": "react",
    "language": "typescript"
  },
  "capabilities": {
    "routes": true,
    "widgets": true,
    "coverage": true
  },
  "widgetSupport": {
    "patterns": ["resource_table", "data_grid_view"],
    "behaviors": ["selection", "sorting"],
    "unsupported": "warning"
  },
  "scaffoldContractSupport": {
    "version": 1,
    "surfaces": ["web"],
    "modes": ["generated", "scaffolded"]
  },
  "source": "package",
  "package": "@topogram/generator-react-web"
}
```

`id` and `version` identify the generator contract. The npm package version is
separate. Policy pins use the generator manifest version, so a package can patch
implementation code without changing the contract version.

Surface scaffold contracts are the recommended input for app-shaped
generators. For web app generators, `web-scaffold-contract` normalizes screen
route obligations, screen loaders, form actions, mutations, state obligations,
operation bindings, screens, regions, widget usage rows, display fields,
operations, data sources, events/actions, proof markers, ownership, coverage
gaps, and input hashes before a stack-specific generator decides file layout.
For API service generators, `api-scaffold-contract` carries endpoint
obligations with route/capability ids, method/path/status/auth,
request/response contract refs, proof markers, ownership, coverage gaps, and
input hashes. Lower-level `ui-surface-contract`, `server-contract`, and
`api-contracts` inputs remain available when a generator intentionally owns its
own app-shape planning.

Use `scaffoldContractSupport` only when the generator actually consumes that
contract. `version` is currently `1`; `surfaces` currently supports `web` and
`api`; and `modes` supports `generated` and `scaffolded`. Maintained app
changes should report drift and patch targets instead of overwriting maintained
files.

## Adapter export

Publish a CommonJS-compatible entry:

```js
exports.manifest = require("./topogram-generator.json");

exports.generate = function generate(context) {
  return {
    files: {},
    artifacts: {},
    diagnostics: []
  };
};
```

Use `context.runtime` and `context.contracts` as the primary API. Raw surface
internals are compatibility fallback, not the preferred contract.

Surface scaffold contracts are the preferred boundary for app-shaped
generators. A generator that declares `inputs: ["web-scaffold-contract"]`,
`inputs: ["api-scaffold-contract"]`, or matching `scaffoldContractSupport`
receives:

- `context.contracts.scaffold` as the primary scaffold contract for the runtime
  surface;
- `context.contracts.webScaffold` as the V1 web alias for web generators only;
- `context.contracts.surfaceScaffoldContracts` as generic surface-oriented
  records with `surface`, `target`, `version`, and `contract`.

For V1, the first concrete targets are `web-scaffold-contract` and
`api-scaffold-contract`. Future database, native, CLI, or workflow scaffold
contracts should use the same `context.contracts.scaffold` boundary instead of
adding framework-specific Topogram core APIs.

A web generator should treat the scaffold as the app-shape input: the
scaffold's screen route obligation rows provide browser paths that the package
maps to its own routing model. `screen_loaders`, `form_actions`, `mutations`,
`state_obligations`, and `operation_bindings` provide the generator-ready data
and behavior obligations for loading, submitting, mutating, refreshing, and
handling empty/loading/error/success states. The package-owned SvelteKit proof
maps those obligations to file routes; the package-owned React Router/Vite
proof maps the same obligations to route config entries and screen components.
In both cases, regions become layout sections, display fields and widget usage
rows become stable markers, contract actions/states become UI affordances, and
`src/lib/topogram/web-scaffold-contract.json` plus generator-owned coverage
metadata record what was consumed. If the scaffold lacks a semantic field, emit
a coverage gap or diagnostic instead of reading lower-level UI/API contracts as
a hidden fallback.

An API generator should treat `api-scaffold-contract` endpoint obligations as
the API-shape input. Endpoint obligation rows provide endpoint ids, operation
ids, methods, paths, success status, auth hints, request/response refs, and
proof markers. The package-owned Hono proof maps those rows to Hono route
handlers and emits `src/topogram/api-scaffold-contract.json` plus
`src/topogram/scaffold-generation-coverage.json`. API generators should not use
`context.contracts.webScaffold`; that alias is web-only.

The returned file map must stay inside the generated output root. Topogram
validates returned paths as a backstop, but generators should also keep paths
relative, portable, and deterministic.

## Widget support vocabulary

`widgetSupport.patterns` must use the canonical UI pattern vocabulary from the
DSL, such as `resource_table`, `data_grid_view`, `board_view`, `calendar_view`,
`summary_stats`, `edit_form`, `filter_panel`, `action_bar`,
`settings_section`, `comment_thread`, and `audit_log`.

Topogram reports pattern coverage in `generator list`, `generator show`, and
`generator check`:

- rendered: full widget/region patterns a generator renders from contract data;
- embedded: patterns such as `lookup_select` and `status_badge` that render as
  subcomponents inside forms, filters, tables, cards, or detail panels;
- layout/shell: patterns such as `app_header`, `primary_navigation`,
  `hamburger_drawer`, `content_region`, `footer_bar`, `inspector_pane`, and
  `master_detail`, which are shell/layout responsibilities instead of widget
  renderer obligations;
- contract-only: patterns carried by a generator that intentionally does not
  render widgets, such as vanilla or native preview generators;
- missing from manifest: beta-web renderable patterns not declared by the
  generator.

For generated-owned web output, full rendered patterns should emit stable
`data-topogram-widget`, `data-topogram-region`, `data-topogram-screen`,
`data-topogram-display-field`, message, accessibility, and action markers.
Embedded patterns should emit the relevant widget and display markers where
they appear. Layout/shell patterns should be handled by app shell or layout
code and reported as layout/shell support rather than as unsupported widgets.

`widgetSupport.behaviors` must use the canonical widget behavior vocabulary:
`selection`, `sorting`, `filtering`, `search`, `pagination`, `grouping`,
`drag_drop`, `inline_edit`, `bulk_action`, `optimistic_update`,
`realtime_update`, and `keyboard_navigation`.

Unknown pattern or behavior values are manifest errors. A generator that cannot
render a supported widget contract should use `unsupported` to report `error`,
`warning`, or `contract-only`; it should not invent stack-local behavior names.

## Verify

```bash
topogram generator check .
npm run check
npm run release:preflight
```

`npm run check` should prove the adapter export, manifest, docs, and local
generator smoke. `npm run release:preflight` is the package-local publish gate:
it should run `npm run check`, `npm pack --dry-run`, a Gitleaks secret scan, and
consumer smoke for the supported stack.

Generator CI should pack/install the generator into a clean consumer project,
policy-pin the installed package, run `topogram generator check`, run
`topogram check`, run `topogram generate`, and compile or check the generated
output when the stack supports it. Publish workflows should run Gitleaks first,
then `npm run release:preflight` before `npm publish`.

## Local Paths Vs Installed Packages

Use local paths while developing:

```bash
topogram generator check ./generator-package
```

Use installed package names when testing as a consumer:

```bash
topogram generator check @scope/topogram-generator-web
```

`generator show` accepts either form when the manifest can be resolved, but it
does not execute package code. `generator check` executes package code. Treat
local package paths as trusted source code.

## What To Publish

A shareable generator package should include:

- `package.json`;
- `topogram-generator.json`;
- a CommonJS-compatible adapter export;
- focused unit tests for contract-to-file rendering;
- package-local docs and retrieval files;
- `npm pack --dry-run` and consumer smoke in CI;
- Gitleaks or equivalent secret scanning before publish.

Do not publish generated app output, local temp files, source app credentials,
or project-specific Topogram workspaces as part of a generator package.
