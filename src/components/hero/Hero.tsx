import type { CSSProperties } from "react";
import { PointerField } from "@/components/animations/PointerField";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { HeroPortrait } from "./HeroPortrait";
import { KineticHeadline } from "./KineticHeadline";

const phrases = [
  "I build digital products.",
  "I build business software.",
  "I build modern web applications.",
  "I build AI-powered solutions.",
  "I turn ideas into working products.",
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <PointerField className="surface-dark grain relative isolate overflow-hidden">
      {/* Backdrop: masked grid, cursor spotlight and a low ambient glow */}
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(520px_circle_at_var(--mx,70%)_var(--my,30%),rgb(91_124_255/0.09),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute -bottom-1/3 -left-1/4 -z-10 size-[70vw] rounded-full bg-accent-blue/10 blur-[140px]"
      />

      <div className="container-site grid min-h-svh items-center gap-16 pb-28 pt-[calc(var(--header-height)+4rem)] lg:grid-cols-12 lg:gap-10 lg:pb-32">
        <div className="lg:col-span-7">
          <p
            className="animate-rise eyebrow flex items-center gap-3 text-fg-muted"
            style={delay(0)}
          >
            <span aria-hidden className="h-px w-8 bg-[image:var(--accent-gradient)]" />
            Software Engineer · Digital Product Builder
          </p>

          <h1 className="mt-8 font-medium">
            <span
              className="animate-rise block text-[clamp(1.375rem,2.4vw,2rem)] tracking-[-0.03em] text-fg-muted"
              style={delay(80)}
            >
              Hello, I&rsquo;m <span className="text-fg">{siteConfig.name}</span>.
            </span>
            <span className="animate-rise mt-3 block" style={delay(180)}>
              <KineticHeadline
                phrases={phrases}
                className="min-h-[3.1em] text-display-lg leading-[1.02] sm:min-h-[2.08em]"
              />
            </span>
          </h1>

          <p
            className="animate-rise mt-8 max-w-xl text-lead text-fg-muted"
            style={delay(300)}
          >
            I enjoy solving complex problems, building useful products, and
            turning ambitious ideas into reliable digital experiences.
          </p>

          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-3"
            style={delay(420)}
          >
            <ButtonLink href="/work" size="lg" magnetic>
              View My Work
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary" arrow="up-right" magnetic>
              Let&rsquo;s Work Together
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pl-6">
          <HeroPortrait />
        </div>
      </div>

      <div className="container-site absolute inset-x-0 bottom-0 pb-8">
        <div
          className="animate-rise flex items-end justify-between gap-6 border-t border-line pt-6"
          style={delay(600)}
        >
          <div className="flex items-start gap-3">
            <span aria-hidden className="animate-pulse-dot mt-1 size-2 shrink-0 rounded-full bg-emerald-400" />
            <p className="text-sm">
              <span className="eyebrow block text-fg-subtle">Currently building</span>
              <span className="mt-1.5 block text-fg-muted">
                {siteConfig.currentFocus.join(" · ")}
              </span>
            </p>
          </div>
          <a
            href="#what-i-build"
            className="eyebrow hidden items-center gap-3 text-fg-subtle transition-colors hover:text-fg sm:flex"
          >
            Scroll
            <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="animate-float absolute inset-x-0 top-0 h-3 bg-fg" />
            </span>
          </a>
        </div>
      </div>
    </PointerField>
  );
}
