import { Reveal } from "@/components/animations/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologyGroups } from "@/data/home";

/** Technology grouped by purpose, typeset as a spec sheet rather than logos. */
export function TechStack() {
  return (
    <Section surface="dark" labelledBy="tech-title">
      <SectionHeading
        id="tech-title"
        eyebrow="Technology"
        title="Tools chosen for the job, not the trend."
        description="A stack is a decision, not an identity. These are the tools I reach for most, grouped by what they do."
      />

      <div className="mt-20 grid gap-px overflow-hidden rounded-[var(--radius-frame)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5 md:mt-28">
        {technologyGroups.map((group, i) => (
          <Reveal
            key={group.label}
            delay={i * 80}
            className="group relative bg-surface p-7 transition-colors duration-500 hover:bg-surface-raised lg:min-h-80"
          >
            <div className="flex items-center justify-between">
              <h3 className="eyebrow text-fg-subtle">{group.label}</h3>
              <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
            </div>
            <ul className="mt-10 space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-xl tracking-[-0.02em] text-fg-muted transition-colors duration-300 hover:text-fg">
                  {item}
                </li>
              ))}
            </ul>
            <span
              aria-hidden
              className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-[image:var(--accent-gradient)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
