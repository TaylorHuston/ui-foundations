---
status: in_progress
---
# Tasks: Codify The Consumer Adoption Pattern

## Resume Here

- Last completed action: Discovery confirmed the approved replan is coherent: `DocumentHeader.rename` already owns controlled edit callbacks, while `EditorToolbar` owns the internal mode switch and named trailing/status regions. Required independent opinions completed 2/2; no source behavior has changed yet.
- Next action: implement UIF-001/S4/R2-S2 first: accessible title-initiated controlled rename with focus and keyboard behavior, then reconcile its Story/test/storybook evidence before the toolbar placement phase.
- Active branch/ref: `change/consumer-adoption-pattern` from `develop@e4bcbff`.
- Expected dirty files: active Change artifacts plus the current UIF-001/S4/R2 implementation/test/story/README/changelog surfaces; preserve unrelated files.
- Known blockers: no v0.2.0 tag/GitHub Release/asset exists; remote creation/upload requires separate explicit authorization. Consumer upgrade proof waits for a later verified correction release, but it does not block UIF source/test/story implementation.

## Bounded Phase 1: Local Candidate Preparation

- [x] Promote the planned Change, preserve the Proposed ADR, and begin on the required `change/` branch.
- [x] Add a retained exact-archive record (filename, npm integrity, SHA-256) to the existing package verification path.
- [x] Add a release-scoped verifier that requires an HTTPS asset URL, compares its downloaded bytes, installs the URL in a clean consumer, builds it, and checks lockfile integrity.
- [x] Reconcile UIF-002/S3-S4 and minimal release/adoption documentation without claiming a real consumer or available remote asset.
- [x] Commit and run the exact local release candidate gate; record its commit, filename, and checksum.
- [ ] Under separate authorization only: create the tag/release/asset, then run the remote-asset proof.

## Task Checklist

### 1. Planning Quality

- [x] 1.1 Confirm UI Foundations owns the reusable migration/distribution pattern while Anthracite owns application implementation.
- [x] 1.2 Promote the deferred migration-guide candidate into one user-path-sized UIF-002/S4 without duplicating S1-S3.
- [x] 1.3 Define classification, portable archive, wrapper ownership, deliberate divergence, parity evidence, failure, and upgrade Scenarios.
- [x] 1.4 Defer registry publication, other app migrations, automation, codemods, package splits, attestations, and non-web runtimes.
- [x] 1.5 Plan scenario-mapped exact package and real-consumer evidence without treating docs or broad gates as sufficient alone.
- [x] 1.6 Record why no experience-design pass is needed absent a shared visual/interaction behavior change.
- [x] 1.7 Define rendered Foundation/Anthracite evidence needed for the adoption claim.
- [x] 1.8 Seed package provenance, remote authority, cross-repository evidence, public-contract, and verification-environment obligations.
- [x] 1.9 Set `status: planned` after proposal, design, tasks, UIF-002 draft behavior, ADR candidate, and validation are coherent.

### 2. Epic Artifacts

- [ ] 2.1 Add UIF-002/S4 to frontmatter, scope, Story Index, embedded Stories, cross-Story concerns, and completion criteria; remove the promoted candidate row.
- [ ] 2.2 Refine UIF-002/S3 only for verified pre-registry release-asset behavior and retain separate publication authority.
- [ ] 2.3 Replace every S4 implementation/verification gap only after exact owning source and evidence exist.
- [ ] 2.4 Reconcile UIF-001/S4/R2 with the consumer-proven title-initiated rename and trailing/top-right mode-control contract; independently map implementation and verification after source exists.
- [ ] 2.5 Preserve one authoritative implementation and verification map per Story and reconcile README/adoption/current-state wording.

### 3. Architecture Decisions

- [x] 3.1 Compare verified release archive, Git source build, vendored tarball, and local-only archive guidance.
- [x] 3.2 Create Proposed `docs/adrs/2026-07-23-distribute-pre-registry-releases-as-verified-archives.md`.
- [ ] 3.3 Accept the ADR only after exact archive/asset byte identity and remote consumer proof; otherwise retain Proposed status with the blocker.

### 4. Implementation

- [ ] 4.1 Establish the pre-registry release-archive contract without creating unauthorized remote state.
  - [ ] Produce one exact candidate through the existing package build/pack path and record its identity/integrity.
  - [ ] Verify any eventual release asset is byte-identical and installable without repository source.
  - [ ] Keep npm publication guarded and prevent local/source/mutable fallback guidance.
- [ ] 4.2 Implement UIF-002/S4 through adaptive evidence-driven slices.
  - [ ] R1: inventory/classification and deliberate-divergence migration contract.
  - [ ] R2: portable release archive, URL/integrity pin, and fail-closed distribution contract.
  - [ ] R3: wrappers, semantic/slot/portal/composition customization, and application-state ownership.
  - [ ] R4: real-consumer evidence, immutable public reference, and deliberate upgrade checklist.
  - [ ] UIF-001/S4/R2: title-initiated controlled rename plus trailing/top-right mode control, preserving app-owned callbacks, pending/error/read-only behavior, and narrow accessibility.
- [ ] 4.3 Inspect the coordinated Anthracite migration for broadly reusable lessons or missing seams; keep product-specific code local.
- [ ] 4.4 Add the smallest proven package correction when needed, with UIF-001 reconciliation, focused tests, Storybook states, and changelog communication.
- [ ] 4.5 Reconcile README, adoption guide, AGENTS/release rules, CHANGELOG, UIF-001/UIF-002, ADR, and Change ledgers.
- [ ] 4.6 Commit each coherent verified slice when authorized by `/sdd-apply`; preserve exact candidate identity across the release handoff.

### 5. Verification

- [ ] 5.1 Inspect every focused package/archive/consumer test before mapping S4 Scenarios.
- [ ] 5.2 Run the existing exact package archive and isolated-consumer gate on the exact committed candidate.
- [ ] 5.3 Under separate release authorization, compare downloaded release-asset bytes with the verified candidate and install the asset URL in a clean consumer.
- [ ] 5.4 Inspect Anthracite's lockfile/dependency tree, wrapper boundary, tests, Storybook, production build/E2E, desktop/narrow rendering, console/network, and review evidence after it deliberately upgrades to the correction release.
- [ ] 5.4a Add Foundation unit, Storybook interaction/accessibility, and rendered desktop/narrow proof for title trigger, keyboard activation, edit/pending/error/recovery, mode placement, status/action ordering, and constrained layouts.
- [ ] 5.5 Prove missing/changed asset or private import fails without mutable/source fallback.
- [ ] 5.6 Run `npm run check:all`, scoped validation, reverse traceability, and any prospective integration gate on exact committed candidates.
- [ ] 5.7 Update UIF-002 Verified By with exact evidence and retain any external-availability or later-consumer gaps honestly.

### 6. Review And Closeout

- [ ] 6.1 Update release communication and adoption documentation without private planning or speculative roadmap claims.
- [ ] 6.2 Run independent `/sdd-review` against the exact UI Foundations candidate and inspect the linked Anthracite evidence rather than trusting its ledger summary.
- [ ] 6.3 Resolve consolidated package, docs, supply-chain, accessibility, evidence, and traceability findings and rerun affected gates.
- [ ] 6.4 Record user confirmation of the default-versus-Anthracite comparison or an explicit accepted gap.
- [ ] 6.5 Confirm UIF and Anthracite Changes reference immutable package/consumer candidates and no stale local-only adoption wording remains.
- [ ] 6.6 Merge/close only after ready review and explicit authorization; remote tag/release/asset creation remains separately authorized.

## Implementation Ledger

| Date | Slice | Agent / Guidance | Files / Areas | Result | Commit / Ref |
|---|---|---|---|---|---|
| 2026-07-23 | Planning and distribution decision | `sdd-change`, `sdd-adr`, building-components guidance | private Change; Proposed ADR | Planned; implementation not started | `develop@e4bcbff` baseline |
| 2026-07-24 | Bounded local archive contract | `sdd-apply`, TDD guidance | package verifier, release-asset verifier, package contract tests, UIF-002/S3-S4, README/adoption/changelog, Proposed ADR | Added retained candidate identity plus release-scoped byte/URL/lockfile proof; no component API, publication guard, export, or peer ownership change. | `23b01e8930f18080c1cf66351feeb46f21e96b13` |

## Verification Ledger

| Date | Check | Evidence Type | What It Proves | Result |
|---|---|---|---|---|
| 2026-07-23 | Current package/release/consumer inspection | planning evidence | Package has an 80-file verified tarball path, ignored `dist`, no tag/release asset, explicit exports, and a compatible first consumer; direct Git install is not the verified artifact path. | Planning evidence only |
| 2026-07-24 | `node --test test/package-contract.node.mjs` | focused automated | Four package-contract tests: existing exact archive/consumer proof and missing-export rejection, plus retained candidate identity and explicit remote-proof input guard. | passed (4/4) |
| 2026-07-24 | `npm run check:package` then `UI_FOUNDATIONS_PACKAGE_OUTPUT_DIRECTORY=<candidate-directory> node scripts/verify-package.mjs` | exact committed package candidate | Commit `23b01e8930f18080c1cf66351feeb46f21e96b13` built, packed, inspected, installed in a clean consumer, typechecked, and production-built. Archive: `taylorhuston-ui-foundations-0.2.0.tgz`; SHA-256: `5b6bd77d0c47a4f4f3a15a79aededcf7108e95c3413c1e2bde5e1d95dcbc5d9b`. | passed; retained candidate is local-only |

## Manual Feedback

| Date | Feedback | Classification | Action / Artifact Updates | Status |
|---|---|---|---|---|
| 2026-07-23 | Codify the reusable pattern as part of moving Anthracite to UI Foundations. | product/architecture direction | Promoted migration-guide candidate in planned UIF-002/S4 and coordinated Changes. | resolved in planning |
| 2026-07-23 | Use a pinned GitHub/archive dependency instead of npm for now. | distribution decision | Selected exact GitHub Release asset plus lock integrity and separate release authority. | resolved in planning |
| 2026-07-24 | Multiple consumers need title-initiated inline rename and a trailing/top-right Source/Rendered control. | reusable interaction/contract change | Reopened the active Change for a UIF-001/S4/R2 correction. Preserve application rename/mode state, persistence, validation, policy, and responsive ownership; do not mutate `v0.2.0`. | planned |

## Planning Updates

| Date | Discovery | Classification | Planning Updates | Next Apply Starting Point |
|---|---|---|---|---|
| 2026-07-23 | The package archive is verified locally but no registry, tag, release, or portable asset exists; `dist` is ignored. | technical constraint | Added R2, Proposed archive ADR, byte-identity/integrity proof, and release-only remote mutation gate. | Build/identify one exact candidate before requesting release-asset authorization. |
| 2026-07-24 | Anthracite feedback and confirmed multiple consumers establish shared editor-work-surface behavior beyond an app-local layout decision. | in-scope refinement / public interaction contract | Returned the Change to `proposed`; proposal/design/tasks now plan UIF-001/S4/R2 refinement for title-triggered controlled rename and trailing/top-right mode control. Required independent opinions (`qwen`, `ornith`) completed after the primary draft. Accepted: same-Story refinement, keyboard/focus/constrained evidence, clear release communication, and typed center opt-in. Rejected: a new state manager, arbitrary consumer slot-only placement, blur submission, and consumer source changes; the existing callbacks stay authoritative. | Discovery complete; implement UIF-001/S4/R2-S2 title rename first, then UIF-001/S4/R2-S1 toolbar placement. |
## Design Updates

| Date | Feedback / Discovery | Classification | Reference / Target | Preserve / Change / Non-Goals | Artifact Updates | Next Apply Starting Point |
|---|---|---|---|---|---|---|
| 2026-07-23 | Anthracite is visually aligned but behaviorally richer than generic examples. | experience refinement | Foundation Library Overrides/Workbench and Anthracite Storybook | Preserve neutral defaults and app identity; codify selective adoption/divergence; no Foundation redesign. | design.md and S4 behavior | Use final consumer evidence, not source copying, to refine guide. |
| 2026-07-24 | User confirmed multiple consumers need title-initiated rename and trailing/top-right Source/Rendered placement. | shared interaction revision | `DocumentHeader.rename` and `EditorToolbar` | Replace the duplicate idle Rename action with a keyboard-accessible title trigger; make trailing mode placement canonical with explicit center opt-in; preserve visible edit actions and all app-owned state/policy. | proposal.md, design.md, tasks.md; UIF-001 deferred to Apply | Implement and verify the UIF-only correction before consumer upgrades. |

## Implementation Risk And Confirmation Matrix

| Requirement / Surface | End-State Invariant | Risk / Failure Mode | Check Or Confirmation Needed | Evidence / Finding | Status |
|---|---|---|---|---|---|
| UIF-002/S4 R2 release archive | Release asset is byte-identical to the exact candidate and consumers pin integrity. | Rebuild drift, asset replacement, missing asset, local path, or mutable fallback. | Candidate digest, upload/download byte comparison, clean URL install, lock inspection, failure probe. | Exact local candidate `23b01e8` retained with SHA-256 `5b6bd77d…dcbc5d9b`; remote proof remains authorization-blocked. | partial |
| UIF-002/S4 R1 classification | Guide preserves stronger application behavior and names deliberate divergence. | Mechanical replace-all recipe or Anthracite overfitting. | Classification review against actual consumer mappings and product ownership. | Pending consumer implementation. | known |
| UIF-002/S4 R3 wrapper/public contract | Consumers need only documented exports/tokens/slots/portal hooks/composition and local wrappers. | Direct imports spread, generated selectors, deep DOM dependence, or product props enter package. | Import/selector inventory, wrapper replacement proof, public API review, rendered portal/identity evidence. | Pending. | known |
| UIF-002/S4 R4 evidence | Reusable claim links exact reviewed consumer behavior and rendered evidence. | Trusting broad commands, stale screenshots, private planning, or mutable branch links. | Inspect exact tests/assertions, commits, screenshots/runtime, docs, and public links. | Pending Anthracite handoff. | known |
| UIF-001/S4 editor correction | Visible title starts controlled rename; Source/Rendered appears in the trailing/top-right group without displacing status/actions or absorbing product policy. | Mouse-only title trigger, focus loss, hidden save/cancel/error state, action-order collision, narrow overflow, or application state entering UIF. | Focused behavioral tests, Storybook interaction/axe, desktop/narrow rendered inspection, public type/API review, and post-release consumer upgrade proof. | Planned from Anthracite evidence; source and UIF-001 maps remain untouched during replan. | planned |
| Release authority | Ordinary Apply never creates remote tag/release/asset or disables npm guard. | Unauthorized remote mutation/publication. | Manifest guard, command ledger, explicit authorization before remote step. | No remote state created during planning. | proved for planning |

## Pattern Parity Matrix

| Concern | Reference Location / Contract | New Location / Contract | Focused Proof | Intentional Divergence / Gap | Status |
|---|---|---|---|---|---|
| Local verified archive vs hosted archive | `npm run check:package` exact candidate | Versioned GitHub Release asset URL | Digest/byte identity plus clean remote install and public export probes | Network availability remains release-scoped, not aggregate. | pending |
| Isolated fixture vs real app consumer | package fixture default/override/wrapper/portal | Anthracite package wrappers and product paths | Dependency, focused, Storybook, E2E, rendered, manual, and review evidence | Anthracite product behavior intentionally stays local. | pending |
| Current adoption guide vs repeatable migration | local pack/import/override docs | classification-to-upgrade guide | Doc examples validated against actual consumer and exact archive | Later consumers may refine stack-specific details. | pending |

## Boundary Contract Matrix

| Origin Condition | Domain Result / Invariant | Adapter / Transport Mapping | Client Behavior / Retryability | Exact Proof | Status |
|---|---|---|---|---|---|
| Verified package candidate | One exact archive with declared exports/deps/private paths excluded | GitHub Release asset plus URL/integrity | Clean consumer installs/builds; altered/missing bytes fail | Candidate/asset digest and clean consumer evidence. | pending |
| Public package component/slot/token | Generic presentation/accessibility contract only | App-owned wrapper/composition | App identity/state applies without internals and can be replaced locally | Fixture plus Anthracite wrapper/rendered evidence. | pending |
| Consumer behavior evidence | Accepted application behavior remains app-owned | Immutable public commit/review/Story evidence link | Future maintainers can inspect why a surface was adopted/diverged | Exact Anthracite handoff and guide references. | pending |

## Stateful Transition Matrix

Not applicable to this repository's new behavior: the Change documents and verifies distribution/migration but does not own consumer editable, routed, asynchronous, durable, or identity state. Anthracite's coordinated Change owns and verifies state-transition parity.

## Decision Fan-Out Ledger

| Date | Decision / Discovery | End-State Consequence | Affected Surfaces To Reconcile | Evidence / Artifact Updates | Status |
|---|---|---|---|---|---|
| 2026-07-23 | Use verified GitHub Release assets before registry publication. | Release identity, digest/integrity, remote authority, docs, S3/S4, and consumer lockfiles become maintained boundaries. | package verifier/release support, README, adoption guide, AGENTS, CHANGELOG, UIF-002, ADR, Anthracite dependency | Candidate record, remote verifier, docs, S3/S4, and Proposed ADR reconciled; remote asset and Anthracite dependency remain open. | partial |
| 2026-07-23 | Make Anthracite the first evidence source while preserving app ownership. | S4 completion depends on exact external consumer proof and guide must stay generic. | Anthracite Change/commit/review evidence, UIF guide/Epic/tests, component candidates | Planned. | open until consumer handoff |
| 2026-07-24 | Multiple consumers confirm editor title rename and trailing mode placement are shared. | UIF-001/S4/R2 is refined; package receives a new versioned behavior before consumers deliberately upgrade. | DocumentHeader, EditorToolbar, stories/tests, UIF-001/S4, UIF-002/S4 guide, changelog/release verification, consumer wrappers/evidence | Replan accepted; preserve `v0.2.0` and application authority. | Apply correction, release under separate authority, then gather consumer upgrade evidence |

## Verification Environment

| Evidence Obligation | Required Setup / Safety Boundary | Needed For | Current Readiness | Result / Resolution |
|---|---|---|---|---|
| Local exact candidate | Node/npm and clean temporary consumer; no credentials | S4/R2 and package regression | ready | Focused package-contract suite passed; exact committed candidate gate is the next action. |
| GitHub Release asset | Explicit release authorization and GitHub access; exact candidate bytes only | S4/R2 remote portability | blocked on authorization/asset | Must not be simulated as complete. |
| Anthracite consumer | Promoted/implemented coordinated Change, package asset, disposable fixtures/browser | S4/R1/R3/R4 | pending | Await application implementation and review evidence. |
| Foundation rendered fixture | Storybook and browser/accessibility tooling | S4/R3 default/override/portal parity | ready after implementation | Pending. |
| Registry credentials | None required | deferred npm publication | not applicable | Registry remains guarded. |

## Verification Scope Decision

- Project-defined aggregate command or authoritative constituent source: `npm run check:all`.
- Aggregate gate required before `in_review`: yes.
- Trigger or project-policy reason: package/release contract, public docs/Epic behavior, possible public-surface correction, and cross-repository consumer evidence.
- Exact committed source candidate: resolve during Apply before handoff.
- Freshness and cache treatment: rebuild `dist`, create a fresh exact archive, install into fresh temporary consumers, avoid links/source imports, and keep remote-network checks release-scoped.
- Aggregate result and meaningful execution/count evidence: pending implementation.
- Post-gate evidence-record-only changes and affected checks rerun: classify during Apply; rerun scoped validation and package/diff checks after final evidence links.
- Prospective integration gate required: yes when `develop` advances or the source-to-target tree differs.
- Current target and prospective integration tree/ref: `develop@e4bcbff`; resolve exact tree before review/merge.
- Integration-candidate result or reason source proof is reusable: pending.
- Remote CI role: unavailable; local package aggregate and release/consumer checks are authoritative.

## Manual UI Confirmation

- Status: pending user
- App URL / route: Foundation Library Overrides plus final Anthracite Storybook/production routes supplied during Apply.
- Required setup or test data: exact release archive, generic fixture, and Anthracite deterministic fixtures.
- Steps for the user: compare Foundation default/custom identity and Anthracite setup/workbench/editor/recovery/Settings/Assistant at desktop and narrow widths.
- Expected result: Foundation remains neutral; Anthracite remains recognizably Anthracite; shared mechanics behave consistently; no package limitation forces product regression or private override.
- Feedback that would change artifacts: guide overfits Anthracite, missing public seam, unwanted visual convergence, wrapper leakage, archive acquisition friction, or insufficient evidence for future-app recommendation.

## Visual Verification Matrix

| Surface / Route or Fixture | Viewport | State / Interaction | Expected Rendered Behavior | Tool / Setup | Inspected Evidence | Console / Network | Result |
|---|---|---|---|---|---|---|---|
| Foundation Library Overrides | 1440x900 and 390x844 | default/custom identity, action, field, notice, portal dialog | Existing public override contract remains clear, accessible, scoped, and overflow-free. | Foundation Storybook/browser | pending | pending | pending |
| Generic release-asset consumer | desktop and constrained | default, wrapper, shell, portaled overlay | Remote archive renders the same public contract as local candidate without source access. | clean consumer/browser | pending | pending | pending |
| Foundation DocumentHeader/EditorToolbar | 1440x900 and 390x844 | idle title trigger, keyboard entry, pending/error edit, Source/Rendered, status/action ordering | Title is interactive only with controlled rename; focus/edit recovery is clear; mode is right-aligned and stays usable without overlap. | Foundation Storybook/browser | planned | planned | planned |
| Anthracite consumer | 1440x900, intermediate, and 390x844 | setup/auth, workbench/tree/editor, recovery, search, Settings/plugins/Assistant, overlays | App identity and behavior remain local while adopted mechanics work across representative states. | Anthracite Storybook/production browser | pending correction release and upgrade | pending | pending |

## Blockers / Open Questions

- Execution blocker: exact tag/GitHub Release/asset creation and upload require separate explicit authorization; only then can the release-asset verifier run.
- Evidence dependency: final S4 R1/R3/R4 claims wait for the coordinated Anthracite implementation and independent review candidate after its deliberate correction-release upgrade.
- Replan completed: required independent opinions satisfied (2/2); no unresolved product, authority, or visual-direction question remains. The correction is planned, not implemented.
- Bounded-phase next action: create and verify the immutable local candidate from the committed source; no remote action is authorized.

## Review Handoff Candidate

- Integration target / merge base: `develop@e4bcbff`.
- Candidate source commit: `23b01e8930f18080c1cf66351feeb46f21e96b13`.
- Source differs from target when implementation changed: expected yes.
- Intended implementation fully committed: required before handoff.
- Unrelated dirty state preserved: repository was clean at planning baseline; recheck before promotion and each commit.
- Commit-sensitive generated-contract / diff / integration checks: exact archive/digest, public exports, clean consumer, package contents, source-to-target inventory, integration tree, immutable Anthracite evidence.
- Verification Scope Decision and aggregate candidate evidence: required and pending.
- Post-gate evidence-only changes classified and affected checks rerun: pending.
- Prospective integration tree and required gate evidence: pending.
- Required risk, fan-out, environment, or verification rows still pending or blocked: remote asset and consumer evidence.
- Pattern parity, boundary contract, and stateful transition matrices reconciled or not applicable with reason: parity/boundary required; stateful owned by Anthracite.
- Capability authority, content-budget/provenance conservation, and filesystem mutation-order proof reconciled or not applicable: release authority/provenance applies; other boundaries not applicable.
- Evidence claims falsified against exact tests, assertions, routes, or observations: required before review.
- Fresh-context failure-seeking passes completed: pending `/sdd-review`.

## Closeout

- Change status: in_progress in the active repository Change; bounded first phase stopped at the verified local candidate.
- Epic files updated: UIF-002 now contains reconciled S3 and partial S4; UIF-001 remains unchanged because no package defect was found.
- Story labels/references and Requirement/Scenario IDs current: planned S4/R1-R4 and scenarios are coherent.
- Implemented By maps current: S4 implementation pending.
- One canonical implementation and verification map per Story: required during Epic update.
- Primary anchors inspected as behavior-owning definitions/registrations rather than incidental occurrences: pending final implementation.
- Scenario-mapped Verified By maps current: pending.
- Superseded earlier Epic truth reconciled: pending S3/candidate updates.
- README/current-state docs and active/closed Change claims reconciled: pending.
- ADR status: Proposed.
- Release communication current: pending implementation/release handoff.
- `sdd-review` verdict: not run.
- Review record: pending.
- `review.md` findings resolved: not applicable yet.
- Planning updates resolved: yes; remote authority and consumer evidence remain explicit execution gates.
- Implementation risk and confirmation rows resolved: pending.
- Pattern parity, boundary contract, and stateful transition rows resolved: pending / pending / not applicable locally.
- Capability authority, content-budget/provenance conservation, and filesystem mutation-order proof resolved: release authority/provenance pending; others not applicable.
- Evidence-claim integrity checked: pending.
- Decision fan-out reconciled: pending implementation.
- Verification environment obligations resolved: local ready; remote/consumer pending.
- Verification Scope Decision current and required candidate gates passed: decision current; gates pending.
- Immutable review handoff candidate: local package candidate `23b01e8930f18080c1cf66351feeb46f21e96b13`; broader Change review remains blocked on remote asset and Anthracite evidence.
- Tested integration candidate matches actual integrated tree, or rerun recorded: pending.
- Manual UI confirmation status: pending user.
- Rendered UI verification status: pending.
- PR / merge state: none; no authorization implied.
- Deferred scope accepted: yes.
- Change moved to `docs/changes/closed/`: no.
