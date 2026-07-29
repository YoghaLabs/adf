"""Compose scaffold + template render into a coherent project build."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from generator.filesystem import FileSystem
from generator.output import GenerationOutput
from generator.project_manifest import ProjectManifest
from generator.scaffolder import Scaffolder
from generator.writer import Writer
from templates.engine import TemplateManager


class ProjectBuilder:
    """Build a project root using scaffolder + TemplateManager."""

    def __init__(
        self,
        templates: TemplateManager,
        *,
        dry_run: bool = False,
        overwrite: bool = False,
    ) -> None:
        """Create a builder."""
        self.templates = templates
        self.dry_run = dry_run
        self.overwrite = overwrite
        self.fs = FileSystem(dry_run=dry_run)
        self.writer = Writer(self.fs, dry_run=dry_run, overwrite=overwrite)
        self.scaffolder = Scaffolder(self.writer, self.fs)

    @property
    def output(self) -> GenerationOutput:
        """Access accumulated output."""
        return self.writer.output

    def validate(self, manifest: ProjectManifest) -> list[str]:
        """Validate generation inputs before writing."""
        errors: list[str] = []
        if not manifest.name.strip():
            errors.append("project name is required")
        if any(ch in manifest.name for ch in r'<>:"/\|?*'):
            errors.append(f"invalid project name: {manifest.name}")
        try:
            self.templates.load_by_name(manifest.template)
        except Exception as exc:  # noqa: BLE001
            errors.append(f"template unavailable: {exc}")
        if not self.overwrite:
            try:
                self.fs.guard_destination(manifest.project_root, overwrite=False)
            except Exception as exc:  # noqa: BLE001
                errors.append(str(exc))
        return errors

    def build(self, manifest: ProjectManifest) -> dict[str, Any]:
        """Scaffold folders/docs and render the selected template."""
        errors = self.validate(manifest)
        if errors:
            from generator.filesystem import AdfGeneratorError

            raise AdfGeneratorError("; ".join(errors))

        root = manifest.project_root
        self.output.progress(f"Building project at {root}")
        self.fs.ensure_dir(root)
        self.output.record_folder(root)

        self.scaffolder.scaffold_folders(root)
        self.scaffolder.scaffold_root_docs(
            root, project_name=manifest.name, version=manifest.version
        )
        self.scaffolder.scaffold_adf(
            root, project_name=manifest.name, version=manifest.version
        )
        self.scaffolder.scaffold_prompts(root)
        self.scaffolder.scaffold_bootstrap(root)
        self.scaffolder.scaffold_runtime_config(root)

        rendered: list[str] = []
        if not self.dry_run:
            paths = self.templates.render(
                manifest.template,
                root,
                manifest.variables(),
                overwrite=True,  # scaffold already owns root docs; template may refine
            )
            rendered = [str(path) for path in paths]
            self.output.progress(f"Rendered template '{manifest.template}' ({len(paths)} files)")
        else:
            self.output.progress(
                f"Dry-run: skipped template render for '{manifest.template}'"
            )

        result = self.output.to_dict()
        result.update(
            {
                "ok": True,
                "manifest": manifest.to_dict(),
                "rendered": rendered,
            }
        )
        return result
