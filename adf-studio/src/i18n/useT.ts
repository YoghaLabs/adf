import { useSettingsStore } from "@/stores/settingsStore";
import { t, type MessageKey } from "@/i18n/messages";

export function useT() {
  const language = useSettingsStore((s) => s.language);
  return (key: MessageKey, vars?: Record<string, string | number>) => t(language, key, vars);
}
