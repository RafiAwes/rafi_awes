import Image from "next/image";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";

/** Offsets content by the pointer position exposed by <PointerField>. */
const parallax = (depth: number): CSSProperties => ({
  transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
});

/**
 * Portrait treated as a composition: framed crop, ambient light, crop marks
 * and a few abstract interface fragments that drift with the pointer.
 * Fragments are deliberately generic — they are not screenshots of any project.
 */
export function HeroPortrait() {
  const portrait = siteConfig.portrait;

  return (
    <div
      className="animate-rise relative mx-auto w-full max-w-[26rem] lg:max-w-none"
      style={{ "--delay": "350ms" } as CSSProperties}
    >
      {/* Ambient light behind the frame */}
      <div
        aria-hidden
        className="animate-drift absolute -inset-[12%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(91_124_255/0.35),rgb(155_123_255/0.18)_45%,transparent_75%)] blur-2xl"
      />

      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-frame)] border border-line bg-ink-900 transition-transform duration-700 ease-[var(--ease-out-expo)]"
        style={parallax(-6)}
      >
        {portrait ? (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            style={{ objectPosition: "50% 20%" }}
          />
        ) : (
          <PortraitPlaceholder />
        )}

        {/* Light falloff so the frame blends into the page */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_11_13/0.75),transparent_45%)]"
        />
        <CropMarks />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <p className="eyebrow text-fg">{siteConfig.name}</p>
          <p className="eyebrow text-fg-muted">{siteConfig.role}</p>
        </div>
      </div>

      {/* Floating interface fragments */}
      <div
        aria-hidden
        className="absolute -left-6 top-[14%] hidden transition-transform duration-700 ease-[var(--ease-out-expo)] sm:block lg:-left-14"
        style={parallax(14)}
      >
        <div className="animate-float rounded-2xl border border-line bg-ink-900/80 p-4 shadow-2xl shadow-black/40 backdrop-blur-md">
          <p className="eyebrow mb-3 text-fg-subtle">build.pipeline</p>
          {[88, 64, 42].map((w, i) => (
            <div key={w} className="mt-2 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent-blue/80" style={{ opacity: 1 - i * 0.25 }} />
              <span className="block h-1.5 rounded-full bg-fg/15" style={{ width: `${w}px` }} />
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -right-4 top-[46%] hidden transition-transform duration-700 ease-[var(--ease-out-expo)] sm:block lg:-right-10"
        style={parallax(22)}
      >
        <div
          className="animate-float rounded-full border border-line bg-ink-900/80 px-4 py-2.5 font-mono text-xs text-fg-muted shadow-2xl shadow-black/40 backdrop-blur-md"
          style={{ "--delay": "-2.5s" } as CSSProperties}
        >
          <span className="text-accent">{"{"}</span> idea <span className="text-fg-subtle">→</span> product{" "}
          <span className="text-accent">{"}"}</span>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -left-8 bottom-[18%] hidden transition-transform duration-700 ease-[var(--ease-out-expo)] sm:block lg:-left-16"
        style={parallax(10)}
      >
        <div
          className="animate-float rounded-2xl border border-line bg-ink-900/80 p-3 shadow-2xl shadow-black/40 backdrop-blur-md"
          style={{ "--delay": "-4s" } as CSSProperties}
        >
          <svg width="120" height="36" viewBox="0 0 120 36" fill="none">
            <defs>
              <linearGradient id="spark" x1="0" x2="1">
                <stop offset="0" stopColor="#5b7cff" />
                <stop offset="1" stopColor="#9b7bff" />
              </linearGradient>
            </defs>
            <path
              d="M2 30 C 18 28, 22 16, 38 18 S 60 30, 74 20 S 96 4, 118 6"
              stroke="url(#spark)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CropMarks() {
  const mark = "absolute size-4 border-fg/40";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-4">
      <span className={`${mark} left-0 top-0 border-l border-t`} />
      <span className={`${mark} right-0 top-0 border-r border-t`} />
      <span className={`${mark} bottom-0 left-0 border-b border-l`} />
      <span className={`${mark} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

/**
 * Shown until a real portrait is configured in src/config/site.ts.
 * Designed to read as intentional, while clearly marking the image slot.
 */
function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,#23232b_0%,#131316_55%,#0b0b0d_100%)]">
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_50%_40%,black,transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="select-none text-[clamp(7rem,22vw,14rem)] font-semibold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_rgb(245_245_242/0.18)]">
          RR
        </span>
      </div>
      <p className="eyebrow absolute left-7 top-7 text-fg-subtle">Portrait · 4:5</p>
    </div>
  );
}
