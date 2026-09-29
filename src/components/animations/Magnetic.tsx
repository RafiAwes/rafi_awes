"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface MagneticProps {
  children: ReactNode;
  /** Fraction of the pointer offset the content follows. Keep it small. */
  strength?: number;
  className?: string;
}

const canAnimate = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Lets its content drift slightly toward the pointer. Desktop only. */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || !canAnimate()) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "inline-flex transition-transform duration-500 ease-[var(--ease-out-expo)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
