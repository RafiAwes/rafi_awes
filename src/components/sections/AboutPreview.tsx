import { Reveal } from "@/components/animations/Reveal";
import { RevealText } from "@/components/animations/RevealText";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { philosophy } from "@/data/home";

export function AboutPreview() {
  return (
    <Section surface="light" labelledBy="about-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-6">About</Eyebrow>
          <div id="about-title">
            <RevealText
              text="I like building things that actually get used."
              className="text-display-lg font-medium"
            />
          </div>
          <Reveal delay={150} className="mt-10 max-w-xl space-y-5 text-lead text-fg-muted">
            <p>
              I&rsquo;m Rafi — a software engineer who works across the stack,
              from Django and Laravel backends to Next.js and React interfaces.
            </p>
            <p>
              What I enjoy most is the whole journey: understanding how a
              business really works, designing a system around it, and shipping
              software people rely on every day.
            </p>
          </Reveal>
          <Reveal delay={250} className="mt-10">
            <ButtonLink href="/about" variant="secondary">
              More about me
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="self-end lg:col-span-5">
          {philosophy.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 120}
              className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line py-7 last:border-b"
            >
              <span className="eyebrow pt-1.5 text-fg-subtle">0{i + 1}</span>
              <div>
                <p className="text-xl font-medium tracking-[-0.02em]">{item.title}</p>
                <p className="mt-2 text-fg-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
