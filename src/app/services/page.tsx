import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { Process } from "@/components/sections/Process";
import { ServiceList } from "@/components/services/ServiceList";
import { getServices } from "@/lib/content/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Web development, business software, booking platforms, startup MVPs, AI solutions, API development and continuous development.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What I can build with you."
        description="From a first website to the systems that run a business. Every engagement starts with understanding the problem — the service follows from that."
      />
      <Section surface="light" labelledBy="services-list">
        <h2 id="services-list" className="sr-only">
          All services
        </h2>
        <ServiceList services={getServices()} />
      </Section>
      <Process />
      <FinalCta />
    </>
  );
}
