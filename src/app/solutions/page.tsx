import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { SolutionList } from "@/components/solutions/SolutionList";
import { getSolutions } from "@/lib/content/solutions";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "How software solves industry-specific problems for startups, salons, garments, hotels, education, service businesses and SMEs.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Every industry breaks in its own way."
        description="The software a salon needs is not the software a garment factory needs. These are the problems I see in each — and the systems that solve them."
      />
      <Section surface="light" labelledBy="solutions-list">
        <h2 id="solutions-list" className="sr-only">
          Industries
        </h2>
        <SolutionList solutions={getSolutions()} />
      </Section>
      <FinalCta title="Don't see your industry?" description="Most operational problems look similar underneath. Tell me how your business works and we'll figure out what it needs." />
    </>
  );
}
