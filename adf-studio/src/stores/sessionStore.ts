import { create } from "zustand";
import type { SessionSummary, SessionTimelineEvent } from "@/types/studio";
import { studioSdk } from "@/sdk";

type SessionState = {
  sessions: SessionSummary[];
  recent: SessionSummary[];
  history: SessionSummary[];
  current: SessionSummary | null;
  timeline: SessionTimelineEvent[];
  loading: boolean;
  error: string | null;
  load: (workspaceId?: string) => Promise<void>;
  create: (title?: string, workspaceId?: string) => Promise<void>;
  resume: (sessionId: string) => Promise<void>;
  close: (sessionId: string) => Promise<void>;
  loadTimeline: (sessionId: string) => Promise<void>;
};

export const useSessionStore = create<SessionState>((set, get) => ({
  sessions: [],
  recent: [],
  history: [],
  current: null,
  timeline: [],
  loading: false,
  error: null,
  async load(workspaceId) {
    set({ loading: true, error: null });
    const [list, recent, history, current] = await Promise.all([
      studioSdk.sessions.list(workspaceId),
      studioSdk.sessions.recent(workspaceId),
      studioSdk.sessions.history(workspaceId),
      studioSdk.sessions.current(),
    ]);
    set({
      sessions: list.ok ? list.data.sessions : [],
      recent: recent.ok ? recent.data.sessions : [],
      history: history.ok ? history.data.sessions : [],
      current: current.ok ? current.data.session : null,
      loading: false,
    });
  },
  async create(title, workspaceId) {
    const result = await studioSdk.sessions.create({
      title: title || undefined,
      workspaceId: workspaceId || undefined,
    });
    if (!result.ok) {
      set({ error: result.error ?? "create failed" });
      return;
    }
    set({ current: result.data.session });
    await get().load(workspaceId);
    if (result.data.session?.id) {
      await get().loadTimeline(result.data.session.id);
    }
  },
  async resume(sessionId) {
    const result = await studioSdk.sessions.resume(sessionId);
    if (!result.ok) {
      set({ error: result.error ?? "resume failed" });
      return;
    }
    set({ current: result.data.session });
    await get().load();
    await get().loadTimeline(sessionId);
  },
  async close(sessionId) {
    const result = await studioSdk.sessions.close(sessionId);
    if (!result.ok) {
      set({ error: result.error ?? "close failed" });
      return;
    }
    if (get().current?.id === sessionId) {
      set({ current: null });
    }
    await get().load();
  },
  async loadTimeline(sessionId) {
    const result = await studioSdk.sessions.timeline(sessionId);
    set({ timeline: result.ok ? result.data.events : [] });
  },
}));
