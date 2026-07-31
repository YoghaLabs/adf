"""Studio live bridge — map Studio SDK method names → SDKClient / Service Layer.

Transport only. No Studio business rules. Invoked by Vite middleware or CLI:

  python -m adf.studio_bridge '{"method":"runtime.status","payload":{}}'
"""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
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
        "workspace.switch",
        "workspace.settings",
        "workspace.stats",
        "workspace.activity",
        "workspace.favorites",
        "workspace.search",
        "projects.info",
        "projects.list",
        "projects.explorer",
        "projects.tree",
        "projects.favorites",
        "projects.pinned",
        "projects.archived",
        "projects.recent",
        "packages.listInstalled",
        "generator.types",
        "registry.status",
        "release.channels",
        "sessions.list",
        "sessions.history",
        "sessions.current",
        "sessions.recent",
        "sessions.resume",
        "sessions.close",
        "sessions.timeline",
        "runtimeDashboard.overview",
        "runtimeDashboard.jobs",
        "runtimeDashboard.events",
        "runtimeDashboard.inspectors",
        "metrics.snapshot",
        "metrics.series",
        "logs.list",
        "logs.filter",
        "diagnostics.snapshot",
        "timeline.list",
        "timeline.byKind",
        "activity.feed",
        "activity.recent",
    }
)


def _now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


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
        "sessionCount": 1,
        "updatedAt": _now(),
        "live": True,
    }


def _project_item(client: SDKClient) -> dict[str, Any]:
    info = client.projects().info()
    pdata = info.get("data") or {}
    return {
        "id": str(pdata.get("project_id") or pdata.get("id") or "adf"),
        "name": str(pdata.get("name") or Path(str(client.repo_root)).name),
        "status": "active",
        "version": str(pdata.get("version") or ""),
        "updatedAt": str(pdata.get("updated_at") or _now()),
        "workspaceId": "ws-live",
        "path": str(client.repo_root),
        "favorite": True,
        "pinned": True,
        "archived": False,
        "live": True,
    }


def _doctor(client: SDKClient) -> dict[str, Any]:
    return client.runtime().doctor()


def _normalize_runtime_status(raw: dict[str, Any], doctor: dict[str, Any] | None = None) -> dict[str, Any]:
    data = dict(raw.get("data") or {})
    plugins = data.get("plugins") or []
    pkg_count = 0
    ddata = (doctor or {}).get("data") or {}
    packages = ddata.get("packages") if isinstance(ddata.get("packages"), dict) else {}
    if isinstance(packages, dict):
        pkg_count = int(packages.get("installed_count") or 0)
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


def _session_from_resume(client: SDKClient) -> dict[str, Any]:
    resume = client.runtime().resume()
    data = resume.get("data") or {}
    state = data.get("state") if isinstance(data.get("state"), dict) else {}
    title = str(state.get("current_task") or state.get("phase") or "ADF live session")
    return {
        "id": "sess-live-001",
        "title": title[:80],
        "projectId": "adf",
        "workspaceId": "ws-live",
        "status": "active",
        "startedAt": _now(),
        "updatedAt": _now(),
        "live": True,
        "resume": {
            "message": data.get("message"),
            "hasCheckpoint": data.get("checkpoint") is not None,
            "pluginCount": len(data.get("plugins") or [])
            if isinstance(data.get("plugins"), list)
            else 0,
        },
    }


def _live_overview(client: SDKClient) -> dict[str, Any]:
    doctor = _doctor(client)
    ddata = doctor.get("data") or {}
    version = client.runtime().version().get("data") or {}
    project = _project_item(client)
    profile = _workspace_profile(client)
    healthy = bool(doctor.get("ok"))
    return {
        "engineStatus": "healthy" if healthy else "degraded",
        "engineBuild": "BUILD-021",
        "packageVersion": version.get("version") or "",
        "currentSessionId": "sess-live-001",
        "currentSessionTitle": "Live Core session",
        "activeWorkspaceId": profile["id"],
        "activeWorkspaceName": profile["name"],
        "currentProjectId": project["id"],
        "currentProjectName": project["name"],
        "live": True,
        "updatedAt": _now(),
        "doctorOk": healthy,
        "layoutOk": bool((ddata.get("layout") or {}).get("ok"))
        if isinstance(ddata.get("layout"), dict)
        else healthy,
        "bridge": "live",
    }


def _live_metrics(client: SDKClient) -> dict[str, Any]:
    doctor = _doctor(client)
    ddata = doctor.get("data") or {}
    status = client.runtime().status().get("data") or {}
    plugins = status.get("plugins") or []
    packages = ddata.get("packages") if isinstance(ddata.get("packages"), dict) else {}
    templates = ddata.get("templates") if isinstance(ddata.get("templates"), list) else []
    return {
        "tokenBudget": 0,
        "tokenUsed": 0,
        "promptCount": 0,
        "contextSize": 0,
        "memoryUsageMb": 0,
        "pluginCount": len(plugins) if isinstance(plugins, list) else 0,
        "packageCount": int(packages.get("installed_count") or 0),
        "knowledgeCount": 0,
        "executionTimeMs": 0,
        "queueSize": 0,
        "templateCount": len(templates),
        "registryCount": int(packages.get("registry_count") or 0),
        "bridge": "live",
    }


def _live_logs(client: SDKClient) -> list[dict[str, Any]]:
    doctor = _doctor(client)
    ddata = doctor.get("data") or {}
    logs: list[dict[str, Any]] = [
        {
            "id": "live-boot",
            "severity": "info",
            "source": "bridge",
            "message": "Live Core bridge connected",
            "at": _now(),
        }
    ]
    layout = ddata.get("layout") if isinstance(ddata.get("layout"), dict) else {}
    logs.append(
        {
            "id": "live-layout",
            "severity": "info" if layout.get("ok") else "warn",
            "source": "bootstrap",
            "message": f"Layout ok={layout.get('ok')} missing={layout.get('missing')}",
            "at": _now(),
        }
    )
    for err in ddata.get("validation_errors") or []:
        logs.append(
            {
                "id": f"live-val-{len(logs)}",
                "severity": "error",
                "source": "state",
                "message": str(err),
                "at": _now(),
            }
        )
    doctor_ok = bool(doctor.get("ok"))
    logs.append(
        {
            "id": "live-doctor",
            "severity": "info" if doctor_ok else "warn",
            "source": "doctor",
            "message": f"adf doctor ok={doctor_ok}",
            "at": _now(),
        }
    )
    return logs


def _live_diagnostics(client: SDKClient) -> dict[str, Any]:
    doctor = _doctor(client)
    ddata = doctor.get("data") or {}
    layout = ddata.get("layout") if isinstance(ddata.get("layout"), dict) else {}
    checks = [
        {"id": "layout", "label": "Locked layout", "ok": bool(layout.get("ok"))},
        {
            "id": "validation",
            "label": "State validation",
            "ok": not bool(ddata.get("validation_errors")),
        },
        {"id": "doctor", "label": "Doctor aggregate", "ok": bool(doctor.get("ok"))},
    ]
    return {
        "runtime": {"ok": bool(doctor.get("ok")), "checks": checks},
        "bridge": "live",
        "rawDoctor": ddata,
    }


def _live_inspectors(client: SDKClient) -> dict[str, list[dict[str, Any]]]:
    status = client.runtime().status().get("data") or {}
    doctor = _doctor(client).get("data") or {}
    plugins_raw = status.get("plugins") or []
    plugins: list[dict[str, Any]] = []
    if isinstance(plugins_raw, list):
        for i, p in enumerate(plugins_raw):
            if isinstance(p, dict):
                plugins.append(
                    {
                        "id": str(p.get("id") or f"plug-{i}"),
                        "label": str(p.get("name") or p.get("id") or f"plugin-{i}"),
                        "status": str(p.get("status") or "loaded"),
                        "meta": str(p.get("version") or "live"),
                    }
                )
            else:
                plugins.append({"id": f"plug-{i}", "label": str(p), "status": "loaded", "meta": "live"})
    packages_meta = doctor.get("packages") if isinstance(doctor.get("packages"), dict) else {}
    packages = [
        {
            "id": "installed",
            "label": "installed packages",
            "status": "live",
            "meta": str(packages_meta.get("installed_count") or 0),
        },
        {
            "id": "registry",
            "label": "registry packages",
            "status": "live",
            "meta": str(packages_meta.get("registry_count") or 0),
        },
    ]
    project = _project_item(client)
    return {
        "plugins": plugins,
        "packages": packages,
        "knowledge": [{"id": "ssot", "label": ".adf SSOT", "status": "active", "meta": "live"}],
        "context": [{"id": "ctx-live", "label": "Service Layer context", "status": "loaded", "meta": "live"}],
        "session": [
            {
                "id": "sess-live-001",
                "label": "Live Core session",
                "status": "active",
                "meta": project["id"],
            }
        ],
    }


def _activity_items(client: SDKClient) -> list[dict[str, Any]]:
    doctor = _doctor(client)
    project = _project_item(client)
    return [
        {
            "id": "act-live-1",
            "kind": "build",
            "title": "Live Core connected",
            "detail": "BUILD-021 bridge",
            "at": _now(),
            "workspaceId": "ws-live",
            "projectId": project["id"],
        },
        {
            "id": "act-live-2",
            "kind": "session",
            "title": "Doctor snapshot",
            "detail": f"ok={doctor.get('ok')}",
            "at": _now(),
            "workspaceId": "ws-live",
            "projectId": project["id"],
        },
    ]


def invoke(method: str, payload: dict[str, Any] | None = None, *, root: Path | None = None) -> dict[str, Any]:
    """Dispatch one Studio bridge method. Raises ValueError if unsupported."""
    payload = payload or {}
    if method not in LIVE_METHODS:
        raise ValueError(f"unsupported live method: {method}")

    client = _client(root)
    client._ensure()  # noqa: SLF001 — intentional for bridge bootstrap

    if method == "runtime.status":
        return _normalize_runtime_status(client.runtime().status(), _doctor(client))

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

    if method in {"workspace.list", "workspace.switch"}:
        profile = _workspace_profile(client)
        return {"ok": True, "data": {"workspaces": [profile], "count": 1, "bridge": "live", "activeId": profile["id"]}}

    if method == "workspace.profile":
        return {"ok": True, "data": _workspace_profile(client)}

    if method == "workspace.settings":
        return {
            "ok": True,
            "data": {
                "workspaceId": "ws-live",
                "language": "en",
                "channel": "alpha",
                "autoResumeSessions": True,
                "showArchivedProjects": False,
                "bridge": "live",
            },
        }

    if method == "workspace.stats":
        metrics = _live_metrics(client)
        return {
            "ok": True,
            "data": {
                "workspaceId": "ws-live",
                "projects": 1,
                "sessions": 1,
                "favorites": 1,
                "builds": 1 if _doctor(client).get("ok") else 0,
                "packages": metrics.get("packageCount") or 0,
                "bridge": "live",
            },
        }

    if method in {"workspace.activity", "activity.feed", "activity.recent"}:
        items = _activity_items(client)
        return {"ok": True, "data": {"items": items, "count": len(items), "bridge": "live"}}

    if method == "workspace.favorites":
        project = _project_item(client)
        return {"ok": True, "data": {"projects": [project], "count": 1, "bridge": "live"}}

    if method == "workspace.search":
        q = str(payload.get("query") or "").lower()
        profile = _workspace_profile(client)
        project = _project_item(client)
        hits = []
        if not q or q in profile["name"].lower() or q in "ws-live":
            hits.append(
                {
                    "id": f"ws:{profile['id']}",
                    "kind": "workspace",
                    "label": profile["name"],
                    "path": "/workspace",
                    "meta": profile["path"],
                }
            )
        if not q or q in project["name"].lower() or q in project["id"].lower():
            hits.append(
                {
                    "id": f"proj:{project['id']}",
                    "kind": "project",
                    "label": project["name"],
                    "path": "/projects",
                    "meta": project["status"],
                }
            )
        return {"ok": True, "data": {"hits": hits, "count": len(hits), "bridge": "live"}}

    if method == "projects.info":
        return client.projects().info()

    if method in {
        "projects.list",
        "projects.explorer",
        "projects.tree",
        "projects.favorites",
        "projects.pinned",
        "projects.recent",
    }:
        item = _project_item(client)
        key = "items" if method in {"projects.explorer", "projects.tree"} else "projects"
        return {"ok": True, "data": {key: [item], "count": 1, "bridge": "live"}}

    if method == "projects.archived":
        return {"ok": True, "data": {"projects": [], "count": 0, "bridge": "live"}}

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
        doctor = _doctor(client)
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

    if method in {"sessions.list", "sessions.history", "sessions.recent"}:
        session = _session_from_resume(client)
        return {"ok": True, "data": {"sessions": [session], "count": 1, "bridge": "live"}}

    if method == "sessions.current":
        return {"ok": True, "data": {"session": _session_from_resume(client), "bridge": "live"}}

    if method == "sessions.resume":
        resume = client.runtime().resume()
        session = _session_from_resume(client)
        return {
            "ok": bool(resume.get("ok", True)),
            "data": {"session": session, "resume": resume.get("data") or {}, "bridge": "live"},
            "message": resume.get("message") or "live resume skeleton",
        }

    if method == "sessions.close":
        return {"ok": True, "data": {"closed": True, "sessionId": payload.get("sessionId"), "bridge": "live"}}

    if method == "sessions.timeline":
        events = [
            {"id": "t1", "sessionId": payload.get("sessionId") or "sess-live-001", "label": "Live session opened", "at": _now()},
            {"id": "t2", "sessionId": payload.get("sessionId") or "sess-live-001", "label": "Doctor snapshot loaded", "at": _now()},
            {"id": "t3", "sessionId": payload.get("sessionId") or "sess-live-001", "label": "Resume skeleton available", "at": _now()},
        ]
        return {"ok": True, "data": {"events": events, "count": len(events), "bridge": "live"}}

    if method == "runtimeDashboard.overview":
        return {"ok": True, "data": _live_overview(client)}

    if method == "runtimeDashboard.jobs":
        jobs = [
            {
                "id": "job-live-doctor",
                "name": "Doctor check",
                "status": "completed" if _doctor(client).get("ok") else "failed",
                "progress": 100,
                "startedAt": _now(),
                "finishedAt": _now(),
            }
        ]
        return {"ok": True, "data": {"jobs": jobs, "count": len(jobs), "bridge": "live"}}

    if method == "runtimeDashboard.events":
        events = [
            {
                "id": "ev-live-1",
                "kind": "runtime",
                "title": "Live bridge",
                "detail": "Studio connected to Core",
                "at": _now(),
            }
        ]
        return {"ok": True, "data": {"events": events, "count": len(events), "bridge": "live"}}

    if method == "runtimeDashboard.inspectors":
        return {"ok": True, "data": _live_inspectors(client)}

    if method == "metrics.snapshot":
        return {"ok": True, "data": _live_metrics(client)}

    if method == "metrics.series":
        metrics = _live_metrics(client)
        points = [
            {"label": "plugins", "value": metrics["pluginCount"]},
            {"label": "packages", "value": metrics["packageCount"]},
            {"label": "templates", "value": metrics["templateCount"]},
            {"label": "registry", "value": metrics["registryCount"]},
        ]
        return {"ok": True, "data": {"points": points, "bridge": "live"}}

    if method == "logs.list":
        logs = _live_logs(client)
        return {"ok": True, "data": {"logs": logs, "count": len(logs), "bridge": "live"}}

    if method == "logs.filter":
        logs = _live_logs(client)
        q = str(payload.get("query") or "").lower()
        severity = str(payload.get("severity") or "all")
        filtered = [
            log
            for log in logs
            if (severity == "all" or log["severity"] == severity)
            and (not q or q in str(log["message"]).lower())
        ]
        return {"ok": True, "data": {"logs": filtered, "count": len(filtered), "bridge": "live"}}

    if method == "diagnostics.snapshot":
        return {"ok": True, "data": _live_diagnostics(client)}

    if method in {"timeline.list", "timeline.byKind"}:
        events = [
            {
                "id": "tl-live-1",
                "kind": "runtime",
                "label": "Live Core bridge ready",
                "at": _now(),
            },
            {
                "id": "tl-live-2",
                "kind": "doctor",
                "label": f"Doctor ok={_doctor(client).get('ok')}",
                "at": _now(),
            },
        ]
        kind = str(payload.get("kind") or "")
        if method == "timeline.byKind" and kind:
            events = [e for e in events if e["kind"] == kind]
        return {"ok": True, "data": {"events": events, "count": len(events), "bridge": "live"}}

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
