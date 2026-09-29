import { services } from "@/data/services";
import type { Service, ServiceSlug } from "@/types/service";
import { getProjectsWhere } from "./projects";

export function getServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesBySlugs(slugs: ServiceSlug[]): Service[] {
  return slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));
}

export function getServiceHref(service: Pick<Service, "slug">): string {
  return `/services/${service.slug}`;
}

export function getProjectsForService(slug: ServiceSlug) {
  return getProjectsWhere((project) => project.services.includes(slug));
}
