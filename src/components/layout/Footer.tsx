import Link from "next/link";
import { footerNavigation } from "@/data/navigation";
import { siteConfig, socialLinks } from "@/config/site";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="surface-darker relative overflow-hidden pt-24 md:pt-32">
      <div className="container-site">
        <div className="grid gap-14 border-b border-line pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-2xl font-medium tracking-[-0.03em]">{siteConfig.name}</p>
            <p className="mt-3 text-fg-muted">
              {siteConfig.roles.map((role) => (
                <span key={role} className="block">
                  {role}
                </span>
              ))}
            </p>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="group mt-8 inline-flex items-center gap-2 text-lg underline decoration-line-strong underline-offset-8 transition-colors hover:decoration-fg"
            >
              {siteConfig.email}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-5 text-fg-subtle">Navigation</p>
            <ul className="grid gap-2.5">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5 text-fg-subtle">Social</p>
            <ul className="grid gap-2.5">
              {socialLinks.map((social) => (
                <li key={social.platform}>
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
                    >
                      {social.platform}
                      <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="text-fg-subtle">{social.platform}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {siteConfig.copyrightYear} {siteConfig.name}</p>
          <p>Built with Next.js, TypeScript and Tailwind CSS.</p>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none px-(--gutter) text-center text-display-2xl font-semibold leading-[0.75] text-transparent [-webkit-text-stroke:1px_var(--line-strong)]"
      >
        RAFI
      </p>
    </footer>
  );
}
