import { Link } from "react-router-dom";
import { studioConfig } from "@/config/studio";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-testid="auth-layout"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-canvas via-surface to-canvas px-4"
    >
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link to="/" className="font-display text-3xl font-semibold tracking-tight text-ink">
            {studioConfig.name}
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-ink">{title}</h1>
          {subtitle && <p className="studio-muted mt-1 text-sm">{subtitle}</p>}
        </div>
        <div className="rounded-2xl border border-line bg-surface/80 p-6 shadow-sm backdrop-blur">
          {children}
        </div>
        <p className="text-center text-xs text-ink-muted">
          Identity Layer · Better Auth · Core remains authentication-agnostic
        </p>
      </div>
    </div>
  );
}
