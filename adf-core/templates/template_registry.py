"""In-memory registry of available templates."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from templates.manifest import MANIFEST_FILENAME, parse_manifest
from templates.template_loader import LoadedTemplate, TemplateLoader
from templates.variables import AdfTemplateError


class TemplateRegistry:
    """Register and look up loaded templates by name."""

    def __init__(self) -> None:
        """Create an empty registry."""
        self._items: dict[str, LoadedTemplate] = {}

    def register(self, template: LoadedTemplate) -> None:
        """Register a loaded template.

        Raises:
            AdfTemplateError: If the name is already registered.
        """
        name = template.name
        if name in self._items:
            raise AdfTemplateError(f"Template already registered: {name}")
        self._items[name] = template

    def unregister(self, name: str) -> None:
        """Remove a template by name."""
        if name not in self._items:
            raise AdfTemplateError(f"Template not registered: {name}")
        del self._items[name]

    def get(self, name: str) -> LoadedTemplate:
        """Return a registered template."""
        if name not in self._items:
            raise AdfTemplateError(f"Template not registered: {name}")
        return self._items[name]

    def list(self) -> list[dict[str, Any]]:
        """List registered templates as dict rows."""
        rows: list[dict[str, Any]] = []
        for name, item in sorted(self._items.items()):
            rows.append(
                {
                    "name": name,
                    "version": item.version,
                    "root": str(item.root),
                    "inherits": item.manifest.inherits,
                    "capabilities": list(item.manifest.capabilities),
                }
            )
        return rows

    def discover(self, root: Path | str, *, loader: TemplateLoader | None = None) -> list[str]:
        """Discover template packages under ``root`` and register them.

        A package is any child directory containing ``template.yaml``.
        """
        base = Path(root)
        if not base.is_dir():
            raise AdfTemplateError(f"Discover root is not a directory: {base}")
        active_loader = loader or TemplateLoader(search_paths=[base])
        names: list[str] = []
        for child in sorted(base.iterdir()):
            if not child.is_dir():
                continue
            if not (child / MANIFEST_FILENAME).is_file():
                continue
            loaded = active_loader.load(child, resolve_inherits=False)
            if loaded.name in self._items:
                continue
            self.register(loaded)
            names.append(loaded.name)
        # Second pass: resolve inheritance now that peers are registered.
        for name in list(names):
            current = self._items[name]
            inherits = current.manifest.inherits
            if not inherits:
                continue
            parent = self._items.get(inherits)
            if parent is None:
                try:
                    parent = active_loader.load_by_name(inherits)
                    if parent.name not in self._items:
                        self.register(parent)
                except AdfTemplateError:
                    continue
            self._items[name] = LoadedTemplate(
                root=current.root,
                manifest=current.manifest,
                files_root=current.files_root,
                parent=parent,
                extras=dict(current.extras),
            )
        return names

    def __contains__(self, name: str) -> bool:
        return name in self._items
