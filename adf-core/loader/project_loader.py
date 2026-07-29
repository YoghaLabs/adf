"""Load project identity and markdown SSOT files."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from parser.markdown import read_markdown
from runtime.exceptions import AdfLoadError


class ProjectLoader:
    """Discover the ADF root and load project markdown artifacts."""

    def __init__(self, repo_root: Path | str) -> None:
        """Bind to an explicit repository root."""
        self.repo_root = Path(repo_root).resolve()

    @classmethod
    def find_root(cls, start: Path | str | None = None) -> ProjectLoader:
        """Walk parents until ``.adf`` + ``VERSION`` are found.

        Raises:
            AdfLoadError: If no ADF root is discovered.
        """
        current = Path(start or Path.cwd()).resolve()
        for candidate in [current, *current.parents]:
            if (candidate / ".adf").is_dir() and (candidate / "VERSION").is_file():
                return cls(candidate)
        raise AdfLoadError(f"ADF repository root not found from {current}")

    def load_markdown(self, relative_path: str) -> str:
        """Load a markdown file relative to the repo root."""
        path = self.repo_root / relative_path
        if not path.is_file():
            raise AdfLoadError(f"Markdown not found: {path}")
        return read_markdown(path)

    def load_version(self) -> dict[str, str]:
        """Parse root ``VERSION`` into a dictionary."""
        version_path = self.repo_root / "VERSION"
        if not version_path.is_file():
            raise AdfLoadError(f"VERSION not found: {version_path}")
        text = version_path.read_text(encoding="utf-8")
        result: dict[str, str] = {"product": "ADF"}
        lines = [line.strip() for line in text.splitlines()]
        i = 0
        while i < len(lines):
            line = lines[i]
            if i == 0 and line and not line.endswith(":"):
                result["product"] = line
            if line.endswith(":") and i + 1 < len(lines):
                key = line[:-1].strip().lower().replace(" ", "_")
                result[key] = lines[i + 1].strip()
                i += 2
                continue
            i += 1
        return result

    def identity(self) -> dict[str, Any]:
        """Return product identity from ``VERSION``."""
        version = self.load_version()
        return {
            "repo_root": str(self.repo_root),
            "product": version.get("product", "ADF"),
            "version": version.get("version", ""),
            "build": version.get("current_build", ""),
            "branch": version.get("branch", ""),
        }
