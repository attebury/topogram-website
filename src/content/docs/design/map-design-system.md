---
title: "Map A Design System"
description: "Map one semantic UI contract to platform components without turning the graph into a render tree."
---

# Map A Design System

> Map one semantic UI contract to platform components without turning the graph into a render tree.

Status: current
Audience: designers, front-end leads, design-system maintainers, and agents
Use when: you need to connect Topogram widgets to web, iOS, Android, or desktop component libraries.

Topogram keeps three UI layers separate:

- `semantic_ui` owns screens, layout usage, screen region overrides, widget
  placement, actions, messages, and accessibility obligations.
- `region` and `layout` describe reusable semantic work areas
  such as header, nav, content, toolbar, filters, results, and footer actions.
- `design_language` owns the design-system scope: supported platforms, design
  package identity, scoped semantic style intent, and token mappings.
- `component_map` maps semantic widgets to stable platform component
  refs, stable style refs, and behavior support.

The graph is not a render tree. It is a work map. Layouts say where work
belongs; widgets say what reusable semantic UI is needed; component maps say
which design-system components implement those widgets on each platform. A
widget such as `widget_review_queue` should be authored once, then mapped to
the platform components that realize it.

Style intent is semantic and scoped. A design language can declare broad intent
such as `brand_consistent`; layouts, regions, widgets, and bindings can add
more specific intent such as `dense_collection` or `review_density`. Topogram
shows the inherited style chain in reports and slices. It does not define CSS,
native modifiers, or pixel layout.

## Designer Review Packet

For substantial UI review, start with the operations design-review proof:

```bash
git clone https://github.com/attebury/topogram-proof-operations-design-review.git
cd topogram-proof-operations-design-review
npm install
npm run verify
```

Read `proof/artifacts/step-06-designer-closeout/final-designer-packet.md`
first. It is generated from `work-map` data and shows:

- executive summary;
- screen inventory;
- layout and region map;
- screen render work leaves;
- component map matrix summary;
- style, token, ARIA, and i18n review gaps;
- accepted/deferred/unsupported rows;
- exact agent handoff commands.

Use the packet as the meeting artifact. Use `.tg` as the source of truth when
you need to edit the map.

## Five-Minute Review

If you want the Storybook extraction path, inspect the real component-system
proof:

```bash
git clone https://github.com/attebury/topogram-proof-real-component-system-map.git
cd topogram-proof-real-component-system-map
npm install
npm run verify
```

Start with `proof/artifacts/step-06-designer-review-checklist.md`,
`proof/artifacts/step-06-work-map.md`, and
`proof/artifacts/step-06-widget-slice.json`. That proof shows a small React
component system, Storybook metadata, review-only component mapping candidates,
and accepted canonical `component_map` rows.

If you only want to see the compact DSL shape, inspect the focused widget proof:

```bash
git clone https://github.com/attebury/topogram-proof-widget-design-realization.git
cd topogram-proof-widget-design-realization
npm install
npm run verify
```

Then open:

- `topo/widgets/widget-data-grid.tg`: the semantic widget.
- `topo/design-languages/design-company-web.tg`: platform and token scope.
- `topo/component-maps/component-map-company-web-widgets.tg`: widget-to-platform component mappings.
- `proof/artifacts/ui-design-coverage.md`: the designer-readable matrix.
- `proof/artifacts/widget-slice.json`: the agent packet for changing the widget.

The matrix is the first artifact to read. It groups the widget by platform,
viewport, density, component ref, behavior support, and review state, so design
review starts from a component matrix instead of raw graph records.

## Authoring Pattern

Start with reusable structure and the shared widget:

```text
region region_collection_results {
  name "Collection Results"
  description "Primary collection result area."
  kind results
  pattern resource_table
  placement primary
  states [loading empty error]
  style_intent [scannable structured]
  allowed_widget_patterns [resource_table card_list]
  status active
}

layout layout_collection_list {
  name "Collection List Layout"
  description "Collection screen layout with result content."
  pattern collection_workspace
  style_intent [dense_collection]
  slot {
    id results
    uses region_collection_results
    role primary_work_area
  }
  status active
}

widget widget_review_queue {
  name "Review Queue"
  description "Reusable queue for reviewing submitted items."
  category collection
  patterns [resource_table card_list]
  regions [results toolbar]
  style_intent [scannable_rows]
  status active
}

screen screen_review_queue {
  name "Review Queue"
  description "Review submitted items."
  title "Review Queue"
  kind list
  layout layout_collection_list
  renders {
    region results widget widget_review_queue id review_queue_results intent "Review queue items." priority high data rows from cap_list_items
  }
  status active
}
```

Define the design language as the platform and token header:

```text
design_language design_acme_product_ui {
  name "Acme Product UI"
  description "Acme product design-system scope."
  platforms [web ios android]
  library acme_product_ui
  package "@acme/product-ui"
  style_intent [brand_consistent accessible_density]

  token_mappings {
    color_role danger token "acme.color.danger"
    typography_role body token "acme.type.body"
    action_role destructive token "acme.action.destructive"
  }

  status active
}
```

Map widgets with a widget-first component map:

```text
component_map component_map_review_queue {
  name "Review Queue Realizations"
  description "Maps the Review Queue widget to Acme platform components."
  design_language design_acme_product_ui
  status active

  widget_mapping {
    id review_queue_web_grid
    widget widget_review_queue
    platform web
    viewport wide
    component_ref "acme.reviewQueue.grid"
    style_refs ["acme.reviewQueue.compactGrid"]
    pattern resource_table
    density compact
    state_coverage [loading empty error]
    role_contexts [reviewer manager]
    theme_contexts [light dark]
    locale_contexts [default_locale]
    review_notes "Bulk action is contract-only until the grid adapter proves it."
    status rendered
    behaviors_rendered [selection sorting]
    behaviors_contract_only [bulk_action]
  }

  widget_mapping {
    id review_queue_ios_list
    widget widget_review_queue
    platform ios
    viewport any
    component_ref "acme.reviewQueue.list"
    pattern card_list
    density comfortable
    state_coverage [loading empty error]
    role_contexts [reviewer]
    theme_contexts [system]
    locale_contexts [default_locale]
    status implementation_owned
    behaviors_rendered [selection]
    behaviors_implementation_owned [bulk_action]
  }

  widget_mapping {
    id review_queue_android_cards
    widget widget_review_queue
    platform android
    viewport any
    component_ref "acme.reviewQueue.cards"
    pattern card_list
    density comfortable
    state_coverage [loading]
    role_contexts [reviewer]
    theme_contexts [system]
    locale_contexts [default_locale]
    status unsupported
    behaviors_unsupported [bulk_action]
  }
}
```

Use `component_ref` as a stable design-system identity. Do not use source import
paths such as `src/components/ReviewQueueGrid`. Import paths move when code is
refactored; component refs describe the design-system contract.

## Review Workflow

Run coverage before claiming parity:

```bash
topogram query ui-design-coverage ./topo --surface proj_web --json
topogram emit ui-realization-report ./topo --surface proj_web --json
topogram query slice ./topo --widget widget_review_queue --json
```

Review these states:

- `rendered`: the generator or maintained implementation proves the mapping.
- `contract_only`: the semantic mapping exists, but behavior needs
  implementation or stronger proof.
- `implementation_owned`: maintained/native code owns the realization.
- `unsupported`: the platform does not support that widget or behavior yet.
- missing platform: the design language declares a platform with no matching
  widget realization.
- missing state: a realization has not declared required loading, empty, or
  error state coverage.
- missing token, accessibility, or i18n: the widget has no mapped design token,
  authored accessibility obligation, or message key evidence.
- missing style evidence: scoped semantic style intent exists, but no token
  mapping or stable `style_refs` evidence carries it into the component map.

Unsupported and contract-only entries are developer/agent review work. They
should appear in reports and slices, not disappear behind generic fallback UI.

For designer review, use Markdown:

```bash
topogram query ui-design-coverage ./topo --surface proj_web --format markdown
```

That output is a widget-first matrix. It is easier to read at scale than raw
`.tg` records because each row shows the widget, platform, viewport, density,
component ref, style intent, style refs, state coverage, and review status.

`style_refs` are stable design-system style identities, such as a MAUI style
name or a library style token. They are not source import paths, CSS selectors,
or local class names.

Use that matrix as the shared review surface:

- designers confirm component refs, states, density, and platform expectations;
- front-end leads confirm whether each component ref is implemented or owned by
  maintained code;
- agents use the review rows to find unsupported, contract-only, missing-state,
  missing-token, missing-i18n, and missing-accessibility work.

## Brownfield Extraction

Extractor packages may propose `component_mappings` candidates when they see a
custom data grid, native list, or bespoke component that appears to implement a
known widget. These candidates are review-only:

```js
return {
  findings: [],
  candidates: {
    component_mappings: [{
      id_hint: "review_queue_web_grid",
      component_map_id_hint: "component_map_review_queue",
      design_language_id_hint: "design_acme_product_ui",
      widget_id: "widget_review_queue",
      platform: "web",
      viewport: "wide",
      component_ref: "acme.reviewQueue.grid",
      pattern: "resource_table",
      status: "rendered",
      behaviors_rendered: ["selection"],
      behaviors_contract_only: ["bulk_action"],
      confidence: "medium",
      evidence: [{ file: "src/review/ReviewQueue.tsx", reason: "Uses Acme ReviewQueueGrid." }],
      missing_decisions: ["Confirm bulk action behavior support."]
    }]
  },
  diagnostics: []
};
```

`topogram adopt component-mappings --write` only writes canonical
`component_map` records after the referenced widget and design language
exist or are selected in the same adoption plan.

Figma and Storybook are evidence sources, not the design source of truth. The
first Storybook bridge is package-backed and intentionally narrow:
`@topogram/extractor-storybook-design` reads static CSF story files with
explicit `parameters.topogram` metadata and emits review-only
`component_mappings` candidates. It does not run Storybook, parse MDX, use
screenshots, or replace `design_language` and `component_map`.

A future Figma bridge should start as a file-based registry import, not a live
Figma API sync. A checked-in `figma-components.json`-style export can propose
component refs, variants, states, style refs, and platform coverage from design
component identity while staying deterministic, credential-free, and
review-only. Live Figma API sync is separate future work after the local
registry path proves useful.

## Proof Commands

For the built-in proof fixture:

```bash
topogram query ui-design-coverage engine/tests/fixtures/workspaces/app-basic --surface proj_web --json
topogram query ui-design-coverage engine/tests/fixtures/workspaces/app-basic --surface proj_web --format markdown
topogram emit ui-realization-report engine/tests/fixtures/workspaces/app-basic --surface proj_web --json
topogram query slice engine/tests/fixtures/workspaces/app-basic --widget widget_data_grid --detail compact --json
topogram query slice engine/tests/fixtures/workspaces/app-basic --widget widget_data_grid --detail compact --format html
```

For project work, replace the fixture path with `./topo`.

## Related Docs

- [Map A Real Component System](/design/map-a-real-component-system/)
- [Designer Review Checklist](/design/designer-review-checklist/)
- [Storybook Component Map Walkthrough](/design/storybook-component-map-walkthrough/)
- [UI Work Map By Example](/design/ui-work-map-by-example/)
