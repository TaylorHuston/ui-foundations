# Design: Codify The Consumer Adoption Pattern

## Context

UIF-002/S1-S3 currently proves explicit package exports, React peer ownership, declared runtime dependencies, opt-in CSS, supported override seams, app-owned wrappers, exact local archive inspection, isolated consumer installation, and guarded publication. `docs/library-adoption.md` explains installation from a local `npm pack` path and the public customization contract. The package remains `private: true`, registry publication is inactive, `dist` is ignored, no Git tag or GitHub Release exists, and the fixture is not a real application migration.

AnthraciteMD is a compatible React 19/Vite 8 application with substantial UI and state. It already uses closely related semantic tokens and workbench geometry but has local controls, overlays, tree behavior, shell structure, editor chrome, and global CSS. Its migration can prove where direct adoption works, where wrappers need product defaults, and where generic patterns must yield to stronger application behavior.

The two Changes are coordinated but retain ownership. UI Foundations prepares and verifies the distributable archive contract and owns reusable documentation/Epic truth. Anthracite owns its dependency, wrappers, product migrations, application tests, and release. This Change remains open until final Anthracite evidence can be inspected and distilled without copying private planning or product-specific implementation into generic guidance.

## Goals / Non-Goals

**Goals:**

- Provide one portable pre-registry package source identical to the archive already covered by package-contract verification.
- Give maintainers a repeatable migration decision process, not a mechanical replace-all recipe.
- Make app-owned wrappers, identity overrides, deliberate divergence, parity evidence, and pinned upgrades concrete through real consumer evidence.
- Promote UIF-002's migration-guide candidate into durable Story truth with observable archive, migration, and evidence behavior.
- Identify missing package seams or component corrections only when Anthracite demonstrates broad value.
- Keep future apps independently releasable and free to reject unsuitable package surfaces.

**Non-Goals:**

- Implement Anthracite code in this repository or make Anthracite's product components part of the package.
- Publish to npm, migrate another app, automate upgrades, generate codemods, or mandate UI Foundations for every platform.
- Track `dist` in Git, build package source during consumer installation, or instruct consumers to use local paths/workspace links.
- Redesign Foundation visuals or expand public APIs speculatively.
- Treat one consumer as proof that every component or pattern is stable for 1.0.

## Planning Interview / Story Refinement

- Scope boundary reviewed: pre-registry archive distribution, existing-app migration guide, first-consumer evidence, and only evidence-driven shared corrections.
- User decisions: codify the reusable pattern and use pinned GitHub/archive distribution for now.
- Assumptions: Anthracite's coordinated Change will preserve product behavior and expose enough exact evidence to support the guide.
- Deferred scope: registry, other migrations, automation, attestations, package splits, framework adapters, and non-web runtimes.
- Story boundaries challenged: one new S4 is warranted because adopting an existing application is an independently valuable developer path not predicted by install, override, or release preparation alone.
- Requirements refined: classify existing surfaces, install a portable exact archive, migrate behind wrappers without internals, preserve application behavior/identity, prove parity, and upgrade deliberately.
- Scenario gaps considered: unsuitable generic component, missing/replaced asset, mutable bytes, source-path fallback, package/API mismatch, CSS order, portal overrides, behavior regression, incomplete migration, and later upgrade.
- Open questions that block implementation: none; release authorization is an execution gate.

## Epic Changes

### Update Epic: UIF-002 Library Distribution And Overrides

- Target Epic: `docs/epics/uif-002-library-distribution-and-overrides/epic.md`
- Change Type: add S4 and refine S3 pre-registry release distribution.

#### Story Changes

- Added: `UIF-002/S4` Adopt The Library In An Existing Application.
- Modified: `UIF-002/S3` only where verified GitHub Release archive creation, immutable-version discipline, and remote-asset identity become current release behavior.
- Removed: deferred `consumer-migration-guide` candidate after promotion to S4.

#### Story S4: Adopt The Library In An Existing Application

Implementation: not implemented
Verification: unverified

As an application maintainer, I want a repeatable migration path into UI Foundations, so that I can inherit shared interface behavior without losing my application's identity, product behavior, or release independence.

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
- THEN the consuming application continues to own those decisions and passes only presentational state/callbacks through its wrapper or composition
- AND the package does not become the only implementation of a product rule.

##### Requirement R4: Prove And Record Consumer Parity

The system SHALL require focused, aggregate, rendered, and application-owned evidence proportional to the migrated surfaces before the consumer is presented as a reusable example.

###### Scenario R4-S1: Complete A Real Consumer Migration

- WHEN an application finishes a migration slice
- THEN its behavior, accessibility, responsive, production-build, dependency, and visual checks show that accepted user paths remain intact
- AND the reusable guide records only broadly applicable lessons with an immutable public consumer reference.

###### Scenario R4-S2: Upgrade Deliberately

- WHEN a consumer considers a later Foundation version
- THEN it reviews release notes and reruns the affected package, behavior, accessibility, responsive, production-build, and rendered checks before changing the pin
- AND no Foundation release updates the application automatically.

##### Implemented By

Not implemented yet.

##### Verified By

Not verified yet.

##### Verification Gaps

- `S4/R1-S1`, `S4/R1-S2`, `S4/R2-S1`, `S4/R2-S2`, `S4/R3-S1`, `S4/R3-S2`, `S4/R4-S1`, and `S4/R4-S2`: implementation and verification are pending.

#### Supersedes / Reconciles

- Remove the deferred candidate row only when S4 is added to the Story Index and embedded Stories.
- Reconcile S3 wording that currently treats local archive proof as sufficient for all pre-registry consumers; retain the separate-publication authority rule.
- Do not claim Anthracite evidence until its exact implementation and review candidate are available.

### Update Epic: UIF-001 Interface Foundations

- Target Epic: `docs/epics/uif-001-copyable-interface-foundations/epic.md`
- Change Type: conditional evidence-driven reconciliation only.

#### Story Changes

- Added: none.
- Modified: only Requirements, implementation ownership, or evidence genuinely changed by a broadly reusable correction discovered in Anthracite.
- Removed: none.

#### Supersedes / Reconciles

- Keep UIF-001 authoritative for component/pattern behavior and UIF-002 authoritative for package/adoption behavior.
- Do not add consumer chronology as component behavior truth.

## Epic File Rules

- Add S4 to UIF-002's frontmatter story list, Story Index, embedded Stories, Current Scope, Deferred Scope, cross-Story concerns, and completion criteria.
- Preserve one canonical implementation and verification map per Story.
- Keep all planned S4 maps explicitly not implemented/unverified until source and exact evidence exist.
- Map S3 archive/release ownership narrowly so remote release operations do not become component behavior.
- Update UIF-001 only from inspected broad-value changes and current proof.

## Technical Options

### Option 1: Exact GitHub Release Archive Plus Evidence-Driven Migration Guide

- Summary: attach the tested `npm pack` artifact to a versioned release, pin URL/integrity in consumers, and codify migration from Anthracite evidence.
- User impact: maintainers can adopt without npm publication or source builds while retaining local product ownership.
- Implementation complexity: moderate; release verification, docs, Epic truth, and cross-repository evidence must align.
- Reversibility: high; consumers can roll back pins or replace wrappers.
- Client surfaces: package consumers, Foundation docs/Storybook, and Anthracite as first real application.
- API / contract shape: existing public package exports plus archive URL/integrity and migration/evidence contract.
- Frontend/backend boundary: presentation package only; consumer backends remain untouched.
- Data / schema impact: none.
- Auth / security impact: supply-chain provenance/integrity and no-secret archive contents are relevant; no user auth change.
- Testability: strong through exact archive comparison, clean remote install, package checks, and consumer proof.
- Operational risk: release assets can be administratively replaced/deleted; integrity and version discipline must fail closed.
- Fit with project conventions: strongest.

### Option 2: Git Commit Dependencies With Consumer-Side Build

- Summary: add `prepare`, install from commit, and build ignored distribution during consumer installation.
- User impact: no release asset step, but slower/more fragile installs.
- Implementation complexity: moves development toolchain and source-build behavior into consumers.
- Reversibility: moderate.
- Client surfaces: every consumer install environment.
- API / contract shape: source repository/build scripts become operational API.
- Frontend/backend boundary: unchanged.
- Data / schema impact: none.
- Auth / security impact: larger install-script and dependency surface.
- Testability: differs from the exact packed-artifact path.
- Operational risk: non-reproducible builds from dependency ranges/toolchain differences.
- Fit with project conventions: poor.

### Option 3: Documentation-Only Guidance Using Local Archives

- Summary: expand the guide but keep `/tmp`-style local `npm pack` installation as the only pre-registry method.
- User impact: useful for experiments but not reproducible from a clean application checkout.
- Implementation complexity: low.
- Reversibility: high.
- Client surfaces: local development only.
- API / contract shape: no portable dependency source.
- Frontend/backend boundary: unchanged.
- Data / schema impact: none.
- Auth / security impact: provenance relies on local operator discipline.
- Testability: isolated fixture remains green while real repositories cannot install independently.
- Operational risk: application lockfiles or docs may capture machine-specific paths.
- Fit with project conventions: insufficient for the requested future-app pattern.

## Selected Approach

Use Option 1. Keep `npm pack` as the artifact producer and existing `check:package` as the local candidate gate. Add only the release-identity/checksum/remote-install support needed to prove that the GitHub asset is byte-identical to the candidate; do not create an alternate package build path. The exact tag, release, and asset upload remain a separately authorized operation recorded against the immutable candidate.

The canonical guide will separate five decisions:

1. inventory and classify the existing application before replacement;
2. acquire and pin the exact package artifact;
3. establish a local wrapper/composition and CSS-override boundary;
4. migrate only supported generic behavior while preserving application-specific state and deliberate divergence;
5. prove behavior, accessibility, responsive rendering, production build, dependency ownership, and later upgrade readiness.

Use Anthracite as evidence, not source to copy. The guide may name representative mappings such as package TreeView plus app-owned server search, package Sheet/Dialog plus app-owned responsive orchestration, or shared editor chrome plus app-owned CodeMirror/autosave. It must avoid Anthracite domain details that do not generalize.

If the consumer exposes a missing generic hook or bug, first determine whether it belongs in UI Foundations or in the app wrapper. Expand public APIs only after broad-value evidence, with focused tests, Storybook states, changelog communication, and UIF-001 reconciliation.

## Experience Design

- Applicability: no new visual direction; component-contract and consumer-rendering evidence are required.
- Confirmed direction: Foundation defaults remain neutral and applications preserve their own identity through supported seams.
- User confirmation: UI Foundations is a customizable base and the pattern should guide future apps without homogenizing them.
- Reference artifacts: Foundation Library Overrides/Workbench stories and final Anthracite Storybook/application evidence.

### User Flow And Information Architecture

The adoption guide leads with classification and package pinning, then wrappers/identity, migration, evidence, and upgrades. It distinguishes maintainer release operations from consumer installation and never presents remote publication as an ordinary Apply side effect.

### Responsive Composition

No new Foundation responsive behavior is planned. The guide requires each consumer to retain and verify its own responsive navigation and state model, using Foundation shell/overlay mechanics only where compatible.

### Component And State Contract

#### Component Strategy

| Component Or Pattern | Strategy | Initial Owner Or Reference | Required Preview States | Follow-Up |
|---|---|---|---|---|
| Release-asset consumer fixture | adopted reference | current exact package fixture extended to remote archive proof | default and custom identity, normal component, shell, portaled overlay, clean build | Keep fixture generic and deterministic. |
| Anthracite wrappers and product compositions | existing application component | coordinated Anthracite Change | representative default/error/pending/selected/responsive states | Link immutable evidence; do not move source into this repo. |
| Missing generic seam found by consumer | reference candidate | application evidence plus current public contract | default and override, behavior/accessibility, portal/responsive as applicable | Promote only after broad-value review and UIF-001 reconciliation. |
| Product-specific search/editor/Assistant/plugin behavior | deliberate divergence | consuming application | application-owned evidence | Document classification, not package configuration. |

### Accessibility And Interaction

The guide requires consumers to preserve names, semantics, focus, keyboard interaction, state announcements, contrast, reduced motion, touch targets, and responsive accessibility. Package adoption is not complete merely because imports compile.

### Visual Direction

No redesign. Default Graphite and optional profiles remain references; applications load semantic overrides after Foundation CSS and own their actual identity.

### Open Design Questions

None. `/sdd-design --plan` is not required unless a proposed shared correction changes accepted Foundation visual/interaction behavior.

## Client And API Boundary

- Current clients: isolated package fixture and Storybook.
- Plausible future clients: Anthracite and later React 19 web applications using pnpm, npm, or compatible archive installation.
- Reusable product capabilities: package acquisition, classification, wrapper/override migration, parity evidence, and deliberate upgrade process.
- API or typed contract: package exports/declarations/CSS, archive URL and integrity, public slots/props/tokens, and documented migration contract.
- OpenAPI plan, if HTTP-facing: not applicable.
- Backend platform exposed directly to clients?: no.
- Client-specific presentation or local state: all application data, routing, auth, persistence, editors, responsive orchestration, product state, and identity.
- Rationale: distribution and generic behavior are shared; product architecture stays with each consumer.

## Alternatives Considered

- Track `dist` and install Git commits: rejected because it duplicates generated output in history and bypasses the exact package-release boundary.
- Commit tarballs in each consumer: rejected because it duplicates binaries and weakens central provenance.
- Make Anthracite's wrapper source a template package: rejected because one app's local API and product defaults should not become another shared compatibility surface.

## Why This Approach

It converts the already-verified package artifact into a portable pre-registry dependency without inventing a second build path, then uses the first real application to prove the social and technical ownership model. Future apps get a repeatable decision framework and evidence checklist rather than a brittle copy recipe or mandatory visual identity.

## ADRs

- Required: yes.
- ADR path: `docs/adrs/2026-07-23-distribute-pre-registry-releases-as-verified-archives.md`.
- Decision summary: distribute exact verified pre-registry packages as versioned GitHub Release assets pinned by URL and lock integrity; keep remote release creation separately authorized.
- Reconsider when: trusted registry publication is activated, release-asset retention is insufficient, signed provenance is required, or distribution splits into independently versioned packages.

## Implementation Constraints

- Implement on a `change/` branch from current `develop` and preserve the clean package baseline.
- Do not create a tag, GitHub Release, upload, publication, or other remote state without separate explicit authorization.
- Do not weaken `private: true` or the npm publication guard as part of archive distribution.
- The uploaded archive must be byte-identical to the candidate that passed package verification; never rebuild different bytes after approval.
- Do not track `dist`, tarballs, temporary consumers, credentials, tokens, or local package state in Git.
- Keep React consumer-owned and preserve current public exports/override contracts unless real evidence justifies a versioned change.
- Do not finalize S4 consumer-evidence claims before inspecting Anthracite's exact implementation/review candidate.

## Verification Strategy

- Focused automated tests: candidate archive contents/exports/dependencies, checksum or byte identity, remote-archive clean installation, private import rejection, one React runtime, wrapper/default/override/portal fixture behavior, and failure on missing or changed contract.
- Broad supporting gates: `npm run check:all` on the exact committed candidate.
- Deterministic consumer evidence: Anthracite focused tests, Storybook, production build/E2E, dependency tree, and application-owned wrapper replacement proof.
- Rendered evidence: Foundation default/override fixture plus final Anthracite desktop/narrow states, directly inspected for identity, behavior, accessibility, console/network, and overflow.
- Live-provider or external-service playtests: GitHub asset availability/download and byte comparison are release evidence; no AI/provider test applies.
- Manual UI confirmation: confirm the package default remains neutral and Anthracite remains app-specific while shared mechanics behave consistently.
- Debug/log inspection: package file list, archive digest/integrity, release metadata, consumer lockfile, built imports, dependency tree, browser console/network.

## Decisions

- Promote a migration Story in UIF-002 rather than adding a documentation-only task with no durable capability owner.
- Use exact GitHub Release archives until npm publication is deliberately enabled.
- Keep one canonical migration guide in UI Foundations and link from shared guidance rather than duplicating doctrine.
- Treat Anthracite as first-consumer evidence, not as a generic source template.
- Expand public package surfaces only from demonstrated broad-value gaps.

## Risks / Trade-Offs

- GitHub assets can be administratively replaced or deleted; lock integrity and never-replace-version discipline mitigate but do not remove host availability risk.
- Coordinated Changes can drift if one closes before the other's exact evidence is linked; both ledgers need immutable candidate references.
- A first consumer can overfit the guide to one architecture; classifications and examples must stay generic and later consumers may refine them.
- Remote archive checks can introduce flaky network dependence if placed in the normal aggregate; local exact checks remain deterministic and release-asset checks stay release-scoped.
- Consumer pressure may encourage public API growth; wrapper-first correction and broad-value review are required before package expansion.
