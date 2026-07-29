"""File writer with dry-run and overwrite protection."""

from __future__ import annotations

from pathlib import Path

from generator.filesystem import AdfGeneratorError, FileSystem
from generator.output import GenerationOutput


class Writer:
    """Write text/binary files for project generation."""

    def __init__(
        self,
        fs: FileSystem | None = None,
        *,
        dry_run: bool = False,
        overwrite: bool = False,
    ) -> None:
        """Create a writer."""
        self.fs = fs or FileSystem(dry_run=dry_run)
        self.dry_run = dry_run
        self.overwrite = overwrite
        self.output = GenerationOutput(dry_run=dry_run)

    def write_text(self, path: Path | str, content: str) -> Path:
        """Write UTF-8 text to ``path``."""
        target = Path(path)
        if target.exists() and not self.overwrite and not self.dry_run:
            raise AdfGeneratorError(f"Refusing to overwrite: {target}")
        if target.exists() and not self.overwrite and self.dry_run:
            # Dry-run still reports intent without writing.
            self.output.record_write(
                target, dry_run=True, bytes_len=len(content.encode("utf-8"))
            )
            return target
        self.fs.ensure_dir(target.parent)
        if self.dry_run:
            self.output.record_write(
                target, dry_run=True, bytes_len=len(content.encode("utf-8"))
            )
            return target
        target.write_text(content, encoding="utf-8", newline="\n")
        self.output.record_write(
            target, dry_run=False, bytes_len=len(content.encode("utf-8"))
        )
        return target

    def write_bytes(self, path: Path | str, content: bytes) -> Path:
        """Write binary content to ``path``."""
        target = Path(path)
        if target.exists() and not self.overwrite:
            raise AdfGeneratorError(f"Refusing to overwrite: {target}")
        self.fs.ensure_dir(target.parent)
        if self.dry_run:
            self.output.record_write(target, dry_run=True, bytes_len=len(content))
            return target
        target.write_bytes(content)
        self.output.record_write(target, dry_run=False, bytes_len=len(content))
        return target
