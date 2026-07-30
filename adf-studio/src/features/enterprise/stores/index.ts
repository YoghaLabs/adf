import { create } from "zustand";
import type {
  AnalyticsSnapshot,
  AuditEvent,
  ComplianceControl,
  ComplianceEvidence,
  EnterpriseGroup,
  EnterpriseIntegration,
  EnterpriseOverview,
  EnterpriseRole,
  EnterpriseTeam,
  EnterpriseUser,
  EnvironmentConfig,
  GovernancePolicy,
  IdentityProvider,
  IdentitySession,
  LicenseInfo,
  Organization,
  OrgUnit,
  Permission,
  PermissionMatrixCell,
} from "@/features/enterprise/types";
import { studioSdk } from "@/sdk";

type OrganizationState = {
  organizations: Organization[];
  units: OrgUnit[];
  teams: EnterpriseTeam[];
  overview: EnterpriseOverview | null;
  integrations: EnterpriseIntegration[];
  environments: EnvironmentConfig[];
  policies: GovernancePolicy[];
  loading: boolean;
  load: () => Promise<void>;
};

type UserState = {
  users: EnterpriseUser[];
  groups: EnterpriseGroup[];
  providers: IdentityProvider[];
  sessions: IdentitySession[];
  loading: boolean;
  load: () => Promise<void>;
};

type RoleState = {
  roles: EnterpriseRole[];
  loading: boolean;
  load: () => Promise<void>;
};

type PermissionState = {
  permissions: Permission[];
  matrix: PermissionMatrixCell[];
  loading: boolean;
  load: () => Promise<void>;
};

type AuditState = {
  events: AuditEvent[];
  query: string;
  loading: boolean;
  load: () => Promise<void>;
  search: (query: string) => Promise<void>;
  setQuery: (query: string) => void;
};

type ComplianceState = {
  controls: ComplianceControl[];
  evidence: ComplianceEvidence[];
  loading: boolean;
  load: () => Promise<void>;
};

type LicenseState = {
  licenses: LicenseInfo[];
  loading: boolean;
  load: () => Promise<void>;
};

type AnalyticsState = {
  snapshot: AnalyticsSnapshot | null;
  loading: boolean;
  load: () => Promise<void>;
};

export const useOrganizationStore = create<OrganizationState>((set) => ({
  organizations: [],
  units: [],
  teams: [],
  overview: null,
  integrations: [],
  environments: [],
  policies: [],
  loading: false,
  async load() {
    set({ loading: true });
    const [orgs, units, teams, overview, integrations, environments, policies] = await Promise.all([
      studioSdk.organizations.list(),
      studioSdk.organizations.units(),
      studioSdk.organizations.teams(),
      studioSdk.organizations.overview(),
      studioSdk.organizations.integrations(),
      studioSdk.organizations.environments(),
      studioSdk.organizations.policies(),
    ]);
    set({
      organizations: orgs.ok ? orgs.data.organizations : [],
      units: units.ok ? units.data.units : [],
      teams: teams.ok ? teams.data.teams : [],
      overview: overview.ok ? overview.data : null,
      integrations: integrations.ok ? integrations.data.integrations : [],
      environments: environments.ok ? environments.data.environments : [],
      policies: policies.ok ? policies.data.policies : [],
      loading: false,
    });
  },
}));

export const useUserStore = create<UserState>((set) => ({
  users: [],
  groups: [],
  providers: [],
  sessions: [],
  loading: false,
  async load() {
    set({ loading: true });
    const [users, groups, providers, sessions] = await Promise.all([
      studioSdk.identity.users(),
      studioSdk.identity.groups(),
      studioSdk.identity.providers(),
      studioSdk.identity.sessions(),
    ]);
    set({
      users: users.ok ? users.data.users : [],
      groups: groups.ok ? groups.data.groups : [],
      providers: providers.ok ? providers.data.providers : [],
      sessions: sessions.ok ? sessions.data.sessions : [],
      loading: false,
    });
  },
}));

export const useRoleStore = create<RoleState>((set) => ({
  roles: [],
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.roles.list();
    set({ roles: result.ok ? result.data.roles : [], loading: false });
  },
}));

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: [],
  matrix: [],
  loading: false,
  async load() {
    set({ loading: true });
    const [permissions, matrix] = await Promise.all([
      studioSdk.permissions.list(),
      studioSdk.permissions.matrix(),
    ]);
    set({
      permissions: permissions.ok ? permissions.data.permissions : [],
      matrix: matrix.ok ? matrix.data.matrix : [],
      loading: false,
    });
  },
}));

export const useAuditStore = create<AuditState>((set, get) => ({
  events: [],
  query: "",
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.audit.list();
    set({ events: result.ok ? result.data.events : [], loading: false });
  },
  async search(query: string) {
    set({ loading: true, query });
    const result = await studioSdk.audit.search(query);
    set({ events: result.ok ? result.data.events : [], loading: false });
  },
  setQuery(query) {
    set({ query });
    void get().search(query);
  },
}));

export const useComplianceStore = create<ComplianceState>((set) => ({
  controls: [],
  evidence: [],
  loading: false,
  async load() {
    set({ loading: true });
    const [controls, evidence] = await Promise.all([
      studioSdk.compliance.controls(),
      studioSdk.compliance.evidence(),
    ]);
    set({
      controls: controls.ok ? controls.data.controls : [],
      evidence: evidence.ok ? evidence.data.evidence : [],
      loading: false,
    });
  },
}));

export const useLicenseStore = create<LicenseState>((set) => ({
  licenses: [],
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.licenses.list();
    set({ licenses: result.ok ? result.data.licenses : [], loading: false });
  },
}));

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  snapshot: null,
  loading: false,
  async load() {
    set({ loading: true });
    const result = await studioSdk.analytics.snapshot();
    set({ snapshot: result.ok ? result.data : null, loading: false });
  },
}));
