import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { ArrowUpRight } from "@/components/ui/Icons";
import { SplitBlock } from "@/components/ui/SplitBlock";
import { getServiceHref, getServicesBySlugs } from "@/lib/content/services";
import { getProjectsForSolution, getSolutionBySlug, getSolutions } from "@/lib/content/solutions";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSolutions().map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata(props: PageProps<"/solutions/[slug]">) {
  const { slug } = await props.params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return buildMetadata({
    title: `Software for ${solution.title}`,
    description: solution.summary,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage(props: PageProps<"/solutions/[slug]">) {
  const { slug } = await props.params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const services = getServicesBySlugs(solution.services);
  const work = getProjectsForSolution(solution.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={`Solutions · ${solution.title}`}
        title={
          <>
            {solution.formula.map((part, i) => (
              <Fragment key={part}>
                {i > 0 ? <span className="text-gradient"> + </span> : null}
                {part}
              </Fragment>
            ))}
          </>
        }
        description={solution.summary}
      />

      <Section surface="light" labelledBy="challenges-title">
        <SplitBlock eyebrow="Common challenges" title="What usually goes wrong" id="challenges-title">
          <ul>
            {solution.challenges.map((challenge, i) => (
              <li key={challenge} className="flex gap-6 border-t border-line py-5 text-lead last:border-b">
                <span className="eyebrow pt-2 text-fg-subtle">0{i + 1}</span>
                {challenge}
              </li>
            ))}
          </ul>
        </SplitBlock>
      </Section>

      <Section surface="light-alt" labelledBy="modules-title">
        <SplitBlock eyebrow="The system" title="What gets built" id="modules-title">
          <FeatureGrid items={solution.modules} numbered />
        </SplitBlock>
      </Section>

      <Section surface="light" labelledBy="services-title">
        <SplitBlock eyebrow="Services" title="How I can help" id="services-title">
          <ul className="border-b border-line">
            {services.map((service) => (
              <li key={service.slug} className="border-t border-line">
                <Link href={getServiceHref(service)} className="group flex items-center justify-between gap-6 py-6">
                  <span>
                    <span className="block text-xl font-medium tracking-[-0.02em]">{service.title}</span>
                    <span className="mt-1 block text-fg-muted">{service.summary}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-fg-subtle transition-all duration-500 group-hover:rotate-45 group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ul>
        </SplitBlock>
      </Section>

      {work.length > 0 ? (
        <Section surface="light-alt" labelledBy="work-title">
          <SplitBlock eyebrow="Relevant work" title="Related projects" id="work-title">
            <div className="grid gap-14 md:grid-cols-2 md:gap-8">
              {work.map((project) => (
                <ProjectCard key={project.slug} project={project} sizes="(min-width: 1024px) 30vw, 100vw" />
              ))}
            </div>
          </SplitBlock>
        </Section>
      ) : null}

      <FinalCta />
    </>
  );
}
