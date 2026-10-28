#!/usr/bin/env python3
"""Generate TechWithTop research brief PDFs from JSON content files.

The August 2026 brief was generated ad hoc with ReportLab and the script was
thrown away, so the PDF silently drifted out of sync with the Research page.
This script exists so every brief is reproducible: edit the JSON, re-run, commit.

Usage:
    python3 scripts/build-research-brief.py              # build all briefs
    python3 scripts/build-research-brief.py october-2026 # build one

Content lives in scripts/research-briefs/<slug>.json. Output goes to
public/research/brief-<slug>.pdf.

House rules this script and its content must respect (see CLAUDE.md):
  - Never a comma before "and" (no Oxford commas).
  - Never print a link to a competitor's website. The gov.uk sources cited by
    the September and October briefs are fine; a vendor selling competing
    business/ERP tooling is not.
  - An existing brief's PDF is never overwritten once an archive entry in
    content/research-items.ts points at it. New brief, new slug, new file.
"""

import json
import pathlib
import sys

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import ListFlowable, ListItem, PageBreak, Paragraph, SimpleDocTemplate, Spacer

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "scripts" / "research-briefs"
OUT_DIR = ROOT / "public" / "research"

# Matches --container in app/globals.css, the one brand colour on the site.
BRAND = HexColor("#0369A1")
INK = HexColor("#111111")
MUTED = HexColor("#555555")


def build_styles():
    base = getSampleStyleSheet()
    body_font, bold_font = "Helvetica", "Helvetica-Bold"
    return {
        "wordmark": ParagraphStyle(
            "wordmark", parent=base["Normal"], fontName=bold_font,
            fontSize=18, leading=22, textColor=INK, spaceAfter=2,
        ),
        "tagline": ParagraphStyle(
            "tagline", parent=base["Normal"], fontName=body_font,
            fontSize=9.5, leading=13, textColor=MUTED, spaceAfter=18,
        ),
        "eyebrow": ParagraphStyle(
            "eyebrow", parent=base["Normal"], fontName=bold_font,
            fontSize=8.5, leading=11, textColor=BRAND, spaceAfter=6,
        ),
        "title": ParagraphStyle(
            "title", parent=base["Normal"], fontName=bold_font,
            fontSize=19, leading=24, textColor=INK, spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "subtitle", parent=base["Normal"], fontName=body_font,
            fontSize=10, leading=14, textColor=MUTED, spaceAfter=4,
        ),
        "heading": ParagraphStyle(
            "heading", parent=base["Normal"], fontName=bold_font,
            fontSize=12.5, leading=16, textColor=BRAND,
            spaceBefore=16, spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body", parent=base["Normal"], fontName=body_font,
            fontSize=10, leading=15, textColor=INK,
            alignment=TA_LEFT, spaceAfter=8,
        ),
        "emphasis": ParagraphStyle(
            "emphasis", parent=base["Normal"], fontName=bold_font,
            fontSize=10.5, leading=15, textColor=BRAND,
            spaceBefore=6, spaceAfter=10,
        ),
        "note": ParagraphStyle(
            "note", parent=base["Normal"], fontName=body_font,
            fontSize=8.5, leading=12, textColor=MUTED, spaceAfter=6,
        ),
        "source": ParagraphStyle(
            "source", parent=base["Normal"], fontName=body_font,
            fontSize=8.5, leading=12, textColor=MUTED, spaceAfter=8,
        ),
    }


def render_blocks(blocks, styles):
    """Turn the JSON block list into ReportLab flowables."""
    flow = []
    for block in blocks:
        kind = block.get("type", "p")
        if kind == "p":
            flow.append(Paragraph(block["text"], styles["body"]))
        elif kind == "label":
            # A bold lead-in followed by its text, e.g. "Discovery question: ..."
            flow.append(
                Paragraph(f'<b>{block["label"]}</b> {block["text"]}', styles["body"])
            )
        elif kind == "emphasis":
            flow.append(Paragraph(block["text"], styles["emphasis"]))
        elif kind in {"bullets", "numbers"}:
            items = [
                ListItem(Paragraph(t, styles["body"]), leftIndent=10)
                for t in block["items"]
            ]
            flow.append(
                ListFlowable(
                    items,
                    bulletType="1" if kind == "numbers" else "bullet",
                    start="1" if kind == "numbers" else None,
                    leftIndent=14,
                    bulletFontName="Helvetica",
                    bulletFontSize=9,
                )
            )
            flow.append(Spacer(1, 6))
        elif kind == "pagebreak":
            flow.append(PageBreak())
        else:
            raise ValueError(f"Unknown block type: {kind!r}")
    return flow


def build_brief(data, styles):
    flow = [
        Paragraph("TechWithTop", styles["wordmark"]),
        Paragraph("Helping SMEs work smarter with technology", styles["tagline"]),
        Paragraph("RESEARCH BRIEF", styles["eyebrow"]),
        Paragraph(data["title"], styles["title"]),
        Paragraph(data["dateLabel"], styles["subtitle"]),
    ]
    if data.get("researchFocus"):
        flow.append(
            Paragraph(f'<b>Research focus:</b> {data["researchFocus"]}', styles["subtitle"])
        )
    flow.append(Spacer(1, 6))

    for section in data["sections"]:
        if section.get("heading"):
            flow.append(Paragraph(section["heading"], styles["heading"]))
        flow.extend(render_blocks(section["blocks"], styles))

    if data.get("methodology"):
        flow.append(Spacer(1, 10))
        flow.append(
            Paragraph(f'<b>Research methodology:</b> {data["methodology"]}', styles["note"])
        )

    if data.get("sources"):
        flow.append(Paragraph("Sources", styles["heading"]))
        for src in data["sources"]:
            text = src["text"]
            if src.get("url"):
                text += f'<br/><font color="#0369A1">{src["url"]}</font>'
            flow.append(Paragraph(text, styles["source"]))

    return flow


def main(argv):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    styles = build_styles()

    wanted = set(argv[1:])
    paths = sorted(CONTENT_DIR.glob("*.json"))
    if wanted:
        paths = [p for p in paths if p.stem in wanted]
        missing = wanted - {p.stem for p in paths}
        if missing:
            sys.exit(f"No content file for: {', '.join(sorted(missing))}")
    if not paths:
        sys.exit(f"No brief content found in {CONTENT_DIR}")

    for path in paths:
        data = json.loads(path.read_text(encoding="utf-8"))
        out = OUT_DIR / f"brief-{path.stem}.pdf"
        doc = SimpleDocTemplate(
            str(out),
            pagesize=A4,
            leftMargin=20 * mm, rightMargin=20 * mm,
            topMargin=18 * mm, bottomMargin=18 * mm,
            title=f'TechWithTop Research Brief — {data["dateLabel"]}',
            author="TechWithTop",
            subject=data["title"],
        )
        doc.build(build_brief(data, styles))
        print(f"  {out.relative_to(ROOT)}  ({out.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main(sys.argv)
