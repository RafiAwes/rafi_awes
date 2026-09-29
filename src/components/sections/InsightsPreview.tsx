import { ArticleFeature } from "@/components/articles/ArticleFeature";
import { ArticleList } from "@/components/articles/ArticleList";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getArticles } from "@/lib/content/articles";

export async function InsightsPreview() {
  const [lead, ...rest] = await getArticles("insights");
  if (!lead) return null;

  return (
    <Section surface="light" labelledBy="insights-title">
      <SectionHeading
        id="insights-title"
        eyebrow="Insights · Build / Think / Learn"
        title="Notes on building software that works."
        description="Short, practical thinking on architecture, product decisions and the problems businesses bring to software."
        action={
          <ButtonLink href="/insights" variant="secondary">
            All insights
          </ButtonLink>
        }
      />
      <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <ArticleFeature article={lead} />
        </div>
        <div className="lg:col-span-5">
          <ArticleList articles={rest.slice(0, 3)} variant="compact" />
        </div>
      </div>
    </Section>
  );
}
