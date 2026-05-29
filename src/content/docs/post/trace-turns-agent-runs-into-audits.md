---
title: "Trace Turns Agent Runs Into Audits"
description: "Topogram trace turns completed agent runs into evidence for trust, review, and improvement."
---

> Topogram trace turns completed agent runs into evidence for trust, review,
> and improvement.

- **Status:** Current
- **Created:** 2026-05-29
- **Modified:** 2026-05-29
- **Read time:** ~4 minutes
- **Audience:** maintainers, developers, product owners, technical evaluators, and agents
- **Use when:** You need to understand why Topogram trace exists and how it makes agent work reviewable after the run.

Agent work is easy to watch and hard to audit.

You can:

- read the final diff
- skim the transcript
- count tokens
- review tests

Those are useful signals, but they aren't enough.

The useful question is sharper:

**Did the run deserve trust?**

Topogram trace turns a completed agent run into evidence that can be **reviewed**, **compared**, and **improved**.

## The diff is not the whole run

A finished diff can look reasonable while hiding the cost of getting there.

Maybe the agent read half the repo before finding the right file. Maybe it
asked for the same next action three times. Maybe it skipped the proof. Maybe
it never used the scaffold named in the app-map packet.

The change may still pass.

That doesn't mean the workflow was good.

Agent performance is **how the run moved through the work**, not just the final
output.

If the path was noisy, that noise is _product feedback_.

It may mean the packet was too broad. It may mean the next command was unclear.
It may mean the docs hid the real workflow. It may mean the harness surfaced
proof too late. It may mean the model did fine, but the operating surface was
not decisive enough.

Trace gives that review somewhere to happen.

## Trace is an audit surface

`topogram trace` reads a completed run and asks what actually happened.

It can look at run manifests, usage logs, tool results, model calls, proof
outcomes, and transcripts when they exist. With an audit bundle, it can **compare
the observed run against the workflow context** the agent was expected to use.

The command shape is intentionally direct:

```bash
topogram trace analyze <run-dir> --audit-bundle <bundle-dir> --json
topogram trace report <run-dir> --audit-bundle <bundle-dir> --format markdown
topogram trace compare <run-a> <run-b> --json
```

The input can come from any run that matters enough to inspect.

We want an **inspectable** run, not a perfect judge.

An audit should answer practical questions:

- What did the agent actually read?
- Which tools did it call?
- How many model calls and tokens did it use?
- Did it follow the expected workflow?
- Did it run proof?
- Where did it spend extra attention?
- What would make the next run cleaner?

That moves review from **vibes to evidence**.

## Token usage was the first clue

One reason we started using trace was practical: token usage is visible.

When an agent run uses far more context than expected, something usually
happened. Maybe the packet was too vague. Maybe the agent searched broadly
because the target was not clear. Maybe the docs pointed at the right concept
but not the right file. Maybe the agent repeated the same command state because
the next action was not decisive.

Token totals do not tell the whole story, but they are a useful smoke alarm.

The real value is not "this run used fewer tokens." A cheap run can skip proof.
A costly run can produce durable learning.

The useful question is whether the tokens were spent on **relevant context** or
on avoidable wandering.

Trace pairs usage with path evidence. It can show model calls,
observed tools, files read, proof outcomes, and packet estimates together.

The team can see whether a token spike came from necessary work, weak guidance,
or missing structure.

That makes token usage less like a scoreboard and more like a diagnostic.

## Smells are product feedback

`topogram trace` reports attention smells. They are not hard failures by
default, but they do flag the need for further review.

- A large actual-vs-packet token delta may mean the packet did not localize the
  work.
- Repeated `work next` states may mean the next action was not decisive
  enough.
- Excessive file reads may mean edit targets were too broad.
- Skipped proof may mean the result is weaker than it looks.
- Expected scaffold that was not used may mean generator status or harness
  gating needs review.

None of that automatically means the run was bad.

It means the run is telling us something.

That distinction is important.

If every smell becomes a gate, trace becomes another brittle compliance tool.
If every smell is ignored, trace becomes decorative logging.

The useful middle is **audit**.

Ask what the smell says about the system. Then decide whether it should become
a CLI packet improvement, generator improvement, docs improvement, harness fix,
or backlog note.

## After-action record

The after-action record is the most important part of a trace.

After a meaningful agent run, the team should be able to answer a few basic
questions without reconstructing the whole session from memory:

- What context did the agent receive?
- What context did it actually use?
- Which files did it inspect?
- Which tools did it call?
- Which proof did it run?
- Where did it spend attention that the packet should have avoided?
- What should change before the next run?

That is a different posture from "the diff looks fine."

The diff is the artifact. The trace is the **path evidence**.

That matters because agent work creates a **new review problem**. The human may
not have watched every step. The agent may have made reasonable choices for bad
reasons. The tests may pass while the run still shows weak context, missing
proof, or unclear ownership.

Trace gives the team a place to **inspect that path**.

- If the run failed, ask whether the app map, packet, scaffold, docs, or proof
  surface made failure more likely.
- If the run passed, ask whether it passed with clean attention or got lucky.
- If proof was absent, treat the result as weaker evidence.
- If the agent had to read widely, ask whether the packet localized the
  work well enough.

We want to make the **next run more explainable**.

## Auditing makes claims safer

Topogram is making a structural claim: agents can work better when they receive
bounded app context, ownership, contracts, and proof before editing.

That claim needs evidence.

Not just screenshots. Not just polished demos. Not just final diffs.

It needs **auditable runs** that show what the agent was expected to do, what it
actually did, where it spent attention, what proof it ran, and what the team
changed after learning from the result.

It should show its **learning loop**.

Trace makes that loop visible.

The loop is simple:

```text
run -> trace -> inspect -> improve context -> run again
```

That is the maintenance workflow for agent-assisted software.

## Where Topogram fits

Topogram already gives agents a map before the run. Trace looks at what
happened after the run.

Those two sides belong together.

The app map says what should matter. The audit bundle says what context the
agent should have received. The trace says what the agent actually did. The
report turns that difference into reviewable evidence.

That creates a stronger workflow:

- Model the work.
- Give the agent a focused packet.
- Run the agent.
- Audit the path.
- Improve the packet, docs, scaffold, or proof.
- Run again.

This is not faster editing. It is **better structure around agent work**.

If agents are going to change important code, teams need to audit more than the
final diff.

They need to audit **the path that produced it**.
