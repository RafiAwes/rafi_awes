import { getProjectBySlug } from "@/lib/content/projects";
import { ogSize, renderOgImage } from "@/lib/metadata/og";

export const alt = "Project by Rafi Rahman";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return renderOgImage({
    eyebrow: `Work · ${project?.categories.slice(0, 2).join(" · ") ?? ""}`,
    title: project?.title ?? "Work",
  });
}

export { generateStaticParams } from "./page";
