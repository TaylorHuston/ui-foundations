# Changelog

All notable user-facing changes to UI Foundations are documented here.

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- An installable `@taylorhuston/ui-foundations` package candidate with explicit component, pattern, theme-profile, declaration, and CSS-layer exports.
- Stable component and pattern root hooks, named `data-slot` regions, and portal-safe Dialog, Sheet, Menu, and Tooltip override props.
- An exact-archive verifier and isolated React 19/Vite 8 consumer covering public imports, private-import rejection, declarations, CSS, runtime dependencies, and production builds.
- App-owned wrapper and override guidance plus a Storybook default-versus-product-identity reference.
- An accessible TreeView behavior reference and file-specific FileTree with roving focus and standard hierarchical keyboard navigation.
- Text-first SegmentedControl, DocumentHeader, and EditorSurface references for composing application-owned editors.
- Storybook references for document editing and save, read-only, conflict, failure, and literal-source states.

### Changed

- The primary adoption model is now pinned package imports behind app-owned wrappers; copy-only adoption is no longer the maintained default.
- React and React DOM are consumer peer dependencies, while Base UI and Lucide are declared package runtime dependencies.
- FileBrowser now composes the shared FileTree behavior while retaining optional flat-result search.
- WorkbenchShell now exposes stable region slots and a thin rail-to-navigation divider while preserving matched desktop side occupancy.
- EditorToolbar now accepts composable center content and a single caller-owned operation status without nesting live regions.

## [0.1.0] - 2026-07-22

Initial public baseline.

### Added

- Copyable semantic CSS tokens, global defaults, accessibility behavior, and plain-CSS control recipes.
- Ten dark identity profiles: Graphite, Steel, Mono, Ember, Moss, Pine, Tide, Plum, Rosewood, and Oxblood.
- React references for actions, form controls, overlays, menus, selection controls, feedback, and authentication.
- Workbench references for file navigation, editor commands, empty states, destructive confirmation, application rails, and multi-region layouts.
- An inspector-capable WorkbenchShell with optional controlled side regions, symmetrical desktop geometry, stable content anchoring, and a responsive handoff for application-owned mobile navigation.
- Storybook catalogs for foundations, identity themes, component states, interaction patterns, and workbench compositions.

### Design principles

- Copy-owned adoption with no shared runtime package requirement.
- Authored CSS and CSS Modules without Tailwind or utility-class markup.
- Text-forward actions by default, with named icon controls reserved for compact and familiar contexts.
- Quiet structural surfaces with product identity concentrated in accents, focus, selections, and filled actions.
