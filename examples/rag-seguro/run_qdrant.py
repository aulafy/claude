"""Permisos con filtro de payload en Qdrant (modo local en memoria, sin servidor).
Requiere: pip install -r requirements-qdrant.txt. Uso: python3 run_qdrant.py"""
import sys
sys.path.insert(0, "src")
from qdrant_client import QdrantClient, models
from rag.chunking import chunk_corpus
from rag.ingest import load_corpus
from rag.vectors import embed, DIM
from rag.guard import ROLES, allowed
from rag.evals import load_qa

chunks = chunk_corpus(load_corpus("corpus"), "heading")
cli = QdrantClient(":memory:")
cli.create_collection("marea", vectors_config=models.VectorParams(size=DIM, distance=models.Distance.COSINE))
cli.upsert("marea", [models.PointStruct(id=i, vector=embed(c.text), payload={"chunk": c.id, "acceso": c.meta["acceso"]}) for i, c in enumerate(chunks)])
cli.create_payload_index("marea", "acceso", models.PayloadSchemaType.KEYWORD)

def search(q, role, k=4, filtrar=True):
    flt = models.Filter(must=[models.FieldCondition(key="acceso", match=models.MatchAny(any=sorted(ROLES[role])))]) if filtrar else None
    return [p.payload for p in cli.query_points("marea", query=embed(q), query_filter=flt, limit=k).points]

preguntas = [x["q"] for x in load_qa()]
for role in ROLES:
    fuga = 0
    for q in preguntas:
        ids = [p["acceso"] for p in search(q, role)]
        fuga += any(a not in ROLES[role] for a in ids)
    # equivalencia con el filtro propio del proyecto (allowed) sobre el mismo vector
    permitidos = {c.id for c in allowed(chunks, role)}
    iguales = sum({p["chunk"] for p in search(q, role)} <= permitidos for q in preguntas)
    print(f"{role:9s} con filtro: consultas con fuga={fuga}/{len(preguntas)}  resultados dentro de lo permitido={iguales}/{len(preguntas)}")
sin = sum(any(p["acceso"] not in ROLES["visitante"] for p in search(q, "visitante", filtrar=False)) for q in preguntas)
print(f"visitante SIN filtro (error de configuración): consultas que devuelven trozos no permitidos={sin}/{len(preguntas)}")
