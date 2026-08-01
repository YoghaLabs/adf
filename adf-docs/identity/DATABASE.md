# Identity Database Architecture

## Domains (separated)

| Database | Purpose |
|----------|---------|
| `adf_identity` | Better Auth + Organization + RBAC + Audit + PAT/API keys |
| `adf_runtime` | Reserved for Knowledge/Context/Runtime/Marketplace (not Identity) |
| `adf_business` | Optional future: billing/subscription/license |

Core Runtime **never** reads Better Auth / identity tables directly.
All access is Identity Layer → Service envelopes → (later) Service Layer edge.

## Topology

```
ADF Studio
    │
Better Auth  (+ /adf-identity/invoke)
    │
PostgreSQL 17  →  database adf_identity
    │
Identity services (RBAC, org, audit, PAT)
    │
Service Layer / Core Runtime   ← auth-agnostic
```

## Connection

Set `ADF_IDENTITY_DATABASE_URL` (see `adf-identity/.env.example`).

Default VPS Postgres: host/port via operator env — **do not commit passwords**.

## Tables (ADF extensions)

organizations · organization_members · invitations · workspaces ·
workspace_members · projects · project_members · teams · roles ·
permissions · role_permissions · audit_logs · api_keys ·
personal_access_tokens · login_history · trusted_devices ·
notifications · user_preferences

Better Auth additionally manages: user · session · account · verification ·
(organization plugin tables) · passkeys (future).
