# Proposal: Shareable Importable Library

## Why

UI Foundations has matured from a small source reference into a tested catalog of semantic styles, controls, accessibility-sensitive primitives, and application-neutral workbench patterns. Copying helped applications diverge early, but it also duplicates fixes and allows shared behavior, accessibility, and styling contracts to drift.

The desired next step is a versioned shared library that applications can import, then adapt behind local wrappers through intentional override seams. This should improve consistency without making UI Foundations the owner of product behavior or forcing all applications to look or evolve identically.

## What Changes

- Produce a compiled, typed, ESM-first React package with explicit public JavaScript and CSS entry points.
- Make package import the primary shared-consumption model while preserving the public repository as inspectable, copyable source when deliberate divergence warrants it.
- Define supported override seams: semantic tokens, component custom properties, root styling props, stable named slots, composition props, and app-owned wrappers.
- Make portal surfaces and other materially styled internal regions overrideable without generated CSS Module selectors or deep DOM coupling.
- Add deterministic package-content, export, declaration, dependency, clean-consumer, override, and release-candidate checks.
- Establish a guarded pre-1.0 versioning and publication model so consumers choose when to upgrade.
- Preserve consumer ownership of data, routing, authorization, persistence, editor engines, responsive orchestration, domain state, and deliberate component replacement.

## Target Repositories

- This repository (role: shared-library).

## Epic Actions

### New Epic Directories

- Create `docs/epics/uif-002-library-distribution-and-overrides/` for install/import, override/wrapper, and release/upgrade behavior.

### Existing Epic Directory Updates

- Update `docs/epics/uif-001-copyable-interface-foundations/epic.md` so it owns the behavior and visual contract of the foundation catalog without claiming that copy ownership is the only permitted adoption model.

## Epic Story Changes

- Add `UIF-002/S1` Install And Import The Versioned Library.
- Add `UIF-002/S2` Override Foundations Without Patching Internals.
- Add `UIF-002/S3` Prepare And Upgrade A Library Release.
- Rename `UIF-001/S1` from Adopt A Copyable CSS Foundation to Adopt A Semantic CSS Foundation without changing its current token behavior.
- Rename and reword `UIF-001/S2` and `UIF-001/S3` from copy-only references to usable accessible components and behavior-heavy primitives while retaining their current behavior maps.
- Rename and reword `UIF-001/S4` from a copyable workbench contract to composable workbench patterns while preserving application ownership of product behavior.
- Update UIF-001 Outcome, Deferred Scope, Cross-Story Concerns, Verification Gaps, and Completion Criteria so UIF-001 and UIF-002 do not compete.
- Preserve all existing UIF-001 Requirement and Scenario IDs unless implementation reveals a real behavior change; this Change alters distribution and override ownership, not the accepted interaction behavior.

## Scope Decisions

- Confirmed: applications will normally import one versioned package rather than copy source.
- Confirmed: applications will consume shared components behind app-owned wrappers; feature code should depend on those wrappers rather than importing UI Foundations directly throughout the product.
- Confirmed: supported overrides are semantic custom properties, documented root classes/styles, stable named slots, and composition APIs—not generated class names, arbitrary descendant selectors, utility-class matrices, or `!important` escalation.
- Confirmed: UI Foundations remains free of Tailwind and does not become an application framework, data layer, router, editor engine, or domain component owner.
- Confirmed: one package is preferred over separate token, primitive, and pattern packages while the library remains pre-1.0.
- Confirmed: the package will be ESM-first because current intended consumers use React 19 and Vite 8.
- Confirmed: React and React DOM remain consumer-owned peers; runtime packages directly used by exported implementation must be declared or removed from that runtime path.
- Confirmed: the first implementation proves consumption from a packed artifact in an isolated app; migrations of 49th Floor, Anthracite, and Lorecraft require separate Changes.
- Confirmed: actual public publication remains a separately authorized release operation and is not authorized by this plan or ordinary Apply work.
- Deferred: automatic consumer upgrades, synchronization tooling, codemods, React Native, non-React runtimes, framework-specific adapters, and compatibility promises beyond the documented pre-1.0 policy.
- Assumptions: the working public package name is `@taylorhuston/ui-foundations`; the unscoped `ui-foundations` name is already occupied.
- Assumptions: npm scope ownership and authentication can be established before first publication; local package construction and verification do not depend on registry credentials.
- User decisions that shaped the Story/Requirement split: the user explicitly selected a shared import-and-override model after comparing it with copy ownership; installation, override ownership, and release upgrades are independently valuable paths and therefore remain separate Stories.

## Change Folder

- Planned location: promoted; private draft removed
- Active location: `docs/changes/2026-07-22-shareable-importable-library/`
- Closed location: `docs/changes/closed/2026-07-22-shareable-importable-library/`

## Impact

- Product: applications gain a shared, versioned baseline while retaining local identity and product-specific behavior.
- Code: package build and declaration output, explicit export surfaces, CSS distribution, override hooks, peer/runtime dependency boundaries, and consumer-facing wrapper examples become maintained behavior.
- Tests: add packed-artifact inspection, public-export resolution, isolated consumer type/build/runtime checks, override proof, and regressions for existing component behavior and rendering.
- Docs: revise README adoption guidance, package usage and override documentation, repo guidance, UIF-001 truth, UIF-002, and public release communication.
- ADRs: propose `docs/adrs/2026-07-22-use-versioned-runtime-library-with-app-wrappers.md`; upon acceptance it supersedes `docs/adrs/2026-07-17-copy-owned-reference-components.md`.

## Release Communication Impact

- Required: yes
- Record / section: `CHANGELOG.md`, README installation/adoption/override sections, package version metadata, and the eventual release handoff.
- Public summary: UI Foundations can be installed as a versioned React library and customized through documented semantic overrides and app-owned wrappers; consumer applications still own their product behavior and upgrade timing.

## Open Questions

- Operational, not planning-blocking: confirm npm ownership of the `@taylorhuston` scope and authenticate the release environment before the first explicitly authorized publication.
