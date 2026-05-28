---
title: "Glossary"
description: "Generated from term records in the Topogram workspace. Use this glossary to align humans and agents on current Topogram vocabulary."
---

# Glossary

> Generated from term records in the Topogram workspace. Use this glossary to align humans and agents on current Topogram vocabulary.

Status: current
Audience: humans and agents aligning vocabulary
Use when: you need definitions for Topogram terms used in slices, docs, and SDLC records.

Generated from `term` records in the Topogram workspace. Use `topogram emit glossary ./topo --write --out-dir docs/concepts` to refresh this file.

## Accessibility

### Accessibility Obligation

A semantic promise that a screen, widget, or behavior must be usable by assistive technology and keyboard or alternative input users.

- ID: `term_accessibility_obligation`
- Domain: `dom_generator_runtime`
- Aliases: `a11y_obligation`
- Related terms: `term_semantic_ui`, `term_widget`

### Accessible Name

The label or naming source that assistive technologies use to identify an interactive control, region, or widget.

- ID: `term_accessible_name`
- Domain: `dom_generator_runtime`
- Aliases: `aria_label`, `label_source`
- Related terms: `term_accessibility_obligation`, `term_translatable_message`

### Keyboard Interaction

The expected keyboard behavior for a screen or widget, including tab order, arrow-key navigation, escape behavior, activation keys, and shortcuts.

- ID: `term_keyboard_interaction`
- Domain: `dom_generator_runtime`
- Aliases: `keyboard_model`
- Related terms: `term_accessibility_obligation`

### Live Region

A UI area whose changes should be announced to assistive technologies, such as status, validation, loading, or error updates.

- ID: `term_live_region`
- Domain: `dom_generator_runtime`
- Aliases: `announcement_region`, `aria_live`
- Related terms: `term_accessibility_obligation`, `term_translatable_message`

### Semantic Role

The user-facing purpose of a UI element or region, such as button, grid, dialog, form, navigation, status, or alert.

- ID: `term_semantic_role`
- Domain: `dom_generator_runtime`
- Aliases: `aria_role`, `role_intent`
- Related terms: `term_accessibility_obligation`

## Agent Workflow

### Agent Brief

A read-only onboarding packet that tells an agent what to read, which commands to run first, and which project boundaries matter.

- ID: `term_agent_brief`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `brief`, `first_run_packet`

### Agent Mode

A declared work posture such as modeling, implementation, review, verification, extract-adopt, maintained-app, generated-app, or release.

- ID: `term_agent_mode`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `task_mode`, `work_mode`
- Related terms: `term_context_slice`

### Agent-Safe Change

A code or Topogram change made from bounded context, explicit write scope, and known verification commands.

- ID: `term_agent_safe_change`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `safe_agent_change`
- Related terms: `term_context_slice`, `term_verification`

### App Map

The validated Topogram view of an app's intent, contracts, ownership, runtime topology, rules, and proof.

- ID: `term_app_map`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `living_app_map`
- Related terms: `term_agent_brief`, `term_context_slice`

### Context Slice

A focused app-map packet for one capability, widget, surface, SDLC item, or related target, intended to be small enough for agent work.

- ID: `term_context_slice`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `focused_packet`, `slice`
- Related terms: `term_agent_brief`, `term_app_map`

### Proof Section

A context-slice section containing verification targets, proof gaps, receipt summaries, or commands needed before work is complete.

- ID: `term_proof_section`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `proof_context`
- Related terms: `term_context_slice`, `term_slice_manifest`, `term_verification`

### Slice Detail Level

The query slice depth setting that lets agents choose compact, standard, or full context without changing the selected graph focus.

- ID: `term_slice_detail_level`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `detail_level`, `slice_depth`
- Related terms: `term_context_slice`, `term_slice_manifest`

### Slice Manifest

The read-order map inside a context slice that labels sections as must-read, reference, proof, or diagnostic.

- ID: `term_slice_manifest`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `read_order`, `section_manifest`
- Related terms: `term_agent_mode`, `term_context_slice`

### Work Map

A graph organized around where product work belongs and how it is proven, not a framework render tree.

- ID: `term_work_map`
- Domain: `dom_generator_runtime`
- Related terms: `term_component_map`, `term_layout`, `term_region`, `term_screen_render`, `term_semantic_ui`, `term_widget`

## Extract/Adopt

### Adopted Contract

A reviewed candidate promoted into canonical topo source and treated as project-owned app-map truth.

- ID: `term_adopted_contract`
- Domain: `dom_import_adoption`
- Aliases: `canonical_contract`
- Related terms: `term_adoption`, `term_reviewable_candidate`

### Adoption

The explicit promotion of reviewed extraction candidates into canonical topo source.

- ID: `term_adoption`
- Domain: `dom_import_adoption`
- Related terms: `term_candidate`

### Candidate

A review-only inferred record produced by extraction before it becomes canonical Topogram source.

- ID: `term_candidate`
- Domain: `dom_import_adoption`
- Aliases: `draft_candidate`, `reviewable_candidate`
- Related terms: `term_adoption`, `term_extractor`

### Extractor

A read-only package or built-in adapter that inspects brownfield source and emits candidates, findings, and evidence.

- ID: `term_extractor`
- Domain: `dom_import_adoption`
- Aliases: `extractor_pack`

### Reviewable Candidate

An extraction candidate with evidence that must be reviewed before it becomes canonical Topogram source.

- ID: `term_reviewable_candidate`
- Domain: `dom_import_adoption`
- Aliases: `candidate`
- Related terms: `term_adoption`, `term_candidate`

## Generation

### Emit

The command verb for printing or writing contracts, reports, snapshots, migration plans, and other named artifacts.

- ID: `term_emit`
- Domain: `dom_cli`
- Related terms: `term_generator`

### Generator

A package or bundled adapter that realizes Topogram contracts into app, runtime, API, database, or native output.

- ID: `term_generator`
- Domain: `dom_generator_runtime`
- Aliases: `generator_pack`

### Runtime

A topology unit such as a web surface, API service, database, or native surface that binds a surface to a generator.

- ID: `term_runtime`
- Domain: `dom_generator_runtime`
- Aliases: `topology_runtime`
- Related terms: `term_generator`

## I18n

### Glossary Term

A canonical definition of domain or Topogram vocabulary used to preserve meaning across humans, agents, contracts, and generated or maintained code.

- ID: `term_glossary_term`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `term`
- Related terms: `term_context_slice`

### Locale Policy

The app-level internationalization expectations for default locale, supported locales, fallback locale, text direction, and date, number, currency, and pluralization behavior.

- ID: `term_locale_policy`
- Domain: `dom_generator_runtime`
- Aliases: `i18n_policy`, `localization_policy`
- Related terms: `term_translatable_message`

### Message Key

A stable identifier for a translatable message that lets generated or maintained app code bind UI copy to localization catalogs without losing semantic context.

- ID: `term_message_key`
- Domain: `dom_generator_runtime`
- Aliases: `i18n_key`, `translation_key`
- Related terms: `term_translatable_message`

### Translatable Message

A user-visible copy contract with a stable key, default source text, usage context, variables, and optional term references.

- ID: `term_translatable_message`
- Domain: `dom_generator_runtime`
- Aliases: `copy_contract`, `message`
- Related terms: `term_glossary_term`, `term_locale_policy`, `term_message_key`

## Ownership

### Enforced Rule

A rule whose obligation currently applies to the project.

- ID: `term_enforced_rule`
- Domain: `dom_engine_quality`
- Aliases: `active_rule`

### Generated-Owned Output

Output that Topogram is allowed to replace from canonical contracts and generator bindings.

- ID: `term_generated_owned_output`
- Domain: `dom_workspace_project_config`
- Aliases: `generated_output`

### Maintained Output

Project source that humans or agents edit directly; Topogram can emit guidance but must not overwrite it.

- ID: `term_maintained_output`
- Domain: `dom_workspace_project_config`
- Aliases: `maintained_source`
- Related terms: `term_generated_owned_output`

### Proof Command

A command that validates an app-map expectation, generated output, maintained change, or SDLC state.

- ID: `term_proof_command`
- Domain: `dom_engine_quality`
- Aliases: `proof_gate`, `verification_command`
- Related terms: `term_agent_safe_change`, `term_verification`

## SDLC

### Acceptance Criterion

An observable Given/when/then proof condition attached to a requirement.

- ID: `term_acceptance_criterion`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `ac`, `acceptance`
- Related terms: `term_requirement`, `term_verification`

### Ongoing Requirement

A durable operating commitment that stays enforced through linked rules or verification rather than closing as satisfied.

- ID: `term_ongoing_requirement`
- Domain: `dom_sdlc_query_agent_context`
- Related terms: `term_enforced_rule`, `term_requirement`

### Pitch

An SDLC record that explains why a problem matters, the appetite for solving it, and traps to avoid.

- ID: `term_pitch`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `problem_framing`

### Requirement

An SDLC commitment that describes behavior or policy Topogram should satisfy until it is satisfied, superseded, or marked ongoing.

- ID: `term_requirement`
- Domain: `dom_sdlc_query_agent_context`
- Related terms: `term_acceptance_criterion`

### Task

A small implementation slice that satisfies requirements, references approved acceptance criteria, and closes with verification proof.

- ID: `term_task`
- Domain: `dom_sdlc_query_agent_context`
- Related terms: `term_acceptance_criterion`, `term_requirement`, `term_verification`

### Verification

A proof target or check that demonstrates an accepted expectation holds.

- ID: `term_verification`
- Domain: `dom_sdlc_query_agent_context`
- Aliases: `proof_gate`

## UI Widgets

### Component Map

A widget-first group of platform component refs, style refs, and behavior support for one design language.

- ID: `term_component_map`
- Domain: `dom_generator_runtime`
- Related terms: `term_component_ref`, `term_design_language`, `term_design_matrix`, `term_platform_realization`, `term_style_ref`, `term_widget`

### Component Ref

A stable design-language identity for a platform component, independent of local source import paths.

- ID: `term_component_ref`
- Domain: `dom_generator_runtime`
- Related terms: `term_design_language`, `term_design_matrix`

### Design Language

A Topogram record that owns design-system scope, platforms, surfaces, package identity, semantic style intent, and design-token mappings for semantic UI realization.

- ID: `term_design_language`
- Domain: `dom_generator_runtime`
- Related terms: `term_component_map`, `term_platform_realization`, `term_semantic_ui`, `term_style_intent`, `term_widget`

### Design Matrix

A widget-first coverage view that groups component refs, platforms, viewports, density, state coverage, token status, accessibility status, i18n status, and review gaps for design work.

- ID: `term_design_matrix`
- Domain: `dom_generator_runtime`
- Related terms: `term_component_map`, `term_component_ref`, `term_design_language`, `term_widget`

### Design Review Gap

A missing or incomplete design realization signal, such as unsupported behavior, contract-only behavior, missing platform, missing state, missing token mapping, missing accessibility obligation, or missing i18n message.

- ID: `term_design_review_gap`
- Domain: `dom_generator_runtime`
- Related terms: `term_accessibility_obligation`, `term_design_matrix`, `term_platform_realization`, `term_translatable_message`

### Layout

A reusable semantic template with a layout pattern and slot roles that composes region contracts for screens without defining a framework render tree.

- ID: `term_layout`
- Domain: `dom_generator_runtime`
- Aliases: `layout_archetype`, `screen_template`, `semantic_layout`
- Related terms: `term_region`, `term_semantic_ui`, `term_widget`, `term_work_map`

### Platform Realization

The way a semantic UI widget, behavior, or design-token role is rendered, carried as contract-only, owned by implementation code, or left unsupported for a specific platform.

- ID: `term_platform_realization`
- Domain: `dom_generator_runtime`
- Related terms: `term_design_language`, `term_surface`

### Region

A reusable semantic work area, such as content, toolbar, filters, results, navigation, or footer actions, with design, accessibility, i18n, state, and allowed-widget expectations.

- ID: `term_region`
- Domain: `dom_generator_runtime`
- Aliases: `semantic_region`, `work_area`
- Related terms: `term_layout`, `term_semantic_ui`, `term_widget`, `term_work_map`

### Screen Render

The canonical screen-level work-map leaf where a region renders a reusable widget, named section, or action with data source, behavior, design, accessibility, and proof context.

- ID: `term_screen_render`
- Domain: `dom_generator_runtime`
- Aliases: `render_entry`, `screen_work_leaf`
- Related terms: `term_component_map`, `term_layout`, `term_region`, `term_semantic_ui`, `term_widget`

### Style Intent

Scoped semantic visual guidance inherited through the UI work map, such as brand consistency, density, emphasis, or review-focused presentation, without defining CSS or platform modifiers.

- ID: `term_style_intent`
- Domain: `dom_generator_runtime`
- Related terms: `term_design_language`, `term_layout`, `term_region`, `term_screen_render`, `term_style_ref`, `term_widget`

### Style Ref

A stable design-system style identity, such as a MAUI style name or component-library style token, used in component maps without naming source paths, CSS selectors, or local classes.

- ID: `term_style_ref`
- Domain: `dom_generator_runtime`
- Related terms: `term_component_map`, `term_design_language`, `term_style_intent`

### Surface

A concrete surface such as web or ios that realizes a platform-neutral contract for a target platform.

- ID: `term_surface`
- Domain: `dom_generator_runtime`
- Related terms: `term_semantic_ui`

### UI Contract

The platform-neutral UI surface that owns screens, layout usage, screen region overrides, render entries, navigation, behavior, and semantic design intent.

- ID: `term_semantic_ui`
- Domain: `dom_generator_runtime`
- Related terms: `term_layout`, `term_region`, `term_widget`

### Widget

A reusable semantic UI contract that can bind to screens and regions without naming a framework component tree. Unsupported widget realization must be visible as contract-only, unsupported, or explicit implementation work for developer and agent review.

- ID: `term_widget`
- Domain: `dom_generator_runtime`
- Aliases: `semantic_component`
