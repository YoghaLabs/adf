# BUILD-019 Spec

## Create

`adf-studio/src/features/enterprise/` with organizations, teams, users, roles,
permissions, policies, audit, compliance, identity, sso, licenses, analytics,
settings, environments, stores, services, types, pages.

## State / SDK

OrganizationStore · UserStore · RoleStore · PermissionStore · AuditStore ·
ComplianceStore · LicenseStore · AnalyticsStore

OrganizationClient · IdentityClient · RoleClient · PermissionClient ·
AuditClient · ComplianceClient · LicenseClient · AnalyticsClient

## Out of scope

Platform redesign · new top-level product · live SSO wiring as SSOT in Studio
