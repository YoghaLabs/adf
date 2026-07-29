"""Validation for generation inputs and outputs."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from generator.project_manifest import ProjectManifest
from generator.template_resolver import ResolvedTemplate, TemplateResolver
from templates.engine import TemplateManager
from templates.validator import TemplateValidator
from templates.variables import AdfTemplateError


class GenerationValidator:
    """Validate template, manifest, variables, dependencies, and outputs."""

    def __init__(
        self,
        templates: TemplateManager,
        *,
        resolver: TemplateResolver | None = None,
        template_validator: TemplateValidator | None = None,
    ) -> None:
        """Create a validator."""
        self.templates = templates
        self.resolver = resolver or TemplateResolver(templates)
        self.template_validator = template_validator or TemplateValidator()

    def validate(
        self,
        project: ProjectManifest,
        *,
        overwrite: bool = False,
    ) -> list[str]:
        """Return validation errors (empty means ok)."""
        errors: list[str] = []
        if not project.name.strip():
            errors.append("project name is required")
        if any(ch in project.name for ch in r'<>:"/\|?*'):
            errors.append(f"invalid project name: {project.name}")

        try:
            resolved = self.resolver.resolve(project.template, project.variables())
        except AdfTemplateError as exc:
            errors.append(f"template resolution failed: {exc}")
            return errors

        errors.extend(self.validate_resolved(resolved, project.variables()))
        if not overwrite:
            root = project.project_root
            if root.exists() and any(root.iterdir()):
                errors.append(f"destination is not empty: {root}")
        return errors

    def validate_resolved(
        self,
        resolved: ResolvedTemplate,
        overrides: dict[str, Any],
    ) -> list[str]:
        """Validate a resolved template graph and variable coverage."""
        errors: list[str] = []
        for item in resolved.chain:
            errors.extend(
                [f"{item.name}: {err}" for err in self.template_validator.validate_loaded(item)]
            )
        for dep in resolved.dependencies:
            errors.extend(
                [f"dep {dep.name}: {err}" for err in self.template_validator.validate_loaded(dep)]
            )
        # Required placeholders referenced in outputs should resolve.
        merged = dict(resolved.variables)
        merged.update(overrides)
        for item in resolved.chain:
            for output in item.manifest.outputs:
                try:
                    self.resolver.resolver.resolve(output, merged)
                except AdfTemplateError as exc:
                    errors.append(f"output variable error in {item.name}: {exc}")
            files_root = item.files_root
            if files_root.is_dir():
                for path in files_root.rglob("*"):
                    if not path.is_file() or path.name == "template.yaml":
                        continue
                    try:
                        text = path.read_text(encoding="utf-8")
                    except UnicodeDecodeError:
                        continue
                    try:
                        self.resolver.resolver.resolve(text, merged)
                    except AdfTemplateError as exc:
                        rel = path.relative_to(files_root)
                        errors.append(f"variable error in {item.name}:{rel}: {exc}")
        return errors

    def validate_output(self, root: Path, resolved: ResolvedTemplate) -> list[str]:
        """Validate that declared outputs exist after generation."""
        errors: list[str] = []
        variables = dict(resolved.variables)
        for item in resolved.chain:
            for output in item.manifest.outputs:
                try:
                    rendered = self.resolver.resolver.resolve(output, variables)
                except AdfTemplateError as exc:
                    errors.append(f"output variable error in {item.name}: {exc}")
                    continue
                candidate = root / rendered
                if not candidate.exists():
                    errors.append(f"missing declared output: {rendered}")
        return errors
