import { ArticleList } from "@/components/articles/ArticleList";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getArticles } from "@/lib/content/articles";

export async function BlogPreview() {
  const posts = await getArticles("blog");
  if (posts.length === 0) return null;

  return (
    <Section surface="light-alt" labelledBy="blog-title">
      <SectionHeading
        id="blog-title"
        eyebrow="Blog"
        title="Stories from the work."
        description="Development stories, lessons learned and the decisions behind the code — written the way I'd explain them to a friend."
        action={
          <ButtonLink href="/blog" variant="secondary">
            Read the blog
          </ButtonLink>
        }
      />
      <div className="mt-16 md:mt-24">
        <ArticleList articles={posts.slice(0, 3)} />
      </div>
    </Section>
  );
}
