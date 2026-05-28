---
title: "Topogram Layers and Slices"
description: "Model the app in layers; query slices when it is time to work."
draft: true
---

# Topogram Layers and Slices

> Model the app in layers; query slices when it is time to work.

Status: current
Audience: developers, agents, and technical writers evaluating Topogram
Use when: you need a short explanation of how the app map is structured and how context slices fit in.
Read time: ~2 minutes

Most teams ask humans and agents to change code in repos they only partly
understand. Topogram's answer is structural: keep a validated app map in
**layers**, then query **slices** for bounded context before anyone edits code.

## Layers: intent before implementation

Topogram separates **durable intent** from **stack realization**. The map
lives in `topo/`; generators and maintained apps realize it in framework code.

```mermaid
flowchart TB
  subgraph INTENT["Intent layer"]
    DOM[domain · entity · capability · workflow]
    SDLC[pitch · requirement · task · verification]
    RULES[rules · decisions · terms]
  end

  subgraph CONTRACTS["Contract layer"]
    UI[semantic_ui]
    API[api]
    DB[db]
    CLI[cli]
  end

  subgraph UIMAP["UI work-map sub-layers"]
    direction LR
    SCR[screen] --> LAY[layout] --> REG[region]
    REG --> RENDER[render]
    RENDER --> WID[widget/action/section]
    WID --> MAP[component_map]
    DL[design_language] -.-> MAP
  end

  subgraph PLATFORM["Platform layer"]
    WEB[web · ios · android surfaces]
  end

  subgraph CODE["Stack realization"]
    GEN[generators]
    APP[generated or maintained code]
  end

  subgraph PROOF["Proof layer"]
    VER[verifications · emit · check · gate]
  end

  INTENT --> CONTRACTS
  UI --> UIMAP
  UI --> PLATFORM
  CONTRACTS --> GEN --> APP
  PLATFORM --> GEN
  INTENT --> PROOF
  CONTRACTS --> PROOF
  APP --> PROOF
```

### What each layer owns

| Layer               | Records                                                         | Answers                                              |
| ------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| Domain and behavior | `entity`, `capability`, `workflow`, `rule`, SDLC                | What the app means and how work is proven            |
| Contracts           | `semantic_ui`, `api`, `db`, `cli` surfaces                      | Typed intent without framework trees                 |
| UI work map         | `layout`, `region`, `render`, `widget`, `component_map` | Where product work belongs                           |
| Design              | `design_language`, token mappings, style intent                 | Semantic design scope, not CSS                       |
| Platform            | `web`, `ios`, `android`                                         | Routes and hints that inherit the shared UI contract |
| Stack realization   | generator output or maintained source                           | React, SvelteKit, Prisma, and so on                  |
| Proof               | `verification`, emit reports, gate commands                     | Whether a change is safe                             |

The UI graph is a **work map**, not a render tree:

```text
route → screen → layout → region → render → widget → component_map
```

Layouts say where work belongs. Widgets say what reusable semantic UI is needed.
Component maps say which platform components implement each widget. Concrete
surfaces inherit placement; they do not re-own it.

See [Topogram Model](/concepts/topogram-model/) and
[UI Work Map By Example](/design/ui-work-map-by-example/) for depth.

## Slices: bounded context for real work

A **context slice** is a focused packet cut from the full map, small enough
for one task, screen, widget, or capability:

```bash
topogram query slice ./topo --screen item_list --surface proj_web --detail compact
topogram query slice ./topo --task task_implement_audit_writer --mode implementation
topogram query slice ./topo --widget widget_data_grid
topogram query slice ./topo --task task_implement_audit_writer --format html
```

Each slice anchors on one record (`focus`) and pulls semantic closure around
it: dependencies, edit boundaries, verification targets, and proof commands.

```mermaid
flowchart TB
  APP["Full app map (topo/)"]

  APP --> Q["topogram query slice<br/>(one focus)"]

  Q --> PACKET["Context slice"]

  subgraph PACKET_DETAIL["Context slice contents"]
    direction TB
    FOCUS["focus: anchor record"]
    FRAME["frame: goal and next action"]
    WORK["work_items: actionable records"]
    REL["relationships: why related records matter"]
    PROOFPLAN["proof_plan: required and recommended proof"]
    BUDGET["attention_budget: estimated size by section"]
    MANIFEST["slice_manifest: read order"]

    subgraph MUST["must_read"]
      M1[frame · summary · agent_guidance]
      M2[boundaries · write_scope]
      M3[work_items · relationships]
      M4[ui_agent_packet, UI slices only]
    end

    subgraph REF["reference"]
      R1[depends_on · related_summary]
    end

    subgraph PROOF["proof"]
      P1[proof_plan · verification_targets]
    end

    subgraph DIAG["diagnostic"]
      D1[attention_budget]
    end

    FOCUS --> MANIFEST
    MANIFEST --> FRAME
    MANIFEST --> WORK
    MANIFEST --> REL
    MANIFEST --> PROOFPLAN
    MANIFEST --> BUDGET
    MANIFEST --> MUST
    MANIFEST --> REF
    MANIFEST --> PROOF
    MANIFEST --> DIAG
  end
```

### Slice tiers and detail levels

The `slice_manifest` labels sections so agents read what matters first:

| Tier       | Purpose                        | Examples                                    |
| ---------- | ------------------------------ | ------------------------------------------- |
| must_read  | Start here                     | focus, frame, summary, agent_guidance, work_items, relationships, write_scope |
| reference  | Drill down only if needed      | depends_on, related_summary                 |
| proof      | Run before finishing           | proof_plan, verification_targets            |
| diagnostic | Budget attention and debugging | attention_budget                            |

Use `--detail compact` for the smallest safe packet, `standard` for normal
work, and `full` when debugging the slice itself.

Use `--format html` when a human wants a static local cockpit with Start Here,
work items, relationship map, proof plan, write scope, glossary/rules, and
collapsible raw JSON.

### Slice types by focus

```mermaid
flowchart LR
  subgraph SCREEN["Screen slice"]
    direction TB
    S1[screen] --> S2[layout] --> S3[region]
    S3 --> S4[binding] --> S5[widget]
  end

  subgraph TASK["Task slice"]
    direction TB
    T1[task] --> T2[requirement]
    T2 --> T3[acceptance criterion]
    T3 --> T4[capability · verification]
  end

  subgraph WIDGET["Widget slice"]
    direction TB
    W1[widget contract]
    W1 --> W2[sourceUsages across screens]
    W1 --> W3[design · a11y · i18n]
  end
```

| Focus flag     | Question it answers                                      |
| -------------- | -------------------------------------------------------- |
| `--screen`     | What is on this page and where do I edit?                |
| `--widget`     | Where is this widget used and what must stay consistent? |
| `--task`       | What am I implementing and how do I prove done?          |
| `--capability` | What entities, rules, and surfaces does this touch?      |

UI slices include **`agent_readiness`**: ready, blocked, or ready with review,
plus change targets and proof commands.

## How layers and slices work together

|          | Layers                      | Slices                                  |
| -------- | --------------------------- | --------------------------------------- |
| What     | How the app is modeled      | What you query before editing           |
| Lives in | `topo/` (persistent source) | `query slice` output (ephemeral)        |
| Answers  | What is this app?           | What do I touch, and how do I prove it? |

Typical agent flow:

```mermaid
sequenceDiagram
  participant Agent
  participant Brief as agent brief
  participant Slice as context slice
  participant Proof as proof commands
  participant Code as code

  Agent->>Brief: Project onboarding (once)
  Agent->>Slice: query slice for this task or screen
  Slice-->>Agent: focus · boundaries · work map · verification
  Agent->>Code: Bounded edit
  Agent->>Proof: check · widget behavior · sdlc gate
```

1. **`topogram agent brief`**: project-level onboarding.
2. **`topogram query slice`**: one focus per unit of work.
3. **`emit` / `check` / gate commands**: proof against the relevant layers.
4. **Generate or edit maintained code**: stack realization.

For UI tasks, stack slices:

```bash
topogram query slice ./topo --task <task-id> --mode implementation --json
topogram query slice ./topo --task <task-id> --mode implementation --format html
topogram query slice ./topo --screen item_list --surface proj_web --detail compact --json
topogram query sdlc-proof-gaps ./topo --task <task-id> --json
```

## Bottom line

Topogram is not a generator that happens to have specs. It is a **living app
map**: layers separate intent from implementation; slices give humans and
agents a smaller, verified surface to work from.

## Related

- [What Topogram Is](/concepts/what-is-topogram/)
- [Topogram Model](/concepts/topogram-model/)
- [Agent First Run](/agent-first-run/)
- [Generate vs Emit](/concepts/generate-vs-emit/)
- [Glossary](/concepts/glossary/): `term_work_map`, `term_context_slice`, `term_slice_manifest`
