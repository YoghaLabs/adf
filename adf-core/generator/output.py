"""Generation progress and result reporting."""

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
class GenerationOutput:
    """Accumulates generator progress for CLI/tests."""

    writes: list[WrittenFile] = field(default_factory=list)
    folders: list[Path] = field(default_factory=list)
    messages: list[str] = field(default_factory=list)
    dry_run: bool = False

    def record_write(self, path: Path, *, dry_run: bool, bytes_len: int) -> None:
        """Record a file write."""
        self.writes.append(WrittenFile(path=path, dry_run=dry_run, bytes_len=bytes_len))

    def record_folder(self, path: Path) -> None:
        """Record a folder creation."""
        self.folders.append(path)

    def progress(self, message: str) -> None:
        """Append a human-readable progress line."""
        self.messages.append(message)

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
