"""Studio live bridge — map Studio SDK method names → SDKClient / Service Layer.

Transport only. No Studio business rules. Invoked by Vite middleware or CLI:

  python -m adf.studio_bridge '{"method":"runtime.status","payload":{}}'
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

from sdk.client import SDKClient


LIVE_METHODS = frozenset(
    {
        "runtime.status",
        "runtime.version",
        "runtime.doctor",
        "runtime.resume",
        "workspace.describe",
        "workspace.readiness",
        "workspace.list",
        "workspace.profile",
        "projects.info",
        "projects.list",
        "projects.explorer",
        "packages.listInstalled",
        "generator.types",
        "registry.status",
        "release.channels",
    }
)


def _client(root: Path | None) -> SDKClient:
    return SDKClient(repo_root=root)


def _workspace_profile(client: SDKClient) -> dict[str, Any]:
    describe = client.workspace().describe()
    data = describe.get("data") or {}
    root = str(data.get("repo_root") or client.repo_root)
    name = Path(root).name or "adf"
    return {
        "id": "ws-live",
        "name": f"{name} (live)",
        "path": root,
        "description": "Live workspace from ADF Core Service Layer",
        "favorite": True,
        "projectCount": 1,
        "sessionCount": 0,
        "updatedAt": "",
        "live": True,
    }


def _normalize_runtime_status(raw: dict[str, Any]) -> dict[str, Any]:
    data = dict(raw.get("data") or {})
    plugins = data.get("plugins") or []
    pkg_count = 0
    try:
        packages = data.get("state", {}).get("packages") if isinstance(data.get("state"), dict) else None
        if isinstance(packages, list):
            pkg_count = len(packages)
    except Exception:
        pkg_count = 0
    return {
        "ok": bool(raw.get("ok", True)),
        "data": {
            "packageVersion": data.get("package_version") or data.get("packageVersion"),
            "engineBuild": "BUILD-021",
            "plugins": len(plugins) if isinstance(plugins, list) else int(plugins or 0),
            "packagesInstalled": pkg_count,
            "ok": bool(raw.get("ok", True)),
            "raw": data,
            "bridge": "live",
        },
        "message": raw.get("message") or "live runtime.status",
    }


def invoke(method: str, payload: dict[str, Any] | None = None, *, root: Path | None = None) -> dict[str, Any]:
    """Dispatch one Studio bridge method. Raises ValueError if unsupported."""
    payload = payload or {}
    if method not in LIVE_METHODS:
        raise ValueError(f"unsupported live method: {method}")

    client = _client(root)
    # Ensure services configured (doctor/status need engines).
    client._ensure()  # noqa: SLF001 — intentional for bridge bootstrap

    if method == "runtime.status":
        return _normalize_runtime_status(client.runtime().status())

    if method == "runtime.version":
        return client.runtime().version()

    if method == "runtime.doctor":
        return client.runtime().doctor()

    if method == "runtime.resume":
        return client.runtime().resume()

    if method == "workspace.describe":
        return client.workspace().describe()

    if method == "workspace.readiness":
        return client.workspace().readiness()

    if method == "workspace.list":
        profile = _workspace_profile(client)
        return {"ok": True, "data": {"workspaces": [profile], "count": 1, "bridge": "live"}}

    if method == "workspace.profile":
        return {"ok": True, "data": _workspace_profile(client)}

    if method == "projects.info":
        return client.projects().info()

    if method in {"projects.list", "projects.explorer"}:
        info = client.projects().info()
        pdata = info.get("data") or {}
        item = {
            "id": pdata.get("project_id") or pdata.get("id") or "adf",
            "name": pdata.get("name") or Path(str(client.repo_root)).name,
            "status": "active",
            "version": pdata.get("version") or "",
            "updatedAt": pdata.get("updated_at") or "",
            "workspaceId": "ws-live",
            "path": str(client.repo_root),
            "favorite": True,
            "pinned": True,
            "archived": False,
            "live": True,
        }
        key = "projects" if method == "projects.list" else "items"
        return {"ok": True, "data": {key: [item], "count": 1, "bridge": "live"}}

    if method == "packages.listInstalled":
        result = client.packages().list(installed=True)
        data = result.get("data") or {}
        packages = data.get("packages") or data.get("items") or []
        if not isinstance(packages, list):
            packages = []
        return {
            "ok": bool(result.get("ok", True)),
            "data": {"count": len(packages), "packages": packages, "bridge": "live"},
            "message": result.get("message") or "",
        }

    if method == "generator.types":
        doctor = client.runtime().doctor()
        ddata = doctor.get("data") or {}
        project_types = (
            (ddata.get("generator") or {}).get("project_types")
            if isinstance(ddata.get("generator"), dict)
            else None
        )
        if not project_types:
            project_types = ["generic", "python", "fastapi", "nextjs", "laravel"]
        return {"ok": True, "data": {"projectTypes": list(project_types), "bridge": "live"}}

    if method == "registry.status":
        return client.registry().status()

    if method == "release.channels":
        return client.release().channels()

    raise ValueError(f"unhandled live method: {method}")


def main(argv: list[str] | None = None) -> int:
    argv = list(sys.argv[1:] if argv is None else argv)
    root: Path | None = None
    raw: str
    if argv and argv[0] == "--root" and len(argv) >= 3:
        root = Path(argv[1]).resolve()
        raw = argv[2]
    elif argv:
        raw = argv[0]
    else:
        raw = sys.stdin.read()

    try:
        body = json.loads(raw)
    except json.JSONDecodeError as exc:
        print(json.dumps({"ok": False, "data": {}, "error": f"invalid json: {exc}"}))
        return 2

    method = str(body.get("method") or "")
    payload = body.get("payload") if isinstance(body.get("payload"), dict) else {}
    env_root = body.get("root")
    if env_root:
        root = Path(str(env_root)).resolve()

    try:
        result = invoke(method, payload, root=root)
        if "bridge" not in (result.get("data") or {}):
            data = dict(result.get("data") or {})
            data["bridge"] = "live"
            result = {**result, "data": data}
        print(json.dumps(result, default=str))
        return 0 if result.get("ok", True) else 1
    except Exception as exc:  # noqa: BLE001 — envelope boundary
        print(json.dumps({"ok": False, "data": {"bridge": "live"}, "error": str(exc)}))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
