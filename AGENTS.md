# UI Foundations Agent Guide

Guidance for assistants working in this repository.

## Purpose

Maintain copyable CSS and React references that record useful defaults without becoming a utility framework, mandatory brand system, or cross-application runtime dependency.

## Read First

- Inspect the current branch, worktree status, and relevant diff. Preserve unrelated in-progress catalog work.
- Read `README.md` for scope and intended adoption.
- Inspect all files under `src/` before changing shared tokens or global behavior.
- Run `sdd context . --json` inside an initialized SDD workspace and read the returned workflow before changing durable component APIs or active Change artifacts.
- Preserve application ownership: consumers may copy and diverge from these files and components.

## Branch Policy

- Use `main` as the stable branch and `develop` as the integration branch once active development begins.
- Use `change/`, `fix/`, and `misc/` branches according to the workspace default policy.
- Do not commit, push, publish, tag, or create remote state unless the user explicitly requests it.

## Project Rules

- Keep the CSS starter standards-based and dependency-free. React references may use a dependency only when the behavior warrants it.
- Do not add Tailwind or another utility-class framework.
- Do not add a utility-class matrix or generate classes for token combinations.
- Keep selectors shallow and global rules limited to resets, tokens, document foundations, and accessibility behavior.
- Keep `primary`, `accent`, brand assets, app shells, and domain-specific component styles out of the shared baseline.
- Keep application comparison stories in their owning applications. This repository owns canonical reference stories and may compose app catalogs, but must not become an imported runtime component owner.
- Use TypeScript, semantic props, CSS Modules, native controls when sufficient, and Base UI for behavior-heavy accessible primitives.
- Colocate every React reference with representative stories and focused behavioral tests.
- Treat new components and patterns as candidates unless repository docs and real application evidence establish them as standardized references.
- Use the reference lifecycle in `README.md`: candidate, Storybook prototype, app-owned adoption, real-application validation, then standardized reference.
- Keep product- or domain-specific components in their owning application. Do not make Foundation-first work an application dependency unless the accepted SDD Change explicitly requires it.
- Treat Penpot output as design input. Do not paste generated markup into the starter without reviewing semantics, accessibility, responsiveness, and maintainability.
- Before adding a stable reusable component API or other durable behavior, establish the appropriate SDD Epic and change artifacts under `docs/`.

## Commands

```bash
npm install
npm run check
npm run check:all
npm run storybook
npm run compare:capture
```

The CSS starter has no runtime dependency or build requirement. Node dependencies support only local reference and comparison tooling.

## Validation

- Run `npm run check` after changing package metadata or CSS files.
- Run `npm run check:all` after changing Storybook, comparison scripts, or development dependencies.
- Run `npm run compare:capture` with participating application Storybooks available before claiming cross-application visual consistency.
- Inspect changes in at least one real consumer before presenting a new default as broadly reusable.
- Keep project-specific adoption and migration verification in the consuming application.
