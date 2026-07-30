declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react";

  export type LucideProps = SVGProps<SVGSVGElement> & {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  };

  export type LucideIcon = ComponentType<LucideProps>;

  /** Permissive icon map for RC1 — package ships runtime exports; types vary by bundler resolution. */
  export const Boxes: LucideIcon;
  export const Bell: LucideIcon;
  export const Building2: LucideIcon;
  export const CircuitBoard: LucideIcon;
  export const Command: LucideIcon;
  export const Compass: LucideIcon;
  export const FolderKanban: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const Library: LucideIcon;
  export const Network: LucideIcon;
  export const Package: LucideIcon;
  export const PanelLeft: LucideIcon;
  export const Puzzle: LucideIcon;
  export const Rocket: LucideIcon;
  export const Search: LucideIcon;
  export const Settings: LucideIcon;
  export const Timer: LucideIcon;
  export const Users: LucideIcon;
  export const Workflow: LucideIcon;
}
