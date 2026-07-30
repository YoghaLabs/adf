import { NavLink } from "react-router-dom";
import type { ComponentType } from "react";
import {
  Boxes,
  CircuitBoard,
  Compass,
  HelpCircle,
  LayoutDashboard,
  Library,
  Package,
  Puzzle,
  Rocket,
  Search,
  Settings,
  FolderKanban,
  Timer,
  Network,
  Users,
} from "lucide-react";
import { studioConfig } from "@/config/studio";
import { useSettingsStore } from "@/stores/settingsStore";
import { cn } from "@/utils/cn";

const icons: Record<string, ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  workspace: Compass,
  projects: FolderKanban,
  sessions: Timer,
  collaboration: Users,
  visual: Network,
  marketplace: Boxes,
  knowledge: Library,
  packages: Package,
  templates: Puzzle,
  settings: Settings,
  search: Search,
  runtime: CircuitBoard,
  release: Rocket,
  help: HelpCircle,
};

export function Sidebar() {
  const collapsed = useSettingsStore((s) => s.sidebarCollapsed);

  return (
    <aside
      data-testid="studio-sidebar"
      className={cn(
        "flex h-full flex-col border-r border-line bg-canvas-elevated/80 backdrop-blur transition-all",
        collapsed ? "w-[72px]" : "w-60",
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-line px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground">
          A
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-semibold tracking-tight">ADF Studio</div>
            <div className="text-[11px] text-ink-muted">Control Center</div>
          </div>
        )}
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {studioConfig.navigation.map((item) => {
          const Icon = icons[item.id] ?? LayoutDashboard;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-ink-muted hover:bg-canvas hover:text-ink",
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
