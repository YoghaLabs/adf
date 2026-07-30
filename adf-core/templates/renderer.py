"""Template file rendering."""

from __future__ import annotations

from pathlib import Path
from typing import Any, Mapping

from templates.variables import AdfTemplateError, VariableResolver


class TemplateRenderer:
    """Render template file contents and directory trees.

    Uses ``VariableResolver`` for ``{{placeholder}}`` substitution. Binary
    files (non-UTF-8) are copied without substitution.
    """

    def __init__(self, resolver: VariableResolver | None = None) -> None:
        """Create a renderer."""
        self.resolver = resolver or VariableResolver(strict=True)

    def render_text(self, content: str, variables: Mapping[str, Any]) -> str:
        """Render a single text blob."""
        return self.resolver.resolve(content, variables)

    def render_file(
        self,
        source: Path | str,
        destination: Path | str,
        variables: Mapping[str, Any],
        *,
        overwrite: bool = False,
    ) -> Path:
        """Render one file from source to destination."""
        src = Path(source)
        dest = Path(destination)
        if dest.exists() and not overwrite:
            raise AdfTemplateError(f"Refusing to overwrite existing file: {dest}")
        dest.parent.mkdir(parents=True, exist_ok=True)
        try:
            text = src.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            dest.write_bytes(src.read_bytes())
            return dest
        rendered = self.render_text(text, variables)
        dest.write_text(rendered, encoding="utf-8", newline="\n")
        return dest

    def render_tree(
        self,
        source_root: Path | str,
        destination_root: Path | str,
        variables: Mapping[str, Any],
        *,
        overwrite: bool = False,
    ) -> list[Path]:
        """Render all files under ``source_root`` into ``destination_root``.

        Returns:
            List of written destination paths.
        """
        src_root = Path(source_root)
        dest_root = Path(destination_root)
        if not src_root.is_dir():
            raise AdfTemplateError(f"Source tree is not a directory: {src_root}")
        written: list[Path] = []
        for path in sorted(src_root.rglob("*")):
            if not path.is_file():
                continue
            rel = path.relative_to(src_root)
            # Allow variable expansion in relative path segments.
            rel_rendered = Path(self.resolver.resolve(str(rel).replace("\\", "/"), variables))
            dest = dest_root / rel_rendered
            written.append(
                self.render_file(path, dest, variables, overwrite=overwrite)
            )
        return written
