# Shared Codex / Matt skills workspace

This root owns shared `.agents/skills/`, `skills-lock.json`, workflow configuration,
planning artifacts and future workflows under `docs/` and `.scratch/`.

- For Next.js work, read [app/AGENTS.md](app/AGENTS.md) and work from `app/`.
- For educational content, tracking or authoring tools, read
  [handbook/AGENTS.md](handbook/AGENTS.md) and work from `handbook/`.

Each project's local instructions govern its own files. Run its commands from that
project; each owns its package and lockfile. Root has no npm package or workspace manager.

Matt issue-tracker configuration has not been set up. Reserve `docs/agents/` for
that configuration when requested; Handbook's educational tracker is project-local.
