import type { TitledDescription } from "./common";
import type { ServiceSlug } from "./service";

export type SolutionSlug =
  | "startups"
  | "salons-grooming"
  | "garments"
  | "hotels"
  | "education"
  | "service-businesses"
  | "smes";

export interface Solution {
  slug: SolutionSlug;
  title: string;
  /** The system composition, e.g. "Booking + CRM + Customer Management". */
  formula: string[];
  summary: string;
  challenges: string[];
  modules: TitledDescription[];
  services: ServiceSlug[];
}
