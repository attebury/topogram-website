---
title: "Storybook Component Map Walkthrough"
description: "Use static CSF Storybook metadata as review-only evidence for Topogram component mappings."
---

# Storybook Component Map Walkthrough

> Use static CSF Storybook metadata as review-only evidence for Topogram component mappings.

Status: current
Audience: front-end leads, design-system maintainers, extractor authors, and agents
Use when: a component library already has Storybook stories and the team wants component mapping candidates.

Storybook is evidence. Topogram stays canonical.

## Metadata

Add explicit metadata to the default CSF export:

```js
export default {
  title: "Acme/ActionToolbar",
  component: ActionToolbar,
  parameters: {
    topogram: {
      widget: "widget_command_toolbar",
      designLanguage: "design_acme_ops",
      componentMap: "component_map_acme_ops_widgets",
      componentRef: "acme.actionToolbar",
      platform: "web",
      viewport: "narrow",
      pattern: "action_bar",
      status: "rendered",
      density: "compact",
      stateCoverage: ["loading"],
      behaviorsRendered: ["bulk_action"]
    }
  }
};
```

The extractor emits candidates only when the important decisions are explicit. Missing metadata becomes findings, not a weak mapping.

## Extract And Review

```bash
topogram extractor check @topogram/extractor-storybook-design --json
topogram extract ./component-library --out ./extracted-topogram --from ui --extractor @topogram/extractor-storybook-design --extractor-policy ./topogram.extractor-policy.json --json
topogram extract plan ./extracted-topogram --json
topogram adopt --list ./extracted-topogram --json
topogram adopt component-mappings ./extracted-topogram --dry-run --json
```

The dry run is the review surface. It should show `component_mappings`, not silently edit canonical `topo/`.

## Adopt

After review, promote only the accepted mapping into canonical `component_map` source. In a maintained app, the reviewed mapping may be applied by an agent to the project-owned Topogram workspace after the dry-run receipt proves the source evidence.

Run proof commands after adoption:

```bash
topogram check . --json
topogram query ui-design-coverage ./topo --surface <surface> --format markdown
topogram query slice ./topo --surface <surface> --widget <widget> --detail compact --format markdown
```

## Review Closeout

Close the flow by comparing the extract plan, dry-run adoption output,
designer-readable coverage matrix, and widget slice. The important result is a
reviewed canonical `component_map`, not an inferred source import path.
