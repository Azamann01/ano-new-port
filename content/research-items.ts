import type { ResearchItem } from "@/types";

// Legacy/standalone archive entries only. A research brief is now an MDX
// article in content/research/, and ResearchArchive derives those rows
// automatically — don't add an article here as well or it lists twice.
//
// What belongs here: an entry with no article behind it. Right now that's the
// August 2026 PDF, which predates the MDX pipeline. A cited third-party source
// worth listing could also live here as type: "source".
//
// Never delete or overwrite a PDF in /public that an entry points at, or that
// entry's download breaks.
//
// External "source" entries are deliberately not used here even though the
// type supports them — don't link out to a competitor's website (e.g. a
// vendor selling competing business/ERP software), even as a cited source.
// If a genuinely non-competitor source is worth citing later, add it as a
// type: "source" entry; otherwise keep this to "document" entries only.
// Intentionally empty. The August 2026 brief used to live here as a PDF row;
// it's now an MDX article like the others, which fixed its three defects (the
// old time framing, a printed competitor URL as a source and an overstatement
// of the Amex finding). public/research-brief.pdf still exists so any external
// link to it doesn't 404, but it carries those defects so the site no longer
// links to it.
export const researchItems: ResearchItem[] = [];
