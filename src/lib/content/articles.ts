import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache, type ComponentType } from "react";
import type {
  Article,
  ArticleCollection,
  ArticleHeading,
  ArticleSummary,
} from "@/types/article";
import { parseArticleMeta } from "@/lib/validation/article";
import { readingMinutes, slugify } from "@/lib/utils/text";

/*
 * Local MDX source for the blog and insights. Every consumer goes through the
 * functions exported here, so moving to a headless CMS means reimplementing
 * this module — not the pages.
 */

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

interface MdxModule {
  default: ComponentType;
  meta?: unknown;
}

// Separate import expressions keep each bundler context scoped to one folder.
const importers: Record<ArticleCollection, (slug: string) => Promise<MdxModule>> = {
  blog: (slug) => import(`@/content/blog/${slug}.mdx`),
  insights: (slug) => import(`@/content/insights/${slug}.mdx`),
};

const showDrafts = process.env.NODE_ENV !== "production";

export function getArticleHref(collection: ArticleCollection, slug: string) {
  return `/${collection}/${slug}`;
}

async function getSlugs(collection: ArticleCollection): Promise<string[]> {
  const files = await readdir(path.join(CONTENT_ROOT, collection));
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

/** Extracts h2/h3 headings from MDX source, skipping fenced code. */
function extractHeadings(source: string): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  let inFence = false;

  for (const line of source.split(/\r?\n/)) {
    if (line.trimStart().startsWith("```")) inFence = !inFence;
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[`*_]/g, "");
    headings.push({ id: slugify(text), text, level: match[1].length as 2 | 3 });
  }
  return headings;
}

const loadArticle = cache(
  async (collection: ArticleCollection, slug: string): Promise<Article | null> => {
    const file = path.join(CONTENT_ROOT, collection, `${slug}.mdx`);
    let source: string;
    try {
      source = await readFile(file, "utf8");
    } catch {
      return null;
    }

    const mod = await importers[collection](slug);
    const meta = parseArticleMeta(mod.meta, `${collection}/${slug}.mdx`);
    if (meta.draft && !showDrafts) return null;

    return {
      ...meta,
      slug,
      collection,
      href: getArticleHref(collection, slug),
      readingMinutes: readingMinutes(source),
      headings: extractHeadings(source),
      Content: mod.default,
    };
  },
);

function toSummary(article: Article): ArticleSummary {
  return {
    slug: article.slug,
    collection: article.collection,
    href: article.href,
    title: article.title,
    description: article.description,
    date: article.date,
    updated: article.updated,
    category: article.category,
    tags: article.tags,
    draft: article.draft,
    readingMinutes: article.readingMinutes,
  };
}

export const getArticles = cache(
  async (collection: ArticleCollection): Promise<ArticleSummary[]> => {
    const slugs = await getSlugs(collection);
    const articles = await Promise.all(slugs.map((slug) => loadArticle(collection, slug)));

    return articles
      .filter((a): a is Article => a !== null)
      .map(toSummary)
      .sort((a, b) => b.date.localeCompare(a.date));
  },
);

export async function getArticle(
  collection: ArticleCollection,
  slug: string,
): Promise<Article | null> {
  return loadArticle(collection, slug);
}

export async function getRelatedArticles(
  article: ArticleSummary,
  limit = 2,
): Promise<ArticleSummary[]> {
  const all = await getArticles(article.collection);
  const others = all.filter((a) => a.slug !== article.slug);
  const score = (a: ArticleSummary) =>
    (a.category === article.category ? 2 : 0) +
    a.tags.filter((t) => article.tags.includes(t)).length;

  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit);
}
