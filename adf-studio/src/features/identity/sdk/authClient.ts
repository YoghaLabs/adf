import { createAuthClient } from "better-auth/react";
import { magicLinkClient, organizationClient } from "better-auth/client/plugins";

/**
 * Better Auth React client — talks to /api/auth (Identity Layer).
 * Never imports Core Runtime.
 */
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:1420",
  plugins: [magicLinkClient(), organizationClient()],
});

export type AuthClient = typeof authClient;
