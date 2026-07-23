---
status: in_progress
---
# Tasks: Shareable Importable Library

## Resume Here

- Last completed action: implemented UIF-002/S2-S3, verified Storybook and the exact packed consumer at desktop/mobile widths, and reconciled library guidance plus both ADRs
- Next action: commit the override/release-contract slice, then run aggregate, reverse-traceability, independent review, and final handoff reconciliation
- Active branch/ref: `change/shareable-importable-library@5758a6e` plus the pending S2-S3 slice
- Expected dirty files: public hooks/tests/stories, packed consumer fixture, README/AGENTS/CHANGELOG/library guidance, UIF-001/UIF-002, both ADRs, package guard, and this Change ledger
- Known blockers: npm scope ownership/authentication remains pending for actual publication but does not block local package implementation and verification

## Task Checklist

### 1. Planning Quality

- [x] 1.1 Confirm import-plus-override as the primary adoption model and app-owned wrappers as the consumer boundary.
- [x] 1.2 Split install/import, override/wrapper, and release/upgrade into three user-path-sized UIF-002 Stories.
- [x] 1.3 Define observable happy, default, override, portal, missing-artifact, private-import, upgrade, and no-publication-authority Scenarios.
- [x] 1.4 Record consumer migrations, automatic upgrades, package splitting, non-React targets, and post-1.0 compatibility as deferred scope.
- [x] 1.5 Plan scenario-mapped evidence for package exports, declarations, dependencies, isolated consumption, overrides, and release guards.
- [x] 1.6 Record that no new experience-design pass is needed because current UIF-001 rendering remains the target.
- [x] 1.7 Define rendered proof for default and overridden consumer states at desktop and constrained widths.
- [x] 1.8 Seed package, override, portal, dependency, publication, environment, and aggregate-gate risk obligations.
- [x] 1.9 Set `status: planned` after proposal, design, draft Epic, Proposed ADR, tasks, and scoped validation are coherent.

### 2. Epic Artifacts

- [x] 2.1 Create canonical draft `UIF-002` with S1-S3 and explicit implementation/verification gaps.
- [x] 2.2 During Apply, reconcile UIF-001 Outcome, Deferred Scope, Story titles/narratives, Cross-Story Concerns, gaps, and Completion Criteria without changing stable Requirement/Scenario IDs unnecessarily.
- [x] 2.3 Replace every UIF-002 implementation gap with behavior-owning definitions/configuration and every verification gap with scenario-mapped exact evidence as implementation completes.
- [x] 2.4 Confirm active and closed Change wording is historical rather than a competing current copy-only contract.
- [x] 2.5 Preserve exactly one authoritative Implemented By and Verified By map per Story in both affected Epics.

### 3. Architecture Decisions

- [x] 3.1 Compare compiled package plus wrappers, source/Git dependency, and split-package approaches.
- [x] 3.2 Create Proposed `docs/adrs/2026-07-22-use-versioned-runtime-library-with-app-wrappers.md`.
- [x] 3.3 Accept the new ADR only after package-candidate proof supports it; then mark `2026-07-17-copy-owned-reference-components.md` Superseded and reconcile all links.

### 4. Implementation

- [x] 4.1 Complete and close the overlapping component-catalog Change before promotion; create `change/shareable-importable-library` from current `develop` for implementation.
- [x] 4.2 Implement `UIF-002/S1` through adaptive BDD/TDD slices.
  - [x] R1/R1-S1: build and consume compiled JavaScript, declarations, CSS, and metadata from an exact packed artifact without repository-source access.
  - [x] R1/R1-S2: expose only documented package entry points and reject private source imports.
  - [x] R2/R2-S1: externalize React/React DOM and declare every other runtime dependency used by exports.
  - [x] R3/R3-S1: expose documented complete and lower-level CSS entry points with deliberate global-style opt-in.
- [x] 4.3 Implement `UIF-002/S2` through adaptive BDD/TDD slices.
  - [x] R1/R1-S1-R1-S2: prove custom identity values and safe defaults through the published CSS contract.
  - [x] R2/R2-S1: normalize public root class/style and named-slot hooks without changing semantics.
  - [x] R2/R2-S2: provide explicit portal-safe override hooks for Tooltip, Menu, Dialog, and Sheet surfaces.
  - [x] R3/R3-S1-R3-S2: document and prove app-owned wrappers, local defaults, domain ownership, and deliberate replacement.
- [x] 4.4 Implement `UIF-002/S3` through adaptive BDD/TDD slices.
  - [x] R1/R1-S1-R1-S2: make package contents, exports, declarations, dependencies, and isolated consumer failures deterministic.
  - [x] R2/R2-S1: document the pre-1.0 compatibility policy and consumer-visible upgrade notes.
  - [x] R3/R3-S1: keep registry publication guarded by scope ownership, authentication, explicit authorization, and exact-candidate evidence.
- [x] 4.5 Reconcile package usage, override guidance, AGENTS rules, README, CHANGELOG, package metadata, UIF-001, UIF-002, both ADRs, and Change ledgers.
- [x] 4.6 Update the living parity, boundary, risk, fan-out, and environment records as implementation reveals the actual package surface.
- [ ] 4.7 Commit each coherent, verified, reconciled phase before starting the next under the repository's branch policy.

### 5. Verification

- [x] 5.1 Add exact focused tests for every implemented UIF-002 Scenario and inspect their assertions before mapping them.
- [x] 5.2 Inspect `npm pack --dry-run --json` and the exact archive; confirm only intended public files, docs, and metadata ship.
- [x] 5.3 Install the exact archive into an isolated React 19/Vite 8 consumer without symlinks or source-path imports; typecheck and production-build it.
- [x] 5.4 Exercise default theme, custom identity, root/slot override, WorkbenchShell structural override, app wrapper, and portaled overlay override in the isolated consumer.
- [x] 5.5 Confirm React/React DOM are external and singular in the consumer and all other runtime imports resolve from declared dependencies.
- [x] 5.6 Run existing focused component/pattern tests, accessibility checks, and Storybook rendering to detect packaging-hook regressions.
- [x] 5.7 Directly inspect default and overridden Storybook/consumer rendering at representative desktop and constrained viewports, including console/network state.
- [ ] 5.8 Run the project aggregate package-aware gate on the exact committed candidate and record meaningful test/build/package counts.
- [x] 5.9 Update UIF-001/UIF-002 Verified By maps with exact test titles or stable evidence anchors and truthful gaps.
- [ ] 5.10 Run scoped Change/Epic validation and reverse-traceability inventory before handoff.

### 6. Review And Closeout

- [x] 6.1 Update release communication with install, CSS, wrapper, override, dependency, versioning, and migration consequences.
- [ ] 6.2 Run independent `sdd-review` against the exact source and target commits.
- [ ] 6.3 Resolve review findings and rerun affected package, consumer, behavior, accessibility, and visual evidence.
- [ ] 6.4 Record manual UI confirmation as `pending user`, `user confirmed`, or `accepted gap` after the final default/override walkthrough.
- [x] 6.5 Confirm the new ADR is Accepted or remains Proposed with an explicit blocker; never leave both ADRs Accepted as competing current rules.
- [ ] 6.6 Confirm the exact intended implementation is committed and every required candidate/integration gate applies to that commit.
- [ ] 6.7 Keep Change status and Resume Here aligned through `planned -> in_progress -> in_review`; close only with `sdd change close`.
- [ ] 6.8 Merge to `develop` only after ready review and user authorization; use `/sdd-release` for the version/release PR to `main`.
- [ ] 6.9 Treat actual npm publication as a separate explicitly authorized action after release-candidate proof, scope ownership, authentication, and final version confirmation.

## Implementation Ledger

| Date | Slice | Agent / Guidance | Files / Areas | Result | Commit / Ref |
|---|---|---|---|---|---|
| 2026-07-22 | UIF-002 planning and ADR candidate | main; `sdd-change`, `sdd-adr`, Context7 Vite/npm docs | private Change, draft Epic, Proposed ADR | Planned; implementation not started | repository `develop@b5dda9d` |
| 2026-07-22 | Promotion and implementation readiness | main; `sdd-apply` | closed catalog prerequisite, active Change, UIF-002, Proposed ADR | Promoted, branched, and transitioned to `in_progress` | `09dbcfe` |
| 2026-07-22 | UIF-002/S1 installable artifact | main; `sdd-apply`, `tdd`, `building-components`, Vite/npm primary docs | package manifest, two-pass library build, declarations, package verifier, isolated consumer | Exact archive builds, exposes only public entries, resolves CSS/types, and uses the consumer React runtime | `3736d85` |
| 2026-07-22 | UIF-002/S2 override and wrapper contract | main; `sdd-apply`, `tdd`, `building-components`, `vercel-composition-patterns` | typed root hooks, named slots, portal hooks, package consumer, Storybook comparison, adoption guide | Defaults remain intact; consumer identity, workbench geometry, wrapper replacement, and every overlay surface use bounded public hooks | pending commit |
| 2026-07-22 | UIF-002/S3 release candidate and policy | main; `sdd-apply`, Vite/npm primary docs | package guard, README, AGENTS, CHANGELOG, compatibility guidance, both ADRs, UIF-001/UIF-002 | Candidate remains private and inspectable; upgrade policy is explicit; package ADR accepted and copy-only ADR superseded | pending commit |

## Verification Ledger

| Date | Check | Evidence Type | What It Proves | Result |
|---|---|---|---|---|
| 2026-07-22 | Current Vite 8 library-mode documentation review | primary documentation | Multi-entry library builds, dependency externalization, generated CSS, and package export maps are supported by the installed tool generation. | Planning evidence only |
| 2026-07-22 | Current npm CLI documentation review | primary documentation | `npm pack --dry-run --json` exposes archive contents; public scoped publication requires public access and authenticated release authority. | Planning evidence only |
| 2026-07-22 | Consumer manifest comparison | source inspection | 49th Floor, Anthracite, and Lorecraft intended web clients use React 19 and Vite 8; Base UI 1.6 is already present in two consumers. | Planning evidence only |
| 2026-07-22 | npm registry/package preflight | external operational check | Unscoped `ui-foundations` is occupied; `@taylorhuston/ui-foundations` is not currently published; this machine lacks npm authentication. | Package name assumed; publish environment pending |
| 2026-07-22 | `node scripts/verify-package.mjs` red phase | focused contract test | The verifier detects a missing required public artifact before implementation. | Failed as expected: packed artifact missing `CHANGELOG.md`. |
| 2026-07-22 | `npm run check:package` | exact archive and isolated-consumer gate | Two-pass build, 78-file archive, public export/declaration/CSS resolution, private-import rejection, consumer typecheck/build, and one React/React DOM runtime. | Passed; `@taylorhuston/ui-foundations@0.1.0`, React/React DOM 19.2.8. |
| 2026-07-22 | `npm pack --dry-run --ignore-scripts --json` and built-import inspection | artifact inspection | Archive contains only README, CHANGELOG, manifest, and `dist`; built JS keeps React, Base UI, and Lucide as bare external imports. | Passed. |
| 2026-07-22 | Focused override and existing behavior suites | automated behavior | Root/custom-property/slot hooks, field prop preservation, all four portal surfaces, wrapper replacement, workbench hooks, and unchanged keyboard/focus behavior. | Passed: 5 files, 34 tests after final focused addition. |
| 2026-07-22 | Storybook `Foundations/Library Overrides` browser inspection | rendered UI | Default and Juniper identities remain legible and bounded; app hooks reach the Dialog portal; constrained layout avoids horizontal overflow. | Passed at 1440x900 and 390x844; console clean. |
| 2026-07-22 | Axe WCAG-tagged scan of `Foundations/Library Overrides` | accessibility | Custom identity retains required control/text contrast and semantic structure. | Red-to-green: detected 4.32:1 custom action contrast, darkened the Juniper action scale, then passed with 24 rules, zero violations, zero incomplete checks. |
| 2026-07-22 | Exact packed consumer browser inspection | rendered package UI | The non-symlink archive renders Foundation default, product override, symmetric WorkbenchShell, app wrapper, and portaled Dialog from published files only. | Passed at 1440x900 and 390x844; console clean. |

## Manual Feedback

| Date | Feedback | Classification | Action / Artifact Updates | Status |
|---|---|---|---|---|
| 2026-07-22 | Make UI Foundations a shared library applications import and override. | product/architecture direction | Created UIF-002 plan and Proposed runtime-library ADR; planned UIF-001 reconciliation and app-owned wrapper boundary. | resolved in planning |

## Planning Updates

| Date | Discovery | Classification | Planning Updates | Next Apply Starting Point |
|---|---|---|---|---|
| 2026-07-22 | Existing catalog Change is still active and owns overlapping UIF-001/README/ADR truth. | technical constraint | Added prerequisite closeout and prohibited promotion until the overlapping Change is reconciled. | After catalog closeout, promote and characterize UIF-002/S1 package contract. |
| 2026-07-22 | Unscoped npm name is occupied and local npm is unauthenticated. | technical constraint | Selected `@taylorhuston/ui-foundations` as working name and separated local package proof from authorized publication. | Verify scope ownership before first release publication. |

## Design Updates

| Date | Feedback / Discovery | Classification | Reference / Target | Preserve / Change / Non-Goals | Artifact Updates | Next Apply Starting Point |
|---|---|---|---|---|---|---|
| 2026-07-22 | User selected shared inheritance with local overrides. | experience refinement | Existing UIF-001 Storybook and app-owned variants | Preserve rendering and product ownership; change distribution and supported customization seams; no redesign. | design, UIF-002, ADR | Implement package and override contract after prerequisite closeout. |

## Implementation Risk And Confirmation Matrix

| Requirement / Surface | End-State Invariant | Risk / Failure Mode | Check Or Confirmation Needed | Evidence / Finding | Status |
|---|---|---|---|---|---|
| UIF-002/S1 R1/R3 package artifact | Every documented JS, declaration, and CSS export exists in the archive and resolves without repository source. | Local source or Storybook succeeds while the published archive omits files or leaks private paths. | Inspect exact archive and build isolated non-symlink consumer. | Exact 78-file archive passed required-file/private-path checks and fresh consumer typecheck/build. | resolved |
| UIF-002/S1 R2 runtime dependencies | Consumer supplies one compatible React runtime; all other runtime imports are declared. | Duplicate React, missing Base UI/Lucide runtime, or accidental devDependency reliance. | Inspect bundle imports, manifest, installed tree, and rendered consumer. | React/React DOM are peers and singular at 19.2.8; Base UI/Lucide are runtime dependencies and remain external bare imports. | resolved |
| UIF-002/S2 R1 token override | Defaults remain safe and later consumer semantic values override predictably. | CSS order/specificity prevents identity override or global package CSS overwrites the app. | Default/custom computed-style assertions and rendered inspection. | Default and Juniper scopes render from the same packed CSS/components with localized identity changes. | resolved |
| UIF-002/S2 R2 public hooks | Every materially styled root and portal region has a stable documented hook without exposing CSS Module hashes. | Components have inconsistent class/style support; portals escape ancestor-scoped overrides. | Public-hook inventory, contract tests, portal fixture, Storybook regression. | Typed root props, named slots, and all four overlay portal/surface hooks pass focused and rendered proof. | resolved |
| UIF-002/S2 R3 wrapper boundary | Feature code can depend on app wrappers and locally replace one implementation. | Direct package imports spread through features or package props absorb domain concerns. | Representative wrapper and replacement test/docs; review public prop additions. | Fixture AppButton compiles from the archive; focused test swaps its implementation without changing feature use. | resolved |
| UIF-002/S3 R1/R2 candidate/version contract | An exact commit produces inspectable contents and truthful consumer-facing change notes. | Unreviewed export/token/slot breakage reaches consumers. | Pack check, API/slot/token inventory, changelog and version review. | Deterministic verifier, changelog, and pre-1.0 policy are current; final exact-commit aggregate remains. | resolved |
| UIF-002/S3 R3 publication | No registry mutation occurs without scope ownership, auth, explicit authorization, and verified candidate. | Accidental publish from Apply or wrong package/version. | Dry-run only during implementation; release ledger records authority and exact ref. | Manifest and verifier require `private: true`; no publish occurred; scope/auth/authorization remain publication-only blockers. | resolved |

## Pattern Parity Matrix

This Change adds a packaged consumption surface parallel to current source/Storybook execution, so parity is required.

| Concern | Reference Location / Contract | New Location / Contract | Focused Proof | Intentional Divergence / Gap | Status |
|---|---|---|---|---|---|
| Component semantics, keyboard behavior, focus, disabled/pending state | Current UIF-001 source tests and Storybook | Exact packed consumer | Existing exact behavior tests plus consumer interaction assertions | No behavioral divergence intended. | verified |
| Default visual tokens and responsive geometry | Current UIF-001 Storybook states | Packed default consumer | Computed style, screenshot, overflow, and accessibility inspection | Package import order differs but rendered defaults remain unchanged. | verified |
| Theme and structural override | Current source-level custom properties/slots | Packed overridden consumer | Default/custom identity, WorkbenchShell geometry, and portal override assertions | New supported hooks are intentional additions. | verified |

## Boundary Contract Matrix

The package export, declaration, dependency, CSS, and slot surfaces cross the library-to-consumer boundary and are required.

| Origin Condition | Domain Result / Invariant | Adapter / Transport Mapping | Client Behavior / Retryability | Exact Proof | Status |
|---|---|---|---|---|---|
| Documented JavaScript import | Public export resolves to compiled ESM and matching declarations. | `package.json` exports plus archive paths | Consumer typecheck/build succeeds; private path fails. | Exact archive consumer typecheck/build passed; private import rejected. | verified |
| Documented CSS import | Export resolves to intended complete or lower-level style layer. | CSS export map and archive contents | Consumer controls when global/reset styles load and can override later semantic values. | Complete/lower-level imports resolve and production-build; computed-style override proof remains in S2. | partially verified |
| React component runtime | React identity comes from consumer; other runtime imports are declared. | Peer/runtime dependency metadata and externalized bundle imports | Consumer renders without duplicate React or unresolved module. | Dependency tree reports one React/React DOM runtime; built imports and manifest agree. | verified |
| Public override hook | Semantic token, root prop, named slot, or composition API reaches only the documented region. | Type declaration plus rendered class/data/custom-property output | App wrapper styles default, portal, and structural states without private selectors. | Focused hooks, packed consumer, and Storybook override comparison pass. | verified |

## Stateful Transition Matrix

Not applicable: this Change distributes presentational components and callbacks but does not add editable, durable, autosaving, routed, cached, or asynchronous state ownership. Existing component interaction state remains covered by UIF-001 behavior tests and the parity matrix.

## Decision Fan-Out Ledger

| Date | Decision / Discovery | End-State Consequence | Affected Surfaces To Reconcile | Evidence / Artifact Updates | Status |
|---|---|---|---|---|---|
| 2026-07-22 | Replace copy-only ownership with versioned package plus app wrappers. | Package APIs and styling hooks become maintained compatibility surfaces while apps retain product ownership. | README, AGENTS, package, build, tests, UIF-001, UIF-002, both ADRs, CHANGELOG, active/closed Change wording, consumer follow-up plans. | All current-state surfaces reconciled; closed Change wording retained as historical. | reconciled |
| 2026-07-22 | Use one ESM-first scoped package. | React 19/Vite 8 are the initial support floor; package splitting and CJS are deferred. | Package metadata, build, declarations, consumer fixture, release docs. | Exact archive and clean consumer verified. | reconciled |
| 2026-07-22 | Keep publication separately authorized. | Apply may create and verify archives but cannot publish. | Release guidance, tasks, CI/scripts, final handoff. | Guard Scenario added. | reconciled in plan |

## Verification Environment

| Evidence Obligation | Required Setup / Safety Boundary | Needed For | Current Readiness | Result / Resolution |
|---|---|---|---|---|
| Exact package archive and contents | Local Node 26/npm 11; clean temporary destination; no credentials required | UIF-002/S1, S3 | ready | 78-file exact archive verified locally; rerun on final committed candidate. |
| Isolated React/Vite consumer | Temporary non-workspace install from archive; React 19/Vite 8; browser runtime | UIF-002/S1-S2 | ready | Fresh install, typecheck, and production build passed; browser evidence remains for S2. |
| Storybook default/override rendering | Existing Storybook and browser/accessibility tooling | UIF-001 parity and UIF-002/S2 | ready | Storybook and packed consumer passed desktop/mobile inspection with clean consoles. |
| Public npm publication | Confirmed `@taylorhuston` scope ownership, npm authentication, explicit publish authorization, final version/candidate | UIF-002/S3/R3 release operation | pending | Not required for implementation handoff; required before actual publish. |

## Verification Scope Decision

- Project-defined aggregate command or authoritative constituent source: extend `npm run check:all` so the aggregate includes CSS checks, typecheck, focused tests, library build, package contract/pack consumer check, and static Storybook build.
- Aggregate gate required before `in_review`: yes.
- Trigger or project-policy reason: public package exports, dependency contract, generated distribution, and all existing UI components create cross-capability integration risk.
- Exact committed source candidate: pending Apply.
- Freshness and cache treatment: rebuild `dist`, create a fresh archive, install into a fresh isolated consumer, and run all aggregate constituents without reusing workspace links or stale package output.
- Aggregate result and meaningful execution/count evidence: pending.
- Post-gate evidence-record-only changes and affected checks rerun: pending classification during Apply.
- Prospective integration gate required: yes; run the package-aware aggregate against the exact `change/*` plus `develop` integration tree before merge when it differs from source.
- Current target and prospective integration tree/ref: `develop`; exact refs pending Apply.
- Integration-candidate result or reason source proof is reusable: pending.
- Remote CI role: corroborating unless repository release policy later makes a check required.

## Manual UI Confirmation

- Status: pending user
- App URL / route: final UI Foundations Storybook and isolated consumer fixture route determined during Apply
- Required setup or test data: built exact archive installed into the isolated consumer; default and custom identity configurations
- Steps for the user: compare representative controls, overlay, file tree, editor/workbench, and recovery states under default styling; switch to the custom identity/geometry example; confirm local wrapper copy and deliberate override remain understandable
- Expected result: defaults look unchanged, overrides affect only documented semantic regions, interactions remain accessible, and the examples make clear that product behavior remains app-owned
- Feedback that would change artifacts: any need for deeper internal selectors, missing portal/structural hook, changed default rendering, confusing wrapper ownership, or pressure to move domain behavior into the package

## Visual Verification Matrix

| Surface / Route or Fixture | Viewport | State / Interaction | Expected Rendered Behavior | Tool / Setup | Inspected Evidence | Console / Network | Result |
|---|---|---|---|---|---|---|---|
| Controls and feedback catalog | 1440x900 and 390x844 | default, disabled, pending, invalid, custom identity | Default appearance is preserved; semantic override changes intended values without overlap or inaccessible contrast. | Storybook plus isolated consumer | Default and Juniper panels directly inspected; focused state tests pass. | Clean | passed |
| Dialog, Sheet, Menu, Tooltip | 1440x900 and 390x844 | closed, open, keyboard focus/dismissal, portal override | Portal surface receives supported override; focus and dismissal remain intact. | Storybook plus isolated consumer | Dialog directly inspected in both environments; all four portal hooks and existing interactions pass focused tests. | Clean | passed |
| FileTree and Inspector Workbench | 1440x900 and 390x844 | selected/expanded, default geometry, custom structural properties, constrained layout | Tree behavior and shell geometry remain correct; supported structural override does not create overflow. | Storybook plus isolated consumer | Packed shell shows symmetric desktop occupancy and mobile side-region handoff; workbench tests pass. | Clean | passed |
| Document Editing and Recovery | 1440x900 and 390x844 | mode, rename, dirty/saved/error/read-only, long content | Existing text-first actions, status semantics, alignment, and recovery remain unchanged after packaging hooks. | Storybook | Existing catalog tests and static Storybook build pass after hooks. | Clean | passed |

## Blockers / Open Questions

- Prerequisite resolved: `2026-07-17-scaffold-component-pattern-catalog` is closed and committed.
- Publication-only: confirm `@taylorhuston` npm scope ownership and authenticate the release environment.

## Review Handoff Candidate

- Integration target / merge base: `develop`; exact commit pending Apply.
- Candidate source commit: pending.
- Source differs from target when implementation changed: expected yes.
- Intended implementation fully committed: pending.
- Unrelated dirty state preserved: required in repository and vault.
- Commit-sensitive generated-contract / diff / integration checks: clean package rebuild, archive contents, exports/declarations, consumer install/build, bundle externalization, prospective integration aggregate.
- Verification Scope Decision and aggregate candidate evidence: pending.
- Post-gate evidence-only changes classified and affected checks rerun: pending.
- Prospective integration tree and required gate evidence: pending.
- Required risk, fan-out, environment, or verification rows still pending or blocked: all implementation rows pending.
- Pattern parity, boundary contract, and stateful transition matrices reconciled or not applicable with reason: parity/boundary pending; stateful not applicable.
- Capability authority, content-budget/provenance conservation, and filesystem mutation-order proof reconciled or not applicable: capability/content/filesystem mutation boundaries not applicable; package publication authority is governed by UIF-002/S3/R3.
- Evidence claims falsified against exact tests, assertions, routes, or observations: pending independent review.
- Fresh-context failure-seeking passes completed: pending independent review.

## Closeout

- Change status: planned private draft.
- Epic files updated: draft UIF-002 created; UIF-001 update pending Apply.
- Story labels/references and Requirement/Scenario IDs current: planned and validated.
- Implemented By maps current: UIF-002 gaps intentionally unimplemented; UIF-001 current implementation maps remain authoritative.
- One canonical implementation and verification map per Story: yes in draft UIF-002; preserve during Apply.
- Primary anchors inspected as behavior-owning definitions/registrations rather than incidental occurrences: pending implementation.
- Scenario-mapped Verified By maps current: not implemented/verified yet.
- Superseded earlier Epic truth reconciled: planned, not yet applied.
- README/current-state docs and active/closed Change claims reconciled: pending Apply after prerequisite closeout.
- ADR status: new ADR Proposed; copy-owned ADR remains Accepted until verified supersession.
- Release communication current: pending implementation.
- `sdd-review` verdict: not started.
- Review record: none.
- `review.md` findings resolved: not applicable yet.
- Planning updates resolved: yes; operational publish confirmation remains explicit.
- Implementation risk and confirmation rows resolved: pending.
- Pattern parity, boundary contract, and stateful transition rows resolved: pending / pending / not applicable.
- Capability authority, content-budget/provenance conservation, and filesystem mutation-order proof resolved: not applicable except explicit publication authority.
- Evidence-claim integrity checked: pending.
- Decision fan-out reconciled: pending Apply.
- Verification environment obligations resolved: local environments ready; publication environment pending.
- Verification Scope Decision current and required candidate gates passed: decision current; gates not run.
- Immutable review handoff candidate: none.
- Tested integration candidate matches actual integrated tree, or rerun recorded: pending.
- Manual UI confirmation status: pending user after implementation.
- Rendered UI verification status: pending.
- PR / merge state: not started.
- Deferred scope accepted: yes.
- Change moved to `docs/changes/closed/`: no; private plan not promoted.
