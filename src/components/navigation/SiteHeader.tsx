"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNavigation, primaryCta } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { isActivePath } from "@/lib/utils/nav";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";

/**
 * Transparent over the page hero; becomes a blurred dark bar after scrolling.
 * Hides while scrolling down and returns on scroll up so it never competes
 * with reading.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      // Only hide once past the hero area, and ignore tiny movements.
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 480);
        lastY = y;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "surface-dark fixed inset-x-0 top-0 z-50 bg-transparent! transition-transform duration-500 ease-[var(--ease-out-expo)]",
        hidden && "-translate-y-full focus-within:translate-y-0",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-full focus:bg-chalk focus:px-4 focus:py-2 focus:text-sm focus:text-graphite"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-line bg-ink-950/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-(--header-height) items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNavigation.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                        active ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-[image:var(--accent-gradient)] transition-transform duration-500 ease-[var(--ease-out-expo)]",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href={primaryCta.href}
              variant="secondary"
              arrow="up-right"
              className="hidden h-10! sm:inline-flex"
            >
              {primaryCta.label}
            </ButtonLink>
            <MobileNavigation pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}
