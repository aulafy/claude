"""Carga una bóveda de Obsidian como corpus: enlaces [[...]], etiquetas, retroenlaces y exclusiones."""
from __future__ import annotations
import re
from pathlib import Path
from .ingest import Document, clean, parse_front_matter
from .text import norm

LINK = re.compile(r"(?<!!)\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]")
EXCLUIDAS = {".obsidian", ".trash"}
PRIVADAS = {"Privado"}          # carpetas que no llegan a ningún rol


def slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", norm(name)).strip("-")


def load_vault(root: str | Path) -> tuple[list[Document], dict]:
    root, docs, links = Path(root), [], {}
    for path in sorted(root.rglob("*.md")):
        rel = path.relative_to(root)
        if any(part in EXCLUIDAS for part in rel.parts):
            continue
        meta, body = parse_front_matter(path.read_text(encoding="utf-8"))
        meta["acceso"] = "privado" if rel.parts[0] in PRIVADAS else "public"   # no está en ROLES: nadie lo ve
        meta["ruta"] = str(rel)
        did = slug(path.stem)
        links[did] = sorted({slug(m) for m in LINK.findall(body)})
        docs.append(Document(id=did, text=clean(body), meta=meta))
    return docs, links


def report(docs: list[Document], links: dict) -> dict:
    ids = {d.id for d in docs}
    broken = sorted({(src, dst) for src, dsts in links.items() for dst in dsts if dst not in ids})
    back: dict[str, list[str]] = {i: [] for i in ids}
    for src, dsts in links.items():
        for d in dsts:
            if d in back: back[d].append(src)
    return {"notas": len(docs), "enlaces": sum(len(v) for v in links.values()), "rotos": broken, "retroenlaces": {k: sorted(v) for k, v in back.items()}}
