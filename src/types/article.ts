import type { ComponentType } from "react";

export type ArticleCollection = "blog" | "insights";

export type InsightCategory = "Build" | "Think" | "Learn";

/** Metadata exported from each MDX file as `export const meta = { ... }`. */
export interface ArticleMeta {
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  draft?: boolean;
}

export interface ArticleHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ArticleSummary extends ArticleMeta {
  slug: string;
  collection: ArticleCollection;
  href: string;
  readingMinutes: number;
}

export interface Article extends ArticleSummary {
  headings: ArticleHeading[];
  Content: ComponentType;
}
