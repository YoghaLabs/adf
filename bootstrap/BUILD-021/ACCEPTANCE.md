# BUILD-021 Acceptance — Identity Platform

**Status:** CLOSED (engineering evidence)  
**SHA:** see `git log -1` on `develop` after finalize commit  
**Version:** `1.0.0-rc2`

## Must pass

- [x] `/identity` hub renders (live or demo) — HTTP 200 on VPS
- [x] `/identity/login` + `/identity/register` reachable — HTTP 200
- [x] Better Auth middleware responds on `/api/auth` (or honest error) — wired via `vite.identityPlugin` + PG tables
- [x] `/adf-identity/invoke` `identity.health` → `coreAgnostic: true` + `engine: postgresql`
- [x] Roles/permissions list from Identity DB or fixtures
- [x] Organization create writes audit event
- [x] PAT mint returns one-time token
- [x] ADR-019 present (PostgreSQL domain split)
- [x] No auth code imported by `adf-core` (grep clean)
- [x] Vitest identity suite green

## Database

- [x] PostgreSQL 17 database `adf_identity` provisioned
- [x] ADF enterprise tables migrated (`schema.pg.sql`)
- [x] Better Auth tables migrated (`scripts/migrate-better-auth.mjs`)
- [x] Domain separation: `adf_runtime` reserved (not mixed)

## Out of scope (explicit)

- BUILD-022
- Production OAuth / SMTP / SSO IdP secrets on VPS
- Passkeys production
- Operator FO checkbox sign-off / GA `1.0.0` tag (FO-6)
