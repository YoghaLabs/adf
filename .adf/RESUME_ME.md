# Resume Me

## Identity

- Product: ADF `1.0.0-rc2` / BUILD-021
- Branch: `develop`
- Identity Platform: **ACCEPTANCE CLOSED** (engineering)
- Stack: Better Auth → PostgreSQL 17 → `adf_identity` → Service Layer → Core (auth-agnostic)

## Boot order

1. This file
2. `bootstrap/BUILD-021/ACCEPTANCE.md`
3. `.adf/adr/ADR-019-Enterprise-Identity-Architecture.md`
4. `adf-docs/identity/DATABASE.md`
5. `adf-docs/FULL_OPERATION_REVIEW.md` (operator FO still open)

## Immediate next (post BUILD-021 Identity)

1. Operator: FO review checkboxes (Accept / Defer / Waive FO-6)
2. FO-6 / GA: signing secrets + CI green → tag `1.0.0`
3. Optional: wire real OAuth/SMTP/SSO IdP secrets
4. Do **not** open BUILD-022 until operator FO decision
5. **i18n:** every new Studio UI progress must add EN+ID keys (`adf-docs/I18N.md`, rule `i18n-indonesia.mdc`) — toggle ID/EN in TopBar
