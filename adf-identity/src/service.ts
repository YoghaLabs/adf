import { createHash, randomBytes } from "node:crypto";
import { identityDbHostLabel } from "./config.js";
import { migrateIdentitySchema, queryIdentity } from "./db.js";
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

let seeded = false;

async function ensureSeed(): Promise<void> {
  if (seeded) return;
  await migrateIdentitySchema();
  const permCount = await queryIdentity<{ c: string }>("SELECT COUNT(*)::text AS c FROM permissions");
  if (Number(permCount.rows[0]?.c || 0) === 0) {
    for (const key of ADF_PERMISSIONS) {
      await queryIdentity(
        "INSERT INTO permissions (id, key, name, description) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING",
        [`perm_${key}`, key, key, `ADF permission ${key}`],
      );
    }
  }
  const roleCount = await queryIdentity<{ c: string }>("SELECT COUNT(*)::text AS c FROM roles");
  if (Number(roleCount.rows[0]?.c || 0) === 0) {
    for (const key of ADF_ROLES) {
      await queryIdentity(
        `INSERT INTO roles (id, organization_id, key, name, scope, created_at)
         VALUES ($1, NULL, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING`,
        [
          `role_${key}`,
          key,
          key.replace(/_/g, " "),
          key === "custom" ? "custom" : "system",
          now(),
        ],
      );
    }
  }
  seeded = true;
}

export async function writeAudit(input: {
  actorId?: string | null;
  action: string;
  resource: string;
  detail?: string;
  ip?: string;
}): Promise<void> {
  await ensureSeed();
  await queryIdentity(
    `INSERT INTO audit_logs (id, actor_id, action, resource, detail, ip_address, created_at, immutable)
     VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE)`,
    [
      id("aud"),
      input.actorId ?? null,
      input.action,
      input.resource,
      input.detail ?? null,
      input.ip ?? null,
      now(),
    ],
  );
}

export class IdentityService {
  async health(): Promise<
    Envelope<{
      layer: string;
      provider: string;
      database: string;
      engine: "postgresql";
      coreAgnostic: true;
    }>
  > {
    await ensureSeed();
    await queryIdentity("SELECT 1");
    return {
      ok: true,
      data: {
        layer: "identity",
        provider: "better-auth",
        database: identityDbHostLabel(),
        engine: "postgresql",
        coreAgnostic: true,
      },
    };
  }

  async listRoles(): Promise<
    Envelope<{ roles: { id: string; key: string; name: string; scope: string }[]; count: number }>
  > {
    await ensureSeed();
    const result = await queryIdentity<{ id: string; key: string; name: string; scope: string }>(
      "SELECT id, key, name, scope FROM roles ORDER BY key",
    );
    return { ok: true, data: { roles: result.rows, count: result.rows.length } };
  }

  async listPermissions(): Promise<
    Envelope<{ permissions: { id: string; key: string; name: string }[]; count: number }>
  > {
    await ensureSeed();
    const result = await queryIdentity<{ id: string; key: string; name: string }>(
      "SELECT id, key, name FROM permissions ORDER BY key",
    );
    return { ok: true, data: { permissions: result.rows, count: result.rows.length } };
  }

  resolveUserPermissions(roles: AdfRole[]): Envelope<{ permissions: string[]; count: number }> {
    const permissions = resolvePermissions(roles);
    return { ok: true, data: { permissions, count: permissions.length } };
  }

  async listOrganizations(): Promise<
    Envelope<{ organizations: Record<string, unknown>[]; count: number }>
  > {
    await ensureSeed();
    const result = await queryIdentity("SELECT * FROM organizations ORDER BY created_at DESC");
    return { ok: true, data: { organizations: result.rows, count: result.rows.length } };
  }

  async createOrganization(input: {
    name: string;
    slug: string;
    ownerUserId: string;
  }): Promise<Envelope<{ organization: Record<string, unknown> }>> {
    await ensureSeed();
    const orgId = id("org");
    const t = now();
    await queryIdentity(
      "INSERT INTO organizations (id, name, slug, logo, metadata, created_at) VALUES ($1, $2, $3, NULL, NULL, $4)",
      [orgId, input.name, input.slug, t],
    );
    await queryIdentity(
      "INSERT INTO organization_members (id, organization_id, user_id, role, created_at) VALUES ($1, $2, $3, $4, $5)",
      [id("om"), orgId, input.ownerUserId, "organization_owner", t],
    );
    await writeAudit({
      actorId: input.ownerUserId,
      action: "organization.create",
      resource: orgId,
      detail: input.slug,
    });
    const organization = await queryIdentity("SELECT * FROM organizations WHERE id = $1", [orgId]);
    return {
      ok: true,
      data: { organization: organization.rows[0] ?? {} },
      message: "organization created",
    };
  }

  async listWorkspaces(
    organizationId?: string,
  ): Promise<Envelope<{ workspaces: Record<string, unknown>[]; count: number }>> {
    await ensureSeed();
    const result = organizationId
      ? await queryIdentity("SELECT * FROM workspaces WHERE organization_id = $1 ORDER BY name", [
          organizationId,
        ])
      : await queryIdentity("SELECT * FROM workspaces ORDER BY name");
    return { ok: true, data: { workspaces: result.rows, count: result.rows.length } };
  }

  async createWorkspace(input: {
    organizationId: string;
    name: string;
    slug: string;
    actorId?: string;
  }): Promise<Envelope<{ workspace: Record<string, unknown> }>> {
    await ensureSeed();
    const wsId = id("ws");
    const t = now();
    await queryIdentity(
      `INSERT INTO workspaces (id, organization_id, name, slug, description, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NULL, $5, $6)`,
      [wsId, input.organizationId, input.name, input.slug, t, t],
    );
    await writeAudit({
      actorId: input.actorId,
      action: "workspace.create",
      resource: wsId,
      detail: input.slug,
    });
    const workspace = await queryIdentity("SELECT * FROM workspaces WHERE id = $1", [wsId]);
    return { ok: true, data: { workspace: workspace.rows[0] ?? {} } };
  }

  async listAudit(
    limit = 100,
  ): Promise<Envelope<{ events: Record<string, unknown>[]; count: number; immutable: true }>> {
    await ensureSeed();
    const result = await queryIdentity(
      "SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT $1",
      [limit],
    );
    return { ok: true, data: { events: result.rows, count: result.rows.length, immutable: true } };
  }

  async listLoginHistory(
    userId: string,
  ): Promise<Envelope<{ history: Record<string, unknown>[]; count: number }>> {
    await ensureSeed();
    const result = await queryIdentity(
      "SELECT * FROM login_history WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50",
      [userId],
    );
    return { ok: true, data: { history: result.rows, count: result.rows.length } };
  }

  async createPat(input: {
    userId: string;
    name: string;
    scopes?: string[];
  }): Promise<Envelope<{ token: string; pat: Record<string, unknown> }>> {
    await ensureSeed();
    const raw = `adf_pat_${randomBytes(24).toString("hex")}`;
    const patId = id("pat");
    const t = now();
    await queryIdentity(
      `INSERT INTO personal_access_tokens (id, user_id, name, token_hash, scopes, expires_at, created_at, last_used_at, revoked_at)
       VALUES ($1, $2, $3, $4, $5, NULL, $6, NULL, NULL)`,
      [patId, input.userId, input.name, hashToken(raw), JSON.stringify(input.scopes ?? []), t],
    );
    await writeAudit({
      actorId: input.userId,
      action: "pat.create",
      resource: patId,
      detail: input.name,
    });
    const pat = await queryIdentity(
      "SELECT id, user_id, name, scopes, created_at, revoked_at FROM personal_access_tokens WHERE id = $1",
      [patId],
    );
    return {
      ok: true,
      data: { token: raw, pat: pat.rows[0] ?? {} },
      message: "PAT created — copy now; not shown again",
    };
  }

  async listPats(
    userId: string,
  ): Promise<Envelope<{ tokens: Record<string, unknown>[]; count: number }>> {
    await ensureSeed();
    const result = await queryIdentity(
      `SELECT id, user_id, name, scopes, created_at, last_used_at, revoked_at
       FROM personal_access_tokens WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId],
    );
    return { ok: true, data: { tokens: result.rows, count: result.rows.length } };
  }

  async revokePat(userId: string, patId: string): Promise<Envelope<{ revoked: true }>> {
    await ensureSeed();
    await queryIdentity(
      "UPDATE personal_access_tokens SET revoked_at = $1 WHERE id = $2 AND user_id = $3 AND revoked_at IS NULL",
      [now(), patId, userId],
    );
    await writeAudit({ actorId: userId, action: "pat.revoke", resource: patId });
    return { ok: true, data: { revoked: true } };
  }

  async listInvitations(
    organizationId?: string,
  ): Promise<Envelope<{ invitations: Record<string, unknown>[]; count: number }>> {
    await ensureSeed();
    const result = organizationId
      ? await queryIdentity(
          "SELECT * FROM invitations WHERE organization_id = $1 ORDER BY created_at DESC",
          [organizationId],
        )
      : await queryIdentity("SELECT * FROM invitations ORDER BY created_at DESC");
    return { ok: true, data: { invitations: result.rows, count: result.rows.length } };
  }

  async createInvitation(input: {
    organizationId: string;
    email: string;
    role: string;
    inviterId: string;
  }): Promise<Envelope<{ invitation: Record<string, unknown> }>> {
    await ensureSeed();
    const invId = id("inv");
    const t = now();
    const expires = new Date(Date.now() + 7 * 864e5).toISOString();
    await queryIdentity(
      `INSERT INTO invitations (id, organization_id, email, role, status, inviter_id, expires_at, created_at)
       VALUES ($1, $2, $3, $4, 'pending', $5, $6, $7)`,
      [invId, input.organizationId, input.email, input.role, input.inviterId, expires, t],
    );
    await writeAudit({
      actorId: input.inviterId,
      action: "invitation.create",
      resource: invId,
      detail: input.email,
    });
    const invitation = await queryIdentity("SELECT * FROM invitations WHERE id = $1", [invId]);
    return { ok: true, data: { invitation: invitation.rows[0] ?? {} } };
  }
}

export const identityService = new IdentityService();
