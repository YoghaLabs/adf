import type { IncomingMessage, ServerResponse } from "node:http";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";

export { handleIdentityInvoke } from "./invoke.js";

const authHandler = toNodeHandler(auth);

/** Better Auth catch-all under /api/auth/* */
export async function handleBetterAuth(req: IncomingMessage, res: ServerResponse): Promise<void> {
  await authHandler(req, res);
}
