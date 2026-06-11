---
title: "The Process Behind Remogram Beta"
description: "Remogram beta came out of a local Gitea workflow, private dogfood lanes, and a clean public product boundary."
draft: true
---

> Remogram beta came out of a local Gitea workflow, private dogfood lanes, and a
> clean public product boundary.

- **Status:** Draft
- **Created:** 2026-06-11
- **Modified:** 2026-06-11
- **Read time:** ~3 minutes
- **Audience:** maintainers, developers, product owners, technical evaluators, and agents
- **Use when:** You want the process story behind Remogram beta and how it connects to Topogram dogfood.

Related repos:

- [Remogram](https://github.com/attebury/remogram)
- [remogram-smoke on GitLab](https://gitlab.com/attebury/remogram-smoke)
- [remogram-smoke on GitHub](https://github.com/attebury/remogram-smoke)
- [remogram-smoke on Gitea](https://gitea.com/attebury/remogram-smoke)
- [Topogram](https://github.com/attebury/topogram)

Remogram did not start as a polished product exercise.

It started with friction.

A hosted AI coding workflow burned through GitHub-backed usage too quickly. The
loop felt expensive and slow. I wanted more iteration, less waiting, and less
token pressure around the forge.

So active development moved to a local Gitea instance.

That changed the speed of the work.

Branch, PR, review, and merge experiments became cheap enough to run repeatedly.
The forge was local. The repo was close. The agent loop could move faster.

It also clarified the product.

Agents still needed forge facts in a consistent shape.

## Local forge, clearer boundary

Local Gitea did not remove the need for GitHub or GitLab support. It made the
cross-forge problem easier to see.

GitHub, GitLab, and Gitea expose similar concepts with different APIs,
different payloads, and different confidence levels. Agents need to understand
those facts without treating forge prose as instructions.

That became Remogram's narrow job:

- Read forge state.
- Normalize provider differences.
- Bind facts to providers, remotes, repos, and SHAs.
- Keep output free of workflow authority.

The local setup increased velocity, but the product boundary stayed generic.

## Private process, public product

Remogram is being dogfooded on a private Gitea integration branch named `remo`.
The private process uses Topogram records and lane-specific agent skills for
planning, implementation, review, verification, and merge work.

That process can be strict because it is private.

Planning can live in Topogram records. Review can classify a PR without merging
it. Verification can produce receipts. Merge work can happen in a separate lane.
The repo can keep the evidence trail that made the beta credible.

The public product should not carry that machinery.

Remogram packets must not contain `goal_branch`, `lane`, `sdlc_task`, or other
Topogram workflow fields. Those are process facts, not forge facts.

That split is the design:

- Public Remogram stays product-only.
- Private dogfood keeps the evidence trail.
- GitHub can show a clean exported history.
- The private repo can preserve the work history that made the release credible.

**The public product is the boundary. The private process is the proof.**

## Why the smoke repos matter

The `remogram-smoke` repos make the beta easier to test without touching a real
project first.

They provide the same small fixture across GitLab, GitHub, and Gitea. That gives
Remogram a place to compare `doctor`, `repo status`, `refs compare`, `pr view`,
`pr checks`, `merge plan`, and `sync plan` across providers.

That matters because Remogram is not only wrapping forge APIs.

It is trying to make the shape of forge facts stable enough for agents.

## Where Topogram fits

Topogram maps the work. Remogram reports forge state.

Used together, an agent can ask Topogram what the change means, what owns it,
and which verification applies. Then it can ask Remogram what the forge says
right now.

Agent work needs both: product intent and current external facts.

The useful split is simple.

Topogram should not pretend to be a forge adapter. Remogram should not become a
workflow engine.

Keep the boundary small. Keep the proof visible. Make the next action easier to
review.
