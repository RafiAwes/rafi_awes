import Link from "next/link";
import { getProjectHref } from "@/lib/content/projects";
import { cn } from "@/lib/utils/cn";
import type { Project } from "@/types/project";
import { ArrowUpRight } from "@/components/ui/Icons";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProjectCover } from "./ProjectCover";

interface ProjectCardProps {
  project: Project;
  /** Tailwind aspect-ratio class for the visual, e.g. "aspect-[16/10]". */
  aspect?: string;
  size?: "default" | "large";
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Editorial project card. On hover the visual scales, the title shifts and a
 * case-study indicator appears; the whole card is one link.
 */
export function ProjectCard({
  project,
  aspect = "aspect-[4/3]",
  size = "default",
  sizes,
  priority,
  className,
}: ProjectCardProps) {
  return (
    <article className={cn("group relative", className)}>
      <Link href={getProjectHref(project)} className="block rounded-[var(--radius-frame)]">
        <div className="relative overflow-hidden rounded-[var(--radius-frame)] border border-line">
          <ProjectCover project={project} className={aspect} sizes={sizes} priority={priority} />
          <span
            aria-hidden
            className="absolute right-4 top-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-chalk text-graphite opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow text-fg-subtle">{project.categories.join(" · ")}</p>
            <h3
              className={cn(
                "mt-3 font-medium tracking-[-0.03em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1",
                size === "large" ? "text-display-sm" : "text-2xl",
              )}
            >
              {project.title}
            </h3>
            <p
              className={cn(
                "mt-3 max-w-xl text-fg-muted",
                size === "large" ? "text-lead" : "text-[0.95rem] leading-relaxed",
              )}
            >
              {project.summary}
            </p>
          </div>
          <StatusBadge status={project.status} className="shrink-0 text-fg-muted" />
        </div>
      </Link>
    </article>
  );
}
