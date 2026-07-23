# ADR: Use A Versioned Runtime Library With App-Owned Wrappers

- Status: Accepted
- Date: 2026-07-22
- Related change: `docs/changes/2026-07-22-shareable-importable-library/`
- Related Epics / Stories: `UIF-001/S1-S4`, `UIF-002/S1-S3`
- Supersedes: `docs/adrs/2026-07-17-copy-owned-reference-components.md`

## Context

UI Foundations began as copy-owned CSS and React references so applications could diverge without coordinated upgrades. The catalog now contains a tested semantic token system, common controls, behavior-heavy primitives, and application-neutral workbench patterns. Multiple applications share the same React 19, Vite 8, and Base UI generation, and the desired workflow has shifted toward inheriting shared fixes while retaining local identity and product behavior.

The new boundary must improve consistency without turning UI Foundations into application architecture, encouraging deep CSS overrides, or forcing every app to upgrade together.

## Decision

Distribute UI Foundations as one versioned, ESM-first React package. Applications import the package behind thin app-owned wrappers and override it only through documented semantic custom properties, root styling props, stable named slots, and composition APIs. UI Foundations owns generic presentation and accessibility behavior; consumers continue to own data, routing, authorization, persistence, domain state, responsive orchestration, and deliberate replacement.

The package will expose explicit public JavaScript, declaration, and CSS entry points. React remains a peer dependency. Other packages required directly by exported runtime code are declared as runtime dependencies. Generated CSS Module names and private source paths are not public API.

Public registry publication remains a separately authorized release action. Package consumers pin a version and upgrade deliberately; UI Foundations does not update applications automatically.

## Options Considered

### Option 1: Continue Copy-Owned References

- Summary: applications keep copying selected source and independently carrying fixes.
- Pros: maximum divergence, no runtime dependency, and no coordinated versioning.
- Cons: repeated fixes drift, accessibility corrections must be reapplied, and copied APIs become difficult to compare reliably.

### Option 2: One Versioned Package With App-Owned Wrappers

- Summary: publish compiled styles, components, and patterns from one package; consumers adapt them behind local wrappers.
- Pros: centralized fixes, explicit upgrade history, consistent semantics, supported override seams, and a reversible local boundary.
- Cons: public API and styling hooks require compatibility discipline; consumers must run upgrades; package failures can affect several apps.

### Option 3: Separate Token, Primitive, And Pattern Packages

- Summary: publish several independently versioned packages for style layers and React tiers.
- Pros: narrow dependency surfaces and independent adoption.
- Cons: disproportionate release overhead, cross-package compatibility work, and premature boundaries for a small pre-1.0 system.

## Consequences

- Positive: shared behavior and accessibility fixes become available through ordinary dependency upgrades while app-specific wrappers preserve local product ownership.
- Negative: UI Foundations must maintain public exports, dependency ranges, CSS/slot compatibility, package builds, release notes, and clean-consumer verification.
- Follow-up: migrate applications through separate Changes and publish only through a separately authorized release action.

## Validation

- Build a package archive from an exact commit and inspect its complete contents and exports.
- Install that archive into an isolated supported React/Vite consumer with no repository-source imports; typecheck, build, and exercise representative components.
- Prove default and overridden semantic tokens, root styling, stable slots, app-owned wrappers, and a portaled overlay without targeting generated class names.
- Confirm React is externalized and resolved from the consumer while all other runtime imports are declared.
- Run the existing focused behavior, Storybook, accessibility, and rendered visual gates to prove packaging hooks do not regress the catalog.

## Reconsider When

- Consumers require incompatible React generations or non-web runtimes.
- App-specific configuration props grow faster than broadly reusable behavior.
- Package upgrades cost more than the copying they replaced.
- A token-only or headless-package split becomes justified by independently adopted consumers.
- Two or more consumers need to fork the same shared component because the documented wrapper and override seams are insufficient.
