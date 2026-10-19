"""Chunking: tres estrategias comparables. Cada trozo conserva de dónde viene."""
from __future__ import annotations
import re
from dataclasses import dataclass, field
from .ingest import Document


@dataclass
class Chunk:
    id: str
    doc_id: str
    text: str
    section: str = ""
    meta: dict = field(default_factory=dict)


def fixed(doc: Document, size: int = 300, overlap: int = 50) -> list[Chunk]:
    """Ventanas de caracteres fijos con solape. Simple, pero corta frases y secciones."""
    out, i, n = [], 0, 0
    while i < len(doc.text):
        out.append(Chunk(f"{doc.id}#{n}", doc.id, doc.text[i:i + size], meta=doc.meta))
        i += size - overlap
        n += 1
    return out


def by_paragraph(doc: Document, max_chars: int = 400) -> list[Chunk]:
    """Une párrafos hasta un máximo, sin partirlos."""
    paras = [p.strip() for p in re.split(r"\n\s*\n", doc.text) if p.strip()]
    out, buf, n = [], "", 0
    for p in paras:
        if buf and len(buf) + len(p) + 2 > max_chars:
            out.append(Chunk(f"{doc.id}#{n}", doc.id, buf, meta=doc.meta)); n += 1; buf = ""
        buf = f"{buf}\n\n{p}".strip()
    if buf:
        out.append(Chunk(f"{doc.id}#{n}", doc.id, buf, meta=doc.meta))
    return out


def by_heading(doc: Document, max_chars: int = 600) -> list[Chunk]:
    """Respeta los títulos: cada trozo lleva su sección y el título del documento como contexto."""
    title, section, buf, out, n = doc.id, "", [], [], 0
    def flush():
        nonlocal buf, n
        body = "\n".join(buf).strip()
        if body:
            text = f"[{title} · {section}]\n{body}" if section else f"[{title}]\n{body}"
            out.append(Chunk(f"{doc.id}#{n}", doc.id, text, section=section, meta=doc.meta)); n += 1
        buf = []
    for line in doc.text.splitlines():
        m = re.match(r"^(#{1,3})\s+(.*)", line)
        if m:
            flush()
            if len(m.group(1)) == 1:
                title = m.group(2)
            else:
                section = m.group(2)
        else:
            buf.append(line)
            if sum(len(x) for x in buf) > max_chars:
                flush()
    flush()
    return out


STRATEGIES = {"fixed": fixed, "paragraph": by_paragraph, "heading": by_heading}


def chunk_corpus(docs: list[Document], strategy: str = "heading", **kw) -> list[Chunk]:
    fn = STRATEGIES[strategy]
    return [c for d in docs for c in fn(d, **kw)]
