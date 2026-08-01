export const PASSWORD_POLICY = {
  minLength: 10,
  requireMfaReady: true,
  emailVerification: true,
} as const;

export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_POLICY.minLength) {
    return `Password must be at least ${PASSWORD_POLICY.minLength} characters`;
  }
  return null;
}
