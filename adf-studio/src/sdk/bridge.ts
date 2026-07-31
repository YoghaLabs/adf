/**
 * Bridge from Studio UI → ADF Core SDK/Service Layer.
 *
 * BUILD-021 L1: try live transport via Vite `/adf-bridge/invoke` (python -m adf.studio_bridge).
 * Fall back to local fixtures for Vitest, offline, or methods not yet live.
 * No business rules — transport + envelopes only.
 */

import type { ServiceEnvelope } from "@/types/studio";
import { localFixtureProvider } from "@/sdk/fixtures";
import {
  LIVE_BRIDGE_METHODS,
  getForceFixture,
  setBridgeMode,
  type BridgeTransport,
} from "@/sdk/bridgeMode";

type BridgePayload = Record<string, unknown> | undefined;

export type StudioBridge = {
  invoke<T = Record<string, unknown>>(
    method: string,
    payload?: BridgePayload,
  ): Promise<ServiceEnvelope<T>>;
  lastTransport(): BridgeTransport;
};

let lastTransport: BridgeTransport = "fixture";

async function invokeLive<T>(
  method: string,
  payload?: BridgePayload,
): Promise<ServiceEnvelope<T> | null> {
  if (typeof window === "undefined") return null;
  if (import.meta.env.MODE === "test") return null;
  if (getForceFixture()) return null;
  if (!LIVE_BRIDGE_METHODS.has(method)) return null;

  try {
    const res = await fetch("/adf-bridge/invoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, payload: payload ?? {} }),
    });
    if (!res.ok) return null;
    const envelope = (await res.json()) as ServiceEnvelope<T> & {
      data?: { bridge?: string };
      error?: string;
    };
    if (!envelope || typeof envelope !== "object") return null;
    if (envelope.ok === false && envelope.error?.includes("unsupported")) return null;
    if (envelope.ok === false && !envelope.data) return null;
    return envelope;
  } catch {
    return null;
  }
}

function createBridge(): StudioBridge {
  return {
    lastTransport() {
      return lastTransport;
    },
    async invoke<T>(method: string, payload?: BridgePayload) {
      const live = await invokeLive<T>(method, payload);
      // Prefer any live envelope (ok or error) so write failures are not masked by fixtures.
      if (live) {
        lastTransport = "live";
        setBridgeMode("live", live.ok ? method : `${method}:error`);
        return live;
      }

      lastTransport = "fixture";
      setBridgeMode("fixture", method);
      return localFixtureProvider(method, payload) as Promise<ServiceEnvelope<T>>;
    },
  };
}

export const studioBridge = createBridge();
