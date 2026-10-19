"""Búsqueda híbrida: fusiona rankings con Reciprocal Rank Fusion (RRF) y reordena."""
from __future__ import annotations
from .bm25 import BM25
from .chunking import Chunk
from .text import tokens
from .vectors import VectorIndex


def rrf(rankings: list[list[Chunk]], k: int = 60) -> list[tuple[Chunk, float]]:
    score: dict[str, float] = {}
    by_id: dict[str, Chunk] = {}
    for ranking in rankings:
        for rank, c in enumerate(ranking, start=1):
            by_id[c.id] = c
            score[c.id] = score.get(c.id, 0.0) + 1.0 / (k + rank)
    return sorted(((by_id[i], s) for i, s in score.items()), key=lambda x: -x[1])


class Hybrid:
    def __init__(self, chunks: list[Chunk]):
        self.bm25, self.vec = BM25(chunks), VectorIndex(chunks)

    def search(self, query: str, k: int = 4, pool: int = 10) -> list[tuple[Chunk, float]]:
        lex = [c for c, s in self.bm25.search(query, pool)]
        den = [c for c, s in self.vec.search(query, pool)]
        return rrf([lex, den])[:k]


def rerank(query: str, hits: list[tuple[Chunk, float]]) -> list[tuple[Chunk, float]]:
    """Reordenación barata: premia cobertura de la pregunta y títulos de sección que coinciden."""
    q = set(tokens(query))
    out = []
    for c, s in hits:
        t = set(tokens(c.text))
        coverage = len(q & t) / (len(q) or 1)
        section_bonus = 0.5 if q & set(tokens(c.section)) else 0.0
        out.append((c, s + coverage + section_bonus))
    return sorted(out, key=lambda x: -x[1])
