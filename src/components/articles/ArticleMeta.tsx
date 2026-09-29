import { formatDate } from "@/lib/utils/text";
import { cn } from "@/lib/utils/cn";
import type { ArticleSummary } from "@/types/article";

export function ArticleMetaLine({
  article,
  className,
}: {
  article: ArticleSummary;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-fg-subtle", className)}>
      <span className="text-accent">{article.category}</span>
      <span aria-hidden>·</span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden>·</span>
      <span>{article.readingMinutes} min read</span>
      {article.draft ? (
        <span className="rounded-full border border-current px-2 py-0.5">Draft</span>
      ) : null}
    </p>
  );
}
