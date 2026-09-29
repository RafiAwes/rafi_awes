import { getArticle } from "@/lib/content/articles";
import { ogSize, renderOgImage } from "@/lib/metadata/og";

export const alt = "Blog post by Rafi Rahman";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getArticle("blog", slug);
  return renderOgImage({ eyebrow: `Blog · ${post?.category ?? ""}`, title: post?.title ?? "Blog" });
}

export { generateStaticParams } from "./page";
