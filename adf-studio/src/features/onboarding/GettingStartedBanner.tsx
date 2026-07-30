import { useNavigate } from "react-router-dom";
import { Button, Card } from "@/components/ui";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useT } from "@/i18n";

export function GettingStartedBanner() {
  const t = useT();
  const openWelcome = useOnboardingStore((s) => s.openWelcome);
  const demoProjectName = useOnboardingStore((s) => s.demoProjectName);
  const completed = useOnboardingStore((s) => s.completed);
  const navigate = useNavigate();

  return (
    <Card
      data-testid="getting-started-banner"
      className="border border-line bg-gradient-to-br from-accent/10 to-transparent"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">{t("banner.title")}</h2>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-ink-muted">
            {t("banner.body")} (<code className="rounded bg-canvas px-1">adf init</code>
            ).
            {demoProjectName ? t("banner.demoActive", { name: demoProjectName }) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="accent" onClick={() => openWelcome()}>
            {completed ? t("banner.replayWelcome") : t("banner.openWelcome")}
          </Button>
          <Button variant="outline" onClick={() => navigate("/help")}>
            {t("banner.help")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
