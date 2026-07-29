#!/usr/bin/env python3
"""ADF CLI entry point.

Commands: boot, doctor, status, version, context, resume, plugins,
init, new, generate.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from engine.runtime_engine import RuntimeEngine
from generator.filesystem import AdfGeneratorError
from generator.manager import GeneratorManager
from loader.project_loader import ProjectLoader
from plugins.manager import AdfPluginError
from runtime.constants import PACKAGE_NAME, PACKAGE_VERSION
from runtime.exceptions import AdfError
from templates.variables import AdfTemplateError


def _print_json(payload: dict[str, Any]) -> None:
    print(json.dumps(payload, indent=2, sort_keys=True))


def _resolve_root(explicit: str | None) -> Path:
    if explicit:
        return Path(explicit).resolve()
    try:
        return ProjectLoader.find_root().repo_root
    except AdfError:
        return Path.cwd().resolve()


def _add_root(subparser: argparse.ArgumentParser) -> None:
    subparser.add_argument(
        "--root",
        help="ADF repository root (auto-detected when omitted)",
    )


def _generator(args: argparse.Namespace) -> GeneratorManager:
    root = _resolve_root(getattr(args, "root", None))
    engine = RuntimeEngine(root)
    return engine.generator


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


def _gen_flags(args: argparse.Namespace) -> dict[str, Any]:
    return {
        "template": args.template,
        "dry_run": bool(args.dry_run),
        "overwrite": bool(args.overwrite),
        "author": args.author,
        "version": args.project_version,
    }


def cmd_init(args: argparse.Namespace) -> int:
    """Initialize a new ADF project (``adf init``)."""
    manager = _generator(args)
    result = manager.init_project(args.name, args.destination, **_gen_flags(args))
    _print_json(result)
    return 0 if result.get("ok") else 1


def cmd_new(args: argparse.Namespace) -> int:
    """Create a new ADF project (``adf new``)."""
    return cmd_init(args)


def cmd_generate(args: argparse.Namespace) -> int:
    """Generate from an explicit manifest (``adf generate``)."""
    manager = _generator(args)
    manifest = {
        "name": args.name,
        "template": args.template,
        "author": args.author,
        "version": args.project_version,
        "destination": args.destination,
    }
    if getattr(args, "validate_only", False):
        result = manager.validate(manifest)
        _print_json(result)
        return 0 if result.get("ok") else 1
    result = manager.generate(
        manifest,
        dry_run=bool(args.dry_run),
        overwrite=bool(args.overwrite),
    )
    _print_json(result)
    return 0 if result.get("ok") else 1


def cmd_dry_run(args: argparse.Namespace) -> int:
    """Preview generation without writing (``adf dry-run``)."""
    manager = _generator(args)
    manifest = {
        "name": args.name,
        "template": args.template,
        "author": args.author,
        "version": args.project_version,
        "destination": args.destination,
    }
    result = manager.dry_run(manifest)
    _print_json(result)
    return 0 if result.get("ok") else 1


def cmd_validate(args: argparse.Namespace) -> int:
    """Validate generation inputs (``adf validate``)."""
    manager = _generator(args)
    manifest = {
        "name": args.name,
        "template": args.template,
        "author": args.author,
        "version": args.project_version,
        "destination": args.destination,
    }
    result = manager.validate(manifest)
    _print_json(result)
    return 0 if result.get("ok") else 1


def _add_generator_args(parser: argparse.ArgumentParser) -> None:
    _add_root(parser)
    parser.add_argument("name", help="New project name")
    parser.add_argument(
        "--destination",
        default=".",
        help="Parent directory for the new project",
    )
    parser.add_argument(
        "--template",
        default="generic",
        help="Template/project type (default: generic)",
    )
    parser.add_argument(
        "--author",
        default="YoghaLabs",
        help="Author variable for templates",
    )
    parser.add_argument(
        "--project-version",
        default="0.1.0-alpha",
        help="Initial project VERSION value",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Plan generation without writing files",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Allow writing into a non-empty destination",
    )


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

    init_parser = sub.add_parser("init", help="Initialize a new ADF project")
    _add_generator_args(init_parser)
    init_parser.set_defaults(func=cmd_init)

    new_parser = sub.add_parser("new", help="Create a new ADF project")
    _add_generator_args(new_parser)
    new_parser.set_defaults(func=cmd_new)

    generate_parser = sub.add_parser("generate", help="Generate project from manifest options")
    _add_generator_args(generate_parser)
    generate_parser.add_argument(
        "--validate-only",
        action="store_true",
        help="Validate manifest without generating",
    )
    generate_parser.set_defaults(func=cmd_generate)

    dry_run_parser = sub.add_parser("dry-run", help="Preview project generation without writing")
    _add_generator_args(dry_run_parser)
    dry_run_parser.set_defaults(func=cmd_dry_run)

    validate_parser = sub.add_parser("validate", help="Validate generation inputs")
    _add_generator_args(validate_parser)
    validate_parser.set_defaults(func=cmd_validate)

    return parser


def main(argv: list[str] | None = None) -> int:
    """CLI main entry."""
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return int(args.func(args))
    except (AdfError, AdfPluginError, AdfGeneratorError, AdfTemplateError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
