# BUILD-021 Acceptance — Identity Platform

## Must pass

- [ ] `/identity` hub renders (live or demo)
- [ ] `/identity/login` + `/identity/register` reachable
- [ ] Better Auth middleware responds on `/api/auth` (or honest error)
- [ ] `/adf-identity/invoke` `identity.health` → `coreAgnostic: true`
- [ ] Roles/permissions list from Identity DB or fixtures
- [ ] Organization create writes audit event
- [ ] PAT mint returns one-time token
- [ ] ADR-019 present
- [ ] No auth code imported by `adf-core`
- [ ] Vitest identity suite green

## Out of scope

- BUILD-022
- Production OAuth secrets on VPS
- Passkeys
