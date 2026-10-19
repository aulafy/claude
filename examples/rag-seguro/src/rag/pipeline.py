"""Pipeline completo: permisos -> recuperar -> cuarentena -> responder con citas."""
from __future__ import annotations
from .chunking import Chunk, chunk_corpus
from .guard import allowed, quarantine
from .hybrid import Hybrid, rerank
from .ingest import load_corpus
from .answer import answer


class Rag:
    def __init__(self, corpus: str = "corpus", strategy: str = "heading"):
        self.chunks = chunk_corpus(load_corpus(corpus), strategy)
        self._by_role: dict[str, Hybrid] = {}

    def index_for(self, role: str) -> Hybrid:
        if role not in self._by_role:
            self._by_role[role] = Hybrid(allowed(self.chunks, role))  # el índice del rol solo contiene lo permitido
        return self._by_role[role]

    def retrieve(self, question: str, role: str = "visitante", k: int = 4):
        hits = rerank(question, self.index_for(role).search(question, k, pool=10))[:k]
        return hits

    def ask(self, question: str, role: str = "visitante", k: int = 4, model: str | None = None) -> dict:
        hits = self.retrieve(question, role, k)
        safe, flagged = quarantine([c for c, _ in hits])
        res = answer(question, safe, **({"model": model} if model else {}))
        res["recuperados"] = [c.id for c in safe]
        self.last_meta = {c.id: c.meta for c, _ in hits}
        res["en_cuarentena"] = [c.id for c, _ in flagged]
        return res
