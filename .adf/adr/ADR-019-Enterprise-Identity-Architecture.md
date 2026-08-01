# ADR-019 — Enterprise Identity Architecture

## Title

Enterprise Identity Architecture

## Status

Accepted

## Context

ADF Studio needs enterprise authentication and authorization (email/password,
magic link, OAuth, organizations, RBAC, sessions, PATs, audit). Prior ADR-017
covers governance presentation; it does not define where authentication lives.

Core Runtime must remain usable without a user identity (CLI, automation,
local agents). Embedding auth inside Core would couple every runtime path to
browser sessions and break authentication-agnostic operation.

## Decision

1. **Better Auth is the primary identity provider** for Studio-facing auth
   (email/password, magic link, OAuth providers when configured, organization
   plugin, sessions/cookies).
2. **Identity is a separate layer** (`adf-identity/`), not Core Runtime.
   Architecture: UI → Identity Layer → SDK → Service Layer → Core Runtime.
3. **Studio owns identity UX** (login/register/org/RBAC pages) as Presentation
   Layer only — no business rules beyond form validation and display.
4. **Services validate permissions** in the Identity Layer (RBAC matrix, audit,
   PAT hashing). Core APIs stay auth-agnostic; callers may attach identity
   context at the service edge later without Core changes.
5. **Runtime never authenticates users directly.** No Better Auth / password /
   OAuth code in `adf-core`.

## Consequences

- Clear FO/enterprise path for multi-user Studio without rewriting Core
- Local SQLite under `.adf/local/identity/` (Better Auth DB + ADF extensions)
- Hybrid demo fixtures remain available when Identity middleware is down
- OAuth requires env client IDs/secrets; passkeys deferred

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Auth inside Core Runtime | Violates CLI/automation agnostic Core |
| Auth-only in React stores | No secure sessions/tokens; violates ADR-011 |
| Custom auth from scratch | Reinvention; Better Auth covers providers + org plugin |
| Force all CLI through Identity | Breaks local operator FO-1/FO-2 paths |

## References

- BUILD-021 Enterprise Identity Platform master prompt
- ADR-011 Studio Architecture
- ADR-017 Enterprise Governance Architecture
- `adf-docs/identity/*.md`
