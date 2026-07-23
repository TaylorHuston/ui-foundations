---
status: in_progress
---
# Tasks: Scaffold Component Pattern Catalog

## Resume Here

- Last completed action: implemented and verified the cross-spike editor work-surface reference at desktop and mobile widths
- Next action: request user review of Document Editing and Editor Recovery, then run independent `sdd-review` when an immutable commit candidate is authorized
- Active branch/ref: `main` working tree; no Git history mutation authorized for this refinement
- Expected dirty files: Change, Epic, ADR, README, package metadata, and new `src/` references
- Known blockers: none

## Component Strategy

- All new components and patterns remain `reference candidate` maturity in UI Foundations.
- Their Storybook stories provide the prototype stage; app-owned adoption and real-application validation remain future evidence, not blockers for this Change.
- Do not describe the candidate APIs as standardized until consumer evidence supports promotion.

## Task Checklist

### 1. Planning Quality

- [x] 1.1 Confirm the catalog scope and copy-owned boundary.
- [x] 1.2 Keep behavior primitives and workbench compositions as two capability-sized Stories.
- [x] 1.3 Define observable overlay, selection, navigation, editor, confirmation, empty, and layout Scenarios.
- [x] 1.4 Defer light mode, application integration, and advanced shell behavior explicitly.
- [x] 1.5 Plan scenario-mapped focused evidence and broad supporting gates.
- [x] 1.6 Record why existing Foundation direction makes a separate design convergence pass unnecessary.
- [x] 1.7 Set `status: planned` after artifacts are coherent.

### 2. Epic Artifacts

- [x] 2.1 Promote candidate `behavior-heavy-primitives` into `UIF-001/S3`.
- [x] 2.2 Promote candidate `workbench-patterns` into `UIF-001/S4`.
- [x] 2.3 Reconcile Current Scope, Deferred Scope, Candidate Stories, Story Index, evidence maps, and cross-Story concerns.

### 3. Architecture Decisions

- [x] 3.1 Compare Base UI wrappers with hand-rolled behavior.
- [x] 3.2 Reuse the accepted copy-owned reference ADR rather than duplicate it.
- [x] 3.3 Update the ADR's related Stories and validation evidence after implementation.

### 4. Implementation

- [x] 4.1 Implement `UIF-001/S3/R1`: Tooltip, Dialog, Sheet, and Menu overlay references.
- [x] 4.2 Implement `UIF-001/S3/R2`: Tabs, Checkbox, and Switch selection references.
- [x] 4.3 Implement `UIF-001/S4/R1`: FileBrowser disclosure, selection, optional flat-result search, and empty state.
- [x] 4.4 Implement `UIF-001/S4/R2`: EditorToolbar Source/Rendered mode and consumer-owned slots.
- [x] 4.5 Implement `UIF-001/S4/R3`: ConfirmationDialog and EmptyState compositions.
- [x] 4.6 Implement `UIF-001/S4/R4`: ThreePaneShell desktop composition and constrained-width reflow.
- [x] 4.7 Update component and pattern exports plus README catalog documentation.
- [x] 4.8 Add cross-app `Sheet`, `NavigationRail`, `OperationStatus`, and `InlineNotice` candidates without importing application routing or state machines.
- [x] 4.9 Add inspector-capable `WorkbenchShell` with controlled optional side regions, exact desktop symmetry, stable and available content anchors, and a mobile handoff boundary.
- [x] 4.10 Extract generic TreeView behavior and compose FileTree/FileBrowser with one roving Tab stop and hierarchical keyboard navigation.
- [x] 4.11 Expose stable WorkbenchShell region slots and retain a thin rail-to-navigation divider within the shared surface.
- [x] 4.12 Implement `UIF-001/S4/R2-S1`: text-first SegmentedControl and composable EditorToolbar mode control.
- [x] 4.13 Implement `UIF-001/S4/R2-S2`: controlled DocumentHeader inline filename editing with visible text actions.
- [x] 4.14 Implement `UIF-001/S4/R2-S3`: canonical save, recovery, read-only, and literal-source compositions using existing feedback references.
- [x] 4.15 Implement `UIF-001/S4/R2-S4`: EditorSurface region slots and alignment variables without an editor-engine dependency.

### 5. Verification

- [x] 5.1 Add focused tests mapped to every S3 Requirement and Scenario.
- [x] 5.2 Add focused tests mapped to every S4 Requirement and Scenario.
- [x] 5.3 Run `npm run check:all`.
- [x] 5.4 Inspect representative Storybook stories with Playwright for interaction, visible focus, overlap, and horizontal overflow.
- [x] 5.5 Run accessibility checks against representative primitive and pattern stories.
- [x] 5.6 Update Epic `Implemented By`, `Verified By`, and `Verification Gaps` with current evidence.
- [x] 5.7 Run scoped Change and Epic validation.
- [x] 5.8 Rerun focused and broad verification for the TreeView/FileTree and shell contract refinement.
- [x] 5.9 Add focused evidence for every refined S4/R2 Scenario.
- [x] 5.10 Render and inspect editor reference states at desktop and mobile widths.
- [x] 5.11 Rerun broad, accessibility, scoped validation, and reverse-traceability gates for the editor refinement.

### 6. Review And Closeout

- [ ] 6.1 Run independent `sdd-review` and reconcile any findings.
- [ ] 6.2 Record manual UI confirmation as `pending user`, `user confirmed`, or `accepted gap`.
- [x] 6.3 Confirm README release communication is current.
- [x] 6.4 Confirm Change status and ledgers agree before any merge or close request.

## Implementation Ledger

| Date | Slice | Agent / Guidance | Files / Areas | Result | Commit / Ref |
|---|---|---|---|---|---|
| 2026-07-17 | `UIF-001/S3-S4` planning | main; `sdd-change`, `building-components` | planned Change artifacts | Ready for promotion | uncommitted |
| 2026-07-17 | `UIF-001/S3` behavior primitives | main; Base UI 1.6 | `src/components/`, package metadata | Six functional references, stories, and focused tests | uncommitted |
| 2026-07-17 | `UIF-001/S4` workbench patterns | main; `building-components` | `src/patterns/` | Five functional compositions, stories, and focused tests | uncommitted |
| 2026-07-17 | Epic and release truth | main; SDD doctrine | Epic, ADR, README, Change artifacts | Source and evidence maps reconciled | uncommitted |
| 2026-07-19 | Cross-app candidate extraction | main; `ui-ux-pro-max`, `building-components` | Sheet, NavigationRail, OperationStatus, InlineNotice, stories, tests | Four app-evidenced references added while preserving consumer-owned routing and recovery logic | uncommitted |
| 2026-07-22 | Inspector-capable shell refinement | main; `ui-ux-pro-max`, `building-components` | WorkbenchShell, workbench story, tests, docs, CSS guardrails | Optional side regions, exact side symmetry, stable readable content, mobile handoff, and explicit no-Tailwind enforcement added | uncommitted |
| 2026-07-22 | Anthracite-aligned navigation refinement | main; `ui-ux-pro-max`, `building-components` | TreeView, FileTree/FileBrowser, WorkbenchShell, stories, tests, docs | Accessible hierarchical keyboard behavior, inspectable shell regions, and the rail/sidebar divider promoted from real-app evidence | uncommitted |
| 2026-07-22 | Cross-spike editor work surface | main; `building-components`, `tdd` | SegmentedControl, DocumentHeader, EditorToolbar, EditorSurface, stories, tests, docs | Text-first modes and actions, controlled renaming, aligned editor slots, and canonical save/recovery states added without adopting an editor engine or persistence contract | uncommitted |

## Verification Ledger

| Date | Check | Evidence Type | What It Proves | Result |
|---|---|---|---|---|
| 2026-07-17 | Planned Change validation | artifact validation | S3/S4 plan is structurally coherent before promotion | Passed, 0 errors / 0 warnings |
| 2026-07-17 | `npm run check:all` | broad supporting gate | CSS contract, TypeScript, 20 tests, and Storybook static build | Passed |
| 2026-07-17 | Focused component and pattern tests | focused automated test | Every S3/S4 Requirement has mapped behavioral evidence | 20 tests passed |
| 2026-07-17 | Playwright desktop/mobile catalog sweep | deterministic browser evidence | Seven stories have no horizontal overflow at 1440x900 or 390x844 | Passed |
| 2026-07-17 | axe closed and open state checks | accessibility inspection | No WCAG-tagged violations; optional portal landmark note recorded in Epic gaps | Passed with documented best-practice note |
| 2026-07-17 | `sdd validate` for Change and `UIF-001` | artifact validation | Active Change and durable Epic satisfy canonical structure and evidence-reference rules | Passed, 0 errors / 0 warnings |
| 2026-07-19 | `npm run check:all` | broad supporting gate | CSS contract, TypeScript, 24 tests, and Storybook static build include all fifteen references | Passed |
| 2026-07-19 | Browser review at `1440x900` and `390x844` | rendered UI verification | Feedback, NavigationRail, and open Sheet show no visible overlap or horizontal overflow; rail activation and Sheet Escape dismissal work; console has no runtime errors | Passed |
| 2026-07-19 | `sdd validate` for Change and `UIF-001` | artifact validation | Active Change and normalized `sdd-epic-v2` behavior/evidence maps are structurally valid | Passed, 0 errors / 0 warnings |
| 2026-07-20 | Rail-based Three Pane Composition at `1440x900` and `390x844` | rendered UI verification | Rail and navigation share the same computed surface; thin mirrored sidebar boundaries frame the center on desktop, disappear on stacked panes, and introduce no horizontal overflow | Passed |
| 2026-07-20 | `npm run check:all` | broad supporting gate | CSS contract, TypeScript, 24 tests, and the updated Storybook composition build together | Passed |
| 2026-07-22 | Focused WorkbenchShell test and browser geometry review | automated and rendered UI evidence | Named optional regions collapse cleanly; desktop side widths are 56px + 264px = 320px; readable content remains stable when context collapses; mobile has no overflow | Passed |
| 2026-07-22 | `npm run check:all` | broad supporting gate | No-Tailwind contract, CSS contract, types, 25 focused tests, and Storybook static build pass together | Passed |
| 2026-07-22 | `sdd validate` for Change and `UIF-001` | artifact validation | Updated shell requirements, scenario evidence, and Change ledger remain structurally valid | Passed, 0 errors / 0 warnings |
| 2026-07-22 | TreeView/FileTree focused test | focused automated test | One roving Tab stop; Right/Left hierarchy handling; Arrow Up/Down and Home/End focus movement; selection, search, and empty results | Passed, 8 workbench tests |
| 2026-07-22 | `npm run check:all` | broad supporting gate | CSS/no-Tailwind contracts, TypeScript, 26 tests, and static Storybook build include the extracted tree behavior and shell slots | Passed; known Vite chunk-size warning only |
| 2026-07-22 | File Tree Navigation keyboard walkthrough | rendered interaction evidence | Right entered the expanded branch, End moved to the final visible item, selection and focus remained independently visible | Passed at 1440x900 |
| 2026-07-22 | Inspector Workbench geometry walkthrough | rendered geometry evidence | Rail 56px, navigation 288px, context 344px, matching surface colors, 1px rail divider, and zero desktop/mobile page overflow | Passed at 1440x900 and 390x844 |
| 2026-07-22 | Scoped Change and Epic validation | artifact validation | TreeView/FileTree Scenario, code maps, verification maps, shell contract, and working ledger remain coherent | Passed, 0 errors / 0 warnings |
| 2026-07-22 | Editor-focused workbench tests | focused automated test | Mode delegation, controlled renaming, stable editor slots, alignment variables, and non-nested live/recovery semantics | Passed, 11 workbench tests |
| 2026-07-22 | Document Editing and Editor Recovery browser walkthrough | rendered interaction and geometry evidence | Rename, Source/Rendered switching, long names, text actions, and all recovery states work at `1440x900` and reflow at `390x844` with zero horizontal overflow | Passed |
| 2026-07-22 | Storybook accessibility inspection | accessibility evidence | Document Editing reports 0 violations and 21 passes; Editor Recovery reports 0 violations, 22 passes, and 1 inconclusive check | Passed with one non-blocking inconclusive result |
| 2026-07-22 | `npm run check:all` | broad supporting gate | CSS/no-Tailwind contracts, TypeScript, 29 tests, and the static Storybook build include the editor work-surface references | Passed; known Vite chunk-size warning only |
| 2026-07-22 | Scoped Change and Epic validation | artifact validation | Refined S4/R2 requirements, code maps, test anchors, and ledgers are coherent | Passed with the existing S4 `LARGE_STORY_SCOPE` warning |
| 2026-07-22 | Reverse-traceability audit from `origin/main` | repository inventory | All changed test cases are mapped by Verified By; new primary editor sources are mapped by Implemented By | Passed for changed editor evidence; existing `.storybook/main.ts` normalization remains reported |

## Manual Feedback

| Date | Feedback | Classification | Action / Artifact Updates | Status |
|---|---|---|---|---|
| 2026-07-17 | Scaffold the full proposed catalog | requirement refinement | Added six primitives and five patterns to S3/S4 plan | resolved |
| 2026-07-17 | Remove ThreePaneShell divider borders | experience refinement | Side surfaces now distinguish regions without grid-like borders | resolved |
| 2026-07-19 | Increase Canvas-to-Surface contrast by about 10% in every identity theme | experience refinement | Lifted `--surface` to an approximately 10% stronger luminance-contrast ratio and moved `--surface-raised` by the same offset to preserve elevation order | resolved |
| 2026-07-20 | Standardize rail-based shells on one left navigation surface with thin, symmetrical boundaries | experience refinement | Rail and left sidebar now share the surface role; quiet one-pixel boundaries separate adjacent navigation regions and mirror the right sidebar around the central workspace | resolved |
| 2026-07-22 | 49th Floor will use a collapsible right context sidebar in many apps | requirement refinement | Added WorkbenchShell with application-controlled optional navigation and context regions; right context defaults to rail plus navigation width and the primary readable area remains viewport-stable through independent collapse | resolved |
| 2026-07-22 | Prefer Anthracite sidebars and its file-tree primitive over the current 49th Floor patterns | requirement refinement | Extracted TreeView and FileTree behavior, retained searchable FileBrowser composition, and made the balanced WorkbenchShell region/divider contract explicit | resolved |
| 2026-07-22 | Extract the reusable editor contract proven across Anthracite, Dashboard, and Coordinator into UI Foundations | requirement refinement | Added text-first segmented modes, document header/editing, editor surface slots, and save/recovery state compositions while keeping CodeMirror, Markdown behavior, and persistence application-owned | resolved |

## Planning Updates

| Date | Discovery | Classification | Planning Updates | Next Apply Starting Point |
|---|---|---|---|---|
| 2026-07-17 | Existing Epic already contains matching deferred candidates | in-scope refinement | Promote candidates rather than create a parallel Epic | `/sdd-apply` at `UIF-001/S3/R1` |

## Design Updates

| Date | Feedback / Discovery | Classification | Reference / Target | Preserve / Change / Non-Goals | Artifact Updates | Next Apply Starting Point |
|---|---|---|---|---|---|---|
| 2026-07-17 | Existing Foundation direction is accepted | experience refinement | current UI Foundations Storybook | Preserve dark utilitarian visual rules; add functional references; exclude light mode | `design.md`, `tasks.md` | `/sdd-apply` at `UIF-001/S3/R1` |
| 2026-07-17 | Three-pane dividers felt too grid-like | experience refinement | `Patterns/Workbench/Three Pane Composition` | Preserve pane sizing and surfaces; remove vertical divider borders | `ThreePaneShell.module.css`, `tasks.md` | Recheck Three Pane Composition |
| 2026-07-19 | Canvas and Surface needed clearer separation across all themes | experience refinement | `Foundations/Identity Themes/Interactive Workbench` | Preserve dark canvases and accent identity; increase Canvas-to-Surface luminance contrast by roughly 10% and retain the Surface-to-Raised hierarchy | `src/styles/tokens.css`, `tasks.md` | Recheck all ten themes in the workbench |
| 2026-07-20 | Rail and left sidebar should read as one navigation zone and balance a right sidebar | experience refinement | `Patterns/Workbench/Navigation Rail` and `Three Pane Composition` | Preserve restrained separators; use one surface background for rail and navigation sidebar; restore only the thin mirrored shell boundaries needed for symmetry | `NavigationRail.module.css`, `ThreePaneShell.module.css`, shared guidance, consuming app styles | Recheck rail-based desktop shells |
| 2026-07-22 | Context sidebars need to be optional and collapsible without making the document jump | requirement refinement | `Patterns/Workbench/Inspector Workbench` | Preserve a quiet canvas and symmetrical side surfaces; add controlled optional sides, viewport-stable default anchoring, available-space opt-in, and app-owned mobile Sheet or drawer behavior | `WorkbenchShell.tsx`, `WorkbenchShell.module.css`, workbench story, Epic, README | Review Inspector Workbench at desktop and mobile widths |
| 2026-07-22 | Anthracite's sidebar hierarchy and file tree are the preferred reference | requirement refinement | `Patterns/Workbench/Inspector Workbench` and `File Tree Navigation` | Preserve app-owned routing and responsive drawers; extract generic tree behavior, use full-row file/folder interactions, add roving focus, expose shell regions, and retain quiet surface dividers | TreeView, FileBrowser, WorkbenchShell, stories, Epic, README | Review keyboard navigation and balanced desktop shell geometry |
| 2026-07-22 | Three Markdown workbenches repeat editor chrome but intentionally diverge in editor and persistence internals | requirement refinement | Dashboard and Coordinator Source/Rendered editors plus Anthracite's simpler service-first shell | Extract visible mode, title, surface, save, read-only, and recovery contracts; retain editor engine, Markdown grammar, exact-source, undo, autosave, revisions, and navigation in each application | SegmentedControl, EditorToolbar, DocumentHeader, EditorSurface, stories, tests, Epic, README | Implement S4/R2 tests and references |

## Manual UI Confirmation

- Status: pending user
- App URL / route: `http://localhost:6008/?path=/story/patterns-workbench--document-editing`, `http://localhost:6008/?path=/story/patterns-workbench--editor-recovery`, `http://localhost:6008/?path=/story/patterns-workbench--file-tree-navigation`, and `http://localhost:6008/?path=/story/patterns-workbench--three-pane-composition`
- Required setup or test data: none
- Steps for the user: inspect Document Editing in Source and Rendered modes; enter Rename, edit the filename, then Save name or Cancel; inspect dirty, saving, saved, read-only, conflict, failure, and literal-source states in Editor Recovery; then spot-check File Tree keyboard navigation and Inspector Workbench side collapse at desktop and mobile widths
- Expected result: all ordinary editor and recovery actions remain visibly named, the toolbar has one clear live status, document chrome aligns with the readable editor surface, long names and notices stay contained, and the existing file/shell patterns remain unchanged
- Feedback that would change artifacts: behavior, composition, accessibility, or visual direction that affects the accepted references

## Blockers / Open Questions

- None.

## Closeout

- Change status: in_progress
- Epic files updated: yes
- Story labels/references and Requirement/Scenario IDs current: yes
- Implemented By maps current: yes
- Scenario-mapped Verified By maps current: yes
- Superseded earlier Epic truth reconciled: yes
- ADR status: existing ADR Accepted and evidence updated
- Release communication current: yes
- `sdd-review` verdict: pending
- Review record: pending
- `review.md` findings resolved: not applicable yet
- Planning updates resolved: yes
- Manual UI confirmation status: pending user
- PR / merge state: not started
- Deferred scope accepted: yes
- Change moved to `docs/changes/closed/`: no
