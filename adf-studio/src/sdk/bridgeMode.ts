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

/** Methods BUILD-021 L1 attempts live before fixture fallback. */
export const LIVE_BRIDGE_METHODS = new Set([
  "runtime.status",
  "runtime.version",
  "runtime.doctor",
  "runtime.resume",
  "workspace.describe",
  "workspace.readiness",
  "workspace.list",
  "workspace.profile",
  "projects.info",
  "projects.list",
  "projects.explorer",
  "packages.listInstalled",
  "generator.types",
  "registry.status",
  "release.channels",
]);
