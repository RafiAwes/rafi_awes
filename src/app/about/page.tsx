import type { CSSProperties } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { HeroPortrait } from "@/components/hero/HeroPortrait";
import { PointerField } from "@/components/animations/PointerField";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { TechStack } from "@/components/sections/TechStack";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SplitBlock } from "@/components/ui/SplitBlock";
import { currentFocus, introduction, journey, strengths, workingStyle } from "@/data/about";
import { philosophy } from "@/data/home";
import { getFeaturedProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Rafi Rahman is a software engineer and digital product builder who likes building things that actually get used.",
  path: "/about",
});

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default function AboutPage() {
  const projects = getFeaturedProjects().slice(0, 2);

  return (
    <>
      <PointerField className="surface-dark grain relative isolate overflow-hidden">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_0%,black,transparent)]"
        />
        <div className="container-site grid gap-16 pb-24 pt-[calc(var(--header-height)+5rem)] md:pt-[calc(var(--header-height)+7rem)] lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="animate-rise eyebrow flex items-center gap-3 text-fg-muted" style={delay(0)}>
              <span aria-hidden className="h-px w-8 bg-[image:var(--accent-gradient)]" />
              About
            </p>
            <h1 className="animate-rise mt-8 text-display-xl font-medium" style={delay(100)}>
              I like building things that actually get used.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <HeroPortrait />
          </div>
        </div>
      </PointerField>

      <Section surface="light" labelledBy="intro-title">
        <SplitBlock eyebrow="Introduction" title="Hello, I'm Rafi." id="intro-title">
          <div className="space-y-6 text-lead text-fg-muted [&>p:first-child]:text-fg">
            {introduction.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </SplitBlock>
      </Section>

      <Section surface="dark" labelledBy="philosophy-title">
        <Eyebrow className="mb-6">Engineering philosophy</Eyebrow>
        <h2 id="philosophy-title" className="sr-only">
          Engineering philosophy
        </h2>
        <ol className="grid gap-4">
          {philosophy.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 120} className="grid gap-4 border-t border-line py-10 lg:grid-cols-12">
              <span className="eyebrow pt-3 text-fg-subtle lg:col-span-1">0{i + 1}</span>
              <p className="text-display-md font-medium lg:col-span-6">{item.title}</p>
              <p className="text-lead text-fg-muted lg:col-span-4 lg:col-start-9 lg:pt-2">{item.description}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {journey.length > 0 ? (
        <Section surface="light" labelledBy="journey-title">
          <SplitBlock eyebrow="Journey" title="Career so far" id="journey-title">
            <ol className="border-b border-line">
              {journey.map((entry) => (
                <li key={`${entry.period}-${entry.title}`} className="grid gap-2 border-t border-line py-7 md:grid-cols-[10rem_1fr] md:gap-8">
                  <p className="eyebrow pt-1.5 text-fg-subtle">{entry.period}</p>
                  <div>
                    <p className="text-xl font-medium tracking-[-0.02em]">
                      {entry.title}
                      {entry.organisation ? <span className="text-fg-muted"> · {entry.organisation}</span> : null}
                    </p>
                    <p className="mt-2 text-fg-muted">{entry.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SplitBlock>
        </Section>
      ) : null}

      <Section surface="light-alt" labelledBy="focus-title">
        <div className="grid gap-24">
          <SplitBlock eyebrow="Now" title="Current focus" id="focus-title">
            <FeatureGrid items={currentFocus} columns={3} />
          </SplitBlock>
          <SplitBlock eyebrow="Strengths" title="Where I add the most" id="strengths-title">
            <FeatureGrid items={strengths} />
          </SplitBlock>
          <SplitBlock eyebrow="Working style" title="How I work with people" id="style-title">
            <FeatureGrid items={workingStyle} columns={3} />
          </SplitBlock>
        </div>
      </Section>

      <TechStack />

      <Section surface="light" labelledBy="selected-title">
        <SectionHeading id="selected-title" eyebrow="Selected projects" title="Recent work" />
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} sizes="(min-width: 768px) 50vw, 100vw" />
          ))}
        </div>
      </Section>

      <FinalCta title="Let's build something useful." />
    </>
  );
}
