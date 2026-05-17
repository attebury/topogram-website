# Topogram Project

Initialized with `topogram init`.

This repository is treated as a maintained app or workspace: Topogram will not
overwrite source code under `./`. Use `topogram emit` for contracts, reports,
snapshots, and proposals, and edit maintained app code directly after reading
focused query packets.

## First Commands

```bash
topogram agent brief --json
topogram check --json
topogram query list --json
```

To adopt enforced SDLC during initialization, use `topogram init . --adopt-sdlc`.
If this project was initialized without SDLC and you want to adopt it later, run:

```bash
topogram sdlc policy init .
topogram sdlc adopt .
```

## Source

- `topo/` is the project-owned Topogram workspace.
- `topogram.project.json` declares workspace, output ownership, and runtime topology.
- Output `app` points at `.` with `maintained` ownership.
