import type { InsightCategory } from "@/types/article";

export const insightCategories: Array<{ name: InsightCategory; description: string }> = [
  { name: "Build", description: "How specific systems were designed and built." },
  { name: "Think", description: "Opinions on architecture, product and business software." },
  { name: "Learn", description: "Practical guides to tools and techniques." },
];
