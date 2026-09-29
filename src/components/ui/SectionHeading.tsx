import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { RevealText } from "@/components/animations/RevealText";
import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  id?: string;
  size?: "lg" | "xl";
  className?: string;
}

/**
 * Standard section opener: label, headline and optional supporting copy or
 * action. The headline is the section's accessible name (pass `id` and use
 * it for aria-labelledby on the section).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  id,
  size = "lg",
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "grid gap-8 lg:grid-cols-12 lg:items-end",
        className,
      )}
    >
      <div className="lg:col-span-8">
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <div id={id}>
          <RevealText
            text={title}
            className={cn(
              "font-medium",
              size === "xl" ? "text-display-xl" : "text-display-lg",
            )}
          />
        </div>
      </div>
      {description || action ? (
        <Reveal
          delay={200}
          className="flex flex-col items-start gap-6 lg:col-span-4 lg:pb-2"
        >
          {description ? (
            <div className="text-lead text-fg-muted">{description}</div>
          ) : null}
          {action}
        </Reveal>
      ) : null}
    </header>
  );
}
