import { studioSdk } from "@/sdk";
import type { GraphKind } from "@/features/visual/types";

export const visualServices = {
  graph: (kind: GraphKind) => studioSdk.graph.get(kind),
  knowledge: () => studioSdk.knowledge.graph(),
  dependency: () => studioSdk.dependency.graph(),
  overview: () => studioSdk.visualization.overview(),
  search: (query: string) => studioSdk.visualization.search(query),
};
