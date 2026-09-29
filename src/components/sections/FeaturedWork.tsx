import { Section } from "@/components/layout/Section";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProjects } from "@/lib/content/projects";

export function FeaturedWork() {
  const projects = getFeaturedProjects();

  return (
    <Section surface="dark" id="work" labelledBy="work-title" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 size-[50vw] rounded-full bg-accent-violet/10 blur-[140px]"
      />
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title="Things I've built — and am building."
        size="xl"
        description="Every project carries its real status. Some are live, some are still in progress, and each one is labelled that way."
        action={
          <ButtonLink href="/work" variant="secondary">
            View all work
          </ButtonLink>
        }
      />
      <div className="mt-20 md:mt-28">
        <ProjectGallery projects={projects} />
      </div>
    </Section>
  );
}
