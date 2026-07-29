#!/usr/bin/env python3
"""ADF CLI entry point.

Commands: boot, doctor, status, version, context, resume, plugins.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from engine.runtime_engine import RuntimeEngine
from loader.project_loader import ProjectLoader
from plugins.manager import AdfPluginError
from runtime.constants import PACKAGE_NAME, PACKAGE_VERSION
from runtime.exceptions import AdfError


def _print_json(payload: dict[str, Any]) -> None:
    print(json.dumps(payload, indent=2, sort_keys=True))


def _resolve_root(explicit: str | None) -> Path:
    if explicit:
        return Path(explicit).resolve()
    return ProjectLoader.find_root().repo_root


def _add_root(subparser: argparse.ArgumentParser) -> None:
    subparser.add_argument(
        "--root",
        help="ADF repository root (auto-detected when omitted)",
    )


def cmd_version(_: argparse.Namespace) -> int:
    """Print package version."""
    _print_json({"package": PACKAGE_NAME, "version": PACKAGE_VERSION})
    return 0


def cmd_boot(args: argparse.Namespace) -> int:
    """Boot the runtime engine."""
    engine = RuntimeEngine(_resolve_root(args.root))
    report = engine.boot()
    _print_json(report)
    return 0 if report.get("ok") else 1


def cmd_doctor(args: argparse.Namespace) -> int:
    """Run repository health checks."""
    engine = RuntimeEngine(_resolve_root(args.root))
    report = engine.doctor()
    _print_json(report)
    return 0 if report.get("ok") else 1


def cmd_status(args: argparse.Namespace) -> int:
    """Show derived project status."""
    engine = RuntimeEngine(_resolve_root(args.root))
    _print_json(engine.status())
    return 0


def cmd_context(args: argparse.Namespace) -> int:
    """Assemble a context pack."""
    engine = RuntimeEngine(_resolve_root(args.root))
    pack = engine.context.assemble(args.pack)
    _print_json(
        {
            "pack": pack["pack"],
            "summary": pack["summary"],
            "files": list(pack["files"].keys()),
            "missing": pack["missing"],
        }
    )
    return 0


def cmd_resume(args: argparse.Namespace) -> int:
    """Resume protocol skeleton."""
    engine = RuntimeEngine(_resolve_root(args.root))
    state = engine.state.load()
    checkpoint = None
    try:
        checkpoint = engine.checkpoints.restore()
    except AdfError:
        checkpoint = None
    _print_json(
        {
            "message": "Resume skeleton: run full AI Resume Protocol via .adf docs",
            "state": state,
            "checkpoint": checkpoint,
            "plugins": engine.plugins.list(),
        }
    )
    return 0


def cmd_plugins(args: argparse.Namespace) -> int:
    """Plugin CLI skeleton: list|info|enable|disable."""
    engine = RuntimeEngine(_resolve_root(args.root))
    action = args.plugins_command
    if action == "list":
        _print_json({"plugins": engine.plugins.list()})
        return 0
    if action == "info":
        _print_json(engine.plugins.info(args.name))
        return 0
    if action == "enable":
        engine.plugins.enable(args.name)
        _print_json({"enabled": args.name, "ok": True})
        return 0
    if action == "disable":
        engine.plugins.disable(args.name)
        _print_json({"disabled": args.name, "ok": True})
        return 0
    _print_json({"error": f"unknown plugins command: {action}"})
    return 2


def build_parser() -> argparse.ArgumentParser:
    """Create the CLI argument parser."""
    parser = argparse.ArgumentParser(prog="adf", description="ADF Runtime Engine CLI")
    sub = parser.add_subparsers(dest="command", required=True)

    version_parser = sub.add_parser("version", help="Show adf-core version")
    version_parser.set_defaults(func=cmd_version)

    boot_parser = sub.add_parser("boot", help="Boot runtime engine")
    _add_root(boot_parser)
    boot_parser.set_defaults(func=cmd_boot)

    doctor_parser = sub.add_parser("doctor", help="Validate repository layout/SSOT")
    _add_root(doctor_parser)
    doctor_parser.set_defaults(func=cmd_doctor)

    status_parser = sub.add_parser("status", help="Show project status")
    _add_root(status_parser)
    status_parser.set_defaults(func=cmd_status)

    context_parser = sub.add_parser("context", help="Assemble a context pack")
    _add_root(context_parser)
    context_parser.add_argument(
        "--pack",
        default="standard",
        choices=["quick", "standard", "deep"],
        help="Context pack size",
    )
    context_parser.set_defaults(func=cmd_context)

    resume_parser = sub.add_parser("resume", help="Resume skeleton")
    _add_root(resume_parser)
    resume_parser.set_defaults(func=cmd_resume)

    plugins_parser = sub.add_parser("plugins", help="Plugin management skeleton")
    plugins_sub = plugins_parser.add_subparsers(dest="plugins_command", required=True)

    list_parser = plugins_sub.add_parser("list", help="List plugins")
    _add_root(list_parser)
    list_parser.set_defaults(func=cmd_plugins)

    info_parser = plugins_sub.add_parser("info", help="Show plugin info")
    _add_root(info_parser)
    info_parser.add_argument("name", help="Plugin name")
    info_parser.set_defaults(func=cmd_plugins)

    enable_parser = plugins_sub.add_parser("enable", help="Enable plugin (skeleton)")
    _add_root(enable_parser)
    enable_parser.add_argument("name", help="Plugin name")
    enable_parser.set_defaults(func=cmd_plugins)

    disable_parser = plugins_sub.add_parser("disable", help="Disable plugin (skeleton)")
    _add_root(disable_parser)
    disable_parser.add_argument("name", help="Plugin name")
    disable_parser.set_defaults(func=cmd_plugins)

    return parser


def main(argv: list[str] | None = None) -> int:
    """CLI main entry."""
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return int(args.func(args))
    except (AdfError, AdfPluginError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
