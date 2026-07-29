"""Load prompt markdown files from ``prompts/``."""

from __future__ import annotations

from pathlib import Path

from parser.markdown import read_markdown
from runtime.exceptions import AdfLoadError


class PromptLoader:
    """Load operator prompts from the locked ``prompts/`` directory."""

    def __init__(self, repo_root: Path | str) -> None:
        """Bind to repository root."""
        self.repo_root = Path(repo_root).resolve()
        self.prompts_dir = self.repo_root / "prompts"

    def load(self, name: str) -> str:
        """Load a prompt markdown file by stem or filename.

        Args:
            name: Prompt name such as ``build`` or ``build.md``.

        Returns:
            File contents.

        Raises:
            AdfLoadError: If the prompt file is missing.
        """
        filename = name if name.endswith(".md") else f"{name}.md"
        path = self.prompts_dir / filename
        if not path.is_file():
            raise AdfLoadError(f"Prompt not found: {path}")
        return read_markdown(path)

    def list(self) -> list[str]:
        """List available prompt stems."""
        if not self.prompts_dir.is_dir():
            return []
        return sorted(p.stem for p in self.prompts_dir.glob("*.md"))
