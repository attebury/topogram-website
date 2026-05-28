---
title: "Normalized Layout Vocabulary"
description: "Shared language for journey-driven generated layout decisions."
---

# Normalized Layout Vocabulary

> Shared language for journey-driven generated layout decisions.

Status: current
Audience: Topogram authors, generator authors, and agents reviewing UI output
Use when: you need to understand workflow frequency, layout rules, or generated layout proof markers.

Topogram layout terms are semantic. They describe how work should be organized,
not which CSS, SwiftUI, Compose, or React Native constructs render it.

## Frequency

Journey `primary_frequency` and step `frequency` tell generators how often a
workflow is expected to be used.

- `daily`: primary operational work. Put it in the main workspace, make it easy
  to return to, and keep repeated actions close to the data.
- `weekly`: review or planning work. Prefer summary, comparison, and progress
  layouts.
- `occasional`: less frequent task work. Keep it discoverable without crowding
  the daily path.
- `setup`: onboarding and first-run setup. Prefer ordered setup screens and
  next-step primary actions.
- `admin`: administrative work. Keep it available but secondary to the main
  product workflow.

## Layout Rules

Generators normalize frequency into a `layoutRule` in UI surface contracts and
render it as `data-topogram-layout-rule` in generated web pages.

- `primary_daily_workspace`: daily work gets primary navigation and dense,
  repeatable task surfaces.
- `weekly_review_workspace`: weekly work gets summary/review composition.
- `occasional_task_workspace`: occasional work gets a normal task page without
  taking over the primary path.
- `setup_onboarding_flow`: setup work gets first-run/onboarding ordering.
- `admin_secondary_workspace`: admin work gets secondary navigation and
  utilitarian management screens.
- `unmapped_screen`: a screen is routed but not mapped by a journey step.

## Contract Fields

UI surface contracts expose:

- `journeyLayoutPlan.journeys`: ordered journey records used by the surface.
- `journeyLayoutPlan.screenOrder`: first-seen screen order from journey steps.
- `journeyLayoutPlan.screenRules`: screen-to-frequency and screen-to-layout-rule
  mapping.
- `screen.journeyLayout`: the selected rule for an individual screen.

Generator output should keep these terms visible enough for proof checks while
letting the target stack own final rendering details.
