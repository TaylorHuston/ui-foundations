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

## Future Component Layer

This repository does not currently ship React components. If repeated application use justifies a shared component layer, Base UI is the preferred behavioral foundation. Shared components should expose semantic APIs, use CSS Modules and these tokens for presentation, and avoid turning this CSS starter into a utility framework.

## Structure

```text
.storybook/
  main.ts
  preview.tsx
stories/
  Foundations.stories.tsx
src/
  accessibility.css
  base.css
  index.css
  reset.css
  tokens.css
scripts/
  capture-comparison.mjs
  check.mjs
```

## Validation

The CSS starter itself has no runtime dependencies. Install development dependencies only when working with the reference Storybook or comparison tooling.

```bash
npm install
npm run check
npm run check:all
```

`npm run check` verifies the starter file inventory, import order, required baseline tokens, and absence of unresolved token placeholders or shared brand-color defaults. `npm run check:all` also typechecks and builds the reference Storybook.

## Cross-App Comparison

UI Foundations can compose application-owned Storybooks into one navigation surface. Composition keeps every story and production component in its owning repository; it does not create a shared runtime dependency.

Start the matched app catalogs and this hub in separate terminals:

```bash
# spaces/code/dashboard-spike
pnpm --filter @dashboard/web storybook:compare

# spaces/code/coordinator-local
pnpm --filter @coordinator-local/web storybook:compare

# spaces/code/ui-foundations
npm run storybook
```

Open `http://127.0.0.1:6008`. Dashboard is composed from port `6006` and Coordinator from port `6007`. Override either source when needed:

```bash
DASHBOARD_STORYBOOK_URL=https://example.test/dashboard \
COORDINATOR_STORYBOOK_URL=https://example.test/coordinator \
npm run storybook
```

Each participating app exposes the same stable `Comparison/Workbench` story names for desktop, mobile, file-browser, empty, and error states. Generate a fixed-viewport side-by-side report after the app catalogs are running:

```bash
npm run compare:capture
```

The ignored `comparison-report/index.html` is a review artifact, not design-system truth. Use it to spot drift, choose deliberate differences, and route changes back through each application's own SDD artifacts and tests.

## Penpot Relationship

The Penpot file `Taylor UI Foundations` is a visual reference and experimentation surface. Penpot token exports, graphics, measurements, and inspected values may inform this repository, but neither source automatically overwrites the other.
