import { cn } from "@/lib/utils/cn";
import type { TitledDescription } from "@/types/common";

interface FeatureGridProps {
  items: TitledDescription[];
  columns?: 2 | 3;
  numbered?: boolean;
}

/** Hairline-separated grid of titled descriptions. */
export function FeatureGrid({ items, columns = 2, numbered = false }: FeatureGridProps) {
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
      )}
    >
      {items.map((item, i) => (
        <li key={item.title} className="bg-surface p-6 transition-colors duration-500 hover:bg-surface-raised md:p-8">
          {numbered ? <p className="eyebrow mb-6 text-fg-subtle">0{i + 1}</p> : null}
          <h3 className="text-lg font-medium tracking-[-0.02em]">{item.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
