import { cn } from "@/lib/utils/cn";
import type { ArticleHeading } from "@/types/article";

export function TableOfContents({ headings }: { headings: ArticleHeading[] }) {
  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="eyebrow mb-5 text-fg-subtle">Contents</p>
      <ol className="space-y-2.5 border-l border-line text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ml-px block border-l border-transparent text-fg-muted transition-colors hover:border-fg hover:text-fg",
                heading.level === 3 ? "pl-7" : "pl-4",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
