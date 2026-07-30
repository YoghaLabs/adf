import { useNavigate } from "react-router-dom";
import { Button, Card } from "@/components/ui";
import { useOnboardingStore, type DemoStepId } from "@/stores/onboardingStore";

const steps: { id: DemoStepId; path: string; title: string; body: string }[] = [
  {
    id: "dashboard",
    path: "/",
    title: "1 · Dashboard",
    body: "Home overview of workspace health. RC1 may show fixture/demo numbers — that is expected.",
  },
  {
    id: "runtime",
    path: "/runtime",
    title: "2 · Runtime",
    body: "Runtime monitor panels. For live CLI health use: python -m adf doctor / boot.",
  },
  {
    id: "visual",
    path: "/visual",
    title: "3 · Visual",
    body: "Graphs and visual intelligence views. Explore knowledge/dependency graphs from the sidebar.",
  },
  {
    id: "marketplace",
    path: "/marketplace",
    title: "4 · Marketplace",
    body: "Package/registry browsing UI. Install real packages via CLI when needed.",
  },
];

export function DemoGuide() {
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
              Demo Project · {demoProjectName}
            </p>
            <h3 className="mt-1 text-sm font-semibold">{current.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{current.body}</p>
          </div>
          <Button variant="ghost" className="shrink-0" onClick={() => finishDemo()}>
            End
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[11px] text-ink-muted">
            Step {index + 1} of {steps.length}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" disabled={index <= 0} onClick={back}>
              Back
            </Button>
            <Button variant="accent" data-testid="demo-guide-next" onClick={next}>
              {index >= steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
