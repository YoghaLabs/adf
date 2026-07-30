import { create } from "zustand";

const STORAGE_KEY = "adf.studio.onboarding.v1";

export type OnboardingChoice =
  | "create-workspace"
  | "open-workspace"
  | "learn"
  | "demo"
  | null;

export type DemoStepId = "dashboard" | "runtime" | "visual" | "marketplace" | "done";

type OnboardingState = {
  hydrated: boolean;
  welcomeOpen: boolean;
  completed: boolean;
  choice: OnboardingChoice;
  demoStep: DemoStepId | null;
  demoProjectName: string | null;
  hydrate: () => void;
  openWelcome: () => void;
  dismissWelcome: (markComplete?: boolean) => void;
  selectChoice: (choice: Exclude<OnboardingChoice, null>) => void;
  startDemo: () => void;
  setDemoStep: (step: DemoStepId | null) => void;
  finishDemo: () => void;
};

function readCompleted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "done";
  } catch {
    return false;
  }
}

function writeCompleted(done: boolean) {
  try {
    if (done) localStorage.setItem(STORAGE_KEY, "done");
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore private mode */
  }
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  hydrated: false,
  welcomeOpen: false,
  completed: false,
  choice: null,
  demoStep: null,
  demoProjectName: null,
  hydrate() {
    const completed = readCompleted();
    set({
      hydrated: true,
      completed,
      welcomeOpen: !completed,
    });
  },
  openWelcome() {
    set({ welcomeOpen: true });
  },
  dismissWelcome(markComplete = true) {
    if (markComplete) writeCompleted(true);
    set({
      welcomeOpen: false,
      completed: markComplete ? true : get().completed,
    });
  },
  selectChoice(choice) {
    set({ choice });
  },
  startDemo() {
    writeCompleted(true);
    set({
      welcomeOpen: false,
      completed: true,
      choice: "demo",
      demoStep: "dashboard",
      demoProjectName: "demo-hello-adf",
    });
  },
  setDemoStep(step) {
    set({ demoStep: step });
  },
  finishDemo() {
    set({ demoStep: "done", choice: "demo" });
  },
}));
