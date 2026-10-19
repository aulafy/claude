"""BM25 desde cero: puntúa cada trozo según los términos raros que comparte con la pregunta."""
from __future__ import annotations
import math
from collections import Counter
from .chunking import Chunk
from .text import tokens


class BM25:
    def __init__(self, chunks: list[Chunk], k1: float = 1.5, b: float = 0.75):
        self.chunks, self.k1, self.b = chunks, k1, b
        self.tf = [Counter(tokens(c.text)) for c in chunks]
        self.len = [sum(t.values()) for t in self.tf]
        self.avg = (sum(self.len) / len(self.len)) if self.len else 0
        df = Counter(w for t in self.tf for w in t)
        n = len(chunks)
        self.idf = {w: math.log(1 + (n - d + 0.5) / (d + 0.5)) for w, d in df.items()}

    def score(self, query: str) -> list[tuple[Chunk, float]]:
        q = tokens(query)
        out = []
        for i, c in enumerate(self.chunks):
            s = 0.0
            for w in q:
                f = self.tf[i].get(w, 0)
                if f:
                    s += self.idf.get(w, 0) * f * (self.k1 + 1) / (f + self.k1 * (1 - self.b + self.b * self.len[i] / self.avg))
            out.append((c, s))
        return sorted(out, key=lambda x: -x[1])

    def search(self, query: str, k: int = 4) -> list[tuple[Chunk, float]]:
        return [(c, s) for c, s in self.score(query)[:k] if s > 0]
