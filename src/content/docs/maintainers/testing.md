---
title: "Testing"
---

# Testing

Tests must prove consumer or agent value.

Weak tests check marker strings or file existence. Strong tests cross the next
meaningful boundary: validation, normalized contracts, import/adoption,
generated output compile, runtime smoke, or an explicit unsupported diagnostic.

## Test Types

- Unit contract tests prove parser, resolver, validator, and generator contracts
  without writing generated apps.
- CLI boundary tests run the command a user or agent runs and assert exit status,
  diagnostics, and portable output.
- Generated compile tests install/check/build generated-owned outputs without
  starting the full stack.
- Generated runtime tests start generated-owned runtimes and verify browser,
  API, and persistence behavior.
- Heuristic marker checks prove instrumentation exists, not that the generated
  app works. Pair them with a contract, compile, or runtime proof for
  user-impacting behavior.

## Engine

```bash
npm test
```

## Repo gates

```bash
bash ./scripts/verify-engine.sh
bash ./scripts/verify-cli-package.sh
```

`verify-engine.sh` is engine-scoped. Release-facing changes use the broader
preflight:

```bash
npm run release:preflight
```

The release preflight runs docs/RAG checks, root Topogram validation, strict SDLC
validation, secret scanning, engine verification, and packed CLI smoke.

## Evaluation harness tests

The slice-benefit tests in the fast engine suite cover reusable evaluation
harness behavior: scenario resolution, mock runs, scaffold/implementer contracts,
report and trace artifacts, review packet generation, security boundaries, and
portable output. They must stay deterministic and local.

Fast CI does not run paid provider trials, human review, subjective visual
judgment, or optional browser evidence. Those remain manual or scheduled
evidence lanes. When testing generated UI in fast CI, assert semantic structure
and role visibility rather than exact presentation casing or incidental copy.

## Generated runtime E2E

```bash
npm run test:generated-runtime
```

`test:generated-runtime` writes `.tmp/generated-runtime-e2e`, derives a
local-first generated stack, compiles it, starts it, opens the journey-backed web
route with Playwright, calls the generated API, and verifies SQLite-backed
behavior through seeded API readback. It installs browser/runtime dependencies,
so it runs manually and on the scheduled `Generated Runtime E2E` workflow rather
than in the fast PR gate.

## Generated app smoke

```bash
npm run smoke:test-app
```

`smoke:test-app` writes `.tmp/smoke-test-app` and must run the generated
starter's verification surface after generation.

## Boundary strength report

```bash
npm run test:boundary-strength
npm run test:boundary-strength:ratchet
```

This advisory report scans generated-output tests for heavy reliance on
existence, marker, and string checks versus boundary checks such as CLI status,
JSON contract parsing, npm compile commands, runtime checks, and runtime E2E
proofs.

`test:boundary-strength` is the readable advisory report. The ratchet command
compares the current scan against `scripts/test-boundary-strength-baseline.json`
and fails only when high-risk/watch counts or a tracked file's
heuristic-to-boundary ratio gets worse.

## Optional browser review-form proof

Static review-form tests run in the fast suite. The browser interaction proof is
optional because Playwright is not a core dependency:

```bash
npm install --no-save playwright
npx playwright install chromium
node --test engine/tests/active/slice-benefit-evaluation.test.js
```

When Playwright is available, the test opens a generated local `review.html`,
fills blind subject scores, exports receipt JSON, and proves
`review-ingest` accepts it. Without Playwright, that subtest skips cleanly.

## Docs

Documented command shapes should execute in tests or be clearly marked as
environment-dependent.
