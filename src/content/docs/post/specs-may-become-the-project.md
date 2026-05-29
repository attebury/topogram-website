---
title: "Specs May Become the Project"
description: "AI may make specs one of the most valuable parts of an open source project."
draft: true
---

> AI may make specs one of the most valuable parts of an open source project.

- **Status:** Draft
- **Created:** 2026-05-29
- **Modified:** 2026-05-29
- **Read time:** ~4 minutes
- **Audience:** maintainers, contributors, product owners, developers, and agents
- **Use when:** You need to think through why specs may become more valuable as AI changes how software is built.

Open source projects have usually been judged by their code.

That makes sense. Code runs. Code proves the idea can exist. Code is what users
install, fork, debug, and depend on.

But AI may change what the most valuable part of a project is.

_If_ agents can write more of the code, then the scarce asset may not be the
implementation. The scarce asset may be the **spec**.

## The code gets easier to produce

This doesn't mean code becomes unimportant. Bad code still breaks users. Slow
code still costs money. Insecure code still creates risk. Maintainers still need
judgment.

But some kinds of code may become easier to produce, replace, or regenerate.

Boilerplate can be generated. Tests can be suggested. APIs can be scaffolded.
Migrations can be drafted. UI states can be implemented from a component map.
Ports between frameworks may become less painful.

The implementation still matters, but it may stop being the only durable center
of gravity.

The hard question becomes: **what should the software be?**

## Specs carry the intent

A good spec is not just a planning document. It is the place where product
intent, system boundaries, behavior, and proof become visible.

It says:

- What problem the project solves.
- What should be true for users.
- What behavior is promised.
- What tradeoffs are accepted.
- Which interfaces are stable.
- Which changes are out of bounds.
- How maintainers know the work is correct.

That is the part agents cannot reliably infer from code alone.

Code can show what the system currently does. It doesn't always show what the
system meant to do, what it must not do, or what maintainers are trying to
preserve.

The spec is where those decisions live.

## Open source may feel this first

Open source projects already depend on shared context. Contributors arrive with
different goals, different levels of experience, and different assumptions about
the project.

Maintainers spend a lot of time answering the same questions:

- Is this behavior intentional?
- Is this API stable?
- Should this edge case be supported?
- Does this change belong here?
- What proof would make this acceptable?

AI will multiply those questions.

More people will be able to produce plausible patches. More agents will be able
to open pull requests. More forks will try alternate implementations. That can
be useful, but it also increases the burden on maintainers.

The bottleneck may move from **who can write the patch** to **who can tell
whether the patch belongs**.

Specs help answer that.

## The spec becomes a coordination surface

If AI makes implementation cheaper, specs may become the coordination surface
between humans, agents, and maintainers.

A contributor can read the spec before proposing work. An agent can query the
spec before editing. A maintainer can review a patch against stated behavior
instead of reconstructing intent from old issues, comments, and local memory.

That changes the role of the spec.

It is not just documentation after the fact. It is **project memory**.

It can guide:

- Feature boundaries.
- Contributor onboarding.
- Agent tasks.
- Review criteria.
- Compatibility promises.
- Test expectations.
- Release decisions.

The more fluid the implementation becomes, the more valuable that memory gets.

## Specs need to be operational

The weak version of this is a long document nobody trusts.

That won't be enough.

If specs become valuable, they need to be close to the work. They need to be
structured enough for agents to query, specific enough for maintainers to review
against, and current enough that contributors believe them.

A useful spec may need to connect to:

- Requirements.
- Public APIs.
- Workflows.
- UI surfaces.
- Data rules.
- Security boundaries.
- Accepted tradeoffs.
- Verification.

The spec becomes stronger when it can name the proof.

Not just "the project should be fast," but which behavior should hold, which
tests should pass, which compatibility promise matters, and which change would
violate the project.

## Where Topogram fits

Topogram is useful if specs need to become more than prose.

The app map can make a spec operational. It can connect requirements to
capabilities, entities, surfaces, workflows, rules, tasks, and verification.
That gives humans and agents a way to ask, "What does this change affect?" before
they edit.

It also gives maintainers a review target.

Instead of asking whether a generated patch looks plausible, they can ask
whether it matches the named requirement, touches the expected graph nodes, and
passes the proof that defines done.

That doesn't replace maintainer judgment. It gives judgment a structure.

## A possible shape

_If_ AI keeps making code easier to produce, open source projects may compete on
the quality of their specs.

The best projects may not be the ones with the most code. They may be the ones
with the clearest intent, the strongest boundaries, the best proof, and the most
useful project memory.

Code still matters. But in an agent-assisted world, code may become easier to
change than intent.

The spec may become the part of the project that tells everyone what should stay
true.
