import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import type { ArticleSummary } from "@/types/article";
import { ArticleMetaLine } from "./ArticleMeta";

/** Lead story treatment for the top article in a collection. */
export function ArticleFeature({ article }: { article: ArticleSummary }) {
  return (
    <Reveal>
      <Link
        href={article.href}
        className="border-glow group relative block overflow-hidden rounded-[var(--radius-frame)] border border-line bg-surface-raised p-8 md:p-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent-blue/10 blur-3xl transition-colors duration-700 group-hover:bg-accent-blue/20"
        />
        <ArticleMetaLine article={article} />
        <h3 className="mt-8 max-w-3xl text-display-md font-medium">{article.title}</h3>
        <p className="mt-5 max-w-2xl text-lead text-fg-muted">{article.description}</p>
        <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium">
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}
