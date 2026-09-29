import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { getArticle, getArticles, getRelatedArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getArticles("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getArticle("blog", slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: post.href,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
    tags: post.tags,
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getArticle("blog", slug);
  if (!post) notFound();

  const related = await getRelatedArticles(post);

  return (
    <ArticleLayout
      article={post}
      related={related}
      backLink={{ href: "/blog", label: "All posts" }}
    />
  );
}
