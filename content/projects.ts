import type { ProjectCaseStudy } from "@/types";

export const projects: ProjectCaseStudy[] = [
  {
    slug: "field-service-scheduler",
    title: "Field Service Scheduler",
    client: "Regional HVAC Contractor",
    industry: "Home Services",
    summary:
      "Replaced a manual whiteboard and phone scheduling process with a shared dispatch tool for technicians.",
    problem:
      "Dispatchers were manually coordinating technician schedules over the phone, leading to double bookings and missed appointments.",
    solution:
      "Built a lightweight scheduling app with an intuitive dispatch board, technician availability, and automated SMS reminders for customers.",
    results: [
      "40% fewer missed appointments in the first quarter",
      "Dispatch time cut from 20 minutes to under 5 minutes per job",
      "Technicians get their day's schedule automatically each morning",
    ],
    tags: ["Scheduling", "SMS Automation", "Internal Tool"],
    image: "/projects/field-service-scheduler.svg",
  },
  {
    slug: "inventory-sync-pipeline",
    title: "Inventory Sync Pipeline",
    client: "Multi-location Retailer",
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
    client: "Boutique Accounting Firm",
    industry: "Professional Services",
    summary:
      "An online portal so new clients can submit documents and information without a long email exchange.",
    problem:
      "Client onboarding relied on email chains for document collection, often taking weeks and multiple follow-ups.",
    solution:
      "Built a secure client portal with guided document upload, status tracking, and automated reminder emails.",
    results: [
      "Onboarding time reduced from 3 weeks to under 5 days",
      "Staff reclaimed hours previously spent chasing documents",
      "Clients get live status visibility",
    ],
    tags: ["Client Portal", "Workflow", "Professional Services"],
    image: "/projects/client-onboarding-portal.svg",
  },
  {
    slug: "maintenance-request-system",
    title: "Maintenance Request System",
    client: "Property Management Company",
    industry: "Real Estate",
    summary:
      "A simple ticketing system for tenants to submit maintenance requests and for staff to track resolution.",
    problem:
      "Maintenance requests came in through calls, texts, and emails with no central tracking, causing requests to fall through the cracks.",
    solution:
      "Built a lightweight ticketing system with tenant submission forms, staff assignment, and status notifications.",
    results: [
      "100% of requests now centrally tracked",
      "Average resolution time visibility for the first time",
      "Tenant satisfaction scores improved",
    ],
    tags: ["Ticketing", "Real Estate", "Internal Tool"],
    image: "/projects/maintenance-request-system.svg",
  },
];
