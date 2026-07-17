# Proposal: Copyable React Foundations

## Why

The active applications repeat the same CSS tokens, control states, and React component decisions with inconsistent names and implementations. UI Foundations should reduce that repeated work without becoming a runtime dependency that couples application releases.

## What Changes

- Reconcile the CSS starter around the agreed concise semantic token contract and three-file responsibility model.
- Establish copy-owned TypeScript React references for Button, IconButton, TextField, and Textarea.
- Compose those primitives into a minimal AuthenticationForm reference.
- Document and demonstrate component APIs, visual states, accessibility behavior, and intended copying through Storybook and focused tests.

## Target Repositories

- This repository (role: shared-library).

## Epic Actions

### New Epic Directories

- `docs/epics/uif-001-copyable-interface-foundations/`

### Existing Epic Directory Updates

- None.

## Epic Story Changes

- Add `UIF-001/S1`: adopt a coherent copyable CSS foundation.
- Add `UIF-001/S2`: inspect and copy accessible React control and authentication references.

## Scope Decisions

- Confirmed: concise semantic color tokens; category prefixes for spacing, radii, motion, typography, and control dimensions.
- Confirmed: three surface levels, three text levels, two border roles, separate action/identity/information roles, semantic state colors, explicit focus and selection roles, 4px spacing scale, 2/4/6px radii, 28/32/36/44px controls, 150/200ms motion, and Geist defaults.
- Confirmed: reference components use TypeScript, semantic props, CSS Modules, Storybook, and focused tests. Native HTML is preferred when sufficient; Base UI is reserved for behavior-heavy primitives.
- Confirmed: applications copy and own adopted code. UI Foundations is the canonical executable reference, not an imported runtime component package.
- Deferred: Checkbox, Tabs, Dialog, Tooltip, Menu, SegmentedControl, FileBrowser, EditorToolbar, and ThreePaneShell.
- Deferred: automatic CLI copying or synchronization.
- Assumption: AuthenticationForm demonstrates client-side form behavior but does not own authentication services, routing, persistence, or provider integration.

## Change Folder

- Planned location: promoted; private draft removed
- Active location: `docs/changes/2026-07-17-copyable-react-foundations/`
- Closed location: `docs/changes/closed/2026-07-17-copyable-react-foundations/`

## Impact

- Product: faster, more consistent starting points for React application UI work.
- Code: CSS contract reconciliation, four primitives, and one composed pattern.
- Tests: focused component behavior tests plus Storybook build and accessibility checks.
- Docs: README, AGENTS guidance, shared visual guide, accepted ADR, and `UIF-001` truth.
- ADRs: record copy-owned references instead of a shared runtime package.

## Release Communication Impact

- Required: yes.
- Record / section: repository README status and capability sections.
- Public summary: UI Foundations now includes copyable, tested React references alongside its CSS starter.

## Open Questions

- None blocking this slice.
