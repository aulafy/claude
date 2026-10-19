"""Vector hecho a mano frente a embeddings neuronales (nomic-embed-text). Requiere Ollama con el modelo."""
import sys
sys.path.insert(0, "src")
from rag.pipeline import Rag
from rag.evals import load_qa, retrieval_report
from rag.guard import allowed
from rag.bm25 import BM25
from rag.vectors import VectorIndex, NeuralIndex
from rag.hybrid import rrf

qa, rag = load_qa(), Rag(strategy="heading")
cache = {}
def idx(role):
    if role not in cache:
        ch = allowed(rag.chunks, role)
        cache[role] = (BM25(ch), VectorIndex(ch), NeuralIndex(ch))
    return cache[role]
def make(kind):
    def f(q, role, k):
        b, v, n = idx(role)
        if kind == "bm25": return b.search(q, k)
        if kind == "vector-hash": return v.search(q, k)
        if kind == "vector-neural": return n.search(q, k)
        if kind == "hibrido-hash": return rrf([[c for c, _ in b.search(q, 10)], [c for c, _ in v.search(q, 10)]])[:k]
        return rrf([[c for c, _ in b.search(q, 10)], [c for c, _ in n.search(q, 10)]])[:k]
    return f
for k in (2, 4):
    print(f"== k={k} ==")
    for kind in ("bm25", "vector-hash", "vector-neural", "hibrido-hash", "hibrido-neural"):
        r = retrieval_report(make(kind), qa, k)
        print(f"{kind:15s} recall@{k}={r[f'recall@{k}']:.3f} mrr={r['mrr']:.3f} fallos={len(r['fallos'])}")
        if k == 2 and kind in ("vector-neural", "hibrido-neural"): print("   ", r["fallos"])
