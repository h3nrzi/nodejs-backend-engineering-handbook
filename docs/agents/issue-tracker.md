# Issue tracker: Local Markdown

Issues and specs live as Markdown files under `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Spec: `.scratch/<feature-slug>/spec.md`.
- Tickets: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`,
  numbered from `01`, one file per ticket.
- Triage state: a `Status:` line near the top of each ticket.
  Use the role strings in `triage-labels.md`.
- Comments: append under a `## Comments` heading.

## Publish to the issue tracker

Create the corresponding spec or ticket file using these conventions.
Create its directory if needed.

## Fetch the relevant ticket

Read the referenced file. Resolve an issue number within its feature
directory; ask for the feature if the number is ambiguous.

## Wayfinding operations

Used by `/wayfinder`.

- Map: `.scratch/<effort>/map.md`, containing Notes,
  Decisions-so-far, and Fog.
- Child tickets: `.scratch/<effort>/issues/<NN>-<slug>.md`.
  Record the question in the body and a `Type:` line using
  `research`, `prototype`, `grilling`, or `task`.
- Blocking: record `Blocked by: NN, NN` near the top.
  A ticket is unblocked when every listed ticket is resolved.
- Frontier: choose the first numbered open ticket that is
  unblocked and unclaimed.
- Claim: set `Status: claimed` and save before starting work.
- Resolve: append an answer under `## Answer`, set
  `Status: resolved`, and add a brief summary and link
  to the map's Decisions-so-far.

Wayfinding uses `claimed` and `resolved` for execution progress;
the five triage roles describe readiness.
