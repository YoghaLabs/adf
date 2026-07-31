export type BridgeTransport = "live" | "fixture" | "offline";

type Listener = (mode: BridgeTransport, detail?: string) => void;

let current: BridgeTransport = "fixture";
let detail = "not probed";
const listeners = new Set<Listener>();

export function getBridgeMode(): { mode: BridgeTransport; detail: string } {
  return { mode: current, detail };
}

export function setBridgeMode(mode: BridgeTransport, nextDetail = "") {
  current = mode;
  detail = nextDetail;
  listeners.forEach((fn) => fn(mode, detail));
}

export function subscribeBridgeMode(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const FORCE_FIXTURE_KEY = "adf.studio.forceFixture.v1";

export function getForceFixture(): boolean {
  try {
    return localStorage.getItem(FORCE_FIXTURE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setForceFixture(value: boolean) {
  try {
    localStorage.setItem(FORCE_FIXTURE_KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
}

/** Methods BUILD-021 L1–L3/L5 attempt live before fixture fallback. */
export const LIVE_BRIDGE_METHODS = new Set([
  "runtime.status",
  "runtime.version",
  "runtime.doctor",
  "runtime.resume",
  "workspace.describe",
  "workspace.readiness",
  "workspace.list",
  "workspace.profile",
  "workspace.switch",
  "workspace.settings",
  "workspace.stats",
  "workspace.activity",
  "workspace.favorites",
  "workspace.search",
  "projects.info",
  "projects.list",
  "projects.explorer",
  "projects.tree",
  "projects.favorites",
  "projects.pinned",
  "projects.archived",
  "projects.recent",
  "packages.listInstalled",
  "packages.list",
  "packages.search",
  "packages.install",
  "packages.remove",
  "packages.update",
  "packages.verify",
  "marketplace.browse",
  "marketplace.search",
  "marketplace.featured",
  "marketplace.categories",
  "generator.types",
  "registry.status",
  "release.channels",
  "sessions.list",
  "sessions.history",
  "sessions.current",
  "sessions.recent",
  "sessions.resume",
  "sessions.close",
  "sessions.timeline",
  "runtimeDashboard.overview",
  "runtimeDashboard.jobs",
  "runtimeDashboard.events",
  "runtimeDashboard.inspectors",
  "metrics.snapshot",
  "metrics.series",
  "logs.list",
  "logs.filter",
  "diagnostics.snapshot",
  "timeline.list",
  "timeline.byKind",
  "activity.feed",
  "activity.recent",
]);
