import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input } from "@/components/ui";
import { SearchResults } from "@/features/workspace/components";
import { useSearchStore } from "@/features/workspace/stores";

const scopes = ["global", "project", "workspace", "command", "package"] as const;

export function SearchPlatformPage() {
  const navigate = useNavigate();
  const query = useSearchStore((s) => s.query);
  const scope = useSearchStore((s) => s.scope);
  const hits = useSearchStore((s) => s.hits);
  const commands = useSearchStore((s) => s.commands);
  const loading = useSearchStore((s) => s.loading);
  const setQuery = useSearchStore((s) => s.setQuery);
  const setScope = useSearchStore((s) => s.setScope);
  const run = useSearchStore((s) => s.run);
  const [local, setLocal] = useState(query);

  useEffect(() => {
    void run("");
  }, [run]);

  return (
    <div data-testid="page-search" className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Search</h1>
        <p className="studio-muted mt-1">
          Global, project, workspace, command, and package search via SearchClient.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {scopes.map((s) => (
          <Button
            key={s}
            variant={scope === s ? "accent" : "outline"}
            onClick={() => {
              setScope(s);
              void run(local);
            }}
          >
            {s}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Search…"
          aria-label="Global search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setQuery(local);
              void run(local);
            }
          }}
        />
        <Button
          variant="accent"
          onClick={() => {
            setQuery(local);
            void run(local);
          }}
        >
          Search
        </Button>
      </div>

      <Card>
        {loading && <p className="studio-muted text-sm">Searching…</p>}
        <SearchResults
          hits={hits}
          onSelect={(hit) => {
            if (hit.path) navigate(hit.path);
          }}
        />
        {scope === "command" && commands.length > 0 && (
          <div className="mt-4 border-t border-line pt-3">
            <h3 className="mb-2 text-sm font-semibold">Quick Actions</h3>
            <ul className="space-y-1 text-sm">
              {commands.map((c) => (
                <li key={c.id}>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => c.path && navigate(c.path)}>
                    {c.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}
