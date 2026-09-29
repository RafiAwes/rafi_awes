"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { mainNavigation, primaryCta } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { isActivePath } from "@/lib/utils/nav";
import { ArrowUpRight, CloseIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";

/**
 * Full-screen menu built on the native <dialog> element, which provides focus
 * containment, Escape-to-close and an inert background for free.
 */
export function MobileNavigation({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // Close whenever the route changes.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  // Lock page scroll while open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const sync = () => {
      document.documentElement.style.overflow = dialog.open ? "hidden" : "";
    };
    const observer = new MutationObserver(sync);
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      document.documentElement.style.overflow = "";
    };
  }, []);

  const items = [...mainNavigation, { label: "Contact", href: "/contact" }];

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="inline-flex h-10 items-center gap-3 rounded-full border border-line-strong px-4 text-sm lg:hidden"
      >
        Menu
        <span aria-hidden className="flex flex-col gap-1">
          <span className="block h-px w-4 bg-current" />
          <span className="block h-px w-4 bg-current" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="mobile-nav surface-darker"
      >
        <div className="relative flex h-full flex-col overflow-y-auto">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-1/3 -top-1/4 size-[80vw] rounded-full bg-accent-violet/20 blur-[120px]"
          />
          <div className="container-site flex h-(--header-height) shrink-0 items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={close}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm"
            >
              Close
              <CloseIcon className="size-4" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-site flex-1 pt-10">
            <ul className="flex flex-col">
              {items.map((item, i) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li
                    key={item.href}
                    className="mobile-nav-item border-b border-line"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline justify-between py-4 text-[clamp(2rem,9vw,3rem)] font-medium tracking-[-0.04em]"
                    >
                      <span className={cn(active ? "text-gradient" : "text-fg")}>
                        {item.label}
                      </span>
                      <span className="eyebrow text-fg-subtle">0{i + 1}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className="mobile-nav-item container-site flex flex-col gap-6 pb-10 pt-10"
            style={{ "--i": items.length } as CSSProperties}
          >
            <Link
              href={primaryCta.href}
              onClick={close}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-fg font-medium text-surface"
            >
              {primaryCta.label}
              <ArrowUpRight className="size-4" />
            </Link>
            <p className="eyebrow text-fg-subtle">
              {siteConfig.roles.join(" · ")}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
