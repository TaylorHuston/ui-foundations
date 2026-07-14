# UI Foundations Agent Guide

Guidance for assistants working in this repository.

## Purpose

Maintain a small, dependency-free CSS starter that records useful defaults without becoming a utility framework, mandatory brand system, or cross-application source of visual truth.

## Read First

- Read `README.md` for scope and intended adoption.
- Inspect all files under `src/` before changing shared tokens or global behavior.
- Preserve application ownership: consumers may copy and diverge from these files.

## Branch Policy

- Use `main` as the stable branch and `develop` as the integration branch once active development begins.
- Use `change/`, `fix/`, and `misc/` branches according to the workspace default policy.
- Do not commit, push, publish, tag, or create remote state unless the user explicitly requests it.

## Project Rules

- Prefer plain standards-based CSS and zero runtime dependencies.
- Do not add a utility-class matrix or generate classes for token combinations.
- Keep selectors shallow and global rules limited to resets, tokens, document foundations, and accessibility behavior.
- Keep `primary`, `accent`, brand assets, app shells, and domain-specific component styles out of the shared baseline.
- Treat Penpot output as design input. Do not paste generated markup into the starter without reviewing semantics, accessibility, responsiveness, and maintainability.
- Before adding a stable reusable component API or other durable behavior, establish the appropriate SDD Epic and change artifacts under `docs/`.

## Commands

```bash
npm run check
```

No build or dependency installation is currently required.

## Validation

- Run `npm run check` after changing package metadata or CSS files.
- Inspect changes in at least one real consumer before presenting a new default as broadly reusable.
- Keep project-specific adoption and migration verification in the consuming application.
