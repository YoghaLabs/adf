"""InstallerManager — distribution and package installation orchestration."""

from __future__ import annotations

import json
import shutil
import zipfile
from pathlib import Path
from typing import Any

from distribution.checksum import file_checksum, tree_checksum, verify_file
from distribution.manifest import AdfDistributionError, load_manifest
from distribution.rollback import RollbackManager
from distribution.signature import SignatureManager
from packages.manager import PackageManager
from registry.metadata import utc_now_iso


class InstallerManager:
    """Install / repair / verify / uninstall distribution payloads and packages.

    Package installs delegate to ``PackageManager`` (no duplicated APM logic).
    Distribution installs extract release artifacts into the local install root.
    """

    def __init__(
        self,
        repo_root: Path | str,
        *,
        package_manager: PackageManager | None = None,
    ) -> None:
        self.repo_root = Path(repo_root).resolve()
        self.package_manager = package_manager or PackageManager(self.repo_root)
        self.install_root = self.repo_root / ".adf" / "distribution" / "installed"
        self.install_root.mkdir(parents=True, exist_ok=True)
        self.state_path = self.install_root / "install-state.json"
        self.rollback = RollbackManager(self.repo_root / ".adf" / "distribution" / "rollback")
        self.signatures = SignatureManager()

    def _load_state(self) -> dict[str, Any]:
        if self.state_path.is_file():
            data = json.loads(self.state_path.read_text(encoding="utf-8"))
            return data if isinstance(data, dict) else {}
        return {"installs": {}}

    def _save_state(self, state: dict[str, Any]) -> None:
        self.state_path.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    def install(
        self,
        target: str,
        *,
        overwrite: bool = False,
        mode: str = "auto",
    ) -> dict[str, Any]:
        """Install a package id or distribution artifact/manifest path."""
        mode_key = mode.strip().lower()
        path = Path(target)
        if mode_key == "package" or (mode_key == "auto" and not path.exists()):
            return self.package_manager.install(target, overwrite=overwrite)

        if mode_key in {"auto", "distribution", "bundle"}:
            return self._install_distribution(path, overwrite=overwrite)

        raise AdfDistributionError(f"unknown install mode: {mode}")

    def _install_distribution(self, path: Path, *, overwrite: bool) -> dict[str, Any]:
        if not path.exists():
            raise AdfDistributionError(f"distribution target missing: {path}")

        dest_name = path.stem.replace(".tar", "")
        dest = self.install_root / dest_name
        if dest.exists() and not overwrite:
            raise AdfDistributionError(f"distribution already installed: {dest_name}")
        if dest.exists() and overwrite:
            self.rollback.snapshot(dest, label=f"pre-install-{dest_name}")
            shutil.rmtree(dest)

        dest.mkdir(parents=True, exist_ok=True)
        if path.suffix.lower() == ".zip" or path.name.endswith(".whl"):
            with zipfile.ZipFile(path, "r") as archive:
                archive.extractall(dest)
        elif path.is_dir():
            shutil.copytree(path, dest, dirs_exist_ok=True)
        elif path.suffix.lower() == ".json":
            manifest = load_manifest(path)
            shutil.copy2(path, dest / "release.manifest.json")
            for artifact in manifest.artifacts:
                art_path = Path(artifact.path)
                if art_path.is_file():
                    shutil.copy2(art_path, dest / art_path.name)
        else:
            shutil.copy2(path, dest / path.name)

        checksum = tree_checksum(dest)
        state = self._load_state()
        installs = dict(state.get("installs") or {})
        installs[dest_name] = {
            "id": dest_name,
            "source": str(path),
            "path": str(dest),
            "checksum": checksum,
            "installed_at": utc_now_iso(),
        }
        state["installs"] = installs
        self._save_state(state)
        return {"ok": True, "id": dest_name, "path": str(dest), "checksum": checksum}

    def repair(self, install_id: str) -> dict[str, Any]:
        """Re-verify and rewrite install state checksum for an install id."""
        state = self._load_state()
        entry = (state.get("installs") or {}).get(install_id)
        if not entry:
            raise AdfDistributionError(f"install not found: {install_id}")
        path = Path(entry["path"])
        if not path.exists():
            raise AdfDistributionError(f"install path missing: {path}")
        checksum = tree_checksum(path)
        entry["checksum"] = checksum
        entry["repaired_at"] = utc_now_iso()
        state["installs"][install_id] = entry
        self._save_state(state)
        return {"ok": True, "id": install_id, "checksum": checksum}

    def verify(self, target: str | None = None) -> dict[str, Any]:
        """Verify distribution installs and/or package lockfile state."""
        results: dict[str, Any] = {"ok": True, "distribution": [], "packages": None}
        state = self._load_state()
        installs = state.get("installs") or {}
        ids = [target] if target and target in installs else list(installs.keys())
        if target and target not in installs:
            # fall back to package verify
            pkg = self.package_manager.verify(target)
            results["packages"] = pkg
            results["ok"] = bool(pkg.get("ok"))
            return results

        for install_id in ids:
            entry = installs[install_id]
            path = Path(entry["path"])
            actual = tree_checksum(path) if path.exists() else ""
            ok = path.exists() and actual == entry.get("checksum")
            results["distribution"].append(
                {
                    "id": install_id,
                    "ok": ok,
                    "expected": entry.get("checksum"),
                    "actual": actual,
                    "path": str(path),
                }
            )
            results["ok"] = results["ok"] and ok

        if target is None:
            results["packages"] = self.package_manager.verify()
            results["ok"] = results["ok"] and bool(results["packages"].get("ok"))
        return results

    def uninstall(self, install_id: str, *, package: bool = False) -> dict[str, Any]:
        """Uninstall a distribution install or a package id."""
        if package:
            return self.package_manager.remove(install_id)
        state = self._load_state()
        entry = (state.get("installs") or {}).get(install_id)
        if not entry:
            # convenience: treat unknown id as package uninstall
            return self.package_manager.remove(install_id)
        path = Path(entry["path"])
        if path.exists():
            self.rollback.snapshot(path, label=f"pre-uninstall-{install_id}")
            shutil.rmtree(path)
        installs = dict(state.get("installs") or {})
        installs.pop(install_id, None)
        state["installs"] = installs
        self._save_state(state)
        return {"ok": True, "uninstalled": install_id}

    def verify_artifact(self, path: Path | str, expected_checksum: str = "") -> dict[str, Any]:
        """Verify a single artifact file checksum (and optional signature)."""
        file_path = Path(path)
        report: dict[str, Any] = {"path": str(file_path), "ok": file_path.is_file()}
        if expected_checksum:
            report["checksum"] = verify_file(file_path, expected_checksum)
            report["ok"] = report["ok"] and bool(report["checksum"]["ok"])
        else:
            report["checksum"] = {"ok": True, "actual": file_checksum(file_path), "skipped": True}
        return report
