import type { ImageAsset, TitledDescription } from "./common";
import type { ServiceSlug } from "./service";
import type { SolutionSlug } from "./solution";

/** Where the project is in its lifecycle. Never overstate this. */
export type ProjectStatus = "live" | "in-development" | "prototype" | "concept";

/** Who the project was built for. */
export type ProjectType = "client" | "personal" | "startup";

/** Motif used by the generated cover artwork when no screenshot exists. */
export type CoverMotif = "orbit" | "grid" | "rings" | "bars" | "blocks" | "chain";

export interface ProjectVisual {
  background: string;
  foreground: string;
  accent: string;
  motif: CoverMotif;
}

/** Long-form case-study sections, rendered in CASE_STUDY_SECTIONS order. */
export type CaseStudySectionKey =
  | "overview"
  | "problem"
  | "goals"
  | "role"
  | "strategy"
  | "design"
  | "architecture"
  | "development"
  | "challenges"
  | "outcome"
  | "lessons";

export interface CaseStudySection {
  paragraphs: string[];
  points?: string[];
}

export interface CaseStudy {
  sections: Partial<Record<CaseStudySectionKey, CaseStudySection>>;
  keyFeatures?: TitledDescription[];
  technicalDecisions?: TitledDescription[];
  screenshots?: Array<ImageAsset & { caption?: string }>;
}

export interface Project {
  slug: string;
  title: string;
  /** Optional secondary name, e.g. an internal product name. */
  codename?: string;
  categories: string[];
  summary: string;
  technologies: string[];
  status: ProjectStatus;
  type: ProjectType;
  /** Null when not confirmed — it is omitted rather than guessed. */
  year: string | null;
  role: string;
  featured: boolean;
  flagship?: boolean;
  links?: { live?: string; repository?: string };
  visual: ProjectVisual;
  cover?: ImageAsset;
  services: ServiceSlug[];
  industries: SolutionSlug[];
  related?: string[];
  caseStudy?: CaseStudy;
}
