import type { ResearchItem } from "@/types";
import { siteConfig } from "@/lib/site-config";

// Running record of past research briefs and cited external sources, newest
// first. Add a new entry here whenever a new brief is published — the old
// PDF file must stay in /public under its own path so its entry keeps
// working (don't delete/overwrite a past brief file when adding a new one).
export const researchItems: ResearchItem[] = [
  {
    title: "Research brief — August 2026",
    date: "August 2026",
    description:
      "Current findings on where SMEs lose the most time to manual processes and where custom technology realistically pays off.",
    type: "document",
    url: siteConfig.researchBriefPath,
  },
  {
    title: "SME Barometer: small business owners spend nearly twice the time on admin than growing their business",
    date: "July 2026",
    description:
      "Survey of 1,000 UK micro, small and medium-sized business owners, run by American Express with Small Business Saturday UK.",
    type: "source",
    url: "https://retailtimes.co.uk/amex-sme-barometer-small-business-owners-spend-nearly-twice-the-time-on-admin-than-growing-their-business/",
    publisher: "American Express / Small Business Saturday UK",
  },
  {
    title: "Business Solutions Survey 2024",
    date: "2024",
    description:
      "Survey of 630 US small business owners and executives on manual data entry and reconciling information across apps.",
    type: "source",
    url: "https://erp.intuit.com/blog/research/business-solutions-survey-2024/",
    publisher: "Intuit",
  },
];
