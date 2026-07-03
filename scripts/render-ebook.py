from __future__ import annotations

import json
import os
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm, mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
TMP = ROOT / "tmp" / "ebook"
OUT = ROOT / "output" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)

PDF_PATH = OUT / "aulafy-inteligencia-artificial-open-source-julio-2026.pdf"
TEX_PATH = OUT / "aulafy-inteligencia-artificial-open-source-julio-2026.tex"
DATA_PATH = TMP / "ebook-content.json"

TITLE = "Aulafy: Inteligencia Artificial Open Source"
SUBTITLE = "Manual practico para aprender, construir y automatizar con IA"
UPDATED = "Julio 2026"


def register_fonts() -> tuple[str, str, str]:
    candidates = [
        (
            "/System/Library/Fonts/Supplemental/Optima.ttc",
            "/System/Library/Fonts/Supplemental/Optima.ttc",
            "/System/Library/Fonts/Supplemental/Menlo.ttc",
        ),
        (
            "/System/Library/Fonts/Supplemental/Arial.ttf",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/System/Library/Fonts/Menlo.ttc",
        ),
    ]
    for regular, bold, mono in candidates:
        if Path(regular).exists() and Path(bold).exists():
            try:
                pdfmetrics.registerFont(TTFont("AulafySerif", regular))
                pdfmetrics.registerFont(TTFont("AulafySerifBold", bold, subfontIndex=1 if regular.endswith(".ttc") else 0))
                if Path(mono).exists():
                    pdfmetrics.registerFont(TTFont("AulafyMono", mono))
                return "AulafySerif", "AulafySerifBold", "AulafyMono"
            except Exception:
                pass
    return "Times-Roman", "Times-Bold", "Courier"


FONT, FONT_BOLD, FONT_MONO = register_fonts()


def clean_text(text: str) -> str:
    text = re.sub(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]", "", text)
    text = text.replace("→", "->").replace("←", "<-").replace("—", "-").replace("·", "-")
    text = text.replace("“", '"').replace("”", '"').replace("’", "'")
    return re.sub(r"\s+", " ", text).strip()


def esc(text: str) -> str:
    text = clean_text(text)
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def tex_escape(text: str) -> str:
    text = clean_text(text)
    for a, b in [
        ("\\", r"\textbackslash{}"),
        ("&", r"\&"),
        ("%", r"\%"),
        ("$", r"\$"),
        ("#", r"\#"),
        ("_", r"\_"),
        ("{", r"\{"),
        ("}", r"\}"),
        ("~", r"\textasciitilde{}"),
        ("^", r"\textasciicircum{}"),
    ]:
        text = text.replace(a, b)
    return text


class EbookDoc(BaseDocTemplate):
    def __init__(self, filename: str):
        margin_inner = 24 * mm
        margin_outer = 18 * mm
        margin_top = 21 * mm
        margin_bottom = 22 * mm
        frame = Frame(
            margin_inner,
            margin_bottom,
            A4[0] - margin_inner - margin_outer,
            A4[1] - margin_top - margin_bottom,
            id="normal",
        )
        super().__init__(
            filename,
            pagesize=A4,
            rightMargin=margin_outer,
            leftMargin=margin_inner,
            topMargin=margin_top,
            bottomMargin=margin_bottom,
            title=TITLE,
            author="Aulafy",
            subject="Cursos de inteligencia artificial open source",
        )
        self.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=draw_page)])


def draw_page(canvas, doc):
    canvas.saveState()
    w, h = A4
    page = canvas.getPageNumber()
    if page > 1:
        canvas.setStrokeColor(colors.HexColor("#D7D2C8"))
        canvas.setLineWidth(0.4)
        canvas.line(24 * mm, h - 16 * mm, w - 18 * mm, h - 16 * mm)
        canvas.setFont(FONT, 8.5)
        canvas.setFillColor(colors.HexColor("#6B6358"))
        canvas.drawString(24 * mm, h - 12 * mm, "Aulafy - Inteligencia Artificial Open Source")
        canvas.drawRightString(w - 18 * mm, 12 * mm, str(page))
    canvas.restoreState()


styles = getSampleStyleSheet()
styles.add(ParagraphStyle("CoverTitle", fontName=FONT_BOLD, fontSize=33, leading=37, alignment=TA_CENTER, textColor=colors.HexColor("#111827"), spaceAfter=14))
styles.add(ParagraphStyle("CoverSub", fontName=FONT, fontSize=15, leading=20, alignment=TA_CENTER, textColor=colors.HexColor("#374151"), spaceAfter=12))
styles.add(ParagraphStyle("Part", fontName=FONT_BOLD, fontSize=25, leading=30, textColor=colors.HexColor("#0F766E"), spaceAfter=12, spaceBefore=8))
styles.add(ParagraphStyle("Chapter", fontName=FONT_BOLD, fontSize=17, leading=22, textColor=colors.HexColor("#111827"), spaceAfter=8, spaceBefore=8))
styles.add(ParagraphStyle("H2", fontName=FONT_BOLD, fontSize=12.5, leading=16, textColor=colors.HexColor("#C2410C"), spaceBefore=8, spaceAfter=4))
styles.add(ParagraphStyle("H3", fontName=FONT_BOLD, fontSize=11.5, leading=15, textColor=colors.HexColor("#374151"), spaceBefore=6, spaceAfter=3))
styles.add(ParagraphStyle("BodyA", fontName=FONT, fontSize=9.7, leading=13.2, alignment=TA_JUSTIFY, textColor=colors.HexColor("#1F2937"), spaceAfter=5))
styles.add(ParagraphStyle("BulletA", fontName=FONT, fontSize=9.4, leading=12.6, leftIndent=12, firstLineIndent=-6, textColor=colors.HexColor("#1F2937"), spaceAfter=3))
styles.add(ParagraphStyle("CodeA", fontName=FONT_MONO, fontSize=7.2, leading=9.2, textColor=colors.HexColor("#111827"), backColor=colors.HexColor("#F4F4F5"), borderColor=colors.HexColor("#D4D4D8"), borderWidth=0.4, borderPadding=5, spaceAfter=6))
styles.add(ParagraphStyle("Small", fontName=FONT, fontSize=8.6, leading=11, textColor=colors.HexColor("#6B7280"), spaceAfter=3))


def para(style: str, text: str) -> Paragraph:
    return Paragraph(esc(text), styles[style])


def cover(story):
    band = Table(
        [[Paragraph("AULAFY", ParagraphStyle("CoverBrand", fontName=FONT_BOLD, fontSize=11, leading=14, alignment=TA_CENTER, textColor=colors.white))]],
        colWidths=[13.2 * cm],
        rowHeights=[11 * mm],
    )
    band.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0F766E")),
        ("BOX", (0, 0), (-1, -1), 0, colors.HexColor("#0F766E")),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    story.append(Spacer(1, 2.2 * cm))
    story.append(band)
    story.append(Spacer(1, 2.0 * cm))
    story.append(para("CoverTitle", TITLE))
    story.append(para("CoverSub", SUBTITLE))
    story.append(para("CoverSub", f"Edicion actualizada - {UPDATED}"))
    story.append(Spacer(1, 1.1 * cm))
    table = Table(
        [[para("Small", "Una guia integral para aprender Claude Code, IA local, RAG, agentes, MLOps, fine-tuning, seguridad, IA generativa y automatizacion self-hosted con ejemplos practicos.")]],
        colWidths=[13.2 * cm],
    )
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#CBD5E1")),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(table)
    story.append(PageBreak())


def editorial_intro(story, data):
    story.append(para("Part", "Como usar este ebook"))
    story.append(para("BodyA", "Este volumen reordena e integra las dos guias PDF previas de Aulafy con todos los cursos publicados en la web hasta julio de 2026. La edicion esta pensada para lectura larga: primero fundamentos, despues practica local, sistemas en produccion y finalmente proyectos de negocio."))
    story.append(para("BodyA", "No intenta ser una enciclopedia pasiva. Cada capitulo esta escrito para que puedas construir algo, comprobarlo, auditarlo y decidir si merece pasar a un entorno real. El criterio editorial es local-first, open source cuando sea razonable, trazabilidad y control humano en acciones sensibles."))
    story.append(para("H2", "Mapa de contenidos"))
    for course in data["courses"]:
        story.append(para("BulletA", f"- {course['title']}: {course['short']}"))
    story.append(PageBreak())


def add_block(story, block):
    kind = block.get("type")
    text = clean_text(block.get("text", ""))
    if not text:
        return
    if kind == "h2":
        story.append(para("H2", text))
    elif kind == "h3":
        story.append(para("H3", text))
    elif kind == "bullet":
        story.append(para("BulletA", "- " + text))
    elif kind == "code":
        code = block.get("text", "").replace("\t", "  ").strip()
        if len(code) > 1800:
            code = code[:1800] + "\n..."
        story.append(Preformatted(code, styles["CodeA"], maxLineLength=88))
    else:
        story.append(para("BodyA", text))


def build_pdf(data):
    doc = EbookDoc(str(PDF_PATH))
    story = []
    cover(story)
    editorial_intro(story, data)
    for idx, course in enumerate(data["courses"], start=1):
        story.append(para("Part", f"Parte {idx}. {course['title']}"))
        story.append(para("BodyA", course["desc"]))
        story.append(para("Small", f"Nivel: {course['level']}"))
        for lesson in course["lessons"]:
            story.append(para("Chapter", lesson["title"]))
            for block in lesson["blocks"]:
                add_block(story, block)
        story.append(PageBreak())
    story.append(Spacer(1, 2 * cm))
    story.append(para("Part", "Notas finales"))
    story.append(para("BodyA", "Este ebook forma parte de Aulafy, una biblioteca educativa abierta para aprender inteligencia artificial con criterio practico, herramientas abiertas y proyectos reproducibles."))
    story.append(para("BodyA", "learnthouseai@gmail.com".replace("learnthouseai", "learntouseai")))
    story.append(para("BodyA", "Creative Commons Attribution 4.0 (CC BY 4.0)."))
    story.append(para("BodyA", "aulafy.net"))
    doc.build(story)


def build_tex(data):
    lines = [
        r"\documentclass[11pt,a4paper]{book}",
        r"\usepackage[a4paper,inner=24mm,outer=18mm,top=21mm,bottom=22mm]{geometry}",
        r"\usepackage{xcolor,hyperref,booktabs,longtable,fancyhdr,microtype,titlesec,tcolorbox,fvextra,xurl}",
        r"\definecolor{accent}{HTML}{0F766E}",
        r"\definecolor{orange}{HTML}{C2410C}",
        r"\hypersetup{colorlinks=true,linkcolor=accent,urlcolor=orange}",
        r"\pagestyle{fancy}\fancyhf{}\fancyhead[L]{Aulafy - Inteligencia Artificial Open Source}\fancyfoot[C]{\thepage}",
        r"\DefineVerbatimEnvironment{codebox}{Verbatim}{frame=single,breaklines=true,fontsize=\small}",
        r"\begin{document}",
        r"\begin{titlepage}\centering\vspace*{35mm}",
        r"{\Huge\bfseries Aulafy: Inteligencia Artificial Open Source\par}\vspace{8mm}",
        r"{\Large Manual practico para aprender, construir y automatizar con IA\par}\vspace{6mm}",
        r"{\large Edicion actualizada - Julio 2026\par}\vfill",
        r"\end{titlepage}",
        r"\tableofcontents\clearpage",
        r"\chapter*{Como usar este ebook}",
        tex_escape("Este volumen reordena e integra las dos guias PDF previas de Aulafy con todos los cursos publicados en la web hasta julio de 2026."),
    ]
    for course in data["courses"]:
        lines.append(rf"\part{{{tex_escape(course['title'])}}}")
        lines.append(tex_escape(course["desc"]) + "\n")
        for lesson in course["lessons"]:
            lines.append(rf"\chapter{{{tex_escape(lesson['title'])}}}")
            for block in lesson["blocks"]:
                kind = block.get("type")
                text = block.get("text", "")
                if kind == "h2":
                    lines.append(rf"\section{{{tex_escape(text)}}}")
                elif kind == "h3":
                    lines.append(rf"\subsection{{{tex_escape(text)}}}")
                elif kind == "bullet":
                    lines.append(rf"\begin{{itemize}}\item {tex_escape(text)}\end{{itemize}}")
                elif kind == "code":
                    lines.append("\\begin{codebox}\n" + text.replace("\\end{codebox}", "")[:2500] + "\n\\end{codebox}")
                else:
                    lines.append(tex_escape(text) + "\n")
    lines += [
        r"\chapter*{Notas finales}",
        tex_escape("Este ebook forma parte de Aulafy, una biblioteca educativa abierta para aprender inteligencia artificial con criterio practico, herramientas abiertas y proyectos reproducibles."),
        tex_escape("contacto@aulafy.net"),
        tex_escape("Creative Commons Attribution 4.0 (CC BY 4.0)."),
        tex_escape("aulafy.net"),
        r"\end{document}",
    ]
    TEX_PATH.write_text("\n".join(lines), encoding="utf-8")


def main():
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    build_pdf(data)
    build_tex(data)
    print(PDF_PATH)
    print(TEX_PATH)


if __name__ == "__main__":
    main()
