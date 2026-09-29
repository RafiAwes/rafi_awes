import type { Solution } from "@/types/solution";

export const solutions: Solution[] = [
  {
    slug: "startups",
    title: "Startups",
    formula: ["MVP", "Product Architecture", "AI"],
    summary:
      "Turning an idea into a working product quickly, without making early decisions that block growth later.",
    challenges: [
      "Limited time and budget before the idea needs to prove itself",
      "Uncertainty about which features actually matter",
      "Technical decisions made early that are expensive to undo",
    ],
    modules: [
      { title: "Scoped MVP", description: "The core user journey built well, and nothing that doesn't serve it." },
      { title: "Accounts & roles", description: "Authentication and permissions that won't need rewriting at scale." },
      { title: "Analytics hooks", description: "Instrumentation so you learn from real usage from day one." },
      { title: "AI capabilities", description: "Model-powered features where they give users a genuine advantage." },
    ],
    services: ["startup-mvp", "ai-solutions", "api-development"],
  },
  {
    slug: "salons-grooming",
    title: "Salons & Grooming",
    formula: ["Booking", "CRM", "Customer Management"],
    summary:
      "Booking, staff scheduling and customer relationships designed around how salons and grooming businesses actually work.",
    challenges: [
      "Bookings arrive through calls and messages and are hard to keep in sync",
      "Each staff member offers different services on different hours",
      "Late cancellations and no-shows cost real money",
      "Customer history and loyalty live in someone's memory",
    ],
    modules: [
      { title: "Online booking", description: "Availability computed from services, staff hours and existing appointments." },
      { title: "Staff & schedules", description: "Working hours, days off and time-off approvals." },
      { title: "Customer CRM", description: "Visit history, preferences, reliability and loyalty points." },
      { title: "Inventory", description: "Product stock and usage tracked alongside services." },
    ],
    services: ["booking-platforms", "business-software"],
  },
  {
    slug: "garments",
    title: "Garments",
    formula: ["Inventory", "Operations", "Business Management"],
    summary:
      "Visibility across orders, materials, production and stock for garment manufacturers and traders.",
    challenges: [
      "Order and production status tracked across spreadsheets and messages",
      "Material and finished-goods stock that never quite matches reality",
      "Reporting that takes days to assemble by hand",
    ],
    modules: [
      { title: "Order management", description: "Buyer orders, styles, quantities and delivery dates in one place." },
      { title: "Inventory", description: "Materials and finished goods with movements and audit trail." },
      { title: "Production tracking", description: "Order progress across stages, visible to the people who need it." },
      { title: "Reporting", description: "Operational dashboards without manual consolidation." },
    ],
    services: ["business-software", "api-development"],
  },
  {
    slug: "hotels",
    title: "Hotels",
    formula: ["Booking", "Customer Experience", "Operations"],
    summary:
      "Direct booking, guest experience and day-to-day operations for independent hotels and guesthouses.",
    challenges: [
      "Dependence on third-party booking platforms for every reservation",
      "Guest information scattered across systems",
      "Housekeeping and operations coordinated by phone",
    ],
    modules: [
      { title: "Direct booking", description: "Room availability and reservations on your own website." },
      { title: "Guest profiles", description: "Stays, preferences and communication history." },
      { title: "Operations", description: "Housekeeping status, tasks and staff coordination." },
    ],
    services: ["booking-platforms", "web-development", "business-software"],
  },
  {
    slug: "education",
    title: "Education",
    formula: ["Enrolment", "Student Management", "Communication"],
    summary:
      "Systems for schools, training centres and course providers to manage students, classes and communication.",
    challenges: [
      "Admissions and enrolment handled through paper forms",
      "Attendance and results kept in separate spreadsheets",
      "Parents and students hard to reach consistently",
    ],
    modules: [
      { title: "Enrolment", description: "Online applications and admissions workflow." },
      { title: "Student records", description: "Classes, attendance and results in one system." },
      { title: "Communication", description: "Notices and updates to students and guardians." },
    ],
    services: ["business-software", "web-development"],
  },
  {
    slug: "service-businesses",
    title: "Service Businesses",
    formula: ["Booking", "Job Management", "Invoicing"],
    summary:
      "For cleaning, repair, consulting and other service companies that schedule people and visits.",
    challenges: [
      "Requests arrive from many channels and some are lost",
      "Scheduling staff to jobs is manual and error-prone",
      "Invoicing happens late, or not at all",
    ],
    modules: [
      { title: "Requests & booking", description: "Customers request and book services online." },
      { title: "Job scheduling", description: "Assign staff, track status and record completion." },
      { title: "Invoicing", description: "Invoices generated from completed jobs." },
    ],
    services: ["booking-platforms", "business-software"],
  },
  {
    slug: "smes",
    title: "SMEs",
    formula: ["Website", "CRM", "Automation"],
    summary:
      "Practical digital foundations for small and medium businesses ready to move beyond spreadsheets.",
    challenges: [
      "A website that doesn't represent the business",
      "Customer information spread across inboxes and phones",
      "Repetitive admin work that eats into every week",
    ],
    modules: [
      { title: "Business website", description: "A credible, fast site that brings in enquiries." },
      { title: "Lightweight CRM", description: "Leads and customers tracked in one place." },
      { title: "Automation", description: "Routine tasks and notifications handled automatically." },
    ],
    services: ["web-development", "business-software", "ai-solutions"],
  },
];
