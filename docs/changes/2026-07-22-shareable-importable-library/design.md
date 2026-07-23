# Design: Shareable Importable Library

## Context

UI Foundations 0.1.0 is a public repository but a private npm package. Its manifest exposes CSS source paths only, React references are not package exports, TypeScript is configured for no emit, and application adoption is explicitly copy-owned. The accepted copy-owned ADR, README, UIF-001, and the active component-catalog Change all reinforce that boundary.

The source has nevertheless developed several package-ready traits: semantic custom properties, TypeScript APIs, CSS Modules, Storybook states, focused tests, stable slots on newer workbench surfaces, and application-neutral callbacks. Current intended consumers—49th Floor, Anthracite, and Lorecraft—use React 19 and Vite 8; two already use Base UI 1.6. The main gaps are compiled distribution, a complete public override contract, dependency/peer ownership, package-candidate verification, and compatibility/release discipline.

The existing `2026-07-17-scaffold-component-pattern-catalog` Change is still `in_progress` and touches UIF-001, README, and the copy-owned ADR. It must complete review, manual disposition, and closeout before this Change is promoted so implementation does not create competing truth over the same surfaces.

Current documentation confirms that Vite 8 library mode supports single or multiple entry points, dependency externalization, generated CSS naming, and package export maps. Current npm CLI behavior supports archive-content inspection through `npm pack --dry-run --json`; scoped packages require public access configuration, and actual publication requires registry authentication and a separately authorized release action.

## Goals / Non-Goals

**Goals:**

- Produce one installable, compiled, typed, ESM-first package for the existing UIF-001 styles, components, and patterns.
- Give consumers explicit public entry points instead of repository-source imports.
- Make override behavior intentional, documented, scoped, portal-safe, and testable.
- Preserve application identity and application-owned behavior through semantic values, composition, and local wrappers.
- Keep React runtime ownership with consumers and make all other runtime dependencies complete and inspectable.
- Prove the actual packed artifact in an isolated supported consumer before any publication decision.
- Establish versioning, changelog, and release guardrails for deliberate consumer upgrades.
- Reconcile the current copy-only Epic, README, repository guidance, and ADR truth.

**Non-Goals:**

- Migrate any application to the package within this Change.
- Publish automatically or treat Apply, commit, push, release preparation, and registry publication as the same authority.
- Own consumer data, routing, authorization, persistence, editor behavior, responsive navigation state, or domain workflows.
- Support arbitrary internal DOM styling, generated CSS Module class names, broad descendant overrides, or a utility-class API.
- Add Tailwind, a CSS-in-JS runtime, a new design direction, light mode, or product branding.
- Split the library into several packages before consumer evidence justifies independent versioning.
- Guarantee React 18, CommonJS, React Native, or non-Vite consumers in the first pre-1.0 release.

## Planning Interview / Story Refinement

- Scope boundary reviewed: this Change owns package distribution, supported override seams, release-candidate proof, and durable ownership docs; consuming-app migrations are separate Changes.
- User decisions: move from copy-first adoption to an import-and-override library; preserve application-level wrappers and divergence.
- Assumptions: current intended consumers remain React 19/Vite 8 during this Change; `@taylorhuston/ui-foundations` is the working public name; npm authentication is not currently configured on this machine.
- Deferred scope: real app migrations, automatic upgrades, codemods, package splitting, framework adapters, non-web targets, and post-1.0 compatibility policy.
- Story boundaries challenged: installation/import, override/wrapper use, and release/upgrade are distinct outcomes with distinct actors and evidence, so three Stories are warranted.
- Requirements refined: packed artifact independence, private-import rejection, peer dependency ownership, explicit CSS layers, default and custom themes, root and portal slot hooks, app wrapper replacement, archive inspection, compatibility communication, and guarded publication.
- Scenario gaps considered: absent overrides, private imports, missing artifacts/dependencies, portaled content, deliberate consumer divergence, missing auth/authority, and consumer version pinning.
- Open questions that block implementation: none. Package-scope ownership is a release-environment confirmation obligation rather than a technical planning blocker.

## Epic Changes

### Create Epic: UIF-002 Library Distribution And Overrides

- Proposed directory: `docs/epics/uif-002-library-distribution-and-overrides/`
- Proposed file: `docs/epics/uif-002-library-distribution-and-overrides/epic.md`
- Supporting package-contract evidence may later live beside `epic.md` when durable and public.

#### Epic

UIF-002 owns how applications install, override, and deliberately upgrade UI Foundations. It does not duplicate UIF-001's authority over visual roles, component interaction behavior, or workbench composition.

#### Story S1: Install And Import The Versioned Library

As an application developer, I want to install and import UI Foundations as a versioned dependency, so that I can use its tested defaults without copying repository source.

- `R1` requires a compiled JavaScript, declaration, CSS, and metadata artifact that works without repository access and does not expose private imports.
- `R2` requires consumer-owned React peers and complete declared runtime dependencies.
- `R3` requires documented opt-in CSS entry points.

##### Implemented By

Not implemented yet.

##### Verified By

Not verified yet.

##### Verification Gaps

- All UIF-002/S1 Scenarios remain unverified until the packed artifact succeeds in an isolated consumer.

#### Story S2: Override Foundations Without Patching Internals

As an application developer, I want supported override seams around imported foundations, so that my application can retain its identity and product-specific behavior without forking the package.

- `R1` requires semantic custom-property overrides and safe defaults.
- `R2` requires root and stable named-slot hooks, including portal-safe overlay surfaces.
- `R3` requires documented app-owned wrappers and deliberate replacement without package patches.

##### Implemented By

Not implemented yet.

##### Verified By

Not verified yet.

##### Verification Gaps

- All UIF-002/S2 Scenarios remain unverified until the isolated consumer proves default, themed, normal component, workbench, and portaled override cases.

#### Story S3: Prepare And Upgrade A Library Release

As a library maintainer, I want an inspectable and versioned release contract, so that consuming applications can choose when and how to upgrade.

- `R1` requires deterministic packed-content, export, declaration, dependency, and consumer checks.
- `R2` requires documented pre-1.0 compatibility and consumer-visible changelog communication.
- `R3` requires publication to stop without ownership, authentication, explicit authorization, and verified candidate evidence.

##### Implemented By

Not implemented yet.

##### Verified By

Not verified yet.

##### Verification Gaps

- All UIF-002/S3 Scenarios remain unverified; actual registry publication is not authorized by this plan.

### Update Epic: UIF-001 Copyable Interface Foundations

- Target Epic: `docs/epics/uif-001-copyable-interface-foundations/epic.md`
- Change Type: modified adoption and ownership scope; existing interaction behavior remains intact.

#### Story Changes

- Added: none.
- Modified: rename/reword S1-S4 to remove copy-only adoption assumptions while preserving Requirement and Scenario IDs and current behavior/evidence maps.
- Removed: copy-only language from Outcome, Deferred Scope, Cross-Story Concerns, and Completion Criteria.

#### Supersedes / Reconciles

- Earlier wording superseded: UIF-001 Outcome and S1-S4 narratives that prohibit runtime package ownership.
- Story states and evidence: current implemented/verified states remain unless package-hook work changes behavior; existing maps must be augmented only where implementation actually changes ownership or proof.
- Closed or active artifacts: the active component-catalog Change must close before promotion; closed Changes remain historical but must not be presented as current distribution authority.
- Manual confirmation: the existing catalog Change's pending manual status must be resolved independently before this Change begins.

## Epic File Rules

- UIF-002 has exactly one implementation and one verification map per Story.
- UIF-001 Requirement and Scenario IDs remain stable unless implementation reveals a real behavior change.
- UIF-001 continues to own component behavior; UIF-002 maps package build, public contract, overrides, and release behavior.
- Generated package files are never primary behavior owners unless their generator or package configuration is mapped as the governing definition.
- Automated evidence must use exact test titles or stable named anchors after implementation.

## Technical Options

### Option 1: Compiled Package With App-Owned Wrappers

- Summary: build one scoped ESM package, expose explicit React and CSS entry points, and require consumers to adapt through local wrappers and documented override seams.
- User impact: shared fixes arrive through deliberate upgrades; each app retains its own identity and product behavior.
- Implementation complexity: moderate; requires build output, declarations, export maps, override normalization, and package-candidate tests.
- Reversibility: high at the application boundary because wrappers can replace shared components locally.
- Client surfaces: React 19 web applications, Vite 8 consumer builds, Storybook, package registry/archive.
- API / contract shape: TypeScript props, semantic CSS variables, root styling props, stable `data-slot` or equivalent slot hooks, explicit CSS entry points, and package subpath exports.
- Frontend/backend boundary: frontend only; no backend or data contract.
- Data / schema impact: none.
- Auth / security impact: registry authentication is required only for actual publication; package must exclude private planning and secrets.
- Testability: strong through package archive inspection and isolated consumer builds plus existing behavior/Storybook gates.
- Operational risk: compatibility and release mistakes can affect several consumers, but installed versions remain pinned until upgraded.
- Fit with project conventions: preserves semantic props, CSS Modules, native CSS, Base UI, no Tailwind, and independent app ownership.

### Option 2: Source Or Git Dependency

- Summary: expose TSX and CSS Modules directly and let each consumer compile repository source from a Git URL or workspace path.
- User impact: faster initial setup but build behavior depends on consumer tooling and repository layout.
- Implementation complexity: low in this repository, high and repeated across consumers.
- Reversibility: moderate.
- Client surfaces: only consumers willing to transpile package source and process package CSS Modules.
- API / contract shape: private source layout becomes de facto public API.
- Frontend/backend boundary: frontend only.
- Data / schema impact: none.
- Auth / security impact: Git access and commit pinning replace registry release controls.
- Testability: weaker because symlinks and local paths can hide missing published files or dependency declarations.
- Operational risk: consumer-specific bundler failures and accidental imports of internal source.
- Fit with project conventions: conflicts with the goal of a clean shareable artifact and explicit override contract.

### Option 3: Separate Style, Primitive, And Pattern Packages

- Summary: version CSS, low-level controls, and compositional patterns independently.
- User impact: narrow installs but more version choices and compatibility combinations.
- Implementation complexity: high for a small pre-1.0 library.
- Reversibility: moderate after consumers adopt cross-package imports.
- Client surfaces: same React applications with several package dependencies.
- API / contract shape: several manifests, export maps, peer contracts, and release trains.
- Frontend/backend boundary: frontend only.
- Data / schema impact: none.
- Auth / security impact: larger publication and supply-chain surface.
- Testability: requires a compatibility matrix across packages.
- Operational risk: release coordination outweighs current consumer scale.
- Fit with project conventions: premature until independent adoption patterns justify the split.

## Selected Approach

Select Option 1. Keep one package with the working name `@taylorhuston/ui-foundations`. Build compiled ESM and TypeScript declarations into `dist`; expose a deliberate root/components/patterns API plus explicit complete and lower-level CSS entry points. The final entry-point granularity should minimize accidental public surface while allowing tree-shaking and stable imports; consumers must never import `src/`.

Use Vite 8 library mode for the distributable JavaScript/CSS build and TypeScript declaration emit for public types. Externalize React and React DOM and declare them as compatible peers. Keep Base UI and any icon package imported directly by exported runtime code as declared runtime dependencies unless implementation removes those imports. Mark CSS as a package side effect so consumer optimization cannot discard required styles.

CSS is opt-in and ordered. The package exposes the complete Foundation stylesheet plus supported token/global/primitive layers. Packaged component CSS is generated and exposed through the documented complete component-style entry point; React imports do not silently install global reset behavior.

Normalize exported components around a supported override contract:

1. semantic global tokens and documented component custom properties for values and geometry;
2. a root `className` and `style` seam where the component has a meaningful rendered root;
3. stable named slots for materially styled subregions;
4. portal-safe hooks for Tooltip, Menu, Dialog, and Sheet surfaces;
5. composition props and app-owned wrappers for product defaults and behavior.

Do not expose generated CSS Module class names, arbitrary internal markup, or a broad low-level style-prop matrix. Consumer documentation must show feature code importing local wrappers, not sprinkling package imports across domain features. A consumer may replace one wrapper with local implementation when shared behavior no longer fits.

Before publication, build a real archive, inspect it, and install it into an isolated consumer without workspace links or repository source access. The consumer must typecheck, build, render representative normal and portaled components, apply an identity override, apply a structural override, and demonstrate a local wrapper. Actual npm publication occurs only through a separately authorized release action after registry scope/authentication and exact-candidate evidence are confirmed.

## Experience Design

- Applicability: no new visual direction; component contract evidence is required.
- Confirmed direction: preserve the current UIF-001 rendering and accessibility behavior while adding supported override seams.
- User confirmation: the user selected shared import plus app-owned overrides after comparing it with copy ownership.
- Reference artifacts: current UI Foundations Storybook and cross-app comparison catalog.

### User Flow And Information Architecture

Consumer documentation should lead with install, required CSS import, local theme values, and an app-owned wrapper. Advanced slot overrides and deliberate replacement follow after the default path. Registry publication instructions remain maintainer-only.

### Responsive Composition

No responsive behavior changes are intended. Existing UIF-001 desktop/mobile Storybook states remain the rendering contract; the isolated consumer covers representative desktop and constrained states.

### Component And State Contract

Override work must preserve default, hover, focus, active, disabled, pending, invalid, open, selected, expanded, read-only, recovery, and constrained behavior where applicable. Public hooks must target semantic regions rather than internal source structure.

#### Component Strategy

| Component Or Pattern | Strategy | Initial Owner Or Reference | Required Preview States | Follow-Up |
|---|---|---|---|---|
| Tokens, globals, primitive recipes | adopted reference | UIF-001/S1 | default identity, one custom identity, focus, reduced motion | Promote their CSS entry points into the package contract. |
| Button, fields, feedback, selection primitives | adopted reference | UIF-001/S2-S3 | default, overridden, disabled/pending/invalid/selected as applicable | Add consistent public root hooks without changing semantic behavior. |
| Dialog, Sheet, Menu, Tooltip | adopted reference | UIF-001/S3 | closed/open, focus, dismissed, portal override | Add explicit portal-safe hooks and retain Base UI behavior. |
| TreeView and workbench/editor patterns | adopted reference | UIF-001/S4 | default, selected, expanded, collapsed, recovery, constrained, structural override | Keep app behavior in wrappers and expose only stable structural slots/properties. |
| App-owned consumer wrappers | application-specific | each consuming application | local defaults, local composition, deliberate replacement | Consumer migrations require separate Changes. |

### Accessibility And Interaction

Supported style overrides must not remove accessible names, semantic state, visible focus, touch targets, live-region intent, focus restoration, or keyboard navigation. The consumer fixture and Storybook regressions must prove both default and overridden states. Unsafe freedom to replace internal interactive elements is not part of the public override API.

### Visual Direction

No visual redesign. The default profiles and current component/pattern appearance remain unchanged except for corrections required to make documented hooks consistent.

### Open Design Questions

- None. `/sdd-design` is not required because the accepted visual and interaction direction remains unchanged.

## Client And API Boundary

- Current clients: UI Foundations Storybook and source-based references; intended package consumers are 49th Floor, Anthracite, and Lorecraft React web applications.
- Plausible future clients: other React 19 web applications and component-preview environments.
- Reusable product capabilities: semantic styling, controls, accessible interaction primitives, feedback, navigation, workbench, and editor-chrome presentation.
- API or typed contract: package export map, generated declarations, public React props, semantic custom properties, stable named slots, CSS entry points, peer/runtime dependency ranges, and documented pre-1.0 compatibility policy.
- OpenAPI plan, if HTTP-facing: not applicable.
- Backend platform exposed directly to clients?: no backend exists in this repository.
- Client-specific presentation or local state: local wrappers, identity values, data, routing, authorization, persistence, domain callbacks, mobile navigation, editors, and deliberate replacements remain app-owned.
- Rationale: the package centralizes generic behavior while the wrapper seam prevents cross-repository runtime reuse from becoming product architecture ownership.

## Alternatives Considered

- Continue copy ownership: rejected because the user now prefers versioned shared fixes and explicit overrides.
- Publish source directly: rejected because it leaks internal layout and makes each consumer responsible for transpilation and CSS Module compatibility.
- Split packages immediately: rejected because current scale does not justify multiple compatibility and release surfaces.
- Automatically import all global CSS from the JavaScript entry: rejected because consumers should opt into reset/global effects deliberately.

## Why This Approach

It provides the consistency and centralized fixes the user wants while retaining the strongest useful property of the copy model: applications still have a local ownership boundary. One compiled package is simple enough for the current scale; explicit export and override contracts prevent implementation details from becoming accidental API; packed-consumer proof tests what users will actually install rather than what succeeds inside the source repository.

## ADRs

- Required: yes
- ADR path: `docs/adrs/2026-07-22-use-versioned-runtime-library-with-app-wrappers.md`
- Decision summary: use one versioned ESM-first runtime package consumed behind app-owned wrappers; override only through documented semantic and slot contracts; publish only through explicit release authority.
- Reconsider when: consumers need incompatible runtimes, app-specific configuration overwhelms the shared API, upgrades cost more than copying, or independent adoption justifies package splitting.
- Supersession: accept the new ADR and mark `docs/adrs/2026-07-17-copy-owned-reference-components.md` Superseded only after implementation and package-candidate verification support the new decision.

## Implementation Constraints

- Finish and close `2026-07-17-scaffold-component-pattern-catalog` before promotion or implementation because it owns overlapping UIF-001, README, and ADR truth.
- Implement on `change/shareable-importable-library` from current `develop`; merge to `develop` only after SDD review and required user confirmation.
- Preserve all current UIF-001 behavior and scenario evidence unless a public-hook change genuinely alters behavior.
- Keep the library dependency-free at the CSS layer and free of Tailwind, utility matrices, CSS-in-JS runtime, application data, or product-specific language.
- Do not publish source-only TSX/CSS Modules as the consumer contract.
- Do not bundle React or React DOM.
- Do not leave runtime imports in devDependencies only.
- Do not ship tests, Storybook output, comparison reports, private planning, credentials, local state, or unrelated source artifacts in the package archive.
- Do not publish to npm without explicit current authorization, confirmed scope ownership, authentication, and exact-candidate evidence.
- Preserve unrelated dirty state in both the public repository and private vault.

## Verification Strategy

- Focused automated tests: public export resolution; private path rejection; declaration resolution; CSS entry-point existence; runtime dependency completeness; React externalization; default and overridden token behavior; root/slot/portal hook behavior; wrapper replacement; failure when a public artifact is absent.
- Broad supporting gates: `npm run check:all` expanded to include the library build and package-contract check; existing TypeScript, Vitest, CSS/no-Tailwind checks, and static Storybook build continue to pass.
- Deterministic E2E: install the exact packed archive into an isolated React 19/Vite 8 consumer without workspace links; typecheck, production-build, render, and inspect normal, workbench, and portaled components under default and overridden themes at desktop and constrained widths.
- Live-provider or external-service playtests: npm registry dry-run and actual publish are operational release evidence, not implementation proof; actual publication remains separately authorized.
- Manual UI confirmation: pending user after the final Storybook and isolated-consumer rendering preserve default appearance and demonstrate the override examples.
- Debug/log inspection: inspect `npm pack --dry-run --json`, built bundle imports, declaration/export resolution, consumer dependency tree, browser console, and network output.
- Artifact validation: scoped Change, UIF-001, and UIF-002 validation plus reverse-traceability classification of build configuration, generated-output handling, package-contract tests, and docs.

## Decisions

- Use one scoped package rather than several packages.
- Use the working name `@taylorhuston/ui-foundations`; confirm scope access before publishing.
- Publish compiled ESM and declarations, not repository source.
- Support React 19 first and externalize React/React DOM as peers.
- Keep global CSS opt-in and expose documented style layers.
- Treat semantic custom properties, root styling props, stable named slots, portal hooks, and composition as the only supported override mechanisms.
- Require app-owned wrappers as the consumer boundary.
- Keep public publication separate from Apply and ordinary Git operations.

## Risks / Trade-Offs

- The current components are inconsistent about `className`, `style`, and slot hooks; normalizing them can accidentally change DOM or interaction behavior.
- Portaled overlay content cannot rely on ancestor-scoped CSS alone and therefore needs an explicit public hook design.
- A single CSS bundle is simple but may ship unused component styles; splitting CSS per component would create more compatibility surface and is deferred until bundle evidence warrants it.
- Public slots and CSS variables become compatibility promises and must be changed deliberately.
- ESM-only and React 19 support narrow the first consumer set but match current intended applications and reduce premature compatibility work.
- Registry scope ownership is not yet confirmed and this machine is not authenticated; implementation can prove the archive locally, but the first publication may remain blocked until the user completes npm setup and explicitly authorizes publish.
- Existing applications may have intentionally diverged from copied source; separate migration Changes must compare behavior instead of replacing local code mechanically.
