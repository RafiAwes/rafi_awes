import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { FinalCta } from "@/components/sections/FinalCta";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProjectBySlug, getProjects, getRelatedProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/metadata";
import { projectSchema } from "@/lib/metadata/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);

  return (
    <>
      <JsonLd data={projectSchema(project)} />
      <PageHero
        eyebrow={project.categories.join(" · ")}
        title={project.title}
        description={project.summary}
      >
        <StatusBadge status={project.status} type={project.type} className="text-fg-muted" />
      </PageHero>

      <div className="surface-dark">
        <div className="container-site">
          <div className="overflow-hidden rounded-[var(--radius-frame)] border border-line">
            <ProjectCover
              project={project}
              className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
              sizes="(min-width: 1440px) 1344px, 100vw"
              priority
            />
          </div>
        </div>
        <div className="container-site py-16 md:py-20">
          <ProjectMeta project={project} />
        </div>
      </div>

      <Section surface="light" spacing="compact">
        {project.caseStudy ? (
          <CaseStudy caseStudy={project.caseStudy} />
        ) : (
          <div className="grid gap-8 border-y border-line py-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Case study</Eyebrow>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="text-display-sm font-medium">The full case study is being written.</p>
              <p className="mt-5 text-lead text-fg-muted">
                Details on the problem, architecture and decisions behind this
                project will be published here. In the meantime, feel free to
                ask about it directly.
              </p>
            </div>
          </div>
        )}
      </Section>

      {related.length > 0 ? (
        <Section surface="light-alt" labelledBy="related-title">
          <Eyebrow className="mb-4">Related</Eyebrow>
          <h2 id="related-title" className="mb-14 text-display-md font-medium">
            More work
          </h2>
          <div className="grid gap-16 md:grid-cols-2 md:gap-10">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} sizes="(min-width: 768px) 50vw, 100vw" />
            ))}
          </div>
        </Section>
      ) : null}

      <FinalCta title="Building something similar?" />
    </>
  );
}
