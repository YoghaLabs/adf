"""Session lifecycle manager."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4

from runtime.exceptions import AdfSessionError


class SessionManager:
    """Create, restore, list, and close ADF operator sessions.

    Sessions are stored as JSON under ``.adf/local/sessions/`` (durable, gitignored via
    ``.adf/local/``). This is the FO-4 source of truth for Studio session surfaces.
    """

    def __init__(self, repo_root: Path | str) -> None:
        """Initialize session storage under the repository root."""
        self.repo_root = Path(repo_root).resolve()
        self.sessions_dir = self.repo_root / ".adf" / "local" / "sessions"

    def create(
        self,
        *,
        build: str,
        operator_state: str = "BOOT",
        title: str | None = None,
        project_id: str = "adf",
        workspace_id: str = "ws-live",
    ) -> dict[str, Any]:
        """Create a new session record and mark it current."""
        self.sessions_dir.mkdir(parents=True, exist_ok=True)
        session_id = f"sess-{uuid4().hex[:12]}"
        now = self._now()
        session = {
            "id": session_id,
            "title": title or f"Session {session_id[-6:]}",
            "project_id": project_id,
            "workspace_id": workspace_id,
            "build": build,
            "operator_state": operator_state,
            "created_at": now,
            "updated_at": now,
            "started_at": now,
            "status": "open",
            "notes": [],
            "timeline": [
                {
                    "id": f"{session_id}-t0",
                    "sessionId": session_id,
                    "label": "Session created",
                    "at": now,
                }
            ],
        }
        self._write(session)
        self._write_current(session_id)
        return session

    def list(self, *, include_closed: bool = True) -> list[dict[str, Any]]:
        """List durable sessions, newest updated first."""
        if not self.sessions_dir.is_dir():
            return []
        rows: list[dict[str, Any]] = []
        for path in sorted(self.sessions_dir.glob("sess-*.json")):
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
            except (OSError, json.JSONDecodeError):
                continue
            if not isinstance(data, dict):
                continue
            status = str(data.get("status") or "open")
            if not include_closed and status == "closed":
                continue
            rows.append(data)
        rows.sort(key=lambda s: str(s.get("updated_at") or ""), reverse=True)
        return rows

    def restore(self, session_id: str | None = None) -> dict[str, Any]:
        """Restore a session by id or the current session pointer."""
        target = session_id or self._read_current()
        if not target:
            raise AdfSessionError("No session id provided and no current session")
        path = self.sessions_dir / f"{target}.json"
        if not path.is_file():
            raise AdfSessionError(f"Session not found: {target}")
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise AdfSessionError("Session file must be a JSON object")
        now = self._now()
        if data.get("status") == "closed":
            data["status"] = "open"
        data["updated_at"] = now
        timeline = list(data.get("timeline") or [])
        timeline.append(
            {
                "id": f"{target}-r{len(timeline)}",
                "sessionId": target,
                "label": "Session resumed",
                "at": now,
            }
        )
        data["timeline"] = timeline
        self._write(data)
        self._write_current(target)
        return data

    def close(self, session_id: str | None = None, *, note: str = "") -> dict[str, Any]:
        """Close a session and mark it inactive."""
        session = self.get(session_id)
        now = self._now()
        session["status"] = "closed"
        session["updated_at"] = now
        session["closed_at"] = now
        if note:
            notes = list(session.get("notes") or [])
            notes.append(note)
            session["notes"] = notes
        timeline = list(session.get("timeline") or [])
        timeline.append(
            {
                "id": f"{session['id']}-c{len(timeline)}",
                "sessionId": session["id"],
                "label": "Session closed",
                "at": now,
            }
        )
        session["timeline"] = timeline
        self._write(session)
        current = self._read_current()
        if current == session["id"]:
            current_path = self.sessions_dir / "CURRENT"
            if current_path.is_file():
                current_path.unlink()
        return session

    def get(self, session_id: str | None = None) -> dict[str, Any]:
        """Load a session without mutating resume state."""
        target = session_id or self._read_current()
        if not target:
            raise AdfSessionError("No session id provided and no current session")
        path = self.sessions_dir / f"{target}.json"
        if not path.is_file():
            raise AdfSessionError(f"Session not found: {target}")
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise AdfSessionError("Session file must be a JSON object")
        return data

    def current(self) -> dict[str, Any] | None:
        """Return the current session record, if any."""
        target = self._read_current()
        if not target:
            return None
        try:
            return self.get(target)
        except AdfSessionError:
            return None

    def timeline(self, session_id: str) -> list[dict[str, Any]]:
        """Return timeline events for a session."""
        session = self.get(session_id)
        events = session.get("timeline")
        if isinstance(events, list):
            return [e for e in events if isinstance(e, dict)]
        out = [
            {
                "id": f"{session_id}-t1",
                "sessionId": session_id,
                "label": "Session opened",
                "at": session.get("created_at") or session.get("started_at") or self._now(),
            }
        ]
        for i, note in enumerate(session.get("notes") or []):
            out.append(
                {
                    "id": f"{session_id}-n{i}",
                    "sessionId": session_id,
                    "label": str(note),
                    "at": session.get("updated_at") or self._now(),
                }
            )
        return out

    def _write(self, session: dict[str, Any]) -> None:
        path = self.sessions_dir / f"{session['id']}.json"
        path.write_text(json.dumps(session, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    def _write_current(self, session_id: str) -> None:
        self.sessions_dir.mkdir(parents=True, exist_ok=True)
        (self.sessions_dir / "CURRENT").write_text(session_id + "\n", encoding="utf-8")

    def _read_current(self) -> str | None:
        path = self.sessions_dir / "CURRENT"
        if not path.is_file():
            return None
        value = path.read_text(encoding="utf-8").strip()
        return value or None

    @staticmethod
    def _now() -> str:
        return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

    @staticmethod
    def to_studio_summary(session: dict[str, Any]) -> dict[str, Any]:
        """Map durable session JSON → Studio SessionSummary envelope fields."""
        status_raw = str(session.get("status") or "open")
        if status_raw == "open":
            status = "active"
        elif status_raw == "idle":
            status = "idle"
        else:
            status = "closed"
        return {
            "id": str(session.get("id") or ""),
            "title": str(session.get("title") or session.get("id") or "Session"),
            "projectId": str(session.get("project_id") or session.get("projectId") or "adf"),
            "workspaceId": str(session.get("workspace_id") or session.get("workspaceId") or "ws-live"),
            "status": status,
            "startedAt": str(session.get("started_at") or session.get("created_at") or ""),
            "updatedAt": str(session.get("updated_at") or ""),
            "live": True,
            "durable": True,
        }
