---
title: "I18n Message Contract"
description: "Topogram should model translatable copy as message intent linked to glossary meaning, not as translation catalogs stored in the app map."
---

# I18n Message Contract

> Topogram should model translatable copy as message intent linked to glossary meaning, not as translation catalogs stored in the app map.

Status: current
Audience: product owners, UI engineers, agents, and generator/extractor authors
Use when: you need to decide where glossary terms, message keys, locale policy, and translated strings belong.

## Direction

Glossary terms define canonical meaning. Message contracts define user-visible
copy intent. Locale catalogs remain in the generated or maintained app, or in a
team localization system.

## Ownership

| Concern | Topogram owns | App/tooling owns |
| --- | --- | --- |
| Meaning | glossary terms, preferred labels, avoided terms | translator notes and final translated wording |
| Copy intent | message key, default source copy, context, variables, related terms | locale-specific strings |
| Locale behavior | default locale, supported locales, fallback, text direction expectations | framework-specific i18n setup |
| Proof | slices and reports that show message usage and missing decisions | runtime i18n tests and translation completeness checks |

## Contract Shape

The v1 model is the `messages` block on `semantic_ui` surfaces:

```tg
messages {
  locale default "en-US" fallback "en-US" direction ltr supported ["en-US"]
  message msg_item_list_title key "items.list.title" default "Items" context screen_title screen item_list
}
```

It records:

- stable message key
- default source copy
- usage context
- variables and plural/date/number/currency needs
- related glossary terms
- related screens, widgets, capabilities, errors, or notifications
- locale policy at the app or UI contract level

Topogram should not store full translation catalogs in v1. Teams can map message
keys into i18next, FormatJS, Rails I18n, Android resources, iOS strings, or a
translation-management system.

## Agent Slices

A UI slice should include only relevant glossary terms and message contracts for
the selected screen, widget, or capability. It should not include the full
glossary or every locale file.

## Generated Web Realization

React and SvelteKit generators now carry the v1 message contract into generated
web output:

- app shells render locale policy as `<html lang="..." dir="...">`;
- generators write `src/lib/topogram/messages.json`;
- screen titles, widget labels, action labels, and empty-state text use message
  defaults where present;
- generated markup includes `data-topogram-message-key` and
  `data-topogram-message-id` markers;
- `generation-coverage.json` and `ui-realization-report` show rendered,
  implementation-owned, or failed message realization.

This proves the semantic message contract is carried into generated web output.
It does not replace runtime i18n libraries, translated locale catalogs, or
translation-completeness checks.

## Current Contract

The app map records this direction through
`pitch_i18n_message_contract`,
`decision_i18n_messages_are_separate_from_glossary_terms`, and
`req_i18n_message_contract_v1`.
