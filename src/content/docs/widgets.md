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
  patterns [resource_table, data_grid_view]
  regions [results, toolbar]
  status active
}
```

Place widgets through `widget_bindings` on a `ui_contract` projection:

```text
projection proj_ui_contract {
  type ui_contract
  screens {
    screen item_list title "Items" kind list
  }
  screen_regions {
    screen item_list region results pattern resource_table placement primary
  }
  widget_bindings {
    screen item_list region results widget widget_data_grid data rows from cap_list_items event row_select navigate item_detail
  }
  status active
}
```

Concrete `web_surface`, `ios_surface`, and `android_surface` projections realize
the shared UI contract. They own routes and surface hints, not widget placement.

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

## Behavior

Widgets can declare only the canonical behavior vocabulary: `selection`,
`sorting`, `filtering`, `search`, `pagination`, `grouping`, `drag_drop`,
`inline_edit`, `bulk_action`, `optimistic_update`, `realtime_update`, and
`keyboard_navigation`. Projection bindings realize those behaviors by
connecting data, events, navigation, and capabilities.

## Required checks

These command shapes are covered by regression tests:

```bash
topogram emit ui-widget-contract ./topo --widget widget_data_grid
topogram emit widget-conformance-report ./topo --projection proj_web_surface --json
topogram emit ui-realization-report ./topo --projection proj_web_surface --json
topogram widget check ./topo --projection proj_web_surface
topogram widget behavior ./topo --projection proj_web_surface --widget widget_data_grid --json
topogram query widget-behavior ./topo --projection proj_web_surface --widget widget_data_grid --json
topogram query slice ./topo --widget widget_data_grid
topogram query slice ./topo --projection proj_web_surface --screen item_list --json
```

Use `--json` for agent packets and `--write --out-dir <dir>` when a report or
contract should be written to disk.

## Migration review

When a widget contract changes against a baseline, use `context-diff` to review
the migration plan:

```bash
topogram emit context-diff ./topo --from-topogram ./baseline/topo --json
```

The `widget_contract_migration_plan` section lists changed widget contract
sections, affected projections, and the exact widget contract, conformance,
behavior, and surface-contract commands to run before regenerating or updating
maintained UI code.

## Generator rule

If a generator accepts a widget pattern, tests should prove it appears in the
normalized contract, `ui-realization-report`, generated coverage, or generated
app output. Generated web wrappers preserve `data-topogram-widget`,
`data-topogram-region`, `data-topogram-screen`, and `data-topogram-display-field`
markers. Unsupported widget usage should produce a clear diagnostic; it should
not silently disappear.

## Web UI beta proof

Topogram's beta UI proof is web-first and semantic. React and SvelteKit
generation must preserve the same screens, routes, regions, widget usages,
display fields, behavior coverage, and design-token intent from one
`ui_contract`.

Use these proof commands when UI contracts or generator support change:

```bash
topogram emit ui-surface-contract ./topo --projection proj_web_surface --json
topogram emit ui-realization-report ./topo --projection proj_web_surface --json
topogram emit widget-conformance-report ./topo --projection proj_web_surface --json
topogram query slice ./topo --projection proj_web_surface --screen <screen-id> --json
```

The current beta bar is compile plus deterministic contract/coverage assertions.
Screenshot comparison, visual diffing, and automated accessibility audits are
future proof layers, not the v1 semantic contract.

See [Beta Readiness](/beta-readiness/) for the release-level UI proof bar and
what remains preview-only.
