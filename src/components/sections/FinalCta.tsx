import { PointerField } from "@/components/animations/PointerField";
import { Reveal } from "@/components/animations/Reveal";
import { RevealText } from "@/components/animations/RevealText";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface FinalCtaProps {
  title?: string;
  description?: string;
}

/** Cinematic closing call to action, reused at the end of most pages. */
export function FinalCta({
  title = "Have an idea worth building?",
  description = "Let's turn your business problem, product idea or digital vision into something real.",
}: FinalCtaProps) {
  return (
    <section aria-labelledby="cta-title" className="surface-dark">
      <PointerField className="grain relative isolate overflow-hidden border-t border-line">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(640px_circle_at_var(--mx,50%)_var(--my,70%),rgb(155_123_255/0.14),transparent_70%)]"
        />
        <div
          aria-hidden
          className="animate-drift absolute -bottom-1/2 left-1/2 -z-10 h-[80vh] w-[120vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(91_124_255/0.35),rgb(155_123_255/0.15)_55%,transparent)] blur-2xl"
        />

        <div className="container-site flex min-h-[80svh] flex-col items-center justify-center py-32 text-center md:py-40">
          <Eyebrow className="mb-8 justify-center">Start a project</Eyebrow>
          <div id="cta-title">
            <RevealText
              text={title}
              className="mx-auto max-w-5xl text-display-xl font-medium"
            />
          </div>
          <Reveal delay={250} as="p" className="mx-auto mt-8 max-w-xl text-lead text-fg-muted">
            {description}
          </Reveal>
          <Reveal delay={350} className="mt-12 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" size="lg" arrow="up-right" magnetic>
              Start a Project
            </ButtonLink>
            <ButtonLink href="/work" size="lg" variant="secondary" magnetic>
              View My Work
            </ButtonLink>
          </Reveal>
        </div>
      </PointerField>
    </section>
  );
}
