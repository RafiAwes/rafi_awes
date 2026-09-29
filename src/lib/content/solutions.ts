import { solutions } from "@/data/solutions";
import type { Solution, SolutionSlug } from "@/types/solution";
import { getProjectsWhere } from "./projects";

export function getSolutions(): Solution[] {
  return solutions;
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

export function getSolutionHref(solution: Pick<Solution, "slug">): string {
  return `/solutions/${solution.slug}`;
}

export function getProjectsForSolution(slug: SolutionSlug) {
  return getProjectsWhere((project) => project.industries.includes(slug));
}
