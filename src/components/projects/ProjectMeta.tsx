import { projectStatusLabel, projectTypeLabel } from "@/lib/content/projects";
import type { Project } from "@/types/project";

/** Key facts about a project. Unconfirmed fields are omitted, never guessed. */
export function ProjectMeta({ project }: { project: Project }) {
  const items: Array<{ label: string; value: string }> = [
    { label: "Role", value: project.role },
    { label: "Type", value: projectTypeLabel[project.type] },
    { label: "Status", value: projectStatusLabel[project.status] },
    ...(project.year ? [{ label: "Year", value: project.year }] : []),
  ];

  return (
    <dl className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-surface p-6">
          <dt className="eyebrow text-fg-subtle">{item.label}</dt>
          <dd className="mt-3 text-fg">{item.value}</dd>
        </div>
      ))}
      <div className="bg-surface p-6 sm:col-span-2 lg:col-span-4">
        <dt className="eyebrow text-fg-subtle">Stack</dt>
        <dd className="mt-3">
          {project.technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-3 py-1 text-sm text-fg-muted">
                  {tech}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-fg-muted">Details coming soon.</span>
          )}
        </dd>
      </div>
    </dl>
  );
}
