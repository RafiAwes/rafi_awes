import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { Process } from "@/components/sections/Process";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { SplitBlock } from "@/components/ui/SplitBlock";
import { TagList } from "@/components/ui/TagList";
import { getProjectsForService, getServiceBySlug, getServices } from "@/lib/content/services";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const work = getProjectsForService(service.slug).slice(0, 2);

  return (
    <>
      <PageHero eyebrow={`Services · ${service.title}`} title={service.headline} description={service.summary}>
        <ButtonLink href="/contact" arrow="up-right" magnetic>
          Discuss your project
        </ButtonLink>
      </PageHero>

      <Section surface="light" labelledBy="problem-title">
        <div className="grid gap-24">
          <SplitBlock eyebrow="The problem" title="Why this matters" id="problem-title">
            <div className="space-y-5 text-lead text-fg-muted">
              {service.problem.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </SplitBlock>
          <SplitBlock eyebrow="The approach" title="How I solve it" id="solution-title">
            <div className="space-y-5 text-lead text-fg">
              {service.solution.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </SplitBlock>
        </div>
      </Section>

      <Section surface="light-alt" labelledBy="capabilities-title">
        <SplitBlock eyebrow="Capabilities" title="What's included" id="capabilities-title">
          <FeatureGrid items={service.capabilities} />
        </SplitBlock>
      </Section>

      <Process />

      <Section surface="light" labelledBy="tech-title">
        <SplitBlock eyebrow="Technology" title="Typical stack" id="tech-title">
          <TagList items={service.technologies} label="Technologies" size="lg" />
          <p className="mt-6 text-fg-muted">
            The final stack depends on your requirements, your team and what
            you already run.
          </p>
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

      {service.faqs.length > 0 ? (
        <Section surface="light" labelledBy="faq-title">
          <SplitBlock eyebrow="FAQ" title="Common questions" id="faq-title">
            <FaqList faqs={service.faqs} />
          </SplitBlock>
        </Section>
      ) : null}

      <FinalCta />
    </>
  );
}
