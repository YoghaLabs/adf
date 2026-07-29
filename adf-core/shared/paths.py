"""Path helpers."""

from __future__ import annotations

from pathlib import Path


def ensure_dir(path: Path | str) -> Path:
    """Create a directory (and parents) if missing; return resolved path."""
    directory = Path(path)
    directory.mkdir(parents=True, exist_ok=True)
    return directory.resolve()
