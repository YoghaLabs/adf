import type { IncomingMessage, ServerResponse } from "node:http";
import { identityService, type Envelope } from "./service.js";

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(Buffer.from(c)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.end(JSON.stringify(body));
}

function safeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  return msg
    .replace(/postgresql:\/\/\S+/gi, "[redacted]")
    .replace(/\b\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?/g, "[redacted-host]")
    .replace(/password\s*=\s*\S+/gi, "password=[redacted]");
}

/**
 * ADF Identity service API (RBAC/org/workspace/audit/PAT).
 * Does NOT import Better Auth — safe when auth package resolution differs.
 * POST /adf-identity/invoke { method, payload }
 */
export async function handleIdentityInvoke(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, data: {}, error: "POST required" });
    return;
  }
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw || "{}") as { method?: string; payload?: Record<string, unknown> };
    const method = String(body.method || "");
    const payload = body.payload || {};
    const result = await dispatch(method, payload);
    sendJson(res, 200, result);
  } catch (err) {
    sendJson(res, 200, {
      ok: false,
      data: {},
      error: safeError(err),
    });
  }
}

async function dispatch(
  method: string,
  payload: Record<string, unknown>,
): Promise<Envelope<unknown>> {
  switch (method) {
    case "identity.health":
      return identityService.health();
    case "roles.list":
      return identityService.listRoles();
    case "permissions.list":
      return identityService.listPermissions();
    case "permissions.resolve":
      return identityService.resolveUserPermissions(
        (Array.isArray(payload.roles) ? payload.roles : []) as never,
      );
    case "organizations.list":
      return identityService.listOrganizations();
    case "organizations.create":
      return identityService.createOrganization({
        name: String(payload.name || ""),
        slug: String(payload.slug || ""),
        ownerUserId: String(payload.ownerUserId || "user_local"),
      });
    case "workspaces.list":
      return identityService.listWorkspaces(
        payload.organizationId ? String(payload.organizationId) : undefined,
      );
    case "workspaces.create":
      return identityService.createWorkspace({
        organizationId: String(payload.organizationId || ""),
        name: String(payload.name || ""),
        slug: String(payload.slug || ""),
        actorId: payload.actorId ? String(payload.actorId) : undefined,
      });
    case "audit.list":
      return identityService.listAudit(Number(payload.limit || 100));
    case "sessions.loginHistory":
      return identityService.listLoginHistory(String(payload.userId || ""));
    case "tokens.listPat":
      return identityService.listPats(String(payload.userId || "user_local"));
    case "tokens.createPat":
      return identityService.createPat({
        userId: String(payload.userId || "user_local"),
        name: String(payload.name || "default"),
        scopes: Array.isArray(payload.scopes) ? (payload.scopes as string[]) : [],
      });
    case "tokens.revokePat":
      return identityService.revokePat(
        String(payload.userId || "user_local"),
        String(payload.patId || ""),
      );
    case "invitations.list":
      return identityService.listInvitations(
        payload.organizationId ? String(payload.organizationId) : undefined,
      );
    case "invitations.create":
      return identityService.createInvitation({
        organizationId: String(payload.organizationId || ""),
        email: String(payload.email || ""),
        role: String(payload.role || "developer"),
        inviterId: String(payload.inviterId || "user_local"),
      });
    default:
      return { ok: false, data: {}, error: `unknown identity method: ${method}` };
  }
}
