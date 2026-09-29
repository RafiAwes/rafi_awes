import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils/cn";
import type { ArticleSummary } from "@/types/article";
import { ArticleMetaLine } from "./ArticleMeta";

interface ArticleListProps {
  articles: ArticleSummary[];
  /** "compact" stacks metadata above the title for narrow columns. */
  variant?: "default" | "compact";
}

/** Publication-style list: one article per row, title-led, minimal chrome. */
export function ArticleList({ articles, variant = "default" }: ArticleListProps) {
  const wide = variant === "default";

  return (
    <ul className="border-b border-line">
      {articles.map((article, i) => (
        <Reveal as="li" key={article.href} delay={i * 70} className="border-t border-line">
          <Link
            href={article.href}
            className={cn(
              "group grid gap-4",
              wide ? "py-8 md:grid-cols-12 md:gap-8 md:py-10" : "py-7",
            )}
          >
            <ArticleMetaLine article={article} className={cn(wide && "md:col-span-3 md:pt-2")} />
            <div className={cn(wide && "md:col-span-8")}>
              <h3
                className={cn(
                  "font-medium tracking-[-0.03em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5",
                  wide ? "text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.15]" : "text-xl leading-snug",
                )}
              >
                {article.title}
              </h3>
              <p className={cn("mt-3 max-w-2xl text-fg-muted", !wide && "text-[0.95rem] line-clamp-2")}>
                {article.description}
              </p>
            </div>
            {wide ? (
              <span aria-hidden className="hidden justify-self-end md:col-span-1 md:flex md:pt-2">
                <ArrowUpRight className="size-5 text-fg-subtle transition-all duration-500 group-hover:rotate-45 group-hover:text-fg" />
              </span>
            ) : null}
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
