import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Adds a short accent rule before the label. */
  rule?: boolean;
}

export function Eyebrow({ children, className, rule = true }: EyebrowProps) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-fg-muted", className)}>
      {rule ? (
        <span
          aria-hidden
          className="h-px w-6 bg-[image:var(--accent-gradient)]"
        />
      ) : null}
      {children}
    </p>
  );
}
