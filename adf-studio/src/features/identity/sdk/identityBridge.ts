import type { ServiceEnvelope } from "@/types/studio";

async function invokeIdentity<T>(
  method: string,
  payload?: Record<string, unknown>,
): Promise<ServiceEnvelope<T>> {
  try {
    const res = await fetch("/adf-identity/invoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, payload: payload ?? {} }),
    });
    const json = (await res.json()) as ServiceEnvelope<T>;
    return json;
  } catch (err) {
    return {
      ok: false,
      data: {} as T,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export class IdentityAuthClient {
  health() {
    return invokeIdentity<{
      layer: string;
      provider: string;
      database?: string;
      engine?: "postgresql" | string;
      coreAgnostic: true;
    }>("identity.health");
  }
}

export class IdentitySessionClient {
  loginHistory(userId: string) {
    return invokeIdentity<{ history: unknown[]; count: number }>("sessions.loginHistory", { userId });
  }
}

export class IdentityOrganizationClient {
  list() {
    return invokeIdentity<{ organizations: unknown[]; count: number }>("organizations.list");
  }

  create(input: { name: string; slug: string; ownerUserId?: string }) {
    return invokeIdentity<{ organization: unknown }>("organizations.create", input);
  }
}

export class IdentityWorkspaceClient {
  list(organizationId?: string) {
    return invokeIdentity<{ workspaces: unknown[]; count: number }>("workspaces.list", {
      organizationId,
    });
  }

  create(input: { organizationId: string; name: string; slug: string; actorId?: string }) {
    return invokeIdentity<{ workspace: unknown }>("workspaces.create", input);
  }
}

export class IdentityTeamClient {
  list() {
    return Promise.resolve({ ok: true as const, data: { teams: [] as unknown[], count: 0 } });
  }
}

export class IdentityMemberClient {
  list() {
    return Promise.resolve({ ok: true as const, data: { members: [] as unknown[], count: 0 } });
  }
}

export class IdentityRoleClient {
  list() {
    return invokeIdentity<{ roles: unknown[]; count: number }>("roles.list");
  }
}

export class IdentityPermissionClient {
  list() {
    return invokeIdentity<{ permissions: unknown[]; count: number }>("permissions.list");
  }

  resolve(roles: string[]) {
    return invokeIdentity<{ permissions: string[]; count: number }>("permissions.resolve", { roles });
  }
}

export class IdentityAuditClient {
  list(limit = 100) {
    return invokeIdentity<{ events: unknown[]; count: number; immutable: true }>("audit.list", {
      limit,
    });
  }
}

export class IdentityInvitationClient {
  list(organizationId?: string) {
    return invokeIdentity<{ invitations: unknown[]; count: number }>("invitations.list", {
      organizationId,
    });
  }

  create(input: { organizationId: string; email: string; role: string; inviterId?: string }) {
    return invokeIdentity<{ invitation: unknown }>("invitations.create", input);
  }
}

export class IdentityTokenClient {
  listPat(userId = "user_local") {
    return invokeIdentity<{ tokens: unknown[]; count: number }>("tokens.listPat", { userId });
  }

  createPat(input: { userId?: string; name: string; scopes?: string[] }) {
    return invokeIdentity<{ token: string; pat: unknown }>("tokens.createPat", input);
  }

  revokePat(patId: string, userId = "user_local") {
    return invokeIdentity<{ revoked: true }>("tokens.revokePat", { patId, userId });
  }
}

export const identitySdk = {
  auth: new IdentityAuthClient(),
  sessions: new IdentitySessionClient(),
  organizations: new IdentityOrganizationClient(),
  workspaces: new IdentityWorkspaceClient(),
  teams: new IdentityTeamClient(),
  members: new IdentityMemberClient(),
  roles: new IdentityRoleClient(),
  permissions: new IdentityPermissionClient(),
  audit: new IdentityAuditClient(),
  invitations: new IdentityInvitationClient(),
  tokens: new IdentityTokenClient(),
};
