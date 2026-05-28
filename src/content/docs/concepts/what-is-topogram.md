---
title: "What Topogram Is"
description: "Topogram is a living app map that gives humans and agents bounded context, contracts, ownership, and proof before they change software."
---

# What Topogram Is

> Topogram is a living app map that gives humans and agents bounded context, contracts, ownership, and proof before they change software.

Status: current
Audience: evaluators, developers, agents, and technical decision makers
Use when: you need the shortest explanation of what Topogram is, what it is not, and why it is useful.

Topogram helps a team answer: what does this app do, who owns each output,
which contracts matter, what can be generated, what must be maintained, and
which proof commands show the change is safe?

## What It Does

- Creates a `topo/` app map with data, API, UI, CLI, runtime, rule, and SDLC
  records.
- Extracts reviewable candidates from brownfield code without mutating the
  source app.
- Promotes only reviewed candidates into canonical `topo/` source.
- Gives agents focused slices, write scope, rules, and verification commands.
- Emits contracts, migration plans, reports, and proof artifacts.
- Generates app/runtime output when ownership is generated.
- Guides maintained app edits when humans or agents own the source.

## What It Is Not

- Not just a code generator. Generation is one output of the app map.
- Not a no-code tool. Humans still review, adopt, and maintain source.
- Not a framework replacement. Generators and maintained apps still use normal
  framework code.
- Not a project manager. SDLC records exist to connect work to requirements,
  proof, and agent context.
- Not a promise of pixel-perfect UI parity. UI beta proof is semantic: contracts,
  display fields, markers, compile checks, and realization reports.

## Best First Demo

Use the brownfield proof when you want to see the main differentiator quickly:

```bash
git clone https://github.com/attebury/topogram-proof-content-approval-brownfield-v3.git
cd topogram-proof-content-approval-brownfield-v3
git checkout proof-03-adopt-app-map
npm install
npm run verify
```

That checkpoint shows existing React/Express/Prisma code becoming reviewed
`topo/` source. Extraction evidence stays separate, the original app remains
maintained, and agents get focused packets before feature work.

## When To Use It

Use Topogram when agents or humans need to make app changes from a smaller,
verified operating surface than the full repository. It is especially useful for
brownfield discovery, generated-to-maintained workflows, database migration
planning, UI contract proof, and teams that want change work tied to explicit
requirements and verification.
