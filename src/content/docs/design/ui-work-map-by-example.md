---
title: "UI Work Map By Example"
description: "A UI work map shows where an agent should make a UI change without pretending to be a render tree."
---

# UI Work Map By Example

> A UI work map shows where an agent should make a UI change without pretending to be a render tree.

Status: current
Audience: front-end developers, designers, and coding agents
Use when: you need to understand how navpoints, screens, layouts, regions, renders, widgets, and component maps work together.

Topogram UI structure follows this chain:

```text
navpoint -> screen -> layout -> region -> render -> widget -> component_map
```

The graph is not a render tree. It is a work map. It names the reusable UI
work areas, the semantic widget placed there, the data and actions connected to
that placement, and the platform component refs that implement the widget.

## Minimal Shape

```tg
region region_queue_results {
  name "Queue Results"
  description "Primary area for reviewing queued work."
  kind results
  pattern data_grid_view
  placement primary
  states [loading empty error]
  allowed_widget_patterns [resource_table data_grid_view resource_cards]
  status active
}

layout layout_queue_workspace {
  name "Queue Workspace"
  description "Reusable layout for queue/list work."
  pattern collection_workspace
  status active

  slot {
    id results
    uses region_queue_results
    role primary_work_area
    slot true
  }
}

screen screen_intake_queue {
  name "Intake Queue"
  description "Review and assign intake items."
  kind list
  layout layout_queue_workspace
  title "Intake Queue"
  load cap_list_intake_items
  item_shape shape_intake_item
  renders {
    region results widget widget_review_queue id intake_queue_results intent "Review, select, and assign intake items." priority high style_intent [review_density] data rows from cap_list_intake_items event row_select navigate nav_intake_detail
  }
  status active
}

navpoint nav_intake_queue {
  name "Intake Queue Navpoint"
  description "Open the intake queue."
  path "/intake"
  screen screen_intake_queue
  status active
}
```

## Design Realization

`design_language` owns platform, token, and broad semantic style scope.
`component_map` says which platform component refs and stable style refs
realize the widget.

```tg
design_language design_ops_ui {
  name "Operations UI"
  description "Shared design language for operations workflows."
  platforms [web ios android]
  surfaces [proj_web]
  library ops_ui
  style_intent [brand_consistent accessible_density]

  token_mappings {
    color_role danger token "ops.color.danger"
    typography_role body token "ops.type.body"
  }

  status active
}

component_map component_map_review_queue {
  name "Review Queue Component Map"
  description "Maps the review queue widget to platform component refs."
  design_language design_ops_ui
  status active

  widget_mapping {
    id review_queue_web_wide
    widget widget_review_queue
    platform web
    viewport wide
    component_ref "ops.reviewQueue.grid"
    style_refs ["ops.reviewQueue.compactGrid"]
    pattern data_grid_view
    density compact
    state_coverage [loading empty error]
    status rendered
    behaviors_rendered [selection]
    behaviors_contract_only [bulk_action]
  }
}
```

## Agent Slice

For implementation work, start with a compact Markdown slice:

```bash
topogram query slice ./topo --surface proj_web --screen intake_queue --detail compact --format markdown
```

The useful parts are:

- readiness: whether the agent can start safely;
- work map chain: screen, layout, navpoint, inherited regions, and slot roles;
- render entries: the work leaves where region, widget, data, action, and design obligations meet;
- design review: unsupported, contract-only, missing-platform, missing-state, missing-token, missing ARIA, and missing i18n work;
- proof commands: `topogram widget check`, `topogram widget behavior`, `topogram query ui-design-coverage`, and `topogram emit ui-realization-report`.

Use JSON when an agent needs exact IDs:

```bash
topogram query slice ./topo --surface proj_web --screen intake_queue --detail compact --json
```

## Work Map Explorer

Use `work-map` when a person or agent needs the readable map before choosing a
drill-down slice. It shows surfaces, screens, layouts, regions, widget
bindings, widgets, component maps, review gaps, and exact proof commands:

```bash
topogram query work-map ./topo --surface proj_web --format markdown
topogram query work-map ./topo --surface proj_web --screen intake_queue --json
```

Use `emit work-map-report` when you want to save the same report:

```bash
topogram emit work-map-report ./topo --surface proj_web --format markdown --write --out-dir ./artifacts
```

The report stays concise. Use `query slice`, `query ui-design-coverage`, and
`emit ui-realization-report` for deeper proof.

For a reusable widget that appears in many places, keep the focus on the widget
but add UI scope:

```bash
topogram query slice ./topo --surface proj_web --screen intake_queue --widget widget_review_queue --detail compact --format markdown
topogram query slice ./topo --surface proj_web --layout layout_queue_workspace --region region_queue_results --widget widget_review_queue --json
```

The slice remains widget-focused, but source usages, design review rows,
i18n/ARIA context, readiness, and follow-up commands stay scoped to the selected
surface, screen, layout, region, or component map.

## Related Docs

- [Widgets And Design](/widgets/)
- [Map A Design System](/design/map-design-system/)
- [Agent First Run](/agent-first-run/)
- [DSL Reference](/reference/dsl/)
