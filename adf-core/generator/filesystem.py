"""Filesystem helpers for generators."""

from __future__ import annotations

from pathlib import Path

from runtime.exceptions import AdfError


class AdfGeneratorError(AdfError):
    """Generator failures."""


class FileSystem:
    """Safe filesystem operations with overwrite protection."""

    def __init__(self, *, dry_run: bool = False) -> None:
        """Create a filesystem helper."""
        self.dry_run = dry_run
        self.created_dirs: list[Path] = []
        self.skipped: list[str] = []

    def ensure_dir(self, path: Path | str) -> Path:
        """Create a directory if missing."""
        target = Path(path)
        if self.dry_run:
            self.created_dirs.append(target)
            return target
        target.mkdir(parents=True, exist_ok=True)
        self.created_dirs.append(target)
        return target

    def exists(self, path: Path | str) -> bool:
        """Return whether path exists on disk."""
        return Path(path).exists()

    def is_empty_dir(self, path: Path | str) -> bool:
        """Return True if path does not exist or is an empty directory."""
        target = Path(path)
        if not target.exists():
            return True
        if not target.is_dir():
            return False
        return not any(target.iterdir())

    def guard_destination(self, path: Path | str, *, overwrite: bool) -> None:
        """Raise if destination is unsafe to write."""
        target = Path(path)
        if overwrite:
            return
        if target.exists() and not self.is_empty_dir(target):
            raise AdfGeneratorError(
                f"Destination is not empty (use overwrite=True): {target}"
            )
