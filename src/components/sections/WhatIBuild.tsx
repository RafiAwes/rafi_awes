import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Section } from "@/components/layout/Section";
import { ArrowUpRight } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/data/home";

export function WhatIBuild() {
  return (
    <Section surface="light" id="what-i-build" labelledBy="what-i-build-title">
      <SectionHeading
        id="what-i-build-title"
        eyebrow="What I build"
        title="Software for businesses, brands and the people starting them."
        description="Three kinds of work, held to the same standard: understand the problem first, then build something that lasts."
      />

      <ol className="mt-20 border-b border-line md:mt-28">
        {capabilities.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 90} className="border-t border-line">
            <Link
              href={item.href}
              className="group relative grid gap-6 py-10 md:py-14 lg:grid-cols-12 lg:gap-10"
            >
              <span className="eyebrow pt-2 text-fg-subtle lg:col-span-1 lg:pt-4">
                {item.index}
              </span>

              <h3 className="text-display-md font-medium transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 lg:col-span-6">
                {item.title}
              </h3>

              <div className="lg:col-span-5">
                <p className="text-lead text-fg-muted">{item.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${item.title} examples`}>
                  {item.examples.map((example, e) => (
                    <li
                      key={example}
                      className="rounded-full border border-line px-3 py-1 text-sm text-fg-muted transition-[border-color,color] duration-300 group-hover:border-line-strong group-hover:text-fg"
                      style={{ transitionDelay: `${e * 35}ms` } as CSSProperties}
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              <span
                aria-hidden
                className="absolute right-0 top-10 hidden size-12 items-center justify-center rounded-full border border-line transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-fg group-hover:bg-fg group-hover:text-surface md:top-14 lg:flex"
              >
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
              </span>

              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[image:var(--accent-gradient)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </Link>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
