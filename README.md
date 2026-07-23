# UI Foundations

UI Foundations is a pre-release, versioned CSS and React library for consistent application interfaces. It captures recurring interface decisions without introducing a utility framework, mandatory brand identity, or application architecture. And, most important, NO TAILWIND FILLED HTML.

Current public baseline: **0.2.0**. See the [changelog](./CHANGELOG.md) for release notes.

## Adoption Model

1. Inspect defaults and supported override seams in Storybook.
2. Install a pinned package version and import only the required JavaScript and CSS entry points.
3. Put shared components behind thin app-owned wrappers.
4. Override product identity through semantic tokens, root styling props, stable named slots, and portal hooks.
5. Keep data, routing, authorization, persistence, editor engines, responsive orchestration, and deliberate replacement application-owned.
6. Upgrade deliberately after reviewing release notes and consumer verification.

See [Library Adoption](https://github.com/TaylorHuston/ui-foundations/blob/develop/docs/library-adoption.md) for imports, wrappers, CSS layering, override hooks, and the pre-1.0 compatibility policy. Registry publication is not active yet and remains a separately authorized release action.

## Reference Lifecycle

Use this lifecycle for components and patterns that may be useful across applications:

1. **Candidate:** identify a broadly reusable presentation or interaction pattern. Product- or domain-specific components normally remain in their owning application.
2. **Storybook prototype:** make the candidate inspectable across representative states, responsive constraints, keyboard behavior, and accessibility needs.
3. **App-owned adoption:** import the useful package surface behind a local wrapper. The application owns product defaults, integration, tests, and later divergence.
4. **Real-application validation:** evaluate the pattern in an actual workflow rather than treating an isolated story as proof of generality.
5. **Standardized reference:** promote the durable improvement here only when consumer evidence shows it is broadly useful.

Standardized means supported and versioned, not mandatory or automatically upgraded. A Foundation candidate may be developed before application adoption when multiple consumers are plausible, but it must not block application work unless an accepted Change explicitly requires it.

## Included References

- Canonical semantic tokens, ten optional dark identity profiles, reset, document defaults, accessibility behavior, and plain-CSS primitive recipes.
- TypeScript React references for Button, IconButton, TextField, Textarea, Tooltip, Dialog, Sheet, Menu, Tabs, Checkbox, Switch, SegmentedControl, TreeView, OperationStatus, and InlineNotice.
- Minimal AuthenticationForm, FileTree, searchable FileBrowser, DocumentHeader, EditorToolbar, EditorSurface, ConfirmationDialog, EmptyState, NavigationRail, ThreePaneShell, and inspector-capable WorkbenchShell compositions.
- Storybook stories for foundations, control states, behavior-heavy primitives, authentication, and workbench patterns.
- A cross-app Storybook comparison hub for application-owned workbench stories.

The React APIs are pre-release compatibility surfaces governed by the documented pre-1.0 policy. Native HTML is preferred when sufficient. Behavior-heavy components use Base UI for focus, overlay, selection, and keyboard mechanics. React and React DOM are consumer-owned peer dependencies; Base UI and Lucide are package runtime dependencies.

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
    SegmentedControl/
    Sheet/
    Switch/
    Tabs/
    TextField/
    Textarea/
    Tooltip/
    TreeView/
  patterns/
    AuthenticationForm/
    ConfirmationDialog/
    DocumentHeader/
    EditorSurface/
    EditorToolbar/
    EmptyState/
    FileBrowser/
    NavigationRail/
    ThreePaneShell/
    WorkbenchShell/
stories/
  Foundations.stories.tsx
```

Each React component is colocated with its CSS Module. Behavior components and workbench patterns have grouped Storybook catalogs and focused interaction tests. The patterns own presentation structure only: applications still own data, routing, persistence, authorization, editor engines, and product-specific responsive navigation.

## Editor Work Surface

`EditorSurface` composes stable document-header, toolbar, notice, and editor-engine slots. Its `--editor-content-width` and `--editor-text-inset` properties align surrounding chrome with the readable document while allowing the consuming application to supply any editor implementation.

`DocumentHeader` keeps document context and controlled inline renaming together. `EditorToolbar` accepts text-first command groups, a centered `SegmentedControl` mode switch, one operation-status region, and trailing actions. Routine dirty, saving, saved, and read-only feedback belongs in `OperationStatus`; conflicts and failures that require a decision belong in persistent `InlineNotice` compositions with visible actions.

CodeMirror or another editor engine, Markdown parsing and decoration, exact-source rules, undo history, persistence, autosave, revision identity, and navigation remain application-owned. The Foundation reference standardizes only the visible work-surface contract.

## Workbench Shell

`WorkbenchShell` is the reference for applications with an app rail, navigation sidebar, central work surface, and optional contextual sidebar. Its default desktop geometry keeps the rail and navigation on one surface and makes the right context region exactly as wide as the rail and navigation combined. Thin center-facing borders frame the work surface without turning the shell into a grid.

The rail and navigation share the same semantic surface while retaining a thin divider between their interaction zones. Stable `data-slot` attributes identify the shell, rail, navigation, main work surface, readable main content, and context region for app-owned styling and inspection.

Navigation and context visibility are controlled by the application. The default `viewport` content anchor prevents the readable work surface from shifting when either sidebar collapses; use `available` when the work surface should instead consume all open space. Widths remain supported CSS custom properties: `--workbench-rail-width`, `--workbench-navigation-width`, `--workbench-context-width`, and `--workbench-content-width`.

Below the desktop breakpoint, persistent navigation and context regions are hidden so the application can present those same destinations in its own labeled Sheet or drawer. The rail remains available and the central region avoids horizontal page overflow.

## Tree And File Navigation

`TreeView` owns the generic hierarchical interaction contract: one roving Tab stop, Arrow Up and Down movement, Home and End, Right to expand or enter a branch, Left to collapse or return to the parent, and Enter or Space activation. It supports controlled or uncontrolled expansion and selection while leaving item data and product actions to the consumer.

`FileTree` adds file, closed-folder, and open-folder presentation to that behavior. `FileBrowser` composes the same tree with optional flat-result search. Search remains separate from tree navigation so applications can place it elsewhere without rewriting the accessible hierarchy.

## Validation

```bash
npm install
npm run check
npm run check:package
npm run check:all
npm run storybook
```

`npm run check` verifies the CSS inventory, import order, semantic token contract, the absence of project-owned `primary`, `secondary`, or `accent` aliases, and the no-Tailwind boundary. `npm run check:package` builds declarations and public JavaScript/CSS entry points, inspects the exact archive, installs it into a clean non-symlink consumer, rejects private imports, checks for one React runtime, then typechecks and production-builds the consumer. `npm run check:all` runs those gates together with focused tests and a static Storybook build.

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

Comparison detects drift; the package shares generic presentation and accessibility behavior without owning application behavior.

## Design Tools

The Penpot file `Taylor UI Foundations` and the corresponding Stitch foundation are visual experimentation and generation references. Their exports may inform this source, but generated output must be reviewed for semantics, accessibility, responsiveness, and maintainability.
