import { siteConfig, socialLinks } from "@/config/site";
import type { ArticleSummary } from "@/types/article";
import type { Project } from "@/types/project";
import { absoluteUrl } from "./index";

const personId = absoluteUrl("/#person");

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    sameAs: socialLinks.map((s) => s.href).filter(Boolean),
    knowsAbout: [
      "Software Engineering",
      "Web Development",
      "Business Software",
      "Digital Products",
      "AI Integration",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    author: { "@id": personId },
  };
}

export function articleSchema(article: ArticleSummary) {
  return {
    "@context": "https://schema.org",
    "@type": article.collection === "blog" ? "BlogPosting" : "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    url: absoluteUrl(article.href),
    keywords: article.tags.join(", "),
    author: { "@type": "Person", "@id": personId, name: siteConfig.name },
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    genre: project.categories.join(", "),
    creativeWorkStatus: project.status,
    ...(project.year && { dateCreated: project.year }),
    creator: { "@type": "Person", "@id": personId, name: siteConfig.name },
  };
}
