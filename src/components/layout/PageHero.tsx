import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Larger display type for index pages; smaller for detail pages. */
  size?: "xl" | "lg";
  className?: string;
}

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * Dark opening band shared by every internal page, so the transparent header
 * always sits on a dark surface. Uses load animations (not scroll reveals)
 * because it is always above the fold.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  size = "xl",
  className,
}: PageHeroProps) {
  return (
    <section className={cn("surface-dark grain relative isolate overflow-hidden", className)}>
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/2 -z-10 size-[60vw] rounded-full bg-accent-blue/10 blur-[140px]"
      />
      <div className="container-site pb-20 pt-[calc(var(--header-height)+5rem)] md:pb-28 md:pt-[calc(var(--header-height)+7rem)]">
        <p className="animate-rise eyebrow flex items-center gap-3 text-fg-muted" style={delay(0)}>
          <span aria-hidden className="h-px w-8 bg-[image:var(--accent-gradient)]" />
          {eyebrow}
        </p>
        <h1
          className={cn(
            "animate-rise mt-8 max-w-5xl font-medium",
            size === "xl" ? "text-display-xl" : "text-display-lg",
          )}
          style={delay(100)}
        >
          {title}
        </h1>
        {description ? (
          <div className="animate-rise mt-8 max-w-2xl text-lead text-fg-muted" style={delay(220)}>
            {description}
          </div>
        ) : null}
        {children ? (
          <div className="animate-rise mt-12" style={delay(340)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
