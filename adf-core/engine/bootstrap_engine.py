"""BootstrapEngine verifies locked repository layout."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from runtime.constants import LOCKED_TOP_LEVEL, REQUIRED_ROOT_FILES


class BootstrapEngine:
    """Verify that an ADF repository matches the locked architecture."""

    def __init__(self, repo_root: Path | str) -> None:
        """Bind to repository root."""
        self.repo_root = Path(repo_root).resolve()

    def verify_layout(self) -> dict[str, Any]:
        """Check locked folders and required root files.

        Returns:
            Report with ``ok``, missing folders, and missing files.
        """
        missing_dirs = [
            name for name in LOCKED_TOP_LEVEL if not (self.repo_root / name).exists()
        ]
        missing_files = [
            name for name in REQUIRED_ROOT_FILES if not (self.repo_root / name).is_file()
        ]
        return {
            "ok": not missing_dirs and not missing_files,
            "repo_root": str(self.repo_root),
            "missing_dirs": missing_dirs,
            "missing_files": missing_files,
        }
