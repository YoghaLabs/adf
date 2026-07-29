"""MemoryEngine reads durable MEMORY/SESSION markdown."""

from __future__ import annotations

from pathlib import Path
from typing import Any


class MemoryEngine:
    """Access durable memory and session markdown SSOT files."""

    def __init__(self, repo_root: Path | str) -> None:
        """Bind to repository root."""
        self.repo_root = Path(repo_root).resolve()
        self.adf_dir = self.repo_root / ".adf"

    def read_memory(self) -> str:
        """Return ``MEMORY.md`` contents or empty string if missing."""
        path = self.adf_dir / "MEMORY.md"
        if not path.is_file():
            return ""
        return path.read_text(encoding="utf-8")

    def read_session_notes(self) -> str:
        """Return ``SESSION.md`` contents or empty string if missing."""
        path = self.adf_dir / "SESSION.md"
        if not path.is_file():
            return ""
        return path.read_text(encoding="utf-8")

    def snapshot(self) -> dict[str, Any]:
        """Return lengths and presence flags for memory artifacts."""
        memory = self.read_memory()
        session = self.read_session_notes()
        return {
            "memory_present": bool(memory.strip()),
            "session_present": bool(session.strip()),
            "memory_chars": len(memory),
            "session_chars": len(session),
        }
