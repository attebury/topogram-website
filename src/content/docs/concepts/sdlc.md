---
title: "SDLC"
description: "Topogram SDLC keeps work, ownership, proof, and command-owned state traceable inside `topo/`."
---

# SDLC

> Topogram SDLC keeps work, ownership, proof, and command-owned state traceable inside `topo/`.

Status: current
Audience: maintainers, product owners, and agents using Topogram SDLC
Use when: you need SDLC record meanings, transitions, or proof expectations.

Topogram SDLC exists so humans and agents do not treat project management as
unstructured chat. It connects product intent to implementation work and proof:
requirements say what must be true, tasks define bounded work, verification
records say how to prove it, and command-owned history records state changes.

SDLC is optional for ordinary Topogram use. When adopted with
`topogram init --adopt-sdlc`, it becomes the recommended working habit for
protected changes.

## Why It Helps Agents

An SDLC-backed task gives an agent:

- the requirement and acceptance criteria behind the work;
- blockers, decisions, rules, and ownership context;
- focused query commands and implementation-prep packets;
- verification targets and proof gaps;
- a command-owned way to claim, verify, and complete work.

This keeps reusable workflow state in the CLI instead of in private prompts or
handwritten checklists.

## Adoption Profiles

Projects opt in with `topogram.sdlc-policy.json`.

```json
{
  "version": "1",
  "status": "adopted",
  "mode": "enforced",
  "profile": "standard"
}
```

The default `standard` profile is lightweight and suitable for small teams. It
requires traceable protected changes, task start packets, proof links for done
tasks, and `sdlc prep commit` or `sdlc gate` before closeout.

The optional `audit` profile is stricter. It adds risk/change classification
and stronger verification evidence for protected work. Regulated or signed
history profiles are intentionally future work.

Use `mode: "advisory"` when a project wants reports without failing gates.

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

Use one record per file for SDLC kinds.

| Kind | Job |
| --- | --- |
| `pitch` | Explain why a backlog theme matters. |
| `requirement` | State durable behavior the project commits to. |
| `acceptance_criterion` | Define observable proof, usually `Given ... when ... then ...`. |
| `task` | Hold one implementation-sized slice. |
| `bug` | Record a violated rule, requirement, or verified expectation. |
| `decision` | Preserve a durable choice and rationale. |
| `verification` | Name a proof command, test, check, or CI gate. |
| `plan` | Optional nested execution notes for a task. |

Done tasks require valid `satisfies`, `acceptance_refs`, and
`verification_refs`.

## Normal Loop

Start read-only:

```bash
topogram sdlc policy explain --json
topogram query sdlc-ready ./topo --json
topogram sdlc start <task-id> . --actor actor_coding_agent --json
```

Review the returned packet. It includes blockers, rules, decisions, proof gaps,
verification targets, and next commands. Claim the work only after that review:

```bash
topogram sdlc start <task-id> . --actor actor_coding_agent --write --json
```

During work, use the task-focused packets:

```bash
topogram query implementation-prep ./topo --task <task-id> --detail compact --json
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
topogram query verification-runs ./topo --task <task-id> --json
```

Before closeout:

```bash
topogram sdlc prep commit . --base origin/main --head HEAD --json
topogram sdlc gate . --base origin/main --head HEAD --require-adopted --json
```

`sdlc verify record` records evidence only. It does not execute the command:

```bash
topogram sdlc verify record <verification-id> . --task <task-id> --actor actor_coding_agent --command "<command you ran>" --status pass --write --json
```

## Backlog And Grooming

Use these reports to understand work state:

```bash
topogram query sdlc-backlog ./topo --json
topogram query sdlc-available ./topo --json
topogram query sdlc-ready ./topo --json
topogram query sdlc-grooming ./topo --json
topogram query sdlc-metrics ./topo --json
topogram query sdlc-stale-work ./topo --json
```

`sdlc-backlog` shows unresolved shaping work. `sdlc-ready` shows startable,
blocked, claimed, and proof-gap work. `sdlc-grooming` shows lifecycle cleanup
after implementation lands.

## Command-Owned State

Humans and agents may edit declarative `.tg` source directly. Use commands for
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

Do not hand-edit history, archives, trust hashes, generated sentinels, or
release evidence to make a gate pass.

<!-- topogram-website:field-notes:start -->

## Field Notes

- [How Topogram Manages SDLC](/post/how-topogram-manages-sdlc/) — why work records, proof, and command-owned state live together.

<!-- topogram-website:field-notes:end -->
