import Link from "next/link";
import type { CSSProperties } from "react";
import { Section } from "@/components/layout/Section";
import { ArrowRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";
import { articleSchema } from "@/lib/metadata/structured-data";
import { formatDate } from "@/lib/utils/text";
import type { Article, ArticleSummary } from "@/types/article";
import { ArticleList } from "./ArticleList";
import { ArticleMetaLine } from "./ArticleMeta";
import { ReadingProgress } from "./ReadingProgress";
import { TableOfContents } from "./TableOfContents";

interface ArticleLayoutProps {
  article: Article;
  related: ArticleSummary[];
  backLink: { href: string; label: string };
}

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * Reading-first layout shared by blog posts and insights. Motion is limited to
 * the header entrance; the body is static so nothing competes with reading.
 */
export function ArticleLayout({ article, related, backLink }: ArticleLayoutProps) {
  const { Content } = article;

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <ReadingProgress />

      <header className="surface-dark grain relative isolate overflow-hidden">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_70%_80%_at_20%_0%,black,transparent)]"
        />
        <div className="container-site pb-16 pt-[calc(var(--header-height)+4rem)] md:pb-24 md:pt-[calc(var(--header-height)+6rem)]">
          <Link
            href={backLink.href}
            className="animate-rise eyebrow group inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
            style={delay(0)}
          >
            <ArrowRight className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            {backLink.label}
          </Link>
          <div className="animate-rise mt-10" style={delay(80)}>
            <ArticleMetaLine article={article} />
          </div>
          <h1 className="animate-rise mt-6 max-w-4xl text-display-lg font-medium" style={delay(160)}>
            {article.title}
          </h1>
          <p className="animate-rise mt-6 max-w-2xl text-lead text-fg-muted" style={delay(240)}>
            {article.description}
          </p>
          <p className="animate-rise mt-10 text-sm text-fg-subtle" style={delay(320)}>
            By <span className="text-fg">{siteConfig.name}</span>
            {article.updated ? <> · Updated {formatDate(article.updated)}</> : null}
          </p>
        </div>
      </header>

      <div className="surface-light">
        <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
          <aside className="order-first lg:order-last lg:col-span-3 lg:col-start-10">
            <div className="lg:sticky lg:top-28">
              <TableOfContents headings={article.headings} />
            </div>
          </aside>
          <article className="prose-article lg:col-span-8">
            <Content />
          </article>
        </div>

        {article.tags.length > 0 ? (
          <div className="container-site pb-16">
            <ul className="flex flex-wrap gap-2 border-t border-line pt-8" aria-label="Tags">
              {article.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-line px-3 py-1 text-sm text-fg-muted">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {related.length > 0 ? (
        <Section surface="light-alt" spacing="compact" labelledBy="related-title">
          <h2 id="related-title" className="mb-10 text-display-sm font-medium">
            Keep reading
          </h2>
          <ArticleList articles={related} />
        </Section>
      ) : null}
    </>
  );
}
