"use client";

import Link from "next/link";
import { Fragment, useState, type CSSProperties, type PointerEvent } from "react";
import type { ProblemPrompt } from "@/data/home";
import { ArrowRight, PlusIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils/cn";

/**
 * Problem → solution explorer.
 *
 * One DOM serves every breakpoint: each problem is a disclosure button
 * followed by its solution region. On mobile the region opens inline under
 * the tapped problem; on desktop CSS grid places every region into the same
 * right-hand cell, so hovering or focusing a problem swaps the panel.
 */
export function ProblemSolver({ problems }: { problems: ProblemPrompt[] }) {
  const [active, setActive] = useState(0);

  const onPointerEnter = (i: number) => (event: PointerEvent) => {
    if (event.pointerType === "mouse") setActive(i);
  };

  return (
    <div
      className="grid lg:grid-cols-12 lg:gap-x-16 lg:[grid-template-rows:repeat(var(--rows),auto)]"
      style={{ "--rows": problems.length } as CSSProperties}
    >
      {/* Desktop visual backdrop for the solution panel */}
      <div
        aria-hidden
        className="surface-dark relative hidden overflow-hidden rounded-[var(--radius-frame)] lg:col-span-5 lg:col-start-8 lg:block lg:[grid-row:1/-1]"
      >
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div
          className="absolute size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(91_124_255/0.45),rgb(155_123_255/0.2)_50%,transparent)] blur-2xl transition-transform duration-[1.2s] ease-[var(--ease-out-expo)]"
          style={{
            transform: `translate3d(${20 + (active % 2) * 30}%, ${active * 14 - 10}%, 0)`,
          }}
        />
        <span className="absolute -bottom-8 right-6 text-[12rem] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(245_245_242/0.12)]">
          0{active + 1}
        </span>
      </div>

      {problems.map((item, i) => {
        const open = active === i;
        return (
          <Fragment key={item.problem}>
            <h3
              className="border-t border-line lg:col-span-6 lg:col-start-1 lg:[grid-row:var(--row)] last-of-type:border-b"
              style={{ "--row": i + 1 } as CSSProperties}
            >
              <button
                type="button"
                id={`problem-${i}`}
                aria-expanded={open}
                aria-controls={`solution-${i}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onPointerEnter={onPointerEnter(i)}
                className="group flex w-full items-start gap-5 py-7 text-left lg:py-9"
              >
                <span className="eyebrow pt-2.5 text-fg-subtle">0{i + 1}</span>
                <span
                  className={cn(
                    "flex-1 text-[clamp(1.375rem,2.3vw,2rem)] font-medium leading-[1.2] tracking-[-0.03em] transition-colors duration-500",
                    open ? "text-fg" : "text-fg-subtle group-hover:text-fg-muted",
                  )}
                >
                  &ldquo;{item.problem}&rdquo;
                </span>
                <PlusIcon
                  aria-hidden
                  className={cn(
                    "mt-2 size-5 shrink-0 transition-transform duration-500 lg:hidden",
                    open && "rotate-45",
                  )}
                />
              </button>
            </h3>

            <div
              id={`solution-${i}`}
              role="region"
              aria-labelledby={`problem-${i}`}
              hidden={!open}
              className="panel-enter pb-10 pl-10 lg:surface-dark lg:relative lg:z-10 lg:col-span-5 lg:col-start-8 lg:self-end lg:bg-transparent! lg:p-10 lg:[grid-row:1/-1] xl:p-12"
            >
              <p className="eyebrow text-accent">Solution</p>
              <p className="mt-4 text-display-sm font-medium">{item.answer}</p>
              <p className="mt-5 max-w-md text-fg-muted">{item.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="What gets built">
                {item.builds.map((build) => (
                  <li
                    key={build}
                    className="rounded-full border border-line-strong px-3 py-1 text-sm text-fg-muted"
                  >
                    {build}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${item.service}`}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
              >
                Explore {item.answer}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
