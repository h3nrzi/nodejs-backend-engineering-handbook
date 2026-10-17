# Shared Codex / Matt workspace

Two independently owned sibling projects live here:

- [app/](app/README.md): the existing Next.js application, including its App Router,
  package, lockfile, configuration and [agent instructions](app/AGENTS.md).
- [handbook/](handbook/README.md): the educational Handbook, including its lessons,
  approvals, tracking, documentation and authoring tools. Start with its
  [agent instructions](handbook/AGENTS.md) and [commands](handbook/docs/repository-layout.md).

The root owns shared Matt skills in `.agents/skills/`, their `skills-lock.json`,
and future planning and workflow artifacts in `docs/` and `.scratch/`.
No monorepo framework or package workspace is required. Run `npm` from the project
whose package you intend to use.

The Handbook owns the Mermaid skill; a root discovery symlink preserves its
existing name. All 38 Matt skills stay at root, unchanged. Matt issue-tracker
configuration is not yet present; this migration does not start a workflow.

See the [layout correction report](.scratch/acceptance/repository-layout-correction/report.md)
and [hands-on evaluation](.scratch/acceptance/repository-layout-correction/guide.md).
