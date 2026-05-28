---
title: "Designer Review Checklist"
description: "A compact checklist for accepting or rejecting Topogram component mappings."
---

# Designer Review Checklist

> A compact checklist for accepting or rejecting Topogram component mappings.

Status: current
Audience: designers, front-end leads, design-system maintainers, and agents
Use when: a component map or extracted component mapping candidate needs human review.

Start with the matrix:

```bash
topogram query ui-design-coverage ./topo --surface <surface> --format markdown
```

Then check each row.

## Accept

Accept a row when:

- the `component_ref` is a stable design-system identity;
- the platform and viewport match the intended experience;
- the pattern matches the widget intent;
- required states are covered or explicitly deferred;
- behavior support is correctly split across rendered, contract-only, implementation-owned, and unsupported;
- i18n, ARIA, and token gaps are either resolved or tracked as review work.

## Defer

Defer a row when:

- the component exists, but behavior proof is missing;
- the component is platform-specific and another platform still needs design;
- state coverage is incomplete;
- the mapping depends on maintained code proof;
- the component ref is correct but the widget contract needs a stronger data/action shape.

## Reject

Reject a row when:

- it uses a source path, import path, CSS selector, or local class name as identity;
- the pattern does not match the widget;
- a Storybook story guessed a mapping without explicit `parameters.topogram`;
- the component is a layout shell, not a widget realization;
- the mapping would hide unsupported behavior from agents.

## Agent Handoff

After review, give agents:

- the accepted `component_map` row;
- the relevant screen or widget slice;
- the design coverage matrix;
- exact proof commands.

Useful commands:

```bash
topogram query slice ./topo --surface <surface> --widget <widget> --detail compact --format markdown
topogram query work-map ./topo --surface <surface> --format markdown
topogram emit ui-realization-report ./topo --surface <surface> --json
```

Do not ask agents to infer design intent from component source alone. The component map is the reviewed contract.
