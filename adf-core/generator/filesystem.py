"""Filesystem abstraction for safe project generation."""

from __future__ import annotations

import os
import tempfile
from pathlib import Path

from runtime.exceptions import AdfError


class AdfGeneratorError(AdfError):
    """Generator failures."""


class SafeOverwrite:
    """Policy for overwrite decisions."""

    def __init__(self, *, overwrite: bool = False) -> None:
        """Create an overwrite policy."""
        self.overwrite = overwrite

    def allow(self, path: Path) -> bool:
        """Return True when writing to ``path`` is allowed."""
        if self.overwrite:
            return True
        return not path.exists()

    def require(self, path: Path) -> None:
        """Raise when overwrite is forbidden for an existing path."""
        if path.exists() and not self.overwrite:
            raise AdfGeneratorError(f"Refusing to overwrite: {path}")


class AtomicWrite:
    """Write files atomically via temporary siblings then replace."""

    @staticmethod
    def write_text(path: Path, content: str, *, encoding: str = "utf-8") -> Path:
        """Atomically write UTF-8 text."""
        path.parent.mkdir(parents=True, exist_ok=True)
        fd, tmp_name = tempfile.mkstemp(prefix=f".{path.name}.", dir=str(path.parent))
        tmp_path = Path(tmp_name)
        try:
            with os.fdopen(fd, "w", encoding=encoding, newline="\n") as handle:
                handle.write(content)
            os.replace(tmp_path, path)
        except Exception:
            if tmp_path.exists():
                tmp_path.unlink(missing_ok=True)
            raise
        return path

    @staticmethod
    def write_bytes(path: Path, content: bytes) -> Path:
        """Atomically write bytes."""
        path.parent.mkdir(parents=True, exist_ok=True)
        fd, tmp_name = tempfile.mkstemp(prefix=f".{path.name}.", dir=str(path.parent))
        tmp_path = Path(tmp_name)
        try:
            with os.fdopen(fd, "wb") as handle:
                handle.write(content)
            os.replace(tmp_path, path)
        except Exception:
            if tmp_path.exists():
                tmp_path.unlink(missing_ok=True)
            raise
        return path


class DirectoryWriter:
    """Create directories with optional dry-run."""

    def __init__(self, *, dry_run: bool = False) -> None:
        """Create a directory writer."""
        self.dry_run = dry_run
        self.created: list[Path] = []

    def ensure(self, path: Path | str) -> Path:
        """Ensure a directory exists (or record intent in dry-run)."""
        target = Path(path)
        if not self.dry_run:
            target.mkdir(parents=True, exist_ok=True)
        self.created.append(target)
        return target


class FileWriter:
    """Write files using SafeOverwrite + AtomicWrite."""

    def __init__(
        self,
        *,
        dry_run: bool = False,
        overwrite: bool = False,
        atomic: AtomicWrite | None = None,
        policy: SafeOverwrite | None = None,
    ) -> None:
        """Create a file writer."""
        self.dry_run = dry_run
        self.policy = policy or SafeOverwrite(overwrite=overwrite)
        self.atomic = atomic or AtomicWrite()
        self.written: list[Path] = []

    def write_text(self, path: Path | str, content: str) -> Path:
        """Write text content to ``path``."""
        target = Path(path)
        self.policy.require(target)
        if self.dry_run:
            self.written.append(target)
            return target
        self.atomic.write_text(target, content)
        self.written.append(target)
        return target

    def write_bytes(self, path: Path | str, content: bytes) -> Path:
        """Write binary content to ``path``."""
        target = Path(path)
        self.policy.require(target)
        if self.dry_run:
            self.written.append(target)
            return target
        self.atomic.write_bytes(target, content)
        self.written.append(target)
        return target


class FileSystem:
    """High-level filesystem facade composing directory/file writers."""

    def __init__(self, *, dry_run: bool = False, overwrite: bool = False) -> None:
        """Create a filesystem abstraction."""
        self.dry_run = dry_run
        self.overwrite = overwrite
        self.dirs = DirectoryWriter(dry_run=dry_run)
        self.files = FileWriter(dry_run=dry_run, overwrite=overwrite)
        self.created_dirs: list[Path] = self.dirs.created
        self.skipped: list[str] = []

    def ensure_dir(self, path: Path | str) -> Path:
        """Create a directory if missing."""
        return self.dirs.ensure(path)

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

    def guard_destination(self, path: Path | str, *, overwrite: bool | None = None) -> None:
        """Raise if destination is unsafe to write."""
        target = Path(path)
        allow = self.overwrite if overwrite is None else overwrite
        if allow:
            return
        if target.exists() and not self.is_empty_dir(target):
            raise AdfGeneratorError(
                f"Destination is not empty (use overwrite=True): {target}"
            )
