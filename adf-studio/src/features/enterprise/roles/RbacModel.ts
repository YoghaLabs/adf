import type {
  EnterpriseRole,
  Permission,
  PermissionMatrixCell,
  RoleScope,
} from "@/features/enterprise/types";

/** Presentation helpers — hierarchical RBAC model only. */

export class RoleView {
  constructor(public readonly role: EnterpriseRole) {}

  get scope(): RoleScope {
    return this.role.scope;
  }
}

export class PermissionResolver {
  constructor(
    private roles: EnterpriseRole[],
    private permissions: Permission[],
    private matrix: PermissionMatrixCell[],
  ) {}

  permissionsForRole(roleId: string): Permission[] {
    const role = this.roles.find((r) => r.id === roleId);
    if (!role) return [];
    return this.permissions.filter((p) => role.permissionIds.includes(p.id));
  }

  matrixForRole(roleId: string): PermissionMatrixCell[] {
    return this.matrix.filter((c) => c.roleId === roleId);
  }

  byScope(scope: RoleScope): EnterpriseRole[] {
    return this.roles.filter((r) => r.scope === scope);
  }

  /** Presentation-only resolution order: system → org → workspace → project → custom. */
  resolutionOrder(): RoleScope[] {
    return ["system", "organization", "workspace", "project", "custom"];
  }
}

export class RbacManager {
  constructor(
    private roles: EnterpriseRole[],
    private permissions: Permission[],
    private matrix: PermissionMatrixCell[],
  ) {}

  listRoles(): EnterpriseRole[] {
    return [...this.roles];
  }

  listPermissions(): Permission[] {
    return [...this.permissions];
  }

  resolver(): PermissionResolver {
    return new PermissionResolver(this.roles, this.permissions, this.matrix);
  }
}
