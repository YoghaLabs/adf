import type {
  IdentityAuditEvent,
  IdentityInvitation,
  IdentityOrganization,
  IdentityPermission,
  IdentityRole,
  IdentityUser,
  IdentityWorkspace,
} from "@/features/identity/types";

export const DEMO_USER: IdentityUser = {
  id: "user_demo",
  name: "Demo Operator",
  email: "demo@adf.local",
  emailVerified: true,
};

export const DEMO_ORGS: IdentityOrganization[] = [
  { id: "org_demo", name: "YoghaLabs", slug: "yoghalabs", created_at: "2026-07-31T00:00:00.000Z" },
];

export const DEMO_WORKSPACES: IdentityWorkspace[] = [
  {
    id: "ws_demo",
    organization_id: "org_demo",
    name: "ADF Platform",
    slug: "adf-platform",
  },
];

export const DEMO_ROLES: IdentityRole[] = [
  { id: "role_organization_owner", key: "organization_owner", name: "organization owner", scope: "system" },
  { id: "role_developer", key: "developer", name: "developer", scope: "system" },
  { id: "role_viewer", key: "viewer", name: "viewer", scope: "system" },
];

export const DEMO_PERMISSIONS: IdentityPermission[] = [
  { id: "perm_org_read", key: "org:read", name: "org:read" },
  { id: "perm_project_write", key: "project:write", name: "project:write" },
  { id: "perm_audit_read", key: "audit:read", name: "audit:read" },
];

export const DEMO_AUDIT: IdentityAuditEvent[] = [
  {
    id: "aud_demo_1",
    actor_id: "user_demo",
    action: "login",
    resource: "session",
    detail: "demo fixture",
    created_at: "2026-07-31T08:00:00.000Z",
    immutable: true,
  },
];

export const DEMO_INVITATIONS: IdentityInvitation[] = [
  {
    id: "inv_demo_1",
    organization_id: "org_demo",
    email: "guest@adf.local",
    role: "guest",
    status: "pending",
    expires_at: "2026-08-07T00:00:00.000Z",
  },
];
