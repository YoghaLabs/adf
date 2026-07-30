import { Bell, Command, PanelLeft, Search, Compass } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useSettingsStore } from "@/stores/settingsStore";
import { useUiStore } from "@/stores";
import { WorkspaceSelector } from "@/shell/WorkspaceSelector";
import { useOnboardingStore } from "@/stores/onboardingStore";

export function TopBar() {
  const toggleSidebar = useSettingsStore((s) => s.toggleSidebar);
  const setCommandOpen = useSettingsStore((s) => s.setCommandOpen);
  const globalSearch = useUiStore((s) => s.globalSearch);
  const setGlobalSearch = useUiStore((s) => s.setGlobalSearch);
  const notifications = useSettingsStore((s) => s.notifications);
  const openWelcome = useOnboardingStore((s) => s.openWelcome);

  return (
    <header
      data-testid="studio-topbar"
      className="flex h-14 items-center gap-3 border-b border-line bg-canvas-elevated/70 px-4 backdrop-blur"
    >
      <Button variant="ghost" aria-label="Toggle sidebar" onClick={toggleSidebar}>
        <PanelLeft className="h-4 w-4" />
      </Button>
      <WorkspaceSelector />
      <div className="relative mx-auto w-full max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-ink-muted" />
        <Input
          aria-label="Global search"
          className="pl-9"
          placeholder="Search projects, packages, knowledge…"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        data-testid="topbar-welcome"
        onClick={() => openWelcome()}
        title="Welcome / Demo"
      >
        <Compass className="h-4 w-4" />
        <span className="hidden sm:inline">Welcome</span>
      </Button>
      <Button variant="outline" onClick={() => setCommandOpen(true)}>
        <Command className="h-4 w-4" />
        <span className="hidden sm:inline">Command</span>
      </Button>
      <Button variant="ghost" aria-label="Notifications" className="relative">
        <Bell className="h-4 w-4" />
        {notifications.length > 0 && (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
        )}
      </Button>
    </header>
  );
}
