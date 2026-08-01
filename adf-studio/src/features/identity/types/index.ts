export type IdentityUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified?: boolean;
};

export type IdentitySession = {
  id: string;
  userId: string;
  token?: string;
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export type IdentityOrganization = {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  created_at?: string;
};

export type IdentityWorkspace = {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type IdentityRole = {
  id: string;
  key: string;
  name: string;
  scope: string;
};

export type IdentityPermission = {
  id: string;
  key: string;
  name: string;
};

export type IdentityAuditEvent = {
  id: string;
  actor_id?: string | null;
  action: string;
  resource: string;
  detail?: string | null;
  created_at: string;
  immutable?: number | boolean;
};

export type IdentityInvitation = {
  id: string;
  organization_id: string;
  email: string;
  role?: string | null;
  status: string;
  expires_at: string;
};

export type IdentityPat = {
  id: string;
  user_id: string;
  name: string;
  scopes?: string;
  created_at: string;
  revoked_at?: string | null;
};

export type AuthMode = "live" | "demo";
