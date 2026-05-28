---
title: "Widgets"
description: "Widgets are Topogram reusable semantic UI contracts, not framework component trees."
---

# Widgets

> Widgets are Topogram reusable semantic UI contracts, not framework component trees.

Status: current
Audience: UI authors, generator authors, and agents
Use when: you need semantic widget, display-field, behavior, or design-token guidance.

`widget` is Topogram's reusable semantic UI contract. It is not a React,
Svelte, SwiftUI, or Android component. Generators map widget contracts to their
stack.

## Authoring

```text
widget widget_data_grid {
  name "Data Grid"
  description "Reusable tabular display"
  category collection
  props {
    rows array required
    selected_ids array optional default []
  }
  events {
    row_select shape_output_item_card
  }
  patterns [resource_table data_grid_view]
  regions [results toolbar]
  status active
}
```

Place widgets through `screen.renders`. Prefer a reusable `layout` for screen
structure, then render widgets into inherited layout regions:

```text
region region_collection_results {
  name "Collection Results"
  description "Primary result area for collection screens."
  kind results
  pattern resource_table
  placement primary
  status active
}

layout layout_collection_list {
  name "Collection List Layout"
  description "Collection screen with result content."
  pattern collection_workspace
  slot {
    id results
    uses region_collection_results
    role primary_work_area
  }
  status active
}

surface proj_semantic_ui {
  type semantic_ui
  screens [item_list]
  status active
}

screen item_list {
  name "Items"
  description "Browse items."
  title "Items"
  kind list
  layout layout_collection_list
  renders {
    region results widget widget_data_grid id item_list_results_grid intent "Review item rows." priority high data rows from cap_list_items event row_select navigate item_detail
  }
  status active
}
```

Concrete `web`, `ios`, and `android` surfaces realize
the shared UI contract. They own routes and surface hints, not widget placement.

Use `layout.pattern` to name the reusable work archetype and slot `role` to
name why a region exists in that layout. `screen.renders` entries are the agent
work leaves: they connect a screen region to a widget, section, or action with
data source, actions, messages, accessibility obligations, design mappings, and
proof commands.

`screen_regions` remains available for one-off regions and screen-specific
overrides. It should not be the default way to repeat the same toolbar, filters,
results, content, or footer regions on every screen.

## Display Fields

Topogram beta UI proof uses derived display fields instead of a new display DSL.
`ui-surface-contract` derives fields from screen shapes, capability output
shapes, and widget data bindings. A widget usage includes the data prop, source
capability/shape, source shape, field names, human labels, roles, type, and
requiredness.

Generators must render supported collection widgets from those fields. A table
or board should not guess columns at runtime with `Object.keys(...)`. If
Topogram cannot derive display intent, reports emit diagnostics instead of
silently inventing UI.

Web beta generators render these full widget/region patterns from normalized
contract data: `resource_table`, `data_grid_view`, `resource_cards`,
`search_results`, `detail_panel`, `summary_stats`, `board_view`,
`calendar_view`, `activity_feed`, `timeline_view`, `edit_form`,
`filter_panel`, `action_bar`, `empty_state_panel`, `settings_section`,
`wizard_stepper`, `comment_thread`, and `audit_log`.

`lookup_select` and `status_badge` are embedded patterns. They render inside
forms, filters, tables, cards, and detail views, but they are reported
separately from full widget regions. `app_header`, `primary_navigation`,
`hamburger_drawer`, `content_region`, `footer_bar`, `inspector_pane`, and
`master_detail` are layout/shell patterns. They belong in layout and shell
support, not standalone widget renderer obligations. Coverage reports and
generator commands classify these categories instead of hiding gaps.

## Behavior

Widgets can declare only the canonical behavior vocabulary: `selection`,
`sorting`, `filtering`, `search`, `pagination`, `grouping`, `drag_drop`,
`inline_edit`, `bulk_action`, `optimistic_update`, `realtime_update`, and
`keyboard_navigation`. Surface bindings realize those behaviors by
connecting data, events, navigation, and capabilities.

## Design Language And Component Maps

`semantic_ui` records define the semantic UI. `theme` records own concrete
stack-agnostic palette and design token values. `design_language` records own
design-system scope, platforms, package identity, theme selection, and token
mappings.
`component_map` records map semantic widgets to platform component
refs and behavior support.

The graph is not a render tree. It is a work map: layouts compose semantic
regions, screens choose a layout, widgets bind into those regions, and
component maps show how those widgets are rendered, contract-only,
implementation-owned, or unsupported on each platform.

`style_intent` is optional semantic guidance for designers and agents. It can
appear on `design_language`, `layout`, `region`, `screen`, `widget`, and
screen render entries. Later scopes add more specific intent. Reports and slices
show inherited intent so an agent can see that a data grid is, for example,
brand-consistent, dense, scannable, and review-focused without needing a CSS DSL.

```text
theme theme_lifting_light {
  name "Lifting Light"
  description "Concrete light theme tokens."
  color background "#f4f6f8"
  color panel "#ffffff"
  color text "#182026"
  color action "#0f6b5f"
  color danger "#b42318"
  token surface.page.background "#f4f6f8"
  token action.primary.background "#0f6b5f"
  token text.default "#182026"
  radius card medium
  density comfortable
  accessibility contrast aa
  status active
}

design_language design_company_web {
  name "Company Web Design Language"
  description "Defines company web design-system scope and token names."
  platforms [web]
  surfaces [proj_web]
  theme theme_lifting_light
  library company_web
  package "@company/ui"
  style_intent [brand_consistent accessible_density]

  token_mappings {
    color_role danger token "company.color.danger"
    typography_role body token "company.typography.body"
  }

  status active
}

component_map component_map_company_web_widgets {
  name "Company Web Component Map"
  description "Maps shared widgets to company web component refs."
  design_language design_company_web
  status active

  widget_mapping {
    id review_queue_grid_wide
    widget widget_review_queue
    platform web
    viewport wide
    component_ref "company.reviewQueueGrid"
    component {
      module "src/components/ReviewQueueGrid.tsx"
      export "ReviewQueueGrid"
      framework react
    }
    style_refs ["company.reviewQueue.compactGrid"]
    pattern resource_table
    density compact
    state_coverage [loading empty error]
    role_contexts [reviewer]
    theme_contexts [light dark]
    locale_contexts [default_locale]
    status rendered
    behaviors_rendered [selection]
    behaviors_contract_only [sorting]
  }

  widget_mapping {
    id review_queue_cards_narrow
    widget widget_review_queue
    platform web
    viewport narrow
    component_ref "company.reviewQueueCards"
    pattern card_list
    status contract_only
  }
}
```

Use stable component refs, not local source import paths. A source path may be
evidence in a report or maintained app, but it is not canonical contract
identity. If a widget has no mapping, or if a behavior is `contract_only` or
`unsupported`, `ui-realization-report` and focused UI slices show that as
developer/agent review work.

For maintained apps, add a structured `component { ... }` block beside the
stable `component_ref` when there is a concrete source implementation to prove.
`module` is a safe relative project path, `export` names the exported component
or `default`, and `framework` records the implementation family. `topogram query
ui-design-coverage` uses that block to check that the source file exists, the
export is present, required widget props/events are represented, and routed
screens have source wiring evidence.

Use stable `style_refs` only for design-system style identities, such as a MAUI
style name or component-library style token. Do not put source import paths,
CSS selectors, or local class names in the canonical map.

Theme values remain portable contract data. A web generator may emit CSS
variables from `theme_lifting_light`; a native generator can map the same record
to SwiftUI, Compose, or React Native theme tokens without changing the Topogram
source.

Use `ui-design-coverage` before claiming design parity. It groups coverage by
platform, surface, and widget, then emits a design matrix for designers and
agents. The matrix includes component refs, viewport, density, state coverage,
style intent, style refs, token status, accessibility status, i18n status, and
review rows for unmapped widgets, missing platforms, missing states, missing
style evidence, unproved structured component references, and `contract_only`
or `unsupported` behavior.

Use `work-map` when the question is broader than one slice. It summarizes the
readable chain from route to screen to layout to region to render to widget to
component map, then lists design/style gaps and drill-down proof commands. It is
an explorer report, not a renderer:

```bash
topogram query work-map ./topo --surface proj_web --format markdown
topogram query work-map ./topo --surface proj_web --screen item_list --json
topogram emit work-map-report ./topo --surface proj_web --format markdown --write --out-dir ./artifacts
```

For the short screen-to-widget chain, see [UI Work Map By Example](/design/ui-work-map-by-example/).
For the end-to-end mapping workflow, see [Map A Design System](/design/map-design-system/).
For a concrete designer packet over a running operations SaaS app, see
[Map A Real Component System](/design/map-a-real-component-system/) and the
[Operations Design Review Proof](https://github.com/attebury/topogram-proof-operations-design-review).
Use the Storybook proof when the source evidence is component-library metadata.

## Required checks

These command shapes are covered by regression tests:

```bash
topogram emit ui-widget-contract ./topo --widget widget_data_grid
topogram emit widget-conformance-report ./topo --surface proj_web --json
topogram emit ui-realization-report ./topo --surface proj_web --json
topogram query ui-design-coverage ./topo --surface proj_web --json
topogram query ui-design-coverage ./topo --surface proj_web --format markdown
topogram query work-map ./topo --surface proj_web --format markdown
topogram emit work-map-report ./topo --surface proj_web --format markdown
topogram widget check ./topo --surface proj_web
topogram widget behavior ./topo --surface proj_web --widget widget_data_grid --json
topogram query widget-behavior ./topo --surface proj_web --widget widget_data_grid --json
topogram query slice ./topo --widget widget_data_grid
topogram query slice ./topo --widget widget_data_grid --detail compact --format html
topogram query slice ./topo --surface proj_web --screen item_list --json
topogram query slice ./topo --surface proj_web --layout layout_collection_list --json
topogram query slice ./topo --surface proj_web --region region_collection_results --json
topogram query slice ./topo --surface proj_web --component-map realization_set_company_web_widgets --json
```

Use screen slices for page work, layout slices for reusable structure, region
slices for placement obligations, widget slices for semantic behavior, and
component-map slices for platform component mappings.

Use `--json` for agent packets and `--write --out-dir <dir>` when a report or
contract should be written to disk.

## Migration review

When a widget contract changes against a baseline, use `context-diff` to review
the migration plan:

```bash
topogram emit context-diff ./topo --from-topogram ./baseline/topo --json
```

The `widget_contract_migration_plan` section lists changed widget contract
sections, affected surfaces, and the exact widget contract, conformance,
behavior, and surface-contract commands to run before regenerating or updating
maintained UI code.

## Generator rule

If a generator accepts a widget pattern, tests should prove it appears in the
normalized contract, `ui-realization-report`, generated coverage, or generated
app output. Generated web wrappers preserve `data-topogram-widget`,
`data-topogram-region`, `data-topogram-screen`, and `data-topogram-display-field`
markers. Generated web output also preserves message and accessibility intent
with `data-topogram-message-key`, `data-topogram-accessibility-target`,
keyboard/focus markers, and locale policy coverage.

Unsupported widget, component, or platform realization is developer/agent review
work. It must be shown as `contract_only`, `unsupported`, or explicit
implementation work in reports and focused slices; it must not silently
disappear or be replaced by an unmarked generic fallback.

## Web UI beta proof

Topogram's beta UI proof is web-first and semantic. React and SvelteKit
generation must preserve the same screens, routes, regions, widget usages,
display fields, behavior coverage, and design-token intent from one
`semantic_ui`.

Use these proof commands when UI contracts or generator support change:

```bash
topogram emit ui-surface-contract ./topo --surface proj_web --json
topogram emit ui-realization-report ./topo --surface proj_web --json
topogram query ui-design-coverage ./topo --surface proj_web --json
topogram emit widget-conformance-report ./topo --surface proj_web --json
topogram query slice ./topo --surface proj_web --screen <screen-id> --json
```

The current beta bar is compile plus deterministic contract/coverage assertions.
Semantic i18n and accessibility obligations are part of that contract now.
Screenshot comparison, visual diffing, locale catalog completeness, and
automated accessibility audits are future proof layers.

See [Beta Readiness](/beta-readiness/) for the release-level UI proof bar and
what remains preview-only.
