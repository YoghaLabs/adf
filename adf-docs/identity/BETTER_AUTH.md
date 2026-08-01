# Better Auth

- Package: `better-auth`
- Database: PostgreSQL 17 → `adf_identity` via `ADF_IDENTITY_DATABASE_URL`
- Pool driver: `pg`
- Vite middleware: `adf-studio/vite.identityPlugin.ts`
- React client: `features/identity/sdk/authClient.ts`
- Plugins: `magicLink`, `organization`

Configure OAuth via environment variables listed in `AUTHENTICATION.md`.
Never commit database passwords; use `adf-identity/.env.example` as template.
