import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "@/shell/Sidebar";
import { TopBar } from "@/shell/TopBar";
import { StatusBar } from "@/shell/StatusBar";
import { NotificationCenter } from "@/shell/NotificationCenter";
import { CommandPalette } from "@/shell/CommandPalette";
import { ThemeManager } from "@/themes/ThemeManager";
import { WelcomeWizard, DemoGuide } from "@/features/onboarding";
import { useOnboardingStore } from "@/stores/onboardingStore";

export function ApplicationShell() {
  const hydrate = useOnboardingStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div data-testid="application-shell" className="flex h-screen flex-col overflow-hidden">
      <ThemeManager />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="min-h-0 flex-1 overflow-auto p-6">
            <Outlet />
          </main>
          <StatusBar />
        </div>
      </div>
      <NotificationCenter />
      <CommandPalette />
      <WelcomeWizard />
      <DemoGuide />
    </div>
  );
}
