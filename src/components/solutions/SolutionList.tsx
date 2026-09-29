import Link from "next/link";
import { Fragment } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { getSolutionHref } from "@/lib/content/solutions";
import type { Solution } from "@/types/solution";

/**
 * Industries as large typographic rows. Each row pairs the industry with the
 * system it typically needs, expressed as a formula (Booking + CRM + ...).
 */
export function SolutionList({ solutions }: { solutions: Solution[] }) {
  return (
    <ul className="border-b border-line">
      {solutions.map((solution, i) => (
        <Reveal as="li" key={solution.slug} delay={i * 60} className="border-t border-line">
          <Link
            href={getSolutionHref(solution)}
            className="group grid items-baseline gap-3 py-8 transition-colors md:grid-cols-12 md:gap-8 md:py-10"
          >
            <h3 className="text-[clamp(1.75rem,3.4vw,3rem)] font-medium tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:col-span-5">
              {solution.title}
            </h3>
            <p className="text-fg-muted md:col-span-6">
              {solution.formula.map((part, p) => (
                <Fragment key={part}>
                  {p > 0 ? <span className="mx-2 text-accent">+</span> : null}
                  <span className="transition-colors group-hover:text-fg">{part}</span>
                </Fragment>
              ))}
              <span className="mt-2 block max-w-lg text-sm text-fg-subtle md:mt-3">
                {solution.summary}
              </span>
            </p>
            <span aria-hidden className="hidden justify-self-end md:col-span-1 md:flex">
              <ArrowUpRight className="size-5 text-fg-subtle transition-all duration-500 group-hover:rotate-45 group-hover:text-fg" />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
