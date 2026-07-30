import { GraphViewer } from "@/features/visual/components/GraphViewer";

export function KnowledgeGraphPage() {
  return <GraphViewer initialKind="knowledge" title="Knowledge Graph" testId="page-graph-knowledge" />;
}

export function DependencyGraphPage() {
  return <GraphViewer initialKind="dependency" title="Dependency Graph" testId="page-graph-dependency" />;
}

export function ProjectGraphPage() {
  return <GraphViewer initialKind="project" title="Project Graph" testId="page-graph-project" />;
}

export function WorkspaceGraphPage() {
  return <GraphViewer initialKind="workspace" title="Workspace Graph" testId="page-graph-workspace" />;
}

export function ContextGraphPage() {
  return <GraphViewer initialKind="context" title="Context Graph" testId="page-graph-context" />;
}

export function SessionGraphPage() {
  return <GraphViewer initialKind="session" title="Session Graph" testId="page-graph-session" />;
}

export function RuntimeGraphPage() {
  return <GraphViewer initialKind="runtime" title="Runtime Graph" testId="page-graph-runtime" />;
}

export function PackageGraphPage() {
  return <GraphViewer initialKind="package" title="Package Graph" testId="page-graph-package" />;
}

export function PluginGraphPage() {
  return <GraphViewer initialKind="plugin" title="Plugin Graph" testId="page-graph-plugin" />;
}

export function ReleaseGraphPage() {
  return <GraphViewer initialKind="release" title="Release Graph" testId="page-graph-release" />;
}
