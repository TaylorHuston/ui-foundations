---
status: accepted
date: 2026-07-17
---
# Copy-Owned Reference Components

## Context

Taylor applications repeatedly need similar CSS tokens, controls, and interface patterns. A shared runtime package would improve central consistency but would also couple application dependency upgrades, releases, and migrations. The desired foundation is a fast starting point rather than a mandatory product identity.

## Decision

UI Foundations owns canonical executable CSS and React references. Applications inspect and copy selected source, then own, adapt, and test their copies. They do not import UI Foundations as a runtime component package and do not receive automatic synchronization.

Reference components use TypeScript, semantic props, CSS Modules, native HTML when sufficient, and Base UI when behavior-heavy accessibility mechanics warrant a headless primitive. Stable references include Storybook states and focused behavioral tests.

## Consequences

- Applications remain independently releasable and free to diverge for product needs.
- New work starts from tested semantics instead of rebuilding common controls.
- Copied code can drift; Storybook comparison and explicit adoption reviews expose meaningful divergence.
- Fixes must be applied deliberately to each affected application.
- UI Foundations may become a versioned runtime package only after several consumers prove that coordinated upgrades are more valuable than independent ownership.

## Reconsider When

- At least two applications repeatedly require synchronized behavioral fixes to the same stable API.
- Copying produces more migration cost than package versioning would.
- A clear compatibility, release, and ownership model exists for a runtime package.
