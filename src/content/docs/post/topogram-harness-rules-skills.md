---
title: "Topogram, Harnesses, Tools, Rules, and Skills"
description: "Topogram gives agents structured app context that harnesses, tools, rules, and skills do not provide by themselves."
---

> Topogram gives agents structured app context that harnesses, tools, rules, and skills do not provide by themselves.

- **Status:** Current
- **Created:** 2026-05-28
- **Modified:** 2026-05-29
- **Read time:** ~3 minutes
- **Audience:** Developers, product owners, and technical evaluators
- **Use when:** You need to explain where Topogram fits beside agent harnesses, graph tools, rules, and skills.

Topogram is easy to confuse with the rest of an AI coding workflow.

That's understandable. The workflow is getting crowded. Harnesses run agents.
Tools inspect repos. Rules constrain behavior. Skills teach repeated workflows.

Topogram is different. It is the **app map those pieces can use**.

That distinction matters because many agent failures aren't caused by a lack of
instructions. They happen because the agent doesn't know enough about the system
it is changing. It reads files, infers intent, makes a local plan, and hopes the
surrounding architecture agrees.

Harnesses, tools, rules, and skills all help. They just solve **different
coordination problems**.

## Harnesses run the agent

An AI coding harness is the runtime around the agent. It provides tools, shell
access, approval flows, file editing, tests, model settings, and sometimes task
queues or memory.

A good harness answers questions like:

- What can the agent read?
- What can it edit?
- Which commands can it run?
- Who approves risky actions?
- How does a patch become a commit?

That's important infrastructure, but it isn't the product model. A harness can
give the agent access to a repository. It doesn't automatically explain the
repository's **intent**, **ownership**, **contracts**, or **proof expectations**.

Topogram is useful inside a harness because it gives the harness a better source
of project context.

## Rules constrain behavior

Rules are durable instructions. They tell humans and agents how work should be
done. Examples include "run tests before committing," "do not edit generated
files," or "write posts in a concise technical voice."

Rules are valuable because they are simple and portable. They set expectations
without requiring a database or a runtime.

The limit is that rules are usually broad. A rule can say "read focused context
before editing." It can't, by itself, know which capability, surface, workflow,
or verification applies to a specific task.

Topogram can connect the rule to **concrete project records**.

## Skills teach workflows

Skills are reusable procedures. They teach an agent how to do a class of work:
generate an image, inspect a Starlight site, update docs, or follow a repository
specific coding workflow.

Skills are strongest when the task pattern repeats across projects. They reduce
setup cost and keep the agent from relearning a workflow every time.

The limit is that a skill is still mostly procedural. It can say how to work,
but it usually doesn't contain the current app graph. It doesn't know which
entity owns a workflow, which rule a task must respect, or which verification
proves the change.

Topogram supplies the **project-specific graph**.

## Tools inspect the repo

Code intelligence tools help agents understand what already exists. Tools like
Graphify can build a knowledge graph from code, docs, diagrams, and other
repository artifacts. That graph can make exploration faster and reduce the
amount of raw source an agent needs to reread.

This is useful because codebases are large and unevenly documented. A graph tool
can surface important symbols, relationships, clusters, and surprising links
that normal search might miss.

The limit is ownership and intent. An extracted graph can describe what the
repository appears to contain. It may not know what the team intended, which
parts are generated, which rules are binding, which decisions are current, or
which verification proves a new change.

Topogram can work beside those tools. A repository graph can help explain the
current code. Topogram explains the **app map the team wants agents to work
from**.

## Topogram maps the app and the work

Topogram stores structured records in a `topo/` workspace. Those records can
describe app intent, entities, capabilities, surfaces, widgets, workflows,
rules, decisions, requirements, tasks, and verification.

That lets humans and agents ask more precise questions:

- What part of the app does this task affect?
- Which rules constrain this capability?
- Which files or outputs are generated, maintained, or local?
- Which verification proves this requirement?
- What focused slice should an agent read before editing?

This is where Topogram helps most. It turns general guidance into bounded
context. Instead of telling an agent to "understand the repo," Topogram can give
the agent the relevant slice of the app map, the work record, and the proof
target.

## The practical benefit

Topogram doesn't replace harnesses, tools, rules, or skills. It makes them more
useful.

The harness runs the agent. Tools inspect the repo. Rules constrain behavior.
Skills teach workflows. Topogram tells the agent **what is true about this app
and this change**.

That is the benefit: less repo rediscovery, fewer guesses about ownership and
intent, and clearer proof that a change matches the system the team meant to
build.
