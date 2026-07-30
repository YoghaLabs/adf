"""Dry-run preview planning (nothing written to disk)."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Mapping

from generator.project_manifest import ProjectManifest
from templates.template_loader import LoadedTemplate
from templates.variables import VariableResolver


@dataclass
class DryRunPlan:
    """Preview of a generation without side effects."""

    folders: list[str] = field(default_factory=list)
    files: list[str] = field(default_factory=list)
    overwrites: list[str] = field(default_factory=list)
    variables: dict[str, Any] = field(default_factory=dict)
    template_chain: list[str] = field(default_factory=list)
    destination: str = ""

    def to_dict(self) -> dict[str, Any]:
        """Serialize for CLI/tests."""
        return {
            "dry_run": True,
            "destination": self.destination,
            "folders": list(self.folders),
            "files": list(self.files),
            "overwrites": list(self.overwrites),
            "variables": dict(self.variables),
            "template_chain": list(self.template_chain),
            "folder_count": len(self.folders),
            "file_count": len(self.files),
        }


class DryRunPlanner:
    """Build a dry-run plan from resolved templates and variables."""

    def __init__(self, resolver: VariableResolver | None = None) -> None:
        """Create a planner."""
        self.resolver = resolver or VariableResolver(strict=True)

    def plan(
        self,
        template: LoadedTemplate,
        manifest: ProjectManifest,
        variables: Mapping[str, Any],
        *,
        chain: list[LoadedTemplate] | None = None,
    ) -> DryRunPlan:
        """Preview folders/files/overwrites/variables for a generation."""
        root = manifest.project_root
        folders: set[str] = {str(root)}
        files: list[str] = []
        overwrites: list[str] = []
        items = chain or [template]
        for item in items:
            source = item.files_root
            if not source.is_dir():
                continue
            for path in sorted(source.rglob("*")):
                if path.name == "template.yaml":
                    continue
                rel = path.relative_to(source)
                rel_text = self.resolver.resolve(str(rel).replace("\\", "/"), variables)
                dest = root / rel_text
                if path.is_dir():
                    folders.add(str(dest))
                elif path.is_file():
                    folders.add(str(dest.parent))
                    files.append(str(dest))
                    if dest.exists():
                        overwrites.append(str(dest))
        return DryRunPlan(
            folders=sorted(folders),
            files=files,
            overwrites=overwrites,
            variables=dict(variables),
            template_chain=[item.name for item in items],
            destination=str(root),
        )
