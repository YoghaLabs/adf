"""SDK installer facade."""

from __future__ import annotations

from typing import Any

from services.installer_service import InstallerService


class InstallerClient:
    """Public installer operations."""

    def __init__(self, service: InstallerService) -> None:
        self._service = service

    def install(self, target: str, *, overwrite: bool = False, mode: str = "auto") -> dict[str, Any]:
        return self._service.install(target, overwrite=overwrite, mode=mode).to_dict()

    def repair(self, install_id: str) -> dict[str, Any]:
        return self._service.repair(install_id).to_dict()

    def verify(self, target: str | None = None) -> dict[str, Any]:
        return self._service.verify(target).to_dict()

    def uninstall(self, install_id: str, *, package: bool = False) -> dict[str, Any]:
        return self._service.uninstall(install_id, package=package).to_dict()
