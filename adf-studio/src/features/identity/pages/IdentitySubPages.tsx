import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui";
import {
  useAuditStore,
  useIdentitySessionStore,
  useIdentityStore,
  useIdentityWorkspaceStore,
  useInvitationStore,
  useOrganizationStore,
  usePermissionStore,
  useRoleStore,
  useTeamStore,
} from "@/features/identity/stores";

function Shell({
  title,
  testId,
  children,
}: {
  title: string;
  testId: string;
  children: React.ReactNode;
}) {
  return (
    <div data-testid={testId} className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        <Link className="text-sm text-accent" to="/identity">
          Identity hub
        </Link>
      </div>
      {children}
    </div>
  );
}

export function OrganizationSelectorPage() {
  const load = useOrganizationStore((s) => s.load);
  const orgs = useOrganizationStore((s) => s.organizations);
  const setActive = useOrganizationStore((s) => s.setActive);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <Shell title="Organization selector" testId="page-org-selector">
      <Card>
        <ul className="space-y-2 text-sm">
          {orgs.map((o) => (
            <li key={o.id}>
              <button onClick={() => setActive(o.id)}>
                {o.name} /{o.slug}
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

export function WorkspaceSelectorPage() {
  const orgId = useOrganizationStore((s) => s.activeOrgId);
  const load = useIdentityWorkspaceStore((s) => s.load);
  const workspaces = useIdentityWorkspaceStore((s) => s.workspaces);
  useEffect(() => {
    void load(orgId ?? undefined);
  }, [load, orgId]);
  return (
    <Shell title="Workspace selector" testId="page-workspace-selector">
      <Card>
        <ul className="space-y-2 text-sm">
          {workspaces.map((w) => (
            <li key={w.id}>
              {w.name} /{w.slug}
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

export function ProfilePage() {
  const user = useIdentityStore((s) => s.user);
  const hydrate = useIdentityStore((s) => s.hydrate);
  useEffect(() => {
    void hydrate();
  }, [hydrate]);
  return (
    <Shell title="Profile" testId="page-profile">
      <Card>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="studio-muted">Name</dt>
            <dd>{user?.name}</dd>
          </div>
          <div>
            <dt className="studio-muted">Email</dt>
            <dd>{user?.email}</dd>
          </div>
          <div>
            <dt className="studio-muted">User ID</dt>
            <dd className="font-mono text-xs">{user?.id}</dd>
          </div>
        </dl>
      </Card>
    </Shell>
  );
}

export function SecurityPage() {
  return (
    <Shell title="Security" testId="page-security">
      <Card className="space-y-2 text-sm">
        <p>Password policy: min 10 characters</p>
        <p>MFA: ready (provider hooks)</p>
        <p>Email verification: Better Auth</p>
        <p>CSRF / secure cookies: Identity Layer headers</p>
        <p>Passkeys: future</p>
      </Card>
    </Shell>
  );
}

export function SessionsPage() {
  const load = useIdentitySessionStore((s) => s.load);
  const devices = useIdentitySessionStore((s) => s.devices);
  const history = useIdentitySessionStore((s) => s.loginHistory);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <Shell title="Sessions & devices" testId="page-identity-sessions">
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <h3 className="mb-2 text-sm font-semibold">Active devices</h3>
          <ul className="space-y-2 text-sm">
            {devices.map((d) => (
              <li key={d.id}>{d.label}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="mb-2 text-sm font-semibold">Login history</h3>
          <ul className="space-y-2 text-sm">
            {history.length === 0 && <li className="studio-muted">No history yet</li>}
            {history.map((h, i) => (
              <li key={i}>{JSON.stringify(h)}</li>
            ))}
          </ul>
        </Card>
      </div>
    </Shell>
  );
}

export function ApiKeysPage() {
  return (
    <Shell title="API keys & access tokens" testId="page-api-keys">
      <Card className="text-sm">
        Mint PATs from the <Link className="text-accent" to="/identity">Identity hub</Link>. Tokens are hashed at rest;
        raw value shown once.
      </Card>
    </Shell>
  );
}

export function InvitationsPage() {
  const load = useInvitationStore((s) => s.load);
  const invitations = useInvitationStore((s) => s.invitations);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <Shell title="Invitations" testId="page-invitations">
      <Card>
        <ul className="space-y-2 text-sm">
          {invitations.map((i) => (
            <li key={i.id}>
              {i.email} · {i.role} · {i.status}
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

export function MembersPage() {
  return (
    <Shell title="Members" testId="page-members">
      <Card className="text-sm studio-muted">Organization members resolve via Identity organization_members.</Card>
    </Shell>
  );
}

export function RolesPage() {
  const load = useRoleStore((s) => s.load);
  const roles = useRoleStore((s) => s.roles);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <Shell title="Roles" testId="page-roles">
      <Card>
        <ul className="space-y-1 text-sm">
          {roles.map((r) => (
            <li key={r.id}>
              {r.key} · {r.scope}
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

export function PermissionsPage() {
  const load = usePermissionStore((s) => s.load);
  const permissions = usePermissionStore((s) => s.permissions);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <Shell title="Permissions" testId="page-permissions">
      <Card>
        <ul className="max-h-96 space-y-1 overflow-auto text-sm">
          {permissions.map((p) => (
            <li key={p.id}>{p.key}</li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

export function AuditPage() {
  const load = useAuditStore((s) => s.load);
  const events = useAuditStore((s) => s.events);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <Shell title="Audit trail" testId="page-audit">
      <Card>
        <ul className="max-h-96 space-y-2 overflow-auto text-sm">
          {events.map((e) => (
            <li key={e.id}>
              {e.action} · {e.resource}
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

export function TeamsPage() {
  const load = useTeamStore((s) => s.load);
  const teams = useTeamStore((s) => s.teams);
  useEffect(() => {
    void load();
  }, [load]);
  return (
    <Shell title="Teams" testId="page-teams">
      <Card>
        <ul className="space-y-2 text-sm">
          {teams.length === 0 && <li className="studio-muted">No teams yet</li>}
          {teams.map((t) => (
            <li key={t.id}>{t.name}</li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}
