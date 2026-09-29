"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

const HOLD_MS = 2800;
const EXIT_MS = 560;

interface KineticHeadlineProps {
  phrases: string[];
  className?: string;
}

/**
 * Editorial kinetic typography. Words shared between consecutive phrases stay
 * perfectly still; only the words that change dissolve upward and the new
 * ones resolve from blur, character by character.
 *
 * The animated text is aria-hidden; screen readers get one static sentence.
 */
export function KineticHeadline({ phrases, className }: KineticHeadlineProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hasCycled, setHasCycled] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion || phrases.length < 2) return;

    let inView = true;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    if (ref.current) observer.observe(ref.current);

    let holdTimer: ReturnType<typeof setTimeout>;
    let exitTimer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      holdTimer = setTimeout(() => {
        // Pause while off-screen or in a background tab.
        if (!inView || document.hidden) return schedule();
        setLeaving(true);
        exitTimer = setTimeout(() => {
          setIndex((i) => (i + 1) % phrases.length);
          setLeaving(false);
          setHasCycled(true);
          schedule();
        }, EXIT_MS);
      }, HOLD_MS);
    };

    schedule();
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      observer.disconnect();
    };
  }, [reducedMotion, phrases.length]);

  const words = phrases[index].split(" ");
  const nextWords = phrases[(index + 1) % phrases.length].split(" ");
  const prevWords = phrases[(index - 1 + phrases.length) % phrases.length].split(" ");

  // Which words animate, and where each one's characters start in the stagger.
  const states = words.map((word, w) => {
    const exiting = leaving && nextWords[w] !== word;
    const entering = hasCycled && !leaving && prevWords[w] !== word;
    return { exiting, entering, animated: exiting || entering };
  });
  const startChars = words.map((_, w) =>
    words.slice(0, w).reduce((sum, word, i) => sum + (states[i].animated ? word.length : 0), 0),
  );

  return (
    <span ref={ref} className={cn("block", className)}>
      <span className="sr-only">
        I build digital products, business software, modern web applications
        and AI-powered solutions.
      </span>
      <span aria-hidden className="block">
        {words.map((word, w) => {
          const { exiting, entering, animated } = states[w];
          const startChar = startChars[w];

          return (
            <span key={`${w}-${word}`}>
              <span className="inline-block whitespace-nowrap">
                {word.split("").map((char, c) => (
                  <span
                    key={c}
                    className={cn(
                      "inline-block",
                      exiting && "kinetic-out",
                      entering && "kinetic-in",
                    )}
                    style={animated ? ({ "--ci": startChar + c } as CSSProperties) : undefined}
                  >
                    {char}
                  </span>
                ))}
              </span>
              {w < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
    </span>
  );
}
