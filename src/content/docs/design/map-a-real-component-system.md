---
title: "Map A Real Component System"
description: "Use a designer-readable matrix to map real component refs to Topogram semantic widgets."
---

# Map A Real Component System

> Use a designer-readable matrix to map real component refs to Topogram semantic widgets.

Status: current
Audience: designers, front-end leads, design-system maintainers, and agents
Use when: a team has existing components or Storybook stories and wants to connect them to Topogram without treating source imports as design truth.

Topogram asks teams to map four things:

- `semantic_ui`: screens, layouts, regions, render entries, messages, and accessibility obligations.
- `design_language`: platform scope and design-token vocabulary.
- `component_map`: widget-to-platform component refs and behavior support.
- reports and slices: the review matrix and agent context that prove what is mapped, missing, unsupported, or contract-only.

The graph is not a render tree. It is a work map. Designers should start from the matrix, not raw `.tg` files.

## Five-Minute Substantial Proof

Use the operations design-review proof when you want a running SaaS UI and one
designer-readable packet:

```bash
git clone https://github.com/attebury/topogram-proof-operations-design-review.git
cd topogram-proof-operations-design-review
npm install
npm run verify
```

Open these files first:

- `proof/artifacts/step-06-designer-closeout/final-designer-packet.md`
- `proof/artifacts/step-06-designer-closeout/designer-review-checklist.md`
- `proof/artifacts/step-06-designer-closeout/final-screen-slice.md`
- `proof/artifacts/step-04-designer-report-packet/design-coverage.md`
- `topo/component-maps/operations-component-map.tg`

This is the most concrete designer/front-end-lead path: a maintained React app,
Acme Operations UI component refs, semantic layouts, regions, and render entries, a
component map, a polished Markdown packet, and a slice-guided UI change.

## Storybook Mapping Proof

```bash
git clone https://github.com/attebury/topogram-proof-real-component-system-map.git
cd topogram-proof-real-component-system-map
npm install
npm run verify
```

Open these files first:

- `proof/artifacts/step-06-designer-review-checklist.md`
- `proof/artifacts/step-06-work-map.md`
- `proof/artifacts/step-06-screen-slice.md`
- `proof/artifacts/step-06-widget-slice.json`
- `topo/component-maps/component-map-acme-ops-widgets.tg`

Use this proof when the important question is Storybook evidence and explicit
candidate review. The useful review question is: which semantic widget maps to
which trusted component ref, on which platform, with which behavior and state
coverage?

## Mapping Workflow

1. Inventory real component refs.
   Use stable design-system identities such as `acme.dataGrid`, not source paths like `src/components/DataGrid`.

2. Define semantic widgets.
   A widget such as `widget_intake_grid` describes reusable UI intent: rows, selection, sorting, filtering, states, and placement.

3. Define the design language.
   `design_language` records platform scope and token names. It is the header for a component system, not a CSS file.

4. Author or adopt a component map.
   `component_map` records connect semantic widgets to platform component refs. Each `widget_mapping` says whether the mapping is `rendered`, `contract_only`, `implementation_owned`, or `unsupported`.

5. Review the matrix.
   Run `topogram query ui-design-coverage ./topo --surface <surface> --format markdown` and treat unsupported, contract-only, missing-platform, missing-state, missing-i18n, missing-ARIA, and missing-token rows as work.

6. Give agents slices, not the whole repo.
   Use `topogram query slice ./topo --surface <surface> --screen <screen> --detail compact --format markdown` for screen work and `--widget <widget>` for component mapping work.

## Component Map Example

```text
component_map component_map_acme_ops_widgets {
  name "Acme Operations Component Map"
  description "Maps semantic operations widgets to stable Acme component refs."
  design_language design_acme_ops
  status active

  widget_mapping {
    id intake_grid_web_wide
    widget widget_intake_grid
    platform web
    viewport wide
    component_ref "acme.dataGrid"
    pattern data_grid_view
    density compact
    state_coverage [loading, empty, error]
    status rendered
    behaviors_rendered [selection, sorting, filtering]
  }

  widget_mapping {
    id intake_grid_web_narrow
    widget widget_intake_grid
    platform web
    viewport narrow
    component_ref "acme.cardList"
    pattern resource_cards
    density comfortable
    state_coverage [loading, empty]
    status contract_only
    behaviors_rendered [selection]
    behaviors_contract_only [sorting, filtering]
  }
}
```

`component_ref` is the stable design-system identity. `status` and behavior arrays decide what is safe for agents to treat as implemented.

## Storybook Path

Storybook is evidence, not the source of truth. Static CSF stories can propose `component_mappings` candidates when they include explicit `parameters.topogram` metadata.

```bash
topogram extractor policy pin @topogram/extractor-storybook-design@1
topogram extract ./component-library --out ./extracted-topogram --from ui --extractor @topogram/extractor-storybook-design
topogram adopt --list ./extracted-topogram --json
topogram adopt component-mappings ./extracted-topogram --dry-run --json
```

Review the candidate, then apply the accepted mapping to canonical `component_map` source.

## Related Docs

- [Designer Review Checklist](/design/designer-review-checklist/)
- [Storybook Component Map Walkthrough](/design/storybook-component-map-walkthrough/)
- [Map A Design System](/design/map-design-system/)
- [UI Work Map By Example](/design/ui-work-map-by-example/)
