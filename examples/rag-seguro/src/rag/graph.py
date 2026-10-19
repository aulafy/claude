"""GraphRAG mínimo: un grafo de trozos unidos por entidades compartidas, usado para ampliar la recuperación.
Las entidades salen de un vocabulario explícito (no de un modelo): es auditable y reproducible."""
from __future__ import annotations
from collections import defaultdict
from .chunking import Chunk
from .text import norm

ENTIDADES = {
    "visita de medicion": "medicion", "medir": "medicion", "medicion": "medicion",
    "desplazamiento": "desplazamiento", "kilometro": "desplazamiento",
    "senal": "senal", "presupuesto": "presupuesto", "garantia": "garantia",
    "instalacion": "instalacion", "plazo": "plazo", "iva": "iva", "incidencia": "incidencia",
    "fabricacion": "fabricacion", "pago": "pago", "devolucion": "devolucion",
}


def entities(text: str) -> set[str]:
    t = norm(text)
    return {e for k, e in ENTIDADES.items() if k in t}


class ChunkGraph:
    def __init__(self, chunks: list[Chunk]):
        self.by_id = {c.id: c for c in chunks}
        self.ents = {c.id: entities(c.text) for c in chunks}
        inv: dict[str, set[str]] = defaultdict(set)
        for cid, es in self.ents.items():
            for e in es:
                inv[e].add(cid)
        self.adj: dict[str, dict[str, int]] = defaultdict(dict)
        for ids in inv.values():
            for a in ids:
                for b in ids:
                    if a != b and self.by_id[a].doc_id != self.by_id[b].doc_id:
                        self.adj[a][b] = self.adj[a].get(b, 0) + 1

    def neighbours(self, cid: str, query_ents: set[str] | None = None) -> list[tuple[str, int]]:
        """Vecinos ordenados por entidades compartidas; si hay entidades en la pregunta, pesan doble."""
        out = []
        for n, w in self.adj.get(cid, {}).items():
            bonus = len(self.ents[n] & query_ents) if query_ents else 0
            out.append((n, w + bonus))
        return sorted(out, key=lambda x: (-x[1], x[0]))


def expand(hits: list[Chunk], graph: ChunkGraph, question: str, k: int = 4, seeds: int = 2) -> list[Chunk]:
    """Conserva los `seeds` primeros resultados y rellena hasta k con vecinos del grafo relevantes para la pregunta."""
    qe = entities(question)
    out = list(hits[:seeds])
    seen = {c.id for c in out}
    cand: dict[str, int] = {}
    for c in out:
        for n, w in graph.neighbours(c.id, qe):
            if n not in seen and (graph.ents[n] & qe):
                cand[n] = cand.get(n, 0) + w
    for n, _ in sorted(cand.items(), key=lambda x: (-x[1], x[0])):
        if len(out) >= k: break
        out.append(graph.by_id[n]); seen.add(n)
    for c in hits[seeds:]:
        if len(out) >= k: break
        if c.id not in seen: out.append(c); seen.add(c.id)
    return out
