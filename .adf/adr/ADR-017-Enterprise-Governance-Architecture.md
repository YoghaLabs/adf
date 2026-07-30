# ADR-017 — Enterprise Governance Architecture

## Title

Enterprise Governance Architecture

## Status

Accepted

## Context

ADF must support enterprise adoption (org hierarchy, identity, RBAC, audit,
compliance) without redesigning the platform or embedding governance policy in
Studio React code.

## Decision

1. **Governance is service-driven.** Organization/Identity/Role/Permission/Audit/
   Compliance/License/Analytics clients ferry envelopes; Core owns policy.
2. **RBAC is hierarchical.** System → Organization → Workspace → Project → Custom
   with inheritance and overrides in the permission matrix.
3. **Audit is immutable.** Events carry `immutable: true`; Studio never rewrites
   history. Export/search are presentation of Core envelopes.
4. **Enterprise features remain modular.** Feature modules under
   `features/enterprise/` compose existing platforms (Workspace, Collaboration,
   Orchestration, Marketplace, Runtime) via integration links — not a new product.

### Roadmap note

Locked roadmap labeled BUILD-019 as “Release Candidate.” Operator master prompt
BUILD-019 overrides the theme to **Enterprise Governance Platform**. Release
Candidate moves to BUILD-020 unless a future ADR restores sequencing.

## Consequences

- Enterprise readiness without forking Studio into an admin monolith
- Clear separation of presentation vs enforcement
- Audit integrity preserved for compliance narratives

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Governance logic in Studio stores | Violates ADR-011 |
| Flat RBAC only | Too weak for org/workspace/project nesting |
| Mutable audit in UI | Breaks compliance trust |
| New top-level “enterprise platform” product | Forbidden by BUILD-019 mission |

## References

- `adf-docs/ENTERPRISE_PLATFORM.md`
- ADR-011, ADR-015, ADR-016
- BUILD-019

## Future Impact

BUILD-020+ can harden RC packaging on top of this governance model.
