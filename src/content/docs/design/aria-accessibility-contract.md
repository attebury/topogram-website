---
title: "ARIA Accessibility Contract"
description: "Topogram should model accessibility obligations semantically; ARIA attributes are web implementation evidence, not the contract source."
---

# ARIA Accessibility Contract

> Topogram should model accessibility obligations semantically; ARIA attributes are web implementation evidence, not the contract source.

Status: current
Audience: product owners, UI engineers, accessibility reviewers, agents, and generator/extractor authors
Use when: you need to decide where accessibility intent, ARIA attributes, keyboard behavior, focus, labels, and proof belong.

## Direction

Topogram should own the accessibility promise. Web and native implementations
own the platform-specific mechanics that satisfy it.

For web, that evidence may include semantic HTML, `aria-*` attributes, focus
management, keyboard tests, axe results, and Playwright assertions. For native,
the equivalent evidence may be VoiceOver labels, accessibility identifiers, and
platform UI tests.

## Ownership

| Concern | Topogram owns | App/tooling owns |
| --- | --- | --- |
| Obligation | roles, accessible-name source, keyboard model, focus behavior, live-region need | exact DOM, ARIA attributes, component-library internals |
| Copy | related message keys and glossary terms for labels and announcements | translated labels and locale catalogs |
| Proof | report obligations, missing decisions, expected checks, slice context | axe, Playwright, XCTest, Android accessibility tests, manual audit artifacts |
| Extraction | reviewable evidence that markup already uses roles, labels, and ARIA | final adoption and implementation fixes |

## Contract Shape

The v1 model is the `accessibility` block on `ui_contract` projections:

```tg
accessibility {
  screen item_list role main name_from message msg_item_list_title keyboard standard focus visible live off
  widget widget_data_grid role grid name_from message msg_items_table_label keyboard data_grid focus roving_tabindex live off
}
```

It describes:

- semantic role intent
- accessible-name requirement and source
- keyboard interaction model
- focus entry, return, and trap behavior where relevant
- live-region or announcement requirements
- loading, empty, validation, and error-state obligations
- automation hooks and proof commands

Topogram should not mirror every `aria-*` attribute into `.tg`. Raw attributes
are too framework-specific and too easy to preserve mechanically while missing
real behavior.

## Agent Slices

A screen or widget slice should include only the accessibility obligations
relevant to that work target, plus related message keys, glossary terms, and
proof commands.

## Current Contract

The app map records this direction through
`pitch_aria_accessibility_contract`,
`decision_aria_attributes_are_implementation_evidence`, and
`req_aria_accessibility_contract_v1`.
