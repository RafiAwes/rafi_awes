export interface JourneyEntry {
  period: string;
  title: string;
  organisation?: string;
  description: string;
}

/**
 * Career journey, newest first. The section only renders once entries exist.
 * TODO(rafi): add real roles, education or milestones. Example shape:
 *   { period: "2024 — Now", title: "Software Engineer", organisation: "...", description: "..." }
 */
export const journey: JourneyEntry[] = [];

export const introduction = [
  "I'm Rafi Rahman, a software engineer and digital product builder. I work across the stack — designing data models and APIs in Django and Laravel, and building interfaces in Next.js and React.",
  "Most of my work sits where business and technology meet: booking platforms, operations systems and digital products that replace spreadsheets, phone calls and guesswork with software people can rely on.",
  "I care about the whole journey, not just the code. The best software I've worked on started with a clear understanding of how a business actually runs.",
];

export const currentFocus = [
  { title: "GlowHaat", description: "Building a digital ecosystem for a beauty and grooming brand, including its salon operations platform." },
  { title: "Digital products", description: "Taking ideas from definition to working MVP with architecture that can grow." },
  { title: "AI features", description: "Integrating language models where they do genuinely useful, reviewable work." },
];

export const strengths = [
  { title: "Domain modelling", description: "Turning messy real-world processes into clear data models, states and rules." },
  { title: "API design", description: "Versioned, secure-by-default REST APIs with business logic in a service layer." },
  { title: "Full-stack delivery", description: "Comfortable owning a feature end to end — database, API and interface." },
  { title: "Interface craft", description: "Fast, accessible, carefully animated front ends." },
];

export const workingStyle = [
  { title: "Clear communication", description: "Plain-language updates, trade-offs explained, no jargon walls." },
  { title: "Thin, complete slices", description: "Working software early and often rather than big reveals." },
  { title: "Honest documentation", description: "Known gaps written down next to finished features." },
];
