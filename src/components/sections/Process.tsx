import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/home";
import { ProcessTimeline } from "./ProcessTimeline";

export function Process({ surface = "dark" }: { surface?: "dark" | "darker" }) {
  return (
    <Section surface={surface} labelledBy="process-title" className="overflow-hidden">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div className="relative">
        <SectionHeading
          id="process-title"
          eyebrow="Process"
          title="From idea to working product."
          description="A clear process means fewer surprises. Every project moves through the same six stages, scaled to its size."
        />
        <div className="mt-20 md:mt-28">
          <ProcessTimeline steps={processSteps} />
        </div>
      </div>
    </Section>
  );
}
