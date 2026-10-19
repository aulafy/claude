"""Defensas: permisos ANTES de recuperar y tratamiento de texto no fiable."""
from __future__ import annotations
import re
from .chunking import Chunk

ROLES = {
    "visitante": {"public"},
    "equipo": {"public", "internal"},
    "rrhh": {"public", "internal", "rrhh"},
}


def allowed(chunks: list[Chunk], role: str) -> list[Chunk]:
    """Filtra por permiso ANTES de buscar. Si un trozo prohibido ni siquiera entra en el índice
    consultado, ningún prompt puede hacerlo salir."""
    ok = ROLES[role]
    return [c for c in chunks if c.meta.get("acceso", "public") in ok]


INJECTION_PATTERNS = [
    r"ignora (todas )?las instrucciones",
    r"ignore (all )?(previous|prior) instructions",
    r"olvida (todo|las instrucciones)",
    r"(responde|di) que ",
    r"para el asistente",
    r"(muestra|incluye|revela).{0,40}(documentos internos|prompt|instrucciones del sistema|contraseñ)",
    r"system prompt",
]


def injection_signals(text: str) -> list[str]:
    t = text.lower()
    return [p for p in INJECTION_PATTERNS if re.search(p, t)]


def quarantine(chunks: list[Chunk]) -> tuple[list[Chunk], list[tuple[Chunk, list[str]]]]:
    """Separa los trozos con señales de instrucción oculta. Una heurística NO es una barrera completa:
    sirve para registrar y reducir riesgo; la barrera real es que el modelo no tenga permisos peligrosos."""
    ok, bad = [], []
    for c in chunks:
        sig = injection_signals(c.text)
        (bad if sig else ok).append((c, sig) if sig else c)
    return ok, bad
