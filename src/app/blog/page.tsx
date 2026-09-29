import { ArticleFeature } from "@/components/articles/ArticleFeature";
import { ArticleList } from "@/components/articles/ArticleList";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { getArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Development stories, technical tutorials, project retrospectives and lessons learned by Rafi Rahman.",
  path: "/blog",
});

export default async function BlogPage() {
  const [latest, ...posts] = await getArticles("blog");

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Stories from building software."
        description="Development stories, tutorials, retrospectives and lessons — the human side of the work, written plainly."
      />
      <Section surface="light-alt" labelledBy="blog-list">
        <h2 id="blog-list" className="sr-only">
          All posts
        </h2>
        {latest ? (
          <>
            <p className="eyebrow mb-6 text-fg-subtle">Latest</p>
            <ArticleFeature article={latest} />
            {posts.length > 0 ? (
              <div className="mt-20">
                <p className="eyebrow mb-6 text-fg-subtle">Earlier</p>
                <ArticleList articles={posts} />
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-lead text-fg-muted">The first posts are on their way.</p>
        )}
      </Section>
    </>
  );
}
