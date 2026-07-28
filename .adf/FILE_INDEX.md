# File Index

Important markdown files, their purpose, dependencies, and likely future updates.

**Why:** reduces scavenger hunts and duplicate “new notes” files.

## Root

| File | Purpose | Depends on | Future updates |
|------|---------|------------|----------------|
| `README.md` | Entry + roadmap status table | `VERSION`, `ROADMAP.md` | Each BUILD status change |
| `VERSION` | Identity SSOT for version/build/branch | — | Every version/build bump |
| `CHANGELOG.md` | Semver history | `VERSION` | Every shipped change |
| `ROADMAP.md` | BUILD missions | Architecture lock | Refine missions as needed (no folder redesign) |
| `CONTRIBUTING.md` | Contributor rules | `AI_CONTRACT.md` | Process tweaks |

## `.adf/` — Runtime SSOT

| File | Purpose | Depends on | Future updates |
|------|---------|------------|----------------|
| `PROJECT_MANIFEST.md` | Identity + package roles | `VERSION` | New packages/roles |
| `PROJECT_STATE.md` | Live dashboard | build tracking, todos | Continuously |
| `CURRENT_TASK.md` | Mission boundary | BUILD pack | Each BUILD |
| `PROJECT_DNA.md` | Vision/mission/philosophy | — | Rare strategic edits |
| `AI_CONTRACT.md` | Binding rules | architecture rules | Additive rule hardening |
| `AI_BOOT.md` | Boot order | runtime files | When SSOT files are added |
| `AI_RUNTIME.md` | Operate loop | boot, contract | Runtime evolution |
| `WORKFLOW.md` | Idea→release lifecycle | bootstrap packs | Process maturity |
| `QUICK_CONTEXT.md` | Minimal snapshot | state/version | Continuously |
| `FULL_CONTEXT.md` | Deep orientation | most `.adf` | Major BUILD shifts |
| `TODOS.md` | Checklist truth | current task | Continuously |
| `MEMORY.md` | Durable facts | — | Sparingly |
| `SESSION.md` | Latest handoff | state/todos | Each session end |
| `CHANGE_HISTORY.md` | Narrative changes | changelog | Milestones |
| `BUILD_HISTORY.md` | BUILD ledger | status/version | Each completed BUILD |
| `BUILD_STATUS.md` | BUILD board | roadmap | Each status change |
| `REPOSITORY_MAP.md` | Folder map | architecture lock | Rare |
| `MODULE_INDEX.md` | Module map | repository map | When modules gain code |
| `FILE_INDEX.md` | This index | knowledge growth | When important files added |
| `ARCHITECTURE_RULES.md` | Immutable rules | DNA/contract | Additive only |
| `NAMING_CONVENTION.md` | Naming rules | architecture rules | Additive only |
| `DOCUMENTATION_STANDARD.md` | Writing rules | contract | Additive only |
| `KNOWLEDGE_INDEX.md` | Knowledge map | file index | When knowledge sources added |
| `TOKEN_BUDGET.md` | Context budget | quick/full context | Context engine era |
| `DEPENDENCY_INDEX.md` | Dependency posture | modules | When deps appear |
| `DECISION_LOG.md` | Decisions | DNA | Each significant decision |

## `bootstrap/`

| File / path | Purpose | Future |
|-------------|---------|--------|
| `README.md`, `BOOT_SEQUENCE.md`, `BUILD_CONTRACT.md` | Shared boot/process | BUILD-003 automation |
| `BUILD-002/*` | BUILD-002 spec pack | Pattern for later `BUILD-00N/` packs |

## `prompts/`

| File | Purpose | Future |
|------|---------|--------|
| `build.md`, `resume.md`, `handoff.md`, `audit.md` | Core operator prompts | BUILD-004 schemas |
| `architecture.md`, `planning.md`, `review.md`, `release.md`, `generator.md` | Expanded operator modes | BUILD-004+ |

## `adf-docs/`

| File | Purpose | Future |
|------|---------|--------|
| `WHAT_IS_ADF.md`, `GETTING_STARTED.md`, `ARCHITECTURE.md` | Foundations | BUILD-016 expansion |
| `AI_RUNTIME.md`, `BUILD_SYSTEM.md`, `WORKFLOW.md`, `BEST_PRACTICES.md` | Human guides mirroring SSOT themes | Keep aligned with `.adf` |

## Maintenance Rule

When adding an important markdown file, add a row here and in `KNOWLEDGE_INDEX.md` in the same change.
