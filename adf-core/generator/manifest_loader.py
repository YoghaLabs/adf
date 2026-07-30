"""Load generation-facing views of template manifests."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from templates.engine import TemplateManager
from templates.manifest import TemplateManifest, parse_manifest
from templates.template_loader import LoadedTemplate
from templates.variables import AdfTemplateError


class ManifestLoader:
    """Load template manifests for the generator pipeline."""

    def __init__(self, templates: TemplateManager) -> None:
        """Create a loader bound to a TemplateManager."""
        self.templates = templates

    def load_named(self, name: str) -> LoadedTemplate:
        """Load a template by registry/search name."""
        return self.templates.load_by_name(name)

    def load_path(self, path: Path | str) -> LoadedTemplate:
        """Load a template package from disk."""
        return self.templates.load(path)

    def load_manifest_file(self, path: Path | str) -> TemplateManifest:
        """Parse a standalone ``template.yaml`` file."""
        return parse_manifest(path)

    def summarize(self, name: str) -> dict[str, Any]:
        """Return a generation-oriented manifest summary."""
        loaded = self.load_named(name)
        data = loaded.manifest.to_dict()
        data["root"] = str(loaded.root)
        data["files_root"] = str(loaded.files_root)
        data["parent"] = loaded.parent.name if loaded.parent else None
        return data
