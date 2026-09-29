"use client";

import { useRef, type CSSProperties } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface Step {
  index: string;
  title: string;
  description: string;
}

/*
 * The journey is driven by one CSS variable (--progress, 0–1) written on
 * scroll. Each step derives its own state in CSS from its --i, so scrolling
 * never triggers a React render and the page scrolls natively (no pinning).
 *
 * Desktop: horizontal track. Mobile: vertical timeline.
 */
const stepState = {
  // Fades a step in as progress passes its position along the track.
  opacity: "clamp(0.28, calc((var(--progress) * var(--n) - var(--i)) * 1.4 + 0.28), 1)",
} as const;

export function ProcessTimeline({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  useScrollProgress(ref, { start: 0.8, end: 0.95 });

  return (
    <ol
      ref={ref}
      className="relative grid gap-12 pl-10 xl:grid-cols-6 xl:gap-8 xl:pl-0 xl:pt-16"
      style={{ "--progress": 0, "--n": steps.length } as CSSProperties}
    >
      {/* Track + fill (vertical on mobile, horizontal on desktop) */}
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line xl:inset-x-0 xl:bottom-auto xl:top-[5px] xl:h-px xl:w-auto" />
      <span
        aria-hidden
        className="absolute bottom-2 left-[5px] top-2 w-px origin-top scale-y-(--progress) bg-[image:var(--accent-gradient)] xl:inset-x-0 xl:bottom-auto xl:top-[5px] xl:h-px xl:w-auto xl:origin-left xl:scale-x-(--progress) xl:scale-y-100"
      />

      {steps.map((step, i) => (
        <li
          key={step.index}
          className="relative"
          style={{ "--i": i, opacity: stepState.opacity } as CSSProperties}
        >
          <span
            aria-hidden
            className="absolute -left-10 top-1.5 size-[11px] overflow-hidden rounded-full border border-fg/40 bg-surface shadow-[0_0_0_4px_var(--surface)] xl:-top-16 xl:left-0"
          >
            <span
              className="absolute inset-0 bg-[image:var(--accent-gradient)]"
              style={{ opacity: "clamp(0, calc((var(--progress) * var(--n) - var(--i)) * 3), 1)" }}
            />
          </span>
          <p className="eyebrow text-fg-subtle">{step.index}</p>
          <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] xl:text-[1.75rem]">
            {step.title}
          </h3>
          <p className="mt-3 max-w-xs text-fg-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
