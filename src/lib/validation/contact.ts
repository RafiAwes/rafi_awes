export const projectTypes = [
  "Business software",
  "Booking platform",
  "Website",
  "Startup MVP",
  "AI & automation",
  "Something else",
] as const;

export const timelines = ["As soon as possible", "1–3 months", "3–6 months", "Just exploring"] as const;

export const budgets = ["Not sure yet", "Under $5k", "$5k–$15k", "$15k–$40k", "$40k+"] as const;

export const contactMethods = ["Email", "Phone / WhatsApp", "Video call"] as const;

export interface ContactInquiry {
  name: string;
  email: string;
  company: string;
  building: string;
  projectType: (typeof projectTypes)[number];
  timeline: (typeof timelines)[number];
  details: string;
  budget: string;
  contactMethod: (typeof contactMethods)[number];
}

export type ContactField = keyof ContactInquiry;

export type ContactParseResult =
  | { ok: true; data: ContactInquiry }
  | { ok: false; errors: Partial<Record<ContactField, string>> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? "").trim().slice(0, max);

function oneOf<T extends readonly string[]>(options: T, value: string): value is T[number] {
  return (options as readonly string[]).includes(value);
}

/** Validates and normalises a project inquiry. Runs on the server. */
export function parseContactForm(formData: FormData): ContactParseResult {
  const raw = {
    name: text(formData, "name", 120),
    email: text(formData, "email", 200),
    company: text(formData, "company", 160),
    building: text(formData, "building", 300),
    projectType: text(formData, "projectType", 60),
    timeline: text(formData, "timeline", 60),
    details: text(formData, "details", 5000),
    budget: text(formData, "budget", 60),
    contactMethod: text(formData, "contactMethod", 60),
  };

  const errors: Partial<Record<ContactField, string>> = {};
  if (raw.name.length < 2) errors.name = "Tell me your name.";
  if (!EMAIL.test(raw.email)) errors.email = "That email doesn't look quite right.";
  if (raw.building.length < 3) errors.building = "A sentence is enough.";
  if (!oneOf(projectTypes, raw.projectType)) errors.projectType = "Pick the closest match.";
  if (!oneOf(timelines, raw.timeline)) errors.timeline = "Pick a rough timeline.";
  if (raw.details.length < 20) errors.details = "A little more detail helps — a few sentences is plenty.";
  if (raw.budget && !oneOf(budgets, raw.budget)) errors.budget = "Pick a range or leave it empty.";
  if (!oneOf(contactMethods, raw.contactMethod)) errors.contactMethod = "How should I reach you?";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: raw as ContactInquiry };
}
