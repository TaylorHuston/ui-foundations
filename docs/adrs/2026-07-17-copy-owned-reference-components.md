# ADR: Use Copy-Owned Reference Components

- Status: Accepted
- Date: 2026-07-17
- Related change: `docs/changes/2026-07-17-copyable-react-foundations/`
- Related Epics / Stories: `UIF-001/S1`, `UIF-001/S2`, `UIF-001/S3`, `UIF-001/S4`

## Context

Taylor applications repeatedly need similar CSS tokens, controls, and interface patterns. A shared runtime package would improve central consistency but would also couple application dependency upgrades, releases, and migrations. The desired foundation is a fast starting point rather than a mandatory product identity.

## Decision

UI Foundations owns canonical executable CSS and React references. Applications inspect and copy selected source, then own, adapt, and test their copies. They do not import UI Foundations as a runtime component package and do not receive automatic synchronization.

Reference components use TypeScript, semantic props, CSS Modules, native HTML when sufficient, and Base UI when behavior-heavy accessibility mechanics warrant a headless primitive. Stable references include Storybook states and focused behavioral tests.

## Options Considered

### Option 1: Copy-Owned References

- Summary: applications copy selected canonical source and assume ownership.
- Pros: independent releases, product-specific adaptation, low compatibility burden, and easy reversal.
- Cons: adopted copies can drift and fixes must be applied deliberately in each application.

### Option 2: Shared Runtime Package

- Summary: applications import versioned UI components from one package.
- Pros: centralized fixes, stronger synchronized consistency, and one implementation per component.
- Cons: coordinated upgrades, peer-dependency and compatibility work, release coupling, and pressure toward one product identity.

## Consequences

- Positive: new work starts from tested semantics while applications remain independently releasable.
- Negative: copied code can drift and requires application-owned maintenance.
- Follow-up: use Storybook comparison and explicit adoption reviews to expose meaningful divergence.

## Validation

- `UIF-001/S1` verifies the copyable CSS contract through `scripts/check.mjs` and Storybook compilation.
- `UIF-001/S2` verifies semantic component behavior through focused tests, Storybook states, axe inspection, and user visual confirmation.
- `UIF-001/S3` verifies that Base UI can supply tested overlay and selection mechanics behind small copy-owned wrappers.
- `UIF-001/S4` verifies that application-neutral workbench compositions can remain data- and integration-agnostic.
- Adoption in a real application remains the proof required before promoting additional patterns as stable references.

## Reconsider When

- At least two applications repeatedly require synchronized behavioral fixes to the same stable API.
- Copying produces more migration cost than package versioning would.
- A clear compatibility, release, and ownership model exists for a runtime package.
