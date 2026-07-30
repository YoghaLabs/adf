import type {
  EnterpriseTeam,
  Organization,
  OrgUnit,
  OrgUnitKind,
} from "@/features/enterprise/types";

/** Presentation helpers — organization hierarchy model only. */

export class OrganizationView {
  constructor(public readonly organization: Organization) {}

  get workspaceCount(): number {
    return this.organization.workspaceIds.length;
  }
}

export class OrgUnitView {
  constructor(public readonly unit: OrgUnit) {}

  get kindLabel(): OrgUnitKind {
    return this.unit.kind;
  }
}

export class OrganizationManager {
  constructor(
    private organizations: Organization[],
    private units: OrgUnit[],
    private teams: EnterpriseTeam[],
  ) {}

  list(): Organization[] {
    return [...this.organizations];
  }

  unitsFor(organizationId: string): OrgUnit[] {
    return this.units.filter((u) => u.organizationId === organizationId);
  }

  teamsFor(organizationId: string): EnterpriseTeam[] {
    return this.teams.filter((t) => t.organizationId === organizationId);
  }

  workspaceMappings(organizationId: string): { teamId: string; workspaceId: string }[] {
    return this.teams
      .filter((t) => t.organizationId === organizationId && t.workspaceId)
      .map((t) => ({ teamId: t.id, workspaceId: t.workspaceId! }));
  }
}
