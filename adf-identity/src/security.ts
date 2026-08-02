/** Enterprise security readiness flags — Identity Layer (not Core). */

export const IDENTITY_SECURITY = {
  passwordMinLength: 10,
  mfaReady: true,
  mfaProviders: ["totp", "webauthn"] as const,
  ssoReady: true,
  ssoProtocols: ["oidc", "saml"] as const,
  emailVerificationReady: true,
  passkeysFuture: true,
  rateLimitReady: true,
  csrfReady: true,
  auditImmutable: true,
} as const;

export type IdentitySecurityProfile = typeof IDENTITY_SECURITY;
