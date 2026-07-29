"""Session lifecycle manager."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4

from runtime.exceptions import AdfSessionError


class SessionManager:
    """Create, restore, and close ADF operator sessions.

    Sessions are stored as JSON under ``.adf/local/sessions/``.
    """

    def __init__(self, repo_root: Path | str) -> None:
        """Initialize session storage under the repository root."""
        self.repo_root = Path(repo_root).resolve()
        self.sessions_dir = self.repo_root / ".adf" / "local" / "sessions"

    def create(self, *, build: str, operator_state: str = "BOOT") -> dict[str, Any]:
        """Create a new session record.

        Args:
            build: Active BUILD id (for example ``BUILD-005``).
            operator_state: Initial state-machine position.

        Returns:
            Created session dictionary.
        """
        self.sessions_dir.mkdir(parents=True, exist_ok=True)
        session_id = f"sess-{uuid4().hex[:12]}"
        session = {
            "id": session_id,
            "build": build,
            "operator_state": operator_state,
            "created_at": self._now(),
            "updated_at": self._now(),
            "status": "open",
            "notes": [],
        }
        self._write(session)
        self._write_current(session_id)
        return session

    def restore(self, session_id: str | None = None) -> dict[str, Any]:
        """Restore a session by id or the current session pointer.

        Args:
            session_id: Explicit session id; defaults to current session.

        Returns:
            Session dictionary.

        Raises:
            AdfSessionError: If the session cannot be found.
        """
        target = session_id or self._read_current()
        if not target:
            raise AdfSessionError("No session id provided and no current session")
        path = self.sessions_dir / f"{target}.json"
        if not path.is_file():
            raise AdfSessionError(f"Session not found: {target}")
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, dict):
            raise AdfSessionError("Session file must be a JSON object")
        self._write_current(target)
        return data

    def close(self, session_id: str | None = None, *, note: str = "") -> dict[str, Any]:
        """Close a session and mark it inactive.

        Args:
            session_id: Session to close; defaults to current.
            note: Optional handoff note.

        Returns:
            Updated session dictionary.
        """
        session = self.restore(session_id)
        session["status"] = "closed"
        session["updated_at"] = self._now()
        session["closed_at"] = self._now()
        if note:
            notes = list(session.get("notes") or [])
            notes.append(note)
            session["notes"] = notes
        self._write(session)
        return session

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
        return datetime.now(timezone.utc).isoformat()
