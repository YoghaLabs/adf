import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Badge } from "@/components/ui";
import { studioSdk } from "@/sdk";
import { useSettingsStore } from "@/stores/settingsStore";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useT } from "@/i18n";
import { getForceFixture, setForceFixture } from "@/sdk/bridgeMode";
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
  const [installed, setInstalled] = useState<
    { id: string; name: string; version: string; category: string; description: string }[]
  >([]);
  const [catalog, setCatalog] = useState<typeof installed>([]);
  const [packageId, setPackageId] = useState("demo-core");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const notify = useSettingsStore((s) => s.pushNotification);

  async function reload() {
    const [inst, avail] = await Promise.all([
      studioSdk.packages.listInstalled(),
      studioSdk.packages.list(false),
    ]);
    if (inst.ok) setInstalled(inst.data.packages ?? []);
    if (avail.ok) setCatalog(avail.data.packages ?? []);
  }

  useEffect(() => {
    void reload();
  }, []);

  async function runWrite(
    action: "install" | "remove" | "update" | "verify",
    id: string,
  ) {
    if (!id.trim()) return;
    if (action === "remove" && !window.confirm(`Remove package "${id}"?`)) return;
    if (action === "install" && !window.confirm(`Install package "${id}" from local registry?`)) return;
    setBusy(true);
    setMessage(null);
    try {
      const result =
        action === "install"
          ? await studioSdk.packages.install(id)
          : action === "remove"
            ? await studioSdk.packages.remove(id)
            : action === "update"
              ? await studioSdk.packages.update(id)
              : await studioSdk.packages.verify(id);
      const body = result.ok
        ? result.message || `${action} ok`
        : result.error || `${action} failed`;
      setMessage(body);
      notify({
        title: result.ok ? `Package ${action}` : `Package ${action} failed`,
        body,
        tone: result.ok ? "success" : "danger",
      });
      await reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageFrame
      testId="page-packages"
      title="Packages"
      subtitle="Live APM via PackageClient → Service Layer (BUILD-021 L4)."
    >
      <Card className="space-y-3">
        <div className="flex flex-wrap items-end gap-2">
          <label className="grid gap-1 text-sm">
            Package id
            <input
              data-testid="packages-id-input"
              className="h-9 rounded-lg border border-line bg-canvas-elevated px-3"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
            />
          </label>
          <Button
            variant="accent"
            data-testid="packages-install"
            disabled={busy}
            onClick={() => void runWrite("install", packageId)}
          >
            Install
          </Button>
          <Button
            variant="outline"
            data-testid="packages-remove"
            disabled={busy}
            onClick={() => void runWrite("remove", packageId)}
          >
            Remove
          </Button>
          <Button variant="outline" disabled={busy} onClick={() => void runWrite("update", packageId)}>
            Update
          </Button>
          <Button variant="ghost" disabled={busy} onClick={() => void runWrite("verify", packageId)}>
            Verify
          </Button>
        </div>
        {message ? <p className="text-xs text-ink-muted">{message}</p> : null}
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Installed ({installed.length})</h2>
        <ul className="mt-3 space-y-2" data-testid="packages-installed-list">
          {installed.length === 0 ? (
            <li className="text-xs text-ink-muted">No packages installed yet.</li>
          ) : (
            installed.map((pkg) => (
              <li
                key={pkg.id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-2 last:border-0"
              >
                <div>
                  <div className="text-sm font-medium">
                    {pkg.name} <span className="text-ink-muted">@{pkg.version}</span>
                  </div>
                  <div className="text-xs text-ink-muted">
                    {pkg.id} · {pkg.category}
                  </div>
                </div>
                <Button
                  variant="outline"
                  disabled={busy}
                  onClick={() => void runWrite("remove", pkg.id)}
                >
                  Remove
                </Button>
              </li>
            ))
          )}
        </ul>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Registry catalog ({catalog.length})</h2>
        <ul className="mt-3 space-y-2" data-testid="packages-catalog-list">
          {catalog.map((pkg) => (
            <li
              key={pkg.id}
              className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-2 last:border-0"
            >
              <div>
                <div className="text-sm font-medium">
                  {pkg.name} <span className="text-ink-muted">@{pkg.version}</span>
                </div>
                <div className="text-xs text-ink-muted">{pkg.description || pkg.id}</div>
              </div>
              <Button
                variant="accent"
                disabled={busy}
                onClick={() => {
                  setPackageId(pkg.id);
                  void runWrite("install", pkg.id);
                }}
              >
                Install
              </Button>
            </li>
          ))}
        </ul>
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
  const [demoFixtures, setDemoFixtures] = useState(() => getForceFixture());

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
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          className="mt-1"
          data-testid="settings-demo-fixtures"
          checked={demoFixtures}
          onChange={(e) => {
            const next = e.target.checked;
            setDemoFixtures(next);
            setForceFixture(next);
          }}
        />
        <span>
          <span className="font-medium">{t("settings.demoMode")}</span>
          <span className="mt-0.5 block text-xs text-ink-muted">{t("settings.demoMode.help")}</span>
        </span>
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
