# Identity

ADF Enterprise Identity Platform (BUILD-021 / `1.0.0-rc2`).

## Layering

```
UI (adf-studio features/identity)
  → Better Auth
    → PostgreSQL 17 / database adf_identity
      → Identity services (RBAC, org, audit, PAT)
        → Service Layer
          → Core Runtime (auth-agnostic; never reads identity tables)
```

See `DATABASE.md` for domain split (`adf_identity` / `adf_runtime` / `adf_business`).

## Non-goals

- No authentication inside `adf-core`
- No identity SQL from Core
- Passkeys deferred
- Cloud IdP federation beyond configured OAuth env vars
