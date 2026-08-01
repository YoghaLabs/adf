# Authentication

Provider: **Better Auth** (`/api/auth/*`).

| Method | Status |
|--------|--------|
| Email + password | Enabled (min length 10) |
| Magic link | Enabled (dev logs URL) |
| OAuth GitHub/GitLab/Google/Microsoft | Enabled when `*_CLIENT_ID/SECRET` set |
| Passkeys | Future |

Sessions use secure cookie options via `ADF_IDENTITY_SECURE_COOKIES=1` in production.
