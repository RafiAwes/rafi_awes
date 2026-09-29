import { projectStatusLabel, projectTypeLabel } from "@/lib/content/projects";
import { cn } from "@/lib/utils/cn";
import type { ProjectStatus, ProjectType } from "@/types/project";

const dotColor: Record<ProjectStatus, string> = {
  live: "bg-emerald-400",
  "in-development": "bg-amber-300",
  prototype: "bg-sky-300",
  concept: "bg-zinc-400",
};

interface StatusBadgeProps {
  status: ProjectStatus;
  type?: ProjectType;
  className?: string;
}

/** Honest project status label — always shown alongside project work. */
export function StatusBadge({ status, type, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 rounded-full border border-current/15 bg-current/[0.04] px-3 py-1.5 tracking-[0.14em]",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", dotColor[status])} />
      {projectStatusLabel[status]}
      {type ? (
        <>
          <span aria-hidden className="opacity-40">
            /
          </span>
          {projectTypeLabel[type]}
        </>
      ) : null}
    </span>
  );
}
