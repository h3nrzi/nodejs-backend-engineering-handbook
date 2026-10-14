# Project Charter — p03 dependency workflow simulator

**Domain:** D01  
**Charter status:** Learner-approved educational project direction (D01–D03 authoring phase)  
**Product Discovery / Final PRD / Module Plan:** Not started in the fresh implementation workflow  
**Implementation / demonstrated learner mastery:** Not started / not assessed

> This Charter frames a useful product and authentic computer-science foundations learning challenges. It is **not** a finalized V1 PRD or a predetermined architecture. Scope details are starting constraints for learner-supervised Codex Product Discovery, not immutable technical design.

## Learning mission and project constraints

Use this product to exercise the associated domain's curriculum in realistic engineering conditions. Codex should derive proposed product direction from user-approved Product Discovery, not mechanically convert the original draft into final requirements. Challenge-driven outcomes are educational goals, **not mandated architecture**.

## Problem

Users need to understand how tasks depend on one another, why some cannot start, and why cyclic dependencies make a plan invalid. This educational simulator models and explains workflows; it does not execute production jobs.

## Audience

Workflow author defines tasks and prerequisites; operator advances simulations; reviewer studies validation, history and outcomes; observer reads exported reports.

## Goals

Authors can create and validate a workflow. The product identifies missing references, self-dependencies and cycles. Users can see eligible, blocked, running and terminal tasks, understand blockers, explore more than one permitted order and export results that accurately preserve the run definition.

## Scope

**In:** create/edit task and prerequisite definitions, validate, show eligible and blocked work, start simulation runs, record simulated completion/failure/cancellation, handle repeated attempts with distinct identity, inspect timeline, export reports.

**Out:** real task execution, external API automation, multi-tenant project management, billing, enterprise workforce permissions, distributed orchestration and cloud job scheduling.

**Deferred:** conditional branches, recurring schedules, nested workflows, task deadlines, collaborative editing and external event triggers.

## Explicit non-goals

This is not a CI service, executable workflow engine, commercial task manager, distributed scheduler or production infrastructure monitor.

## Domain value

Illustrates graph validity and order (D01 Chapters 03–05), transition invariants (12), liveness and cancellation (10–11) and the case-study workshop (13). Distinct from P01 performance comparisons, P02 capacity allocation and P04 large-dataset I/O.

## Educational engineering challenge

Practice the related domain lessons by exploring honest asynchronous outcomes, correctness invariants, resource costs, error and failure behavior, and testable evidence in this product. **Do not force a particular library, storage architecture, process model or platform just to demonstrate the technology.**

## Kickoff and owner approval

When the learner selects this project, Codex authors `product-discovery.md` after a focused PM `grill-with-docs`; after learner approval, Codex consolidates **`final-prd.md`**; then Codex creates a learner-approved **`module-plan.md`**. Implement one approved module at a time using module-scoped technical discovery → `to-spec` → `to-tickets` → `implement` → verification. Original detailed pre-V2 material is available in Git history only; no implementation or technical decisions are inherited automatically.
