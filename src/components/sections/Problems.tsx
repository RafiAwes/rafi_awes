import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problems } from "@/data/home";
import { ProblemSolver } from "./ProblemSolver";

export function Problems() {
  return (
    <Section surface="light" labelledBy="problems-title" className="pt-0! md:pt-8!">
      <SectionHeading
        id="problems-title"
        eyebrow="Problems I solve"
        title="What are you trying to solve?"
        description="Start with the problem, not the technology. Pick the one that sounds familiar."
      />
      <div className="mt-16 md:mt-24">
        <ProblemSolver problems={problems} />
      </div>
    </Section>
  );
}
