"""GeneratorManager — public facade for bootstrap/project generation."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from generator.filesystem import AdfGeneratorError
from generator.output import GenerationOutput
from generator.project_builder import ProjectBuilder
from generator.project_generator import ProjectGenerator
from generator.project_manifest import ProjectManifest
from generator.validator import GenerationValidator
from templates.engine import TemplateManager

# Default built-in project type templates (manifest packages under adf-templates/).
BUILTIN_PROJECT_TYPES = (
    "generic",
    "python",
    "fastapi",
    "laravel",
    "nextjs",
)


class GeneratorManager:
    """Coordinate generate / validate / dry_run / build / write / rollback.

    Generation is entirely template-manifest-driven. The manager never hardcodes
    project trees — structures come from ``adf-templates`` metadata and files.
    """

    def __init__(
        self,
        repo_root: Path | str | None = None,
        templates: TemplateManager | None = None,
    ) -> None:
        """Create a generator manager."""
        if templates is not None:
            self.templates = templates
        else:
            root = Path(repo_root).resolve() if repo_root else Path.cwd()
            search = root / "adf-templates"
            self.templates = TemplateManager(
                search_paths=[search] if search.is_dir() else []
            )
            if search.is_dir():
                self.templates.discover(search)
        self.repo_root = Path(repo_root).resolve() if repo_root else None
        self._last_output: GenerationOutput | None = None
        self.validator = GenerationValidator(self.templates)

    def create(
        self,
        *,
        dry_run: bool = False,
        overwrite: bool = False,
    ) -> ProjectGenerator:
        """Create a ProjectGenerator with the given flags."""
        return ProjectGenerator(
            self.templates, dry_run=dry_run, overwrite=overwrite
        )

    def validate(self, manifest: ProjectManifest | dict[str, Any]) -> dict[str, Any]:
        """Validate template/manifest/variables/dependencies/output readiness."""
        if isinstance(manifest, dict):
            manifest = ProjectManifest.from_mapping(manifest)
        errors = self.validator.validate(manifest, overwrite=True)
        return {
            "ok": not errors,
            "errors": errors,
            "manifest": manifest.to_dict(),
        }

    def dry_run(self, manifest: ProjectManifest | dict[str, Any]) -> dict[str, Any]:
        """Preview generation without writing anything."""
        return self.generate(manifest, dry_run=True, overwrite=True)

    def build(self, manifest: ProjectManifest | dict[str, Any]) -> ProjectBuilder:
        """Create a configured builder for the manifest (no write yet)."""
        if isinstance(manifest, dict):
            manifest = ProjectManifest.from_mapping(manifest)
        builder = ProjectBuilder(self.templates, dry_run=False, overwrite=False)
        errors = builder.validate(manifest)
        if errors:
            raise AdfGeneratorError("; ".join(errors))
        return builder

    def write(
        self,
        manifest: ProjectManifest | dict[str, Any],
        *,
        overwrite: bool = False,
    ) -> dict[str, Any]:
        """Build and write a project to disk."""
        return self.generate(manifest, dry_run=False, overwrite=overwrite)

    def generate(
        self,
        manifest: ProjectManifest | dict[str, Any],
        *,
        dry_run: bool = False,
        overwrite: bool = False,
    ) -> dict[str, Any]:
        """Generate from an explicit project manifest."""
        generator = self.create(dry_run=dry_run, overwrite=overwrite)
        result = generator.generate(manifest)
        self._last_output = generator.builder.output
        return result

    def rollback(self) -> dict[str, Any]:
        """Roll back the last generation write journal (if any)."""
        if self._last_output is None:
            return {"ok": False, "error": "no generation journal to roll back"}
        return self._last_output.rollback()

    def init_project(
        self,
        name: str,
        destination: Path | str = ".",
        *,
        template: str = "generic",
        dry_run: bool = False,
        overwrite: bool = False,
        author: str = "YoghaLabs",
        version: str = "0.1.0-alpha",
    ) -> dict[str, Any]:
        """Initialize a new project (CLI ``adf init`` / ``adf new``)."""
        generator = self.create(dry_run=dry_run, overwrite=overwrite)
        result = generator.new_project(
            name,
            destination,
            template=template,
            author=author,
            version=version,
        )
        self._last_output = generator.bootstrap.builder.output
        return result

    def list_project_types(self) -> list[str]:
        """Return known built-in project type template names."""
        available = {row["name"] for row in self.templates.list()}
        return [name for name in BUILTIN_PROJECT_TYPES if name in available]


__all__ = [
    "AdfGeneratorError",
    "BUILTIN_PROJECT_TYPES",
    "GeneratorManager",
    "ProjectGenerator",
    "ProjectManifest",
]
