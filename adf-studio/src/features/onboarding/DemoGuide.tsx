import { useNavigate } from "react-router-dom";
import { Button, Card } from "@/components/ui";
import { useOnboardingStore, type DemoStepId } from "@/stores/onboardingStore";
import { useT } from "@/i18n";
import type { MessageKey } from "@/i18n";

const steps: { id: DemoStepId; path: string; titleKey: MessageKey; bodyKey: MessageKey }[] = [
  {
    id: "dashboard",
    path: "/",
    titleKey: "demo.dashboard.title",
    bodyKey: "demo.dashboard.body",
  },
  {
    id: "runtime",
    path: "/runtime",
    titleKey: "demo.runtime.title",
    bodyKey: "demo.runtime.body",
  },
  {
    id: "visual",
    path: "/visual",
    titleKey: "demo.visual.title",
    bodyKey: "demo.visual.body",
  },
  {
    id: "marketplace",
    path: "/marketplace",
    titleKey: "demo.marketplace.title",
    bodyKey: "demo.marketplace.body",
  },
];

export function DemoGuide() {
  const t = useT();
  const demoStep = useOnboardingStore((s) => s.demoStep);
  const demoProjectName = useOnboardingStore((s) => s.demoProjectName);
  const setDemoStep = useOnboardingStore((s) => s.setDemoStep);
  const finishDemo = useOnboardingStore((s) => s.finishDemo);
  const navigate = useNavigate();

  if (!demoStep || demoStep === "done") return null;

  const index = steps.findIndex((s) => s.id === demoStep);
  const current = steps[index] ?? steps[0];

  function next() {
    const nextStep = steps[index + 1];
    if (!nextStep) {
      finishDemo();
      navigate("/help");
      return;
    }
    setDemoStep(nextStep.id);
    navigate(nextStep.path);
  }

  function back() {
    const prev = steps[index - 1];
    if (!prev) return;
    setDemoStep(prev.id);
    navigate(prev.path);
  }

  return (
    <div
      data-testid="demo-guide"
      className="pointer-events-none fixed bottom-16 left-1/2 z-50 w-[min(92vw,36rem)] -translate-x-1/2"
    >
      <Card className="pointer-events-auto border border-accent/30 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-accent">
              {t("demo.badge", { name: demoProjectName ?? "demo" })}
            </p>
            <h3 className="mt-1 text-sm font-semibold">{t(current.titleKey)}</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{t(current.bodyKey)}</p>
          </div>
          <Button variant="ghost" className="shrink-0" onClick={() => finishDemo()}>
            {t("demo.end")}
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[11px] text-ink-muted">
            {t("demo.stepOf", { n: index + 1, total: steps.length })}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" disabled={index <= 0} onClick={back}>
              {t("demo.back")}
            </Button>
            <Button variant="accent" data-testid="demo-guide-next" onClick={next}>
              {index >= steps.length - 1 ? t("demo.finish") : t("demo.next")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
