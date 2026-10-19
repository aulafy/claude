"""Ingesta: lee los documentos Markdown, separa los metadatos y limpia el texto."""
from __future__ import annotations
import re
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class Document:
    id: str
    text: str
    meta: dict = field(default_factory=dict)  # acceso, version, origen...


def parse_front_matter(raw: str) -> tuple[dict, str]:
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, flags=re.S)
    if not m:
        return {}, raw
    meta = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
    return meta, m.group(2)


def clean(text: str) -> str:
    text = text.replace(" ", " ").replace("\r\n", "\n")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def load_corpus(root: str | Path) -> list[Document]:
    docs = []
    for path in sorted(Path(root).rglob("*.md")):
        meta, body = parse_front_matter(path.read_text(encoding="utf-8"))
        meta.setdefault("acceso", path.parent.name)
        docs.append(Document(id=meta.get("id", path.stem), text=clean(body), meta={**meta, "ruta": str(path)}))
    return docs
