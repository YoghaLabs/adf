import { betterAuth } from "better-auth";
import { magicLink, organization } from "better-auth/plugins";
import Database from "better-sqlite3";
import { betterAuthDbPath, resolveAdfRoot } from "./paths.js";

const root = resolveAdfRoot();
const dbFile = betterAuthDbPath(root);

function oauthFromEnv(id: "github" | "gitlab" | "google" | "microsoft") {
  const map = {
    github: ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
    gitlab: ["GITLAB_CLIENT_ID", "GITLAB_CLIENT_SECRET"],
    google: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
    microsoft: ["MICROSOFT_CLIENT_ID", "MICROSOFT_CLIENT_SECRET"],
  } as const;
  const [idKey, secretKey] = map[id];
  const clientId = process.env[idKey];
  const clientSecret = process.env[secretKey];
  if (!clientId || !clientSecret) return undefined;
  return { clientId, clientSecret };
}

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};
for (const id of ["github", "gitlab", "google", "microsoft"] as const) {
  const cfg = oauthFromEnv(id);
  if (cfg) socialProviders[id] = cfg;
}

/**
 * Better Auth instance — Identity Layer only.
 * Core Runtime must never import this module.
 */
export const auth = betterAuth({
  database: new Database(dbFile),
  baseURL: process.env.ADF_IDENTITY_BASE_URL || "http://127.0.0.1:1420",
  secret: process.env.ADF_IDENTITY_SECRET || "adf-dev-identity-secret-change-me",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    requireEmailVerification: false,
  },
  socialProviders,
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  advanced: {
    useSecureCookies: process.env.ADF_IDENTITY_SECURE_COOKIES === "1",
    crossSubDomainCookies: {
      enabled: false,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        // Dev/local: log only — wire SMTP in production.
        console.info(`[adf-identity] magic link for ${email}: ${url}`);
      },
    }),
    organization({
      allowUserToCreateOrganization: true,
      creatorRole: "owner",
    }),
  ],
});

export type Auth = typeof auth;
