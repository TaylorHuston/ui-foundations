# UI Foundations

UI Foundations is a pre-release, copyable CSS and React reference system for Taylor applications. It captures recurring interface decisions without introducing a utility framework, mandatory brand identity, or shared runtime dependency.

## Adoption Model

1. Inspect the reference in Storybook.
2. Copy only the CSS or React source that helps the application.
3. Adapt tokens and behavior to the product while retaining the semantic vocabulary where it still fits.
4. Let the application own and test its adopted copy.
5. Promote improvements back only after real application use proves they are broadly useful.

Applications do not import this repository as a component package and do not receive automatic updates.

## Included References

- Canonical semantic tokens, reset, document defaults, accessibility behavior, and plain-CSS primitive recipes.
- TypeScript React references for Button, IconButton, TextField, and Textarea.
- A minimal sign-in and sign-up AuthenticationForm with password-confirmation validation.
- Storybook stories for foundations, component states, and authentication states.
- A cross-app Storybook comparison hub for application-owned workbench stories.

The React APIs are pre-release references, not a compatibility promise. Native HTML is preferred when sufficient. Base UI is the default for future behavior-heavy primitives that need headless focus, overlay, selection, or keyboard mechanics.

## Structure

```text
src/
  styles/
    fonts.css
    tokens.css
    global.css
    primitives.css
  components/
    Button/
    IconButton/
    TextField/
    Textarea/
  patterns/
    AuthenticationForm/
stories/
  Foundations.stories.tsx
```

Each React reference is colocated with its CSS Module. Reference groups and patterns include Storybook stories and focused tests.

## Validation

```bash
npm install
npm run check
npm run check:all
npm run storybook
```

`npm run check` verifies the CSS inventory, import order, semantic token contract, and absence of project-owned `primary`, `secondary`, or `accent` aliases. `npm run check:all` also typechecks, runs focused component tests, and builds Storybook.

## Cross-App Comparison

Start the matched application catalogs and this hub in separate terminals:

```bash
# spaces/code/dashboard-spike
pnpm --filter @dashboard/web storybook:compare

# spaces/code/coordinator-local
pnpm --filter @coordinator-local/web storybook:compare

# spaces/code/49th-floor-platform
npm run storybook:compare --workspace @49th-floor/frontend

# spaces/code/ui-foundations
npm run storybook
```

Open `http://127.0.0.1:6008`. Dashboard defaults to port `6006`, Coordinator to `6007`, and 49th Floor to `6009`; `DASHBOARD_STORYBOOK_URL`, `COORDINATOR_STORYBOOK_URL`, and `FORTY_NINTH_FLOOR_STORYBOOK_URL` can override those sources. The hub composes all three catalogs through Storybook references. With all app catalogs running, `npm run compare:capture` generates the ignored `comparison-report/index.html` review artifact, including the shared `Navigation detail` row.

Comparison detects drift; it does not make this repository the runtime owner of application components.

## Design Tools

The Penpot file `Taylor UI Foundations` and the corresponding Stitch foundation are visual experimentation and generation references. Their exports may inform this source, but generated output must be reviewed for semantics, accessibility, responsiveness, and maintainability.
