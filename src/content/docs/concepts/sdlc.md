---
title: "SDLC"
description: "Topogram can make project work traceable inside topo/."
---

# SDLC

> Topogram can make project work traceable inside topo/.

Status: current
Audience: maintainers, product owners, and agents using Topogram SDLC
Use when: you need SDLC record meanings, transitions, or proof expectations.

Topogram can make project work traceable inside `topo/`.

Projects opt in with `topogram.sdlc-policy.json`. Missing policy means SDLC
commands still work, but `topogram sdlc gate` reports `not_adopted` unless
`--require-adopted` is passed.

## Adoption Profiles

Topogram's default SDLC profile is `standard`: lightweight, enforced repo
discipline for maintainers and agents. It uses `topogram.sdlc-policy.json`, task
start packets, proof links, `sdlc prep commit`, and `sdlc gate` to keep
non-trivial work traceable without enterprise audit metadata.

The optional `audit` profile is stricter. For protected changes, it requires
task-backed work to declare `risk_class` and `change_type`, have at least one
passing verification run receipt, and keep exemptions tied to a valid SDLC item
with a specific reason. It also surfaces future audit obligations such as
explicit approval/reviewer metadata, release audit-trail exports, and regulated
or signed history profiles. Those obligations should not become the default for
small teams.

Use `mode: "advisory"` when a project wants reports without failures. Regulated
profiles are intentionally deferred until the standard and audit profiles are
coherent.

```json
{
  "version": "1",
  "status": "adopted",
  "mode": "enforced",
  "profile": "standard"
}
```

## Records

Recommended layout:

```text
topo/sdlc/
  pitches/
  requirements/
  acceptance_criteria/
  tasks/
  plans/
  bugs/
  decisions/
  _archive/
```

Use one record per file for SDLC kinds. Plans may contain multiple nested step
definitions.

## Normal loop

```bash
topogram sdlc policy explain --json
topogram query sdlc-backlog ./topo --json
topogram query sdlc-available ./topo --json
topogram query sdlc-ready ./topo --json
topogram sdlc start <task-id> . --actor actor_coding_agent --json
topogram sdlc start <task-id> . --actor actor_coding_agent --write --json
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
topogram query verification-runs ./topo --task <task-id> --json
topogram query sdlc-metrics ./topo --json
topogram query sdlc-stale-work ./topo --json
topogram sdlc prep commit . --base origin/main --head HEAD --json
topogram sdlc gate . --base origin/main --head HEAD --require-adopted --json
```

The default `sdlc start` call is read-only. It returns the task, linked
requirement, acceptance criteria, decisions, rules, blockers, plans, query
commands, write-scope hints, and verification targets. Add `--write` only after
reviewing that packet; the command then owns the legal transition from
`unclaimed` or same-actor `claimed` work to `in-progress`.

## Chain Of Proof

Use the smallest SDLC record that tells the truth:

- `pitch`: why a backlog theme matters.
- `requirement`: durable behavior the project commits to.
- `acceptance_criterion`: observable proof. Approved criteria use
  `Given ... when ... then ...` wording.
- `task`: one implementation-sized slice.
- `verification`: proof command, test, check, or CI gate.
- `decision`: durable choice.
- `bug`: violation of an accepted rule, requirement, or verified expectation.
- `plan`: optional nested execution notes for a task.

Done tasks require valid `satisfies` refs to requirements, approved
`acceptance_refs`, and valid `verification_refs`.

Finite requirements stay `approved` until done tasks prove them, then they can
transition to `satisfied`. Durable operating commitments can transition to
`ongoing`; ongoing requirements must link to at least one rule or verification
and are intentionally omitted from available-work and closeout queues.

Use `topogram query sdlc-grooming ./topo --json` for lifecycle cleanup after
work lands. It shows requirements ready to become `satisfied` or `ongoing`,
pitches ready to become `covered`, plans ready to complete or supersede, and
stale pitches that still need review.

Use `topogram query sdlc-backlog ./topo --json` for unresolved backlog shaping.
It shows draft/shaped/submitted pitches, draft or in-review requirements, draft
journeys, and draft plans. Covered pitches, satisfied requirements, ongoing
requirements, and completed work are intentionally omitted.

Use `topogram query sdlc-ready ./topo --json` before claiming work. It combines
startable tasks, blocked tasks, claimed tasks, proof gaps, latest verification
receipts, risk classification, change type, and next commands.

Before completing work:

```bash
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
topogram sdlc verify record <verification-id> . --task <task-id> --actor actor_coding_agent --command "<command you ran>" --status pass --write --json
topogram sdlc complete <task-id> . --verification <verification-id> --actor actor_coding_agent --write
```

`sdlc verify record` records evidence only; it does not execute commands. It
writes portable JSONL receipts under `topo/sdlc/.topogram-verification-runs.jsonl`.
Use task `risk_class` and `change_type` when the work needs a stronger proof
posture, for example `risk_class high` and `change_type security`.

Use `topogram query sdlc-claimed ./topo --actor <actor-id> --json` to see work
already claimed by an actor. Use `topogram query sdlc-blockers ./topo --task
<task-id> --json` when a task cannot start or complete.

Use `topogram query sdlc-metrics ./topo --json` for counts, WIP, stale work,
closeout candidates, proof gaps, ongoing requirements, and transition-duration
statistics derived from `.topogram-sdlc-history.json`. Use
`topogram query sdlc-stale-work ./topo --json` for the focused stale/WIP policy
view. Projects can optionally add `wipLimits` and `staleWork` thresholds to
`topogram.sdlc-policy.json`; advisory policies warn, enforced policies can fail
protected-change gates unless an allowed exemption is supplied.

## Command-owned state

Humans and agents may edit declarative `.tg` text directly. Use commands for
stateful mutations:

| State | Command path |
| --- | --- |
| `topo/sdlc/.topogram-sdlc-history.json` | `topogram sdlc transition` and `topogram sdlc plan step ... --write` |
| `topo/sdlc/_archive/*.jsonl` | `topogram sdlc archive`, `topogram sdlc unarchive`, and `topogram sdlc compact` |
| `.topogram-template-trust.json` | `topogram trust status`, `topogram trust diff`, and `topogram trust template` |
| `.topogram-template-files.json` | `topogram trust template` and reviewed `topogram template update ...` commands |
| `.topogram-source.json` | `topogram copy` and `topogram source status` |
| `.topogram-extract.json` and `.topogram-adoptions.jsonl` | `topogram extract status` and `topogram extract history --verify` |
| `app/.topogram-generated.json` | `topogram generate` |
| Written emitted artifacts | `topogram emit --write` |
| Release status reports and rollout evidence | `topogram release status` and `topogram release roll-consumers` |
