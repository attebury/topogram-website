# Agent Guide

This repository was initialized with `topogram init`.

Start with:

```bash
topogram agent brief --json
topogram check --json
topogram query list --json
```

Edit `topo/**` and `topogram.project.json` for Topogram source. The project
output is maintained, so app/source files under `./` are human-owned and may be
edited directly after reading focused packets.

## Engineering Laws

- Maintain code like this project will live for 10 years and be touched only from time to time.
- Keep code organized, maintainable, security-focused, tested, and testable.
- Make tests prove consumer-visible value; do not rely on string-only or file-existence checks when behavior can compile, run, or validate.
- Start agent work with `topogram agent brief --json` and focused `topogram query ...` packets before broad edits.
- Use Topogram commands for stateful workflow mutations such as SDLC transitions, trust, provenance, generated sentinels, archives, release state, and rollout state.

Use `topogram emit <target>` for contracts, reports, snapshots, migration
plans, and agent context. Do not expect `topogram generate` to overwrite this
maintained app unless output ownership is deliberately changed.

If `topogram.sdlc-policy.json` exists, use SDLC commands for task and status
work before protected edits:

```bash
topogram sdlc policy explain --json
topogram sdlc prep commit . --json
```
