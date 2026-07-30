import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Badge } from "@/components/ui";
import { studioSdk } from "@/sdk";
import { useSettingsStore } from "@/stores/settingsStore";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useT } from "@/i18n";
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
  const t = useT();
  return (
    <PageFrame
      testId="page-settings"
      title={t("settings.title")}
      subtitle={t("settings.subtitle")}
    >
      <SettingsForm />
    </PageFrame>
  );
}

export function HelpPage() {
  const t = useT();
  const openWelcome = useOnboardingStore((s) => s.openWelcome);
  const startDemo = useOnboardingStore((s) => s.startDemo);
  const navigate = useNavigate();

  return (
    <PageFrame testId="page-help" title={t("help.title")} subtitle={t("help.subtitle")}>
      <Card className="space-y-3">
        <p className="text-sm leading-relaxed text-ink-muted">{t("help.intro")}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="accent" onClick={() => openWelcome()}>
            {t("help.openWelcome")}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              startDemo();
              navigate("/");
            }}
          >
            {t("help.startDemo")}
          </Button>
        </div>
      </Card>

      <Card className="space-y-2">
        <h2 className="text-sm font-semibold">{t("help.pathTitle")}</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-muted">
          <li>{t("help.path.1")}</li>
          <li>
            {t("help.path.2")}{" "}
            <code className="rounded bg-canvas px-1">python -m adf doctor --root .</code>
          </li>
          <li>
            {t("help.path.3")}{" "}
            <code className="rounded bg-canvas px-1">python -m adf init my-app</code>
          </li>
          <li>{t("help.path.4")}</li>
        </ol>
        <p className="text-xs text-ink-muted">
          {t("help.docs")}{" "}
          <code className="rounded bg-canvas px-1">adf-docs/quickstart/README.md</code>
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
  const t = useT();
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
        {t("settings.theme")}
        <select
          className="h-9 rounded-lg border border-line bg-canvas-elevated px-3"
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemeMode)}
        >
          <option value="dark">{t("settings.theme.dark")}</option>
          <option value="light">{t("settings.theme.light")}</option>
          <option value="system">{t("settings.theme.system")}</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {t("settings.language")}
        <select
          className="h-9 rounded-lg border border-line bg-canvas-elevated px-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          data-testid="settings-language"
        >
          <option value="en">English</option>
          <option value="id">Bahasa Indonesia</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        {t("settings.channels")}
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
        {t("settings.registry")}
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
