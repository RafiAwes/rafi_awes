import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataInput {
  title?: string;
  description?: string;
  /** Path beginning with "/" — used for the canonical URL. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

/**
 * Builds consistent page metadata: canonical URL, Open Graph and X cards.
 * Open Graph images come from the opengraph-image file convention.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: PageMetadataInput): Metadata {
  const ogTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.name;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [siteConfig.name],
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
