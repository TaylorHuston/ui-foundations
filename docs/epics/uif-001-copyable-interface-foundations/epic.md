---
schema: sdd-epic-v2
id: UIF-001
status: active
created: 2026-07-17
modified: 2026-07-24
last_verified: 2026-07-24
stories:
  - S1
  - S2
  - S3
  - S4
---

# UIF-001 Interface Foundations

## Product Context

- Related docs: `README.md`, `spaces/shared/visual-style-guide.md`, `spaces/shared/development/styling.md`
- Related ADRs: `docs/adrs/2026-07-22-use-versioned-runtime-library-with-app-wrappers.md`

UI Foundations reduces repeated interface decisions across React applications while preserving application ownership and independent releases.

## Outcome

Application developers can use a coherent CSS baseline and tested React components through versioned package imports, then adapt product identity behind application-owned wrappers.

## Current Scope

- Semantic CSS tokens, global defaults, accessibility behavior, and plain-CSS control recipes.
- Button, IconButton, TextField, and Textarea TypeScript React references.
- Tooltip, Dialog, Sheet, Menu, Tabs, Checkbox, Switch, and SegmentedControl behavior references.
- OperationStatus and InlineNotice feedback references.
- Minimal sign-in and sign-up AuthenticationForm composition.
- TreeView behavior plus FileTree, searchable FileBrowser, EditorToolbar, DocumentHeader, EditorSurface, ConfirmationDialog, EmptyState, NavigationRail, ThreePaneShell, and inspector-capable WorkbenchShell compositions.
- Storybook examples and focused behavioral tests.

## Deferred Scope

- Resizable panes, drag and drop, virtualization, editor engines, Markdown projection, autosave, source fidelity, and revision handling.
- Light-mode implementation and dual-theme component verification.
- Automatic synchronization or upgrades, application migrations, registry publication, and product-specific integrations.

## Candidate Stories

- None. New candidates should be added only after repeated application use identifies another broadly useful starting point.

## Story Index

| Story | Implementation | Verification | Capability | Last Verified | Notes |
|---|---|---|---|---|---|
| S1 | implemented | verified | Adopt the CSS foundation. | 2026-07-17 | Canonical contract is enforced by `scripts/check.mjs`. |
| S2 | implemented | verified | Use accessible React components. | 2026-07-22 | Native controls, authentication, and feedback components. |
| S3 | implemented | verified | Use behavior-heavy primitives. | 2026-07-22 | Base UI-backed overlay and selection components remain pre-1.0. |
| S4 | implemented | verified | Compose familiar workbench patterns. | 2026-07-24 | Editor engines, optional side regions, responsive navigation, persistence, and rename/mode state remain application-controlled. |

## Stories

### Story S1: Adopt The CSS Foundation

Implementation: implemented
Verification: verified
Created: 2026-07-17
Modified: 2026-07-17
Last verified: 2026-07-17

As an application developer, I want a coherent CSS starting point, so that I can build a familiar interface without recreating foundational decisions.

#### Requirements And Scenarios

##### Requirement R1: Semantic Token Contract

The system SHALL provide the documented semantic token roles and default scales without imposing project-specific primary or accent aliases.

###### Scenario R1-S1: Use Default Foundation

- WHEN a developer loads `@taylorhuston/ui-foundations/styles.css`
- THEN the documented surface, text, border, action, identity, information, state, focus, selection, spacing, radius, control, motion, and typography roles are available.

###### Scenario R1-S2: Override Product Identity

- WHEN an application overrides action or identity values
- THEN component recipes continue to consume semantic roles without requiring structural CSS changes.

##### Requirement R2: Global Interaction Baseline

The system SHALL provide inspectable global defaults for reset, typography, selection, keyboard focus, and reduced motion.

###### Scenario R2-S1: Keyboard And Reduced-Motion Use

- WHEN keyboard focus or reduced-motion preferences are active
- THEN focus remains visible and nonessential motion is removed.

#### Implemented By

| Requirement / Scenario | Location / Anchor | Kind | Responsibility |
|---|---|---|---|
| S1/R1 | `src/styles/tokens.css#:root` | primary | Defines the canonical semantic token contract and identity profiles. |
| S1/R1 | `src/styles/primitives.css#.primaryAction` | presentation | Demonstrates token-consuming plain-CSS control recipes. |
| S1/R2 | `src/styles/global.css#:focus-visible` | primary | Owns reset, focus, selection, and reduced-motion behavior. |
| S1/R1-S1 | `scripts/check.mjs#requiredTokens` | support | Enforces the required CSS inventory and token vocabulary. |

#### Implementation Gaps

- None.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S1/R1-S1 | `npm run check` | Required semantic roles exist and vague project aliases are absent. | Passing 2026-07-17 |
| S1/R1-S2 | `src/components/Button/Button.module.css` and `src/styles/primitives.css` source inspection | Representative React and plain-CSS recipes consume semantic variables rather than embedded palette values. | Passing 2026-07-17 |
| S1/R2-S1 | `npm run build:storybook` and `src/styles/global.css` inspection | Baseline compiles and focus/reduced-motion rules are present. | Passing 2026-07-17 |

#### Verification Gaps

- Runtime proof of a product-specific override remains the consuming application's responsibility.

#### Story Notes

- Compatibility aliases in `tokens.css` are temporary migration aids, not additions to the canonical vocabulary.

### Story S2: Use Accessible React Components

Implementation: implemented
Verification: verified
Created: 2026-07-17
Modified: 2026-07-22
Last verified: 2026-07-22

As an application developer, I want tested React components, so that I can adopt consistent controls and forms while retaining application ownership.

#### Requirements And Scenarios

##### Requirement R1: Semantic Control APIs

The system SHALL provide Button, IconButton, TextField, and Textarea references whose props describe intent and state rather than low-level visual declarations.

###### Scenario R1-S1: Render Supported Control States

- WHEN a reference control is rendered in a supported variant, size, disabled, invalid, or pending state
- THEN its semantics, accessible state, and shared token styling reflect that state.

###### Scenario R1-S2: Prevent Pending Re-Submission

- WHEN a Button is pending
- THEN it is exposed as busy and cannot trigger another action.

##### Requirement R2: Labeled And Described Fields

The system SHALL associate labels, supporting text, and validation messages with TextField and Textarea controls.

###### Scenario R2-S1: Announce A Validation Error

- WHEN a field receives an error
- THEN it is marked invalid and the error is included in its accessible description without changing its accessible name.

##### Requirement R3: Authentication Reference Composition

The system SHALL provide sign-in and sign-up AuthenticationForm examples that compose the primitives while leaving submission and provider integration to the consuming application.

###### Scenario R3-S1: Render Sign-Up Password Confirmation

- WHEN sign-up asks the user to create a password
- THEN a separate visible Confirm password field is rendered.

###### Scenario R3-S2: Reject Mismatched Passwords

- WHEN sign-up is submitted with different password and confirmation values
- THEN submission is not delegated and the confirmation field reports the mismatch.

##### Requirement R4: Feedback References

The system SHALL provide OperationStatus and InlineNotice references that separate live operation progress from persistent explanatory or recovery messages.

###### Scenario R4-S1: Announce Operation Progress

- WHEN an operation changes between dirty, pending, success, warning, or error state
- THEN its text and semantic live region expose the update without relying on color alone.

###### Scenario R4-S2: Choose Notice Urgency

- WHEN an application renders an InlineNotice
- THEN it explicitly chooses note, status, or alert semantics and may provide a visible text action.

#### Implemented By

| Requirement / Scenario | Location / Anchor | Kind | Responsibility |
|---|---|---|---|
| S2/R1 | `src/components/Button/Button.tsx#Button`; `src/components/IconButton/IconButton.tsx#IconButton` | primary | Own semantic action variants, pending state, and named icon actions. |
| S2/R2 | `src/components/TextField/TextField.tsx#TextField`; `src/components/Textarea/Textarea.tsx#Textarea` | primary | Associate field labels, guidance, errors, and invalid state. |
| S2/R3 | `src/patterns/AuthenticationForm/AuthenticationForm.tsx#AuthenticationForm` | primary | Composes sign-in and sign-up fields and password confirmation behavior. |
| S2/R4-S1 | `src/components/OperationStatus/OperationStatus.tsx#OperationStatus` | primary | Presents compact text-first live operation state and optional recovery action. |
| S2/R4-S2 | `src/components/InlineNotice/InlineNotice.tsx#InlineNotice` | primary | Presents persistent messages with caller-selected note, status, or alert semantics. |
| S2/R1-R4 | `.storybook/main.ts#stories` | support | Discovers inspectable component and pattern stories. |

#### Implementation Gaps

- None.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S2/R1-S1 | `src/components/components.test.tsx#preserves disabled semantics across button variants and sizes`; `src/components/components.test.tsx#requires an accessible name for icon-only actions` | Supported controls preserve disabled state and semantic names. | Passing 2026-07-22 |
| S2/R1-S1 | Manual browser and axe inspection of the Controls catalog | Supported controls retain token styling and report no WCAG-tagged violations. | Passing 2026-07-17 |
| S2/R1-S2 | `src/components/components.test.tsx#prevents repeated activation while a button is pending` | Busy state disables duplicate activation. | Passing 2026-07-22 |
| S2/R2-S1 | `src/components/components.test.tsx#associates field errors with the invalid input`; `src/components/components.test.tsx#associates textarea errors without changing its name` | Invalid fields retain their label and expose the error description. | Passing 2026-07-22 |
| S2/R3-S1, S2/R3-S2 | `src/patterns/AuthenticationForm/AuthenticationForm.test.tsx#rejects mismatched sign-up passwords before delegation`; `src/patterns/AuthenticationForm/AuthenticationForm.test.tsx#delegates valid sign-up values` | Mismatch blocks delegation and valid values delegate. | Passing 2026-07-22 |
| S2/R4-S1 | `src/components/components.test.tsx#exposes operation updates without turning recovery actions into icon-only controls` | Operation updates use a live status and recovery remains visibly named. | Passing 2026-07-22 |
| S2/R4-S2 | `src/components/components.test.tsx#lets callers choose urgent notice semantics explicitly` | Notice urgency is caller-selected. | Passing 2026-07-22 |

#### Verification Gaps

- Provider integration is intentionally application-owned and not verified here.

#### Story Notes

- Native browser validation handles required and email constraints; the pattern owns password-match validation and delegates valid values.
- Provider integration is intentionally application-owned and not verified here.

### Story S3: Use Behavior-Heavy Primitives

Implementation: implemented
Verification: verified
Created: 2026-07-17
Modified: 2026-07-22
Last verified: 2026-07-22

As an application developer, I want tested overlay and selection primitives, so that I do not recreate difficult accessibility mechanics for each application.

#### Requirements And Scenarios

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

#### Implemented By

| Requirement / Scenario | Location / Anchor | Kind | Responsibility |
|---|---|---|---|
| S3/R1 | `src/components/Tooltip/Tooltip.tsx#Tooltip`; `src/components/Dialog/Dialog.tsx#Dialog`; `src/components/Sheet/Sheet.tsx#Sheet`; `src/components/Menu/Menu.tsx#Menu` | primary | Wrap Base UI overlay, focus, portal, dismissal, and placement mechanics. |
| S3/R2 | `src/components/Tabs/Tabs.tsx#Tabs`; `src/components/Checkbox/Checkbox.tsx#Checkbox`; `src/components/Switch/Switch.tsx#Switch` | primary | Own labeled selection, toggle, disabled, and controlled or uncontrolled state. |
| S3/R1-R2 | `src/components/BehaviorComponents.stories.tsx#Overlays` | presentation | Presents inspectable overlay and selection states. |
| S3/R1-R2 | `package.json#dependencies` | configuration | Pins the Base UI behavior dependency used by the references. |

#### Implementation Gaps

- None.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S3/R1-S1 | `src/components/behavior-components.test.tsx#opens a labeled tooltip from keyboard focus and dismisses it with Escape`; `src/components/behavior-components.test.tsx#moves focus into a dialog and restores it to the trigger after dismissal`; `src/components/behavior-components.test.tsx#moves focus into a sheet and restores it after Escape dismissal`; `src/components/behavior-components.test.tsx#delegates enabled menu actions while respecting disabled items` | Tooltip, Dialog, Sheet, and Menu open, expose semantic widgets, dismiss, and delegate enabled actions. | Passing 2026-07-22 |
| S3/R1-S2 | `src/components/behavior-components.test.tsx#moves focus into a dialog and restores it to the trigger after dismissal`; `src/components/behavior-components.test.tsx#moves focus into a sheet and restores it after Escape dismissal` | Focus enters each modal surface and returns to its trigger after dismissal. | Passing 2026-07-22 |
| S3/R2-S1, S3/R2-S2 | `src/components/behavior-components.test.tsx#changes tabs while leaving disabled tabs unavailable`; `src/components/behavior-components.test.tsx#exposes checkbox and switch state changes and disabled behavior` | Tabs, Checkbox, and Switch update semantic state while disabled controls reject activation. | Passing 2026-07-22 |
| S3/R1-R2 | Manual browser and accessibility inspection of `src/components/BehaviorComponents.stories.tsx` at `1440x900` and `390x844` | Closed and open reference states show no reported WCAG violations or horizontal overflow. | Passing 2026-07-17 |
| S3/R1-S1, S3/R1-S2, S3/R2-S1, S3/R2-S2 | `npm run check:all` supporting gate | No-Tailwind and CSS contracts, types, 25 focused tests, and static Storybook compilation pass together. | Passing 2026-07-22 |

#### Verification Gaps

- Base UI API stability and package API/adoption ergonomics still need proof from real consuming applications.
- Axe's optional `region` best-practice rule flags Tooltip and Menu portals outside the isolated Storybook story landmark; WCAG-tagged checks pass, and consuming applications own final page landmarks.

#### Story Notes

- These APIs are pre-1.0 wrappers around Base UI 1.6 behavior and follow the library compatibility policy.
- Trigger labels name Menu surfaces; the wrapper does not add a competing menu label.

### Story S4: Compose Familiar Workbench Patterns

Implementation: implemented
Verification: verified
Created: 2026-07-17
Modified: 2026-07-24
Last verified: 2026-07-24

As an application developer, I want reusable workbench patterns, so that recurring navigation and editing layouts begin from consistent, adaptable structures.

#### Requirements And Scenarios

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

The system SHALL provide a text-first SegmentedControl, EditorToolbar, DocumentHeader, and EditorSurface composition for trailing or deliberately centered Source/Rendered modes, semantic commands, title-initiated controlled inline filename editing, operation and recovery states, stable editor-region slots, and application-owned behavior.

###### Scenario R2-S1: Change Editor Presentation

- WHEN a user selects Source or Rendered
- THEN the selected mode is exposed and the consuming application receives the requested mode
- AND the default library mode switch is first in the right-aligned trailing group before routine status and caller-supplied trailing actions, while deliberate center placement remains supported.

###### Scenario R2-S2: Edit A Document Name

- WHEN a consumer supplies controlled rename and a user activates the visible document title by pointer or keyboard
- THEN the labeled filename input receives focus and remains editable
- AND Enter submits the rename form, Escape cancels, and visible Save name and Cancel actions delegate the result without owning rename validation or persistence.
- AND when controlled rename is absent, including a read-only consumer, the title remains a noninteractive heading without a redundant Rename action.

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

The system SHALL provide a WorkbenchShell with a compact rail, optional controlled navigation and context regions, stable inspectable region slots, and a dominant primary work surface. On desktop, the rail and navigation SHALL share one surface role with a thin internal divider, the context region SHALL default to their combined width, and the default content anchor SHALL keep readable primary content stable when either optional side region collapses. Responsive side-region presentation remains owned by the consuming application.

###### Scenario R4-S1: Compose Named Work Areas

- WHEN rail, navigation, primary, and context content are supplied
- THEN each content region is semantically identifiable
- AND each shell region exposes a stable styling and inspection slot
- AND the primary region remains the dominant work area.

###### Scenario R4-S2: Balance The Side Regions

- WHEN the desktop shell uses its default widths
- THEN the context region equals the combined rail and navigation width
- AND thin dividers separate the rail interaction zone and frame the primary work surface.

###### Scenario R4-S3: Collapse Optional Side Regions

- WHEN the application collapses navigation or context independently
- THEN the collapsed region is removed from layout and accessibility exposure
- AND the default viewport anchor prevents the readable primary content from shifting unnecessarily.

###### Scenario R4-S4: Constrain The Viewport

- WHEN the reference is viewed below its desktop layout threshold
- THEN persistent navigation and context regions yield to application-owned mobile presentation
- AND the remaining shell has no text overlap or horizontal page overflow.

##### Requirement R5: Application Navigation Rail

The system SHALL provide a compact NavigationRail with named link and button destinations, active state, tooltip disclosure, and optional trailing actions without owning application routing. When composed beside a navigation sidebar, both regions SHALL share the same surface role and use quiet structural boundaries that can mirror a corresponding context sidebar.

###### Scenario R5-S1: Navigate Or Activate A Rail Destination

- WHEN a user follows a link destination or activates a button destination
- THEN the control retains an accessible name and exposes current or pressed state when active.

###### Scenario R5-S2: Compose A Symmetrical Workbench Shell

- WHEN a compact rail, navigation sidebar, primary work surface, and context sidebar are composed together
- THEN the rail and navigation sidebar use the same background role
- AND thin center-facing sidebar boundaries frame the primary work surface without producing a boxed grid.

#### Implemented By

| Requirement / Scenario | Location / Anchor | Kind | Responsibility |
|---|---|---|---|
| S4/R1-S1, S4/R1-S3 | `src/components/TreeView/TreeView.tsx#TreeView` | primary | Owns hierarchical disclosure, selection, roving focus, and Arrow/Home/End keyboard navigation. |
| S4/R1-S1, S4/R1-S2 | `src/patterns/FileBrowser/FileBrowser.tsx#FileTree`; `src/patterns/FileBrowser/FileBrowser.tsx#FileBrowser` | primary | Add file/folder presentation and compose optional flat search and empty results over TreeView behavior. |
| S4/R2-S1 | `src/components/SegmentedControl/SegmentedControl.tsx#SegmentedControl`; `src/patterns/EditorToolbar/EditorToolbar.tsx#EditorToolbar`; `src/patterns/EditorToolbar/EditorToolbar.tsx#EditorModeSwitch` | primary | Own text-first controlled single-selection, canonical trailing mode placement, explicit center placement, and Source/Rendered delegation. |
| S4/R2-S2 | `src/patterns/DocumentHeader/DocumentHeader.tsx#DocumentHeader` | primary | Presents static/read-only document identity or controlled title-initiated inline filename editing, focus, keyboard actions, visible recovery actions, and caller-owned validation. |
| S4/R2-S3 | `src/patterns/EditorToolbar/EditorToolbar.tsx#EditorToolbar`; `src/components/OperationStatus/OperationStatus.tsx#OperationStatus`; `src/components/InlineNotice/InlineNotice.tsx#InlineNotice` | primary | Compose one live operation state with persistent recovery messaging and caller-owned actions. |
| S4/R2-S4 | `src/patterns/EditorSurface/EditorSurface.tsx#EditorSurface` | primary | Provides stable header, toolbar, notice, and editor slots with configurable content width and text inset. |
| S4/R3-S1 | `src/patterns/ConfirmationDialog/ConfirmationDialog.tsx#ConfirmationDialog` | primary | Delegates destructive work only after explicit confirmation. |
| S4/R3-S2 | `src/patterns/EmptyState/EmptyState.tsx#EmptyState` | primary | Presents concise empty content and an optional next action. |
| S4/R4 | `src/patterns/WorkbenchShell/WorkbenchShell.tsx#WorkbenchShell` | primary | Composes inspectable rail, controlled optional side regions, symmetric desktop geometry, and viewport-stable or available-space content anchoring. |
| S4/R4 | `src/patterns/ThreePaneShell/ThreePaneShell.tsx#ThreePaneShell` | support | Preserves the simpler three-region reference for consumers that do not need a rail or independent side-region control. |
| S4/R5 | `src/patterns/NavigationRail/NavigationRail.tsx#NavigationRail` | primary | Composes named link and button destinations with active state and tooltips. |
| S4/R1-R5 | `src/patterns/WorkbenchPatterns.stories.tsx#DocumentEditing`; `src/patterns/WorkbenchPatterns.stories.tsx#EditorRecovery`; `src/patterns/WorkbenchPatterns.stories.tsx#ThreePaneComposition` | presentation | Presents standalone and composed workbench examples. |

#### Implementation Gaps

- None.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S4/R1-S1, S4/R1-S2 | `src/patterns/workbench-patterns.test.tsx#discloses, selects, searches, and reports an empty file result` | Disclosure, selection, flat search results, and no-results behavior work through semantic controls. | Passing 2026-07-22 |
| S4/R1-S3 | `src/patterns/workbench-patterns.test.tsx#moves one tree tab stop with Arrow, Home, End, Left, and Right` | One roving Tab stop and hierarchical Arrow/Home/End movement remain available through the file-specific composition. | Passing 2026-07-22 |
| S4/R2-S1 | `src/patterns/workbench-patterns.test.tsx#exposes text-first editor modes and delegates controlled changes` | Source/Rendered state delegates through the app callback; the default switch is trailing, status/actions remain ordered after it, and explicit center placement is supported. | Passing 2026-07-24 |
| S4/R2-S2 | `src/patterns/workbench-patterns.test.tsx#delegates inline document-name editing through visible actions` | Controlled title activation focuses the labeled filename input; form submit and Escape delegate only caller-owned submit/cancel behavior; static/read-only titles remain noninteractive. | Passing 2026-07-24 |
| S4/R2-S3 | `src/patterns/workbench-patterns.test.tsx#composes one routine live status with an assertive recovery notice` | Live save state is not nested and conflict/error recovery remains text-labeled. | Passing 2026-07-22 |
| S4/R2-S4 | `src/patterns/workbench-patterns.test.tsx#exposes stable editor regions and shared alignment variables` | Editor chrome and engine slots remain inspectable and configurable without Foundation ownership of editor behavior. | Passing 2026-07-22 |
| S4/R2-S1, S4/R2-S2, S4/R2-S3, S4/R2-S4 | Browser inspection of Document Editing and Editor Recovery at `1440x900` and `390x844` | Title trigger, keyboard rename controls, trailing mode/status/action group, save and recovery states, long filenames, and editor alignment reflow without overlap or horizontal overflow. | Passing 2026-07-24 |
| S4/R2-S1, S4/R2-S2, S4/R2-S3, S4/R2-S4 | Storybook accessibility inspection of Document Editing and Editor Recovery | Both stories report zero violations; Editor Recovery has one documented inconclusive check and twenty-two passes. | Passing 2026-07-22 |
| S4/R3-S1, S4/R3-S2 | `src/patterns/workbench-patterns.test.tsx#delegates destructive work only after explicit confirmation`; `src/patterns/workbench-patterns.test.tsx#renders an empty state action only when supplied` | Cancellation does not delegate destruction, confirmation does, and actions remain optional. | Passing 2026-07-22 |
| S4/R4-S1, S4/R4-S3 | `src/patterns/workbench-patterns.test.tsx#composes optional controlled side regions around a stable work surface` | Named regions expose stable slots while expanded, and controlled navigation and context regions leave the accessibility tree when collapsed. | Passing 2026-07-22 |
| S4/R4-S2, S4/R4-S3 | Browser geometry inspection of the Inspector Workbench at `1440x900` | Rail is 56px with a 1px divider, navigation is 288px, context is their 344px sum, all side regions share the same computed surface, and page overflow is zero. | Passing 2026-07-22 |
| S4/R4-S4 | Browser inspection of the Inspector Workbench at `390x844` | Persistent navigation and context regions are hidden, the rail remains available, and the primary region fits without horizontal overflow. | Passing 2026-07-22 |
| S4/R5-S1 | `src/patterns/workbench-patterns.test.tsx#supports named link and button destinations in an application rail` | Link and button destinations remain named, expose active state, and delegate activation. | Passing 2026-07-22 |
| S4/R5-S2 | Manual browser inspection of the rail-based Three Pane Composition at `1440x900` and `390x844` | Rail and navigation share one surface while thin mirrored sidebar boundaries frame the primary workspace; stacked panes remove the desktop dividers without overflow. | Passing 2026-07-20 |
| S4/R1-S1, S4/R1-S2, S4/R1-S3, S4/R2-S1, S4/R2-S2, S4/R2-S3, S4/R2-S4, S4/R3-S1, S4/R3-S2, S4/R4-S1, S4/R4-S2, S4/R4-S3, S4/R4-S4, S4/R5-S1, S4/R5-S2 | `npm run check:all` supporting gate | No-Tailwind and CSS contracts, types, 29 focused tests, and static Storybook compilation pass together. | Passing 2026-07-22 |

#### Verification Gaps

- Data loading, routing, persistence, authorization, editor engines, pane persistence, collapse controls, and product-specific mobile navigation remain application-owned.
- Large-inventory incremental loading or virtualization remains application-owned until real consumer evidence establishes a reusable contract.
- API stability and visual convergence still need proof through application adoption.

#### Story Notes

- WorkbenchShell hides persistent side regions below its desktop breakpoint but intentionally does not choose the application's mobile Sheet, drawer, tab, or navigation state model.
- ThreePaneShell remains a simpler reference for consumers without the inspector-capable rail layout.
- FileBrowser search intentionally returns a flat result list while FileTree keeps the hierarchical keyboard contract separate and reusable.
- `EditorToolbar.modePlacement` defaults to `trailing`; `center` remains an explicit pre-1.0 compatibility choice. `DocumentHeader.rename` makes only the supplied controlled title interactive and never assumes rename permission or persistence.

## Cross-Story Concerns

- React references consume the same semantic tokens enforced by S1.
- S3 provides the behavior layer composed by S4 ConfirmationDialog.
- S4 patterns preserve the application boundaries established by the versioned-library and app-wrapper ADR.
- Applications own wrappers, integration, product behavior, and deliberate replacement.

## Open Decisions

- None for the implemented slice.

## Notes

- UI Foundations remains pre-release. Reference APIs may evolve as real application adoption produces evidence.

## Completion Criteria

This Epic is healthy when its implemented foundations remain mapped to current source and scenario evidence, deferred scope remains explicit, and documentation keeps product behavior application-owned.
