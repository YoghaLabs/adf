"""Thin Knowledge Engine — reads `.adf` knowledge SSOT without duplicating docs."""

from __future__ import annotations

from pathlib import Path
from typing import Any


class KnowledgeEngine:
    """Provide knowledge-layer snapshots from repository SSOT files."""

    DEFAULT_FILES = (
        "ADR_INDEX.md",
        "KNOWLEDGE_INDEX.md",
        "GLOSSARY.md",
        "DEPENDENCY_GRAPH.md",
        "TECH_STACK.md",
    )

    def __init__(self, repo_root: Path | str) -> None:
        """Create a knowledge engine bound to ``repo_root``."""
        self.repo_root = Path(repo_root)
        self.adf_root = self.repo_root / ".adf"

    def snapshot(self) -> dict[str, Any]:
        """Return available knowledge documents and missing paths."""
        files: dict[str, str] = {}
        missing: list[str] = []
        for name in self.DEFAULT_FILES:
            path = self.adf_root / name
            if path.is_file():
                files[name] = path.read_text(encoding="utf-8")
            else:
                missing.append(name)
        adr_dir = self.adf_root / "adr"
        adrs = sorted(p.name for p in adr_dir.glob("ADR-*.md")) if adr_dir.is_dir() else []
        return {
            "ok": True,
            "files": {key: value[:2000] for key, value in files.items()},
            "file_names": list(files.keys()),
            "missing": missing,
            "adrs": adrs,
            "adr_count": len(adrs),
        }

    def list_adrs(self) -> list[str]:
        """List ADR filenames."""
        adr_dir = self.adf_root / "adr"
        if not adr_dir.is_dir():
            return []
        return sorted(p.name for p in adr_dir.glob("ADR-*.md"))
