# UI Foundations

UI Foundations is a pre-release, copyable CSS and React reference system for me to use across my applications. It captures recurring interface decisions without introducing a utility framework, mandatory brand identity, or shared runtime dependency. And, most important, NO TAILWIND FILLED HTML.

Current public baseline: **0.1.0**. See the [changelog](./CHANGELOG.md) for release notes.

## Adoption Model

1. Inspect the reference in Storybook.
2. Copy only the CSS or React source that helps the application.
3. Adapt tokens and behavior to the product while retaining the semantic vocabulary where it still fits.
4. Let the application own and test its adopted copy.
5. Promote improvements back only after real application use proves they are broadly useful.

Applications do not import this repository as a component package and do not receive automatic updates.

## Reference Lifecycle

Use this lifecycle for components and patterns that may be useful across applications:

1. **Candidate:** identify a broadly reusable presentation or interaction pattern. Product- or domain-specific components normally remain in their owning application.
2. **Storybook prototype:** make the candidate inspectable across representative states, responsive constraints, keyboard behavior, and accessibility needs.
3. **App-owned adoption:** copy and adapt the useful source into an application. The application owns its API, styling, tests, and later divergence.
4. **Real-application validation:** evaluate the pattern in an actual workflow rather than treating an isolated story as proof of generality.
5. **Standardized reference:** promote the durable improvement here only when consumer evidence shows it is broadly useful.

Standardized means recommended and copyable, not mandatory or automatically synchronized. A Foundation candidate may be developed before application adoption when multiple consumers are plausible, but it must not block application work unless an accepted Change explicitly requires it.

## Included References

- Canonical semantic tokens, ten optional dark identity profiles, reset, document defaults, accessibility behavior, and plain-CSS primitive recipes.
- TypeScript React references for Button, IconButton, TextField, Textarea, Tooltip, Dialog, Sheet, Menu, Tabs, Checkbox, Switch, OperationStatus, and InlineNotice.
- Minimal AuthenticationForm, FileBrowser, EditorToolbar, ConfirmationDialog, EmptyState, NavigationRail, ThreePaneShell, and inspector-capable WorkbenchShell compositions.
- Storybook stories for foundations, control states, behavior-heavy primitives, authentication, and workbench patterns.
- A cross-app Storybook comparison hub for application-owned workbench stories.

The React APIs are pre-release references, not a compatibility promise. Native HTML is preferred when sufficient. Behavior-heavy references use Base UI for focus, overlay, selection, and keyboard mechanics. An application copying those references must install a compatible `@base-ui/react` version; references using Lucide icons may keep `lucide-react` or replace the icons locally.

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
    Checkbox/
    Dialog/
    InlineNotice/
    IconButton/
    Menu/
    OperationStatus/
    Sheet/
    Switch/
    Tabs/
    TextField/
    Textarea/
    Tooltip/
  patterns/
    AuthenticationForm/
    ConfirmationDialog/
    EditorToolbar/
    EmptyState/
    FileBrowser/
    NavigationRail/
    ThreePaneShell/
    WorkbenchShell/
stories/
  Foundations.stories.tsx
```

Each React reference is colocated with its CSS Module. Behavior components and workbench patterns have grouped Storybook catalogs and focused interaction tests. The patterns own presentation structure only: applications still own data, routing, persistence, authorization, editor engines, and product-specific responsive navigation.

## Workbench Shell

`WorkbenchShell` is the reference for applications with an app rail, navigation sidebar, central work surface, and optional contextual sidebar. Its default desktop geometry keeps the rail and navigation on one surface and makes the right context region exactly as wide as the rail and navigation combined. Thin center-facing borders frame the work surface without turning the shell into a grid.

Navigation and context visibility are controlled by the application. The default `viewport` content anchor prevents the readable work surface from shifting when either sidebar collapses; use `available` when the work surface should instead consume all open space. Widths remain copy-friendly CSS custom properties: `--workbench-rail-width`, `--workbench-navigation-width`, `--workbench-context-width`, and `--workbench-content-width`.

Below the desktop breakpoint, persistent navigation and context regions are hidden so the application can present those same destinations in its own labeled Sheet or drawer. The rail remains available and the central region avoids horizontal page overflow.

## Validation

```bash
npm install
npm run check
npm run check:all
npm run storybook
```

`npm run check` verifies the CSS inventory, import order, semantic token contract, the absence of project-owned `primary`, `secondary`, or `accent` aliases, and the no-Tailwind boundary. `npm run check:all` also typechecks, runs focused component tests, and builds Storybook.

## Identity Profiles

Graphite is the default dark profile. Steel, Mono, Ember, Moss, Pine, Tide, Plum, Rosewood, and Oxblood are optional references that preserve the same semantic roles. Apply one by setting `data-theme` on the document root:

```html
<html data-theme="ember">
```

The profiles keep canvas and structural surfaces quiet while concentrating identity in selections, focus, accent text, and filled actions. Status colors and readable text hierarchy remain stable. Storybook exposes the same profiles from its theme toolbar so every primitive and pattern can be reviewed under each identity.

## Cross-App Comparison

Start the matched application catalogs and this hub in separate terminals:

```bash
# spaces/dashboard-spike
pnpm --filter @dashboard/web storybook:compare

# spaces/coordinator-local
pnpm --filter @coordinator-local/web storybook:compare

# spaces/49th-floor-platform
npm run storybook:compare --workspace @49th-floor/frontend

# spaces/ui-foundations
npm run storybook
```

Open `http://127.0.0.1:6008`. Dashboard defaults to port `6006`, Coordinator to `6007`, and 49th Floor to `6009`; `DASHBOARD_STORYBOOK_URL`, `COORDINATOR_STORYBOOK_URL`, and `FORTY_NINTH_FLOOR_STORYBOOK_URL` can override those sources. The hub composes all three catalogs through Storybook references. With all app catalogs running, `npm run compare:capture` generates the ignored `comparison-report/index.html` review artifact, including the shared `Navigation detail` row.

Comparison detects drift; it does not make this repository the runtime owner of application components.

## Design Tools

The Penpot file `Taylor UI Foundations` and the corresponding Stitch foundation are visual experimentation and generation references. Their exports may inform this source, but generated output must be reviewed for semantics, accessibility, responsiveness, and maintainability.
