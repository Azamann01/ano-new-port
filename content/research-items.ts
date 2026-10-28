import type { ResearchItem } from "@/types";

// Running record of past research briefs, newest first. Add a new entry here
// whenever a new brief is published — the old PDF file must stay in /public
// under its own path so its entry keeps working (don't delete/overwrite a
// past brief file when adding a new one).
//
// Every entry's `url` is a LITERAL, versioned path, deliberately not
// `siteConfig.researchBriefPath`. That config value is a moving pointer to
// whichever brief is current, so an archive entry referencing it would
// silently start serving a newer brief under an older brief's date label.
// New briefs go to /research/brief-<month>-<year>.pdf; the August 2026 one
// predates that convention and keeps its original /research-brief.pdf path.
//
// External "source" entries are deliberately not used here even though the
// type supports them — don't link out to a competitor's website (e.g. a
// vendor selling competing business/ERP software), even as a cited source.
// If a genuinely non-competitor source is worth citing later, add it as a
// type: "source" entry; otherwise keep this to "document" entries only.
export const researchItems: ResearchItem[] = [
  {
    title: "Where should restaurants, suppliers and field-service businesses automate first?",
    date: "October 2026",
    description:
      "How to decide which workflow is worth investing in, using frequency, impact, feasibility and return as the test.",
    type: "document",
    url: "/research/brief-october-2026.pdf",
  },
  {
    title: "The hidden administrative work behind SME invoicing",
    date: "September 2026",
    description:
      "What HMRC research on electronic invoicing shows about the manual steps still sitting between a completed job and a paid invoice.",
    type: "document",
    url: "/research/brief-september-2026.pdf",
  },
  {
    title: "Research brief — August 2026",
    date: "August 2026",
    description:
      "Current findings on where SMEs lose the most time to manual processes and where custom technology realistically pays off.",
    type: "document",
    url: "/research-brief.pdf",
  },
];
