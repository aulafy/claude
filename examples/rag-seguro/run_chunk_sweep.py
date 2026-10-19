"""Barrido de tamaños de trozo. Uso: python3 run_chunk_sweep.py"""
import sys
sys.path.insert(0, "src")
from rag.ingest import load_corpus
from rag.chunking import fixed, by_paragraph, by_heading
from rag.hybrid import Hybrid, rerank
from rag.guard import allowed
from rag.evals import load_qa, retrieval_report

docs, qa = load_corpus("corpus"), load_qa()
def run(label, fn, **kw):
    chunks = [c for d in docs for c in fn(d, **kw)]
    cache = {}
    def s(q, role, k):
        if role not in cache: cache[role] = Hybrid(allowed(chunks, role))
        return rerank(q, cache[role].search(q, 10, 10))[:k]
    a, b = retrieval_report(s, qa, 2), retrieval_report(s, qa, 4)
    print(f"{label:22s} trozos={len(chunks):3d} media={sum(len(c.text) for c in chunks)//len(chunks):4d}c  k=2 recall={a['recall@2']:.3f} mrr={a['mrr']:.3f}  k=4 recall={b['recall@4']:.3f}")
for size in (100, 200, 300, 600, 1200): run(f"fixed size={size}", fixed, size=size, overlap=size // 6)
for m in (150, 300, 600, 1200): run(f"heading max={m}", by_heading, max_chars=m)
