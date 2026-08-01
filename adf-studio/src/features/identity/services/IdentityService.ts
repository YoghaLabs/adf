import { identitySdk } from "@/features/identity/sdk/identityBridge";
import {
  DEMO_AUDIT,
  DEMO_INVITATIONS,
  DEMO_ORGS,
  DEMO_PERMISSIONS,
  DEMO_ROLES,
  DEMO_WORKSPACES,
} from "@/features/identity/services/identityFixtures";

/** Presentation service — prefers Identity Layer, falls back to demo fixtures. */
export const IdentityUiService = {
  async health() {
    const r = await identitySdk.auth.health();
    return r.ok ? r : { ok: true as const, data: { layer: "identity", provider: "fixture", coreAgnostic: true as const } };
  },

  async organizations() {
    const r = await identitySdk.organizations.list();
    if (r.ok && (r.data.organizations?.length ?? 0) > 0) return r.data.organizations;
    return DEMO_ORGS;
  },

  async workspaces(organizationId?: string) {
    const r = await identitySdk.workspaces.list(organizationId);
    if (r.ok && (r.data.workspaces?.length ?? 0) > 0) return r.data.workspaces;
    return DEMO_WORKSPACES;
  },

  async roles() {
    const r = await identitySdk.roles.list();
    if (r.ok && (r.data.roles?.length ?? 0) > 0) return r.data.roles;
    return DEMO_ROLES;
  },

  async permissions() {
    const r = await identitySdk.permissions.list();
    if (r.ok && (r.data.permissions?.length ?? 0) > 0) return r.data.permissions;
    return DEMO_PERMISSIONS;
  },

  async audit() {
    const r = await identitySdk.audit.list();
    if (r.ok && (r.data.events?.length ?? 0) > 0) return r.data.events;
    return DEMO_AUDIT;
  },

  async invitations(organizationId?: string) {
    const r = await identitySdk.invitations.list(organizationId);
    if (r.ok && (r.data.invitations?.length ?? 0) > 0) return r.data.invitations;
    return DEMO_INVITATIONS;
  },
};
