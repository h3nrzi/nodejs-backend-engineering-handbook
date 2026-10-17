# Domain Docs

This repo uses a single-context domain documentation layout.

## Before exploring

- Read root `GLOSSARY.md`.
- Read relevant decisions under root `docs/adr/`.

If these files are absent, proceed silently. Domain modeling
creates them when terms or decisions are resolved.

## Layout

- `GLOSSARY.md`: shared domain vocabulary.
- `docs/adr/`: architecture decision records.

## Use the glossary's vocabulary

Use glossary terms in issue titles, proposals, hypotheses, and tests.
Follow its distinctions and avoided synonyms.

If a needed term is missing, reconsider whether it fits the domain
or note the gap for domain modeling.

## Flag ADR conflicts

When a proposal contradicts an existing ADR, identify the ADR
and explain why the decision should be reopened.
