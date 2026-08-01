import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/features/identity/pages/LoginPage";
import { IdentityPlatformPage } from "@/features/identity/pages/IdentityPlatformPage";
import { validatePassword } from "@/features/identity/security";
import { identitySdk } from "@/features/identity/sdk/identityBridge";

vi.mock("@/features/identity/sdk/authClient", () => ({
  authClient: {
    getSession: vi.fn(async () => ({ data: null })),
    signOut: vi.fn(async () => ({})),
    signIn: {
      email: vi.fn(async () => ({ error: null })),
      magicLink: vi.fn(async () => ({ error: null })),
      social: vi.fn(async () => ({})),
    },
    signUp: { email: vi.fn(async () => ({ error: null })) },
  },
}));

vi.mock("@/features/identity/sdk/identityBridge", async () => {
  const actual = await vi.importActual<typeof import("@/features/identity/sdk/identityBridge")>(
    "@/features/identity/sdk/identityBridge",
  );
  return {
    ...actual,
    identitySdk: {
      ...actual.identitySdk,
      auth: {
        health: vi.fn(async () => ({
          ok: true,
          data: { layer: "identity", provider: "fixture", coreAgnostic: true },
        })),
      },
      organizations: {
        list: vi.fn(async () => ({ ok: true, data: { organizations: [], count: 0 } })),
        create: vi.fn(async () => ({ ok: true, data: { organization: {} } })),
      },
      workspaces: {
        list: vi.fn(async () => ({ ok: true, data: { workspaces: [], count: 0 } })),
        create: vi.fn(),
      },
      roles: { list: vi.fn(async () => ({ ok: true, data: { roles: [], count: 0 } })) },
      permissions: {
        list: vi.fn(async () => ({ ok: true, data: { permissions: [], count: 0 } })),
        resolve: vi.fn(async () => ({ ok: true, data: { permissions: [], count: 0 } })),
      },
      audit: { list: vi.fn(async () => ({ ok: true, data: { events: [], count: 0, immutable: true } })) },
      invitations: { list: vi.fn(async () => ({ ok: true, data: { invitations: [], count: 0 } })), create: vi.fn() },
      sessions: { loginHistory: vi.fn(async () => ({ ok: true, data: { history: [], count: 0 } })) },
      tokens: {
        listPat: vi.fn(async () => ({ ok: true, data: { tokens: [], count: 0 } })),
        createPat: vi.fn(),
        revokePat: vi.fn(),
      },
      teams: { list: vi.fn(async () => ({ ok: true, data: { teams: [], count: 0 } })) },
      members: { list: vi.fn(async () => ({ ok: true, data: { members: [], count: 0 } })) },
    },
  };
});

describe("identity platform", () => {
  it("enforces password policy", () => {
    expect(validatePassword("short")).toMatch(/at least 10/);
    expect(validatePassword("long-enough-password")).toBeNull();
  });

  it("renders login page", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("page-login")).toBeInTheDocument();
  });

  it("renders identity hub", async () => {
    render(
      <MemoryRouter initialEntries={["/identity"]}>
        <Routes>
          <Route path="/identity" element={<IdentityPlatformPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByTestId("page-identity")).toBeInTheDocument();
  });

  it("exposes identity SDK clients", () => {
    expect(identitySdk.auth).toBeTruthy();
    expect(identitySdk.organizations).toBeTruthy();
    expect(identitySdk.roles).toBeTruthy();
    expect(identitySdk.permissions).toBeTruthy();
    expect(identitySdk.audit).toBeTruthy();
  });
});
