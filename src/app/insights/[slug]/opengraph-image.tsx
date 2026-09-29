import { getArticle } from "@/lib/content/articles";
import { ogSize, renderOgImage } from "@/lib/metadata/og";

export const alt = "Insight by Rafi Rahman";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle("insights", slug);
  return renderOgImage({
    eyebrow: `Insights · ${article?.category ?? ""}`,
    title: article?.title ?? "Insights",
  });
}

export { generateStaticParams } from "./page";
