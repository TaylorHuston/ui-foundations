# Proposal: Scaffold Component Pattern Catalog

## Why

UI Foundations has stable control and authentication references, but applications still recreate common overlay, selection, navigation, editor, feedback, and workbench structures. A broader executable catalog will make those decisions inspectable and copyable without turning UI Foundations into a shared runtime dependency.

## What Changes

- Add experimental Tooltip, Dialog, Sheet, Menu, Tabs, Checkbox, Switch, OperationStatus, and InlineNotice React references.
- Add experimental FileBrowser, EditorToolbar, ConfirmationDialog, EmptyState, NavigationRail, and ThreePaneShell patterns.
- Give each reference typed source, CSS Modules, representative Storybook states, and focused behavioral verification.
- Use Base UI for behavior-heavy focus, overlay, keyboard, and selection mechanics; continue using semantic React composition and native HTML where sufficient.
- Document the catalog as pre-release inspiration whose copied source becomes application-owned.

## Target Repositories

- This repository (role: shared-library).

## Epic Actions

### New Epic Directories

- None proposed.

### Existing Epic Directory Updates

- Update `docs/epics/uif-001-copyable-interface-foundations/epic.md`.

## Epic Story Changes

- Promote candidate `behavior-heavy-primitives` into `UIF-001/S3` with overlay and selection behavior Requirements, including a side-anchored Sheet.
- Promote candidate `workbench-patterns` into `UIF-001/S4` with navigation, editor, confirmation, empty-state, rail, and layout composition Requirements.
- Expand `UIF-001/S2` with compact live operation status and explicit inline notice semantics.
- Keep the references experimental until real application adoption demonstrates stable APIs.

## Scope Decisions

- Confirmed: fifteen requested references will be functional, compilable, accessible starting points rather than empty placeholders.
- Confirmed: applications copy and own adopted source; this repository remains a reference catalog rather than a runtime package.
- Confirmed: existing dark-mode tokens are the implementation baseline for this Change.
- Deferred: light-mode tokens and dual-theme Storybook validation will be handled by a separate Change.
- Deferred: SegmentedControl, async data loading, persistence, routing, editor engines, drag and drop, resizable panes, and application migrations.
- Confirmed: app evidence from 49th Floor, GraphiteMD, and Lorecraft supports prototyping Sheet, NavigationRail, OperationStatus, and InlineNotice while responsive breakpoints and domain recovery logic remain application-owned.
- Assumptions: current UI Foundations spacing, radius, color, focus, and motion rules remain authoritative.
- User decisions that shaped the Story/Requirement split: behavior primitives and composed workbench patterns should be inspectable as distinct catalog groups.

## Change Folder

- Planned location: promoted; private draft removed
- Active location: `docs/changes/2026-07-17-scaffold-component-pattern-catalog/`
- Closed location: `docs/changes/closed/2026-07-17-scaffold-component-pattern-catalog/`

## Impact

- Product: expands the reusable visual vocabulary available to all active applications.
- Code: adds Base UI as a reference-development dependency and adds component and pattern modules under `src/`.
- Tests: adds focused interaction tests plus Storybook compilation and accessibility review.
- Docs: updates the catalog README and `UIF-001` durable behavior map.
- ADRs: implements the Base UI direction already accepted in `docs/adrs/2026-07-17-copy-owned-reference-components.md`; no new ADR is required.

## Release Communication Impact

- Required: yes
- Record / section: `README.md` Included References and Structure
- Public summary: UI Foundations now includes experimental behavior primitives and workbench compositions that applications can inspect, copy, and adapt.

## Open Questions

- None blocking implementation. Reference APIs remain explicitly experimental.
