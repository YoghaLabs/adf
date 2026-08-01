import { createHash, randomBytes } from "node:crypto";
import { openIdentityDb } from "./db.js";
import { ADF_PERMISSIONS, ADF_ROLES, resolvePermissions, type AdfRole } from "./rbac.js";

export type Envelope<T> = { ok: boolean; data: T; error?: string; message?: string };

function now(): string {
  return new Date().toISOString();
}

function id(prefix: string): string {
  return `${prefix}_${randomBytes(8).toString("hex")}`;
}

function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

function ensureSeed(): void {
  const db = openIdentityDb();
  const permCount = db.prepare("SELECT COUNT(*) AS c FROM permissions").get() as { c: number };
  if (permCount.c === 0) {
    const ins = db.prepare(
      "INSERT INTO permissions (id, key, name, description) VALUES (?, ?, ?, ?)",
    );
    for (const key of ADF_PERMISSIONS) {
      ins.run(`perm_${key}`, key, key, `ADF permission ${key}`);
    }
  }
  const roleCount = db.prepare("SELECT COUNT(*) AS c FROM roles").get() as { c: number };
  if (roleCount.c === 0) {
    const ins = db.prepare(
      "INSERT INTO roles (id, organization_id, key, name, scope, created_at) VALUES (?, NULL, ?, ?, ?, ?)",
    );
    for (const key of ADF_ROLES) {
      ins.run(`role_${key}`, key, key.replace(/_/g, " "), key === "custom" ? "custom" : "system", now());
    }
  }
}

ensureSeed();

export function writeAudit(input: {
  actorId?: string | null;
  action: string;
  resource: string;
  detail?: string;
  ip?: string;
}): void {
  const db = openIdentityDb();
  db.prepare(
    `INSERT INTO audit_logs (id, actor_id, action, resource, detail, ip_address, created_at, immutable)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
  ).run(id("aud"), input.actorId ?? null, input.action, input.resource, input.detail ?? null, input.ip ?? null, now());
}

export class IdentityService {
  health(): Envelope<{ layer: string; provider: string; coreAgnostic: true }> {
    return {
      ok: true,
      data: { layer: "identity", provider: "better-auth", coreAgnostic: true },
    };
  }

  listRoles(): Envelope<{ roles: { id: string; key: string; name: string; scope: string }[]; count: number }> {
    const db = openIdentityDb();
    const roles = db
      .prepare("SELECT id, key, name, scope FROM roles ORDER BY key")
      .all() as { id: string; key: string; name: string; scope: string }[];
    return { ok: true, data: { roles, count: roles.length } };
  }

  listPermissions(): Envelope<{ permissions: { id: string; key: string; name: string }[]; count: number }> {
    const db = openIdentityDb();
    const permissions = db
      .prepare("SELECT id, key, name FROM permissions ORDER BY key")
      .all() as { id: string; key: string; name: string }[];
    return { ok: true, data: { permissions, count: permissions.length } };
  }

  resolveUserPermissions(roles: AdfRole[]): Envelope<{ permissions: string[]; count: number }> {
    const permissions = resolvePermissions(roles);
    return { ok: true, data: { permissions, count: permissions.length } };
  }

  listOrganizations(): Envelope<{ organizations: Record<string, unknown>[]; count: number }> {
    const db = openIdentityDb();
    const organizations = db.prepare("SELECT * FROM organizations ORDER BY created_at DESC").all() as Record<
      string,
      unknown
    >[];
    return { ok: true, data: { organizations, count: organizations.length } };
  }

  createOrganization(input: {
    name: string;
    slug: string;
    ownerUserId: string;
  }): Envelope<{ organization: Record<string, unknown> }> {
    const db = openIdentityDb();
    const orgId = id("org");
    const t = now();
    db.prepare(
      "INSERT INTO organizations (id, name, slug, logo, metadata, created_at) VALUES (?, ?, ?, NULL, NULL, ?)",
    ).run(orgId, input.name, input.slug, t);
    db.prepare(
      "INSERT INTO organization_members (id, organization_id, user_id, role, created_at) VALUES (?, ?, ?, ?, ?)",
    ).run(id("om"), orgId, input.ownerUserId, "organization_owner", t);
    writeAudit({
      actorId: input.ownerUserId,
      action: "organization.create",
      resource: orgId,
      detail: input.slug,
    });
    const organization = db.prepare("SELECT * FROM organizations WHERE id = ?").get(orgId) as Record<
      string,
      unknown
    >;
    return { ok: true, data: { organization }, message: "organization created" };
  }

  listWorkspaces(organizationId?: string): Envelope<{ workspaces: Record<string, unknown>[]; count: number }> {
    const db = openIdentityDb();
    const workspaces = organizationId
      ? (db
          .prepare("SELECT * FROM workspaces WHERE organization_id = ? ORDER BY name")
          .all(organizationId) as Record<string, unknown>[])
      : (db.prepare("SELECT * FROM workspaces ORDER BY name").all() as Record<string, unknown>[]);
    return { ok: true, data: { workspaces, count: workspaces.length } };
  }

  createWorkspace(input: {
    organizationId: string;
    name: string;
    slug: string;
    actorId?: string;
  }): Envelope<{ workspace: Record<string, unknown> }> {
    const db = openIdentityDb();
    const wsId = id("ws");
    const t = now();
    db.prepare(
      `INSERT INTO workspaces (id, organization_id, name, slug, description, created_at, updated_at)
       VALUES (?, ?, ?, ?, NULL, ?, ?)`,
    ).run(wsId, input.organizationId, input.name, input.slug, t, t);
    writeAudit({
      actorId: input.actorId,
      action: "workspace.create",
      resource: wsId,
      detail: input.slug,
    });
    const workspace = db.prepare("SELECT * FROM workspaces WHERE id = ?").get(wsId) as Record<string, unknown>;
    return { ok: true, data: { workspace } };
  }

  listAudit(limit = 100): Envelope<{ events: Record<string, unknown>[]; count: number; immutable: true }> {
    const db = openIdentityDb();
    const events = db
      .prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?")
      .all(limit) as Record<string, unknown>[];
    return { ok: true, data: { events, count: events.length, immutable: true } };
  }

  listLoginHistory(userId: string): Envelope<{ history: Record<string, unknown>[]; count: number }> {
    const db = openIdentityDb();
    const history = db
      .prepare("SELECT * FROM login_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50")
      .all(userId) as Record<string, unknown>[];
    return { ok: true, data: { history, count: history.length } };
  }

  createPat(input: {
    userId: string;
    name: string;
    scopes?: string[];
  }): Envelope<{ token: string; pat: Record<string, unknown> }> {
    const db = openIdentityDb();
    const raw = `adf_pat_${randomBytes(24).toString("hex")}`;
    const patId = id("pat");
    const t = now();
    db.prepare(
      `INSERT INTO personal_access_tokens (id, user_id, name, token_hash, scopes, expires_at, created_at, last_used_at, revoked_at)
       VALUES (?, ?, ?, ?, ?, NULL, ?, NULL, NULL)`,
    ).run(patId, input.userId, input.name, hashToken(raw), JSON.stringify(input.scopes ?? []), t);
    writeAudit({ actorId: input.userId, action: "pat.create", resource: patId, detail: input.name });
    const pat = db.prepare("SELECT id, user_id, name, scopes, created_at, revoked_at FROM personal_access_tokens WHERE id = ?").get(patId) as Record<
      string,
      unknown
    >;
    return { ok: true, data: { token: raw, pat }, message: "PAT created — copy now; not shown again" };
  }

  listPats(userId: string): Envelope<{ tokens: Record<string, unknown>[]; count: number }> {
    const db = openIdentityDb();
    const tokens = db
      .prepare(
        "SELECT id, user_id, name, scopes, created_at, last_used_at, revoked_at FROM personal_access_tokens WHERE user_id = ? ORDER BY created_at DESC",
      )
      .all(userId) as Record<string, unknown>[];
    return { ok: true, data: { tokens, count: tokens.length } };
  }

  revokePat(userId: string, patId: string): Envelope<{ revoked: true }> {
    const db = openIdentityDb();
    db.prepare(
      "UPDATE personal_access_tokens SET revoked_at = ? WHERE id = ? AND user_id = ? AND revoked_at IS NULL",
    ).run(now(), patId, userId);
    writeAudit({ actorId: userId, action: "pat.revoke", resource: patId });
    return { ok: true, data: { revoked: true } };
  }

  listInvitations(organizationId?: string): Envelope<{ invitations: Record<string, unknown>[]; count: number }> {
    const db = openIdentityDb();
    const invitations = organizationId
      ? (db
          .prepare("SELECT * FROM invitations WHERE organization_id = ? ORDER BY created_at DESC")
          .all(organizationId) as Record<string, unknown>[])
      : (db.prepare("SELECT * FROM invitations ORDER BY created_at DESC").all() as Record<string, unknown>[]);
    return { ok: true, data: { invitations, count: invitations.length } };
  }

  createInvitation(input: {
    organizationId: string;
    email: string;
    role: string;
    inviterId: string;
  }): Envelope<{ invitation: Record<string, unknown> }> {
    const db = openIdentityDb();
    const invId = id("inv");
    const t = now();
    const expires = new Date(Date.now() + 7 * 864e5).toISOString();
    db.prepare(
      `INSERT INTO invitations (id, organization_id, email, role, status, inviter_id, expires_at, created_at)
       VALUES (?, ?, ?, ?, 'pending', ?, ?, ?)`,
    ).run(invId, input.organizationId, input.email, input.role, input.inviterId, expires, t);
    writeAudit({
      actorId: input.inviterId,
      action: "invitation.create",
      resource: invId,
      detail: input.email,
    });
    const invitation = db.prepare("SELECT * FROM invitations WHERE id = ?").get(invId) as Record<string, unknown>;
    return { ok: true, data: { invitation } };
  }
}

export const identityService = new IdentityService();
