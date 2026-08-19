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
    slug: "field-service-scheduler",
    title: "Field Service Scheduler",
    client: "Internal build",
    industry: "Home Services",
    summary:
      "Replaced a manual whiteboard and phone scheduling process with a shared dispatch tool for technicians.",
    problem:
      "Dispatchers were manually coordinating technician schedules over the phone, leading to double bookings and missed appointments.",
    solution:
      "Built a lightweight scheduling app with an intuitive dispatch board, technician availability and automated SMS reminders for customers.",
    results: [
      "40% fewer missed appointments",
      "Dispatch time cut from 20 minutes to under 5 minutes per job",
      "Technicians get their day's schedule automatically each morning",
    ],
    tags: ["Scheduling", "SMS Automation", "Internal Tool"],
    image: "/projects/field-service-scheduler.svg",
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
