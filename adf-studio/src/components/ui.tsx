import * as React from "react";
import { cn } from "@/utils/cn";

export function Button({
  className,
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline" | "accent";
}) {
  return (
    <button
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50",
        variant === "default" && "bg-ink text-canvas hover:opacity-90",
        variant === "accent" && "bg-accent text-accent-foreground hover:opacity-90",
        variant === "ghost" && "hover:bg-canvas-elevated",
        variant === "outline" && "border border-line bg-transparent hover:bg-canvas-elevated",
        className,
      )}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-lg border border-line bg-canvas-elevated px-3 text-sm outline-none ring-accent placeholder:text-ink-muted focus:ring-2",
        className,
      )}
      {...props}
    />
  );
}

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("studio-panel p-4", className)} {...props} />;
}

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line px-2 py-0.5 text-xs text-ink-muted",
        className,
      )}
      {...props}
    />
  );
}
