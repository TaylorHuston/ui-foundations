---
schema: sdd-epic-v2
id: UIF-002
status: active
created: 2026-07-22
modified: 2026-07-24
last_verified: 2026-07-24
stories:
  - S1
  - S2
  - S3
  - S4
---

# UIF-002 Library Distribution And Overrides

## Product Context

- Related docs: `README.md`, `CHANGELOG.md`
- Related ADRs: `docs/adrs/2026-07-22-use-versioned-runtime-library-with-app-wrappers.md`, `docs/adrs/2026-07-23-distribute-pre-registry-releases-as-verified-archives.md`

UI Foundations owns executable styles, tested React components, compositional patterns, and a versioned package contract. Consumers can import those foundations while preserving each application's product identity, domain behavior, and release independence.

## Outcome

UI Foundations provides a versioned React package that applications can install, import, and override through documented semantic contracts. Applications consume it behind app-owned wrappers and continue to own product behavior, data, routing, persistence, and deliberate divergence.

## Current Scope

- A compiled, typed, ESM-first package for the existing UIF-001 styles, components, and patterns.
- Explicit public entry points for React APIs and opt-in CSS layers.
- A supported override contract based on semantic custom properties, root classes and styles, stable named slots, and app-owned wrapper components.
- Package-content, clean-consumer, public-contract, compatibility, and release-candidate verification.
- Versioning, release communication, and a pre-registry archive handoff contract sufficient for applications to upgrade deliberately.

## Deferred Scope

- Migrating 49th Floor, Anthracite, Lorecraft, or another application to the package; each consumer owns a separate Change.
- Product data, routing, authorization, persistence, editor engines, responsive navigation state, or other application behavior.
- React Native, non-React component implementations, server-rendering framework adapters, or a Tailwind integration.
- Automatic cross-application upgrades, codemods, synchronization daemons, or forced visual convergence.
- A compatibility promise beyond the documented pre-1.0 versioning policy.

## Candidate Stories

None. The former `consumer-migration-guide` candidate is now `S4`.

## Story Index

| Story | Implementation | Verification | Capability | Last Verified | Notes |
|---|---|---|---|---|---|
| S1 | implemented | verified | Install and import the versioned library. | 2026-07-22 | Exact packed-artifact verification; public registry publication remains separately authorized. |
| S2 | implemented | verified | Override foundations without patching package internals. | 2026-07-22 | App-owned wrappers are the required consumer seam. |
| S3 | implemented | verified | Inspect, version, and upgrade a release candidate. | 2026-07-24 | Registry publication and remote release creation remain separately authorized. |
| S4 | partial | partial | Adopt the library in an existing application. | 2026-07-24 | Local candidate identity and later remote-asset proof are ready; real-consumer evidence remains pending. |

## Stories

### Story S1: Install And Import The Versioned Library

Implementation: implemented
Verification: verified
Created: 2026-07-22
Modified: 2026-07-22
Last verified: 2026-07-22

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
| S1/R1 | `scripts/build-library.mjs#buildJavaScript` | primary | Build the compiled ESM entry points. |
| S1/R1 | `scripts/build-library.mjs#buildDeclarations`; `tsconfig.build.json#compilerOptions` | support | Generate public TypeScript declarations. |
| S1/R1 | `package.json#exports` | configuration | Define the explicit public export map. |
| S1/R1 | `src/index.ts#export`; `src/components/index.ts#export`; `src/patterns/index.ts#export`; `src/theme-profiles.ts#themeProfiles` | primary | Define the supported root and subpath JavaScript/type surfaces. |
| S1/R2 | `scripts/build-library.mjs#external` | primary | Keep React and all package runtime imports external to the bundle. |
| S1/R2 | `package.json#peerDependencies`; `package.json#dependencies` | configuration | Keep React consumer-owned while declaring every other exported runtime dependency. |
| S1/R3 | `scripts/build-library.mjs#buildStyles` | primary | Build the complete foundation and supported opt-in CSS layers. |
| S1/R3 | `package.json#exports` | configuration | Expose documented stylesheet entry points without source imports. |

#### Implementation Gaps

None.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S1/R1-S1 | Automated test `test/package-contract.node.mjs#verifies the exact packed package contract in an isolated consumer` | The exact archive contains the declared JS, type, style, and metadata surface and installs, typechecks, and production-builds in a fresh non-symlink consumer. | Passing 2026-07-22 |
| S1/R1-S2 | Automated test `test/package-contract.node.mjs#verifies the exact packed package contract in an isolated consumer` | An undeclared `src/components` import fails with `ERR_PACKAGE_PATH_NOT_EXPORTED`. | Passing 2026-07-22 |
| S1/R2-S1 | Automated test `test/package-contract.node.mjs#verifies the exact packed package contract in an isolated consumer` | The consumer dependency tree contains one React and React DOM version, manifest ownership remains correct, and distributed runtime imports remain external. | Passing 2026-07-22 |
| S1/R3-S1 | Automated test `test/package-contract.node.mjs#verifies the exact packed package contract in an isolated consumer` | Complete and lower-level CSS entry points exist in the archive and resolve in a clean production build. | Passing 2026-07-22 |

#### Verification Gaps

None.

#### Story Notes

- The working public package name is `@taylorhuston/ui-foundations`; registry ownership and authentication must be confirmed before the first publish.
- The unscoped `ui-foundations` name is already occupied in the public npm registry.

### Story S2: Override Foundations Without Patching Internals

Implementation: implemented
Verification: verified
Created: 2026-07-22
Modified: 2026-07-22
Last verified: 2026-07-22

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
| S2/R1 | `src/styles/tokens.css#:root` | primary | Define semantic theme values that consumers can override after loading defaults. |
| S2/R1 | `docs/library-adoption.md#Override Product Identity` | support | Document scoped identity overrides and stable semantic meaning. |
| S2/R2 | `src/components/types.ts#FoundationStyle` | primary | Type root style objects, including semantic custom properties. |
| S2/R2-S1 | `src/components/Button/Button.tsx#Button`; `src/components/Checkbox/Checkbox.tsx#Checkbox`; `src/components/IconButton/IconButton.tsx#IconButton`; `src/components/InlineNotice/InlineNotice.tsx#InlineNotice`; `src/components/OperationStatus/OperationStatus.tsx#OperationStatus`; `src/components/SegmentedControl/SegmentedControl.tsx#SegmentedControl`; `src/components/Switch/Switch.tsx#Switch`; `src/components/Tabs/Tabs.tsx#Tabs`; `src/components/TextField/TextField.tsx#TextField`; `src/components/Textarea/Textarea.tsx#Textarea`; `src/components/TreeView/TreeView.tsx#TreeView` | primary | Expose typed root styling props and stable named slots across public controls and feedback components. |
| S2/R2-S1 | `src/patterns/AuthenticationForm/AuthenticationForm.tsx#AuthenticationForm`; `src/patterns/ConfirmationDialog/ConfirmationDialog.tsx#ConfirmationDialog`; `src/patterns/DocumentHeader/DocumentHeader.tsx#DocumentHeader`; `src/patterns/EditorSurface/EditorSurface.tsx#EditorSurface`; `src/patterns/EditorToolbar/EditorToolbar.tsx#EditorToolbar`; `src/patterns/EmptyState/EmptyState.tsx#EmptyState`; `src/patterns/FileBrowser/FileBrowser.tsx#FileBrowser`; `src/patterns/NavigationRail/NavigationRail.tsx#NavigationRail`; `src/patterns/ThreePaneShell/ThreePaneShell.tsx#ThreePaneShell`; `src/patterns/WorkbenchShell/WorkbenchShell.tsx#WorkbenchShell` | primary | Expose typed root styling props and stable named slots across public patterns. |
| S2/R2-S2 | `src/components/Dialog/Dialog.tsx#Dialog`; `src/components/Sheet/Sheet.tsx#Sheet`; `src/components/Menu/Menu.tsx#Menu`; `src/components/Tooltip/Tooltip.tsx#Tooltip` | primary | Expose portal and surface class/style hooks plus stable overlay slots. |
| S2/R2-S2 | `src/components/Dialog/Dialog.module.css#portal`; `src/components/Sheet/Sheet.module.css#portal`; `src/components/Menu/Menu.module.css#portal`; `src/components/Tooltip/Tooltip.module.css#portal` | support | Carry inherited custom properties through portal hosts and expose supported surface geometry variables. |
| S2/R3 | `docs/library-adoption.md#App-Owned Wrappers` | primary | Define local defaults, product ownership, and deliberate replacement at the application wrapper boundary. |
| S2/R3 | `test/fixtures/package-consumer/src/main.tsx#AppButton` | support | Compile a representative app-owned wrapper against only the packed public API. |
| S2/R1-R3 | `stories/LibraryOverrides.stories.tsx#DefaultAndProductIdentity`; `stories/LibraryOverrides.stories.module.css#.page` | support | Provide inspectable default and application-owned identity, wrapper, workbench, and portal states. |

#### Implementation Gaps

None.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S2/R1-S1, S2/R1-S2 | Browser inspection of `Foundations/Library Overrides` at `1440x900` and `390x844` | Foundation defaults remain intact while a scoped Juniper identity changes only documented action, accent, field, and notice regions without overflow. | Passing 2026-07-22 |
| S2/R2-S1 | `src/components/override-contract.test.tsx#exposes stable root and named slot hooks without generated selectors`; `src/components/override-contract.test.tsx#preserves field control props while exposing a separate field root hook` | Root classes, typed custom properties, control props, and named slots reach intended public regions. | Passing 2026-07-22 |
| S2/R2-S1 | `src/patterns/workbench-patterns.test.tsx#applies public root styles and stable named slots across workbench patterns` | Workbench, editor, file-browser, and empty-state roots and slots accept app-owned overrides. | Passing 2026-07-22 |
| S2/R2-S2 | `src/components/override-contract.test.tsx#reaches every portaled overlay surface through explicit public hooks` | Dialog, Sheet, Menu, and Tooltip portal/surface hooks render on the portaled DOM. | Passing 2026-07-22 |
| S2/R3-S1, S2/R3-S2 | `src/components/override-contract.test.tsx#keeps product defaults and deliberate replacement behind an app-owned wrapper` | Product defaults remain local and the wrapper can swap to a local implementation without changing feature use or package source. | Passing 2026-07-22 |

#### Verification Gaps

None.

#### Story Notes

- Supported overrides are an explicit contract, not permission to depend on generated class names, arbitrary descendant structure, or `!important` escalation.
- The wrapper boundary preserves independent consumer releases even though shared fixes arrive through dependency upgrades.

### Story S3: Prepare And Upgrade A Library Release

Implementation: implemented
Verification: verified
Created: 2026-07-22
Modified: 2026-07-24
Last verified: 2026-07-24

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
| S3/R1 | `scripts/verify-package.mjs#requiredFiles` | primary | Inspect the exact archive, reject private paths, install it in a clean consumer, and fail on missing contract artifacts. |
| S3/R1 | `package.json#check:package` | configuration | Bind a clean library build and exact archive verification into one deterministic candidate command. |
| S3/R2 | `docs/library-adoption.md#Compatibility` | primary | Define pre-1.0 compatibility and deliberate consumer upgrade policy. |
| S3/R2 | `CHANGELOG.md#Unreleased` | support | Record consumer-visible package, dependency, hook, and adoption changes. |
| S3/R3 | `package.json#private` | primary | Block registry publication while implementation and scope/auth/release authority remain separate. |
| S3/R3 | `scripts/verify-package.mjs#installedManifest` | support | Fail the release-candidate gate if the publication guard is removed prematurely. |

#### Implementation Gaps

None.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S3/R1-S1 | Automated test `test/package-contract.node.mjs#verifies the exact packed package contract in an isolated consumer` | A fresh candidate reports the intended files, resolves every public surface in a clean consumer, and rejects private repository paths. | Passing 2026-07-22 |
| S3/R1-S2 | Automated test `test/package-contract.node.mjs#rejects a packed artifact with a missing exported target` | The candidate gate fails when an exported target is absent and passes only after the public contract is complete. | Passing 2026-07-22 |
| S3/R2-S1 | `CHANGELOG.md#Unreleased`; `docs/library-adoption.md#Compatibility` | Consumer-visible changes, pre-1.0 compatibility, and deliberate upgrade ownership are explicit. | Passing 2026-07-22 |
| S3/R3-S1 | Automated test `test/package-contract.node.mjs#verifies the exact packed package contract in an isolated consumer` | The exact local candidate retains `private: true`; no registry publication occurred or can occur through the ordinary Apply command. | Passing 2026-07-24 |

#### Verification Gaps

None.

#### Story Notes

- `npm pack --dry-run --json` is the archive-content baseline; actual tag, release, asset-upload, and registry publication actions are not authorized by `/sdd-apply` or by this Change plan.

### Story S4: Adopt The Library In An Existing Application

Implementation: partial
Verification: partial
Created: 2026-07-23
Modified: 2026-07-24
Last verified: 2026-07-24

As an application maintainer, I want a repeatable migration path into UI Foundations, so that I can inherit shared interface behavior without losing my application's identity, product behavior, or release independence.

#### Requirements And Scenarios

##### Requirement R1: Classify The Existing Application Surface

The system SHALL provide an adoption process that classifies each materially affected component or pattern before replacement and keeps application-specific behavior with the consuming application.

###### Scenario R1-S1: Map A Supported Surface

- WHEN a maintainer inventories an existing application's controls, patterns, state ownership, responsive behavior, and styling
- THEN each material surface is classified as an existing application component, adopted reference, application-specific component, reference candidate, or deliberate divergence
- AND adopted surfaces identify the documented package export and app-owned wrapper boundary they will use.

###### Scenario R1-S2: Preserve A Stronger Application Contract

- WHEN a Foundation component or pattern is less capable than the application's accepted behavior
- THEN the application keeps or replaces the implementation locally without private package imports or patches
- AND the migration records the deliberate divergence instead of weakening product behavior for visual uniformity.

##### Requirement R2: Acquire A Portable Pinned Package

The system SHALL provide a pre-registry package archive whose exact verified bytes can be installed from a versioned release location without repository source access.

###### Scenario R2-S1: Install The Verified Release Asset

- WHEN an application installs the documented GitHub Release archive URL
- THEN its package manager resolves the same public exports, declarations, CSS, and runtime dependency contract as the verified candidate
- AND the committed lockfile records integrity so the application remains on those bytes until a deliberate upgrade.

###### Scenario R2-S2: Reject Missing Or Changed Distribution

- WHEN the release asset is unavailable, its bytes change, or a consumer attempts an undeclared source import
- THEN installation or contract verification fails before the application build is accepted
- AND no mutable branch, workspace link, or source-build fallback silently substitutes another package.

##### Requirement R3: Preserve Application Ownership Through Migration

The system SHALL guide applications to import supported surfaces behind local wrappers and customize them only through documented semantic, slot, portal, and composition contracts.

###### Scenario R3-S1: Apply Local Identity And Defaults

- WHEN a consuming application loads Foundation CSS and then applies its semantic identity and wrapper defaults
- THEN default and portaled components use the application's intended identity without generated selectors or product configuration entering the package
- AND feature code depends on the local boundary that can later replace the shared implementation.

###### Scenario R3-S2: Keep Product State In The Application

- WHEN an adopted component participates in routing, data, authorization, persistence, editing, asynchronous recovery, or responsive navigation
- THEN the consuming application continues to own those decisions and passes only presentational state or callbacks through its wrapper or composition
- AND the package does not become the only implementation of a product rule.

##### Requirement R4: Prove And Record Consumer Parity

The system SHALL require focused, aggregate, rendered, and application-owned evidence proportional to migrated surfaces before the consumer is presented as a reusable example.

###### Scenario R4-S1: Complete A Real Consumer Migration

- WHEN an application finishes a migration slice
- THEN its behavior, accessibility, responsive, production-build, dependency, and visual checks show that accepted user paths remain intact
- AND the reusable guide records only broadly applicable lessons with an immutable public consumer reference.

###### Scenario R4-S2: Upgrade Deliberately

- WHEN a consumer considers a later Foundation version
- THEN it reviews release notes and reruns the affected package, behavior, accessibility, responsive, production-build, and rendered checks before changing the pin
- AND no Foundation release updates the application automatically.

#### Implemented By

| Requirement / Scenario | Location / Anchor | Kind | Responsibility |
|---|---|---|---|
| S4/R2 | `scripts/verify-package.mjs#archiveSha256` | primary | Retain one checked archive on request and report its filename, npm integrity, and SHA-256 identity. |
| S4/R2 | `scripts/verify-release-asset.mjs#candidateSha256` | primary | Compare a later HTTPS release asset byte-for-byte with the retained candidate, install its URL in a clean consumer, and require lockfile integrity. |
| S4/R2 | `docs/library-adoption.md#Pre-Registry Release Archives` | support | Document the archive-only consumer contract without claiming an available release asset. |

#### Implementation Gaps

- `S4/R1-S1`, `S4/R1-S2`, `S4/R2-S1`, `S4/R3-S1`, `S4/R3-S2`, `S4/R4-S1`, and `S4/R4-S2`: Anthracite's coordinated adoption and immutable consumer evidence are pending.
- `S4/R2-S2`: remote asset availability and byte-drift rejection cannot be exercised until an explicitly authorized GitHub Release asset exists.

#### Verified By

| Requirement / Scenario | Evidence | Proves | Status |
|---|---|---|---|
| S4/R2 candidate preparation | Automated test `test/package-contract.node.mjs#retains and identifies an exact release-candidate archive on request` | A package archive that passed the existing isolated-consumer contract can be retained with its filename, npm SHA-512 integrity, and SHA-256 checksum. | Passing 2026-07-24 |
| S4/R2 release-proof guard | Automated test `test/package-contract.node.mjs#requires explicit candidate and HTTPS release asset inputs` | Remote-asset proof cannot silently fall back to a local path or an insecure/unconfigured source. | Passing 2026-07-24 |

#### Verification Gaps

- `S4/R2-S1`, `S4/R2-S2`: no GitHub Release asset exists yet, so byte-identity, URL installation, and lockfile-integrity proof remain blocked on separate authorization.
- `S4/R1-S1`, `S4/R1-S2`, `S4/R3-S1`, `S4/R3-S2`, `S4/R4-S1`, and `S4/R4-S2`: final Anthracite implementation and independent review evidence are pending.

#### Story Notes

- The current phase establishes only the pre-registry archive contract. It does not present Anthracite or another application as a completed consumer.

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

- The public repository remains useful as inspectable source; package import behind app-owned wrappers is the primary shared-consumption model, while copying remains available for deliberate divergence.
