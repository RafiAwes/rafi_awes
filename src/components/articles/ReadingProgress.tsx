"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/** Thin page-level reading progress bar. Scroll-linked, not animated. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, { mode: "document" });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
    >
      <div className="h-full origin-left scale-x-(--progress) bg-[image:var(--accent-gradient)]" />
    </div>
  );
}
