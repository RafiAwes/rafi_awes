import { Section } from "@/components/layout/Section";
import { SolutionList } from "@/components/solutions/SolutionList";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSolutions } from "@/lib/content/solutions";

export function SolutionsPreview() {
  return (
    <Section surface="light" labelledBy="solutions-title">
      <SectionHeading
        id="solutions-title"
        eyebrow="Industries & solutions"
        title="Software shaped around how your industry works."
        description="Different businesses need different systems. These are the combinations I see most often."
        action={
          <ButtonLink href="/solutions" variant="secondary">
            All solutions
          </ButtonLink>
        }
      />
      <div className="mt-16 md:mt-24">
        <SolutionList solutions={getSolutions()} />
      </div>
    </Section>
  );
}
