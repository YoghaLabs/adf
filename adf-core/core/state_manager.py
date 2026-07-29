"""Project state persistence and validation."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from runtime.constants import REQUIRED_ADF_FILES, REQUIRED_ROOT_FILES
from runtime.exceptions import AdfStateError


class StateManager:
    """Load, save, and validate ADF project state snapshots.

    Persists a machine-readable snapshot under ``.adf/local/state.json``
    while remaining compatible with markdown SSOT files as the human source
    of truth.
    """

    def __init__(self, repo_root: Path | str) -> None:
        """Initialize with the repository root.

        Args:
            repo_root: Absolute or relative path to the ADF repo root.
        """
        self.repo_root = Path(repo_root).resolve()
        self.adf_dir = self.repo_root / ".adf"
        self.state_path = self.adf_dir / "local" / "state.json"

    def load(self) -> dict[str, Any]:
        """Load state from ``state.json`` or derive a snapshot from SSOT files.

        Returns:
            State dictionary with identity and status fields.

        Raises:
            AdfStateError: If the repository root is invalid.
        """
        if not self.repo_root.is_dir():
            raise AdfStateError(f"Repo root does not exist: {self.repo_root}")

        if self.state_path.is_file():
            data = json.loads(self.state_path.read_text(encoding="utf-8"))
            if not isinstance(data, dict):
                raise AdfStateError("state.json must contain a JSON object")
            return data

        return self._derive_from_ssot()

    def save(self, state: dict[str, Any]) -> Path:
        """Persist state to ``.adf/local/state.json``.

        Args:
            state: State dictionary to write.

        Returns:
            Path to the written state file.
        """
        self.state_path.parent.mkdir(parents=True, exist_ok=True)
        payload = json.dumps(state, indent=2, sort_keys=True) + "\n"
        self.state_path.write_text(payload, encoding="utf-8")
        return self.state_path

    def validate(self, state: dict[str, Any] | None = None) -> list[str]:
        """Validate state and required SSOT presence.

        Args:
            state: Optional state dict; loads current state when omitted.

        Returns:
            List of validation error strings (empty means OK).
        """
        errors: list[str] = []
        current = state if state is not None else self.load()

        for key in ("version", "build", "branch"):
            if not current.get(key):
                errors.append(f"missing state field: {key}")

        for name in REQUIRED_ROOT_FILES:
            if not (self.repo_root / name).is_file():
                errors.append(f"missing root file: {name}")

        if not self.adf_dir.is_dir():
            errors.append("missing .adf directory")
        else:
            for name in REQUIRED_ADF_FILES:
                if not (self.adf_dir / name).is_file():
                    errors.append(f"missing .adf file: {name}")

        return errors

    def _derive_from_ssot(self) -> dict[str, Any]:
        """Derive a minimal state snapshot from ``VERSION`` and paths."""
        version_file = self.repo_root / "VERSION"
        identity = {"version": "", "build": "", "branch": ""}
        if version_file.is_file():
            identity.update(self._parse_version_file(version_file.read_text(encoding="utf-8")))

        return {
            **identity,
            "repo_root": str(self.repo_root),
            "source": "ssot-derived",
            "operator_state": "BOOT",
        }

    @staticmethod
    def _parse_version_file(text: str) -> dict[str, str]:
        """Parse root ``VERSION`` key/value text format."""
        result: dict[str, str] = {}
        lines = [line.strip() for line in text.splitlines()]
        i = 0
        while i < len(lines):
            line = lines[i]
            if line.endswith(":") and i + 1 < len(lines):
                key = line[:-1].strip().lower().replace(" ", "_")
                value = lines[i + 1].strip()
                if key == "version":
                    result["version"] = value
                elif key == "current_build":
                    result["build"] = value
                elif key == "branch":
                    result["branch"] = value
                i += 2
                continue
            i += 1
        return result
