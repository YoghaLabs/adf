import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studioConfig } from "@/config/studio";
import { Button, Input } from "@/components/ui";
import { useSettingsStore } from "@/stores/settingsStore";

export function CommandPalette() {
  const open = useSettingsStore((s) => s.commandOpen);
  const setOpen = useSettingsStore((s) => s.setCommandOpen);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studioConfig.navigation.filter(
      (item) => !q || item.label.toLowerCase().includes(q) || item.id.includes(q),
    );
  }, [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div
      data-testid="command-palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 p-24 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="studio-panel w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-line p-3">
          <Input
            autoFocus
            placeholder="Jump to…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {items.map((item) => (
            <li key={item.id}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
