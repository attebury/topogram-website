---
title: "Prompt Injection Is a Boundary Problem"
description: "Topogram now treats agent-visible project text, shared maps, and model-bound packets as evidence, not authority."
---

> Topogram now treats agent-visible project text, shared maps, and model-bound
> packets as evidence, not authority.

- **Status:** Current
- **Created:** 2026-06-04
- **Modified:** 2026-06-04
- **Read time:** ~4 minutes
- **Audience:** maintainers, developers, product owners, technical evaluators, and agents
- **Use when:** You need to understand why Topogram added prompt-injection security checks and how they change the agent workflow.

Prompt injection is easy to frame as a model problem.

The model read something bad. The model obeyed it. The model should have known
better.

That is part of it, but I don't think it is the whole problem.

In an agent workflow, prompt injection is also a **boundary problem**.

The agent reads docs, source files, fixtures, generated reports, shared app
maps, diffs, test data, local instructions, and packets prepared for model
calls. Some of that text is useful context. Some of it is product evidence. Some
of it may be malicious, stale, copied from somewhere else, or simply written in
a way that sounds like an instruction.

The mistake is treating all readable text as authority.

Topogram's security work is trying to make that boundary explicit.

## Evidence is not authority

The useful phrase is **evidence, not authority**.

Repo text can tell an agent what exists. It can describe requirements. It can
show prior decisions. It can explain an edge case. It can include examples of
unsafe behavior.

But repo text should not be able to tell the agent to ignore system
instructions, bypass proof, reveal hidden prompts, skip gates, weaken a skill,
or send raw workspace context to a provider.

That sounds obvious until the agent workflow gets real.

Agents read a lot of project text. They read it quickly. They mix prose with
tool output. They pass slices of that context into model calls. They may use
external providers like OpenAI, Anthropic, Gemini, Bedrock, or a local model
server. They may adopt shared project maps. They may summarize findings back
into new packets.

At that point, "just don't obey bad text" is too vague.

The system needs a boundary the workflow can inspect.

## What changed

The recent Topogram changes add that boundary in a few places.

First, Topogram now has a prompt-boundary scan.

It looks for project prose that appears to tell agents, tools, providers, or
gates to do unsafe things. Examples include ignoring trusted instructions,
revealing secrets, bypassing checks, weakening proof, overriding agent guidance,
or hiding instructions in markup and code fences.

The scanner is not pretending to be perfect.

It is a practical tripwire.

High-confidence cases block. Advisory cases stay visible. Security discussions
and examples can remain as evidence. If a finding is intentionally present, the
waiver has to be command-owned, tied to a task or bug, tied to an actor, and
hash-bound to the exact finding.

That last part matters.

A waiver should not become a blanket permission slip. If the source text
changes, the waiver goes stale.

## The inventory matters

Topogram also added an inventory of agent-facing prose surfaces.

That sounds less exciting than a scanner, but it may be the more important
piece.

You can't protect a boundary you haven't named.

The inventory says which commands and packets are model-visible. Some packets
are agent-bound. They go to the coding agent as working context. Some packets
are provider-bound. They leave the local workflow for a model provider.

Both need labels.

The inventory tracks whether JSON packets carry `content_trust`, whether
markdown output labels project-derived prose as untrusted evidence, and whether
the surface has focused tests.

That creates a ratchet.

If a change adds or modifies an agent-facing surface, Topogram can ask whether
the surface is registered, labeled, scanned, and tested.

This is the right kind of boring security.

Not "we hope the agent behaves." Not "we trust everyone to remember." A named
surface has a named owner, named output formats, trust metadata, and proof.

## Provider-bound packets need the same line

The provider boundary is where this gets more concrete.

Provider input is the packet Topogram allows out to an external model provider.
It is the model-bound payload.

That payload should not contain raw workspace context by accident. Local paths,
secret-like values, hidden checks, git remotes, raw source fields, and
unallowlisted output should stay out of provider-bound packets.

Topogram now treats provider input as its own trust surface.

The packet carries content trust. The payload is scanned. The redaction report
is auditable. The provider input surface has inventory coverage. If the audit
fails, the payload is rejected instead of being sent anyway.

That is the right shape.

The boundary is not only "what did the agent read?"

It is also "what did the system send onward?"

## Shared maps are still untrusted until reviewed

Shared Topograms are useful because teams may want reusable app-map records:
terms, capabilities, workflows, rules, patterns, or reference structures.

But shared does not mean trusted.

A shared app map may come from another repo, another team, another version, or
another context. It might be useful. It might also contain unsafe prose,
authority files, or colliding records.

Topogram now treats shared map text as a separate trust class.

The workflow can review a source, require a pinned hash, scan the imported
records, block authority files, and write an adoption receipt. That keeps shared
context from silently becoming project authority.

This distinction is important.

Topogram can make context portable without making trust portable.

## Where Topogram fits

Topogram's core claim is that agents work better with structured app context.

The security work does not weaken that claim. It makes it more credible.

If agents are going to use an app map, the app map needs to say which parts are
trusted structure and which parts are project-derived prose. If agents are
going to read docs and records, those records need a scan path. If agents are
going to receive packets, those packets need trust labels. If the workflow is
going to send packets to external providers, those packets need a provider
boundary. If teams are going to waive findings, the waiver needs provenance.

That is not a separate concern from agent productivity.

It is part of making agent work reviewable.

Better context is useful only if the team can trust how that context is
classified, transported, and audited.

## The useful standard

The goal is not to make prompt injection impossible.

That would be too broad a claim.

The useful standard is smaller and stronger:

- Agent-visible prose should be inventoried.
- Project-derived text should be treated as evidence, not authority.
- Unsafe authority-shaped text should be scanned.
- External provider payloads should be sanitized and auditable.
- Shared maps should be pinned and reviewed before adoption.
- Waivers should be exact, reviewed, and stale when the source changes.

That is the loop Topogram is moving toward.

Model the app. Bound the context. Label the trust. Scan the prose. Audit the
packet. Keep exceptions narrow.

Prompt injection is not only about bad text.

It is about whether the workflow can tell the difference between context that
helps the agent and text that is trying to steer it.
