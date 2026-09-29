import type { Faq, TitledDescription } from "./common";

export type ServiceSlug =
  | "web-development"
  | "business-software"
  | "booking-platforms"
  | "startup-mvp"
  | "ai-solutions"
  | "api-development"
  | "maintenance";

export interface Service {
  slug: ServiceSlug;
  title: string;
  /** One-line promise used in lists and cards. */
  summary: string;
  /** Large statement used on the service page hero. */
  headline: string;
  problem: string[];
  solution: string[];
  capabilities: TitledDescription[];
  technologies: string[];
  faqs: Faq[];
}
