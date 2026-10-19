"""Métricas de recuperación y de respuesta. Se miden por separado: recuperar bien no implica responder bien."""
from __future__ import annotations
import json
from pathlib import Path


def load_qa(path: str | Path = "eval/qa.jsonl") -> list[dict]:
    return [json.loads(l) for l in Path(path).read_text(encoding="utf-8").splitlines() if l.strip()]


def recall_at_k(hits_doc_ids: list[str], expected: str | None) -> float:
    return 1.0 if expected and expected in hits_doc_ids else 0.0


def reciprocal_rank(hits_doc_ids: list[str], expected: str | None) -> float:
    if not expected:
        return 0.0
    for i, d in enumerate(hits_doc_ids, start=1):
        if d == expected:
            return 1.0 / i
    return 0.0


def retrieval_report(search_fn, qa: list[dict], k: int = 4) -> dict:
    rows = [x for x in qa if x["doc"]]
    ids = [[c.doc_id for c, _ in search_fn(x["q"], x.get("rol", "visitante"), k)] for x in rows]
    return {
        "preguntas": len(rows),
        f"recall@{k}": round(sum(recall_at_k(i, x["doc"]) for i, x in zip(ids, rows)) / len(rows), 3),
        "mrr": round(sum(reciprocal_rank(i, x["doc"]) for i, x in zip(ids, rows)) / len(rows), 3),
        "fallos": [x["q"] for i, x in zip(ids, rows) if x["doc"] not in i],
    }


def answer_ok(result: dict, case: dict) -> dict:
    """Puntúa una respuesta con tres criterios independientes."""
    text = result.get("respuesta", "").lower()
    abstains = result.get("no_encontrado", False)
    if case["doc"] is None:
        return {"correcta": abstains, "cita_valida": True, "cita_precisa": True, "se_abstiene": abstains}
    contiene = all(s.lower() in text for s in case["debe"]) and (not case.get("debe_alguno") or any(s.lower() in text for s in case["debe_alguno"]))
    docs = [c.split("#")[0] for c in result.get("citas", [])]
    cita = case["doc"] in docs                       # la fuente correcta está entre las citadas
    precisa = bool(docs) and all(d == case["doc"] for d in docs)   # y no se cita nada más
    return {"correcta": contiene and not abstains, "cita_valida": cita, "cita_precisa": precisa, "se_abstiene": abstains}
