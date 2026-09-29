import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { FeatureGrid as Grid } from "@/components/ui/FeatureGrid";
import type { CaseStudy as CaseStudyData, CaseStudySectionKey } from "@/types/project";

/** Canonical order and labels for case-study sections. */
const SECTIONS: Array<{ key: CaseStudySectionKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "problem", label: "Problem" },
  { key: "goals", label: "Goals" },
  { key: "role", label: "My role" },
  { key: "strategy", label: "Product strategy" },
  { key: "design", label: "Design" },
  { key: "architecture", label: "Architecture" },
  { key: "development", label: "Development" },
  { key: "challenges", label: "Challenges" },
  { key: "outcome", label: "Outcome" },
  { key: "lessons", label: "Lessons learned" },
];

/**
 * Renders whichever case-study sections exist, in a fixed order. Feature and
 * decision grids slot in after development / challenges respectively, so every
 * project page shares one architecture regardless of how much is written.
 */
export function CaseStudy({ caseStudy }: { caseStudy: CaseStudyData }) {
  const blocks: ReactNode[] = [];
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  for (const { key, label } of SECTIONS) {
    const section = caseStudy.sections[key];
    if (section) {
      blocks.push(
        <Row key={key} index={next()} label={label}>
          <div className="space-y-5 text-lead text-fg-muted">
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {section.points?.length ? (
            <ul className="mt-8 grid gap-3">
              {section.points.map((point) => (
                <li key={point} className="flex gap-4 border-t border-line pt-3 text-fg">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[image:var(--accent-gradient)]" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </Row>,
      );
    }

    if (key === "development" && caseStudy.keyFeatures?.length) {
      blocks.push(
        <Row key="features" index={next()} label="Key features">
          <Grid items={caseStudy.keyFeatures} />
        </Row>,
      );
    }

    if (key === "development" && caseStudy.screenshots?.length) {
      blocks.push(
        <Row key="screens" index={next()} label="Screenshots">
          <div className="grid gap-6">
            {caseStudy.screenshots.map((shot) => (
              <figure key={shot.src}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="w-full rounded-[var(--radius-card)] border border-line"
                />
                {shot.caption ? (
                  <figcaption className="mt-3 text-sm text-fg-muted">{shot.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </Row>,
      );
    }

    if (key === "challenges" && caseStudy.technicalDecisions?.length) {
      blocks.push(
        <Row key="decisions" index={next()} label="Technical decisions">
          <Grid items={caseStudy.technicalDecisions} />
        </Row>,
      );
    }
  }

  return <div className="border-b border-line">{blocks}</div>;
}

function Row({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <section aria-labelledby={id} className="grid gap-8 border-t border-line py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow text-fg-subtle">{index}</p>
          <h2 id={id} className="mt-3 text-display-sm font-medium">
            {label}
          </h2>
        </div>
      </div>
      <Reveal className="lg:col-span-7 lg:col-start-6">{children}</Reveal>
    </section>
  );
}

