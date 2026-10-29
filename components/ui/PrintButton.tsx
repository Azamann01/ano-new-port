"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * "Download as PDF" via the browser's own print-to-PDF, rather than a
 * generated file. The PDF is then the article by definition and can never
 * drift from it, and it needs no PDF-generation dependency (see the
 * "no new dependency or service" rule in CLAUDE.md). The print styles live
 * in app/globals.css under `@media print`.
 */
export function PrintButton({ label = "Download as PDF" }: { label?: string }) {
  return (
    <Button variant="secondary" onClick={() => window.print()}>
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
}
