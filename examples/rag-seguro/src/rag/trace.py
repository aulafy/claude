"""Trazabilidad: cada respuesta deja un registro reproducible (qué se preguntó, qué se recuperó, con qué versión, qué modelo)."""
from __future__ import annotations
import hashlib, json, time
from pathlib import Path


def record(path: str | Path, question: str, role: str, result: dict, chunks_meta: dict[str, dict], model: str) -> dict:
    ids = result.get("recuperados", [])
    entry = {
        "ts": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "pregunta_hash": hashlib.sha256(question.encode()).hexdigest()[:12],  # no guarda el texto de la pregunta
        "rol": role, "modelo": model,
        "recuperados": ids,
        "versiones": {i: chunks_meta.get(i, {}).get("version") for i in ids},
        "citas": result.get("citas", []),
        "no_encontrado": result.get("no_encontrado", False),
        "citas_inventadas": result.get("citas_inventadas", []),
        "en_cuarentena": result.get("en_cuarentena", []),
    }
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    return entry


def audit(entries: list[dict]) -> dict:
    """Comprobaciones automáticas sobre el registro: lo que nunca debería ocurrir."""
    return {
        "respuestas": len(entries),
        "con_citas_inventadas": sum(1 for e in entries if e["citas_inventadas"]),
        "cita_fuera_de_lo_recuperado": sum(1 for e in entries if any(c not in e["recuperados"] for c in e["citas"])),
        "en_cuarentena": sum(1 for e in entries if e["en_cuarentena"]),
        "sin_cita_y_sin_abstencion": sum(1 for e in entries if not e["citas"] and not e["no_encontrado"]),
    }
