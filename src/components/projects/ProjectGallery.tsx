import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils/cn";
import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

/*
 * Asymmetric editorial rhythm. The first project is a full-width feature;
 * the rest alternate wide/narrow with a vertical offset, so no two rows
 * look the same and the grid never reads as a template.
 */
const layout = [
  { span: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-32" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "" },
  { span: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "lg:mt-24" },
] as const;

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [feature, ...rest] = projects;
  if (!feature) return null;

  return (
    <div className="grid gap-x-10 gap-y-20 md:gap-y-28 lg:grid-cols-12">
      <Reveal variant="mask" className="lg:col-span-12">
        <ProjectCard
          project={feature}
          size="large"
          aspect="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/10]"
          sizes="(min-width: 1440px) 1344px, 100vw"
        />
      </Reveal>

      {rest.map((project, i) => {
        const slot = layout[i % layout.length];
        return (
          <Reveal
            key={project.slug}
            variant="mask"
            className={cn(slot.span, slot.offset)}
          >
            <ProjectCard
              project={project}
              aspect={slot.aspect}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        );
      })}
    </div>
  );
}
