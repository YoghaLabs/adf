import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationShell } from "@/shell/ApplicationShell";
import { EnterpriseGovernancePage } from "@/features/enterprise/pages/EnterpriseGovernancePage";
import { OrganizationManager } from "@/features/enterprise/organizations/OrganizationModel";
import { RbacManager } from "@/features/enterprise/roles/RbacModel";
import { AuditTrail } from "@/features/enterprise/audit/AuditModel";
import {
  AUDIT_EVENTS,
  ORGANIZATIONS,
  ORG_UNITS,
  PERMISSION_MATRIX,
  PERMISSIONS,
  ROLES,
  TEAMS,
} from "@/features/enterprise/services/enterpriseFixtures";
import {
  AuditClient,
  ComplianceClient,
  IdentityClient,
  OrganizationClient,
  PermissionClient,
  RoleClient,
} from "@/sdk";
import { studioConfig } from "@/config/studio";

afterEach(() => cleanup());

function renderEnterprise() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={["/enterprise"]}>
        <Routes>
          <Route path="/" element={<ApplicationShell />}>
            <Route path="enterprise" element={<EnterpriseGovernancePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("organizations", () => {
  it("maps org units and workspace teams", () => {
    const manager = new OrganizationManager(ORGANIZATIONS, ORG_UNITS, TEAMS);
    expect(manager.list().length).toBeGreaterThan(0);
    expect(manager.workspaceMappings("org-yoghalabs").length).toBeGreaterThan(0);
  });

  it("renders organizations panel", async () => {
    renderEnterprise();
    expect(await screen.findByTestId("page-enterprise")).toBeInTheDocument();
    expect(await screen.findByTestId("organizations-panel")).toBeInTheDocument();
  });
});

describe("users", () => {
  it("renders users panel", async () => {
    renderEnterprise();
    expect(await screen.findByTestId("users-panel")).toBeInTheDocument();
    expect((await new IdentityClient().users()).ok).toBe(true);
  });
});

describe("rbac", () => {
  it("resolves hierarchical roles", () => {
    const rbac = new RbacManager(ROLES, PERMISSIONS, PERMISSION_MATRIX);
    expect(rbac.resolver().resolutionOrder()[0]).toBe("system");
    expect(rbac.listRoles().some((r) => r.scope === "organization")).toBe(true);
  });

  it("renders rbac panel", async () => {
    renderEnterprise();
    expect(await screen.findByTestId("rbac-panel")).toBeInTheDocument();
    expect(await screen.findByTestId("permission-matrix")).toBeInTheDocument();
  });
});

describe("permissions", () => {
  it("returns permission matrix via SDK", async () => {
    expect((await new PermissionClient().list()).ok).toBe(true);
    expect((await new PermissionClient().matrix()).ok).toBe(true);
  });
});

describe("audit", () => {
  it("keeps audit immutable and searchable", async () => {
    const trail = new AuditTrail(AUDIT_EVENTS);
    expect(trail.assertImmutable()).toBe(true);
    expect(trail.exportPayload().immutable).toBe(true);
    renderEnterprise();
    expect(await screen.findByTestId("audit-panel")).toBeInTheDocument();
    const user = userEvent.setup();
    await user.type(screen.getByTestId("audit-search"), "export");
    expect(await screen.findByTestId("audit-list")).toBeInTheDocument();
  });
});

describe("compliance", () => {
  it("renders compliance dashboard", async () => {
    renderEnterprise();
    expect(await screen.findByTestId("compliance-panel")).toBeInTheDocument();
    expect((await new ComplianceClient().controls()).ok).toBe(true);
  });
});

describe("SDK", () => {
  it("returns enterprise envelopes", async () => {
    expect((await new OrganizationClient().overview()).ok).toBe(true);
    expect((await new RoleClient().list()).ok).toBe(true);
    expect((await new AuditClient().list()).ok).toBe(true);
  });

  it("is linked from navigation config", () => {
    expect(studioConfig.navigation.map((n) => n.id)).toContain("enterprise");
    expect(studioConfig.version).toBe("1.0.0-rc1");
    expect(studioConfig.build).toBe("BUILD-021");
  });
});
