from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
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
PDF_RAW_PATH = OUT / "aulafy-inteligencia-artificial-open-source-julio-2026.raw.pdf"
TEX_PATH = OUT / "aulafy-inteligencia-artificial-open-source-julio-2026.tex"
DATA_PATH = TMP / "ebook-content.json"

TITLE = "Aulafy: Inteligencia Artificial Open Source"
SUBTITLE = "Manual practico para aprender, construir y automatizar con IA"
UPDATED = "Julio 2026"

INK = colors.HexColor("#111827")
MUTED = colors.HexColor("#5B6472")
TEAL = colors.HexColor("#0F766E")
TEAL_DARK = colors.HexColor("#064E3B")
ORANGE = colors.HexColor("#C2410C")
BLUE = colors.HexColor("#2563EB")
PAPER = colors.HexColor("#FBFAF7")
PANEL = colors.HexColor("#F3F7F5")
CODE_BG = colors.HexColor("#EEF2F7")
RULE = colors.HexColor("#D6D3CC")


def font_path(name: str) -> str:
    p = Path("/Users/mac/Library/Fonts") / name
    if not p.exists():
        raise FileNotFoundError(p)
    return str(p)


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("PlexSans", font_path("SourceSans3[wght].ttf")))
    pdfmetrics.registerFont(TTFont("PlexSansSemi", font_path("InterVariable.ttf")))
    pdfmetrics.registerFont(TTFont("PlexSansBold", font_path("InterVariable.ttf")))
    pdfmetrics.registerFont(TTFont("PlexSerif", font_path("SourceSerif4[opsz,wght].ttf")))
    pdfmetrics.registerFont(TTFont("PlexSerifSemi", font_path("SourceSerif4[opsz,wght].ttf")))
    pdfmetrics.registerFont(TTFont("JetBrainsMono", font_path("JetBrainsMono-Regular.ttf")))


register_fonts()


def clean_text(text: str) -> str:
    text = re.sub(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]", "", text)
    replacements = {
        "→": "->",
        "←": "<-",
        "—": "-",
        "–": "-",
        "·": "-",
        "“": '"',
        "”": '"',
        "’": "'",
        "á": "á",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    return re.sub(r"\s+", " ", text).strip()


def esc(text: str) -> str:
    text = clean_text(text)
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


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


class AulafyDoc(BaseDocTemplate):
    def __init__(self, filename: str):
        self.current_part = ""
        self.current_chapter = ""
        frame = Frame(24 * mm, 23 * mm, A4[0] - 42 * mm, A4[1] - 45 * mm, id="body")
        super().__init__(
            filename,
            pagesize=A4,
            title=TITLE,
            author="Aulafy",
            subject="Cursos de inteligencia artificial open source",
            leftMargin=24 * mm,
            rightMargin=18 * mm,
            topMargin=22 * mm,
            bottomMargin=23 * mm,
        )
        self.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=draw_page)])

    def afterFlowable(self, flowable):
        if getattr(flowable, "_aulafy_part", None):
            self.current_part = flowable._aulafy_part
        if getattr(flowable, "_aulafy_chapter", None):
            self.current_chapter = flowable._aulafy_chapter


def draw_page(canvas, doc):
    canvas.saveState()
    w, h = A4
    page = canvas.getPageNumber()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, w, h, stroke=0, fill=1)
    if page > 1:
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.45)
        canvas.line(24 * mm, h - 16 * mm, w - 18 * mm, h - 16 * mm)
        canvas.setFont("PlexSans", 8)
        canvas.setFillColor(MUTED)
        header = doc.current_part or "Aulafy"
        canvas.drawString(24 * mm, h - 11.8 * mm, header[:72])
        canvas.setFillColor(TEAL)
        canvas.rect(18 * mm, 23 * mm, 2.2 * mm, h - 46 * mm, stroke=0, fill=1)
        canvas.setFont("PlexSansSemi", 8.5)
        canvas.setFillColor(MUTED)
        canvas.drawRightString(w - 18 * mm, 12 * mm, f"{page:03d}")
    canvas.restoreState()


S = {
    "cover_brand": ParagraphStyle("cover_brand", fontName="PlexSansBold", fontSize=10, leading=12, alignment=TA_CENTER, textColor=colors.white, uppercase=True),
    "cover_title": ParagraphStyle("cover_title", fontName="PlexSansBold", fontSize=37, leading=40, alignment=TA_LEFT, textColor=INK, spaceAfter=12),
    "cover_sub": ParagraphStyle("cover_sub", fontName="PlexSerif", fontSize=15.5, leading=21, alignment=TA_LEFT, textColor=colors.HexColor("#374151"), spaceAfter=8),
    "cover_meta": ParagraphStyle("cover_meta", fontName="PlexSansSemi", fontSize=10, leading=13, alignment=TA_LEFT, textColor=TEAL_DARK),
    "part_kicker": ParagraphStyle("part_kicker", fontName="PlexSansSemi", fontSize=9, leading=12, textColor=colors.white, alignment=TA_LEFT),
    "part_title": ParagraphStyle("part_title", fontName="PlexSansBold", fontSize=27, leading=31, textColor=colors.white, alignment=TA_LEFT),
    "part_desc": ParagraphStyle("part_desc", fontName="PlexSerif", fontSize=11.5, leading=16, textColor=colors.HexColor("#E7F7F2"), alignment=TA_LEFT),
    "chapter": ParagraphStyle("chapter", fontName="PlexSansBold", fontSize=18.5, leading=23, textColor=INK, spaceBefore=9, spaceAfter=7),
    "h2": ParagraphStyle("h2", fontName="PlexSansBold", fontSize=12.8, leading=16, textColor=ORANGE, spaceBefore=9, spaceAfter=4),
    "h3": ParagraphStyle("h3", fontName="PlexSansSemi", fontSize=11.5, leading=15, textColor=colors.HexColor("#334155"), spaceBefore=7, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="PlexSerif", fontSize=9.7, leading=13.7, alignment=TA_JUSTIFY, textColor=INK, spaceAfter=5.5),
    "small": ParagraphStyle("small", fontName="PlexSans", fontSize=8.2, leading=11, textColor=MUTED, spaceAfter=4),
    "bullet": ParagraphStyle("bullet", fontName="PlexSerif", fontSize=9.3, leading=12.7, leftIndent=13, firstLineIndent=-7, textColor=INK, spaceAfter=3.2),
    "code": ParagraphStyle("code", fontName="JetBrainsMono", fontSize=7.0, leading=9.1, textColor=colors.HexColor("#172033"), backColor=CODE_BG, borderColor=colors.HexColor("#CBD5E1"), borderWidth=0.55, borderPadding=6, spaceBefore=3, spaceAfter=7),
    "toc_title": ParagraphStyle("toc_title", fontName="PlexSansBold", fontSize=22, leading=27, textColor=TEAL_DARK, spaceAfter=10),
    "toc_item": ParagraphStyle("toc_item", fontName="PlexSans", fontSize=9.3, leading=12.4, textColor=INK, leftIndent=10, firstLineIndent=-6, spaceAfter=2.5),
}


def p(style: str, text: str) -> Paragraph:
    return Paragraph(esc(text), S[style])


def cover(story):
    story.append(Spacer(1, 20 * mm))
    brand = Table([[p("cover_brand", "AULAFY / OPEN SOURCE AI FIELD MANUAL")]], colWidths=[145 * mm], rowHeights=[12 * mm])
    brand.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), TEAL_DARK),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    story.append(brand)
    story.append(Spacer(1, 31 * mm))
    story.append(p("cover_title", TITLE))
    story.append(Spacer(1, 3 * mm))
    story.append(p("cover_sub", SUBTITLE))
    story.append(Spacer(1, 8 * mm))
    story.append(p("cover_meta", f"EDICION ACTUALIZADA - {UPDATED.upper()}"))
    story.append(Spacer(1, 23 * mm))
    pitch = Table(
        [[p("small", "Una guia integral para aprender Claude Code, IA local, RAG, agentes, MLOps, fine-tuning, seguridad, IA generativa y automatizacion self-hosted con proyectos practicos.")]],
        colWidths=[135 * mm],
    )
    pitch.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#EEF7F4")),
        ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#9CCBC1")),
        ("LINEBEFORE", (0, 0), (0, -1), 5, TEAL),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(pitch)
    story.append(PageBreak())


def intro(story, data):
    story.append(p("toc_title", "Como usar este ebook"))
    story.append(p("body", "Este volumen reordena e integra las dos guias PDF previas de Aulafy con todos los cursos publicados en la web hasta julio de 2026. Esta edicion esta pensada para lectura larga: fundamentos, practica local, sistemas en produccion y proyectos de negocio."))
    story.append(p("body", "No intenta ser una enciclopedia pasiva. Cada capitulo esta escrito para que puedas construir algo, comprobarlo, auditarlo y decidir si merece pasar a un entorno real. El criterio editorial es local-first, open source cuando sea razonable, trazabilidad y control humano en acciones sensibles."))
    story.append(Spacer(1, 5 * mm))
    story.append(p("toc_title", "Indice editorial"))
    for idx, course in enumerate(data["courses"], start=1):
        story.append(p("toc_item", f"{idx:02d}. {course['title']} - {course['short']}"))
    story.append(PageBreak())


def part_page(story, idx: int, course):
    marker = Paragraph("", S["small"])
    marker._aulafy_part = f"Parte {idx}. {course['title']}"
    story.append(marker)
    panel = Table(
        [[p("part_kicker", f"PARTE {idx:02d}")], [p("part_title", course["title"])], [p("part_desc", course["desc"])]],
        colWidths=[145 * mm],
    )
    panel.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), TEAL_DARK),
        ("LINEBEFORE", (0, 0), (0, -1), 7, ORANGE),
        ("LEFTPADDING", (0, 0), (-1, -1), 16),
        ("RIGHTPADDING", (0, 0), (-1, -1), 16),
        ("TOPPADDING", (0, 0), (-1, 0), 16),
        ("BOTTOMPADDING", (0, 2), (-1, 2), 18),
        ("TOPPADDING", (0, 1), (-1, 1), 5),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 10),
    ]))
    story.append(Spacer(1, 42 * mm))
    story.append(panel)
    story.append(Spacer(1, 8 * mm))
    story.append(p("small", f"Nivel: {course['level']}"))
    story.append(PageBreak())


def chapter_title(text: str) -> Paragraph:
    para = p("chapter", text)
    para._aulafy_chapter = text
    return para


def add_block(story, block):
    kind = block.get("type")
    text = clean_text(block.get("text", ""))
    if not text:
        return
    if kind == "h2":
        story.append(p("h2", text))
    elif kind == "h3":
        story.append(p("h3", text))
    elif kind == "bullet":
        story.append(p("bullet", "- " + text))
    elif kind == "code":
        code = block.get("text", "").replace("\t", "  ").strip()
        code = code.replace("\r\n", "\n")
        if len(code) > 1600:
            code = code[:1600] + "\n..."
        story.append(Preformatted(code, S["code"], maxLineLength=92))
    else:
        story.append(p("body", text))


def build_pdf(data):
    doc = AulafyDoc(str(PDF_RAW_PATH))
    story = []
    cover(story)
    intro(story, data)
    for idx, course in enumerate(data["courses"], start=1):
        part_page(story, idx, course)
        for lesson in course["lessons"]:
            story.append(KeepTogether([chapter_title(lesson["title"]), p("small", course["title"])]))
            for block in lesson["blocks"]:
                add_block(story, block)
        story.append(PageBreak())
    story.append(Spacer(1, 35 * mm))
    story.append(p("toc_title", "Notas finales"))
    story.append(p("body", "Este ebook forma parte de Aulafy, una biblioteca educativa abierta para aprender inteligencia artificial con criterio practico, herramientas abiertas y proyectos reproducibles."))
    story.append(p("body", "learntouseai@gmail.com"))
    story.append(p("body", "Creative Commons Attribution 4.0 (CC BY 4.0)."))
    story.append(p("body", "aulafy.net"))
    doc.build(story)
    try:
        subprocess.run(["qpdf", "--linearize", str(PDF_RAW_PATH), str(PDF_PATH)], check=True)
        PDF_RAW_PATH.unlink(missing_ok=True)
    except Exception:
        PDF_RAW_PATH.replace(PDF_PATH)


def build_tex(data):
    lines = [
        r"\documentclass[11pt,a4paper]{book}",
        r"\usepackage[a4paper,inner=24mm,outer=18mm,top=22mm,bottom=23mm]{geometry}",
        r"\usepackage{xcolor,hyperref,booktabs,longtable,fancyhdr,microtype,titlesec,tcolorbox,fvextra,xurl,fontspec}",
        r"\setmainfont{IBM Plex Serif}",
        r"\setsansfont{IBM Plex Sans}",
        r"\setmonofont{JetBrains Mono}",
        r"\definecolor{teal}{HTML}{0F766E}",
        r"\definecolor{orange}{HTML}{C2410C}",
        r"\definecolor{ink}{HTML}{111827}",
        r"\hypersetup{colorlinks=true,linkcolor=teal,urlcolor=orange}",
        r"\pagestyle{fancy}\fancyhf{}\fancyhead[L]{Aulafy - Inteligencia Artificial Open Source}\fancyfoot[C]{\thepage}",
        r"\DefineVerbatimEnvironment{codebox}{Verbatim}{frame=single,breaklines=true,fontsize=\small}",
        r"\begin{document}",
        r"\begin{titlepage}\centering\vspace*{25mm}",
        r"{\sffamily\bfseries\Huge Aulafy: Inteligencia Artificial Open Source\par}\vspace{7mm}",
        r"{\Large Manual practico para aprender, construir y automatizar con IA\par}\vspace{5mm}",
        r"{\sffamily\bfseries Julio 2026\par}\vfill",
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
                    lines.append("\\begin{codebox}\n" + text.replace("\\end{codebox}", "")[:2200] + "\n\\end{codebox}")
                else:
                    lines.append(tex_escape(text) + "\n")
    lines += [
        r"\chapter*{Notas finales}",
        tex_escape("Este ebook forma parte de Aulafy, una biblioteca educativa abierta para aprender inteligencia artificial con criterio practico, herramientas abiertas y proyectos reproducibles."),
        tex_escape("learntouseai@gmail.com"),
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
