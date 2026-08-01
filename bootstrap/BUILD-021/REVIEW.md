# BUILD-021 Review — Identity

## Architecture check

| Rule | Result |
|------|--------|
| Core auth-agnostic | Pass — Identity in `adf-identity/` |
| Studio presentation only | Pass — stores call SDK/services |
| Better Auth primary provider | Pass |
| RBAC hierarchical | Pass — `rbac.ts` |
| Cumulative with Track L | Pass |

## Residual risk

- OAuth providers need secrets
- Magic link needs SMTP for production
- better-sqlite3 native addon required on host
