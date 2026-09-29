"use client";

import { useCallback, type CSSProperties, type ReactNode } from "react";

export type RevealVariant = "fade" | "blur" | "mask" | "words" | "line";

type RevealTag = "div" | "section" | "article" | "li" | "span" | "p" | "header" | "figure" | "h2" | "h3";

interface RevealProps {
  as?: RevealTag;
  variant?: RevealVariant;
  /** Delay in milliseconds — use for small staggers (multiples of ~80ms). */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/*
 * One IntersectionObserver is shared by every Reveal on the page. Visibility
 * is written as a data attribute, so revealing an element never re-renders
 * React; the transition itself lives in globals.css.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  return sharedObserver;
}

export function Reveal({
  as: Tag = "div",
  variant = "fade",
  delay = 0,
  className,
  style,
  children,
}: RevealProps) {
  const observe = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <Tag
      ref={observe}
      className={className}
      data-reveal={variant}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}
