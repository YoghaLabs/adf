# Resume Me

## Identity

- Product: ADF `1.0.0-rc2` / BUILD-021
- Branch: `develop`
- Active slice: **Enterprise Identity Platform** (Better Auth)
- Prior in same build: Track L Live Control Center

## Boot order

1. This file
2. `.adf/adr/ADR-019-Enterprise-Identity-Architecture.md`
3. `bootstrap/BUILD-021/ACCEPTANCE.md`
4. `adf-docs/identity/IDENTITY.md`
5. `adf-docs/FULL_OPERATION_REVIEW.md`

## Immediate next

1. Verify `/identity` health shows `postgresql` + `adf_identity`
2. Keep `ADF_IDENTITY_DATABASE_URL` only in env (never git)
3. Configure OAuth/SMTP/SSO secrets for non-dev
4. Operator FO checkboxes still open for GA
5. Do **not** open BUILD-022 until Identity acceptance closed
