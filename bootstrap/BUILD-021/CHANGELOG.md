# BUILD-021 Changelog

## Identity Platform (`1.0.0-rc2`)

- Add `adf-identity` layer with Better Auth + ADF RBAC/org/audit/PAT services
- **PostgreSQL 17** database `adf_identity` (domain-separated from `adf_runtime`)
- Add Studio `features/identity` pages, stores, SDK clients, services
- Wire Vite identity middleware (`/api/auth`, `/adf-identity/invoke`)
- ADR-019 Enterprise Identity Architecture (PG + domain split)
- Identity docs under `adf-docs/identity/` including `DATABASE.md`

## Prior Track L (`1.0.0-rc1`)

- Live Core bridge, packages, durable sessions, demo mode, GA/FO scaffolds
