import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    summary:
      "High-performance websites and web applications designed around your brand, your users and your business goals.",
    headline: "A website that works as hard as your business does.",
    problem: [
      "Many business websites look fine but do very little. They are slow, hard to update, invisible in search and disconnected from how the business actually sells.",
      "Templates get you online quickly, but they rarely represent what makes a business different — and they become harder to change the more you rely on them.",
    ],
    solution: [
      "I design and build websites as products: fast by default, structured for search, easy for your team to update and connected to the tools you already use.",
    ],
    capabilities: [
      { title: "Business & corporate websites", description: "Clear, credible sites that explain what you do and turn visitors into enquiries." },
      { title: "E-commerce", description: "Storefronts with considered product pages, checkout flows and order management." },
      { title: "Landing pages", description: "Focused pages for launches and campaigns, built to load instantly." },
      { title: "Web applications", description: "Interactive tools, portals and dashboards with real application logic." },
      { title: "Headless CMS", description: "Content editing through WordPress, Sanity or similar without sacrificing front-end performance." },
      { title: "Performance & SEO", description: "Core Web Vitals, structured data and semantic markup handled from the start." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Headless CMS"],
    faqs: [
      { question: "Can I update the content myself?", answer: "Yes. Where content changes regularly, I set up a CMS or a simple content structure so you can edit without touching code." },
      { question: "Do you design as well as develop?", answer: "Yes. I can design the interface from scratch or work from designs your team already has." },
      { question: "Will the site be fast on mobile?", answer: "Performance is part of the build, not a later fix. Pages are server-rendered, images are optimised and JavaScript is kept to what the interaction actually needs." },
    ],
  },
  {
    slug: "business-software",
    title: "Business Software",
    summary:
      "Custom systems that help businesses manage, automate and scale their operations — CRM, ERP, HRM, inventory, POS and dashboards.",
    headline: "Software shaped around how your business actually runs.",
    problem: [
      "Most growing businesses run on spreadsheets, messaging apps and memory. It works until it doesn't: data is duplicated, nobody is sure which version is right, and reporting takes days.",
      "Off-the-shelf software can help, but it often forces you to change how you work to fit the tool — and you pay for dozens of features you never use.",
    ],
    solution: [
      "I build focused business systems around your real workflows: a single source of truth, the right permissions for each role, and automation for the repetitive work.",
    ],
    capabilities: [
      { title: "CRM", description: "Customers, leads, history and follow-ups in one place." },
      { title: "ERP & operations", description: "Orders, production, purchasing and the processes that connect them." },
      { title: "HRM", description: "Staff records, attendance, leave and role-based access." },
      { title: "Inventory & POS", description: "Stock levels, movements, suppliers and point-of-sale." },
      { title: "Dashboards & reporting", description: "The numbers you need, without exporting spreadsheets." },
      { title: "Automation", description: "Notifications, approvals and scheduled jobs that remove repetitive work." },
    ],
    technologies: ["Django", "Laravel", "PostgreSQL", "React", "TypeScript", "REST APIs"],
    faqs: [
      { question: "Should I build custom software or buy an existing tool?", answer: "Often, buying is the right answer. I'll tell you if an existing product fits. Custom software makes sense when your process is a competitive advantage or when off-the-shelf tools force costly workarounds." },
      { question: "Can it replace our spreadsheets gradually?", answer: "Yes. A common approach is to start with the most painful workflow, import existing data, and expand module by module." },
      { question: "Who owns the code?", answer: "You do. The system is documented and handed over so it is never locked to one developer." },
    ],
  },
  {
    slug: "booking-platforms",
    title: "Booking Platforms",
    summary:
      "Online booking and scheduling for service businesses, with availability, staff, payments and customer history built in.",
    headline: "Let customers book you — without the back-and-forth.",
    problem: [
      "Taking bookings by phone or message means missed calls, double bookings and hours spent confirming appointments.",
      "Generic booking widgets rarely understand the details that matter: which staff can perform which service, working hours, buffers, cancellations and no-shows.",
    ],
    solution: [
      "I build booking systems that model how your business really schedules — services, staff, availability and policies — so customers can book with confidence and your team can run the day.",
    ],
    capabilities: [
      { title: "Availability & conflicts", description: "Slot calculation from staff hours, services and existing bookings, with conflict validation." },
      { title: "Staff scheduling", description: "Working hours, days off and time-off requests with approval." },
      { title: "Booking policies", description: "Confirmation rules, cancellation windows and no-show handling." },
      { title: "Payments & invoices", description: "Deposits or full payment with invoices generated automatically." },
      { title: "Customer profiles", description: "History, preferences and loyalty in one place." },
      { title: "Notifications", description: "Email confirmations and reminders at the right moments." },
    ],
    technologies: ["Django REST Framework", "PostgreSQL", "React", "TypeScript", "Next.js"],
    faqs: [
      { question: "Can it handle multiple staff and locations?", answer: "Yes. Availability is calculated per staff member and per location, based on the services each person can perform." },
      { question: "Can customers pay online?", answer: "Yes, through an established payment provider. Card details are handled by the provider, never stored in your database." },
    ],
  },
  {
    slug: "startup-mvp",
    title: "Startup MVP",
    summary:
      "From idea validation to a working MVP and a product architecture that can scale when it needs to.",
    headline: "From an idea to something people can actually use.",
    problem: [
      "Early-stage founders face two opposite risks: building too much before learning anything, or building something so rough it cannot grow.",
      "Without technical guidance it is hard to know what the smallest valuable version looks like, what it should cost, and which shortcuts will hurt later.",
    ],
    solution: [
      "I help define the smallest product that proves the idea, build it properly, and make architectural choices that keep the next steps open.",
    ],
    capabilities: [
      { title: "Product definition", description: "Turning the idea into user flows, scope and a realistic roadmap." },
      { title: "MVP development", description: "A working product with the core loop done well." },
      { title: "SaaS foundations", description: "Accounts, roles, billing-ready architecture and multi-tenancy where needed." },
      { title: "AI features", description: "LLM-powered capabilities where they genuinely help users." },
      { title: "APIs & integrations", description: "Clean interfaces to the services your product depends on." },
      { title: "Product architecture", description: "Decisions documented so the product can grow and the team can grow with it." },
    ],
    technologies: ["Next.js", "TypeScript", "Django", "Node.js", "PostgreSQL", "LLM APIs"],
    faqs: [
      { question: "I'm not technical. Can you still help?", answer: "Yes. Part of the work is translating the idea into clear technical decisions and explaining the trade-offs in plain language." },
      { question: "How small should an MVP be?", answer: "Small enough to build quickly, complete enough that people can get real value from the core experience. We define it together." },
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    summary:
      "Practical AI features and automation — LLM integrations, intelligent workflows and assistants that solve a specific problem.",
    headline: "AI that does useful work, not just demos.",
    problem: [
      "AI is easy to demo and hard to ship. Many AI features are impressive for a minute and then unreliable, expensive or disconnected from the actual workflow.",
    ],
    solution: [
      "I integrate AI where it has a clear job: summarising, classifying, extracting, drafting or answering — with guardrails, fallbacks and a human in the loop where it matters.",
    ],
    capabilities: [
      { title: "LLM integration", description: "Connecting language models to your product through reliable, observable APIs." },
      { title: "Document & data extraction", description: "Turning unstructured text into structured data your systems can use." },
      { title: "Assistants", description: "Grounded assistants that answer from your own content." },
      { title: "Workflow automation", description: "Automating repetitive, rules-heavy work with review steps built in." },
    ],
    technologies: ["LLM APIs", "Python", "Node.js", "TypeScript", "PostgreSQL"],
    faqs: [
      { question: "Will AI replace my team's work?", answer: "The goal is usually to remove repetitive work so people can focus on judgement. Where accuracy matters, outputs are reviewed rather than trusted blindly." },
      { question: "What about data privacy?", answer: "We decide together what data can be sent to a model provider, and design the feature around those limits." },
    ],
  },
  {
    slug: "api-development",
    title: "API Development",
    summary:
      "Well-designed REST APIs and backend systems that connect products, services and data reliably.",
    headline: "Backends that are boring in the best way.",
    problem: [
      "Fragile backends slow everything down: unclear endpoints, inconsistent validation, business rules scattered across views and nobody sure what will break.",
    ],
    solution: [
      "I design APIs around the domain: versioned routes, validation at the boundary, business rules in a service layer, and authentication that is secure by default.",
    ],
    capabilities: [
      { title: "REST API design", description: "Consistent, versioned, documented endpoints." },
      { title: "Authentication & roles", description: "Token-based auth with role-scoped permissions." },
      { title: "Integrations", description: "Payment providers, email, third-party services and webhooks." },
      { title: "Data modelling", description: "Relational schemas that reflect how the business works." },
    ],
    technologies: ["Django REST Framework", "Laravel", "Node.js", "PostgreSQL", "Redis", "Docker"],
    faqs: [
      { question: "Can you work with our existing frontend team?", answer: "Yes. I agree the API contract first so frontend and backend can progress in parallel." },
    ],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Continuous Development",
    summary:
      "Ongoing improvement, fixes and new features for products that are already live.",
    headline: "Launch is the beginning, not the end.",
    problem: [
      "Software that is not maintained slowly breaks: dependencies age, security issues appear, and small requests pile up with nobody to handle them.",
    ],
    solution: [
      "I provide continuous development: keeping the system healthy, shipping improvements in small safe steps, and planning the bigger changes before they become urgent.",
    ],
    capabilities: [
      { title: "Updates & security", description: "Dependency upgrades and security fixes on a regular cadence." },
      { title: "Monitoring", description: "Errors and performance watched so problems are caught early." },
      { title: "Feature development", description: "New capabilities added without destabilising what works." },
      { title: "Codebase improvement", description: "Refactoring and documentation that make future work cheaper." },
    ],
    technologies: ["CI/CD", "Docker", "Cloud", "Monitoring"],
    faqs: [
      { question: "Can you maintain software someone else built?", answer: "Usually, yes. I start with a review of the codebase and give you an honest picture of its condition before committing to anything." },
    ],
  },
];
