# Proposal: Codify The Consumer Adoption Pattern

## Why

UI Foundations 0.2.0 proves that its compiled package can be installed into an isolated fixture and customized through documented seams, but no real application consumes it yet. The current adoption guide explains imports and wrappers without proving how an established application should inventory existing UI, choose adopted references versus deliberate divergences, preserve product state, acquire the package before registry publication, or reconcile application evidence.

AnthraciteMD is ready to become the first canonical consumer. Its real authentication, workbench, Markdown editor, search, Settings, plugin, Assistant, and responsive flows provide the evidence needed to turn package adoption from an isolated fixture into a repeatable pattern for future applications.

## What Changes

- Define a registry-free distribution contract: attach the exact verified `npm pack` tarball to a versioned GitHub Release and have consumers pin the complete asset URL plus package-manager lockfile integrity.
- Keep tag, release, and asset creation as separately authorized release operations; ordinary Apply work may prepare and verify the candidate but may not mutate remote release state.
- Promote UIF-002's deferred `consumer-migration-guide` candidate into a Story covering inventory/classification, wrapper-based migration, portable package acquisition, deliberate divergence, parity evidence, and deliberate upgrades.
- Expand library adoption documentation with a reusable existing-application migration process grounded in AnthraciteMD evidence.
- Record how to classify each material surface as an adopted reference, existing application component, application-specific component, reference candidate, or deliberate divergence.
- Require applications to preserve product behavior, identity, API/state ownership, responsive orchestration, and local verification rather than mechanically replacing every component.
- Add or refine package/release checks needed to prove the uploaded archive is the exact candidate and that a remote-archive consumer installs without repository access.
- Link the final guide to an immutable AnthraciteMD adoption reference after that Change is implemented and reviewed.

## Target Repositories

- This repository (role: shared-library).

## Epic Actions

### New Epic Directories

- None proposed.

### Existing Epic Directory Updates

- Update `docs/epics/uif-002-library-distribution-and-overrides/epic.md`.
- Update `docs/epics/uif-001-copyable-interface-foundations/epic.md` only if real-consumer evidence changes a component/pattern behavior contract or verification gap; do not edit it merely to log adoption chronology.

## Epic Story Changes

- Add `UIF-002/S4` Adopt The Library In An Existing Application, promoted from the deferred `consumer-migration-guide` candidate.
- `UIF-002/S4` owns the repeatable migration and evidence path; it does not duplicate S1 package exports, S2 override APIs, or S3 release-candidate policy.
- Refine UIF-002/S3 only where the pre-registry GitHub Release archive and byte-identity guard become part of the current release contract.
- Preserve UIF-001's component and pattern Requirement/Scenario IDs. Update its gaps/evidence only when Anthracite reveals a real broadly useful behavior correction.

## Scope Decisions

- Confirmed: codifying reusable adoption is part of the coordinated Anthracite migration effort.
- Confirmed: Anthracite is the first real consumer and evidence source, not a template whose product-specific code should be copied wholesale.
- Confirmed: use an exact GitHub Release archive and lockfile integrity until npm publication is deliberately activated.
- Confirmed: app-owned wrappers, semantic overrides, stable public slots/portal hooks, composition, and deliberate replacement remain the consumer boundary.
- Confirmed: future applications should follow the same decision process, but package adoption remains optional when product/platform needs justify another approach.
- Confirmed: canonical detail belongs in `docs/library-adoption.md`; workspace shared guidance may continue linking to it rather than duplicating a second migration manual.
- Deferred: migrating other applications, automatic upgrades, codemods, registry publication, signed attestations, package splitting, React Native, non-React clients, and framework-specific adapters.
- Assumptions: GitHub Releases remain available for public immutable-version assets and consumers use package managers that record archive integrity.
- User decisions that shaped the Story/Requirement split: codify the reusable pattern; use pinned GitHub/archive distribution instead of npm for now; keep applications customizable and independently owned.

## Change Folder

- Planned location: promoted; private draft removed
- Active location: `docs/changes/2026-07-23-consumer-adoption-pattern/`
- Closed location: `docs/changes/closed/2026-07-23-consumer-adoption-pattern/`

## Impact

- Product: application developers gain a proven path for adopting UI Foundations without surrendering product identity or behavior.
- Code: package/release verification may gain archive identity/checksum or remote-consumer proof; public component APIs change only if consumer evidence demonstrates a missing general seam.
- Tests: exact archive/asset identity, clean remote-archive consumption, wrapper and override proof, migration-guide contract checks where practical, and Anthracite consumer evidence.
- Docs: UIF-002, adoption guide, README, AGENTS/release guidance as needed, changelog, Proposed ADR, and coordinated evidence links.
- ADRs: propose `docs/adrs/2026-07-23-distribute-pre-registry-releases-as-verified-archives.md`; accept after exact release-asset proof.

## Release Communication Impact

- Required: yes.
- Record / section: `CHANGELOG.md`, README adoption/distribution summary, `docs/library-adoption.md`, and the versioned GitHub Release notes/asset manifest.
- Public summary: UI Foundations now documents and proves a repeatable existing-application adoption path using app-owned wrappers, deliberate divergence, pinned release archives, and real-consumer verification.

## Open Questions

- None block planning. The exact tag/release/asset creation requires separate explicit authorization and must be recorded against the verified candidate before Anthracite can complete portable installation.
