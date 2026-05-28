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
```

This advisory report scans generated-output tests for heavy reliance on
existence, marker, and string checks versus boundary checks such as CLI status,
JSON contract parsing, npm compile commands, runtime checks, and runtime E2E
proofs. It is a ratchet aid, not a release gate.

## Docs

Documented command shapes should execute in tests or be clearly marked as
environment-dependent.
