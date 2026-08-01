# BUILD-021 — Build Spec (Identity + Track L)

## Delivered earlier (Track L)

Live Studio bridge, packages, durable sessions, demo mode, FO review scaffold.

## Identity Platform (this slice)

| Area | Spec |
|------|------|
| Provider | Better Auth in `adf-identity/` |
| UI | `adf-studio/src/features/identity/**` |
| API | `/api/auth/*`, `/adf-identity/invoke` |
| DB | `.adf/local/identity/*.sqlite` |
| RBAC | Hierarchical ADF roles in `rbac.ts` |
| Docs | `adf-docs/identity/*`, ADR-019 |
| Version | `1.0.0-rc2` |

## Non-goals

- Auth inside Core Runtime
- BUILD-022
- Passkeys production
