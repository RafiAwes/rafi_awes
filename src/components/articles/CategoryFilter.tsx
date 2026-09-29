"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { ArticleSummary } from "@/types/article";
import { ArticleList } from "./ArticleList";

interface CategoryFilterProps {
  articles: ArticleSummary[];
  categories: Array<{ name: string; description: string }>;
}

/** Filters an article list by category without a round trip. */
export function CategoryFilter({ articles, categories }: CategoryFilterProps) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? articles.filter((a) => a.category === active) : articles;
  const activeCategory = categories.find((c) => c.name === active);

  const options = [{ name: null, label: "All" }, ...categories.map((c) => ({ name: c.name, label: c.name }))];

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {options.map((option) => {
            const selected = active === option.name;
            const count = option.name
              ? articles.filter((a) => a.category === option.name).length
              : articles.length;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(option.name)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300",
                  selected
                    ? "border-fg bg-fg text-surface"
                    : "border-line-strong text-fg-muted hover:border-fg/50 hover:text-fg",
                )}
              >
                {option.label}
                <span className={cn("font-mono text-xs", selected ? "opacity-60" : "text-fg-subtle")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p className="max-w-sm text-sm text-fg-muted" aria-live="polite">
          {activeCategory ? activeCategory.description : `${articles.length} articles across ${categories.length} categories.`}
        </p>
      </div>

      <div className="mt-12">
        {visible.length > 0 ? (
          <ArticleList articles={visible} />
        ) : (
          <p className="border-t border-line py-10 text-fg-muted">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
