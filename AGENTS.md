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

## Field Notes Authoring

- Write Topogram posts in the voice of a concise technical writer.
- Do not use em dashes in Topogram posts.
- Write Field Notes as a strong opinion with guardrails: make the claim memorable, use uncertainty honestly, then show where Topogram fits.
- Lead with the thesis and sharpen it with a concrete phrase readers can remember.
- Use contractions where they make the post sound more human, such as `didn't`, `that's`, `doesn't`, and `it's`.
- Use `may`, `might`, and `if` for speculative claims instead of presenting uncertain futures as facts.
- Use bold emphasis sparingly for the phrase the reader should retain, not as decoration.
- Prefer compact argument beats: claim, example, consequence.
- Use plain, concrete nouns such as `operators`, `platforms`, `intent`, `boundaries`, `proof`, and `app map`.
- Use contrast to clarify the point: not replacement, compression; not easier, difficulty moves; not faster editing, better structure.
- Keep Topogram as the structural answer earned by the article, not the only subject of the article.
- End with a durable takeaway in simple language, not a slogan.

Use `topogram emit <target>` for contracts, reports, snapshots, migration
plans, and agent context. Do not expect `topogram generate` to overwrite this
maintained app unless output ownership is deliberately changed.

If `topogram.sdlc-policy.json` exists, use SDLC commands for task and status
work before protected edits:

```bash
topogram sdlc policy explain --json
topogram sdlc prep commit . --json
```
