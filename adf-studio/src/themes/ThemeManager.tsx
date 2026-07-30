import { useEffect } from "react";
import type { ThemeMode } from "@/types/studio";
import { useSettingsStore } from "@/stores/settingsStore";

function systemPrefersDark(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return true;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveTheme(mode: ThemeMode): "dark" | "light" {
  if (mode === "system") {
    return systemPrefersDark() ? "dark" : "light";
  }
  return mode;
}

export function ThemeManager() {
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    const applied = resolveTheme(theme);
    document.documentElement.classList.toggle("dark", applied === "dark");
    document.documentElement.setAttribute("data-theme", applied);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      document.documentElement.classList.toggle("dark", mq.matches);
      document.documentElement.setAttribute("data-theme", mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return null;
}
