"""¿Ayuda ampliar con un grafo en preguntas que necesitan dos documentos? Uso: python3 run_graph_eval.py"""
import sys, json
sys.path.insert(0, "src")
from rag.pipeline import Rag
from rag.hybrid import rerank
from rag.graph import ChunkGraph, expand

rag = Rag()
qs = [json.loads(l) for l in open("eval/multihop.jsonl")]
vis = rag.index_for("visitante")
graph = ChunkGraph(vis.bm25.chunks)
print(f"grafo: {len(graph.by_id)} trozos, {sum(len(v) for v in graph.adj.values())//2} aristas entre documentos distintos")
res = {"solo recuperación k=4": 0, "grafo (2 semillas + vecinos)": 0}
for q in qs:
    base = [c for c, _ in rerank(q["q"], vis.search(q["q"], 10, 10))][:4]
    ext = expand(base, graph, q["q"], 4, 2)
    ok_b = set(q["docs"]) <= {c.doc_id for c in base}
    ok_e = set(q["docs"]) <= {c.doc_id for c in ext}
    res["solo recuperación k=4"] += ok_b; res["grafo (2 semillas + vecinos)"] += ok_e
    print(f"{'✔' if ok_b else '✖'} base  {'✔' if ok_e else '✖'} grafo  {q['q']}  -> base {[c.id for c in base]} | grafo {[c.id for c in ext]}")
for k, v in res.items(): print(f"{k}: {v}/{len(qs)} preguntas con TODOS los documentos necesarios")
