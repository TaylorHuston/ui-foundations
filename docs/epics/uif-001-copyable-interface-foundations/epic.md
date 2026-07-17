---
id: UIF-001
status: active
created: 2026-07-17
modified: 2026-07-17
last_verified: 2026-07-17
stories:
  - S1
  - S2
---

# UIF-001 Copyable Interface Foundations

## Product Context

- Related docs: `README.md`, `spaces/shared/visual-style-guide.md`, `spaces/shared/development/styling.md`
- Related ADRs: `docs/adrs/2026-07-17-copy-owned-reference-components.md`

UI Foundations reduces repeated interface decisions across React applications while preserving application ownership and independent releases.

## Outcome

Application developers can inspect and copy a coherent CSS baseline and tested React references, then adapt them without taking a runtime dependency on UI Foundations.

## Current Scope

- Semantic CSS tokens, global defaults, accessibility behavior, and plain-CSS control recipes.
- Button, IconButton, TextField, and Textarea TypeScript React references.
- Minimal sign-in and sign-up AuthenticationForm composition.
- Storybook examples and focused behavioral tests.

## Deferred Scope

- Checkbox, Tabs, Dialog, Tooltip, Menu, and SegmentedControl.
- FileBrowser, EditorToolbar, and ThreePaneShell patterns.
- CLI copying, synchronization, publishing, or application migrations.

## Candidate Stories

| Candidate | Status | Story Shape | Acceptance Signals |
|---|---|---|---|
| `behavior-heavy-primitives` | deferred | As an application developer, I want tested overlay and selection primitives, so that accessibility mechanics are not recreated. | Two real consumers validate stable semantic APIs. |
| `workbench-patterns` | deferred | As an application developer, I want copyable workbench patterns, so that repeated shells start consistently. | Existing app patterns converge without erasing product differences. |

## Story Index

| Story | Status | Capability | Last Verified | Notes |
|---|---|---|---|---|
| S1 | implemented | Adopt a copyable CSS foundation. | 2026-07-17 | Canonical contract is enforced by `scripts/check.mjs`. |
| S2 | implemented | Copy accessible React references. | 2026-07-17 | Initial native-control slice and authentication pattern. |

## Stories

### Story S1: Adopt A Copyable CSS Foundation

Status: implemented
Created: 2026-07-17
Modified: 2026-07-17
Last verified: 2026-07-17

As an application developer, I want a coherent CSS starting point, so that I can build a familiar interface without recreating foundational decisions.

#### Requirements And Scenarios

##### Requirement R1: Semantic Token Contract

The system SHALL provide the documented semantic token roles and default scales without imposing project-specific primary or accent aliases.

###### Scenario R1-S1: Use Default Foundation

- WHEN a developer loads `src/index.css`
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

| Path | Role | Recheck Trigger |
|---|---|---|
| `src/styles/tokens.css` | Canonical token contract | Token role or default changes. |
| `src/styles/global.css` | Reset and accessibility baseline | Global interaction behavior changes. |
| `src/styles/primitives.css` | Plain-CSS recipes | Primitive appearance or states change. |
| `scripts/check.mjs` | Deterministic contract enforcement | CSS inventory or contract changes. |

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S1/R1-S1 | `npm run check` | Required semantic roles exist and vague project aliases are absent. | Passing 2026-07-17 |
| S1/R1-S2 | `src/components/` and `src/styles/primitives.css` source inspection | Reference recipes consume semantic variables rather than embedded palette values. | Passing 2026-07-17 |
| S1/R2-S1 | `npm run build:storybook` and `src/styles/global.css` inspection | Baseline compiles and focus/reduced-motion rules are present. | Passing 2026-07-17 |

#### Verification Gaps

- Runtime proof of a product-specific override remains the consuming application's responsibility.

#### Story Notes

- Compatibility aliases in `tokens.css` are temporary migration aids, not additions to the canonical vocabulary.

### Story S2: Copy Accessible React References

Status: implemented
Created: 2026-07-17
Modified: 2026-07-17
Last verified: 2026-07-17

As an application developer, I want tested React reference components, so that I can adopt consistent controls and forms while retaining application ownership.

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

#### Implemented By

| Path | Role | Recheck Trigger |
|---|---|---|
| `src/components/` | Primitive source, styles, stories, and tests | Primitive API or state behavior changes. |
| `src/patterns/AuthenticationForm/` | Authentication composition, stories, and tests | Authentication fields or validation changes. |
| `.storybook/main.ts` | Reference story discovery | Story location changes. |

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S2/R1-S1 | `src/components/Controls.stories.tsx`, `src/components/components.test.tsx`, axe inspection, and `npm run build:storybook` | Supported controls render with semantic names, disabled/invalid state, and token styling. | Passing 2026-07-17 |
| S2/R1-S2 | `src/components/components.test.tsx` - pending Button test | Busy state disables duplicate activation. | Passing 2026-07-17 |
| S2/R2-S1 | `src/components/components.test.tsx` - field error test | Invalid fields retain their label and expose the error description. | Passing 2026-07-17 |
| S2/R3-S1, S2/R3-S2 | `src/patterns/AuthenticationForm/AuthenticationForm.test.tsx` | Confirmation renders, mismatch blocks delegation, and valid values delegate. | Passing 2026-07-17 |

#### Verification Gaps

- Provider integration is intentionally application-owned and not verified here.

#### Story Notes

- Native browser validation handles required and email constraints; the pattern owns password-match validation and delegates valid values.
- Provider integration is intentionally application-owned and not verified here.

## Cross-Story Concerns

- React references consume the same semantic tokens enforced by S1.
- Applications own copied source and its future verification.

## Open Decisions

- None for the implemented slice.

## Notes

- UI Foundations remains pre-release. Reference APIs may evolve as real application adoption produces evidence.

## Completion Criteria

This Epic is healthy when its implemented references remain mapped to current source and scenario evidence, deferred candidates remain explicit, and documentation does not imply runtime package ownership.
