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
   plugin, sessions/cookies, MFA/SSO-ready).
2. **Identity is a separate layer** (`adf-identity/`), not Core Runtime.
   Architecture: UI → Better Auth → PostgreSQL `adf_identity` → Identity
   services → Service Layer → Core Runtime.
3. **PostgreSQL 17 is the identity database engine.** Domain DB `adf_identity`
   is separated from `adf_runtime` (and optional `adf_business`). SQLite is not
   used for identity.
4. **Studio owns identity UX** (login/register/org/RBAC pages) as Presentation
   Layer only — no business rules beyond form validation and display.
5. **Services validate permissions** in the Identity Layer (RBAC matrix, audit,
   PAT hashing). Core APIs stay auth-agnostic; callers may attach identity
   context at the service edge later without Core changes.
6. **Runtime never authenticates users directly** and **never queries identity
   tables**. No Better Auth / password / OAuth / `adf_identity` SQL in `adf-core`.

## Consequences

- Enterprise-grade foundation comparable to GitHub/GitLab/Vercel/Linear tenancy
- Secrets via `ADF_IDENTITY_DATABASE_URL` only (never committed)
- Hybrid demo fixtures remain when Identity middleware is down
- OAuth/SMTP/SSO secrets are environment-gated; passkeys deferred

## Alternatives Considered

| Alternative | Why rejected |
|-------------|--------------|
| Auth inside Core Runtime | Violates CLI/automation agnostic Core |
| SQLite identity DB | Not aligned with ADF PostgreSQL roadmap / enterprise ops |
| Shared app DB with runtime tables | Domain coupling; harder compliance boundaries |
| Auth-only in React stores | No secure sessions/tokens; violates ADR-011 |
| Custom auth from scratch | Reinvention; Better Auth covers providers + org plugin |

## References

- BUILD-021 Enterprise Identity Platform master prompt
- ADR-011 Studio Architecture
- ADR-017 Enterprise Governance Architecture
- `adf-docs/identity/*.md`
