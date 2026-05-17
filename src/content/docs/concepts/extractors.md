---
title: "Extractors"
description: "Extractors read brownfield source and emit review-only candidates for Topogram adoption."
---

# Extractors

> Extractors read brownfield source and emit review-only candidates for Topogram adoption.

Status: current
Audience: developers, agents, and extractor package authors
Use when: you need to understand what extractors do before selecting, authoring, or trusting an extractor package.

Extractors are execution dependencies for `topogram extract`. They inspect an
existing app and return findings, evidence, and candidates. Topogram core owns
normalization, persistence, reports, reconcile/adoption plans, and canonical
`topo/**` writes.

Extractor packages do not mutate source apps, write canonical Topogram records,
install packages, or perform adoption. They are lower-level discovery
dependencies, while templates are user-facing starting points.

Extractor package repos can have their own `llms.txt` and `llms-full.txt`.
Those files describe the package-local authoring and safety surface; they are
separate from the root Topogram repo `llms.txt`. Scaffolded extractor packages
generate package-local docs checks that refuse links or writes outside the
package root.

## Commands

```bash
topogram extractor list
topogram extractor recommend ./existing-app --from db,api,ui,cli
topogram extractor show @topogram/extractor-prisma-db
topogram extractor policy pin @topogram/extractor-prisma-db@1
topogram extract ./existing-app --out ./extracted-topogram --from db --extractor @topogram/extractor-prisma-db
```

## Related Docs

- [Brownfield Extract/Adopt](/start/brownfield-import/)
- [Extractor Packs](/authoring/extractor-packs/)
- [Extract/Adopt JSON](/reference/import-json/)
