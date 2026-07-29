"""Markdown reading utilities."""

from __future__ import annotations

from pathlib import Path

from runtime.exceptions import AdfLoadError


def read_markdown(path: Path | str) -> str:
    """Read a UTF-8 markdown file.

    Args:
        path: Filesystem path to a ``.md`` (or text) file.

    Returns:
        File contents.

    Raises:
        AdfLoadError: If the file cannot be read.
    """
    file_path = Path(path)
    if not file_path.is_file():
        raise AdfLoadError(f"Cannot read markdown: {file_path}")
    try:
        return file_path.read_text(encoding="utf-8")
    except OSError as exc:
        raise AdfLoadError(str(exc)) from exc
