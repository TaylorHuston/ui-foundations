# Design: Scaffold Component Pattern Catalog

## Context

The catalog currently demonstrates foundational CSS, four native controls, and an authentication composition. The active Epic already identifies behavior-heavy primitives and workbench patterns as deferred candidate Stories. This Change promotes those candidates without changing the copy-owned adoption model.

## Goals / Non-Goals

**Goals:**

- Provide functional, typed, accessible references for the confirmed component and pattern catalog, including reusable text-first editor chrome without taking ownership of an editor engine.
- Keep visual treatment aligned with the current UI Foundations tokens and minimal-border conventions.
- Make behavior and composition inspectable in Storybook and verifiable through focused tests.
- Provide an inspector-capable shell reference with optional controlled side regions, symmetric desktop geometry, and a stable readable work surface.
- Preserve application ownership of data, routing, persistence, domain actions, and copied source.

**Non-Goals:**

- Stabilize a public component API or publish a runtime package.
- Implement a file system, Markdown editor, autosave engine, pane persistence, collapse-state persistence, or application-specific mobile Sheet and drawer flows.
- Add light mode, resizable panes, drag and drop, virtualization, or application-specific branding.

## Planning Interview / Story Refinement

- Scope boundary reviewed: reusable components and compositional patterns are added by this Change with no consuming-app migration; later app comparison promoted generic tree, shell, and editor-chrome candidates while keeping domain behavior app-owned.
- User decisions: scaffold the initial eleven references, add four cross-app candidates, then add an inspector-capable shell refined from 49th Floor and GraphiteMD; keep this catalog an inspiration and copy source rather than a shared dependency.
- Assumptions: existing Foundation tokens and current Storybook conventions are accepted visual direction.
- Deferred scope: light mode, mature application integrations, Markdown parsing and projection, autosave, source fidelity, revision handling, and editor-engine lifecycle.
- Story boundaries challenged: individual controls remain Requirements under capability-sized Stories rather than many tiny Stories.
- Requirements refined: overlay lifecycle, keyboard selection, labeled state, tree navigation, toolbar mode naming, destructive confirmation, empty-state semantics, compact operation status, explicit notice roles, application rail navigation, and pane composition.
- Shell refinement: compact rails and adjacent left sidebars share one surface role, with quiet one-pixel boundaries mirrored at the center-facing edges of both sidebars. An optional right context region defaults to the combined rail and navigation width, while a viewport anchor keeps readable content stable as either side region collapses.
- Scenario gaps considered: dismissal, disabled state, empty results, optional actions, and constrained viewport behavior.
- Open questions that block implementation: none.

## Epic Changes

### Update Epic: UIF-001 Copyable Interface Foundations

- Target Epic: `docs/epics/uif-001-copyable-interface-foundations/epic.md`
- Change Type: added scope

#### Story Changes

- Added: `UIF-001/S3` Copy Behavior-Heavy Primitives.
- Added: `UIF-001/S4` Compose Familiar Workbench Patterns.
- Modified: `UIF-001/S2` to include app-evidenced feedback references.
- Modified: Current Scope, Deferred Scope, Candidate Stories, Story Index, related ADR references, and cross-Story concerns.
- Removed: the promoted candidate rows for behavior-heavy primitives and workbench patterns.

#### Modified Story S2: Copy Accessible React References

##### Requirement R4: Feedback References

The system SHALL provide OperationStatus and InlineNotice references that separate live operation progress from persistent explanatory or recovery messages.

###### Scenario R4-S1: Announce Operation Progress

- WHEN an operation changes between dirty, pending, success, warning, or error state
- THEN its text and semantic live region expose the update without relying on color alone.

###### Scenario R4-S2: Choose Notice Urgency

- WHEN an application renders an InlineNotice
- THEN it explicitly chooses note, status, or alert semantics and may provide a visible text action.

#### Implemented Story S3: Copy Behavior-Heavy Primitives

As an application developer, I want tested overlay and selection primitives, so that I do not recreate difficult accessibility mechanics for each application.

##### Requirement R1: Overlay Interaction References

The system SHALL provide Tooltip, Dialog, Sheet, and Menu references with semantic triggers, focus handling, keyboard operation, and dismissal behavior.

###### Scenario R1-S1: Inspect An Overlay Reference

- WHEN a developer opens a Tooltip, Dialog, Sheet, or Menu example in Storybook
- THEN the overlay is associated with its trigger and can be dismissed using its documented pointer or keyboard interaction.

###### Scenario R1-S2: Preserve Keyboard Focus

- WHEN a keyboard user opens and closes a Dialog, Sheet, or Menu
- THEN focus enters the interactive surface when appropriate and returns to its trigger after dismissal.

##### Requirement R2: Selection And Toggle References

The system SHALL provide Tabs, Checkbox, and Switch references with labeled, controlled or uncontrolled state and keyboard behavior.

###### Scenario R2-S1: Change Selection Or Toggle State

- WHEN a user activates an enabled tab, checkbox, or switch through its supported pointer or keyboard interaction
- THEN the selected, checked, or switched state updates and is exposed semantically.

###### Scenario R2-S2: Respect Disabled State

- WHEN a tab, checkbox, or switch is disabled
- THEN it exposes the disabled state and does not change through user activation.

##### Implemented By

- `src/components/Tooltip/`, `Dialog/`, `Sheet/`, and `Menu/`
- `src/components/Tabs/`, `Checkbox/`, and `Switch/`
- `src/components/BehaviorComponents.stories.tsx`

##### Verified By

- `src/components/behavior-components.test.tsx` maps overlay, focus, selection, and disabled-state behavior to S3.
- Playwright and axe checks cover open and closed Storybook states at desktop and mobile widths.
- `npm run check:all` passes.

##### Verification Gaps

- Stability across real consuming applications is intentionally deferred.
- Axe's optional portal landmark best-practice finding is recorded in the Epic; WCAG-tagged checks pass.

#### Implemented Story S4: Compose Familiar Workbench Patterns

As an application developer, I want copyable workbench patterns, so that recurring navigation and editing layouts begin from consistent, adaptable structures.

##### Requirement R1: File Navigation Reference

The system SHALL provide a generic TreeView behavior reference plus FileTree and searchable FileBrowser compositions that render hierarchical items, disclosure and selection state, wrapping labels, optional flat-result search, and an empty state while leaving file data and actions to the consumer.

###### Scenario R1-S1: Navigate Hierarchical Items

- WHEN a user expands a branch and selects a visible item
- THEN child items become available and the selected item is exposed visually and semantically.

###### Scenario R1-S2: Search Or Show No Results

- WHEN optional search is enabled
- THEN matching items appear as a flat result list
- AND a no-results state appears when no item matches.

###### Scenario R1-S3: Navigate The Tree From A Keyboard

- WHEN a keyboard user enters the tree
- THEN exactly one visible tree item participates in the Tab sequence
- AND Arrow keys, Home, and End move focus using hierarchical tree conventions.

##### Requirement R2: Editor Work Surface Reference

The system SHALL provide a text-first SegmentedControl, EditorToolbar, DocumentHeader, and EditorSurface composition for Source and Rendered modes, semantic commands, inline filename editing, operation and recovery states, stable editor-region slots, and application-owned behavior.

###### Scenario R2-S1: Change Editor Presentation

- WHEN a user selects Source or Rendered
- THEN the selected mode is exposed and the consuming application receives the requested mode.

###### Scenario R2-S2: Edit A Document Name

- WHEN a user enters document-name editing
- THEN the current name remains labeled and editable
- AND visible Save name and Cancel actions delegate the result without owning rename validation or persistence.

###### Scenario R2-S3: Present Save And Recovery State

- WHEN an editor becomes dirty, pending, saved, conflicted, failed, read-only, or unable to use its richer presentation
- THEN the visible state uses one appropriate live or persistent semantic region
- AND recovery remains available through a visible text action when supplied.

###### Scenario R2-S4: Compose An Editor Engine

- WHEN an application places its editor inside EditorSurface
- THEN header, toolbar, editor, and notice regions remain inspectable and align to the configured readable width and text inset
- AND the application retains ownership of editor focus, source, parsing, autosave, and overflow behavior.

##### Requirement R3: Confirmation And Empty-State References

The system SHALL provide ConfirmationDialog and EmptyState patterns that communicate consequence, optional recovery, and available next action without embedding domain logic.

###### Scenario R3-S1: Confirm A Destructive Action

- WHEN a user opens a destructive ConfirmationDialog
- THEN cancellation is visually safer than confirmation
- AND only explicit confirmation delegates the destructive action.

###### Scenario R3-S2: Render An Empty Collection

- WHEN a collection has no content
- THEN EmptyState presents a concise explanation and only renders an action when one is supplied.

##### Requirement R4: Inspector-Capable Workbench Reference

The system SHALL provide a WorkbenchShell with a compact rail, optional controlled navigation and context regions, symmetric desktop geometry, stable inspectable region slots, and a dominant primary work surface. The rail and navigation SHALL share one surface with a thin internal divider. The default content anchor SHALL keep readable primary content stable as optional side regions collapse, while the application retains ownership of collapse controls and responsive side-region presentation.

###### Scenario R4-S1: Compose Named Work Areas

- WHEN rail, navigation, primary, and context content are supplied
- THEN each content region is semantically identifiable and the primary region remains dominant.

###### Scenario R4-S2: Balance The Side Regions

- WHEN the default desktop geometry is used
- THEN context width equals rail plus navigation width and thin center-facing borders frame the primary region.

###### Scenario R4-S3: Collapse Optional Side Regions

- WHEN navigation or context is collapsed independently
- THEN the region leaves layout and accessibility exposure and the default viewport anchor avoids unnecessary primary-content movement.

###### Scenario R4-S4: Constrain The Viewport

- WHEN the reference is viewed below its desktop layout threshold
- THEN persistent navigation and context yield to application-owned mobile presentation without horizontal page overflow.

##### Requirement R5: Application Navigation Rail

The system SHALL provide a compact NavigationRail with named link and button destinations, active state, tooltip disclosure, and optional trailing actions without owning application routing.

###### Scenario R5-S1: Navigate Or Activate A Rail Destination

- WHEN a user follows a link destination or activates a button destination
- THEN the control retains an accessible name and exposes current or pressed state when active.

##### Implemented By

- `src/patterns/FileBrowser/`, `EditorToolbar/`, `ConfirmationDialog/`, `EmptyState/`, `NavigationRail/`, `ThreePaneShell/`, and `WorkbenchShell/`
- `src/patterns/WorkbenchPatterns.stories.tsx`

##### Verified By

- `src/patterns/workbench-patterns.test.tsx` maps all S4 Requirements and Scenarios to focused behavior.
- Playwright checks cover every workbench story at desktop and mobile widths without horizontal overflow.
- `npm run check:all` passes.

##### Verification Gaps

- Integration with application data, editors, collapse-state persistence, and responsive navigation remains application-owned.
- A roving-focus arrow-key tree model is deferred until a consuming application requires it.

#### Supersedes / Reconciles

- Promote and remove the matching deferred Candidate Story rows.
- Rewrite Deferred Scope so implemented experimental references are not described as absent.
- Update Current Scope, Story Index, `Implemented By`, `Verified By`, and `Verification Gaps` after implementation.

## Technical Options

### Option 1: Base UI Primitives With Local Compositions

- Summary: use Base UI for overlay and selection behavior, then wrap it with local semantic APIs and CSS Modules; use native semantic React for composed patterns.
- User impact: predictable keyboard and accessibility behavior with the established Foundation appearance.
- Implementation complexity: moderate, with one focused behavior dependency.
- Reversibility: high because each reference is copy-owned and experimental.
- Client surfaces: React web references and Storybook.
- API / contract shape: typed props with controlled and uncontrolled state where useful.
- Frontend/backend boundary: presentation and interaction only; no backend dependency.
- Data / schema impact: none.
- Auth / security impact: destructive confirmation delegates actions but does not authorize them.
- Testability: strong through Testing Library and Storybook.
- Operational risk: package API changes before reference APIs stabilize.
- Fit with project conventions: explicitly matches the accepted ADR and repository guide.

### Option 2: Hand-Rolled Native React Behavior

- Summary: implement every focus, overlay, dismissal, and keyboard interaction directly.
- User impact: similar appearance, with greater risk of inconsistent accessibility behavior.
- Implementation complexity: high.
- Reversibility: high, but maintenance burden remains local.
- Client surfaces: React web references and Storybook.
- API / contract shape: fully local.
- Frontend/backend boundary: presentation and interaction only.
- Data / schema impact: none.
- Auth / security impact: none beyond consumer-owned destructive actions.
- Testability: possible but broader and more fragile.
- Operational risk: accessibility regressions and duplicated mechanics.
- Fit with project conventions: conflicts with the explicit Base UI preference for behavior-heavy primitives.

## Selected Approach

Use Base UI as the unstyled behavior layer for Tooltip, Dialog, Sheet, Menu, Tabs, Checkbox, and Switch. Wrap those parts in small typed reference APIs and CSS Modules that consume existing semantic tokens. Build OperationStatus and InlineNotice from native semantic structure. Build TreeView with native tree semantics and a documented keyboard map; compose FileTree and searchable FileBrowser over it. Build EditorToolbar, ConfirmationDialog, EmptyState, NavigationRail, ThreePaneShell, and WorkbenchShell as local semantic compositions; ConfirmationDialog composes Dialog and existing buttons. Keep data, routing, persistence, authorization, collapse controls, responsive shell decisions, and domain callbacks at the consumer boundary.

## Experience Design

- Applicability: required, already constrained by existing Foundation direction
- Confirmed direction: dark utilitarian baseline, clean modern composition, restrained borders, minimal radii, no shadows or decorative gradients.
- User confirmation: the catalog list and Foundation conventions were confirmed conversationally on 2026-07-17.
- Reference artifacts: existing Foundation Storybook and `README.md`.

### User Flow And Information Architecture

Storybook groups primitives separately from composed workbench patterns. Each story demonstrates the reference's default, meaningful state variants, and key edge cases.

### Responsive Composition

Individual components size to content or their container. FileBrowser labels wrap. WorkbenchShell hides persistent navigation and context regions below its desktop breakpoint so applications can reuse those destinations in their own labeled Sheet or drawer; its rail and primary region remain free of horizontal page overflow. ThreePaneShell remains the simpler reflowing reference for consumers without an app rail.

### Component And State Contract

References expose semantic state and callbacks instead of low-level style props. The visual catalog includes open, selected, disabled, empty, destructive, and constrained states where applicable.

### Component Strategy

| Component Or Pattern | Strategy | Initial Owner Or Reference | Required Preview States | Follow-Up |
|---|---|---|---|---|
| Tooltip, Dialog, Sheet, Menu, Tabs, Checkbox, Switch | reference candidate | UI Foundations | open, closed, side placement, selected, disabled, focus and keyboard states as applicable | Validate through app-owned adoption before standardizing APIs. |
| OperationStatus, InlineNotice | reference candidate | UI Foundations | dirty, pending, success, warning, error, note, status, alert, and recovery action states | Keep async state machines and recovery work in consumers. |
| TreeView, FileTree, FileBrowser, SegmentedControl, EditorToolbar, DocumentHeader, EditorSurface, ConfirmationDialog, EmptyState, NavigationRail, ThreePaneShell, WorkbenchShell | reference candidate | UI Foundations | default, empty, destructive, active, expanded, collapsed, dirty, pending, saved, recovery, read-only, constrained, long-content, and interactive states as applicable | Keep routing, editor engines, source operations, collapse controls, responsive navigation, and domain behavior in consumers and promote only proven improvements. |

### Accessibility And Interaction

Base UI owns difficult focus and keyboard mechanics. Local APIs require labels or accessible names and preserve visible focus. Text labels are the default for actions, including editor commands and recovery. Icon-only controls are reserved for compact rails and similarly constrained contexts and still require accessible names and tooltip disclosure where meaning is not persistent.

### Visual Direction

Use existing action, danger, surface, text, spacing, radius, motion, and typography tokens. Borders appear only where equal-background surfaces need separation.

### Open Design Questions

- None blocking an experimental scaffold.

## Client And API Boundary

- Current clients: React web applications that inspect and copy references.
- Plausible future clients: other React applications and Storybook-based design reviews.
- Reusable product capabilities: interaction and composition patterns only.
- API or typed contract: exported TypeScript props and callbacks in each reference.
- OpenAPI plan, if HTTP-facing: not applicable.
- Backend platform exposed directly to clients?: no backend exists in this repository.
- Client-specific presentation or local state: consumers own data loading, routing, persistence, authorization, and product-specific responsive behavior.
- Rationale: preserve independent application architecture and releases.

## Alternatives Considered

- Option: shared runtime component package.
  - Why not: rejected by the accepted copy-owned reference ADR unless repeated synchronized maintenance proves package ownership would be cheaper.

## Why This Approach

It concentrates difficult accessibility behavior in a proven headless layer while keeping the repository small, inspectable, standards-based, and easy to copy. It also avoids turning compositional examples into an application framework.

## ADRs

- Required: no new ADR
- ADR path: `docs/adrs/2026-07-17-copy-owned-reference-components.md`
- Decision summary: this Change implements the accepted rule to use Base UI when behavior-heavy mechanics warrant it.
- Reconsider when: Base UI prevents copy ownership, conflicts with React support, or creates more maintenance than tested local behavior.

## Implementation Constraints

- Keep reference APIs experimental and avoid compatibility aliases.
- Do not add Tailwind, other utility frameworks, utility classes, inline visual style matrices, application data models, or domain language.
- Colocate source, CSS Modules, stories, and focused behavior tests.
- Preserve the current dependency-free CSS starter; the React catalog may depend on Base UI.

## Verification Strategy

- Focused automated tests: opening/dismissing overlays, focus restoration, keyboard selection, disabled behavior, TreeView roving focus and hierarchical navigation, FileBrowser disclosure/search/empty behavior, editor mode callbacks, confirmation delegation, conditional EmptyState action, and expanded/collapsed workbench region semantics.
- Broad supporting gates: `npm run check:all` for CSS contract, TypeScript, Vitest, and static Storybook compilation.
- Deterministic E2E: Playwright inspection of representative primitive and pattern stories for overflow and interaction.
- Live-provider or external-service playtests: not applicable.
- Manual UI confirmation: pending user against the local Storybook catalog.
- Debug/log inspection: not applicable.

## Decisions

- The catalog is grouped into primitives and patterns rather than one component tier.
- Light mode remains a separate Change.
- Experimental references are complete enough to exercise, but real application adoption is the gate for stable APIs.
- Reference maturity follows candidate, Storybook prototype, app-owned adoption, real-application validation, then standardized reference; this Change reaches the prototype stage only.

## Risks / Trade-Offs

- Eleven references create a broad review surface; grouped tests and consistent wrappers limit duplication.
- Base UI API drift may require local updates before these references stabilize.
- WorkbenchShell standardizes desktop composition and the handoff point for constrained widths, but cannot encode each application's mobile Sheet, drawer, or navigation state model.
