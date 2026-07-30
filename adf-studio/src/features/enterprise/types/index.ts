/** Enterprise governance types — presentation contracts only (BUILD-019).
 *  Governance / identity / RBAC / audit / compliance — not a new platform.
 *  Studio remains presentation-only: UI → SDK → Service Layer → Core.
 */

export type OrgUnitKind = "organization" | "business_unit" | "department" | "team";

export type RoleScope = "system" | "organization" | "workspace" | "project" | "custom";

export type IdentityProviderKind =
  | "oidc"
  | "oauth2"
  | "saml"
  | "ldap"
  | "azure_ad"
  | "google_workspace"
  | "keycloak";

export type PolicyKind =
  | "security"
  | "workspace"
  | "approval"
  | "password"
  | "retention";

export type EnvironmentKind = "development" | "testing" | "staging" | "production";

export type LicenseType = "community" | "team" | "enterprise" | "trial";

export type AuditSeverity = "info" | "warning" | "critical";

export type ComplianceStatus = "pass" | "fail" | "partial" | "not_assessed";

export type Organization = {
  id: string;
  name: string;
  slug: string;
  plan: LicenseType;
  workspaceIds: string[];
};

export type OrgUnit = {
  id: string;
  organizationId: string;
  kind: OrgUnitKind;
  name: string;
  parentId?: string;
};

export type EnterpriseTeam = {
  id: string;
  organizationId: string;
  departmentId?: string;
  name: string;
  memberIds: string[];
  workspaceId?: string;
};

export type EnterpriseUser = {
  id: string;
  email: string;
  displayName: string;
  organizationId: string;
  groupIds: string[];
  roleIds: string[];
  status: "active" | "invited" | "disabled";
  profile: { title?: string; timezone?: string };
};

export type EnterpriseGroup = {
  id: string;
  name: string;
  organizationId: string;
  memberIds: string[];
};

export type EnterpriseRole = {
  id: string;
  name: string;
  scope: RoleScope;
  permissionIds: string[];
  description: string;
};

export type Permission = {
  id: string;
  key: string;
  label: string;
  resource: string;
  action: string;
};

export type PermissionMatrixCell = {
  roleId: string;
  permissionId: string;
  granted: boolean;
  inherited: boolean;
  overridden: boolean;
};

export type IdentityProvider = {
  id: string;
  kind: IdentityProviderKind;
  name: string;
  enabled: boolean;
  architectureReady: boolean;
  note?: string;
};

export type IdentitySession = {
  id: string;
  userId: string;
  providerId: string;
  startedAt: string;
  expiresAt: string;
  active: boolean;
};

export type GovernancePolicy = {
  id: string;
  kind: PolicyKind;
  name: string;
  status: "active" | "draft" | "deprecated";
  summary: string;
};

export type AuditEvent = {
  id: string;
  at: string;
  actorId: string;
  action: string;
  resource: string;
  severity: AuditSeverity;
  immutable: true;
  detail: string;
};

export type ComplianceControl = {
  id: string;
  name: string;
  status: ComplianceStatus;
  evidenceIds: string[];
};

export type ComplianceEvidence = {
  id: string;
  title: string;
  controlId: string;
  ref: string;
};

export type LicenseInfo = {
  id: string;
  type: LicenseType;
  seats: number;
  seatsUsed: number;
  activatedAt: string;
  expiresAt: string;
  status: "active" | "expiring" | "expired";
};

export type EnvironmentConfig = {
  id: string;
  kind: EnvironmentKind;
  name: string;
  variableCount: number;
  secretsRef: string;
};

export type AnalyticsSnapshot = {
  organizationUsage: number;
  workspaceUsage: number;
  aiUsage: number;
  packageUsage: number;
  templateUsage: number;
};

export type EnterpriseIntegration = {
  id: string;
  target:
    | "workspace"
    | "projects"
    | "collaboration"
    | "orchestration"
    | "marketplace"
    | "distribution"
    | "runtime";
  label: string;
  path: string;
  status: "linked" | "planned";
};

export type EnterpriseOverview = {
  organizationCount: number;
  userCount: number;
  roleCount: number;
  openAuditCritical: number;
  compliancePassRate: number;
  seatsUsed: number;
  seatsTotal: number;
};
