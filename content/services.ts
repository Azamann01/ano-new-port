import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "process-automation",
    title: "Process Automation",
    description:
      "Replace manual spreadsheets and repetitive busywork with automated workflows tailored to how your team actually operates.",
    icon: "Workflow",
    features: [
      "Automated data entry and reporting",
      "Scheduled jobs and notifications",
      "Integrations between the tools you already use",
    ],
  },
  {
    slug: "internal-tools",
    title: "Internal Tools & Dashboards",
    description:
      "Custom-built internal apps that give your team a single source of truth instead of juggling five different systems.",
    icon: "LayoutDashboard",
    features: [
      "Admin panels and operational dashboards",
      "Role-based access for staff and managers",
      "Built to match your existing processes, not the other way around",
    ],
  },
  {
    slug: "systems-integration",
    title: "Systems Integration",
    description:
      "Connect your CRM, accounting, inventory, and scheduling tools so data moves automatically instead of being re-typed.",
    icon: "Plug",
    features: [
      "API integrations between existing SaaS tools",
      "Data syncing and migration",
      "Custom webhooks and automation pipelines",
    ],
  },
  {
    slug: "custom-web-apps",
    title: "Custom Web Applications",
    description:
      "When off-the-shelf software doesn't fit, I build lightweight, maintainable web apps designed specifically for your workflow.",
    icon: "AppWindow",
    features: [
      "Booking, ordering, and workflow apps",
      "Client portals and self-service tools",
      "Built for long-term maintainability, not just launch day",
    ],
  },
];
