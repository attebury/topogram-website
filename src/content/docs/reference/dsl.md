---
title: "DSL Reference"
description: "Topogram files use .tg statements:"
---

# DSL Reference

> Topogram files use .tg statements:

Status: current
Audience: Topogram authors and tooling implementers
Use when: you need DSL statement and field reference material.

Topogram files use `.tg` statements:

```text
kind identifier {
  field value
  block_field {
    entry values
  }
}
```

The parser accepts generic statement syntax. The validator defines the public
grammar.

## Portable identifiers

Semantic names that compile into generated SQL, Prisma, TypeScript, or HTTP
contracts must be portable Topogram identifiers: `^[a-z][a-z0-9_]*$`.
This includes entity field names, shape field names, shape rename targets, DB
table aliases, and DB column aliases. Use snake_case semantic names in the
model; do not rely on quoted SQL identifiers or framework-specific property
names.

## Statement kinds

- `term`
- `actor`
- `role`
- `enum`
- `entity`
- `shape`
- `rule`
- `capability`
- `seed_data`
- `theme`
- `widget`
- `section`
- `navpoint`
- `endpoint`
- `region`
- `layout`
- `design_language`
- `component_map`
- `journey`
- `workflow`
- `decision`
- `surface`
- `verification`
- `domain`
- `pitch`
- `requirement`
- `acceptance_criterion`
- `task`
- `plan`
- `bug`

Documents are markdown files with frontmatter under `topo/docs/**`.

## Rule status

Rules use a rule-specific lifecycle: `draft`, `proposed`, `enforced`, and
`deprecated`. Use `status enforced` for rules that currently apply. Other graph
kinds may still use `status active` where their lifecycle allows it.

## Terms and Glossary

`term` records define project vocabulary. They are graph-native, can be grouped
with `category`, and can be tied to a domain with `domain`. Other records can
reference slice-relevant vocabulary through `related_terms`; entities also keep
`uses_terms` for business/domain language.

```tg
term term_context_slice {
  name "Context Slice"
  description "A focused graph packet for one implementation target."
  category agent_workflow
  domain dom_sdlc_query_agent_context
  aliases [slice focused_packet]
  status active
}

capability cap_query_context {
  name "Query Focused Context"
  description "List and show focused query packets."
  related_terms [term_context_slice]
  status active
}
```

Emit the human glossary from term records:

```bash
topogram emit glossary ./topo --write --out-dir docs/concepts
topogram emit glossary ./topo --check docs/concepts/glossary.md
```

## Surface types

- `semantic_ui`
- `web`
- `ios`
- `android`
- `api`
- `db`
- `cli`

## Capability Persistence

`capability` records can declare persistence contracts directly. The legacy
`reads`, `creates`, `updates`, and `deletes` fields still work and are
normalized into `persistenceContracts`; explicit `persistence { ... }` blocks
are preferred when generators need read/write semantics.

```tg
capability cap_list_program_templates {
  name "List Program Templates"
  description "Browse starter program templates."
  reads [entity_program_template]
  output [shape_program_template]

  persistence {
    id list_program_templates
    entity entity_program_template
    operation read
    output shape_program_template
    result collection
    write none
  }

  status active
}
```

Valid values:

- `operation`: `read`, `create`, `update`, `delete`
- `result`: `item`, `collection`, `none`
- `write`: `insert`, `merge`, `replace`, `hard_delete`, `soft_delete`, `none`

`soft_delete` contracts must also set `field` and `value`, and the field must
exist on the referenced entity.

## Seed Data

`seed_data` records are stack-agnostic fixtures tied to a domain entity. Use
them for catalog rows, demo data, or test data that should travel with the
model instead of living as hardcoded generator sample rows.

```tg
seed_data seed_program_templates {
  name "Program Template Seeds"
  description "Prototype catalog records."
  entity entity_program_template
  purpose catalog_fixture

  record {
    id five_three_one
    field id "5-3-1"
    field name "5/3/1"
    field description "Four-week strength template."
  }

  status active
}
```

Valid `purpose` values are `catalog_fixture`, `demo_fixture`, and
`test_fixture`. Validators check the entity reference, field names, duplicate
record ids, and required entity fields without defaults.

## Theme Records

`theme` records are concrete, stack-agnostic design token records. They bind
semantic roles and token paths to values without saying whether those values
become CSS variables, SwiftUI colors, Compose `MaterialTheme`, Tailwind config,
React Native theme objects, Figma tokens, or documentation.

```tg
theme theme_lifting_light {
  name "Lifting Light"
  description "Concrete light theme tokens for lifting prototypes."
  color background "#f4f6f8"
  color panel "#ffffff"
  color text "#182026"
  color muted "#667484"
  color line "#dce4eb"
  color action "#0f6b5f"
  color danger "#b42318"
  token surface.page.background "#f4f6f8"
  token action.primary.background "#0f6b5f"
  token text.default "#182026"
  spacing unit "1rem"
  radius card medium
  typography heading "system.heading"
  density comfortable
  state action.primary.hover.background "#0c5a50"
  accessibility contrast aa
  status active
}
```

Use `design_language theme <theme_id>` to attach the concrete theme to a
design-system scope. Validators check theme references, color values, token
paths, radius scales, density values, accessibility contrast intent, and
duplicate roles.

## UI ownership

`semantic_ui` owns semantic UI blocks:

- `screens`
- `screen_regions`
- `navigation`
- `app_shell`
- `collection_views`
- `screen_actions`
- `visibility_rules`
- `field_lookups`
- `design_tokens`
- `messages`
- `accessibility`

Top-level `screen` records own `layout` and `renders`. Screens may reference
reusable semantic layouts with `layout <layout>`. Those layouts inherit
reusable regions from `region` records.
`screen_regions` remains available for one-off regions and per-screen
overrides.

Concrete surfaces own navpoints and hints:

- `navpoints`
- `navigation`
- `web_hints`
- `ios_hints`

`navpoint` records are surface-neutral product destinations. They answer how a
user reaches a screen, not what the screen renders. HTTP/API behavior belongs
in `endpoint` records.

```tg
navpoint nav_workout_logger {
  name "Workout Logger Navpoint"
  description "Open a specific workout session."
  path "/workouts/:id"
  params [id]
  screen screen_workout_logger
  loader cap_view_workout_session
  action cap_complete_workout
  auth authenticated
  status active
}
```

Concrete UI surfaces realize the navpoints they expose. A surface may override
navpoint realization concerns such as `path`, `auth`, `loader`, or `action`;
path overrides must preserve the canonical navpoint params.

```tg
surface proj_web {
  name "Web"
  description "Web app."
  type web
  realizes [proj_semantic_ui]
  outputs [app]

  navpoints {
    navpoint nav_home
    navpoint nav_workout_logger path "/training/:id"
  }

  navigation {
    group main label "Main" placement primary pattern navigation_rail
    navpoint nav_home group main label "Home" order 10 default true visible true sitemap include
    navpoint nav_workout_logger visible false sitemap exclude breadcrumb nav_home
  }

  status active
}
```

Navpoint-targeted `navigation` uses the existing navigation vocabulary:
`placement` values are `primary`, `secondary`, or `utility`; `visible` and
`default` are `true` or `false`; `sitemap` is `include` or `exclude`; and
`pattern` uses normalized navigation patterns such as `navigation_rail`,
`tabs`, `bottom_tabs`, and `stack_navigation`. Workflow frequency and setup
ordering stay in `journey` records, not navpoint navigation.

API surfaces use `endpoint` records. Endpoint ids should name the product
operation, such as `endpoint_list_patients`, while HTTP method remains metadata.
Endpoint response intent is explicit so agents and generators can distinguish
array list APIs from object detail APIs without inferring shape from prose.

```tg
endpoint endpoint_list_patients {
  name "List Patients Endpoint"
  description "List patients for the API."
  method GET
  path "/api/patients"
  capability cap_list_patients
  success 200
  auth user
  request none
  response_result collection
  response_entity entity_patient
  response_container json_array
  status active
}

surface proj_api {
  name "API"
  description "HTTP API service."
  type api
  realizes [cap_list_patients]
  outputs [server_contract]

  endpoints {
    endpoint endpoint_list_patients
  }

  status active
}
```

`messages` models translation intent, not locale catalogs:

```tg
messages {
  locale default "en-US" fallback "en-US" direction ltr supported ["en-US"]
  message msg_item_list_title key "items.list.title" default "Items" context screen_title screen item_list
  message msg_items_table_label key "items.table.label" default "Items table" context widget_label widget widget_data_grid
}
```

`accessibility` models obligations, not raw `aria-*` attributes:

```tg
accessibility {
  screen item_list role main name_from message msg_item_list_title keyboard standard focus visible live off
  widget widget_data_grid role grid name_from message msg_items_table_label keyboard data_grid focus roving_tabindex live off
}
```

`region` defines a reusable semantic work area. It is not a DOM node,
component, or CSS class. `style_intent` is semantic guidance, not CSS.

```tg
region region_collection_results {
  name "Collection Results"
  description "Primary result collection area for list, board, and calendar screens."
  kind results
  pattern resource_table
  placement primary
  states [loading empty error]
  density comfortable
  style_intent [surface scannable]
  accessibility_obligations [region_label keyboard_reachable]
  i18n_obligations [empty_state_copy]
  allowed_widget_patterns [resource_table resource_cards calendar_view]
  status active
}
```

`layout` composes region records into a reusable semantic template.
Layouts are semantic templates, not framework templates.

```tg
layout layout_collection_list {
  name "Collection List Layout"
  description "Standard collection screen with toolbar, filters, and results."
  pattern collection_workspace
  parent layout_standard_app_shell
  fills content
  style_intent [dense_collection]

  slot {
    id toolbar
    uses region_action_toolbar
    role command_area
    placement top
  }

  slot {
    id filters
    uses region_filter_panel
    role filter_area
    placement secondary
  }

  slot {
    id results
    uses region_collection_results
    role primary_work_area
    placement primary
  }

  status active
}
```

Screens reference the layout and render widgets, actions, or named sections into
inherited layout regions or explicit `screen_regions` overrides:

```tg
screen screen_item_list {
  name "Items"
  description "Browse items."
  title "Items"
  kind list
  layout layout_collection_list
  renders {
    region results widget widget_data_grid id item_list_results_grid intent "Review item rows." priority high style_intent [review_density] data rows from cap_list_items event row_select navigate item_detail
  }
  status active
}
```

Visual composition belongs on `screen.renders`. A render entry places a widget,
action, or named section into a screen region. `section` records are lightweight
named UI areas for real screen content that is not yet a reusable widget.

```tg
section section_free_lift_form {
  name "Free Lift Form"
  description "One-off free-lift logging form."
  kind form
  status active
}

screen screen_workout_logger {
  name "Workout Logger"
  description "Log a workout."
  kind form
  layout layout_focused_form
  title "Workout"

  renders {
    region results widget widget_workout_logger id workout_session_logger
    region footer_actions action cap_complete_workout id complete_workout
    region content section section_free_lift_form id free_lift_form
  }

  status active
}
```

`layout.pattern` names the reusable work archetype, while slot `role` names the
job of each region in that archetype. Screen render entries are the work leaves
where region, widget/action/section target, data, actions, messages,
accessibility, design review, and proof context meet.

`style_intent` may also appear on `design_language`, `screen`, and `widget`.
Topogram resolves style intent additively from design language through layout,
region, screen, widget, binding, and component map. Reports expose inherited and
local style intent as review context; they do not define CSS or native view
modifiers.

`design_language` owns design-system scope, supported platforms, optional
surface bindings, optional concrete `theme`, package identity, and design-token
mappings. Real projects should keep widget/component mappings in
`component_map` records so the contract header stays small at scale.

```tg
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
```

`component_map` maps semantic widgets to platform component refs and
behavior support. The graph is not a render tree; it is a work map that shows
where design/platform realization work belongs and what still needs review.

```tg
component_map component_map_company_web_widgets {
  name "Company Web Component Map"
  description "Maps shared widgets to company web component refs."
  design_language design_company_web
  status active

  widget_mapping {
    id data_grid_wide
    widget widget_data_grid
    platform web
    viewport wide
    component_ref "company.dataGrid"
    component {
      module "src/components/DataGrid.tsx"
      export "DataGrid"
      framework react
    }
    style_refs ["company.dataGrid.compact"]
    pattern data_grid_view
    density compact
    state_coverage [loading empty error]
    role_contexts [reviewer]
    theme_contexts [light dark]
    locale_contexts [default_locale]
    review_notes "Sorting is still contract-only until the adapter proves it."
    status rendered
    behaviors_rendered [selection]
    behaviors_contract_only [sorting]
  }
}
```

Supported design-language platforms are `web`, `ios`, and `android`.
Widget mapping statuses are `rendered`, `contract_only`,
`implementation_owned`, and `unsupported`. Realization entries may also carry
review metadata: `density`, `state_coverage`, `role_contexts`,
`theme_contexts`, `locale_contexts`, `style_refs`, and `review_notes`.
Realization entries must use `component_ref`; `import_path`, `source_path`,
and `path` are rejected as canonical identity. `style_refs` are stable
design-system style identities, not source paths, CSS selectors, or local
class names. Component and behavior mappings belong in
`component_map`, not in `design_language`.

Use optional structured `component { ... }` evidence when a maintained app has a
real source implementation to prove. The `component_ref` string stays the stable
semantic identity, while `component.module`, `component.export`, and
`component.framework` identify the implementation that reports can check.
`module` must be a safe relative project path, `export` is a named export or
`default`, and supported frameworks are `vanilla`, `react`, `svelte`, `vue`,
`solid`, `angular`, `swiftui`, `compose`, and `react_native`.

Use `topogram query ui-design-coverage ./topo --surface <surface> --json` to
review the JSON design matrix, or `--format markdown` for a designer-readable
table. The matrix surfaces unmapped widgets, missing platforms, missing states,
missing token mappings, missing accessibility obligations, missing i18n
messages, missing style evidence, unproved structured component references, and
contract-only or unsupported behavior from authored design languages and
component maps.

## API blocks

`api` surfaces use blocks such as `endpoints`, `wire_fields`,
`responses`, `error_responses`, `preconditions`, `idempotency`, `cache`,
`delete_semantics`, `async_jobs`, `async_status`, `downloads`,
`authorization`, and `callbacks`.

Generated-owned API metadata is validated before code generation. Endpoint and
async status paths must be absolute generated paths without whitespace,
control characters, quotes, backticks, or backslashes. Header names must be
RFC token-style names. Download media values must be simple `type/subtype`
tokens, and generated download filenames must not contain path separators or
control characters.

Endpoint `auth` is runtime policy for generated API servers. `auth user`
requires a valid bearer principal, `auth manager` requires the `manager` role or
admin access, and `auth admin` requires the `admin` role or admin flag.
`authorization { ... }` rules remain additive checks for roles, permissions,
claims, and ownership.

## DB blocks

`db` surfaces use `tables`, `columns`, `keys`, `indexes`,
`relations`, and `lifecycle`.

`tables` and `columns` aliases are portable Topogram identifiers. Topogram
also checks the realized column names after mappings are applied so two entity
fields cannot collapse onto the same generated DB column.

When no explicit `surface type db` exists, DB contract generation derives a
synthetic projection from entity fields, entity keys, entity relations, and
capability persistence contracts. The default derived id is `proj_db_derived`;
local-first runtime generation uses `proj_db_local` for its SQLite prototype
projection. Explicit DB surfaces remain authoritative when present.

## CLI surface blocks

`cli` surfaces use `commands`, `command_options`, `command_outputs`,
`command_effects`, and `command_examples`.

Allowed command effects are `read_only`, `writes_workspace`, `writes_app`,
`network`, `package_install`, `git`, and `filesystem`.

## Journeys

`journey` statements model ordered user, maintainer, or agent workflows as graph
source. Canonical journeys live in `.tg` files, usually under `topo/journeys/`.
Markdown journey documents are transitional/supporting drafts produced by import
or reconcile workflows; promote durable journeys into graph-native `journey`
records.

Journeys can declare workflow frequency and map steps to UI screens and
capabilities. Generators use this to order navigation, setup flows, primary
actions, and layout-rule proof markers.

Required fields:

- `name`
- `description`
- `status`
- `actors`
- `goal`
- at least one `step { ... }`

Allowed statuses are `draft`, `canonical`, `active`, and `deprecated`.

Relationship fields may include `domain`, `roles`, `related_capabilities`,
`related_rules`, `related_surfaces`, `related_widgets`,
`related_verifications`, `related_decisions`, and `related_docs`.

Journey steps and alternates use repeated ordered record blocks. The parser
syntax is the normal block syntax; validators preserve source order and enforce
known record fields.

```tg
journey journey_greenfield_start_from_template {
  name "Greenfield Start From Template"
  description "A developer starts a new app from a template."
  status canonical
  domain dom_catalog_templates
  actors [actor_consumer_developer]
  goal "Create a valid generated app from a copied Topogram starter."
  primary_frequency setup

  step {
    id inspect_templates
    intent "Find available templates."
    screen screen_template_catalog
    capability cap_list_templates
    frequency setup
    commands ["topogram template list --json"]
    expects ["Template aliases and package-backed entries are visible."]
  }

  step {
    id create_project
    intent "Copy the selected template into a project."
    after [inspect_templates]
    commands ["topogram copy hello-web ./my-app"]
    expects ["Project contains topo/, topogram.project.json, README.md, and AGENTS.md."]
  }

  alternate {
    id use_package_spec
    from inspect_templates
    condition "The desired template is not in the catalog."
    commands ["topogram copy @topogram/template-hello-web ./my-app"]
  }
}
```

`step` records support `id`, `intent`, `after`, `commands`, `expects`, and
`notes`, plus optional `screen`, `capability`, and `frequency`. Valid frequency
values are `daily`, `weekly`, `occasional`, `setup`, and `admin`. `alternate`
records support `id`, `from`, `condition`, `commands`, `expects`, and `notes`.
Step IDs must be unique, `after` must reference existing steps, `screen` must
reference a screen, `capability` must reference a capability, and
`alternate.from` must reference an existing step.

## Workflows

`workflow` statements model application state machines or process flows as graph
source. Use them when the app itself has states and transitions, such as review
lifecycles, approval flows, XState machines, BPMN processes, or other
workflow-native sources.

Required fields:

- `name`
- `description`
- `status`
- at least one `state { ... }`

Allowed statuses use the normal graph lifecycle: `draft`, `proposed`, `active`,
and `deprecated`.

Relationship fields may include `domain`, `actors`, `roles`,
`related_capabilities`, `related_rules`, `related_entities`,
`related_journeys`, `related_verifications`, `related_decisions`, and
`related_docs`.

Workflow states and transitions use repeated ordered record blocks. Validators
preserve source order, require unique IDs, and check transition state and
capability references.

```tg
workflow workflow_review {
  name "Review Workflow"
  description "Tracks an item from draft through review and approval."
  status active
  actors [actor_reviewer]
  related_capabilities [cap_submit_item cap_approve_item]

  state {
    id draft
    name "Draft"
    type initial
  }

  state {
    id submitted
    name "Submitted"
  }

  state {
    id approved
    name "Approved"
    type terminal
  }

  transition {
    id submit
    from draft
    to submitted
    event "SUBMIT"
    capability cap_submit_item
  }

  transition {
    id approve
    from submitted
    to approved
    event "APPROVE"
    capability cap_approve_item
  }
}
```

`state` records support `id`, `name`, `description`, and `type`. State types are
`normal`, `initial`, `terminal`, `final`, and `error`. `transition` records
support `id`, `from`, `to`, `event`, `capability`, `guard`, `actors`, `roles`,
and `description`. `to` is required; `from` may be omitted for entry or start
transitions.

Workflow slices are available through:

```bash
topogram query slice ./topo --workflow workflow_review --detail compact --json
topogram emit context-slice ./topo --workflow workflow_review --detail compact --json
```
