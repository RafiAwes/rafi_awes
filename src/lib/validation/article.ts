import type { ArticleMeta } from "@/types/article";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validates the `meta` export of an MDX article at build time so a malformed
 * post fails loudly instead of rendering with missing fields.
 */
export function parseArticleMeta(value: unknown, source: string): ArticleMeta {
  const fail = (reason: string): never => {
    throw new Error(`Invalid article metadata in ${source}: ${reason}`);
  };

  if (typeof value !== "object" || value === null) fail("missing `export const meta`");
  const meta = value as Record<string, unknown>;

  for (const key of ["title", "description", "date", "category"] as const) {
    if (typeof meta[key] !== "string" || !(meta[key] as string).trim()) {
      fail(`\`${key}\` must be a non-empty string`);
    }
  }
  if (!ISO_DATE.test(meta.date as string)) fail("`date` must be YYYY-MM-DD");
  if (meta.updated !== undefined && !ISO_DATE.test(String(meta.updated))) {
    fail("`updated` must be YYYY-MM-DD");
  }
  if (!Array.isArray(meta.tags) || meta.tags.some((t) => typeof t !== "string")) {
    fail("`tags` must be an array of strings");
  }

  return {
    title: meta.title as string,
    description: meta.description as string,
    date: meta.date as string,
    updated: meta.updated as string | undefined,
    category: meta.category as string,
    tags: meta.tags as string[],
    draft: meta.draft === true,
  };
}
