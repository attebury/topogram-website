---
title: "CLI Reference"
description: "Public Topogram commands are organized around onboard, init, copy, extract, adopt, generate, emit, query, and policy workflows."
---

# CLI Reference

> Public Topogram commands are organized around onboard, init, copy, extract, adopt, generate, emit, query, and policy workflows.

Status: current
Audience: CLI users and agents executing Topogram commands
Use when: you need public command syntax, options, or examples.

Run `topogram help <command>` for command-specific help. This page gives the
current command map.

## Setup and health

```bash
topogram version
topogram doctor
topogram onboard
topogram onboard --json
topogram onboard --write --out-dir ./artifacts
topogram onboard --task <task-id> --write --out-dir ./artifacts
topogram onboard --bug <bug-id> --write --out-dir ./artifacts
topogram onboard --generate --run-verify
topogram setup package-auth
topogram setup catalog-auth
```

`topogram onboard` ties init, check, audit-bundle, generate, and project
verification into one staged plan. By default it is read-only: missing
workspaces return `needs_init` guidance, existing workspaces return
`onboarding_plan` stage status, and no audit artifacts, generated app output, or
verification scripts run unless `--write`, `--generate`, or `--run-verify` is
set. `--write` writes only audit-bundle artifacts: adoption profile with no
selector, standard profile for `--task`, and bug profile for `--bug`.

## Project creation

```bash
topogram init
topogram init . --adopt-sdlc
topogram init ./existing-app --json
topogram template list
topogram copy --list
topogram copy hello-web ./my-app
topogram catalog list
topogram catalog show <id>
topogram copy <id> <target>
```

Use `topogram init` first for existing or maintained repos. Use `topogram copy`
when you want to copy a starter template and generate an app/runtime bundle.
Successful `init` output includes a `Scaffolded:` summary; JSON output includes
`scaffold[]` entries with each path, kind, status, and purpose.

Remote catalog and GitHub reads are size-limited before parsing. Override the
default only when you have reviewed the source. These can be set in the
environment or in `topogram.config.json` under `limits`.

- `TOPOGRAM_REMOTE_FETCH_MAX_BYTES`
- `TOPOGRAM_CATALOG_FETCH_MAX_BYTES`
- `TOPOGRAM_GITHUB_FETCH_MAX_BYTES`

## Validation and output

```bash
topogram check
topogram onboard --strict --json
topogram generate
topogram generate ./topo --out ./app
topogram emit <target> ./topo --json
topogram emit <target> ./topo --write --out-dir ./artifacts
topogram emit glossary ./topo --write --out-dir docs/concepts
topogram emit glossary ./topo --check docs/concepts/glossary.md
topogram emit audit-bundle ./topo --task <task-id> --profile standard --write --out-dir ./artifacts
topogram emit audit-bundle ./topo --bug <bug-id> --profile bug --write --out-dir ./artifacts
topogram emit audit-bundle ./topo --profile adoption --write --out-dir ./artifacts
```

## Runtime topology

```bash
topogram runtime add web api database
topogram runtime add api database ./my-project --dry-run --json
```

`runtime add` updates `topogram.project.json` and, when needed, writes generated
API and local SQLite database surfaces to `topo/surfaces/runtime-topology.tg`.
It preserves existing runtimes, picks non-conflicting default ports for web/API
runtimes, links web to API and API to database, and reports the next
`topogram check` and `topogram generate` commands.

## Agent and query

```bash
topogram agent brief --json
topogram query list --json
topogram query show <name> --json
topogram query slice ./topo --task <task-id> --json
topogram query slice ./topo --task <task-id> --detail compact --format markdown
topogram query slice ./topo --task <task-id> --detail compact --format html
topogram query slice ./topo --journey journey_greenfield_start_from_template --json
topogram query slice ./topo --surface proj_web --screen item_list --json
topogram query slice ./topo --surface proj_web --layout layout_collection_list --json
topogram query slice ./topo --surface proj_web --region region_collection_results --json
topogram query slice ./topo --surface proj_web --component-map realization_set_company_web_widgets --json
topogram query slice ./topo --surface proj_web --screen item_list --widget widget_data_grid --detail compact --json
topogram query context-savings ./topo --task <task-id> --detail compact --format markdown
topogram query context-savings ./topo --journey journey_greenfield_start_from_template --detail compact --json
topogram query context-savings ./topo --task <task-id> --transcript ./agent-run.jsonl --json
topogram query work-map ./topo --surface proj_web --screen item_list --format markdown
topogram query work-map ./topo --surface proj_web --json
topogram query sdlc-grooming ./topo --json
topogram query sdlc-backlog ./topo --json
topogram query sdlc-available ./topo --json
topogram query sdlc-ready ./topo --json
topogram query sdlc-claimed ./topo --actor actor_coding_agent --json
topogram query sdlc-blockers ./topo --task <task-id> --json
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
topogram query verification-runs ./topo --task <task-id> --json
topogram query sdlc-metrics ./topo --json
topogram query sdlc-stale-work ./topo --json
```

Focused query reports:

| Query | Example |
| --- | --- |
| `slice` | `topogram query slice ./topo --task <task-id> --detail compact --format html` |
| `context-savings` | `topogram query context-savings ./topo --task <task-id> --detail compact --format markdown` |
| `verification-targets` | `topogram query verification-targets ./topo --task <task-id> --json` |
| `widget-behavior` | `topogram query widget-behavior ./topo --surface proj_web --json` |
| `ui-design-coverage` | `topogram query ui-design-coverage ./topo --surface proj_web --json` |
| `work-map` | `topogram query work-map ./topo --surface proj_web --format markdown` |
| `change-plan` | `topogram query change-plan ./topo --task <task-id> --json` |
| `review-packet` | `topogram query review-packet ./topo --task <task-id> --json` |
| `resolved-workflow-context` | `topogram query resolved-workflow-context ./topo --mode implementation --task <task-id> --json` |
| `single-agent-plan` | `topogram query single-agent-plan ./topo --mode implementation --task <task-id> --json` |
| `extract-plan` | `topogram query extract-plan ./imported-topogram/topo --json` |
| `multi-agent-plan` | `topogram query multi-agent-plan ./imported-topogram/topo --mode extract-adopt --json` |
| `sdlc-backlog` | `topogram query sdlc-backlog ./topo --json` |
| `sdlc-grooming` | `topogram query sdlc-grooming ./topo --json` |
| `sdlc-available` | `topogram query sdlc-available ./topo --json` |
| `sdlc-ready` | `topogram query sdlc-ready ./topo --json` |
| `sdlc-claimed` | `topogram query sdlc-claimed ./topo --actor actor_coding_agent --json` |
| `sdlc-closeout-candidates` | `topogram query sdlc-closeout-candidates ./topo --json` |
| `sdlc-blockers` | `topogram query sdlc-blockers ./topo --task <task-id> --json` |
| `sdlc-proof-gaps` | `topogram query sdlc-proof-gaps ./topo --task <task-id> --json` |
| `sdlc-metrics` | `topogram query sdlc-metrics ./topo --json` |
| `sdlc-stale-work` | `topogram query sdlc-stale-work ./topo --json` |
| `verification-runs` | `topogram query verification-runs ./topo --task <task-id> --json` |
| `risk-summary` | `topogram query risk-summary ./topo --task <task-id> --json` |
| `proceed-decision` | `topogram query proceed-decision ./topo --mode implementation --task <task-id> --json` |
| `write-scope` | `topogram query write-scope ./topo --task <task-id> --json` |

`context-savings` reuses the same selectors as `query slice`, supports
`--detail compact|standard|full`, and accepts `--transcript <jsonl>` for a
defensive local transcript comparison. Its token counts are approximate and
reported as estimates.

`query slice` supports JSON for tools, Markdown for terminal review, and static
HTML for a local human-readable work cockpit. The slice JSON includes `frame`,
`relationships`, `work_items`, `proof_plan`, and `attention_budget` alongside
compatible `depends_on`, `related`, and `verification_targets` fields.
`emit context-slice --format html --write --out-dir <dir>` writes
`<focus-id>.context-slice.html`.

`emit audit-bundle` writes a deterministic local evidence directory under
`<out-dir>/audit-bundle/<focus-or-workspace>/`. It reuses slice selectors such
as `--task`, `--bug`, `--screen`, `--widget`, `--capability`, `--entity`,
`--journey`, and `--requirement`. Profiles are:

- `standard`: focused slice JSON/HTML, context savings, write scope,
  verification targets, risk, proceed decision, contracts when relevant, and
  source excerpts.
- `bug`: standard focused evidence plus proof gaps, blockers, verification
  runs, and `context-diff` when `--from-topogram <path>` is supplied.
- `adoption`: workspace-level first-run evidence when no selector is supplied,
  including agent brief, check summary, SDLC reports, context report, domain
  list, and source inventory.

## SDLC

```bash
topogram sdlc policy explain --json
topogram sdlc start <task-id> . --actor actor_coding_agent --json
topogram sdlc start <task-id> . --actor actor_coding_agent --write --json
topogram sdlc verify record <verification-id> . --task <task-id> --actor actor_coding_agent --command "<command you ran>" --status pass --write --json
topogram sdlc complete <task-id> . --verification <verification-id> --actor actor_coding_agent --write
topogram sdlc prep commit . --base origin/main --head HEAD --json
topogram sdlc check . --strict
topogram sdlc gate . --base origin/main --head HEAD --require-adopted --json
```

`sdlc start` is read-only by default. It returns the implementation packet for a
task; `--write` claims and starts the task through command-owned history.

## Widgets

```bash
topogram widget check ./topo --surface proj_web
topogram widget behavior ./topo --surface proj_web --json
topogram emit ui-widget-contract ./topo --widget widget_data_grid --json
topogram emit work-map-report ./topo --surface proj_web --format markdown
topogram emit work-map-report ./topo --surface proj_web --format markdown --write --out-dir ./artifacts
topogram emit context-slice ./topo --task <task-id> --format html --write --out-dir ./artifacts
topogram emit audit-bundle ./topo --task <task-id> --profile standard --write --out-dir ./artifacts
topogram emit glossary ./topo --json
```

## Brownfield extract/adopt

```bash
topogram extract ./existing-app --out ./imported-topogram
topogram extract ./existing-cli --out ./imported-topogram --from cli --extractor @topogram/extractor-node-cli
topogram extract ./react-router-app --out ./imported-topogram --from ui --extractor @topogram/extractor-react-router
topogram extract ./prisma-app --out ./imported-topogram --from db --extractor @topogram/extractor-prisma-db
topogram extract ./express-api --out ./imported-topogram --from api --extractor @topogram/extractor-express-api
topogram extract ./drizzle-app --out ./imported-topogram --from db --extractor @topogram/extractor-drizzle-db
topogram extract ./xstate-app --out ./imported-topogram --from workflows --extractor @topogram/extractor-xstate-workflows
topogram extract ./temporal-app --out ./imported-topogram --from workflows --extractor @topogram/extractor-temporal-workflows
topogram extractor list
topogram extractor recommend ./existing-app --from db,api,ui,cli,workflows
topogram extractor show @topogram/extractor-prisma-db
topogram extractor show @topogram/extractor-xstate-workflows
topogram extractor show @topogram/extractor-temporal-workflows
topogram extractor show topogram/ui-extractors
topogram extractor check @topogram/extractor-prisma-db
topogram extractor check ./extractor-package
topogram extractor init ./extractor-package --track cli --package @scope/extractor-package
topogram extractor policy init
topogram extractor policy pin @topogram/extractor-prisma-db@1
topogram extractor policy pin @topogram/extractor-xstate-workflows@1
topogram extractor policy pin @topogram/extractor-temporal-workflows@1
topogram extractor policy check
topogram extract check ./imported-topogram
topogram extract plan ./imported-topogram
topogram adopt --list ./imported-topogram
topogram query extract-plan ./imported-topogram/topo --json
topogram query single-agent-plan ./imported-topogram/topo --mode extract-adopt --json
topogram query multi-agent-plan ./imported-topogram/topo --mode extract-adopt --json
topogram query review-packet ./imported-topogram/topo --mode extract-adopt --json
topogram adopt <selector> ./imported-topogram --dry-run
topogram adopt <selector> ./imported-topogram --write
topogram extract status ./imported-topogram
topogram extract history ./imported-topogram --verify
```

`topogram extractor init` also reports a `Scaffolded:` summary and returns
`scaffold[]` in JSON mode so extractor authors can see the generated package
shape and why each file exists.

Extractor command safety: `extractor list`, `extractor show`, and
`extractor recommend`, and `extractor policy` do not load package adapter code.
`extractor recommend <source>` only reads local source evidence and reports
likely bundled/package-backed extractors plus install, pin, check, and extract
commands. `extractor check` and `extract --extractor` do load package adapter
code. Extractor packages write review-only candidates; `adopt --dry-run` should
precede any canonical `--write`. Extractor package output distinguishes manifest
version, npm package version, compatible CLI range, and policy pin state so
humans and agents can choose the exact install or pin command before execution.

## Policies and trust

```bash
topogram trust status
topogram trust diff
topogram trust template
topogram template policy check
topogram generator list
topogram generator show @topogram/generator-react-web
topogram generator check ./generator-package
topogram generator policy check
topogram generator policy pin @scope/topogram-generator-web@1
topogram extractor list
topogram extractor policy check
topogram sdlc policy explain
```

Generator command safety: `generator list` and `generator show` read manifests
only. `generator check` and `topogram generate` load generator package code.
Topogram does not install generator packages; install them with npm, pin their
manifest version through `topogram.generator-policy.json`, run `topogram check`,
then verify generated output with the stack's own commands.

## Maintainers

```bash
topogram release status
topogram release status --strict
topogram release roll-consumers --latest
topogram package update-cli --latest
```

`topogram release roll-consumers --latest --watch` is the maintainer command for
rolling first-party consumers after a CLI publish. Human output includes a
recovery summary, and progress is printed to stderr so JSON output stays
machine-readable. Use `--no-watch` to push consumer commits without waiting for
CI, then run `topogram release status --strict`.

`topogram release status --strict` requires the current checkout to match the
current package version's remote release tag. If new commits have landed after
the latest `topogram-v*` tag, strict mode fails until a new patch release is
cut or the checkout is moved back to the released commit.

`topogram release status --strict` also checks public proof repositories in a
separate proof-consumer section. Those repos are not rolled by
`roll-consumers`; they are tutorial/product proof repos, so release status
checks their configured proof baseline, `proof:audit` and `verify` scripts, and
Proof Verification workflow state separately from package rollout consumers.
Proof repos do not need to move on every patch release; refresh them when a
workflow meaning changes, a breaking change lands, or a proof would teach stale
behavior.
