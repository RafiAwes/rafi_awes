import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { FinalCta } from "@/components/sections/FinalCta";
import { getArticle, getArticles, getRelatedArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getArticles("insights");
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticle("insights", slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: article.href,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated,
    tags: article.tags,
  });
}

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticle("insights", slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);

  return (
    <>
      <ArticleLayout
        article={article}
        related={related}
        backLink={{ href: "/insights", label: "All insights" }}
      />
      <FinalCta />
    </>
  );
}
