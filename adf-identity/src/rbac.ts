/** ADF hierarchical RBAC — Identity Layer only (not Core Runtime). */

export const ADF_ROLES = [
  "platform_owner",
  "organization_owner",
  "billing_owner",
  "workspace_admin",
  "project_admin",
  "architect",
  "developer",
  "qa",
  "devops",
  "reviewer",
  "guest",
  "viewer",
  "custom",
] as const;

export type AdfRole = (typeof ADF_ROLES)[number];

export const ADF_PERMISSIONS = [
  "org:read",
  "org:write",
  "org:billing",
  "org:invite",
  "org:manage_members",
  "org:manage_roles",
  "workspace:read",
  "workspace:write",
  "workspace:admin",
  "project:read",
  "project:write",
  "project:admin",
  "project:invite",
  "identity:read",
  "identity:write",
  "session:read",
  "session:revoke",
  "token:manage",
  "audit:read",
  "audit:export",
  "security:manage",
] as const;

export type AdfPermission = (typeof ADF_PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Record<AdfRole, readonly AdfPermission[]> = {
  platform_owner: [...ADF_PERMISSIONS],
  organization_owner: [
    "org:read",
    "org:write",
    "org:billing",
    "org:invite",
    "org:manage_members",
    "org:manage_roles",
    "workspace:read",
    "workspace:write",
    "workspace:admin",
    "project:read",
    "project:write",
    "project:admin",
    "project:invite",
    "identity:read",
    "identity:write",
    "session:read",
    "session:revoke",
    "token:manage",
    "audit:read",
    "audit:export",
    "security:manage",
  ],
  billing_owner: ["org:read", "org:billing", "audit:read"],
  workspace_admin: [
    "org:read",
    "workspace:read",
    "workspace:write",
    "workspace:admin",
    "project:read",
    "project:write",
    "project:admin",
    "project:invite",
    "identity:read",
    "session:read",
    "audit:read",
  ],
  project_admin: [
    "org:read",
    "workspace:read",
    "project:read",
    "project:write",
    "project:admin",
    "project:invite",
    "identity:read",
    "audit:read",
  ],
  architect: ["org:read", "workspace:read", "project:read", "project:write", "audit:read"],
  developer: ["org:read", "workspace:read", "project:read", "project:write"],
  qa: ["org:read", "workspace:read", "project:read"],
  devops: ["org:read", "workspace:read", "project:read", "project:write", "audit:read"],
  reviewer: ["org:read", "workspace:read", "project:read"],
  guest: ["org:read", "workspace:read", "project:read"],
  viewer: ["org:read", "workspace:read", "project:read"],
  custom: [],
};

export function roleHasPermission(role: AdfRole, permission: AdfPermission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function resolvePermissions(roles: AdfRole[]): AdfPermission[] {
  const set = new Set<AdfPermission>();
  for (const role of roles) {
    for (const p of ROLE_PERMISSIONS[role] ?? []) set.add(p);
  }
  return [...set];
}
