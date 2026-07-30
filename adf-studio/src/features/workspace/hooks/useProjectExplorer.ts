import { useProjectExplorerStore } from "@/features/workspace/stores";

export function useVisibleProjects() {
  const filter = useProjectExplorerStore((s) => s.filter);
  const explorer = useProjectExplorerStore((s) => s.explorer);
  const favorites = useProjectExplorerStore((s) => s.favorites);
  const pinned = useProjectExplorerStore((s) => s.pinned);
  const archived = useProjectExplorerStore((s) => s.archived);
  const recent = useProjectExplorerStore((s) => s.recent);

  switch (filter) {
    case "favorites":
      return favorites;
    case "pinned":
      return pinned;
    case "archived":
      return archived;
    case "recent":
      return recent;
    default:
      return explorer.filter((p) => !p.archived);
  }
}
