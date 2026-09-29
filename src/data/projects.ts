import type { Project } from "@/types/project";

/**
 * Portfolio projects.
 *
 * HONESTY RULE: never add revenue, user counts, testimonials or results that
 * are not real. Where a detail is unconfirmed it is left out (e.g. `year: null`)
 * rather than guessed. Entries marked `TODO(rafi)` need confirmation.
 */
export const projects: Project[] = [
  {
    slug: "glowhaat",
    title: "GlowHaat",
    categories: ["Startup", "Digital Product", "Beauty & Grooming"],
    summary:
      "Building a modern digital ecosystem for a beauty and grooming brand, connecting brand experience, customer experience and future product capabilities.",
    technologies: ["Django", "React", "TypeScript", "PostgreSQL"],
    status: "in-development",
    type: "startup",
    year: null, // TODO(rafi): confirm start year
    role: "Product & full-stack engineering",
    featured: true,
    flagship: true,
    visual: {
      background: "#12100c",
      foreground: "#f3ead8",
      accent: "#c9a45c",
      motif: "orbit",
    },
    services: ["startup-mvp", "booking-platforms", "business-software"],
    industries: ["salons-grooming", "startups"],
    related: ["salon-management-platform"],
    caseStudy: {
      sections: {
        overview: {
          paragraphs: [
            "GlowHaat is a beauty and grooming brand being built as a connected digital product rather than a website with a booking form bolted on. The goal is one ecosystem where the brand, the customer journey and salon operations share the same foundation.",
          ],
        },
        problem: {
          paragraphs: [
            "Beauty and grooming businesses usually run on disconnected tools: a social page for the brand, a phone or messaging app for bookings, and paper or spreadsheets for staff, stock and loyalty. Customers feel the gaps as double bookings and inconsistent experiences; owners feel them as missing information.",
          ],
        },
        goals: {
          paragraphs: [
            "Create a single digital foundation for the brand that can grow with it.",
          ],
          points: [
            "A brand experience that feels as considered as the service itself",
            "A customer experience built around reliable online booking",
            "An operations layer for salons, staff, services and inventory",
            "An architecture that leaves room for future product capabilities",
          ],
        },
        role: {
          paragraphs: [
            "I lead the product and engineering work: shaping what gets built, designing the system and developing it across the stack.",
          ],
        },
        architecture: {
          paragraphs: [
            "Operations run on GlowHaat OS, a role-based salon operating system with a versioned Django REST API and a React + TypeScript frontend. Keeping business rules in the API means the brand site, customer flows and staff dashboards can all build on the same source of truth.",
          ],
        },
        outcome: {
          paragraphs: [
            "GlowHaat is in active development. The operations platform is documented as its own case study; brand and customer-facing work will be added here as it ships.",
          ],
        },
      },
    },
  },
  {
    slug: "salon-management-platform",
    title: "Salon Management Platform",
    codename: "GlowHaat OS",
    categories: ["Business Software", "Booking", "CRM"],
    summary:
      "A role-based operating system for salons: bookings with dual approval, staff scheduling, services, inventory, promotions, loyalty and reviews behind a versioned REST API.",
    technologies: [
      "Django 6",
      "Django REST Framework",
      "PostgreSQL",
      "JWT (SimpleJWT)",
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "ReportLab",
    ],
    status: "in-development",
    type: "startup",
    year: null, // TODO(rafi): confirm year
    role: "Architecture, API and frontend development",
    featured: true,
    visual: {
      background: "#0f1115",
      foreground: "#eef1f7",
      accent: "#7c93ff",
      motif: "grid",
    },
    services: ["business-software", "booking-platforms", "api-development"],
    industries: ["salons-grooming", "service-businesses"],
    related: ["glowhaat", "cleaning-service-platform"],
    caseStudy: {
      sections: {
        overview: {
          paragraphs: [
            "GlowHaat OS is a two-tier application. A Django REST Framework API owns every business rule; a React + TypeScript single-page app presents role-scoped dashboards for owners, managers, employees, customers and platform admins.",
          ],
        },
        problem: {
          paragraphs: [
            "A salon booking is not just a time slot. It depends on which staff member can perform which service, their working hours and time off, the salon's opening hours, and what happens when someone cancels late or never shows up. Generic booking tools flatten all of this, and the business logic ends up living in people's heads.",
          ],
        },
        goals: {
          paragraphs: [],
          points: [
            "Model real salon operations: salons, staff, services, schedules and time off",
            "Make bookings reliable with conflict validation and explicit approval",
            "Give every role a dashboard scoped to what they need",
            "Keep historical records accurate even when the catalogue changes",
          ],
        },
        role: {
          paragraphs: [
            "I designed the domain model and API, implemented the backend services and built the frontend dashboards.",
          ],
        },
        architecture: {
          paragraphs: [
            "Requests flow from the client to a versioned route, into a DRF ViewSet, through a serializer for validation, and into a service class that applies business rules inside a database transaction before touching models, notifications, email or PDF generation.",
          ],
          points: [
            "Client → /api/v1/<module>/ → ViewSet → Serializer → Service → Models",
            "JWT authentication with refresh-token rotation and blacklisting",
            "PostgreSQL in deployment, SQLite fallback for local development and tests",
          ],
        },
        challenges: {
          paragraphs: [
            "The hardest part was the booking lifecycle. A booking is only confirmed once both the manager and the assigned staff member accept it; cancellations are classified as early or late; salon-initiated cancellations must never count against the customer; and check-in records whether someone arrived on time, late or not at all.",
            "Those outcomes feed a customer reliability score built from completion, show-up, cancellation and punctuality, discounted by a confidence factor when history is thin, so a single missed appointment does not define a new customer.",
          ],
        },
        outcome: {
          paragraphs: [
            "The platform is in development. Core modules are implemented, and the remaining gaps are recorded in the project documentation so unfinished work is never mistaken for finished work.",
          ],
          points: [
            "Production token lifetimes and environment-based API configuration are still to be set",
            "The payment model is a demonstration and must be replaced by a tokenising payment provider before handling real cards",
            "Test coverage is thinner in some modules (inventory, promotions, reviews)",
          ],
        },
        lessons: {
          paragraphs: [
            "Writing down known gaps next to the feature list turned out to be as valuable as the features. It keeps the roadmap honest and makes handover to anyone else far easier.",
          ],
        },
      },
      keyFeatures: [
        {
          title: "Dual-approval bookings",
          description:
            "Bookings move from pending to confirmed only after both the manager and assigned staff accept, with slot-conflict validation and busy-slot lookup.",
        },
        {
          title: "Staff & scheduling",
          description:
            "Staff profiles bound to salons and the services they can perform, with working hours, days off and a reviewed time-off workflow.",
        },
        {
          title: "Reliability scoring",
          description:
            "Customer scores recalculated after every resolved booking; persistent no-shows and late cancellations can suspend new bookings.",
        },
        {
          title: "Loyalty & rewards",
          description:
            "Points awarded on completed bookings with tiered membership levels.",
        },
        {
          title: "Invoices",
          description:
            "Payment capture per booking with unique transaction IDs and downloadable PDF invoices.",
        },
        {
          title: "Consultant onboarding",
          description:
            "A reviewed onboarding flow with document-by-document verification and a full audit trail.",
        },
      ],
      technicalDecisions: [
        {
          title: "Versioned routing",
          description:
            "Every app is mounted once under /api/v1/. A future v2 is a second pattern list beside the first — nothing is forced to move.",
        },
        {
          title: "Service layer",
          description:
            "Multi-step or side-effectful operations live in service classes and run inside transactions, keeping views thin and rules testable.",
        },
        {
          title: "Secure by default",
          description:
            "Authentication is required globally; public endpoints opt out explicitly rather than private ones opting in.",
        },
        {
          title: "Private media",
          description:
            "Credential documents are stored outside the public media root and served only through an authenticated endpoint.",
        },
        {
          title: "Snapshots over joins",
          description:
            "Bookings and payments store a snapshot of service name and price so historical records stay accurate when the catalogue changes.",
        },
      ],
    },
  },
  {
    slug: "premium-bakery-bistro",
    title: "Premium Bakery & Bistro",
    categories: ["Digital Experience", "Website"],
    summary:
      "An editorial, motion-led website for a bakery and bistro, designed to carry the warmth of the space into the browser.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion"],
    status: "prototype", // TODO(rafi): confirm status and project type
    type: "personal",
    year: null,
    role: "Design and front-end development",
    featured: true,
    visual: {
      background: "#f1e7d8",
      foreground: "#2b1d12",
      accent: "#b0603a",
      motif: "rings",
    },
    services: ["web-development"],
    industries: ["smes"],
    related: ["glowhaat"],
  },
  {
    slug: "office-management-system",
    title: "Office Management System",
    categories: ["ERP", "CRM", "HRM", "Inventory"],
    summary:
      "An internal system bringing customers, people and stock into one place for day-to-day office operations.",
    technologies: [], // TODO(rafi): add stack
    status: "prototype", // TODO(rafi): confirm status and project type
    type: "personal",
    year: null,
    role: "Full-stack development",
    featured: true,
    visual: {
      background: "#e9ecef",
      foreground: "#14171c",
      accent: "#3a55e0",
      motif: "blocks",
    },
    services: ["business-software"],
    industries: ["smes", "garments"],
  },
  {
    slug: "cleaning-service-platform",
    title: "Cleaning Service Platform",
    categories: ["Booking", "Service Management"],
    summary:
      "Online booking and job management for a cleaning service — from request to scheduled visit.",
    technologies: [], // TODO(rafi): add stack
    status: "prototype", // TODO(rafi): confirm status and project type
    type: "personal",
    year: null,
    role: "Full-stack development",
    featured: false,
    visual: {
      background: "#0e1614",
      foreground: "#e6f2ee",
      accent: "#5fd3b3",
      motif: "bars",
    },
    services: ["booking-platforms"],
    industries: ["service-businesses"],
    related: ["salon-management-platform"],
  },
  {
    slug: "health-insurance-dapp",
    title: "Health Insurance DApp",
    categories: ["Web3", "Blockchain", "Healthcare"],
    summary:
      "A decentralised application exploring transparent health-insurance policies and claims on a blockchain.",
    technologies: [], // TODO(rafi): add stack
    status: "prototype", // TODO(rafi): confirm status and project type
    type: "personal",
    year: null,
    role: "Smart contract and application development",
    featured: false,
    visual: {
      background: "#0d0b16",
      foreground: "#ece8ff",
      accent: "#9b7bff",
      motif: "chain",
    },
    services: ["api-development"],
    industries: [],
  },
];
