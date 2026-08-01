import { create } from "zustand";
import { authClient } from "@/features/identity/sdk/authClient";
import { identitySdk } from "@/features/identity/sdk/identityBridge";
import { IdentityUiService } from "@/features/identity/services/IdentityService";
import { DEMO_USER } from "@/features/identity/services/identityFixtures";
import type {
  IdentityAuditEvent,
  IdentityInvitation,
  IdentityOrganization,
  IdentityPermission,
  IdentityRole,
  IdentityUser,
  IdentityWorkspace,
} from "@/features/identity/types";

type IdentityState = {
  user: IdentityUser | null;
  loading: boolean;
  error: string | null;
  demo: boolean;
  hydrate: () => Promise<void>;
  signOut: () => Promise<void>;
};

type OrganizationState = {
  organizations: IdentityOrganization[];
  activeOrgId: string | null;
  loading: boolean;
  load: () => Promise<void>;
  setActive: (id: string | null) => void;
  create: (name: string, slug: string) => Promise<void>;
};

type WorkspaceState = {
  workspaces: IdentityWorkspace[];
  activeWorkspaceId: string | null;
  loading: boolean;
  load: (organizationId?: string) => Promise<void>;
  setActive: (id: string | null) => void;
};

type RoleState = {
  roles: IdentityRole[];
  loading: boolean;
  load: () => Promise<void>;
};

type PermissionState = {
  permissions: IdentityPermission[];
  resolved: string[];
  loading: boolean;
  load: () => Promise<void>;
  resolve: (roles: string[]) => Promise<void>;
};

type SessionIdentityState = {
  devices: { id: string; label: string; lastSeen: string }[];
  loginHistory: unknown[];
  loading: boolean;
  load: (userId?: string) => Promise<void>;
};

type AuditState = {
  events: IdentityAuditEvent[];
  loading: boolean;
  load: () => Promise<void>;
};

type InvitationState = {
  invitations: IdentityInvitation[];
  loading: boolean;
  load: (organizationId?: string) => Promise<void>;
};

type TeamState = {
  teams: { id: string; name: string }[];
  loading: boolean;
  load: () => Promise<void>;
};

export const useIdentityStore = create<IdentityState>((set) => ({
  user: null,
  loading: false,
  error: null,
  demo: false,
  async hydrate() {
    set({ loading: true, error: null });
    try {
      const session = await authClient.getSession();
      const data = session.data;
      if (data?.user) {
        set({
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            image: data.user.image,
            emailVerified: Boolean(data.user.emailVerified),
          },
          demo: false,
          loading: false,
        });
        return;
      }
    } catch {
      /* fall through to demo */
    }
    set({ user: DEMO_USER, demo: true, loading: false });
  },
  async signOut() {
    try {
      await authClient.signOut();
    } catch {
      /* ignore */
    }
    set({ user: null, demo: false });
  },
}));

export const useOrganizationStore = create<OrganizationState>((set, get) => ({
  organizations: [],
  activeOrgId: null,
  loading: false,
  async load() {
    set({ loading: true });
    const organizations = (await IdentityUiService.organizations()) as IdentityOrganization[];
    set({
      organizations,
      activeOrgId: get().activeOrgId ?? organizations[0]?.id ?? null,
      loading: false,
    });
  },
  setActive(id) {
    set({ activeOrgId: id });
  },
  async create(name, slug) {
    await identitySdk.organizations.create({ name, slug, ownerUserId: "user_local" });
    await get().load();
  },
}));

export const useIdentityWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  activeWorkspaceId: null,
  loading: false,
  async load(organizationId) {
    set({ loading: true });
    const workspaces = (await IdentityUiService.workspaces(organizationId)) as IdentityWorkspace[];
    set({
      workspaces,
      activeWorkspaceId: get().activeWorkspaceId ?? workspaces[0]?.id ?? null,
      loading: false,
    });
  },
  setActive(id) {
    set({ activeWorkspaceId: id });
  },
}));

export const useRoleStore = create<RoleState>((set) => ({
  roles: [],
  loading: false,
  async load() {
    set({ loading: true });
    const roles = (await IdentityUiService.roles()) as IdentityRole[];
    set({ roles, loading: false });
  },
}));

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: [],
  resolved: [],
  loading: false,
  async load() {
    set({ loading: true });
    const permissions = (await IdentityUiService.permissions()) as IdentityPermission[];
    set({ permissions, loading: false });
  },
  async resolve(roles) {
    const r = await identitySdk.permissions.resolve(roles);
    set({ resolved: r.ok ? r.data.permissions : [] });
  },
}));

export const useIdentitySessionStore = create<SessionIdentityState>((set) => ({
  devices: [
    { id: "dev_local", label: "This workstation", lastSeen: new Date().toISOString() },
  ],
  loginHistory: [],
  loading: false,
  async load(userId = "user_local") {
    set({ loading: true });
    const r = await identitySdk.sessions.loginHistory(userId);
    set({ loginHistory: r.ok ? r.data.history : [], loading: false });
  },
}));

export const useAuditStore = create<AuditState>((set) => ({
  events: [],
  loading: false,
  async load() {
    set({ loading: true });
    const events = (await IdentityUiService.audit()) as IdentityAuditEvent[];
    set({ events, loading: false });
  },
}));

export const useInvitationStore = create<InvitationState>((set) => ({
  invitations: [],
  loading: false,
  async load(organizationId) {
    set({ loading: true });
    const invitations = (await IdentityUiService.invitations(organizationId)) as IdentityInvitation[];
    set({ invitations, loading: false });
  },
}));

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  loading: false,
  async load() {
    set({ loading: true });
    const r = await identitySdk.teams.list();
    set({ teams: (r.data.teams as { id: string; name: string }[]) ?? [], loading: false });
  },
}));
