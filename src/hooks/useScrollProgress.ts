"use client";

import { useEffect, type RefObject } from "react";

interface ScrollProgressOptions {
  /**
   * "element": progress of the element travelling through the viewport.
   * "document": overall page scroll progress.
   */
  mode?: "element" | "document";
  /** Viewport fraction where the element's top sits when progress is 0. */
  start?: number;
  /** Viewport fraction where the element's bottom sits when progress is 1. */
  end?: number;
}

/**
 * Writes scroll progress (0–1) to the `--progress` custom property on the
 * target element. Writing a CSS variable instead of React state keeps scroll
 * handling off the render path entirely.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { mode = "element", start = 0.85, end = 0.85 }: ScrollProgressOptions = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      let progress: number;
      if (mode === "document") {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress = max > 0 ? window.scrollY / max : 0;
      } else {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const from = vh * start; // rect.top at progress 0
        const to = vh * end - rect.height; // rect.top at progress 1
        progress = from === to ? 1 : (from - rect.top) / (from - to);
      }
      el.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, mode, start, end]);
}
