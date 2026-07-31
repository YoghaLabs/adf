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
        "packages.list",
        "packages.search",
        "packages.install",
        "packages.remove",
        "packages.update",
        "packages.verify",
        "marketplace.browse",
        "marketplace.search",
        "marketplace.featured",
        "marketplace.categories",
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
        "sessions.create",
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


def _session_mgr(client: SDKClient):
    from core.session_manager import SessionManager

    client._ensure()  # noqa: SLF001
    engine = client.manager.runtime_engine
    if engine is None:
        client.manager.configure_defaults()
        engine = client.manager.runtime_engine
    if engine is None:
        return SessionManager(client.repo_root)
    return engine.sessions


def _live_overview(client: SDKClient) -> dict[str, Any]:
    from core.session_manager import SessionManager

    doctor = _doctor(client)
    ddata = doctor.get("data") or {}
    version = client.runtime().version().get("data") or {}
    project = _project_item(client)
    profile = _workspace_profile(client)
    healthy = bool(doctor.get("ok"))
    current = _session_mgr(client).current()
    summary = SessionManager.to_studio_summary(current) if current else None
    return {
        "engineStatus": "healthy" if healthy else "degraded",
        "engineBuild": "BUILD-021",
        "packageVersion": version.get("version") or "",
        "currentSessionId": (summary or {}).get("id") or "",
        "currentSessionTitle": (summary or {}).get("title") or "No durable session",
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
    packages = ddata.get("packages") if isinstance(ddata.get("packages"), dict) else {}
    checks = [
        {
            "name": "layout",
            "ok": bool(layout.get("ok")),
            "detail": f"missing={layout.get('missing') or layout.get('missing_dirs') or []}",
        },
        {
            "name": "validation",
            "ok": not bool(ddata.get("validation_errors")),
            "detail": f"errors={len(ddata.get('validation_errors') or [])}",
        },
        {
            "name": "doctor",
            "ok": bool(doctor.get("ok")),
            "detail": "aggregate",
        },
    ]
    return {
        "runtime": {"ok": bool(doctor.get("ok")), "checks": checks},
        "sdk": {
            "ok": True,
            "bridge": "live",
            "clients": [
                "RuntimeDashboardClient",
                "MetricsClient",
                "LogsClient",
                "DiagnosticsClient",
                "TimelineClient",
            ],
        },
        "environment": {
            "node": "n/a (vite+python bridge)",
            "platform": sys.platform,
            "cwd": str(client.repo_root),
        },
        "configuration": {
            "channel": "live",
            "registry": "local",
            "theme": "system",
            "packagesInstalled": int(packages.get("installed_count") or 0),
            "registryCount": int(packages.get("registry_count") or 0),
        },
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
    from core.session_manager import SessionManager

    current = _session_mgr(client).current()
    summary = SessionManager.to_studio_summary(current) if current else None
    session_rows = (
        [
            {
                "id": summary["id"],
                "label": summary["title"],
                "status": summary["status"],
                "meta": project["id"],
            }
        ]
        if summary
        else []
    )
    return {
        "plugins": plugins,
        "packages": packages,
        "knowledge": [{"id": "ssot", "label": ".adf SSOT", "status": "active", "meta": "live"}],
        "context": [{"id": "ctx-live", "label": "Service Layer context", "status": "loaded", "meta": "live"}],
        "session": session_rows,
    }


def _normalize_packages(rows: list[Any], *, featured_ids: set[str] | None = None) -> list[dict[str, Any]]:
    featured_ids = featured_ids or set()
    out: list[dict[str, Any]] = []
    for row in rows:
        if not isinstance(row, dict):
            continue
        pkg_id = str(row.get("id") or "")
        if not pkg_id:
            continue
        out.append(
            {
                "id": pkg_id,
                "name": str(row.get("name") or pkg_id),
                "version": str(row.get("version") or ""),
                "category": str(row.get("type") or row.get("category") or "package"),
                "description": str(row.get("description") or row.get("path") or ""),
                "verified": bool(row.get("verified", True)),
                "featured": pkg_id in featured_ids or bool(row.get("featured", False)),
                "path": row.get("path"),
                "live": True,
            }
        )
    return out


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
        # Studio stores expect fixtures shape: projects (+ tree for explorer/tree).
        data: dict[str, Any] = {
            "projects": [item],
            "count": 1,
            "bridge": "live",
        }
        if method in {"projects.explorer", "projects.tree"}:
            data["tree"] = [item]
            data["items"] = [item]  # backward-compatible alias
        return {"ok": True, "data": data}

    if method == "projects.archived":
        return {"ok": True, "data": {"projects": [], "tree": [], "count": 0, "bridge": "live"}}

    if method in {"packages.listInstalled", "packages.list"}:
        installed = method == "packages.listInstalled" or bool(payload.get("installed"))
        result = client.packages().list(installed=installed)
        data = result.get("data") or {}
        packages = _normalize_packages(list(data.get("packages") or data.get("items") or []))
        return {
            "ok": bool(result.get("ok", True)),
            "data": {
                "count": len(packages),
                "packages": packages,
                "installed": installed,
                "bridge": "live",
            },
            "message": result.get("message") or "",
        }

    if method == "packages.search":
        query = str(payload.get("query") or "")
        package_type = payload.get("package_type") or payload.get("packageType")
        if package_type:
            result = client.packages().search(query, package_type=str(package_type))
        else:
            result = client.packages().search(query)
        data = result.get("data") or {}
        packages = _normalize_packages(list(data.get("packages") or []))
        return {
            "ok": bool(result.get("ok", True)),
            "data": {"count": len(packages), "packages": packages, "bridge": "live"},
            "message": result.get("message") or "",
        }

    if method == "packages.install":
        package_id = str(payload.get("packageId") or payload.get("id") or "").strip()
        if not package_id:
            return {"ok": False, "data": {"bridge": "live"}, "error": "packageId required"}
        overwrite = bool(payload.get("overwrite", False))
        result = client.packages().install(package_id, overwrite=overwrite)
        data = dict(result.get("data") or {})
        data["bridge"] = "live"
        return {
            "ok": bool(result.get("ok", True)),
            "data": data,
            "message": result.get("message") or f"installed {package_id}",
            "error": result.get("error"),
        }

    if method == "packages.remove":
        package_id = str(payload.get("packageId") or payload.get("id") or "").strip()
        if not package_id:
            return {"ok": False, "data": {"bridge": "live"}, "error": "packageId required"}
        result = client.packages().remove(package_id)
        data = dict(result.get("data") or {})
        data["bridge"] = "live"
        return {
            "ok": bool(result.get("ok", True)),
            "data": data,
            "message": result.get("message") or f"removed {package_id}",
            "error": result.get("error"),
        }

    if method == "packages.update":
        package_id = str(payload.get("packageId") or payload.get("id") or "").strip()
        if not package_id:
            return {"ok": False, "data": {"bridge": "live"}, "error": "packageId required"}
        result = client.packages().update(package_id)
        data = dict(result.get("data") or {})
        data["bridge"] = "live"
        return {
            "ok": bool(result.get("ok", True)),
            "data": data,
            "message": result.get("message") or f"updated {package_id}",
            "error": result.get("error"),
        }

    if method == "packages.verify":
        package_id = payload.get("packageId") or payload.get("id")
        result = client.packages().verify(str(package_id) if package_id else None)
        data = dict(result.get("data") or {})
        data["bridge"] = "live"
        return {
            "ok": bool(result.get("ok", True)),
            "data": data,
            "message": result.get("message") or "verify complete",
            "error": result.get("error"),
        }

    if method in {"marketplace.browse", "marketplace.search"}:
        query = str(payload.get("query") or "")
        if method == "marketplace.search" and query:
            result = client.packages().search(query)
        else:
            result = client.packages().list(installed=False)
        data = result.get("data") or {}
        items = _normalize_packages(
            list(data.get("packages") or []),
            featured_ids={"demo-core", "demo-template"},
        )
        return {
            "ok": True,
            "data": {"items": items, "count": len(items), "bridge": "live"},
        }

    if method == "marketplace.featured":
        result = client.packages().list(installed=False)
        data = result.get("data") or {}
        items = _normalize_packages(
            list(data.get("packages") or []),
            featured_ids={"demo-core", "demo-template"},
        )
        featured = [i for i in items if i.get("featured")] or items[:2]
        return {
            "ok": True,
            "data": {"title": "Featured (live registry)", "items": featured, "bridge": "live"},
        }

    if method == "marketplace.categories":
        result = client.packages().list(installed=False)
        data = result.get("data") or {}
        items = _normalize_packages(list(data.get("packages") or []))
        counts: dict[str, int] = {}
        for item in items:
            cat = str(item.get("category") or "package")
            counts[cat] = counts.get(cat, 0) + 1
        categories = [{"id": k, "label": k, "count": v} for k, v in sorted(counts.items())]
        return {"ok": True, "data": {"categories": categories, "bridge": "live"}}

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
        from core.session_manager import SessionManager

        mgr = _session_mgr(client)
        include_closed = method != "sessions.recent"
        rows = mgr.list(include_closed=include_closed)
        if method == "sessions.recent":
            rows = rows[:10]
        workspace_id = payload.get("workspaceId")
        summaries = []
        for row in rows:
            summary = SessionManager.to_studio_summary(row)
            if workspace_id and summary["workspaceId"] != workspace_id:
                continue
            summaries.append(summary)
        return {
            "ok": True,
            "data": {"sessions": summaries, "count": len(summaries), "bridge": "live", "durable": True},
        }

    if method == "sessions.current":
        from core.session_manager import SessionManager

        current = _session_mgr(client).current()
        summary = SessionManager.to_studio_summary(current) if current else None
        return {"ok": True, "data": {"session": summary, "bridge": "live", "durable": True}}

    if method == "sessions.create":
        from core.session_manager import SessionManager
        from runtime.constants import ENGINE_BUILD

        mgr = _session_mgr(client)
        created = mgr.create(
            build=str(payload.get("build") or ENGINE_BUILD),
            title=str(payload.get("title") or "") or None,
            project_id=str(payload.get("projectId") or "adf"),
            workspace_id=str(payload.get("workspaceId") or "ws-live"),
        )
        return {
            "ok": True,
            "data": {"session": SessionManager.to_studio_summary(created), "bridge": "live", "durable": True},
            "message": "durable session created",
        }

    if method == "sessions.resume":
        from core.session_manager import SessionManager

        session_id = str(payload.get("sessionId") or "").strip()
        if not session_id:
            return {"ok": False, "data": {"bridge": "live"}, "error": "sessionId required"}
        mgr = _session_mgr(client)
        restored = mgr.restore(session_id)
        # Also surface Core resume skeleton alongside durable pointer.
        core_resume = client.runtime().resume()
        return {
            "ok": True,
            "data": {
                "session": SessionManager.to_studio_summary(restored),
                "resume": core_resume.get("data") or {},
                "bridge": "live",
                "durable": True,
            },
            "message": "durable session resumed",
        }

    if method == "sessions.close":
        from core.session_manager import SessionManager

        session_id = str(payload.get("sessionId") or "").strip()
        if not session_id:
            return {"ok": False, "data": {"bridge": "live"}, "error": "sessionId required"}
        closed = _session_mgr(client).close(session_id)
        return {
            "ok": True,
            "data": {"session": SessionManager.to_studio_summary(closed), "closed": True, "bridge": "live", "durable": True},
            "message": "durable session closed",
        }

    if method == "sessions.timeline":
        session_id = str(payload.get("sessionId") or "").strip()
        if not session_id:
            return {"ok": False, "data": {"bridge": "live"}, "error": "sessionId required"}
        events = _session_mgr(client).timeline(session_id)
        return {"ok": True, "data": {"events": events, "count": len(events), "bridge": "live", "durable": True}}

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
                "category": "runtime",
                "name": "bridge.ready",
                "detail": "Studio connected to Core",
                "at": _now(),
            },
            {
                "id": "ev-live-2",
                "category": "session",
                "name": "session.current",
                "detail": str((_live_overview(client).get("currentSessionId") or "")),
                "at": _now(),
            },
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
        doctor_ok = bool(_doctor(client).get("ok"))
        events = [
            {
                "id": "tl-live-1",
                "kind": "runtime",
                "title": "Live Core bridge ready",
                "detail": "studio_bridge -> SDKClient",
                "at": _now(),
            },
            {
                "id": "tl-live-2",
                "kind": "runtime",
                "title": "Doctor check",
                "detail": f"ok={doctor_ok}",
                "at": _now(),
            },
            {
                "id": "tl-live-3",
                "kind": "session",
                "title": "Durable session",
                "detail": str((_live_overview(client).get("currentSessionId") or "none")),
                "at": _now(),
            },
        ]
        kind = str(payload.get("kind") or "")
        if method == "timeline.byKind" and kind and kind != "all":
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
