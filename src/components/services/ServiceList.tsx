import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { getServiceHref } from "@/lib/content/services";
import type { Service } from "@/types/service";

/** Numbered editorial list of services. */
export function ServiceList({ services }: { services: Service[] }) {
  return (
    <ol className="border-b border-line">
      {services.map((service, i) => (
        <Reveal as="li" key={service.slug} delay={i * 60} className="border-t border-line">
          <Link
            href={getServiceHref(service)}
            className="group relative grid gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-12"
          >
            <span className="eyebrow pt-2 text-fg-subtle md:col-span-1">0{i + 1}</span>
            <h2 className="text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:col-span-6">
              {service.title}
            </h2>
            <p className="text-fg-muted md:col-span-4">{service.summary}</p>
            <span aria-hidden className="hidden justify-self-end md:col-span-1 md:flex md:pt-2">
              <ArrowUpRight className="size-5 text-fg-subtle transition-all duration-500 group-hover:rotate-45 group-hover:text-fg" />
            </span>
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[image:var(--accent-gradient)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
            />
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
