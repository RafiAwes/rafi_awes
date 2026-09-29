import { projects } from "@/data/projects";
import type { Project, ProjectStatus, ProjectType } from "@/types/project";

/*
 * Content access layer for projects. Pages call these functions rather than
 * importing data directly, so the source can move to a CMS without touching
 * any page or component.
 */

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectHref(project: Pick<Project, "slug">): string {
  return `/work/${project.slug}`;
}

export function getRelatedProjects(project: Project, limit = 2): Project[] {
  const explicit = (project.related ?? [])
    .map(getProjectBySlug)
    .filter((p): p is Project => Boolean(p));

  const byService = projects.filter(
    (p) =>
      p.slug !== project.slug &&
      !explicit.includes(p) &&
      p.services.some((s) => project.services.includes(s)),
  );

  return [...explicit, ...byService].slice(0, limit);
}

export function getProjectsWhere(
  predicate: (project: Project) => boolean,
): Project[] {
  return projects.filter(predicate);
}

export const projectStatusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In Development",
  prototype: "Prototype",
  concept: "Concept",
};

export const projectTypeLabel: Record<ProjectType, string> = {
  client: "Client Project",
  personal: "Personal Project",
  startup: "Startup Project",
};
