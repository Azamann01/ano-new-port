import type { ProjectCaseStudy } from "@/types";

// Honest framing: none of these were paid client engagements yet, so `client`
// reads as deliberate company R&D ("Internal build") rather than a
// company-shaped name that could pass as a real (but unnamed) client. Swap
// it for the real client name once one of these becomes an actual engagement.
export const projects: ProjectCaseStudy[] = [
  {
    slug: "hospitality-supply-chain-platform",
    title: "Hospitality Supply Chain Operations Platform",
    client: "Internal build",
    industry: "Hospitality",
    summary:
      "An ordering platform that connects restaurants and suppliers with one shared, live record of every order. It replaces daily phone calls and guesswork.",
    metaDescription:
      "An ordering platform that connects restaurants and suppliers with one shared, live record of every order.",
    problem:
      "Ordering between restaurants and suppliers ran entirely on phone calls and texts, with no shared record of what was ordered, confirmed, or where it stood. Orders got lost and neither side had fulfilment visibility.",
    solution:
      "Built an MVP with two connected portals. Restaurants get an ordering flow with reordering in one click and suppliers get a dashboard that tracks every order through five stages (Submitted, Confirmed, Preparing, Out for Delivery and Delivered). Both sides see the status update live.",
    results: [
      "Order lifecycle tracked end to end across both portals, restaurant and supplier",
      "Reordering in one click replaces the daily phone call",
      "Live status updates remove the need for extra calls to check on an order",
    ],
    tags: ["MVP", "Hospitality", "Dual Portal"],
    techStack: ["Next.js", "Supabase", "Vercel"],
    image: "/projects/hospitality-supply-chain-platform.jpg",
    video: "/projects/hospitality-supply-chain-platform.mp4",
    videoPoster: "/projects/hospitality-supply-chain-platform-poster.png",
    liveDemoUrl: "https://hospitality.techwithtop.co.uk/",
  },
  {
    slug: "operational-management",
    title: "Operational Management",
    client: "Internal build",
    industry: "Home Services",
    summary:
      "A role-based operations platform for field service teams: job assignment, scheduling and reporting in one shared system, replacing the spreadsheets and texts most SME crews still run on.",
    metaDescription:
      "A role-based operations platform for field service teams: job assignment, scheduling and reporting in one shared system.",
    problem:
      "SMEs running field jobs (contractors, service crews) coordinate customer information, scheduling and employee assignment across spreadsheets and texts, with no single source of truth and no visibility into what's overdue or who's overloaded.",
    solution:
      "Built a role-based operations platform (Admin/Employee) covering the full job lifecycle: assignment, status tracking, multi-site customer management, an append-only audit-trail log per job, live dashboards and VAT-aware revenue reporting.",
    results: [
      "Full job audit trail: every status change, note and assignment logged automatically",
      "Real-time ops visibility: overdue and due-today jobs, team workload and weekly performance surfaced on a single dashboard, no spreadsheet reconciliation",
      "Role-scoped access enforced at three layers (route, layout, server action): employees see only their assigned jobs, admins get full visibility",
    ],
    tags: ["Full-Stack", "Operations Management", "Field Service", "Role-Based Auth"],
    techStack: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL (Neon)",
      "Prisma 6",
      "NextAuth.js v5",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Recharts",
      "React Hook Form",
      "Zod",
      "Vercel",
    ],
    image: "/projects/operational-management.png",
    video: "/projects/operational-management.mp4",
    videoPoster: "/projects/operational-management-poster.png",
    liveDemoUrl: "https://operation-platform.techwithtop.co.uk",
  },
  {
    slug: "inventory-sync-pipeline",
    title: "Inventory Sync Pipeline",
    client: "Internal build",
    industry: "Retail",
    summary:
      "Connected point of sale and ecommerce inventory so stock counts stayed accurate across 6 store locations.",
    problem:
      "Store inventory and the online store were tracked separately, causing overselling and manual reconciliation at the end of each day.",
    solution:
      "Built an integration pipeline syncing POS inventory changes to the online store continuously, with a daily reconciliation report.",
    results: [
      "Eliminated overselling incidents",
      "Removed 6 hours/week of manual reconciliation work",
      "Single dashboard for stock across all locations",
    ],
    tags: ["Integrations", "Retail", "Automation"],
    image: "/projects/inventory-sync-pipeline.svg",
  },
  {
    slug: "client-onboarding-portal",
    title: "Client Onboarding Portal",
    client: "Internal build",
    industry: "Professional Services",
    summary:
      "An online portal so new clients can submit documents and information without a long email exchange.",
    problem:
      "Client onboarding relied on email chains for document collection, often taking weeks and multiple follow-ups.",
    solution:
      "Built a secure client portal with guided document upload, status tracking and automated reminder emails.",
    results: [
      "Onboarding time reduced from 3 weeks to under 5 days",
      "Staff reclaimed hours previously spent chasing documents",
      "Clients get live status visibility",
    ],
    tags: ["Client Portal", "Workflow", "Professional Services"],
    image: "/projects/client-onboarding-portal.jpg",
  },
  {
    slug: "maintenance-request-system",
    title: "Maintenance Request System",
    client: "Internal build",
    industry: "Real Estate",
    summary:
      "A simple ticketing system for tenants to submit maintenance requests and for staff to track resolution.",
    problem:
      "Maintenance requests came in through calls, texts and emails with no central tracking, causing requests to fall through the cracks.",
    solution:
      "Built a lightweight ticketing system with tenant submission forms, staff assignment and status notifications.",
    results: [
      "100% of requests now centrally tracked",
      "Average resolution time visibility for the first time",
      "Tenant satisfaction scores improved",
    ],
    tags: ["Ticketing", "Real Estate", "Internal Tool"],
    image: "/projects/maintenance-request-system.svg",
  },
];
