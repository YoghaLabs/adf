/**
 * Bridge from Studio UI → ADF Core SDK/Service Layer.
 *
 * In desktop builds this will invoke Tauri commands that call Python SDKClient.
 * For UI development and Vitest, a local fixture provider is used.
 * No business rules live here — only transport + fixture envelopes.
 */

import type { ServiceEnvelope } from "@/types/studio";
import { localFixtureProvider } from "@/sdk/fixtures";

type BridgePayload = Record<string, unknown> | undefined;

export type StudioBridge = {
  invoke<T = Record<string, unknown>>(
    method: string,
    payload?: BridgePayload,
  ): Promise<ServiceEnvelope<T>>;
};

function createBridge(): StudioBridge {
  return {
    async invoke<T>(method: string, payload?: BridgePayload) {
      // Future: window.__TAURI__.invoke("adf_sdk", { method, payload })
      return localFixtureProvider(method, payload) as Promise<ServiceEnvelope<T>>;
    },
  };
}

export const studioBridge = createBridge();
