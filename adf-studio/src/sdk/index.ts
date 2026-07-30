/**
 * Studio SDK adapters — TypeScript facades over ADF Core SDK clients.
 *
 * Studio MUST NOT contain business logic. These adapters only ferry
 * requests to the Python Service Layer via a bridge (CLI/SDK invoke).
 */

import type {
  MarketplaceItem,
  ProjectSummary,
  ReleaseChannelInfo,
  RuntimeStatus,
  ServiceEnvelope,
  WorkspaceSummary,
} from "@/types/studio";
import { studioBridge } from "@/sdk/bridge";

export class RuntimeClient {
  status(): Promise<ServiceEnvelope<RuntimeStatus>> {
    return studioBridge.invoke("runtime.status");
  }

  version(): Promise<ServiceEnvelope<{ package: string; version: string }>> {
    return studioBridge.invoke("runtime.version");
  }
}

export class GeneratorClient {
  listTypes(): Promise<ServiceEnvelope<{ projectTypes: string[] }>> {
    return studioBridge.invoke("generator.types");
  }
}

export class PackageClient {
  listInstalled(): Promise<ServiceEnvelope<{ packages: MarketplaceItem[]; count: number }>> {
    return studioBridge.invoke("packages.listInstalled");
  }
}

export class MarketplaceClient {
  browse(): Promise<ServiceEnvelope<{ items: MarketplaceItem[]; count: number }>> {
    return studioBridge.invoke("marketplace.browse");
  }

  search(query: string): Promise<ServiceEnvelope<{ items: MarketplaceItem[]; count: number }>> {
    return studioBridge.invoke("marketplace.search", { query });
  }

  featured(): Promise<ServiceEnvelope<{ title: string; items: MarketplaceItem[] }>> {
    return studioBridge.invoke("marketplace.featured");
  }

  categories(): Promise<ServiceEnvelope<{ categories: { id: string; label: string; count: number }[] }>> {
    return studioBridge.invoke("marketplace.categories");
  }
}

export class RegistryClient {
  status(): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke("registry.status");
  }

  providers(): Promise<ServiceEnvelope<{ providers: { name: string; kind: string; enabled: boolean }[] }>> {
    return studioBridge.invoke("registry.providers");
  }
}

export class ReleaseClient {
  channels(): Promise<ServiceEnvelope<{ channels: ReleaseChannelInfo[] }>> {
    return studioBridge.invoke("release.channels");
  }

  list(): Promise<ServiceEnvelope<{ releases: { version: string; channel: string; published: boolean }[]; count: number }>> {
    return studioBridge.invoke("release.list");
  }
}

export class WorkspaceClient {
  describe(): Promise<ServiceEnvelope<WorkspaceSummary>> {
    return studioBridge.invoke("workspace.describe");
  }

  readiness(): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke("workspace.readiness");
  }
}

export class ProjectClient {
  list(): Promise<ServiceEnvelope<{ projects: ProjectSummary[]; count: number }>> {
    return studioBridge.invoke("projects.list");
  }

  info(): Promise<ServiceEnvelope<Record<string, unknown>>> {
    return studioBridge.invoke("projects.info");
  }
}

export class StudioSdk {
  readonly runtime = new RuntimeClient();
  readonly generator = new GeneratorClient();
  readonly packages = new PackageClient();
  readonly marketplace = new MarketplaceClient();
  readonly registry = new RegistryClient();
  readonly release = new ReleaseClient();
  readonly workspace = new WorkspaceClient();
  readonly projects = new ProjectClient();
}

export const studioSdk = new StudioSdk();
