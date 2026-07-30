# ADR Index

Catalog of Architecture Decision Records for ADF.

**Why:** from BUILD-003 onward, design decisions must be traceable. An AI that only sees *what* exists cannot preserve *why* it exists.

## Rule (Permanent through BUILD-020)

No architecture change without a new ADR. Accepted ADRs are part of ADF v1.0 philosophy.

## Index

| ID | Title | Status | File |
|----|-------|--------|------|
| ADR-001 | Repository Structure | Accepted | `adr/ADR-001-Repository-Structure.md` |
| ADR-002 | Build Lifecycle | Accepted | `adr/ADR-002-Build-Lifecycle.md` |
| ADR-003 | AI Runtime | Accepted | `adr/ADR-003-AI-Runtime.md` |
| ADR-006 | Project Generation Model | Accepted | `adr/ADR-006-Project-Generation-Model.md` |
| ADR-007 | Package Management Architecture | Accepted | `adr/ADR-007-Package-Management-Architecture.md` |
| ADR-008 | Service Layer Architecture | Accepted | `adr/ADR-008-Service-Layer-Architecture.md` |
| ADR-009 | Registry & Marketplace Architecture | Accepted | `adr/ADR-009-Registry-Marketplace-Architecture.md` |
| ADR-010 | Distribution & Release Architecture | Accepted | `adr/ADR-010-Distribution-Release-Architecture.md` |
| ADR-011 | ADF Studio Architecture | Accepted | `adr/ADR-011-ADF-Studio-Architecture.md` |

## How to Add an ADR

1. Allocate next ID (`ADR-004`, …)
2. Create `.adf/adr/ADR-00N-Short-Title.md` using the standard sections
3. Add a row here
4. Link from `DECISION_LOG.md` when the decision is accepted
5. Mention in `CHANGE_HISTORY.md` / `CHANGELOG.md` when user-visible

## Standard Sections

Title · Status · Context · Decision · Consequences · Alternatives Considered · References · Future Impact

## Related

- `adf-docs/ADR_GUIDE.md`
- `DECISION_LOG.md`
- `ARCHITECTURE_RULES.md`
- `prompts/adr.md`
