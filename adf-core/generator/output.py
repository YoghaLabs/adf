"""Generation progress and result reporting + rollback journal."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


@dataclass
class WrittenFile:
    """Record of a planned or written file."""

    path: Path
    dry_run: bool
    bytes_len: int


@dataclass
class RollbackJournal:
    """Track created paths so generation can be rolled back."""

    files: list[Path] = field(default_factory=list)
    directories: list[Path] = field(default_factory=list)

    def record_file(self, path: Path) -> None:
        """Record a created/overwritten file."""
        self.files.append(path)

    def record_dir(self, path: Path) -> None:
        """Record a created directory."""
        self.directories.append(path)

    def rollback(self) -> dict[str, Any]:
        """Delete recorded files then empty directories (best-effort)."""
        removed_files: list[str] = []
        removed_dirs: list[str] = []
        for path in reversed(self.files):
            try:
                if path.is_file():
                    path.unlink()
                    removed_files.append(str(path))
            except OSError:
                continue
        for path in sorted(self.directories, key=lambda p: len(p.parts), reverse=True):
            try:
                if path.is_dir() and not any(path.iterdir()):
                    path.rmdir()
                    removed_dirs.append(str(path))
                elif path.is_dir():
                    # Only remove dirs we created that are now empty after file rollback.
                    continue
            except OSError:
                continue
        return {
            "ok": True,
            "removed_files": removed_files,
            "removed_dirs": removed_dirs,
        }


@dataclass
class GenerationOutput:
    """Accumulates generator progress for CLI/tests."""

    writes: list[WrittenFile] = field(default_factory=list)
    folders: list[Path] = field(default_factory=list)
    messages: list[str] = field(default_factory=list)
    dry_run: bool = False
    journal: RollbackJournal = field(default_factory=RollbackJournal)

    def record_write(self, path: Path, *, dry_run: bool, bytes_len: int) -> None:
        """Record a file write."""
        self.writes.append(WrittenFile(path=path, dry_run=dry_run, bytes_len=bytes_len))
        if not dry_run:
            self.journal.record_file(path)

    def record_folder(self, path: Path) -> None:
        """Record a folder creation."""
        self.folders.append(path)
        if not self.dry_run:
            self.journal.record_dir(path)

    def progress(self, message: str) -> None:
        """Append a human-readable progress line."""
        self.messages.append(message)

    def rollback(self) -> dict[str, Any]:
        """Roll back writes recorded in the journal."""
        result = self.journal.rollback()
        self.progress("Rollback completed")
        return result

    def to_dict(self) -> dict[str, Any]:
        """Serialize for JSON CLI output."""
        return {
            "dry_run": self.dry_run,
            "files_written": [str(item.path) for item in self.writes],
            "folders": [str(item) for item in self.folders],
            "file_count": len(self.writes),
            "folder_count": len(self.folders),
            "messages": list(self.messages),
        }
