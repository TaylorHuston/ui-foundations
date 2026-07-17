# Design: Copyable React Foundations

## Context

UI Foundations currently provides a small CSS starter and Storybook comparison hub. The active apps independently implement closely related tokens and controls. The repository explicitly avoids runtime ownership of application UI, but it can provide executable references that applications copy and adapt.

## Goals / Non-Goals

**Goals:**

- Define one readable CSS vocabulary and baseline implementation.
- Provide production-shaped React references with semantic APIs, CSS Modules, stories, and tests.
- Preserve app ownership and visual identity after adoption.

**Non-Goals:**

- Publish or import a shared runtime component package.
- Synchronize copied code across applications.
- Build the entire future component and pattern catalog in this Change.
- Own application authentication services or workflows.

## Planning Interview / Story Refinement

- Scope boundary reviewed: yes; the initial slice is CSS plus four primitives and AuthenticationForm.
- User decisions: all token families, file responsibilities, component language, copy-owned adoption, and initial catalog were confirmed conversationally.
- Assumptions: React 19 and CSS Modules remain representative of active applications.
- Deferred scope: behavior-heavy primitives, larger workbench patterns, generator commands, and application migrations.
- Story boundaries challenged: CSS adoption and React reference adoption remain separate because either can be used independently.
- Requirements refined: component semantics, state behavior, accessibility, copy ownership, and authentication field behavior are observable in Storybook and tests.
- Scenario gaps considered: overrides, disabled/pending controls, labels/errors, password confirmation, and submit ownership.
- Open questions that block implementation: none.

## Epic Changes

### Create Epic: UIF-001 Copyable Interface Foundations

- Proposed directory: `docs/epics/uif-001-copyable-interface-foundations/`
- Proposed file: `docs/epics/uif-001-copyable-interface-foundations/epic.md`

#### Story S1: Adopt A Copyable CSS Foundation

As an application developer, I want a coherent CSS starting point, so that I can build a familiar interface without recreating foundational decisions.

##### Requirement R1: Semantic Token Contract

The system SHALL provide the agreed semantic token roles and default scales without imposing project-specific primary or accent aliases.

###### Scenario R1-S1: Use Default Foundation

- WHEN a developer loads the CSS starter
- THEN the documented surface, text, border, action, identity, information, state, focus, selection, spacing, radius, control, motion, and typography roles are available.

###### Scenario R1-S2: Override Product Identity

- WHEN an application overrides action or identity values
- THEN component recipes continue to consume semantic roles without requiring structural CSS changes.

##### Requirement R2: Global Interaction Baseline

The system SHALL provide inspectable global defaults for reset, typography, selection, keyboard focus, and reduced motion.

###### Scenario R2-S1: Keyboard And Reduced-Motion Use

- WHEN keyboard focus or reduced-motion preferences are active
- THEN focus remains visible and nonessential motion is removed.

#### Story S2: Copy Accessible React References

As an application developer, I want tested React reference components, so that I can adopt consistent controls and forms while retaining application ownership.

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
- THEN it is marked invalid and the error is included in its accessible description.

##### Requirement R3: Authentication Reference Composition

The system SHALL provide sign-in and sign-up AuthenticationForm examples that compose the primitives while leaving submission and provider integration to the consuming application.

###### Scenario R3-S1: Render Sign-Up Password Confirmation

- WHEN the sign-up mode asks the user to create a password
- THEN a separate visible Confirm password field is rendered.

###### Scenario R3-S2: Reject Mismatched Passwords

- WHEN sign-up is submitted with different password and confirmation values
- THEN submission is not delegated and the confirmation field reports the mismatch.

## Technical Options

### Option 1: Copy-Owned Reference Source

- Summary: keep canonical TypeScript, CSS Modules, stories, and tests here; consumers copy and own selected files.
- Implementation complexity: moderate and bounded.
- Reversibility: high.
- Testability: direct component and Storybook testing.
- Operational risk: copied implementations can drift, but application releases remain independent.
- Fit with project conventions: exact.

### Option 2: Shared Runtime Component Package

- Summary: publish components for applications to import.
- Implementation complexity: higher due to versioning, peer dependencies, releases, and coordinated migrations.
- Reversibility: lower once applications depend on it.
- Testability: strong centrally, but integration compatibility becomes a package concern.
- Operational risk: foundation changes can block or couple unrelated applications.
- Fit with project conventions: conflicts with the chosen adoption model.

## Selected Approach

Use copy-owned reference source. Reorganize the CSS baseline under clear responsibilities while retaining compatibility exports where practical. Add native-control React primitives first because they need no headless dependency. Components use semantic props and CSS Modules, colocate Storybook stories and Vitest tests, and consume only the canonical semantic tokens. AuthenticationForm composes these primitives and owns only local presentation and validation behavior.

## Experience Design

- Applicability: required, direction already confirmed.
- Confirmed direction: dark-mode-first, clean and modern, minimal borders, no shadows, small radii, restrained motion, and semantic action roles.
- User confirmation: confirmed throughout the 2026-07-17 planning conversation.
- Reference artifacts: `spaces/shared/visual-style-guide.md`, `spaces/shared/DESIGN.md`, and the existing Foundations Storybook.

### Component And State Contract

- Components expose semantic variants, sizes, pending, disabled, invalid, label, supporting text, and error state as appropriate.
- `className` permits bounded app-specific extension; low-level color, radius, and shadow props are excluded.
- AuthenticationForm has sign-in and sign-up modes and delegates valid submissions through a callback.

### Accessibility And Interaction

- Native controls retain native semantics.
- IconButton requires an accessible label.
- Pending actions expose busy state and prevent duplicate activation.
- Fields use stable IDs and accessible descriptions for supporting and error text.
- Sign-up always displays and validates Confirm password when creating a password.

### Visual Direction

- Use shared tokens, spacing, controls, and radii.
- Filled action-blue controls use white foreground by default.
- Borders appear only where controls need an explicit boundary.

### Open Design Questions

- None blocking this slice.

## Client And API Boundary

- Current clients: React web applications copying selected references.
- Plausible future clients: additional React web surfaces; native clients may reuse intent but not source.
- Reusable product capabilities: visual and interaction contracts only.
- API or typed contract: exported TypeScript component props.
- OpenAPI plan, if HTTP-facing: not applicable.
- Backend platform exposed directly to clients?: no backend is introduced.
- Client-specific presentation or local state: remains application-owned.
- Rationale: UI Foundations accelerates client work without absorbing application behavior.

## Alternatives Considered

- Shared package imports: rejected because release coupling conflicts with copy ownership.
- CSS-only documentation: rejected because it leaves React semantics, accessibility, and state behavior to repeated reinvention.
- Empty catalog scaffolding: rejected because placeholders provide no verified reference value.

## Why This Approach

It creates executable consistency while preserving the independence and visual flexibility of each application. Native-first controls keep the initial dependency surface small; Base UI can be introduced deliberately when later primitives require robust headless behavior.

## ADRs

- Required: yes.
- ADR path: `docs/adrs/2026-07-17-copy-owned-reference-components.md`
- Decision summary: UI Foundations owns canonical executable references; applications copy and own adopted source instead of importing a runtime package.
- Reconsider when: multiple applications repeatedly require synchronized fixes or one stable API has been proven by at least two consumers.

## Implementation Constraints

- Preserve the existing comparison-hub functionality.
- Avoid utility classes and project-specific `primary` or `accent` tokens.
- Do not add Base UI until a selected component actually requires it.
- Keep runtime code free of application services, routing, persistence, and auth providers.

## Verification Strategy

- Focused automated tests: Vitest and Testing Library assertions for component semantics, pending behavior, field descriptions, and authentication validation.
- Broad supporting gates: CSS contract checker, TypeScript, test suite, and Storybook production build.
- Deterministic E2E: not required for this bounded reference slice.
- Manual UI confirmation: inspect the reference stories at desktop and narrow widths.
- Storybook accessibility: addon configured to report errors for rendered stories.

## Decisions

- Concise semantic color names and category-prefixed scales are canonical.
- CSS and React references are copy-owned, not runtime-shared.
- TypeScript, CSS Modules, native-first semantics, and Base UI when necessary are the component defaults.

## Risks / Trade-Offs

- Copies can drift; Storybook comparison and explicit adoption reviews are the mitigation.
- A reference API may prove premature; the pre-release status and bounded first slice preserve reversibility.
