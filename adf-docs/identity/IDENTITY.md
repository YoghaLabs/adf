# Identity

ADF Enterprise Identity Platform (BUILD-021 / `1.0.0-rc2`).

## Layering

```
UI (adf-studio features/identity)
  → Identity Layer (adf-identity + Better Auth)
    → Studio SDK / identitySdk
      → Service envelopes
        → Core Runtime (auth-agnostic)
```

## Non-goals

- No authentication inside `adf-core`
- Passkeys deferred
- Cloud IdP federation beyond configured OAuth env vars
