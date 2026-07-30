"""Load template packages from disk."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from templates.manifest import MANIFEST_FILENAME, TemplateManifest, parse_manifest
from templates.variables import AdfTemplateError


@dataclass
class LoadedTemplate:
    """In-memory representation of a template package."""

    root: Path
    manifest: TemplateManifest
    files_root: Path
    parent: LoadedTemplate | None = None
    extras: dict[str, Any] = field(default_factory=dict)

    @property
    def name(self) -> str:
        return self.manifest.name

    @property
    def version(self) -> str:
        return self.manifest.version


class TemplateLoader:
    """Load templates from directories containing ``template.yaml``."""

    def __init__(self, *, search_paths: list[Path] | None = None) -> None:
        """Create a loader.

        Args:
            search_paths: Optional roots used when resolving inheritance by name.
        """
        self.search_paths = list(search_paths or [])

    def load(self, path: Path | str, *, resolve_inherits: bool = True) -> LoadedTemplate:
        """Load a template package from ``path``.

        Inheritance foundation: when ``inherits`` is set, load the parent from
        search paths and attach it (child wins on variable merge later).
        """
        root = Path(path).resolve()
        if not root.is_dir():
            raise AdfTemplateError(f"Template path is not a directory: {root}")
        manifest_path = root / MANIFEST_FILENAME
        if not manifest_path.is_file():
            raise AdfTemplateError(f"Missing {MANIFEST_FILENAME} in {root}")
        manifest = parse_manifest(manifest_path)
        files_root = root / "files"
        if not files_root.is_dir():
            files_root = root
        parent: LoadedTemplate | None = None
        if resolve_inherits and manifest.inherits:
            parent = self.load_by_name(manifest.inherits, resolve_inherits=True)
        return LoadedTemplate(
            root=root,
            manifest=manifest,
            files_root=files_root,
            parent=parent,
        )

    def load_by_name(self, name: str, *, resolve_inherits: bool = True) -> LoadedTemplate:
        """Locate and load a template by manifest name across search paths."""
        for base in self.search_paths:
            candidate = self._find_named(base, name)
            if candidate is not None:
                return self.load(candidate, resolve_inherits=resolve_inherits)
        raise AdfTemplateError(f"Template not found: {name}")

    def _find_named(self, base: Path, name: str) -> Path | None:
        if not base.is_dir():
            return None
        direct = base / name
        if (direct / MANIFEST_FILENAME).is_file():
            return direct
        for child in base.iterdir():
            if not child.is_dir():
                continue
            manifest_file = child / MANIFEST_FILENAME
            if not manifest_file.is_file():
                continue
            try:
                manifest = parse_manifest(manifest_file)
            except Exception:  # noqa: BLE001
                continue
            if manifest.name == name:
                return child
        return None
