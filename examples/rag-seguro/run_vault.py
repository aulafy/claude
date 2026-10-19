"""Bóveda de Obsidian como RAG. Uso: python3 run_vault.py"""
import sys, json
sys.path.insert(0, "src")
from rag.vault import load_vault, report
from rag.chunking import chunk_corpus
from rag.guard import allowed
from rag.hybrid import Hybrid

docs, links = load_vault("vault")
rep = report(docs, links)
print(f"notas={rep['notas']} enlaces={rep['enlaces']}  rotos={rep['rotos']}")
print("retroenlaces de cocina-garcia:", rep["retroenlaces"]["cocina-garcia"])
chunks = chunk_corpus(docs, "heading")
for role in ("visitante", "equipo"):
    h = Hybrid(allowed(chunks, role))
    hits = [c.id for c, _ in h.search("descuento que quiere hacer a Ana García por el retraso", 3)]
    print(f"{role:9s} -> {hits}")
print("¿se leyó .obsidian?", any(".obsidian" in d.meta["ruta"] for d in docs))
