import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { FinalCta } from "@/components/sections/FinalCta";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Selected projects by Rafi Rahman — business software, booking platforms, digital products and websites, each labelled with its real status.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getProjects();

  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Products, platforms and experiments."
        description="A mix of startup products, business systems and web experiences. Every project states honestly whether it is live, in development or a prototype."
      />

      <Section surface="light" labelledBy="gallery-title">
        <h2 id="gallery-title" className="sr-only">
          Project gallery
        </h2>
        <ProjectGallery projects={projects} />
      </Section>

      <Section surface="light-alt" spacing="compact" labelledBy="index-title">
        <Eyebrow className="mb-4">Index</Eyebrow>
        <h2 id="index-title" className="mb-12 text-display-sm font-medium">
          All projects at a glance
        </h2>
        <div className="relative">
          <ProjectIndex projects={projects} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
