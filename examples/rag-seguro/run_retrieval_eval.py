"""Compara estrategias de chunking y buscadores sobre el mismo conjunto de preguntas. Uso: python3 run_retrieval_eval.py"""
import sys
sys.path.insert(0, "src")
from rag.pipeline import Rag
from rag.evals import load_qa, retrieval_report
from rag.bm25 import BM25
from rag.vectors import VectorIndex
from rag.hybrid import Hybrid, rerank
from rag.guard import allowed

qa = load_qa()
def searcher(chunks_by_role, kind):
    cache = {}
    def f(q, role, k):
        if role not in cache:
            ch = allowed(chunks_by_role, role)
            cache[role] = (BM25(ch), VectorIndex(ch), Hybrid(ch))
        b, v, h = cache[role]
        if kind == "bm25": return b.search(q, k)
        if kind == "vector": return v.search(q, k)
        if kind == "hybrid": return h.search(q, k)
        return rerank(q, h.search(q, 10))[:k]
    return f
print("== Chunking (buscador híbrido + reranking) ==")
for strat in ("fixed", "paragraph", "heading"):
    r = Rag(strategy=strat)
    for k in (2, 4):
        rep = retrieval_report(searcher(r.chunks, "rerank"), qa, k)
        print(f"{strat:10s} trozos={len(r.chunks):3d} k={k} recall={rep[f'recall@{k}']:.3f} mrr={rep['mrr']:.3f}")
print("\n== Buscador (chunking por títulos, k=2) ==")
r = Rag(strategy="heading")
for kind in ("bm25", "vector", "hybrid", "rerank"):
    rep = retrieval_report(searcher(r.chunks, kind), qa, 2)
    print(f"{kind:8s} recall@2={rep['recall@2']:.3f} mrr={rep['mrr']:.3f} fallos={len(rep['fallos'])}")
    if kind in ("bm25", "vector", "rerank"): print("   ", rep["fallos"])
