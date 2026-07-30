import { Badge, Card } from "@/components/ui";
import type {
  AnalyticsSnapshot,
  AuditEvent,
  ComplianceControl,
  ComplianceEvidence,
  EnterpriseGroup,
  EnterpriseIntegration,
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

export function OrganizationsPanel({
  organizations,
  units,
  teams,
}: {
  organizations: Organization[];
  units: OrgUnit[];
  teams: EnterpriseTeam[];
}) {
  return (
    <div data-testid="organizations-panel" className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Organizations</h3>
        <ul className="space-y-2 text-sm">
          {organizations.map((o) => (
            <li key={o.id} className="flex items-center justify-between gap-2">
              <span>
                {o.name} <span className="text-xs text-ink-muted">({o.slug})</span>
              </span>
              <Badge>{o.plan}</Badge>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Units & Teams</h3>
        <ul className="mb-3 space-y-1 text-sm">
          {units.map((u) => (
            <li key={u.id}>
              {u.name} · {u.kind}
            </li>
          ))}
        </ul>
        <ul className="space-y-1 text-xs text-ink-muted">
          {teams.map((t) => (
            <li key={t.id}>
              Team {t.name} → workspace {t.workspaceId ?? "—"}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function UsersPanel({
  users,
  groups,
}: {
  users: EnterpriseUser[];
  groups: EnterpriseGroup[];
}) {
  return (
    <div data-testid="users-panel" className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Users</h3>
        <ul className="space-y-2 text-sm">
          {users.map((u) => (
            <li key={u.id} className="flex items-center justify-between gap-2">
              <span>
                {u.displayName} <span className="text-xs text-ink-muted">{u.email}</span>
              </span>
              <Badge>{u.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Groups</h3>
        <ul className="space-y-2 text-sm">
          {groups.map((g) => (
            <li key={g.id} className="flex items-center justify-between gap-2">
              <span>{g.name}</span>
              <span className="text-xs text-ink-muted">{g.memberIds.length} members</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function RbacPanel({
  roles,
  permissions,
  matrix,
}: {
  roles: EnterpriseRole[];
  permissions: Permission[];
  matrix: PermissionMatrixCell[];
}) {
  const granted = matrix.filter((m) => m.granted).length;
  return (
    <div data-testid="rbac-panel" className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Roles (hierarchical)</h3>
        <ul className="space-y-2 text-sm">
          {roles.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-2">
              <span>{r.name}</span>
              <Badge>{r.scope}</Badge>
            </li>
          ))}
        </ul>
      </Card>
      <Card data-testid="permission-matrix">
        <h3 className="mb-3 text-sm font-semibold">Permission Matrix</h3>
        <p className="studio-muted mb-2 text-xs">
          {permissions.length} permissions · {granted} grants (incl. inheritance/overrides)
        </p>
        <ul className="max-h-48 space-y-1 overflow-y-auto text-xs">
          {permissions.map((p) => (
            <li key={p.id}>
              {p.key} — {p.label}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function PoliciesPanel({ items }: { items: GovernancePolicy[] }) {
  return (
    <Card data-testid="policies-panel">
      <h3 className="mb-3 text-sm font-semibold">Policies</h3>
      <ul className="space-y-2 text-sm">
        {items.map((p) => (
          <li key={p.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <span>{p.name}</span>
              <Badge>{p.status}</Badge>
            </div>
            <p className="studio-muted text-xs">
              {p.kind} — {p.summary}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function IdentityPanel({
  providers,
  sessions,
}: {
  providers: IdentityProvider[];
  sessions: IdentitySession[];
}) {
  return (
    <div data-testid="identity-panel" className="grid gap-4 lg:grid-cols-2">
      <Card data-testid="sso-providers">
        <h3 className="mb-3 text-sm font-semibold">Identity Providers / SSO</h3>
        <ul className="space-y-2 text-sm">
          {providers.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-2">
              <span>
                {p.name}
                {p.note ? <span className="studio-muted block text-xs">{p.note}</span> : null}
              </span>
              <Badge>{p.enabled ? "enabled" : "ready"}</Badge>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Sessions</h3>
        <ul className="space-y-2 text-sm">
          {sessions.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-2">
              <span>{s.userId}</span>
              <Badge>{s.active ? "active" : "ended"}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function AuditPanel({
  events,
  query,
  onQueryChange,
}: {
  events: AuditEvent[];
  query: string;
  onQueryChange: (q: string) => void;
}) {
  return (
    <Card data-testid="audit-panel">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Immutable Audit Trail</h3>
        <input
          data-testid="audit-search"
          className="rounded-md border border-line bg-canvas px-2 py-1 text-sm"
          placeholder="Search audit…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search audit events"
        />
      </div>
      <ul className="max-h-64 space-y-2 overflow-y-auto text-sm" data-testid="audit-list">
        {events.map((e) => (
          <li key={e.id} className="rounded-lg border border-line px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <span>
                {e.action} · {e.resource}
              </span>
              <Badge>{e.severity}</Badge>
            </div>
            <p className="studio-muted text-xs">
              {e.at.slice(0, 19)} · {e.actorId} · immutable={String(e.immutable)}
            </p>
            <p className="text-xs">{e.detail}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function CompliancePanel({
  controls,
  evidence,
}: {
  controls: ComplianceControl[];
  evidence: ComplianceEvidence[];
}) {
  return (
    <div data-testid="compliance-panel" className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Compliance Controls</h3>
        <ul className="space-y-2 text-sm">
          {controls.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-2">
              <span>{c.name}</span>
              <Badge>{c.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Evidence</h3>
        <ul className="space-y-2 text-sm">
          {evidence.map((e) => (
            <li key={e.id}>
              {e.title}{" "}
              <span className="text-xs text-ink-muted">({e.ref})</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function LicensePanel({ items }: { items: LicenseInfo[] }) {
  return (
    <Card data-testid="license-panel">
      <h3 className="mb-3 text-sm font-semibold">Licenses</h3>
      <ul className="space-y-2 text-sm">
        {items.map((l) => (
          <li key={l.id} className="flex items-center justify-between gap-2">
            <span>
              {l.type} · {l.seatsUsed}/{l.seats} seats
            </span>
            <Badge>{l.status}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function EnvironmentsPanel({ items }: { items: EnvironmentConfig[] }) {
  return (
    <Card data-testid="environments-panel">
      <h3 className="mb-3 text-sm font-semibold">Environments</h3>
      <ul className="space-y-2 text-sm">
        {items.map((e) => (
          <li key={e.id} className="flex items-center justify-between gap-2">
            <span>
              {e.name} · {e.variableCount} vars
            </span>
            <span className="text-xs text-ink-muted">{e.secretsRef}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function AnalyticsPanel({ snapshot }: { snapshot: AnalyticsSnapshot | null }) {
  if (!snapshot) {
    return (
      <Card data-testid="analytics-panel">
        <p className="studio-muted text-sm">No analytics loaded</p>
      </Card>
    );
  }
  return (
    <Card data-testid="analytics-panel">
      <h3 className="mb-3 text-sm font-semibold">Usage Analytics</h3>
      <dl className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <dt className="studio-muted text-xs">Organization</dt>
          <dd className="text-lg font-semibold">{snapshot.organizationUsage}</dd>
        </div>
        <div>
          <dt className="studio-muted text-xs">Workspace</dt>
          <dd className="text-lg font-semibold">{snapshot.workspaceUsage}</dd>
        </div>
        <div>
          <dt className="studio-muted text-xs">AI</dt>
          <dd className="text-lg font-semibold">{snapshot.aiUsage}</dd>
        </div>
        <div>
          <dt className="studio-muted text-xs">Packages</dt>
          <dd className="text-lg font-semibold">{snapshot.packageUsage}</dd>
        </div>
        <div>
          <dt className="studio-muted text-xs">Templates</dt>
          <dd className="text-lg font-semibold">{snapshot.templateUsage}</dd>
        </div>
      </dl>
    </Card>
  );
}

export function IntegrationsPanel({ items }: { items: EnterpriseIntegration[] }) {
  return (
    <Card data-testid="enterprise-integrations">
      <h3 className="mb-3 text-sm font-semibold">Platform Integrations</h3>
      <ul className="grid gap-2 sm:grid-cols-2 text-sm">
        {items.map((i) => (
          <li
            key={i.id}
            className="flex items-center justify-between rounded-lg border border-line px-3 py-2"
          >
            <a className="hover:text-accent" href={i.path}>
              {i.label}
            </a>
            <Badge>{i.status}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
