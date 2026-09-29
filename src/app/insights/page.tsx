import { CategoryFilter } from "@/components/articles/CategoryFilter";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { insightCategories } from "@/data/articles";
import { getArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Short professional and technical thinking from Rafi Rahman on building software, architecture and business systems.",
  path: "/insights",
});

export default async function InsightsPage() {
  const articles = await getArticles("insights");

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Build. Think. Learn."
        description="Short pieces on the practical side of software — how systems get designed, why decisions get made and what I learn along the way."
      />
      <Section surface="light" labelledBy="insights-list">
        <h2 id="insights-list" className="sr-only">
          All insights
        </h2>
        <CategoryFilter articles={articles} categories={insightCategories} />
      </Section>
      <FinalCta />
    </>
  );
}
