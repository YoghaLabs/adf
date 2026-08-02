import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Input } from "@/components/ui";
import {
  useAuditStore,
  useIdentitySessionStore,
  useIdentityStore,
  useIdentityWorkspaceStore,
  useInvitationStore,
  useOrganizationStore,
  usePermissionStore,
  useRoleStore,
} from "@/features/identity/stores";
import { identitySdk } from "@/features/identity/sdk/identityBridge";
import { useT } from "@/i18n";

export function IdentityPlatformPage() {
  const t = useT();
  const hydrate = useIdentityStore((s) => s.hydrate);
  const user = useIdentityStore((s) => s.user);
  const demo = useIdentityStore((s) => s.demo);
  const signOut = useIdentityStore((s) => s.signOut);

  const loadOrgs = useOrganizationStore((s) => s.load);
  const orgs = useOrganizationStore((s) => s.organizations);
  const activeOrgId = useOrganizationStore((s) => s.activeOrgId);
  const setActiveOrg = useOrganizationStore((s) => s.setActive);
  const createOrg = useOrganizationStore((s) => s.create);

  const loadWs = useIdentityWorkspaceStore((s) => s.load);
  const workspaces = useIdentityWorkspaceStore((s) => s.workspaces);

  const loadRoles = useRoleStore((s) => s.load);
  const roles = useRoleStore((s) => s.roles);

  const loadPerms = usePermissionStore((s) => s.load);
  const permissions = usePermissionStore((s) => s.permissions);

  const loadAudit = useAuditStore((s) => s.load);
  const events = useAuditStore((s) => s.events);

  const loadInv = useInvitationStore((s) => s.load);
  const invitations = useInvitationStore((s) => s.invitations);

  const loadSessions = useIdentitySessionStore((s) => s.load);
  const devices = useIdentitySessionStore((s) => s.devices);

  const [orgName, setOrgName] = useState("ADF Org");
  const [patName, setPatName] = useState("studio-cli");
  const [patOnce, setPatOnce] = useState<string | null>(null);
  const [health, setHealth] = useState<string>("…");

  useEffect(() => {
    void hydrate();
    void loadOrgs();
    void loadRoles();
    void loadPerms();
    void loadAudit();
    void loadInv();
    void loadSessions();
    void identitySdk.auth.health().then((r) => {
      if (!r.ok) {
        // Never surface raw connection/host errors in the UI.
        setHealth(t("identity.healthUnavailable"));
        return;
      }
      const d = r.data as {
        provider?: string;
        engine?: string;
        status?: string;
        coreAgnostic?: boolean;
      };
      // Public-safe only — no host, port, or connection URL.
      setHealth(
        `${d.provider ?? "identity"} · ${d.engine ?? "db"} · ${d.status ?? "ready"} · coreAgnostic=${d.coreAgnostic}`,
      );
    });
  }, [hydrate, loadAudit, loadInv, loadOrgs, loadPerms, loadRoles, loadSessions, t]);

  useEffect(() => {
    if (activeOrgId) void loadWs(activeOrgId);
  }, [activeOrgId, loadWs]);

  return (
    <div data-testid="page-identity" className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">{t("identity.title")}</h1>
          <p className="studio-muted mt-1">{t("identity.subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/identity/login">
            <Button variant="outline">{t("common.login")}</Button>
          </Link>
          <Link to="/identity/profile">
            <Button variant="outline">{t("common.profile")}</Button>
          </Link>
          <Link to="/identity/security">
            <Button variant="outline">{t("common.security")}</Button>
          </Link>
          <Button variant="ghost" onClick={() => void signOut()}>
            {t("common.signOut")}
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <div className="studio-muted text-xs">{t("identity.signedIn")}</div>
          <div className="mt-1 font-semibold">{user?.name ?? "—"}</div>
          <div className="font-mono text-xs text-ink-muted">{user?.email}</div>
          <div className="mt-2 text-xs">
            {demo ? t("identity.demoSession") : t("identity.liveSession")}
          </div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">{t("identity.health")}</div>
          <div className="mt-1 text-sm">{health}</div>
        </Card>
        <Card>
          <div className="studio-muted text-xs">{t("identity.quickLinks")}</div>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            <Link className="text-accent" to="/identity/organizations">
              {t("identity.organizations")}
            </Link>
            <Link className="text-accent" to="/identity/workspaces">
              {t("identity.workspaces")}
            </Link>
            <Link className="text-accent" to="/identity/roles">
              {t("identity.roles")}
            </Link>
            <Link className="text-accent" to="/identity/sessions">
              {t("identity.sessions")}
            </Link>
            <Link className="text-accent" to="/identity/tokens">
              {t("identity.tokens")}
            </Link>
            <Link className="text-accent" to="/identity/audit">
              {t("identity.audit")}
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card data-testid="identity-organizations">
          <h3 className="mb-3 text-sm font-semibold">{t("identity.organizations")}</h3>
          <ul className="mb-3 space-y-2 text-sm">
            {orgs.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-2">
                <button className="text-left" onClick={() => setActiveOrg(o.id)}>
                  {o.name} <span className="text-xs text-ink-muted">/{o.slug}</span>
                </button>
                {activeOrgId === o.id && <span className="text-xs text-accent">{t("identity.active")}</span>}
              </li>
            ))}
            {orgs.length === 0 && <li className="studio-muted">{t("identity.noOrganizations")}</li>}
          </ul>
          <div className="flex gap-2">
            <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} aria-label="Org name" />
            <Button
              variant="accent"
              onClick={() =>
                void createOrg(
                  orgName,
                  orgName
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, ""),
                )
              }
            >
              {t("common.create")}
            </Button>
          </div>
        </Card>

        <Card data-testid="identity-workspaces">
          <h3 className="mb-3 text-sm font-semibold">{t("identity.workspaces")}</h3>
          <ul className="space-y-2 text-sm">
            {workspaces.map((w) => (
              <li key={w.id}>
                {w.name} <span className="text-xs text-ink-muted">/{w.slug}</span>
              </li>
            ))}
            {workspaces.length === 0 && <li className="studio-muted">{t("identity.selectOrg")}</li>}
          </ul>
        </Card>

        <Card data-testid="identity-rbac">
          <h3 className="mb-3 text-sm font-semibold">{t("identity.rbac")}</h3>
          <p className="studio-muted mb-2 text-xs">
            {t("identity.rbacMeta", { roles: roles.length, permissions: permissions.length })}
          </p>
          <ul className="max-h-40 space-y-1 overflow-auto text-xs">
            {roles.slice(0, 12).map((r) => (
              <li key={r.id}>
                {r.key} <span className="text-ink-muted">({r.scope})</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card data-testid="identity-sessions">
          <h3 className="mb-3 text-sm font-semibold">{t("identity.devices")}</h3>
          <ul className="space-y-2 text-sm">
            {devices.map((d) => (
              <li key={d.id}>
                {d.label} <span className="text-xs text-ink-muted">{new Date(d.lastSeen).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card data-testid="identity-invitations">
          <h3 className="mb-3 text-sm font-semibold">{t("identity.invitations")}</h3>
          <ul className="space-y-2 text-sm">
            {invitations.map((i) => (
              <li key={i.id}>
                {i.email} · {i.role} · {i.status}
              </li>
            ))}
            {invitations.length === 0 && <li className="studio-muted">{t("common.none")}</li>}
          </ul>
        </Card>

        <Card data-testid="identity-tokens">
          <h3 className="mb-3 text-sm font-semibold">{t("identity.pat")}</h3>
          <div className="mb-2 flex gap-2">
            <Input value={patName} onChange={(e) => setPatName(e.target.value)} aria-label="PAT name" />
            <Button
              variant="accent"
              onClick={async () => {
                const r = await identitySdk.tokens.createPat({ name: patName });
                setPatOnce(r.ok ? r.data.token : null);
              }}
            >
              {t("identity.mint")}
            </Button>
          </div>
          {patOnce && <p className="break-all font-mono text-xs text-amber-300">{patOnce}</p>}
        </Card>
      </div>

      <Card data-testid="identity-audit">
        <h3 className="mb-3 text-sm font-semibold">{t("identity.audit")}</h3>
        <ul className="max-h-56 space-y-2 overflow-auto text-sm">
          {events.map((e) => (
            <li key={e.id} className="flex justify-between gap-2 border-b border-line/60 pb-1">
              <span>
                {e.action} · {e.resource}
                {e.detail ? ` · ${e.detail}` : ""}
              </span>
              <span className="text-xs text-ink-muted">{new Date(e.created_at).toLocaleString()}</span>
            </li>
          ))}
          {events.length === 0 && <li className="studio-muted">{t("identity.noEvents")}</li>}
        </ul>
      </Card>
    </div>
  );
}
