import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type Surface = "dark" | "darker" | "light" | "light-alt";

const surfaceClass: Record<Surface, string> = {
  dark: "surface-dark",
  darker: "surface-darker",
  light: "surface-light",
  "light-alt": "surface-light-alt",
};

interface SectionProps {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  labelledBy?: string;
  className?: string;
  /** Wrap children in the standard site container. */
  contained?: boolean;
  spacing?: "default" | "compact" | "none";
}

const spacingClass = {
  default: "py-24 md:py-32 lg:py-40",
  compact: "py-16 md:py-24",
  none: "",
};

/** Page section with a surface (dark/light) and consistent vertical rhythm. */
export function Section({
  children,
  surface = "light",
  id,
  labelledBy,
  className,
  contained = true,
  spacing = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative",
        surfaceClass[surface],
        spacingClass[spacing],
        className,
      )}
    >
      {contained ? <div className="container-site">{children}</div> : children}
    </section>
  );
}
