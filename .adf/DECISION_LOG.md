# Decision Log

Chronological record of significant decisions. Newest entries first.

## 2026-07-30 — Locked roadmap Phases 1–4

- **Decision:** Adopt and lock the phased BUILD-001…020 roadmap (Engine Foundation → Platform & Distribution → User Experience → Production).
- **Why:** Prevent theme drift across AI sessions; Phase 2 next is SDK & Public API (BUILD-010), not older alternate labels.
- **Consequences:** `ROADMAP.md` is canonical; changing themes requires ADR + operator approval.
- **Status:** Accepted

## 2026-07-30 — ADF Package Manager / APM (BUILD-009 / ADR-007)

- **Decision:** All installable ADF artifacts are packages with `package.yaml`; PackageManager is the API; local registry first.
- **Why:** Extensible distribution without hardcoding templates/plugins/packs into core.
- **Consequences:** `adf.lock` + `.adf/apm/` cache/install; remote registries later.
- **Status:** Accepted

## 2026-07-29 — Manifest-driven project generation (BUILD-008 / ADR-006)

- **Decision:** GeneratorManager creates projects only from template manifests/`files/`; no hardcoded project trees in Python.
- **Why:** Keeps stack variants (generic/python/fastapi/laravel/nextjs) declarative and aligned with Template Engine SSOT.
- **Consequences:** New project types are templates; dry-run/validate/rollback are first-class; ADR-006 accepted.
- **Status:** Accepted

## 2026-07-29 — Plugin-based RuntimeEngine (BUILD-006)

- **Decision:** Future capabilities are plugins behind contracts; RuntimeEngine uses PluginManager and must not instantiate concrete plugin classes directly.
- **Why:** Keeps core stable while allowing Studio/testing/generators to extend ADF safely.
- **Consequences:** Third parties depend on `contracts`/`extensions` only; built-ins live under `adf-core/plugins`.
- **Status:** Accepted

## 2026-07-29 — Runtime Engine in `adf-core` with Python (BUILD-005)

- **Decision:** Implement the first executable Runtime Engine as a Python package inside locked `adf-core/`, following Context Engine docs; keep markdown SSOT authoritative for process.
- **Why:** Runnable ADF requires code without inventing new top-level architecture; Python enables fast foundation + pytest.
- **Consequences:** CLI/tests live under `adf-core`; ephemeral state may use `.adf/local/`; later builds harden rather than relocate the engine.
- **Status:** Accepted

## 2026-07-29 — Context Engine as first engine (BUILD-004)

- **Decision:** Begin the engine phase with a normative Context Engine (shared restore/pipeline/state/checkpoints) before executable Runtime Engine code.
- **Why:** Runnable ADF requires consistent multi-AI session continuity; coding without this contract recreates context loss in software form.
- **Consequences:** BUILD-005 must implement these specs; all AIs must follow Resume Protocol; no new top-level engine folder.
- **Status:** Accepted

## 2026-07-29 — Mandatory ADRs for architecture changes (BUILD-003)

- **Decision:** From BUILD-003 through BUILD-020, every architecture change requires a new ADR under `.adf/adr/` and an `ADR_INDEX.md` entry.
- **Why:** Without durable rationale, multi-agent development re-litigates design and drifts from locks.
- **Consequences:** “Improvements” that alter structure/runtime model without ADR are process defects.
- **Status:** Accepted

## 2026-07-29 — `.adf` is AI Runtime SSOT (BUILD-002)

- **Decision:** Declare `.adf/` the Single Source of Truth for AI operators across tools; expand runtime, workflow, maps, standards, and build tracking there.
- **Why:** Chat is not portable; every new AI must resume from repository files alone.
- **Consequences:** Status and mission truth must be written into `.adf` promptly; `adf-docs` teaches humans but must not contradict SSOT.
- **Status:** Accepted

## 2026-07-29 — Architecture Review gate before BUILD-003

- **Decision:** BUILD-002 completion requires human Architecture Review before BUILD-003 starts.
- **Why:** Repository intelligence changes affect all future agents; review prevents silent drift.
- **Consequences:** Agents must stop after BUILD-002 even if tempted to automate bootstrap next.
- **Status:** Accepted

## 2026-07-29 — Lock top-level architecture in BUILD-001

- **Decision:** Freeze the top-level folder set and forbid inventing/renaming folders in later builds without an explicit architecture change BUILD.
- **Why:** Stable paths are required for AI handoff, tooling, docs, and cumulative builds.
- **Consequences:** All packages must live under the locked names; expansion happens inside existing trees.
- **Status:** Accepted

## 2026-07-29 — Documentation and contracts before runtime

- **Decision:** BUILD-001 ships operating docs and scaffolds only; `adf-core` runtime waits for BUILD-005; Studio waits for BUILD-013.
- **Why:** Prevents premature implementation without resumable state and contracts.
- **Consequences:** Early clones are useful for process/docs immediately, not as a runnable app yet.
- **Status:** Accepted

## 2026-07-29 — AI contract as binding operating law

- **Decision:** Encode non-negotiable rules in `.adf/AI_CONTRACT.md` (no doc deletion, no folder renames, no placeholders, mandatory state/changelog/todo updates).
- **Why:** Multi-agent continuity fails without enforceable norms.
- **Consequences:** PRs and BUILD work that violate the contract must be remediated before advancing.
- **Status:** Accepted

## 2026-07-29 — Cumulative numbered builds through BUILD-020

- **Decision:** Progress via BUILD-001 → BUILD-020 with explicit stop boundaries.
- **Why:** Makes scope auditable and prevents mega-prompt redesign loops.
- **Consequences:** Agents must not auto-continue into the next BUILD after finishing the current one.
- **Status:** Accepted

## Template for New Entries

```markdown
## YYYY-MM-DD — Short title
- **Decision:**
- **Why:**
- **Consequences:**
- **Status:** Proposed | Accepted | Superseded
```
