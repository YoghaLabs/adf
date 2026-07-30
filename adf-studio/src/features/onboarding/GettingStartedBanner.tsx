import { useNavigate } from "react-router-dom";
import { Button, Card } from "@/components/ui";
import { useOnboardingStore } from "@/stores/onboardingStore";

export function GettingStartedBanner() {
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
          <h2 className="text-sm font-semibold tracking-tight">How to operate ADF Studio</h2>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-ink-muted">
            Studio is a control center over services — not an IDE. Many panels in RC1 still show
            fixture/demo data so you can explore navigation. Real project creation is done with the
            CLI (<code className="rounded bg-canvas px-1">adf init</code>
            ). {demoProjectName ? ` Active demo: ${demoProjectName}.` : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="accent" onClick={() => openWelcome()}>
            {completed ? "Replay welcome" : "Open welcome"}
          </Button>
          <Button variant="outline" onClick={() => navigate("/help")}>
            Help & Quick Start
          </Button>
        </div>
      </div>
    </Card>
  );
}
