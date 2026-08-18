import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "operational-discovery",
    title: "Operational Discovery",
    description: "Understand where operations lose time before committing to any solution.",
    outcome: "A clear map of where time and money leak, before a line of code gets written.",
    icon: "Search",
    image: "/services/operational-discovery.png",
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    description: "Remove repetitive manual work from daily operations.",
    outcome: "Hours back every week that were spent on repetitive, error-prone tasks.",
    icon: "Workflow",
    image: "/services/business-process-automation.png",
  },
  {
    slug: "custom-business-systems",
    title: "Custom Business Systems",
    description: "Technology built around how your business actually operates.",
    outcome: "One system that fits your workflow, instead of a workflow bent to fit off-the-shelf tools.",
    icon: "AppWindow",
    image: "/services/custom-business-systems.png",
  },
  {
    slug: "operational-dashboards",
    title: "Operational Dashboards",
    description: "Live visibility into the metrics that drive decisions.",
    outcome: "Decisions made from real-time numbers, not end-of-month guesswork.",
    icon: "LayoutDashboard",
    image: "/services/operational-dashboards.png",
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    description: "Modernise legacy processes to improve efficiency and accuracy.",
    outcome: "Fewer manual handoffs, and fewer errors slipping through outdated processes.",
    icon: "RefreshCw",
    image: "/services/digital-transformation.png",
  },
  {
    slug: "mvp-development",
    title: "MVP Development",
    description: "Validate new ideas with scalable, production ready technology.",
    outcome: "A working product in front of real users, before committing to a bigger build.",
    icon: "Rocket",
    image: "/services/mvp-development.png",
  },
];
