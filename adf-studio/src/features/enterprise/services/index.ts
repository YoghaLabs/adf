import { studioSdk } from "@/sdk";

export const enterpriseServices = {
  overview: () => studioSdk.organizations.overview(),
  organizations: () => studioSdk.organizations.list(),
  identity: () => studioSdk.identity.users(),
  roles: () => studioSdk.roles.list(),
  permissions: () => studioSdk.permissions.list(),
  audit: () => studioSdk.audit.list(),
  compliance: () => studioSdk.compliance.controls(),
  licenses: () => studioSdk.licenses.list(),
  analytics: () => studioSdk.analytics.snapshot(),
};

export * from "@/features/enterprise/services/enterpriseFixtures";
