import { cn } from "@/lib/utils/cn";

export function TagList({
  items,
  label,
  size = "md",
}: {
  items: readonly string[];
  label: string;
  size?: "md" | "lg";
}) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "rounded-full border border-line-strong text-fg-muted",
            size === "lg" ? "px-5 py-2.5 text-lg" : "px-3 py-1 text-sm",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
