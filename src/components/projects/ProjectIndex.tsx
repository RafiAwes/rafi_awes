import Link from "next/link";
import {
  getProjectHref,
  projectStatusLabel,
  projectTypeLabel,
} from "@/lib/content/projects";
import type { Project } from "@/types/project";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Compact, scannable index of every project — useful for recruiters. */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">All projects with category, type and status</caption>
        <thead>
          <tr className="eyebrow text-fg-subtle">
            <th scope="col" className="pb-4 font-normal">Project</th>
            <th scope="col" className="pb-4 font-normal">Category</th>
            <th scope="col" className="pb-4 font-normal">Type</th>
            <th scope="col" className="pb-4 font-normal">Status</th>
            <th scope="col" className="pb-4 font-normal">
              <span className="sr-only">Link</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.slug} className="group relative border-t border-line transition-colors hover:bg-fg/[0.03]">
              <th scope="row" className="py-5 pr-6 font-medium">
                <Link href={getProjectHref(project)} className="text-lg tracking-[-0.02em] after:absolute after:inset-0">
                  {project.title}
                </Link>
              </th>
              <td className="py-5 pr-6 text-fg-muted">{project.categories.slice(0, 2).join(" · ")}</td>
              <td className="py-5 pr-6 text-fg-muted">{projectTypeLabel[project.type]}</td>
              <td className="py-5 pr-6 text-fg-muted">{projectStatusLabel[project.status]}</td>
              <td className="py-5 text-right">
                <ArrowUpRight className="ml-auto size-4 text-fg-subtle transition-all duration-500 group-hover:rotate-45 group-hover:text-fg" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
