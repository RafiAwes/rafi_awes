import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/config/site";
import { processSteps } from "@/data/home";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Start a Project",
  description:
    "Tell Rafi Rahman about your project — business software, booking platforms, websites, startup MVPs or AI features.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Let's talk about what you're building."
        description="Share as much or as little as you know. A rough idea is a perfectly good place to start."
      />
      <Section surface="dark" spacing="compact" className="border-t border-line">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <Eyebrow className="mb-5">Prefer email?</Eyebrow>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="text-xl underline decoration-line-strong underline-offset-8 transition-colors hover:decoration-fg"
              >
                {siteConfig.email}
              </Link>

              <Eyebrow className="mb-5 mt-14">What happens next</Eyebrow>
              <ol className="border-b border-line">
                {processSteps.slice(0, 3).map((step) => (
                  <li key={step.index} className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-5">
                    <span className="eyebrow pt-1 text-fg-subtle">{step.index}</span>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="mt-1 text-sm text-fg-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
