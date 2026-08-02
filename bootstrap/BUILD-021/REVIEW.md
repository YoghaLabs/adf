# BUILD-021 Review — Identity

**Acceptance:** CLOSED (engineering) — see `ACCEPTANCE.md`

## Architecture check

| Rule | Result |
|------|--------|
| Core auth-agnostic | Pass — Identity in `adf-identity/` |
| Studio presentation only | Pass — stores call SDK/services |
| Better Auth primary provider | Pass |
| PostgreSQL domain `adf_identity` | Pass — separated from `adf_runtime` |
| RBAC hierarchical | Pass — `rbac.ts` |
| MFA / SSO ready flags | Pass — `security.ts` |
| Cumulative with Track L | Pass |

## Residual risk (not BUILD-021 blockers)

- OAuth / SMTP / SSO IdP secrets are environment-gated
- Operator FO checkbox + GA `1.0.0` tag remain FO-6
- Passkeys deferred
