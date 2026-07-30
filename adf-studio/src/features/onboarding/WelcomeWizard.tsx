import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FolderOpen,
  FolderPlus,
  Sparkles,
} from "lucide-react";
import { Button, Card } from "@/components/ui";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { cn } from "@/utils/cn";

const options = [
  {
    id: "create-workspace" as const,
    title: "Create Workspace",
    body: "Start with the default ADF workspace and learn the control-center layout.",
    icon: FolderPlus,
  },
  {
    id: "open-workspace" as const,
    title: "Open Existing Workspace",
    body: "Switch to a workspace already listed in Studio (SDK-backed list).",
    icon: FolderOpen,
  },
  {
    id: "learn" as const,
    title: "Learn ADF",
    body: "Read how Studio relates to CLI, Core, and Quick Start — without hype.",
    icon: BookOpen,
  },
  {
    id: "demo" as const,
    title: "Demo Project",
    body: "Guided 4-step tour: Dashboard → Runtime → Visual → Marketplace (~5 minutes).",
    icon: Sparkles,
    accent: true,
  },
];

export function WelcomeWizard() {
  const open = useOnboardingStore((s) => s.welcomeOpen);
  const hydrated = useOnboardingStore((s) => s.hydrated);
  const dismissWelcome = useOnboardingStore((s) => s.dismissWelcome);
  const startDemo = useOnboardingStore((s) => s.startDemo);
  const selectChoice = useOnboardingStore((s) => s.selectChoice);
  const loadAll = useWorkspaceStore((s) => s.loadAll);
  const switchWorkspace = useWorkspaceStore((s) => s.switchWorkspace);
  const pushNotification = useSettingsStore((s) => s.pushNotification);
  const navigate = useNavigate();

  if (!hydrated || !open) return null;

  async function onPick(id: (typeof options)[number]["id"]) {
    selectChoice(id);
    if (id === "demo") {
      startDemo();
      pushNotification({
        title: "Demo Project ready",
        body: "Follow the guided tour. RC1 screens may still use fixture data.",
        tone: "info",
      });
      navigate("/");
      return;
    }
    if (id === "learn") {
      dismissWelcome(true);
      navigate("/help");
      return;
    }
    if (id === "create-workspace") {
      await loadAll();
      const first = useWorkspaceStore.getState().workspaces[0];
      if (first) await switchWorkspace(first.id);
      dismissWelcome(true);
      pushNotification({
        title: "Workspace ready",
        body: "Using the default Studio workspace. Create real projects with: python -m adf init <name>",
        tone: "success",
      });
      navigate("/workspace");
      return;
    }
    if (id === "open-workspace") {
      await loadAll();
      const list = useWorkspaceStore.getState().workspaces;
      if (list[0]) await switchWorkspace(list[0].id);
      dismissWelcome(true);
      pushNotification({
        title: "Workspace opened",
        body: list.length
          ? `Active: ${list[0]?.name ?? list[0]?.id}. Use the top-bar selector to switch.`
          : "No workspaces returned yet — check SDK fixtures / doctor.",
        tone: "info",
      });
      navigate("/workspace");
    }
  }

  return (
    <div
      data-testid="welcome-wizard"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-wizard-title"
    >
      <Card className="w-full max-w-2xl border border-line shadow-xl">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          ADF Studio · {`1.0.0-rc1`}
        </p>
        <h2 id="welcome-wizard-title" className="mt-2 font-display text-2xl font-semibold tracking-tight">
          Welcome to ADF
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Studio is a <strong className="font-medium text-ink">control center</strong>, not an IDE
          or chatbot. Pick a starting path. You can reopen this anytime from Help.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                data-testid={`welcome-option-${opt.id}`}
                onClick={() => void onPick(opt.id)}
                className={cn(
                  "rounded-xl border border-line bg-canvas p-4 text-left transition hover:border-accent/50 hover:bg-canvas-elevated",
                  opt.accent && "border-accent/40 ring-1 ring-accent/20",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold">{opt.title}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{opt.body}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
          <p className="text-xs text-ink-muted">
            CLI: <code className="rounded bg-canvas px-1">python -m adf doctor</code> ·{" "}
            <code className="rounded bg-canvas px-1">adf init</code>
          </p>
          <Button variant="ghost" data-testid="welcome-skip" onClick={() => dismissWelcome(true)}>
            Skip for now
          </Button>
        </div>
      </Card>
    </div>
  );
}
