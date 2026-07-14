# UI Foundations

UI Foundations is an exploratory, dependency-free CSS starter for web applications. It captures useful defaults without introducing another utility framework or requiring applications to share one visual identity.

## Status

This repository is a pre-release scaffold. Its files are suitable for experimentation and copying, but no stable public API or compatibility promise exists yet.

## Intended Use

1. Start a new application's styling from the relevant files in `src/`.
2. Change the tokens and rules to fit that application's audience and visual identity.
3. Let the application own its adopted copy.
4. Promote a broadly useful improvement back here only after real use validates it.

Direct package imports may be useful during experiments, but applications should not assume that future changes will be automatically compatible.

## What This Is

- A neutral token baseline.
- A restrained reset and document foundation.
- Accessibility defaults that are easy to inspect and override deliberately.
- Plain CSS that works without a framework or build step.

## What This Is Not

- A Tailwind replacement or utility-class language.
- A component library.
- A canonical brand identity.
- A mechanism for synchronizing every application's design.
- A substitute for application-owned CSS Modules and component styles.

## Structure

```text
src/
  accessibility.css
  base.css
  index.css
  reset.css
  tokens.css
scripts/
  check.mjs
```

## Validation

No installation is required.

```bash
npm run check
```

The check verifies the starter file inventory, import order, required baseline tokens, and absence of unresolved token placeholders or shared brand-color defaults.

## Penpot Relationship

The Penpot file `Taylor UI Foundations` is a visual reference and experimentation surface. Penpot token exports, graphics, measurements, and inspected values may inform this repository, but neither source automatically overwrites the other.
