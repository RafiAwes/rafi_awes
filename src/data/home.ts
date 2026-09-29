import type { ServiceSlug } from "@/types/service";

/** "What I Build" — three editorial blocks on the homepage. */
export const capabilities = [
  {
    index: "01",
    title: "Business Software",
    description:
      "Custom systems that help businesses manage, automate and scale operations.",
    examples: ["CRM", "ERP", "HRM", "Inventory", "POS", "Booking", "Dashboards", "Automation"],
    href: "/services/business-software",
  },
  {
    index: "02",
    title: "Digital Experiences",
    description:
      "High-performance websites and digital platforms designed around brand, users and business goals.",
    examples: ["Business Websites", "Corporate Websites", "E-commerce", "Landing Pages", "Web Applications"],
    href: "/services/web-development",
  },
  {
    index: "03",
    title: "Startup Products",
    description:
      "From idea validation to MVP and scalable product development.",
    examples: ["MVP", "SaaS", "AI Features", "APIs", "Automation", "Product Architecture"],
    href: "/services/startup-mvp",
  },
] as const;

export interface ProblemPrompt {
  problem: string;
  answer: string;
  description: string;
  builds: string[];
  service: ServiceSlug;
}

/** "What are you trying to solve?" */
export const problems: ProblemPrompt[] = [
  {
    problem: "My business still relies on spreadsheets.",
    answer: "Business Software",
    description:
      "A single system for customers, operations and reporting — built around the way your team already works, replacing spreadsheets one workflow at a time.",
    builds: ["CRM", "Inventory", "Dashboards", "Role-based access"],
    service: "business-software",
  },
  {
    problem: "I need customers to book online.",
    answer: "Booking Platform",
    description:
      "Availability calculated from real staff hours and services, with confirmations, cancellation policies and payments handled for you.",
    builds: ["Availability engine", "Staff schedules", "Payments", "Reminders"],
    service: "booking-platforms",
  },
  {
    problem: "I have a startup idea but don't know where to start.",
    answer: "Startup MVP",
    description:
      "We define the smallest product that proves the idea, then build it properly — with architecture that keeps your next steps open.",
    builds: ["Product scope", "MVP", "Architecture", "Roadmap"],
    service: "startup-mvp",
  },
  {
    problem: "My website doesn't represent my business.",
    answer: "Digital Experience",
    description:
      "A fast, considered website that explains what makes you different and turns visitors into conversations.",
    builds: ["Brand-led design", "Performance", "SEO", "CMS"],
    service: "web-development",
  },
  {
    problem: "I want to automate repetitive work.",
    answer: "AI & Automation",
    description:
      "Workflows, notifications and AI-assisted steps that remove repetitive work, with review built in where accuracy matters.",
    builds: ["Workflow automation", "LLM integration", "Data extraction"],
    service: "ai-solutions",
  },
];

/** From idea to working product. */
export const processSteps = [
  { index: "01", title: "Discover", description: "Understand the business, users and problem." },
  { index: "02", title: "Define", description: "Define product requirements and roadmap." },
  { index: "03", title: "Design", description: "Design the experience, interface and system." },
  { index: "04", title: "Build", description: "Develop scalable architecture and functionality." },
  { index: "05", title: "Launch", description: "Test, deploy and monitor." },
  { index: "06", title: "Grow", description: "Maintain, improve and expand." },
] as const;

/** Technology grouped by what it is used for — not a logo wall. */
export const technologyGroups = [
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Django", "Laravel", "Node.js"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "Redis"] },
  { label: "Infrastructure", items: ["Docker", "Cloud", "CI/CD", "REST APIs"] },
  { label: "AI", items: ["LLM APIs", "AI Integration", "Automation", "Intelligent Features"] },
] as const;

export const philosophy = [
  { title: "Understand the problem.", description: "Software starts with the business, the people using it and what success actually looks like." },
  { title: "Design the solution.", description: "Flows, interfaces and system architecture decided before the first line of production code." },
  { title: "Build it properly.", description: "Clean, tested, documented work that someone else could pick up and extend." },
] as const;
