"""Template package validation."""

from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

from templates.manifest import MANIFEST_FILENAME, MANIFEST_SCHEMA_VERSION, TemplateManifest

if TYPE_CHECKING:
    from templates.template_loader import LoadedTemplate


class TemplateValidator:
    """Validate manifests and on-disk template packages."""

    SUPPORTED_SCHEMA_MAJOR = MANIFEST_SCHEMA_VERSION.split(".")[0]

    def validate_manifest(self, manifest: TemplateManifest) -> list[str]:
        """Return validation errors for a parsed manifest (empty = ok)."""
        errors: list[str] = []
        if not manifest.metadata.name:
            errors.append("metadata.name is required")
        if not manifest.metadata.version:
            errors.append("metadata.version is required")
        major = manifest.schema_version.split(".")[0]
        if major != self.SUPPORTED_SCHEMA_MAJOR:
            errors.append(
                f"unsupported schema_version {manifest.schema_version}; "
                f"supported major={self.SUPPORTED_SCHEMA_MAJOR}"
            )
        for field_name, values in (
            ("dependencies", manifest.dependencies),
            ("capabilities", manifest.capabilities),
            ("outputs", manifest.outputs),
            ("permissions", manifest.permissions),
            ("plugin_compatibility", manifest.plugin_compatibility),
        ):
            for item in values:
                if not str(item).strip():
                    errors.append(f"{field_name} contains an empty entry")
        for output in manifest.outputs:
            if Path(output).is_absolute():
                errors.append(f"output paths must be relative: {output}")
        return errors

    def validate_package(self, root: Path | str) -> list[str]:
        """Validate a template directory containing ``template.yaml``."""
        from templates.manifest import parse_manifest

        path = Path(root)
        errors: list[str] = []
        if not path.is_dir():
            return [f"template root is not a directory: {path}"]
        manifest_path = path / MANIFEST_FILENAME
        if not manifest_path.is_file():
            return [f"missing {MANIFEST_FILENAME} in {path}"]
        try:
            manifest = parse_manifest(manifest_path)
        except Exception as exc:  # noqa: BLE001 — surface as validation error
            return [f"manifest parse failed: {exc}"]
        errors.extend(self.validate_manifest(manifest))
        files_dir = path / "files"
        if files_dir.exists() and not files_dir.is_dir():
            errors.append("files must be a directory when present")
        for output in manifest.outputs:
            candidate = files_dir / output if files_dir.is_dir() else path / output
            if not candidate.exists():
                # Soft check: output may be generated path name only.
                continue
        return errors

    def validate_loaded(self, loaded: LoadedTemplate) -> list[str]:
        """Validate a loaded template object."""
        errors = self.validate_manifest(loaded.manifest)
        if not loaded.root.is_dir():
            errors.append(f"loaded root missing: {loaded.root}")
        return errors
