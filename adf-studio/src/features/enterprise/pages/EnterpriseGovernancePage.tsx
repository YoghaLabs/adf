import { useEffect } from "react";
import { Card } from "@/components/ui";
import {
  AnalyticsPanel,
  AuditPanel,
  CompliancePanel,
  EnvironmentsPanel,
  IdentityPanel,
  IntegrationsPanel,
  LicensePanel,
  OrganizationsPanel,
  PoliciesPanel,
  RbacPanel,
  UsersPanel,
} from "@/features/enterprise/pages/EnterprisePanels";
import {
  useAnalyticsStore,
  useAuditStore,
  useComplianceStore,
  useLicenseStore,
  useOrganizationStore,
  usePermissionStore,
  useRoleStore,
  useUserStore,
} from "@/features/enterprise/stores";

export function EnterpriseGovernancePage() {
  const loadOrg = useOrganizationStore((s) => s.load);
  const overview = useOrganizationStore((s) => s.overview);
  const organizations = useOrganizationStore((s) => s.organizations);
  const units = useOrganizationStore((s) => s.units);
  const teams = useOrganizationStore((s) => s.teams);
  const integrations = useOrganizationStore((s) => s.integrations);
  const environments = useOrganizationStore((s) => s.environments);
  const policies = useOrganizationStore((s) => s.policies);

  const loadUsers = useUserStore((s) => s.load);
  const users = useUserStore((s) => s.users);
  const groups = useUserStore((s) => s.groups);
  const providers = useUserStore((s) => s.providers);
  const sessions = useUserStore((s) => s.sessions);

  const loadRoles = useRoleStore((s) => s.load);
  const roles = useRoleStore((s) => s.roles);

  const loadPermissions = usePermissionStore((s) => s.load);
  const permissions = usePermissionStore((s) => s.permissions);
  const matrix = usePermissionStore((s) => s.matrix);

  const loadAudit = useAuditStore((s) => s.load);
  const auditEvents = useAuditStore((s) => s.events);
  const auditQuery = useAuditStore((s) => s.query);
  const setAuditQuery = useAuditStore((s) => s.setQuery);

  const loadCompliance = useComplianceStore((s) => s.load);
  const controls = useComplianceStore((s) => s.controls);
  const evidence = useComplianceStore((s) => s.evidence);

  const loadLicenses = useLicenseStore((s) => s.load);
  const licenses = useLicenseStore((s) => s.licenses);

  const loadAnalytics = useAnalyticsStore((s) => s.load);
  const analytics = useAnalyticsStore((s) => s.snapshot);

  useEffect(() => {
    void loadOrg();
    void loadUsers();
    void loadRoles();
    void loadPermissions();
    void loadAudit();
    void loadCompliance();
    void loadLicenses();
    void loadAnalytics();
  }, [
    loadAnalytics,
    loadAudit,
    loadCompliance,
    loadLicenses,
    loadOrg,
    loadPermissions,
    loadRoles,
    loadUsers,
  ]);

  return (
    <div data-testid="page-enterprise" className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Enterprise Governance
        </h1>
        <p className="studio-muted mt-1">
          Organization, identity, RBAC, policies, audit, and compliance — modular governance for
          enterprise adoption. No redesign; Studio remains presentation-only.
        </p>
      </div>

      <div data-testid="enterprise-overview" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="studio-muted text-xs">Organizations</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.organizationCount ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Users</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.userCount ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Roles</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.roleCount ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Seats</div>
          <div className="mt-2 text-2xl font-semibold">
            {overview ? `${overview.seatsUsed}/${overview.seatsTotal}` : "—"}
          </div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Critical Audit</div>
          <div className="mt-2 text-2xl font-semibold">{overview?.openAuditCritical ?? "—"}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">Compliance Pass</div>
          <div className="mt-2 text-2xl font-semibold">
            {overview ? `${overview.compliancePassRate}%` : "—"}
          </div>
        </Card>
      </div>

      <OrganizationsPanel organizations={organizations} units={units} teams={teams} />
      <UsersPanel users={users} groups={groups} />
      <RbacPanel roles={roles} permissions={permissions} matrix={matrix} />
      <IdentityPanel providers={providers} sessions={sessions} />
      <PoliciesPanel items={policies} />
      <AuditPanel events={auditEvents} query={auditQuery} onQueryChange={setAuditQuery} />
      <CompliancePanel controls={controls} evidence={evidence} />

      <div className="grid gap-4 lg:grid-cols-2">
        <LicensePanel items={licenses} />
        <EnvironmentsPanel items={environments} />
      </div>

      <AnalyticsPanel snapshot={analytics} />
      <IntegrationsPanel items={integrations} />
    </div>
  );
}
