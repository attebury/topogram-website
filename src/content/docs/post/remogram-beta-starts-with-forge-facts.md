---
title: "Remogram Beta Starts With Forge Facts"
description: "Remogram beta gives agents provider-attributed forge facts without turning the forge tool into a workflow engine."
draft: true
---

> Remogram beta gives agents provider-attributed forge facts without turning the
> forge tool into a workflow engine.

- **Status:** Draft
- **Created:** 2026-06-10
- **Modified:** 2026-06-11
- **Read time:** ~2 minutes
- **Audience:** maintainers, developers, product owners, technical evaluators, and agents
- **Use when:** You need a focused introduction to Remogram beta and what it gives agents.

Related repos:

- [Remogram](https://github.com/attebury/remogram)
- [remogram-smoke on GitLab](https://gitlab.com/attebury/remogram-smoke)
- [remogram-smoke on GitHub](https://github.com/attebury/remogram-smoke)
- [remogram-smoke on Gitea](https://gitea.com/attebury/remogram-smoke)
- [Topogram](https://github.com/attebury/topogram)

Remogram is in beta.

It is a generic SCM and forge boundary for agents. It reads forge state,
normalizes it, and returns provider-attributed JSON packets.

It is not a workflow engine. It is not a planning tool. It is not Topogram.

Remogram exists because agents need forge facts without scraping pages, trusting
PR prose as instructions, or guessing merge readiness.

## What agents need

Remogram gives agents a consistent way to ask:

- What repo am I in?
- What provider owns this forge state?
- What PR or MR am I looking at?
- Which SHAs are bound to this fact?
- Are checks present, passing, missing, or unknown?
- What would block a merge?

The important line is **forge facts, not workflow authority**.

## What the beta includes

The beta ships two public packages:

- `@remogram/cli`
- `@remogram/mcp`

It supports three API providers:

- `gitea-api`
- `github-api`
- `gitlab-api`

The v1 command surface is read and plan only:

- `provider capabilities`
- `doctor`
- `repo status`
- `refs compare`
- `pr view`
- `pr checks`
- `merge plan`
- `sync plan`

There is no PR create, merge execute, push, or mutation path in beta.

That is deliberate.

The first version helps an agent understand forge state before it acts. It does
not act for the agent.

## What agents can trust

Every successful Remogram packet has the same basic envelope:

- `type`
- `schema_version`
- `provider_id`
- `remote_name`
- `repo_id`
- `observed_at`
- `ok`

That envelope is the trusted structure. Forge-sourced strings are different. PR
titles, check names, URLs, and other text copied from a forge are sanitized for
shape, but still treated as untrusted prose.

A PR title can describe a change. It should not instruct the agent. A check name
can identify a status. It should not override workflow.

## Beta shape

Install the beta with:

```bash
npm install -g @remogram/cli@beta @remogram/mcp@beta
```

Then configure a repo with `.remogram.json`, set the provider token in the
environment, and start with:

```bash
remogram doctor --json
remogram provider capabilities --json
remogram repo status --json
```

For live cross-forge checks, use the `remogram-smoke` fixture repos before
testing against a production project.

The beta is trying to make one thing reliable: agents should read forge state
through typed, provider-attributed, SHA-bound packets.

Keep the forge facts clear. Keep workflow authority somewhere else. Make the
next action easier to review.
