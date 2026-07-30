import type { ServiceEnvelope } from "@/types/studio";
import { studioConfig } from "@/config/studio";

/** Deterministic fixture envelopes mirroring ServiceResult shapes from adf-core. */
export async function localFixtureProvider(
  method: string,
  payload?: Record<string, unknown>,
): Promise<ServiceEnvelope> {
  const now = new Date().toISOString();

  switch (method) {
    case "runtime.status":
      return {
        ok: true,
        data: {
          packageVersion: studioConfig.version,
          engineBuild: studioConfig.build,
          plugins: 0,
          packagesInstalled: 2,
          ok: true,
        },
      };
    case "runtime.version":
      return {
        ok: true,
        data: { package: "adf-core", version: studioConfig.version },
      };
    case "generator.types":
      return {
        ok: true,
        data: { projectTypes: ["generic", "python", "fastapi", "nextjs", "laravel"] },
      };
    case "packages.listInstalled":
      return {
        ok: true,
        data: {
          count: 2,
          packages: [
            {
              id: "demo-core",
              name: "demo-core",
              version: "1.0.0",
              category: "plugin",
              description: "Demo core plugin",
              verified: true,
              featured: false,
            },
            {
              id: "demo-template",
              name: "demo-template",
              version: "1.1.0",
              category: "template",
              description: "Demo template",
              verified: true,
              featured: true,
            },
          ],
        },
      };
    case "marketplace.browse":
    case "marketplace.search": {
      const q = String(payload?.query ?? "").toLowerCase();
      const items = [
        {
          id: "demo-core",
          name: "demo-core",
          version: "1.0.0",
          category: "plugin",
          description: "Demo core plugin",
          verified: true,
          featured: false,
        },
        {
          id: "demo-template",
          name: "demo-template",
          version: "1.1.0",
          category: "template",
          description: "Demo template package",
          verified: true,
          featured: true,
        },
      ].filter(
        (item) =>
          !q ||
          item.id.includes(q) ||
          item.name.includes(q) ||
          item.description.toLowerCase().includes(q),
      );
      return { ok: true, data: { items, count: items.length } };
    }
    case "marketplace.featured":
      return {
        ok: true,
        data: {
          title: "Featured",
          items: [
            {
              id: "demo-template",
              name: "demo-template",
              version: "1.1.0",
              category: "template",
              description: "Demo template package",
              verified: true,
              featured: true,
            },
          ],
        },
      };
    case "marketplace.categories":
      return {
        ok: true,
        data: {
          categories: [
            { id: "plugin", label: "Plugin", count: 1 },
            { id: "template", label: "Template", count: 1 },
          ],
        },
      };
    case "registry.status":
      return {
        ok: true,
        data: { registry_root: "release/apm-registry", packages: 2 },
      };
    case "registry.providers":
      return {
        ok: true,
        data: {
          providers: [
            { name: "local", kind: "local", enabled: true },
            { name: "github", kind: "github", enabled: false },
            { name: "gitlab", kind: "gitlab", enabled: false },
            { name: "enterprise", kind: "enterprise", enabled: false },
            { name: "cloud", kind: "cloud", enabled: false },
          ],
        },
      };
    case "release.channels":
      return {
        ok: true,
        data: {
          channels: [
            { channel: "development", label: "Development", production: false },
            { channel: "alpha", label: "Alpha", production: false },
            { channel: "beta", label: "Beta", production: false },
            { channel: "rc", label: "Release Candidate", production: false },
            { channel: "stable", label: "Stable", production: true },
            { channel: "lts", label: "LTS", production: true },
          ],
        },
      };
    case "release.list":
      return { ok: true, data: { releases: [], count: 0 } };
    case "workspace.describe":
      return {
        ok: true,
        data: {
          repoRoot: "/projects/adf",
          version: studioConfig.version,
          build: studioConfig.build,
          branch: "develop",
          lockedFolders: {
            ".adf": true,
            "adf-core": true,
            "adf-studio": true,
            "adf-docs": true,
          },
        },
      };
    case "workspace.readiness":
      return { ok: true, data: { ready: true, checkedAt: now } };
    case "projects.list":
      return {
        ok: true,
        data: {
          count: 1,
          projects: [
            {
              id: "adf",
              name: "ADF",
              status: "active",
              version: studioConfig.version,
              updatedAt: now,
            },
          ],
        },
      };
    case "projects.info":
      return {
        ok: true,
        data: {
          repo_root: "/projects/adf",
          version_file: studioConfig.version,
        },
      };
    default:
      return { ok: false, data: {}, error: `unknown SDK method: ${method}` };
  }
}
