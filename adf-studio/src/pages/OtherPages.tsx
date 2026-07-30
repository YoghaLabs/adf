import { useEffect, useState, type ReactNode } from "react";
import { Card, Badge } from "@/components/ui";
import { studioSdk } from "@/sdk";
import { useSettingsStore } from "@/stores/settingsStore";
import type { ThemeMode } from "@/types/studio";

export function TemplatesPage() {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    void studioSdk.generator.listTypes().then((r) => {
      setTypes((r.data.projectTypes as string[]) ?? []);
    });
  }, []);

  return (
    <PageFrame
      testId="page-templates"
      title="Templates"
      subtitle="Template catalog via GeneratorClient (no local generation)."
    >
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {types.map((type) => (
          <Card key={type}>
            <div className="font-medium">{type}</div>
            <Badge className="mt-2">template</Badge>
          </Card>
        ))}
      </div>
    </PageFrame>
  );
}

export function PackagesPage() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    void studioSdk.packages.listInstalled().then((r) => setCount(Number(r.data.count ?? 0)));
  }, []);
  return (
    <PageFrame testId="page-packages" title="Packages" subtitle="Installed packages via PackageClient.">
      <Card>
        <div className="text-2xl font-semibold">{count}</div>
        <p className="studio-muted">Installed packages reported by SDK</p>
      </Card>
    </PageFrame>
  );
}

export function KnowledgePage() {
  return (
    <PageFrame
      testId="page-knowledge"
      title="Knowledge"
      subtitle="Knowledge packs, context, memory, graphs — open Visual Intelligence for graphs."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {["Knowledge Packs", "Context", "Memory", "Graphs"].map((label) => (
          <Card key={label}>
            <div className="font-medium">{label}</div>
            <p className="studio-muted mt-1">
              {label === "Graphs"
                ? "See /visual/knowledge for the read-only Knowledge Graph."
                : "Bound via Knowledge/Context services; visualization is UI-only."}
            </p>
          </Card>
        ))}
      </div>
    </PageFrame>
  );
}

export { RuntimeDashboardPage as RuntimePage } from "@/features/runtime/dashboard/RuntimeDashboardPage";

export { SessionManagerPage as SessionsPage } from "@/features/workspace/pages/SessionManagerPage";

export function ReleasePage() {
  const [channels, setChannels] = useState<{ channel: string; label: string }[]>([]);
  useEffect(() => {
    void studioSdk.release.channels().then((r) => {
      setChannels((r.data.channels as { channel: string; label: string }[]) ?? []);
    });
  }, []);
  return (
    <PageFrame testId="page-release" title="Release" subtitle="Channels via ReleaseClient.">
      <div className="grid gap-3 md:grid-cols-3">
        {channels.map((c) => (
          <Card key={c.channel}>
            <div className="font-medium">{c.label}</div>
            <div className="text-xs text-ink-muted">{c.channel}</div>
          </Card>
        ))}
      </div>
    </PageFrame>
  );
}

export function SettingsPage() {
  return (
    <PageFrame
      testId="page-settings"
      title="Settings"
      subtitle="Theme, language, channels, registry, SDK, updates."
    >
      <SettingsForm />
    </PageFrame>
  );
}

export function HelpPage() {
  return (
    <PageFrame testId="page-help" title="Help" subtitle="ADF Studio is a control center, not an IDE.">
      <Card>
        <p className="text-sm leading-relaxed text-ink-muted">
          Studio communicates only through UI → SDK → Service Layer → ADF Core. Business logic
          stays in engines and services.
        </p>
      </Card>
    </PageFrame>
  );
}

function PageFrame({
  title,
  subtitle,
  children,
  testId,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  testId: string;
}) {
  return (
    <div data-testid={testId} className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="studio-muted mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function SettingsForm() {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const channel = useSettingsStore((s) => s.channel);
  const setChannel = useSettingsStore((s) => s.setChannel);
  const registry = useSettingsStore((s) => s.registry);
  const setRegistry = useSettingsStore((s) => s.setRegistry);

  return (
    <Card className="grid max-w-xl gap-4">
      <label className="grid gap-1 text-sm">
        Theme
        <select
          className="h-9 rounded-lg border border-line bg-canvas-elevated px-3"
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemeMode)}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="system">System</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Language
        <select
          className="h-9 rounded-lg border border-line bg-canvas-elevated px-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="id">Bahasa Indonesia</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Channels
        <select
          className="h-9 rounded-lg border border-line bg-canvas-elevated px-3"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        >
          {["development", "alpha", "beta", "rc", "stable", "lts"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Registry
        <select
          className="h-9 rounded-lg border border-line bg-canvas-elevated px-3"
          value={registry}
          onChange={(e) => setRegistry(e.target.value)}
        >
          <option value="local">Local</option>
          <option value="github">GitHub</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </label>
      <p className="studio-muted">SDK & Updates settings are presentation-only in BUILD-013.</p>
    </Card>
  );
}
