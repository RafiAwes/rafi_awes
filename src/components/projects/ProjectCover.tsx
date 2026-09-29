import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import type { CoverMotif, Project } from "@/types/project";

interface ProjectCoverProps {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Show the project wordmark on generated artwork. */
  wordmark?: boolean;
}

/**
 * Project visual. Uses the real cover image when one exists; otherwise renders
 * abstract artwork in the project's own palette. The artwork is intentionally
 * non-representational so it is never mistaken for a product screenshot.
 */
export function ProjectCover({
  project,
  className,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority,
  wordmark = true,
}: ProjectCoverProps) {
  const { visual } = project;

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      style={{ backgroundColor: visual.background, color: visual.foreground }}
    >
      {project.cover ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
      ) : (
        <>
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
            <Motif motif={visual.motif} accent={visual.accent} fg={visual.foreground} />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(90% 70% at 85% 10%, ${visual.accent}33, transparent 60%)`,
            }}
          />
          {wordmark ? (
            <p
              aria-hidden
              className="absolute bottom-[7%] left-[6%] right-[6%] text-[clamp(1.75rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
            >
              {project.codename ?? project.title}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}

function Motif({ motif, accent, fg }: { motif: CoverMotif; accent: string; fg: string }) {
  const svg = (children: ReactNode) => (
    <svg
      aria-hidden
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      fill="none"
    >
      {children}
    </svg>
  );

  switch (motif) {
    case "orbit":
      return svg(
        <g transform="translate(560 190)">
          {[70, 130, 190, 250, 310].map((r, i) => (
            <ellipse
              key={r}
              rx={r}
              ry={r * 0.62}
              stroke={i === 2 ? accent : fg}
              strokeOpacity={i === 2 ? 0.9 : 0.14}
              transform="rotate(-18)"
            />
          ))}
          <circle r="34" fill={accent} fillOpacity="0.9" />
          <circle cx="178" cy="-60" r="7" fill={accent} />
          <circle cx="-240" cy="88" r="4" fill={fg} fillOpacity="0.5" />
        </g>,
      );
    case "grid":
      return svg(
        <g transform="translate(360 40)">
          {Array.from({ length: 7 * 5 }, (_, i) => {
            const col = i % 7;
            const row = Math.floor(i / 7);
            const highlighted = [9, 10, 17, 23, 24, 25].includes(i);
            return (
              <rect
                key={i}
                x={col * 58}
                y={row * 58}
                width="46"
                height="46"
                rx="10"
                fill={highlighted ? accent : fg}
                fillOpacity={highlighted ? 0.85 : 0.06}
                stroke={fg}
                strokeOpacity={highlighted ? 0 : 0.12}
              />
            );
          })}
        </g>,
      );
    case "rings":
      return svg(
        <g transform="translate(600 170)">
          {[40, 80, 120, 160, 200, 240, 280].map((r, i) => (
            <circle
              key={r}
              r={r}
              stroke={i % 3 === 1 ? accent : fg}
              strokeOpacity={i % 3 === 1 ? 0.8 : 0.16}
              strokeWidth={i % 3 === 1 ? 2 : 1}
            />
          ))}
        </g>,
      );
    case "blocks":
      return svg(
        <g transform="translate(380 50)">
          {[
            [0, 0, 180, 110],
            [196, 0, 180, 170],
            [0, 126, 180, 180],
            [196, 186, 180, 120],
            [392, 0, 90, 306],
          ].map(([x, y, w, h], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              rx="14"
              fill={i === 1 ? accent : fg}
              fillOpacity={i === 1 ? 0.9 : 0.07}
              stroke={fg}
              strokeOpacity="0.14"
            />
          ))}
        </g>,
      );
    case "bars":
      return svg(
        <g transform="translate(400 60)">
          {[140, 220, 180, 280, 240, 320, 200, 260].map((h, i) => (
            <rect
              key={i}
              x={i * 46}
              y={320 - h}
              width="28"
              height={h}
              rx="14"
              fill={i === 5 ? accent : fg}
              fillOpacity={i === 5 ? 0.9 : 0.1}
            />
          ))}
        </g>,
      );
    case "chain": {
      const nodes = [
        [440, 120],
        [560, 70],
        [680, 140],
        [620, 260],
        [500, 250],
      ];
      return svg(
        <g>
          {nodes.map(([x, y], i) => {
            const [nx, ny] = nodes[(i + 1) % nodes.length];
            return (
              <line key={`l${i}`} x1={x} y1={y} x2={nx} y2={ny} stroke={fg} strokeOpacity="0.2" />
            );
          })}
          {nodes.map(([x, y], i) => (
            <polygon
              key={`n${i}`}
              points={hexPoints(x, y, i === 2 ? 34 : 24)}
              fill={i === 2 ? accent : "transparent"}
              fillOpacity={i === 2 ? 0.9 : 1}
              stroke={i === 2 ? accent : fg}
              strokeOpacity={i === 2 ? 1 : 0.4}
            />
          ))}
        </g>,
      );
    }
  }
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}
