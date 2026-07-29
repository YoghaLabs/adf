"""ContextEngine assembles restore packs from SSOT markdown."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from loader.project_loader import ProjectLoader
from runtime.constants import CONTEXT_PACKS
from runtime.exceptions import AdfLoadError


class ContextEngine:
    """Assemble Quick/Standard/Deep context packs per BUILD-004 contracts."""

    def __init__(self, repo_root: Path | str) -> None:
        """Initialize with project loader bound to ``repo_root``."""
        self.repo_root = Path(repo_root).resolve()
        self.loader = ProjectLoader(self.repo_root)

    def assemble(self, pack: str = "standard") -> dict[str, Any]:
        """Assemble a context pack.

        Args:
            pack: One of ``quick``, ``standard``, ``deep``.

        Returns:
            Dict with pack name and file contents.

        Raises:
            AdfLoadError: If pack name is invalid.
        """
        normalized = pack.lower().strip()
        if normalized not in CONTEXT_PACKS:
            raise AdfLoadError(f"Unknown context pack: {pack}")

        files = self._files_for_pack(normalized)
        contents: dict[str, str] = {}
        missing: list[str] = []
        for relative in files:
            path = self.repo_root / relative
            if path.is_file():
                contents[relative] = path.read_text(encoding="utf-8")
            else:
                missing.append(relative)

        return {
            "pack": normalized,
            "files": contents,
            "missing": missing,
            "summary": self._summary(contents),
        }

    def _files_for_pack(self, pack: str) -> list[str]:
        quick = ["VERSION", ".adf/QUICK_CONTEXT.md", ".adf/CURRENT_TASK.md"]
        standard = quick + [
            ".adf/PROJECT_STATE.md",
            ".adf/BUILD_STATUS.md",
            ".adf/TODOS.md",
            ".adf/AI_CONTRACT.md",
            ".adf/CONTEXT_ENGINE.md",
        ]
        deep = standard + [
            ".adf/FULL_CONTEXT.md",
            ".adf/RESUME_PROTOCOL.md",
            ".adf/STATE_MACHINE.md",
            ".adf/MEMORY.md",
            ".adf/SESSION.md",
        ]
        mapping = {"quick": quick, "standard": standard, "deep": deep}
        return mapping[pack]

    @staticmethod
    def _summary(contents: dict[str, str]) -> str:
        version = contents.get("VERSION", "").strip().splitlines()
        head = version[0] if version else "ADF"
        return f"Context assembled for {head} ({len(contents)} files)"
