import type {
  AnalyticsSnapshot,
  AuditEvent,
  ComplianceControl,
  ComplianceEvidence,
  EnterpriseGroup,
  EnterpriseIntegration,
  EnterpriseOverview,
  EnterpriseRole,
  EnterpriseTeam,
  EnterpriseUser,
  EnvironmentConfig,
  GovernancePolicy,
  IdentityProvider,
  IdentitySession,
  LicenseInfo,
  Organization,
  OrgUnit,
  Permission,
  PermissionMatrixCell,
} from "@/features/enterprise/types";

/** Presentation fixtures — governance model only; no auth runtime in Studio. */

export const ORGANIZATIONS: Organization[] = [
  {
    id: "org-yoghalabs",
    name: "YoghaLabs",
    slug: "yoghalabs",
    plan: "enterprise",
    workspaceIds: ["ws-adf"],
  },
];

export const ORG_UNITS: OrgUnit[] = [
  {
    id: "ou-org",
    organizationId: "org-yoghalabs",
    kind: "organization",
    name: "YoghaLabs",
  },
  {
    id: "ou-bu-eng",
    organizationId: "org-yoghalabs",
    kind: "business_unit",
    name: "Engineering",
    parentId: "ou-org",
  },
  {
    id: "ou-dept-plat",
    organizationId: "org-yoghalabs",
    kind: "department",
    name: "Platform",
    parentId: "ou-bu-eng",
  },
  {
    id: "ou-team-adf",
    organizationId: "org-yoghalabs",
    kind: "team",
    name: "ADF Core",
    parentId: "ou-dept-plat",
  },
];

export const TEAMS: EnterpriseTeam[] = [
  {
    id: "team-adf",
    organizationId: "org-yoghalabs",
    departmentId: "ou-dept-plat",
    name: "ADF Core",
    memberIds: ["user-yogha", "user-ops"],
    workspaceId: "ws-adf",
  },
];

export const USERS: EnterpriseUser[] = [
  {
    id: "user-yogha",
    email: "yogha@yoghalabs.dev",
    displayName: "Yogha",
    organizationId: "org-yoghalabs",
    groupIds: ["grp-admins"],
    roleIds: ["role-org-admin", "role-ws-owner"],
    status: "active",
    profile: { title: "Operator", timezone: "Asia/Jakarta" },
  },
  {
    id: "user-ops",
    email: "ops@yoghalabs.dev",
    displayName: "Ops Lead",
    organizationId: "org-yoghalabs",
    groupIds: ["grp-ops"],
    roleIds: ["role-ws-member"],
    status: "active",
    profile: { title: "Operations", timezone: "UTC" },
  },
  {
    id: "user-guest",
    email: "guest@example.com",
    displayName: "Guest Reviewer",
    organizationId: "org-yoghalabs",
    groupIds: [],
    roleIds: ["role-proj-reviewer"],
    status: "invited",
    profile: {},
  },
];

export const GROUPS: EnterpriseGroup[] = [
  {
    id: "grp-admins",
    name: "Admins",
    organizationId: "org-yoghalabs",
    memberIds: ["user-yogha"],
  },
  {
    id: "grp-ops",
    name: "Operations",
    organizationId: "org-yoghalabs",
    memberIds: ["user-ops"],
  },
];

export const PERMISSIONS: Permission[] = [
  { id: "perm-org-read", key: "org.read", label: "Read organization", resource: "organization", action: "read" },
  { id: "perm-org-admin", key: "org.admin", label: "Administer organization", resource: "organization", action: "admin" },
  { id: "perm-ws-write", key: "workspace.write", label: "Write workspace", resource: "workspace", action: "write" },
  { id: "perm-ws-admin", key: "workspace.admin", label: "Admin workspace", resource: "workspace", action: "admin" },
  { id: "perm-proj-review", key: "project.review", label: "Review project", resource: "project", action: "review" },
  { id: "perm-audit-read", key: "audit.read", label: "Read audit", resource: "audit", action: "read" },
  { id: "perm-audit-export", key: "audit.export", label: "Export audit", resource: "audit", action: "export" },
];

export const ROLES: EnterpriseRole[] = [
  {
    id: "role-sys-admin",
    name: "System Admin",
    scope: "system",
    permissionIds: PERMISSIONS.map((p) => p.id),
    description: "Full system scope",
  },
  {
    id: "role-org-admin",
    name: "Organization Admin",
    scope: "organization",
    permissionIds: ["perm-org-read", "perm-org-admin", "perm-ws-admin", "perm-audit-read"],
    description: "Org-level administration",
  },
  {
    id: "role-ws-owner",
    name: "Workspace Owner",
    scope: "workspace",
    permissionIds: ["perm-ws-write", "perm-ws-admin", "perm-proj-review"],
    description: "Owns mapped workspaces",
  },
  {
    id: "role-ws-member",
    name: "Workspace Member",
    scope: "workspace",
    permissionIds: ["perm-ws-write", "perm-proj-review"],
    description: "Standard workspace member",
  },
  {
    id: "role-proj-reviewer",
    name: "Project Reviewer",
    scope: "project",
    permissionIds: ["perm-proj-review"],
    description: "Project review only",
  },
  {
    id: "role-custom-auditor",
    name: "Custom Auditor",
    scope: "custom",
    permissionIds: ["perm-audit-read", "perm-audit-export"],
    description: "Custom audit role",
  },
];

export const PERMISSION_MATRIX: PermissionMatrixCell[] = ROLES.flatMap((role) =>
  PERMISSIONS.map((perm) => {
    const granted = role.permissionIds.includes(perm.id);
    const inherited = role.scope !== "custom" && granted && perm.key.startsWith("org.");
    return {
      roleId: role.id,
      permissionId: perm.id,
      granted,
      inherited: Boolean(inherited),
      overridden: role.scope === "custom" && granted,
    };
  }),
);

export const IDENTITY_PROVIDERS: IdentityProvider[] = [
  { id: "idp-oidc", kind: "oidc", name: "OpenID Connect", enabled: true, architectureReady: true },
  { id: "idp-oauth2", kind: "oauth2", name: "OAuth2", enabled: true, architectureReady: true },
  {
    id: "idp-saml",
    kind: "saml",
    name: "SAML",
    enabled: false,
    architectureReady: true,
    note: "Architecture-ready — not wired",
  },
  {
    id: "idp-ldap",
    kind: "ldap",
    name: "LDAP",
    enabled: false,
    architectureReady: true,
    note: "Architecture-ready — not wired",
  },
  { id: "idp-azure", kind: "azure_ad", name: "Azure AD", enabled: false, architectureReady: true },
  {
    id: "idp-google",
    kind: "google_workspace",
    name: "Google Workspace",
    enabled: false,
    architectureReady: true,
  },
  { id: "idp-keycloak", kind: "keycloak", name: "Keycloak", enabled: false, architectureReady: true },
];

export const IDENTITY_SESSIONS: IdentitySession[] = [
  {
    id: "sess-yogha",
    userId: "user-yogha",
    providerId: "idp-oidc",
    startedAt: "2026-07-30T08:00:00.000Z",
    expiresAt: "2026-07-30T20:00:00.000Z",
    active: true,
  },
];

export const POLICIES: GovernancePolicy[] = [
  {
    id: "pol-sec",
    kind: "security",
    name: "Baseline Security",
    status: "active",
    summary: "MFA preferred; SSO for enterprise seats",
  },
  {
    id: "pol-ws",
    kind: "workspace",
    name: "Workspace Isolation",
    status: "active",
    summary: "Workspaces map to org units",
  },
  {
    id: "pol-appr",
    kind: "approval",
    name: "Approval Quorum",
    status: "active",
    summary: "Release approvals require org admin",
  },
  {
    id: "pol-pwd",
    kind: "password",
    name: "Password Policy",
    status: "draft",
    summary: "Applies when local auth enabled",
  },
  {
    id: "pol-ret",
    kind: "retention",
    name: "Audit Retention",
    status: "active",
    summary: "Immutable audit retained 365 days (policy)",
  },
];

export const AUDIT_EVENTS: AuditEvent[] = [
  {
    id: "ae-1",
    at: "2026-07-30T09:00:00.000Z",
    actorId: "user-yogha",
    action: "role.assign",
    resource: "role-ws-owner",
    severity: "info",
    immutable: true,
    detail: "Assigned workspace owner role",
  },
  {
    id: "ae-2",
    at: "2026-07-30T10:00:00.000Z",
    actorId: "user-yogha",
    action: "policy.update",
    resource: "pol-sec",
    severity: "warning",
    immutable: true,
    detail: "Security policy draft reviewed",
  },
  {
    id: "ae-3",
    at: "2026-07-30T11:00:00.000Z",
    actorId: "user-ops",
    action: "audit.export",
    resource: "audit",
    severity: "critical",
    immutable: true,
    detail: "Export requested (presentation only)",
  },
];

export const COMPLIANCE_CONTROLS: ComplianceControl[] = [
  {
    id: "ctrl-access",
    name: "Access Control",
    status: "pass",
    evidenceIds: ["ev-rbac"],
  },
  {
    id: "ctrl-audit",
    name: "Immutable Audit",
    status: "pass",
    evidenceIds: ["ev-audit"],
  },
  {
    id: "ctrl-sso",
    name: "SSO Availability",
    status: "partial",
    evidenceIds: ["ev-sso"],
  },
];

export const COMPLIANCE_EVIDENCE: ComplianceEvidence[] = [
  { id: "ev-rbac", title: "RBAC matrix fixture", controlId: "ctrl-access", ref: "docs://RBAC_MODEL" },
  { id: "ev-audit", title: "Audit immutability flag", controlId: "ctrl-audit", ref: "docs://AUDIT_SYSTEM" },
  { id: "ev-sso", title: "IdP architecture catalog", controlId: "ctrl-sso", ref: "docs://IDENTITY" },
];

export const LICENSES: LicenseInfo[] = [
  {
    id: "lic-ent",
    type: "enterprise",
    seats: 25,
    seatsUsed: 3,
    activatedAt: "2026-01-01T00:00:00.000Z",
    expiresAt: "2027-01-01T00:00:00.000Z",
    status: "active",
  },
];

export const ENVIRONMENTS: EnvironmentConfig[] = [
  {
    id: "env-dev",
    kind: "development",
    name: "Development",
    variableCount: 12,
    secretsRef: "secrets://dev",
  },
  {
    id: "env-test",
    kind: "testing",
    name: "Testing",
    variableCount: 10,
    secretsRef: "secrets://test",
  },
  {
    id: "env-stg",
    kind: "staging",
    name: "Staging",
    variableCount: 14,
    secretsRef: "secrets://staging",
  },
  {
    id: "env-prod",
    kind: "production",
    name: "Production",
    variableCount: 18,
    secretsRef: "secrets://prod",
  },
];

export const ANALYTICS: AnalyticsSnapshot = {
  organizationUsage: 42,
  workspaceUsage: 18,
  aiUsage: 120,
  packageUsage: 9,
  templateUsage: 5,
};

export const ENTERPRISE_INTEGRATIONS: EnterpriseIntegration[] = [
  { id: "ei-ws", target: "workspace", label: "Workspace", path: "/workspace", status: "linked" },
  { id: "ei-proj", target: "projects", label: "Projects", path: "/projects", status: "linked" },
  {
    id: "ei-collab",
    target: "collaboration",
    label: "Collaboration",
    path: "/collaboration",
    status: "linked",
  },
  {
    id: "ei-orch",
    target: "orchestration",
    label: "Orchestration",
    path: "/orchestration",
    status: "linked",
  },
  { id: "ei-mkt", target: "marketplace", label: "Marketplace", path: "/marketplace", status: "linked" },
  { id: "ei-dist", target: "distribution", label: "Distribution", path: "/release", status: "linked" },
  { id: "ei-rt", target: "runtime", label: "Runtime", path: "/runtime", status: "linked" },
];

export function getEnterpriseOverview(): EnterpriseOverview {
  const pass = COMPLIANCE_CONTROLS.filter((c) => c.status === "pass").length;
  const license = LICENSES[0];
  return {
    organizationCount: ORGANIZATIONS.length,
    userCount: USERS.length,
    roleCount: ROLES.length,
    openAuditCritical: AUDIT_EVENTS.filter((e) => e.severity === "critical").length,
    compliancePassRate: COMPLIANCE_CONTROLS.length
      ? Math.round((pass / COMPLIANCE_CONTROLS.length) * 100)
      : 0,
    seatsUsed: license?.seatsUsed ?? 0,
    seatsTotal: license?.seats ?? 0,
  };
}

export function searchAudit(query: string): AuditEvent[] {
  const q = query.trim().toLowerCase();
  if (!q) return AUDIT_EVENTS;
  return AUDIT_EVENTS.filter(
    (e) =>
      e.action.toLowerCase().includes(q) ||
      e.resource.toLowerCase().includes(q) ||
      e.detail.toLowerCase().includes(q) ||
      e.actorId.toLowerCase().includes(q),
  );
}
