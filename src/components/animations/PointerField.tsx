"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface PointerFieldProps {
  children: ReactNode;
  className?: string;
}

/**
 * Tracks the pointer inside its box and exposes it to CSS:
 *   --mx / --my  pointer position in px (for spotlights)
 *   --px / --py  normalised position from -1 to 1 (for parallax)
 * Children style themselves with these variables; nothing re-renders.
 */
export function PointerField({ children, className }: PointerFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!lastEvent) return;
      const rect = el.getBoundingClientRect();
      const x = lastEvent.clientX - rect.left;
      const y = lastEvent.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--px", ((x / rect.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--py", ((y / rect.height) * 2 - 1).toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
