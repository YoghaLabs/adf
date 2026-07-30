import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studioConfig } from "@/config/studio";
import { Button, Input } from "@/components/ui";
import { useSettingsStore } from "@/stores/settingsStore";
import { useSearchStore } from "@/stores/searchStore";
import { studioSdk } from "@/sdk";

export function CommandPalette() {
  const open = useSettingsStore((s) => s.commandOpen);
  const setOpen = useSettingsStore((s) => s.setCommandOpen);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const setScope = useSearchStore((s) => s.setScope);
  const run = useSearchStore((s) => s.run);
  const hits = useSearchStore((s) => s.hits);
  const commands = useSearchStore((s) => s.commands);

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

  useEffect(() => {
    if (!open) return;
    setScope("command");
    void run(query);
  }, [open, query, run, setScope]);

  const navItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studioConfig.navigation.filter(
      (item) => !q || item.label.toLowerCase().includes(q) || item.id.includes(q),
    );
  }, [query]);

  if (!open) return null;

  const quickActions = [
    { id: "qa-open", label: "Open Project", path: "/projects" },
    { id: "qa-switch", label: "Switch Workspace", path: "/workspace" },
    { id: "qa-resume", label: "Resume Session", path: "/sessions" },
    { id: "qa-install", label: "Install Package", path: "/packages" },
    { id: "qa-market", label: "Marketplace Search", path: "/marketplace" },
  ];

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
            placeholder="Quick actions, search, navigate…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Command palette"
          />
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Quick Actions
          </p>
          <ul>
            {quickActions
              .filter((a) => !query || a.label.toLowerCase().includes(query.toLowerCase()))
              .map((item) => (
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

          <p className="mt-2 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Commands
          </p>
          <ul>
            {(commands.length ? commands : []).map((item) => (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    if (item.path) navigate(item.path);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Button>
              </li>
            ))}
            {hits
              .filter((h) => h.kind === "package" || h.kind === "project")
              .slice(0, 6)
              .map((hit) => (
                <li key={hit.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={async () => {
                      if (hit.kind === "package") {
                        await studioSdk.marketplace.search(hit.label);
                      }
                      if (hit.path) navigate(hit.path);
                      setOpen(false);
                    }}
                  >
                    {hit.label}
                    <span className="ml-2 text-xs text-ink-muted">{hit.kind}</span>
                  </Button>
                </li>
              ))}
          </ul>

          <p className="mt-2 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Navigate
          </p>
          <ul>
            {navItems.map((item) => (
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
    </div>
  );
}
