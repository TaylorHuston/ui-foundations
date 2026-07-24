# ADR: Distribute Pre-Registry Releases As Verified Archives

- Status: Proposed
- Date: 2026-07-23
- Related change: `docs/changes/2026-07-23-consumer-adoption-pattern/`
- Related Epics / Stories: `UIF-002/S1-S4`

## Context

UI Foundations 0.2.0 produces and verifies an installable npm-compatible archive, but registry publication remains inactive and guarded by `private: true`. AnthraciteMD is ready to become the first real package consumer, and future applications need a portable, reproducible source that does not depend on a developer-machine path, workspace link, or source checkout.

A direct Git dependency is not equivalent to the verified package contract because generated `dist` files are intentionally ignored. Building from a Git checkout during consumer installation would introduce development dependencies and source-build behavior into every application install.

## Decision

Until registry publication is deliberately activated, UI Foundations releases intended for application consumption will be distributed as exact verified `npm pack` archives attached to versioned GitHub Releases. Consumers will pin the full release-asset URL and commit the package-manager lockfile integrity. Release assets are never silently replaced; if replacement is unavoidable, use a new package version and release asset.

The archive must pass the existing exact-package and isolated-consumer verification before upload. Creating tags, GitHub Releases, or assets remains a separately authorized release operation and is not implied by ordinary implementation or Change application.

## Options Considered

### Option 1: Verified GitHub Release Archive

- Summary: attach the exact tested tarball to a versioned GitHub Release and let consumers pin its URL plus integrity.
- Pros: uses the package artifact already tested, avoids registry setup, keeps source internals private, supports ordinary package-manager installation, and fails closed if bytes drift.
- Cons: requires release-asset stewardship and is less discoverable than a registry package.

### Option 2: Git Commit Dependency

- Summary: install the repository at a fixed commit and build it during dependency installation.
- Pros: commit pinning is familiar and requires no binary release asset.
- Cons: `dist` is not tracked, so consumers would need package development tooling and a prepare build; installation would exercise a different path from the verified archive.

### Option 3: Commit Archives Inside Consuming Repositories

- Summary: copy the tarball into every application repository.
- Pros: applications are self-contained after checkout.
- Cons: duplicates binary artifacts, obscures provenance, increases repository size, and makes coordinated upgrades and integrity review harder.

## Consequences

- Positive: AnthraciteMD and later consumers can use one reproducible pre-registry package acquisition pattern that preserves exact archive verification.
- Negative: UI Foundations must maintain versioned release assets, checksums/integrity expectations, immutable-version discipline, and documentation for archive upgrades.
- Follow-up: use the AnthraciteMD adoption to produce a migration guide, wrapper classification, consumer verification checklist, and release-asset installation example.

## Validation

- Prove the uploaded asset is byte-identical to the exact archive that passed `npm run check:package` for the release candidate.
- Install the release-asset URL in a clean consumer and AnthraciteMD without repository links or source imports.
- Confirm the lockfile records integrity, private imports fail, public exports resolve, one React runtime is used, and production builds pass.
- Verify release and adoption documentation never instruct consumers to use mutable local paths or unverified source builds.

## Reconsider When

- The package is intentionally published to a trusted registry.
- GitHub Release availability no longer meets consumer installation or retention needs.
- Provenance or supply-chain requirements justify signed attestations or another artifact service.
- A non-JavaScript distribution model or independently versioned package split is adopted.
