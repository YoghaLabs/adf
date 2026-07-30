"""Compose manifest-driven project builds (no hardcoded structures)."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from generator.dry_run import DryRunPlanner
from generator.filesystem import AdfGeneratorError, FileSystem
from generator.output import GenerationOutput
from generator.progress import ProgressReporter
from generator.project_manifest import ProjectManifest
from generator.template_resolver import TemplateResolver
from generator.validator import GenerationValidator
from generator.writer import Writer
from templates.engine import TemplateManager
from templates.variables import VariableResolver


class ProjectBuilder:
    """Build a project solely from resolved template metadata and files."""

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
        self.fs = FileSystem(dry_run=dry_run, overwrite=overwrite)
        self.output = GenerationOutput(dry_run=dry_run)
        self.writer = Writer(
            self.fs, dry_run=dry_run, overwrite=overwrite, output=self.output
        )
        self.progress = ProgressReporter()
        self.resolver = TemplateResolver(templates)
        self.validator = GenerationValidator(templates, resolver=self.resolver)
        self.dry_planner = DryRunPlanner()
        self.var_resolver = VariableResolver(strict=True)

    def validate(self, manifest: ProjectManifest) -> list[str]:
        """Validate generation inputs before writing."""
        return self.validator.validate(manifest, overwrite=self.overwrite)

    def build(self, manifest: ProjectManifest) -> dict[str, Any]:
        """Resolve templates and either dry-run or write the project tree."""
        errors = self.validate(manifest)
        if errors:
            raise AdfGeneratorError("; ".join(errors))

        resolved = self.resolver.resolve(manifest.template, manifest.variables())
        self.progress.step(f"Resolved template chain: {' → '.join(t.name for t in resolved.chain)}")
        self.output.progress(self.progress.messages[-1])

        if self.dry_run:
            plan = self.dry_planner.plan(
                resolved.primary,
                manifest,
                resolved.variables,
                chain=resolved.chain,
            )
            self.progress.step("Dry-run plan prepared (nothing written)")
            result = plan.to_dict()
            result.update(
                {
                    "ok": True,
                    "manifest": manifest.to_dict(),
                    "capabilities": list(resolved.capabilities),
                    "messages": self.progress.to_list(),
                    "rendered": [],
                }
            )
            return result

        root = manifest.project_root
        self.fs.ensure_dir(root)
        self.output.record_folder(root)
        self.progress.step(f"Writing project at {root}")
        self.output.progress(self.progress.messages[-1])

        rendered: list[str] = []
        try:
            for item in resolved.chain:
                paths = self._render_package(item.files_root, root, resolved.variables)
                rendered.extend(str(p) for p in paths)
                self.progress.step(f"Rendered package '{item.name}' ({len(paths)} files)")
                self.output.progress(self.progress.messages[-1])
            output_errors = self.validator.validate_output(root, resolved)
            if output_errors:
                raise AdfGeneratorError("; ".join(output_errors))
        except Exception:
            self.output.rollback()
            raise

        result = self.output.to_dict()
        result.update(
            {
                "ok": True,
                "manifest": manifest.to_dict(),
                "capabilities": list(resolved.capabilities),
                "rendered": rendered,
                "messages": self.progress.to_list(),
            }
        )
        return result

    def _render_package(
        self,
        source_root: Path,
        destination_root: Path,
        variables: dict[str, Any],
    ) -> list[Path]:
        """Render files from a template package into the destination."""
        written: list[Path] = []
        if not source_root.is_dir():
            return written
        for path in sorted(source_root.rglob("*")):
            if not path.is_file() or path.name == "template.yaml":
                continue
            rel = path.relative_to(source_root)
            rel_rendered = Path(
                self.var_resolver.resolve(str(rel).replace("\\", "/"), variables)
            )
            dest = destination_root / rel_rendered
            try:
                text = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                written.append(self.writer.write_bytes(dest, path.read_bytes()))
                continue
            rendered = self.var_resolver.resolve(text, variables)
            written.append(self.writer.write_text(dest, rendered))
        return written
