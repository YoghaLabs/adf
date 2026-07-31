import { useEffect, useState } from "react";
import { Button, Card } from "@/components/ui";
import { SessionList } from "@/features/workspace/components";
import { useSessionStore, useWorkspaceStore } from "@/features/workspace/stores";

export function SessionManagerPage() {
  const activeId = useWorkspaceStore((s) => s.activeId);
  const loadWorkspace = useWorkspaceStore((s) => s.loadAll);
  const load = useSessionStore((s) => s.load);
  const create = useSessionStore((s) => s.create);
  const sessions = useSessionStore((s) => s.sessions);
  const recent = useSessionStore((s) => s.recent);
  const current = useSessionStore((s) => s.current);
  const timeline = useSessionStore((s) => s.timeline);
  const resume = useSessionStore((s) => s.resume);
  const close = useSessionStore((s) => s.close);
  const loadTimeline = useSessionStore((s) => s.loadTimeline);
  const error = useSessionStore((s) => s.error);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void loadWorkspace().then(() => {
      void load(useWorkspaceStore.getState().activeId ?? undefined);
    });
  }, [load, loadWorkspace]);

  useEffect(() => {
    if (activeId) void load(activeId);
  }, [activeId, load]);

  useEffect(() => {
    if (current?.id) void loadTimeline(current.id);
  }, [current?.id, loadTimeline]);

  return (
    <div data-testid="page-sessions" className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Sessions</h1>
          <p className="studio-muted mt-1">
            Durable sessions under <code className="rounded bg-canvas px-1">.adf/local/sessions/</code>{" "}
            (BUILD-021 L5+ / FO-4).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            data-testid="session-title-input"
            className="h-9 rounded-lg border border-line bg-canvas-elevated px-3 text-sm"
            placeholder="New session title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            variant="accent"
            data-testid="session-create"
            disabled={busy}
            onClick={() => {
              setBusy(true);
              void create(title || undefined, activeId ?? undefined).finally(() => {
                setBusy(false);
                setTitle("");
              });
            }}
          >
            New session
          </Button>
        </div>
      </div>

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card data-testid="current-session">
          <h3 className="mb-2 text-sm font-semibold">Current Session</h3>
          {current ? (
            <div>
              <div className="text-lg font-medium">{current.title}</div>
              <div className="studio-muted text-sm">
                {current.id} · {current.status} · project {current.projectId}
              </div>
            </div>
          ) : (
            <p className="studio-muted text-sm">No active durable session — create one to begin.</p>
          )}
        </Card>
        <Card data-testid="session-timeline">
          <h3 className="mb-2 text-sm font-semibold">Session Timeline</h3>
          <ul className="space-y-2 text-sm">
            {timeline.map((e) => (
              <li key={e.id} className="flex justify-between gap-2">
                <span>{e.label}</span>
                <span className="text-xs text-ink-muted">{new Date(e.at).toLocaleString()}</span>
              </li>
            ))}
            {timeline.length === 0 && <li className="studio-muted">No timeline events</li>}
          </ul>
        </Card>
      </div>

      <section>
        <h3 className="mb-3 text-sm font-semibold">Recent Sessions</h3>
        <SessionList
          testId="session-list-recent"
          sessions={recent}
          onResume={(id) => void resume(id)}
          onClose={(id) => void close(id)}
        />
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold">Session History</h3>
        <SessionList
          testId="session-list"
          sessions={sessions}
          onResume={(id) => void resume(id)}
          onClose={(id) => void close(id)}
        />
      </section>
    </div>
  );
}
