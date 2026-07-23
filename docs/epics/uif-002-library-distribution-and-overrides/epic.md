---
schema: sdd-epic-v2
id: UIF-002
status: draft
created: 2026-07-22
modified: 2026-07-22
last_verified:
stories:
  - S1
  - S2
  - S3
---

# UIF-002 Library Distribution And Overrides

## Product Context

- Related docs: `README.md`, `CHANGELOG.md`
- Related ADRs: `docs/adrs/2026-07-22-use-versioned-runtime-library-with-app-wrappers.md`

UI Foundations already owns executable styles, tested React components, and compositional patterns, but consumers currently have to copy source and manually carry fixes forward. This capability makes those foundations installable while preserving each application's product identity, domain behavior, and release independence.

## Outcome

UI Foundations will provide a versioned React package that applications can install, import, and override through documented semantic contracts. Applications will consume it behind app-owned wrappers and will continue to own product behavior, data, routing, persistence, and deliberate divergence.

## Current Scope

- A compiled, typed, ESM-first package for the existing UIF-001 styles, components, and patterns.
- Explicit public entry points for React APIs and opt-in CSS layers.
- A supported override contract based on semantic custom properties, root classes and styles, stable named slots, and app-owned wrapper components.
- Package-content, clean-consumer, public-contract, compatibility, and release-candidate verification.
- Versioning and release communication sufficient for applications to upgrade deliberately.

## Deferred Scope

- Migrating 49th Floor, Anthracite, Lorecraft, or another application to the package; each consumer owns a separate Change.
- Product data, routing, authorization, persistence, editor engines, responsive navigation state, or other application behavior.
- React Native, non-React component implementations, server-rendering framework adapters, or a Tailwind integration.
- Automatic cross-application upgrades, codemods, synchronization daemons, or forced visual convergence.
- A compatibility promise beyond the documented pre-1.0 versioning policy.

## Candidate Stories

| Candidate | Status | Story Shape | Acceptance Signals |
|---|---|---|---|
| `consumer-migration-guide` | deferred | As an application maintainer, I want a repeatable migration guide, so that copied components can be replaced incrementally. | At least one real consumer completes a separate package-adoption Change and exposes broadly reusable migration steps. |

## Story Index

| Story | Implementation | Verification | Capability | Last Verified | Notes |
|---|---|---|---|---|---|
| S1 | not implemented | unverified | Install and import the versioned library. |  | Public registry publication remains a separately authorized release action. |
| S2 | not implemented | unverified | Override foundations without patching package internals. |  | App-owned wrappers are the required consumer seam. |
| S3 | not implemented | unverified | Inspect, version, and upgrade a release candidate. |  | Pre-1.0 compatibility changes require explicit release communication. |

## Stories

### Story S1: Install And Import The Versioned Library

Implementation: not implemented
Verification: unverified
Created: 2026-07-22
Modified: 2026-07-22
Last verified:

As an application developer, I want to install and import UI Foundations as a versioned dependency, so that I can use its tested defaults without copying repository source.

#### Requirements And Scenarios

##### Requirement R1: Consumable Package Artifact

The system SHALL produce a package artifact containing compiled JavaScript, TypeScript declarations, documented CSS entry points, and package metadata that resolve without access to the UI Foundations repository.

###### Scenario R1-S1: Build A Clean Consumer

- WHEN a clean supported React consumer installs the packed release candidate
- THEN it can import documented styles, components, and patterns
- AND its typecheck and production build resolve only published package contents.

###### Scenario R1-S2: Reject Private Imports

- WHEN a consumer attempts to import an undeclared internal source path
- THEN the package export contract does not expose that path as a supported API.

##### Requirement R2: Runtime Dependency Contract

The system SHALL use the consuming application's compatible React runtime while declaring every other package required by exported runtime code.

###### Scenario R2-S1: Use One React Runtime

- WHEN a supported React application installs and renders a Foundation component
- THEN the package uses the consumer's React peer dependency
- AND the distributed JavaScript does not embed a second React runtime.

##### Requirement R3: Explicit Style Layers

The system SHALL expose documented opt-in CSS entry points for the complete foundation and for supported lower-level style layers without requiring source-file imports.

###### Scenario R3-S1: Import Foundation Styles

- WHEN a consumer imports a documented CSS entry point
- THEN the corresponding tokens, global baseline, primitive recipes, and packaged component styles are available according to that entry point's contract.

#### Implemented By

| Requirement / Scenario | Location / Anchor | Kind | Responsibility |
|---|---|---|---|
| S1/R1 | Not implemented yet. | primary | Package build, manifest exports, and generated declarations after implementation. |
| S1/R2 | Not implemented yet. | configuration | Peer and runtime dependency ownership after implementation. |
| S1/R3 | Not implemented yet. | presentation | Published CSS-layer contract after implementation. |

#### Implementation Gaps

- `S1/R1`: Not implemented yet.
- `S1/R2`: Not implemented yet.
- `S1/R3`: Not implemented yet.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|

#### Verification Gaps

- `S1/R1-S1`: Not verified yet.
- `S1/R1-S2`: Not verified yet.
- `S1/R2-S1`: Not verified yet.
- `S1/R3-S1`: Not verified yet.

#### Story Notes

- The working public package name is `@taylorhuston/ui-foundations`; registry ownership and authentication must be confirmed before the first publish.
- The unscoped `ui-foundations` name is already occupied in the public npm registry.

### Story S2: Override Foundations Without Patching Internals

Implementation: not implemented
Verification: unverified
Created: 2026-07-22
Modified: 2026-07-22
Last verified:

As an application developer, I want supported override seams around imported foundations, so that my application can retain its identity and product-specific behavior without forking the package.

#### Requirements And Scenarios

##### Requirement R1: Semantic Theme Overrides

The system SHALL allow consumers to replace documented semantic token and component custom-property values after loading Foundation defaults.

###### Scenario R1-S1: Apply An Application Identity

- WHEN an application defines supported semantic values after the Foundation CSS
- THEN imported components and patterns consume the application values without structural source changes.

###### Scenario R1-S2: Retain Safe Defaults

- WHEN an application supplies no overrides
- THEN imported components retain the documented default theme, state contrast, focus treatment, and reduced-motion behavior.

##### Requirement R2: Stable Component Styling Hooks

The system SHALL expose documented root styling props and stable named slots for materially styled component regions, including portaled overlay surfaces, without exposing generated CSS Module names as public API.

###### Scenario R2-S1: Style A Component And Its Slots

- WHEN an app-owned wrapper supplies a supported root class, inline custom properties, or a scoped named-slot rule
- THEN the intended public region changes while semantic state and keyboard behavior remain intact.

###### Scenario R2-S2: Style A Portaled Surface

- WHEN an app-owned wrapper customizes a Dialog, Sheet, Menu, or Tooltip surface
- THEN a documented portal-safe hook reaches that public surface without depending on package-private selectors.

##### Requirement R3: Application-Owned Wrapper Boundary

The system SHALL document and support thin application wrappers as the boundary for local defaults, content, callbacks, and deliberate component replacement.

###### Scenario R3-S1: Add Product Defaults Locally

- WHEN an application wraps an imported component to supply local defaults or composition
- THEN feature code can import the application wrapper while data, routing, authorization, persistence, and domain state remain application-owned.

###### Scenario R3-S2: Diverge Deliberately

- WHEN a shared component no longer fits an application's behavior
- THEN the application can replace that wrapper with local implementation without patching package files or changing unrelated feature imports.

#### Implemented By

| Requirement / Scenario | Location / Anchor | Kind | Responsibility |
|---|---|---|---|
| S2/R1 | Not implemented yet. | primary | Documented semantic token and custom-property override contract after implementation. |
| S2/R2 | Not implemented yet. | primary | Root and named-slot hook contract across component and portal surfaces after implementation. |
| S2/R3 | Not implemented yet. | support | Consumer wrapper guidance and representative package-consumer fixture after implementation. |

#### Implementation Gaps

- `S2/R1`: Not implemented yet.
- `S2/R2`: Not implemented yet.
- `S2/R3`: Not implemented yet.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|

#### Verification Gaps

- `S2/R1-S1`: Not verified yet.
- `S2/R1-S2`: Not verified yet.
- `S2/R2-S1`: Not verified yet.
- `S2/R2-S2`: Not verified yet.
- `S2/R3-S1`: Not verified yet.
- `S2/R3-S2`: Not verified yet.

#### Story Notes

- Supported overrides are an explicit contract, not permission to depend on generated class names, arbitrary descendant structure, or `!important` escalation.
- The wrapper boundary preserves independent consumer releases even though shared fixes arrive through dependency upgrades.

### Story S3: Prepare And Upgrade A Library Release

Implementation: not implemented
Verification: unverified
Created: 2026-07-22
Modified: 2026-07-22
Last verified:

As a library maintainer, I want an inspectable and versioned release contract, so that consuming applications can choose when and how to upgrade.

#### Requirements And Scenarios

##### Requirement R1: Inspectable Release Candidate

The system SHALL provide a deterministic release-candidate check that reports the package files, public exports, declarations, dependency contract, and clean-consumer result before publication.

###### Scenario R1-S1: Inspect The Packed Contents

- WHEN the maintainer creates a dry-run package archive from an exact commit
- THEN the reported contents include only intended public distribution artifacts and required package documentation
- AND each declared public export resolves from that archive.

###### Scenario R1-S2: Detect A Broken Package Contract

- WHEN an export, declaration, stylesheet, or runtime dependency is missing from the archive
- THEN the release-candidate check fails before publication.

##### Requirement R2: Versioned Compatibility Communication

The system SHALL version and document consumer-visible API, styling-hook, token, dependency, and migration changes according to the declared pre-1.0 compatibility policy.

###### Scenario R2-S1: Describe An Upgrade

- WHEN a release changes a consumer-visible contract
- THEN the changelog identifies the affected public surface and any required consumer action
- AND consuming applications remain on their installed version until they deliberately upgrade.

##### Requirement R3: Guarded Public Publication

The system SHALL keep public registry publication separate from ordinary implementation and require an authenticated, explicitly authorized release action against the verified candidate.

###### Scenario R3-S1: Stop Without Publication Authority

- WHEN registry ownership, authentication, explicit publication authorization, or candidate verification is absent
- THEN implementation may produce a local package candidate but does not publish it.

#### Implemented By

| Requirement / Scenario | Location / Anchor | Kind | Responsibility |
|---|---|---|---|
| S3/R1 | Not implemented yet. | primary | Package archive inspection and clean-consumer release gate after implementation. |
| S3/R2 | Not implemented yet. | primary | Version and changelog compatibility policy after implementation. |
| S3/R3 | Not implemented yet. | configuration | Guarded publication workflow and repository release guidance after implementation. |

#### Implementation Gaps

- `S3/R1`: Not implemented yet.
- `S3/R2`: Not implemented yet.
- `S3/R3`: Not implemented yet.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|

#### Verification Gaps

- `S3/R1-S1`: Not verified yet.
- `S3/R1-S2`: Not verified yet.
- `S3/R2-S1`: Not verified yet.
- `S3/R3-S1`: Not verified yet.

#### Story Notes

- `npm pack --dry-run --json` is the planned archive-content baseline; actual publication is not authorized by `/sdd-apply` or by this Change plan.

## Cross-Story Concerns

- UIF-001 remains authoritative for the behavior and visual contract of the exported styles, components, and patterns.
- React and React DOM are consumer-owned peer dependencies; Base UI and any icon dependency used directly by exported implementation must be declared as package runtime dependencies or removed from the public runtime path.
- The package must not rely on source-path transpilation, generated CSS Module names, workspace symlinks, or private vault context.
- Public entry points, styling slots, CSS variables, peer ranges, and release communication become compatibility surfaces.
- App-owned wrappers prevent the runtime dependency from becoming application architecture or product identity authority.

## Open Decisions

- Confirm ownership of the `@taylorhuston` npm scope before first publication; if unavailable, only the package name and documented import examples should change.

## Completion Criteria

This Epic is healthy when:

- Embedded Stories cover install/import, override/wrapper, and release/upgrade paths.
- Requirements and Scenarios match implemented behavior or intentional gaps.
- Story implementation and verification state match the Story Index and their respective gap sections.
- `Implemented By` maps every implemented Requirement to a concrete repository-relative location and stable code anchor.
- Each Story has only one current `Implemented By` map and one current `Verified By` map; historical detail is consolidated or moved to notes.
- Primary anchors identify the behavior-owning definition, registration, or configuration, and distinct governing boundaries use narrower Requirement/Scenario rows.
- `Implementation Gaps` names accepted behavior that does not exist yet.
- `Verified By` maps concrete evidence to Requirements/Scenarios with exact test titles or stable anchors.
- The packed artifact installs and builds in an isolated supported consumer without repository-source access.
- Override evidence covers default and custom identity values, a normal component, a workbench pattern, and a portaled overlay.
- Release guidance keeps publication guarded and app upgrades deliberate.
- Related Changes, UIF-001, ADRs, README, package metadata, and release communication do not contradict this Epic.

## Notes

- The existing public repository remains useful as inspectable source, but package import becomes the primary shared-consumption model once the new ADR is accepted and UIF-002 is implemented.
