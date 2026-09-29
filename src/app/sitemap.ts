import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/content/articles";
import { getProjects } from "@/lib/content/projects";
import { getServices } from "@/lib/content/services";
import { getSolutions } from "@/lib/content/solutions";
import { absoluteUrl } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blog, insights] = await Promise.all([getArticles("blog"), getArticles("insights")]);

  const staticRoutes = ["/", "/work", "/services", "/solutions", "/about", "/insights", "/blog", "/contact"];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...getProjects().map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), priority: 0.7 })),
    ...getServices().map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), priority: 0.6 })),
    ...getSolutions().map((s) => ({ url: absoluteUrl(`/solutions/${s.slug}`), priority: 0.6 })),
    ...[...blog, ...insights].map((a) => ({
      url: absoluteUrl(a.href),
      lastModified: a.updated ?? a.date,
      priority: 0.6,
    })),
  ];
}
