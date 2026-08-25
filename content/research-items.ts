import type { ResearchItem } from "@/types";
import { siteConfig } from "@/lib/site-config";

// Running record of past research briefs, newest first. Add a new entry here
// whenever a new brief is published — the old PDF file must stay in /public
// under its own path so its entry keeps working (don't delete/overwrite a
// past brief file when adding a new one).
//
// External "source" entries are deliberately not used here even though the
// type supports them — don't link out to a competitor's website (e.g. a
// vendor selling competing business/ERP software), even as a cited source.
// If a genuinely non-competitor source is worth citing later, add it as a
// type: "source" entry; otherwise keep this to "document" entries only.
export const researchItems: ResearchItem[] = [
  {
    title: "Research brief — August 2026",
    date: "August 2026",
    description:
      "Current findings on where SMEs lose the most time to manual processes and where custom technology realistically pays off.",
    type: "document",
    url: siteConfig.researchBriefPath,
  },
];
